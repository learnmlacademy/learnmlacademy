import React from "react";
import {
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
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
  Brain,
  Image as ImageIcon,
  Hash,
  CheckCircle,
  Scale,
  Box,
  Divide,
  BookOpen,
  GitBranch,
  Filter,
  Mail,
  ShieldAlert,
  FileText,
} from "lucide-react";

const classificationVsRegressionData = [
  {
    feature: "Output Type",
    classification: "Category / Class",
    regression: "Numeric Value",
  },
  {
    feature: "Example",
    classification: "Spam / Not Spam",
    regression: "House Price",
  },
  {
    feature: "Goal",
    classification: "Predict labels",
    regression: "Predict quantities",
  },
  {
    feature: "Algorithms",
    classification: "Logistic Regression, SVM",
    regression: "Linear Regression",
  },
];

const knnData = [
  { x: 1, y: 2, class: "Class A" },
  { x: 2, y: 3, class: "Class A" },
  { x: 2, y: 1, class: "Class A" },
  { x: 6, y: 5, class: "Class B" },
  { x: 7, y: 7, class: "Class B" },
  { x: 8, y: 6, class: "Class B" },
  { x: 4, y: 4, class: "New Data" }, // New point
];

const sigmoidData = Array.from({ length: 41 }, (_, i) => {
  const z = -10 + i * 0.5;
  const p = 1 / (1 + Math.exp(-z));
  return { z, p };
});

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

