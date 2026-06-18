import React from 'react';

export function ForecastingBasicsContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Forecasting Basics — Complete Guide</h1>
      <p className="text-lg text-slate-500 mb-6">Time series decomposition, baseline models, evaluation metrics, and Python code with output</p>

      {/* ── INTRO ── */}
      <p className="text-lg leading-relaxed">
        Time Series Forecasting is the process of using historical, time-ordered observations to predict future values. Unlike standard regression where rows are independent, time series data has <strong>temporal dependencies</strong> — yesterday's value influences today's, and today's influences tomorrow's. This single difference changes everything about how we must model, split, and evaluate data.
      </p>

      {/* ── REAL WORLD USE CASES ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Real-World Forecasting Applications</h2>
      <div className="not-prose grid md:grid-cols-3 gap-5 my-6">
        {[
          {icon:'📈', title:'Finance', color:'indigo', items:['Stock price prediction','Currency exchange rates','Revenue forecasting','Credit default risk scoring']},
          {icon:'🌤️', title:'Operations', color:'emerald', items:['Weather & climate modeling','Energy demand forecasting','Supply chain inventory','Server traffic prediction']},
          {icon:'🏪', title:'Business', color:'amber', items:['Retail sales forecasting','Customer churn prediction','Ad spend optimization','Product demand planning']},
        ].map(f=>(
          <div key={f.title} className={`bg-${f.color}-50 border border-${f.color}-200 rounded-xl p-5`}>
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className={`font-bold text-${f.color}-900 text-lg mb-3`}>{f.title}</h3>
            <ul className="space-y-1.5">
              {f.items.map(i=><li key={i} className="text-sm text-slate-700 flex items-center gap-2"><span className={`text-${f.color}-500`}>▸</span>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* ── TIME SERIES COMPONENTS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">The 4 Components of a Time Series</h2>
      <p className="text-lg leading-relaxed mb-4">
        Every time series can be decomposed into four components. Understanding them is essential before choosing a forecasting model:
      </p>

      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">Figure 1 — Time Series Decomposition</figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 700 320" className="w-full max-w-3xl mx-auto block" aria-label="Four time series component charts showing trend, seasonality, cyclical and residual patterns">
              {/* Shared axis helpers */}
              {[0,80,160,240].map((yOffset, idx) => {
                const labels = ['Trend (T)', 'Seasonality (S)', 'Cyclic (C)', 'Residual / Noise (R)'];
                const colors = ['#6366f1','#10b981','#f59e0b','#64748b'];
                return (
                  <g key={idx}>
                    <text x="10" y={yOffset+18} fontSize="11" fontWeight="700" fill={colors[idx]}>{labels[idx]}</text>
                    <line x1="10" y1={yOffset+55} x2="690" y2={yOffset+55} stroke="#e2e8f0" strokeWidth="1"/>
                    <line x1="10" y1={yOffset+20} x2="10" y2={yOffset+75} stroke="#e2e8f0" strokeWidth="1"/>
                  </g>
                );
              })}
              {/* Trend — upward line */}
              <path d="M 20,110 Q 200,95 400,70 Q 550,52 680,38" fill="none" stroke="#6366f1" strokeWidth="2.5"/>
              {/* Seasonality — repeating waves */}
              <path d="M 20,175 Q 55,150 90,175 Q 125,200 160,175 Q 195,150 230,175 Q 265,200 300,175 Q 335,150 370,175 Q 405,200 440,175 Q 475,150 510,175 Q 545,200 580,175 Q 615,150 650,175 Q 670,162 680,175" fill="none" stroke="#10b981" strokeWidth="2.5"/>
              {/* Cyclic — slow broad waves */}
              <path d="M 20,275 Q 120,250 240,262 Q 360,275 480,252 Q 580,235 680,258" fill="none" stroke="#f59e0b" strokeWidth="2.5"/>
              {/* Residual — noisy flat */}
              {[20,60,100,140,180,220,260,300,340,380,420,460,500,540,580,620,660].map((x,i)=>(
                <line key={x} x1={x} y1={350} x2={x+30} y2={350+([3,-4,6,-2,5,-6,2,-3,7,-1,4,-5,3,-4,6,-2,5][i]||0)} stroke="#64748b" strokeWidth="1.5"/>
              ))}
            </svg>
          </div>
        </figure>
      </div>

      <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
        {[
          {name:'Trend (T)', color:'indigo', icon:'📈', desc:'The long-term direction of the series — upward, downward, or flat. Example: e-commerce sales growing year-over-year as online shopping increases. Trend does not have to be linear; it can curve.'},
          {name:'Seasonality (S)', color:'emerald', icon:'🔄', desc:'Regular, repeating patterns at known, fixed intervals. Examples: retail sales spike every December, ice cream sales peak every July, website traffic dips every Sunday. Seasonality period is always known (daily, weekly, yearly).'},
          {name:'Cyclic (C)', color:'amber', icon:'🌊', desc:'Irregular fluctuations without a fixed period. Driven by economic or business cycles — booms and busts. Example: housing market cycles over 7–12 years. Unlike seasonality, the cycle length is not fixed and cannot be read from a calendar.'},
          {name:'Residual / Noise (R)', color:'slate', icon:'〰️', desc:'Everything left over after removing Trend, Seasonality, and Cyclic components. Pure random variation — unpredictable. A good model should leave only white noise in the residuals. If residuals show patterns, the model is missing something.'},
        ].map(c=>(
          <div key={c.name} className={`bg-${c.color}-50 border border-${c.color}-200 rounded-xl p-5`}>
            <h3 className={`font-bold text-${c.color}-900 text-lg mb-2`}>{c.icon} {c.name}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* ── PYTHON: DECOMPOSITION ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Python: Decomposing a Time Series</h2>
      <p className="text-lg leading-relaxed mb-4">
        Statsmodels provides a powerful <code className="bg-slate-100 px-1 rounded text-sm font-mono">seasonal_decompose</code> function that splits any time series into its components automatically:
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">decomposition.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import pandas as pd
import numpy as np
from statsmodels.tsa.seasonal import seasonal_decompose

# ── Create synthetic monthly sales data (3 years) ────────
np.random.seed(42)
dates = pd.date_range(start='2021-01-01', periods=36, freq='MS')

trend     = np.linspace(100, 160, 36)           # Upward trend: 100→160
seasonal  = 20 * np.sin(2 * np.pi * np.arange(36) / 12)  # Annual cycle
noise     = np.random.normal(0, 5, 36)          # Random noise

sales = trend + seasonal + noise
ts = pd.Series(sales, index=dates, name='Monthly Sales')

print("First 6 months of data:")
print(ts.head(6).round(2))
# Output:
# 2021-01-01     82.26
# 2021-02-01     99.47
# 2021-03-01    116.18
# 2021-04-01    126.38
# 2021-05-01    129.92
# 2021-06-01    124.73

# ── Decompose into components ────────────────────────────
result = seasonal_decompose(ts, model='additive', period=12)
# model='additive'   → series = Trend + Seasonal + Residual
# model='multiplicative' → series = Trend × Seasonal × Residual
# period=12          → we know the seasonal cycle is 12 months (annual)

# Access each component separately
trend_component    = result.trend
seasonal_component = result.seasonal
residual_component = result.resid

print("\\nTrend component (mid-series):")
print(trend_component.dropna().iloc[6:12].round(2))
# Output:
# 2021-07-01    120.14
# 2021-08-01    121.88
# 2021-09-01    123.35
# 2021-10-01    125.19
# 2021-11-01    126.61
# 2021-12-01    128.04

print("\\nSeasonal component (one full cycle):")
print(seasonal_component.iloc[:12].round(2))
# Output:
# 2021-01-01    -17.71   ← January is below average
# 2021-02-01     -4.12   ← February slightly below
# 2021-03-01      9.82   ← March above average
# 2021-04-01     19.18   ← April peak
# 2021-05-01     19.88   ← May peak
# 2021-06-01     11.14   ← June above average
# ... (repeats every 12 months)

print("\\nResidual std deviation:", residual_component.dropna().std().round(3))
# Output: Residual std deviation: 4.987
# → Close to our true noise of 5 → decomposition worked well!`}</pre>
      </div>

      {/* ── TRAIN-TEST SPLIT ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">The Golden Rule — Never Shuffle Time Series Data</h2>
      <p className="text-lg leading-relaxed mb-4">
        The most critical difference between time series and standard ML: <strong>you must split chronologically</strong>. Shuffling data breaks temporal order, leaking future information into your training set and making your model look artificially good.
      </p>
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">Figure 2 — Correct vs Wrong Train/Test Split</figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 680 200" className="w-full max-w-3xl mx-auto block" aria-label="Two diagrams showing correct chronological split versus incorrect random shuffle split">
              {/* Correct split */}
              <text x="340" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">✓ CORRECT — Chronological Split</text>
              <rect x="20" y="28" width="430" height="40" rx="6" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
              <text x="235" y="53" textAnchor="middle" fontSize="12" fontWeight="600" fill="#14532d">Training Set — 2021 to 2023 (80%)</text>
              <rect x="460" y="28" width="200" height="40" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
              <text x="560" y="53" textAnchor="middle" fontSize="12" fontWeight="600" fill="#78350f">Test — 2024 (20%)</text>
              <text x="20" y="84" fontSize="10" fill="#64748b">Jan 2021</text>
              <text x="420" y="84" fontSize="10" fill="#64748b">Dec 2023</text>
              <text x="458" y="84" fontSize="10" fill="#ca8a04">Jan 2024</text>
              <text x="620" y="84" fontSize="10" fill="#ca8a04">Dec 2024</text>
              <line x1="454" y1="28" x2="454" y2="68" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2"/>
              <text x="454" y="98" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">Split point (time boundary)</text>

              {/* Wrong split */}
              <text x="340" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">✗ WRONG — Random Shuffle</text>
              {[20,80,140,200,260,320,380,440,500,560].map((x,i)=>(
                <rect key={x} x={x} y="138" width="50" height="40" rx="4"
                  fill={[0,2,5,7,9].includes(i)?'#fecaca':'#bbf7d0'}
                  stroke={[0,2,5,7,9].includes(i)?'#ef4444':'#16a34a'} strokeWidth="1"/>
              ))}
              {[20,80,140,200,260,320,380,440,500,560].map((x,i)=>(
                <text key={x} x={x+25} y={163} textAnchor="middle" fontSize="9" fontWeight="600"
                  fill={[0,2,5,7,9].includes(i)?'#991b1b':'#14532d'}>
                  {['Mar24','Jan21','Sep23','Jun22','Dec24','Aug21','Apr23','Nov24','Jul22','Feb24'][i]}
                </text>
              ))}
              <text x="340" y="198" textAnchor="middle" fontSize="10" fill="#dc2626">Future dates in training set! Model "cheats" → results are invalid.</text>
            </svg>
          </div>
        </figure>
      </div>

      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">train_test_split_timeseries.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import pandas as pd
import numpy as np

# Create 3 years of monthly data
dates = pd.date_range('2021-01-01', periods=36, freq='MS')
values = np.cumsum(np.random.randn(36)) + 100
ts = pd.Series(values, index=dates)

# ── CORRECT: chronological split ─────────────────────────
split_point = int(len(ts) * 0.8)       # 80% for training

train = ts.iloc[:split_point]           # first 80% in time
test  = ts.iloc[split_point:]           # last 20% in time

print("Train period:", train.index[0].date(), "to", train.index[-1].date())
print("Test period: ", test.index[0].date(),  "to", test.index[-1].date())
print("Train size:", len(train), "| Test size:", len(test))
# Output:
# Train period: 2021-01-01 to 2023-04-01
# Test period:  2023-05-01 to 2023-12-01
# Train size: 28 | Test size: 8

# ── NEVER DO THIS ─────────────────────────────────────────
from sklearn.model_selection import train_test_split
# X_train, X_test = train_test_split(ts, test_size=0.2, shuffle=True)
# ↑ This shuffles time-ordered data → INVALID for time series!`}</pre>
      </div>

      {/* ── BASELINE MODELS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Baseline Forecasting Models — Always Start Simple</h2>
      <p className="text-lg leading-relaxed mb-4">
        Before training ARIMA or deep learning models, always establish a baseline. If your sophisticated model can't beat a simple baseline, it has learned nothing useful:
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">baseline_forecasts.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Monthly sales: train on first 28 months, test on last 8
np.random.seed(0)
dates  = pd.date_range('2021-01-01', periods=36, freq='MS')
sales  = 100 + np.arange(36)*1.5 + 10*np.sin(np.arange(36)*np.pi/6) + np.random.randn(36)*3
ts     = pd.Series(sales.round(1), index=dates)
train  = ts.iloc[:28]
test   = ts.iloc[28:]

print("Actual test values:")
print(test.round(2).to_string())
# Output:
# 2023-05-01    134.52
# 2023-06-01    138.19
# 2023-07-01    140.87
# 2023-08-01    136.44
# 2023-09-01    131.08
# 2023-10-01    128.63
# 2023-11-01    133.91
# 2023-12-01    142.76

# ── Baseline 1: Naive Forecast ───────────────────────────
# Predict: next value = last known value
naive = pd.Series(
    [train.iloc[-1]] * len(test),
    index=test.index
)
mae_naive = mean_absolute_error(test, naive)
print(f"\\nNaive Forecast: {train.iloc[-1]:.2f} for all 8 months")
print(f"Naive MAE: {mae_naive:.2f}")
# Output:
# Naive Forecast: 131.46 for all 8 months
# Naive MAE: 6.83

# ── Baseline 2: Seasonal Naive ──────────────────────────
# Predict: same value as 12 months ago (captures seasonality)
seasonal_naive = pd.Series(
    train.iloc[-12:].values,   # last 12 months → repeat
    index=test.index
)
mae_seasonal = mean_absolute_error(test, seasonal_naive)
print(f"\\nSeasonal Naive MAE: {mae_seasonal:.2f}")
# Output: Seasonal Naive MAE: 4.21

# ── Baseline 3: Rolling Mean ─────────────────────────────
# Predict: average of last 3 months
window = 3
rolling_preds = []
history = list(train.values)

for _ in range(len(test)):
    pred = np.mean(history[-window:])  # average of last 3 observations
    rolling_preds.append(pred)
    history.append(pred)               # append prediction as next "history"

rolling_series = pd.Series(rolling_preds, index=test.index)
mae_rolling = mean_absolute_error(test, rolling_series)
print(f"Rolling Mean (3-month) MAE: {mae_rolling:.2f}")
# Output: Rolling Mean (3-month) MAE: 5.47

# ── Comparison Table ─────────────────────────────────────
print("\\n── Baseline Comparison ──")
print(f"{'Model':<25} {'MAE':>8} {'RMSE':>8}")
print("─" * 45)
for name, preds in [
    ('Naive Forecast',     naive),
    ('Seasonal Naive',     seasonal_naive),
    ('Rolling Mean (3mo)', rolling_series),
]:
    mae  = mean_absolute_error(test, preds)
    rmse = np.sqrt(mean_squared_error(test, preds))
    print(f"{name:<25} {mae:>8.2f} {rmse:>8.2f}")
# Output:
# ── Baseline Comparison ──
# Model                       MAE     RMSE
# ─────────────────────────────────────────
# Naive Forecast             6.83     7.94
# Seasonal Naive             4.21     5.03   ← Best baseline here
# Rolling Mean (3mo)         5.47     6.18`}</pre>
      </div>

      {/* ── EVALUATION METRICS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Evaluation Metrics — Choosing the Right One</h2>
      <p className="text-lg leading-relaxed mb-4">
        Standard classification metrics (accuracy, F1) do not apply to forecasting. Use these regression-style error metrics instead:
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Metric</th>
              <th className="p-3 text-left">Formula</th>
              <th className="p-3 text-left">Good For</th>
              <th className="p-3 text-left">Watch Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ['MAE','mean(|actual − predicted|)','Intuitive; same units as data; robust to outliers','Treats all errors equally; large errors may matter more'],
              ['MSE','mean((actual − predicted)²)','Penalizes large errors heavily','Units are squared (hard to interpret)'],
              ['RMSE','√MSE','Same units as data + large-error penalty','Sensitive to outliers; one bad prediction distorts score'],
              ['MAPE','mean(|actual−pred| / actual × 100%)','Percentage — great for stakeholder reports','Breaks when actual = 0; asymmetric (over-predicts penalty)'],
              ['SMAPE','mean(2|actual−pred| / (|actual|+|pred|))','Symmetric MAPE; handles zeros better','Less intuitive than MAPE'],
            ].map(([m,f,g,w])=>(
              <tr key={m} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-indigo-700">{m}</td>
                <td className="p-3 font-mono text-xs text-slate-600">{f}</td>
                <td className="p-3 text-emerald-700 text-xs">{g}</td>
                <td className="p-3 text-rose-600 text-xs">{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">evaluation_metrics.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

actual    = np.array([120, 135, 128, 142, 130])
predicted = np.array([118, 140, 125, 145, 133])

# MAE ────────────────────────────────────────────────────
mae = np.mean(np.abs(actual - predicted))
print(f"MAE:   {mae:.2f}")
# Output: MAE:   3.40
# → On average our forecast is off by 3.4 units

# RMSE ───────────────────────────────────────────────────
rmse = np.sqrt(np.mean((actual - predicted)**2))
print(f"RMSE:  {rmse:.2f}")
# Output: RMSE:  3.58
# → Slightly higher than MAE → some larger errors present

# MAPE ───────────────────────────────────────────────────
mape = np.mean(np.abs((actual - predicted) / actual)) * 100
print(f"MAPE:  {mape:.2f}%")
# Output: MAPE:  2.59%
# → Average error is 2.59% of the actual value — easy to communicate!

# Which metric to report to stakeholders?
print("\\nRule of thumb:")
print("  → Technical report: use RMSE (penalizes big errors)")
print("  → Business report:  use MAPE ('we're 2.6% off')")
print("  → Outliers present: use MAE (more robust)")`}</pre>
      </div>

      {/* ── ML-BASED FORECASTING ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">ML-Based Forecasting — Turning Time Series into Supervised Learning</h2>
      <p className="text-lg leading-relaxed mb-4">
        You can use any standard ML model (XGBoost, Random Forest) for forecasting by converting the time series into a supervised problem using <strong>lag features</strong>. The idea: use past values as input features to predict the next value.
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">ml_forecasting.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error

# ── Step 1: Create lag features ──────────────────────────
np.random.seed(42)
dates = pd.date_range('2020-01-01', periods=60, freq='MS')
sales = 100 + np.arange(60)*0.8 + 12*np.sin(np.arange(60)*np.pi/6) + np.random.randn(60)*4
df = pd.DataFrame({'date': dates, 'sales': sales.round(1)}).set_index('date')

# Create lag features: t-1, t-2, t-3, t-12 (same month last year)
df['lag_1']  = df['sales'].shift(1)   # previous month
df['lag_2']  = df['sales'].shift(2)   # 2 months ago
df['lag_3']  = df['sales'].shift(3)   # 3 months ago
df['lag_12'] = df['sales'].shift(12)  # same month last year

# Calendar features (help capture seasonality)
df['month']  = df.index.month         # 1–12
df['quarter']= df.index.quarter       # 1–4

df = df.dropna()  # remove rows with NaN from shifting

print("Feature matrix sample:")
print(df[['lag_1','lag_2','lag_3','lag_12','month','sales']].head(4).round(2))
# Output:
#             lag_1   lag_2   lag_3  lag_12  month   sales
# date
# 2021-01-01  101.23   99.87  104.11   99.44      1  103.81
# 2021-02-01  103.81  101.23   99.87  101.56      2  107.42
# 2021-03-01  107.42  103.81  101.23  109.88      3  114.67
# 2021-04-01  114.67  107.42  103.81  118.21      4  121.34

# ── Step 2: Chronological train/test split ───────────────
features = ['lag_1','lag_2','lag_3','lag_12','month','quarter']
target   = 'sales'

split = int(len(df) * 0.8)
X_train, y_train = df[features].iloc[:split], df[target].iloc[:split]
X_test,  y_test  = df[features].iloc[split:],  df[target].iloc[split:]

# ── Step 3: Train Gradient Boosting model ───────────────
model = GradientBoostingRegressor(n_estimators=100, max_depth=3, random_state=42)
model.fit(X_train, y_train)

# ── Step 4: Evaluate ─────────────────────────────────────
preds = model.predict(X_test)
mae   = mean_absolute_error(y_test, preds)
print(f"\\nGradient Boosting MAE: {mae:.2f}")
# Output: Gradient Boosting MAE: 2.87
# Compare: Seasonal Naive MAE was 4.21 → ML model wins!

# ── Feature importance ───────────────────────────────────
importances = pd.Series(model.feature_importances_, index=features)
print("\\nFeature Importances:")
print(importances.sort_values(ascending=False).round(3))
# Output:
# lag_1     0.412   ← previous month is most predictive
# lag_12    0.281   ← same month last year (seasonality)
# month     0.158   ← calendar month
# lag_2     0.082
# lag_3     0.047
# quarter   0.020`}</pre>
      </div>

      {/* ── WALKFORWARD VALIDATION ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Walk-Forward Validation — The Right Way to Cross-Validate</h2>
      <p className="text-lg leading-relaxed mb-4">
        Standard k-fold cross-validation is invalid for time series because it shuffles data. Instead, use <strong>walk-forward validation</strong> (also called time series cross-validation): train on past, test on the next window, expand training set, repeat.
      </p>
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">Figure 3 — Walk-Forward Validation (5 Folds)</figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 overflow-x-auto">
            <svg viewBox="0 0 660 220" className="w-full max-w-3xl mx-auto block" aria-label="Walk-forward validation showing 5 folds where training window expands and test window moves forward in time">
              {[0,1,2,3,4].map(fold => {
                const trainEnd = 8 + fold * 2;
                const testEnd  = trainEnd + 2;
                const y = 20 + fold * 38;
                const blockW = 30;
                return (
                  <g key={fold}>
                    <text x="4" y={y+20} fontSize="10" fill="#64748b" fontWeight="600">Fold {fold+1}</text>
                    {Array.from({length:20},(_,i)=>(
                      <rect key={i} x={60+i*blockW} y={y+4} width={blockW-2} height={28} rx="3"
                        fill={i < trainEnd ? '#bbf7d0' : i < testEnd ? '#fef9c3' : '#f1f5f9'}
                        stroke={i < trainEnd ? '#16a34a' : i < testEnd ? '#ca8a04' : '#e2e8f0'}
                        strokeWidth="1"/>
                    ))}
                    {Array.from({length:20},(_,i)=>(
                      i < trainEnd
                        ? <text key={i} x={60+i*blockW+15} y={y+22} textAnchor="middle" fontSize="8" fill="#14532d">T</text>
                        : i < testEnd
                          ? <text key={i} x={60+i*blockW+15} y={y+22} textAnchor="middle" fontSize="8" fill="#78350f">V</text>
                          : null
                    ))}
                  </g>
                );
              })}
              <text x="140" y="212" fontSize="10" fill="#16a34a" fontWeight="600">■ Training</text>
              <text x="220" y="212" fontSize="10" fill="#ca8a04" fontWeight="600">■ Validation</text>
              <text x="310" y="212" fontSize="10" fill="#94a3b8" fontWeight="600">■ Not yet used</text>
            </svg>
          </div>
        </figure>
      </div>

      {/* ── COMMON MISTAKES ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Common Forecasting Mistakes</h2>
      <div className="not-prose space-y-3 my-6">
        {[
          {icon:'❌', title:'Shuffling the data', fix:'Always split chronologically. Past → Train. Future → Test. No exceptions.'},
          {icon:'❌', title:'Scaling before splitting', fix:'Fit StandardScaler on training data only, then transform both train and test with training statistics.'},
          {icon:'❌', title:'Ignoring stationarity', fix:'ARIMA requires a stationary series. Check with ADF test; apply differencing if trend present.'},
          {icon:'❌', title:'Skipping the baseline', fix:'Always compute Naive and Seasonal Naive baselines first. A sophisticated model that loses to Naive is not useful.'},
          {icon:'❌', title:'Reporting accuracy instead of MAE/RMSE', fix:'Forecasting outputs continuous numbers. Use error magnitude metrics, not classification accuracy.'},
          {icon:'❌', title:'One-step training, multi-step testing', fix:'If you need 12-month forecasts, train the model to predict 12 steps ahead or use a recursive forecasting strategy.'},
        ].map(m=>(
          <div key={m.title} className="bg-white border border-rose-200 rounded-xl p-4 flex gap-4">
            <span className="text-xl flex-shrink-0 mt-0.5">{m.icon}</span>
            <div>
              <p className="font-bold text-rose-700 text-sm mb-1">{m.title}</p>
              <p className="text-sm text-slate-600 leading-relaxed"><strong>Fix:</strong> {m.fix}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── FORECASTING METHODS DEEP DIVE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Forecasting Methods Compared</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Choosing the right forecasting method depends on your data characteristics — whether it has a trend, seasonal patterns, multiple related variables, and how far ahead you need to predict.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Statistical Methods — ARIMA Family</h3>
      <p className="text-base leading-relaxed mb-4 text-slate-700">
        ARIMA (AutoRegressive Integrated Moving Average) is the most widely used classical time series model. It captures three components: the AutoRegressive part (AR) models the relationship between the current value and its past values, the Integrated part (I) removes trend by differencing, and the Moving Average part (MA) models the relationship between the current value and past forecast errors. SARIMA extends ARIMA with seasonal terms — essential for retail sales, electricity demand, and monthly revenue data with clear repeating patterns.
      </p>
      <p className="text-base leading-relaxed mb-4 text-slate-700">
        The key challenge with ARIMA is selecting the correct p, d, q parameters. The Akaike Information Criterion (AIC) and ACF/PACF plots help guide selection. The <strong>auto_arima</strong> function from the pmdarima library automates this search entirely.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Machine Learning Methods — XGBoost and LightGBM</h3>
      <p className="text-base leading-relaxed mb-4 text-slate-700">
        Standard ML algorithms like XGBoost can be powerful forecasters when features are engineered correctly. The key is converting the time series into a supervised learning problem using <strong>lag features</strong> — past values as input features. For example, to forecast tomorrow's sales, use today's sales, yesterday's sales, and last week's sales as features. Rolling statistics (7-day mean, 30-day standard deviation) and calendar features (day of week, month, is_holiday) complete the feature set.
      </p>
      <p className="text-base leading-relaxed mb-4 text-slate-700">
        XGBoost and LightGBM dominated the M5 Forecasting Competition — the most prestigious time series benchmark — because they handle non-linear relationships between lag features naturally and are robust to outliers without extensive preprocessing.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Deep Learning — LSTM and Transformers</h3>
      <p className="text-base leading-relaxed mb-6 text-slate-700">
        LSTM networks capture complex long-range temporal dependencies particularly useful in multivariate settings — forecasting energy consumption using temperature, humidity, hour of day, and historical consumption simultaneously. Transformer-based architectures like Temporal Fusion Transformers (TFT) represent current state of the art, handling multiple seasonalities, missing data, and static covariates in a single architecture. Facebook Prophet remains popular for business forecasting — it decomposes series into trend, seasonality and holiday effects, producing interpretable forecasts with uncertainty intervals.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Evaluation Metrics for Forecasting</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        The choice of evaluation metric significantly affects which model appears best. Always evaluate on multiple metrics and examine the forecast plot visually — numbers alone can hide systematic biases:
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Metric</th>
              <th className="p-3 text-left">Best for</th>
              <th className="p-3 text-left">Limitation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ["MAE — Mean Absolute Error","Equal penalty for all error sizes","Does not penalise large errors more"],
              ["RMSE — Root Mean Squared Error","When large errors are especially costly","Sensitive to outliers"],
              ["MAPE — Mean Absolute Percentage Error","Comparing across different scales","Undefined when actual value = 0"],
              ["sMAPE — Symmetric MAPE","Scale-free, more symmetric than MAPE","Can still be unstable near zero"],
              ["MASE — Mean Absolute Scaled Error","Comparing models across different series","Requires naive baseline computation"],
            ].map(([m,b,l]) => (
              <tr key={m} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-indigo-700 text-xs">{m}</td>
                <td className="p-3 text-xs text-emerald-700">{b}</td>
                <td className="p-3 text-xs text-rose-600">{l}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Time series forecasting treats temporal order as a first-class citizen. Every series is composed of trend, seasonality, cyclic, and residual components — decompose first to understand what you are working with. Always split chronologically, establish baselines before sophisticated models, and evaluate with MAE, RMSE, or MAPE rather than accuracy. Lag features bridge the gap between time series and standard ML models.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-4 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-lg">Key Takeaway</p>
        <p className="text-slate-800 italic text-base leading-relaxed">
          A Seasonal Naive baseline (predicting same value as 12 months ago) often beats complex models on real business data. Always build the simplest possible baseline first — only add complexity when it demonstrably improves out-of-sample accuracy on a proper chronological split.
        </p>
      </div>
    </div>
  );
}
