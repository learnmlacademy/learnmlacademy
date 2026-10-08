from fastapi.testclient import TestClient
import pytest
from api.main import create_app
from src.model_loader import ModelLoadError


def test_health_info_and_real_prediction(artifacts, configuration, customer):
    with TestClient(create_app(configuration, artifacts)) as client:
        assert client.get("/health").json() == {"status": "ok", "model_loaded": True, "active_version": "v1"}
        info = client.get("/model-info").json()
        assert info["algorithm"] == "LogisticRegression"
        assert "TotalCharges" in info["feature_schema"]["required"]
        response = client.post("/predict", json=customer)
        assert response.status_code == 200
        result = response.json()
        assert result["model_version"] == "v1"
        assert result["predicted_class"] in {"stay", "churn"}
        assert 0 <= result["churn_probability"] <= 1
        assert result["inference_latency_ms"] >= 0
        assert client.post("/predict", json={**customer, "TotalCharges": None}).status_code == 200


@pytest.mark.parametrize("field,value", [
    ("tenure", -1), ("tenure", 121), ("tenure", "12"), ("tenure", True),
    ("MonthlyCharges", -1), ("MonthlyCharges", 501), ("MonthlyCharges", "70"),
    ("TotalCharges", -1), ("Contract", "Forever"), ("PaymentMethod", "cash"),
    ("InternetService", "Unknown"), ("OnlineSecurity", "Maybe"), ("TechSupport", "No internet service"),
])
def test_invalid_values_rejected(artifacts, configuration, customer, field, value):
    with TestClient(create_app(configuration, artifacts)) as client:
        response = client.post("/predict", json={**customer, field: value})
        assert response.status_code == 422
        assert response.json()["detail"]


def test_missing_and_extra_fields_rejected(artifacts, configuration, customer):
    with TestClient(create_app(configuration, artifacts)) as client:
        del customer["tenure"]
        assert client.post("/predict", json=customer).status_code == 422
        assert client.post("/predict", json={**customer, "tenure": 12, "customer_id": "private"}).status_code == 422


def test_missing_model_fails_startup(configuration, tmp_path):
    with pytest.raises(ModelLoadError, match="missing"):
        with TestClient(create_app(configuration, tmp_path)):
            pass
