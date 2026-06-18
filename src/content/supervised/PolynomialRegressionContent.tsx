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
  LineChart,
} from "recharts";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BookOpen,
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
} from "lucide-react";

// Sample data for visualizations
const linearData = Array.from({ length: 15 }, (_, i) => {
  const x = i + 1;
  const y = 2.5 * x + 10;
  return { x, y, actual: y + Math.random() * 15 - 7.5 };
});

const polyData = Array.from({ length: 15 }, (_, i) => {
  const x = i + 1;
  const y = 0.5 * Math.pow(x - 7, 2) + 10;
  return { x, y, actual: y + Math.random() * 8 - 4 };
});

const quadData = Array.from({ length: 20 }, (_, i) => {
  const x = i / 2 - 4;
  return { x, y: 2 + 3 * x + 1 * x * x };
});

const cubicData = Array.from({ length: 20 }, (_, i) => {
  const x = i / 2 - 4;
  return { x, y: 1 + 2 * x + 1 * x * x + 1 * Math.pow(x, 3) };
});

const studyData = [
  { hours: 1, score: 45, linearScore: 44.5, polyScore: 45.2 },
  { hours: 2, score: 50, linearScore: 50.8, polyScore: 49.3 },
  { hours: 3, score: 54, linearScore: 57.1, polyScore: 54.4 },
  { hours: 4, score: 60, linearScore: 63.4, polyScore: 60.1 },
  { hours: 5, score: 68, linearScore: 69.7, polyScore: 66.8 },
  { hours: 6, score: 78, linearScore: 76.0, polyScore: 74.7 },
  { hours: 7, score: 85, linearScore: 82.3, polyScore: 83.6 },
  { hours: 8, score: 91, linearScore: 88.6, polyScore: 92.2 },
  { hours: 9, score: 96, linearScore: 94.9, polyScore: 98.7 },
  { hours: 10, score: 98, linearScore: 101.2, polyScore: 98.5 },
];

