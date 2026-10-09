import numpy as np
import pandas as pd
import pytest
from src.forecast import daily_revenue, make_features, split_dates, train_and_evaluate, scores

def sales():
    dates = pd.date_range("2025-01-01", periods=175, freq="D")
    return pd.Series(100 + .35 * np.arange(175) + 10 * np.sin(np.arange(175) * 2*np.pi/7),
                     index=dates)

def test_transaction_cleaning():
    frame = pd.DataFrame({"InvoiceNo": ["100", "C101", "102"],
                          "InvoiceDate": ["2025-01-01"] * 3,
                          "Quantity": [2, -1, 4], "UnitPrice": [5, 5, 5],
                          "Country": ["United Kingdom", "United Kingdom", "France"]})
    assert daily_revenue(frame).iloc[0] == 10

def test_features_only_use_the_past():
    y = sales()
    x = make_features(y)
    assert x.iloc[0].lag_1 == y.iloc[27]
    assert x.iloc[0].lag_7 == y.iloc[21]
    t = y.index[50]
    modified = y.copy()
    modified.loc[t] = 999999
    assert make_features(modified).loc[t, "lag_1"] == x.loc[t, "lag_1"]
    with pytest.raises(ValueError):
        make_features(y.drop(y.index[17]))

def test_split_chronologically():
    train, val, test = split_dates(make_features(sales()))
    assert train.index.max() < val.index.min() < test.index.min()
    assert len(val) == 28 and len(test) == 28

def test_training_and_real_file_outputs(tmp_path):
    report = train_and_evaluate(sales(), tmp_path)
    assert report["selected_model"] in ("Ridge", "HistGradientBoosting", "same_day_last_week")
    assert len(pd.read_csv(tmp_path / "test_predictions.csv")) == 28
    assert (tmp_path / "forecast.joblib").exists()
    assert (tmp_path / "next_day.json").exists()

def test_zero_actuals_wape():
    assert scores([0, 0], [0, 0])["wape_pct"] == 0
