"""Run from the project root with: python -m streamlit run app.py"""

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import streamlit as st

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "customer_segmenter.joblib"
RFM_COLUMNS = ["recency_days", "frequency_orders", "monetary_value"]

st.set_page_config(
    page_title="Customer Segmentation",
    page_icon="🛍️",
    layout="wide",
)
st.title("How Amazon Knows What Kind of Customer You Are")
st.caption(
    "Educational customer-segmentation project using UCI Online Retail data • "
    "not Amazon data or Amazon's production algorithm"
)

if not MODEL_PATH.is_file():
    st.error("The saved customer-segmentation artifact is missing.")
    st.code(
        "python download_data.py\npython src/build_segments.py",
        language="powershell",
    )
    st.stop()


@st.cache_resource
def load_bundle(modified_ns: int):
    return joblib.load(MODEL_PATH)


bundle = load_bundle(MODEL_PATH.stat().st_mtime_ns)
profiles = bundle["segment_profiles"].copy()

st.info(
    "RFM means Recency, Frequency and Monetary value. The model groups customers "
    "by shopping behaviour without a pre-existing target label."
)

left, right = st.columns([1, 1.3])

with left:
    st.subheader("Try a customer profile")
    recency = st.number_input(
        "Days since last purchase",
        min_value=0,
        max_value=800,
        value=30,
        step=1,
    )
    frequency = st.number_input(
        "Number of completed orders",
        min_value=1,
        max_value=500,
        value=5,
        step=1,
    )
    monetary = st.number_input(
        "Total historical spend (£)",
        min_value=0.01,
        max_value=500000.0,
        value=800.0,
        step=50.0,
    )

    if st.button("Find customer segment", type="primary", use_container_width=True):
        row = pd.DataFrame(
            [{
                "recency_days": float(recency),
                "frequency_orders": float(frequency),
                "monetary_value": float(monetary),
            }]
        )
        transformed = bundle["scaler"].transform(np.log1p(row[RFM_COLUMNS]))
        cluster = int(bundle["kmeans"].predict(transformed)[0])
        segment = bundle["segment_names"][cluster]
        st.success(f"Assigned segment: {segment}")
        st.write(f"Cluster ID: {cluster}")
        st.caption(
            "The name is an educational interpretation of that cluster's average RFM profile."
        )

with right:
    st.subheader("Verified segment profiles")
    display = profiles[
        [
            "segment_name",
            "customers",
            "recency_days",
            "frequency_orders",
            "monetary_value",
        ]
    ].copy()
    display.columns = [
        "Segment",
        "Customers",
        "Avg recency (days)",
        "Avg orders",
        "Avg spend (£)",
    ]
    st.dataframe(display, hide_index=True, use_container_width=True)
    st.caption(
        f"Selected K-Means clusters: {bundle['selected_k']} • "
        f"RFM snapshot date: {bundle['snapshot_date']}"
    )

st.divider()
st.caption(
    "This project demonstrates RFM clustering on a public UK online-retail dataset. "
    "Real companies may use many more behavioural, product, demographic and real-time signals."
)
