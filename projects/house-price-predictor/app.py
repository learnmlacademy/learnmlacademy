from __future__ import annotations

import json
from pathlib import Path

import joblib
import pandas as pd
import streamlit as st

PROJECT_ROOT = Path(__file__).resolve().parent
MODEL_PATH = PROJECT_ROOT / "models" / "house_price_pipeline.joblib"
METADATA_PATH = PROJECT_ROOT / "models" / "app_metadata.json"


@st.cache_resource
def load_artifacts():
    if not MODEL_PATH.exists() or not METADATA_PATH.exists():
        raise FileNotFoundError(
            "The trained model is missing. Run python download_data.py and then python src/train_model.py."
        )

    model = joblib.load(MODEL_PATH)
    metadata = json.loads(METADATA_PATH.read_text(encoding="utf-8"))
    return model, metadata


def build_model_row(raw_values: dict) -> pd.DataFrame:
    row = pd.DataFrame([raw_values])

    row["house_age_at_sale"] = row["yr_sold"] - row["year_built"]
    row["years_since_remodel"] = row["yr_sold"] - row["year_remod_add"]
    row["total_bathrooms"] = row["full_bath"] + (0.5 * row["half_bath"])

    model_columns = [
        "gr_liv_area",
        "garage_cars",
        "garage_area",
        "total_bsmt_sf",
        "bedroom_abvgr",
        "fireplaces",
        "lot_area",
        "house_age_at_sale",
        "years_since_remodel",
        "total_bathrooms",
        "neighborhood",
        "house_style",
        "kitchen_qual",
        "overall_qual",
    ]
    return row[model_columns]


st.set_page_config(
    page_title="House Price Predictor",
    page_icon="🏠",
    layout="centered",
)

st.title("🏠 What Is This House Really Worth?")
st.caption("A beginner-friendly Ames Housing machine-learning project")

try:
    model, metadata = load_artifacts()
except FileNotFoundError as error:
    st.error(str(error))
    st.stop()

st.info(
    "Educational demo only. The model uses historical home sales from Ames, Iowa, "
    "and is not a professional appraisal or a current market valuation."
)

with st.expander("About the trained model", expanded=False):
    metrics = metadata["final_metrics"]
    st.write("Selected model:", metadata["winning_model"])
    st.write("Holdout MAE: $" + f"{metrics['mae']:,.0f}")
    st.write("Holdout RMSE: $" + f"{metrics['rmse']:,.0f}")
    st.write(f"Holdout R²: {metrics['r2']:.3f}")

defaults = metadata["numeric_defaults"]
categories = metadata["categorical_options"]

st.subheader("Enter the property details")

col1, col2 = st.columns(2)

with col1:
    gr_liv_area = st.number_input(
        "Above-ground living area (sq ft)",
        min_value=300,
        max_value=6000,
        value=int(defaults["gr_liv_area"]["median"]),
        step=50,
    )
    lot_area = st.number_input(
        "Lot area (sq ft)",
        min_value=1000,
        max_value=100000,
        value=int(defaults["lot_area"]["median"]),
        step=250,
    )
    total_bsmt_sf = st.number_input(
        "Basement area (sq ft)",
        min_value=0,
        max_value=5000,
        value=int(defaults["total_bsmt_sf"]["median"]),
        step=50,
    )
    garage_area = st.number_input(
        "Garage area (sq ft)",
        min_value=0,
        max_value=2000,
        value=int(defaults["garage_area"]["median"]),
        step=25,
    )
    garage_cars = st.number_input(
        "Garage capacity (cars)",
        min_value=0,
        max_value=5,
        value=int(round(defaults["garage_cars"]["median"])),
        step=1,
    )
    bedrooms = st.number_input(
        "Bedrooms above ground",
        min_value=0,
        max_value=8,
        value=int(round(defaults["bedroom_abvgr"]["median"])),
        step=1,
    )

with col2:
    full_bath = st.number_input(
        "Full bathrooms",
        min_value=0,
        max_value=5,
        value=int(round(defaults["full_bath"]["median"])),
        step=1,
    )
    half_bath = st.number_input(
        "Half bathrooms",
        min_value=0,
        max_value=4,
        value=int(round(defaults["half_bath"]["median"])),
        step=1,
    )
    fireplaces = st.number_input(
        "Fireplaces",
        min_value=0,
        max_value=5,
        value=int(round(defaults["fireplaces"]["median"])),
        step=1,
    )
    year_built = st.number_input(
        "Year built",
        min_value=1870,
        max_value=2010,
        value=int(round(defaults["year_built"]["median"])),
        step=1,
    )
    year_remodeled = st.number_input(
        "Year last remodeled",
        min_value=1870,
        max_value=2010,
        value=int(round(defaults["year_remod_add"]["median"])),
        step=1,
    )
    year_sold = st.number_input(
        "Year sold",
        min_value=2006,
        max_value=2010,
        value=int(round(defaults["yr_sold"]["median"])),
        step=1,
    )

neighborhood = st.selectbox("Neighborhood", categories["neighborhood"])
house_style = st.selectbox("House style", categories["house_style"])
kitchen_qual = st.selectbox("Kitchen quality", categories["kitchen_qual"])
overall_qual = st.selectbox("Overall quality", categories["overall_qual"])

raw_values = {
    "gr_liv_area": float(gr_liv_area),
    "garage_cars": float(garage_cars),
    "garage_area": float(garage_area),
    "total_bsmt_sf": float(total_bsmt_sf),
    "full_bath": float(full_bath),
    "half_bath": float(half_bath),
    "bedroom_abvgr": float(bedrooms),
    "fireplaces": float(fireplaces),
    "year_built": float(year_built),
    "year_remod_add": float(year_remodeled),
    "yr_sold": float(year_sold),
    "lot_area": float(lot_area),
    "neighborhood": neighborhood,
    "house_style": house_style,
    "kitchen_qual": kitchen_qual,
    "overall_qual": overall_qual,
}

if st.button("Estimate sale price", type="primary", use_container_width=True):
    if year_remodeled < year_built:
        st.warning("The remodel year cannot be earlier than the build year.")
    elif year_sold < year_built:
        st.warning("The sale year cannot be earlier than the build year.")
    else:
        model_row = build_model_row(raw_values)
        prediction = float(model.predict(model_row)[0])
        st.metric("Estimated historical sale price", "$" + f"{prediction:,.0f}")
        st.caption(
            "This estimate is based on patterns in the historical Ames Housing dataset. "
            "It does not adjust the old sale prices to today's dollars."
        )
