import React from "react";
import {
  Code,
  Hammer,
  AlertTriangle,
  Blocks,
  Sparkles,
  BookOpen,
  BrainCircuit,
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

export function FeatureEngineeringContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Feature Engineering</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Feature Engineering is the process of using domain knowledge to extract features from raw data to improve the performance of machine learning algorithms.</p>

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
            High Accuracy
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

      <h3 className="text-xl font-bold mt-8 mb-2">Real-Life Analogy</h3>
      <p>Imagine predicting house prices. Raw data looks like:</p>

      <div className="overflow-x-auto my-4 not-prose">
        <table className="w-auto border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-3 text-left">House ID</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="p-3">101</td>
              <td className="p-3">2026-05-01</td>
              <td className="p-3">Bangalore</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        This data alone is not very useful. Feature Engineering creates
        meaningful features such as:
      </p>

      <ul className="grid sm:grid-cols-2 gap-4 mt-4 not-prose mb-8">
        <li className="p-4 border border-slate-200 rounded shadow-sm">
          <strong className="block text-indigo-700">House Age</strong>
          <span className="text-sm text-slate-600">
            (Current year - built year)
          </span>
        </li>
        <li className="p-4 border border-slate-200 rounded shadow-sm">
          <strong className="block text-emerald-700">Distance to Center</strong>
          <span className="text-sm text-slate-600">Location importance</span>
        </li>
        <li className="p-4 border border-slate-200 rounded shadow-sm">
          <strong className="block text-amber-700">Nearby Schools</strong>
          <span className="text-sm text-slate-600">Family convenience</span>
        </li>
        <li className="p-4 border border-slate-200 rounded shadow-sm">
          <strong className="block text-purple-700">Price per SqFt</strong>
          <span className="text-sm text-slate-600">Value density</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Types of Features
      </h2>

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
          features and remove irrelevant ones.
        </li>
      </ol>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Feature Engineering Techniques
      </h2>
      <p>
        There are several widely used techniques in feature engineering to handle different types of data imperfections.
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
          <strong>Remove Missing Rows:</strong> Useful when missing values are
          very small.
        </li>
        <li>
          <strong>Mean Imputation:</strong> Replace missing values with the
          average.
        </li>
        <li>
          <strong>Median Imputation:</strong> Better for skewed data.
        </li>
        <li>
          <strong>Mode Imputation:</strong> Useful for categorical variables.
        </li>
      </ul>

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
        Machine Learning models cannot directly understand text labels (e.g.
        Red, Blue, Green must be converted into numbers). Common methods: Label
        Encoding (ordinal), One-Hot Encoding (nominal), and Target Encoding
        (high-cardinality).
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
        Different features may have different ranges (e.g., Age 18–60 vs Salary
        2L–50L). Large values dominate smaller ones.
      </p>
      <ul>
        <li>
          <strong>Normalization:</strong> Range [0,1]
        </li>
        <li>
          <strong>Standardization:</strong> Mean=0, Std=1
        </li>
        <li>
          <strong>Robust Scaling:</strong> Handles outliers
        </li>
      </ul>

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
        4. Binning (Discretization)
      </h3>
      <p>
        Binning groups continuous values into ranges. This reduces noise,
        improves interpretability, and handles outliers better.
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

      <h3 className="text-xl font-bold mt-8 mb-2">5. Log Transformation</h3>
      <p>
        Used when data is heavily skewed (e.g., Income, Website traffic, Sales
        volume). It reduces skewness, stabilizes variance, and improves linear
        relationships.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
        x' = log(x + 1)
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
        6. Date-Time Feature Engineering
      </h3>
      <p>
        Dates contain hidden information. From a single date string we can
        extract: Day, Month, Year, Weekday, Quarter, Weekend indicator.
      </p>
      <CodeBlock
        title="datetime_features.py"
        code={`import pandas as pd

df = pd.DataFrame({'Date': pd.to_datetime(['2026-05-13', '2026-12-25'])})

df['Month'] = df['Date'].dt.month
df['Weekday'] = df['Date'].dt.weekday
df['Is_Weekend'] = df['Weekday'] >= 5

print(df)`}
        output={`        Date  Month  Weekday  Is_Weekend
0 2026-05-13      5        2       False
1 2026-12-25     12        4       False`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">
        7. Text Feature Engineering
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

      <h3 className="text-xl font-bold mt-8 mb-2">8. Feature Extraction</h3>
      <p>
        Feature Extraction creates new informative features, usually
        algorithmically. While Feature Engineering is often manual creation
        based on domain knowledge, Feature Extraction is algorithmic
        transformation (e.g. image edges, audio frequency, text sentiment).
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">9. Feature Selection</h3>
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
            <li>Not handling outliers before scaling.</li>
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
            <li>Keep features interpretable.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Interview Knowledge Test
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden not-prose mb-10">
        <BrainCircuit className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Check Your Understanding
        </h4>
        <div className="space-y-4">
          <div>
            <p className="font-bold text-slate-200">Q: What is data leakage?</p>
            <p className="text-sm text-slate-400 mt-1">
              Using information during training that would not be available
              during prediction (e.g. predicting if someone defaults on a loan
              using a feature named 'Collections Department ID').
            </p>
          </div>
          <div>
            <p className="font-bold text-slate-200">
              Q: Difference between Feature Selection and Feature Extraction?
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Selection merely filters and keeps the best original/engineered
              features, while extraction mathematically transforms variables to
              create entirely new components (like PCA).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded my-8">
        <h3 className="font-bold text-indigo-900 mt-0 text-lg mb-2">
          Industry Insight
        </h3>
        <p className="text-sm text-indigo-800 m-0">
          In many Kaggle competitions and production ML systems, better feature
          engineering often improves performance more than changing algorithms.
          Deep Learning automatically learns representations, but feature
          engineering still remains extremely important for structured tabluar
          datasets!
        </p>
      </div>
    </div>
  );
}