export function ClassificationIntroContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Classification</h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-700 font-medium">
        Classification is used when the goal is to predict discrete categories or labels instead of continuous numeric values.</p>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-indigo-900 mb-3">
          Classification in Simple Words
        </h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-5">
          Classification means teaching a model to choose a <strong>category</strong>. Think of it like sorting new items into labeled boxes after seeing solved examples.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center mb-6">
          {["Examples + Labels", "Learn Pattern", "New Example", "Predict a Class"].map((step, index) => (
            <div key={step} className="bg-white border border-indigo-200 rounded-lg p-3 font-bold text-slate-800">
              <span className="block text-indigo-600 text-sm mb-1">Step {index + 1}</span>
              {step}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3">Tiny Student Example</h3>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-slate-200 rounded-lg overflow-hidden text-base">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Study Hours</th>
                <th className="px-4 py-3 text-left">Attendance</th>
                <th className="px-4 py-3 text-left">Known Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="px-4 py-3">1</td><td className="px-4 py-3">55%</td><td className="px-4 py-3 font-bold text-rose-700">Fail</td></tr>
              <tr><td className="px-4 py-3">2</td><td className="px-4 py-3">65%</td><td className="px-4 py-3 font-bold text-rose-700">Fail</td></tr>
              <tr><td className="px-4 py-3">4</td><td className="px-4 py-3">82%</td><td className="px-4 py-3 font-bold text-emerald-700">Pass</td></tr>
              <tr><td className="px-4 py-3">5</td><td className="px-4 py-3">90%</td><td className="px-4 py-3 font-bold text-emerald-700">Pass</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-lg text-slate-700 leading-relaxed">
          After learning from these labeled examples, the model can examine a new student's features and predict a class such as <strong>Pass</strong> or <strong>Fail</strong>. Real models use more data; this tiny table is only for understanding the idea.
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 mb-8 text-white shadow-sm">
        <p className="text-xl font-bold mb-4 flex items-center">
          <Filter className="mr-3 text-indigo-200" /> Classification algorithms
          are used in:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg text-indigo-50 font-medium">
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Email spam
            detection
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Disease
            diagnosis
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Face
            recognition
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Fraud
            detection
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Loan
            approval systems
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" /> Sentiment
            analysis
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" />{" "}
            Recommendation systems
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" />{" "}
            Self-driving cars
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-300" />{" "}
            Cybersecurity systems
          </li>
        </ul>
      </div>

      <p className="text-lg leading-relaxed text-slate-700 mb-10 italic">
        Classification is part of Supervised Learning, where the model learns
        from labeled data.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* What is Classification */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        What is Classification?
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-slate-700">
        Classification is a machine learning technique used to assign data into
        predefined categories.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
        <h4 className="font-bold text-xl mb-3 flex items-center text-emerald-900">
          Simple Beginner Definition
        </h4>
        <div className="flex flex-col items-center justify-center space-y-3 font-mono text-emerald-800 font-bold bg-white p-6 rounded border border-emerald-200">
          <span className="bg-emerald-100 px-4 py-2 rounded">INPUT DATA</span>
          <span className="text-emerald-400">↓</span>
          <span className="bg-emerald-200 px-4 py-2 rounded">
            MODEL LEARNS PATTERNS
          </span>
          <span className="text-emerald-400">↓</span>
          <span className="bg-emerald-300 px-4 py-2 rounded">
            PREDICTS CATEGORY
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
          <Mail className="mr-3 text-indigo-600" /> Real-Life Example
        </h3>
        <p className="text-lg text-slate-700 mb-3">
          Suppose we want to classify emails as:
        </p>
        <div className="flex justify-center items-center space-x-6 text-xl font-bold text-slate-800 mb-4">
          <span className="bg-rose-100 text-rose-800 px-4 py-2 rounded shadow-sm border border-rose-200">
            Spam
          </span>
          <span className="text-slate-400 italic">or</span>
          <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded shadow-sm border border-emerald-200">
            Not Spam
          </span>
        </div>
        <p className="text-lg text-slate-700 text-center">
          The machine learning model studies previous emails and learns
          patterns. <br />
          <strong>
            After training, it predicts the category of new emails.
          </strong>
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Classification vs Regression */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Classification vs Regression
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4 tracking-tight">
            CLASSIFICATION
          </h3>
          <p className="text-lg text-blue-800 font-medium mb-4 bg-white px-4 py-2 rounded shadow-sm border border-blue-100 w-full">
            Input → Predict Category
          </p>
          <ul className="text-blue-700 text-lg space-y-2 text-left w-full pl-6">
            <li className="list-disc">Dog or Cat</li>
            <li className="list-disc">Spam or Not Spam</li>
            <li className="list-disc">Fraud or Legitimate</li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold text-amber-900 mb-4 tracking-tight">
            REGRESSION
          </h3>
          <p className="text-lg text-amber-800 font-medium mb-4 bg-white px-4 py-2 rounded shadow-sm border border-amber-100 w-full">
            Input → Predict Number
          </p>
          <ul className="text-amber-700 text-lg space-y-2 text-left w-full pl-6">
            <li className="list-disc">Price = ₹50,000</li>
            <li className="list-disc">Temperature = 32°C</li>
          </ul>
        </div>
      </div>

      <table className="min-w-full divide-y divide-slate-200 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden mb-12">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
              Feature
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase bg-blue-900">
              Classification
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase bg-amber-900">
              Regression
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-lg">
          {classificationVsRegressionData.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              <td className="px-6 py-4 font-bold text-slate-800">
                {row.feature}
              </td>
              <td className="px-6 py-4 text-blue-800 font-medium">
                {row.classification}
              </td>
              <td className="px-6 py-4 text-amber-800 font-medium">
                {row.regression}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Types of Classification Problems */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Layers className="mr-3 text-indigo-600" /> Types of Classification
        Problems
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Binary */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-indigo-900 mb-3 border-b border-indigo-100 pb-2">
            1. Binary Classification
          </h3>
          <p className="text-lg text-slate-700 mb-4">
            Predicts one of two classes.
          </p>
          <p className="text-lg font-bold text-slate-800 mb-2">Examples:</p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center text-slate-700">
              <CheckCircle className="w-4 h-4 mr-2 text-indigo-500" /> Yes / No
            </li>
            <li className="flex items-center text-slate-700">
              <CheckCircle className="w-4 h-4 mr-2 text-indigo-500" /> True /
              False
            </li>
            <li className="flex items-center text-slate-700">
              <CheckCircle className="w-4 h-4 mr-2 text-indigo-500" /> Spam /
              Not Spam
            </li>
            <li className="flex items-center text-slate-700">
              <CheckCircle className="w-4 h-4 mr-2 text-indigo-500" /> Disease /
              No Disease
            </li>
          </ul>
          <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center font-bold text-slate-600 font-mono text-sm">
            One input → One of 2 classes
          </div>
        </div>

        {/* Multi-Class */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-sky-900 mb-3 border-b border-sky-100 pb-2">
            2. Multi-Class Classification
          </h3>
          <p className="text-lg text-slate-700 mb-4">
            Predicts one among many classes.
          </p>
          <p className="text-lg font-bold text-slate-800 mb-2">Examples:</p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center text-slate-700">
              <ImageIcon className="w-4 h-4 mr-2 text-sky-500" /> Cat
            </li>
            <li className="flex items-center text-slate-700">
              <ImageIcon className="w-4 h-4 mr-2 text-sky-500" /> Dog
            </li>
            <li className="flex items-center text-slate-700">
              <ImageIcon className="w-4 h-4 mr-2 text-sky-500" /> Horse
            </li>
            <li className="flex items-center text-slate-700">
              <ImageIcon className="w-4 h-4 mr-2 text-sky-500" /> Tiger
            </li>
          </ul>
          <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center font-bold text-slate-600 font-mono text-sm">
            One image → Cat OR Dog OR Horse
          </div>
        </div>

        {/* Multi-Label */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-fuchsia-900 mb-3 border-b border-fuchsia-100 pb-2">
            3. Multi-Label Classification
          </h3>
          <p className="text-lg text-slate-700 mb-4">
            One input can belong to multiple categories.
          </p>
          <p className="text-lg font-bold text-slate-800 mb-2">
            Examples (Movie Genres):
          </p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center text-slate-700">
              <CheckCircle className="w-4 h-4 mr-2 text-fuchsia-500" /> Action
            </li>
            <li className="flex items-center text-slate-700">
              <CheckCircle className="w-4 h-4 mr-2 text-fuchsia-500" /> Comedy
            </li>
            <li className="flex items-center text-slate-700">
              <CheckCircle className="w-4 h-4 mr-2 text-fuchsia-500" /> Drama
            </li>
          </ul>
          <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center text-fuchsia-800 italic text-sm">
            A movie may belong to all three simultaneously.
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        From a Score to a Final Class
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        Many classifiers can produce a probability or decision score. A threshold can then turn that score into a class label.
      </p>
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Model score</span>
            <span className="text-2xl font-bold text-indigo-700">0.82</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="block text-sm font-bold text-slate-500 uppercase mb-1">Example threshold</span>
            <span className="text-2xl font-bold text-slate-800">0.50</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <span className="block text-sm font-bold text-emerald-700 uppercase mb-1">Decision</span>
            <span className="text-2xl font-bold text-emerald-800">Class 1</span>
          </div>
        </div>
        <p className="text-lg text-slate-700">
          Because <strong>0.82 ≥ 0.50</strong>, this example predicts Class 1. The best threshold is <strong>not always 0.50</strong>; it depends on the cost of false positives and false negatives.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center"><Code className="mr-2 text-indigo-600" />Tiny Python Example</h3>
        <p className="text-lg text-slate-700 mb-4">Here we teach a Logistic Regression classifier from a few study-hour examples.</p>
        <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm mb-4"><code>{`from sklearn.linear_model import LogisticRegression

X = [[1], [2], [3], [4], [5], [6]]
y = [0, 0, 0, 1, 1, 1]  # 0 = Fail, 1 = Pass

model = LogisticRegression(max_iter=1000)
model.fit(X, y)

prediction = model.predict([[4]])[0]
print("Predicted class:", "Pass" if prediction == 1 else "Fail")`}</code></pre>
        <div className="bg-white border border-slate-200 rounded-lg p-4 font-mono text-slate-800">
          Predicted class: Pass
        </div>
        <p className="text-sm text-slate-600 mt-3">This tiny dataset is only for learning the workflow, not for judging real student performance.</p>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Machine Learning Classification Workflow */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Machine Learning Classification Workflow
      </h2>
      <div className="bg-slate-900 p-8 rounded-xl shadow-lg mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center font-bold font-mono tracking-wide text-sm lg:text-base text-slate-300">
          <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg w-full md:w-auto">
            Collect Dataset
          </div>
          <span className="hidden md:block text-slate-500">→</span>
          <span className="block md:hidden text-slate-500">↓</span>
          <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg w-full md:w-auto">
            Preprocess Data
          </div>
          <span className="hidden md:block text-slate-500">→</span>
          <span className="block md:hidden text-slate-500">↓</span>
          <div className="bg-indigo-900 border border-indigo-700 text-indigo-100 px-4 py-3 rounded-lg w-full md:w-auto">
            Train Model
          </div>
          <span className="hidden md:block text-slate-500">→</span>
          <span className="block md:hidden text-slate-500">↓</span>
          <div className="bg-emerald-900 border border-emerald-700 text-emerald-100 px-4 py-3 rounded-lg w-full md:w-auto">
            Predict Categories
          </div>
          <span className="hidden md:block text-slate-500">→</span>
          <span className="block md:hidden text-slate-500">↓</span>
          <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg w-full md:w-auto">
            Evaluate Model
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Hierarchy of Classification Algorithms */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <GitBranch className="mr-3 text-indigo-600" /> Families of Classification Algorithms
      </h2>
      <p className="text-lg text-slate-700 mb-6">
        You do not need to memorize every algorithm at once. Start by remembering the main idea behind each family.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {[
          ["Linear Models", "Logistic Regression, SGD Classifier", "Learn a separating rule from weighted features."],
          ["Distance-Based", "K-Nearest Neighbors", "Look at nearby examples and vote."],
          ["Probabilistic", "Naive Bayes", "Compare class probabilities from the evidence."],
          ["Margin-Based", "Support Vector Machine", "Find a boundary with a useful margin."],
          ["Tree & Ensemble", "Decision Tree, Random Forest", "Ask feature-based questions; combine trees when needed."],
          ["Neural Networks", "Deep Learning Models", "Learn layered nonlinear representations from data."],
        ].map(([family, examples, idea]) => (
          <div key={family} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-indigo-900 text-lg mb-2">{family}</h3>
            <p className="font-semibold text-slate-800 mb-2">{examples}</p>
            <p className="text-slate-600">{idea}</p>
          </div>
        ))}
      </div>

      {/* Major Algorithms */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Major Classification Algorithms
      </h2>

      <table className="min-w-full divide-y divide-slate-200 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden mb-12">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left font-bold text-slate-600 uppercase bg-slate-100">
              Algorithm
            </th>
            <th className="px-6 py-4 text-left font-bold text-slate-600 uppercase">
              Main Idea
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-lg">
          <tr>
            <td className="px-6 py-4 font-bold text-indigo-700 bg-indigo-50">
              Logistic Regression
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">
              Probability-based classification
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-emerald-700 bg-emerald-50">
              K-Nearest Neighbors
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">
              Similarity-based prediction
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-amber-700 bg-amber-50">
              Decision Tree
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">
              Rule-based decisions
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-rose-700 bg-rose-50">
              Random Forest
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">
              Multiple decision trees
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-sky-700 bg-sky-50">
              Naive Bayes
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">
              Probability theory
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-fuchsia-700 bg-fuchsia-50">
              SVM
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">
              Maximum margin separation
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-bold text-teal-700 bg-teal-50">
              Neural Networks
            </td>
            <td className="px-6 py-4 text-slate-700 font-medium">
              Deep layered learning
            </td>
          </tr>
        </tbody>
      </table>

      {/* 1. Logistic Regression */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4 border-b-2 border-indigo-200 pb-2 inline-block">
          1. Logistic Regression
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          Despite its name, Logistic Regression is mainly used for
          classification. It predicts probabilities between 0 and 1.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-indigo-800 mb-3 text-lg">
              Real-Life Example
            </h4>
            <p className="text-lg text-indigo-900 font-medium mb-3">
              Predict: Will customer buy product?
            </p>
            <div className="flex justify-center items-center space-x-4">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-6 py-2 rounded border border-emerald-300">
                YES
              </span>
              <span className="text-indigo-400 italic font-mono text-sm">
                or
              </span>
              <span className="bg-rose-100 text-rose-800 font-bold px-6 py-2 rounded border border-rose-300">
                NO
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 text-lg">
              Logistic Function (Sigmoid)
            </h4>
            <div className="flex justify-center bg-slate-50 py-3 rounded border border-slate-100 mb-4">
              <p className="font-mono text-xl text-indigo-600 font-bold">
                P(y=1) = 1 / (1 + e⁻z)
              </p>
            </div>
            <p className="text-slate-600 italic">
              where z = b₀ + b₁x₁ + b₂x₂ + ...
            </p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h4 className="font-bold text-xl mb-3 text-slate-800">
              Worked Example
            </h4>
            <p className="text-lg text-slate-700 mb-3">
              Suppose <strong className="font-mono">z = 2</strong>.
            </p>
            <div className="space-y-2 text-lg text-slate-700">
              <p><strong>Step 1:</strong> e⁻² ≈ 0.1353</p>
              <p><strong>Step 2:</strong> 1 + 0.1353 = 1.1353</p>
              <p><strong>Step 3:</strong> P = 1 ÷ 1.1353 ≈ <strong className="text-indigo-700">0.881</strong></p>
            </div>
            <p className="text-lg text-slate-700 font-medium bg-white p-2 rounded inline-block shadow-sm text-indigo-900 mt-3">
              Meaning: about 88.1% probability for class 1 in this example.
            </p>
          </div>
          <div className="flex-1 w-full h-48 bg-white border border-slate-200 rounded p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sigmoidData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="z" hide />
                <YAxis domain={[-0.1, 1.1]} hide />
                <Line
                  type="monotone"
                  dataKey="p"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-emerald-900 border-l-4 border-l-emerald-500">
            <strong className="block mb-2">Advantages</strong>
            <ul className="list-disc pl-5">
              <li>Simple and fast</li>
              <li>Provides probability scores</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded text-rose-900 border-l-4 border-l-rose-500">
            <strong className="block mb-2">Disadvantages</strong>
            <ul className="list-disc pl-5">
              <li>Basic form learns a linear decision boundary in the supplied feature space</li>
              <li>Can be influenced by extreme feature values, especially without careful preprocessing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. K-Nearest Neighbors (KNN) */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-emerald-900 mb-4 border-b-2 border-emerald-200 pb-2 inline-block">
          2. K-Nearest Neighbors (KNN)
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          KNN predicts class based on the nearest data points.
        </p>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm mb-8 text-center text-emerald-900">
          <p className="text-2xl font-bold text-emerald-800 italic">
            "Nearby examples may have similar labels"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-72">
            <h4 className="font-bold text-center text-slate-800 mb-2">
              KNN Visualization
            </h4>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 0, left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" dataKey="x" name="X" domain={[0, 10]} />
                <YAxis type="number" dataKey="y" name="Y" domain={[0, 10]} />
                <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} />
                <Legend />
                <Scatter
                  name="Class A"
                  data={knnData.filter((d) => d.class === "Class A")}
                  fill="#10b981"
                />
                <Scatter
                  name="Class B"
                  data={knnData.filter((d) => d.class === "Class B")}
                  fill="#6366f1"
                />
                <Scatter
                  name="New Point"
                  data={knnData.filter((d) => d.class === "New Data")}
                  fill="#f59e0b"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3 text-slate-800">
              KNN Workflow
            </h4>
            <div className="bg-slate-900 p-5 rounded-xl shadow-sm text-slate-300 font-mono text-sm w-full text-center space-y-3">
              <div className="bg-slate-800 py-2 border border-slate-700 rounded">
                New Data Point
              </div>
              <div>↓</div>
              <div className="bg-slate-800 py-2 border border-slate-700 rounded">
                Find Nearest Neighbors
              </div>
              <div>↓</div>
              <div className="bg-slate-800 py-2 border border-slate-700 rounded">
                Majority Voting
              </div>
              <div>↓</div>
              <div className="bg-emerald-700 text-white font-bold py-2 border border-emerald-600 rounded">
                Predict Class
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-emerald-900 border-l-4 border-l-emerald-500">
            <strong className="block mb-2">Advantages</strong>
            <ul className="list-disc pl-5">
              <li>Easy implementation</li>
              <li>Simple fit stage: mainly stores the training examples</li>
              <li>Can work well on smaller datasets with meaningful distance measures</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded text-rose-900 border-l-4 border-l-rose-500">
            <strong className="block mb-2">Disadvantages</strong>
            <ul className="list-disc pl-5">
              <li>Slow for large datasets (distance calcs)</li>
              <li>Sensitive to scaling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Decision Tree */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-amber-900 mb-4 border-b-2 border-amber-200 pb-2 inline-block">
          3. Decision Tree
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          Decision Trees use rule-based splitting. The model repeatedly splits
          data based on features to arrive at a prediction.
        </p>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm mb-8">
          <h4 className="font-bold text-amber-900 mb-4 text-center text-xl">
            Decision Tree Visualization
          </h4>
          <div className="font-mono text-center flex flex-col items-center">
            <div className="bg-white border-2 border-amber-300 px-6 py-3 rounded shadow-sm text-amber-900 font-bold text-lg">
              Is Age &gt; 30?
            </div>
            <div className="flex w-64 justify-between mt-2 mb-2 px-8">
              <span className="text-emerald-600 font-bold border-r-2 border-amber-300 pr-2 pb-2">
                YES ↙
              </span>
              <span className="text-rose-600 font-bold border-l-2 border-amber-300 pl-2 pb-2">
                ↘ NO
              </span>
            </div>
            <div className="flex w-80 justify-between mt-0">
              <div className="flex flex-col items-center">
                <div className="bg-white border-2 border-amber-300 px-4 py-2 rounded shadow-sm text-amber-900 font-bold">
                  Income &gt; 50K?
                </div>
                <div className="text-indigo-400 my-1">↓</div>
                <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-6 py-2 rounded-xl font-bold">
                  Approve
                </div>
              </div>
              <div className="flex flex-col items-center justify-end">
                <div className="bg-rose-100 border-2 border-rose-400 text-rose-800 px-6 py-2 rounded-xl font-bold">
                  Reject
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-emerald-900 border-l-4 border-l-emerald-500">
            <strong className="block mb-2">Advantages</strong>
            <ul className="list-disc pl-5">
              <li>Easy visualization (human-readable)</li>
              <li>Handles nonlinearity</li>
              <li>No scaling required</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded text-rose-900 border-l-4 border-l-rose-500">
            <strong className="block mb-2">Disadvantages</strong>
            <ul className="list-disc pl-5">
              <li>Overfitting risk (deep trees memorize)</li>
              <li>Instability (small data changes affect structure)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Random Forest */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-rose-800 mb-4 border-b-2 border-rose-200 pb-2 inline-block">
          4. Random Forest
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          Random Forest combines many decision trees (Ensemble Learning) and
          aggregates their predictions. This often reduces variance compared with relying on one tree.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-900 p-6 rounded-xl shadow-sm text-slate-300 font-mono text-sm w-full text-center space-y-3">
            <h4 className="font-bold text-white mb-2 text-lg font-sans">
              Workflow
            </h4>
            <div className="bg-slate-800 py-2 border border-slate-700 rounded">
              Dataset
            </div>
            <div>↓</div>
            <div className="bg-slate-800 py-2 border border-slate-700 rounded flex justify-around">
              <span>Tree 1</span>
              <span>Tree 2</span>
              <span>Tree 3</span>
            </div>
            <div>↓</div>
            <div className="bg-slate-800 py-2 border border-slate-700 rounded">
              Combine Predictions
            </div>
            <div>↓</div>
            <div className="bg-rose-800 text-white font-bold py-2 border border-rose-700 rounded border-b-4">
              Final Output
            </div>
          </div>

          <div className="bg-white border border-rose-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
            <h4 className="font-bold text-rose-900 mb-4 text-center text-xl">
              Visualization
            </h4>
            <ul className="space-y-3 text-lg font-bold text-slate-700">
              <li className="flex justify-between bg-slate-50 p-2 rounded border border-slate-200">
                <span>Tree 1</span>{" "}
                <span className="text-indigo-600 bg-indigo-50 px-2 rounded">
                  → Cat
                </span>
              </li>
              <li className="flex justify-between bg-slate-50 p-2 rounded border border-slate-200">
                <span>Tree 2</span>{" "}
                <span className="text-indigo-600 bg-indigo-50 px-2 rounded">
                  → Cat
                </span>
              </li>
              <li className="flex justify-between bg-slate-50 p-2 rounded border border-slate-200">
                <span>Tree 3</span>{" "}
                <span className="text-sky-600 bg-sky-50 px-2 rounded">
                  → Dog
                </span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t-2 border-rose-100 text-center text-xl font-bold text-rose-800 flex items-center justify-center gap-4">
              Majority Vote <span className="text-rose-400">→</span>{" "}
              <span className="bg-rose-100 border border-rose-300 text-rose-900 px-4 py-1.5 rounded-lg shadow-sm">
                Cat
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-emerald-900 border-l-4 border-l-emerald-500">
            <strong className="block mb-2">Advantages</strong>
            <ul className="list-disc pl-5">
              <li>Often a strong baseline for tabular data</li>
              <li>Can reduce variance compared with a single deep tree</li>
              <li>Handles nonlinear relationships and feature interactions</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded text-rose-900 border-l-4 border-l-rose-500">
            <strong className="block mb-2">Disadvantages</strong>
            <ul className="list-disc pl-5">
              <li>Slower to compute predictions</li>
              <li>Less interpretable than a single small decision tree</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Naive Bayes */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-sky-900 mb-4 border-b-2 border-sky-200 pb-2 inline-block">
          5. Naive Bayes
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          Naive Bayes uses probability theory based on Bayes Theorem.
        </p>

        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <h4 className="font-bold text-xl mb-3 text-sky-900">Bayes Theorem</h4>
          <div className="flex justify-center bg-white py-4 rounded border border-sky-200 mb-4 shadow-sm">
            <p className="font-mono text-xl text-sky-800 font-bold">
              P(A|B) = [P(B|A) * P(A)] / P(B)
            </p>
          </div>
          <div className="bg-white border border-sky-100 rounded p-4 text-sky-900 font-medium font-mono text-center">
            Posterior = (Likelihood * Prior) / Evidence
          </div>
          <div className="mt-4 pt-4 border-t border-sky-200">
            <h5 className="font-bold text-lg mb-2 text-sky-900">
              Worked Example:
            </h5>
            <ul className="text-sky-800 font-mono space-y-1 ml-4 list-disc mb-3">
              <li>P(A) = 0.5</li>
              <li>P(B|A) = 0.8</li>
              <li>P(B) = 0.5</li>
            </ul>
            <div className="space-y-2 text-sky-900">
              <p><strong>Step 1:</strong> Likelihood × Prior = 0.8 × 0.5 = 0.4</p>
              <p><strong>Step 2:</strong> 0.4 ÷ Evidence 0.5 = 0.8</p>
              <p className="font-bold">So P(A|B) = 0.8, or 80%.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-emerald-900 border-l-4 border-l-emerald-500">
            <strong className="block mb-2">Advantages</strong>
            <ul className="list-disc pl-5">
              <li>Very fast and scalable</li>
              <li>Works well for text/NLP</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded text-rose-900 border-l-4 border-l-rose-500">
            <strong className="block mb-2">Disadvantages</strong>
            <ul className="list-disc pl-5">
              <li>Assumes feature independence (often unrealistic)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. SVM */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-fuchsia-900 mb-4 border-b-2 border-fuchsia-200 pb-2 inline-block">
          6. Support Vector Machine (SVM)
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-4">
          SVM looks for a separating boundary (hyperplane) with a large margin between classes. With soft margins and kernels, it can also handle overlap and nonlinear boundaries.
        </p>

        <div className="bg-slate-900 text-slate-100 p-8 rounded-xl font-mono text-center mb-8 shadow-sm text-lg tracking-wider border border-slate-700">
          <h4 className="text-slate-400 font-sans text-xl mb-6 font-bold tracking-normal italic">
            Maximum Margin Separation
          </h4>
          <div className="flex justify-between items-center bg-slate-800 p-4 rounded border border-slate-600">
            <div className="text-fuchsia-400 font-bold flex flex-col items-center">
              <span>Class A</span>
              <span className="text-3xl mt-2">● ●</span>
            </div>
            <div className="flex flex-col items-center flex-1 mx-4">
              <span className="text-white opacity-40 text-sm mb-1">
                ← Margin →
              </span>
              <div className="w-full h-1 bg-white border-y-2 border-dashed border-white opacity-70"></div>
              <span className="text-white opacity-40 text-sm mt-1">
                Best Boundary
              </span>
            </div>
            <div className="text-indigo-400 font-bold flex flex-col items-center">
              <span>Class B</span>
              <span className="text-3xl mt-2">▲ ▲</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-emerald-900 border-l-4 border-l-emerald-500">
            <strong className="block mb-2">Advantages</strong>
            <ul className="list-disc pl-5">
              <li>Can work well in high-dimensional feature spaces</li>
              <li>Margin-based objective can generalize well with suitable settings</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded text-rose-900 border-l-4 border-l-rose-500">
            <strong className="block mb-2">Disadvantages</strong>
            <ul className="list-disc pl-5">
              <li>Slow for large datasets</li>
              <li>Harder to tune (requires kernel selection)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 7. Neural Networks */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-teal-900 mb-4 border-b-2 border-teal-200 pb-2 inline-block">
          7. Neural Networks
        </h3>
        <p className="text-lg leading-relaxed text-slate-700 mb-6">
          Neural Networks use layers of weighted calculations and nonlinear activation functions to learn useful representations and complex relationships from data.
        </p>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-xl mb-8 shadow-sm flex flex-col items-center text-center font-bold tracking-widest font-mono">
          <h4 className="text-slate-400 font-sans text-xl mb-8 font-bold tracking-normal italic w-full text-left">
            Deep Learning Workflow
          </h4>
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-3xl">
            <div className="mb-4 md:mb-0 flex flex-col items-center">
              <p className="text-slate-400 text-xs mb-2">Input Layer</p>
              <span className="border border-teal-500/30 p-3 rounded-lg bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                Input Data
              </span>
            </div>
            <span className="text-teal-400 text-xl hidden md:block">→</span>
            <span className="text-teal-400 text-xl block md:hidden mb-4">
              ↓
            </span>
            <div className="mb-4 md:mb-0 flex flex-col items-center">
              <p className="text-slate-400 text-xs mb-2">Hidden Layer 1</p>
              <span className="border border-teal-500/50 p-3 rounded-lg bg-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                Features
              </span>
            </div>
            <span className="text-teal-400 text-xl hidden md:block">→</span>
            <span className="text-teal-400 text-xl block md:hidden mb-4">
              ↓
            </span>
            <div className="mb-4 md:mb-0 flex flex-col items-center">
              <p className="text-slate-400 text-xs mb-2">Hidden Layer 2</p>
              <span className="border border-teal-500/70 p-3 rounded-lg bg-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                Representations
              </span>
            </div>
            <span className="text-teal-400 text-xl hidden md:block">→</span>
            <span className="text-teal-400 text-xl block md:hidden mb-4">
              ↓
            </span>
            <div className="flex flex-col items-center">
              <p className="text-slate-400 text-xs mb-2">Output Layer</p>
              <span className="border-2 border-teal-400 text-teal-100 p-3 rounded-lg bg-teal-600/50 shadow-[0_0_15px_rgba(20,184,166,0.5)]">
                Classification
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-emerald-900 border-l-4 border-l-emerald-500">
            <strong className="block mb-2">Advantages</strong>
            <ul className="list-disc pl-5">
              <li>Can model very complex nonlinear patterns</li>
              <li>Especially useful in many image, audio and language tasks</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded text-rose-900 border-l-4 border-l-rose-500">
            <strong className="block mb-2">Disadvantages</strong>
            <ul className="list-disc pl-5">
              <li>Often benefits from substantial data or pretrained models</li>
              <li>Can require significant training computation and tuning</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Classification Metrics */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Target className="mr-3 text-indigo-600" /> Classification Metrics
      </h2>

      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        The Confusion Matrix is fundamental for evaluating classification. It
        breaks down predicted vs actual into True Positive (TP), True Negative
        (TN), False Positive (FP), False Negative (FN).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-4">A Tiny Confusion Matrix</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-center border border-slate-200">
              <thead className="bg-slate-100">
                <tr><th className="p-3">Actual ↓ / Predicted →</th><th className="p-3">Positive</th><th className="p-3">Negative</th></tr>
              </thead>
              <tbody>
                <tr className="border-t"><th className="p-3 bg-slate-50">Positive</th><td className="p-3 bg-emerald-50 font-bold">TP = 8</td><td className="p-3 bg-rose-50 font-bold">FN = 2</td></tr>
                <tr className="border-t"><th className="p-3 bg-slate-50">Negative</th><td className="p-3 bg-amber-50 font-bold">FP = 1</td><td className="p-3 bg-sky-50 font-bold">TN = 7</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="text-xl font-bold text-indigo-900 mb-3">Read the Four Boxes</h3>
          <ul className="space-y-2 text-lg text-slate-700">
            <li><strong>TP:</strong> positive case predicted positive</li>
            <li><strong>TN:</strong> negative case predicted negative</li>
            <li><strong>FP:</strong> false alarm</li>
            <li><strong>FN:</strong> missed positive case</li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Worked Metric Example</h3>
        <div className="space-y-4 text-lg text-slate-700">
          <div><strong>Accuracy:</strong> (8 + 7) ÷ 18 = 15 ÷ 18 ≈ <strong>83.3%</strong></div>
          <div><strong>Precision:</strong> 8 ÷ (8 + 1) = 8 ÷ 9 ≈ <strong>88.9%</strong></div>
          <div><strong>Recall:</strong> 8 ÷ (8 + 2) = 8 ÷ 10 = <strong>80%</strong></div>
          <div><strong>F1:</strong> 2 × (0.889 × 0.80) ÷ (0.889 + 0.80) ≈ <strong>84.2%</strong></div>
        </div>
        <p className="text-sm text-slate-600 mt-4">Different applications care about different mistakes. For example, a medical screening system may care strongly about missed positive cases (false negatives).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 text-xl mb-2">Accuracy</h4>
          <p className="text-slate-600 mb-3 text-lg">
            Measures overall correctness.
          </p>
          <p className="font-mono bg-slate-50 text-slate-800 p-3 text-center rounded text-sm lg:text-base font-bold border border-slate-200">
            Accuracy = (TP + TN) / Total
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 text-xl mb-2">Precision</h4>
          <p className="text-slate-600 mb-3 text-lg">
            Correctness of positive predictions.
          </p>
          <p className="font-mono bg-slate-50 text-slate-800 p-3 text-center rounded text-sm lg:text-base font-bold border border-slate-200">
            Precision = TP / (TP + FP)
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 text-xl mb-2">Recall</h4>
          <p className="text-slate-600 mb-3 text-lg">
            Ability to find all positives.
          </p>
          <p className="font-mono bg-slate-50 text-slate-800 p-3 text-center rounded text-sm lg:text-base font-bold border border-slate-200">
            Recall = TP / (TP + FN)
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 text-xl mb-2">F1 Score</h4>
          <p className="text-slate-600 mb-3 text-lg">
            Harmonic mean of precision and recall.
          </p>
          <p className="font-mono bg-slate-50 text-slate-800 p-3 text-center rounded text-xs lg:text-sm font-bold border border-slate-200">
            F1 = 2 * (Prec * Rec) / (Prec + Rec)
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Choosing the Right Algorithm */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 font-sans flex items-center">
        <ShieldAlert className="mr-3 text-indigo-600" /> Choosing Algorithm &
        Best Practices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">
            Useful Starting Points (Not Fixed Rules)
          </h4>
          <ul className="space-y-4 text-lg">
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">
                Need a simple interpretable baseline
              </span>
              <span className="text-indigo-800 font-bold font-mono bg-indigo-50 px-3 py-1 rounded w-max mt-1 border border-indigo-100">
                Logistic Regression
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">
                Distance is meaningful and prediction set is manageable
              </span>
              <span className="text-emerald-800 font-bold font-mono bg-emerald-50 px-3 py-1 rounded w-max mt-1 border border-emerald-100">
                KNN
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">
                Need easy-to-follow rules
              </span>
              <span className="text-amber-800 font-bold font-mono bg-amber-50 px-3 py-1 rounded w-max mt-1 border border-amber-100">
                Decision Tree
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">
                Text / count-like features as a fast baseline
              </span>
              <span className="text-sky-800 font-bold font-mono bg-sky-50 px-3 py-1 rounded w-max mt-1 border border-sky-100">
                Naive Bayes
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">
                Margin-based model may suit the feature space
              </span>
              <span className="text-fuchsia-800 font-bold font-mono bg-fuchsia-50 px-3 py-1 rounded w-max mt-1 border border-fuchsia-100">
                SVM
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">
                Complex image, audio or language representations
              </span>
              <span className="text-teal-800 font-bold font-mono bg-teal-50 px-3 py-1 rounded w-max mt-1 border border-teal-100">
                Neural Networks
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
            <h4 className="text-xl font-bold text-rose-800 mb-4 flex items-center">
              <XIcon className="mr-2 w-6 h-6" /> Common Mistakes
            </h4>
            <ul className="list-none space-y-3 text-rose-800 text-lg">
              <li className="bg-white px-4 py-2 rounded shadow-sm border border-rose-100">
                <strong className="text-rose-900 block pb-1">
                  Ignoring feature scaling:
                </strong>{" "}
                <span className="text-base text-rose-700">
                  KNN and SVM are especially sensitive to feature scale.
                </span>
              </li>
              <li className="bg-white px-4 py-2 rounded shadow-sm border border-rose-100">
                <strong className="text-rose-900 block pb-1">
                  Using only accuracy:
                </strong>{" "}
                <span className="text-base text-rose-700">
                  Misleading for imbalanced datasets.
                </span>
              </li>
              <li className="bg-white px-4 py-2 rounded shadow-sm border border-rose-100">
                <strong className="text-rose-900 block pb-1">
                  Overfitting trees:
                </strong>{" "}
                <span className="text-base text-rose-700">
                  Very deep trees can fit noise; control tree complexity and validate it.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm">
            <h4 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
              <CheckCircle className="mr-2 w-6 h-6 text-emerald-600" /> Best
              Practices
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-emerald-800 text-lg font-medium">
              <li>Scale features when the chosen algorithm is scale-sensitive.</li>
              <li>Use validation or cross-validation for model selection.</li>
              <li>Handle class imbalance when it affects the problem; do not rebalance blindly.</li>
              <li>Evaluate metrics that match the real cost of mistakes.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Common Classification Questions</h2>
        <div className="space-y-4 text-lg text-slate-700">
          <div><strong>Is classification only Yes/No?</strong><br />No. Binary classification has two classes, multiclass has more than two, and multilabel classification can assign several labels to one example.</div>
          <div><strong>Is 0.50 always the correct threshold?</strong><br />No. Threshold choice depends on the problem and the relative cost of false positives and false negatives.</div>
          <div><strong>Is accuracy always the best metric?</strong><br />No. Precision, recall, F1, ROC-AUC and other metrics may be more useful depending on class balance and business goals.</div>
          <div><strong>What should I learn next?</strong><br />Start with <a href="/learn/logistic-regression" className="text-indigo-700 font-semibold hover:underline">Logistic Regression</a>, then explore <a href="/learn/decision-trees" className="text-indigo-700 font-semibold hover:underline">Decision Trees</a>, <a href="/learn/knn" className="text-indigo-700 font-semibold hover:underline">KNN</a>, <a href="/learn/naive-bayes" className="text-indigo-700 font-semibold hover:underline">Naive Bayes</a>, and <a href="/learn/svm" className="text-indigo-700 font-semibold hover:underline">SVM</a>. For evaluation, continue to the <a href="/learn/confusion-matrix" className="text-indigo-700 font-semibold hover:underline">Confusion Matrix</a> lesson.</div>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BookOpen className="mr-3 text-indigo-400" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Classification algorithms enable machine learning systems to assign discrete labels such as spam/not spam, disease/no disease, or one category among many. Different algorithms make those decisions in different ways, so the best choice depends on the data, the constraints, and the cost of mistakes.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Because no single classifier is best for every dataset, robust classification requires comparing suitable models, validating them properly, and using evaluation metrics that match the real goal—not accuracy alone.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           Many classifiers produce probabilities or decision scores rather than certainties. The practical challenge is choosing a model, metric, and decision rule that fit the real-world cost of mistakes.
         </p>
      </div>

    </>
  );
}
