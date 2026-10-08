"""Inference only: dataframe conversion, saved transforms, classifier and result."""
from time import perf_counter
import pandas as pd
from api.schemas import Customer, Prediction
from src.contract import FEATURES
from src.model_loader import LoadedModel


def predict(customer: Customer, loaded: LoadedModel) -> Prediction:
    start = perf_counter()
    frame = pd.DataFrame([customer.model_dump()], columns=FEATURES)
    probability = float(loaded.pipeline.predict_proba(frame)[0, list(loaded.pipeline.classes_).index(1)])
    label = "churn" if probability >= loaded.metadata.threshold else "stay"
    latency = (perf_counter() - start) * 1000
    return Prediction(predicted_class=label, churn_probability=probability,
                      model_version=loaded.metadata.model_version, inference_latency_ms=latency)
