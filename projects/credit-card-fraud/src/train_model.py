"""Train the fraud detector from the project root: python src/train_model.py."""

from __future__ import annotations

from pathlib import Path
import json
import platform

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sklearn
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.base import clone
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    accuracy_score,
    average_precision_score,
    confusion_matrix,
    f1_score,
    precision_recall_curve,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "creditcard.parquet"
MODEL_DIR = ROOT / "models"
OUTPUT_DIR = ROOT / "outputs"

FEATURES = ["Time", *[f"V{i}" for i in range(1, 29)], "Amount"]
TARGET = "Class"
SEED = 42
TARGET_RECALL = 0.80


def load_data() -> tuple[pd.DataFrame, pd.Series]:
    if not DATA_PATH.is_file():
        raise FileNotFoundError(
            "Dataset missing. Run python download_data.py from the project root."
        )
    frame = pd.read_parquet(DATA_PATH)
    expected = FEATURES + [TARGET]
    if list(frame.columns) != expected:
        raise ValueError("Dataset schema changed.")
    y = frame[TARGET].astype(int)
    if len(frame) != 284_807 or int(y.sum()) != 492:
        raise ValueError("Dataset counts changed.")
    return frame[FEATURES].astype(float), y


def split_data(X: pd.DataFrame, y: pd.Series):
    X_build, X_test, y_build, y_test = train_test_split(
        X,
        y,
        test_size=0.15,
        stratify=y,
        random_state=SEED,
    )
    validation_fraction_of_build = 0.15 / 0.85
    X_train, X_val, y_train, y_val = train_test_split(
        X_build,
        y_build,
        test_size=validation_fraction_of_build,
        stratify=y_build,
        random_state=SEED,
    )
    return X_train, X_val, X_test, y_train, y_val, y_test


def candidate_models():
    logistic = Pipeline(
        [
            ("scale", StandardScaler()),
            (
                "model",
                LogisticRegression(
                    max_iter=1500,
                    solver="lbfgs",
                    random_state=SEED,
                ),
            ),
        ]
    )
    weighted_logistic = Pipeline(
        [
            ("scale", StandardScaler()),
            (
                "model",
                LogisticRegression(
                    max_iter=1500,
                    solver="lbfgs",
                    class_weight="balanced",
                    random_state=SEED,
                ),
            ),
        ]
    )
    smote_logistic = ImbPipeline(
        [
            ("scale", StandardScaler()),
            (
                "smote",
                SMOTE(
                    sampling_strategy=0.10,
                    random_state=SEED,
                    k_neighbors=5,
                ),
            ),
            (
                "model",
                LogisticRegression(
                    max_iter=1500,
                    solver="lbfgs",
                    random_state=SEED,
                ),
            ),
        ]
    )
    forest = RandomForestClassifier(
        n_estimators=120,
        max_depth=12,
        min_samples_leaf=2,
        class_weight="balanced_subsample",
        n_jobs=-1,
        random_state=SEED,
    )
    return {
        "Logistic Regression": logistic,
        "Class-weighted Logistic Regression": weighted_logistic,
        "SMOTE + Logistic Regression": smote_logistic,
        "Class-weighted Random Forest": forest,
    }


def compare_models(X_train: pd.DataFrame, y_train: pd.Series) -> pd.DataFrame:
    cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=SEED)
    rows = []
    for name, model in candidate_models().items():
        print(f"Cross-validating {name} ...", flush=True)
        scores = cross_validate(
            clone(model),
            X_train,
            y_train,
            cv=cv,
            scoring={
                "ap": "average_precision",
                "roc_auc": "roc_auc",
                "precision": "precision",
                "recall": "recall",
                "f1": "f1",
            },
            n_jobs=1,
            error_score="raise",
        )
        rows.append(
            {
                "model": name,
                "cv_average_precision": float(scores["test_ap"].mean()),
                "cv_roc_auc": float(scores["test_roc_auc"].mean()),
                "cv_precision_at_0_5": float(scores["test_precision"].mean()),
                "cv_recall_at_0_5": float(scores["test_recall"].mean()),
                "cv_f1_at_0_5": float(scores["test_f1"].mean()),
            }
        )
    result = pd.DataFrame(rows).sort_values(
        "cv_average_precision",
        ascending=False,
        kind="stable",
    )
    result.to_csv(OUTPUT_DIR / "model_comparison.csv", index=False)
    return result


