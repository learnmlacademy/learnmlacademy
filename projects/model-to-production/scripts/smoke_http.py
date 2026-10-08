"""Real TCP HTTP checks for the CI container (not a mocked ASGI transport)."""
import argparse
import json
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from src.contract import ROOT


def call(base, route, payload=None):
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    request = Request(base + route, data=body, headers={"Content-Type": "application/json"})
    try:
        with urlopen(request, timeout=5) as response:
            return response.status, json.load(response)
    except HTTPError as error:
        return error.code, json.load(error)


def verify(base, expected_version):
    for attempt in range(30):
        try:
            status, health = call(base, "/health")
            if status == 200:
                break
        except (URLError, TimeoutError, ConnectionError):
            pass
        time.sleep(1)
    else:
        raise RuntimeError("API health endpoint did not become ready in 30 attempts.")
    assert health == {"status": "ok", "model_loaded": True, "active_version": expected_version}
    status, info = call(base, "/model-info")
    assert status == 200 and info["active_version"] == expected_version
    customer = json.loads((ROOT / "examples" / "customer.json").read_text())
    status, prediction = call(base, "/predict", customer)
    assert status == 200 and prediction["model_version"] == expected_version
    assert 0 <= prediction["churn_probability"] <= 1 and prediction["inference_latency_ms"] >= 0
    status, invalid = call(base, "/predict", {**customer, "MonthlyCharges": -1})
    assert status == 422 and invalid["detail"]
    with urlopen(base + "/docs", timeout=5) as response:
        assert response.status == 200 and b"swagger" in response.read().lower()
    status, schema = call(base, "/openapi.json")
    assert status == 200 and all(path in schema["paths"] for path in ["/health", "/model-info", "/predict"])
    result = {"status": "pass", "version": expected_version, "transport": "real HTTP to Docker container",
              "health": health, "prediction": prediction, "invalid_request_status": 422}
    print(json.dumps(result, indent=2))
    reports = ROOT / "reports"
    reports.mkdir(exist_ok=True)
    (reports / f"docker-{expected_version}.json").write_text(json.dumps(result, indent=2) + "\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:8000")
    parser.add_argument("--version", default="v1")
    args = parser.parse_args()
    verify(args.url, args.version)
