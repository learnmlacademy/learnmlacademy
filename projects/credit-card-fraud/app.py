"""Run with: python -m streamlit run app.py"""

from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd
import streamlit as st

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "fraud_detector.joblib"
DEMO_PATH = ROOT / "outputs" / "demo_transactions.csv"

st.set_page_config(
    page_title="Credit Card Fraud Detector",
    page_icon="💳",
    layout="wide",
)
st.title("💳 Can AI Catch a Stolen Credit Card Transaction?")
st.caption(
    "Educational fraud-scoring demo using the public anonymized OpenML credit-card dataset"
)
st.info(
    "This is not a banking or payment-security product. The historical dataset is anonymized, "
    "and V1–V28 are PCA-transformed features whose original meanings are not public."
)


@st.cache_resource
def load_bundle():
    return joblib.load(MODEL_PATH)


if not MODEL_PATH.is_file() or not DEMO_PATH.is_file():
    st.error("Training artifacts are missing.")
    st.code(
        "python download_data.py\npython src/train_model.py",
        language="powershell",
    )
    st.stop()

bundle = load_bundle()
demos = pd.read_csv(DEMO_PATH)
features = bundle["features"]
threshold = float(bundle["threshold"])

st.subheader("Score a verified holdout example")
selected_id = st.selectbox(
    "Transaction example",
    demos["example_id"].tolist(),
    format_func=lambda item: item + " (" + str(
        demos.loc[demos["example_id"] == item, "result_category"].iloc[0]
    ) + ")",
)
st.caption("TP = correctly flagged fraud; TN = correctly ignored legitimate; "
           "FP = false alarm; FN = missed fraud. Examples include measured mistakes when present.")
row = demos.loc[demos["example_id"] == selected_id].iloc[0]

left, right, third = st.columns(3)
left.metric("Transaction amount", f"{float(row['Amount']):,.2f}")
right.metric("Seconds from dataset start", f"{float(row['Time']):,.0f}")
third.metric("Decision threshold", f"{threshold:.3f}")

with st.expander("See all anonymized model inputs"):
    st.dataframe(
        pd.DataFrame([row[features].to_dict()]),
        hide_index=True,
        use_container_width=True,
    )

if st.button("Score transaction", type="primary"):
    model_row = pd.DataFrame(
        [[float(row[name]) for name in features]],
        columns=features,
    )
    score = float(bundle["model"].predict_proba(model_row)[0, 1])
    flagged = score >= threshold

    if flagged:
        st.error("Model decision: FLAG FOR FRAUD REVIEW")
    else:
        st.success("Model decision: do not flag at this threshold")

    metric_col, truth_col = st.columns(2)
    metric_col.metric("Fraud score", f"{score:.1%}")
    historical_label = int(row["historical_label"])
    truth_col.metric(
        "Historical label",
        "Fraud" if historical_label == 1 else "Legitimate",
    )

    if flagged and historical_label == 1:
        st.write(
            "This example is a **true positive**: the model flagged a transaction "
            "historically labelled fraud."
        )
    elif flagged and historical_label == 0:
        st.write(
            "This example is a **false positive**: a legitimate historical "
            "transaction was flagged."
        )
    elif not flagged and historical_label == 1:
        st.write(
            "This example is a **false negative**: a historical fraud was missed."
        )
    else:
        st.write(
            "This example is a **true negative**: a legitimate transaction was not flagged."
        )

st.divider()
st.caption(
    "Real fraud systems use richer live signals, cost-sensitive decisions, monitoring, "
    "human review, security controls and continuously changing adversarial patterns."
)
