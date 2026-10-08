from pathlib import Path
import importlib.util
import json

import joblib
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "Online Retail.xlsx"
MODEL = ROOT / "models" / "customer_segments.joblib"
METRICS = ROOT / "outputs" / "metrics.json"
SEGMENTS = ROOT / "outputs" / "customer_segments.csv"
PROFILES = ROOT / "outputs" / "cluster_profiles.csv"
EXAMPLES = ROOT / "outputs" / "segment_examples.csv"

spec = importlib.util.spec_from_file_location(
    "segment_builder",
    ROOT / "src" / "build_segments.py",
)
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)


def test_raw_dataset_contract():
    frame = pd.read_excel(DATA)
    assert len(frame) == 541_909
    assert list(frame.columns) == [
        "InvoiceNo",
        "StockCode",
        "Description",
        "Quantity",
        "InvoiceDate",
        "UnitPrice",
        "CustomerID",
        "Country",
    ]


def test_cleaning_removes_unusable_purchase_rows():
    raw = core.load_transactions()
    clean = core.clean_transactions(raw)
    assert clean["CustomerID"].notna().all()
    assert (clean["Quantity"] > 0).all()
    assert (clean["UnitPrice"] > 0).all()
    assert not clean["InvoiceNo"].str.upper().str.startswith("C").any()
    assert (clean["Revenue"] > 0).all()
    assert len(clean) < len(raw)


def test_rfm_is_one_positive_row_per_customer():
    clean = core.clean_transactions(core.load_transactions())
    rfm, reference_date = core.build_rfm(clean)
    assert rfm["CustomerID"].is_unique
    assert (rfm[core.RFM_FEATURES] > 0).all().all()
    assert reference_date > clean["InvoiceDate"].max()


def test_k_selection_covers_requested_range():
    table = pd.read_csv(ROOT / "outputs" / "k_selection.csv")
    assert table["k"].tolist() == core.K_VALUES
    assert table["silhouette"].between(-1, 1).all()
    assert (table["inertia"] > 0).all()


def test_saved_bundle_matches_recorded_best_k():
    bundle = joblib.load(MODEL)
    metrics = json.loads(METRICS.read_text(encoding="utf-8"))
    assert bundle["best_k"] == metrics["best_k"]
    assert bundle["features"] == core.RFM_FEATURES
    assert set(bundle["segment_names"]) == set(range(bundle["best_k"]))


def test_segment_outputs_cover_every_customer_once():
    segments = pd.read_csv(SEGMENTS)
    profiles = pd.read_csv(PROFILES)
    metrics = json.loads(METRICS.read_text(encoding="utf-8"))
    assert len(segments) == metrics["customers"]
    assert segments["CustomerID"].is_unique
    assert profiles["Customers"].sum() == metrics["customers"]
    assert profiles["cluster"].nunique() == metrics["best_k"]
    assert profiles["Segment"].is_unique


def test_examples_cover_every_cluster():
    examples = pd.read_csv(EXAMPLES)
    bundle = joblib.load(MODEL)
    assert len(examples) == bundle["best_k"]
    assert examples["cluster"].nunique() == bundle["best_k"]
    assert examples["Segment"].nunique() == bundle["best_k"]


def test_saved_transformer_predicts_representative_examples():
    examples = pd.read_csv(EXAMPLES)
    bundle = joblib.load(MODEL)
    scaled = core.transform_rfm(
        examples,
        bundle["caps"],
        bundle["scaler"],
    )
    predictions = bundle["kmeans"].predict(scaled)
    assert np.array_equal(predictions, examples["cluster"].astype(int).to_numpy())


def test_pca_projection_and_alternative_results_are_recorded():
    metrics = json.loads(METRICS.read_text(encoding="utf-8"))
    assert 0 < metrics["explained_variance_pca_2d"] <= 1
    alt = metrics["alternative_clustering"]
    assert alt["agglomerative_clusters"] == metrics["best_k"]
    assert -1 <= alt["agglomerative_silhouette"] <= 1
    assert alt["dbscan_noise_customers"] >= 0
