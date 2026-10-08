import json
import pytest
from src.train import train


@pytest.fixture(scope="session")
def artifacts(tmp_path_factory):
    root = tmp_path_factory.mktemp("trusted-models")
    train("v1", root)
    return root


@pytest.fixture
def configuration(tmp_path):
    path = tmp_path / "model.json"
    path.write_text(json.dumps({"active_version": "v1"}), encoding="utf-8")
    return path


@pytest.fixture
def customer():
    return {"tenure": 12, "MonthlyCharges": 70.0, "TotalCharges": 840.0,
            "Contract": "Month-to-month", "PaymentMethod": "Electronic check",
            "InternetService": "Fiber optic", "OnlineSecurity": "No", "TechSupport": "No"}
