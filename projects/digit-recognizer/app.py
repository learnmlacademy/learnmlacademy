"""Streamlit app; train first: python train.py"""
from __future__ import annotations
import io
from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np
import streamlit as st
from PIL import Image
from src.digits import MODEL_PATH, METRICS_PATH, load_model, prepare_uploaded_image, predict

st.set_page_config(page_title="Handwritten Digit Recognizer | LearnMLAcademy", page_icon="🔢", layout="wide")
st.title("Teach AI to Read Handwritten Numbers")
st.caption("A real 8×8 convolutional neural network trained on 1,797 built-in handwritten digit images.")
if not MODEL_PATH.exists() or not METRICS_PATH.exists():
    st.warning("Model not trained yet. In the project terminal run: python train.py")
    st.stop()

@st.cache_resource
def cached_model():
    return load_model()

import json
metrics = json.loads(METRICS_PATH.read_text(encoding="utf-8"))
st.metric("Held-out test accuracy", f'{metrics["test_accuracy"]:.1%}')
st.caption("This measures only the built-in 8×8 dataset. Phone-camera images can perform worse.")
upload = st.file_uploader("Upload a clear handwritten digit (PNG/JPG)", type=["png", "jpg", "jpeg"])
if upload is None:
    st.info("Upload a dark-ink drawing on a light background, or white ink on black. The app will convert it to 8×8 pixels.")
else:
    try:
        image = prepare_uploaded_image(upload.getvalue())
        col1, col2 = st.columns(2)
        with col1:
            st.image(upload.getvalue(), caption="Your original drawing", width=220)
        with col2:
            st.image(image, caption="Actual 8×8 input after preprocessing", width=220, clamp=True)
        prediction, probabilities = predict(cached_model(), image)
        st.subheader(f"Predicted digit: {prediction}")
        st.caption("Softmax probabilities are relative model scores, not guaranteed real-world correctness.")
        st.bar_chart({str(i): float(score) for i, score in enumerate(probabilities)})
    except (ValueError, OSError) as exc:
        st.error(f"Could not read the digit: {exc}")

with st.expander("How does the neural network learn?"):
    st.markdown("Each 3×3 convolution scans local pixel patterns; ReLU keeps positive activations; "
                "2×2 max pooling reduces width and height. The dense layers choose among 10 digits.")
    st.code("Input: 1×8×8 → Conv: 16×8×8 → Pool: 16×4×4\n"
            "→ Conv: 32×4×4 → Pool: 32×2×2\n"
            "→ Flatten: 128 → Dense: 64 → Logits: 10", language="text")
    st.markdown("A training epoch predicts labels, calculates cross-entropy loss, propagates gradients "
                "backward, then updates weights using Adam. The test set is held out until final evaluation.")
st.divider()
st.caption("Educational project. Avoid interpreting scores as calibrated confidence.")
