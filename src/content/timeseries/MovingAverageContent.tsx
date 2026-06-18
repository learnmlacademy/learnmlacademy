import React from 'react';
import { Target, Activity, Code, Layers, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const maData = [
  ...Array.from({length: 40}, (_, i) => ({
    time: i,
    original: i * 0.5 + Math.sin(i / 2) * 15 + Math.random() * 15 + 40,
  }))
].map((point, i, arr) => {
  const sma3 = i >= 2 ? (arr[i].original + arr[i-1].original + arr[i-2].original) / 3 : null;
  const ema3 = i === 0 ? point.original : null; // calculated step by step below
  return { ...point, sma3 };
});

// Calculate EMA for the chart
let prevEma = maData[0].original;
const alpha = 2 / (3 + 1);
maData.forEach((point, i) => {
  if (i === 0) {
    point['ema3'] = prevEma;
  } else {
    point['ema3'] = alpha * point.original + (1 - alpha) * prevEma;
    prevEma = point['ema3'];
  }
});

export function MovingAverageContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Moving Average (MA) in Time Series Analysis</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In real-world data analysis, many datasets are collected over time. Such data is called <strong>Time Series Data</strong> because observations are recorded sequentially over time.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-8">Examples include:</h3>
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6 font-medium text-slate-700">
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Daily stock prices</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Monthly sales</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Weather temperature</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Electricity consumption</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Website traffic</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Cryptocurrency prices</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Sensor readings</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Population growth</li>
          <li className="bg-slate-50 p-2 rounded border border-slate-200">Inflation rates</li>
        </ul>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-3 pr-4 rounded-r-md mb-8">
          <p className="text-amber-900 font-bold mb-2">The Biggest Challenge: Noise and Fluctuation</p>
          <p className="text-amber-800 text-lg leading-relaxed text-sm">
            Real-world time series data often contains random spikes, sudden drops, irregular fluctuations, and short-term volatility. These fluctuations make it difficult to identify real trends, long-term patterns, and forecasting signals.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          To solve this problem, statisticians and data scientists use a technique called <strong>Moving Average (MA)</strong>. It is one of the most fundamental and widely used concepts for smoothing data to reveal underlying patterns. Instead of processing every individual fluctuation, moving averages help us understand the general direction of the data.
        </p>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-ma">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <TrendingUp className="mr-3 text-indigo-600" /> What Is Moving Average?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Definition:</strong> A Moving Average (MA) is a statistical technique that calculates the average of data points over a fixed window that moves through time.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Basic Idea:</strong> Instead of observing every individual value separately, we average nearby observations to smooth the data.
        </p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 inline-block">
          <p className="font-bold text-blue-900 mb-2">Why Is It Called "Moving" Average?</p>
          <p className="text-blue-800 text-lg">
            The averaging window <em>moves continuously through time</em>. For example, you average the first 3 days. Then you shift by one day and average the next 3 days, and so on.
          </p>
        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm mb-8">
          <p className="text-center font-bold text-slate-700 mb-6 font-sans text-sm tracking-wider uppercase">Visualizing Noise Reduction (Smoothing)</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="original" name="Original Data (Noisy)" stroke="#94a3b8" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="sma3" name="SMA (Smoothed)" stroke="#3b82f6" dot={false} strokeWidth={3} isAnimationActive={false} />
                <Line type="monotone" dataKey="ema3" name="EMA (Smoothed & Responsive)" stroke="#f59e0b" dot={false} strokeWidth={2} strokeDasharray="4 4" isAnimationActive={false} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="types">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Types of Moving Averages
        </h2>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="font-bold text-indigo-900 text-lg mb-4">Moving Average Hierarchy</h3>
          <div className="flex flex-col space-y-2 font-mono text-sm pl-2">
            <div className="flex items-center text-indigo-800 font-bold">
              <span className="w-4 h-4 mr-2 bg-indigo-600 rounded-sm inline-block shrink-0"></span> MOVING AVERAGES
            </div>
            
            <div className="flex items-start ml-2 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-indigo-300"></div>
              
              <div className="w-full">
                {/* Branch 1 */}
                <div className="flex items-center pt-4">
                  <div className="w-4 border-t border-indigo-300 mr-2 shrink-0"></div>
                  <span className="font-semibold text-indigo-900 bg-white px-3 py-1.5 rounded-md border border-indigo-200 shadow-sm">Smoothing Techniques</span>
                </div>
                
                <div className="flex items-start ml-4 relative mt-2">
                   <div className="absolute left-0 top-0 bottom-0 w-px bg-indigo-200"></div>
                   <div className="w-full space-y-3 pb-2">
                     <div className="flex items-center pt-2">
                       <div className="w-4 border-t border-indigo-200 mr-2 shrink-0"></div>
                       <span className="text-slate-800 font-semibold w-64 shrink-0">Simple Moving Average (SMA)</span>
                       <span className="text-slate-600 text-xs font-sans">Equal weight to all points in window</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-4 border-t border-indigo-200 mr-2 shrink-0"></div>
                       <span className="text-slate-800 font-semibold w-64 shrink-0">Weighted Moving Average (WMA)</span>
                       <span className="text-slate-600 text-xs font-sans">Linearly decreasing weights</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-4 border-t border-indigo-200 mr-2 shrink-0"></div>
                       <span className="text-slate-800 font-semibold w-64 shrink-0">Exponential Moving Average (EMA)</span>
                       <span className="text-slate-600 text-xs font-sans">Exponentially decreasing weights</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-4 border-t border-indigo-200 mr-2 shrink-0"></div>
                       <span className="text-slate-800 font-semibold w-64 shrink-0">Cumulative Moving Average (CMA)</span>
                       <span className="text-slate-600 text-xs font-sans">Average of all data up to current point</span>
                     </div>
                   </div>
                </div>

                {/* Branch 2 */}
                <div className="flex items-center pt-4">
                  <div className="w-4 border-t border-indigo-300 mr-2 shrink-0"></div>
                  <span className="font-semibold text-indigo-900 bg-white px-3 py-1.5 rounded-md border border-indigo-200 shadow-sm">Forecasting Models</span>
                </div>
                
                <div className="flex items-start ml-4 relative mt-2">
                   <div className="absolute left-0 top-0 h-10 w-px bg-indigo-200"></div>
                   <div className="w-full">
                     <div className="flex items-center pt-2">
                       <div className="w-4 border-t border-indigo-200 mr-2 shrink-0"></div>
                       <span className="text-slate-800 font-semibold w-64 shrink-0">Moving Average Model (MA(q))</span>
                       <span className="text-slate-600 text-xs font-sans">Regression on past forecast errors</span>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10">1. Simple Moving Average (SMA)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Definition:</strong> Calculates the average of observations over a fixed period. Every observation in the moving window receives exactly <em>equal importance</em>. It forms the baseline for trend identification.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-white py-4 pr-4 rounded-r-md mb-8 border border-l-4">
          <p className="font-bold text-slate-900 mb-2">SMA Formula</p>
          <p className="text-lg font-mono text-slate-800 bg-slate-100 p-3 rounded mb-3 inline-block shadow-sm">
            SMA = (X<sub>1</sub> + X<sub>2</sub> + ... + X<sub>n</sub>) / n
          </p>
          <p className="text-sm font-sans text-slate-700">Example: A 3-day SMA of daily visitors (10, 20, 30) is calculated as (10+20+30) ÷ 3 = 20.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 shadow-sm">
            <h4 className="font-bold text-emerald-900 mb-2">Advantages</h4>
            <ul className="list-disc pl-5 text-sm text-emerald-800 space-y-1 font-medium">
              <li>Easy to implement and understand</li>
              <li>Reduces random noise effectively</li>
              <li>Excellent for identifying long-term support/resistance levels</li>
            </ul>
          </div>
          <div className="bg-rose-50 p-4 rounded-lg border border-rose-100 shadow-sm">
            <h4 className="font-bold text-rose-900 mb-2">Disadvantages</h4>
            <ul className="list-disc pl-5 text-sm text-rose-800 space-y-1 font-medium">
              <li>Slow reaction to sudden, recent changes (lagging effect)</li>
              <li>Oldest data point has the same impact as the newest data point</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10">2. Exponential Moving Average (EMA)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Definition:</strong> A moving average that gives <em>exponentially</em> higher weights to recent observations. Because it reacts faster to recent changes, EMA is heavily favored in algorithmic trading, financial forecasting, and active technical indicators over SMA.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-white py-4 pr-4 rounded-r-md mb-8 border border-l-4">
          <p className="font-bold text-slate-900 mb-2">EMA Formula</p>
          <p className="text-lg font-mono text-slate-800 bg-slate-100 p-3 rounded mb-3 inline-block shadow-sm">
            EMA<sub>t</sub> = αX<sub>t</sub> + (1 - α)EMA<sub>t-1</sub>
          </p>
          <p className="text-sm font-sans text-slate-700">Where <strong>α</strong> is the smoothing factor: α = 2 / (n + 1)</p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10">3. Weighted & Cumulative Moving Averages</h3>
        <p className="text-lg leading-relaxed mb-2 text-slate-800">
          <strong>Weighted Moving Average (WMA):</strong> Assigns linearly different weights to observations (e.g., today's weight is 3, yesterday's is 2, day before is 1).
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          <strong>Cumulative Moving Average (CMA):</strong> Averages all data points up to the current point, rather than a fixed rolling window. Useful for tracking lifetime averages (e.g., career batting average).
        </p>

        <div className="overflow-x-auto mb-8 max-w-2xl mt-4">
          <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden border">
            <thead>
              <tr className="bg-indigo-50 border-b-2 border-indigo-200 text-indigo-900">
                <th className="py-3 px-4 font-bold">Feature</th>
                <th className="py-3 px-4 font-bold border-l border-indigo-100">SMA</th>
                <th className="py-3 px-4 font-bold border-l border-indigo-100">EMA</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 text-sm">
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Weighting</td><td className="py-2 px-4 border-l border-slate-100">Equal</td><td className="py-2 px-4 border-l border-slate-100 font-bold text-indigo-600">Recent data weighted more</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Speed</td><td className="py-2 px-4 border-l border-slate-100">Slower</td><td className="py-2 px-4 border-l border-slate-100 font-bold text-indigo-600">Faster</td></tr>
              <tr className="border-b border-slate-200"><td className="py-2 px-4 font-semibold">Sensitivity</td><td className="py-2 px-4 border-l border-slate-100">Lower</td><td className="py-2 px-4 border-l border-slate-100 font-bold text-indigo-600">Higher</td></tr>
            </tbody>
          </table>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="ma-q">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> Moving Average Model: MA(q) in Forecasting
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          So far we discussed smoothing averages. Now let us understand the <strong>MA(q) Model</strong> used in Time Series Forecasting algorithms like ARIMA.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Definition:</strong> The Moving Average model assumes the <em>current value depends heavily on previous forecasting error terms</em>. This is structurally different from SMA/EMA tracking observation values.
        </p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-blue-900 mb-2">Mathematical Formula of MA(q)</p>
          <p className="text-lg font-mono text-blue-800 bg-white p-3 rounded mb-3 inline-block shadow-sm">
            X<sub>t</sub> = c + ε<sub>t</sub> + θ<sub>1</sub>ε<sub>t-1</sub> + θ<sub>2</sub>ε<sub>t-2</sub> + ⋯ + θ<sub>q</sub>ε<sub>t-q</sub>
          </p>
          <ul className="text-sm font-sans text-blue-900 space-y-1 font-medium">
            <li><strong>ε:</strong> Current error term (white noise)</li>
            <li><strong>θ:</strong> Moving Average coefficients (weights applied to past errors)</li>
            <li><strong>q:</strong> Order of the model (Number of previous error terms used)</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm mb-8">
          <h4 className="font-bold text-slate-800 border-b pb-2 mb-4 text-lg">Detailed Workout Example: MA(2) Model Prediction</h4>
          <p className="text-base text-slate-700 mb-4 leading-relaxed">
            Suppose we have an MA(2) model. This means today's forecasted value directly depends on the forecasting errors from the past 2 days. Let us assume we have derived the following parameters:
          </p>
          
          <ul className="list-none pl-0 text-sm text-slate-700 space-y-3 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <li className="flex items-center"><span className="w-32 inline-block font-bold">Constant (c)</span> = 50 <em>(The baseline average prediction of the series)</em></li>
            <li className="flex items-center"><span className="w-32 inline-block font-bold">Coefficient θ₁</span> = 0.8 <em>(Weight of yesterday's error)</em></li>
            <li className="flex items-center"><span className="w-32 inline-block font-bold">Coefficient θ₂</span> = 0.3 <em>(Weight of the day-before's error)</em></li>
          </ul>

          <p className="text-base text-slate-700 mb-2">
            Let us say we observed our past errors:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-6 font-medium">
            <li><strong>Yesterday's error (ε<sub>t-1</sub>):</strong> 4 (Our model under-predicted by 4 units yesterday)</li>
            <li><strong>Day-before error (ε<sub>t-2</sub>):</strong> -2 (Our model over-predicted by 2 units)</li>
            <li><strong>Today's inherent random noise (ε<sub>t</sub>):</strong> Assumed 0 for forecasting expectation.</li>
          </ul>
          
          <div className="bg-slate-900 p-5 rounded-md text-amber-400 font-mono text-sm leading-relaxed shadow-inner">
            <p className="mb-2 font-bold font-sans text-emerald-400">Step-by-Step Calculation:</p>
            <p>X<sub>t</sub> = c + θ₁*(ε<sub>t-1</sub>) + θ₂*(ε<sub>t-2</sub>)</p>
            <p>X<sub>t</sub> = 50 + (0.8 × 4) + (0.3 × -2)</p>
            <p>X<sub>t</sub> = 50 + 3.2 - 0.6</p>
            <p className="font-bold mt-2 border-t border-slate-700 pt-2 text-base text-white">X<sub>t</sub> = 52.6</p>
          </div>
          
          <p className="text-base text-slate-800 mt-5 leading-relaxed bg-blue-50 p-4 rounded border-l-4 border-blue-400">
            <strong>Conclusion:</strong> The model forecasts today's value to be <strong>52.6</strong>. Because we under-predicted heavily yesterday (error of +4), the MA model realizes it needs to adjust its baseline upwards (adding 3.2) to compensate, while slightly correcting down for the over-prediction from two days ago.
          </p>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="important-concepts">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Important Concepts Related to Moving Average</h2>

        <h3 className="text-xl font-bold text-slate-800 mb-3"><span className="text-indigo-600">1.</span> Stationarity & Differencing</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Stationarity</strong> means statistical properties (mean, variance) remain constant over time. Time series models require stable bounds for reliable forecasting. <strong>Differencing</strong> removes trends from data (ΔY<sub>t</sub> = Y<sub>t</sub> - Y<sub>t-1</sub>) to achieve stationarity.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3 mt-8"><span className="text-indigo-600">2.</span> White Noise</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          White noise is completely random data with a mean of 0, constant variance, and no autocorrelation. A good forecasting model should leave only white noise errors after prediction.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3 mt-8"><span className="text-indigo-600">3.</span> ACF Plot</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>ACF (Autocorrelation Function)</strong> measures the relationship between current values and lagged values. An ACF plot is used to identify the optimal parameter <strong>q</strong> for an MA(q) model.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Complete Python Implementation
        </h2>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 px-4 py-3 border-b flex items-center">
            <h3 className="font-bold text-indigo-800">Simple and Exponential Moving Averages</h3>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-[#d4d4d4] !m-0"><code className="language-python">{`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Step 1: Create Sample Dataset
data = [10, 20, 30, 40, 50, 60, 70]
df = pd.DataFrame(data, columns=['Value'])

# Step 2: Compute Simple Moving Average (SMA - Window of 3)
df['SMA_3'] = df['Value'].rolling(window=3).mean()

# Step 3: Compute Exponential Moving Average (EMA - Span of 3)
df['EMA_3'] = df['Value'].ewm(span=3).mean()

print(df)

# Step 4: Plot Moving Average
plt.plot(df['Value'], label='Original Data')
plt.plot(df['SMA_3'], label='3-Day SMA')
plt.plot(df['EMA_3'], label='3-Day EMA')
plt.legend()
plt.show()`}</code></pre>
          </div>
          <div className="bg-[#1e1e1e] text-emerald-400 p-4 font-mono text-sm border-t border-slate-700">
            <p className="mb-2">Output:</p>
            <pre className="!m-0">{`   Value  SMA_3      EMA_3
0     10    NaN  10.000000
1     20    NaN  16.666667
2     30   20.0  24.285714
3     40   30.0  32.666667
4     50   40.0  41.612903
5     60   50.0  50.952381
6     70   60.0  60.551181`}</pre>

            <div className="bg-white p-6 rounded-lg shadow-inner w-full mt-6 mx-auto font-sans border border-slate-200">
              <p className="text-center font-bold text-slate-800 text-sm mb-4 font-sans tracking-wider uppercase">Visual Output of plt.show()</p>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    {time: 'Day 1', value: 10, sma: null, ema: 10}, 
                    {time: 'Day 2', value: 20, sma: null, ema: 16.67}, 
                    {time: 'Day 3', value: 30, sma: 20, ema: 24.29}, 
                    {time: 'Day 4', value: 40, sma: 30, ema: 32.67}, 
                    {time: 'Day 5', value: 50, sma: 40, ema: 41.61}, 
                    {time: 'Day 6', value: 60, sma: 50, ema: 50.95}, 
                    {time: 'Day 7', value: 70, sma: 60, ema: 60.55}
                  ]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis dataKey="time" type="category" tick={{fill: '#475569', fontSize: 12}} />
                    <YAxis type="number" domain={['auto', 'auto']} tick={{fill: '#475569', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                    <Line type="monotone" name="Original Data" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} isAnimationActive={false} />
                    <Line type="monotone" name="3-Day SMA" dataKey="sma" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4 }} isAnimationActive={false} />
                    <Line type="monotone" name="3-Day EMA" dataKey="ema" stroke="#22c55e" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4 }} isAnimationActive={false} />
                    <Legend wrapperStyle={{ fontSize: '13px', fontWeight: '500', color: '#334155', paddingTop: '16px' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Moving Average (MA) is one of the most important concepts in Time Series Analysis and Forecasting. Its primary purpose is smoothing noisy data to reveal meaningful patterns such as trends, support levels, and overall trajectories.
      </p>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Different types of moving averages—such as SMA, WMA, and EMA—serve different purposes, with EMA being especially popular in fast-moving financial environments due to its responsiveness. Moving Average models (MA(q)) also play a central role inside ARIMA forecasting systems, which are among the most widely used statistical forecasting models in Machine Learning.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Remember the distinction between using a Moving Average purely as a data smoothing tool (like a 50-day SMA in stock charts) versus using it as a predictive model (MA(q) in ARIMA). Smoothing helps visualize trends retrospectively, while MA models use the historical residuals (errors) mathematically to forecast the true next step into the future.
        </p>
      </div>

    </>
  );
}
