import React from 'react';
import { Target, Layers, PlayCircle, Eye, AlertTriangle, Code, Columns, LineChart, TrendingDown, GitMerge, CheckCircle, Table2 } from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';

const mseCurveData = [];
for (let i = -5; i <= 5; i += 0.5) {
  mseCurveData.push({ error: i, Cost: i * i });
}

const logLossCurveData = [];
for (let i = 0.01; i <= 0.99; i += 0.02) {
  logLossCurveData.push({ prediction: Number(i.toFixed(2)), Cost: -Math.log(i) });
}

const hingeLossCurveData = [];
for (let i = -2; i <= 3; i += 0.2) {
  hingeLossCurveData.push({ rawOutput: Number(i.toFixed(1)), Cost: Math.max(0, 1 - i) });
}

export function CostFunctionsContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Cost Function</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A Machine Learning model learns by making predictions and then measuring how wrong those predictions are. The mathematical mechanism used to measure this error is called the <strong>Cost Function</strong>.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The cost function acts as the learning signal, performance evaluator, optimization target, and error measurement system for Machine Learning algorithms. Without a cost function, a Machine Learning model would never know whether it is improving or becoming worse. The model continuously tries to minimize the Cost Function because minimizing cost means reducing prediction error and improving accuracy.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Why Cost Function Is Extremely Important</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The cost function is not just a small mathematical formula. It is the central driving force behind Machine Learning training. Every ML algorithm depends on it. 
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Real-Life Analogy (Archery)</p>
          <p className="text-slate-800 italic leading-relaxed">
            Imagine learning archery. You shoot arrows toward a target. An arrow close to the center indicates good performance, while an arrow far from the center indicates poor performance. The cost function measures exactly how far your predictions are from the correct answers (the bullseye). The optimization algorithm then adjusts the model's aim so future predictions become more accurate.
          </p>
        </div>

        <p className="text-lg font-bold text-slate-800 mb-3 mt-8">Core Learning Cycle of Machine Learning:</p>
        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto w-fit text-sm">
{`INITIAL MODEL
      │
      ▼
MAKE PREDICTIONS
      │
      ▼
CALCULATE COST
      │
      ▼
MEASURE ERROR
      │
      ▼
UPDATE PARAMETERS
      │
      ▼
REDUCE COST
      │
      ▼
BETTER MODEL`}
        </div>
        <p className="text-slate-600 text-sm mt-3 italic">This cycle repeats thousands or even millions of times during training.</p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="error-measurement">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <TrendingDown className="mr-3 text-indigo-600" /> What Exactly Does a Cost Function Measure?
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A cost function measures the difference between actual and predicted values. The basic prediction error is computed as:
        </p>

        <div className="pl-4 border-l-4 border-slate-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200 w-fit">
          <p className="font-mono text-lg font-bold text-slate-900 mb-2">Error = y - ŷ</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-slate-700">
            <li><strong>y</strong> : Actual target value</li>
            <li><strong>ŷ (y-hat)</strong> : Predicted output value</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Why Raw Error Cannot Be Used Directly</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          If we simply sum up the raw errors, positive and negative errors can cancel each other out.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-6 w-full max-w-2xl">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Actual</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Predicted</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Error (Actual - Predicted)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-mono text-sm">
              <tr><td className="px-6 py-4">50</td><td className="px-6 py-4">55</td><td className="px-6 py-4 text-rose-600 font-bold">-5</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4">60</td><td className="px-6 py-4">55</td><td className="px-6 py-4 text-emerald-600 font-bold">+5</td></tr>
              <tr className="border-t-2 border-slate-400"><td colSpan={2} className="px-6 py-4 font-bold text-right">Total Error:</td><td className="px-6 py-4 font-bold">-5 + 5 = 0</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          This total error of <strong>0</strong> incorrectly suggests perfect prediction, even though both individual predictions were wrong. Therefore, cost functions use squaring (e.g., MSE), absolute values (e.g., MAE), or logarithmic penalties (e.g., Cross-Entropy) to strictly prevent error cancellation.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="regression">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <LineChart className="mr-3 text-indigo-600" /> Regression Cost Functions
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Regression algorithms predict continuous numerical values like house prices, temperatures, salaries, or stock prices. The most common baseline equation is Linear Regression: <code>ŷ = mx + b</code>.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Mean Squared Error (MSE)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The most commonly used regression cost function. It squares the errors before averaging them to heavily penalize large discrepancies.
        </p>

        <div className="pl-4 border-l-4 border-emerald-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200">
          <p className="font-bold text-emerald-900 mb-2">MSE Full Worked Example</p>
          <p className="text-slate-800 mb-2">Suppose a house price prediction model produces the following predictions (in thousands):</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-slate-700 mb-4">
            <li>Actual: 100 → Predicted: 90</li>
            <li>Actual: 150 → Predicted: 140</li>
            <li>Actual: 200 → Predicted: 220</li>
            <li>Actual: 250 → Predicted: 230</li>
          </ul>
          
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-slate-700">
            <li><strong>Step 1 (Find Error):</strong> <code>10, 10, -20, 20</code> (Actual - Predicted)</li>
            <li><strong>Step 2 (Square Errors):</strong> <code>10²=100, 10²=100, -20²=400, 20²=400</code></li>
            <li><strong>Step 3 (Sum Squared Errors):</strong> <code>100 + 100 + 400 + 400 = 1000</code></li>
            <li><strong>Step 4 (Take Average):</strong> <code>1000 / 4 = 250</code></li>
          </ol>
          <p className="text-slate-900 font-bold mt-4">Final Cost (MSE): 250</p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Problem with MSE:</strong> It is highly sensitive to outliers. If just one prediction error is 100, the squared error becomes 10,000, dominating the entire cost calculation and heavily pulling the model towards the outlier.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Mean Absolute Error (MAE)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          MAE solves the outlier sensitivity problem partially by taking the absolute value of the errors instead of squaring them.
        </p>
        
        <div className="pl-4 border-l-4 border-sky-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200">
          <p className="font-bold text-sky-900 mb-2">MAE Full Worked Example (Using the same house prices)</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-slate-700">
            <li><strong>Errors:</strong> <code>10, 10, -20, 20</code></li>
            <li><strong>Absolute Errors:</strong> <code>10, 10, 20, 20</code></li>
            <li><strong>Sum Absolute Errors:</strong> <code>10 + 10 + 20 + 20 = 60</code></li>
            <li><strong>Take Average:</strong> <code>60 / 4 = 15</code></li>
          </ol>
          <p className="text-slate-900 font-bold mt-4">Final Cost (MAE): 15</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">RMSE and Huber Loss</h3>
        <ul className="list-disc pl-5 text-lg space-y-4 text-slate-800">
          <li><strong>Root Mean Squared Error (RMSE):</strong> The square root of MSE. E.g., if MSE = 250, RMSE ≈ 15.81. This is highly useful because it converts the squared error back into the original units (e.g., Dollars, Kilograms), drastically improving interpretability.</li>
          <li><strong>Huber Loss:</strong> Combines the best of MSE and MAE. It acts like MSE when the error is small (providing smooth gradient optimization) but acts like MAE when the error is large (preventing outliers from destroying the model). It is widely used in Deep Learning and robust regression.</li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="classification">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Classification Cost Functions
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Classification predicts distinct categories (e.g., Spam or Not Spam, Fraud or Normal). Using MSE for classification is fundamentally bad because it creates poor gradients, slow learning, and non-convex optimization spaces structure. Instead, classification primarily uses <strong>Cross Entropy Loss</strong>.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Binary Cross Entropy (Log Loss)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Logistic Regression transforms outputs into a probability slice between 0 and 1 using a Sigmoid curve. Log Loss heavily penalizes confident, incorrect predictions.
        </p>

        <div className="pl-4 border-l-4 border-rose-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200 w-fit">
          <p className="font-mono text-lg font-bold text-slate-900 mb-2">Loss = - ( y * log(ŷ) + (1 - y) * log(1 - ŷ) )</p>
        </div>

        <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-rose-200">
          <p className="font-bold text-rose-900 text-lg mb-2">Real-Life Example — Email Spam Detection</p>
          <p className="text-rose-800 leading-relaxed mb-4">
            Suppose an email spam classifier outputs probabilities of an email being spam (Target = 1):
          </p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-rose-900 mb-4">
            <li>Email 1 (Spam) → Actual: 1 | Predicted: 0.95 (Good prediction, low penalty)</li>
            <li>Email 2 (Normal) → Actual: 0 | Predicted: 0.10 (Good prediction, low penalty)</li>
            <li>Email 3 (Spam) → Actual: 1 | Predicted: 0.02 (<strong>Disaster prediction</strong>)</li>
          </ul>
          
          <p className="text-rose-900 font-bold mb-2">Calculating Log Loss for Email 3:</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-rose-900 mb-4">
            <li>y = 1, ŷ = 0.02</li>
            <li>Formula becomes: <code>- ( 1 * log(0.02) + 0 * log(0.98) )</code></li>
            <li><code>-log(0.02) ≈ 3.91</code> (A very high penalty compared to a correct prediction's near-zero penalty)</li>
          </ol>
          <p className="text-rose-800 leading-relaxed">
            In Email 3, the model is highly confident (2%) that a real spam message is <em>normal</em>. Cross entropy assigns a massive logarithmic penalty. This forces the model weights to course-correct rapidly.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="other-models">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <GitMerge className="mr-3 text-indigo-600" /> Hinge, Gini, and Reward Functions
        </h2>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Hinge Loss (Support Vector Machines)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Support Vector Machines (SVMs) aim to find the best margin between classes. Hinge loss is designed exactly for this: it penalizes predictions not just when they are wrong, but also when they are correct but not confident enough (i.e., too close to the margin).
        </p>

        <div className="pl-4 border-l-4 border-violet-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200 w-fit">
          <p className="font-mono text-lg font-bold text-slate-900 mb-2">Loss = max(0, 1 - y * f(x))</p>
          <p className="text-sm text-slate-700">Where <strong>y</strong> is either +1 or -1, and <strong>f(x)</strong> is the raw model score.</p>
        </div>

        <div className="pl-4 border-l-4 border-violet-400 bg-violet-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-violet-900 mb-2">Worked Example: SVM Margin</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-violet-900">
            <li><strong>Actual class (y)</strong> = 1. Model score <strong>f(x)</strong> = 1.5 (Correct and confident)</li>
            <li>Loss = <code>max(0, 1 - 1 * 1.5) = max(0, -0.5) = 0</code></li>
            <li><strong>Actual class (y)</strong> = 1. Model score <strong>f(x)</strong> = 0.2 (Correct but weak)</li>
            <li>Loss = <code>max(0, 1 - 1 * 0.2) = max(0, 0.8) = 0.8</code> (Penalized for being too close to the boundary)</li>
          </ol>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Gini Impurity and Entropy (Decision Trees)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Decision Trees split data into branches to maximize purity. Instead of an exact error value, they use impurity metrics as their cost function to decide where to split.
        </p>
        
        <div className="pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-teal-900 mb-2">Worked Example: Gini Impurity</p>
          <p className="font-mono text-sm mb-3">Formula: <code>Gini = 1 - Σ (p_i)²</code></p>
          <p className="text-teal-800 mb-2">Suppose a node has 4 Apples and 6 Oranges (Total 10 items).</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-teal-900">
            <li>Probability of Apple (p1) = 4/10 = 0.4</li>
            <li>Probability of Orange (p2) = 6/10 = 0.6</li>
            <li>Gini = <code>1 - (0.4² + 0.6²)</code></li>
            <li>Gini = <code>1 - (0.16 + 0.36) = 1 - 0.52 = 0.48</code></li>
          </ol>
          <p className="text-teal-800 mt-3 text-sm italic">The algorithm tests multiple splits and picks the one that minimizes this Gini impurity score.</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Reward Function (Reinforcement Learning)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In Reinforcement Learning (e.g., self-driving cars, game AI), there is no fixed dataset of right/wrong answers. Instead, an agent receives a numerical reward signal. The "cost function" here is effectively minimizing negative reward (or maximizing cumulative positive reward).
        </p>

        <div className="pl-4 border-l-4 border-orange-400 bg-orange-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-orange-900 mb-2">Worked Example: Pac-Man AI</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-orange-900">
            <li><strong>Action:</strong> Eat a dot. <strong>Reward:</strong> +10</li>
            <li><strong>Action:</strong> Hit a wall. <strong>Reward:</strong> -5 (Negative penalty acting directly as cost)</li>
            <li><strong>Action:</strong> Get caught by ghost. <strong>Reward:</strong> -100</li>
          </ul>
          <p className="text-orange-900 mt-3 text-sm">The agent’s goal is to learn a policy that maximizes the total expected reward over time, naturally avoiding the high-cost (negative reward) actions.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="optimizing">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Deep Learning & Optimization
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          For Deep Learning Neural Networks, the cost function drives the vital process known as Backpropagation. The network calculates 'How wrong am I?' through the Cost Function, then propagates that error backward through the layers via gradients (derivatives) to update individual weights.
        </p>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">Gradient Descent Analogy</p>
          <p className="text-amber-900 leading-relaxed">
            Imagine standing on a mountain blindfolded. Your goal is to reach the lowest valley (the Global Minimum, representing the lowest possible Cost). You check the slope beneath your feet with a stick, and take a step downward. You keep doing this until the ground is flat. This mathematical downward stepping is precisely how Gradient Descent interacts with the Cost Function to train the model.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Who Uses Which Cost Function?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">1. Linear Regression</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">Cost: Mean Squared Error (MSE)</p>
            <p className="text-sm text-slate-800">Purpose: House prices, temperatures, stock forecasting.</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">2. Logistic Regression / NNs</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">Cost: Binary Cross Entropy / Log Loss</p>
            <p className="text-sm text-slate-800">Purpose: Spam detection, face unlock, fraud analytics.</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">3. Support Vector Machines (SVM)</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">Cost: Hinge Loss</p>
            <p className="text-sm text-slate-800">Purpose: Face recognition, text classification.</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">4. Decision Trees / Random Forest</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">Cost: Gini Impurity / Entropy</p>
            <p className="text-sm text-slate-800">Purpose: Explainable predictions, tabular data metrics.</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">5. LLMs (e.g., ChatGPT)</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">Cost: Cross Entropy Loss</p>
            <p className="text-sm text-slate-800">Purpose: Next-word prediction over billions of text samples.</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-indigo-800 border-b pb-2 mb-3">6. Reinforcement Learning</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">Cost: Reward Function (Minimize Negative Reward)</p>
            <p className="text-sm text-slate-800">Purpose: Self-driving cars, Robotics AI, game bots.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Python Implementation Example</h3>
        <p className="text-lg leading-relaxed text-slate-800 mb-4">
          Below is a Python demonstration of deriving costs using the standard Scikit-Learn evaluation functions.
        </p>

        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl text-sm font-mono my-6 overflow-x-auto shadow-lg border border-slate-800">
          <pre className="!m-0">
<code className="language-python">{`from sklearn.metrics import mean_squared_error, mean_absolute_error, log_loss

actual_reg = [100, 150, 200, 250]
predicted_reg = [90, 140, 220, 230]

# 1. Mean Squared Error (MSE)
mse = mean_squared_error(actual_reg, predicted_reg)
print(f"MSE: {mse}") # Output: 250.0

# 2. Mean Absolute Error (MAE)
mae = mean_absolute_error(actual_reg, predicted_reg)
print(f"MAE: {mae}") # Output: 15.0

# 3. Binary Cross Entropy (Classification)
actual_clf = [1, 0, 1]
predicted_clf = [0.95, 0.10, 0.02]

loss = log_loss(actual_clf, predicted_clf)
print(f"Log Loss: {loss:.4f}") 
# Outputs a highly inflated score because of the confident incorrect prediction (0.02)
`}</code>
          </pre>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-and-visuals">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Table2 className="mr-3 text-indigo-600" /> Comparison and Visual Curves
        </h2>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-10 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Cost Function</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Primary AI Domain</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Core Behavior</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Penalty Shape</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-800">
              <tr>
                <td className="px-6 py-4 font-bold text-emerald-700">MSE</td>
                <td className="px-6 py-4">Regression</td>
                <td className="px-6 py-4">Squares the difference between predicted/actual.</td>
                <td className="px-6 py-4">Symmetric Parabola (U-Shape). Extremely harsh on outliers.</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 font-bold text-rose-700">Binary Cross Entropy</td>
                <td className="px-6 py-4">Classification</td>
                <td className="px-6 py-4">Logarithmic penalty for predicting wrong probability.</td>
                <td className="px-6 py-4">Asymptotic (J-Shape). Nears infinity for wrong confident bets.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold text-violet-700">Hinge Loss</td>
                <td className="px-6 py-4">Support Vector Machines</td>
                <td className="px-6 py-4">Forces correct predictions to surpass a safety margin.</td>
                <td className="px-6 py-4">V-Shape (half). Zero penalty if beyond margin, linear penalty otherwise.</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 font-bold text-teal-700">Gini Impurity</td>
                <td className="px-6 py-4">Decision Trees</td>
                <td className="px-6 py-4">Measures statistical mixture of classes in a node split.</td>
                <td className="px-6 py-4">Inverted Parabola (Arch). Max penalty at 50/50 mixture.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold text-orange-700">Reward Function</td>
                <td className="px-6 py-4">Reinforcement Learning</td>
                <td className="px-6 py-4">Provides numerical feedback for discrete environmental actions.</td>
                <td className="px-6 py-4">Arbitrary (Environment-dependent). Maximizes positive score.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-6">Visualizing Mathematical Cost Shapes</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-emerald-800 mb-2">MSE (Regression)</h4>
            <p className="text-center text-xs text-slate-500 mb-4">Parabolic penalty for errors</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={mseCurveData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="error" type="number" label={{ value: "Error (y - ŷ)", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Cost", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Cost" stroke="#10b981" strokeWidth={3} dot={false} activeDot={false} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-rose-800 mb-2">Log Loss (Classification)</h4>
            <p className="text-center text-xs text-slate-500 mb-4">Cost when True Target = 1</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={logLossCurveData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="prediction" type="number" domain={[0, 1]} label={{ value: "Predicted Probability", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={[0, 5]} label={{ value: "Cost", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Cost" stroke="#e11d48" strokeWidth={3} dot={false} activeDot={false} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-violet-800 mb-2">Hinge Loss (SVM)</h4>
            <p className="text-center text-xs text-slate-500 mb-4">Margin = 1</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={hingeLossCurveData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="rawOutput" type="number" domain={[-2, 3]} label={{ value: "Raw Output f(x)", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={[0, 3]} label={{ value: "Cost", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Cost" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={false} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        A Cost Function is the mathematical formula that measures how wrong a Machine Learning model’s predictions are. It serves as the absolute core learning mechanism behind every optimization and algorithm, dictating how model weights are updated dynamically.
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Regression tasks typically rely on Mean Squared Error (MSE) to penalize vast variances or Mean Absolute Error (MAE) to ignore large outliers. Classification tasks rely firmly on the logistical probability penalties defined by Binary or Categorical Cross-Entropy. The process of learning entails continuously stepping down the theoretical gradient of this cost function until it reaches a structural minimum.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Machine Learning is fundamentally the science of minimizing prediction error. The Cost Function is simply the scoreboard that tells the model exactly what "error" means in its current context, and guides it towards making increasingly accurate adjustments. A poorly chosen cost function leads a model into confidently predicting useless noise, rendering the architecture meaningless regardless of how powerful the underlying algorithm mathematically might be.
        </p>
      </div>
    </>
  );
}

