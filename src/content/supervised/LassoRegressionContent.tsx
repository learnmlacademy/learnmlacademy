import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
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
  Check,
  X as CloseIcon,
  UserCheck,
  Activity,
  Hash,
  CheckCircle,
  Scale,
  Box,
  Divide,
  BookOpen,
} from "lucide-react";

const tradeoffData = [
  { lambda: "0 (Linear)", trainError: 10, testError: 45 },
  { lambda: "0.1", trainError: 12, testError: 35 },
  { lambda: "1", trainError: 15, testError: 25 },
  { lambda: "10", trainError: 25, testError: 23 },
  { lambda: "100", trainError: 45, testError: 40 },
  { lambda: "1000", trainError: 70, testError: 65 },
];

const coefData = [
  { feature: "x1 (Important)", Before: 15, After: 10 },
  { feature: "x2 (Noise)", Before: 20, After: 0 },
  { feature: "x3 (Correlated)", Before: 18, After: 0 },
  { feature: "x4 (Important)", Before: 25, After: 12 },
];

export function LassoRegressionContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Lasso Regression</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 rounded-r-lg shadow-sm">
        Lasso Regression is a regularization technique used to improve prediction accuracy and implicitly perform feature selection.</p>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-10 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-2">
          The full form of LASSO is:
        </h4>
        <p className="text-indigo-700 font-mono text-lg mb-4">
          Least Absolute Shrinkage and Selection Operator
        </p>
        <p className="text-slate-700">
          Lasso Regression is based on <strong>L1 Regularization</strong>.
        </p>
      </div>

      {/* Simple first-pass explanation */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2">
        Lasso Regression in Simple Words
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Lasso starts with Linear Regression, but adds a rule that discourages
        unnecessarily large coefficients. With enough regularization, some
        coefficients can become exactly zero, so those features stop affecting
        the prediction.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
        {[
          ["1", "Start with Features", "Use the available input columns."],
          ["2", "Fit a Linear Model", "Learn one coefficient for each feature."],
          ["3", "Add L1 Penalty", "Penalize the absolute size of coefficients."],
          ["4", "Shrink Some to Zero", "Some features may drop out of the model."],
        ].map(([step, title, text]) => (
          <div key={step} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-3">{step}</div>
            <p className="font-bold text-slate-800 mb-1">{title}</p>
            <p className="text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
        <h3 className="font-bold text-xl text-blue-900 mb-3">A Tiny House-Price Example</h3>
        <p className="text-slate-700 mb-4">
          Suppose a model starts with four numerical features. After Lasso, the
          coefficients might look like this:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-100 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left">Feature</th>
                <th className="px-4 py-2 text-left">Before Lasso</th>
                <th className="px-4 py-2 text-left">After Lasso</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["House Size", "8.0", "5.4"],
                ["Bedrooms", "3.2", "1.7"],
                ["Wall Color Code", "0.8", "0"],
                ["Random ID Number", "-0.5", "0"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-blue-100">
                  <td className="px-4 py-2 font-medium text-slate-800">{row[0]}</td>
                  <td className="px-4 py-2 font-mono text-slate-700">{row[1]}</td>
                  <td className={`px-4 py-2 font-mono font-bold ${row[2] === "0" ? "text-rose-600" : "text-emerald-700"}`}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-blue-900 mt-3">
          <strong>Important:</strong> this is an illustration, not a promise that Lasso will always
          choose the same features. The result depends on the data and the regularization strength.
        </p>
      </div>

      {/* Why Lasso Regression is Needed */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertTriangle className="mr-3 text-red-500" /> Why Lasso Regression is
        Needed
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Machine learning models often suffer from overfitting, too many
        irrelevant features, complex models, multicollinearity, and poor
        generalization.
      </p>
      <div className="bg-white border border-slate-200 p-6 rounded-lg mb-10 shadow-sm">
        <p className="text-slate-700 mb-4">
          Ordinary Linear Regression estimates a coefficient for every supplied
          feature. If many predictors are weak, noisy, or highly correlated, the
          model can become harder to interpret and may generalize poorly. Lasso can help by:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>Penalizing large coefficient magnitudes</li>
          <li>Shrinking coefficients</li>
          <li>Allowing some coefficients to become exactly zero</li>
          <li>Simplifying the model</li>
        </ul>
      </div>

      {/* Beginner Intuition */}
      <h3 className="text-xl font-bold text-indigo-800 mb-3">
        Beginner Intuition
      </h3>
      <div className="bg-white border border-slate-200 p-6 rounded-lg mb-8 shadow-sm">
        <p className="text-slate-700 font-medium mb-3">
          Imagine you are packing a travel bag.
        </p>
        <ul className="list-disc pl-5 mb-4 text-slate-700 space-y-2">
          <li>
            You cannot carry everything. So you keep only the most important
            items.
          </li>
          <li>
            <strong>Lasso Regression works similarly:</strong> it encourages a
            simpler model by shrinking coefficients, and some may become zero.
            Which features remain depends on the data and the chosen penalty.
          </li>
        </ul>
      </div>

      {/* Real-World Example */}
      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md my-8">
        <h4 className="font-bold text-xl mb-3 flex items-center text-slate-800">
          <Target className="w-6 h-6 mr-2 text-blue-600" /> Real-World Example
        </h4>
        <p className="text-slate-700 text-lg mb-4">
          Suppose we want to predict house prices using: House Size, Location,
          Bedrooms, Bathrooms, Wall Color, Owner Name, Garden Plants.
        </p>
        <p className="text-slate-700 text-lg mb-4">
          Not every feature will necessarily add useful predictive information.
          Lasso can shrink weak coefficients and, for some settings, make some of
          them exactly zero.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded border border-emerald-200">
            <h5 className="font-bold text-emerald-800 mb-2">It may keep:</h5>
            <ul className="list-disc pl-5 text-emerald-700">
              <li>House Size</li>
              <li>Location</li>
              <li>Bedrooms</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded border border-rose-200">
            <h5 className="font-bold text-rose-800 mb-2">And remove:</h5>
            <ul className="list-disc pl-5 text-rose-700">
              <li>Wall Color</li>
              <li>Garden Plants</li>
              <li>Owner Name</li>
            </ul>
          </div>
        </div>
        <p className="text-slate-700 mt-4 italic">
          This can simplify the model and may improve generalization, but it should
          be validated on unseen data.
        </p>
      </div>

      {/* Understanding Overfitting */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-indigo-600" /> Visual Understanding of
        Overfitting
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-emerald-800 mb-4 text-center">
            GOOD GENERALIZATION
          </h4>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between bg-white p-2 rounded">
              <span className="text-slate-600">Training Error</span>
              <span className="text-emerald-600 font-bold">Low</span>
            </div>
            <div className="flex justify-between bg-white p-2 rounded">
              <span className="text-slate-600">Validation/Test Error</span>
              <span className="text-emerald-600 font-bold">Low</span>
            </div>
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-200 p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-rose-800 mb-4 text-center">
            OVERFITTING
          </h4>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between bg-white p-2 rounded">
              <span className="text-slate-600">Training Error</span>
              <span className="text-emerald-600 font-bold">Very Low</span>
            </div>
            <div className="flex justify-between bg-white p-2 rounded">
              <span className="text-slate-600">Validation/Test Error</span>
              <span className="text-rose-600 font-bold">High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regularization Trees */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Hierarchy of Regression Algorithms
      </h2>
      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-lg mb-10 shadow-sm flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800 text-white font-bold py-3 px-8 rounded-xl shadow-md z-10 text-lg">
              Regression Algorithms
            </div>
          </div>
          <div className="flex justify-center items-center mb-4 text-slate-400">
            <div className="w-px h-8 bg-slate-300"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 relative mb-4">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-slate-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-slate-300 absolute top-0"></div>
              <div className="mt-8 bg-blue-100 border border-blue-300 text-blue-900 font-bold py-2 px-6 rounded-lg text-center">
                Linear Regression
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-slate-300 absolute top-0"></div>
              <div className="mt-8 bg-indigo-100 border border-indigo-300 text-indigo-900 font-bold py-2 px-6 rounded-lg text-center">
                Regularized Regression
              </div>
              <div className="w-px h-8 bg-slate-300 mt-2"></div>
            </div>
          </div>

          <div className="flex justify-end pr-16 relative">
            <div className="w-2/3 h-px bg-slate-300 absolute top-0 right-[15%]"></div>
            <div className="grid grid-cols-3 gap-2 w-2/3 mt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-px h-6 bg-slate-300 absolute top-0"></div>
                <div className="bg-white border border-slate-300 px-3 py-2 rounded shadow-sm text-sm font-bold text-slate-700">
                  Ridge (L2)
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-px h-6 bg-slate-300 absolute top-0"></div>
                <div className="bg-emerald-100 border border-emerald-300 px-3 py-2 rounded shadow-sm text-sm font-bold text-emerald-800">
                  Lasso (L1)
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-px h-6 bg-slate-300 absolute top-0"></div>
                <div className="bg-purple-50 border border-purple-200 px-3 py-2 rounded shadow-sm text-sm font-bold text-purple-800">
                  Elastic Net
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linear Regression Recap */}
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl my-10 shadow-sm">
        <div className="flex items-center mb-4 text-amber-900 border-b border-amber-200 pb-3">
          <Calculator className="w-6 h-6 mr-3" />
          <h3 className="font-bold text-xl m-0">
            Linear Regression Recap & Problem
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-amber-900 font-medium mb-2">Basic Equation:</p>
            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-center mb-4">
              y = b₀ + b₁x₁ + b₂x₂ + ... + bₙxₙ
            </div>
            <p className="text-amber-900 font-medium mb-2">Worked Example:</p>
            <ul className="list-disc pl-5 mb-2 text-amber-800">
              <li>b₀ = 5, b₁ = 3, x = 4</li>
              <li>y = 5 + 3(4)</li>
              <li>y = 17</li>
            </ul>
          </div>
          <div>
            <p className="text-rose-800 font-medium mb-2">
              Problem with Linear Regression:
            </p>
            <p className="text-rose-900 text-sm mb-4">
              With many correlated or noisy predictors, ordinary Linear Regression
              can produce unstable coefficients and may overfit. Coefficient size
              also depends on the scale of each feature.
            </p>
            <div className="bg-rose-50 p-3 rounded border border-rose-200 font-mono text-center text-rose-800">
              Example: y = 5 + 700x₁ + 1200x₂
              <br />
              <span className="text-xs text-rose-600 mt-2 block">
                A large number alone is not proof of instability; always consider feature scale.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Idea of Lasso */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-3 text-indigo-600" /> Core Idea of Lasso
        Regression
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Lasso Regression adds a penalty to the Linear Regression cost function.
        This penalty shrinks coefficients, and for suitable regularization some
        coefficients can become <strong>exactly zero</strong>. A zero coefficient
        means that feature no longer contributes to the linear prediction.
      </p>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-8 shadow-sm flex flex-col items-center">
        <p className="mb-4 font-medium text-indigo-900">Lasso Cost Function:</p>
        <code className="text-lg md:text-xl font-mono text-indigo-900 font-bold bg-white px-4 py-2 rounded shadow-sm border border-indigo-200 text-center w-full max-w-2xl">
          Cost = Prediction Loss + λ × Σ|w|
        </code>
        <p className="text-sm text-indigo-800 mt-3 max-w-2xl text-center">
          This is a teaching form. Libraries may scale the loss differently; the core idea is
          the same: data-fit loss plus an L1 penalty on the feature coefficients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-6">
          <div className="bg-white p-4 rounded text-center border border-indigo-100">
            <div className="font-bold text-slate-800">
              Part 1: Prediction Error
            </div>
            <div className="font-mono text-sm text-slate-500 my-2">
              Σ(y - ŷ)²
            </div>
            <p className="text-sm text-slate-600">
              Measures prediction mistakes.
            </p>
          </div>
          <div className="bg-white p-4 rounded text-center border border-emerald-200">
            <div className="font-bold text-emerald-800">Part 2: L1 Penalty</div>
            <div className="font-mono text-sm text-emerald-600 my-2">
              λ Σ|θ|
            </div>
            <p className="text-sm text-emerald-700">
              Penalizes coefficient size.
            </p>
          </div>
        </div>
      </div>

      {/* Understanding L1 Penalty */}
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md my-8">
        <h4 className="font-bold text-xl mb-3 flex items-center text-slate-800">
          <CheckCircle className="w-6 h-6 mr-2 text-emerald-600" />{" "}
          Understanding the L1 Penalty
        </h4>
        <p className="mb-4 text-slate-700 text-lg">
          The L1 penalty uses the absolute value of coefficients.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 text-lg mb-6">
          <li>
            <strong>Suppose</strong>: θ₁ = 3, θ₂ = -5
          </li>
        </ul>
        <div className="font-mono text-slate-800 text-lg space-y-3 mb-4 bg-white p-4 rounded border border-emerald-200 inline-block w-full">
          <p><strong>Step 1 — Absolute values:</strong> |3| + |-5| = 3 + 5 = 8</p>
          <p><strong>Step 2 — Choose λ = 2:</strong> L1 penalty = 2 × 8 = 16</p>
          <p><strong>Step 3 — If prediction loss = 20:</strong> Total cost = 20 + 16 = 36</p>
        </div>
        <p className="text-slate-700 text-lg italic">
          Increasing λ makes coefficient size more expensive, so the fitted model is pushed toward
          smaller—and sometimes zero—coefficients.
        </p>
      </div>

      {/* Understanding Lambda */}
      <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Scale className="mr-2 text-indigo-600" /> Understanding Lambda (λ)
      </h3>
      <p className="text-lg text-slate-700 mb-6">
        Lambda controls regularization strength.
      </p>

      <div className="overflow-x-auto shadow-sm rounded-lg mb-10 border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Lambda Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                Effect
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            <tr className="bg-white">
              <td className="px-6 py-4 font-bold font-mono text-slate-900">
                λ = 0
              </td>
              <td className="px-6 py-4 text-slate-600">
                Normal Linear Regression.
              </td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-6 py-4 font-bold font-mono text-slate-900">
                Small λ
              </td>
              <td className="px-6 py-4 text-slate-600">
                Small regularization (Weak Penalty, Complex Model).
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4 font-bold font-mono text-slate-900">
                Medium λ
              </td>
              <td className="px-6 py-4 text-slate-600">Moderate regularization; whether it is a good choice depends on validation results.</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-6 py-4 font-bold font-mono text-slate-900">
                Very large λ
              </td>
              <td className="px-6 py-4 text-slate-600">
                Underfitting (Strong Penalty, Simpler Model).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Feature Selection */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-3 text-amber-500" /> How Lasso Performs Feature
        Selection
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        A distinctive property of Lasso is that it can produce a sparse solution: some
        coefficients may become exactly zero.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-slate-100 p-3 font-bold text-slate-700 border-b border-slate-200 text-center">
            Before Lasso
          </div>
          <div className="p-4 font-mono text-lg flex flex-col items-center space-y-2 bg-rose-50">
            <div>x₁ = 5</div>
            <div>x₂ = 8</div>
            <div>x₃ = 3</div>
            <div>x₄ = 7</div>
          </div>
        </div>
        <div className="bg-white border border-emerald-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-emerald-100 p-3 font-bold text-emerald-800 border-b border-emerald-200 text-center">
            After Lasso
          </div>
          <div className="p-4 font-mono text-lg flex flex-col items-center space-y-2 bg-emerald-50">
            <div>x₁ = 5</div>
            <div className="text-slate-400 line-through">x₂ = 0</div>
            <div className="text-slate-400 line-through">x₃ = 0</div>
            <div>x₄ = 7</div>
          </div>
        </div>
      </div>
      <p className="text-lg text-slate-700 mb-6 italic text-center">
        In this illustration, x₂ and x₃ become zero. The real features selected by
        Lasso depend on the training data and the chosen regularization strength.
      </p>

      {/* Coefficient Shrinking Visualization */}
      <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col mb-10">
        <p className="font-bold text-slate-800 mb-4 text-center">
          Coefficient Shrinking Visualization
        </p>
        <div className="w-full h-[400px] bg-slate-50 border border-slate-100 rounded p-4">
          <ResponsiveContainer width="100%" height="100%">
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
                dataKey="Before"
                fill="#94a3b8"
                name="Before Lasso"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="After"
                fill="#10b981"
                name="After Lasso"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geometric Interpretation */}
      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md my-8">
        <h4 className="font-bold text-xl mb-3 flex items-center text-slate-800">
          <Box className="w-6 h-6 mr-2 text-indigo-600" /> Why Lasso Creates
          Sparse Models
        </h4>
        <p className="text-slate-700 text-lg mb-4">
          With two coefficients, the L1 constraint has a diamond-shaped boundary.
          Its sharp corners lie on the axes, which helps explain why Lasso solutions
          often land at points where one or more coefficients are exactly zero.
        </p>
        <div className="flex justify-center my-4 font-mono text-indigo-800">
          <pre className="!m-0 text-center">
            {`      /\\
     /  \\
    /    \\
    \\    /
     \\  /
      \\/`}
          </pre>
        </div>
      </div>

      {/* Ridge vs Lasso Comparison */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-3 text-indigo-600" /> Ridge vs Lasso Penalty
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg shadow-sm text-center">
          <h4 className="font-bold text-blue-800 mb-4">Ridge Penalty (L2)</h4>
          <div className="font-mono text-xl text-blue-900 bg-white p-3 rounded mb-4 shadow-inner">
            λΣθ²
          </div>
          <p className="text-sm text-blue-700">
            Shrinks coefficients but rarely reaches zero.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-lg shadow-sm text-center">
          <h4 className="font-bold text-emerald-800 mb-4">
            Lasso Penalty (L1)
          </h4>
          <div className="font-mono text-xl text-emerald-900 bg-white p-3 rounded mb-4 shadow-inner">
            λΣ|θ|
          </div>
          <p className="text-sm text-emerald-700">
            Shrinks coefficients and can make them zero.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto shadow-sm rounded-lg mb-10 border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">
                Ridge
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Lasso
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {[
              { f: "Regularization Type", r: "L2", la: "L1" },
              { f: "Can create exact-zero coefficients", r: "Typically no", la: "Yes" },
              { f: "Promotes sparsity", r: "No", la: "Yes" },
              { f: "Useful for feature selection", r: "Not directly", la: "Often" },
              {
                f: "Highly correlated features",
                r: "Often keeps them together",
                la: "May select one and zero others",
              },
              { f: "Interpretability", r: "Keeps all coefficients", la: "Can be simpler when sparse" },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {row.f}
                </td>
                <td className="px-6 py-4 text-blue-800 font-medium">{row.r}</td>
                <td className="px-6 py-4 text-emerald-800 font-medium">
                  {row.la}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-lg text-slate-700 mb-6 text-center italic">
        Increasing L1 regularization usually increases bias and can reduce variance. The useful tradeoff depends on validation performance.
      </p>

      {/* Bias-Variance Tradeoff Chart */}
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
                name="Training Error"
              />
              <Line
                type="monotone"
                dataKey="testError"
                stroke="#ef4444"
                strokeWidth={3}
                name="Validation/Test Error"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Multicollinearity */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Divide className="mr-2 text-indigo-600" /> Multicollinearity in Lasso
      </h2>
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl my-6 shadow-sm">
        <h4 className="font-bold text-amber-900 mb-2">
          What is Multicollinearity?
        </h4>
        <p className="text-amber-800 mb-4">
          When features are highly correlated (e.g., House Area and Number of
          Rooms).
        </p>
        <h4 className="font-bold text-amber-900 mb-2">
          Lasso Behavior with Correlated Features:
        </h4>
        <p className="text-amber-800 mb-4">
          With strongly correlated predictors, Lasso may keep one and shrink another to zero.
          Which one is selected can be unstable when predictors carry very similar information.
        </p>
        <ul className="list-none pl-0 space-y-2 font-mono text-sm">
          <li className="bg-white p-2 rounded shadow-sm flex items-center text-emerald-700 border border-emerald-100">
            <CheckCircle className="w-4 h-4 mr-2" /> Feature A → Kept
          </li>
          <li className="bg-white p-2 rounded shadow-sm flex items-center text-rose-700 border border-rose-100">
            <CloseIcon className="w-4 h-4 mr-2" /> Feature B → Removed
          </li>
        </ul>
      </div>

      {/* Optimization and Scaling */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <TrendingUp className="mr-3 text-indigo-600" /> Cost Function
        Optimization
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Lasso can be optimized in different ways. Scikit-learn's <code>Lasso</code> estimator uses
        <strong> coordinate descent</strong>. Gradient-based thinking is still useful for intuition,
        but the absolute-value penalty has a sharp point at zero, so its update is not simply
        “ordinary gradient + λ” for every coefficient.
      </p>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl mb-10 shadow-sm">
        <h3 className="font-bold text-xl text-indigo-900 mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2" /> Conceptual Gradient-Style Update (for intuition)
        </h3>

        <div className="flex justify-center my-6">
          <div className="bg-white border-2 border-indigo-200 p-4 rounded-lg shadow-sm font-mono text-lg md:text-xl text-center text-slate-800 overflow-x-auto w-full max-w-2xl">
            w_new = w - η(gradient_loss + λ × sign(w))
          </div>
        </div>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md my-8">
          <h4 className="font-bold text-xl mb-3 flex items-center text-slate-800">
            <CheckCircle className="w-6 h-6 mr-2 text-blue-600" /> Worked
            Example
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 text-lg mb-6">
            <li>
              <strong>Current Weight (θ)</strong>: 10
            </li>
            <li>
              <strong>Learning Rate (η)</strong>: 0.1
            </li>
            <li>
              <strong>Gradient (∂J/∂θ)</strong>: 4
            </li>
            <li>
              <strong>Lambda (λ)</strong>: 1
            </li>
          </ul>
          <div className="bg-white border border-blue-200 rounded p-4 font-mono text-slate-800 space-y-2 mb-4">
            <p><strong>Step 1:</strong> sign(10) = +1</p>
            <p><strong>Step 2:</strong> combined gradient = 4 + (1 × 1) = 5</p>
            <p><strong>Step 3:</strong> new weight = 10 - (0.1 × 5) = 9.5</p>
          </div>
          <p className="font-bold text-indigo-800">
            The L1 term adds pressure toward zero. This is a teaching calculation; practical Lasso
            solvers such as scikit-learn's coordinate-descent solver handle the non-smooth point at zero directly.
          </p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl my-10 shadow-sm">
        <div className="flex items-center mb-4 text-emerald-900 border-b border-emerald-200 pb-3">
          <Calculator className="w-6 h-6 mr-3" />
          <h3 className="font-bold text-xl m-0">
            Why Feature Scaling is Important
          </h3>
        </div>
        <p className="text-emerald-900 mb-3">
          Feature scale matters because coefficient magnitudes depend on the units of the inputs.
          If one feature is measured in rupees and another in years, the same L1 penalty can affect
          them very differently. Standardizing numerical features often makes the regularization
          easier to compare across features.
        </p>
        <p className="font-mono bg-white p-3 rounded mb-4 text-center border border-emerald-100 font-bold text-emerald-800">
          X_scaled = (X - μ) / σ
        </p>

        <div className="bg-white p-4 rounded-lg border border-emerald-200 font-mono text-sm text-slate-800 space-y-3 shadow-inner">
          <p className="text-slate-500">// Example scaling calculation</p>
          <p>Suppose: X = 50, Mean(μ) = 40, Std Dev(σ) = 5</p>
          <p>X_scaled = (50 - 40) / 5</p>
          <p>X_scaled = 10 / 5</p>
          <p className="font-bold text-lg text-emerald-900 pt-3 border-t border-emerald-100">
            X_scaled = 2
          </p>
        </div>
      </div>

      {/* Implementation */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-3 text-indigo-600" /> Python Implementation using
        Scikit-Learn
      </h2>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-12">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
              Step 1: Import Libraries
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`import numpy as np
import pandas as pd
from sklearn.linear_model import Lasso, LassoCV
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
              Step 2 & 3: Create & Split Data
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`# Column 1: Study hours (useful)
# Column 2: Locker number pattern (not useful here)
X = np.array([
    [1, 0], [2, 1], [3, 0], [4, 1], [5, 0],
    [6, 1], [7, 0], [8, 1], [9, 0], [10, 1]
], dtype=float)
Y = np.array([8, 11, 14, 17, 20, 23, 26, 29, 32, 35], dtype=float)

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42
)`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-amber-100 px-4 py-2 border-b border-amber-200 font-bold text-amber-800 text-sm flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Step 4: Scale Features
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700 text-sm">
              Step 5 & 6: Train & Predict
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`model = Lasso(alpha=0.5, max_iter=10000)
model.fit(X_train_scaled, Y_train)

predictions = model.predict(X_test_scaled)
print("Coefficients:", np.round(model.coef_, 3))
print("Predictions:", np.round(predictions, 2))`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mt-4">
            <div className="bg-indigo-100 px-4 py-2 border-b border-indigo-200 font-bold text-indigo-900 text-sm flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Complete Assembled Code
            </div>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">
              <pre className="!m-0 leading-relaxed">
                <code>{`import numpy as np
import pandas as pd
from sklearn.linear_model import Lasso, LassoCV
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Column 1: Study hours (useful)
# Column 2: Locker number pattern (not useful here)
X = np.array([
    [1, 0], [2, 1], [3, 0], [4, 1], [5, 0],
    [6, 1], [7, 0], [8, 1], [9, 0], [10, 1]
], dtype=float)
Y = np.array([8, 11, 14, 17, 20, 23, 26, 29, 32, 35], dtype=float)

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42
)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = Lasso(alpha=0.5, max_iter=10000)
model.fit(X_train_scaled, Y_train)
predictions = model.predict(X_test_scaled)

print("Coefficients:", np.round(model.coef_, 3))
print("Predictions:", np.round(predictions, 2))

# For real projects, choose alpha with cross-validation
cv_model = LassoCV(cv=5, random_state=42, max_iter=10000)
cv_model.fit(X_train_scaled, Y_train)
print("Chosen alpha:", cv_model.alpha_)`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-10">
        <h3 className="font-bold text-lg text-slate-800 mb-3">What should you notice?</h3>
        <div className="bg-white border border-slate-200 rounded p-4 font-mono text-sm text-slate-800 mb-3">
          Coefficients: [7.578 0.000]
        </div>
        <p className="text-slate-700 mb-2">
          The first feature keeps a non-zero coefficient, while the second becomes zero in this tiny
          example. That is the sparse behaviour Lasso is known for.
        </p>
        <p className="text-sm text-slate-600">
          The exact values depend on the train/test split, scaling and alpha. For real work, tune alpha
          using cross-validation rather than assuming one value is always best.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-12" />

      {/* Pros Cons Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2" /> Advantages of Lasso
          </h3>
          <ul className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 space-y-3">
            <li className="flex items-start text-emerald-900 border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
              <span>Can produce sparse models with some exact-zero coefficients.</span>
            </li>
            <li className="flex items-start text-emerald-900 border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
              <span>Can reduce overfitting by adding regularization.</span>
            </li>
            <li className="flex items-start text-emerald-900 border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
              <span>Simplifies models for easier interpretation.</span>
            </li>
            <li className="flex items-start text-emerald-900 border-b border-emerald-100 pb-3 last:border-0 last:pb-0">
              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
              <span>Can simplify interpretation when many coefficients become zero.</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2" /> Disadvantages of Lasso
          </h3>
          <ul className="bg-red-50 border border-red-200 rounded-lg p-5 space-y-3">
            <li className="flex items-start text-red-900 border-b border-red-100 pb-3 last:border-0 last:pb-0">
              <CloseIcon className="w-5 h-5 mr-3 text-red-600 shrink-0 mt-0.5" />
              <span>Sensitive to scaling.</span>
            </li>
            <li className="flex items-start text-red-900 border-b border-red-100 pb-3 last:border-0 last:pb-0">
              <CloseIcon className="w-5 h-5 mr-3 text-red-600 shrink-0 mt-0.5" />
              <span>
                Can sometimes remove useful features with excessive regularization.
              </span>
            </li>
            <li className="flex items-start text-red-900 border-b border-red-100 pb-3 last:border-0 last:pb-0">
              <CloseIcon className="w-5 h-5 mr-3 text-red-600 shrink-0 mt-0.5" />
              <span>
                With highly correlated predictors, the selected feature can be unstable.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Lasso vs Ridge vs Elastic Net */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Lasso vs Ridge vs Elastic
        Net
      </h2>
      <div className="overflow-x-auto shadow-sm rounded-lg mb-10 border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">
                Ridge
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Lasso
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-purple-600 uppercase tracking-wider">
                Elastic Net
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {[
              { f: "Regularization", r: "L2", l: "L1", e: "L1 + L2" },
              { f: "Can create exact-zero coefficients", r: "Typically no", l: "Yes", e: "Yes" },
              { f: "Promotes sparsity", r: "No", l: "Yes", e: "Yes" },
              {
                f: "Correlated features",
                r: "Often stable",
                l: "May select one",
                e: "Can balance L1 + L2",
              },
              { f: "Complexity", r: "Medium", l: "Medium", e: "Higher" },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {row.f}
                </td>
                <td className="px-6 py-4 text-blue-800 font-medium">{row.r}</td>
                <td className="px-6 py-4 text-emerald-800 font-medium">
                  {row.l}
                </td>
                <td className="px-6 py-4 text-purple-800 font-medium">
                  {row.e}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Industry Applications Hierarchy */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Industry Applications Tree
      </h2>
      <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-lg mb-10 shadow-sm flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <div className="bg-white border text-left border-rose-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-rose-100 text-rose-900 font-bold px-4 py-3 border-b border-rose-200">
                Healthcare
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>{" "}
                  Disease Prediction
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>{" "}
                  Gene Selection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>{" "}
                  Medical Diagnostics
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-blue-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-blue-100 text-blue-900 font-bold px-4 py-3 border-b border-blue-200">
                Finance
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  Risk Analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  Credit Scoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  Fraud Detection
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-purple-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-purple-100 text-purple-900 font-bold px-4 py-3 border-b border-purple-200">
                Marketing
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  Customer Analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  Sales Forecasting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  Advertisement Analysis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* End-to-End Workflow */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-3 text-indigo-600" /> End-to-End Lasso
        Regression Workflow
      </h2>
      <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl mb-12 shadow-sm flex justify-center">
        <div className="w-full max-w-lg space-y-4 font-mono text-center">
          <div className="bg-white border border-slate-300 p-3 rounded shadow-sm text-slate-800 font-bold">
            Collect Dataset
          </div>
          <div className="text-slate-400">↓</div>
          <div className="bg-white border border-slate-300 p-3 rounded shadow-sm text-slate-800">
            Clean Data
          </div>
          <div className="text-slate-400">↓</div>
          <div className="bg-white border text-emerald-800 border-emerald-300 p-3 rounded shadow-sm font-bold bg-emerald-50">
            Scale Features
          </div>
          <div className="text-slate-400">↓</div>
          <div className="bg-white border border-blue-300 text-blue-800 p-3 rounded shadow-sm font-bold bg-blue-50">
            Train Lasso Model
          </div>
          <div className="text-slate-400">↓</div>
          <div className="bg-white border border-indigo-300 text-indigo-800 p-3 rounded shadow-sm font-bold bg-indigo-50">
            Apply L1 Penalty
          </div>
          <div className="text-slate-400">↓</div>
          <div className="bg-white border border-rose-300 text-rose-800 p-3 rounded shadow-sm font-bold bg-rose-50">
            Some Coefficients May Become Zero
          </div>
          <div className="text-slate-400">↓</div>
          <div className="bg-white border border-slate-300 p-3 rounded shadow-sm text-slate-800">
            Generate Predictions
          </div>
          <div className="text-slate-400">↓</div>
          <div className="bg-white border border-slate-300 p-3 rounded shadow-sm text-slate-800 font-bold">
            Evaluate Performance
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Common Questions About Lasso Regression
      </h2>
      <div className="space-y-4 mb-10">
        {[
          ["Does Lasso always remove features?", "No. Some coefficients become zero only when the data and regularization strength lead to a sparse solution."],
          ["Is a bigger alpha always better?", "No. Too much regularization can underfit. Choose alpha using validation or cross-validation."],
          ["Why should numerical features often be scaled?", "Because L1 regularization acts on coefficient magnitudes, and those magnitudes depend on feature units."],
          ["What happens with correlated features?", "Lasso may keep one correlated predictor and shrink another to zero. Elastic Net can be more stable when groups of predictors are strongly correlated."],
        ].map(([q, a]) => (
          <div key={q} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">{q}</h3>
            <p className="text-slate-700">{a}</p>
          </div>
        ))}
      </div>
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-10">
        <h3 className="font-bold text-indigo-900 mb-3">Continue Learning</h3>
        <p className="text-slate-700 mb-3">Use these lessons to connect Lasso with the ideas around it:</p>
        <div className="flex flex-wrap gap-2">
          <a href="/learn/linear-regression" className="text-indigo-700 underline font-medium">Linear Regression</a>
          <span className="text-slate-400">•</span>
          <a href="/learn/ridge-regression" className="text-indigo-700 underline font-medium">Ridge Regression</a>
          <span className="text-slate-400">•</span>
          <a href="/learn/feature-scaling" className="text-indigo-700 underline font-medium">Feature Scaling</a>
          <span className="text-slate-400">•</span>
          <a href="/learn/feature-selection" className="text-indigo-700 underline font-medium">Feature Selection</a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BookOpen className="mr-3 text-indigo-400" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Lasso Regression is a powerful machine learning regularization technique that improves Linear Regression by penalizing large coefficients using the absolute value of weights (L1 Penalty).
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Its most distinctive behaviour is sparsity: for suitable regularization, some coefficients can become exactly zero. This can simplify a model and act as an embedded feature-selection mechanism, but the selected features still need validation.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Ridge mainly shrinks coefficients, while Lasso can shrink some coefficients all the way to zero. That makes Lasso useful for sparse models and embedded feature selection—but the chosen features still depend on the data and alpha."
         </p>
      </div>

    </>
  );
}
