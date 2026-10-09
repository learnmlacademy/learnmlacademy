from pathlib import Path
import importlib.util

import joblib
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = ROOT / "models" / "customer_segmenter.joblib"

spec = importlib.util.spec_from_file_location(
    "customer_segments",
    ROOT / "src" / "build_segments.py",
)
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)


def test_downloaded_dataset_contract():
    frame = core.load_transactions()
    assert len(frame) == 541_909
    assert {
        "InvoiceNo",
        "Quantity",
        "InvoiceDate",
        "UnitPrice",
        "CustomerID",
        "Country",
    }.issubset(frame.columns)


def test_cleaning_removes_cancellations_and_invalid_purchases():
    cleaned = core.clean_transactions(core.load_transactions())
    assert cleaned["CustomerID"].notna().all()
    assert (cleaned["Quantity"] > 0).all()
    assert (cleaned["UnitPrice"] > 0).all()
    assert not cleaned["InvoiceNo"].str.upper().str.startswith("C").any()


def test_rfm_has_positive_business_features():
    cleaned = core.clean_transactions(core.load_transactions())
    rfm, snapshot = core.build_rfm(cleaned)
    assert len(rfm) > 4_000
    assert (rfm["recency_days"] >= 1).all()
    assert (rfm["frequency_orders"] >= 1).all()
    assert (rfm["monetary_value"] > 0).all()
    assert snapshot > cleaned["InvoiceDate"].max()


def test_saved_bundle_and_profiles_exist():
    assert MODEL_PATH.is_file()
    bundle = joblib.load(MODEL_PATH)
    assert 2 <= int(bundle["selected_k"]) <= 8
    assert len(bundle["segment_names"]) == int(bundle["selected_k"])
    assert len(bundle["segment_profiles"]) == int(bundle["selected_k"])


def test_example_prediction_is_deterministic():
    bundle = joblib.load(MODEL_PATH)
    row = pd.DataFrame(
        [{"recency_days": 30.0, "frequency_orders": 5.0, "monetary_value": 800.0}]
    )
    transformed = bundle["scaler"].transform(
        np.log1p(row[bundle["rfm_columns"]])
    )
    first = int(bundle["kmeans"].predict(transformed)[0])
    second = int(bundle["kmeans"].predict(transformed)[0])
    assert first == second
    assert first in bundle["segment_names"]


def test_required_outputs_exist():
    for name in [
        "metrics.json",
        "kmeans_k_comparison.csv",
        "clustering_method_comparison.csv",
        "segment_profiles.csv",
        "customer_segments.csv",
        "rfm_distributions.png",
        "k_selection.png",
        "pca_segments.png",
        "cluster_profiles.png",
        "method_comparison.png",
    ]:
        assert (ROOT / "outputs" / name).is_file(), name


def test_segment_names_follow_measured_behavior_not_arbitrary_cluster_rank():
    # Original fictional RFM teaching rows: second cluster is demonstrably
    # lapsing (135-day recency) and occasional (under 2 mean orders).
    rfm = pd.DataFrame({
        "CustomerID": ["recent", "lapsed"],
        "recency_days": [26.45, 134.72],
        "frequency_orders": [8.44, 1.67],
        "monetary_value": [4544.39, 497.12],
        "average_order_value": [540.0, 298.0],
    })
    profiles, names = core.build_segment_names(rfm, np.asarray([0, 1]))
    assert names[0] == "High-value active customers"
    assert names[1] == "Lapsing occasional customers"
    assert float(profiles.loc[profiles.cluster == 1, "recency_days"].iloc[0]) > 90