def choose_threshold(
    y_val: pd.Series,
    scores: np.ndarray,
    target_recall: float = TARGET_RECALL,
) -> tuple[float, pd.DataFrame]:
    precision, recall, thresholds = precision_recall_curve(y_val, scores)
    table = pd.DataFrame(
        {
            "threshold": thresholds,
            "precision": precision[:-1],
            "recall": recall[:-1],
        }
    )
    table["f1"] = (
        2 * table["precision"] * table["recall"]
        / (table["precision"] + table["recall"] + 1e-12)
    )

    feasible = table[table["recall"] >= target_recall]
    if not feasible.empty:
        chosen = feasible.sort_values(
            ["precision", "threshold"],
            ascending=[False, False],
            kind="stable",
        ).iloc[0]
    else:
        chosen = table.sort_values("f1", ascending=False, kind="stable").iloc[0]

    table.to_csv(OUTPUT_DIR / "validation_thresholds.csv", index=False)
    return float(chosen["threshold"]), table


def metrics_at_threshold(
    y_true: pd.Series,
    scores: np.ndarray,
    threshold: float,
) -> tuple[dict, np.ndarray]:
    predictions = (scores >= threshold).astype(int)
    matrix = confusion_matrix(y_true, predictions, labels=[0, 1])
    metrics = {
        "accuracy": float(accuracy_score(y_true, predictions)),
        "precision": float(precision_score(y_true, predictions, zero_division=0)),
        "recall": float(recall_score(y_true, predictions, zero_division=0)),
        "f1": float(f1_score(y_true, predictions, zero_division=0)),
        "average_precision": float(average_precision_score(y_true, scores)),
        "roc_auc": float(roc_auc_score(y_true, scores)),
    }
    return metrics, matrix


def save_figures(
    y: pd.Series,
    comparison: pd.DataFrame,
    threshold_table: pd.DataFrame,
    chosen_threshold: float,
    y_test: pd.Series,
    test_scores: np.ndarray,
    matrix: np.ndarray,
) -> None:
    counts = y.value_counts().sort_index()
    labels = ["Legitimate (0)", "Fraud (1)"]
    values = [int(counts.get(0, 0)), int(counts.get(1, 0))]
    fig, ax = plt.subplots(figsize=(8, 5))
    bars = ax.bar(labels, values)
    ax.set_yscale("log")
    ax.set_ylabel("Transactions (log scale)")
    ax.set_title("Why fraud detection is an imbalanced classification problem")
    for bar, value in zip(bars, values):
        pct = value / len(y) * 100
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            value,
            f"{value:,}\n{pct:.3f}%",
            ha="center",
            va="bottom",
        )
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "class_imbalance.png", dpi=160)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(9, 5))
    ax.barh(comparison["model"], comparison["cv_average_precision"])
    ax.invert_yaxis()
    ax.set_xlim(0, 1)
    ax.set_xlabel("Mean 3-fold Average Precision")
    ax.set_title("Training-only model comparison")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "model_comparison.png", dpi=160)
    plt.close(fig)

    sampled = threshold_table.iloc[:: max(1, len(threshold_table) // 500)].copy()
    fig, ax = plt.subplots(figsize=(9, 5))
    ax.plot(sampled["threshold"], sampled["precision"], label="Precision")
    ax.plot(sampled["threshold"], sampled["recall"], label="Recall")
    ax.axvline(
        chosen_threshold,
        linestyle="--",
        label=f"Chosen threshold = {chosen_threshold:.3f}",
    )
    ax.set(
        xlabel="Fraud-score threshold",
        ylabel="Metric value",
        ylim=(0, 1.02),
    )
    ax.set_title("Validation-only threshold trade-off")
    ax.legend()
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "threshold_tradeoff.png", dpi=160)
    plt.close(fig)

    precision, recall, _ = precision_recall_curve(y_test, test_scores)
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.plot(recall, precision)
    ax.set(
        xlabel="Recall",
        ylabel="Precision",
        xlim=(0, 1),
        ylim=(0, 1.02),
    )
    ax.set_title("Final untouched-test precision-recall curve")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "precision_recall_curve.png", dpi=160)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(7, 5))
    ConfusionMatrixDisplay(
        matrix,
        display_labels=["Legitimate", "Fraud"],
    ).plot(ax=ax, colorbar=False, values_format="d")
    ax.set_title("Final untouched-test confusion matrix")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "confusion_matrix.png", dpi=160)
    plt.close(fig)


