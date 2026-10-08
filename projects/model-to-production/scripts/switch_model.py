"""Operator-only version selection; restart the API after a successful switch."""
import argparse
import json
import os
from pathlib import Path
import tempfile
from src.contract import ROOT, validate_version
from src.model_loader import load_version
from src.logging_utils import log_event


def switch(version: str, config_path: Path = ROOT / "config" / "model.json", models_dir: Path = ROOT / "models"):
    validate_version(version)
    load_version(version, models_dir)  # Reject missing/invalid targets before altering config.
    content = json.dumps({"active_version": version}, indent=2) + "\n"
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=config_path.parent, delete=False) as file:
            temporary = Path(file.name)
            file.write(content)
            file.flush()
            os.fsync(file.fileno())
        os.replace(temporary, config_path)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    log_event("model_configuration", "selected_restart_required", version)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--version", required=True)
    switch(parser.parse_args().version)
    print("Configuration updated. Restart every API worker/container to load this version.")
