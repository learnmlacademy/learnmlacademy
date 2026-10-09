"""Leakage-aware one-step-ahead forecasting of positive UK ecommerce order value."""
from pathlib import Path
import json

import joblib
import numpy as np
import pandas as pd
from sklearn.base import clone
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parents[1]
SEED = 42
LAGS = (1, 7, 14, 28)
FEATURES = [f"lag_{n}" for n in LAGS] + ["prior_7_mean", "prior_28_mean", "weekday", "month"]

def daily_revenue(transactions):
    required = {"InvoiceNo", "InvoiceDate", "Quantity", "UnitPrice", "Country"}
    if not required.issubset(transactions.columns):
        raise ValueError("Missing required UCI transaction columns")
    df = transactions.copy()
    df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"], errors="coerce")
    for col in ("Quantity", "UnitPrice"):
        df[col] = pd.to_numeric(df[col], errors="coerce")
    mask = df["Country"].eq("United Kingdom") & df["InvoiceDate"].notna()
    mask &= df["Quantity"].gt(0) & df["UnitPrice"].gt(0)
    mask &= ~df["InvoiceNo"].astype(str).str.upper().str.startswith("C")
    df = df.loc[mask].copy()
    if df.empty:
        raise ValueError("No valid positive UK sales")
    df["date"] = df["InvoiceDate"].dt.normalize()
    df["positive_sales"] = df["Quantity"] * df["UnitPrice"]
    observed = df.groupby("date")["positive_sales"].sum().sort_index()
    return observed.reindex(pd.date_range(observed.index.min(), observed.index.max(), freq="D"),
                            fill_value=0.0).rename("positive_gross_gbp")

def make_features(series):
    if not isinstance(series.index, pd.DatetimeIndex) or not series.index.is_monotonic_increasing:
        raise ValueError("Daily sales must have sorted DatetimeIndex")
    if len(series) < 130 or series.index.has_duplicates:
        raise ValueError("At least 130 consecutive distinct dates needed")
    if not pd.date_range(series.index.min(), series.index.max(), freq="D").equals(series.index):
        raise ValueError("Calendar has missing days")
    y = pd.to_numeric(series, errors="raise")
    if y.isna().any() or not np.isfinite(y.to_numpy()).all() or (y < 0).any():
        raise ValueError("Sales must be finite and nonnegative")
    x = pd.DataFrame(index=series.index)
    for lag in LAGS:
        x[f"lag_{lag}"] = y.shift(lag)
    x["prior_7_mean"] = y.shift(1).rolling(7).mean()
    x["prior_28_mean"] = y.shift(1).rolling(28).mean()
    x["weekday"] = series.index.dayofweek
    x["month"] = series.index.month
    x["target"] = y
    return x.dropna()

def split_dates(rows):
    if len(rows) < 84:
        raise ValueError("Need enough dates for 28-day validation and 28-day test")
    train, val, test = rows.iloc[:-56], rows.iloc[-56:-28], rows.iloc[-28:]
    assert len(val) == len(test) == 28 and train.index.max() < val.index.min() < test.index.min()
    return train, val, test

def scores(actual, predicted):
    a, p = np.asarray(actual, float), np.asarray(predicted, float)
    if a.shape != p.shape or not np.isfinite(p).all():
        raise ValueError("Nonfinite or wrong-size predictions")
    return {"mae": float(mean_absolute_error(a, p)),
            "rmse": float(np.sqrt(mean_squared_error(a, p))),
            "wape_pct": float(100 * np.abs(a - p).sum() / max(np.abs(a).sum(), 1e-9))}

def candidates():
    return {
        "Ridge": make_pipeline(StandardScaler(), Ridge(alpha=20.0)),
        "HistGradientBoosting": HistGradientBoostingRegressor(
            max_iter=120, learning_rate=0.05, max_leaf_nodes=8,
            l2_regularization=10.0, random_state=SEED),
    }

def train_and_evaluate(daily, destination, source_label="Original fictional daily-sales test fixture"):
    rows = make_features(daily)
    train, val, test = split_dates(rows)
    chosen_mae = {"same_day_last_week": scores(val.target, val.lag_7)["mae"]}
    for name, candidate in candidates().items():
        fitted = clone(candidate).fit(train[FEATURES], train.target)
        chosen_mae[name] = scores(val.target, np.maximum(0, fitted.predict(val[FEATURES])))["mae"]
    winner = min(chosen_mae, key=chosen_mae.get)
    model = None
    if winner != "same_day_last_week":
        model = clone(candidates()[winner]).fit(
            pd.concat([train, val])[FEATURES], pd.concat([train, val]).target)
        prediction = np.maximum(0, model.predict(test[FEATURES]))
    else:
        prediction = test.lag_7.to_numpy()
    report = {
        "dataset": source_label,
        "target": "gross positive GBP order value per day, not accounting net revenue",
        "forecast_contract": "one-step ahead; observed prior daily actuals are available for each day",
        "train_dates": [str(train.index.min().date()), str(train.index.max().date())],
        "val_dates": [str(val.index.min().date()), str(val.index.max().date())],
        "test_dates": [str(test.index.min().date()), str(test.index.max().date())],
        "n_daily": len(daily),
        "validation_mae": chosen_mae,
        "selected_model": winner,
        "test_selected": scores(test.target, prediction),
        "test_baseline": scores(test.target, test.lag_7),
    }
    destination = Path(destination)
    destination.mkdir(parents=True, exist_ok=True)
    joblib.dump({"model": model, "winner": winner}, destination / "forecast.joblib")
    pd.DataFrame({"actual": test.target, "predicted": prediction,
                  "last_week": test.lag_7}, index=test.index).to_csv(
                      destination / "test_predictions.csv", index_label="date")
    next_date = daily.index[-1] + pd.Timedelta(days=1)
    next_row = {**{f"lag_{i}": float(daily.iloc[-i]) for i in LAGS},
                "prior_7_mean": float(daily.iloc[-7:].mean()),
                "prior_28_mean": float(daily.iloc[-28:].mean()),
                "weekday": int(next_date.dayofweek), "month": int(next_date.month)}
    x = pd.DataFrame([next_row])[FEATURES]
    future = float(x.lag_7.iloc[0] if model is None else max(0, model.predict(x)[0]))
    (destination / "next_day.json").write_text(json.dumps(
        {"date": str(next_date.date()), "forecast_gbp": round(future, 2)}, indent=2) + "\n")
    (destination / "metrics.json").write_text(json.dumps(report, indent=2) + "\n")
    return report
