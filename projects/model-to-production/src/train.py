"""Offline-only training: python -m src.train --version v1."""
import argparse
from datetime import datetime, timezone
import hashlib
from io import BytesIO
from importlib.metadata import version as package_version
import json
from pathlib import Path
import platform
import tempfile

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from src.contract import ROOT, SEED, NUMERIC, CATEGORIES, FEATURES, DATA_PATH, DATA_SHA256, DATA_URL, DATA_REVISION, validate_version


def read_dataset(path: Path = DATA_PATH) -> pd.DataFrame:
    content = path.read_bytes()
    if hashlib.sha256(content).hexdigest() != DATA_SHA256:
        raise ValueError("Dataset checksum mismatch; run python -m scripts.prepare_data.")
    frame = pd.read_csv(BytesIO(content))
    if frame.shape != (7043, 21) or not frame.customerID.is_unique:
        raise ValueError("Expected the original 7,043-row, 21-column IBM sample.")
    frame["TotalCharges"] = pd.to_numeric(frame.TotalCharges.replace(r"^\s*$", np.nan, regex=True), errors="raise")
    if set(frame.Churn.unique()) != {"No", "Yes"}:
        raise ValueError("Unexpected target values.")
    for field, categories in CATEGORIES.items():
        if not set(frame[field].unique()).issubset(categories):
            raise ValueError(f"Unexpected category in {field}.")
    return frame


def split_data(frame):
    return train_test_split(frame[FEATURES], frame.Churn.eq("Yes").astype(int),
                            test_size=0.2, stratify=frame.Churn, random_state=SEED)


def make_pipeline(c=1.0):
    numeric = Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())])
    categorical = Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                            ("encode", OneHotEncoder(handle_unknown="ignore"))])
    prepare = ColumnTransformer([("numeric", numeric, NUMERIC), ("categorical", categorical, list(CATEGORIES))])
    return Pipeline([("prepare", prepare), ("classifier", LogisticRegression(C=c, max_iter=2000, random_state=SEED))])


def train(model_version="v1", models_dir: Path = ROOT / "models", c=1.0):
    validate_version(model_version)
    target = models_dir / model_version
    if target.exists():
        raise FileExistsError(f"{model_version} already exists. Versions are immutable; choose a new version.")
    X_train, X_test, y_train, y_test = split_data(read_dataset())
    pipeline = make_pipeline(c)
    pipeline.fit(X_train, y_train)
    probability = pipeline.predict_proba(X_test)[:, list(pipeline.classes_).index(1)]
    prediction = (probability >= 0.5).astype(int)
    metrics = {
        "accuracy": accuracy_score(y_test, prediction),
        "precision": precision_score(y_test, prediction, zero_division=0),
        "recall": recall_score(y_test, prediction, zero_division=0),
        "f1": f1_score(y_test, prediction, zero_division=0),
        "roc_auc": roc_auc_score(y_test, probability),
        "confusion_matrix": confusion_matrix(y_test, prediction, labels=[0, 1]).tolist(),
        "majority_accuracy": float((y_test == y_train.mode().iloc[0]).mean()),
    }
    metadata = {
        "schema_version": 1, "model_version": model_version,
        "trained_at": datetime.now(timezone.utc).isoformat(),
        "algorithm": "LogisticRegression", "parameters": {"C": c, "max_iter": 2000},
        "features": FEATURES, "categories": CATEGORIES, "threshold": 0.5,
        "training_rows": len(X_train), "test_rows": len(X_test), "seed": SEED,
        "dataset": {"id": "IBM Telco Customer Churn", "source": DATA_URL, "revision": DATA_REVISION, "sha256": DATA_SHA256},
        "metrics": metrics, "python_version": platform.python_version(),
        "packages": {name: package_version(name) for name in ["numpy", "pandas", "scikit-learn", "joblib"]},
    }
    models_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=".training-", dir=models_dir) as temporary:
        stage = Path(temporary)
        joblib.dump(pipeline, stage / "model.joblib")
        metadata["artifact_sha256"] = hashlib.sha256((stage / "model.joblib").read_bytes()).hexdigest()
        (stage / "metadata.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
        reloaded = joblib.load(stage / "model.joblib")  # Only this process's trusted output.
        np.testing.assert_allclose(reloaded.predict_proba(X_test), pipeline.predict_proba(X_test), rtol=0, atol=0)
        # Rename an already complete directory; readers never see a half-written version.
        stage.rename(target)
    print(json.dumps(metadata, indent=2))
    return metadata


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--version", default="v1")
    parser.add_argument("--c", type=float, default=1.0, help="Logistic Regression inverse regularization strength")
    arguments = parser.parse_args()
    if not np.isfinite(arguments.c) or arguments.c <= 0:
        parser.error("--c must be finite and positive")
    train(arguments.version, c=arguments.c)
