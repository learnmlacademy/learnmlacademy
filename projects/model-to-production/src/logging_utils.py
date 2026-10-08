"""Small JSON logger; no request bodies, feature values or customer identifiers."""
import json
import logging

LOGGER = logging.getLogger("churn_service")
if not LOGGER.handlers:
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(message)s"))
    LOGGER.addHandler(handler)
LOGGER.setLevel(logging.INFO)


def log_event(event, status, model_version=None, **fields):
    allowed = {"inference_latency_ms", "status_code", "error_type"}
    if set(fields) - allowed:
        raise ValueError("Refusing an unapproved structured-log field.")
    LOGGER.info(json.dumps({"event": event, "status": status, "model_version": model_version, **fields},
                           allow_nan=False))
