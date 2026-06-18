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
  Area,
  AreaChart,
  LineChart,
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
  GitBranch,
} from "lucide-react";
import { BiasVarianceDiagram } from "../../components/diagrams/MLDiagrams";

const biasVarianceCurve = [
  { complexity: 1, bias: 80, variance: 10, totalError: 90 },
  { complexity: 2, bias: 65, variance: 12, totalError: 77 },
  { complexity: 3, bias: 50, variance: 18, totalError: 68 },
  { complexity: 4, bias: 38, variance: 25, totalError: 63 },
  { complexity: 5, bias: 28, variance: 35, totalError: 63 },
  { complexity: 6, bias: 20, variance: 48, totalError: 68 },
  { complexity: 7, bias: 15, variance: 65, totalError: 80 },
  { complexity: 8, bias: 10, variance: 85, totalError: 95 },
  { complexity: 9, bias: 8, variance: 110, totalError: 118 },
];

const highBiasData = [
  { x: 1, actual: 4, prediction: 10 },
  { x: 2, actual: 9, prediction: 12 },
  { x: 3, actual: 16, prediction: 14 },
  { x: 4, actual: 21, prediction: 16 },
  { x: 5, actual: 22, prediction: 18 },
  { x: 6, actual: 18, prediction: 20 },
  { x: 7, actual: 11, prediction: 22 },
];

const highVarianceData = [
  { x: 1, actual: 4, prediction: 4 },
  { x: 1.5, prediction: -2 },
  { x: 2, actual: 9, prediction: 9 },
  { x: 2.5, prediction: 20 },
  { x: 3, actual: 16, prediction: 16 },
  { x: 3.5, prediction: 10 },
  { x: 4, actual: 21, prediction: 21 },
  { x: 4.5, prediction: 28 },
  { x: 5, actual: 22, prediction: 22 },
  { x: 5.5, prediction: 12 },
  { x: 6, actual: 18, prediction: 18 },
  { x: 6.5, prediction: -2 },
  { x: 7, actual: 11, prediction: 11 },
];