export function PolynomialRegressionContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Polynomial Regression</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 rounded-r-lg shadow-sm">
        Polynomial Regression is a form of Regression used when the relationship between variables is nonlinear. Instead of fitting a straight line, it bends the line to fit the curves of the dataset.</p>

      {/* What is Polynomial Regression? */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-2 text-indigo-600" /> What is Polynomial
        Regression?
      </h2>
      <p className="text-lg text-slate-700 mb-4">
        Polynomial Regression is a supervised machine learning algorithm that
        models nonlinear relationships between the independent variable and
        dependent variable by using polynomial terms.
      </p>
      <p className="text-lg text-slate-700 mb-6">
        Although it is called "polynomial," it still belongs to the family of
        linear models because the coefficients are learned linearly.
      </p>

      {/* Real-Life Intuition */}
      <h3 className="text-xl font-bold text-indigo-800 mb-3">
        Real-Life Intuition
      </h3>
      <div className="bg-white border border-slate-200 p-6 rounded-lg mb-8 shadow-sm">
        <p className="text-slate-700 font-medium mb-3">
          Consider the relationships between:
        </p>
        <ul className="list-disc pl-5 mb-4 text-slate-700">
          <li>Temperature and electricity usage</li>
          <li>Age and income</li>
          <li>Advertisement spending and sales</li>
          <li>Speed and fuel efficiency</li>
        </ul>
        <p className="text-slate-700">
          These relationships are often{" "}
          <strong>curved rather than perfectly straight</strong>. A straight
          line cannot properly model such patterns, but a polynomial curve can.
        </p>
      </div>

      {/* Visual Understanding */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <TrendingUp className="mr-2 text-blue-600" /> Visual Understanding of
        Polynomial Regression
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-center text-slate-800 mb-4">
            Linear Relationship
          </h4>
          <div className="h-64 w-full bg-white p-2 border border-slate-200 rounded">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={linearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={["dataMin - 1", "dataMax + 1"]}
                  hide
                />
                <YAxis hide />
                <Scatter dataKey="actual" fill="#ef4444" />
                <Line
                  type="linear"
                  dataKey="y"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-slate-500 mt-2">
            Straight line cannot capture bounds
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-center text-slate-800 mb-4">
            Polynomial Relationship
          </h4>
          <div className="h-64 w-full bg-white p-2 border border-slate-200 rounded">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={polyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={["dataMin - 1", "dataMax + 1"]}
                  hide
                />
                <YAxis hide />
                <Scatter dataKey="actual" fill="#ef4444" />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-slate-500 mt-2">
            Curved pattern fits data perfectly
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-3">
        Why Polynomial Regression is Needed
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 p-5 rounded-lg border border-red-100">
          <h4 className="font-bold text-red-800 mb-2">
            Linear Regression Assumes:
          </h4>
          <ul className="list-disc pl-5 text-red-900">
            <li>Straight-line relationship</li>
            <li>Constant rate of change</li>
          </ul>
        </div>
        <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-2">
            But Real-World Data Contains:
          </h4>
          <ul className="list-disc pl-5 text-emerald-900">
            <li>Curves</li>
            <li>Nonlinear growth</li>
            <li>Complex trends</li>
          </ul>
        </div>
      </div>
      <p className="text-slate-700 mb-8 italic">
        Polynomial Regression helps model these nonlinear patterns more
        accurately.
      </p>

      {/* Core Idea */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Core Idea of Polynomial
        Regression
      </h2>
      <p className="text-lg text-slate-700 mb-4">
        Polynomial Regression transforms features into higher-degree polynomial
        terms.
      </p>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-8 shadow-sm flex flex-col items-center">
        <p className="mb-4 font-medium text-indigo-900">
          Instead of a simple line equation:
        </p>
        <code className="text-2xl font-mono text-slate-900 bg-white px-4 py-2 rounded shadow-sm border border-slate-200 mb-6">
          y = m*x + c
        </code>

        <p className="mb-4 font-medium text-indigo-900">
          It expands into a polynomial of degree `n`:
        </p>
        <code className="text-xl md:text-2xl font-mono text-slate-900 bg-white px-4 py-2 rounded shadow-sm border border-slate-200 text-center w-full overflow-x-auto">
          y = b₀ + b₁x + b₂x² + b₃x³ + ... + bₙxⁿ
        </code>
      </div>

      {/* Hierarchical Structure */}
      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        Hierarchical Structure of Regression Types
      </h3>
      <div className="bg-slate-50 border border-slate-200 p-8 rounded-lg mb-10 shadow-sm flex flex-col items-center">
        <div className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg shadow-md z-10 w-64 text-center">
          Regression Algorithms
        </div>
        <div className="border-l-2 border-indigo-300 h-6"></div>
        <div className="w-[60%] border-t-2 border-indigo-300 h-0 flex justify-between relative">
          <div className="border-l-2 border-indigo-300 h-6 absolute left-0"></div>
          <div className="border-l-2 border-indigo-300 h-6 absolute right-0"></div>
        </div>
        <div className="w-full flex justify-center gap-4 relative z-10">
          <div className="w-1/2 flex flex-col items-center">
            <div className="bg-white border-2 border-indigo-400 text-indigo-900 font-bold py-2 px-4 rounded shadow text-center w-48">
              Linear Regression
            </div>
            <div className="border-l-2 border-indigo-300 h-6"></div>
            <div className="bg-slate-100 border border-slate-300 text-slate-700 font-medium py-2 px-4 rounded text-center w-48 text-sm">
              Simple Linear Regression
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <div className="bg-white border-2 border-emerald-400 text-emerald-900 font-bold py-2 px-4 rounded shadow text-center w-48">
              Nonlinear Regression
            </div>
            <div className="border-l-2 border-emerald-300 h-6"></div>
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold py-2 px-4 rounded text-center w-48">
              Polynomial Regression
            </div>
            <div className="border-l-2 border-emerald-300 h-6"></div>

            {/* Third level */}
            <div className="w-full relative mt-[-2px]">
              <div className="w-[80%] mx-auto border-t-2 border-emerald-300 absolute left-[10%] top-0"></div>
              <div className="flex justify-between mt-4">
                <div className="flex flex-col items-center w-1/3">
                  <div className="absolute top-0 border-l-2 border-emerald-300 h-4 left-[10%]"></div>
                  <div className="bg-white py-1 px-2 border border-slate-300 rounded text-xs font-semibold text-center mt-2 shadow-sm whitespace-nowrap">
                    Quadratic
                  </div>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <div className="absolute top-0 border-l-2 border-emerald-300 h-4 left-1/2"></div>
                  <div className="bg-white py-1 px-2 border border-slate-300 rounded text-xs font-semibold text-center mt-2 shadow-sm whitespace-nowrap">
                    Cubic
                  </div>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <div className="absolute top-0 border-l-2 border-emerald-300 h-4 right-[10%]"></div>
                  <div className="bg-white py-1 px-2 border border-slate-300 rounded text-xs font-semibold text-center mt-2 shadow-sm whitespace-nowrap">
                    Higher Degree
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Polynomial Degrees */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Understanding Polynomial Degrees
      </h2>

      {/* Degree 2 */}
      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        1. Quadratic Regression (Degree 2)
      </h3>
      <p className="text-lg text-slate-700 mb-4">
        Produces a parabola-shaped curve.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="flex flex-col gap-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="font-bold text-blue-900 mb-2 uppercase text-xs tracking-wider">
              Formula
            </p>
            <code className="text-lg font-mono text-slate-900 block font-bold">
              y = b₀ + b₁x + b₂x²
            </code>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3 text-amber-900">
              <Calculator className="w-5 h-5 mr-2" />
              <p className="font-bold text-lg">Worked Example</p>
            </div>
            <p className="text-amber-900 mb-2">Suppose:</p>
            <ul className="list-disc list-inside font-mono text-sm mb-4 text-amber-800 pl-2">
              <li>b₀ = 2</li>
              <li>b₁ = 3</li>
              <li>b₂ = 1</li>
              <li>x = 2</li>
            </ul>
            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-sm text-slate-800 space-y-1">
              <p>y = 2 + 3(2) + 1(2²)</p>
              <p>y = 2 + 6 + 4</p>
              <p className="font-bold text-lg text-amber-900 pt-2 border-t border-amber-100">
                y = 12
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col">
          <p className="font-bold text-slate-800 mb-2 text-center">
            Quadratic Curve Visualization
          </p>
          <div className="flex-1 min-h-[200px] w-full bg-slate-50 border border-slate-100 rounded">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={quadData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="x" hide />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Degree 3 */}
      <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">
        2. Cubic Regression (Degree 3)
      </h3>
      <p className="text-lg text-slate-700 mb-4">
        Captures more complex nonlinear relationships.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="flex flex-col gap-4">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
            <p className="font-bold text-purple-900 mb-2 uppercase text-xs tracking-wider">
              Formula
            </p>
            <code className="text-lg font-mono text-slate-900 block font-bold">
              y = b₀ + b₁x + b₂x² + b₃x³
            </code>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3 text-amber-900">
              <Calculator className="w-5 h-5 mr-2" />
              <p className="font-bold text-lg">Worked Example</p>
            </div>
            <p className="text-amber-900 mb-2">Suppose:</p>
            <ul className="list-disc list-inside font-mono text-sm mb-4 text-amber-800 pl-2">
              <li>b₀ = 1</li>
              <li>b₁ = 2</li>
              <li>b₂ = 1</li>
              <li>b₃ = 1</li>
              <li>x = 2</li>
            </ul>
            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-sm text-slate-800 space-y-1">
              <p>y = 1 + 2(2) + 1(2²) + 1(2³)</p>
              <p>y = 1 + 4 + 4 + 8</p>
              <p className="font-bold text-lg text-amber-900 pt-2 border-t border-amber-100">
                y = 17
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col">
          <p className="font-bold text-slate-800 mb-2 text-center">
            Cubic Curve Visualization
          </p>
          <div className="flex-1 min-h-[200px] w-full bg-slate-50 border border-slate-100 rounded">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cubicData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="x" hide />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#8b5cf6"
                  strokeWidth={4}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature Transformation Workflow */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Feature Transformation
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Polynomial Regression converts original features into polynomial
        features. By doing this, it treats the higher powers as completely new
        variables and trains a linear model on them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-sm">
          <h4 className="font-bold text-indigo-900 mb-4">
            Example Transformation (Degree 4)
          </h4>
          <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm mb-4 border border-indigo-100">
            <div className="font-mono font-bold text-slate-700">x</div>
            <ArrowRight className="text-indigo-400 mx-2" />
            <div className="font-mono font-bold text-indigo-700">
              x, x², x³, x⁴
            </div>
          </div>
          <p className="text-sm text-slate-600 block mt-4 bg-indigo-100 p-3 rounded">
            The dataset width grows. If a row had just <code>[3]</code> as its
            feature, it becomes <code>[3, 9, 27, 81]</code>.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">
            Transformation Workflow
          </h4>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <div className="bg-slate-100 border border-slate-300 font-bold p-2 text-slate-700 rounded shadow-sm relative z-10 w-full">
              Original Input
            </div>
            <ArrowDown className="text-slate-400 w-5 h-5 mx-auto" />
            <div className="bg-blue-50 border border-blue-200 font-bold p-2 text-blue-800 rounded shadow-sm relative z-10 w-full">
              Generate Polynomial Features
            </div>
            <ArrowDown className="text-slate-400 w-5 h-5 mx-auto" />
            <div className="bg-slate-800 border border-slate-900 font-mono text-emerald-400 p-2 rounded shadow-sm relative z-10 w-full">
              x, x², x³, x⁴
            </div>
            <ArrowDown className="text-slate-400 w-5 h-5 mx-auto" />
            <div className="bg-indigo-600 border border-indigo-700 font-bold p-2 text-white rounded shadow-sm relative z-10 w-full">
              Train Linear Model
            </div>
            <ArrowDown className="text-slate-400 w-5 h-5 mx-auto" />
            <div className="bg-emerald-50 border border-emerald-200 font-bold p-2 text-emerald-700 rounded shadow-sm relative z-10 w-full">
              Curved Predictions
            </div>
          </div>
        </div>
      </div>

      {/* Difference Table */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800">
        Difference Between Linear and Polynomial Regression
      </h2>
      <div className="overflow-x-auto shadow-sm rounded-lg mb-10 border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">
                Linear Regression
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Polynomial Regression
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {[
              { f: "Relationship", lr: "Straight line", pr: "Curved" },
              { f: "Complexity", lr: "Simple", pr: "More complex" },
              { f: "Accuracy on nonlinear data", lr: "Poor", pr: "Better" },
              { f: "Risk of overfitting", lr: "Low", pr: "Higher" },
              {
                f: "Feature engineering",
                lr: "Minimal",
                pr: "Required (Polynomial expansion)",
              },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {row.f}
                </td>
                <td className="px-6 py-4 text-slate-600">{row.lr}</td>
                <td className="px-6 py-4 text-slate-600 font-medium">
                  {row.pr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cost Function */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Target className="mr-3 text-indigo-600" /> Cost Function in Polynomial
        Regression
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Polynomial Regression commonly uses Mean Squared Error (MSE), identical
        to standard Linear Regression, because it is still an optimization over
        a linear set of parameters globally.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">
            MSE Formula
          </p>
          <div className="bg-white p-4 border border-slate-200 rounded text-center">
            <code className="text-xl font-bold block">
              MSE = 1/n * Σ (y_i - ŷ_i)²
            </code>
            <p className="text-sm text-slate-500 mt-2">
              Where y_i is actual, and ŷ_i is predicted.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg shadow-sm">
          <p className="font-bold text-amber-900 mb-4 text-lg border-b border-amber-200 pb-2 flex items-center">
            <Calculator className="mr-2 w-5 h-5" /> Worked numerical Example
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white border border-amber-200 text-sm">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-3 py-1 font-bold">Actual (y)</th>
                  <th className="px-3 py-1 font-bold">Predicted (ŷ)</th>
                  <th className="px-3 py-1 font-bold">Squared Error</th>
                </tr>
              </thead>
              <tbody className="text-center font-mono">
                <tr>
                  <td className="px-3 py-1 border-b">5</td>
                  <td className="px-3 py-1 border-b">4</td>
                  <td className="px-3 py-1 border-b text-red-600">
                    (5 - 4)² = 1
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-1 border-b">8</td>
                  <td className="px-3 py-1 border-b">10</td>
                  <td className="px-3 py-1 border-b text-red-600">
                    (8 - 10)² = 4
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-1">12</td>
                  <td className="px-3 py-1">11</td>
                  <td className="px-3 py-1 text-red-600">(12 - 11)² = 1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white p-3 rounded border border-amber-200 font-mono text-sm text-slate-800">
            <p className="mb-1 text-slate-500">// Step 2 — Average errors</p>
            <p>MSE = (1 + 4 + 1) / 3</p>
            <p>MSE = 6 / 3</p>
            <p className="font-bold text-amber-900 mt-2 border-t border-amber-100 pt-1">
              MSE = 2
            </p>
          </div>
        </div>
      </div>

      {/* Overfitting & Degree Selection */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <AlertTriangle className="mr-3 text-red-500" /> Overfitting & Choosing
        the Degree
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Choosing the correct polynomial degree is critical. A higher-degree
        polynomial possesses more flexibility, but it risks memorizing the
        training data perfectly while failing on unseen data (overfitting).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col items-center">
          <h4 className="font-bold text-slate-800 mb-1 uppercase tracking-wider text-sm">
            Underfitting
          </h4>
          <div className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded mb-4 font-mono">
            Degree 1 (Straight)
          </div>
          <div className="w-full h-32 relative border border-slate-100 rounded bg-slate-50 overflow-hidden text-slate-400 font-mono flex items-center justify-center">
            <div className="absolute w-full border-t flex-1 border-blue-400 rotate-12"></div>
            ● &nbsp; &nbsp; &nbsp; ● <br /> &nbsp; ● &nbsp; ●
          </div>
          <p className="text-sm mt-3 text-slate-600 text-center">
            Cannot capture the true pattern.
          </p>
        </div>
        <div className="bg-white border-2 border-emerald-400 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h4 className="font-bold text-emerald-800 mb-1 uppercase tracking-wider text-sm">
            Good Fit
          </h4>
          <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded mb-4 font-mono">
            Degree 2 or 3
          </div>
          <div className="w-full h-32 relative border border-emerald-100 rounded bg-emerald-50 overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 100 50"
              className="absolute w-full h-full left-0 top-0 overflow-visible opacity-80"
              stroke="none"
            >
              <path
                d="M 0 50 Q 50 -20 100 50"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            </svg>
            <span className="relative z-10 text-emerald-800 text-xl font-bold opacity-50">
              ● &nbsp; &nbsp; ● &nbsp; &nbsp; &nbsp; ●
            </span>
          </div>
          <p className="text-sm mt-3 text-emerald-700 font-bold text-center">
            Smooth curve follows trend.
          </p>
        </div>
        <div className="bg-white border border-red-300 p-5 rounded-lg shadow-sm flex flex-col items-center">
          <h4 className="font-bold text-red-800 mb-1 uppercase tracking-wider text-sm">
            Overfitting
          </h4>
          <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded mb-4 font-mono">
            Degree 10+
          </div>
          <div className="w-full h-32 relative border border-red-100 rounded bg-red-50 overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 100 50"
              className="absolute w-full h-full left-0 top-0 overflow-visible opacity-80"
              stroke="none"
            >
              <path
                d="M 0 25 Q 10 0 20 25 T 40 25 T 60 25 T 80 25 T 100 25"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />
            </svg>
            <span className="relative z-10 text-red-800 text-xs opacity-50">
              ● ● ● ● ●
            </span>
          </div>
          <p className="text-sm mt-3 text-red-600 text-center">
            Wildly oscillates to touch every point.
          </p>
        </div>
      </div>

      {/* Pros Cons Assumptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 mt-10">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2" /> Advantages
          </h3>
          <div className="overflow-hidden shadow-sm rounded-lg border border-emerald-200">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-4 py-2 text-left">Advantage</th>
                  <th className="px-4 py-2 text-left">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                <tr>
                  <td className="px-4 py-2 font-medium">
                    Captures nonlinear data
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    Better curve fitting
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Flexible</td>
                  <td className="px-4 py-2 text-slate-600">
                    Models complex relationships
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Better accuracy</td>
                  <td className="px-4 py-2 text-slate-600">
                    Improved prediction capability
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Extension of LR</td>
                  <td className="px-4 py-2 text-slate-600">
                    Familiar mathematical foundation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2" /> Disadvantages
          </h3>
          <div className="overflow-hidden shadow-sm rounded-lg border border-red-200">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-4 py-2 text-left">Disadvantage</th>
                  <th className="px-4 py-2 text-left">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                <tr>
                  <td className="px-4 py-2 font-medium">Overfitting risk</td>
                  <td className="px-4 py-2 text-slate-600">
                    High-degree curves memorize data
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">
                    Computationally expensive
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    More features created
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">
                    Sensitive to outliers
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    Extreme values affect curve deeply
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">
                    Harder interpretation
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    Complex coefficients
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assumptions */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <CheckCircle className="mr-3 text-indigo-600" /> Assumptions of
        Polynomial Regression
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Although it accurately models non-linear relations, it fundamentally
        shares the core assumptions of linear regression:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-indigo-100 p-2 rounded-full mt-1">
            <UserCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 mb-1">
              Independent Observations
            </h4>
            <p className="text-sm text-indigo-700">
              Data points must be independent; one sample should not influence
              another.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 p-2 rounded-full mt-1">
            <Layers className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900 mb-1">
              Minimal Multicollinearity
            </h4>
            <p className="text-sm text-emerald-700">
              Features should not be highly correlated. Polynomial expansions
              naturally induce some correlation, requiring caution.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-5 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-2 rounded-full mt-1">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-1">Continuous Target</h4>
            <p className="text-sm text-blue-700">
              The dependent variable must be continuous (predicting continuous
              values, not distinct classes).
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-5 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-amber-100 p-2 rounded-full mt-1">
            <Target className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 mb-1">
              Correct Polynomial Degree
            </h4>
            <p className="text-sm text-amber-700">
              The chosen degree of the polynomial adequately captures the true
              data pattern without overfitting.
            </p>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 p-5 rounded-lg shadow-sm flex items-start gap-4 lg:col-span-2 hover:shadow-md transition-shadow">
          <div className="bg-rose-100 p-2 rounded-full mt-1">
            <Hash className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h4 className="font-bold text-rose-900 mb-1">Random Errors</h4>
            <p className="text-sm text-rose-700">
              The model residuals (errors) should be approximately random,
              maintaining both constant variance (Homoscedasticity) and a normal
              distribution.
            </p>
          </div>
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
              Polynomial Regression Applications
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
                  <span className="font-medium">Stock Trend Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  <span className="font-medium">Revenue Forecasting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{" "}
                  <span className="font-medium">Risk Modeling</span>
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
                  <span className="font-medium">Disease Progression</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>{" "}
                  <span className="font-medium">Drug Response Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>{" "}
                  <span className="font-medium">Medical Forecasting</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-amber-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-amber-100 text-amber-900 font-bold px-4 py-3 border-b border-amber-200">
                Manufacturing
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>{" "}
                  <span className="font-medium">Production Optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>{" "}
                  <span className="font-medium">Quality Prediction</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>{" "}
                  <span className="font-medium">Equipment Failure</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-purple-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-purple-100 text-purple-900 font-bold px-4 py-3 border-b border-purple-200">
                Retail
              </div>
              <ul className="p-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  <span className="font-medium">Sales Forecasting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  <span className="font-medium">Seasonal Demand</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>{" "}
                  <span className="font-medium">Customer Trend Modeling</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border text-left border-teal-200 shadow-sm rounded-lg overflow-hidden lg:col-span-2">
              <div className="bg-teal-100 text-teal-900 font-bold px-4 py-3 border-b border-teal-200">
                Scientific Research
              </div>
              <ul className="p-4 space-y-3 text-slate-700 grid grid-cols-1 md:grid-cols-3">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>{" "}
                  <span className="font-medium">Physics Experiments</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>{" "}
                  <span className="font-medium">Climate Modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>{" "}
                  <span className="font-medium">Biological Growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Python Implementation */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-3 text-indigo-600" /> Implementation of Polynomial
        Regression in Python
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        Polynomial Regression is used when the relationship between the input
        variable and output variable is not perfectly linear. Instead of fitting
        a straight line, polynomial regression fits a curved line to better
        capture complex patterns in the data. In this example, we will build a
        polynomial regression model using Python and compare it with a simple
        linear regression model.
      </p>

      {/* Step 1 & 2 */}
      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-xl text-indigo-800 mb-2">
            Step 1: Import the Required Libraries
          </h3>
          <p className="text-slate-700 m-0 leading-relaxed mb-4">
            First, import the necessary Python libraries for data handling,
            visualization, and machine learning.
          </p>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-4">
            <pre className="!m-0 leading-relaxed">
              <code>{`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures`}</code>
            </pre>
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-slate-200 text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 font-bold text-left text-slate-700">
                    Library
                  </th>
                  <th className="px-4 py-2 font-bold text-left text-slate-700">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-2 font-mono text-slate-800">NumPy</td>
                  <td className="px-4 py-2 text-slate-600">
                    Used for numerical operations
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-slate-800">Pandas</td>
                  <td className="px-4 py-2 text-slate-600">
                    Helps load and manage datasets
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-slate-800">
                    Matplotlib
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    Used for plotting graphs
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-slate-800">
                    LinearRegression
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    Creates the regression model
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-slate-800">
                    PolynomialFeatures
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    Converts normal features into polynomial features
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-bold text-xl text-indigo-800 mb-2 border-t pt-6">
            Step 2: Create and Load the Dataset
          </h3>
          <p className="text-slate-700 m-0 leading-relaxed mb-4">
            Instead of using an external dataset, let us create a custom dataset
            related to study hours and exam scores.
          </p>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-4">
            <pre className="!m-0 leading-relaxed">
              <code>{`data = {
    'Study_Hours': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'Exam_Score': [45, 50, 54, 60, 68, 78, 85, 91, 96, 98]
}

df = pd.DataFrame(data)

print(df)`}</code>
            </pre>
          </div>
          <div className="bg-slate-100 border-l-4 border-slate-400 p-4 rounded text-sm font-mono mb-4 text-slate-700 whitespace-pre">
            {`Sample Output
   Study_Hours  Exam_Score
0            1          45
1            2          50
2            3          54
3            4          60
4            5          68
...`}
          </div>
          <p className="text-sm text-slate-600">
            <span className="font-mono text-indigo-700 font-bold">
              Study_Hours
            </span>{" "}
            → Independent variable (X)
            <br />
            <span className="font-mono text-indigo-700 font-bold">
              Exam_Score
            </span>{" "}
            → Dependent variable (Y)
          </p>
        </div>
      </div>

      {/* Step 3, 4 & 5 */}
      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-xl text-indigo-800 mb-2">
            Step 3: Separate Features and Target Variables
          </h3>
          <p className="text-slate-700 m-0 leading-relaxed mb-4">
            Now split the dataset into input and output variables.
          </p>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-2">
            <pre className="!m-0 leading-relaxed">
              <code>{`X = df[['Study_Hours']].values
y = df['Exam_Score'].values`}</code>
            </pre>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Here, <code>X</code> stores the feature values and <code>y</code>{" "}
            stores the target values.
          </p>

          <h3 className="font-bold text-xl text-indigo-800 mb-2 border-t pt-6">
            Step 4: Train the Linear Regression Model
          </h3>
          <p className="text-slate-700 m-0 leading-relaxed mb-4">
            Before applying polynomial regression, first fit a simple linear
            regression model.
          </p>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-2">
            <pre className="!m-0 leading-relaxed">
              <code>{`linear_model = LinearRegression()
linear_model.fit(X, y)`}</code>
            </pre>
          </div>
          <p className="text-sm text-slate-600 mb-6 italic">
            The model learns the relationship between study hours and exam
            scores using a straight line.
          </p>

          <h3 className="font-bold text-xl text-indigo-800 mb-2 border-t pt-6">
            Step 5: Create and Train the Polynomial Regression Model
          </h3>
          <p className="text-slate-700 m-0 leading-relaxed mb-4">
            Now transform the input data into polynomial features and train
            another regression model.
          </p>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-4">
            <pre className="!m-0 leading-relaxed">
              <code>{`poly_features = PolynomialFeatures(degree=3)

X_poly = poly_features.fit_transform(X)

poly_model = LinearRegression()

poly_model.fit(X_poly, y)`}</code>
            </pre>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded">
            <p className="font-bold text-indigo-900 mb-2">
              Why Polynomial Features?
            </p>
            <ul className="text-sm text-slate-700 mb-2 list-disc list-inside space-y-1">
              <li>
                Polynomial regression creates additional feature columns such as{" "}
                <code>X²</code>, <code>X³</code>, and higher-order terms.
              </li>
              <li>
                These extra features help the model capture curved relationships
                in the data.
              </li>
              <li>
                In this example, <code>degree=3</code> means the model will
                learn cubic relationships.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 6 & 7 Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex-1">
            <h3 className="font-bold text-xl text-indigo-800 mb-2">
              Step 6: Visualize Linear Model
            </h3>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-xs font-mono overflow-x-auto border border-slate-800 mb-4">
              <pre className="!m-0 leading-relaxed">
                <code>{`plt.scatter(X, y, color='blue')
plt.plot(X, linear_model.predict(X), color='red')
plt.title('Linear Regression Model')
plt.xlabel('Study Hours')
plt.ylabel('Exam Score')
plt.show()`}</code>
              </pre>
            </div>
            <div className="h-[250px] w-full bg-white border border-slate-200 rounded p-4 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={studyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                  <XAxis
                    dataKey="hours"
                    type="number"
                    domain={[0, 11]}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis domain={[30, 110]} tick={{ fontSize: 12 }} />
                  <Scatter dataKey="score" fill="#2563eb" name="Actual Score" />
                  <Line
                    type="linear"
                    dataKey="linearScore"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="Linear Fit"
                  />
                  <RechartsTooltip />
                </ComposedChart>
              </ResponsiveContainer>
              <p className="text-center text-xs font-bold text-slate-600 mt-2">
                Linear Regression Model
              </p>
            </div>
            <p className="text-sm text-slate-700 font-bold mb-1">
              Explanation:
            </p>
            <p className="text-sm text-slate-600">
              Blue dots represent the actual data points. The red line
              represents predictions from linear regression. Since linear
              regression uses a straight line, it may not perfectly fit all
              points if the data follows a curve.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex-1">
            <h3 className="font-bold text-xl text-indigo-800 mb-2">
              Step 7: Visualize Polynomial Model
            </h3>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-xs font-mono overflow-x-auto border border-slate-800 mb-4">
              <pre className="!m-0 leading-relaxed">
                <code>{`plt.scatter(X, y, color='blue')
plt.plot(X,
    poly_model.predict(poly_features.fit_transform(X)),
    color='red')
plt.title('Polynomial Regression Model')
plt.xlabel('Study Hours')
plt.ylabel('Exam Score')
plt.show()`}</code>
              </pre>
            </div>
            <div className="h-[250px] w-full bg-white border border-slate-200 rounded p-4 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={studyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                  <XAxis
                    dataKey="hours"
                    type="number"
                    domain={[0, 11]}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis domain={[30, 110]} tick={{ fontSize: 12 }} />
                  <Scatter dataKey="score" fill="#2563eb" name="Actual Score" />
                  <Line
                    type="monotone"
                    dataKey="polyScore"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="Polynomial Fit"
                  />
                  <RechartsTooltip />
                </ComposedChart>
              </ResponsiveContainer>
              <p className="text-center text-xs font-bold text-slate-600 mt-2">
                Polynomial Regression Model
              </p>
            </div>
            <p className="text-sm text-slate-700 font-bold mb-1">
              Explanation:
            </p>
            <p className="text-sm text-slate-600">
              The polynomial curve bends according to the data pattern. This
              often produces more accurate predictions for non-linear datasets
              compared to the rigid straight line.
            </p>
          </div>
        </div>
      </div>

      {/* Step 8 & Complete Code */}
      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-12">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h3 className="font-bold text-xl text-indigo-800 mb-2">
            Step 8: Predict New Values
          </h3>
          <p className="text-slate-700 m-0 leading-relaxed mb-4">
            Let us predict the exam score for a student who studies for 7.5
            hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-blue-200 rounded-lg p-4 bg-white">
              <p className="font-bold text-blue-800 text-sm mb-2 uppercase tracking-wider">
                Linear Prediction
              </p>
              <div className="bg-[#1e1e1e] text-[#d4d4d4] p-3 rounded text-xs font-mono overflow-x-auto border border-slate-800 mb-3">
                <pre className="!m-0">
                  <code>{`new_value = np.array([[7.5]])
linear_prediction = linear_model.predict(new_value)
print(linear_prediction)`}</code>
                </pre>
              </div>
              <div className="bg-slate-100 border-l-4 border-slate-400 p-2 rounded text-xs font-mono text-slate-700">
                [83.4]
              </div>
            </div>
            <div className="border border-emerald-200 rounded-lg p-4 bg-white">
              <p className="font-bold text-emerald-800 text-sm mb-2 uppercase tracking-wider">
                Polynomial Prediction
              </p>
              <div className="bg-[#1e1e1e] text-[#d4d4d4] p-3 rounded text-xs font-mono overflow-x-auto border border-slate-800 mb-3">
                <pre className="!m-0">
                  <code>{`poly_prediction = poly_model.predict(
    poly_features.fit_transform(new_value)
)
print(poly_prediction)`}</code>
                </pre>
              </div>
              <div className="bg-slate-100 border-l-4 border-slate-400 p-2 rounded text-xs font-mono text-slate-700">
                [87.2]
              </div>
            </div>
          </div>

          <p className="text-slate-700 bg-amber-50 p-3 rounded border border-amber-200 italic shadow-sm mb-8">
            The polynomial regression model may provide a more realistic
            prediction (87.2) if the relationship between variables is curved
            rather than perfectly straight (83.4).
          </p>

          <h3 className="font-bold text-xl text-indigo-800 mb-4 border-t pt-6 text-center">
            Complete Python Code
          </h3>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-lg text-sm font-mono overflow-x-auto border border-slate-800 mb-0 shadow-lg h-96 overflow-y-auto w-full mx-auto max-w-4xl">
            <pre className="!m-0 leading-relaxed">
              <code>{`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

# 1. Create Dataset
data = {
    'Study_Hours': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'Exam_Score': [45, 50, 54, 60, 68, 78, 85, 91, 96, 98]
}

df = pd.DataFrame(data)

# 2. Features and Target
X = df[['Study_Hours']].values
y = df['Exam_Score'].values

# 3. Linear Regression Model Training
linear_model = LinearRegression()
linear_model.fit(X, y)

# 4. Polynomial Feature Expansion & Model Training
poly_features = PolynomialFeatures(degree=3)
X_poly = poly_features.fit_transform(X)

poly_model = LinearRegression()
poly_model.fit(X_poly, y)

# 5. Linear Regression Plot
plt.scatter(X, y, color='blue')
plt.plot(X, linear_model.predict(X), color='red')
plt.title('Linear Regression Model')
plt.xlabel('Study Hours')
plt.ylabel('Exam Score')
plt.show()

# 6. Polynomial Regression Plot
plt.scatter(X, y, color='blue')
plt.plot(X, poly_model.predict(poly_features.fit_transform(X)), color='red')
plt.title('Polynomial Regression Model')
plt.xlabel('Study Hours')
plt.ylabel('Exam Score')
plt.show()

# 7. Make Predictions
new_value = np.array([[7.5]])
linear_prediction = linear_model.predict(new_value)
poly_prediction = poly_model.predict(poly_features.fit_transform(new_value))

print("Linear Regression Prediction:", linear_prediction)
print("Polynomial Regression Prediction:", poly_prediction)`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Evaluation Metrics */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Evaluation Metrics
      </h2>
      <p className="text-slate-700 mb-6">
        Polynomial Regression uses standard regression metrics to tell how well
        our curve fits the data:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-indigo-900 mb-2">
            1. Mean Absolute Error (MAE)
          </h4>
          <div className="bg-white p-2 rounded border border-indigo-200 font-mono text-center text-sm shadow-inner mt-2">
            MAE = 1/n * Σ |y_i - ŷ_i|
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Average of absolute error magnitudes.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-emerald-900 mb-2">
            2. Root Mean Squared Error (RMSE)
          </h4>
          <div className="bg-white p-2 rounded border border-emerald-200 font-mono text-center text-sm shadow-inner mt-2">
            RMSE = √[1/n * Σ (y_i - ŷ_i)²]
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Heavily penalizes very large errors (outliers).
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-5 rounded-lg shadow-sm">
          <h4 className="font-bold text-amber-900 mb-2">3. R² Score</h4>
          <div className="bg-white p-2 rounded border border-amber-200 font-mono text-center text-sm shadow-inner mt-2">
            R² = 1 - (SS_res / SS_tot)
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Variance explained. 1.0 is perfect fit. 0.0 is predicting the mean.
          </p>
        </div>
      </div>

      {/* Algorithm Comparison Table */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800">
        Polynomial vs Other Algorithms
      </h2>
      <div className="overflow-x-auto shadow-sm rounded-lg mb-10 border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Algorithm
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Relationship Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Complexity
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Interpretability
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {[
              { algo: "Linear Regression", r: "Linear", c: "Low", i: "High" },
              {
                algo: "Polynomial Regression",
                r: "Nonlinear",
                c: "Medium",
                i: "Medium",
              },
              {
                algo: "Decision Tree",
                r: "Nonlinear",
                c: "Medium",
                i: "Medium",
              },
              { algo: "Random Forest", r: "Nonlinear", c: "High", i: "Low" },
              {
                algo: "Neural Networks",
                r: "Highly nonlinear",
                c: "Very High",
                i: "Low",
              },
            ].map((row, i) => (
              <tr
                key={i}
                className={
                  row.algo === "Polynomial Regression"
                    ? "bg-indigo-50 font-medium"
                    : "bg-white"
                }
              >
                <td className="px-6 py-4 text-slate-900 font-medium">
                  {row.algo}
                </td>
                <td className="px-6 py-4 text-slate-600">{row.r}</td>
                <td className="px-6 py-4 text-slate-600">{row.c}</td>
                <td className="px-6 py-4 text-slate-600">{row.i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Final Summary */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Polynomial Regression is a powerful extension of Linear Regression designed to model nonlinear relationships. It expands features and fits a curve rather than a straight line.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        By increasing the polynomial degree, the model becomes more flexible. However, this flexibility comes with a trade-off: models that are too complex will overfit the data and fail to generalize well. Best practices suggest normalizing features, monitoring validation error, and selecting the optimal degree using cross-validation.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Polynomial Regression doesn't change the underlying linear regression algorithm; it intelligently transforms the input features to let a linear model fit deeply nonlinear curves."
         </p>
      </div>
    </>
  );
}
