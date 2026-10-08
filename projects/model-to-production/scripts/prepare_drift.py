"""Save a training-only reference and two deterministic educational batches."""
import argparse
import json
from src.contract import ROOT, FEATURES, validate_version
from src.train import read_dataset, split_data
from src.drift import reference_statistics, check_drift
from src.model_loader import load_version


def prepare(version="v1"):
    validate_version(version)
    loaded = load_version(version)
    X_train, _, _, _ = split_data(read_dataset())
    # The reference comes from the identical training split, not the test set.
    assert len(X_train) == loaded.metadata.training_rows
    reference = reference_statistics(X_train)
    reference["model_version"] = version
    directory = ROOT / "models" / version
    path = directory / "reference.json"
    encoded = json.dumps(reference, indent=2) + "\n"
    if path.exists() and path.read_text() != encoded:
        raise ValueError("Refusing to replace a different existing reference.")
    path.write_text(encoded, encoding="utf-8")
    normal = X_train.sample(n=1000, random_state=73).reset_index(drop=True)
    shifted = normal.copy()
    shifted["MonthlyCharges"] = (shifted.MonthlyCharges + 80).clip(upper=500)
    shifted["Contract"] = "Month-to-month"
    # Keep numeric mean/std checks simple; examples do not claim to simulate all drift.
    for name, frame in [("normal", normal), ("shifted", shifted)]:
        frame[FEATURES].to_csv(ROOT / "data" / f"{name}_batch.csv", index=False)
        result = check_drift(frame[FEATURES], reference)
        print(name, json.dumps(result))
    return reference


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--version", default="v1")
    prepare(parser.parse_args().version)
