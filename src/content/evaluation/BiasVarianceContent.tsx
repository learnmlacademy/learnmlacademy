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
        The Bias-Variance Tradeoff is a core idea in machine learning. It helps us understand why a model can be too simple, too sensitive to its training data, or balanced enough to work well on new data.
      </p>

      {/* Beginner-first explanation */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Bias-Variance in Simple Words
        </h2>
        <p className="text-lg text-slate-700 mb-5">
          Imagine three students preparing for the same exam. One studies too little, one memorizes only the exact practice questions, and one understands the concepts. Machine-learning models can behave in a similar way.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-rose-200 rounded-lg p-5">
            <p className="font-bold text-rose-800 text-lg mb-2">Too Simple</p>
            <p className="text-slate-700 mb-3">Misses important patterns.</p>
            <div className="text-center bg-rose-50 rounded-md py-3 font-semibold text-rose-900">
              High Bias → Underfitting
            </div>
          </div>
          <div className="bg-white border border-emerald-200 rounded-lg p-5">
            <p className="font-bold text-emerald-800 text-lg mb-2">Balanced</p>
            <p className="text-slate-700 mb-3">Learns the useful pattern without chasing every detail.</p>
            <div className="text-center bg-emerald-50 rounded-md py-3 font-semibold text-emerald-900">
              Good Generalization
            </div>
          </div>
          <div className="bg-white border border-amber-200 rounded-lg p-5">
            <p className="font-bold text-amber-800 text-lg mb-2">Too Sensitive</p>
            <p className="text-slate-700 mb-3">Fits small details and noise in the training data.</p>
            <div className="text-center bg-amber-50 rounded-md py-3 font-semibold text-amber-900">
              High Variance → Overfitting
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 bg-white text-base">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-200 px-4 py-3 text-left">Model</th>
                <th className="border border-slate-200 px-4 py-3 text-left">Training Data</th>
                <th className="border border-slate-200 px-4 py-3 text-left">New Data</th>
                <th className="border border-slate-200 px-4 py-3 text-left">Likely Problem</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 px-4 py-3 font-medium">Too simple</td>
                <td className="border border-slate-200 px-4 py-3">Poor</td>
                <td className="border border-slate-200 px-4 py-3">Poor</td>
                <td className="border border-slate-200 px-4 py-3">High bias / underfitting</td>
              </tr>
              <tr>
                <td className="border border-slate-200 px-4 py-3 font-medium">Balanced</td>
                <td className="border border-slate-200 px-4 py-3">Good</td>
                <td className="border border-slate-200 px-4 py-3">Good</td>
                <td className="border border-slate-200 px-4 py-3">Good generalization</td>
              </tr>
              <tr>
                <td className="border border-slate-200 px-4 py-3 font-medium">Too complex</td>
                <td className="border border-slate-200 px-4 py-3">Very good</td>
                <td className="border border-slate-200 px-4 py-3">Can be much worse</td>
                <td className="border border-slate-200 px-4 py-3">High variance / overfitting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

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
        This student analogy is not a mathematical definition, but it gives a useful first picture of underfitting, overfitting, and generalization.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* What is Bias */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">What is Bias?</h2>

      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        In simple terms, high bias means the model makes assumptions that are too simple to capture an important pattern in the data.
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
        Variance describes how much a model's predictions can change when the training data changes. High variance often means the model is too sensitive to the particular examples it saw.
      </p>

      <p className="text-lg font-medium text-slate-800 mb-2">
        A high-variance model:
      </p>
      <ul className="list-disc pl-8 space-y-2 text-lg text-slate-700 mb-6">
        <li>May learn noise</li>
        <li>May fit noise or unimportant details</li>
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
        The Bias-Variance Tradeoff describes how changing model flexibility can change two kinds of error. Very simple models can miss the real pattern, while very flexible models can become too sensitive to the particular training sample.
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
        The practical goal is to choose a model that performs well on unseen data — not simply the model with the lowest training error.
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
          In this teaching illustration, the best region is where the total expected error is lowest.
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

      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        For squared-error regression, the expected prediction error is commonly explained using this decomposition:
      </p>

      <div className="flex justify-center mb-4">
        <div className="bg-white border border-slate-300 shadow-sm p-4 rounded-xl text-center overflow-x-auto">
          <p className="font-mono text-xl md:text-2xl text-slate-800 font-bold whitespace-nowrap">
            Expected Squared Error ≈ Bias² + Variance + Irreducible Noise
          </p>
        </div>
      </div>

      <p className="text-base md:text-lg text-slate-600 mb-8">
        This is a useful way to understand the tradeoff. It is not a universal formula for every possible loss function or machine-learning problem.
      </p>

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

      <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-5 pr-5 rounded-r-md mb-12">
        <h3 className="font-bold text-xl mb-3 flex items-center text-sky-900">
          <Calculator className="mr-2" /> Worked Numerical Example
        </h3>
        <p className="text-lg text-sky-800 mb-4">
          Suppose a simple squared-error decomposition gives:
        </p>

        <div className="overflow-x-auto mb-5">
          <table className="min-w-full bg-white border border-sky-200 text-base">
            <tbody>
              <tr>
                <td className="border border-sky-200 px-4 py-2 font-medium">Bias²</td>
                <td className="border border-sky-200 px-4 py-2">4</td>
                <td className="border border-sky-200 px-4 py-2">Systematic error from the model's simplifying assumptions</td>
              </tr>
              <tr>
                <td className="border border-sky-200 px-4 py-2 font-medium">Variance</td>
                <td className="border border-sky-200 px-4 py-2">3</td>
                <td className="border border-sky-200 px-4 py-2">Sensitivity to changes in the training sample</td>
              </tr>
              <tr>
                <td className="border border-sky-200 px-4 py-2 font-medium">Irreducible noise</td>
                <td className="border border-sky-200 px-4 py-2">2</td>
                <td className="border border-sky-200 px-4 py-2">Random variation the model cannot fully remove</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 text-lg text-sky-900">
          <div className="bg-white border border-sky-200 rounded-lg p-4">
            <p className="font-bold mb-1">Step 1 — Write the three parts</p>
            <p className="font-mono">Error ≈ 4 + 3 + 2</p>
            <p className="text-sky-800 mt-1">We substitute the given Bias², Variance and noise values.</p>
          </div>
          <div className="bg-white border border-sky-200 rounded-lg p-4">
            <p className="font-bold mb-1">Step 2 — Add Bias² and Variance</p>
            <p className="font-mono">4 + 3 = 7</p>
            <p className="text-sky-800 mt-1">These are the two parts we try to balance when choosing model complexity.</p>
          </div>
          <div className="bg-white border border-sky-200 rounded-lg p-4">
            <p className="font-bold mb-1">Step 3 — Add irreducible noise</p>
            <p className="font-mono">7 + 2 = 9</p>
            <p className="text-sky-800 mt-1">So the expected squared error in this simplified example is about <strong>9</strong>.</p>
          </div>
        </div>
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
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        Bias and Variance in Different Algorithms
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        The table below shows <strong>common tendencies</strong>, not permanent labels. Bias and variance depend on model settings, data size, regularization, feature quality, and the problem itself.
      </p>
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
            <td className="px-6 py-4 text-slate-700 font-medium">Can be higher if the true pattern is strongly non-linear</td>
            <td className="px-6 py-4 text-slate-700 font-medium">Often relatively low</td>
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
            <td className="px-6 py-4 text-slate-700 font-medium">Often lower when trees are deep</td>
            <td className="px-6 py-4 text-slate-700 font-medium">Can be high for deep, unpruned trees</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-800">
              Random Forest
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">Depends on tree settings</td>
            <td className="px-6 py-4 text-slate-700 font-medium">Usually lower than a single deep tree</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-800">
              Neural Networks
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">Can fit very complex patterns</td>
            <td className="px-6 py-4 text-slate-700 font-medium">Can overfit without enough data or regularization</td>
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
        Underfitting occurs when a model is not flexible enough, not trained enough, or does not have enough useful information to capture the important pattern.
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
            <li>Train longer if optimization has not yet converged</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Understanding Overfitting */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Understanding Overfitting
      </h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Overfitting occurs when a model fits the training data so closely that some of what it learns does not generalize well to new data.
      </p>

      <ul className="list-disc pl-8 space-y-2 text-lg text-slate-700 mb-8">
        <li>Excellent training accuracy</li>
        <li>Poor testing accuracy</li>
        <li>May fit noise or accidental details</li>
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
            <li>Remove unhelpful features when appropriate</li>
            <li>Use more representative training data when available</li>
            <li>Use cross-validation</li>
            <li>Simplify the model</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Diagnose from training and validation performance */}
      <h2 className="text-3xl font-bold text-slate-800 mb-5">
        How Can You Recognize High Bias or High Variance?
      </h2>
      <p className="text-lg text-slate-700 mb-5">
        A practical first check is to compare performance on the training set with performance on validation data.
      </p>

      <div className="overflow-x-auto mb-5">
        <table className="min-w-full divide-y divide-slate-200 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left font-bold text-slate-700">Training Error</th>
              <th className="px-5 py-3 text-left font-bold text-slate-700">Validation Error</th>
              <th className="px-5 py-3 text-left font-bold text-slate-700">What It May Suggest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-base md:text-lg">
            <tr>
              <td className="px-5 py-4">High</td>
              <td className="px-5 py-4">High</td>
              <td className="px-5 py-4">Possible underfitting / high bias</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-5 py-4">Low</td>
              <td className="px-5 py-4">Much higher</td>
              <td className="px-5 py-4">Possible overfitting / high variance</td>
            </tr>
            <tr>
              <td className="px-5 py-4">Low</td>
              <td className="px-5 py-4">Low and close to training error</td>
              <td className="px-5 py-4">Better sign of generalization</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-amber-900 mb-2">Important:</p>
        <p className="text-amber-900">
          These are clues, not automatic diagnoses. Always consider the metric, dataset size, noise, class balance, and whether the validation data truly represents the problem.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Bias-Variance in Deep Learning & Cross-Validation */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Cross-Validation & Deep Learning
      </h2>

      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Cross-validation helps estimate how a model may perform on unseen data and compare model or hyperparameter choices more reliably. Comparing training performance with validation performance can also provide clues about underfitting or overfitting.
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
        Deep neural networks are highly flexible models. They can achieve very low training error, but they can still overfit when the dataset, regularization, or training setup is not appropriate.
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

