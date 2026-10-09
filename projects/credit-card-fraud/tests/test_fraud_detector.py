from pathlib import Path
import importlib.util
import json

import joblib
import numpy as np
import pandas as pd
import pytest

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "creditcard.parquet"
MODEL = ROOT / "models" / "fraud_detector.joblib"
METRICS = ROOT / "outputs" / "metrics.json"
DEMOS = ROOT / "outputs" / "demo_transactions.csv"

spec = importlib.util.spec_from_file_location(
    "fraud_train",
    ROOT / "src" / "train_model.py",
)
train = importlib.util.module_from_spec(spec)
spec.loader.exec_module(train)


def test_dataset_contract():
    frame = pd.read_parquet(DATA)
    assert frame.shape == (284_807, 31)
    assert list(frame.columns) == train.FEATURES + [train.TARGET]
    assert int(frame["Class"].astype(int).sum()) == 492
    assert set(frame["Class"].astype(int).unique()) == {0, 1}


def test_three_way_split_is_disjoint_and_stratified():
    X, y = train.load_data()
    X_train, X_val, X_test, y_train, y_val, y_test = train.split_data(X, y)
    assert len(X_train) + len(X_val) + len(X_test) == len(X)
    assert set(X_train.index).isdisjoint(X_val.index)
    assert set(X_train.index).isdisjoint(X_test.index)
    assert set(X_val.index).isdisjoint(X_test.index)
    for part in [y_train, y_val, y_test]:
        assert 0 < int(part.sum()) < len(part)
        assert abs(float(part.mean()) - float(y.mean())) < 0.0005


def test_candidates_include_imbalance_strategies():
    candidates = train.candidate_models()
    assert set(candidates) == {
        "Logistic Regression",
        "Class-weighted Logistic Regression",
        "SMOTE + Logistic Regression",
        "Class-weighted Random Forest",
    }


def test_threshold_selection_meets_target_when_feasible():
    y = pd.Series([0, 0, 0, 1, 1])
    scores = np.array([0.05, 0.10, 0.20, 0.60, 0.90])
    threshold, table = train.choose_threshold(y, scores, target_recall=1.0)
    row = table.loc[np.isclose(table["threshold"], threshold)].iloc[0]
    assert row["recall"] >= 1.0
    assert 0 <= threshold <= 1


def test_saved_artifact_and_report_exist():
    assert MODEL.is_file()
    assert METRICS.is_file()
    bundle = joblib.load(MODEL)
    report = json.loads(METRICS.read_text(encoding="utf-8"))
    assert 0 < float(bundle["threshold"]) < 1
    assert bundle["selected_model"] == report["selected_model"]
    assert "same model" in report["threshold_model_consistency"].lower()
    assert report["selection_metric"].startswith("mean 3-fold average precision")


def test_final_metrics_are_probability_aware():
    report = json.loads(METRICS.read_text(encoding="utf-8"))
    metrics = report["test_metrics"]
    assert 0 <= metrics["average_precision"] <= 1
    assert 0 <= metrics["roc_auc"] <= 1
    assert 0 <= metrics["precision"] <= 1
    assert 0 <= metrics["recall"] <= 1
    assert report["test_rows"] > 40_000


def test_demo_transactions_cover_both_historical_classes():
    demos = pd.read_csv(DEMOS)
    assert len(demos) == 12
    assert set(demos["historical_label"].astype(int)) == {0, 1}
    assert set(train.FEATURES).issubset(demos.columns)
    assert set(demos["result_category"]).issubset({"TP", "FP", "FN", "TN"})
    assert (demos["result_category"] == "FN").any(), "The official holdout includes missed fraud; show one"
    assert (demos["result_category"] == "FP").any(), "The official holdout includes false alarms; show one"
    assert demos.iloc[0]["result_category"] == "TP"
    assert demos.iloc[6]["result_category"] == "TN"


@pytest.mark.parametrize("example_index", [0, 6])
def test_reloaded_model_scores_demo_rows(example_index):
    bundle = joblib.load(MODEL)
    demos = pd.read_csv(DEMOS)
    row = demos.iloc[[example_index]][bundle["features"]]
    score = float(bundle["model"].predict_proba(row)[0, 1])
    assert 0 <= score <= 1
