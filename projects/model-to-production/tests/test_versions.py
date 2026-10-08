import json
from fastapi.testclient import TestClient
import pytest
from api.main import create_app
from scripts.switch_model import switch
from src.model_loader import ModelLoadError
from src.train import train


def test_switch_requires_restart_and_rollback_restores_predictions(artifacts, configuration, customer):
    train("v2", artifacts, c=0.5)
    with TestClient(create_app(configuration, artifacts)) as old_worker:
        first = old_worker.post("/predict", json=customer).json()
        switch("v2", configuration, artifacts)
        assert old_worker.get("/health").json()["active_version"] == "v1"
        with TestClient(create_app(configuration, artifacts)) as new_worker:
            assert new_worker.get("/model-info").json()["active_version"] == "v2"
            second = new_worker.post("/predict", json=customer).json()
            assert second["model_version"] == "v2"
            assert second["churn_probability"] != first["churn_probability"]
    switch("v1", configuration, artifacts)
    with TestClient(create_app(configuration, artifacts)) as rollback_worker:
        third = rollback_worker.post("/predict", json=customer).json()
        assert third["model_version"] == "v1"
        assert third["churn_probability"] == first["churn_probability"]
        assert third["predicted_class"] == first["predicted_class"]


def test_failed_switch_keeps_existing_configuration(artifacts, configuration):
    before = configuration.read_bytes()
    with pytest.raises(ModelLoadError):
        switch("v999", configuration, artifacts)
    assert configuration.read_bytes() == before
    assert not list(configuration.parent.glob("tmp*"))
