import React from 'react';
import { Lightbulb, Code, Layers, Eye, Calculator } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function TSNEContent() {
  const clusterA = Array.from({ length: 40 }, () => ({ x: Math.random() * 20 + 10, y: Math.random() * 20 + 50, cluster: 0 }));
  const clusterB = Array.from({ length: 40 }, () => ({ x: Math.random() * 20 + 60, y: Math.random() * 20 + 20, cluster: 1 }));
  const clusterC = Array.from({ length: 40 }, () => ({ x: Math.random() * 20 + 80, y: Math.random() * 15 + 70, cluster: 2 }));
  const tsneData = [...clusterA, ...clusterB, ...clusterC];
  const COLORS = ['#ef4444', '#3b82f6', '#10b981'];

  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">t-Distributed Stochastic Neighbor Embedding (t-SNE)</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          t-Distributed Stochastic Neighbor Embedding, commonly called <strong>t-SNE</strong>, is a powerful non-linear dimensionality reduction algorithm used for visualizing high-dimensional datasets in lower-dimensional space such as 2D or 3D.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In modern Machine Learning and Data Science, datasets often contain:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Hundreds of features</li>
          <li>Thousands of variables</li>
          <li>Complex hidden relationships</li>
          <li>Non-linear structures</li>
        </ul>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Humans cannot naturally visualize data beyond three dimensions. Because of this limitation, understanding the hidden structure inside large datasets becomes extremely difficult. t-SNE solves this problem by transforming high-dimensional data into a low-dimensional representation while preserving important relationships between nearby data points.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">The Central Objective of t-SNE:</p>
          <p className="text-slate-800 italic leading-relaxed">
            Keep similar points close together after dimensionality reduction.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Unlike traditional dimensionality reduction algorithms such as PCA, t-SNE focuses heavily on preserving local neighborhoods, cluster structures, and similarity relationships.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          This makes t-SNE one of the most widely used visualization algorithms in Deep Learning, Computer Vision, NLP, Bioinformatics, Recommendation Systems, and Embedding Visualization.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl text-center shadow-sm">
            <span className="text-3xl font-bold text-sky-700 block mb-1">t</span>
            <span className="text-sm font-medium text-slate-800">t-distributed</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center shadow-sm">
            <span className="text-3xl font-bold text-emerald-700 block mb-1">S</span>
            <span className="text-sm font-medium text-slate-800">Stochastic</span>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-center shadow-sm">
            <span className="text-3xl font-bold text-amber-700 block mb-1">N</span>
            <span className="text-sm font-medium text-slate-800">Neighbor</span>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-center shadow-sm">
            <span className="text-3xl font-bold text-rose-700 block mb-1">E</span>
            <span className="text-sm font-medium text-slate-800">Embedding</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-tsne">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Eye className="mr-3 text-indigo-600" /> Why t-SNE Was Developed
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Modern datasets are often extremely large and complex. Visualizing such datasets directly is impossible, as humans can only comfortably visualize 2D or 3D data.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Example: E-commerce Customers</p>
          <p className="text-slate-800 leading-relaxed">
            Suppose each customer has factors like purchase history, browsing behavior, product interests, time spent on website, spending patterns, and click behavior across 500+ dimensions. How do we visualize customer groups? Dimensionality reduction becomes essential.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Limitations of Traditional Methods</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Before t-SNE, algorithms like PCA were commonly used. PCA works well for linear datasets, but real-world data is often highly non-linear.
        </p>
        
        <div className="flex flex-col space-y-6 mb-8">
          <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-rose-900 mb-2">PCA Limitation</p>
            <p className="text-slate-800">PCA focuses mainly on preserving global variance, but struggles to preserve local neighborhood structures. Clusters may overlap or become unclear.</p>
          </div>
          <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-emerald-900 mb-2">t-SNE Solution</p>
            <p className="text-slate-800">t-SNE was specifically designed to beautifully preserve and separate nonlinear local structures.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="core-philosophy">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 text-indigo-600" /> Core Philosophy of t-SNE
        </h2>

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-6 shadow-md mb-8">
          <p className="text-xl font-bold text-center leading-relaxed">
            "Points that are close in high-dimensional space should remain close in low-dimensional space."
          </p>
        </div>

        <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
          Imagine a classroom full of students. Students naturally form friend groups based on similar interests and behavior. Suppose we compress all classroom information into a simple 2D map. Even after compression: close friends should remain close, while different friend groups should remain separated. t-SNE tries to preserve these intuitive relationships mathematically.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">2D t-SNE Visualization Map</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The primary goal of t-SNE is not classification or prediction, but visualization and exploratory analysis. It helps researchers discover hidden clusters, understand embeddings, and visualize neural network outputs.
        </p>
        
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-10 w-full max-w-3xl">
          <h4 className="font-bold text-slate-800 text-center mb-4">Simulated t-SNE Output with 3 True Clusters</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" dataKey="x" hide />
                <YAxis type="number" dataKey="y" hide />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="t-SNE Output" data={tsneData}>
                  {tsneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.cluster]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="fundamental-concepts">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Calculator className="mr-3 text-indigo-600" /> Fundamental Concepts in t-SNE
        </h2>

        <div className="font-mono text-emerald-900 bg-emerald-50 p-6 rounded-xl border border-emerald-100 whitespace-pre overflow-x-auto w-fit mb-10">
{`t-SNE CONCEPTS
│
├── Distance & Similarity
├── Probability Distribution
├── Gaussian Distribution
├── Student t-Distribution
├── KL Divergence
└── Gradient Descent`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Distance & High-Dimensional Similarity</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The first step is measuring similarity between points using Euclidean distance. Nearby points are considered similar; faraway points are dissimilar. 
        </p>
        
        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-3">Euclidean Distance Formula</p>
          <p className="font-mono text-slate-800 text-md mb-2">d = √[ (x₂ - x₁)² + (y₂ - y₁)² ]</p>
          <div className="mt-4 pt-4 border-t border-indigo-200">
            <p className="font-bold text-slate-900 mb-2">Worked Numerical Example:</p>
            <p className="font-mono text-sm text-slate-800 mb-1">Point A = (1, 2)  |  Point B = (4, 6)</p>
            <p className="font-mono text-sm text-slate-800 mb-1">d = √[ (4 - 1)² + (6 - 2)² ]</p>
            <p className="font-mono text-sm text-slate-800 mb-1">d = √[ 3² + 4² ] = √[ 9 + 16 ]</p>
            <p className="font-mono text-sm text-slate-800 font-bold">d = √25 = 5</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Converted into Probability (Gaussian Distribution)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Instead of directly preserving raw distances, t-SNE crucially converts them into probability relationships. Distances become unreliable in very high-dimensional space due to the <em>Curse of Dimensionality</em> (many points appear equally distant).
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Probability represents: <strong>How likely two points are neighbors</strong>. It uses a Gaussian distribution in the high-dimensional space so that smaller distances produce exponentially higher probabilities, strongly connecting nearby points.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="step-by-step">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Step-by-Step Working of t-SNE
        </h2>

        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto mb-10">
{`High-Dimensional Data
          │
          ▼
Compute Pairwise Distances
          │
          ▼
Convert Distances to Probabilities
          │
          ▼
Initialize Random Low-Dimensional Points
          │
          ▼
Compute New Similarities (Student t-Distribution)
          │
          ▼
Measure Error using KL Divergence
          │
          ▼
Optimize using Gradient Descent`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">The Crowding Problem & Student t-Distribution</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In Step 4, when moving to low-dimensional space, t-SNE swaps out the Gaussian distribution for a <strong>Student t-Distribution</strong>.
        </p>
        
        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">Why Not Use Gaussian Again?</p>
          <p className="text-slate-800 leading-relaxed mb-4">
            Using Gaussian in low-dimensional space causes the "Crowding Problem" where points become excessively compressed together into a central blob.
          </p>
          <p className="text-slate-800 leading-relaxed">
            The Student t-Distribution solves this with <strong>heavy tails</strong>, which allows distant clusters to push each other away and remain cleanly separated.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">KL Divergence & Gradient Descent</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          t-SNE measures the difference between the high-dimensional probabilities (P) and low-dimensional probabilities (Q) using <strong>Kullback-Leibler (KL) Divergence</strong>. It then uses Gradient Descent to physically move the low-dimensional map points around iteratively to minimize this error until clusters form beautifully.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Understanding Perplexity</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Perplexity is the most important hyperparameter in t-SNE. It essentially dictates the target number of effective neighbors.
        </p>
        <div className="flex flex-col space-y-6 mb-8">
          <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-sky-900 mb-2">Low Perplexity (e.g. 5)</p>
            <p className="text-slate-800">Focuses tightly on local tiny structures, generating many small micro-clusters.</p>
          </div>
          <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-indigo-900 mb-2">High Perplexity (e.g. 50+)</p>
            <p className="text-slate-800">Focuses on finding larger global patterns, merging points into larger monolithic clusters.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="code-implementation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation of t-SNE
        </h2>
        
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The scikit-learn library provides a highly optimized implementation of t-SNE. Remember to standardize data before passing it.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: applying t-SNE on MNIST Digits</h4>
          </div>
          <div className="p-0">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`# Step 1 — Import Libraries
import numpy as np
import matplotlib.pyplot as plt

from sklearn.manifold import TSNE
from sklearn.datasets import load_digits
from sklearn.preprocessing import StandardScaler

# Step 2 — Load Dataset (784 dimensions per image)
digits = load_digits()
X = digits.data
y = digits.target

# Step 3 — Standardize Data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 4 — Apply t-SNE
tsne = TSNE(
    n_components=2,
    perplexity=30,
    random_state=42
)
X_tsne = tsne.fit_transform(X_scaled)

# Step 5 — Visualization
plt.figure(figsize=(10,8))
plt.scatter(
    X_tsne[:,0],
    X_tsne[:,1],
    c=y,
    cmap='tab10'
)
plt.title("t-SNE Visualization of Handwritten Digits")
plt.show()`}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Comparisons & Summary Attributes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Excellent Visualization:</strong> Unmatched ability to reveal hidden local groups.</li>
              <li><strong>Non-Linear Flexibility:</strong> Gracefully handles complex manifold structures.</li>
              <li><strong>Neural Net Analysis:</strong> Widely used to inspect representations inside Deep Learning networks.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Disadvantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Computationally Expensive:</strong> Matrix operations are heavy for datasets with millions of rows.</li>
              <li><strong>Stochastic & Non-Deterministic:</strong> Repeated runs may produce slightly rotated or different plots.</li>
              <li><strong>Misleading Global Distances:</strong> Distances between distantly separated clusters might not be geometrically accurate.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">t-SNE vs PCA vs UMAP</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700">t-SNE</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">PCA</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-emerald-700">UMAP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Linear vs Non-Linear</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Non-Linear</td>
                <td className="px-6 py-4 text-sm text-slate-700">Linear</td>
                <td className="px-6 py-4 text-sm text-emerald-700 font-bold">Non-Linear</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Speed</td>
                <td className="px-6 py-4 text-sm text-amber-600">Slow</td>
                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Very Fast</td>
                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Fast</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Strengths</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Local Clusters</td>
                <td className="px-6 py-4 text-sm text-slate-700">Global Variance</td>
                <td className="px-6 py-4 text-sm text-emerald-700 font-bold">Local + Global Balance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        t-Distributed Stochastic Neighbor Embedding (t-SNE) is a state-of-the-art non-linear dimensionality reduction algorithm mathematically engineered to beautifully visualize complex, high-dimensional datasets down to 2D or 3D. 
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        It uniquely utilizes Student's t-distributions to cure the "crowding problem", applying KL divergence and gradient descent to force visually clean, distinct clusters. It remains the gold standard for exploratory data analysis across deep learning feature visualization, genomics, and natural language embeddings.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          t-SNE aggressively preserves <strong>local neighborhood relationships</strong> (keeping friends close), but it explicitly discards global macroscopic distances in the process. Therefore, never interpret the large, empty distances between far-apart t-SNE clusters as an accurate measurement of true high-dimensional separation!
        </p>
      </div>
    </>
  );
}
