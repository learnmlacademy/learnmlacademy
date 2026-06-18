import React from 'react';
import { 
  ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

export function LinearRegressionContent() {
  const noisyData = [
    { hours: 1, score: 38, trend: 40 },
    { hours: 2, score: 52, trend: 50 },
    { hours: 3, score: 56, trend: 60 },
    { hours: 4, score: 72, trend: 70 },
    { hours: 5, score: 78, trend: 80 },
    { hours: 6, score: 94, trend: 90 },
  ];

  const gdData = [
    { param: -10, cost: 100 },
    { param: -8, cost: 64 },
    { param: -5, cost: 25 },
    { param: -2, cost: 4 },
    { param: 0, cost: 0 },
    { param: 2, cost: 4 },
    { param: 5, cost: 25 },
    { param: 8, cost: 64 },
    { param: 10, cost: 100 },
  ];

  const pythonVizData = Array.from({ length: 50 }, (_, i) => {
    const x = ((Math.sin(i * 12.345) + 1) / 2) * 100;
    const noise = Math.cos(i * 67.89) * 20;
    const y = 3.5 * x + noise;
    const yPred = 3.49 * x + 1.54;
    return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)), yPred: parseFloat(yPred.toFixed(2)) };
  });

  return (
    <div className="prose prose-slate max-w-none text-slate-800">
      
      {/* 1. Introduction */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Linear Regression</h1>
        
        <p className="text-lg leading-relaxed mb-4">
          Linear Regression helps us understand relationships between variables and predict continuous numerical values such as prices, sales, temperatures, scores, and demand forecasts.</p>

        <h2 className="text-3xl font-bold text-indigo-800 mb-6">What is Linear Regression?</h2>
        <p className="text-lg leading-relaxed mb-4">
          Linear Regression is a supervised machine learning algorithm used to predict continuous values by modeling a linear relationship between variables.
        </p>

        <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
          "Imagine observing a pattern: As study hours increase, exam scores increase approximately in a straight-line manner. Linear regression learns this relationship and predicts future values."
        </p>
        
        <div className="mb-6 pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-2 pr-4 rounded-r-md">
          <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Example: Study Hours vs Score</p>
          <ul className="list-disc list-inside text-slate-900 mb-2">
            <li>1 Hour ➔ 40 Score</li>
            <li>2 Hours ➔ 50 Score</li>
            <li>3 Hours ➔ 60 Score</li>
            <li>4 Hours ➔ 70 Score</li>
          </ul>
        </div>
      </div>
      
      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 2. Visual Understanding */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Visual Understanding of Linear Regression</h2>
        <p className="text-lg leading-relaxed mb-4">
          The main objective is to find the best-fit line, minimize prediction errors, and predict future continuous values. Below is a visual representation of the best-fit Regression line based on study hours versus exam score.
        </p>

        <div className="h-[400px] w-full max-w-3xl mb-8 bg-slate-50 border border-slate-200 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={noisyData} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="hours" type="number" name="Study Hours" domain={[0, 7]} stroke="#64748b" label={{ value: 'Study Hours', position: 'bottom', fill: '#64748b' }} />
              <YAxis dataKey="score" type="number" name="Exam Score" domain={[0, 100]} stroke="#64748b" label={{ value: 'Exam Score', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Scatter name="Actual Data Point" dataKey="score" fill="#3b82f6" />
              <Line type="linear" dataKey="trend" name="Best Fit Regression Line" stroke="#ef4444" strokeWidth={3} dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Machine Learning Workflow</h3>
        <p className="text-lg leading-relaxed mb-4">
          The standard machine learning workflow for Linear Regression involves:
        </p>
        
        <div className="mb-6 pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md">
          <ol className="list-decimal list-inside text-lg text-slate-800 space-y-2 font-medium">
            <li>Collect Dataset</li>
            <li>Clean the Dataset</li>
            <li>Feature Engineering</li>
            <li>Train Linear Model</li>
            <li>Evaluate Performance</li>
            <li>Predict Future Values</li>
          </ol>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 3. Terminologies */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Important Terminologies</h2>
        
        <div className="overflow-x-auto rounded-lg border border-slate-200 mb-6">
          <table className="min-w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900">Term</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-lg">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Independent Variable (X)</td>
                <td className="px-6 py-4">Input feature used to make predictions.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Dependent Variable (Y)</td>
                <td className="px-6 py-4">Output prediction / value.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Slope</td>
                <td className="px-6 py-4">Change in Y with respects to X. Controls line steepness.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Intercept</td>
                <td className="px-6 py-4">Value of Y when X is 0. Controls the starting point.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Residual/Error</td>
                <td className="px-6 py-4">Difference between actual actual data point and predicted value.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 3.5 Best-Fit Line */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Best-Fit Line in Linear Regression</h2>
        <p className="text-lg leading-relaxed mb-4">
          In linear regression, the best-fit line is a straight line that describes the relationship between an input variable and an output variable in the most accurate way possible. This line is used to estimate or predict values based on existing data.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          The purpose of the best-fit line is to create a mathematical relationship between variables so that future outcomes can be predicted more easily.
        </p>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Understanding the Variables</h3>
        <p className="text-lg leading-relaxed mb-4">In linear regression:</p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-slate-800 mb-6">
          <li><strong>X</strong> represents the independent variable (input or predictor).</li>
          <li><strong>Y</strong> represents the dependent variable (output or target).</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">The regression model studies how changes in X influence the value of Y.</p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-slate-800 mb-6">
          <li><strong>θ₁ (Intercept):</strong> Represents the value of Y when X is equal to 0.</li>
          <li><strong>θ₂ (Slope):</strong> Indicates how much Y changes when X increases by one unit.</li>
        </ul>
        
        <p className="text-lg leading-relaxed mb-4">Linear regression can work with:</p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-slate-800 mb-6">
          <li>A single input feature (simple linear regression)</li>
          <li>Multiple input features (multiple linear regression)</li>
        </ul>
        <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
          "Among different regression techniques, linear regression is one of the simplest and most commonly used methods."
        </p>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Equation of the Best-Fit Line</h3>
        <p className="text-lg leading-relaxed mb-4">For simple linear regression, the equation of the line is:</p>
        
        <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
          <code className="text-slate-900 font-mono text-xl block mb-4">y = mx + b</code>
          <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Where:</p>
          <ul className="list-disc list-inside text-slate-800">
            <li><strong>y</strong> = predicted output value</li>
            <li><strong>x</strong> = input value</li>
            <li><strong>m</strong> = slope of the line</li>
            <li><strong>b</strong> = intercept of the line</li>
          </ul>
        </div>
        <p className="text-lg leading-relaxed mb-6">
          The main objective of linear regression is to determine the best values for the slope and intercept so that the line stays as close as possible to the actual data points.
        </p>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">How the Best-Fit Line is Calculated</h3>
        <p className="text-lg leading-relaxed mb-4">
          Linear regression uses a technique called the <strong>Least Squares Method</strong> to identify the most suitable line. The model calculates the difference between the actual observed values, and the predicted values generated by the line. These differences are known as <em>residuals</em> or <em>errors</em>.
        </p>
        
        <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md">
          <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Residual Calculation</p>
          <code className="text-slate-900 font-mono text-xl block mb-2">Residual = yᵢ - ŷᵢ</code>
          <p className="text-slate-800 mt-2">Where:</p>
          <ul className="list-disc list-inside text-slate-800">
            <li><strong>yᵢ</strong> = actual observed value</li>
            <li><strong>ŷᵢ</strong> = predicted value from the regression line</li>
          </ul>
        </div>

        <p className="text-lg leading-relaxed mb-4">
          To find the best-fit line, the algorithm minimizes the total squared error:
        </p>
        <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md">
          <code className="text-slate-900 font-mono text-xl block">Σ(yᵢ - ŷᵢ)²</code>
        </div>
        <p className="text-lg leading-relaxed mb-4">Squaring the errors ensures that:</p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-slate-800 mb-6">
          <li>Negative and positive errors do not cancel each other out</li>
          <li>Larger errors receive greater penalty</li>
        </ul>
        <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
          "The line with the smallest total squared error is considered the optimal regression line."
        </p>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Meaning of Slope and Intercept</h3>
        <p className="text-xl font-bold text-slate-800 mb-2">Slope (m)</p>
        <p className="text-lg leading-relaxed mb-4">The slope explains the rate of change between the variables. For example, if the slope is 5, it means that whenever X increases by 1 unit, Y increases by 5 units.</p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-slate-800 mb-6">
          <li>A <strong>positive slope</strong> indicates an increasing relationship</li>
          <li>A <strong>negative slope</strong> indicates a decreasing relationship</li>
        </ul>

        <p className="text-xl font-bold text-slate-800 mb-2">Intercept (b)</p>
        <p className="text-lg leading-relaxed mb-6">
          The intercept represents the predicted value of Y when X equals zero. Graphically, it is the exact point where the regression line crosses the Y-axis.
        </p>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Why the Best-Fit Line is Important</h3>
        <p className="text-lg leading-relaxed mb-4">The best-fit line helps in:</p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-slate-800 mb-6">
          <li>Predicting future values</li>
          <li>Understanding relationships between variables</li>
          <li>Identifying trends in data</li>
          <li>Supporting business and scientific decision-making</li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">Linear regression is widely used in:</p>
        <ul className="list-disc pl-5 space-y-2 text-lg text-slate-800 mb-6">
          <li>Sales forecasting</li>
          <li>Stock market analysis</li>
          <li>Weather prediction</li>
          <li>Healthcare analytics</li>
          <li>Machine learning applications</li>
        </ul>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Limitations of the Best-Fit Line</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-bold text-slate-800">1. Assumes a Linear Relationship</h4>
            <p className="text-lg leading-relaxed mt-2 text-slate-700">Linear regression performs well only when the relationship between variables follows a straight-line pattern. Complex non-linear relationships may require advanced models.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800">2. Sensitive to Outliers</h4>
            <p className="text-lg leading-relaxed mt-2 text-slate-700">Extreme values or outliers can heavily influence the regression line, causing inaccurate predictions.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800">3. Limited for Complex Problems</h4>
            <p className="text-lg leading-relaxed mt-2 text-slate-700">Real-world datasets often contain multiple hidden patterns that simple linear regression may not capture effectively.</p>
          </div>
        </div>
      </div>


      {/* Real-world worked example for Best-Fit Line */}
      <div className="mb-10 not-prose">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Real-World Worked Example: House Size vs Price</h3>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Let us work through a concrete example to see exactly how the best-fit line is calculated and used for prediction.
        </p>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-200 text-sm font-mono">Sample Dataset — 5 Houses</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">House</th>
                  <th className="p-3 text-left">Size X (sq ft)</th>
                  <th className="p-3 text-left">Price Y (₹ Lakhs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[["A","800","32"],["B","1000","40"],["C","1200","46"],["D","1500","60"],["E","1800","72"]].map(([h,s,p]) => (
                  <tr key={h} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-700">House {h}</td>
                    <td className="p-3 font-mono text-indigo-700">{s}</td>
                    <td className="p-3 font-mono text-emerald-700">₹{p}L</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SVG Scatter Plot */}
        <figure className="my-6">
          <svg viewBox="0 0 560 320" className="w-full max-w-xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm" aria-label="Scatter plot of house size vs price with best-fit regression line">
            {/* Axes */}
            <line x1="60" y1="270" x2="520" y2="270" stroke="#94a3b8" strokeWidth="2"/>
            <line x1="60" y1="270" x2="60" y2="20" stroke="#94a3b8" strokeWidth="2"/>
            {/* Axis labels */}
            <text x="290" y="310" textAnchor="middle" fill="#64748b" fontSize="13">House Size (sq ft)</text>
            <text x="15" y="150" fill="#64748b" fontSize="13" transform="rotate(-90,15,150)">Price (₹ Lakhs)</text>
            {/* Grid lines */}
            {[0,1,2,3,4].map(i => (
              <line key={i} x1="60" y1={270-i*60} x2="520" y2={270-i*60} stroke="#f1f5f9" strokeWidth="1"/>
            ))}
            {/* X axis ticks */}
            {[800,1000,1200,1500,1800].map((v,i) => {
              const x = 60 + (v-700)*0.23;
              return <g key={v}><line x1={x} y1="270" x2={x} y2="276" stroke="#94a3b8" strokeWidth="1.5"/><text x={x} y="288" textAnchor="middle" fill="#64748b" fontSize="10">{v}</text></g>
            })}
            {/* Y axis ticks */}
            {[0,20,40,60,80].map((v,i) => {
              const y = 270 - v*3;
              return <g key={v}><line x1="54" y1={y} x2="60" y2={y} stroke="#94a3b8" strokeWidth="1.5"/><text x="50" y={y+4} textAnchor="end" fill="#64748b" fontSize="10">{v}</text></g>
            })}
            {/* Best-fit line: y = 0.038x + 1.6 (approximate) */}
            <line x1="64" y1={270-((800*0.038)+2)*3} x2="515" y2={270-((1800*0.038)+2)*3} stroke="#4f46e5" strokeWidth="2.5"/>
            <text x="480" y="78" fill="#4f46e5" fontSize="11" fontWeight="bold">Best-fit</text>
            <text x="480" y="91" fill="#4f46e5" fontSize="11" fontWeight="bold">line</text>
            {/* Data points */}
            {[[800,32],[1000,40],[1200,46],[1500,60],[1800,72]].map(([x,y],i) => {
              const px = 60 + (x-700)*0.23;
              const py = 270 - y*3;
              return <g key={i}><circle cx={px} cy={py} r="7" fill="#ef4444" opacity="0.85"/><text x={px+10} y={py+4} fill="#64748b" fontSize="9">({x},{y}L)</text></g>
            })}
          </svg>
          <figcaption className="text-center text-sm text-slate-500 mt-2">Figure — Scatter plot with best-fit regression line through 5 house data points</figcaption>
        </figure>

        {/* Step-by-step calculation */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-indigo-900 text-lg mb-4">Step-by-Step: Finding the Best-Fit Line</h4>
          <div className="space-y-3">
            {[
              ["Step 1 — Calculate means", "Mean of X (sizes): (800+1000+1200+1500+1800)/5 = 1260 sq ft", "Mean of Y (prices): (32+40+46+60+72)/5 = 50 lakhs"],
              ["Step 2 — Calculate slope (m)", "m = Σ(xᵢ - x̄)(yᵢ - ȳ) / Σ(xᵢ - x̄)²", "m ≈ 0.038  (for every 1 sq ft increase, price rises by ₹0.038L)"],
              ["Step 3 — Calculate intercept (b)", "b = ȳ - m × x̄", "b = 50 - 0.038 × 1260 ≈ 2.12"],
              ["Step 4 — Final equation", "y = 0.038x + 2.12", "This is your trained linear regression model!"],
            ].map(([title, line1, line2], i) => (
              <div key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1">{i+1}</span>
                <div>
                  <p className="font-bold text-indigo-800 text-sm">{title}</p>
                  <p className="font-mono text-sm text-slate-700">{line1}</p>
                  <p className="font-mono text-sm text-indigo-700 font-bold">{line2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction example */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h4 className="font-bold text-emerald-900 text-lg mb-3">Making a Prediction</h4>
          <p className="text-emerald-800 mb-3">A new house has <strong>1400 sq ft</strong>. What is the predicted price?</p>
          <div className="font-mono bg-white border border-emerald-200 rounded-lg p-4 space-y-1 text-sm">
            <p>y = 0.038 × 1400 + 2.12</p>
            <p>y = 53.2 + 2.12</p>
            <p className="font-bold text-emerald-700 text-base">y = ₹55.32 Lakhs ← Predicted Price</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 4. Types of Linear Regression */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Types of Linear Regression</h2>
        
        <div className="mb-6 pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md">
          <p className="font-bold text-slate-800 mb-2">Linear Regression</p>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Simple Linear Regression:</strong> Uses exactly ONE independent variable to predict the outcome.
            </li>
            <li>
              <strong>Multiple Linear Regression:</strong> Uses MULTIPLE independent variables working together to predict the outcome.
            </li>
          </ul>
        </div>
        
        <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-8">1. Simple Linear Regression</h3>
        <p className="text-lg leading-relaxed mb-4">
          Simple Linear Regression uses <strong>one independent variable</strong> to predict one dependent variable. Think of it as drawing the best possible straight line through a cloud of data points on a 2D chart.
        </p>

        <div className="mb-4 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
          <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Mathematical Formula</p>
          <code className="text-slate-900 font-mono text-xl block mb-4">y = mx + b</code>
          <ul className="list-disc list-inside text-slate-800 space-y-1">
            <li><strong>y</strong> = predicted output (what we want to find)</li>
            <li><strong>x</strong> = input feature (what we know)</li>
            <li><strong>m</strong> = slope — how steeply Y changes as X increases</li>
            <li><strong>b</strong> = intercept — the value of Y when X = 0</li>
          </ul>
        </div>

        {/* Real-world example - Study hours vs exam score */}
        <div className="not-prose mb-8">
          <h4 className="font-bold text-slate-800 mb-3 text-base">Real-World Example: Study Hours vs Exam Score</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-700 px-3 py-2 text-slate-200 text-xs font-mono">Dataset</div>
              <table className="w-full text-sm">
                <thead className="bg-slate-50"><tr><th className="p-2 text-left text-slate-600">Hours (X)</th><th className="p-2 text-left text-slate-600">Score (Y)</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {[[1,20],[2,35],[3,45],[4,55],[5,65],[6,75],[7,85]].map(([h,s]) => (
                    <tr key={h}><td className="p-2 font-mono text-indigo-700">{h} hrs</td><td className="p-2 font-mono text-emerald-700">{s}%</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figure>
              <svg viewBox="0 0 280 220" className="w-full bg-white border border-slate-200 rounded-xl shadow-sm" aria-label="Study hours vs exam score scatter with regression line">
                <line x1="40" y1="190" x2="260" y2="190" stroke="#94a3b8" strokeWidth="1.5"/>
                <line x1="40" y1="190" x2="40" y2="15" stroke="#94a3b8" strokeWidth="1.5"/>
                <text x="150" y="210" textAnchor="middle" fill="#64748b" fontSize="10">Study Hours</text>
                <text x="12" y="105" fill="#64748b" fontSize="9" transform="rotate(-90,12,105)">Score %</text>
                {[[1,20],[2,35],[3,45],[4,55],[5,65],[6,75],[7,85]].map(([h,s]) => {
                  const px = 40 + h*28; const py = 190 - s*1.8;
                  return <circle key={h} cx={px} cy={py} r="5" fill="#3b82f6" opacity="0.8"/>
                })}
                <line x1="68" y1={190-20*1.8} x2="236" y2={190-85*1.8} stroke="#ef4444" strokeWidth="2"/>
                <text x="210" y="38" fill="#ef4444" fontSize="9" fontWeight="bold">y=10x+10</text>
              </svg>
              <figcaption className="text-center text-xs text-slate-400 mt-1">Figure — y = 10x + 10</figcaption>
            </figure>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <p className="font-bold text-indigo-800 mb-2 text-sm">Prediction: How many marks will a student score studying 8 hours?</p>
            <div className="font-mono text-sm space-y-1 bg-white rounded-lg p-3 border border-indigo-100">
              <p>y = 10x + 10</p>
              <p>y = 10(8) + 10</p>
              <p>y = 80 + 10</p>
              <p className="font-bold text-indigo-700">y = 90% ← Predicted Score</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-8">2. Multiple Linear Regression</h3>
        <p className="text-lg leading-relaxed mb-4">
          Multiple Linear Regression uses <strong>two or more independent variables</strong> simultaneously to predict the output. Instead of a 2D line, it fits a hyperplane through multi-dimensional data.
        </p>

        <div className="mb-4 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
          <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Mathematical Formula</p>
          <code className="text-slate-900 font-mono text-xl block mb-2">y = b₀ + b₁X₁ + b₂X₂ + ... + bₙXₙ</code>
          <p className="text-slate-600 text-sm mt-2">Where each b is a coefficient learned from data and each X is a feature.</p>
        </div>

        {/* Multiple LR real-world example */}
        <div className="not-prose mb-6">
          <h4 className="font-bold text-slate-800 mb-3 text-base">Real-World Example: Predicting House Price (₹ Lakhs)</h4>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-4">
            <div className="bg-slate-700 px-3 py-2 text-slate-200 text-xs font-mono">Learned Model Equation</div>
            <div className="p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4]">
              Price = 2.5 + (0.04 × Area) + (8 × Bedrooms) + (5 × Bathrooms) − (0.5 × Age)
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-4">
            <div className="bg-slate-700 px-3 py-2 text-slate-200 text-xs font-mono">Training Data (sample)</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50"><tr>
                  {["Area (sq ft)","Bedrooms","Bathrooms","Age (yrs)","Price (₹L)"].map(h=><th key={h} className="p-2 text-left text-slate-600 text-xs">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {[["1000","2","1","5","52.5"],["1500","3","2","3","82.5"],["2000","4","3","1","114.5"],["800","2","1","10","40.5"]].map((row,i)=>(
                    <tr key={i} className="hover:bg-slate-50">{row.map((v,j)=><td key={j} className={`p-2 font-mono text-xs ${j===4?"text-emerald-700 font-bold":"text-slate-700"}`}>{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-emerald-800 mb-3">Prediction: Area=1200, Bedrooms=3, Bathrooms=2, Age=4 years</p>
            <div className="font-mono text-sm space-y-1 bg-white rounded-lg p-4 border border-emerald-100">
              <p>Price = 2.5 + (0.04 × 1200) + (8 × 3) + (5 × 2) − (0.5 × 4)</p>
              <p>Price = 2.5 + 48 + 24 + 10 − 2</p>
              <p className="font-bold text-emerald-700 text-base">Price = ₹82.5 Lakhs ← Predicted Price</p>
            </div>
            <p className="text-emerald-700 text-xs mt-2">Each feature contributes independently — area adds ₹0.04L per sq ft, each bedroom adds ₹8L, etc.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 5. Hypothesis Function & Assumptions */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Assumptions of Linear Regression</h2>
        <p className="text-lg leading-relaxed mb-4">
          Linear Regression works properly only when certain statistical assumptions are satisfied:
        </p>

        <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md text-lg text-slate-800">
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>Linearity:</strong> The relationship between X and Y should genuinely be linear. (Not a U-shape).</li>
            <li><strong>Independence of Errors:</strong> Prediction errors should not form a predictable pattern over time.</li>
            <li><strong>Homoscedasticity:</strong> The spread of errors should remain roughly constant across all predictions, rather than fanning out.</li>
            <li><strong>Normal Distribution of Errors:</strong> The residuals should follow a bell curve distribution.</li>
            <li><strong>No Multicollinearity:</strong> Independent variables should not be highly correlated with each other (e.g., area in sq ft and area in sq meters).</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 6. Cost Function and Gradient Descent */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Cost Function &amp; Gradient Descent</h2>
        
        <p>Here we explore the key concepts and techniques involved in this topic.</p>
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Cost Function (MSE)</h3>
        <p className="text-lg leading-relaxed mb-4">
          The cost function measures how well or poorly our model is performing. Mean Squared Error (MSE) measures prediction error by averaging the squared differences.
        </p>

        <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
          <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Mathematical Formula (MSE)</p>
          <code className="text-slate-900 font-mono text-xl block mb-4">MSE = (1/n) * Σ (Actual - Predicted)²</code>
          
          <div className="mt-4 border-t border-blue-200 pt-4">
            <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Worked-Out Example</p>
            <ul className="list-disc list-inside text-slate-800 mb-2 font-mono">
              <li>Actual: 10, Predicted: 12 ➔ (10 - 12)² = 4</li>
              <li>Actual: 20, Predicted: 18 ➔ (20 - 18)² = 4</li>
              <li>Actual: 30, Predicted: 33 ➔ (30 - 33)² = 9</li>
            </ul>
            <code className="text-slate-900 font-mono block font-bold">MSE = (4 + 4 + 9) / 3 = 17 / 3 = 5.67</code>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-8">Gradient Descent Optimization</h3>
        <p className="text-lg leading-relaxed mb-4">
          Gradient Descent minimizes the cost function by iteratively adjusting the intercept and slope parameters. It calculates the error, computes the gradient (steepness), and updates parameters downwards until reaching the minimum error.
        </p>

        <div className="h-[300px] w-full max-w-2xl mb-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-center font-bold text-slate-700 mb-2 uppercase text-xs tracking-widest">Error Minimization Curve</p>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={gdData}>
              <XAxis dataKey="param" hide />
              <YAxis hide domain={[0, 110]} />
              <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
              <Area type="monotone" dataKey="cost" stroke="#f59e0b" fill="#fef3c7" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-6 pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md">
          <p className="font-bold text-slate-800 mb-2">Learning Rate (α) Implications:</p>
          <ul className="list-disc list-inside text-slate-800 space-y-1">
            <li><strong>Small Learning Rate:</strong> Slow learning, takes a long time to reach minimum.</li>
            <li><strong>Large Learning Rate:</strong> Might overshoot the minimum completely and fail to converge.</li>
            <li><strong>Optimal Learning Rate:</strong> Fast, steady convergence to the mathematical minimum.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 7. Evaluation Metrics */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Evaluation Metrics for Linear Regression</h2>
        
        <p className="text-lg leading-relaxed mb-4">Beyond MSE, we use these real-world metrics to evaluate the performance.</p>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-6">1. Mean Absolute Error (MAE)</h3>
        <div className="mb-6 pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md">
          <code className="text-slate-900 font-mono text-xl block mb-2">MAE = (1/n) * Σ |y - y_pred|</code>
          <p className="text-slate-800 mb-2">Example: Actual=[10, 20], Pred=[12, 18].</p>
          <p className="text-slate-800 font-bold font-mono">|10 - 12| = 2, |20 - 18| = 2. MAE = (2 + 2) / 2 = 2</p>
        </div>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-6">2. Root Mean Squared Error (RMSE)</h3>
        <div className="mb-6 pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md">
          <code className="text-slate-900 font-mono text-xl block mb-2">RMSE = √MSE</code>
          <p className="text-slate-800 mb-2">If MSE = 9, RMSE = √9 = 3.</p>
        </div>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-6">3. R-Squared Score (R²)</h3>
        <div className="mb-6 pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md">
          <code className="text-slate-900 font-mono text-xl block mb-2">R² = 1 - (SS_res / SS_tot)</code>
          <p className="text-slate-800">Measures how well the model explains variance. 1 is perfectly accurate, 0 is terribly poor.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 8. Python Implementation */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Python Implementation of Linear Regression</h2>
        <p className="text-lg leading-relaxed mb-4">Below is the complete implementation pipeline using Numpy, Matplotlib, and Scikit-Learn, along with an explanation for each step.</p>
        
        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 rounded-t-lg text-sm font-mono overflow-x-auto shadow-md border border-slate-800">
          <pre className="!m-0 leading-relaxed"><code>{`# Step 1 — Import Libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Step 2 — Generate Dataset
np.random.seed(42)
X = np.random.rand(50, 1) * 100
Y = 3.5 * X + np.random.randn(50, 1) * 20

# Step 3 — Train Model
model = LinearRegression()
model.fit(X, Y)

# Step 4 — Prediction
Y_pred = model.predict(X)

# Step 5 — Visualization
plt.scatter(X, Y)
plt.plot(X, Y_pred)
plt.show()`}</code></pre>
        </div>
        
        <div className="bg-slate-50 border-x border-slate-200 p-6">
          <p className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-wider">Line-by-Line Explanation:</p>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><code className="text-sm bg-slate-200 px-1 rounded">import ...</code>: We import <code className="text-sm bg-slate-200 px-1 rounded">numpy</code> for mathematical arrays, <code className="text-sm bg-slate-200 px-1 rounded">matplotlib.pyplot</code> for plotting charts, and <code className="text-sm bg-slate-200 px-1 rounded">LinearRegression</code> from Scikit-Learn to build the model.</li>
            <li><code className="text-sm bg-slate-200 px-1 rounded">np.random.seed(42)</code>: Ensures our random dataset is exactly the same every time we run the code.</li>
            <li><code className="text-sm bg-slate-200 px-1 rounded">X = ...</code> and <code className="text-sm bg-slate-200 px-1 rounded">Y = ...</code>: We generate 50 random samples. X is between 0 and 100. Y is created using a linear relationship (3.5 * X) with some added random noise.</li>
            <li><code className="text-sm bg-slate-200 px-1 rounded">model.fit(X, Y)</code>: This is the actual <strong>training</strong> step. The algorithm calculates the best slope and intercept using Gradient Descent (or ordinary least squares).</li>
            <li><code className="text-sm bg-slate-200 px-1 rounded">Y_pred = ...</code>: Once trained, we feed X back into the model to predict what it thinks Y should be, creating our best-fit line.</li>
            <li><code className="text-sm bg-slate-200 px-1 rounded">plt.scatter... plt.plot...</code>: Projects the original noisy data points (scatter) and overlays the predicted line (plot) visually.</li>
          </ul>
        </div>

        <div className="bg-[#0cf277]/10 border border-[#0cf277]/30 p-5 rounded-b-lg mb-8">
          <p className="font-bold text-[#09994c] mb-4 uppercase text-xs tracking-wider">Visual Output (Matplotlib Simulation):</p>
          <div className="h-[350px] w-full max-w-2xl bg-white border border-slate-200 rounded p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={pythonVizData} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="x" type="number" stroke="#64748b" domain={[0, 100]} />
                <YAxis dataKey="y" type="number" stroke="#64748b" domain={[0, 400]} />
                <Scatter dataKey="y" fill="#3b82f6" />
                <Line type="linear" dataKey="yPred" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 9. Real-World Applications */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Real-World Applications</h2>
        
        <div className="mb-6 pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md">
          <ul className="list-disc pl-5 space-y-4 text-slate-800 text-lg">
            <li><strong>Finance:</strong> Stock Prediction, Risk Analysis, Revenue Forecasting.</li>
            <li><strong>Healthcare:</strong> Disease indicator estimation, Medical Cost Prediction, Patient duration monitoring.</li>
            <li><strong>Retail:</strong> Product Sales Forecasting, Demand Prediction, Customer Analytics tracking.</li>
            <li><strong>Real Estate:</strong> House Price Prediction, Rental Valuation Estimation.</li>
            <li><strong>Manufacturing:</strong> Quality tracking, Failure rate estimation, Production demand.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />
      
      {/* 10. Pros, Cons, and Overfitting */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Advantages & Limitations</h2>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
             <h3 className="text-xl font-bold text-green-700 mb-4">Advantages</h3>
             <ul className="list-disc list-inside text-slate-700 space-y-2">
               <li><strong>Simple:</strong> Very easy to understand mathematically.</li>
               <li><strong>Fast:</strong> Computationally lightweight and extremely efficient to train.</li>
               <li><strong>Interpretable:</strong> Coefficients directly explain relationships.</li>
               <li><strong>Scalable:</strong> Can handle exceptionally large datasets effortlessly.</li>
             </ul>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
             <h3 className="text-xl font-bold text-rose-700 mb-4">Limitations</h3>
             <ul className="list-disc list-inside text-slate-700 space-y-2">
               <li><strong>Assumes Linearity:</strong> Very poor for complex curved nonlinear data.</li>
               <li><strong>Sensitive:</strong> Outliers heavily distort and warp the regression line.</li>
               <li><strong>Multicollinearity:</strong> Correlated input features trigger massive instability.</li>
               <li><strong>Underfitting:</strong> Can be too naive for highly complex phenomena.</li>
             </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Understanding Overfitting vs Underfitting</h3>
        <p className="text-lg leading-relaxed mb-4">
          Linear Regression is mostly prone to Underfitting if the true data has complex curvature. 
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <ul className="space-y-4 text-slate-800">
            <li><span className="font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded text-sm mr-2">UNDERFIT</span> Model is too simple. The line ignores distinct complex patterns.</li>
            <li><span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded text-sm mr-2">GOOD FIT</span> Model balances the trend and noise perfectly.</li>
            <li><span className="font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-1 rounded text-sm mr-2">OVERFIT</span> Model is too complex, attempting to hit every single point (jagged line).</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 11. Comparison with other algo */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Comparison with Other Algorithms</h2>
        
        <div className="overflow-x-auto rounded-lg border border-slate-200 mb-6 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900">Algorithm</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900">Complexity</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900">Interpretability</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900">Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-lg">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-indigo-700">Linear Regression</td>
                <td className="px-6 py-4">Low</td>
                <td className="px-6 py-4 text-green-700 font-bold">High</td>
                <td className="px-6 py-4 text-green-700 font-bold">Fast</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-indigo-700">Decision Tree</td>
                <td className="px-6 py-4">Medium</td>
                <td className="px-6 py-4">Medium</td>
                <td className="px-6 py-4">Medium</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-indigo-700">Random Forest</td>
                <td className="px-6 py-4 text-amber-700 font-bold">High</td>
                <td className="px-6 py-4">Low</td>
                <td className="px-6 py-4">Medium</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-indigo-700">Neural Networks</td>
                <td className="px-6 py-4 text-rose-700 font-bold">Very High</td>
                <td className="px-6 py-4 text-rose-700 font-bold">Very Low</td>
                <td className="px-6 py-4 text-rose-700 font-bold">Slow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      {/* 12. Final Summary Pipeline & Conclusion */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Linear Regression is an important algorithm in Machine Learning because it introduces the core concepts of predictive modeling, optimization, and statistical learning. It is simple, fast, interpretable, and widely used in real-world applications.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        You should use Linear Regression when the relationship is approximately linear, interpretability matters heavily for stakeholders, the dataset is not extremely complex, and fast training is required for rapid iterations.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Although modern AI systems use advanced techniques like neural networks and ensemble models, Linear Regression remains the most essential mathematical foundation for understanding how machines actually learn from data."
         </p>
      </div>

    </div>
  );
}
