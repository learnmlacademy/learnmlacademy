import React from 'react';
import { Target, Layers, PlayCircle, Eye, AlertTriangle, Code, Columns, LineChart, BarChart } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Scatter, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';

const dataPoints = [
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 16 },
  { x: 5, y: 25 },
  { x: 6, y: 36 },
];

const curveData = [];
for (let i = 0.5; i <= 6.5; i += 0.1) {
  const x = Number(i.toFixed(1));
  curveData.push({
    x,
    Underfit: 7.2 * x - 9.3, // Approximate best fit line for these points
    ProperFit: x * x,
    Overfit: (x >= 1 && x <= 6) ? x * x - 10 * Math.sin(Math.PI * x) : null // Fluctuates but touches the integers
  });
}

export function OverfittingUnderfittingContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Underfitting and Overfitting</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Machine Learning models are built to learn patterns from data and make predictions on unseen examples. The ultimate goal of any Machine Learning model is not simply to memorize the training dataset, but to learn meaningful relationships that generalize well to real-world data.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">A good model should:</p>
          <ul className="list-disc pl-5 text-indigo-900 text-lg space-y-1">
            <li>Learn useful patterns from training data</li>
            <li>Ignore unnecessary noise</li>
            <li>Perform well on unseen data</li>
            <li>Maintain a balance between simplicity and complexity</li>
          </ul>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          However, in practice, Machine Learning models often face two major problems: <strong>Underfitting</strong> and <strong>Overfitting</strong>. These are among the most important concepts in Machine Learning because almost every algorithm can suffer from them. Understanding these concepts deeply is essential for building accurate and reliable ML systems.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Why Underfitting and Overfitting Matter</h3>
        
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-8 w-full max-w-2xl">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Student Behavior</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">ML Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-mono text-sm">
              <tr><td className="px-6 py-4 text-slate-800">Did not study enough</td><td className="px-6 py-4 text-rose-600 font-bold">Underfitting</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 text-slate-800">Memorized answers only</td><td className="px-6 py-4 text-rose-600 font-bold">Overfitting</td></tr>
              <tr><td className="px-6 py-4 text-slate-800">Understood concepts properly</td><td className="px-6 py-4 text-emerald-600 font-bold">Good Fit</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Real-Life Analogy</h3>
        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          Imagine predicting house prices. The actual relationship between House Size and House Price may be slightly curved and complex. Now consider three different models:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-50 border rounded-xl p-5 shadow-sm">
            <p className="font-bold text-slate-900 border-b pb-2 mb-3">Case 1 — Underfitting</p>
            <p className="text-slate-800 mb-2">The model uses a straight line for highly complex data.</p>
            <p className="text-rose-600 font-bold italic mb-2">The model is too simple.</p>
            <p className="text-sm text-slate-600">It misses important relationships.</p>
          </div>
          <div className="bg-slate-50 border rounded-xl p-5 shadow-sm border-t-4 border-t-emerald-500">
            <p className="font-bold text-slate-900 border-b pb-2 mb-3">Case 3 — Proper Fitting</p>
            <p className="text-slate-800 mb-2">The model captures the actual trend.</p>
            <p className="text-emerald-600 font-bold italic mb-2">This is the ideal scenario.</p>
            <p className="text-sm text-slate-600">Generalizes well without memorizing noise.</p>
          </div>
          <div className="bg-slate-50 border rounded-xl p-5 shadow-sm">
            <p className="font-bold text-slate-900 border-b pb-2 mb-3">Case 2 — Overfitting</p>
            <p className="text-slate-800 mb-2">The model creates an extremely complex curve touching every point.</p>
            <p className="text-rose-600 font-bold italic mb-2">The model memorizes the data.</p>
            <p className="text-sm text-slate-600">Including random noise and fluctuations.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="underfitting">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <LineChart className="mr-3 text-indigo-600" /> What Is Underfitting?
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Underfitting occurs when a Machine Learning model is too simple to capture the underlying patterns in the dataset. The model fails to learn meaningful relationships and therefore performs poorly on both training data and testing data. Underfitting means the model has not learned enough from the dataset.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Detailed Understanding of Underfitting</p>
          <p className="text-slate-800 leading-relaxed">
            Suppose we want to model this quadratic relationship: <code>y = x²</code>. But instead of using a curve, we force the model to use a straight line (<code>y = mx + b</code>).
          </p>
          <p className="text-slate-800 leading-relaxed mt-2">
            The model is fundamentally incapable of capturing the actual trend. This creates a large training error and a large testing error because the model is too simple for the problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
            <h4 className="text-xl font-bold text-rose-900 mb-3">Causes of Underfitting</h4>
            <ul className="list-decimal pl-5 text-rose-800 text-lg space-y-2">
              <li><strong>Model Too Simple:</strong> Using Linear Regression for highly nonlinear data.</li>
              <li><strong>Insufficient Features:</strong> Predicting salary using only age.</li>
              <li><strong>Excessive Regularization:</strong> Very strong regularization oversimplifies the model.</li>
              <li><strong>Insufficient Training:</strong> Neural networks trained for too few epochs over-generalize.</li>
              <li><strong>Poor Feature Engineering:</strong> Incorrect or weak features reduce learning capability.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h4 className="text-xl font-bold text-emerald-900 mb-3">How to Reduce Underfitting</h4>
            <ul className="list-disc pl-5 text-emerald-800 text-lg space-y-2">
              <li>Use more complex models (e.g. Polynomial Regression)</li>
              <li>Add more or better features</li>
              <li>Reduce regularization constraints</li>
              <li>Increase training time / epochs</li>
              <li>Improve feature engineering</li>
              <li>Use nonlinear models</li>
            </ul>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          <strong>Bias in Underfitting:</strong> Underfitting is heavily associated with <strong>High Bias</strong>. Bias refers to strong, rigid assumptions made by the model (like assuming all relationships are linear even if they are not).
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="overfitting">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <LineChart className="mr-3 text-indigo-600" /> What Is Overfitting?
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Overfitting occurs when a Machine Learning model learns not only the actual patterns but also noise, random fluctuations, outliers, and irrelevant details from the training dataset.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          An overfitted model essentially <strong>memorizes the training data</strong>. Instead of learning general patterns, it learns the exact training examples, harming its ability to generalize. It performs extremely well on training data but poorly on unseen data.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Mathematical Example</p>
          <p className="text-slate-800 leading-relaxed mb-2">
            Suppose the actual relationship is simple: <code>y = x²</code>.
          </p>
          <p className="text-slate-800 leading-relaxed">
            But the model, trying to hit every single point perfectly, learns an equation like: <code>y = ax¹⁰ + bx⁹ + cx⁸ + ... + k</code>. The model becomes unnecessarily complex and erratic between the data points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
            <h4 className="text-xl font-bold text-rose-900 mb-3">Causes of Overfitting</h4>
            <ul className="list-decimal pl-5 text-rose-800 text-lg space-y-2">
              <li><strong>Model Too Complex:</strong> Deep decision trees, large neural networks.</li>
              <li><strong>Small Dataset:</strong> Insufficient data vastly increases memorization risk.</li>
              <li><strong>Too Many Features:</strong> Irrelevant features introduce misleading noise.</li>
              <li><strong>No Regularization:</strong> Without penalties, models become overly flexible.</li>
              <li><strong>Excessive Training:</strong> Training too long (too many epochs) without early stopping.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h4 className="text-xl font-bold text-emerald-900 mb-3">How to Reduce Overfitting</h4>
            <ul className="list-disc pl-5 text-emerald-800 text-lg space-y-2">
              <li>Gather More Training Data</li>
              <li>Use <strong>Cross Validation</strong> for reliable evaluation</li>
              <li>Apply <strong>Regularization</strong> (L1 Lasso, L2 Ridge)</li>
              <li>Pruning (for Decision Trees)</li>
              <li>Use <strong>Early Stopping</strong> & Dropout (for Neural Nets)</li>
              <li>Perform Feature Selection to remove irrelevant features</li>
            </ul>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          <strong>Variance in Overfitting:</strong> Overfitting is heavily associated with <strong>High Variance</strong>. Variance measures how sensitive a model is to small changes in training data. High variance models react excessively to training data noise.
        </p>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Columns className="mr-3 text-indigo-600" /> Bias-Variance Tradeoff
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The ultimate pursuit in building a model is finding the sweet spot in the <strong>Bias-Variance Tradeoff</strong>.
        </p>

        <div className="overflow-x-auto mb-10 w-full">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm text-lg text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 font-bold text-indigo-700">Underfitting (Too Simple)</th>
                <th className="px-6 py-3 font-bold text-emerald-700">Good Fit (Balanced)</th>
                <th className="px-6 py-3 font-bold text-rose-700">Overfitting (Too Complex)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Training Error</td>
                <td className="px-6 py-4 text-indigo-700">High</td>
                <td className="px-6 py-4 text-emerald-700">Low</td>
                <td className="px-6 py-4 text-rose-700 font-bold">Very Low / Zero</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-medium">Testing Error</td>
                <td className="px-6 py-4 text-indigo-700">High</td>
                <td className="px-6 py-4 text-emerald-700 font-bold">Low</td>
                <td className="px-6 py-4 text-rose-700 text-lg">High</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Bias</td>
                <td className="px-6 py-4 text-indigo-700 font-bold">High Bias</td>
                <td className="px-6 py-4 text-emerald-700">Balanced</td>
                <td className="px-6 py-4 text-rose-700">Low Bias</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-medium">Variance</td>
                <td className="px-6 py-4 text-indigo-700">Low Variance</td>
                <td className="px-6 py-4 text-emerald-700">Balanced</td>
                <td className="px-6 py-4 text-rose-700 font-bold">High Variance</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Python Example — Detecting Under/Overfitting with Polynomial Regression</h3>

        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl text-sm font-mono my-6 overflow-x-auto shadow-lg border border-slate-800">
          <pre className="!m-0">
