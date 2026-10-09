"""Educational Streamlit app. Not an emergency alert system."""
from pathlib import Path
import json

import joblib
import streamlit as st
from src.detect import classify

ROOT = Path(__file__).resolve().parent
st.set_page_config(page_title="Disaster Tweet Detector")
st.title("Can AI Detect a Real Disaster Tweet?")
st.write("Learn to classify disaster-related LANGUAGE, not to establish that an event happened.")
if not (ROOT / "artifacts" / "model.joblib").exists():
    st.warning("Download Kaggle data/train.csv and run python train.py first.")
    st.stop()

@st.cache_resource
def bundle():
    # Load only local self-produced trusted training artifacts.
    return joblib.load(ROOT / "artifacts" / "model.joblib")

message = st.text_area("Hypothetical public message", max_chars=2000, height=140)
if st.button("Classify"):
    try:
        result = classify(bundle(), message)
        st.metric("Estimated disaster-related probability", f"{result['probability']:.1%}")
        st.write("Classification:", "Disaster language" if result["predicted"] else "Not disaster language")
        st.info("Do not use this tool to confirm emergencies. Consult local authorities.")
    except ValueError as error:
        st.error(str(error))
with st.expander("Measured held-out accuracy, precision, recall and F1"):
    st.json(json.loads((ROOT / "artifacts" / "metrics.json").read_text()))
