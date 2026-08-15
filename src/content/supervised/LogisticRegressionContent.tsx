import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Target,
  Calculator,
  Layers,
  CheckCircle,
  Briefcase,
  Activity,
  ShieldAlert,
  GitBranch,
  RefreshCw,
  BarChart2,
  FileCode,
} from "lucide-react";
import { SigmoidDiagram } from "../../components/diagrams/MLDiagrams";



const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.1, tpr: 0.5 },
  { fpr: 0.2, tpr: 0.75 },
  { fpr: 0.4, tpr: 0.88 },
  { fpr: 0.6, tpr: 0.95 },
  { fpr: 0.8, tpr: 0.98 },
  { fpr: 1, tpr: 1 },
];

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function LogisticRegressionContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Logistic Regression</h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-700 font-medium">
        Logistic Regression is a classification algorithm used to predict categorical outcomes.</p>

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 mb-8 text-white shadow-sm">
        <p className="text-xl font-bold mb-4 flex items-center">
          <Target className="mr-3 text-indigo-200" /> It is used to predict
          categories such as:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-lg text-indigo-50 font-medium">
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Spam or Not
            Spam
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Disease or
            No Disease
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Fraud or
            Legitimate
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Pass or
            Fail
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Customer
            Will Buy or Not Buy
          </li>
        </ul>
      </div>

      <p className="text-lg leading-relaxed text-slate-700 mb-6 italic">
        Logistic Regression is a widely used baseline because it is relatively
        simple, fast to train, and often interpretable. It is used in areas such
        as healthcare, finance, marketing, and cybersecurity.
      </p>

      <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">
          Logistic Regression in Simple Words
        </h2>
        <p className="text-lg text-slate-700 mb-5">
          Think of Logistic Regression as a model that first gives a new example
          a <strong>score</strong>, converts that score into an
          <strong> estimated probability</strong>, and then compares that
          probability with a threshold to choose a class.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 text-center mb-6">
          {['Student Data', 'Score', 'Sigmoid', 'Probability', 'Pass / Fail'].map((step, index) => (
            <React.Fragment key={step}>
              <div className="bg-white border border-sky-200 rounded-lg px-3 py-3 font-bold text-slate-800 flex-1">
                {step}
              </div>
              {index < 4 && (
                <div className="text-sky-500 font-bold" aria-hidden="true">
                  <span className="hidden sm:inline">→</span>
                  <span className="sm:hidden">↓</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="overflow-x-auto mb-5">
          <table className="min-w-full bg-white border border-sky-200 text-center">
            <thead className="bg-sky-100 text-sky-900">
              <tr>
                <th className="p-3 border">Study Hours</th>
                <th className="p-3 border">Attendance</th>
                <th className="p-3 border">Known Result</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr><td className="p-3 border">1</td><td className="p-3 border">55%</td><td className="p-3 border">Fail</td></tr>
              <tr><td className="p-3 border">2</td><td className="p-3 border">65%</td><td className="p-3 border">Fail</td></tr>
              <tr><td className="p-3 border">4</td><td className="p-3 border">82%</td><td className="p-3 border">Pass</td></tr>
              <tr><td className="p-3 border">5</td><td className="p-3 border">90%</td><td className="p-3 border">Pass</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-sky-200 rounded-lg p-4">
          <p className="font-bold text-slate-800 mb-2">A new student arrives.</p>
          <p className="text-slate-700 mb-2">Suppose the trained model estimates:</p>
          <p className="font-mono text-lg text-indigo-700 font-bold mb-2">Probability of Pass = 0.82</p>
          <p className="text-slate-700">
            If our chosen threshold is <strong>0.50</strong>, then 0.82 ≥ 0.50,
            so the model predicts <strong>Pass</strong>. Later in this lesson you
            will see where that probability comes from.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* What is Logistic Regression */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        What is Logistic Regression?
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-slate-700">
        Logistic Regression is a supervised machine learning algorithm used for
        predicting probabilities and classifying data into categories.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
        <h4 className="font-bold text-xl mb-3 flex items-center text-emerald-900">
          Simple Beginner Definition
        </h4>
        <div className="flex flex-col items-center justify-center space-y-3 font-mono text-emerald-800 font-bold bg-white p-6 rounded border border-emerald-200 shadow-sm">
          <span className="bg-emerald-100 px-4 py-2 rounded">INPUT DATA</span>
          <span className="text-emerald-400">↓</span>
          <span className="bg-emerald-200 px-4 py-2 rounded">
            CALCULATE PROBABILITY
          </span>
          <span className="text-emerald-400">↓</span>
          <span className="bg-emerald-300 px-4 py-2 rounded">
            ASSIGN CLASS LABEL
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
            <Briefcase className="mr-3 text-indigo-600" /> Bank Loan (Finance)
          </h3>
          <p className="text-lg text-slate-700 mb-3">
            Suppose a bank wants to predict whether a customer will repay a
            loan. Input features are Salary, Age, Credit Score, and Loan Amount.
          </p>
          <div className="flex justify-center items-center space-x-6 text-xl font-bold text-slate-800 mb-4">
            <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded shadow-sm border border-emerald-200 flex flex-col pt-1">
              <span className="text-sm font-bold opacity-70">YES</span>Will
              Repay
            </span>
            <span className="text-slate-400 italic font-mono text-sm">or</span>
            <span className="bg-rose-100 text-rose-800 px-4 py-2 rounded shadow-sm border border-rose-200 flex flex-col pt-1">
              <span className="text-sm font-bold opacity-70">NO</span>Will Not
              Repay
            </span>
          </div>
          <p className="text-lg text-slate-700 text-center">
            The model learns patterns to{" "}
            <strong>predict the probability of repayment</strong>.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
            <Activity className="mr-3 text-emerald-600" /> Diabetes (Healthcare)
          </h3>
          <p className="text-lg text-slate-700 mb-3">
            Suppose a hospital wants to predict whether a patient has diabetes.
            Input features are Age, BMI, Blood Pressure, and Glucose Level.
          </p>
          <div className="flex justify-center items-center space-x-6 text-xl font-bold text-slate-800 mb-4">
            <span className="bg-rose-100 text-rose-800 px-4 py-2 rounded shadow-sm border border-rose-200 flex flex-col pt-1">
              <span className="text-sm font-bold opacity-70">YES</span>Diabetes
            </span>
            <span className="text-slate-400 italic font-mono text-sm">or</span>
            <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded shadow-sm border border-emerald-200 flex flex-col pt-1">
              <span className="text-sm font-bold opacity-70">NO</span>No
              Diabetes
            </span>
          </div>
          <p className="text-lg text-slate-700 text-center">
            The model learns patterns from patient records and{" "}
            <strong>predicts new cases</strong>.
          </p>
        </div>
      </div>

      {/* ML Hierarchy */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Where Logistic Regression Fits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          {[
            ['Machine Learning', 'Broad field'],
            ['Supervised Learning', 'Learns from labelled examples'],
            ['Classification', 'Predicts a class'],
            ['Logistic Regression', 'Linear probabilistic classifier'],
          ].map(([title, note], index) => (
            <div key={title} className="relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="font-bold text-slate-900 mb-1">{title}</div>
              <div className="text-sm text-slate-600">{note}</div>
              {index < 3 && <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">→</div>}
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Why Logistic Regression is Needed */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Why Logistic Regression is Needed
      </h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-700">
        Linear Regression works well for predicting numbers but fails for
        classification. Suppose we use Linear Regression for spam detection.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-rose-900 mb-3">
            Linear Regression Problem
          </h4>
          <p className="text-lg text-rose-800 mb-3">
            Possible continuous outputs:
          </p>
          <ul className="text-rose-700 font-mono text-xl space-y-1 mb-4 ml-6">
            <li>-2.3</li>
            <li>4.7</li>
            <li>12.5</li>
          </ul>
          <p className="text-rose-900 font-medium">
            These values do not represent probabilities.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-emerald-900 mb-3">
            Logistic Regression Solution
          </h4>
          <p className="text-lg text-emerald-800 mb-3">
            Uses the Sigmoid Function. We need outputs strictly between:
          </p>
          <p className="text-3xl font-mono text-emerald-600 font-bold text-center my-6">
            0 and 1
          </p>
          <p className="text-emerald-900 font-medium">
            Produces model-estimated probabilities that can be converted into
            class decisions.
          </p>
        </div>
      </div>

      <table className="min-w-full divide-y divide-slate-200 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden mb-12">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-bold uppercase">Feature</th>
            <th className="px-6 py-4 text-left font-bold uppercase">
              Regression
            </th>
            <th className="px-6 py-4 text-left font-bold uppercase">
              Classification
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-lg">
          <tr className="bg-white">
            <td className="px-6 py-4 font-bold">Output</td>
            <td className="px-6 py-4">Continuous number</td>
            <td className="px-6 py-4">Category</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="px-6 py-4 font-bold">Example</td>
            <td className="px-6 py-4">House price</td>
            <td className="px-6 py-4">Spam/Not Spam</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 font-bold">Algorithms</td>
            <td className="px-6 py-4">Linear Regression</td>
            <td className="px-6 py-4">Logistic Regression</td>
          </tr>
        </tbody>
      </table>

      {/* Logical Regression Workflow */}
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Logistic Regression Workflow
      </h3>
      <div className="bg-slate-900 text-slate-300 font-mono text-sm lg:text-base p-8 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center text-center space-y-4 md:space-y-0 mb-12 border border-slate-700">
        <div className="bg-slate-800 px-4 py-3 rounded border border-slate-600 w-full md:w-auto">
          Input Features
        </div>
        <span className="hidden md:block">→</span>
        <span className="block md:hidden">↓</span>
        <div className="bg-slate-800 px-4 py-3 rounded border border-slate-600 w-full md:w-auto">
          Linear Combination
        </div>
        <span className="hidden md:block">→</span>
        <span className="block md:hidden">↓</span>
        <div className="bg-indigo-900 text-indigo-100 px-4 py-3 rounded border border-indigo-700 font-bold w-full md:w-auto">
          Apply Sigmoid
        </div>
        <span className="hidden md:block">→</span>
        <span className="block md:hidden">↓</span>
        <div className="bg-slate-800 px-4 py-3 rounded border border-slate-600 w-full md:w-auto">
          Generate Prob
        </div>
        <span className="hidden md:block">→</span>
        <span className="block md:hidden">↓</span>
        <div className="bg-emerald-900 text-emerald-100 px-4 py-3 rounded border border-emerald-700 font-bold w-full md:w-auto">
          Assign Class Label
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Types of Logistic Regression */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Layers className="mr-3 text-indigo-600" /> Types of Logistic Regression
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Binary */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-indigo-900 mb-3 border-b border-indigo-100 pb-2">
            1. Binary
          </h3>
          <p className="text-lg text-slate-700 mb-4">
            Used when there are only two classes.
          </p>
          <ul className="text-slate-700 font-medium space-y-2 mb-4">
            <li>YES / NO</li>
            <li>TRUE / FALSE</li>
            <li>SPAM / NOT SPAM</li>
          </ul>
        </div>

        {/* Multinomial */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-sky-900 mb-3 border-b border-sky-100 pb-2">
            2. Multinomial
          </h3>
          <p className="text-lg text-slate-700 mb-4">
            Used when there are multiple categories.
          </p>
          <ul className="text-slate-700 font-medium space-y-2 mb-4">
            <li>Cat</li>
            <li>Dog</li>
            <li>Horse</li>
            <li>Tiger</li>
          </ul>
        </div>

        {/* Ordinal */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-fuchsia-900 mb-3 border-b border-fuchsia-100 pb-2">
            3. Ordinal Logistic Regression
          </h3>
          <p className="text-lg text-slate-700 mb-4">
            A related specialized extension for ordered outcomes. Standard
            logistic-regression APIs do not automatically use the order.
          </p>
          <ul className="text-slate-700 font-medium space-y-2 mb-4">
            <li>Low</li>
            <li>Medium</li>
            <li>High</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Core Idea */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Calculator className="mr-3 text-indigo-600" /> Core Idea of Logistic
        Regression
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        Logistic Regression first calculates a linear equation similar to Linear
        Regression.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm mb-8">
        <h4 className="text-xl font-bold text-slate-800 mb-4 text-center">
          Linear Equation
        </h4>
        <div className="flex justify-center mb-6">
          <p className="text-2xl font-mono text-indigo-700 font-bold bg-white px-6 py-3 rounded shadow-sm border border-indigo-100">
            z = b₀ + b₁x₁ + b₂x₂ + ... + bₙxₙ
          </p>
        </div>
        <p className="text-lg text-slate-700 text-center italic">
          where z = linear output, b₀ = intercept, b₁, b₂ = coefficients, x₁, x₂
          = features
        </p>
      </div>

      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-xl mb-3 text-indigo-900">
            Worked Example
          </h4>
          <p className="text-lg text-indigo-800 mb-2">
            Suppose{" "}
            <strong className="font-mono bg-indigo-100 px-2 rounded">
              b₀ = -3, b₁ = 1, x = 4
            </strong>
          </p>
          <p className="text-lg text-indigo-800 mb-2 font-mono ml-4">
            z = -3 + 1(4)
          </p>
          <p className="text-lg text-indigo-800 mb-2 font-mono ml-4">
            z = -3 + 4
          </p>
          <p className="text-lg font-bold text-indigo-900 mb-4 font-mono ml-4 text-2xl">
            z = 1
          </p>
          <p className="text-lg text-rose-800 font-bold bg-rose-100 p-2 rounded inline-block shadow-sm">
            But 1 is still a score, not yet a probability.
          </p>
          <p className="text-lg text-indigo-900 font-medium mt-2">
            So Logistic Regression applies the Sigmoid Function.
          </p>
        </div>
      </div>

      {/* Sigmoid Function */}
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        The Sigmoid Function
      </h3>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        The sigmoid function converts linear values into probabilities strictly
        between 0 and 1.
      </p>
      <SigmoidDiagram />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm text-center">
            <h4 className="text-lg font-bold text-emerald-900 mb-4">
              Sigmoid Formula
            </h4>
            <p className="text-2xl font-mono text-emerald-700 font-bold bg-white px-4 py-3 rounded shadow-sm border border-emerald-100 inline-block mb-4">
              σ(z) = 1 / (1 + e⁻ᶻ)
            </p>
            <div className="text-left bg-white p-4 rounded border border-emerald-100 mt-2">
              <p className="font-bold text-emerald-800 mb-2">
                How it limits output to 0..1:
              </p>
              <ul className="list-none space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-bold">e</span> is Euler's number (≈
                  2.718).
                </li>
                <li>
                  When <strong>z is highly positive</strong>, <em>e⁻ᶻ</em>{" "}
                  becomes very small, making the denominator ≈ 1, so the output
                  approaches <strong>1</strong>.
                </li>
                <li>
                  When <strong>z is highly negative</strong>, <em>e⁻ᶻ</em>{" "}
                  becomes huge, making the denominator huge, so the output
                  approaches <strong>0</strong>.
                </li>
                <li>
                  When <strong>z = 0</strong>, <em>e⁰ = 1</em>, making the
                  output 1 / (1+1) = <strong>0.5</strong>.
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-3">
              Why Sigmoid is Used
            </h4>
            <ul className="list-disc pl-6 space-y-3 text-lg text-slate-700">
              <li>
                <strong>Converts numbers into probabilities:</strong> Ensures
                outputs are strictly between 0 and 1.
              </li>
              <li>
                <strong>Smooth and differentiable:</strong> This makes the model
                convenient to optimize with gradient- or Newton-style numerical
                methods.
              </li>
              <li>
                <strong>Monotonic:</strong> A larger linear score always maps to
                a larger estimated probability. The decision boundary remains
                linear in the features unless we first create nonlinear features.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-4">
            Three Easy Sigmoid Values to Remember
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center border border-slate-200">
              <thead className="bg-slate-100 text-slate-800">
                <tr><th className="p-3 border">z</th><th className="p-3 border">σ(z)</th><th className="p-3 border">Meaning</th></tr>
              </thead>
              <tbody className="text-slate-700">
                <tr><td className="p-3 border">-2</td><td className="p-3 border">≈ 0.119</td><td className="p-3 border">Closer to Class 0</td></tr>
                <tr className="bg-slate-50"><td className="p-3 border">0</td><td className="p-3 border">0.500</td><td className="p-3 border">Middle point</td></tr>
                <tr><td className="p-3 border">2</td><td className="p-3 border">≈ 0.881</td><td className="p-3 border">Closer to Class 1</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600 mt-4">
            As z increases, the sigmoid probability increases smoothly. You do
            not need to memorize the whole curve; understand the direction.
          </p>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
        <h4 className="font-bold text-xl mb-3 text-emerald-900">
          Worked Example of Sigmoid Function
        </h4>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="text-lg text-emerald-800 mb-2">
              Suppose:{" "}
              <strong className="font-mono bg-emerald-100 px-2 rounded">
                z = 2
              </strong>
            </p>
            <p className="text-lg text-emerald-800 mb-2 font-mono">
              σ(2) = 1 / (1 + e⁻²)
            </p>
            <p className="text-lg text-slate-600 mb-2 font-mono text-sm">
              (Approx: e⁻² ≈ 0.135)
            </p>
            <p className="text-lg text-emerald-800 mb-2 font-mono">
              Step 1: e⁻² ≈ 0.1353
            </p>
            <p className="text-lg text-emerald-800 mb-2 font-mono">
              Step 2: 1 + 0.1353 = 1.1353
            </p>
            <p className="text-lg text-emerald-800 mb-2 font-mono">
              Step 3: 1 / 1.1353 ≈ 0.881
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-start">
            <p className="text-2xl font-bold text-emerald-900 mb-2 font-mono bg-white px-4 py-2 rounded shadow-sm border border-emerald-200">
              σ(2) ≈ 0.881
            </p>
            <p className="text-lg text-emerald-900 font-medium bg-emerald-200 p-2 rounded inline-block">
              Meaning: about 88.1% model-estimated probability of Class 1
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Probability Threshold & Decision Boundary */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Probability Threshold & Decision Boundary
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        A predicted probability can be converted into a class label using a
        chosen threshold. A threshold of 0.5 is a common starting point for
        binary classification, but it is not automatically the best threshold.
        The decision boundary is where the model switches from one class decision
        to the other.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-sky-50 border border-sky-200 p-6 rounded-xl shadow-sm text-center flex flex-col justify-center">
          <h4 className="text-xl font-bold text-sky-900 mb-6">
            Threshold Logic
          </h4>
          <div className="font-mono text-lg font-bold space-y-4">
            <div className="bg-white p-3 rounded border border-sky-200 text-sky-800 flex justify-center items-center shadow-sm">
              Probability ≥ 0.5 <span className="mx-4 text-slate-400">→</span>{" "}
              Class 1
            </div>
            <div className="bg-white p-3 rounded border border-sky-200 text-sky-800 flex justify-center items-center shadow-sm">
              Probability &lt; 0.5{" "}
              <span className="mx-4 text-slate-400">→</span> Class 0
            </div>
          </div>
          <div className="mt-8 relative w-full h-8 bg-gradient-to-r from-rose-200 to-emerald-200 rounded-full border border-slate-300">
            <div className="absolute left-0 top-10 font-bold text-rose-800 text-sm">
              0 (Class 0)
            </div>
            <div className="absolute right-0 top-10 font-bold text-emerald-800 text-sm">
              1 (Class 1)
            </div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-slate-800 -translate-x-1/2 h-10 -mt-1 shadow"></div>
            <div className="absolute left-1/2 top-10 font-bold text-slate-800 text-sm -translate-x-1/2 font-mono">
              0.5
            </div>
          </div>
          <div className="mt-14 bg-white border border-sky-200 rounded-lg p-4 text-left">
            <p className="font-bold text-slate-800 mb-2">Same probability, different threshold</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
                Probability = <strong>0.72</strong><br />Threshold = 0.50 → <strong>Class 1</strong>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded p-3">
                Probability = <strong>0.72</strong><br />Threshold = 0.80 → <strong>Class 0</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-center items-center">
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Simple Decision Boundary
          </h4>
          <svg viewBox="0 0 320 210" className="w-full max-w-sm" aria-label="Two classes of points separated by a dashed decision boundary">
            <rect x="0" y="0" width="320" height="210" rx="12" fill="#f8fafc" />
            {[ [55,150], [80,135], [100,165], [115,125] ].map(([cx,cy],i)=>(<circle key={`a${i}`} cx={cx} cy={cy} r="7" fill="#10b981" />))}
            {[ [210,75], [235,55], [250,95], [275,65] ].map(([cx,cy],i)=>(<circle key={`b${i}`} cx={cx} cy={cy} r="7" fill="#6366f1" />))}
            <line x1="145" y1="190" x2="185" y2="20" stroke="#ef4444" strokeWidth="3" strokeDasharray="7 6" />
            <text x="65" y="190" fontSize="12" fill="#047857" fontWeight="700">Class 0</text>
            <text x="245" y="30" fontSize="12" fill="#4338ca" fontWeight="700">Class 1</text>
            <text x="193" y="118" fontSize="11" fill="#b91c1c" fontWeight="700" transform="rotate(-76 193 118)">Decision boundary</text>
          </svg>
          <p className="text-sm text-slate-600 text-center mt-3">
            In the original feature space, standard Logistic Regression creates a
            linear boundary. Nonlinear feature engineering can make the resulting
            boundary more flexible.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Cost Function & Gradient Descent */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Activity className="mr-3 text-indigo-600" /> Cost Function & Gradient
        Descent
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-xl font-bold text-indigo-900 mb-4">
            Log Loss Formula
          </h4>
          <p className="text-lg text-slate-700 mb-4">
            Unlike Linear Regression, Logistic Regression uses Log Loss.
          </p>
          <div className="bg-white p-4 rounded text-center border border-indigo-100 shadow-sm mb-4 font-mono text-indigo-800 overflow-x-auto text-sm sm:text-base">
            J(θ) = -1/m ∑ [y*log(ŷ) + (1-y)*log(1-ŷ)]
          </div>
          <ul className="text-slate-600 text-sm space-y-1 mb-4">
            <li><strong>y</strong>: Actual label (0 or 1)</li>
            <li><strong>ŷ</strong>: Predicted probability of Class 1</li>
            <li><strong>m</strong>: Number of samples</li>
          </ul>
          <div className="bg-white border border-indigo-100 rounded-lg p-4">
            <p className="font-bold text-indigo-900 mb-2">One-sample example</p>
            <p className="text-sm text-slate-700 mb-1">Actual label: y = 1</p>
            <p className="text-sm text-slate-700 mb-1">Predicted probability: ŷ = 0.8</p>
            <p className="font-mono text-sm text-slate-800 mb-1">Loss = -log(0.8)</p>
            <p className="font-mono text-sm font-bold text-indigo-800">Loss ≈ 0.223</p>
            <p className="text-xs text-slate-600 mt-2">A confident correct prediction gets a small loss. If the model predicted 0.1 for this positive example, the loss would be about 2.303.</p>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-xl font-bold text-rose-900 mb-4">
            Why Log Loss Fits Logistic Regression
          </h4>
          <p className="text-lg text-slate-700 mb-4">
            Log Loss matches the probabilistic model used by binary Logistic
            Regression. It strongly penalizes confident wrong predictions.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-rose-800 font-medium">
            <li>Uses the predicted probability directly</li>
            <li>Rewards confident correct predictions</li>
            <li>Penalizes confident wrong predictions heavily</li>
          </ul>
          <p className="mt-4 text-sm text-rose-900 bg-rose-100 p-3 rounded shadow-sm">
            MSE can be computed for probabilities, but it is not the standard
            training objective for ordinary Logistic Regression.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
              Gradient Descent Intuition
            </h4>
            <p className="text-lg text-slate-700 mb-4">
              One way to understand optimization is to repeatedly move the
              coefficients in a direction that reduces Log Loss. Practical
              libraries may use gradient-based, Newton-style, or coordinate-based
              solvers depending on the settings.
            </p>
            <div className="font-mono text-xl text-indigo-700 bg-slate-50 p-4 rounded text-center border border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
              θ = θ - α(∂J / ∂θ)
            </div>
            <p className="text-slate-500 italic text-sm mt-3 text-center">
              θ = coefficients, α = learning rate, J = cost function
            </p>
          </div>

          <div className="flex-1 w-full bg-slate-900 p-5 rounded-xl shadow-sm text-slate-300 font-mono text-sm text-center space-y-2">
            <h5 className="font-bold font-sans text-white text-lg mb-2">
              Learning Workflow
            </h5>
            <div className="bg-slate-800 py-1.5 border border-slate-700 rounded">
              Initialize Weights
            </div>
            <div>↓</div>
            <div className="bg-slate-800 py-1.5 border border-slate-700 rounded">
              Calculate Predictions
            </div>
            <div>↓</div>
            <div className="bg-slate-800 py-1.5 border border-slate-700 rounded">
              Compute Error
            </div>
            <div>↓</div>
            <div className="bg-slate-800 py-1.5 border border-slate-700 rounded">
              Update Weights
            </div>
            <div>↓</div>
            <div className="bg-indigo-900 text-indigo-100 font-bold py-1.5 border border-indigo-700 rounded">
              Repeat Until Convergence
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Advanced Concepts: Odds, Logit, Feature Scaling */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 font-sans flex items-center">
        <GitBranch className="mr-3 text-indigo-600" /> Odds, Logit Function &
        Scaling
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-sky-50 border border-sky-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-xl font-bold text-sky-900 mb-4">
            Odds Definition
          </h4>
          <p className="text-lg text-slate-700 mb-4">
            Logistic Regression uses odds internally.
          </p>
          <div className="bg-white p-3 rounded border border-sky-200 text-sky-800 text-center font-bold font-mono text-lg mb-4">
            Odds = P / (1 - P)
          </div>
          <div className="mt-4 pt-4 border-t border-sky-200">
            <p className="text-sky-800 font-bold mb-2">Worked Example:</p>
            <p className="text-slate-700 mb-1 font-mono">Suppose P = 0.8</p>
            <p className="text-slate-700 mb-1 font-mono text-sm">
              Odds = 0.8 / (1 - 0.8) = 0.8 / 0.2
            </p>
            <p className="text-sky-900 font-bold font-mono text-lg mb-2">
              Odds = 4
            </p>
            <p className="text-sm bg-sky-100 p-2 rounded text-sky-900 italic">
              Meaning: the positive outcome has odds of 4 to 1 against the negative outcome.
            </p>
          </div>
        </div>

        <div className="bg-fuchsia-50 border border-fuchsia-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-xl font-bold text-fuchsia-900 mb-4">
            Logit Function
          </h4>
          <p className="text-lg text-slate-700 mb-4">
            The logit converts a probability into log-odds. Logistic Regression models these log-odds as a linear combination of the features.
          </p>
          <div className="bg-white p-3 rounded border border-fuchsia-200 text-fuchsia-800 text-center font-bold font-mono text-lg mb-6">
            Logit = log( P / (1 - P) )
          </div>
          <div className="bg-fuchsia-100 border-l-4 border-fuchsia-500 p-3 rounded-r text-fuchsia-900 font-medium font-sans">
            <strong>Why Logistic Regression is called a linear model:</strong>
            the log-odds are linear in the input features, so the standard
            decision boundary is linear in that feature space.
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-4 pr-4 rounded-r-md mb-12 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-xl mb-3 text-slate-800 flex items-center">
            <RefreshCw className="mr-2 text-indigo-600" /> Feature Scaling
          </h4>
          <p className="text-lg text-slate-700 mb-4">
            Feature scaling is often helpful when numerical features have very
            different units. It can make optimization more stable for some
            solvers and makes regularization treat coefficient scales more fairly.
          </p>
          <div className="bg-white p-3 rounded border border-slate-200 text-slate-800 text-center font-bold font-mono text-base mb-4 inline-block shadow-sm">
            X_scaled = (X - μ) / σ
          </div>
        </div>
        <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
          <p className="text-slate-800 font-bold border-b border-slate-100 pb-2 mb-2">
            Example:
          </p>
          <p className="text-slate-700 font-mono text-sm mb-1">
            X = 100, Mean(μ) = 80, StdDev(σ) = 10
          </p>
          <p className="text-slate-700 font-mono text-sm mb-1">
            Step 1: 100 - 80 = 20
          </p>
          <p className="text-slate-700 font-mono text-sm mb-2">
            Step 2: 20 / 10 = 2
          </p>
          <p className="text-indigo-800 font-mono font-bold text-lg bg-indigo-50 p-2 rounded text-center border border-indigo-100">
            X_scaled = 2
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Evaluation Metrics */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <BarChart2 className="mr-3 text-indigo-600" /> Evaluation Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Confusion Matrix
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full font-mono text-sm text-center">
              <thead>
                <tr>
                  <th className="p-2 border"></th>
                  <th
                    className="p-2 border bg-slate-50 text-slate-500"
                    colSpan={2}
                  >
                    Predicted
                  </th>
                </tr>
                <tr>
                  <th className="p-2 border"></th>
                  <th className="p-2 border bg-emerald-50 text-emerald-800">
                    YES
                  </th>
                  <th className="p-2 border bg-rose-50 text-rose-800">NO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="p-2 border bg-slate-50 text-slate-500">
                    Actual YES
                  </th>
                  <td className="p-2 border font-bold text-emerald-700">TP</td>
                  <td className="p-2 border font-bold text-rose-700">FN</td>
                </tr>
                <tr>
                  <th className="p-2 border bg-slate-50 text-slate-500">
                    Actual NO
                  </th>
                  <td className="p-2 border font-bold text-rose-700">FP</td>
                  <td className="p-2 border font-bold text-emerald-700">TN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Core Formulae
          </h4>
          <ul className="space-y-4 font-mono text-sm tracking-wide">
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold font-sans uppercase mb-1 text-xs">
                Accuracy
              </span>
              <span className="bg-white p-2 rounded shadow-sm border border-slate-200">
                Acc = (TP+TN)/(TP+TN+FP+FN)
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold font-sans uppercase mb-1 text-xs">
                Precision
              </span>
              <span className="bg-white p-2 rounded shadow-sm border border-slate-200">
                Prec = TP / (TP+FP)
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold font-sans uppercase mb-1 text-xs">
                Recall
              </span>
              <span className="bg-white p-2 rounded shadow-sm border border-slate-200">
                Recall = TP / (TP+FN)
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold font-sans uppercase mb-1 text-xs">
                F1 Score
              </span>
              <span className="bg-white p-2 rounded shadow-sm border border-slate-200">
                F1 = 2*(Prec*Rec)/(Prec+Rec)
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-900 mb-4">Metric Example with Small Numbers</h3>
        <p className="text-slate-700 mb-4">Suppose TP = 8, TN = 7, FP = 1, FN = 2.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-white border border-amber-200 rounded p-3"><strong>Accuracy:</strong> (8+7)/(8+7+1+2) = 15/18 ≈ <strong>83.3%</strong></div>
          <div className="bg-white border border-amber-200 rounded p-3"><strong>Precision:</strong> 8/(8+1) = 8/9 ≈ <strong>88.9%</strong></div>
          <div className="bg-white border border-amber-200 rounded p-3"><strong>Recall:</strong> 8/(8+2) = 8/10 = <strong>80%</strong></div>
          <div className="bg-white border border-amber-200 rounded p-3"><strong>F1:</strong> 2×(0.889×0.80)/(0.889+0.80) ≈ <strong>84.2%</strong></div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-slate-800 mb-4">ROC Curve</h4>
          <p className="text-lg text-slate-700 mb-4">
            ROC Curve measures classification performance across various
            thresholds.
          </p>
          <p className="text-slate-700 italic">
            It plots True Positive Rate vs False Positive Rate.
          </p>
        </div>
        <div className="flex-1 w-full h-48 bg-slate-50 rounded border border-slate-200 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis
                dataKey="fpr"
                type="number"
                domain={[0, 1]}
                label={{
                  value: "False Positive Rate",
                  position: "insideBottom",
                  offset: -5,
                  fontSize: 12,
                }}
              />
              <YAxis
                type="number"
                domain={[0, 1]}
                label={{
                  value: "True Pos Rate",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="tpr"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="linear"
                dataKey="fpr"
                stroke="#94a3b8"
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Comparisons & Apps */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Comparisons & Applications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <h4 className="bg-slate-100 p-4 font-bold text-slate-800 border-b border-slate-200 text-lg">
            Logistic vs Linear Regression
          </h4>
          <div className="p-4">
            <table className="min-w-full text-left text-sm lg:text-base">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <th className="py-2 text-slate-500 font-medium">Output</th>
                  <td className="py-2 font-bold text-slate-800">Probability</td>
                  <td className="py-2 text-slate-600">Continuous</td>
                </tr>
                <tr>
                  <th className="py-2 text-slate-500 font-medium">Function</th>
                  <td className="py-2 font-bold text-slate-800">Sigmoid</td>
                  <td className="py-2 text-slate-600">Linear</td>
                </tr>
                <tr>
                  <th className="py-2 text-slate-500 font-medium">Cost Fx</th>
                  <td className="py-2 font-bold text-slate-800">Log Loss</td>
                  <td className="py-2 text-slate-600">MSE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <h4 className="bg-slate-100 p-4 font-bold text-slate-800 border-b border-slate-200 text-lg">
            Logistic vs Decision Tree
          </h4>
          <div className="p-4">
            <table className="min-w-full text-left text-sm lg:text-base">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <th className="py-2 text-slate-500 font-medium">Boundary</th>
                  <td className="py-2 font-bold text-slate-800">Linear in chosen feature space</td>
                  <td className="py-2 text-slate-600">Piecewise, axis-aligned splits</td>
                </tr>
                <tr>
                  <th className="py-2 text-slate-500 font-medium">
                    Complexity
                  </th>
                  <td className="py-2 font-bold text-slate-800">Usually lower</td>
                  <td className="py-2 text-slate-600">Depends on tree depth</td>
                </tr>
                <tr>
                  <th className="py-2 text-slate-500 font-medium">
                    Overfit Risk
                  </th>
                  <td className="py-2 font-bold text-slate-800">Depends on regularization</td>
                  <td className="py-2 text-slate-600">Can be high for deep trees</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-xl p-8 mb-12 text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-6 flex items-center border-b border-slate-600 pb-3">
          <Briefcase className="mr-3 text-indigo-300" /> Industry Applications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-indigo-200 font-bold mb-3 uppercase tracking-wider text-sm">
              Healthcare
            </h4>
            <ul className="text-slate-300 space-y-1 font-medium text-sm">
              <li>Disease Prediction</li>
              <li>Cancer Detection</li>
              <li>Medical Risk Analysis</li>
            </ul>
          </div>
          <div>
            <h4 className="text-indigo-200 font-bold mb-3 uppercase tracking-wider text-sm">
              Finance
            </h4>
            <ul className="text-slate-300 space-y-1 font-medium text-sm">
              <li>Credit Scoring</li>
              <li>Fraud Detection</li>
              <li>Loan Approval</li>
            </ul>
          </div>
          <div>
            <h4 className="text-indigo-200 font-bold mb-3 uppercase tracking-wider text-sm">
              Marketing
            </h4>
            <ul className="text-slate-300 space-y-1 font-medium text-sm">
              <li>Customer Conversion</li>
              <li>Churn Prediction</li>
              <li>Ad Analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Implementation */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <FileCode className="mr-3 text-indigo-600" /> Python Implementation
        (Practical Guide)
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        Here is a complete, beginner-friendly step-by-step implementation of
        Logistic Regression using Python and Scikit-Learn's Breast Cancer
        Wisconsin dataset. It is a naturally binary classification dataset, so
        we do not need to manufacture labels from a regression target.
      </p>

      {/* End to End Workflow */}
      <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-center">
        <h4 className="font-bold text-slate-800 mb-4 font-sans text-lg">
          Machine Learning Pipeline Workflow
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs sm:text-sm">
          <span className="bg-white border border-slate-300 px-3 py-1.5 rounded shadow-sm text-slate-700">
            Load Dataset
          </span>
          <span className="text-slate-400">→</span>
          <span className="bg-white border border-slate-300 px-3 py-1.5 rounded shadow-sm text-slate-700">
            Preprocess Data
          </span>
          <span className="text-slate-400">→</span>
          <span className="bg-white border border-slate-300 px-3 py-1.5 rounded shadow-sm text-slate-700">
            Split Dataset
          </span>
          <span className="text-slate-400">→</span>
          <span className="bg-white border border-slate-300 px-3 py-1.5 rounded shadow-sm text-slate-700">
            Feature Scaling
          </span>
          <span className="text-slate-400">→</span>
          <span className="bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded shadow-sm text-indigo-800 font-bold">
            Train Model
          </span>
          <span className="text-slate-400">→</span>
          <span className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded shadow-sm text-emerald-800 font-bold">
            Make Predictions
          </span>
          <span className="text-slate-400">→</span>
          <span className="bg-rose-50 border border-rose-200 px-3 py-1.5 rounded shadow-sm text-rose-800 font-bold">
            Evaluate Model
          </span>
        </div>
      </div>

      {/* Library Hierarchy */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-3 flex items-center border-b border-slate-100 pb-2">
            <Layers className="w-5 h-5 mr-2 text-indigo-500" /> Python ML
            Libraries
          </h4>
          <div className="text-center font-mono text-sm text-slate-700">
            <div className="bg-slate-100 border border-slate-300 rounded py-1 px-3 mb-2 font-bold inline-block">
              PYTHON ML LIBRARIES
            </div>
            <div className="flex justify-center items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="bg-sky-50 border border-sky-200 rounded py-1 px-3">
                  NumPy
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="bg-sky-50 border border-sky-200 rounded py-1 px-3">
                  Pandas
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="bg-indigo-50 text-indigo-800 font-bold border border-indigo-200 rounded py-1 px-3 mb-2">
                  Scikit-Learn
                </div>
                <div className="text-xs text-left bg-white border border-slate-200 rounded p-2 shadow-sm">
                  • LogisticRegression
                  <br />
                  • StandardScaler
                  <br />
                  • Train/Test Split
                  <br />• Metrics
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-3 flex items-center border-b border-slate-100 pb-2">
            <RefreshCw className="w-5 h-5 mr-2 text-emerald-500" /> Natural Binary Labels
          </h4>
          <p className="text-sm text-slate-600 mb-3">
            This dataset already contains two target classes, so the example stays
            a genuine classification problem.
          </p>
          <div className="grid grid-cols-2 gap-3 font-mono text-sm text-center">
            <div className="bg-rose-50 text-rose-800 border border-rose-200 p-3 rounded font-bold">
              0 → Malignant
            </div>
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded font-bold">
              1 → Benign
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Educational dataset only; this tutorial is not a clinical diagnostic tool.
          </p>
        </div>
      </div>

      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 sm:p-8 rounded-xl shadow-lg border border-slate-700 font-mono text-sm leading-relaxed overflow-x-auto mb-12">
        <span className="text-emerald-400 block mb-2 font-bold text-base border-b border-slate-700 pb-2"># Step 1: Import Libraries</span>
        <span className="text-rose-400">from</span> sklearn.datasets <span className="text-rose-400">import</span> load_breast_cancer<br />
        <span className="text-rose-400">from</span> sklearn.model_selection <span className="text-rose-400">import</span> train_test_split<br />
        <span className="text-rose-400">from</span> sklearn.preprocessing <span className="text-rose-400">import</span> StandardScaler<br />
        <span className="text-rose-400">from</span> sklearn.linear_model <span className="text-rose-400">import</span> LogisticRegression<br />
        <span className="text-rose-400">from</span> sklearn.metrics <span className="text-rose-400">import</span> accuracy_score, confusion_matrix, classification_report, roc_auc_score<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold text-base border-b border-slate-700 pb-2"># Step 2: Load a Binary Classification Dataset</span>
        data = load_breast_cancer()<br />
        X = data.data<br />
        y = data.target<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold text-base border-b border-slate-700 pb-2"># Step 3: Split Before Preprocessing</span>
        X_train, X_test, y_train, y_test = train_test_split(<br />
        &nbsp;&nbsp;&nbsp;&nbsp;X, y, test_size=<span className="text-amber-300">0.2</span>, random_state=<span className="text-amber-300">42</span>, stratify=y<br />
        )<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold text-base border-b border-slate-700 pb-2"># Step 4: Fit Scaling on Training Data Only</span>
        scaler = StandardScaler()<br />
        X_train_scaled = scaler.fit_transform(X_train)<br />
        X_test_scaled = scaler.transform(X_test)<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold text-base border-b border-slate-700 pb-2"># Step 5: Train Logistic Regression</span>
        model = LogisticRegression(max_iter=<span className="text-amber-300">1000</span>)<br />
        model.fit(X_train_scaled, y_train)<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold text-base border-b border-slate-700 pb-2"># Step 6: Predict and Evaluate</span>
        y_pred = model.predict(X_test_scaled)<br />
        y_prob = model.predict_proba(X_test_scaled)[:, <span className="text-amber-300">1</span>]<br /><br />
        <span className="text-sky-300">print</span>(<span className="text-amber-300">"Accuracy:"</span>, accuracy_score(y_test, y_pred))<br />
        <span className="text-sky-300">print</span>(confusion_matrix(y_test, y_pred))<br />
        <span className="text-sky-300">print</span>(classification_report(y_test, y_pred, target_names=data.target_names))<br />
        <span className="text-sky-300">print</span>(<span className="text-amber-300">"ROC AUC:"</span>, roc_auc_score(y_test, y_prob))<br />
      </div>

      {/* Code Expected Output */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        Expected Output
      </h3>
      <div className="bg-black text-emerald-400 p-6 rounded-xl shadow-lg border border-slate-700 font-mono text-sm leading-relaxed overflow-x-auto mb-4">
        Accuracy: 0.9824561403508771<br /><br />
        [[41&nbsp;&nbsp;1]<br />
        [&nbsp;1&nbsp;71]]<br /><br />
        malignant&nbsp;&nbsp;precision 0.98&nbsp;&nbsp;recall 0.98&nbsp;&nbsp;f1-score 0.98<br />
        benign&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;precision 0.99&nbsp;&nbsp;recall 0.99&nbsp;&nbsp;f1-score 0.99<br /><br />
        ROC AUC: 0.9953703703703703
      </div>
      <p className="text-sm text-slate-600 mb-12">
        Example output from the fixed split shown above. Small numerical differences
        can occur across library versions. A strong score on this teaching dataset
        should not be interpreted as proof of clinical readiness.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Best Practices & Mistakes */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 font-sans flex items-center">
        <ShieldAlert className="mr-3 text-indigo-600" /> Best Practices & Common
        Mistakes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
            <h4 className="text-xl font-bold text-rose-800 mb-4 flex items-center">
              <XIcon className="mr-2 w-6 h-6" /> Common Mistakes
            </h4>
            <ul className="list-none space-y-3 text-rose-800 text-base">
              <li className="bg-white px-4 py-2 rounded shadow-sm border border-rose-100 flex flex-col">
                <strong className="text-rose-900 pb-1">
                  Ignoring feature scaling:
                </strong>{" "}
                <span className="text-sm text-rose-700">
                  Can slow or destabilize optimization when feature scales differ greatly.
                </span>
              </li>
              <li className="bg-white px-4 py-2 rounded shadow-sm border border-rose-100 flex flex-col">
                <strong className="text-rose-900 pb-1">
                  Using wrong threshold:
                </strong>{" "}
                <span className="text-sm text-rose-700">
                  Can create the wrong trade-off between false positives and false negatives.
                </span>
              </li>
              <li className="bg-white px-4 py-2 rounded shadow-sm border border-rose-100 flex flex-col">
                <strong className="text-rose-900 pb-1">Imbalanced data:</strong>{" "}
                <span className="text-sm text-rose-700">
                  Results in misleading aggregate accuracy scores.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <CheckCircle className="mr-2 w-6 h-6 text-emerald-600" /> Best
            Practices
          </h4>
          <ul className="list-disc pl-6 space-y-3 text-emerald-800 text-lg font-medium">
            <li>Scale numerical features when feature scales differ substantially or the chosen solver/regularization benefits from it.</li>
            <li>Use cross-validation.</li>
            <li>Tune threshold carefully based on business context.</li>
            <li>Handle class imbalance thoughtfully; consider class weights, resampling, and suitable metrics rather than applying one technique automatically.</li>
            <li>Evaluate multiple metrics (F1, Precision, Recall).</li>
            <li>Use Regularization (L1/L2) if needed.</li>
          </ul>
        </div>
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-violet-900 mb-4">Regularization in Scikit-Learn Logistic Regression</h2>
        <p className="text-slate-700 mb-4">
          Scikit-Learn's LogisticRegression applies regularization by default. The
          parameter <code className="bg-white px-1.5 py-0.5 rounded border">C</code>
          controls its strength inversely.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-white border border-violet-200 rounded p-3"><strong>Smaller C</strong> → stronger regularization</div>
          <div className="bg-white border border-violet-200 rounded p-3"><strong>Larger C</strong> → weaker regularization</div>
        </div>
        <p className="text-sm text-slate-600 mt-3">
          The available L1, L2, or Elastic-Net choices depend on the solver. Choose
          settings with validation rather than assuming one value is always best.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Common Questions</h2>
        <div className="space-y-4 text-slate-700">
          <div><strong>Why is it called regression if it performs classification?</strong><br />Because it models the log-odds as a regression-like linear equation, then converts the result to a probability and class decision.</div>
          <div><strong>Is 0.5 always the best threshold?</strong><br />No. The threshold should reflect validation results and the real cost of false positives versus false negatives.</div>
          <div><strong>Can Logistic Regression handle more than two classes?</strong><br />Yes. Multinomial logistic regression can handle multiple unordered classes. Ordered outcomes require specialized ordinal models.</div>
          <div><strong>What should I learn next?</strong><br />Continue with <a className="text-indigo-700 font-semibold hover:underline" href="/learn/decision-trees">Decision Trees</a>, or revisit <a className="text-indigo-700 font-semibold hover:underline" href="/learn/confusion-matrix">Confusion Matrix</a> and <a className="text-indigo-700 font-semibold hover:underline" href="/learn/roc-auc">ROC-AUC</a> for evaluation.</div>
        </div>
      </div>

      {/* Final Summary */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-3 text-indigo-400" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Logistic Regression is a classification algorithm in Machine Learning. It works by taking a linear combination of inputs, passing them through a Sigmoid Function, outputting a probability, and assigning a class based on a threshold.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Its major strengths include simplicity, computational efficiency, and coefficient-based interpretability. It can provide useful estimated probabilities, but those probabilities should still be evaluated for calibration and used with a threshold that fits the problem. It is a strong baseline for many binary and multiclass classification tasks.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "The key idea is simple: Logistic Regression turns a linear score into an estimated probability, then uses a decision rule to choose a class."
         </p>
      </div>

    </>
  );
}
