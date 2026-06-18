import React from "react";
import { LineChart, MoveRight, ArrowRight, TrendingUp, Activity, BarChart, ChevronRight } from "lucide-react";

export function ExponentialSmoothingContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
        Exponential Smoothing for Time Series Forecasting
      </h1>
      
      <div className="text-xl text-slate-700 mb-8 leading-relaxed">
        A complete, detailed guide to one of the most important classical forecasting methods used in business analytics and machine learning.
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Introduction
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        In real-world forecasting problems, data changes continuously over time. Examples include:
      </p>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Daily stock prices</li>
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Monthly product sales</li>
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Weather temperature readings</li>
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Electricity consumption</li>
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Website traffic</li>
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Cryptocurrency prices</li>
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Population growth</li>
        <li className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg"><ChevronRight className="w-5 h-5 text-indigo-500 mr-2" /> Demand forecasting</li>
      </ul>

      <p className="text-lg leading-relaxed mb-4">
        Such sequential data is known as <strong>Time Series Data</strong>. One of the biggest challenges in time series forecasting is:
      </p>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-3 pr-4 rounded-r-md mb-8">
        <p className="text-slate-800 font-medium">How to predict future values accurately while handling noise and fluctuations.</p>
      </div>

      <p className="text-lg leading-relaxed mb-4">
        Real-world data is rarely smooth. It often contains sudden spikes, random fluctuations, seasonal changes, noise, trends, and irregular behavior. Simple forecasting methods may react too strongly to random noise or fail to capture underlying patterns. To solve this problem, statisticians developed a powerful forecasting technique called <strong>Exponential Smoothing</strong>.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        What Is Exponential Smoothing?
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Exponential Smoothing is a forecasting technique that predicts future values by assigning exponentially decreasing weights to past observations.
      </p>

      <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h3 className="font-bold text-slate-800 text-xl mb-3 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
          The Core Concept
        </h3>
        <p className="text-slate-700 mb-4">
          Suppose you want to forecast tomorrow’s sales. Which data is more important: Sales from yesterday, or sales from 5 years ago?
        </p>
        <p className="text-slate-800 font-bold italic">
          Recent observations are more important than older observations.
        </p>
        <p className="text-slate-700 mt-4">
          Exponential smoothing mathematically captures this intuition. Instead of treating all past observations equally, it assigns higher weights to recent data and lower weights to older data. Older observations never completely disappear, but their influence becomes smaller over time.
        </p>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4">Why is it called "Exponential"?</h3>
      <p className="text-lg leading-relaxed mb-4">
        The weights decrease exponentially as observations become older. For example:
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-slate-200 border rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Observation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Weight</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Most recent</td><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-mono">0.5</td></tr>
            <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Previous</td><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-mono">0.25</td></tr>
            <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Older</td><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-mono">0.125</td></tr>
            <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Much older</td><td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-mono">0.0625</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Types of Exponential Smoothing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h4 className="font-bold text-indigo-900 text-lg mb-2">1. Simple (SES)</h4>
          <p className="text-indigo-800 text-sm">Used for stable data with no trend and no seasonality.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
          <h4 className="font-bold text-emerald-900 text-lg mb-2">2. Double</h4>
          <p className="text-emerald-800 text-sm">Models the level and trend. Used when data grows or shrinks consistently.</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
          <h4 className="font-bold text-amber-900 text-lg mb-2">3. Triple (Holt-Winters)</h4>
          <p className="text-amber-800 text-sm">Handles repeating seasonal patterns on top of trend and level.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4">1. Simple Exponential Smoothing (SES)</h3>
      <p className="text-lg leading-relaxed mb-4">
        The forecast is updated using a combination of the current observation and the previous forecast.
      </p>

      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-6 font-mono text-center text-lg text-indigo-900 font-semibold">
        F<sub>t+1</sub> = α Y<sub>t</sub> + (1 − α) F<sub>t</sub>
      </div>

      <p className="text-lg leading-relaxed mb-4">
        Where <strong className="font-mono text-indigo-700">α (alpha)</strong> is the smoothing factor (0 &lt; α &lt; 1). A small alpha produces smoother forecasts (changes slowly), while a large alpha reacts faster to changes.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-lg text-slate-700 mb-8">
        <li><strong>Advantages:</strong> Easy to implement, reduces noise, works well for stable data, low computational cost.</li>
        <li><strong>Disadvantages:</strong> Cannot handle trends or seasonality. Poor performance on rapidly changing data.</li>
      </ul>

      <h3 className="text-xl font-bold text-slate-800 mb-4">2. Double Exponential Smoothing (Holt's Method)</h3>
      <p className="text-lg leading-relaxed mb-4">
        SES lags behind when there is a continuous increase (like monthly sales going 100, 120, 140...). Double smoothing solves this issue by modeling both <strong>Level</strong> and <strong>Trend</strong>.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mb-4">3. Triple Exponential Smoothing (Holt-Winters)</h3>
      <p className="text-lg leading-relaxed mb-4">
        Triple Exponential Smoothing handles Trend + Seasonality. Seasonality refers to repeating patterns (e.g., Ice cream sales increase in summer, Electricity demand rises during winter). By combining Level, Trend, and Seasonality, Holt-Winters models long-term growth and seasonal repetition simultaneously.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Python Implementation
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Using the <code>statsmodels</code> library in Python, these methods are incredibly easy to apply to real data series.
      </p>

      <div className="bg-[#1e1e1e] text-[#d4d4d4] rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-300 border-b border-slate-700">python</div>
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed">
<span className="text-pink-400">import</span> pandas <span className="text-pink-400">as</span> pd
<span className="text-pink-400">import</span> matplotlib.pyplot <span className="text-pink-400">as</span> plt
<span className="text-pink-400">from</span> statsmodels.tsa.holtwinters <span className="text-pink-400">import</span> SimpleExpSmoothing, Holt, ExponentialSmoothing

<span className="text-slate-500"># 1. Simple Exponential Smoothing</span>
data = [<span className="text-blue-300">100</span>, <span className="text-blue-300">120</span>, <span className="text-blue-300">140</span>, <span className="text-blue-300">130</span>, <span className="text-blue-300">150</span>, <span className="text-blue-300">170</span>]
df = pd.DataFrame(data, columns=[<span className="text-green-300">'Sales'</span>])

model = SimpleExpSmoothing(df[<span className="text-green-300">'Sales'</span>])
fit_model = model.fit(smoothing_level=<span className="text-blue-300">0.3</span>)

<span className="text-slate-500"># 2. Holt's Method (Double)</span>
model_double = Holt(df[<span className="text-green-300">'Sales'</span>])
fit_double = model_double.fit()

<span className="text-slate-500"># 3. Holt-Winters (Triple)</span>
model_triple = ExponentialSmoothing(
    df[<span className="text-green-300">'Sales'</span>],
    trend=<span className="text-green-300">'add'</span>, 
    seasonal=<span className="text-green-300">'add'</span>, 
    seasonal_periods=<span className="text-blue-300">12</span>
)
fit_triple = model_triple.fit()
          </pre>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Exponential Smoothing is one of the most important forecasting techniques in Time Series Analysis and Machine Learning. By assigning exponentially decreasing weights to older data, exponential smoothing reduces noise, captures trends, produces stable forecasts, and improves prediction quality.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        It remains one of the most widely used forecasting techniques in business forecasting, financial analytics, inventory management, demand prediction, and AI-based systems because of its simplicity, interpretability and strong forecasting performance.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Recent observations are inherently more valuable for predicting immediate futures than distant past observations. Instead of dropping history entirely, exponential smoothing elegantly decays its importance, allowing the model to adapt quickly to new trends while remaining resilient to random noise.
        </p>
      </div>
    </>
  );
}
