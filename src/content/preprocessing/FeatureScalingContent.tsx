import React from "react";
import { Code, AlertTriangle, BookOpen } from "lucide-react";

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

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Feature Scaling changes the numerical scale of features so that features
        measured in very different units can be compared more fairly by
        scale-sensitive machine learning methods.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Feature Scaling in Simple Words
      </h2>
      <p>
        Imagine two columns in the same dataset: <strong>Age</strong> and
        <strong> Salary</strong>. Age may contain values such as 20, 35 and 50,
        while Salary may contain values such as 300,000 and 900,000. A large
        salary number does not automatically mean Salary is more important. It
        is simply measured using a much larger numerical unit.
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 1</div>
          <div className="mt-2 font-bold text-slate-900">Different Scales</div>
          <div className="mt-2 text-sm text-slate-600">Age: 18–60<br />Salary: ₹2L–₹50L</div>
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 2</div>
          <div className="mt-2 font-bold text-indigo-900">Apply a Scaler</div>
          <div className="mt-2 text-sm text-indigo-800">Min-Max, Standard, Robust...</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 3</div>
          <div className="mt-2 font-bold text-emerald-900">Comparable Scale</div>
          <div className="mt-2 text-sm text-emerald-800">No feature wins only because its unit is larger</div>
        </div>
      </div>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3 text-left border-b">Person</th>
              <th className="p-3 text-left border-b">Age</th>
              <th className="p-3 text-left border-b">Salary</th>
              <th className="p-3 text-left border-b">What a scale-sensitive calculation sees</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border-b">A</td><td className="p-3 border-b">20</td><td className="p-3 border-b">₹3,00,000</td><td className="p-3 border-b">Salary numbers are much larger</td></tr>
            <tr><td className="p-3 border-b">B</td><td className="p-3 border-b">21</td><td className="p-3 border-b">₹8,00,000</td><td className="p-3 border-b">Salary can dominate a raw distance</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600">
        <strong>Important:</strong> Scaling does not decide which feature is
        actually useful. It only changes the numerical representation so that
        units such as rupees, years and centimetres do not unfairly control a
        calculation.
      </p>

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
        For algorithms that depend on distances, gradients, dot products or
        variance, the <strong>Salary</strong> feature can dominate the numerical
        calculation simply because its values are much larger.
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
        If one feature has much larger numerical values, a scale-sensitive
        algorithm may give it disproportionate influence even when that feature
        is not inherently more informative.
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
            Usually Scale-Sensitive
          </strong>
          <ul className="text-sm text-red-900 space-y-1">
            <li>KNN</li>
            <li>K-Means</li>
            <li>SVM</li>
            <li>PCA</li>
            <li>Logistic / Linear models with regularization or gradient-based fitting</li>
            <li>Neural Networks</li>
            <li>Other gradient-based models</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border text-center border-emerald-200 rounded-xl p-4 shadow-sm">
          <strong className="text-emerald-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Usually Less Sensitive to Scale
          </strong>
          <ul className="text-sm text-emerald-900 space-y-1">
            <li>Decision Trees</li>
            <li>Random Forest</li>
            <li>XGBoost</li>
          </ul>
          <p className="text-xs text-emerald-700 mt-4 m-0 italic">
            Ordinary tree splits depend on ordering and thresholds rather than
            Euclidean distance, so scaling is usually unnecessary.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        1. Min-Max Scaling (Often Called Normalization)
      </h2>
      <p>
        Min-Max Scaling rescales values into a chosen fixed range such as{" "}
        <code>[0, 1]</code> or <code>[-1, 1]</code>.
      </p>
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-900 my-4">
        <strong>Terminology note:</strong> Some tutorials use the word
        “normalization” for Min-Max Scaling, while scikit-learn also uses
        <code>Normalizer</code> for unit-vector scaling. On this page, we name
        the exact method whenever possible to avoid confusion.
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
        x' = (x - x_min) / (x_max - x_min)
      </div>

      <p>
        <strong>Simple example:</strong> Suppose Age ranges from 18 to 60 and we
        want to scale Age = 30.
      </p>
      <div className="grid md:grid-cols-3 gap-3 my-5 not-prose">
        <div className="rounded-lg border border-slate-200 p-4 bg-white">
          <div className="font-bold text-slate-800">Step 1 — Distance from minimum</div>
          <div className="font-mono mt-2 text-sm">30 − 18 = 12</div>
          <p className="text-xs text-slate-600 mt-2 mb-0">Age 30 is 12 years above the minimum.</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 bg-white">
          <div className="font-bold text-slate-800">Step 2 — Total range</div>
          <div className="font-mono mt-2 text-sm">60 − 18 = 42</div>
          <p className="text-xs text-slate-600 mt-2 mb-0">The complete age range is 42 years.</p>
        </div>
        <div className="rounded-lg border border-emerald-200 p-4 bg-emerald-50">
          <div className="font-bold text-emerald-900">Step 3 — Divide</div>
          <div className="font-mono mt-2 text-sm">12 ÷ 42 ≈ 0.286</div>
          <p className="text-xs text-emerald-800 mt-2 mb-0">Age 30 becomes about 0.286 on the 0–1 scale.</p>
        </div>
      </div>

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
            <li>Can make gradient-based optimization easier</li>
            <li>Preserves ordering under the linear rescaling</li>
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
        <strong>Simple example:</strong> Mean = 50, standard deviation = 10 and
        the value is 70.
      </p>
      <div className="bg-white border border-slate-200 rounded-xl p-5 my-5 not-prose text-sm">
        <p className="m-0"><strong>Step 1:</strong> Subtract the mean: <code>70 − 50 = 20</code>.</p>
        <p className="mt-2 mb-0"><strong>Why?</strong> This tells us how far 70 is from the average.</p>
        <p className="mt-4 mb-0"><strong>Step 2:</strong> Divide by the standard deviation: <code>20 ÷ 10 = 2</code>.</p>
        <p className="mt-2 mb-0"><strong>Meaning:</strong> 70 is <strong>2 standard deviations above the mean</strong>.</p>
      </div>

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
        Standardization is commonly useful for SVM, PCA, many linear/logistic
        models, neural networks and other scale-sensitive methods. Because the
        mean and standard deviation themselves can be influenced by extreme
        values, StandardScaler is still sensitive to outliers.
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
        Extreme values can strongly affect the mean and standard deviation. The
        median and IQR are usually less influenced by extreme values, which is
        why RobustScaler can be useful for outlier-heavy features. Let's see a
        simple example:
      </p>

      <CodeBlock
        title="robust_scaling.py"
        code={`from sklearn.preprocessing import RobustScaler
import pandas as pd

# Notice the very large 10,000,000 value
data = pd.DataFrame({'Income': [25000, 30000, 35000, 10000000]})

scaler = RobustScaler()
scaled = scaler.fit_transform(data)

print(scaled)`}
        output={`[[-0.003003  ]
 [-0.001001  ]
 [ 0.001001  ]
 [ 3.99099099]]`}
      />

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        4. Unit Vector Scaling
      </h2>
      <p>
        Unit-vector scaling (normalization by vector norm) rescales each sample
        so that its vector length becomes 1. It is especially useful when the
        <strong> direction</strong> of a vector matters more than its magnitude,
        such as many text and cosine-similarity tasks.
      </p>
      <p><strong>Simple example:</strong> Take the vector <code>[3, 4]</code>.</p>
      <div className="bg-white border border-slate-200 rounded-xl p-5 my-5 not-prose text-sm">
        <p className="m-0"><strong>Step 1 — Find its length:</strong></p>
        <div className="font-mono mt-2">√(3² + 4²) = √(9 + 16) = √25 = 5</div>
        <p className="mt-4 mb-0"><strong>Step 2 — Divide each value by 5:</strong></p>
        <div className="font-mono mt-2">[3/5, 4/5] = [0.6, 0.8]</div>
        <p className="mt-4 mb-0"><strong>Step 3 — Check:</strong> the new vector has length 1.</p>
      </div>
      <CodeBlock
        title="unit_vector_scaling.py"
        code={`from sklearn.preprocessing import Normalizer

X = [[3, 4]]
normalizer = Normalizer()
print(normalizer.fit_transform(X))`}
        output={`[[0.6 0.8]]`}
      />

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
              <td className="p-3 border-b font-medium">Min-Max Scaling</td>
              <td className="p-3 border-b">Fixed range</td>
              <td className="p-3 border-b text-center text-red-600 font-bold">
                Yes
              </td>
              <td className="p-3 border-b">Neural Networks</td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Standardization</td>
              <td className="p-3 border-b">Mean=0 Std=1</td>
              <td className="p-3 border-b text-center text-red-600 font-bold">
                Yes
              </td>
              <td className="p-3 border-b">Many scale-sensitive models</td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Robust Scaling</td>
              <td className="p-3 border-b">Median/IQR</td>
              <td className="p-3 border-b text-center text-emerald-600 font-bold">
                Less sensitive
              </td>
              <td className="p-3 border-b">Outlier-heavy data</td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Unit Vector</td>
              <td className="p-3 border-b">Length=1</td>
              <td className="p-3 border-b text-center text-slate-600 font-bold">
                Depends on task
              </td>
              <td className="p-3 border-b">Text / cosine similarity</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Why Gradient Descent Improves with Scaling
      </h2>
      <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <strong className="text-amber-900">Very different feature scales</strong>
          <div className="font-mono text-sm mt-3 text-amber-900">Start → ↘ → ↙ → ↘ → Minimum</div>
          <p className="text-sm text-amber-800 mt-3 mb-0">
            The optimization path can require awkward, uneven steps and may
            converge more slowly.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <strong className="text-emerald-900">Features on similar scales</strong>
          <div className="font-mono text-sm mt-3 text-emerald-900">Start → → → Minimum</div>
          <p className="text-sm text-emerald-800 mt-3 mb-0">
            Gradient-based optimization often becomes easier to tune and can
            converge more efficiently.
          </p>
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
        <strong>Why Pipelines Matter:</strong> They help keep preprocessing
        consistent and reduce the risk of data leakage during training,
        validation and deployment.
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-8 mt-8">
        <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
          <AlertTriangle className="h-5 w-5" /> Important: Avoid Data Leakage
        </div>
        <p className="text-sm text-yellow-900 m-0">
          Do not fit a scaler on the complete dataset or fit a separate scaler
          on the test set. Fit preprocessing using <strong>training data only</strong>,
          then apply that same fitted transformation to validation/test data.
        </p>
        <pre className="mt-4 p-3 bg-yellow-900 border text-yellow-100 border-yellow-700 text-xs rounded overflow-x-auto">
          <code>{`scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)`}</code>
        </pre>
      </div>


      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Which Scaling Method Should I Start With?
      </h2>
      <div className="overflow-x-auto my-6 not-prose">
        <table className="w-full border-collapse bg-white text-sm border border-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3 text-left border-b">Situation</th>
              <th className="p-3 text-left border-b">Simple starting choice</th>
              <th className="p-3 text-left border-b">Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border-b">Need a fixed 0–1 range</td><td className="p-3 border-b font-medium">MinMaxScaler</td><td className="p-3 border-b">Maps training minimum and maximum to the chosen range</td></tr>
            <tr><td className="p-3 border-b">General scale-sensitive model</td><td className="p-3 border-b font-medium">StandardScaler</td><td className="p-3 border-b">Centers around 0 and scales by standard deviation</td></tr>
            <tr><td className="p-3 border-b">Strong outliers are present</td><td className="p-3 border-b font-medium">RobustScaler</td><td className="p-3 border-b">Uses median and IQR</td></tr>
            <tr><td className="p-3 border-b">Vector direction matters</td><td className="p-3 border-b font-medium">Normalizer</td><td className="p-3 border-b">Makes each sample vector have unit norm</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-600">
        This is a starting guide, not a universal rule. The best preprocessing
        choice depends on the algorithm, distribution and evaluation results.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Questions About Feature Scaling
      </h2>
      <div className="space-y-4 not-prose">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <strong>Normalization or standardization — which is better?</strong>
          <p className="text-sm text-slate-600 mt-2 mb-0">Neither is always better. Min-Max is useful when a bounded range matters; StandardScaler is a common starting point for many scale-sensitive models.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <strong>Does Random Forest need feature scaling?</strong>
          <p className="text-sm text-slate-600 mt-2 mb-0">Usually no. Tree-based models normally split by thresholds rather than distance, so changing units generally does not help the tree choose a better split.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <strong>Should I scale before or after the train/test split?</strong>
          <p className="text-sm text-slate-600 mt-2 mb-0">Split first. Fit the scaler on training data only, then use that fitted scaler to transform validation/test data.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <strong>Does scaling remove outliers?</strong>
          <p className="text-sm text-slate-600 mt-2 mb-0">No. Scaling changes numerical representation; it does not automatically decide whether an observation is an outlier or remove it.</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-5 not-prose">
        <strong className="text-indigo-900">Continue learning</strong>
        <p className="text-sm text-indigo-800 mt-2 mb-3">Feature scaling becomes especially important when you study distance-based and variance-based algorithms.</p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <a className="text-indigo-700 underline" href="/learn/knn">K-Nearest Neighbors</a>
          <a className="text-indigo-700 underline" href="/learn/kmeans">K-Means</a>
          <a className="text-indigo-700 underline" href="/learn/svm">SVM</a>
          <a className="text-indigo-700 underline" href="/learn/pca">PCA</a>
          <a className="text-indigo-700 underline" href="/learn/feature-engineering">Feature Engineering</a>
        </div>
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
              and Random Forests usually do not require feature scaling. They
              split using thresholds and ordering rather than Euclidean
              distance, so standard monotonic rescaling typically does not
              change the learned tree structure.
            </p>
            <p>
              <strong>Answer 2: RobustScaler is a common choice when outliers are a concern.</strong>
              It uses the median and IQR, which are usually less influenced by
              extreme values than the mean, standard deviation or full range.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
