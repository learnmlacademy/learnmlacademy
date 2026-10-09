"""Download official train.csv from Kaggle yourself before running."""
import pandas as pd
from src.detect import ROOT, train_and_evaluate

source = ROOT / "data" / "train.csv"
if not source.is_file():
    raise SystemExit("Missing data/train.csv; download it from the official Kaggle competition.")
report = train_and_evaluate(pd.read_csv(source), ROOT / "artifacts")
print("Selected on validation:", report["chosen_from_validation"])
print("Untouched test:", report["test"])
