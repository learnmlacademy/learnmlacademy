import React from "react";
import {
  Code,
  AlertTriangle,
  BookOpen,
  Filter,
  Layers,
  BrainCircuit,
  Settings,
  ArrowRight,
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
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Feature Selection</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Feature Selection and Feature Extraction are two of the most important
        techniques in Machine Learning preprocessing. If unnecessary features
        are not handled properly, Machine Learning models become slower, less
        accurate, more memory-intensive, and prone to overfitting.
      </p>

      <p>
        Real-world datasets often contain irrelevant features, noisy columns,
        duplicate information, high-dimensional data, and redundant variables.
        This guide covers how to optimize your dataset features.
      </p>

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
            Phone number and Random ID do not help prediction so they are
            removed.
          </p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-sm text-emerald-900 mb-6 font-medium">
        <strong>Goals of Feature Selection:</strong> ✅ Improve accuracy ✅
        Reduce overfitting ✅ Reduce training time ✅ Simplify models ✅ Improve
        interpretability
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
        Filter methods use statistical techniques to select features{" "}
        <em>independently</em> from ML algorithms. They are fast, scalable, and
        easy to implement, though they ignore model interactions.
      </p>
      <ul>
        <li>
          <strong>Correlation:</strong> Remove highly related features. If
          Salary & Annual Income have correlation 0.98, one can be removed.
        </li>
        <li>
          <strong>Chi-Square Test:</strong> Select categorical relationships.
        </li>
        <li>
          <strong>ANOVA:</strong> Compare group means.
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

selector = VarianceThreshold(threshold=0.1)
X_new = selector.fit_transform(data)

print(X_new)`}
        output={`[[1 5]
 [2 4]
 [3 3]
 [4 2]
 [5 1]] # Column B is removed!`}
      />

      <h3 className="text-xl font-bold mt-10 mb-2">2. Wrapper Methods</h3>
      <p>
        Wrapper methods evaluate multiple feature combinations using actual ML
        model performance. Examples include Forward Selection, Backward
        Elimination, and Recursive Feature Elimination (RFE).
      </p>

      <p>
        <strong>Recursive Feature Elimination (RFE)</strong> repeatedly trains a
        model and removes the least important features until the desired number
        of features is reached. It has high accuracy but is computationally
        expensive.
      </p>

      <CodeBlock
        title="rfe_example.py"
        code={`from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=100, n_features=10, random_state=42)

model = LogisticRegression()
# Select top 5 features out of 10
rfe = RFE(model, n_features_to_select=5)
X_rfe = rfe.fit_transform(X, y)

print("Original shape:", X.shape)
print("New shape:", X_rfe.shape)
print("Which columns were selected?", rfe.support_)`}
        output={`Original shape: (100, 10)
New shape: (100, 5)
Which columns were selected? [False False False  True False  True  True  True  True False]`}
      />

      <h3 className="text-xl font-bold mt-10 mb-2">3. Embedded Methods</h3>
      <p>
        Embedded methods perform feature selection <em>during</em> model
        training. Examples include Lasso Regression, Ridge Regression, and Tree
        Feature Importance.
      </p>
      <p>
        <strong>Lasso Regression</strong> penalizes large weights and pushes
        weak feature coefficients toward zero. Features with zero coefficients
        are automatically removed. This is faster than wrapper methods and is
        built into training.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
        Loss = RSS + λ ∑|β_i|
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        What is Feature Extraction?
      </h2>
      <p>
        Feature Extraction involves taking your raw data and creating entirely{" "}
        <em>new</em>, condensed features out of it. Unlike selection, which just
        drops columns, extraction mathematically transforms and compresses your
        data into a completely new feature space that captures the original
        essence in a much denser format.
      </p>
      <p>
        <strong>Why Feature Extraction Matters:</strong> It serves as a direct
        counter to the Curse of Dimensionality by drastically compressing
        information, removing redundant structural noise, and maximizing model
        training speeds without heavily sacrificing predictive power.
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
              popular unsupervised technique. It linearly maps data to discover
              the directions of 'maximum variance'—the angles where the data
              differs the most.
            </li>
            <li>
              <strong>Linear Discriminant Analysis (LDA):</strong> A supervised
              alternative to PCA that transforms the data explicitly to maximize
              the distance (separation) between known target categories.
            </li>
            <li>
              <strong>t-SNE & UMAP:</strong> Highly advanced, strictly
              non-linear techniques employed heavily to visualize chaotic
              high-dimensional data in simple 2D or 3D scatter plots.
            </li>
          </ul>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center my-6">
            Z = X * W{" "}
            <span className="text-xs text-slate-500 block mt-1">
              (Transformed Subspace = Original Data * Component Weights)
            </span>
          </div>

          <CodeBlock
            title="pca_example.py"
            code={`from sklearn.decomposition import PCA
import numpy as np

# A raw dataset with 4 completely unstructured features
X = np.random.rand(10, 4)

# Squish the 4 features mathematically into just 2 main components
pca = PCA(n_components=2)
X_compressed = pca.fit_transform(X)

print("Original Data Shape:", X.shape)
print("Compressed Shape:", X_compressed.shape)
print("Variance Captured (%):", np.round(pca.explained_variance_ratio_ * 100, 2))`}
            output={`Original Data Shape: (10, 4)
Compressed Shape: (10, 2)
Variance Captured (%): [42.15  28.91] # Over 71% of the information kept in just 2 columns!`}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </span>
            2. Extracting Information from Text (NLP)
          </h3>
          <p>
            Machine learning models only consume numbers. When working with
            natural language paragraphs or documents, you must extract
            meaningful mathematical mappings.
          </p>
          <ul className="pl-5 space-y-2 mt-3 list-disc text-slate-700">
            <li>
              <strong>Bag of Words (BoW):</strong> A brute-force metric that
              counts the absolute raw frequency of exact words inside a
              document.
            </li>
            <li>
              <strong>
                TF-IDF (Term Frequency - Inverse Document Frequency):
              </strong>{" "}
              An upgraded feature extraction algorithm that weighs words based
              on how prominent they are locally, heavily penalized if they
              appear commonly across the entire body of texts.
            </li>
            <li>
              <strong>Word Embeddings (Word2Vec, GloVe, BERT):</strong> The
              cutting-edge approach where neural networks assign
              multi-dimensional coordinate vectors to words, causing synonyms to
              literally sit closer together in mathematical space.
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
            Raw multimedia files are giant, heavy matrices of distinct pixels or
            continuous waveforms. Feature extraction distills them down to
            essential elements without passing 10,000 pixels directly to the
            computer.
          </p>
          <ul className="pl-5 space-y-2 mt-3 list-disc text-slate-700">
            <li>
              <strong>Computer Vision:</strong> Historically, classical
              techniques like HOG (Histogram of Oriented Gradients) manually
              pulled out edges and shapes. Today, Convolutional Neural Networks
              (CNNs) automate extraction, grabbing deep hierarchical textures.
            </li>
            <li>
              <strong>Audio Processing:</strong> Sound tracks are converted into
              spectrogram features, or transformed using MFCCs (Mel-Frequency
              Cepstral Coefficients), pulling out frequency structures that
              accurately emulate human hearing.
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
              <strong>Resource Efficiency:</strong> Massively boosts training
              times by discarding heavy overhead data.
            </li>
            <li>
              <strong>Fights Overfitting:</strong> Combats over-memorization in
              models by erasing hyper-specific local noise.
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
              <strong>Information Diminishment:</strong> A tiny percentage of
              the critical trend may be lost during the extraction compression.
            </li>
            <li>
              <strong>Upfront Computation Cost:</strong> Advanced algorithms
              like large-scale Word2vec embeddings require enormous initial
              computing power to extract the features.
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
                Can be much higher, heavily CPU/GPU intensive depending on the
                complexity of the transformation matrix.
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
        Too many features create a sparse high-dimensional space. Problems
        include overfitting, slow training, massive memory usage, and poor
        generalization. Feature Selection and Extraction directly solve this
        problem.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
        <div className="bg-red-50 border text-center border-red-200 rounded-xl p-4 shadow-sm">
          <strong className="text-red-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Mistakes to Avoid ❌
          </strong>
          <ul className="text-sm text-red-900 space-y-1 text-left list-disc pl-5">
            <li>Removing useful features accidentally.</li>
            <li>
              Applying PCA <em>before</em> scaling (PCA requires standardized
              data).
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
            <li>Scale data before PCA.</li>
            <li>Use Cross-Validation with wrapper methods.</li>
            <li>Balance interpretability and accuracy.</li>
            <li>Use domain knowledge to validate feature subset selection.</li>
          </ul>
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
              the data. RFE manually selects and keeps the best exact original
              column features.
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
