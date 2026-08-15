import React from "react";
import { Code, BrainCircuit } from "lucide-react";

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

export function FeatureEngineeringContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Feature Engineering</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Feature Engineering is the process of using domain knowledge to extract features from raw data to improve the performance of machine learning algorithms.</p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Feature Engineering in Simple Words
      </h2>
      <p>
        In many structured-data Machine Learning projects, the model learns from the columns we give it. Feature Engineering means
        <strong> turning raw columns into more useful clues</strong> that make the pattern easier to learn.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 my-6 not-prose">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Step 1</div>
          <div className="mt-2 font-bold text-slate-800">Raw Data</div>
          <div className="mt-1 text-sm text-slate-600">Date, area, bedrooms</div>
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-indigo-500">Step 2</div>
          <div className="mt-2 font-bold text-indigo-900">Create Useful Clues</div>
          <div className="mt-1 text-sm text-indigo-700">House age, area per bedroom</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-600">Step 3</div>
          <div className="mt-2 font-bold text-emerald-900">Give Them to the Model</div>
          <div className="mt-1 text-sm text-emerald-700">Model learns from better inputs</div>
        </div>
      </div>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th className="p-3 text-left">Raw Value</th>
              <th className="p-3 text-left">Engineered Feature</th>
              <th className="p-3 text-left">Why It May Help</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="p-3">Built year = 2016</td>
              <td className="p-3">House age = 10 years</td>
              <td className="p-3">Age may affect price and maintenance</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="p-3">1200 sq ft, 3 bedrooms</td>
              <td className="p-3">400 sq ft per bedroom</td>
              <td className="p-3">Shows how spacious the house is</td>
            </tr>
            <tr>
              <td className="p-3">2026-05-01</td>
              <td className="p-3">Month = 5</td>
              <td className="p-3">Can help capture seasonal patterns</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        What is Feature Engineering?
      </h2>
      <p>
        Feature Engineering is the process of creating new input variables,
        transforming existing data, extracting useful information, and improving
        feature quality so that Machine Learning models can learn patterns more
        effectively.
      </p>
      <p>
        In simple words:{" "}
        <strong>
          Feature Engineering helps convert raw data into meaningful information
          that improves model performance.
        </strong>
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">Why is it Important?</h3>
      <p>
        Raw data is often incomplete, noisy, unstructured, inconsistent, and
        difficult for ML models to understand. Feature Engineering transforms
        messy real-world data into machine-friendly representations.
      </p>

      <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex justify-center">
        <svg
          width="600"
          height="200"
          viewBox="0 0 600 200"
          className="w-full h-auto max-w-2xl font-sans"
        >
          {/* Raw Data */}
          <rect
            x="50"
            y="50"
            width="120"
            height="100"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="2"
            rx="6"
          />
          <text
            x="110"
            y="80"
            fill="#475569"
            textAnchor="middle"
            fontWeight="bold"
          >
            Raw Data
          </text>
          <text
            x="110"
            y="105"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Dates, Names,
          </text>
          <text
            x="110"
            y="125"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Missing Vals
          </text>

          {/* Arrow 1 */}
          <path
            d="M 170,100 L 220,100"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />

          {/* Feature Engineering */}
          <rect x="230" y="50" width="160" height="100" fill="#6366f1" rx="6" />
          <text
            x="310"
            y="90"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Feature
          </text>
          <text
            x="310"
            y="115"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Engineering
          </text>

          {/* Arrow 2 */}
          <path
            d="M 390,100 L 440,100"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />

          {/* Machine Learning Model */}
          <rect x="450" y="50" width="120" height="100" fill="#10b981" rx="6" />
          <text
            x="510"
            y="85"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            ML
          </text>
          <text
            x="510"
            y="105"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Model
          </text>
          <text
            x="510"
            y="125"
            fill="#d1fae5"
            textAnchor="middle"
            fontSize="12"
          >
            Learns Patterns
          </text>

          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>
        </svg>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-2">Real-Life Example: Predicting House Prices</h3>
      <p>
        Imagine we want to predict the selling price of a house. A raw row might look like this:
      </p>

      <div className="overflow-x-auto my-4 not-prose">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-3 text-left">Sale Date</th>
              <th className="p-3 text-left">Built Year</th>
              <th className="p-3 text-left">Area</th>
              <th className="p-3 text-left">Bedrooms</th>
              <th className="p-3 text-left">City</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="p-3">2026-05-01</td>
              <td className="p-3">2016</td>
              <td className="p-3">1200 sq ft</td>
              <td className="p-3">3</td>
              <td className="p-3">Bangalore</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        We can turn these raw values into features that are often easier for a model to use.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mt-4 not-prose mb-6">
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
          <strong className="block text-indigo-700">House Age</strong>
          <span className="text-sm text-slate-600">2026 - 2016 = 10 years</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
          <strong className="block text-emerald-700">Area per Bedroom</strong>
          <span className="text-sm text-slate-600">1200 ÷ 3 = 400 sq ft per bedroom</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
          <strong className="block text-amber-700">Sale Month</strong>
          <span className="text-sm text-slate-600">May → Month = 5</span>
        </div>
        <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
          <strong className="block text-purple-700">Location Features</strong>
          <span className="text-sm text-slate-600">Distance to center or nearby schools, if reliable location data is available</span>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 my-6 not-prose">
        <div className="font-bold text-indigo-900 mb-3">Two tiny calculations</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded-lg border border-indigo-100 p-4">
            <div className="font-semibold text-slate-800">House age</div>
            <div className="mt-2 font-mono text-slate-700">Sale year - Built year</div>
            <div className="font-mono text-slate-700">2026 - 2016 = 10</div>
            <p className="m-0 mt-2 text-slate-600">The model now sees the age directly instead of having to interpret two years.</p>
          </div>
          <div className="bg-white rounded-lg border border-indigo-100 p-4">
            <div className="font-semibold text-slate-800">Area per bedroom</div>
            <div className="mt-2 font-mono text-slate-700">1200 ÷ 3 = 400</div>
            <p className="m-0 mt-2 text-slate-600">This creates a simple measure of spaciousness.</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded my-6">
        <strong className="text-amber-900">Important: do not create a feature from the answer you are trying to predict.</strong>
        <p className="text-sm text-amber-900 mt-2 mb-0">
          If the target is <strong>house price</strong>, a feature such as <strong>price per sq ft = house price ÷ area</strong> uses the target itself.
          That would leak the answer into the inputs. This is called <strong>data leakage</strong>.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Input Types We Engineer
      </h2>
      <p>
        Feature engineering depends on the kind of raw data we have. The same idea is applied differently to numbers, categories, text, and dates.
      </p>

      <div className="flex justify-center my-8 bg-slate-50 py-8 rounded border not-prose">
        <svg
          width="600"
          height="250"
          viewBox="0 0 600 250"
          className="max-w-full font-sans"
        >
          <rect x="225" y="10" width="150" height="40" rx="20" fill="#334155" />
          <text
            x="300"
            y="35"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Types of Data
          </text>

          {/* Links */}
          <path
            d="M 300,50 L 300,80"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 90,80 L 510,80"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />

          <path d="M 90,80 L 90,110" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 230,80 L 230,110" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 370,80 L 370,110" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 510,80 L 510,110" stroke="#94a3b8" strokeWidth="2" />

          {/* Nodes */}
          <rect
            x="30"
            y="110"
            width="120"
            height="40"
            rx="6"
            fill="#ecfdf5"
            stroke="#10b981"
          />
          <text
            x="90"
            y="135"
            fill="#047857"
            textAnchor="middle"
            fontWeight="bold"
          >
            Numerical
          </text>

          <rect
            x="170"
            y="110"
            width="120"
            height="40"
            rx="6"
            fill="#eef2ff"
            stroke="#6366f1"
          />
          <text
            x="230"
            y="135"
            fill="#4338ca"
            textAnchor="middle"
            fontWeight="bold"
          >
            Categorical
          </text>

          <rect
            x="310"
            y="110"
            width="120"
            height="40"
            rx="6"
            fill="#fffbeb"
            stroke="#f59e0b"
          />
          <text
            x="370"
            y="135"
            fill="#b45309"
            textAnchor="middle"
            fontWeight="bold"
          >
            Text
          </text>

          <rect
            x="450"
            y="110"
            width="120"
            height="40"
            rx="6"
            fill="#fef2f2"
            stroke="#ef4444"
          />
          <text
            x="510"
            y="135"
            fill="#b91c1c"
            textAnchor="middle"
            fontWeight="bold"
          >
            Date-Time
          </text>

          {/* Examples */}
          <text x="90" y="175" fill="#64748b" textAnchor="middle" fontSize="12">
            Salary, Age
          </text>
          <text x="90" y="195" fill="#64748b" textAnchor="middle" fontSize="12">
            Height
          </text>

          <text
            x="230"
            y="175"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            City, Gender
          </text>
          <text
            x="230"
            y="195"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Product Type
          </text>

          <text
            x="370"
            y="175"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Reviews
          </text>
          <text
            x="370"
            y="195"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Tweets
          </text>

          <text
            x="510"
            y="175"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Login Time
          </text>
          <text
            x="510"
            y="195"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Purchased At
          </text>
        </svg>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Feature Engineering Workflow
      </h2>

      <div className="grid sm:grid-cols-5 gap-3 my-6 not-prose text-center text-sm">
        {['Understand', 'Clean', 'Create', 'Select', 'Validate'].map((step, index) => (
          <div key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Step {index + 1}</div>
            <div className="font-bold text-slate-800 mt-1">{step}</div>
          </div>
        ))}
      </div>

      <ol className="space-y-4 text-slate-700">
        <li>
          <strong>Step 1: Understand the Data.</strong> Before engineering
          features, analyze distributions, identify missing values, understand
          business context, and detect anomalies.
        </li>
        <li>
          <strong>Step 2: Clean the Data.</strong> Data cleaning includes
          removing duplicates, handling null values, fixing inconsistent
          formatting, and correcting errors.
        </li>
        <li>
          <strong>Step 3: Create Useful Features.</strong> Transform raw
          information into valuable predictors.
        </li>
        <li>
          <strong>Step 4: Select Important Features.</strong> Keep useful
          features and remove irrelevant or redundant ones.
        </li>
        <li>
          <strong>Step 5: Validate the New Features.</strong> Compare model performance on validation data. A feature that sounds clever is useful only if it helps the real prediction task without causing leakage.
        </li>
      </ol>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Feature Engineering Techniques
      </h2>
      <p>
        There are several widely used techniques for creating, transforming, and preparing features for different data and modeling needs.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">
        1. Handling Missing Values
      </h3>
      <p>
        Real-world datasets often contain missing information. Methods to handle
        missing data include:
      </p>
      <ul>
        <li>
          <strong>Remove Missing Rows:</strong> May be reasonable when missingness is limited and deleting those rows is unlikely to bias the dataset.
        </li>
        <li>
          <strong>Mean Imputation:</strong> Replace missing values with the
          average.
        </li>
        <li>
          <strong>Median Imputation:</strong> Often a useful simple choice for skewed numerical data or data with extreme values.
        </li>
        <li>
          <strong>Mode Imputation:</strong> Useful for categorical variables.
        </li>
      </ul>

      <p className="text-sm">
        For a fuller treatment, see <a href="/learn/handling-missing-data" className="text-indigo-600 font-semibold hover:underline">Handling Missing Data</a>.
      </p>

      <CodeBlock
        title="missing_values.py"
        code={`import pandas as pd
import numpy as np

df = pd.DataFrame({'Age': [25, np.nan, 30, 22]})
print("Original:\\n", df)

# Mean imputation
df['Age'] = df['Age'].fillna(df['Age'].mean())
print("\\nAfter Imputation:\\n", df)`}
        output={`Original:
     Age
0  25.0
1   NaN
2  30.0
3  22.0

After Imputation:
          Age
0  25.000000
1  25.666667
2  30.000000
3  22.000000`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">
        2. Encoding Categorical Variables
      </h3>
      <p>
        Many common Machine Learning estimators expect numerical input, so categories such as
        Red, Blue, and Green need an appropriate representation. Common approaches include
        <strong> Ordinal Encoding</strong> for ordered categories, <strong>One-Hot Encoding</strong> for nominal categories, and carefully designed target-based encoding for some high-cardinality problems.
      </p>
      <p className="text-sm">
        See <a href="/learn/encoding-categorical" className="text-indigo-600 font-semibold hover:underline">Encoding Categorical Data</a> for the full comparison and leakage precautions.
      </p>

      <CodeBlock
        title="encoding.py"
        code={`import pandas as pd

df = pd.DataFrame({'Color': ['Red', 'Blue', 'Green']})
encoded = pd.get_dummies(df['Color'], dtype=int)
print(encoded)`}
        output={`   Blue  Green  Red
0     0      0    1
1     1      0    0
2     0      1    0`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">3. Feature Scaling</h3>
      <p>
        Different features may have very different ranges (for example, Age 18–60 vs Salary in lakhs). In distance-based and gradient-based methods, these scale differences can strongly affect the calculation even when the larger-number feature is not more important.
      </p>
      <ul>
        <li>
          <strong>Min-Max Scaling:</strong> Often maps values to a range such as [0,1]
        </li>
        <li>
          <strong>Standardization:</strong> Mean=0, Std=1
        </li>
        <li>
          <strong>Robust Scaling:</strong> Uses median and quantiles, making it less sensitive to extreme values
        </li>
      </ul>

      <p className="text-sm">
        See <a href="/learn/feature-scaling" className="text-indigo-600 font-semibold hover:underline">Feature Scaling</a> for worked StandardScaler, Min-Max, and RobustScaler examples.
      </p>

      <CodeBlock
        title="scaling.py"
        code={`from sklearn.preprocessing import StandardScaler
import pandas as pd

df = pd.DataFrame({'Salary': [50000, 60000, 100000]})
scaler = StandardScaler()

scaled = scaler.fit_transform(df)
print(scaled)`}
        output={`[[-0.9258201 ]
 [-0.46291005]
 [ 1.38873015]]`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">
        4. Creating Ratio and Interaction Features
      </h3>
      <p>
        Sometimes two existing columns become more useful when they are combined. This is one of the clearest examples of creating a new feature from raw data.
      </p>
      <div className="overflow-x-auto my-4 not-prose">
        <table className="min-w-full border-collapse text-sm">
          <thead><tr className="bg-slate-100 border-b"><th className="p-3 text-left">Area</th><th className="p-3 text-left">Bedrooms</th><th className="p-3 text-left">New Feature</th></tr></thead>
          <tbody><tr><td className="p-3">1200 sq ft</td><td className="p-3">3</td><td className="p-3"><strong>Area per bedroom = 400</strong></td></tr></tbody>
        </table>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 not-prose text-sm">
        <div><strong>Step 1:</strong> Start with <span className="font-mono">Area = 1200</span> and <span className="font-mono">Bedrooms = 3</span>.</div>
        <div className="mt-2"><strong>Step 2:</strong> Divide → <span className="font-mono">1200 ÷ 3 = 400</span>.</div>
        <div className="mt-2"><strong>Step 3:</strong> Add <span className="font-mono">Area_per_Bedroom = 400</span> as a new model input.</div>
      </div>
      <CodeBlock
        title="create_features.py"
        code={`import pandas as pd

df = pd.DataFrame({
    'Area': [1200, 1500],
    'Bedrooms': [3, 5]
})

df['Area_per_Bedroom'] = df['Area'] / df['Bedrooms']
print(df)`}
        output={`   Area  Bedrooms  Area_per_Bedroom
0  1200         3             400.0
1  1500         5             300.0`}
      />
      <p className="text-sm">
        Interaction features can also combine variables by multiplication or other domain-based rules. Create them only when the relationship makes sense and validate whether they help.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">
        5. Binning (Discretization)
      </h3>
      <p>
        Binning groups continuous values into ranges such as Young, Adult, and Senior. It can make a feature easier to interpret and can reduce sensitivity to small numeric differences, but it also loses some information, so it should be used only when the grouping makes sense for the problem.
      </p>

      <CodeBlock
        title="binning.py"
        code={`import pandas as pd

df = pd.DataFrame({'Age': [19, 28, 45, 60, 22]})

df['Group'] = pd.cut(df['Age'],
       bins=[0, 25, 40, 100],
       labels=['Young', 'Adult', 'Senior'])
       
print(df)`}
        output={`   Age   Group
0   19   Young
1   28   Adult
2   45  Senior
3   60  Senior
4   22   Young`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">6. Log Transformation</h3>
      <p>
        A log transformation is often explored for strongly right-skewed positive values such as income, website traffic, or sales. It compresses large values more than small values, which can make some relationships easier for a model to learn. It is not automatically helpful for every dataset.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
        x&apos; = ln(x + 1)
      </div>

      <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 my-6 not-prose">
        <div className="font-bold text-sky-900 mb-3">Small numerical example</div>
        <p className="text-sm text-sky-900 m-0">Suppose <strong>x = 9</strong>.</p>
        <div className="mt-3 space-y-2 text-sm">
          <div><strong>Step 1:</strong> Add 1 → <span className="font-mono">9 + 1 = 10</span></div>
          <div><strong>Step 2:</strong> Take the natural log → <span className="font-mono">ln(10) ≈ 2.30</span></div>
          <div><strong>Result:</strong> 9 is represented as approximately <strong>2.30</strong> after the transform.</div>
        </div>
        <p className="text-xs text-sky-800 mt-3 mb-0">The purpose is not to “improve” the number itself; it is to change the scale and shape of the feature distribution.</p>
      </div>

      <CodeBlock
        title="log_transform.py"
        code={`import numpy as np
import pandas as pd

df = pd.DataFrame({'Income': [1000, 5000, 1000000]})
df['Log_Income'] = np.log1p(df['Income'])

print(df)`}
        output={`    Income  Log_Income
0     1000    6.908755
1     5000    8.517393
2  1000000   13.815512`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">
        7. Date-Time Feature Engineering
      </h3>
      <p>
        Dates contain several pieces of information. From one timestamp we can extract features such as day, month, year, weekday, quarter, or whether it falls on a weekend.
      </p>
      <div className="overflow-x-auto my-4 not-prose">
        <table className="min-w-full border-collapse text-sm">
          <thead><tr className="bg-slate-100 border-b"><th className="p-3 text-left">Raw Date</th><th className="p-3 text-left">Month</th><th className="p-3 text-left">Weekday</th><th className="p-3 text-left">Weekend?</th></tr></thead>
          <tbody><tr><td className="p-3">2026-05-16</td><td className="p-3">5</td><td className="p-3">Saturday</td><td className="p-3">Yes</td></tr></tbody>
        </table>
      </div>
      <CodeBlock
        title="datetime_features.py"
        code={`import pandas as pd

df = pd.DataFrame({'Date': pd.to_datetime(['2026-05-16', '2026-12-25'])})

df['Month'] = df['Date'].dt.month
df['Weekday'] = df['Date'].dt.weekday
df['Is_Weekend'] = df['Weekday'] >= 5

print(df)`}
        output={`        Date  Month  Weekday  Is_Weekend
0 2026-05-16      5        5        True
1 2026-12-25     12        4       False`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">
        8. Text Feature Engineering
      </h3>
      <p>
        Text data must be converted into numerical representation. Common
        Techniques include Bag of Words, TF-IDF, and Word Embeddings.
      </p>

      <CodeBlock
        title="tfidf_example.py"
        code={`from sklearn.feature_extraction.text import TfidfVectorizer

texts = ["I love Machine Learning", "Machine Learning is powerful"]
vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(texts)
print(vectorizer.get_feature_names_out())
print(X.toarray())`}
        output={`['is' 'learning' 'love' 'machine' 'powerful']
[[0.         0.44943642 0.6316672  0.44943642 0.        ]
 [0.53404633 0.37997836 0.         0.37997836 0.53404633]]`}
      />

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Feature Engineering vs Feature Extraction vs Feature Selection
      </h2>
      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th className="p-3 text-left">Concept</th>
              <th className="p-3 text-left">Simple Meaning</th>
              <th className="p-3 text-left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-3 font-semibold">Feature Engineering</td><td className="p-3">Create or transform useful inputs</td><td className="p-3">Date → Month, House age</td></tr>
            <tr className="border-b"><td className="p-3 font-semibold">Feature Extraction</td><td className="p-3">Transform raw data into a new representation</td><td className="p-3">TF-IDF vectors, PCA components</td></tr>
            <tr><td className="p-3 font-semibold">Feature Selection</td><td className="p-3">Keep a useful subset of available features</td><td className="p-3">Choose 10 useful columns from 100</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-2">9. Feature Extraction</h3>
      <p>
        Feature Extraction creates a new representation from existing data, often through an algorithmic transformation. Feature Engineering is the broader process and can include domain-based creation, transformation, extraction, encoding, and other preprocessing choices. Examples of extraction include TF-IDF vectors, image descriptors, or PCA components.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">10. Feature Selection</h3>
      <p>
        Not all features help prediction. Some features add noise, increase
        overfitting, or slow training. Selection methods include:
      </p>
      <ul>
        <li>
          <strong>Filter Methods:</strong> Statistical selection (e.g.
          Correlation analysis)
        </li>
        <li>
          <strong>Wrapper Methods:</strong> Model-based selection (e.g.
          Recursive Feature Elimination)
        </li>
        <li>
          <strong>Embedded Methods:</strong> Built into algorithms (e.g. Lasso
          Regression)
        </li>
      </ul>
      <p className="text-sm">
        Continue with <a href="/learn/feature-selection" className="text-indigo-600 font-semibold hover:underline">Feature Selection &amp; Extraction</a> for dedicated examples and selection methods.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Beginner Mistakes & Best Practices
      </h2>

      <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
        <div className="bg-red-50 border text-center border-red-200 rounded-xl p-4 shadow-sm">
          <strong className="text-red-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Mistakes ❌
          </strong>
          <ul className="text-sm text-red-900 space-y-1 text-left list-disc pl-5">
            <li>Creating too many irrelevant features.</li>
            <li>Using future information during training (Data Leakage).</li>
            <li>Ignoring domain knowledge.</li>
            <li>Ignoring extreme values when they can distort a chosen transformation.</li>
            <li>Over-engineering small datasets.</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border text-center border-emerald-200 rounded-xl p-4 shadow-sm">
          <strong className="text-emerald-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Best Practices ✅
          </strong>
          <ul className="text-sm text-emerald-900 space-y-1 text-left list-disc pl-5">
            <li>Understand the business domain.</li>
            <li>Visualize data first.</li>
            <li>Handle missing values carefully & Prevent data leakage.</li>
            <li>Use pipelines for preprocessing.</li>
            <li>Keep features interpretable where practical.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Interview Knowledge Test
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden not-prose mb-10">
        <BrainCircuit className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <div className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Check Your Understanding
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-bold text-slate-200">Q: What is data leakage?</p>
            <p className="text-sm text-slate-400 mt-1">
              Using information during training that would not be available at the real prediction time. For example, predicting a house sale price using 'price per sq ft' calculated from that same sale price would leak the answer into the input features.
            </p>
          </div>
          <div>
            <p className="font-bold text-slate-200">
              Q: Difference between Feature Selection and Feature Extraction?
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Selection keeps a subset of available features, while extraction transforms data into a new representation or set of features (for example, PCA components or TF-IDF vectors).
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Questions About Feature Engineering
      </h2>
      <div className="space-y-4 not-prose">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="font-bold text-slate-900">Is feature engineering always necessary?</div>
          <p className="text-sm text-slate-600 mt-1 mb-0">Not always. Some models can learn useful representations directly, but thoughtful features are often valuable for structured/tabular data and when domain knowledge is strong.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="font-bold text-slate-900">Can feature engineering make a model worse?</div>
          <p className="text-sm text-slate-600 mt-1 mb-0">Yes. A noisy, redundant, unstable, or leaked feature can hurt generalization. New features should be validated, not assumed to help.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="font-bold text-slate-900">Is scaling part of feature engineering?</div>
          <p className="text-sm text-slate-600 mt-1 mb-0">It is commonly treated as preprocessing, but it is part of the broader work of preparing model inputs. The exact terminology varies across teams and textbooks.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="font-bold text-slate-900">How do I know whether a new feature is useful?</div>
          <p className="text-sm text-slate-600 mt-1 mb-0">Use domain reasoning first, then compare validation or cross-validation performance with and without the feature while checking for leakage.</p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-8 not-prose">
        <div className="font-bold text-slate-900 mb-2">Continue the preprocessing path</div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a href="/learn/handling-missing-data" className="text-indigo-600 font-semibold hover:underline">Handling Missing Data</a>
          <a href="/learn/encoding-categorical" className="text-indigo-600 font-semibold hover:underline">Encoding Categorical Data</a>
          <a href="/learn/feature-scaling" className="text-indigo-600 font-semibold hover:underline">Feature Scaling</a>
          <a href="/learn/feature-selection" className="text-indigo-600 font-semibold hover:underline">Feature Selection &amp; Extraction</a>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded my-8">
        <h3 className="font-bold text-indigo-900 mt-0 text-lg mb-2">
          Industry Insight
        </h3>
        <p className="text-sm text-indigo-800 m-0">
          In structured/tabular problems, thoughtful feature engineering can sometimes improve a model more than simply switching algorithms. Deep Learning can learn many representations automatically, but domain-aware input design can still be valuable when working with structured data.
        </p>
      </div>
    </div>
  );
}