# Step 5 - A very high degree can overfit a small dataset
poly10 = PolynomialFeatures(degree=10)`}</code>
        </pre>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Common Questions About Bias and Variance
      </h2>

      <div className="space-y-5 mb-10">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h3 className="font-bold text-xl text-slate-800 mb-2">
            Is high bias the same as underfitting?
          </h3>
          <p className="text-lg text-slate-700">
            They are closely related, but not identical definitions. High bias often leads to underfitting because the model cannot capture enough of the true pattern.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h3 className="font-bold text-xl text-slate-800 mb-2">
            Is high variance the same as overfitting?
          </h3>
          <p className="text-lg text-slate-700">
            High variance is commonly associated with overfitting: the model changes too much with the training sample and may perform much worse on new data.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h3 className="font-bold text-xl text-slate-800 mb-2">
            Does a more complex model always have lower bias and higher variance?
          </h3>
          <p className="text-lg text-slate-700">
            It is a useful general tendency, not a guaranteed rule. Regularization, data size, model architecture, and training procedure can change the behavior.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-12">
        <p className="font-bold text-indigo-900 mb-3">Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/overfitting-underfitting" className="text-indigo-700 underline font-medium">
            Overfitting &amp; Underfitting
          </a>
          <a href="/learn/cross-validation" className="text-indigo-700 underline font-medium">
            Cross-Validation
          </a>
          <a href="/learn/ridge-regression" className="text-indigo-700 underline font-medium">
            Ridge Regression
          </a>
          <a href="/learn/lasso-regression" className="text-indigo-700 underline font-medium">
            Lasso Regression
          </a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BookOpen className="mr-3 text-indigo-400" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The Bias-Variance Tradeoff helps explain why both overly simple and overly flexible models can perform poorly on unseen data. High bias is commonly associated with underfitting, while high variance is commonly associated with overfitting.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        In practice, we compare training and validation performance, use cross-validation where appropriate, and tune model complexity or regularization to find a model that generalizes well.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Very low training error is not enough. A useful model must also perform well on representative data it did not train on."
         </p>
      </div>

    </>
  );
}
