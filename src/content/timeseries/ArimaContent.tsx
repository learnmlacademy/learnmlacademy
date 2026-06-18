import React from 'react';
import { Target, Activity, Code, Layers, HelpCircle, BarChart2, CheckCircle, Brain, XCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const stationaryData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  value: 50 + Math.sin(i * 0.5) * 10 + (Math.random() * 5 - 2.5),
}));

const nonStationaryData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  value: 20 + i * 1.5 + Math.sin(i * 0.5) * 10 + (Math.random() * 5 - 2.5),
}));

const forecastData = [
  ...Array.from({ length: 20 }, (_, i) => ({ time: `Day ${i+1}`, actual: 100 + i * 2.5 + Math.random() * 5, forecast: null })),
  { time: 'Day 20', actual: 100 + 19 * 2.5 + Math.random() * 5, forecast: 100 + 19 * 2.5 + Math.random() * 5 }, // junction
  ...Array.from({ length: 10 }, (_, i) => ({ time: `Day ${i+21}`, actual: null, forecast: 150 + i * 2.4 }))
];

export function ArimaContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">ARIMA (AutoRegressive Integrated Moving Average)</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In Machine Learning and Time Series Forecasting, one of the biggest challenges is predicting future values based on historical observations.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Unlike traditional Machine Learning datasets where rows are independent, time series data contains:
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-2 pr-4 rounded-r-md mb-6 inline-block">
          <p className="text-indigo-900 font-bold">Temporal dependency</p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          which means: <br />
          <span className="italic">Past values influence future values.</span>
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">Examples of time series data include:</h3>
        
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-300 text-slate-800">
                <th className="py-3 px-4 font-bold">Application</th>
                <th className="py-3 px-4 font-bold">Example</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Stock Market</td><td className="py-2 px-4">Daily stock prices</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Weather Forecasting</td><td className="py-2 px-4">Temperature prediction</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Banking</td><td className="py-2 px-4">Monthly revenue</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Retail</td><td className="py-2 px-4">Sales forecasting</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Transportation</td><td className="py-2 px-4">Traffic prediction</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Energy</td><td className="py-2 px-4">Electricity demand forecasting</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Healthcare</td><td className="py-2 px-4">Patient monitoring</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Social Media</td><td className="py-2 px-4">User activity prediction</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          One of the most important classical forecasting algorithms used for time series analysis is <strong>ARIMA</strong>.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ARIMA is a statistical forecasting model designed specifically for <em>Sequential time-dependent data</em>. It uses:
        </p>
        <ul className="list-square pl-6 text-lg leading-relaxed text-slate-800 mb-6">
          <li>Previous observations</li>
          <li>Previous errors</li>
          <li>Differencing</li>
        </ul>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          to predict future values. ARIMA became extremely popular because it works well for many real-world forecasting problems, is mathematically interpretable, performs strongly on short-term forecasting, and requires only historical time series data.
        </p>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Unlike Deep Learning models which may require huge datasets, ARIMA can often perform very well even with smaller datasets, and understanding it deeply is extremely important for Data Science and Machine Learning practitioners.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-it-stands-for">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">What Does ARIMA Stand For?</h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ARIMA stands for:
        </p>
        <ul className="list-disc pl-6 text-lg leading-relaxed text-slate-800 font-bold mb-6">
          <li>AutoRegressive</li>
          <li>Integrated</li>
          <li>Moving Average</li>
        </ul>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 font-mono text-sm leading-relaxed text-indigo-900 shadow-sm inline-block">
          ARIMA<br/>
          │<br/>
          ├── AR → AutoRegression<br/>
          ├── I  → Integrated<br/>
          └── MA → Moving Average
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4">Understanding the Core Idea of ARIMA</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ARIMA predicts future values using patterns hidden inside historical observations. The model assumes <em>past behavior influences future behavior</em>.
        </p>
        
        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-3 pr-4 rounded-r-md mb-8">
          <p className="text-emerald-900 text-lg leading-relaxed">
            For example, if electricity demand has been increasing gradually over previous weeks, ARIMA attempts to learn this structure and forecast future demand. Similarly stock prices, sales trends, weather data, or website traffic often show patterns over time. ARIMA mathematically models these patterns.
          </p>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="components-detail">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Components of ARIMA in Detail</h2>

        {/* 1. AutoRegression */}
        <h3 className="text-xl font-bold text-slate-800 mb-4">1. AutoRegression (AR)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800 text-slate-800">
          <strong>Definition:</strong> The autoregressive part means the <em>current value depends on previous values</em>.
        </p>
        <p className="text-lg leading-relaxed mb-4 text-slate-800 text-slate-800">
          <strong>Real-Life Intuition:</strong> Suppose today's temperature depends on yesterday's temperature and the day-before-yesterday's temperature. This dependency is modeled using Autoregression.
        </p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-blue-900 mb-2">Mathematical Formula of AR(p)</p>
          <p className="text-lg font-mono text-blue-800 bg-white p-3 rounded mb-3 inline-block">
            Y<sub>t</sub> = c + ϕ<sub>1</sub>Y<sub>t-1</sub> + ϕ<sub>2</sub>Y<sub>t-2</sub> + ⋯ + ϕ<sub>p</sub>Y<sub>t-p</sub> + ε<sub>t</sub>
          </p>
          <ul className="text-sm font-sans text-blue-900">
            <li><strong>Y<sub>t</sub>:</strong> Current value, <strong>Y<sub>t-1</sub>:</strong> Previous value</li>
            <li><strong>ϕ:</strong> AR coefficients, <strong>c:</strong> Constant</li>
            <li><strong>ε:</strong> Error term, <strong>p:</strong> Number of lag observations</li>
          </ul>
        </div>

        {/* 2. Integrated */}
        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10">2. Integrated (I)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800 text-slate-800">
          <strong>Definition:</strong> The integrated component handles differencing. Differencing removes trends and makes the series <em>stationary</em>.
        </p>
        
        <p className="font-bold text-slate-800 mb-2">What Is Stationarity?</p>
        <p className="text-lg leading-relaxed mb-4 text-slate-800 text-slate-800">
          A stationary series has constant mean, constant variance, and stable statistical behavior over time. ARIMA assumes statistical properties remain stable over time. Non-stationary data can produce unreliable forecasts.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-6">
          <div className="bg-white border p-4 rounded-xl shadow-sm">
             <p className="text-center font-bold text-emerald-700 mb-4 font-sans text-sm tracking-wider uppercase">Stationary Series (Stable Mean)</p>
             <div className="h-[200px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={stationaryData}>
                   <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                   <XAxis dataKey="time" hide />
                   <YAxis hide domain={['auto', 'auto']} />
                   <Line type="monotone" dataKey="value" stroke="#059669" dot={false} strokeWidth={2} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
          <div className="bg-white border p-4 rounded-xl shadow-sm">
             <p className="text-center font-bold text-red-700 mb-4 font-sans text-sm tracking-wider uppercase">Non-Stationary Series (Trending)</p>
             <div className="h-[200px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={nonStationaryData}>
                   <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                   <XAxis dataKey="time" hide />
                   <YAxis hide domain={['auto', 'auto']} />
                   <Line type="monotone" dataKey="value" stroke="#dc2626" dot={false} strokeWidth={2} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 mb-2">Differencing Process</p>
          <p className="text-slate-800 mb-3">Differencing subtracts consecutive observations (First Difference: Y'<sub>t</sub> = Y<sub>t</sub> - Y<sub>t-1</sub>). Order of differencing (<strong>d</strong>) represents how many times differencing is applied.</p>
        </div>

        {/* 3. Moving Average */}
        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10">3. Moving Average (MA)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800 text-slate-800">
          <strong>Definition:</strong> The moving average component models the relationship between the current value and previous forecast errors.
        </p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-blue-900 mb-2">Mathematical Formula of MA(q)</p>
          <p className="text-lg font-mono text-blue-800 bg-white p-3 rounded mb-3 inline-block">
            Y<sub>t</sub> = c + ε<sub>t</sub> + θ<sub>1</sub>ε<sub>t-1</sub> + θ<sub>2</sub>ε<sub>t-2</sub> + ⋯ + θ<sub>q</sub>ε<sub>t-q</sub>
          </p>
          <ul className="text-sm font-sans text-blue-900">
            <li><strong>ε:</strong> Error term</li>
            <li><strong>θ:</strong> MA coefficients</li>
            <li><strong>q:</strong> Number of lagged errors</li>
          </ul>
        </div>
        
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="model-notation">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">ARIMA Model Notation</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ARIMA is typically written as: <code className="bg-slate-100 font-bold px-2 py-1 rounded">ARIMA(p, d, q)</code>
        </p>

        <table className="w-full text-left border-collapse mb-8 max-w-[600px]">
          <thead>
            <tr className="border-b-2 border-slate-300 text-slate-800 bg-slate-50">
              <th className="py-3 px-4 font-bold">Parameter</th>
              <th className="py-3 px-4 font-bold">Meaning</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b border-slate-200"><td className="py-2 px-4 font-bold">p</td><td className="py-2 px-4">Number of AR terms</td></tr>
            <tr className="border-b border-slate-200"><td className="py-2 px-4 font-bold">d</td><td className="py-2 px-4">Number of differencing operations</td></tr>
            <tr className="border-b border-slate-200"><td className="py-2 px-4 font-bold">q</td><td className="py-2 px-4">Number of MA terms</td></tr>
          </tbody>
        </table>

        <p className="text-lg leading-relaxed mb-4 text-slate-800 font-medium">
          Example: <code className="bg-slate-100 px-2 py-1 rounded">ARIMA(2, 1, 1)</code> means it uses 2 lag observations, applies first-order differencing, and uses 1 lagged error.
        </p>
        
        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">Types of ARIMA Models</h3>
        <ul className="list-disc pl-6 text-lg leading-relaxed text-slate-800 mb-6 space-y-2">
          <li><strong>ARIMA:</strong> Handles non-seasonal time series.</li>
          <li><strong>SARIMA:</strong> Handles seasonal patterns (e.g., Monthly sales, Yearly weather patterns).</li>
          <li><strong>SARIMAX:</strong> SARIMA with external variables.</li>
          <li><strong>ARIMAX:</strong> ARIMA with exogenous variables.</li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="working-principle">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Working Principle of ARIMA</h2>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-10 font-mono text-sm leading-relaxed text-indigo-900 shadow-sm inline-block">
          ARIMA WORKFLOW<br/>
          │<br/>
          ├── Collect Time Series Data<br/>
          ├── Check Stationarity<br/>
          ├── Apply Differencing<br/>
          ├── Plot ACF/PACF<br/>
          ├── Select p,d,q<br/>
          ├── Train ARIMA Model<br/>
          ├── Forecast Future Values<br/>
          └── Evaluate Forecast
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3"><span className="text-indigo-600">Step 1 —</span> Check Stationarity via ADF Test</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The Augmented Dickey-Fuller (ADF) test checks whether the series contains a unit root. A p-value {"<"} 0.05 indicates the series is stationary.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3 mt-8"><span className="text-indigo-600">Step 2 —</span> Plot ACF and PACF</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>ACF (Autocorrelation Function)</strong> measures correlation between observations at different lags. It helps identify <strong>q</strong>.<br/>
          <strong>PACF (Partial Autocorrelation Function)</strong> removes indirect lag effects. It helps identify <strong>p</strong>.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3 mt-8"><span className="text-indigo-600">Step 3 —</span> Model Selection (Grid Search & AIC)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Grid search tries multiple combinations of (p,d,q) and selects the best model using <strong>AIC (Akaike Information Criterion)</strong>. A lower AIC indicates a better model because it penalizes model complexity.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python-implementation">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Complete Python Implementation of ARIMA
        </h2>
        
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-3 border-b flex items-center">
            <h3 className="font-bold text-indigo-800">1. Imports & Setup</h3>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-[#d4d4d4] !m-0"><code className="language-python">{`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import itertools
import warnings
warnings.filterwarnings('ignore')`}</code></pre>
          </div>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-3 border-b flex items-center">
            <h3 className="font-bold text-indigo-800">2. Load Data & Stationarity Check</h3>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-[#d4d4d4] !m-0"><code className="language-python">{`data = pd.read_csv('AirPassengers.csv', index_col='Month', parse_dates=True)
ts = data['#Passengers']

# ADF Test
result = adfuller(ts)
print("ADF Statistic:", result[0])
print("p-value:", result[1])

# If p-value > 0.05, apply differencing
ts_diff = ts.diff().dropna() `}</code></pre>
          </div>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-3 border-b flex items-center">
            <h3 className="font-bold text-indigo-800">3. Grid Search for Best Model</h3>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-[#d4d4d4] !m-0"><code className="language-python">{`p = range(0, 4)
d = range(0, 3)
q = range(0, 4)
pdq = list(itertools.product(p, d, q))

best_aic = np.inf
best_order = None

for order in pdq:
    try:
        model = ARIMA(ts, order=order)
        results = model.fit()
        if results.aic < best_aic:
            best_aic = results.aic
            best_order = order
    except:
        continue

print("Best ARIMA Order:", best_order)`}</code></pre>
          </div>
          <div className="bg-[#1e1e1e] text-emerald-400 p-4 font-mono text-sm border-t border-slate-700">
            <p>Output:</p>
            <p>Best ARIMA Order: (2, 1, 1)</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-3 border-b flex items-center">
            <h3 className="font-bold text-indigo-800">4. Final Forecast & Visualization</h3>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-[#d4d4d4] !m-0"><code className="language-python">{`final_model = ARIMA(ts, order=best_order)
results = final_model.fit()

forecast_values = results.forecast(steps=10)
print(forecast_values)

# Plotting...`}</code></pre>
          </div>
          
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm border-t border-slate-700">
            <div className="bg-white p-4 rounded shadow-inner max-w-[600px] my-4 mx-auto">
              <p className="text-center font-bold text-slate-800 text-sm mb-2 font-sans tracking-wider uppercase">Sales Forecast</p>
              <div className="h-[250px] w-full font-sans">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis dataKey="time" type="category" tick={{fill: '#475569', fontSize: 12}} hide />
                    <YAxis type="number" domain={['auto', 'auto']} tick={{fill: '#475569', fontSize: 12}} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Line type="monotone" name="Actual Sales" dataKey="actual" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="monotone" name="ARIMA Forecast" dataKey="forecast" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#475569', paddingTop: '10px' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparison">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">ARIMA vs Machine Learning Models</h2>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden border">
            <thead>
              <tr className="bg-indigo-50 border-b-2 border-indigo-200 text-indigo-900">
                <th className="py-4 px-4 font-bold">Feature</th>
                <th className="py-4 px-4 font-bold border-l border-indigo-100">ARIMA</th>
                <th className="py-4 px-4 font-bold border-l border-indigo-100">ML Models (e.g. LSTMs)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-200"><td className="py-3 px-4 font-semibold">Data Needed</td><td className="py-3 px-4 border-l border-slate-100">Small</td><td className="py-3 px-4 border-l border-slate-100">Large</td></tr>
              <tr className="border-b border-slate-200"><td className="py-3 px-4 font-semibold">Interpretability</td><td className="py-3 px-4 border-l border-slate-100 font-bold text-emerald-600">High</td><td className="py-3 px-4 border-l border-slate-100">Medium/Low</td></tr>
              <tr className="border-b border-slate-200"><td className="py-3 px-4 font-semibold">Handles Nonlinearity</td><td className="py-3 px-4 border-l border-slate-100">Poor</td><td className="py-3 px-4 border-l border-slate-100 font-bold text-emerald-600">Better</td></tr>
              <tr className="border-b border-slate-200"><td className="py-3 px-4 font-semibold">Sequential Awareness</td><td className="py-3 px-4 border-l border-slate-100 font-bold text-emerald-600">Excellent</td><td className="py-3 px-4 border-l border-slate-100">Depends</td></tr>
              <tr className="border-b border-slate-200"><td className="py-3 px-4 font-semibold">Short-Term Forecast</td><td className="py-3 px-4 border-l border-slate-100 font-bold text-emerald-600">Excellent</td><td className="py-3 px-4 border-l border-slate-100">Good</td></tr>
              <tr><td className="py-3 px-4 font-semibold">Long-Term Forecast</td><td className="py-3 px-4 border-l border-slate-100">Moderate</td><td className="py-3 px-4 border-l border-slate-100 font-bold text-emerald-600">Better in DL</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        ARIMA is one of the most important and foundational algorithms in Time Series Forecasting. It combines AutoRegression, Differencing, and Moving Average to model sequential data and predict future observations.
      </p>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        It is widely used because it provides strong short-term forecasting, mathematical interpretability, and reliable statistical forecasting without requiring millions of data points like deep neural networks.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          ARIMA assumes relationships in data are linear and that the underlying statistical properties remain stable over time (stationarity). Always verify stationarity, properly difference your data, and use Grid Search with AIC to find the optimal p, d, and q parameters before trusting a forecast.
        </p>
      </div>
    </>
  );
}
