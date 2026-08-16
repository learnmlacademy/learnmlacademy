import React from 'react';
import { Activity, AlertTriangle, CheckCircle2, Code, Layers, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [10, 20, 30, 40, 50, 60, 70];
const sma3 = [null, null, 20, 30, 40, 50, 60];
const ema3 = [10, 15, 22.5, 31.25, 40.625, 50.3125, 60.15625];

export function MovingAverageContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Moving Average in Time Series: SMA, EMA, WMA and MA(q)
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Time-series data often moves up and down from one period to the next. A <strong>moving average</strong> helps us smooth some of those short-term fluctuations so that the broader pattern is easier to see.
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-7">
          <p className="font-bold text-indigo-900 mb-3">Understand First</p>
          <div className="grid md:grid-cols-4 gap-3 text-center font-semibold text-slate-800">
            <div className="bg-white border rounded-lg p-3">Take recent values</div>
            <div className="bg-white border rounded-lg p-3">→ Move a window</div>
            <div className="bg-white border rounded-lg p-3">→ Calculate an average</div>
            <div className="bg-white border rounded-lg p-3">→ Smooth the series</div>
          </div>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          For example, suppose daily website visits are <strong>10, 20, 30, 40, 50</strong>. A 3-day moving average first uses 10, 20 and 30, then moves one step and uses 20, 30 and 40, then 30, 40 and 50.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full max-w-3xl text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="py-3 px-4 border-b">Window</th>
                <th className="py-3 px-4 border-b">Calculation</th>
                <th className="py-3 px-4 border-b">3-Day Average</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b"><td className="py-3 px-4">Days 1–3</td><td className="py-3 px-4">(10 + 20 + 30) / 3</td><td className="py-3 px-4 font-bold">20</td></tr>
              <tr className="border-b"><td className="py-3 px-4">Days 2–4</td><td className="py-3 px-4">(20 + 30 + 40) / 3</td><td className="py-3 px-4 font-bold">30</td></tr>
              <tr><td className="py-3 px-4">Days 3–5</td><td className="py-3 px-4">(30 + 40 + 50) / 3</td><td className="py-3 px-4 font-bold">40</td></tr>
            </tbody>
          </table>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">Two meanings of “Moving Average”</p>
          <p className="text-amber-900 leading-relaxed">
            This lesson covers both <strong>moving averages used for smoothing</strong> (such as SMA and EMA) and the statistical <strong>MA(q) model</strong> used inside ARMA/ARIMA. They sound similar, but they are not the same idea.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="what-is-ma">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <TrendingUp className="mr-3 text-indigo-600" /> What Is a Simple Moving Average?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A <strong>Simple Moving Average (SMA)</strong> calculates the arithmetic mean of observations inside a fixed-size rolling window. With a 3-period trailing SMA, every value in the most recent three observations receives equal weight.
        </p>

        <div className="bg-white border-2 border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-3">SMA Formula</h3>
          <div className="font-mono bg-slate-100 rounded-lg p-4 inline-block mb-4 text-slate-900">
            SMA<sub>t</sub> = (X<sub>t</sub> + X<sub>t-1</sub> + ... + X<sub>t-n+1</sub>) / n
          </div>
          <p className="text-slate-700 mb-3">For values 10, 20 and 30:</p>
          <p className="font-mono text-slate-900">SMA = (10 + 20 + 30) / 3 = <strong>20</strong></p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4">Why does a moving average smooth data?</h3>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          A single unusual observation affects only part of the window instead of becoming the entire displayed value. Averaging therefore reduces some short-term variation, although it can also make the smoothed series react more slowly to genuine changes.
        </p>

        <div className="bg-slate-50 border rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-800 mb-4">Original values vs 3-period SMA</p>
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
            {values.map((value, i) => (
              <div key={`v-${i}`} className="bg-white border rounded p-2">
                <div className="text-slate-500">{i + 1}</div>
                <div className="font-bold">{value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {sma3.map((value, i) => (
              <div key={`s-${i}`} className="bg-indigo-50 border border-indigo-100 rounded p-2">
                <div className="text-indigo-500">SMA</div>
                <div className="font-bold text-indigo-900">{value === null ? '—' : value}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-3">
            The first two SMA values are unavailable because a full 3-observation window does not yet exist.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="window-size">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Choosing the Moving-Average Window
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          The window size controls how much smoothing you get. There is no universally best window.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead><tr className="bg-indigo-50 text-indigo-900"><th className="py-3 px-4">Window</th><th className="py-3 px-4">Typical behavior</th><th className="py-3 px-4">Trade-off</th></tr></thead>
            <tbody className="text-slate-700">
              <tr className="border-t"><td className="py-3 px-4 font-semibold">Smaller window</td><td className="py-3 px-4">Responds faster to recent movement</td><td className="py-3 px-4">Retains more short-term noise</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-semibold">Larger window</td><td className="py-3 px-4">Produces stronger smoothing</td><td className="py-3 px-4">Can lag behind genuine changes</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Domain structure can also matter. For daily data, a 7-day window may be useful when weekly behavior is relevant; for monthly data, 12 periods may be meaningful when yearly seasonality is important. These are examples, not automatic rules.
        </p>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="types">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> SMA, WMA, EMA and Cumulative Average
        </h2>

        <h3 className="text-xl font-bold text-slate-800 mb-3">1. Simple Moving Average (SMA)</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Every observation inside the fixed window receives equal weight. SMA is easy to understand and is useful for descriptive smoothing, but larger windows can respond slowly to new changes.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3">2. Weighted Moving Average (WMA)</h3>
        <p className="text-lg leading-relaxed mb-3 text-slate-800">
          A WMA assigns chosen weights to observations. The weights do <strong>not</strong> have to decrease linearly; the weighting scheme depends on how you define it.
        </p>
        <div className="bg-slate-50 border rounded-lg p-4 mb-6 max-w-3xl">
          <p className="font-semibold text-slate-800 mb-2">Example weights: 1, 2, 3 for values 10, 20, 30</p>
          <p className="font-mono text-slate-800">WMA = (1×10 + 2×20 + 3×30) / (1+2+3) = 140 / 6 ≈ <strong>23.33</strong></p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3">3. Exponential Moving Average (EMA)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          EMA gives more weight to recent observations while older observations retain progressively smaller influence. A common recursive form is:
        </p>
        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 mb-5">
          <p className="font-mono text-slate-900 mb-3">EMA<sub>t</sub> = αX<sub>t</sub> + (1 − α)EMA<sub>t−1</sub></p>
          <p className="text-slate-700">When EMA is parameterized by a pandas-style <strong>span</strong>, α = 2 / (span + 1).</p>
        </div>

        <p className="text-lg leading-relaxed mb-3 text-slate-800">For span = 3:</p>
        <p className="font-mono bg-slate-50 border rounded-lg p-4 mb-4 max-w-3xl">α = 2 / (3 + 1) = 0.5</p>
        <p className="text-lg leading-relaxed mb-2 text-slate-800">Start with EMA₁ = 10. For the next value 20:</p>
        <p className="font-mono bg-slate-50 border rounded-lg p-4 mb-6 max-w-3xl">EMA₂ = 0.5×20 + 0.5×10 = <strong>15</strong></p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-7">
          <p className="font-bold text-blue-900 mb-2">Python detail that matters</p>
          <p className="text-blue-900 leading-relaxed">
            In pandas, <code>ewm(...).mean()</code> uses <code>adjust=True</code> by default. The simple recursive formula above corresponds directly to <code>adjust=False</code>, which is why the Python example below specifies it explicitly.
          </p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3">4. Cumulative / Expanding Average</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          A cumulative average uses <strong>all observations seen so far</strong>, so its window keeps expanding rather than staying fixed. It is useful for quantities such as a running lifetime average, but it behaves differently from a fixed-window SMA.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead><tr className="bg-indigo-50 text-indigo-900"><th className="py-3 px-4">Method</th><th className="py-3 px-4">Which observations matter?</th><th className="py-3 px-4">Weights</th></tr></thead>
            <tbody className="text-slate-700">
              <tr className="border-t"><td className="py-3 px-4 font-semibold">SMA</td><td className="py-3 px-4">Fixed recent window</td><td className="py-3 px-4">Equal</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-semibold">WMA</td><td className="py-3 px-4">Usually a chosen window</td><td className="py-3 px-4">User-defined</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-semibold">EMA</td><td className="py-3 px-4">Current + decaying influence from the past</td><td className="py-3 px-4">Exponentially decaying</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-semibold">Cumulative average</td><td className="py-3 px-4">All observations so far</td><td className="py-3 px-4">Equal across included history</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="smoothing-vs-forecasting">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> Smoothing Is Not Automatically Forecasting
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A trailing 3-period SMA calculated at time <em>t</em> usually includes the observation at time <em>t</em>. That makes it a useful <strong>smoother</strong>, but it is not automatically a prediction that existed before time <em>t</em> was observed.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-7">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-emerald-900 mb-2">Smoothing at Day 7</p>
            <p className="text-emerald-900 mb-2">Uses Days 5, 6 and 7:</p>
            <p className="font-mono">(50 + 60 + 70) / 3 = <strong>60</strong></p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="font-bold text-blue-900 mb-2">One-step forecast for Day 7</p>
            <p className="text-blue-900 mb-2">Must use information available before Day 7, e.g. Days 4, 5 and 6:</p>
            <p className="font-mono">(40 + 50 + 60) / 3 = <strong>50</strong></p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-rose-900 mb-2">Avoid future-data leakage</p>
          <p className="text-rose-900 leading-relaxed">
            A centered moving average can use observations from both sides of a timestamp. That can be useful for retrospective visualization, but it would leak future information if used as a feature for a real-time forecasting model. For prediction, construct features only from information that would have been available at prediction time.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="ma-q">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> Moving-Average Model MA(q): A Different Concept
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In ARMA and ARIMA, the <strong>MA(q)</strong> part does <strong>not</strong> mean averaging the latest observations. Instead, the current process value is represented using the current random shock and a finite number of past shocks/errors.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-7">
          <p className="font-bold text-blue-900 mb-3">MA(q) form</p>
          <p className="font-mono text-blue-950 mb-4">
            X<sub>t</sub> = c + ε<sub>t</sub> + θ<sub>1</sub>ε<sub>t−1</sub> + ... + θ<sub>q</sub>ε<sub>t−q</sub>
          </p>
          <ul className="list-disc pl-6 text-blue-900 space-y-1">
            <li><strong>c</strong>: constant/baseline term, depending on model parameterization</li>
            <li><strong>ε</strong>: innovation or random shock</li>
            <li><strong>θ</strong>: coefficients on lagged shocks</li>
            <li><strong>q</strong>: highest moving-average lag included</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4">Worked MA(2) forecasting example</h3>
        <p className="text-lg leading-relaxed mb-3 text-slate-800">
          Suppose the fitted model has <strong>c = 50</strong>, <strong>θ₁ = 0.8</strong>, <strong>θ₂ = 0.3</strong>, with previous estimated innovations 4 and −2. For a one-step forecast, the future innovation has expectation zero, so:
        </p>
        <div className="bg-slate-900 rounded-xl p-5 mb-7 font-mono text-slate-100 leading-7 max-w-3xl">
          <p>Forecast = 50 + 0.8(4) + 0.3(−2)</p>
          <p>= 50 + 3.2 − 0.6</p>
          <p className="font-bold text-emerald-300">= 52.6</p>
        </div>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          The key point is that this MA(2) calculation uses <strong>past innovations/errors</strong>. It is structurally different from taking a 2-period or 3-period arithmetic moving average of observed values.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white border rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-100"><th className="py-3 px-4">Concept</th><th className="py-3 px-4">Uses</th><th className="py-3 px-4">Main purpose</th></tr></thead>
            <tbody className="text-slate-700">
              <tr className="border-t"><td className="py-3 px-4 font-semibold">SMA / EMA</td><td className="py-3 px-4">Observed values</td><td className="py-3 px-4">Smoothing / descriptive tracking; can also be used in simple forecasting rules</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-semibold">MA(q)</td><td className="py-3 px-4">Current and lagged innovations</td><td className="py-3 px-4">Statistical time-series modeling</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="important-concepts">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Going Deeper: MA(q), Stationarity, White Noise and ACF</h2>

        <h3 className="text-xl font-bold text-slate-800 mb-3">Stationarity</h3>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Classical MA(q) is a stationary time-series model. In practical weak-stationarity terms, we look for stable mean and variance and an autocovariance structure that depends on lag rather than calendar time. This is different from saying that the series must stay inside fixed numerical bounds.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3">White noise / innovations</h3>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          White noise is commonly modeled with mean zero, constant finite variance and no serial correlation. After fitting a time-series model, residual diagnostics check whether meaningful autocorrelation remains; residuals behaving approximately like white noise are a good sign that the model has captured much of the predictable linear structure.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3">ACF and the order q</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          For an ideal pure MA(q) process, the autocorrelation function has a characteristic cutoff after lag <em>q</em>. In real datasets, an ACF plot can therefore provide clues about candidate MA orders, but it should not be treated as an automatic rule that always reveals the “optimal q.” Mixed ARMA/ARIMA structure, finite samples and noise make identification less clean.
        </p>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="python">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python: SMA, EMA and a Time-Safe One-Step Moving Average
        </h2>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-3 border-b">
            <h3 className="font-bold text-indigo-800">Self-contained pandas example</h3>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-[#d4d4d4] !m-0"><code className="language-python">{`import pandas as pd

# Sequential time-series observations
df = pd.DataFrame({
    "Value": [10, 20, 30, 40, 50, 60, 70]
})

# 3-period trailing Simple Moving Average (smoother)
df["SMA_3"] = df["Value"].rolling(window=3).mean()

# Recursive EMA matching: EMA_t = alpha*x_t + (1-alpha)*EMA_(t-1)
df["EMA_3"] = df["Value"].ewm(span=3, adjust=False).mean()

# One-step-ahead 3-period moving-average forecast.
# shift(1) ensures the value at time t is not used to predict time t.
df["MA_3_Forecast"] = (
    df["Value"]
    .shift(1)
    .rolling(window=3)
    .mean()
)

print(df.round(2).to_string(index=False))

next_forecast = df["Value"].tail(3).mean()
print("Next-period 3-value forecast:", round(next_forecast, 2))`}</code></pre>
          </div>
          <div className="bg-[#1e1e1e] text-emerald-400 p-4 font-mono text-sm border-t border-slate-700 overflow-x-auto">
            <p className="mb-2">Expected output:</p>
            <pre className="!m-0">{` Value  SMA_3  EMA_3  MA_3_Forecast
    10    NaN  10.00            NaN
    20    NaN  15.00            NaN
    30   20.0  22.50            NaN
    40   30.0  31.25           20.0
    50   40.0  40.62           30.0
    60   50.0  50.31           40.0
    70   60.0  60.16           50.0
Next-period 3-value forecast: 60.0`}</pre>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs mb-3">
          {values.map((value, i) => (
            <div key={`pv-${i}`} className="bg-white border rounded p-2">
              <div className="text-slate-500">Value</div>
              <div className="font-bold">{value}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs mb-7">
          {ema3.map((value, i) => (
            <div key={`pe-${i}`} className="bg-amber-50 border border-amber-100 rounded p-2">
              <div className="text-amber-700">EMA</div>
              <div className="font-bold text-amber-900">{value.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 my-8" />

      <div id="mistakes">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> Common Mistakes
        </h2>
        <div className="space-y-3 mb-8">
          {[
            ['Confusing SMA/EMA with MA(q)', 'SMA and EMA smooth observed values; MA(q) models innovations/errors.'],
            ['Calling a smoother a forecast without checking timing', 'A rolling value that includes the current target is not a prediction made before that target was observed.'],
            ['Using centered windows as predictive features', 'Centered windows may include future observations and cause leakage.'],
            ['Assuming a larger window is always better', 'More smoothing also means slower response to genuine changes.'],
            ['Saying EMA always beats SMA', 'The useful method depends on the data and goal; responsiveness is not automatically better accuracy.'],
            ['Choosing q mechanically from the ACF', 'ACF patterns are useful identification clues, not universal guarantees.'],
          ].map(([title, text]) => (
            <div key={title} className="bg-slate-50 border rounded-lg p-4">
              <p className="font-bold text-slate-900">{title}</p>
              <p className="text-slate-700 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="recap" className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-emerald-900 mb-5 flex items-center">
          <CheckCircle2 className="mr-3" /> Quick Recap
        </h2>
        <ul className="space-y-3 text-emerald-950 leading-relaxed">
          <li><strong>SMA:</strong> equal-weight average inside a fixed rolling window.</li>
          <li><strong>EMA:</strong> exponentially weighted smoother that gives greater influence to recent observations.</li>
          <li><strong>Window size:</strong> controls the responsiveness-versus-smoothing trade-off.</li>
          <li><strong>Forecasting:</strong> use only information available before the prediction time.</li>
          <li><strong>MA(q):</strong> a statistical model based on lagged innovations—not an arithmetic rolling average.</li>
        </ul>
      </div>

      <div id="next-steps" className="bg-slate-50 border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Continue Learning</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/learn/arima" className="px-4 py-2 bg-white border rounded-lg font-semibold text-indigo-700 hover:bg-indigo-50">ARIMA</Link>
          <Link to="/learn/exponential-smoothing" className="px-4 py-2 bg-white border rounded-lg font-semibold text-indigo-700 hover:bg-indigo-50">Exponential Smoothing</Link>
          <Link to="/learn/forecasting-basics" className="px-4 py-2 bg-white border rounded-lg font-semibold text-indigo-700 hover:bg-indigo-50">Forecasting Basics</Link>
        </div>
      </div>
    </>
  );
}
