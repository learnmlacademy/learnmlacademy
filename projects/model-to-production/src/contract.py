"""One explicit feature contract shared by training and inference."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SEED = 42
NUMERIC = ["tenure", "MonthlyCharges", "TotalCharges"]
CATEGORIES = {
    "Contract": ["Month-to-month", "One year", "Two year"],
    "PaymentMethod": ["Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"],
    "InternetService": ["DSL", "Fiber optic", "No"],
    "OnlineSecurity": ["Yes", "No", "No internet service"],
    "TechSupport": ["Yes", "No", "No internet service"],
}
FEATURES = NUMERIC + list(CATEGORIES)
DATA_REVISION = "d5371f5d83a446ad5673cbcca3b814b926491f8a"
DATA_URL = f"https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/{DATA_REVISION}/data/Telco-Customer-Churn.csv"
DATA_SHA256 = "16320c9c1ec72448db59aa0a26a0b95401046bef5d02fd3aeb906448e3055e91"
DATA_PATH = ROOT / "data" / "telco.csv"


def validate_version(version: str) -> str:
    if not isinstance(version, str) or not re.fullmatch(r"v[1-9][0-9]{0,3}", version):
        raise ValueError("Version must look like v1 or v2, not a path.")
    return version