def save_demo_transactions(
    bundle: dict,
    X_test: pd.DataFrame,
    y_test: pd.Series,
) -> None:
    scores = bundle["model"].predict_proba(X_test)[:, 1]
    demo = X_test.copy()
    demo["historical_label"] = y_test.to_numpy()
    demo["fraud_score"] = scores

    fraud_examples = demo[demo["historical_label"] == 1].nlargest(6, "fraud_score")
    legitimate_examples = demo[demo["historical_label"] == 0].nsmallest(6, "fraud_score")
    selected = pd.concat(
        [fraud_examples, legitimate_examples],
        ignore_index=True,
    )
    selected.insert(
        0,
        "example_id",
        [f"TX-{index + 1:02d}" for index in range(len(selected))],
    )
    selected.to_csv(OUTPUT_DIR / "demo_transactions.csv", index=False)


def main() -> None:
    MODEL_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)

    X, y = load_data()
    X_train, X_val, X_test, y_train, y_val, y_test = split_data(X, y)

    print(
        f"Rows -> train: {len(X_train):,}, validation: {len(X_val):,}, "
        f"test: {len(X_test):,}"
    )
    print(
        f"Fraud rows -> train: {int(y_train.sum())}, validation: {int(y_val.sum())}, "
        f"test: {int(y_test.sum())}"
    )
    print(f"Always-legitimate accuracy: {(y == 0).mean():.6%}")

    comparison = compare_models(X_train, y_train)
    print("\nTraining-only model comparison:")
    print(comparison.to_string(index=False))

    winner_name = str(comparison.iloc[0]["model"])
    winner = clone(candidate_models()[winner_name])
    winner.fit(X_train, y_train)

    val_scores = winner.predict_proba(X_val)[:, 1]
    threshold, threshold_table = choose_threshold(y_val, val_scores)
    val_metrics, _ = metrics_at_threshold(y_val, val_scores, threshold)

    X_build = pd.concat([X_train, X_val], axis=0)
    y_build = pd.concat([y_train, y_val], axis=0)
    final_model = clone(candidate_models()[winner_name])
    final_model.fit(X_build, y_build)

    test_scores = final_model.predict_proba(X_test)[:, 1]
    test_metrics, matrix = metrics_at_threshold(y_test, test_scores, threshold)

    bundle = {
        "model": final_model,
        "threshold": threshold,
        "features": FEATURES,
        "selected_model": winner_name,
        "target_recall": TARGET_RECALL,
    }
    joblib.dump(bundle, MODEL_DIR / "fraud_detector.joblib")

    reloaded = joblib.load(MODEL_DIR / "fraud_detector.joblib")
    reload_scores = reloaded["model"].predict_proba(X_test.iloc[:25])[:, 1]
    if not np.allclose(reload_scores, test_scores[:25]):
        raise RuntimeError("Reloaded fraud scores differ from in-memory scores.")

    save_demo_transactions(bundle, X_test, y_test)
    save_figures(
        y,
        comparison,
        threshold_table,
        threshold,
        y_test,
        test_scores,
        matrix,
    )

    report = {
        "python": platform.python_version(),
        "scikit_learn": sklearn.__version__,
        "rows": int(len(X)),
        "fraud_rows": int(y.sum()),
        "fraud_rate": float(y.mean()),
        "features": FEATURES,
        "seed": SEED,
        "train_rows": int(len(X_train)),
        "validation_rows": int(len(X_val)),
        "test_rows": int(len(X_test)),
        "selected_model": winner_name,
        "selection_metric": "mean 3-fold average precision on training data",
        "target_validation_recall": TARGET_RECALL,
        "chosen_threshold": threshold,
        "validation_metrics": val_metrics,
        "test_metrics": test_metrics,
        "confusion_matrix": matrix.tolist(),
        "always_legitimate_accuracy": float((y_test == 0).mean()),
    }
    (OUTPUT_DIR / "metrics.json").write_text(
        json.dumps(report, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"\nSelected model: {winner_name}")
    print(f"Chosen validation threshold: {threshold:.6f}")
    print("Final untouched-test metrics:")
    for name, value in test_metrics.items():
        print(f"  {name}: {value:.6f}")
    print("Confusion matrix [[TN, FP], [FN, TP]]:")
    print(matrix)
    print("Saved: models/fraud_detector.joblib")


if __name__ == "__main__":
    main()
