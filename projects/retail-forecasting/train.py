"""Train on real official data: python download_data.py && python train.py."""
import pandas as pd
from src.forecast import ROOT, daily_revenue, train_and_evaluate

source = ROOT / "data" / "Online Retail.xlsx"
if not source.is_file():
    raise SystemExit("Run python download_data.py first.")
df = pd.read_excel(source, engine="openpyxl")
if len(df) != 541_909:
    raise SystemExit(f"Official dataset expected 541909 rows, found {len(df)}")
result = train_and_evaluate(daily_revenue(df), ROOT / "artifacts")
print("Selected model:", result["selected_model"])
print("Final untouched holdout:", result["test_selected"])
