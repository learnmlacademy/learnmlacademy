from __future__ import annotations

import json
import re
from pathlib import Path

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Lasso, LinearRegression, Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import GridSearchCV, KFold, cross_validate, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from xgboost import XGBRegressor

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "data" / "ames_housing.parquet"
MODELS_DIR = PROJECT_ROOT / "models"
OUTPUTS_DIR = PROJECT_ROOT / "outputs"

RANDOM_STATE = 42

RAW_NUMERIC_FEATURES = [
    "gr_liv_area",
    "garage_cars",
    "garage_area",
    "total_bsmt_sf",
    "full_bath",
    "half_bath",
    "bedroom_abv_gr",
    "fireplaces",
    "year_built",
    "year_remod_add",
    "year_sold",
    "lot_area",
]
RAW_CATEGORICAL_FEATURES = [
    "neighborhood",
    "house_style",
    "kitchen_qual",
    "overall_qual",
]
MODEL_NUMERIC_FEATURES = [
    "gr_liv_area",
    "garage_cars",
    "garage_area",
    "total_bsmt_sf",
    "bedroom_abv_gr",
    "fireplaces",
    "lot_area",
    "house_age_at_sale",
    "years_since_remodel",
    "total_bathrooms",
]
MODEL_CATEGORICAL_FEATURES = RAW_CATEGORICAL_FEATURES
TARGET = "sale_price"


def normalize_column_name(name: str) -> str:
    value = str(name).strip()
    value = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", value)
    value = value.replace("/", "_")
    value = re.sub(r"[^A-Za-z0-9]+", "_", value)
    return value.strip("_").lower()


def normalize_columns(frame: pd.DataFrame) -> pd.DataFrame:
    normalized = frame.copy()
    normalized.columns = [normalize_column_name(column) for column in normalized.columns]
    return normalized


