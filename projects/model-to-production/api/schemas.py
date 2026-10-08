"""Strict public contract: required fields, no silent string/bool coercion."""
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, model_validator


class Customer(BaseModel):
    model_config = ConfigDict(strict=True, extra="forbid", allow_inf_nan=False)
    tenure: int = Field(ge=0, le=120, description="Months; training sample spans 0–72.")
    MonthlyCharges: float = Field(ge=0, le=500)
    TotalCharges: float | None = Field(ge=0, le=50000, description="Required key; null means unknown and uses the training median.")
    Contract: Literal["Month-to-month", "One year", "Two year"]
    PaymentMethod: Literal["Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"]
    InternetService: Literal["DSL", "Fiber optic", "No"]
    OnlineSecurity: Literal["Yes", "No", "No internet service"]
    TechSupport: Literal["Yes", "No", "No internet service"]

    @model_validator(mode="after")
    def consistent_services(self):
        for field in ("OnlineSecurity", "TechSupport"):
            if (self.InternetService == "No") != (getattr(self, field) == "No internet service"):
                raise ValueError(f"{field} must agree with InternetService.")
        return self


class Prediction(BaseModel):
    predicted_class: Literal["stay", "churn"]
    churn_probability: float = Field(ge=0, le=1)
    model_version: str
    inference_latency_ms: float = Field(ge=0)
