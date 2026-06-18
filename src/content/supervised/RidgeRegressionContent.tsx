import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Scatter,
  ComposedChart,
  Line,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Code,
  Layers,
  ArrowRight,
  ArrowDown,
  Check,
  X as CloseIcon,
  UserCheck,
  Activity,
  Hash,
  CheckCircle,
  Scale,
} from "lucide-react";

const coefData = [
  { feature: "Rooms", Linear: 85.3, Ridge: 15.2 },
  { feature: "Age", Linear: -62.1, Ridge: -12.4 },
  { feature: "Location", Linear: 129.5, Ridge: 22.1 },
  { feature: "Income", Linear: 95.2, Ridge: 18.5 },
];

const tradeoffData = [
  { lambda: "0 (Linear)", trainError: 10, testError: 45 },
  { lambda: "0.1", trainError: 12, testError: 35 },
  { lambda: "1", trainError: 15, testError: 28 },
  { lambda: "10 (Optimal)", trainError: 22, testError: 25 },
  { lambda: "100", trainError: 45, testError: 40 },
  { lambda: "1000", trainError: 70, testError: 65 },
];

export function RidgeRegressionContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Ridge Regression</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 rounded-r-lg shadow-sm">
        Ridge Regression is a regularization technique and an extension of Linear Regression designed to solve the problem of multicollinearity.</p>

      {/* What is Ridge Regression? */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-2 text-indigo-600" /> What is Ridge Regression?
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Ridge Regression is a modified version of Linear Regression that adds a
        penalty term to the cost function to reduce model complexity. The goal
        is to prevent overfitting, reduce excessively large coefficients,
        improve generalization, and handle multicollinearity.
      </p>

      {/* Beginner Explanation */}
      <h3 className="text-xl font-bold text-indigo-800 mb-3">
        Simple Beginner Explanation
      </h3>
      <div className="bg-white border border-slate-200 p-6 rounded-lg mb-8 shadow-sm">
        <p className="text-slate-700 font-medium mb-3">
          Imagine a student memorizing answers instead of understanding
          concepts.
        </p>
        <ul className="list-disc pl-5 mb-4 text-slate-700 space-y-2">
          <li>
            <strong>Memorization = Overfitting:</strong> The student scores
            exactly 100% on the practice test (training data) because they
            memorized the exact questions. But when given a real exam with
            slightly different questions (unseen data), they fail completely.
          </li>
          <li>
            <strong>Understanding = Ridge Regression:</strong> A teacher adds a
            rule: "You lose points if you just memorize word-for-word." Now the
            student is forced to understand the general concepts. They might
            score 90% on the practice test, but they will also score 90% on the
            real exam.
          </li>
        </ul>
        <p className="text-slate-700 italic">
          Ridge Regression stops the machine learning model from "memorizing"
          the training data by penalizing complex rules.
        </p>
      </div>

      {/* Why do we need it? */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <AlertTriangle className="mr-2 text-red-500" /> Why Do We Need Ridge
        Regression?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 p-5 rounded-lg border border-red-100">
          <h4 className="font-bold text-red-800 mb-2">
            1. To Prevent Overfitting
          </h4>
          <p className="text-red-900 text-sm">
            Standard Linear Regression tries to perfectly connect every data
            point. This makes the model too sensitive to noise (outliers).
          </p>
        </div>
        <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <h4 className="font-bold text-amber-800 mb-2">
            2. To Handle Multicollinearity
          </h4>
          <p className="text-amber-900 text-sm">
            When features are highly correlated (e.g., predicting house price
            using both "Square Footage" and "Number of Rooms"), Linear
            Regression panics and assigns huge, unstable weights. Ridge
            suppresses these weights.
          </p>
        </div>
      </div>

      {/* Core Idea */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Core Idea of Ridge
        Regression
      </h2>
      <p className="text-lg text-slate-700 mb-4">
        In standard Linear Regression, the cost function is just the Mean
        Squared Error (MSE). Ridge Regression introduces an{" "}
        <strong>L2 Penalty</strong>.
      </p>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-8 shadow-sm flex flex-col items-center">
        <p className="mb-4 font-medium text-indigo-900">
          Linear Regression Cost Function:
        </p>
        <code className="text-lg font-mono text-slate-900 bg-white px-4 py-2 rounded shadow-sm border border-slate-200 mb-6 w-full max-w-2xl text-center">
          Cost = MSE
        </code>

        <p className="mb-4 font-medium text-indigo-900">
          Ridge Regression Cost Function:
        </p>
        <code className="text-lg md:text-xl font-mono text-indigo-900 font-bold bg-white px-4 py-2 rounded shadow-sm border border-indigo-200 text-center w-full max-w-2xl">
          Cost = MSE + λ * (Sum of squared weights)
        </code>
      </div>

      {/* The Role of Lambda */}
      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        The Role of Lambda (λ or Alpha)
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-5">
          <div className="bg-slate-100 text-slate-800 font-bold text-center py-2 rounded mb-3 font-mono">
            λ = 0
          </div>
          <p className="text-sm text-slate-700 text-center">
            The penalty disappears completely. The model turns into standard
            Linear Regression.
          </p>
        </div>
        <div className="bg-white border-2 border-emerald-400 shadow-md rounded-lg p-5">
          <div className="bg-emerald-100 text-emerald-800 font-bold text-center py-2 rounded mb-3 font-mono">
            λ = Optimal
          </div>
          <p className="text-sm text-slate-700 text-center">
            The model penalizes large weights just enough to prevent overfitting
            but still fits the data well.
          </p>
        </div>
        <div className="bg-white border border-red-200 shadow-sm rounded-lg p-5">
          <div className="bg-red-50 text-red-800 font-bold text-center py-2 rounded mb-3 font-mono">
            λ = Very High
          </div>
          <p className="text-sm text-slate-700 text-center">
            The penalty is too aggressive. The model forces all weights near
            zero, resulting in a flat line (Underfitting).
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col mb-10">
        <p className="font-bold text-slate-800 mb-4 text-center">
          Bias-Variance Tradeoff based on Lambda (λ)
        </p>
        <div className="w-full bg-slate-50 border border-slate-100 rounded p-4">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={tradeoffData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis
                dataKey="lambda"
                label={{
                  value: "Lambda Value ->",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "Error",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                }}
              />
              <RechartsTooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="trainError"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Training Error (Bias)"
              />
              <Line
                type="monotone"
                dataKey="testError"
                stroke="#ef4444"
                strokeWidth={3}
                name="Test Error (Variance)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-slate-500 mt-2">
          Notice how test error drops initially but rises again if lambda gets
          too high.
        </p>
      </div>

      {/* Visual Weight Shrinkage */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Scale className="mr-2 text-emerald-600" /> Visualizing Coefficient
        Shrinkage
      </h2>
      <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col mb-10">
        <p className="font-bold text-slate-800 mb-4 text-center">
          Comparing Learned Weights (Linear vs. Ridge)
        </p>
        <div className="w-full bg-slate-50 border border-slate-100 rounded p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={coefData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="feature" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar
                dataKey="Linear"
                fill="#94a3b8"
                name="Standard Linear Weights"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Ridge"
                fill="#10b981"
                name="Ridge Penalized Weights"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-slate-600 italic text-center text-sm mt-3">
          Ridge smoothly shrinks all weights toward zero, bringing chaotic high
          values down to stable proportions.
        </p>
      </div>

      {/* Step-by-Step Calculation */}
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl my-10 shadow-sm">
        <div className="flex items-center mb-4 text-amber-900 border-b border-amber-200 pb-3">
          <Calculator className="w-6 h-6 mr-3" />
          <h3 className="font-bold text-xl m-0">
            Mathematical Example (Calculated)
          </h3>
        </div>
        <p className="text-amber-900 mb-4">
          <strong>Scenario:</strong> The Linear Regression cost (MSE) is
          currently <strong>100</strong>. The model has two weights:{" "}
          <code>w1 = 3</code> and <code>w2 = 4</code>. Let us compute the final
          Ridge Regression cost if Lambda (λ) is <strong>2</strong>.
        </p>

        <div className="bg-white p-4 rounded-lg border border-amber-200 font-mono text-sm text-slate-800 space-y-3 shadow-inner">
          <p>
            <span className="text-slate-500">// 1. Identify Base Cost</span>
            <br />
            MSE = 100
          </p>
          <p>
            <span className="text-slate-500">
              // 2. Calculate L2 Penalty (Square the weights & Sum)
            </span>
            <br />
            Squared Sum = (3 * 3) + (4 * 4)
            <br />
            Squared Sum = 9 + 16 = 25
          </p>
          <p>
            <span className="text-slate-500">// 3. Multiply by Lambda</span>
            <br />
            Penalty = λ * Squared Sum
            <br />
            Penalty = 2 * 25 = 50
          </p>
          <p className="font-bold text-lg text-amber-900 pt-3 border-t border-amber-100">
            Final Ridge Cost = 100 + 50 = 150
          </p>
        </div>
      </div>

      {/* Gradient Descent Optimization */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <TrendingUp className="mr-3 text-indigo-600" /> Ridge Regression
        Optimization
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Ridge Regression usually uses <strong>Gradient Descent</strong> or{" "}
        <strong>Normal Equation</strong> optimization. When using Gradient
        Descent, the L2 penalty fundamentally changes how weights are updated
        during training.
      </p>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl mb-10 shadow-sm">
        <h3 className="font-bold text-xl text-indigo-900 mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" /> Gradient Descent Update
          Formula (with Ridge)
        </h3>

        <div className="flex justify-center my-6">
          <div className="bg-white border-2 border-indigo-200 p-4 rounded-lg shadow-sm font-mono text-lg md:text-xl text-center text-slate-800 overflow-x-auto w-full max-w-2xl">
            θ = θ - α(∂J/∂θ + 2λθ)
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-indigo-50 shadow-sm mb-6">
          <h4 className="font-bold text-indigo-800 mb-2">
            Formula Explanation
          </h4>
          <p className="text-slate-700 mb-3">
            The update contains two parts inside the parenthesis:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>∂J/∂θ</strong>: The normal gradient (direction of steepest
              error descent).
            </li>
            <li>
              <strong>2λθ</strong>: The Ridge penalty adjustment (shrinks the
              weight proportionally to its current size).
            </li>
          </ul>
          <p className="mt-4 text-indigo-900 italic font-medium bg-indigo-100/50 p-3 rounded border-l-4 border-indigo-400">
            Thus, coefficients shrink continuously during training, but they
            shrink faster when they are larger.
          </p>
        </div>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md my-8">
          <h4 className="font-bold text-xl mb-3 flex items-center text-slate-800">
            <CheckCircle className="w-6 h-6 mr-2 text-blue-600" /> Worked Example
          </h4>
          <p className="mb-4 text-slate-700 text-lg">
            Suppose we have the following values at the current step:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-700 text-lg mb-6">
            <li><strong>Current Weight (θ)</strong>: 8</li>
            <li><strong>Learning Rate (α)</strong>: 0.1</li>
            <li><strong>Gradient (∂J/∂θ)</strong>: 5</li>
            <li><strong>Lambda (λ)</strong>: 0.2</li>
          </ul>

          <div className="font-mono text-slate-800 text-lg space-y-2 mb-6">
            <p className="text-slate-500">// Update Step</p>
            <p>θ_new = 8 - 0.1 * (5 + 2 * 0.2 * 8)</p>
            <p>θ_new = 8 - 0.1 * (5 + 3.2)</p>
            <p>θ_new = 8 - 0.1 * (8.2)</p>
            <p>θ_new = 8 - 0.82</p>
            <p className="font-bold mt-2">θ_new = 7.18</p>
          </div>

          <p className="text-slate-700 text-lg">
            Without the Ridge penalty, the new weight would have been{" "}
            <code>θ_new = 8 - 0.1 * 5 = 7.5</code>. The Ridge update reduces the
            weight more aggressively (to <code>7.18</code>) because it heavily
            penalizes the large initial weight of 8.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Ridge vs. Lasso vs. Linear
      </h2>
      <div className="overflow-x-auto shadow-sm rounded-lg mb-10 border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                Linear
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">
                Ridge (L2)
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">
                Lasso (L1)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {[
              {
                f: "Penalty Term",
                l: "None",
                r: "Sum of squared weights",
                la: "Sum of absolute weights",
              },
              {
                f: "Coefficient Shrinkage",
                l: "No shrinkage",
                r: "Shrinks near zero (never exactly 0)",
                la: "Shrinks exactly to zero",
              },
              {
                f: "Feature Selection",
                l: "No",
                r: "No (Keeps all features)",
                la: "Yes (Drops useless features)",
              },
              {
                f: "Best Used For",
                l: "Basic simple relationships",
                r: "Dealing with multicollinearity",
                la: "Models with too many features",
              },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {row.f}
                </td>
                <td className="px-6 py-4 text-slate-600">{row.l}</td>
                <td className="px-6 py-4 text-blue-800 font-medium">{row.r}</td>
                <td className="px-6 py-4 text-purple-800 font-medium">
                  {row.la}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assumptions */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <CheckCircle className="mr-3 text-indigo-600" /> Assumptions of Ridge
        Regression
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-indigo-100 p-3 rounded-full mb-3">
            <Activity className="w-6 h-6 text-indigo-600" />
          </div>
          <h4 className="font-bold text-indigo-900 mb-2">
            Linear Relationship
          </h4>
          <p className="text-sm text-indigo-700">
            There must be a linear relationship between features and the target
            variable.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 p-3 rounded-full mb-3">
            <Hash className="w-6 h-6 text-emerald-600" />
          </div>
          <h4 className="font-bold text-emerald-900 mb-2">Feature Scaling</h4>
          <p className="text-sm text-emerald-700">
            MUST normalize data. Ridge penalizes weight size, so features must
            be on the same scale.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <UserCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-bold text-blue-900 mb-2">Handles Collinearity</h4>
          <p className="text-sm text-blue-700">
            Unlike standard Linear Regression, it handles highly correlated
            features flawlessly.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-5 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-amber-100 p-3 rounded-full mb-3">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <h4 className="font-bold text-amber-900 mb-2">Constant Variance</h4>
          <p className="text-sm text-amber-700">
            Residuals should have constant variance (Homoscedasticity) to
            perform well.
          </p>
        </div>
      </div>

      {/* Applications Hierarchy */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Industry Applications Tree
      </h2>
      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-lg mb-10 shadow-sm flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-md z-10 text-lg">
              Ridge Regression Domains
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <div className="bg-white border text-left border-blue-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-blue-100 text-blue-900 font-bold px-4 py-3 border-b border-blue-200">
                Finance
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  <span className="font-medium">Credit Risk Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  <span className="font-medium">Stock Price Forecasting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  <span className="font-medium">Algorithmic Trading</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-emerald-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-emerald-100 text-emerald-900 font-bold px-4 py-3 border-b border-emerald-200">
                Healthcare
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>{" "}
                  <span className="font-medium">Genomic Data Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>{" "}
                  <span className="font-medium">
                    Patient Recovery Prediction
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>{" "}
                  <span className="font-medium">Epidemic Forecasting</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-amber-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-amber-100 text-amber-900 font-bold px-4 py-3 border-b border-amber-200">
                Real Estate
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>{" "}
                  <span className="font-medium">Property Value Estimation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>{" "}
                  <span className="font-medium">Rent Fluctuation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>{" "}
                  <span className="font-medium">Location Indexing</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-purple-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-purple-100 text-purple-900 font-bold px-4 py-3 border-b border-purple-200">
                E-commerce
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  <span className="font-medium">Customer Lifetime Value</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  <span className="font-medium">Sales Forecasting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  <span className="font-medium">Dynamic Pricing</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-teal-200 shadow-sm rounded-lg overflow-hidden lg:col-span-2">
              <div className="bg-teal-100 text-teal-900 font-bold px-4 py-3 border-b border-teal-200">
                NLP & Computations
              </div>
              <ul className="p-4 space-y-3 text-slate-700 grid grid-cols-1 md:grid-cols-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>{" "}
                  <span className="font-medium">
                    Text Classification Weights
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>{" "}
                  <span className="font-medium">High Dimensional Datasets</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>{" "}
                  <span className="font-medium">
                    Deep Learning Preprocessing
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Python Implementation Step-by-Step */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-3 text-indigo-600" /> Implementation in Python using
        Scikit-Learn
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Below is a step-by-step example comparing Standard Linear Regression to
        Ridge Regression using a classic feature scaling approach. Notice how
        Ridge requires scaling using <code>StandardScaler</code> so that all
        features shrink symmetrically.
      </p>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-12">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-col gap-6">
          {/* Code Group */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
              import & prepare data
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`from sklearn.linear_model import Ridge, LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import numpy as np

# Random dummy data
np.random.seed(42)
X = np.random.rand(100, 3) # 100 houses, 3 features: [Rooms, Age, Location_Score]
y = 10 * X[:, 0] + 5 * X[:, 1] + 20 * X[:, 2] + np.random.randn(100) * 10
`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-amber-100 px-4 py-2 border-b border-amber-200 font-bold text-amber-800 text-sm flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              CRITICAL: Standardize the Features
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`# Must scale data for Ridge Regression!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
              train models and compare
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`# Standard Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)

# Ridge Regression (Alpha is Lambda)
ridge = Ridge(alpha=10.0) 
ridge.fit(X_train, y_train)

print(f"Linear Regression Weights: {np.round(lr.coef_, 2)}")
print(f"Ridge Regression Weights:  {np.round(ridge.coef_, 2)}")`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-[#0cf277]/10 border border-[#0cf277]/30 p-4 rounded-xl shadow-inner mt-2">
            <h4 className="font-bold text-[#09994c] mb-2 text-xs uppercase tracking-wider flex items-center">
              Terminal Output
            </h4>
            <pre className="font-mono text-sm text-[#09994c] whitespace-pre-wrap m-0">Linear Regression Weights: [ 3.01 1.42 6.09]
Ridge Regression Weights: [ 2.65 1.25 5.37]</pre>
            <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-[#0cf277]/30">
              Notice how the Ridge weights are visibly shrunk (smaller values)
              compared to Linear Regression. This is the L2 penalty in action
              stabilizing the model.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mt-4">
             <div className="bg-indigo-100 px-4 py-2 border-b border-indigo-200 font-bold text-indigo-900 text-sm flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Complete Assembled Code
             </div>
             <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
               <pre className="!m-0 leading-relaxed"><code>{`from sklearn.linear_model import Ridge, LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import numpy as np

# 1. Random dummy data
np.random.seed(42)
X = np.random.rand(100, 3) # 100 houses, 3 features
y = 10 * X[:, 0] + 5 * X[:, 1] + 20 * X[:, 2] + np.random.randn(100) * 10

# 2. Must scale data for Ridge Regression!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)

# 3. Standard Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)

# 4. Ridge Regression (Alpha is Lambda)
ridge = Ridge(alpha=10.0) 
ridge.fit(X_train, y_train)

# 5. Output
print(f"Linear Regression Weights: {np.round(lr.coef_, 2)}")
print(f"Ridge Regression Weights:  {np.round(ridge.coef_, 2)}")`}</code></pre>
             </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-12" />

      {/* Pros Cons Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2" /> Advantages of Ridge
          </h3>
          <ul className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 space-y-3">
            <li className="flex items-start text-emerald-900 border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
              <span>Specifically prevents overfitting caused by complex datasets.</span>
            </li>
            <li className="flex items-start text-emerald-900 border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
              <span>Solves multicollinearity (highly correlated features).</span>
            </li>
            <li className="flex items-start text-emerald-900 border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
              <span>Makes models more reliable on completely unseen future data.</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2" /> Disadvantages of Ridge
          </h3>
          <ul className="bg-red-50 border border-red-200 rounded-lg p-5 space-y-3">
            <li className="flex items-start text-red-900 border-b border-red-100 pb-3 last:border-0 last:pb-0">
              <CloseIcon className="w-5 h-5 mr-3 text-red-600 shrink-0 mt-0.5" />
              <span>
                Requires testing multiple values of Alpha (Lambda) to find the perfect balance.
              </span>
            </li>
            <li className="flex items-start text-red-900 border-b border-red-100 pb-3 last:border-0 last:pb-0">
              <CloseIcon className="w-5 h-5 mr-3 text-red-600 shrink-0 mt-0.5" />
              <span>
                Never reduces weights exactly to zero, meaning it cannot be used to drop useless features (unlike Lasso).
              </span>
            </li>
            <li className="flex items-start text-red-900 border-b border-red-100 pb-3 last:border-0 last:pb-0">
              <CloseIcon className="w-5 h-5 mr-3 text-red-600 shrink-0 mt-0.5" />
              <span>
                Requires all input variables to be rigorously scaled (Standardization) beforehand.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Ridge Regression is a fundamental regularization technique that elegantly solves the problem of model overfitting and multicollinearity. By systematically shrinking the model's coefficients using the L2 Penalty, it ensures that no single feature dominates the learning process.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        While it effectively dampens the impact of useless or redundant variables, it deliberately never reduces their weights to exactly zero. It provides a robust, generalized fit without completely discarding any ingested data.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Ridge Regression ensures stability by punishing large weights heavily, but mathematically refuses to select features—it will always involve all available inputs, no matter how tiny their final weights become."
         </p>
      </div>

    </>
  );
}