def build_model_frame(frame: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
    frame = normalize_columns(frame)

    required = set(RAW_NUMERIC_FEATURES + RAW_CATEGORICAL_FEATURES + [TARGET])
    missing = sorted(required.difference(frame.columns))
    if missing:
        raise KeyError(
            "The dataset does not contain the expected columns: " + ", ".join(missing)
        )

    working = frame[list(required)].copy()

    for column in RAW_NUMERIC_FEATURES + [TARGET]:
        working[column] = pd.to_numeric(working[column], errors="coerce")

    for column in RAW_CATEGORICAL_FEATURES:
        working[column] = working[column].astype("object")

    working["house_age_at_sale"] = working["year_sold"] - working["year_built"]
    working["years_since_remodel"] = working["year_sold"] - working["year_remod_add"]
    working["total_bathrooms"] = working["full_bath"] + (0.5 * working["half_bath"])

    features = working[MODEL_NUMERIC_FEATURES + MODEL_CATEGORICAL_FEATURES]
    target = working[TARGET]
    return features, target


def make_preprocessor(scale_numeric: bool) -> ColumnTransformer:
    numeric_steps = [("imputer", SimpleImputer(strategy="median"))]
    if scale_numeric:
        numeric_steps.append(("scaler", StandardScaler()))

    numeric_pipeline = Pipeline(numeric_steps)
    categorical_pipeline = Pipeline(
        [
            ("imputer", SimpleImputer(strategy="most_frequent")),
            (
                "onehot",
                OneHotEncoder(handle_unknown="ignore", sparse_output=False),
            ),
        ]
    )

    return ColumnTransformer(
        [
            ("numeric", numeric_pipeline, MODEL_NUMERIC_FEATURES),
            ("categorical", categorical_pipeline, MODEL_CATEGORICAL_FEATURES),
        ],
        remainder="drop",
    )


def make_pipeline(estimator, scale_numeric: bool) -> Pipeline:
    return Pipeline(
        [
            ("prepare", make_preprocessor(scale_numeric=scale_numeric)),
            ("model", estimator),
        ]
    )


def candidate_models() -> dict[str, Pipeline]:
    return {
        "Linear Regression": make_pipeline(LinearRegression(), scale_numeric=True),
        "Ridge": make_pipeline(Ridge(alpha=10.0), scale_numeric=True),
        "Lasso": make_pipeline(
            Lasso(alpha=250.0, max_iter=20000, random_state=RANDOM_STATE),
            scale_numeric=True,
        ),
        "Random Forest": make_pipeline(
            RandomForestRegressor(
                n_estimators=350,
                min_samples_leaf=1,
                random_state=RANDOM_STATE,
                n_jobs=-1,
            ),
            scale_numeric=False,
        ),
        "XGBoost": make_pipeline(
            XGBRegressor(
                objective="reg:squarederror",
                n_estimators=400,
                learning_rate=0.05,
                max_depth=3,
                subsample=0.9,
                colsample_bytree=0.9,
                random_state=RANDOM_STATE,
                n_jobs=2,
            ),
            scale_numeric=False,
        ),
    }


def compare_models(
    models: dict[str, Pipeline],
    X_train: pd.DataFrame,
    y_train: pd.Series,
) -> pd.DataFrame:
    cv = KFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
    scoring = {
        "rmse": "neg_root_mean_squared_error",
        "mae": "neg_mean_absolute_error",
        "r2": "r2",
    }

    rows = []
    for name, pipeline in models.items():
        print(f"Cross-validating {name}...")
        scores = cross_validate(
            pipeline,
            X_train,
            y_train,
            cv=cv,
            scoring=scoring,
            n_jobs=1,
            error_score="raise",
        )
        rows.append(
            {
                "model": name,
                "cv_rmse_mean": -float(np.mean(scores["test_rmse"])),
                "cv_rmse_std": float(np.std(-scores["test_rmse"])),
                "cv_mae_mean": -float(np.mean(scores["test_mae"])),
                "cv_r2_mean": float(np.mean(scores["test_r2"])),
            }
        )

    return pd.DataFrame(rows).sort_values("cv_rmse_mean").reset_index(drop=True)


def tuning_grid(model_name: str) -> dict[str, list]:
    if model_name == "Ridge":
        return {"model__alpha": [0.1, 1.0, 10.0, 50.0, 100.0]}
    if model_name == "Lasso":
        return {"model__alpha": [50.0, 100.0, 250.0, 500.0, 1000.0]}
    if model_name == "Random Forest":
        return {
            "model__n_estimators": [300, 500],
            "model__max_features": ["sqrt", 0.8],
            "model__min_samples_leaf": [1, 2],
        }
    if model_name == "XGBoost":
        return {
            "model__n_estimators": [250, 450],
            "model__max_depth": [2, 3],
            "model__learning_rate": [0.03, 0.06],
        }
    return {}


def build_metadata(
    raw_frame: pd.DataFrame,
    winning_model: str,
    final_metrics: dict[str, float],
) -> dict:
    raw_frame = normalize_columns(raw_frame)

    numeric_defaults = {}
    for column in RAW_NUMERIC_FEATURES:
        series = pd.to_numeric(raw_frame[column], errors="coerce").dropna()
        numeric_defaults[column] = {
            "min": float(series.quantile(0.01)),
            "max": float(series.quantile(0.99)),
            "median": float(series.median()),
        }

    categorical_options = {}
    for column in RAW_CATEGORICAL_FEATURES:
        values = (
            raw_frame[column]
            .dropna()
            .astype(str)
            .str.strip()
            .replace({"": np.nan})
            .dropna()
            .value_counts()
        )
        categorical_options[column] = values.index.tolist()

    return {
        "dataset": "Ames Housing (OpenML dataset 43926)",
        "dataset_page": "https://www.openml.org/search?id=43926&sort=runs&type=data",
        "winning_model": winning_model,
        "final_metrics": final_metrics,
        "raw_numeric_features": RAW_NUMERIC_FEATURES,
        "raw_categorical_features": RAW_CATEGORICAL_FEATURES,
        "numeric_defaults": numeric_defaults,
        "categorical_options": categorical_options,
    }



def save_training_eda(X_train: pd.DataFrame, y_train: pd.Series) -> None:
    """Create a training-only chart that makes the regression problem intuitive."""
    area = X_train["gr_liv_area"].astype(float)
    price = y_train.astype(float)

    slope, intercept = np.polyfit(area, price, 1)
    x_line = np.linspace(float(area.min()), float(area.max()), 200)
    y_line = slope * x_line + intercept

    fig, ax = plt.subplots(figsize=(8, 5.5))
    ax.scatter(area, price, alpha=0.35)
    ax.plot(x_line, y_line, linewidth=2)
    ax.set_xlabel("Above-ground living area (square feet)")
    ax.set_ylabel("Historical sale price ($)")
    ax.set_title("Training-only pattern: living area vs sale price")
    fig.tight_layout()
    fig.savefig(OUTPUTS_DIR / "living_area_vs_sale_price.png", dpi=160)
    plt.close(fig)


def main() -> None:
    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"{DATA_PATH} does not exist. Run: python download_data.py"
        )

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)

    raw = pd.read_parquet(DATA_PATH)
    X, y = build_model_frame(raw)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=RANDOM_STATE,
    )

    save_training_eda(X_train, y_train)

    models = candidate_models()
    comparison = compare_models(models, X_train, y_train)
    comparison.to_csv(OUTPUTS_DIR / "model_comparison.csv", index=False)

    print("\nModel comparison (training data only, 5-fold CV):")
    print(comparison.to_string(index=False))

    winning_name = str(comparison.iloc[0]["model"])
    winning_pipeline = models[winning_name]
    grid = tuning_grid(winning_name)

    if grid:
        print(f"\nTuning {winning_name} using training data only...")
        search = GridSearchCV(
            estimator=winning_pipeline,
            param_grid=grid,
            scoring="neg_root_mean_squared_error",
            cv=KFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE),
            n_jobs=1,
            refit=True,
        )
        search.fit(X_train, y_train)
        final_pipeline = search.best_estimator_
        best_params = search.best_params_
        best_cv_rmse = -float(search.best_score_)
    else:
        print(f"\n{winning_name} has no tuning grid in this beginner project.")
        final_pipeline = winning_pipeline.fit(X_train, y_train)
        best_params = {}
        best_cv_rmse = float(comparison.iloc[0]["cv_rmse_mean"])

    predictions = final_pipeline.predict(X_test)

    metrics = {
        "mae": float(mean_absolute_error(y_test, predictions)),
        "rmse": float(mean_squared_error(y_test, predictions) ** 0.5),
        "r2": float(r2_score(y_test, predictions)),
        "best_cv_rmse": best_cv_rmse,
    }

    final_report = {
        "winning_model": winning_name,
        "best_params": best_params,
        "test_metrics": metrics,
        "train_rows": int(len(X_train)),
        "test_rows": int(len(X_test)),
        "random_state": RANDOM_STATE,
    }

    with (OUTPUTS_DIR / "final_metrics.json").open("w", encoding="utf-8") as handle:
        json.dump(final_report, handle, indent=2)

    prediction_examples = pd.DataFrame(
        {
            "actual_sale_price": y_test.to_numpy()[:25],
            "predicted_sale_price": predictions[:25],
            "absolute_error": np.abs(y_test.to_numpy()[:25] - predictions[:25]),
        }
    )
    prediction_examples.to_csv(OUTPUTS_DIR / "prediction_examples.csv", index=False)

    plt.figure(figsize=(7, 6))
    plt.scatter(y_test, predictions, alpha=0.55)
    low = float(min(y_test.min(), predictions.min()))
    high = float(max(y_test.max(), predictions.max()))
    plt.plot([low, high], [low, high], linestyle="--")
    plt.xlabel("Actual sale price ($)")
    plt.ylabel("Predicted sale price ($)")
    plt.title(f"Actual vs Predicted — {winning_name}")
    plt.tight_layout()
    plt.savefig(OUTPUTS_DIR / "actual_vs_predicted.png", dpi=160)
    plt.close()

    joblib.dump(final_pipeline, MODELS_DIR / "house_price_pipeline.joblib")

    metadata = build_metadata(raw, winning_name, metrics)
    with (MODELS_DIR / "app_metadata.json").open("w", encoding="utf-8") as handle:
        json.dump(metadata, handle, indent=2)

    reloaded = joblib.load(MODELS_DIR / "house_price_pipeline.joblib")
    reload_prediction = reloaded.predict(X_test.iloc[[0]])[0]

    print("\nFinal holdout evaluation (used once after model selection/tuning):")
    print("MAE:  $" + f"{metrics['mae']:,.0f}")
    print("RMSE: $" + f"{metrics['rmse']:,.0f}")
    print(f"R²:   {metrics['r2']:.3f}")
    print("\nSaved model:", MODELS_DIR / "house_price_pipeline.joblib")
    print("Reload check prediction: $" + f"{reload_prediction:,.0f}")


if __name__ == "__main__":
    main()
