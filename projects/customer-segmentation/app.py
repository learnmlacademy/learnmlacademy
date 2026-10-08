"""Run with: python -m streamlit run app.py"""

from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import streamlit as st

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "customer_segments.joblib"
EXAMPLES_PATH = ROOT / "outputs" / "segment_examples.csv"
PROFILE_PATH = ROOT / "outputs" / "cluster_profiles.csv"

st.set_page_config(
    page_title="Customer Segmentation",
    page_icon="🛍️",
    layout="wide",
)
st.title("🛍️ How Amazon Knows What Kind of Customer You Are")
st.caption(
    "Educational customer-segmentation project using UCI Online Retail data — "
    "not Amazon data or Amazon's production algorithm"
)
st.info(
    "The business names such as Champions or Needs Attention are our teaching labels "
    "for discovered clusters. K-Means itself only returns numeric cluster IDs."
)


@st.cache_resource
def load_artifacts():
    return joblib.load(MODEL_PATH)


if not MODEL_PATH.is_file() or not EXAMPLES_PATH.is_file() or not PROFILE_PATH.is_file():
    st.error("Segmentation artifacts are missing.")
    st.code(
        "python download_data.py\npython src/build_segments.py",
        language="powershell",
    )
    st.stop()

bundle = load_artifacts()
examples = pd.read_csv(EXAMPLES_PATH)
profiles = pd.read_csv(PROFILE_PATH)

st.subheader("Explore a verified real customer profile")
selected = st.selectbox(
    "Representative customer",
    examples["example_id"].tolist(),
)
row = examples.loc[examples["example_id"] == selected].iloc[0]

a, b, c = st.columns(3)
a.metric("Recency", f"{int(row['Recency'])} days")
b.metric("Frequency", f"{int(row['Frequency'])} invoices")
c.metric("Monetary", f"£{float(row['Monetary']):,.2f}")

if st.button("Assign segment", type="primary"):
    features = pd.DataFrame(
        [[float(row["Recency"]), float(row["Frequency"]), float(row["Monetary"])]],
        columns=bundle["features"],
    )
    clipped = features.copy()
    for feature in bundle["features"]:
        clipped[feature] = clipped[feature].clip(
            lower=0,
            upper=float(bundle["caps"][feature]),
        )
    scaled = bundle["scaler"].transform(np.log1p(clipped))
    cluster = int(bundle["kmeans"].predict(scaled)[0])
    segment = bundle["segment_names"][cluster]

    st.success(f"Assigned segment: {segment}")
    st.caption(f"K-Means cluster ID: {cluster}")

    profile = profiles.loc[profiles["cluster"] == cluster].iloc[0]
    st.write("Typical profile of this cluster:")
    profile_cols = st.columns(4)
    profile_cols[0].metric("Customers", f"{int(profile['Customers']):,}")
    profile_cols[1].metric("Median recency", f"{float(profile['Recency']):.0f} days")
    profile_cols[2].metric("Median frequency", f"{float(profile['Frequency']):.0f}")
    profile_cols[3].metric("Median monetary", f"£{float(profile['Monetary']):,.0f}")

st.divider()
st.subheader("Try a hypothetical RFM profile")
left, middle, right = st.columns(3)
recency = left.number_input("Days since last purchase", min_value=0, value=30, step=1)
frequency = middle.number_input("Number of invoices", min_value=1, value=5, step=1)
monetary = right.number_input("Total spend (£)", min_value=0.01, value=500.0, step=10.0)

if st.button("Segment this profile"):
    features = pd.DataFrame(
        [[float(recency), float(frequency), float(monetary)]],
        columns=bundle["features"],
    )
    clipped = features.copy()
    clipped_fields = []
    for feature in bundle["features"]:
        cap = float(bundle["caps"][feature])
        if float(clipped.iloc[0][feature]) > cap:
            clipped_fields.append(feature)
        clipped[feature] = clipped[feature].clip(lower=0, upper=cap)

    scaled = bundle["scaler"].transform(np.log1p(clipped))
    cluster = int(bundle["kmeans"].predict(scaled)[0])
    segment = bundle["segment_names"][cluster]
    st.success(f"Assigned teaching segment: {segment}")
    if clipped_fields:
        st.warning(
            "These inputs exceeded the training 99th-percentile cap and were clipped "
            "before scaling: " + ", ".join(clipped_fields)
        )

st.caption(
    "RFM clusters describe patterns in one historical retailer dataset. They are not "
    "ground-truth customer personalities and should not be used for consequential decisions."
)
