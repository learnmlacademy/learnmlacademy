import json
import shutil
from unittest.mock import patch
import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError
from api.main import create_app
from api.schemas import Customer
from src.contract import validate_version
from src.model_loader import load_version, load_active, ModelLoadError
from src.train import read_dataset, train


@pytest.mark.parametrize("version", ["../v1", "/v1", "v0", "v1/model.joblib", "", 1])
def test_unsafe_version_rejected(version):
    with pytest.raises(ValueError):
        validate_version(version)


def test_tampered_dataset_rejected(tmp_path):
    file = tmp_path / "data.csv"
    file.write_text("not the real dataset")
    with pytest.raises(ValueError, match="checksum"):
        read_dataset(file)


def test_failed_artifact_write_does_not_publish_partial_version(tmp_path):
    with patch("src.train.joblib.dump", side_effect=OSError("test write failure")):
        with pytest.raises(OSError):
            train("v1", tmp_path)
    assert not (tmp_path / "v1").exists()
    assert not list(tmp_path.iterdir())


@pytest.mark.parametrize("change", ["version", "features", "packages", "timestamp", "metrics", "hash", "missing"])
def test_invalid_artifact_rejected_before_unpickling(artifacts, tmp_path, change):
    shutil.copytree(artifacts / "v1", tmp_path / "v1")
    path = tmp_path / "v1" / "metadata.json"
    metadata = json.loads(path.read_text())
    if change == "version": metadata["model_version"] = "v2"
    elif change == "features": metadata["features"] = ["customerID"]
    elif change == "packages": metadata["packages"]["scikit-learn"] = "0.0.0"
    elif change == "timestamp": metadata["trained_at"] = "not a date"
    elif change == "metrics": metadata["metrics"]["accuracy"] = 2
    elif change == "hash": metadata["artifact_sha256"] = "0" * 64
    path.write_text(json.dumps(metadata))
    if change == "missing": path.unlink()
    with patch("src.model_loader.joblib.load") as deserialize:
        with pytest.raises(ModelLoadError):
            load_version("v1", tmp_path)
        deserialize.assert_not_called()


def test_invalid_config_rejected(configuration, artifacts):
    configuration.write_text('{"active_version": "../outside"}')
    with pytest.raises(ModelLoadError):
        load_active(configuration, artifacts)


def test_nonfinite_and_bool_charges_rejected(customer):
    for value in [float("nan"), float("inf"), True]:
        with pytest.raises(ValidationError):
            Customer(**{**customer, "MonthlyCharges": value})


def test_inference_never_fits_and_logs_no_customer_values(artifacts, configuration, customer, caplog):
    with TestClient(create_app(configuration, artifacts)) as client:
        with patch("sklearn.pipeline.Pipeline.fit", side_effect=AssertionError("fit during inference")):
            assert client.post("/predict", json=customer).status_code == 200
            assert client.post("/predict", json={**customer, "Contract": "private_value"}).status_code == 422
        with patch("api.main.predict", side_effect=RuntimeError("sensitive internal details")):
            response = client.post("/predict", json=customer)
            assert response.status_code == 500
            assert "sensitive" not in response.text
    messages = [record.getMessage() for record in caplog.records if record.name == "churn_service"]
    entries = [json.loads(message) for message in messages]
    assert any(e["event"] == "inference" and e["status"] == "ok" and e["inference_latency_ms"] >= 0 for e in entries)
    assert any(e["event"] == "request_validation" for e in entries)
    assert not any("private_value" in message or "MonthlyCharges" in message or "sensitive" in message for message in messages)