export function BiasVarianceContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Bias-Variance Tradeoff</h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-700 font-medium">
        The Bias-Variance Tradeoff is a core concept that affects almost every machine learning algorithm — from Linear Regression to Deep Learning.</p>
      <BiasVarianceDiagram />

      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Understanding this concept helps answer critical questions like:
      </p>

      <ul className="list-disc pl-8 space-y-2 text-lg text-slate-700 mb-6">
        <li>Why do some models overfit?</li>
        <li>Why do some models underfit?</li>
        <li>How do we improve prediction accuracy?</li>
        <li>Why does model complexity matter?</li>
        <li>How do regularization techniques work?</li>
      </ul>

      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-10">
        <p className="text-lg text-indigo-900 font-medium mb-3">
          The Bias-Variance Tradeoff explains the balance between:
        </p>
        <div className="flex items-center justify-center space-x-6 text-xl font-bold text-indigo-800 my-4">
          <span>Learning too little</span>
          <span className="text-slate-400">vs</span>
          <span>Learning too much</span>
        </div>
        <p className="text-lg text-indigo-800 italic">
          This balance determines how well a machine learning model performs on
          unseen data.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Real-World Intuition */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Real-World Intuition
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-slate-700 italic">
        Imagine a student preparing for exams.
      </p>

      <div className="space-y-6 mb-10">
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
            <h3 className="text-2xl font-bold text-rose-800 flex items-center">
              <AlertTriangle className="mr-3" /> Case 1 — Student Studies Very
              Little
            </h3>
            <span className="bg-rose-200 text-rose-900 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest whitespace-nowrap self-start md:self-auto shadow-sm">
              High Bias
            </span>
          </div>
          <p className="text-lg text-rose-900 mb-2 font-medium">The student:</p>
          <ul className="list-disc pl-8 space-y-2 text-lg text-rose-800">
            <li>Does not understand concepts</li>
            <li>Makes many mistakes</li>
            <li>Performs poorly everywhere</li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
            <h3 className="text-2xl font-bold text-amber-800 flex items-center">
              <Activity className="mr-3" /> Case 2 — Student Memorizes Entire
              Book
            </h3>
            <span className="bg-amber-200 text-amber-900 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest whitespace-nowrap self-start md:self-auto shadow-sm">
              High Variance
            </span>
          </div>
          <p className="text-lg text-amber-900 mb-2 font-medium">
            The student:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-lg text-amber-800">
            <li>Memorizes exact questions</li>
            <li>Cannot handle new questions</li>
            <li>Panics when pattern changes</li>
          </ul>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
            <h3 className="text-2xl font-bold text-emerald-800 flex items-center">
              <CheckCircle className="mr-3" /> Case 3 — Balanced Understanding
            </h3>
            <span className="bg-emerald-200 text-emerald-900 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest whitespace-nowrap self-start md:self-auto shadow-sm">
              Good Generalization
            </span>
          </div>
          <p className="text-lg text-emerald-900 mb-2 font-medium">
            The student:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-lg text-emerald-800">
            <li>Understands concepts</li>
            <li>Solves unseen problems</li>
            <li>Performs consistently</li>
          </ul>
        </div>
      </div>

      <p className="text-xl font-medium text-slate-800 mb-10 text-center bg-slate-50 border border-slate-200 py-4 rounded shadow-sm">
        Machine learning models behave exactly the same way.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* What is Bias */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">What is Bias?</h2>

      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Bias measures how much a model oversimplifies the problem.
      </p>

      <p className="text-lg font-medium text-slate-800 mb-2">
        A high-bias model:
      </p>
      <ul className="list-disc pl-8 space-y-2 text-lg text-slate-700 mb-6">
        <li>Makes strong assumptions</li>
        <li>Learns too little</li>
        <li>Misses important patterns</li>
        <li>Produces systematic errors</li>
      </ul>

      <div className="bg-white border border-rose-200 p-6 rounded-lg mb-8 shadow-sm">
        <h3 className="text-xl font-bold text-rose-800 mb-2">
          Simple Definition
        </h3>
        <p className="text-lg font-mono text-rose-900 bg-rose-50 p-3 rounded inline-block">
          Bias = Error due to overly simple assumptions
        </p>
      </div>

      <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-4 pr-4 rounded-r-md mb-10">
        <h4 className="font-bold text-lg mb-3 text-slate-800">
          High Bias Model Visualization
        </h4>
        <div className="h-64 w-full bg-white rounded border border-slate-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={highBiasData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="x" type="number" hide />
              <YAxis domain={[-5, 30]} hide />
              <RechartsTooltip />
              <Legend />
              <Scatter name="Actual Data" dataKey="actual" fill="#3b82f6" />
              <Line
                type="monotone"
                dataKey="prediction"
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
                name="High Bias Prediction"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Characteristics of High Bias
      </h3>
      <table className="min-w-full divide-y divide-slate-200 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden mb-12">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-slate-500 uppercase">
              Property
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-slate-500 uppercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-lg">
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Model complexity
            </td>
            <td className="px-6 py-4 text-slate-600">Very low</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Learning ability
            </td>
            <td className="px-6 py-4 text-slate-600">Weak</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Training accuracy
            </td>
            <td className="px-6 py-4 text-slate-600 text-rose-600 font-medium">
              Poor
            </td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Testing accuracy
            </td>
            <td className="px-6 py-4 text-slate-600 text-rose-600 font-medium">
              Poor
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-slate-800">Problem</td>
            <td className="px-6 py-4 font-bold text-rose-600">Underfitting</td>
          </tr>
        </tbody>
      </table>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* What is Variance */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        What is Variance?
      </h2>

      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Variance measures how sensitive a model is to training data.
      </p>

      <p className="text-lg font-medium text-slate-800 mb-2">
        A high-variance model:
      </p>
      <ul className="list-disc pl-8 space-y-2 text-lg text-slate-700 mb-6">
        <li>Learns noise</li>
        <li>Memorizes data</li>
        <li>Changes drastically with small dataset changes</li>
        <li>Performs poorly on unseen data</li>
      </ul>

      <div className="bg-white border border-amber-200 p-6 rounded-lg mb-8 shadow-sm">
        <h3 className="text-xl font-bold text-amber-800 mb-2">
          Simple Definition
        </h3>
        <p className="text-lg font-mono text-amber-900 bg-amber-50 p-3 rounded inline-block">
          Variance = Error due to excessive sensitivity
        </p>
      </div>

      <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-4 pr-4 rounded-r-md mb-10">
        <h4 className="font-bold text-lg mb-3 text-slate-800">
          High Variance Visualization
        </h4>
        <div className="h-64 w-full bg-white rounded border border-slate-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={highVarianceData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="x" type="number" domain={[1, 7]} hide />
              <YAxis domain={[-5, 30]} hide />
              <RechartsTooltip />
              <Legend />
              <Scatter name="Actual Data" dataKey="actual" fill="#3b82f6" />
              <Line
                type="linear"
                dataKey="prediction"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={false}
                name="High Variance Model"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Characteristics of High Variance
      </h3>
      <table className="min-w-full divide-y divide-slate-200 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden mb-12">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-slate-500 uppercase">
              Property
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-slate-500 uppercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-lg">
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Model complexity
            </td>
            <td className="px-6 py-4 text-slate-600">Very high</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Memorization
            </td>
            <td className="px-6 py-4 text-slate-600">High</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Training accuracy
            </td>
            <td className="px-6 py-4 text-slate-600 text-emerald-600 font-medium">
              Extremely high
            </td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Testing accuracy
            </td>
            <td className="px-6 py-4 text-slate-600 text-rose-600 font-medium">
              Poor
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-slate-800">Problem</td>
            <td className="px-6 py-4 font-bold text-amber-600">Overfitting</td>
          </tr>
        </tbody>
      </table>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* What is the Bias-Variance Tradeoff */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        What is the Bias-Variance Tradeoff?
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-slate-700">
        The Bias-Variance Tradeoff is the balance between{" "}
        <strong>Simple Models vs Complex Models</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center">
            <TrendingUp className="mr-2" /> Increasing Model Complexity
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-lg text-indigo-800">
            <li>Reduces bias</li>
            <li>Increases variance</li>
          </ul>
        </div>
        <div className="bg-sky-50 border border-sky-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-sky-900 mb-3 flex items-center">
            <TrendingUp className="mr-2 transform rotate-180" /> Reducing Model
            Complexity
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-lg text-sky-800">
            <li>Increases bias</li>
            <li>Reduces variance</li>
          </ul>
        </div>
      </div>

      <p className="text-xl font-bold text-slate-800 text-center mb-10">
        Machine learning aims to find the optimal balance.
      </p>

      {/* Bias-Variance Curve */}
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Bias-Variance Curve
      </h3>
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm mb-8 w-full max-w-4xl mx-auto">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={biasVarianceCurve}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="complexity"
                label={{
                  value: "Model Complexity",
                  position: "insideBottom",
                  offset: -10,
                }}
              />
              <YAxis
                label={{ value: "Error", angle: -90, position: "insideLeft" }}
              />
              <RechartsTooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="bias"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Bias²"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="variance"
                stroke="#ef4444"
                strokeWidth={3}
                name="Variance"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalError"
                stroke="#8b5cf6"
                strokeWidth={4}
                strokeDasharray="5 5"
                name="Total Error"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-slate-600 mt-4 font-medium italic">
          Optimal model complexity occurs where Total Error reaches its minimum.
        </p>
      </div>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-12">
        <h4 className="font-bold text-xl mb-2 text-emerald-900">
          Key Observation
        </h4>
        <p className="text-lg text-emerald-800">
          As model complexity increases: Bias decreases and Variance increases.
          Optimal performance occurs in the middle.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Mathematical Understanding */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Mathematical Understanding
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-slate-700">
        The total prediction error can be represented as:
      </p>

      <div className="flex justify-center mb-8">
        <div className="bg-white border border-slate-300 shadow-sm p-4 rounded-xl text-center">
          <p className="font-mono text-2xl text-slate-800 font-bold">
            Total Error = Bias² + Variance + Irreducible Error
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4">
        Formula Explanation
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm">
          <h4 className="font-bold text-lg text-blue-700 mb-2">1. Bias²</h4>
          <p className="text-slate-600 text-lg">
            Error caused by oversimplification.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm">
          <h4 className="font-bold text-lg text-red-700 mb-2">2. Variance</h4>
          <p className="text-slate-600 text-lg">
            Error caused by sensitivity to training data.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm">
          <h4 className="font-bold text-lg text-purple-700 mb-2">
            3. Irreducible Error
          </h4>
          <p className="text-slate-600 text-lg">
            Random noise that cannot be removed.
          </p>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-12">
        <h4 className="font-bold text-xl mb-3 flex items-center text-sky-900">
          <Calculator className="mr-2" /> Worked Numerical Example
        </h4>
        <p className="text-lg text-sky-800 mb-2">
          Suppose: Bias² = 4, Variance = 3, Irreducible Error = 2
        </p>
        <p className="text-lg text-sky-800 mb-2">Then:</p>
        <p className="font-mono text-lg text-sky-900 bg-white p-2 rounded inline-block">
          Total Error = 4 + 3 + 2 = 9
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Real-World Example — House Price Prediction */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Real-World Example — House Price Prediction
      </h2>

      <p className="text-lg mb-6 text-slate-700">
        Suppose we want to predict house prices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-rose-800 mb-3">
            High Bias Model
          </h3>
          <p className="text-lg text-rose-700 mb-2 font-bold">Uses only:</p>
          <ul className="list-disc pl-6 text-rose-700 mb-4">
            <li>House Size</li>
          </ul>
          <p className="text-lg text-rose-700 mb-2 font-bold">Ignores:</p>
          <ul className="list-disc pl-6 text-rose-700 mb-4">
            <li>Location</li>
            <li>Bedrooms</li>
            <li>Age</li>
            <li>Amenities</li>
          </ul>
          <p className="text-sm font-bold text-rose-900 uppercase">
            Prediction quality becomes poor.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-amber-800 mb-3">
            High Variance Model
          </h3>
          <p className="text-lg text-amber-700 mb-2 font-bold">Uses:</p>
          <ul className="list-disc pl-6 text-amber-700 mb-4">
            <li>House Size</li>
            <li>Wall Color</li>
            <li>Owner Name</li>
            <li>Door Shape</li>
            <li>Plant Count</li>
          </ul>
          <p className="text-sm font-bold text-amber-900 uppercase">
            Model learns noise and irrelevant patterns.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-emerald-800 mb-3">
            Balanced Model
          </h3>
          <p className="text-lg text-emerald-700 mb-2 font-bold">Uses:</p>
          <ul className="list-disc pl-6 text-emerald-700 mb-4">
            <li>House Size</li>
            <li>Location</li>
            <li>Bedrooms</li>
            <li>Bathrooms</li>
          </ul>
          <p className="text-sm font-bold text-emerald-900 uppercase">
            This creates good generalization.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Bias and Variance in Different Algorithms */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Bias and Variance in Different Algorithms
      </h2>
      <table className="min-w-full divide-y divide-slate-200 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden mb-12">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
              Algorithm
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
              Bias
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase">
              Variance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-lg">
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Linear Regression
            </td>
            <td className="px-6 py-4 text-rose-600 font-bold">High</td>
            <td className="px-6 py-4 text-emerald-600 font-bold">Low</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Polynomial Regression (High Degree)
            </td>
            <td className="px-6 py-4 text-emerald-600 font-bold">Low</td>
            <td className="px-6 py-4 text-rose-600 font-bold">High</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Decision Trees
            </td>
            <td className="px-6 py-4 text-emerald-600 font-bold">Low</td>
            <td className="px-6 py-4 text-rose-600 font-bold">High</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Random Forest
            </td>
            <td className="px-6 py-4 text-amber-600 font-bold">Medium</td>
            <td className="px-6 py-4 text-amber-600 font-bold">Medium</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Neural Networks
            </td>
            <td className="px-6 py-4 text-emerald-600 font-bold">Low</td>
            <td className="px-6 py-4 text-rose-600 font-bold">High</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Ridge Regression
            </td>
            <td className="px-6 py-4 text-slate-600">Slightly Higher</td>
            <td className="px-6 py-4 text-slate-600">Lower</td>
          </tr>
        </tbody>
      </table>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Understanding Underfitting */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Understanding Underfitting
      </h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Underfitting occurs when the model is <strong>too simple</strong>.
      </p>

      <ul className="list-disc pl-8 space-y-2 text-lg text-slate-700 mb-8">
        <li>Fails to learn patterns</li>
        <li>High training error</li>
        <li>High testing error</li>
      </ul>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Causes and Solutions for Underfitting
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded shadow-sm">
          <h4 className="font-bold text-rose-800 mb-3 text-lg">Causes</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Very simple model:</strong> Cannot capture patterns
            </li>
            <li>
              <strong>Too few features:</strong> Missing information
            </li>
            <li>
              <strong>Excessive regularization:</strong> Over-constrained
              learning
            </li>
            <li>
              <strong>Insufficient training:</strong> Weak learning
            </li>
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded shadow-sm">
          <h4 className="font-bold text-emerald-800 mb-3 text-lg">Solutions</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Increase model complexity</li>
            <li>Add features</li>
            <li>Reduce regularization</li>
            <li>Train longer</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Understanding Overfitting */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Understanding Overfitting
      </h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Overfitting occurs when the model{" "}
        <strong>memorizes training data</strong>.
      </p>

      <ul className="list-disc pl-8 space-y-2 text-lg text-slate-700 mb-8">
        <li>Excellent training accuracy</li>
        <li>Poor testing accuracy</li>
        <li>Memorizes noise</li>
        <li>Weak generalization</li>
      </ul>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Causes and Solutions for Overfitting
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded shadow-sm">
          <h4 className="font-bold text-rose-800 mb-3 text-lg">Causes</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Too many features:</strong> Excess complexity
            </li>
            <li>
              <strong>Very powerful model:</strong> Learns noise
            </li>
            <li>
              <strong>Small dataset:</strong> Insufficient examples
            </li>
            <li>
              <strong>Weak regularization:</strong> No complexity control
            </li>
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded shadow-sm">
          <h4 className="font-bold text-emerald-800 mb-3 text-lg">Solutions</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Use regularization</li>
            <li>Reduce features</li>
            <li>Increase training data</li>
            <li>Use cross-validation</li>
            <li>Simplify the model</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Bias-Variance in Deep Learning & Cross-Validation */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Cross-Validation & Deep Learning
      </h2>

      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Cross-validation helps estimate model generalization. It helps identify
        overfitting, underfitting, and the best hyperparameters.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl mb-10 text-center shadow-sm">
        <h4 className="font-bold text-indigo-900 mb-4 text-xl">
          Cross-Validation Workflow
        </h4>
        <div className="text-lg text-indigo-800 uppercase font-mono tracking-widest space-y-2">
          <div>Dataset</div>
          <div className="text-indigo-400">↓</div>
          <div>Split into folds</div>
          <div className="text-indigo-400">↓</div>
          <div>Train multiple times</div>
          <div className="text-indigo-400">↓</div>
          <div>Average performance</div>
          <div className="text-indigo-400">↓</div>
          <div className="font-bold text-indigo-900 bg-white p-2 rounded inline-block">
            Estimate generalization
          </div>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-4 text-slate-700 font-medium">
        Deep Neural Networks usually have: Low Bias, High Variance. Because they
        are extremely powerful models.
      </p>

      <ul className="list-none pl-0 space-y-3 text-lg text-slate-700 mb-12">
        <li className="flex items-center">
          <CheckCircle className="mr-3 text-emerald-500 w-5 h-5" />{" "}
          <strong>Dropout:</strong> Reduce variance
        </li>
        <li className="flex items-center">
          <CheckCircle className="mr-3 text-emerald-500 w-5 h-5" />{" "}
          <strong>Early stopping:</strong> Prevent overfitting
        </li>
        <li className="flex items-center">
          <CheckCircle className="mr-3 text-emerald-500 w-5 h-5" />{" "}
          <strong>Batch normalization:</strong> Stabilize training
        </li>
        <li className="flex items-center">
          <CheckCircle className="mr-3 text-emerald-500 w-5 h-5" />{" "}
          <strong>Data augmentation:</strong> Improve generalization
        </li>
      </ul>

      {/* Python Example */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Code className="mr-3 text-indigo-600" /> Python Example
      </h2>
      <p className="text-lg mb-6 text-slate-700">
        Underfitting vs Overfitting using Scikit-Learn.
      </p>

      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 rounded-xl text-lg font-mono mb-12 overflow-x-auto shadow-sm">
        <pre className="!m-0 leading-relaxed">
          <code>{`import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

X = np.array([1,2,3,4,5,6]).reshape(-1,1)
Y = np.array([1,4,9,16,25,36])

# Step 3 - Low Degree Polynomial -> Underfitting
poly1 = PolynomialFeatures(degree=1)

# Step 4 - Medium Degree Polynomial -> Balanced fitting
poly2 = PolynomialFeatures(degree=2)

# Step 5 - High Degree Polynomial -> Overfitting
poly10 = PolynomialFeatures(degree=10)`}</code>
        </pre>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BookOpen className="mr-3 text-indigo-400" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The Bias-Variance Tradeoff is the fundamental philosophical challenge at the heart of all Machine Learning. It represents the delicate balancing act between building a model that is too simple (High Bias / Underfitting) and building a model that is too complex (High Variance / Overfitting).
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Mastering this tradeoff is essential. The ultimate goal is to find the exact point of model complexity where the total prediction error reaches its absolute minimum, resulting in a model that perfectly captures the underlying trend without memorizing the noise.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "A flawless error rate on training data usually means your model has memorized the answers rather than learning the concepts; true model success is measured entirely by how well it performs on data it has never seen before."
         </p>
      </div>

    </>
  );
}
