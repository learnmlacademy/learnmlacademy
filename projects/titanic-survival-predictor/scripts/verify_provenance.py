from __future__ import annotations

import hashlib
import json
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = ROOT / "outputs"
NOTEBOOK = ROOT / "notebooks" / "01_titanic_exploration.ipynb"
DATA = ROOT / "data" / "train.csv"
MODEL = ROOT / "models" / "titanic_pipeline.joblib"

EXPECTED_SHA256 = "4a437fde05fe5264e1701a7387ac6fb75393772ba38bb2c9c566405af5af4bd7"
EXPECTED_MODELS = {
    "Logistic Regression",
    "K-Nearest Neighbors",
    "Support Vector Machine",
    "Decision Tree",
    "Random Forest",
}


def main() -> None:
    metrics_path = OUTPUTS / "metrics.json"
    comparison_path = OUTPUTS / "model_comparison.csv"

    for path in (metrics_path, comparison_path, NOTEBOOK, DATA, MODEL):
        if not path.is_file():
            raise AssertionError(f"Missing verification artifact: {path}")

    digest = hashlib.sha256(DATA.read_bytes()).hexdigest()
    if digest != EXPECTED_SHA256:
        raise AssertionError(f"Unexpected Titanic verification dataset fingerprint: {digest}")

    report = json.loads(metrics_path.read_text(encoding="utf-8"))
    comparison = pd.read_csv(comparison_path)

    assert report["data_sha256"] == EXPECTED_SHA256
    assert report["training_rows"] == 712
    assert report["test_rows"] == 179
    assert report["training_rows"] + report["test_rows"] == 891
    assert report["selected_model"] == "Random Forest"
    assert set(comparison["model"]) == EXPECTED_MODELS
    assert len(comparison) == 5
    assert comparison.iloc[0]["model"] == "Random Forest"
    assert comparison["f1"].is_monotonic_decreasing

    matrix = report["confusion_matrix"]
    assert matrix == [[100, 10], [24, 45]]
    assert sum(sum(row) for row in matrix) == 179

    expected_metrics = {
        "accuracy": 0.8100558659217877,
        "precision": 0.8181818181818182,
        "recall": 0.6521739130434783,
        "f1": 0.7258064516129032,
    }
    for name, expected in expected_metrics.items():
        actual = float(report["test_metrics"][name])
        if abs(actual - expected) > 1e-12:
            raise AssertionError(f"Reference {name} changed: expected {expected}, got {actual}")

    notebook = json.loads(NOTEBOOK.read_text(encoding="utf-8"))
    code_cells = [cell for cell in notebook.get("cells", []) if cell.get("cell_type") == "code"]
    if not code_cells:
        raise AssertionError("Notebook has no code cells")
    for index, cell in enumerate(code_cells, start=1):
        if cell.get("execution_count") is None:
            raise AssertionError(f"Notebook code cell {index} was not executed")
        errors = [out for out in cell.get("outputs", []) if out.get("output_type") == "error"]
        if errors:
            raise AssertionError(f"Notebook code cell {index} contains an execution error")

    print("Titanic runtime provenance, notebook, model comparison and final metrics checks passed.")


if __name__ == "__main__":
    main()
