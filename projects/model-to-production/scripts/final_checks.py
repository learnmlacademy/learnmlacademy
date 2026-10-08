"""Deterministic engineering contract checks, no visual/content audit."""
import json
import subprocess
import sys
from src.contract import ROOT, DATA_SHA256
from src.model_loader import load_version


def main():
    loaded = [load_version(version) for version in ("v1", "v2")]
    for item in loaded:
        assert item.metadata.dataset["sha256"] == DATA_SHA256
        assert (ROOT / "models" / item.metadata.model_version / "reference.json").is_file()
    assert json.loads((ROOT / "config" / "model.json").read_text()) == {"active_version": "v1"}
    tracked = subprocess.check_output(["git", "ls-files", "projects/model-to-production"], cwd=ROOT.parents[1], text=True).splitlines()
    forbidden = (".joblib", ".csv", ".pyc", ".env", ".log")
    assert not any(path.endswith(forbidden) or "/.venv/" in path or "/__pycache__/" in path for path in tracked)
    reports = ROOT / "reports"
    reports.mkdir(exist_ok=True)
    result = {"status": "pass", "python": sys.version.split()[0],
              "versions_load": ["v1", "v2"], "active_config": "v1",
              "raw_data_models_secrets_caches_tracked": False,
              "metrics": {item.metadata.model_version: item.metadata.metrics.model_dump() for item in loaded}}
    (reports / "engineering-checks.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
