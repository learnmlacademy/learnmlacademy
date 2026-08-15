import React from "react";
import {
  Code,
  BookOpen,
  Filter,
  Layers,
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

export function FeatureSelectionContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Feature Selection & Extraction</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Feature Selection and Feature Extraction help us reduce or reorganize
        the inputs given to a Machine Learning model. Used carefully, they can
        simplify a dataset, reduce computation, improve interpretability, and
        sometimes improve generalization.
      </p>

      <p>
        Real-world datasets often contain irrelevant features, noisy columns,
        duplicate information, high-dimensional data, and redundant variables.
        This guide covers how to optimize your dataset features.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Feature Selection & Extraction in Simple Words
      </h2>
      <p>
        Imagine your dataset has many columns, but not every column is equally
        useful. You have two simple choices: <strong>keep only useful original
        columns</strong>, or <strong>combine information into a smaller set of
        new columns</strong>.
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-bold text-blue-900 mb-3">Feature Selection</p>
          <div className="text-sm text-slate-700 space-y-2">
            <div className="rounded bg-white border border-blue-100 p-2">
              Age · Study Hours · Attendance · Student ID
            </div>
            <div className="text-center font-bold text-blue-700">↓ Keep useful columns</div>
            <div className="rounded bg-white border border-blue-100 p-2 font-medium">
              Study Hours · Attendance
            </div>
          </div>
          <p className="text-xs text-blue-900 mt-3">
            The surviving columns keep their original meaning.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-bold text-indigo-900 mb-3">Feature Extraction</p>
          <div className="text-sm text-slate-700 space-y-2">
            <div className="rounded bg-white border border-indigo-100 p-2">
              Maths · Physics · Chemistry · Biology
            </div>
            <div className="text-center font-bold text-indigo-700">↓ Combine information</div>
            <div className="rounded bg-white border border-indigo-100 p-2 font-medium">
              Component 1 · Component 2
            </div>
          </div>
          <p className="text-xs text-indigo-900 mt-3">
            The new columns are compact mathematical summaries.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full border border-slate-200 bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3 text-left border-b">Question</th>
              <th className="p-3 text-left border-b">Selection</th>
              <th className="p-3 text-left border-b">Extraction</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-medium">Do original column names remain?</td>
              <td className="p-3">Yes</td>
              <td className="p-3">Usually no</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">Simple example</td>
              <td className="p-3">Keep Age, Salary</td>
              <td className="p-3">4 columns → 2 PCA components</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Best when...</td>
              <td className="p-3">Interpretability matters</td>
              <td className="p-3">Compression is important</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        What is a Feature?
      </h2>
      <p>
        A feature is an input variable used by a Machine Learning model.
        Features help models discover patterns.
      </p>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Dataset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Features
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200 text-sm">
            <tr>
              <td className="px-6 py-4 font-medium text-slate-900">
                House Price Prediction
              </td>
              <td className="px-6 py-4 text-slate-600">
                Area, Bedrooms, Location
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-slate-900">
                Student Performance
              </td>
              <td className="px-6 py-4 text-slate-600">
                Study Hours, Attendance
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-slate-900">
                Healthcare
              </td>
              <td className="px-6 py-4 text-slate-600">
                Blood Pressure, Sugar Level
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-slate-900">
                E-Commerce
              </td>
              <td className="px-6 py-4 text-slate-600">
                Product Price, Ratings
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-2">
        Why Feature Optimization Matters
      </h3>
      <p>
        Real-world datasets often contain problems that reduce model
        performance:
      </p>
      <ul>
        <li>
          <strong>Irrelevant Features:</strong> E.g., Random IDs
        </li>
        <li>
          <strong>Duplicate Features:</strong> E.g., Same information repeated
        </li>
        <li>
          <strong>Noisy Features:</strong> E.g., Corrupted sensor data
        </li>
        <li>
          <strong>High-Dimensional Data:</strong> E.g., Thousands of columns
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        What is Feature Selection?
      </h2>
      <p>
        Feature Selection is the process of selecting the most useful features
        and removing unnecessary ones.{" "}
        <em>
          Instead of creating new features, it chooses the best subset from
          existing columns.
        </em>
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
        <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
          <strong className="block text-slate-700 mb-3 text-center">
            Original Features
          </strong>
          <ul className="space-y-2">
            <li className="bg-white p-2 border border-slate-200 rounded text-center text-sm shadow-sm">
              Age
            </li>
            <li className="bg-white p-2 border border-slate-200 rounded text-center text-sm shadow-sm">
              Salary
            </li>
            <li className="bg-white p-2 border border-red-200 text-red-600 rounded text-center text-sm line-through opacity-60">
              Phone Number
            </li>
            <li className="bg-white p-2 border border-red-200 text-red-600 rounded text-center text-sm line-through opacity-60">
              Random ID
            </li>
            <li className="bg-white p-2 border border-slate-200 rounded text-center text-sm shadow-sm">
              Experience
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center p-6 border border-indigo-200 rounded-xl bg-indigo-50">
          <strong className="block text-indigo-800 mb-3 text-center">
            Selected Features
          </strong>
          <ul className="space-y-2 w-full">
            <li className="bg-white p-2 border border-indigo-100 rounded text-center text-sm text-indigo-700 shadow-sm font-medium">
              Age
            </li>
            <li className="bg-white p-2 border border-indigo-100 rounded text-center text-sm text-indigo-700 shadow-sm font-medium">
              Salary
            </li>
            <li className="bg-white p-2 border border-indigo-100 rounded text-center text-sm text-indigo-700 shadow-sm font-medium">
              Experience
            </li>
          </ul>
          <p className="mt-4 text-xs text-indigo-900 text-center italic">
            In this example, Phone Number and Random ID are treated as identifiers
            rather than useful predictive features, so they are removed.
          </p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-sm text-emerald-900 mb-6 font-medium">
        <strong>Possible Benefits of Feature Selection:</strong> ✅ Reduce unnecessary
        inputs ✅ Shorten training time ✅ Simplify models ✅ Improve interpretability
        ✅ Sometimes improve generalization by reducing noise
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Types of Feature Selection Techniques
      </h2>

      <div className="w-full flex justify-center my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose">
        <svg
          width="600"
          height="250"
          viewBox="0 0 600 250"
          className="max-w-full font-sans"
        >
          <rect x="200" y="20" width="200" height="40" rx="8" fill="#1e293b" />
          <text
            x="300"
            y="45"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Feature Selection
          </text>

          {/* Lines */}
          <path
            d="M 300,60 L 300,90"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 120,90 L 480,90"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />

          <path
            d="M 120,90 L 120,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 300,90 L 300,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 480,90 L 480,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />

          {/* Filter */}
          <rect x="40" y="120" width="160" height="40" rx="6" fill="#3b82f6" />
          <text
            x="120"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Filter Methods
          </text>
          <text
            x="120"
            y="180"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Statistical Selection
          </text>
          <text
            x="120"
            y="200"
            fill="#475569"
            textAnchor="middle"
            fontSize="12"
          >
            e.g. Correlation
          </text>

          {/* Wrapper */}
          <rect x="220" y="120" width="160" height="40" rx="6" fill="#8b5cf6" />
          <text
            x="300"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Wrapper Methods
          </text>
          <text
            x="300"
            y="180"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Model Evaluation
          </text>
          <text
            x="300"
            y="200"
            fill="#475569"
            textAnchor="middle"
            fontSize="12"
          >
            e.g. RFE
          </text>

          {/* Embedded */}
          <rect x="400" y="120" width="160" height="40" rx="6" fill="#10b981" />
          <text
            x="480"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Embedded Methods
          </text>
          <text
            x="480"
            y="180"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            During Training
          </text>
          <text
            x="480"
            y="200"
            fill="#475569"
            textAnchor="middle"
            fontSize="12"
          >
            e.g. Lasso
          </text>
        </svg>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-2">1. Filter Methods</h3>
      <p>
        Filter methods score or remove features using statistical properties before
        fitting the final predictive model. They are often fast and scalable, but a
        simple one-feature-at-a-time test may miss useful interactions between
        features.
      </p>
      <ul>
        <li>
          <strong>Correlation:</strong> Highly correlated input features can carry
          very similar information. For some models, you may consider keeping one
          of them after checking domain meaning and validation performance.
        </li>
        <li>
          <strong>Chi-Square Test:</strong> For classification, it can test whether
          non-negative input features are related to the class label.
        </li>
        <li>
          <strong>ANOVA F-test:</strong> In supervised feature selection, it can
          score how strongly a numerical feature differs across target classes.
        </li>
        <li>
          <strong>Variance Threshold:</strong> Remove low-variance features.
        </li>
      </ul>

      <CodeBlock
        title="variance_threshold.py"
        code={`from sklearn.feature_selection import VarianceThreshold
import pandas as pd

# Creating a dataset where feature 'B' has very low variance (mostly 1s)
data = pd.DataFrame({
    'A': [1, 2, 3, 4, 5],
    'B': [1, 1, 1, 1, 0],
    'C': [5, 4, 3, 2, 1]
})

selector = VarianceThreshold(threshold=0.2)
X_new = selector.fit_transform(data)

print(X_new)`}
        output={`[[1 5]
 [2 4]
 [3 3]
 [4 2]
 [5 1]]
# Column B is removed because its variance is below 0.2.`}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <p className="font-bold text-blue-900 mb-2">A tiny variance example</p>
        <p className="text-sm text-slate-700 mb-3">
          Feature B contains <code>[1, 1, 1, 1, 0]</code>. It changes very little,
          so its population variance is only <strong>0.16</strong>. With a threshold
          of <strong>0.20</strong>, it is removed.
        </p>
        <p className="text-xs text-blue-900 mb-0">
          Low variance does not automatically mean a feature is useless. Treat this
          as a simple filter and validate the choice for your problem.
        </p>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-2">2. Wrapper Methods</h3>
      <p>
        Wrapper methods evaluate multiple feature combinations using actual ML
        model performance. Examples include Forward Selection, Backward
        Selection, and Recursive Feature Elimination (RFE).
      </p>

      <p>
        <strong>Recursive Feature Elimination (RFE)</strong> repeatedly trains a
        estimator and recursively removes the least important features until the
        requested number remains. Because it repeatedly fits a model, it can be
        more computationally expensive than simple filters.
      </p>

      <CodeBlock
        title="rfe_example.py"
        code={`from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=100, n_features=10, random_state=42)

model = LogisticRegression(max_iter=1000)
# Select top 5 features out of 10
rfe = RFE(model, n_features_to_select=5)
X_rfe = rfe.fit_transform(X, y)

print("Original shape:", X.shape)
print("New shape:", X_rfe.shape)
print("Which columns were selected?", rfe.support_)`}
        output={`Original shape: (100, 10)
New shape: (100, 5)
Which columns were selected? [ True  True  True  True False False  True False False False]`}
      />

      <h3 className="text-xl font-bold mt-10 mb-2">3. Embedded Methods</h3>
      <p>
        Embedded methods use information learned while fitting a model to decide
        which features matter. Examples include Lasso-based selection and
        importance-based selection with suitable tree models.
      </p>
      <p>
        <strong>Lasso Regression</strong> uses an L1 penalty and can drive some
        coefficients exactly to zero. Those zero-coefficient features can then be
        treated as unselected. <strong>Ridge</strong>, by contrast, usually shrinks
        coefficients but does not normally create sparse zero-coefficient feature
        sets, so it is not usually used as a direct selector.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center my-6">
        <div className="font-mono">Simplified idea: Error + λ × ∑|βᵢ|</div>
        <div className="text-xs text-slate-500 mt-1">Prediction error + L1 penalty</div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <p className="font-bold text-amber-900 mb-3">Simple Lasso penalty calculation</p>
        <p className="text-sm text-slate-700">Suppose:</p>
        <ul className="text-sm text-slate-700">
          <li>RSS = 8</li>
          <li>λ = 2</li>
          <li>Coefficients = 3, -1, 0.5</li>
        </ul>
        <div className="space-y-3 text-sm mt-4">
          <div><strong>Step 1 — Add absolute coefficient values</strong><br/><code>|3| + |-1| + |0.5| = 4.5</code></div>
          <div><strong>Step 2 — Apply the penalty strength</strong><br/><code>2 × 4.5 = 9</code></div>
          <div><strong>Step 3 — Add it to the original error</strong><br/><code>8 + 9 = 17</code></div>
        </div>
        <p className="text-xs text-amber-900 mt-4 mb-0">
          This tiny calculation only explains the objective. During training, Lasso
          searches for coefficients that balance prediction error and the L1 penalty.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        What is Feature Extraction?
      </h2>
      <p>
        Feature Extraction transforms the original variables into a new
        representation. Unlike selection, which keeps a subset of original
        columns, extraction creates new features that can summarize important
        patterns in the original data.
      </p>
      <p>
        <strong>Why Feature Extraction Matters:</strong> It can reduce
        dimensionality, make some datasets easier to visualize, and sometimes
        reduce computation. The trade-off is that the new components may be harder
        to interpret and some information can be lost.
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="border border-slate-200 rounded p-4 text-sm bg-white shadow-sm">
          <strong>Raw Features (e.g., Image Pixels):</strong> <br /> Pixel1,
          Pixel2, Pixel3, Pixel4, Pixel_N...
        </div>
        <div className="border border-indigo-200 rounded p-4 text-sm bg-indigo-50 shadow-sm text-indigo-900">
          <strong>Extracted Meaning:</strong> <br /> Edge Mapping, Texture
          Pattern, Geometric Shape
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 my-6 not-prose">
        <p className="font-bold text-indigo-900 mb-3">A simple way to picture extraction</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-center">
          <div className="bg-white border border-indigo-100 rounded-lg p-3 w-full md:w-auto">Maths<br/>Physics<br/>Chemistry<br/>Biology</div>
          <div className="font-bold text-indigo-700">→</div>
          <div className="bg-white border border-indigo-100 rounded-lg p-3 w-full md:w-auto">Extraction method</div>
          <div className="font-bold text-indigo-700">→</div>
          <div className="bg-white border border-indigo-100 rounded-lg p-3 w-full md:w-auto">Component 1<br/>Component 2</div>
        </div>
        <p className="text-xs text-indigo-900 mt-3 mb-0 text-center">
          Four original columns become two new summary columns. The new components
          no longer have simple names like “Maths” or “Physics.”
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Core Techniques in Feature Extraction
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 p-1.5 rounded-lg">
              <Layers className="w-5 h-5" />
            </span>
            1. Dimensionality Reduction Methods
          </h3>
          <p>
            These algorithms find mathematical ways to squish numerous columns
            into a few elite "components" while retaining the dataset's core
            characteristics.
          </p>
          <ul className="pl-5 space-y-2 mt-3 list-disc text-slate-700">
            <li>
              <strong>Principal Component Analysis (PCA):</strong> The most
              popular unsupervised dimensionality-reduction technique. It finds
              new directions that capture as much variance in the data as possible,
              then projects the observations onto those directions.
            </li>
            <li>
              <strong>Linear Discriminant Analysis (LDA):</strong> A supervised
              supervised dimensionality-reduction method that uses class labels and
              seeks directions that separate classes relative to variation within
              each class.
            </li>
            <li>
              <strong>t-SNE & UMAP:</strong> Non-linear dimensionality-reduction
              techniques commonly used to explore or visualize high-dimensional
              data in 2D or 3D. Their plots should be interpreted carefully.
            </li>
          </ul>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
            Z = X_centered × W{" "}
            <span className="text-xs text-slate-500 block mt-1">
              (Conceptually: centered data projected onto component directions)
            </span>
          </div>

          <CodeBlock
            title="pca_example.py"
            code={`from sklearn.decomposition import PCA
import numpy as np

# A small fixed dataset with 4 numeric features
X = np.array([
    [1, 2, 1, 4],
    [2, 4, 2, 3],
    [3, 5, 3, 5],
    [4, 7, 4, 6],
    [5, 8, 6, 7],
    [6, 10, 5, 9],
    [7, 11, 7, 8],
    [8, 13, 9, 11]
], dtype=float)

# Reduce 4 original features to 2 new components
pca = PCA(n_components=2)
X_compressed = pca.fit_transform(X)

print("Original Data Shape:", X.shape)
print("Compressed Shape:", X_compressed.shape)
print("Variance Captured (%):", np.round(pca.explained_variance_ratio_ * 100, 2))
print("Total captured (%):", round(pca.explained_variance_ratio_.sum() * 100, 2))`}
            output={`Original Data Shape: (8, 4)
Compressed Shape: (8, 2)
Variance Captured (%): [97.31  1.76]
Total captured (%): 99.06`}
          />
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900 mt-4">
            <strong>Scaling note:</strong> PCA centers features, but it does not
            automatically scale every feature to the same variance. If features use
            very different units (for example rupees and years), scaling is often
            useful before PCA so one large-scale feature does not dominate the
            variance.
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </span>
            2. Extracting Information from Text (NLP)
          </h3>
          <p>
            Most standard machine-learning algorithms ultimately work with numeric
            representations. Text therefore needs to be converted into useful
            numeric features or embeddings before those models can use it.
          </p>
          <ul className="pl-5 space-y-2 mt-3 list-disc text-slate-700">
            <li>
              <strong>Bag of Words (BoW):</strong> Represents documents using
              counts (or presence) of words from a vocabulary.
            </li>
            <li>
              <strong>
                TF-IDF (Term Frequency - Inverse Document Frequency):
              </strong>{" "}
              Gives a word more weight when it is frequent in one document but
              less common across the full collection of documents.
            </li>
            <li>
              <strong>Embeddings:</strong> Methods such as Word2Vec and GloVe create
              dense word vectors, while transformer models such as BERT can produce
              context-dependent representations. Similar meanings can often have
              related vector representations.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 p-1.5 rounded-lg">
              <Filter className="w-5 h-5" />
            </span>
            3. Image and Signal Extraction
          </h3>
          <p>
            Images and audio can contain many raw values such as pixels or waveform
            samples. Feature extraction can turn those raw values into representations
            that are easier for a model to use.
          </p>
          <ul className="pl-5 space-y-2 mt-3 list-disc text-slate-700">
            <li>
              <strong>Computer Vision:</strong> Historically, classical
              techniques such as HOG (Histogram of Oriented Gradients) describe
              local edge directions. Convolutional Neural Networks (CNNs) can learn
              hierarchical visual features automatically during training.
            </li>
            <li>
              <strong>Audio Processing:</strong> Sound tracks are converted into
              spectrograms or summarized using features such as MFCCs
              (Mel-Frequency Cepstral Coefficients), which describe useful aspects
              of the frequency spectrum.
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Pros and Cons of Extraction
      </h2>

      <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
        <div className="bg-emerald-50 border text-center border-emerald-200 rounded-xl p-4 shadow-sm">
          <strong className="text-emerald-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Advantages ✅
          </strong>
          <ul className="text-sm text-emerald-900 space-y-1 text-left list-disc pl-5">
            <li>
              <strong>Resource Efficiency:</strong> Fewer dimensions can reduce
              memory use and training time for some workflows.
            </li>
            <li>
              <strong>May Reduce Noise:</strong> A compact representation can
              sometimes improve generalization, but this is not guaranteed.
            </li>
            <li>
              <strong>Data Visualization:</strong> Extracting from 1,000 hidden
              mathematical dimensions down to 2 or 3 allows human scientists to
              visually graph trends.
            </li>
          </ul>
        </div>
        <div className="bg-orange-50 border text-center border-orange-200 rounded-xl p-4 shadow-sm">
          <strong className="text-orange-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Challenges ⚠️
          </strong>
          <ul className="text-sm text-orange-900 space-y-1 text-left list-disc pl-5">
            <li>
              <strong>Loss of Direct Meaning:</strong> Highly compressed
              mathematical components lose their real-world 'labels'. A feature
              named `Component 1` is harder to explain than `Age`.
            </li>
            <li>
              <strong>Information Loss:</strong> Compression can discard information
              that may matter for prediction.
            </li>
            <li>
              <strong>Computation Cost:</strong> Some extraction methods are cheap,
              while training large representation-learning models can be expensive.
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Feature Selection vs Feature Extraction
      </h2>

      <p className="mb-4">
        Since Feature Selection and Feature Extraction are related but serve
        distinctly different purposes, let’s quickly contrast them across key
        aspects for a better understanding:
      </p>

      <div className="overflow-x-auto my-6 not-prose border border-slate-200 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-500 uppercase tracking-wider text-xs border-r border-slate-100">
                Comparison Aspect
              </th>
              <th className="p-4 font-semibold text-slate-800 border-r border-slate-100">
                Feature Selection
              </th>
              <th className="p-4 font-semibold text-indigo-800 bg-indigo-50/30">
                Feature Extraction
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-medium text-slate-500 bg-slate-50/50 border-r border-slate-100 align-top">
                Core Definition
              </td>
              <td className="p-4 text-slate-800 border-r border-slate-100 align-top">
                Identifies and retains a relevant subset of the original dataset
                columns.
              </td>
              <td className="p-4 text-indigo-900 bg-indigo-50/30 align-top">
                Mathematically transforms existing columns into an entirely new
                set of condensed variables.
              </td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-500 bg-slate-50/50 border-r border-slate-100 align-top">
                Primary Goal
              </td>
              <td className="p-4 text-slate-800 border-r border-slate-100 align-top">
                To specifically reduce dimensionality by dropping redundant or
                irrelevant data.
              </td>
              <td className="p-4 text-indigo-900 bg-indigo-50/30 align-top">
                To compress raw, complex high-dimensional information into a
                smaller, dense, and more informative representation.
              </td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-500 bg-slate-50/50 border-r border-slate-100 align-top">
                Underlying Process
              </td>
              <td className="p-4 text-slate-800 border-r border-slate-100 align-top">
                Relies on statistical filters, wrapper algorithms (like RFE),
                and embedded model penalties.
              </td>
              <td className="p-4 text-indigo-900 bg-indigo-50/30 align-top">
                Utilizes linear algebra, signal processing, and transformation
                algorithms (like PCA or neural nets).
              </td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-500 bg-slate-50/50 border-r border-slate-100 align-top">
                Resulting Output
              </td>
              <td className="p-4 text-slate-800 border-r border-slate-100 align-top">
                A strict, smaller subset consisting solely of the original
                features.
              </td>
              <td className="p-4 text-indigo-900 bg-indigo-50/30 align-top">
                A completely new, abstract array of engineered components that
                replace the original data.
              </td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-500 bg-slate-50/50 border-r border-slate-100 align-top">
                Computational Cost
              </td>
              <td className="p-4 text-slate-800 border-r border-slate-100 align-top">
                Generally lightweight and incurs a lower computational cost.
              </td>
              <td className="p-4 text-indigo-900 bg-indigo-50/30 align-top">
                Varies by method: PCA can be moderate, while deep representation
                learning can be much more computationally expensive.
              </td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-500 bg-slate-50/50 border-r border-slate-100 align-top">
                Human Interpretability
              </td>
              <td className="p-4 text-emerald-700 font-medium border-r border-slate-100 align-top">
                High (Retains the original interpretability of variables, e.g.,
                "Age" still means "Age").
              </td>
              <td className="p-4 text-orange-700 font-medium bg-indigo-50/30 align-top">
                Low (The final variables are abstract mathematical combinations,
                e.g., "Principal Component 2").
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>When to use Selection:</strong> Need interpretability, want
        faster models, features are redundant, working with tabular data.
        <br />
        <strong>When to use Extraction:</strong> High-dimensional data exists,
        need compression, working with images/text/audio, visualization is
        needed.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        The Curse of Dimensionality
      </h2>
      <p>
        As dimensionality grows, data can become sparse and distance-based patterns
        may become harder to estimate reliably. More features can also increase
        computation and overfitting risk. Feature selection or extraction can help,
        but they should be validated rather than applied automatically.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
        <div className="bg-red-50 border text-center border-red-200 rounded-xl p-4 shadow-sm">
          <strong className="text-red-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Mistakes to Avoid ❌
          </strong>
          <ul className="text-sm text-red-900 space-y-1 text-left list-disc pl-5">
            <li>Removing useful features accidentally.</li>
            <li>
              Letting very different feature scales dominate PCA without first
              deciding whether scaling is appropriate.
            </li>
            <li>Ignoring interpretability when choosing extraction.</li>
            <li>
              Data leakage during feature selection (Select based on entire
              dataset instead of just training set).
            </li>
          </ul>
        </div>
        <div className="bg-emerald-50 border text-center border-emerald-200 rounded-xl p-4 shadow-sm">
          <strong className="text-emerald-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Best Practices ✅
          </strong>
          <ul className="text-sm text-emerald-900 space-y-1 text-left list-disc pl-5">
            <li>Consider scaling before PCA when feature units/scales differ greatly.</li>
            <li>Use Cross-Validation with wrapper methods.</li>
            <li>Balance interpretability and accuracy.</li>
            <li>Use domain knowledge to validate feature subset selection.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Questions
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold mb-1">Does feature selection always improve accuracy?</h3>
          <p>
            No. It can reduce noise and simplify a model, but removing a useful
            feature can make performance worse. Compare alternatives using
            validation or cross-validation.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">Is PCA feature selection?</h3>
          <p>
            No. PCA is feature extraction: it creates new principal components from
            combinations of the original numeric features.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">Should feature selection use the test set?</h3>
          <p>
            No. Learn the selection rule using training data (and validation/CV as
            appropriate), then evaluate the final pipeline on untouched test data.
            Otherwise information can leak into model development.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-8 not-prose">
        <p className="font-bold text-slate-900 mb-2">Continue learning</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="/learn/feature-engineering" className="text-indigo-700 hover:underline">Feature Engineering</a>
          <span className="text-slate-400">→</span>
          <a href="/learn/feature-selection" className="text-indigo-700 hover:underline">Feature Selection & Extraction</a>
          <span className="text-slate-400">→</span>
          <a href="/learn/pca" className="text-indigo-700 hover:underline">PCA</a>
          <span className="text-slate-400">·</span>
          <a href="/learn/lasso-regression" className="text-indigo-700 hover:underline">Lasso Regression</a>
          <span className="text-slate-400">·</span>
          <a href="/learn/cross-validation" className="text-indigo-700 hover:underline">Cross-Validation</a>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Interview Knowledge Test
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden not-prose mb-10">
        <BrainCircuit className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Quiz
        </h4>
        <div className="space-y-4">
          <div>
            <p className="font-bold text-slate-200">
              Q: Difference between PCA and RFE?
            </p>
            <p className="text-sm text-slate-400 mt-1">
              PCA extracts entirely new components from linear combinations of
              the data. RFE recursively evaluates and removes original features
              using importance information from an estimator.
            </p>
          </div>
          <div>
            <p className="font-bold text-slate-200">
              Q: Which is more interpretable?
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Feature Selection. You keep columns with exact, real-world
              meanings (like "Age" or "Salary"), rather than PCA's
              mathematically abstract "Component 1".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
