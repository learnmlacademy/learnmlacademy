import React from "react";
import {
  ArrowRight,
  TrendingUp,
  CalendarDays,
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export function ExponentialSmoothingContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
        Exponential Smoothing for Time Series Forecasting
      </h1>

      <p className="text-xl text-slate-700 mb-8 leading-relaxed">
        Exponential smoothing is a family of forecasting methods that updates its view of a time series as new observations arrive. The basic idea is simple: recent information usually receives more weight, while older information fades gradually rather than being dropped suddenly.
      </p>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Understand First: The Big Idea</h2>
        <div className="flex flex-wrap items-center gap-3 text-slate-800 font-semibold">
          <span className="bg-white border rounded-lg px-4 py-3">Observe new value</span>
          <ArrowRight className="w-5 h-5 text-indigo-500" />
          <span className="bg-white border rounded-lg px-4 py-3">Update level / trend / seasonality</span>
          <ArrowRight className="w-5 h-5 text-indigo-500" />
          <span className="bg-white border rounded-lg px-4 py-3">Forecast ahead</span>
        </div>
        <p className="text-slate-700 mt-4 mb-0">
          Different members of the exponential-smoothing family update different pieces of the pattern. <strong>Simple Exponential Smoothing</strong> models a level, <strong>Holt&apos;s method</strong> adds trend, and <strong>Holt-Winters</strong> can also add seasonality.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Why Not Give Every Past Observation Equal Weight?
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Imagine forecasting tomorrow&apos;s demand for a food-delivery service. Yesterday&apos;s demand may tell us more about the current level than demand from two years ago. A simple moving average uses a hard window: observations are either inside the window or outside it. Exponential smoothing instead lets influence decay gradually.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-slate-200 border rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Age of information</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Illustrative weight</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Idea</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr><td className="px-5 py-3">Most recent</td><td className="px-5 py-3 font-mono">0.50</td><td className="px-5 py-3">Strong influence</td></tr>
            <tr><td className="px-5 py-3">One step older</td><td className="px-5 py-3 font-mono">0.25</td><td className="px-5 py-3">Smaller influence</td></tr>
            <tr><td className="px-5 py-3">Two steps older</td><td className="px-5 py-3 font-mono">0.125</td><td className="px-5 py-3">Smaller again</td></tr>
            <tr><td className="px-5 py-3">Three steps older</td><td className="px-5 py-3 font-mono">0.0625</td><td className="px-5 py-3">Still present, but faint</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5 mb-10">
        <p className="text-slate-800 leading-relaxed mb-0">
          <strong>Important:</strong> “recent is more useful” is a modeling assumption, not a law of nature. Exponential smoothing is most appropriate when the recent level, trend, and/or seasonal pattern are useful guides to the near future.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        1. Simple Exponential Smoothing (SES)
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        SES is the simplest member of the family. It is mainly used when the series has a changing <strong>level</strong> but no systematic trend or seasonality that needs to be modeled explicitly.
      </p>

      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-6 text-center text-lg text-indigo-900 font-semibold">
        S<sub>t</sub> = αY<sub>t</sub> + (1 − α)S<sub>t−1</sub>
      </div>

      <ul className="list-disc pl-6 space-y-2 text-lg text-slate-700 mb-6">
        <li><strong>Y<sub>t</sub></strong> = current observation</li>
        <li><strong>S<sub>t−1</sub></strong> = previous smoothed level</li>
        <li><strong>α</strong> = smoothing parameter, usually between 0 and 1</li>
        <li>For ordinary SES, the next one-step forecast is the updated level <strong>S<sub>t</sub></strong>.</li>
      </ul>

      <h3 className="text-xl font-bold text-slate-800 mb-4">Worked Example</h3>
      <p className="text-lg leading-relaxed mb-3">
        Suppose the previous smoothed level is <strong>100</strong>, today&apos;s observed sales are <strong>120</strong>, and α = <strong>0.4</strong>.
      </p>

      <div className="bg-slate-50 border rounded-xl p-6 mb-8 font-mono text-slate-800 leading-8">
        S<sub>t</sub> = 0.4(120) + 0.6(100)<br />
        = 48 + 60<br />
        = <strong>108</strong>
      </div>
      <p className="text-lg leading-relaxed mb-8">
        The new level becomes <strong>108</strong>. The model has moved toward the latest observation, but it has not jumped all the way from 100 to 120.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <SlidersHorizontal className="w-5 h-5 mr-2 text-indigo-600" /> What Does α Control?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="border rounded-xl p-5 bg-slate-50">
          <h4 className="font-bold text-slate-900 mb-2">Smaller α</h4>
          <p className="text-slate-700 mb-0">The level changes more slowly. The forecast is smoother and less reactive to the latest observation.</p>
        </div>
        <div className="border rounded-xl p-5 bg-slate-50">
          <h4 className="font-bold text-slate-900 mb-2">Larger α</h4>
          <p className="text-slate-700 mb-0">The level reacts more strongly to recent observations. It adapts faster but can also follow short-term fluctuations more closely.</p>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-8">
        There is no universally best α. In practice it can be chosen from domain knowledge or estimated by minimizing an in-sample fitting objective, then the forecasting approach should still be checked on future/held-out periods.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        2. Holt&apos;s Method: Add a Trend
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        SES tends to lag when the series has a persistent upward or downward movement. Holt&apos;s linear trend method maintains two pieces of information:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
          <h3 className="font-bold text-emerald-900 mb-2">Level</h3>
          <p className="text-emerald-900/80 mb-0">Where the series is now.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">Trend</h3>
          <p className="text-blue-900/80 mb-0">How quickly the level is moving upward or downward.</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-8">
        <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" /> Simple Intuition
        </h3>
        <p className="text-slate-700 mb-2">Suppose recent monthly demand looks approximately like:</p>
        <p className="font-mono text-slate-800 mb-3">100 → 108 → 117 → 125 → 134 → 143</p>
        <p className="text-slate-700 mb-0">SES mainly updates the current level. Holt&apos;s method also estimates the continuing upward movement, so its forecast can keep moving rather than becoming flat immediately.</p>
      </div>

      <p className="text-lg leading-relaxed mb-8">
        Holt&apos;s method is sometimes called <strong>double exponential smoothing</strong>, although the clearer description is “exponential smoothing with level and trend.” A <strong>damped trend</strong> variant can gradually reduce how strongly a trend is projected far into the future.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        3. Holt-Winters: Add Seasonality
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Many time series repeat a pattern at a known frequency: monthly retail demand may rise every December, electricity usage may repeat by hour of day, or quarterly sales may repeat every four quarters. Holt-Winters extends exponential smoothing to represent:
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-8 font-semibold text-slate-800">
        <span className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3">Level</span>
        <span>+</span>
        <span className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">Trend</span>
        <span>+</span>
        <span className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">Seasonality</span>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4">What Is `seasonal_periods`?</h3>
      <p className="text-lg leading-relaxed mb-4">
        It tells the model how many observations make one complete seasonal cycle. It must match the sampling frequency and the real repeating pattern.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-slate-200 border rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Data</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Possible cycle</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">seasonal_periods</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr><td className="px-5 py-3">Monthly</td><td className="px-5 py-3">Yearly pattern</td><td className="px-5 py-3 font-mono">12</td></tr>
            <tr><td className="px-5 py-3">Quarterly</td><td className="px-5 py-3">Yearly pattern</td><td className="px-5 py-3 font-mono">4</td></tr>
            <tr><td className="px-5 py-3">Hourly</td><td className="px-5 py-3">Daily pattern</td><td className="px-5 py-3 font-mono">24</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5 mb-10">
        <p className="text-slate-800 mb-0">
          <strong>Do not automatically use 12 for every dataset.</strong> Twelve is appropriate for a yearly seasonal cycle only when observations are monthly. The period should come from the time scale and the pattern in the data.
        </p>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4">Additive vs Multiplicative Seasonality</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="border rounded-xl p-5">
          <h4 className="font-bold text-slate-900 mb-2">Additive</h4>
          <p className="text-slate-700 mb-2">Seasonal swings are roughly similar in absolute size.</p>
          <p className="font-mono text-sm text-slate-600 mb-0">Example: +20 units every December</p>
        </div>
        <div className="border rounded-xl p-5">
          <h4 className="font-bold text-slate-900 mb-2">Multiplicative</h4>
          <p className="text-slate-700 mb-2">Seasonal swings grow or shrink roughly in proportion to the series level.</p>
          <p className="font-mono text-sm text-slate-600 mb-0">Example: about +20% every December</p>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-8">
        Multiplicative components require care when the series contains zero or negative values. Additive and multiplicative choices should be driven by how seasonal variation behaves, not by a rule that one is always superior.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        The Three Smoothing Parameters
      </h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-slate-200 border rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Parameter</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Updates</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Intuition</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr><td className="px-5 py-3 font-mono">α</td><td className="px-5 py-3">Level</td><td className="px-5 py-3">How quickly the level responds</td></tr>
            <tr><td className="px-5 py-3 font-mono">β</td><td className="px-5 py-3">Trend</td><td className="px-5 py-3">How quickly the trend estimate responds</td></tr>
            <tr><td className="px-5 py-3 font-mono">γ</td><td className="px-5 py-3">Seasonality</td><td className="px-5 py-3">How quickly seasonal effects respond</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-lg leading-relaxed mb-8">
        You do not normally need to guess all three by hand. Forecasting software can estimate them from the training data, but the selected model still needs chronological evaluation on unseen future periods.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Which Method Should I Start With?
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full divide-y divide-slate-200 border rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Pattern</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Useful starting model</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr><td className="px-5 py-3">Level only</td><td className="px-5 py-3">Simple Exponential Smoothing</td></tr>
            <tr><td className="px-5 py-3">Level + trend</td><td className="px-5 py-3">Holt&apos;s method</td></tr>
            <tr><td className="px-5 py-3">Level + trend + repeating seasonality</td><td className="px-5 py-3">Holt-Winters</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Time-Series Evaluation: Keep the Future in the Future
      </h2>
      <div className="bg-slate-50 border rounded-xl p-6 mb-6">
        <div className="flex flex-wrap items-center gap-3 font-semibold text-slate-800">
          <span className="bg-white border rounded-lg px-4 py-3">Earlier dates: train</span>
          <ArrowRight className="w-5 h-5 text-indigo-500" />
          <span className="bg-white border rounded-lg px-4 py-3">Later dates: validate/test</span>
          <ArrowRight className="w-5 h-5 text-indigo-500" />
          <span className="bg-white border rounded-lg px-4 py-3">Compare forecasts with reality</span>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-8">
        Randomly shuffling a forecasting dataset can allow future observations to influence training. Use chronological holdouts or time-series cross-validation instead. Compare forecasting errors such as MAE or RMSE across sensible candidate models rather than assuming the most complicated smoothing method will win.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Python Implementation with statsmodels
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        The following example is self-contained. It demonstrates SES, Holt&apos;s method, and Holt-Winters without requiring an external CSV file.
      </p>

      <div className="bg-[#1e1e1e] text-[#d4d4d4] rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-300 border-b border-slate-700">python</div>
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed whitespace-pre">{`import numpy as np
import pandas as pd
from statsmodels.tsa.holtwinters import (
    SimpleExpSmoothing,
    Holt,
    ExponentialSmoothing,
)

# 1) Simple Exponential Smoothing
stable = pd.Series([100, 110, 105, 120, 118], dtype=float)

ses_fit = SimpleExpSmoothing(
    stable,
    initialization_method="known",
    initial_level=100,
).fit(
    smoothing_level=0.4,
    optimized=False,
)

print(
    "SES next forecast:",
    round(float(ses_fit.forecast(1).iloc[0]), 2),
)

# 2) Holt's method for a trending series
trend = pd.Series(
    [100, 108, 117, 125, 134, 143, 151, 160],
    dtype=float,
)

holt_fit = Holt(
    trend,
    initialization_method="estimated",
).fit()

print(
    "Holt next 3:",
    np.round(holt_fit.forecast(3), 2).tolist(),
)

# 3) Holt-Winters for monthly trend + seasonality
season_pattern = [-10, -7, -3, 2, 7, 12, 15, 10, 5, 1, -4, -8]

seasonal_values = [
    120 + 1.5 * t + season_pattern[t % 12]
    for t in range(48)
]

seasonal = pd.Series(
    seasonal_values,
    index=pd.date_range(
        "2022-01-01",
        periods=48,
        freq="MS",
    ),
    dtype=float,
)

hw_fit = ExponentialSmoothing(
    seasonal,
    trend="add",
    seasonal="add",
    seasonal_periods=12,
    initialization_method="estimated",
).fit()

print(
    "Holt-Winters next 3:",
    np.round(hw_fit.forecast(3), 2).tolist(),
)`}</pre>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4">Expected Output</h3>
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-8 font-mono text-sm leading-7 overflow-x-auto">
        SES next forecast: 113.58<br />
        Holt next 3: [168.43, 177.02, 185.62]<br />
        Holt-Winters next 3: [182.0, 186.5, 192.0]
      </div>

      <p className="text-lg leading-relaxed mb-8">
        The examples use different toy series on purpose. SES is shown on level-like data, Holt on a trend, and Holt-Winters on a repeating monthly seasonal pattern. Do not compare the three printed forecast values with each other because they come from different datasets.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Going Deeper: What “Optimized” Means
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        In statsmodels, the smoothing parameters can be supplied manually or estimated during fitting. In the SES example above, α is deliberately fixed at 0.4 so you can connect the code to the hand calculation. For Holt and Holt-Winters, the example lets statsmodels estimate the smoothing parameters.
      </p>
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-5 mb-8">
        <p className="text-slate-800 mb-0">
          Parameter optimization improves the fit to the training objective; it does <strong>not</strong> guarantee the best future forecast. Chronological validation is still necessary.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Exponential Smoothing vs Moving Average vs ARIMA
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full divide-y divide-slate-200 border rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Method</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Main idea</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase">Good reason to consider it</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr><td className="px-5 py-3">Moving Average smoother</td><td className="px-5 py-3">Average a recent window</td><td className="px-5 py-3">Simple smoothing / baseline forecasting rules</td></tr>
            <tr><td className="px-5 py-3">Exponential Smoothing</td><td className="px-5 py-3">Update level, trend and possibly seasonality with decaying influence</td><td className="px-5 py-3">Interpretable forecasting with evolving local patterns</td></tr>
            <tr><td className="px-5 py-3">ARIMA</td><td className="px-5 py-3">Model differenced values using AR and lagged-error structure</td><td className="px-5 py-3">Autocorrelation-driven linear time-series structure</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-lg leading-relaxed mb-8">
        None of these is universally best. A sensible forecasting workflow compares appropriate candidates using future-like validation and the metric that matters for the problem.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Common Mistakes
      </h2>
      <div className="space-y-4 mb-10">
        {[
          ["Using SES on strong trend or seasonality", "SES models only a level. Consider Holt or Holt-Winters when those structures are real and persistent."],
          ["Assuming a larger α is always better", "A larger α is more reactive, not automatically more accurate."],
          ["Setting seasonal_periods = 12 automatically", "The seasonal period must match the sampling frequency and repeating cycle."],
          ["Randomly shuffling time-series data", "Forecasting evaluation should preserve time order."],
          ["Using multiplicative seasonality blindly", "Multiplicative components are not suitable for every scale and require particular care around zeros or negative values."],
          ["Calling the training-optimal fit the best forecasting model", "Judge forecasting performance on later unseen periods."],
        ].map(([title, text]) => (
          <div key={title} className="flex gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-none" />
            <div>
              <p className="font-bold text-red-900 mb-1">{title}</p>
              <p className="text-red-900/80 mb-0">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Quick Recap
      </h2>
      <div className="space-y-4 mb-10">
        <details className="border rounded-xl p-5 bg-slate-50">
          <summary className="font-bold text-slate-900 cursor-pointer">When should I start with Simple Exponential Smoothing?</summary>
          <p className="mt-3 text-slate-700 mb-0">When a level-only description is reasonable and there is no trend or seasonality that needs explicit modeling.</p>
        </details>
        <details className="border rounded-xl p-5 bg-slate-50">
          <summary className="font-bold text-slate-900 cursor-pointer">What does Holt add to SES?</summary>
          <p className="mt-3 text-slate-700 mb-0">A trend component, so the forecast can continue an estimated upward or downward movement.</p>
        </details>
        <details className="border rounded-xl p-5 bg-slate-50">
          <summary className="font-bold text-slate-900 cursor-pointer">What does Holt-Winters add?</summary>
          <p className="mt-3 text-slate-700 mb-0">A seasonal component, allowing a repeating pattern to be forecast along with level and, when included, trend.</p>
        </details>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <div className="bg-slate-50 border rounded-xl p-6 mb-8">
        <div className="space-y-3">
          {[
            "SES updates the current level.",
            "Holt's method adds an evolving trend.",
            "Holt-Winters can add repeating seasonality.",
            "α, β and γ control how quickly level, trend and seasonality respond.",
            "The seasonal period must reflect the real time scale of the repeating cycle.",
            "Forecasting models should be evaluated chronologically on unseen future periods.",
          ].map((item) => (
            <div key={item} className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-none" />
              <p className="text-slate-700 mb-0">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-6 mb-10">
        <p className="text-indigo-950 font-bold text-lg mb-2">Most Important Insight</p>
        <p className="text-indigo-900 mb-0 leading-relaxed">
          Exponential smoothing is not simply “give recent points more weight.” It is a structured forecasting family that continuously updates estimates of the series&apos; current level, and when needed, its trend and seasonal pattern.
        </p>
      </div>

      <div className="border-t pt-6 mb-10">
        <p className="text-slate-600 mb-3 flex items-center"><CalendarDays className="w-5 h-5 mr-2" />Continue the time-series learning path:</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/moving-average" className="text-indigo-700 font-semibold hover:underline">Moving Average</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/arima" className="text-indigo-700 font-semibold hover:underline">ARIMA</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/forecasting-basics" className="text-indigo-700 font-semibold hover:underline">Forecasting Basics</a>
        </div>
      </div>
    </>
  );
}
