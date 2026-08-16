import React from 'react';
import { AlertTriangle, CheckCircle, Code, Lightbulb } from 'lucide-react';

const FlowBox = ({ title, text }: { title: string; text: string }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <p className="font-bold text-indigo-800 mb-1">{title}</p>
    <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
  </div>
);

export function ArimaContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          ARIMA (AutoRegressive Integrated Moving Average)
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ARIMA is a classical statistical model for forecasting a time series from its own history. Unlike a normal table where row order may not matter, time-series observations arrive in sequence, so yesterday, last week, or last month can contain useful information about what comes next.
        </p>

        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 mb-8">
          <p className="font-bold text-indigo-900 mb-4">ARIMA in Simple Words</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-stretch">
            <FlowBox title="1. Look Back" text="Use earlier values of the series." />
            <FlowBox title="2. Remove Trend" text="Difference the series when needed." />
            <FlowBox title="3. Learn Errors" text="Use patterns in earlier forecast errors." />
            <FlowBox title="4. Forecast" text="Combine the learned structure to predict future values." />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-indigo-800 mb-4">A Tiny Example First</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose monthly demand is:
        </p>
        <div className="overflow-x-auto mb-5">
          <table className="w-full max-w-xl text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Demand</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b"><td className="px-4 py-2">January</td><td className="px-4 py-2">100</td></tr>
              <tr className="border-b"><td className="px-4 py-2">February</td><td className="px-4 py-2">108</td></tr>
              <tr><td className="px-4 py-2">March</td><td className="px-4 py-2">117</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The level is rising, but the <strong>changes</strong> are only <code className="bg-slate-100 px-1 rounded">+8</code> and <code className="bg-slate-100 px-1 rounded">+9</code>. ARIMA can model a series after differencing and combine that with lagged values and lagged errors.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Common time-series examples include sales, demand, traffic, sensor readings, financial quantities, website activity, and other measurements collected repeatedly over time. ARIMA is most appropriate when the series can be represented reasonably well by a linear non-seasonal ARIMA structure; strongly seasonal series usually need seasonal terms such as SARIMA.
        </p>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="what-it-stands-for">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">What Does ARIMA(p, d, q) Mean?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-3xl font-black text-blue-700 mb-2">p</p>
            <p className="font-bold text-slate-900">AutoRegressive order</p>
            <p className="text-slate-700 mt-2">How many lagged values are included in the AR part.</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-3xl font-black text-emerald-700 mb-2">d</p>
            <p className="font-bold text-slate-900">Differencing order</p>
            <p className="text-slate-700 mt-2">How many rounds of differencing are used by the integrated part.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-3xl font-black text-amber-700 mb-2">q</p>
            <p className="font-bold text-slate-900">Moving-Average order</p>
            <p className="text-slate-700 mt-2">How many lagged error terms are included in the MA part.</p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 border border-slate-200 p-5 mb-8">
          <p className="font-bold text-slate-900 mb-2">Example: ARIMA(2, 1, 1)</p>
          <p className="text-slate-700 leading-relaxed">
            Use an AR order of 2, difference once, and use an MA order of 1. This notation describes the model structure; it does not mean those values are automatically correct for every dataset.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="components-detail">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">The Three Parts of ARIMA</h2>

        <h3 className="text-xl font-bold text-slate-800 mb-3">1. AR — AutoRegression</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The AR part relates the current value to earlier values of the series. An AR(p) model can be written as:
        </p>
        <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-5 mb-5 overflow-x-auto">
          <p className="font-mono text-blue-900 whitespace-nowrap">
            Y<sub>t</sub> = c + ϕ<sub>1</sub>Y<sub>t-1</sub> + ... + ϕ<sub>p</sub>Y<sub>t-p</sub> + ε<sub>t</sub>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-900 mb-3">Worked AR example</p>
          <p className="text-slate-700 mb-2">Suppose <code>c = 10</code>, <code>ϕ₁ = 0.6</code>, <code>ϕ₂ = 0.2</code>, and the last two values are 50 and 46.</p>
          <p className="font-mono text-sm bg-slate-50 p-3 rounded mb-2">Forecast part = 10 + (0.6 × 50) + (0.2 × 46)</p>
          <p className="font-mono text-sm bg-slate-50 p-3 rounded mb-2">= 10 + 30 + 9.2</p>
          <p className="font-mono text-sm bg-slate-50 p-3 rounded font-bold">= 49.2</p>
          <p className="text-sm text-slate-600 mt-3">This isolates the lagged-value contribution for a simple teaching example; a full stochastic model also includes an innovation/error term.</p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3">2. I — Integrated / Differencing</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Differencing replaces the original levels with changes between observations. First differencing is:
        </p>
        <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-50 p-5 mb-5">
          <p className="font-mono text-emerald-900">Y&apos;<sub>t</sub> = Y<sub>t</sub> − Y<sub>t-1</sub></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="border rounded-xl p-5 bg-white">
            <p className="font-bold text-slate-900 mb-3">Original series</p>
            <p className="font-mono text-slate-700">100 → 108 → 117</p>
            <p className="text-sm text-slate-600 mt-2">The level is trending upward.</p>
          </div>
          <div className="border rounded-xl p-5 bg-white">
            <p className="font-bold text-slate-900 mb-3">First difference</p>
            <p className="font-mono text-slate-700">108 − 100 = 8</p>
            <p className="font-mono text-slate-700">117 − 108 = 9</p>
            <p className="text-sm text-slate-600 mt-2">If one round is used, then d = 1.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3">3. MA — Moving Average</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In ARIMA, <strong>Moving Average does not mean a rolling average of recent observations</strong>. The MA part models the current value using previous innovation/error terms.
        </p>
        <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-5 mb-5 overflow-x-auto">
          <p className="font-mono text-amber-900 whitespace-nowrap">
            Y<sub>t</sub> = c + ε<sub>t</sub> + θ<sub>1</sub>ε<sub>t-1</sub> + ... + θ<sub>q</sub>ε<sub>t-q</sub>
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-900 mb-3">Simple one-step MA intuition</p>
          <p className="text-slate-700 mb-2">Suppose the baseline is 20, <code>θ₁ = 0.5</code>, and the previous error was <code>−4</code>.</p>
          <p className="font-mono text-sm bg-slate-50 p-3 rounded mb-2">Forecast contribution = 20 + (0.5 × −4)</p>
          <p className="font-mono text-sm bg-slate-50 p-3 rounded font-bold">= 18</p>
          <p className="text-sm text-slate-600 mt-3">For a one-step forecast, the unknown future innovation has expected value zero under the model.</p>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="stationarity">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Stationarity and Why d Matters</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A stationary process has statistical behavior that does not systematically drift over time. In practical ARIMA modeling, we often difference a non-stationary level series so that the remaining process is more suitable for ARMA-style modeling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-bold text-emerald-900 mb-3">More stationary-looking</p>
            <div className="flex items-end gap-2 h-24 px-2">
              {[52, 47, 54, 49, 53, 46, 51, 55, 48, 52].map((v, i) => (
                <div key={i} className="flex-1 bg-emerald-500/70 rounded-t" style={{ height: `${v}%` }} />
              ))}
            </div>
            <p className="text-sm text-emerald-900 mt-3">Values fluctuate around a broadly stable level.</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-bold text-red-900 mb-3">Clearly trending</p>
            <div className="flex items-end gap-2 h-24 px-2">
              {[18, 25, 31, 39, 46, 53, 61, 70, 79, 90].map((v, i) => (
                <div key={i} className="flex-1 bg-red-500/70 rounded-t" style={{ height: `${v}%` }} />
              ))}
            </div>
            <p className="text-sm text-red-900 mt-3">The level changes systematically over time.</p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-8 flex gap-3">
          <AlertTriangle className="shrink-0 text-amber-700 mt-1" />
          <div>
            <p className="font-bold text-amber-900 mb-1">Avoid over-differencing</p>
            <p className="text-amber-900 leading-relaxed">Differencing is not automatically better. Unnecessary extra differencing can introduce undesirable structure and make forecasts noisier. Choose d using diagnostics and validation rather than mechanically differencing until the graph looks flat.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="working-principle">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">A Practical ARIMA Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FlowBox title="1. Plot the series" text="Inspect trend, seasonality, missing periods, outliers, and structural changes." />
          <FlowBox title="2. Keep time order" text="Use an earlier training period and a later validation/test period. Do not randomly shuffle a forecasting series." />
          <FlowBox title="3. Examine stationarity" text="Use plots, domain knowledge, and tests such as ADF as supporting evidence." />
          <FlowBox title="4. Choose d" text="Difference when needed so the modeled process is more stable." />
          <FlowBox title="5. Explore p and q" text="ACF/PACF can provide clues; candidate models can then be compared." />
          <FlowBox title="6. Fit and diagnose" text="Check residuals and compare candidate models using criteria such as AIC plus forecasting performance." />
          <FlowBox title="7. Forecast" text="Generate forecasts from the end of the training period into future periods." />
          <FlowBox title="8. Evaluate chronologically" text="Use MAE, RMSE or a domain-specific metric on later observations that were not used to fit the model." />
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3">ADF Test — What the p-value Actually Means</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The Augmented Dickey-Fuller test has a null hypothesis that the series contains a unit root. A small p-value, such as below a chosen 5% significance level, is evidence for rejecting that null under the test specification. It is better to say this than to say “p &lt; 0.05 proves stationarity.”
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3 mt-8">ACF and PACF</h3>
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-4 py-3">Tool</th>
                <th className="px-4 py-3">Simple meaning</th>
                <th className="px-4 py-3">Classical clue</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b">
                <td className="px-4 py-3 font-bold">ACF</td>
                <td className="px-4 py-3">Correlation between the series and its lagged values.</td>
                <td className="px-4 py-3">Can help suggest MA structure.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold">PACF</td>
                <td className="px-4 py-3">Lag relationship after accounting for shorter-lag linear effects.</td>
                <td className="px-4 py-3">Can help suggest AR structure.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-600 mb-8">
          These are identification heuristics, not mechanical rules that always reveal the correct p and q for a mixed ARIMA model.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3">AIC — Useful, but Not a Forecast Guarantee</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          AIC balances model fit with model complexity. When several candidate models are fitted to the same data under comparable assumptions, a lower AIC is preferred by that criterion. But the lowest AIC does not guarantee the best future forecast, so chronological validation still matters.
        </p>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="python-implementation">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python: A Self-Contained ARIMA Example
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          This example creates a reproducible non-seasonal series, keeps the final 12 months as an untouched time-ordered test period, checks the effect of first differencing, compares a small set of ARIMA orders by AIC, and evaluates the forecast.
        </p>

        <div className="bg-[#1e1e1e] rounded-xl p-4 font-mono text-sm overflow-x-auto mb-5">
          <pre className="text-[#d4d4d4] !m-0"><code className="language-python">{`import itertools
import warnings
import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller

# 1. Create a reproducible non-seasonal time series
rng = np.random.default_rng(42)
n = 120
noise = rng.normal(0, 1.2, n)

values = np.zeros(n)
values[0] = 50
change = 0.0

for t in range(1, n):
    change = 0.55 * change + 0.25 + noise[t]
    values[t] = values[t - 1] + change

series = pd.Series(
    values,
    index=pd.date_range("2015-01-01", periods=n, freq="MS"),
    name="value"
)

# 2. Chronological split: last 12 months are test data
train = series.iloc[:-12]
test = series.iloc[-12:]

# 3. ADF before and after first differencing
adf_level = adfuller(train, autolag="AIC")
adf_diff = adfuller(train.diff().dropna(), autolag="AIC")

print("Level ADF p-value:", round(adf_level[1], 4))
print("Differenced ADF p-value:", round(adf_diff[1], 4))

# 4. Small teaching search over p and q, keeping d=1
candidates = list(itertools.product(range(3), [1], range(3)))

best_aic = np.inf
best_order = None

for order in candidates:
    try:
        # Some deliberately tested candidates may emit start-value/convergence warnings.
        # We compare the models that successfully fit.
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            fitted = ARIMA(train, order=order).fit()

        if fitted.aic < best_aic:
            best_aic = fitted.aic
            best_order = order
    except Exception:
        pass

print("Best order by AIC:", best_order)
print("Best AIC:", round(best_aic, 2))

# 5. Fit selected model and forecast the test period
model = ARIMA(train, order=best_order).fit()
forecast = model.forecast(steps=len(test))

mae = np.mean(np.abs(test - forecast))
rmse = np.sqrt(np.mean((test - forecast) ** 2))

print("First 3 forecasts:", forecast.iloc[:3].round(2).tolist())
print("MAE:", round(mae, 2))
print("RMSE:", round(rmse, 2))`}</code></pre>
        </div>

        <div className="bg-slate-950 text-emerald-300 rounded-xl p-5 font-mono text-sm mb-6 overflow-x-auto">
          <p>Level ADF p-value: 0.5364</p>
          <p>Differenced ADF p-value: 0.0</p>
          <p>Best order by AIC: (1, 1, 0)</p>
          <p>Best AIC: 294.38</p>
          <p>First 3 forecasts: [92.62, 92.36, 92.2]</p>
          <p>MAE: 1.14</p>
          <p>RMSE: 1.28</p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 mb-8 flex gap-3">
          <CheckCircle className="shrink-0 text-emerald-700 mt-1" />
          <div>
            <p className="font-bold text-emerald-900 mb-1">What this example teaches</p>
            <p className="text-emerald-900 leading-relaxed">The raw training series does not give strong ADF evidence against a unit root, while the first-differenced series does. Among this deliberately small candidate set, ARIMA(1,1,0) has the lowest AIC. We still evaluate its forecast on later unseen observations rather than trusting AIC alone.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="model-variants">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">ARIMA, SARIMA and Exogenous Variables</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-50 border-b">
                <th className="px-4 py-3">Model idea</th>
                <th className="px-4 py-3">Use it when...</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b"><td className="px-4 py-3 font-bold">ARIMA(p,d,q)</td><td className="px-4 py-3">You need a non-seasonal ARIMA structure based primarily on the series history.</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-bold">SARIMA</td><td className="px-4 py-3">There is repeating seasonal structure requiring seasonal AR, differencing, or MA terms.</td></tr>
              <tr><td className="px-4 py-3 font-bold">ARIMA/SARIMAX with exogenous variables</td><td className="px-4 py-3">External predictors such as price, promotions, temperature, or holidays should enter the forecasting model.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 mb-8">
          <p className="font-bold text-indigo-900 mb-2">Seasonal example</p>
          <p className="text-indigo-900 leading-relaxed">If monthly sales show a pattern that repeats every 12 months, a plain non-seasonal ARIMA may miss that seasonal structure. A seasonal specification can add terms with period <code className="bg-white px-1 rounded">s = 12</code>.</p>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="comparison">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">ARIMA vs Other Forecasting Approaches</h2>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Avoid treating one family as universally better. ARIMA is a useful interpretable baseline for many linear time-series problems, while other statistical or machine-learning approaches may be stronger when seasonality, nonlinear relationships, many external predictors, multiple related series, or large-scale data become central.
        </p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-4 py-3">Question</th>
                <th className="px-4 py-3">ARIMA perspective</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b"><td className="px-4 py-3 font-semibold">Interpretability</td><td className="px-4 py-3">Explicit lag, differencing, and error structure can be inspected.</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-semibold">Nonlinearity</td><td className="px-4 py-3">Standard ARIMA is fundamentally a linear model.</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-semibold">Seasonality</td><td className="px-4 py-3">Use seasonal extensions when seasonal structure is important.</td></tr>
              <tr><td className="px-4 py-3 font-semibold">Model choice</td><td className="px-4 py-3">Compare against sensible baselines and alternatives using chronological validation.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="common-mistakes">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Common ARIMA Mistakes</h2>
        <div className="space-y-4 mb-8">
          {[
            ['Randomly shuffling the series', 'Forecasting evaluation should respect time order.'],
            ['Assuming p-value < 0.05 proves stationarity', 'ADF tests a unit-root null under a chosen specification; use it with plots and other diagnostics.'],
            ['Choosing p and q mechanically from ACF/PACF', 'They are useful clues, especially in simpler AR/MA cases, but mixed models need broader diagnostics and validation.'],
            ['Calling the lowest AIC the guaranteed best forecast', 'AIC is an in-sample model-selection criterion; later-period forecast performance still matters.'],
            ['Using plain ARIMA for strong seasonality without checking it', 'Seasonal patterns may require seasonal differencing and seasonal AR/MA terms.'],
            ['Confusing MA(q) with a rolling moving average', 'The MA in ARIMA refers to lagged model innovations/errors, not simply averaging recent observations.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-bold text-slate-900">{title}</p>
              <p className="text-slate-700 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="faq">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Quick FAQ</h2>
        <div className="space-y-4 mb-8">
          <div className="border rounded-lg p-5 bg-white">
            <p className="font-bold text-slate-900 mb-2">Does ARIMA require the raw series itself to be stationary?</p>
            <p className="text-slate-700">Not necessarily. The integrated part allows differencing. The goal is for the appropriately differenced process modeled by the ARMA terms to satisfy the model assumptions reasonably well.</p>
          </div>
          <div className="border rounded-lg p-5 bg-white">
            <p className="font-bold text-slate-900 mb-2">Is ARIMA only for one-step-ahead forecasts?</p>
            <p className="text-slate-700">No. Multi-step forecasts are possible, although uncertainty generally grows as the forecast horizon extends.</p>
          </div>
          <div className="border rounded-lg p-5 bg-white">
            <p className="font-bold text-slate-900 mb-2">What should I learn next?</p>
            <p className="text-slate-700">Continue with <a href="/learn/moving-average" className="text-indigo-700 font-semibold hover:underline">Moving Average</a>, <a href="/learn/exponential-smoothing" className="text-indigo-700 font-semibold hover:underline">Exponential Smoothing</a>, and <a href="/learn/forecasting-basics" className="text-indigo-700 font-semibold hover:underline">Forecasting Basics</a>.</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <div className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-6 mb-10">
        <div className="flex gap-3">
          <Lightbulb className="shrink-0 text-indigo-700 mt-1" />
          <div>
            <p className="font-bold text-indigo-950 text-xl mb-2">Most Important Insight</p>
            <p className="text-indigo-950 text-lg leading-relaxed">
              ARIMA combines lagged values, differencing, and lagged errors. Choose p, d, and q using evidence rather than fixed rules, respect time order during evaluation, inspect residuals, and validate forecasts on later unseen observations. For strong seasonal structure, move to a seasonal extension rather than forcing plain ARIMA to explain everything.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