<code className="language-python">{`import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

# 1. Create Dataset (y = x^2 relationship)
X = np.array([1,2,3,4,5,6]).reshape(-1,1)
y = np.array([1,4,9,16,25,36])

# 2. Underfitting Model (Degree 1 -> Line)
linear_model = LinearRegression()
linear_model.fit(X, y)
# Output predictions will form a straight line, completely missing the curve.

# 3. Proper Fit (Degree 2 -> Quadratic Curve)
poly2 = PolynomialFeatures(degree=2)
X_poly2 = poly2.fit_transform(X)
model2 = LinearRegression()
model2.fit(X_poly2, y)
# Output perfectly captures the x^2 relationship.

# 4. Overfitting Model (Degree 10 -> Massive Polynomial)
poly10 = PolynomialFeatures(degree=10)
X_poly10 = poly10.fit_transform(X)
model10 = LinearRegression()
model10.fit(X_poly10, y)
# Output touches every point perfectly but fluctuates wildly between them.`}</code>
          </pre>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-6 mt-10">Visualizing the Outcome</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-rose-800 mb-2">Underfitting (Line)</h4>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="x" type="number" domain={[0, 7]} tickCount={8} data={curveData} />
                  <YAxis domain={[-10, 50]} />
                  <Tooltip />
                  <Legend />
                  <Line data={curveData} type="monotone" dataKey="Underfit" stroke="#e11d48" strokeWidth={3} dot={false} activeDot={false} />
                  <Scatter data={dataPoints} dataKey="y" name="Training Data" fill="#0f172a" shape="circle" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border-t-4 border-t-emerald-500 border-b border-l border-r border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-emerald-800 mb-2">Good Fit (Curve)</h4>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="x" type="number" domain={[0, 7]} tickCount={8} data={curveData} />
                  <YAxis domain={[-10, 50]} />
                  <Tooltip />
                  <Legend />
                  <Line data={curveData} type="monotone" dataKey="ProperFit" stroke="#10b981" strokeWidth={3} dot={false} activeDot={false} />
                  <Scatter data={dataPoints} dataKey="y" name="Training Data" fill="#0f172a" shape="circle" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-rose-800 mb-2">Overfitting (Fluctuating)</h4>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="x" type="number" domain={[0, 7]} tickCount={8} data={curveData} />
                  <YAxis domain={[-10, 50]} />
                  <Tooltip />
                  <Legend />
                  <Line data={curveData} type="monotone" dataKey="Overfit" stroke="#e11d48" strokeWidth={3} dot={false} activeDot={false} />
                  <Scatter data={dataPoints} dataKey="y" name="Training Data" fill="#0f172a" shape="circle" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Underfitting and Overfitting are the two central challenges in building machine learning models that can successfully generalize to unseen data. The ideal machine learning model balances complexity to learn actual meaningful patterns while ignoring statistical noise.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Overfitting happens when your model is too complex and memorizes noise (High Variance, Low Training Error, High Testing Error). Underfitting happens when your model is too simple and misses important patterns entirely (High Bias, High Training Error, High Testing Error). The goal is to find the perfect middle ground where Bias and Variance are balanced, creating a robust, generalized model.
        </p>
      </div>

    </>
  );
}

