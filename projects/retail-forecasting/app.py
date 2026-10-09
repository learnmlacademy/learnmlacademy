"""Read-only student dashboard; train first to generate real data and artifacts."""
from pathlib import Path
import json
import pandas as pd
import streamlit as st

ROOT = Path(__file__).resolve().parent
st.set_page_config(page_title="Retail Sales Forecast", layout="wide")
st.title("Can We Predict Tomorrow's Sales?")
st.caption("Official UCI UK retail transactions; positive-order gross GBP, not audited net revenue.")
metric_file = ROOT / "artifacts" / "metrics.json"
if not metric_file.is_file():
    st.warning("First run python download_data.py then python train.py")
    st.stop()
report = json.loads(metric_file.read_text())
st.subheader("Training and validation")
st.write("Model selected using validation MAE:", report["selected_model"])
st.json(report["validation_mae"])
st.subheader("Untouched chronological 28-day test")
a, b, c = st.columns(3)
a.metric("MAE (£)", f"{report['test_selected']['mae']:,.2f}")
b.metric("RMSE (£)", f"{report['test_selected']['rmse']:,.2f}")
c.metric("WAPE", f"{report['test_selected']['wape_pct']:.1f}%")
data = pd.read_csv(ROOT / "artifacts" / "test_predictions.csv", parse_dates=["date"])
st.line_chart(data.set_index("date")[["actual", "predicted", "last_week"]])
st.dataframe(data, use_container_width=True)
tomorrow = json.loads((ROOT / "artifacts" / "next_day.json").read_text())
st.metric("Next observed date: " + tomorrow["date"], f"£{tomorrow['forecast_gbp']:,.2f}")
st.info("This is one-day-ahead forecasting with observed lags, not a forecast of the entire next month. Zero-filled dates may represent shop closure.")
