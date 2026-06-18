import React from "react";
import {
  Code,
  AlertTriangle,
  Scale,
  Maximize,
  Minimize,
  BookOpen,
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

export function FeatureScalingContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Feature Scaling</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">Feature Scaling is a preprocessing technique used to normalize or standardize the range of independent variables or features of data.</p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        What is Feature Scaling?
      </h2>
      <p>
        Feature Scaling is the process of transforming numerical features into a
        similar range so that no feature dominates others during model training.
      </p>

      <p>Suppose a dataset contains:</p>
      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Range
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200 text-sm">
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">Age</td>
              <td className="px-6 py-3 text-slate-600">18 – 60</td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">Salary</td>
              <td className="px-6 py-3 text-slate-600">2,00,000 – 50,00,000</td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-slate-900">
                Experience
              </td>
              <td className="px-6 py-3 text-slate-600">0 – 40</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Without scaling, the <strong>Salary</strong> feature will dominate
        calculations because its numerical values are much larger.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">
        Why Feature Scaling is Important
      </h3>
      <p>Many algorithms calculate:</p>
      <ul>
        <li>Distance</li>
        <li>Gradients</li>
        <li>Variance</li>
        <li>Similarity</li>
        <li>Optimization paths</li>
      </ul>
      <p>
        If one feature has very large values, the model treats it as more
        important even if it is not actually more useful.
      </p>

      <div className="w-full flex justify-center my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose">
        <svg
          width="600"
          height="200"
          viewBox="0 0 600 200"
          className="w-full h-auto max-w-xl font-sans"
        >
          <text
            x="100"
            y="30"
            fill="#334155"
            textAnchor="middle"
            fontWeight="bold"
          >
            Before Scaling
          </text>
          {/* Unscaled Salary */}
          <rect x="50" y="50" width="100" height="130" fill="#f87171" rx="4" />
          <text
            x="100"
            y="120"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Salary
          </text>

          {/* Unscaled Age */}
          <rect x="160" y="160" width="80" height="20" fill="#60a5fa" rx="4" />
          <text x="200" y="175" fill="white" textAnchor="middle" fontSize="12">
            Age
          </text>

          {/* Arrow */}
          <path
            d="M 280,110 L 320,110"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>

          <text
            x="450"
            y="30"
            fill="#334155"
            textAnchor="middle"
            fontWeight="bold"
          >
            After Scaling
          </text>
          {/* Scaled Salary */}
          <rect x="380" y="80" width="60" height="100" fill="#f87171" rx="4" />
          <text
            x="410"
            y="130"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontSize="12"
          >
            Salary
          </text>

          {/* Scaled Age */}
          <rect x="460" y="100" width="60" height="80" fill="#60a5fa" rx="4" />
          <text
            x="490"
            y="150"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
            fontSize="12"
          >
            Age
          </text>
        </svg>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-4 text-slate-800">
        Algorithms That Need Feature Scaling
      </h3>
      <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
        <div className="bg-red-50 border text-center border-red-200 rounded-xl p-4 shadow-sm">
          <strong className="text-red-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Strongly Affected (Scaling Needed)
          </strong>
          <ul className="text-sm text-red-900 space-y-1">
            <li>KNN</li>
            <li>K-Means</li>
            <li>SVM</li>
            <li>PCA</li>
            <li>Logistic Regression</li>
            <li>Neural Networks</li>
            <li>Gradient Descent</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border text-center border-emerald-200 rounded-xl p-4 shadow-sm">
          <strong className="text-emerald-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Less Affected (Scaling Not Needed)
          </strong>
          <ul className="text-sm text-emerald-900 space-y-1">
            <li>Decision Trees</li>
            <li>Random Forest</li>
            <li>XGBoost</li>
          </ul>
          <p className="text-xs text-emerald-700 mt-4 m-0 italic">
            Tree-based models split using conditions instead of distances.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        1. Normalization (Min-Max Scaling)
      </h2>
      <p>
        Normalization rescales values into a fixed range such as{" "}
        <code>[0, 1]</code> or <code>[-1, 1]</code>.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
        x' = (x - x_min) / (x_max - x_min)
      </div>

      <p>
        <strong>Example:</strong> Suppose Age ranges from 18 to 60. For Age =
        30:
        <br />
        <code>x' = (30 - 18) / (60 - 18) = 0.285</code>
      </p>

      <CodeBlock
        title="min_max_scaling.py"
        code={`from sklearn.preprocessing import MinMaxScaler
import pandas as pd

data = pd.DataFrame({'Age': [18, 25, 40, 60]})

scaler = MinMaxScaler()
scaled = scaler.fit_transform(data)

print(scaled)`}
        output={`[[0.        ]
 [0.16666667]
 [0.52380952]
 [1.        ]]`}
      />

      <div className="grid md:grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <strong className="text-emerald-700">Advantages:</strong>
          <ul className="list-disc pl-5">
            <li>Keeps values bounded</li>
            <li>Useful for neural networks</li>
            <li>Faster gradient descent</li>
            <li>Preserves relationships</li>
          </ul>
        </div>
        <div>
          <strong className="text-red-700">Disadvantages:</strong>
          <ul className="list-disc pl-5">
            <li>Sensitive to outliers</li>
            <li>Extreme values distort scaling</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        2. Standardization (Z-Score Scaling)
      </h2>
      <p>
        Standardization transforms data so that its <strong>Mean = 0</strong>{" "}
        and <strong>Standard deviation = 1</strong>.
      </p>
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
        z = (x - μ) / σ
      </div>

      <p>
        <strong>Example:</strong> Suppose Mean = 50, Standard deviation = 10,
        Value = 70. <br />
        <code>z = (70 - 50) / 10 = 2</code> <br />
        Meaning the value is 2 standard deviations above the mean.
      </p>

      <CodeBlock
        title="standardization.py"
        code={`from sklearn.preprocessing import StandardScaler
import pandas as pd

data = pd.DataFrame({'Salary': [20000, 30000, 40000, 50000]})

scaler = StandardScaler()
scaled = scaler.fit_transform(data)

print(scaled)`}
        output={`[[-1.34164079]
 [-0.4472136 ]
 [ 0.4472136 ]
 [ 1.34164079]]`}
      />

      <p>
        Algorithms that prefer Standardization include Logistic Regression, SVM,
        PCA, Neural Networks, and Linear Regression. It is less affected by
        moderate outliers compared to Min-Max Scaling, but still sensitive to
        extreme ones.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        3. Robust Scaling
      </h2>
      <p>
        Robust Scaling is designed to handle outliers better. Instead of the
        Mean and Standard Deviation, it uses the <strong>Median</strong> and{" "}
        <strong>Interquartile Range (IQR)</strong>.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
        x' = (x - Median) / IQR
      </div>

      <p>
        Outliers heavily affect the mean and standard deviation, but the median
        and IQR remain stable! Let's see this in action:
      </p>

      <CodeBlock
        title="robust_scaling.py"
        code={`from sklearn.preprocessing import RobustScaler
import pandas as pd

# Notice the insane 10,000,000 outlier
data = pd.DataFrame({'Income': [25000, 30000, 35000, 10000000]})

scaler = RobustScaler()
scaled = scaler.fit_transform(data)

print(scaled)`}
        output={`[[-0.28571429]
 [ 0.        ]
 [ 0.28571429]
 [570.       ]]`}
      />

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        4. Unit Vector Scaling
      </h2>
      <p>
        Transforms observations so that vector length becomes 1. It is mostly
        used in NLP, Text classification, and Cosine similarity.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Feature Scaling vs Normalization vs Standardization
      </h2>
      <div className="overflow-x-auto my-6 not-prose">
        <table className="w-full text-left border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 border-b">Technique</th>
              <th className="p-3 border-b">Range</th>
              <th className="p-3 border-b text-center">
                Sensitive to Outliers
              </th>
              <th className="p-3 border-b">Best Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border-b font-medium">Normalization</td>
              <td className="p-3 border-b">Fixed range</td>
              <td className="p-3 border-b text-center text-red-600 font-bold">
                Yes
              </td>
              <td className="p-3 border-b">Neural Networks</td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Standardization</td>
              <td className="p-3 border-b">Mean=0 Std=1</td>
              <td className="p-3 border-b text-center text-orange-600 font-bold">
                Moderate
              </td>
              <td className="p-3 border-b">General ML</td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Robust Scaling</td>
              <td className="p-3 border-b">Median/IQR</td>
              <td className="p-3 border-b text-center text-emerald-600 font-bold">
                No
              </td>
              <td className="p-3 border-b">Outlier-heavy data</td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Unit Vector</td>
              <td className="p-3 border-b">Length=1</td>
              <td className="p-3 border-b text-center text-orange-600 font-bold">
                Moderate
              </td>
              <td className="p-3 border-b">NLP</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Why Gradient Descent Improves with Scaling
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <strong>Without scaling:</strong>
          <ul>
            <li>Cost function becomes elongated</li>
            <li>Gradient descent zig-zags</li>
            <li>Convergence becomes slow</li>
          </ul>
        </div>
        <div>
          <strong>With scaling:</strong>
          <ul>
            <li>Optimization surface becomes smoother</li>
            <li>Faster convergence occurs</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Pipelines in Scikit-Learn
      </h2>
      <CodeBlock
        title="scaling_pipeline.py"
        code={`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])

# Use pipeline.fit(X_train, y_train)`}
      />
      <div className="bg-slate-50 p-4 border rounded shadow-sm text-sm">
        <strong>Why Pipelines Matter:</strong> Prevent data leakage, improve
        reproducibility, simplify deployment, and keep preprocessing consistent!
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-8 mt-8">
        <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
          <AlertTriangle className="h-5 w-5" /> Important: Avoid Data Leakage
        </div>
        <p className="text-sm text-yellow-900 m-0">
          Scaling training and test data separately is a massive mistake. The
          correct approach is to fit the scaler ON THE TRAINING DATA ONLY, and
          then simply <code>transform</code> the test data!
        </p>
        <pre className="mt-4 p-2 bg-yellow-900 border text-yellow-100 border-yellow-700 text-xs rounded">
          <code>
            scaler.fit(X_train) X_test_scaled = scaler.transform(X_test)
          </code>
        </pre>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Interview Knowledge Test
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden not-prose mb-10">
        <BookOpen className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Test Your Knowledge
        </h4>
        <p className="font-medium text-slate-200">Scenario:</p>
        <p className="text-sm bg-slate-700/50 p-3 rounded mb-4">
          You are building an algorithm for a real estate firm. The data has
          "House Price", "Square Footage", and "Number of Bedrooms". You run a
          Decision Tree model, but forgot to apply any Feature Scaling. <br />
          <br />
          Will the lack of Feature Scaling ruin the Decision Tree model's
          accuracy? Which scaler handles outliers best?
        </p>
        <details className="group cursor-pointer">
          <summary className="font-bold text-indigo-400 outline-none select-none">
            Reveal Answer
          </summary>
          <div className="mt-3 p-4 bg-emerald-900/40 border border-emerald-800/50 text-emerald-100 rounded text-sm space-y-2">
            <p>
              <strong>Answer 1: No, it will not ruin it.</strong> Decision Trees
              and Random Forests are the exception. They split data using
              conditions (<code>x &gt; 100</code>) rather than distances, making
              them immune to scale.
            </p>
            <p>
              <strong>Answer 2: RobustScaler.</strong> It uses Median and IQR
              instead of Mean and Standard Deviation, making it resilient to
              mathematical outliers!
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
