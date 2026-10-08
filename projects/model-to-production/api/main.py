"""python -m uvicorn api.main:app --host 127.0.0.1 --port 8000"""
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from api.schemas import Customer, Prediction
from src.contract import ROOT
from src.model_loader import load_active
from src.predict import predict


def create_app(config_path: Path = ROOT / "config" / "model.json", models_dir: Path = ROOT / "models"):
    @asynccontextmanager
    async def lifespan(app):
        # No artifact paths/versions are accepted from HTTP clients.
        app.state.model = load_active(config_path, models_dir)
        yield
        app.state.model = None

    application = FastAPI(title="Customer Churn Prediction Service", version="1.0.0", lifespan=lifespan)

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
        return predict(customer, application.state.model)

    return application


app = create_app()
