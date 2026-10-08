"""Exercise genuine API lifespans with v1, v2 and rollback, without a TCP listener."""
import json
from pathlib import Path
import tempfile
from fastapi.testclient import TestClient
from api.main import create_app
from src.contract import ROOT
from scripts.switch_model import switch


def verify():
    customer = json.loads((ROOT / "examples" / "customer.json").read_text())
    results = []
    # A disposable config avoids changing a running service's real operator config.
    with tempfile.TemporaryDirectory() as directory:
        config = Path(directory) / "model.json"
        for version in ["v1", "v2", "v1"]:
            switch(version, config)
            with TestClient(create_app(config)) as client:
                assert client.get("/health").json()["active_version"] == version
                assert client.get("/model-info").json()["active_version"] == version
                response = client.post("/predict", json=customer)
                assert response.status_code == 200
                prediction = response.json()
                assert prediction["model_version"] == version
                results.append(prediction)
    assert results[0]["churn_probability"] == results[2]["churn_probability"]
    assert results[0]["predicted_class"] == results[2]["predicted_class"]
    assert results[0]["churn_probability"] != results[1]["churn_probability"]
    reports = ROOT / "reports"
    reports.mkdir(exist_ok=True)
    (reports / "version-switching.json").write_text(json.dumps(results, indent=2) + "\n")
    print(json.dumps({"status": "pass", "sequence": ["v1", "v2", "v1"], "results": results}, indent=2))
    return results


if __name__ == "__main__":
    verify()
