import React from "react";
import {
  Tag,
  Binary,
  LayoutGrid,
  CheckCircle2,
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
        Machine Learning algorithms only understand numbers. They do not
        understand English. "Categorical Encoding" is the process of translating
        text columns (like "Red", "Blue", "Green") into numerical columns so the
        math equations can process them.
      </p>

      <p>
        Categorical data encoding is an important preprocessing
        techniques in Machine Learning. Most ML algorithms work only with
        numerical values, so categorical variables such as city names, colors,
        brands, and education levels must be converted into machine-readable
        numerical representations before training models.
      </p>

      <p>
        This guide explains categorical encoding from beginner to advanced level
        using original explanations, examples, real-world applications,
        Scikit-learn implementations, visual learning, and best practices.
      </p>

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
        Machine learning algorithms perform mathematical calculations internally — they work
        with numbers, not words. Algorithms like Logistic Regression, SVM and Neural
        Networks fundamentally cannot process text labels like{" "}
        <code className="bg-slate-100 px-1 rounded text-sm">Red</code>,{" "}
        <code className="bg-slate-100 px-1 rounded text-sm">Blue</code>, or{" "}
        <code className="bg-slate-100 px-1 rounded text-sm">Green</code>. Here is what they actually compute:
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6 not-prose">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="font-bold text-blue-800 text-sm mb-1">📐 Distance calculations</p>
          <p className="text-blue-700 text-sm leading-relaxed">KNN and clustering algorithms measure distances between data points — impossible with text labels.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="font-bold text-indigo-800 text-sm mb-1">📉 Gradient descent</p>
          <p className="text-indigo-700 text-sm leading-relaxed">Optimisation algorithms adjust numerical weights iteratively to minimise a cost function.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <p className="font-bold text-emerald-800 text-sm mb-1">📊 Statistical optimisation</p>
          <p className="text-emerald-700 text-sm leading-relaxed">Linear and logistic regression solve equations involving matrix operations on real numbers.</p>
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
          <p className="font-bold text-violet-800 text-sm mb-1">🔢 Matrix operations</p>
          <p className="text-violet-700 text-sm leading-relaxed">Neural networks perform matrix multiplications — every single input must be a real number.</p>
        </div>
      </div>
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 mb-6 not-prose">
        <p className="font-bold text-amber-800 mb-1">💡 The core problem</p>
        <p className="text-amber-700 text-sm">When a column contains the text <code className="bg-white px-1 rounded">Red</code>, the model sees <em>nothing it can use</em>. Encoding is the bridge that converts your text categories into the numerical form every ML algorithm understands.</p>
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
                Ordinal data (target variables)
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
              <td className="px-4 py-3 text-slate-600">Large datasets</td>
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
        Label Encoding converts every category into a unique integer. Because
        Ordinal Data has a ranking, we can simply map the text directly to
        ascending integers.
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6 items-center not-prose">
        <div>
          <ul className="space-y-2 text-slate-700 ml-4 font-mono">
            <li>
              "Low" &rarr; <strong className="text-indigo-600">1</strong>
            </li>
            <li>
              "Medium" &rarr; <strong className="text-indigo-600">2</strong>
            </li>
            <li>
              "High" &rarr; <strong className="text-indigo-600">3</strong>
            </li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded text-sm text-blue-900 border border-blue-200">
          The algorithm will look at this and mathematically understand that a
          "High" (3) is 3x greater than a "Low" (1). This maintains the logical
          order of the data.
        </div>
      </div>

      <CodeBlock
        title="label_encoding.py"
        code={`from sklearn.preprocessing import LabelEncoder

colors = ['Red', 'Blue', 'Green', 'Red']

encoder = LabelEncoder()
encoded = encoder.fit_transform(colors)

print("Original:", colors)
print("Encoded: ", encoded)
print("Classes: ", encoder.classes_)`}
        output={`Original: ['Red', 'Blue', 'Green', 'Red']
Encoded:  [2 0 1 2]
Classes:  ['Blue' 'Green' 'Red']`}
      />
      <div className="grid md:grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <strong className="text-emerald-700">Advantages:</strong>
          <ul className="list-disc pl-5">
            <li>Simple implementation</li>
            <li>Memory efficient & Fast</li>
            <li>Works well for tree-based models (Random Forest, XGBoost)</li>
          </ul>
        </div>
        <div>
          <strong className="text-red-700">Disadvantages:</strong>
          <ul className="list-disc pl-5">
            <li>Introduces artificial order</li>
            <li>Bad for nominal variables</li>
            <li>May confuse linear models (Logistic Regression, SVM)</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-8 mt-8 not-prose">
        <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
          <AlertTriangle className="h-5 w-5" /> The Danger of Label Encoding on
          Nominal Data
        </div>
        <p className="text-sm text-yellow-900 m-0">
          Never use Label Encoding on Nominal data (like "New York", "Paris",
          "London"). If you encode them as 1, 2, and 3, a linear math equation
          will literally assume that <code>London = New York + Paris</code>.
          That is mathematical nonsense and will destroy your model's accuracy.
        </p>
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
encoder = OneHotEncoder(sparse_output=False)
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
          The Dummy Variable Trap
        </h4>
        <p className="text-sm mt-2 mb-2">
          One-Hot Encoding may create multicollinearity. For example, if{" "}
          <code>Red = 0</code> and <code>Blue = 0</code>, then{" "}
          <code>Green</code> must automatically be <code>1</code>. This creates
          a linear dependency which can confuse Linear Regression models.
        </p>
        <p className="text-sm m-0">
          <strong>Solution:</strong> Drop one dummy column.
        </p>
        <pre className="text-xs bg-white p-2 rounded border mt-2">
          <code>
            pd.get_dummies(df, drop_first=True) # or in Scikit-learn
            OneHotEncoder(drop='first')
          </code>
        </pre>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-2">3. Ordinal Encoding</h3>
      <p>
        Similar to Label Encoding, but specifically designed for handling
        ordered categorical features directly in Scikit-Learn pipelines.
      </p>
      <CodeBlock
        title="ordinal_encoding.py"
        code={`from sklearn.preprocessing import OrdinalEncoder

data = [['Low'], ['Medium'], ['High']]

# We specify the exact order constraint
encoder = OrdinalEncoder(categories=[['Low', 'Medium', 'High']])

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
        Each category is replaced with the average target value. It captures the
        relationship between the category and the target variable, widely used
        in recommendation systems, fraud detection, and Kaggle competitions.
      </p>
      <CodeBlock
        title="target_encoding.py"
        code={`import category_encoders as ce
import pandas as pd

df = pd.DataFrame({
    'City': ['Delhi', 'Mumbai', 'Delhi', 'Chennai', 'Mumbai'],
    'Target': [1, 0, 1, 1, 0] # E.g., Did they purchase?
})

encoder = ce.TargetEncoder(cols=['City'])
encoded = encoder.fit_transform(df['City'], df['Target'])

print(encoded)`}
        output={`       City
0  0.865610
1  0.134390
2  0.865610
3  0.648216
4  0.134390
# Note: Output probabilities are smoothed by the encoder`}
      />
      <div className="bg-rose-50 border border-rose-200 p-4 rounded text-sm text-rose-900 my-4">
        <strong>Major Risk: Overfitting!</strong> Target Encoding can leak
        information from the training data into the test data. Cross-validation,
        smoothing, and regularization are highly necessary when using this
        technique.
      </div>

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
        ('cat', OneHotEncoder(drop='first'), categorical_cols)
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
        <strong>High Cardinality</strong> refers to categorical features with
        too many unique categories (e.g., User IDs, ZIP Codes, Product IDs).
        Using One-Hot Encoding here becomes incredibly inefficient, creating
        thousands of sparse columns ("Curse of Dimensionality").
      </p>
      <p>
        <strong>Better Alternatives:</strong> Binary Encoding, Target Encoding,
        Frequency Encoding, or Embedding layers (in Deep Learning).
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Real-World Applications
      </h2>
      <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
        <div className="p-4 border rounded shadow-sm bg-white">
          <strong className="block text-indigo-700 mb-2">E-Commerce</strong>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Product Category:</strong> One-Hot
            </li>
            <li>
              <strong>User ID:</strong> Target Encoding
            </li>
            <li>
              <strong>Brand Popularity:</strong> Frequency
            </li>
          </ul>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <strong className="block text-emerald-700 mb-2">Banking</strong>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Credit Rating:</strong> Ordinal
            </li>
            <li>
              <strong>Occupation:</strong> One-Hot
            </li>
            <li>
              <strong>ZIP Code:</strong> Binary
            </li>
          </ul>
        </div>
        <div className="p-4 border rounded shadow-sm bg-white">
          <strong className="block text-rose-700 mb-2">Healthcare</strong>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Disease Severity:</strong> Ordinal
            </li>
            <li>
              <strong>Blood Group:</strong> One-Hot
            </li>
            <li>
              <strong>Hospital ID:</strong> Frequency
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Beginner Mistakes
      </h2>
      <ul className="space-y-2">
        <li>❌ Using Label Encoding for nominal variables.</li>
        <li>
          ❌ Applying One-Hot Encoding on thousands of categories (High
          Cardinality).
        </li>
        <li>
          ❌ Using different encoders for training and testing data (Always use{" "}
          <code>fit_transform</code> on train, and ONLY <code>transform</code>{" "}
          on test).
        </li>
        <li>❌ Ignoring unseen categories during prediction.</li>
        <li>❌ Allowing Data leakage when using Target Encoding.</li>
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
          dataset has a column called "Application Status" filled with the text
          values:{" "}
          <code>['Submitted', 'Under Review', 'Interviewing', 'Accepted']</code>
          . <br />
          <br />
          Should you use Ordinal Encoding (1, 2, 3, 4) or One-Hot Encoding
          (binary columns) for this specific feature? What about a column for
          "Student Home State" containing all 50 states?
        </p>
        <details className="group cursor-pointer">
          <summary className="font-bold text-emerald-400 outline-none select-none">
            Reveal Answer
          </summary>
          <div className="mt-3 p-4 bg-emerald-900/40 border border-emerald-800/50 text-emerald-100 rounded text-sm space-y-2">
            <p>
              <strong>Status Answer: Ordinal Encoding.</strong> <br /> Because
              there is a clear, escalating logistical order to those statuses
              (you cannot be Accepted without being Submitted), they represent{" "}
              <strong>Ordinal Data</strong>. Mapping them preserves that logical
              order perfectly.
            </p>
            <p className="mt-3">
              <strong>
                State Answer: One-Hot Encoding or Binary Encoding.
              </strong>{" "}
              <br /> States are completely nominal (California is not "greater"
              than Texas). With 50 states, One-Hot encoding would add 50
              columns. Binary Encoding might be even better to save space!
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
