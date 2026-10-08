"""Educational feature-shift checks, not a retraining or performance decision."""
import argparse
import json
from pathlib import Path
import numpy as np
import pandas as pd
from src.contract import NUMERIC, CATEGORIES, FEATURES, ROOT, validate_version


def reference_statistics(training: pd.DataFrame):
    return {
        "schema_version": 1, "training_rows": len(training),
        "numeric": {name: {"mean": float(training[name].mean()),
                           "std": float(training[name].std(ddof=0)),
                           "missing_fraction": float(training[name].isna().mean())} for name in NUMERIC},
        "categorical": {name: {str(k): float(v) for k, v in training[name].value_counts(normalize=True).items()}
                        for name in CATEGORIES},
    }


def check_drift(batch: pd.DataFrame, reference: dict):
    if len(batch) < 50:
        raise ValueError("Use at least 50 rows; tiny batches make distribution comparisons unstable.")
    if batch.columns.tolist() != FEATURES or reference.get("schema_version") != 1:
        raise ValueError("Batch/reference feature contract mismatch.")
    results = {}
    for name in NUMERIC:
        values = pd.to_numeric(batch[name], errors="raise")
        nonmissing = values.dropna().to_numpy(dtype=float)
        if len(nonmissing) == 0 or not np.isfinite(nonmissing).all():
            raise ValueError(f"{name} needs finite observed values.")
        baseline = reference["numeric"][name]
        change = abs(float(values.mean()) - baseline["mean"])
        # Constant-reference columns use an explicit equality test, not division by zero.
        scale = baseline["std"]
        shift = change / scale if scale > 0 else (0.0 if change == 0 else None)
        missing_change = abs(float(values.isna().mean()) - baseline["missing_fraction"])
        status = "DRIFT DETECTED" if shift is None or shift >= 0.5 or missing_change >= 0.1 else "OK"
        results[name] = {"status": status, "absolute_mean_shift_in_training_std": shift,
                         "missing_fraction_change": missing_change}
    for name, categories in CATEGORIES.items():
        if batch[name].isna().any() or not set(batch[name]).issubset(categories):
            raise ValueError(f"Unexpected or missing category in {name}.")
        observed = batch[name].value_counts(normalize=True).to_dict()
        expected = reference["categorical"][name]
        total_variation = 0.5 * sum(abs(observed.get(category, 0) - expected.get(category, 0)) for category in categories)
        results[name] = {"status": "WARNING" if total_variation >= 0.15 else "OK",
                         "total_variation_distance": total_variation}
    return {"rows": len(batch), "features": results,
            "action": "Investigate data quality and labeled performance; drift alone does not justify retraining."}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--version", default="v1")
    parser.add_argument("--batch", type=Path, required=True)
    args = parser.parse_args()
    validate_version(args.version)
    reference = json.loads((ROOT / "models" / args.version / "reference.json").read_text())
    result = check_drift(pd.read_csv(args.batch)[FEATURES], reference)
    for name, item in result["features"].items():
        print(f"{name}: {item['status']}")
    print(result["action"])


if __name__ == "__main__":
    main()
