"""python -m uvicorn api.main:app --host 127.0.0.1 --port 8000"""
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from api.schemas import Customer, Prediction
from src.contract import ROOT
from src.model_loader import load_active
from src.predict import predict
from src.logging_utils import log_event


def create_app(config_path: Path = ROOT / "config" / "model.json", models_dir: Path = ROOT / "models"):
    @asynccontextmanager
    async def lifespan(app):
        # No artifact paths/versions are accepted from HTTP clients.
        try:
            app.state.model = load_active(config_path, models_dir)
        except Exception as error:
            log_event("model_load", "failed", error_type=type(error).__name__)
            raise
        log_event("model_load", "ready", app.state.model.metadata.model_version)
        yield
        app.state.model = None

    application = FastAPI(title="Customer Churn Prediction Service", version="1.0.0", lifespan=lifespan)

    @application.exception_handler(RequestValidationError)
    async def invalid_request(request, error):
        log_event("request_validation", "rejected", application.state.model.metadata.model_version, status_code=422)
        # Keep locations/messages useful without echoing customer values in errors.
        details = [{"loc": list(item["loc"]), "msg": item["msg"], "type": item["type"]}
                   for item in error.errors()]
        return JSONResponse(status_code=422, content={"detail": details})

    @application.get("/health")
    def health():
        return {"status": "ok", "model_loaded": True, "active_version": application.state.model.metadata.model_version}

    @application.get("/model-info")
    def model_info():
        metadata = application.state.model.metadata
        return {"active_version": metadata.model_version, "algorithm": metadata.algorithm,
                "trained_at": metadata.trained_at, "evaluation_metrics": metadata.metrics.model_dump(),
                "threshold": metadata.threshold, "feature_schema": Customer.model_json_schema()}

    @application.post("/predict", response_model=Prediction)
    def predict_customer(customer: Customer):
        loaded = application.state.model
        try:
            result = predict(customer, loaded)
        except Exception as error:
            log_event("inference", "failed", loaded.metadata.model_version, error_type=type(error).__name__, status_code=500)
            return JSONResponse(status_code=500, content={"detail": "Inference failed; consult operator logs."})
        log_event("inference", "ok", result.model_version, inference_latency_ms=result.inference_latency_ms, status_code=200)
        return result

    return application


app = create_app()
