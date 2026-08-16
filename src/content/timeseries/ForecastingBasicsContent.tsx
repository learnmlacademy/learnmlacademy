import React from 'react';

export function ForecastingBasicsContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Forecasting Basics — Complete Guide</h1>
      <p className="text-lg text-slate-500 mb-6">
        Learn the forecasting workflow: understand time patterns, define the horizon, build simple baselines, evaluate on future periods, and only then add model complexity.
      </p>

      {/* INTRO */}
      <section className="space-y-4">
        <p className="text-lg leading-relaxed">
          <strong>Time series forecasting</strong> means using information available up to a point in time to estimate values that come later. The key difference from ordinary tabular prediction is that <strong>time order matters</strong>. A forecasting system must behave as if the future has not happened yet.
        </p>

        <div className="not-prose grid md:grid-cols-4 gap-3 my-6">
          {[
            ['1', 'Past data', 'Collect observations available up to the forecast origin.'],
            ['2', 'Find structure', 'Look for level, trend, seasonality, cycles, events and useful predictors.'],
            ['3', 'Forecast', 'Use a baseline or model to estimate one or more future periods.'],
            ['4', 'Evaluate later', 'Compare forecasts with periods that were not used to fit or tune the model.'],
          ].map(([n, title, text]) => (
            <div key={n} className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-sm font-bold text-white">{n}</div>
              <p className="font-bold text-slate-900">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{text}</p>
            </div>
          ))}
        </div>

        <div className="not-prose rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-900">Forecasting is not the same as every prediction problem that mentions the future.</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            Predicting next month's sales or tomorrow's electricity demand is forecasting because the target is ordered over time. Predicting whether a customer will churn can be a classification problem instead. The question is not only <em>when</em> the outcome happens, but whether the target itself is a time-indexed quantity that must be forecast over a horizon.
          </p>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Where Forecasting Is Used</h2>
        <div className="not-prose grid md:grid-cols-3 gap-5 my-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">Business</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Retail sales by day or month</li>
              <li>Revenue and cash-flow planning</li>
              <li>Product demand and inventory</li>
              <li>Website traffic and orders</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">Operations</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Energy demand</li>
              <li>Call-centre volume</li>
              <li>Server load</li>
              <li>Staffing requirements</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">Environment & Finance</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Temperature or rainfall series</li>
              <li>Power generation</li>
              <li>Transaction volume</li>
              <li>Financial time-series quantities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FORECAST ORIGIN / HORIZON */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Two Words You Must Know: Forecast Origin and Horizon</h2>
        <p className="text-lg leading-relaxed mb-4">
          The <strong>forecast origin</strong> is the last point at which you are allowed to use observed information. The <strong>forecast horizon</strong> tells you how far ahead you need to predict.
        </p>

        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-5 my-6">
          <div className="min-w-[650px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
                <div key={m} className={`flex-1 rounded-lg border p-3 text-center ${i <= 5 ? 'border-emerald-300 bg-emerald-100 text-emerald-900' : 'border-amber-300 bg-amber-100 text-amber-900'}`}>
                  {m}
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="font-semibold text-emerald-800">Observed past</span>
              <span className="font-semibold text-indigo-800">Forecast origin: end of June</span>
              <span className="font-semibold text-amber-800">3-step horizon: Jul–Sep</span>
            </div>
          </div>
        </div>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-bold text-emerald-900">One-step-ahead forecasting</p>
            <p className="mt-2 text-sm text-emerald-900">Predict the next period, observe it when it arrives, then forecast the following period. New actual values may become available between forecasts.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold text-amber-900">Multi-step forecasting</p>
            <p className="mt-2 text-sm text-amber-900">Predict several future periods from one forecast origin. The evaluation setup must match this real deployment requirement.</p>
          </div>
        </div>
      </section>

      {/* PATTERNS */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Common Patterns in Time Series</h2>
        <p className="text-lg leading-relaxed mb-4">
          A series does not have to contain every pattern below. These are common structures to look for before selecting a method.
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <h3 className="font-bold text-indigo-900">Trend</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">A long-run rise, fall or other smooth movement. Trend can be linear or curved.</p>
            <div className="mt-4 flex h-16 items-end gap-2">
              {[20, 28, 34, 42, 51, 60, 68].map((h) => <div key={h} className="flex-1 rounded-t bg-indigo-300" style={{ height: `${h}%` }} />)}
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-bold text-emerald-900">Seasonality</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">A repeating pattern tied to a known frequency, such as day-of-week, month-of-year or hour-of-day.</p>
            <div className="mt-4 flex h-16 items-end gap-2">
              {[25, 50, 75, 40, 25, 50, 75, 40].map((h, i) => <div key={i} className="flex-1 rounded-t bg-emerald-300" style={{ height: `${h}%` }} />)}
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-bold text-amber-900">Cycles</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Longer rises and falls whose duration is not locked to a fixed calendar period, for example some business or economic cycles.</p>
            <div className="mt-4 flex h-16 items-end gap-2">
              {[20, 35, 55, 70, 62, 45, 30, 38].map((h, i) => <div key={i} className="flex-1 rounded-t bg-amber-300" style={{ height: `${h}%` }} />)}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-900">Irregular / residual variation</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Variation not explained by the modeled structure. Residual patterns are a warning that the model may still be missing useful information.</p>
            <div className="mt-4 flex h-16 items-end gap-2">
              {[40, 25, 58, 33, 50, 20, 61, 38].map((h, i) => <div key={i} className="flex-1 rounded-t bg-slate-300" style={{ height: `${h}%` }} />)}
            </div>
          </div>
        </div>
      </section>

      {/* DECOMPOSITION */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Decomposition: Separate Trend, Seasonality and Residual</h2>
        <p className="text-lg leading-relaxed mb-4">
          A common additive decomposition writes a series as:
        </p>
        <div className="not-prose rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-center my-5">
          <p className="font-mono text-lg font-bold text-indigo-950">Observed = Trend + Seasonal + Residual</p>
        </div>
        <p className="text-base leading-relaxed text-slate-700">
          Notice that this decomposition does <strong>not</strong> return a separate “cycle” component. Different decomposition methods make different structural assumptions. In statsmodels, <code className="bg-slate-100 px-1 rounded text-sm font-mono">seasonal_decompose</code> is a simple moving-average-based decomposition and should be treated as an exploratory tool rather than a universal truth about the data.
        </p>

        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">decomposition.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose

# 4 years of monthly data with a known trend + seasonal pattern
dates = pd.date_range("2021-01-01", periods=48, freq="MS")
t = np.arange(48)
seasonal_pattern = np.array([
    -12, -8, -4, 0, 5, 10,
     14,  9,  4, -2, -7, -9
])

sales = 100 + 0.8 * t + np.tile(seasonal_pattern, 4)
ts = pd.Series(sales, index=dates, name="sales")

result = seasonal_decompose(
    ts,
    model="additive",
    period=12
)

print("First 3 observed:", ts.head(3).round(1).to_list())
print("First 3 seasonal:", result.seasonal.head(3).round(1).to_list())
print(
    "First 3 available trend:",
    result.trend.dropna().head(3).round(1).to_list()
)
print(
    "Max absolute residual:",
    round(result.resid.dropna().abs().max(), 6)
)

# Output:
# First 3 observed: [88.0, 92.8, 97.6]
# First 3 seasonal: [-12.0, -8.0, -4.0]
# First 3 available trend: [104.8, 105.6, 106.4]
# Max absolute residual: 0.0`}</pre>
        </div>

        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="font-bold text-slate-900">Why is the residual exactly zero here?</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Because this teaching series was deliberately created as an exact additive trend plus a repeating 12-month seasonal pattern. Real data is usually noisier, so residuals will not normally be zero.
          </p>
        </div>
      </section>

      {/* CHRONOLOGICAL SPLIT */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">The Core Evaluation Rule: Preserve Time Order</h2>
        <p className="text-lg leading-relaxed mb-4">
          For ordinary forecasting, the evaluation set should occur <strong>after</strong> the training data. Randomly mixing future observations into training can produce an unrealistic estimate of performance.
        </p>

        <div className="not-prose grid md:grid-cols-[3fr_1fr] gap-2 my-6">
          <div className="rounded-lg border border-emerald-300 bg-emerald-100 p-4 text-center text-sm font-bold text-emerald-900">TRAIN: Jan 2021 → Dec 2023</div>
          <div className="rounded-lg border border-amber-300 bg-amber-100 p-4 text-center text-sm font-bold text-amber-900">TEST: Jan → Dec 2024</div>
        </div>

        <p className="text-base leading-relaxed text-slate-700">
          “Never shuffle” is a good beginner rule for ordinary forecasting, but the deeper principle is more precise: <strong>your validation scheme must reproduce what information would really have been available at prediction time</strong>. In unusual experimental settings, another design may be justified—but it must not leak future information.
        </p>
      </section>

      {/* BASELINES */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Baseline Forecasts — Start Simple</h2>
        <p className="text-lg leading-relaxed mb-4">
          A baseline gives you a minimum standard that a more complicated model should justify beating. The correct baseline depends on the series.
        </p>

        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">Naive</p>
            <p className="mt-2 text-sm text-slate-700">Forecast future values using the most recent observed value.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">Seasonal naive</p>
            <p className="mt-2 text-sm text-slate-700">Forecast using the corresponding value from the previous seasonal cycle.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">Mean / moving baseline</p>
            <p className="mt-2 text-sm text-slate-700">Use a historical mean or recent-window summary when that matches the problem.</p>
          </div>
        </div>

        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">baseline_forecasts.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Same 4-year monthly teaching series
dates = pd.date_range("2021-01-01", periods=48, freq="MS")
t = np.arange(48)
seasonal_pattern = np.array([
    -12, -8, -4, 0, 5, 10,
     14,  9,  4, -2, -7, -9
])

sales = 100 + 0.8 * t + np.tile(seasonal_pattern, 4)
ts = pd.Series(sales, index=dates, name="sales")

# Hold out the final 12 months
train = ts.iloc[:-12]
test = ts.iloc[-12:]

# Baseline 1: repeat the last observed value
naive = pd.Series(train.iloc[-1], index=test.index)

# Baseline 2: repeat the previous 12-month seasonal cycle
seasonal_naive = pd.Series(
    train.iloc[-12:].to_numpy(),
    index=test.index
)

for name, preds in [
    ("Naive", naive),
    ("Seasonal naive", seasonal_naive)
]:
    mae = mean_absolute_error(test, preds)
    rmse = mean_squared_error(test, preds) ** 0.5
    print(f"{name:<15} MAE={mae:.2f} RMSE={rmse:.2f}")

print("Train:", train.index[0].date(), "to", train.index[-1].date())
print("Test: ", test.index[0].date(), "to", test.index[-1].date())

# Output:
# Naive           MAE=14.57 RMSE=16.74
# Seasonal naive  MAE=9.60 RMSE=9.60
# Train: 2021-01-01 to 2023-12-01
# Test:  2024-01-01 to 2024-12-01`}</pre>
        </div>

        <div className="not-prose rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-900">Do not memorize “seasonal naive is best.”</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            It is better only for this particular example. A non-seasonal random-walk-like series may favor a naive forecast, while another dataset may need a different baseline.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Forecast Error Metrics</h2>
        <p className="text-lg leading-relaxed mb-4">
          Forecasting usually uses regression-style error measures because the target is numeric. No single metric is best for every problem.
        </p>

        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
          <table className="w-full text-sm">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="p-3 text-left">Metric</th>
                <th className="p-3 text-left">Main idea</th>
                <th className="p-3 text-left">Useful when</th>
                <th className="p-3 text-left">Caution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-3 font-bold text-indigo-700">MAE</td>
                <td className="p-3">Average absolute error</td>
                <td className="p-3">You want an error in the target's original units</td>
                <td className="p-3">Does not increase the penalty quadratically for large misses</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">RMSE</td>
                <td className="p-3">Square errors, average, then square-root</td>
                <td className="p-3">Larger errors should receive more weight</td>
                <td className="p-3">Can be strongly influenced by large errors</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">MAPE</td>
                <td className="p-3">Absolute error relative to actual magnitude</td>
                <td className="p-3">Relative percentage-style interpretation is meaningful</td>
                <td className="p-3">Problematic when actual values are zero or very close to zero</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">MASE</td>
                <td className="p-3">Scale MAE by a naive in-sample error</td>
                <td className="p-3">Comparing error across series with different scales</td>
                <td className="p-3">Requires a sensible scaling baseline and seasonal definition</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3 mt-7">Worked Example</h3>
        <p className="text-base leading-relaxed text-slate-700 mb-3">Suppose:</p>
        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm my-4">
          <p>Actual: &nbsp;&nbsp;&nbsp;120, 135, 128, 142, 130</p>
          <p>Forecast: &nbsp;118, 140, 125, 145, 133</p>
          <p className="mt-3">Absolute errors: 2, 5, 3, 3, 3</p>
        </div>

        <p className="text-base leading-relaxed">
          Therefore:
        </p>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-5">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
            <p className="text-sm text-indigo-800">MAE</p>
            <p className="mt-1 font-mono text-lg font-bold text-indigo-950">(2+5+3+3+3)/5 = 3.20</p>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
            <p className="text-sm text-indigo-800">RMSE</p>
            <p className="mt-1 font-mono text-lg font-bold text-indigo-950">≈ 3.35</p>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
            <p className="text-sm text-indigo-800">MAPE</p>
            <p className="mt-1 font-mono text-lg font-bold text-indigo-950">≈ 2.43%</p>
          </div>
        </div>

        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">forecast_metrics.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

actual = np.array([120, 135, 128, 142, 130], dtype=float)
predicted = np.array([118, 140, 125, 145, 133], dtype=float)

errors = actual - predicted
mae = np.mean(np.abs(errors))
rmse = np.sqrt(np.mean(errors ** 2))
mape = np.mean(np.abs(errors / actual)) * 100

print(f"MAE:  {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"MAPE: {mape:.2f}%")

# Output:
# MAE:  3.20
# RMSE: 3.35
# MAPE: 2.43%`}</pre>
        </div>

        <div className="not-prose rounded-xl border border-rose-200 bg-rose-50 p-5">
          <p className="font-bold text-rose-900">MAPE warning</p>
          <p className="mt-2 text-sm leading-relaxed text-rose-900">
            When actual values are zero or very close to zero, percentage errors can become undefined or extremely large. Do not choose MAPE only because percentages sound easy to explain.
          </p>
        </div>
      </section>

      {/* WALK FORWARD */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Walk-Forward / Time-Series Cross-Validation</h2>
        <p className="text-lg leading-relaxed mb-4">
          One final holdout tells you how the model performed over one future window. During model development, you may want several historical forecast origins. A time-aware splitter repeatedly trains on earlier observations and validates on later observations.
        </p>

        <div className="not-prose space-y-2 my-6 font-mono text-sm">
          <div className="rounded-lg border border-slate-200 bg-white p-3"><span className="text-emerald-700 font-bold">Fold 1:</span> [TRAIN 0–5] [VALIDATE 6–7]</div>
          <div className="rounded-lg border border-slate-200 bg-white p-3"><span className="text-emerald-700 font-bold">Fold 2:</span> [TRAIN 0–7] [VALIDATE 8–9]</div>
          <div className="rounded-lg border border-slate-200 bg-white p-3"><span className="text-emerald-700 font-bold">Fold 3:</span> [TRAIN 0–9] [VALIDATE 10–11]</div>
        </div>

        <p className="text-base leading-relaxed text-slate-700">
          Standard K-Fold is not wrong because it always shuffles—it does not shuffle by default. The problem is that ordinary folds can train on observations that occur <strong>after</strong> the validation observations. That is why a time-aware splitting strategy is needed for forecasting.
        </p>

        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">time_series_split.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np
from sklearn.model_selection import TimeSeriesSplit

X = np.arange(12)
cv = TimeSeriesSplit(n_splits=3, test_size=2)

for i, (train_idx, valid_idx) in enumerate(cv.split(X), start=1):
    print(
        f"Fold {i}: train={train_idx.tolist()} "
        f"validation={valid_idx.tolist()}"
    )

# Output:
# Fold 1: train=[0, 1, 2, 3, 4, 5] validation=[6, 7]
# Fold 2: train=[0, 1, 2, 3, 4, 5, 6, 7] validation=[8, 9]
# Fold 3: train=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9] validation=[10, 11]`}</pre>
        </div>

        <div className="not-prose rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-900">Match the folds to the business horizon.</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            If production requires a 12-month forecast from a single origin, evaluating only repeated one-month-ahead predictions can give a misleading impression. Validation should imitate the horizon, update frequency and data availability of the real system.
          </p>
        </div>
      </section>

      {/* ML FORECASTING */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Machine Learning Forecasting with Lag Features</h2>
        <p className="text-lg leading-relaxed mb-4">
          A tabular ML model such as Gradient Boosting does not automatically understand time. We can convert past observations into features such as <code className="bg-slate-100 px-1 rounded text-sm font-mono">lag_1</code>, <code className="bg-slate-100 px-1 rounded text-sm font-mono">lag_12</code>, rolling statistics and calendar variables.
        </p>

        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 my-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="p-2">Target month</th>
                <th className="p-2">lag_1</th>
                <th className="p-2">lag_2</th>
                <th className="p-2">lag_12</th>
                <th className="p-2">month</th>
                <th className="p-2">Target sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr><td className="p-2">Jan 2025</td><td className="p-2">Dec 2024</td><td className="p-2">Nov 2024</td><td className="p-2">Jan 2024</td><td className="p-2">1</td><td className="p-2 font-bold">?</td></tr>
            </tbody>
          </table>
        </div>

        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">ml_one_step_forecasting.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error

rng = np.random.default_rng(42)
dates = pd.date_range("2019-01-01", periods=84, freq="MS")
t = np.arange(84)

sales = (
    100
    + 0.7 * t
    + 12 * np.sin(2 * np.pi * t / 12)
    + rng.normal(0, 2, 84)
)

df = pd.DataFrame({"sales": sales}, index=dates)
df["lag_1"] = df["sales"].shift(1)
df["lag_2"] = df["sales"].shift(2)
df["lag_12"] = df["sales"].shift(12)
df["month"] = df.index.month
df = df.dropna()

features = ["lag_1", "lag_2", "lag_12", "month"]

# Last 12 target months are evaluated chronologically
train = df.iloc[:-12]
test = df.iloc[-12:]

model = GradientBoostingRegressor(
    n_estimators=100,
    max_depth=2,
    learning_rate=0.05,
    random_state=42
)
model.fit(train[features], train["sales"])

pred = model.predict(test[features])
naive_pred = test["lag_1"].to_numpy()

print("Train rows:", len(train), "| Test rows:", len(test))
print(
    "Naive one-step MAE:",
    round(mean_absolute_error(test["sales"], naive_pred), 2)
)
print(
    "Gradient Boosting one-step MAE:",
    round(mean_absolute_error(test["sales"], pred), 2)
)
print("First 3 model forecasts:", np.round(pred[:3], 2).tolist())

# Output:
# Train rows: 60 | Test rows: 12
# Naive one-step MAE: 4.58
# Gradient Boosting one-step MAE: 4.38
# First 3 model forecasts: [144.02, 154.19, 155.89]`}</pre>
        </div>

        <div className="not-prose rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-bold text-indigo-950">What exactly did this ML example evaluate?</p>
          <p className="mt-2 text-sm leading-relaxed text-indigo-900">
            It is a <strong>rolling one-step-ahead</strong> setup. For each target month, lag features use actual observations from earlier months. This is appropriate when the real system receives each new actual value before making the next forecast. It is <strong>not</strong> the same as producing all 12 future months at once from a single forecast origin.
          </p>
        </div>
      </section>

      {/* MULTISTEP */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Going Deeper: Multi-Step Forecasting Strategies</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">Recursive</p>
            <p className="mt-2 text-sm text-slate-700">Predict one step, feed that prediction back as an input, then predict the next step. Errors can accumulate.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">Direct</p>
            <p className="mt-2 text-sm text-slate-700">Train separate logic/models for different horizons, such as one-month-ahead and six-month-ahead.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">Multi-output</p>
            <p className="mt-2 text-sm text-slate-700">Predict several future horizons together when the modeling method supports it.</p>
          </div>
        </div>
        <p className="text-base leading-relaxed text-slate-700">
          There is no universally best strategy. The right choice depends on horizon length, model type, data size and how errors propagate across steps.
        </p>
      </section>

      {/* POINT VS INTERVAL */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Point Forecasts and Forecast Intervals</h2>
        <p className="text-lg leading-relaxed mb-4">
          A point forecast gives one number, such as “next month's demand = 1,250 units.” Real forecasts are uncertain, so many forecasting systems also report an interval.
        </p>
        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 my-5">
          <p className="font-mono text-sm text-slate-800">Point forecast: 1,250 units</p>
          <p className="mt-2 font-mono text-sm text-slate-800">Illustrative interval: 1,150 to 1,360 units</p>
        </div>
        <p className="text-base leading-relaxed text-slate-700">
          An interval is not a guarantee that the future value must lie inside that range. Its interpretation depends on the method and assumptions used to construct it.
        </p>
      </section>

      {/* METHODS */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Forecasting Methods Compared</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
          <table className="w-full text-sm">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="p-3 text-left">Family</th>
                <th className="p-3 text-left">Typical idea</th>
                <th className="p-3 text-left">Useful when</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="p-3 font-bold text-indigo-700">Naive / seasonal naive</td>
                <td className="p-3">Repeat recent or seasonal history</td>
                <td className="p-3">Baseline and surprisingly competitive simple patterns</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">Moving averages</td>
                <td className="p-3">Summarize a recent window</td>
                <td className="p-3">Smoothing or simple short-horizon rules</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">Exponential smoothing</td>
                <td className="p-3">Update level, trend and possibly seasonality</td>
                <td className="p-3">Structured level/trend/seasonal patterns</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">ARIMA / seasonal extensions</td>
                <td className="p-3">Autoregression, differencing and lagged innovations</td>
                <td className="p-3">Linear time dependence with suitable transformations</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">Tabular ML</td>
                <td className="p-3">Lag, rolling, calendar and external features</td>
                <td className="p-3">Nonlinear relations or many useful predictors</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-indigo-700">Sequence / deep learning</td>
                <td className="p-3">Learn complex temporal representations</td>
                <td className="p-3">Large or complex sequence problems where extra complexity is justified</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-relaxed text-slate-700">
          A more complex family is not automatically more accurate. Model choice should be demonstrated by time-aware validation against meaningful baselines.
        </p>
      </section>

      {/* COMMON MISTAKES */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Common Forecasting Mistakes</h2>
        <div className="not-prose space-y-3 my-6">
          {[
            ['Leaking future information', 'Create features and preprocessing so that every forecast uses only information that existed at that forecast origin.'],
            ['Using a random split by habit', 'Use chronological holdouts or time-aware folds when future periods are the real target.'],
            ['Skipping a baseline', 'Measure naive or seasonal-naive performance before claiming that a complex model adds value.'],
            ['Evaluating the wrong horizon', 'If production needs a 12-step forecast, validate a 12-step forecasting process—not only one-step predictions.'],
            ['Using MAPE near zero', 'Choose another metric when zero or near-zero actual values make percentage errors unstable.'],
            ['Calling every pattern “seasonality”', 'Seasonality repeats at a known frequency; longer irregular cycles are a different idea.'],
            ['Treating decomposition as ground truth', 'Decomposition depends on the selected method, period and assumptions.'],
            ['Assuming ARIMA requires a stationary raw series', 'Differencing is part of ARIMA; the modeled AR/MA structure is applied after the chosen integration/differencing treatment.'],
          ].map(([title, fix]) => (
            <div key={title} className="rounded-xl border border-rose-200 bg-white p-4">
              <p className="font-bold text-rose-700">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700"><strong>Better approach:</strong> {fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHECKLIST */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">A Practical Forecasting Checklist</h2>
        <div className="not-prose rounded-xl border border-indigo-200 bg-indigo-50 p-6">
          <ol className="space-y-3 text-sm leading-relaxed text-slate-800">
            <li><strong>1.</strong> Define the target, data frequency and forecast horizon.</li>
            <li><strong>2.</strong> Plot the series and inspect trend, seasonality, missing periods and unusual events.</li>
            <li><strong>3.</strong> Decide exactly what information is available at each forecast origin.</li>
            <li><strong>4.</strong> Hold out later periods for realistic evaluation.</li>
            <li><strong>5.</strong> Build at least one simple baseline.</li>
            <li><strong>6.</strong> Choose metrics that reflect the cost and scale of mistakes.</li>
            <li><strong>7.</strong> Train and tune models using time-aware validation.</li>
            <li><strong>8.</strong> Compare models with the same horizon and same evaluation windows.</li>
            <li><strong>9.</strong> Inspect residuals and forecast plots—not only a single score.</li>
            <li><strong>10.</strong> Refit/update the forecasting process when new data arrives, according to the deployment plan.</li>
          </ol>
        </div>
      </section>

      {/* QUICK RECAP */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Quick Recap</h2>
        <div className="not-prose space-y-3 my-6">
          <details className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-bold text-slate-900">Why is a random train/test split risky for forecasting?</summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Because training can contain observations that occur after validation/test observations, giving the model information that would not have existed at prediction time.</p>
          </details>
          <details className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-bold text-slate-900">Why build a naive baseline?</summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">It tells you whether the extra complexity of your forecasting model produces a meaningful improvement over a simple rule.</p>
          </details>
          <details className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-bold text-slate-900">Is one-step MAE enough if the business needs a 12-month forecast?</summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">No. The evaluation should reproduce the 12-step forecast horizon, because error behavior can change as the forecast moves farther from the origin.</p>
          </details>
        </div>
      </section>

      {/* LEARNING PATH */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Connect This Lesson</h2>
        <div className="not-prose grid md:grid-cols-4 gap-3 my-5">
          <a href="/learn/arima" className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-indigo-700 hover:border-indigo-300">ARIMA</a>
          <a href="/learn/moving-average" className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-indigo-700 hover:border-indigo-300">Moving Average</a>
          <a href="/learn/exponential-smoothing" className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-indigo-700 hover:border-indigo-300">Exponential Smoothing</a>
          <a href="/learn/semi-supervised" className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-indigo-700 hover:border-indigo-300">Next: Semi-Supervised Learning</a>
        </div>
      </section>

      {/* SUMMARY */}
      <section>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">Summary</h2>
        <p className="text-lg leading-relaxed mb-4">
          Good forecasting begins with the evaluation design, not with the most advanced algorithm. Define the forecast origin and horizon, preserve time order, understand the series, establish meaningful baselines, and compare models on future-like windows using suitable error metrics.
        </p>
        <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-4 mb-10">
          <p className="text-slate-900 font-bold mb-2 text-lg">Key Takeaway</p>
          <p className="text-slate-800 italic text-base leading-relaxed">
            The best forecasting model is not the one with the most sophisticated name. It is the one that consistently improves on sensible baselines under an evaluation setup that matches how the future will actually arrive.
          </p>
        </div>
      </section>
    </div>
  );
}
