import React from "react";
import {
  LayoutGrid,
  AlertTriangle,
  ArrowRight,
  Code,
} from "lucide-react";

function CodeBlock({
  code,
  output,
  title,
}: {
  code: string;
  output?: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm not-prose">
      {title && (
        <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm border-b border-slate-700 flex items-center gap-2 font-mono">
          <Code className="w-4 h-4" /> {title}
        </div>
      )}
      <div className="p-4 text-sm font-mono overflow-x-auto text-slate-200">
        <pre className="!m-0 max-w-full min-w-full">
          <code className="language-python">{code}</code>
        </pre>
      </div>
      {output && (
        <div className="bg-white border-t border-slate-200">
          <div className="bg-slate-50 text-slate-500 px-4 py-1 text-xs border-b border-slate-200 uppercase tracking-wider font-semibold">
            Output
          </div>
          <div className="p-4 overflow-x-auto text-sm text-slate-800 bg-white">
            {typeof output === "string" ? (
              <pre className="!m-0 font-mono">{output}</pre>
            ) : (
              output
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function EncodingCategoricalContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Encoding Categorical Data</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-emerald-500 pl-4 py-1 bg-slate-50">
        Many Machine Learning algorithms expect numerical input. If a dataset
        contains categories such as <strong>Red</strong>, <strong>Blue</strong>,
        <strong>Delhi</strong>, or <strong>High</strong>, we often need to
        represent those categories numerically before training the model. This
        process is called <strong>categorical encoding</strong>.
      </p>

      <p>
        Categorical encoding is an important preprocessing technique in Machine
        Learning. The correct method depends on what the category means. For
        example, <strong>Red / Blue / Green</strong> have no natural order, while
        <strong>Low / Medium / High</strong> do have a meaningful order.
      </p>

      <p>
        This guide explains categorical encoding from beginner to advanced level
        using simple examples, tables, Scikit-learn implementations, and practical
        best practices.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Encoding in Simple Words
      </h2>
      <p>
        Imagine a school dataset with a column called <strong>T-shirt Size</strong>.
        A model may not be able to use the words <code>S</code>, <code>M</code>, and
        <code>L</code> directly. Encoding changes those categories into a numerical
        form while trying to preserve their meaning.
      </p>

      <div className="grid sm:grid-cols-4 gap-3 my-6 not-prose">
        {[
          ["1", "Read the category", 'Example: "Medium"'],
          ["2", "Ask if order matters", "Small < Medium < Large"],
          ["3", "Choose an encoder", "Ordinal encoding"],
          ["4", "Create numbers", "Small=0, Medium=1, Large=2"],
        ].map(([step, title, text]) => (
          <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              {step}
            </div>
            <p className="m-0 font-bold text-slate-800">{title}</p>
            <p className="mt-1 mb-0 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full border-collapse overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b p-3 text-left">Column</th>
              <th className="border-b p-3 text-left">Values</th>
              <th className="border-b p-3 text-left">Does order matter?</th>
              <th className="border-b p-3 text-left">Simple starting choice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b p-3 font-semibold">City</td>
              <td className="border-b p-3">Delhi, Mumbai, Chennai</td>
              <td className="border-b p-3">No</td>
              <td className="border-b p-3 text-emerald-700 font-semibold">One-hot encoding</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">T-shirt Size</td>
              <td className="p-3">Small, Medium, Large</td>
              <td className="p-3">Yes</td>
              <td className="p-3 text-indigo-700 font-semibold">Ordinal encoding</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 my-6 not-prose">
        <p className="m-0 font-bold text-amber-900">The key question</p>
        <p className="mt-1 mb-0 text-sm text-amber-800">
          Before encoding a category, ask: <strong>Does this category have a real,
          meaningful order?</strong> That one question prevents many beginner mistakes.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        What is Categorical Data?
      </h2>
      <p>
        Categorical data represents labels, groups, or categories rather than
        measurable numeric quantities. Unlike numerical features like salary or
        age, categorical variables describe qualities or classes.
      </p>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Example Values
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200 text-sm">
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">Gender</td>
              <td className="px-6 py-3 text-slate-600">Male, Female</td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">Color</td>
              <td className="px-6 py-3 text-slate-600">Red, Blue, Green</td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">City</td>
              <td className="px-6 py-3 text-slate-600">
                Bangalore, Delhi, Mumbai
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">
                Education
              </td>
              <td className="px-6 py-3 text-slate-600">
                Graduate, Postgraduate
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">
                Product Type
              </td>
              <td className="px-6 py-3 text-slate-600">
                Mobile, Laptop, Tablet
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">
        Why Machine Learning Models Need Encoding
      </h3>
      <p className="text-lg leading-relaxed mb-4">
        Many commonly used ML estimators expect numerical feature arrays. Text
        categories such as{" "}
        <code className="bg-slate-100 px-1 rounded text-sm">Red</code>,{" "}
        <code className="bg-slate-100 px-1 rounded text-sm">Blue</code>, or{" "}
        <code className="bg-slate-100 px-1 rounded text-sm">Green</code> therefore
        need a suitable numerical representation before those estimators can use
        them. The representation matters because different algorithms use the
        numbers in different ways.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6 not-prose">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="font-bold text-blue-800 text-sm mb-1">📐 Distance calculations</p>
          <p className="text-blue-700 text-sm leading-relaxed">KNN and many clustering methods measure numerical distances, so arbitrary category codes can create misleading distances.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="font-bold text-indigo-800 text-sm mb-1">📉 Gradient descent</p>
          <p className="text-indigo-700 text-sm leading-relaxed">Linear models and neural networks optimise numerical parameters, so categorical inputs need a numerical representation.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <p className="font-bold text-emerald-800 text-sm mb-1">📊 Statistical optimisation</p>
          <p className="text-emerald-700 text-sm leading-relaxed">Linear and logistic regression operate on numerical feature matrices and can be sensitive to fake order introduced by poor encoding.</p>
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
          <p className="font-bold text-violet-800 text-sm mb-1">🔢 Matrix operations</p>
          <p className="text-violet-700 text-sm leading-relaxed">Neural networks eventually work with numerical tensors; categories may be one-hot encoded or represented through learned embeddings.</p>
        </div>
      </div>
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 mb-6 not-prose">
        <p className="font-bold text-amber-800 mb-1">💡 The core problem</p>
        <p className="text-amber-700 text-sm">When a model expects numeric features, a text category such as <code className="bg-white px-1 rounded">Red</code> needs to be represented in a usable numerical form. Encoding builds that bridge while trying not to invent relationships that do not exist.</p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Types of Categorical Variables
      </h2>

      <div className="w-full flex justify-center my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose">
        <svg
          width="600"
          height="300"
          viewBox="0 0 600 300"
          className="w-full h-auto max-w-2xl font-sans"
        >
          {/* Root Node */}
          <rect x="200" y="20" width="200" height="40" rx="6" fill="#1e293b" />
          <text
            x="300"
            y="45"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Categorical Data
          </text>

          {/* Lines from Root */}
          <path
            d="M 300,60 L 300,100 L 150,100 L 150,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 300,60 L 300,100 L 450,100 L 450,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />

          {/* Nominal Node */}
          <rect x="75" y="120" width="150" height="40" rx="6" fill="#10b981" />
          <text
            x="150"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Nominal
          </text>
          <text
            x="150"
            y="180"
            fill="#475569"
            textAnchor="middle"
            fontSize="12"
          >
            No Hierarchy / No Order
          </text>
          <rect
            x="75"
            y="200"
            width="150"
            height="60"
            rx="4"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />
          <text
            x="150"
            y="225"
            fill="#334155"
            textAnchor="middle"
            fontSize="12"
          >
            Red, Blue, Green
          </text>
          <text
            x="150"
            y="245"
            fill="#334155"
            textAnchor="middle"
            fontSize="12"
          >
            Cat, Dog, Bird
          </text>

          {/* Ordinal Node */}
          <rect x="375" y="120" width="150" height="40" rx="6" fill="#6366f1" />
          <text
            x="450"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Ordinal
          </text>
          <text
            x="450"
            y="180"
            fill="#475569"
            textAnchor="middle"
            fontSize="12"
          >
            Meaningful Order
          </text>
          <rect
            x="375"
            y="200"
            width="150"
            height="60"
            rx="4"
            fill="#f8fafc"
            stroke="#e2e8f0"
          />
          <text
            x="450"
            y="225"
            fill="#334155"
            textAnchor="middle"
            fontSize="12"
          >
            Low {"<"} Medium {"<"} High
          </text>
          <text
            x="450"
            y="245"
            fill="#334155"
            textAnchor="middle"
            fontSize="12"
          >
            Small {"<"} Medium {"<"} Large
          </text>
        </svg>
      </div>

      <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
        <div className="bg-white border text-center border-slate-200 rounded-xl p-6 shadow-sm">
          <strong className="text-xl text-slate-800 block mb-2">
            1. Nominal Data
          </strong>
          <p className="text-sm text-slate-600 mb-4">
            Categories that have NO hierarchy or order. One is not "greater"
            than the other.
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold bg-emerald-50 p-2 rounded">
            Cat <span className="text-slate-300">|</span> Dog{" "}
            <span className="text-slate-300">|</span> Bird
          </div>
        </div>
        <div className="bg-white border text-center border-slate-200 rounded-xl p-6 shadow-sm">
          <strong className="text-xl text-slate-800 block mb-2">
            2. Ordinal Data
          </strong>
          <p className="text-sm text-slate-600 mb-4">
            Categories that have a clear, mathematical hierarchy or meaningful
            order.
          </p>
          <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold bg-indigo-50 p-2 rounded">
            Low <ArrowRight className="h-4 w-4" /> Medium{" "}
            <ArrowRight className="h-4 w-4" /> High
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Major Encoding Techniques
      </h2>
      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500 uppercase tracking-wider">
                Encoding Method
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-500 uppercase tracking-wider">
                Suitable For
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-500 uppercase tracking-wider">
                Dimensionality
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr>
              <td className="px-4 py-3 font-medium">Label Encoding</td>
              <td className="px-4 py-3 text-slate-600">
                Classification target labels (y)
              </td>
              <td className="px-4 py-3 text-slate-600 bg-green-50">Low</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">One-Hot Encoding</td>
              <td className="px-4 py-3 text-slate-600">Nominal data</td>
              <td className="px-4 py-3 text-slate-600 bg-red-50">High</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Ordinal Encoding</td>
              <td className="px-4 py-3 text-slate-600">
                Ordered categories (features)
              </td>
              <td className="px-4 py-3 text-slate-600 bg-green-50">Low</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Binary Encoding</td>
              <td className="px-4 py-3 text-slate-600">
                High-cardinality data
              </td>
              <td className="px-4 py-3 text-slate-600 bg-yellow-50">Medium</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Frequency Encoding</td>
              <td className="px-4 py-3 text-slate-600">High-cardinality categories when frequency is informative</td>
              <td className="px-4 py-3 text-slate-600 bg-green-50">Low</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Target Encoding</td>
              <td className="px-4 py-3 text-slate-600">
                Advanced ML / High Cardinality
              </td>
              <td className="px-4 py-3 text-slate-600 bg-green-50">Low</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-2">1. Label Encoding</h3>
      <p>
        In Scikit-learn, <strong>LabelEncoder</strong> is designed for the
        <strong> target variable</strong> <code>y</code>. For example, a
        classification target containing <code>Fail</code> and <code>Pass</code>
        can be converted to 0 and 1. The model still treats these as class labels,
        not as measurements where one class is "twice" another.
      </p>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="w-full max-w-xl border-collapse rounded-xl border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b p-3 text-left">Original target</th>
              <th className="border-b p-3 text-center">Encoded target</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-b p-3">Pass</td><td className="border-b p-3 text-center font-mono">1</td></tr>
            <tr><td className="border-b p-3">Fail</td><td className="border-b p-3 text-center font-mono">0</td></tr>
            <tr><td className="p-3">Pass</td><td className="p-3 text-center font-mono">1</td></tr>
          </tbody>
        </table>
      </div>

      <CodeBlock
        title="label_encoding.py"
        code={`from sklearn.preprocessing import LabelEncoder

y = ['Pass', 'Fail', 'Pass', 'Pass']

encoder = LabelEncoder()
encoded_y = encoder.fit_transform(y)

print("Original:", y)
print("Encoded: ", encoded_y)
print("Classes: ", encoder.classes_)`}
        output={`Original: ['Pass', 'Fail', 'Pass', 'Pass']
Encoded:  [1 0 1 1]
Classes:  ['Fail' 'Pass']`}
      />

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-8 mt-6 not-prose">
        <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
          <AlertTriangle className="h-5 w-5" /> Do not confuse target labels with input features
        </div>
        <p className="text-sm text-yellow-900 m-0">
          Scikit-learn's <code>LabelEncoder</code> is for <code>y</code>, not for ordinary
          input columns <code>X</code>. For an input feature such as City, use an
          encoder chosen for the feature meaning—for example One-Hot Encoding for
          unordered cities or Ordinal Encoding for truly ordered categories.
        </p>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-2">
        Why not simply write Red = 1, Blue = 2, Green = 3?
      </h3>
      <p>
        Those numbers accidentally create an order and distance that the colors do
        not have. A distance-based or linear model may treat Green (3) as farther
        from Red (1) than Blue (2), even though that relationship was invented by
        us.
      </p>
      <div className="overflow-x-auto my-5 not-prose">
        <table className="w-full max-w-2xl border-collapse rounded-xl border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-50"><tr><th className="border-b p-3 text-left">Color</th><th className="border-b p-3 text-center">Arbitrary code</th><th className="border-b p-3 text-left">Problem</th></tr></thead>
          <tbody>
            <tr><td className="border-b p-3">Red</td><td className="border-b p-3 text-center">1</td><td className="border-b p-3">No real reason Red should be "lowest"</td></tr>
            <tr><td className="border-b p-3">Blue</td><td className="border-b p-3 text-center">2</td><td className="border-b p-3">The code creates a fake middle position</td></tr>
            <tr><td className="p-3">Green</td><td className="p-3 text-center">3</td><td className="p-3">The code creates a fake highest position</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-2">
        2. One-Hot Encoding (Dummy Variables)
      </h3>
      <p>
        For Nominal Data (no order), we use <strong>One-Hot Encoding</strong>.
        Instead of assigning ascending numbers in a single column, we create{" "}
        <em>entirely new columns</em> for every single unique category. We use
        <code>1</code> to indicate "Hot" (True) and <code>0</code> for "Cold"
        (False).
      </p>
      <p>
        This is powerful because it removes any fake ordering between
        categories. The model no longer assumes Green {">"} Blue {">"} Red. Each
        category becomes completely independent.
      </p>

      <div className="overflow-x-auto my-6 border border-slate-200 rounded-lg shadow-sm not-prose">
        <table className="w-full text-left border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 border-b border-slate-200">Original Column</th>
              <th className="p-3 border-b border-slate-200 w-12 text-center text-slate-400">
                &rarr;
              </th>
              <th className="p-3 border-b border-slate-200 bg-emerald-50 text-emerald-800 border-l font-mono text-center">
                Color_Red
              </th>
              <th className="p-3 border-b border-slate-200 bg-emerald-50 text-emerald-800 border-l font-mono text-center">
                Color_Blue
              </th>
              <th className="p-3 border-b border-slate-200 bg-emerald-50 text-emerald-800 border-l font-mono text-center">
                Color_Green
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border-b border-slate-200">Red</td>
              <td className="p-3 border-b border-slate-200 text-center">
                &rarr;
              </td>
              <td className="p-3 border-b border-slate-200 border-l font-mono text-center bg-green-50 font-bold">
                1
              </td>
              <td className="p-3 border-b border-slate-200 border-l font-mono text-center text-slate-400">
                0
              </td>
              <td className="p-3 border-b border-slate-200 border-l font-mono text-center text-slate-400">
                0
              </td>
            </tr>
            <tr>
              <td className="p-3 border-b border-slate-200">Blue</td>
              <td className="p-3 border-b border-slate-200 text-center">
                &rarr;
              </td>
              <td className="p-3 border-b border-slate-200 border-l font-mono text-center text-slate-400">
                0
              </td>
              <td className="p-3 border-b border-slate-200 border-l font-mono text-center bg-green-50 font-bold">
                1
              </td>
              <td className="p-3 border-b border-slate-200 border-l font-mono text-center text-slate-400">
                0
              </td>
            </tr>
            <tr>
              <td className="p-3 border-slate-200">Green</td>
              <td className="p-3 border-slate-200 text-center">&rarr;</td>
              <td className="p-3 border-slate-200 border-l font-mono text-center text-slate-400">
                0
              </td>
              <td className="p-3 border-slate-200 border-l font-mono text-center text-slate-400">
                0
              </td>
              <td className="p-3 border-slate-200 border-l font-mono text-center bg-green-50 font-bold">
                1
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock
        title="one_hot_encoding.py"
        code={`import pandas as pd
from sklearn.preprocessing import OneHotEncoder

df = pd.DataFrame({'Color': ['Red', 'Blue', 'Green']})

# Pandas Method
encoded_pd = pd.get_dummies(df['Color'], dtype=int)
print("Pandas get_dummies:\\n", encoded_pd, "\\n")

# Scikit-Learn Method
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
result = encoder.fit_transform(df[['Color']])
print("Scikit-Learn OneHotEncoder:\\n", result)`}
        output={`Pandas get_dummies:
    Blue  Green  Red
0     0      0    1
1     1      0    0
2     0      1    0 

Scikit-Learn OneHotEncoder:
 [[0. 0. 1.]
 [1. 0. 0.]
 [0. 1. 0.]]`}
      />

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg my-6">
        <h4 className="font-bold text-slate-800 mt-0">
          Do we always need to drop one dummy column?
        </h4>
        <p className="text-sm mt-2 mb-2">
          With an intercept, a full set of one-hot columns is perfectly linearly
          dependent: if Red = 0 and Blue = 0, Green must be 1. For unregularized
          linear models, dropping one category is a common way to make the design
          matrix full rank and make coefficients easier to interpret.
        </p>
        <p className="text-sm m-0">
          <strong>Important:</strong> dropping a category is not a universal rule.
          Tree models do not need it, and regularized linear models can often work
          with all one-hot columns. Choose based on the model and your goal.
        </p>
        <pre className="text-xs bg-white p-2 rounded border mt-2">
          <code>{`pd.get_dummies(df, drop_first=True)
# or
OneHotEncoder(drop='first')`}</code>
        </pre>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-2">3. Ordinal Encoding</h3>
      <p>
        Ordinal Encoding is for <strong>input features that truly have an order</strong>.
        A familiar example is T-shirt size: Small comes before Medium, and Medium
        comes before Large.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 my-6 not-prose">
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-center"><div className="font-bold text-indigo-800">Small</div><div className="text-sm">0</div></div>
        <ArrowRight className="h-5 w-5 text-slate-400" />
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-center"><div className="font-bold text-indigo-800">Medium</div><div className="text-sm">1</div></div>
        <ArrowRight className="h-5 w-5 text-slate-400" />
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-center"><div className="font-bold text-indigo-800">Large</div><div className="text-sm">2</div></div>
      </div>

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 my-5 not-prose">
        <p className="m-0 text-sm text-indigo-900">
          <strong>Important:</strong> the codes preserve the order, but they do not
          automatically prove equal distance. Code 2 does not mean Large is
          "twice as large" as Medium.
        </p>
      </div>

      <CodeBlock
        title="ordinal_encoding.py"
        code={`from sklearn.preprocessing import OrdinalEncoder

data = [['Small'], ['Medium'], ['Large']]

# Tell the encoder the real order
encoder = OrdinalEncoder(categories=[['Small', 'Medium', 'Large']])

encoded = encoder.fit_transform(data)
print(encoded)`}
        output={`[[0.]
 [1.]
 [2.]]`}
      />

      <h3 className="text-xl font-bold mt-10 mb-2">4. Binary Encoding</h3>
      <p>
        Binary Encoding first converts categories into integers and then into
        binary format. One-Hot Encoding becomes inefficient for
        "high-cardinality" features (too many unique categories). Binary
        Encoding heavily reduces dimensionality.
      </p>

      <div className="overflow-x-auto my-4 not-prose">
        <table className="w-auto border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="border p-2">Category</th>
              <th className="border p-2">Integer</th>
              <th className="border p-2 bg-yellow-50 text-yellow-800 font-mono">
                Binary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Red</td>
              <td className="border p-2 text-center">1</td>
              <td className="border p-2 text-center font-mono">001</td>
            </tr>
            <tr>
              <td className="border p-2">Blue</td>
              <td className="border p-2 text-center">2</td>
              <td className="border p-2 text-center font-mono">010</td>
            </tr>
            <tr>
              <td className="border p-2">Green</td>
              <td className="border p-2 text-center">3</td>
              <td className="border p-2 text-center font-mono">011</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 my-4 not-prose">
        <strong>Note:</strong> this example uses the separate <code>category_encoders</code>
        Python package. The exact bit columns are determined by the encoder's learned mapping.
      </div>

      <CodeBlock
        title="binary_encoding.py"
        code={`import category_encoders as ce
import pandas as pd

df = pd.DataFrame({'Color': ['Red', 'Blue', 'Green']})

encoder = ce.BinaryEncoder(cols=['Color'])
result = encoder.fit_transform(df)

print(result)`}
        output={`   Color_0  Color_1
0        0        1
1        1        0
2        1        1`}
      />

      <h3 className="text-xl font-bold mt-10 mb-2">5. Frequency Encoding</h3>
      <p>
        Categories are replaced with their occurrence frequency. It is efficient
        for large datasets but causes information loss if categories share the
        same frequency.
      </p>
      <div className="overflow-x-auto my-5 not-prose">
        <table className="w-full max-w-xl border-collapse rounded-xl border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-50"><tr><th className="border-b p-3 text-left">Category</th><th className="border-b p-3 text-center">Count</th><th className="border-b p-3 text-left">Encoding</th></tr></thead>
          <tbody>
            <tr><td className="border-b p-3">Red</td><td className="border-b p-3 text-center">3</td><td className="border-b p-3">Red becomes 3</td></tr>
            <tr><td className="border-b p-3">Blue</td><td className="border-b p-3 text-center">2</td><td className="border-b p-3">Blue becomes 2</td></tr>
            <tr><td className="p-3">Green</td><td className="p-3 text-center">1</td><td className="p-3">Green becomes 1</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600">
        Frequency encoding is compact, but two different categories with the same
        count receive the same number. It also makes sense only when category
        frequency carries useful information for the problem.
      </p>
      <CodeBlock
        title="frequency_encoding.py"
        code={`import pandas as pd

data = pd.Series(['Red', 'Blue', 'Red', 'Green', 'Red', 'Blue'])

freq = data.value_counts()
print("Frequencies:\\n", freq)

# Map the frequencies back to original data
encoded = data.map(freq)
print("\\nEncoded Data:\\n", encoded.to_numpy())`}
        output={`Frequencies:
 Red      3
Blue     2
Green    1
dtype: int64

Encoded Data:
 [3 2 3 1 3 2]`}
      />

      <h3 className="text-xl font-bold mt-10 mb-2">6. Target Encoding</h3>
      <p>
        Target Encoding replaces a category with a number learned from the target.
        For a binary target such as <strong>Purchased = 1</strong> and
        <strong>Not Purchased = 0</strong>, the basic intuition is the average target
        value for each category.
      </p>

      <div className="overflow-x-auto my-5 not-prose">
        <table className="w-full max-w-2xl border-collapse rounded-xl border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-50"><tr><th className="border-b p-3 text-left">City</th><th className="border-b p-3 text-left">Training targets</th><th className="border-b p-3 text-left">Simple raw mean</th></tr></thead>
          <tbody>
            <tr><td className="border-b p-3">Delhi</td><td className="border-b p-3 font-mono">1, 1</td><td className="border-b p-3">(1 + 1) ÷ 2 = <strong>1.0</strong></td></tr>
            <tr><td className="border-b p-3">Mumbai</td><td className="border-b p-3 font-mono">0, 0</td><td className="border-b p-3">(0 + 0) ÷ 2 = <strong>0.0</strong></td></tr>
            <tr><td className="p-3">Chennai</td><td className="p-3 font-mono">1</td><td className="p-3">1 ÷ 1 = <strong>1.0</strong></td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-rose-50 border border-rose-200 p-4 rounded text-sm text-rose-900 my-4 not-prose">
        <strong>Major risk: target leakage and overfitting.</strong> The raw table
        above is only for understanding the idea. In a real training workflow, do
        not calculate a row's encoding using its own target information. Use a
        leakage-safe method such as cross-fitting, together with appropriate
        smoothing or regularisation.
      </div>

      <CodeBlock
        title="target_encoding.py"
        code={`import pandas as pd
from sklearn.preprocessing import TargetEncoder

df = pd.DataFrame({
    'City': ['Delhi', 'Mumbai', 'Delhi', 'Chennai', 'Mumbai'],
    'Purchased': [1, 0, 1, 1, 0]
})

encoder = TargetEncoder(cv=2)

# fit_transform uses cross-fitting on the training data
encoded_city = encoder.fit_transform(df[['City']], df['Purchased'])

print(encoded_city.shape)`}
        output={`(5, 1)
# The encoded values are learned using cross-fitting and smoothing.`}
      />

      <p className="text-sm text-slate-600">
        Target Encoding is an advanced choice. It can be useful for high-cardinality
        features, but it should normally be evaluated inside a proper validation
        or cross-validation workflow.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Pipelines & ColumnTransformer
      </h2>
      <p>
        Real datasets contain a mix of Numerical and Categorical features. We
        can preprocess them together cleanly using{" "}
        <code>ColumnTransformer</code>.
      </p>
      <CodeBlock
        title="pipeline.py"
        code={`from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

categorical_cols = ['Gender', 'City']

# Define the preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ]
)

# Bundle preprocessing and modeling into a Pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', LogisticRegression())
])

# Now you can just use pipeline.fit(X_train, y_train)`}
      />

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        The High Cardinality Problem
      </h2>
      <p>
        <strong>High Cardinality</strong> means that a feature has many unique
        categories—for example thousands of product codes or locations. One-hot
        encoding can then create a very wide sparse feature matrix, which may
        increase memory use, computation time, and overfitting risk.
      </p>
      <p>
        <strong>Possible alternatives:</strong> group rare categories, use
        frequency/count encoding, binary or hashing-style encoders, carefully
        cross-fitted target encoding, native categorical support in an appropriate
        model, or learned embeddings in deep learning. The best choice depends on
        the data and model.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Real-World Applications
      </h2>
      <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
        <div className="p-4 border rounded shadow-sm bg-white">
          <strong className="block text-indigo-700 mb-2">E-Commerce</strong>
          <ul className="text-sm space-y-1">
            <li><strong>Product category:</strong> One-hot when the number of categories is manageable</li>
            <li><strong>Size:</strong> Ordinal when Small &lt; Medium &lt; Large is meaningful</li>
            <li><strong>Large brand list:</strong> Consider grouping rare brands or a high-cardinality method</li>
          </ul>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <strong className="block text-emerald-700 mb-2">Banking</strong>
          <ul className="text-sm space-y-1">
            <li><strong>Risk band:</strong> Ordinal if Low &lt; Medium &lt; High is the intended meaning</li>
            <li><strong>Occupation:</strong> One-hot when cardinality is manageable</li>
            <li><strong>Location:</strong> Choose an approach based on cardinality and whether location meaning is useful</li>
          </ul>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <strong className="block text-rose-700 mb-2">Healthcare</strong>
          <ul className="text-sm space-y-1">
            <li><strong>Severity:</strong> Ordinal if the clinical levels have a true order</li>
            <li><strong>Blood group:</strong> One-hot because A, B, AB and O have no numeric order</li>
            <li><strong>Hospital:</strong> High-cardinality methods may be considered if many hospitals are present</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Beginner Mistakes
      </h2>
      <ul className="space-y-2">
        <li>❌ Using <code>LabelEncoder</code> on ordinary nominal input features.</li>
        <li>
          ❌ Automatically one-hot encoding extremely high-cardinality columns
          without checking the resulting feature width and model requirements.
        </li>
        <li>
          ❌ Using different encoders for training and testing data (Always use{" "}
          <code>fit_transform</code> on train, and ONLY <code>transform</code>{" "}
          on test).
        </li>
        <li>❌ Ignoring unseen categories during prediction instead of deciding how the encoder should handle them.</li>
        <li>❌ Allowing data leakage when using Target Encoding.</li>
        <li>❌ Treating identifier columns such as customer IDs as ordinary categories without asking whether they should be used at all.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Practice Checkpoint
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden not-prose">
        <LayoutGrid className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-emerald-300">
          Interview Knowledge Test
        </h4>
        <p className="font-medium text-slate-200">Scenario:</p>
        <p className="text-sm bg-slate-700/50 p-3 rounded mb-4">
          You are building an ML model to predict University admissions. The
          dataset contains <strong>Education Level</strong> with values
          <code>['High School', 'Bachelor', 'Master', 'PhD']</code> and
          <strong>Student Home State</strong> with values from different states.
          <br /><br />
          Which feature is naturally ordinal and which is nominal? Also, what
          would you do if the dataset contained an <strong>Application Status</strong>
          column whose values included <code>Accepted</code>?
        </p>
        <details className="group cursor-pointer">
          <summary className="font-bold text-emerald-400 outline-none select-none">
            Reveal Answer
          </summary>
          <div className="mt-3 p-4 bg-emerald-900/40 border border-emerald-800/50 text-emerald-100 rounded text-sm space-y-2">
            <p>
              <strong>Education Level: Ordinal Encoding may be reasonable.</strong>
              There is a meaningful educational progression, so you can explicitly
              define the intended order. Whether this feature should be treated as
              equally spaced still depends on the model and problem.
            </p>
            <p>
              <strong>Home State: Nominal.</strong> Karnataka is not mathematically
              "greater" than Kerala. One-hot encoding is a straightforward choice
              when the number of categories is manageable; other approaches can be
              evaluated when cardinality is high.
            </p>
            <p>
              <strong>Application Status containing Accepted: check for leakage first.</strong>
              If the target is whether a student will be admitted, a status that
              already says <em>Accepted</em> may reveal the answer. The correct action
              may be to remove or time-restrict that feature rather than encode it.
            </p>
          </div>
        </details>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Questions About Categorical Encoding
      </h2>
      <div className="space-y-4 not-prose">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="m-0 font-bold text-slate-800">Label Encoding vs One-Hot Encoding — what is the difference?</p>
          <p className="mt-1 mb-0 text-sm text-slate-600">
            In Scikit-learn, LabelEncoder is for target labels <code>y</code>.
            OneHotEncoder is for categorical input features where categories do
            not have a natural order.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="m-0 font-bold text-slate-800">When should I use Ordinal Encoding?</p>
          <p className="mt-1 mb-0 text-sm text-slate-600">
            Use it when the input categories have a genuine order, such as
            Low &lt; Medium &lt; High. Do not invent an order simply because an
            encoder can assign integers.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="m-0 font-bold text-slate-800">What if a new category appears after training?</p>
          <p className="mt-1 mb-0 text-sm text-slate-600">
            Decide this during preprocessing. For example, OneHotEncoder can be
            configured with <code>handle_unknown='ignore'</code>, while other
            encoders provide their own unknown-category strategies.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5 not-prose">
        <p className="m-0 font-bold text-emerald-900">Where this fits in the learning path</p>
        <p className="mt-2 mb-0 text-sm text-emerald-800">
          First clean missing values in <a href="/learn/handling-missing-data" className="font-semibold underline">Handling Missing Data</a>,
          then encode categories here. Continue with <a href="/learn/feature-scaling" className="font-semibold underline">Feature Scaling</a> and
          <a href="/learn/feature-engineering" className="font-semibold underline">Feature Engineering</a>. For reusable preprocessing pipelines, revisit
          <a href="/learn/scikit-learn-essentials" className="font-semibold underline">Scikit-learn Essentials</a>.
        </p>
      </div>
    </div>
  );
}
