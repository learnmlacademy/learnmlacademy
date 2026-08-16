import React from 'react';
import { Lightbulb, Code, Layers, Eye, Calculator, AlertTriangle } from 'lucide-react';

export function TSNEContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">t-Distributed Stochastic Neighbor Embedding (t-SNE)</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>t-SNE</strong> is a non-linear dimensionality-reduction method used mainly to <strong>visualize high-dimensional data</strong> in two or three dimensions.
          Its central idea is simple: if two samples are close neighbors in the original feature space, t-SNE tries to place them close together on the map.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-4">t-SNE in Simple Words</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            {[
              ['1', 'High-dimensional data', 'Many features'],
              ['2', 'Measure similarity', 'Who is near whom?'],
              ['3', 'Build a 2D/3D map', 'Move points around'],
              ['4', 'Inspect neighborhoods', 'Look for local structure'],
            ].map(([step, title, subtitle]) => (
              <div key={step} className="bg-white border border-indigo-100 rounded-lg p-4">
                <div className="text-2xl font-extrabold text-indigo-700 mb-1">{step}</div>
                <div className="font-bold text-slate-900">{title}</div>
                <div className="text-sm text-slate-600 mt-1">{subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">The central objective</p>
          <p className="text-slate-800 italic leading-relaxed">
            Preserve useful <strong>local neighborhood relationships</strong> when making a low-dimensional visualization.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          t-SNE is commonly used to inspect embeddings, image features, text representations, biological measurements and other datasets where each sample may have tens, hundreds or thousands of values. It is an <strong>exploratory visualization tool</strong>, not a classifier and not proof that visible groups are real-world classes.
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
          <Eye className="mr-3 text-indigo-600" /> Why t-SNE Is Useful
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Humans can easily inspect a scatter plot with two or three axes, but not a point described by 64, 500 or 1,000 features. t-SNE gives us a low-dimensional map that can make local relationships easier to inspect.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Example: E-commerce customers</p>
          <p className="text-slate-800 leading-relaxed">
            Imagine every customer is represented by browsing, purchase, category-interest and engagement features. We cannot directly draw a 500-dimensional scatter plot. t-SNE can map those samples into 2D so we can inspect which customers end up as local neighbors.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">PCA and t-SNE answer different questions</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">PCA</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-indigo-700">t-SNE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-5 py-4 text-slate-700">Linear transformation</td>
                <td className="px-5 py-4 text-slate-700">Non-linear embedding</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-5 py-4 text-slate-700">Focuses on directions of feature variance</td>
                <td className="px-5 py-4 text-slate-700">Focuses strongly on neighborhood probabilities</td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-slate-700">Has reusable components for later transformation</td>
                <td className="px-5 py-4 text-slate-700">Scikit-learn t-SNE is primarily a fit-and-visualize workflow</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          PCA can be a useful first step before t-SNE when the original feature count is very high. Reducing to a moderate number of dimensions first can remove some noise and make t-SNE faster.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="core-philosophy">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 text-indigo-600" /> Core Philosophy of t-SNE
        </h2>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
          <p className="font-bold text-indigo-900 mb-5 text-center">One idea per visual: keep close neighbors close</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5 text-center min-w-[220px]">
              <p className="font-bold text-slate-900 mb-3">High-dimensional space</p>
              <div className="font-mono text-slate-700 leading-7">A • • B<br />C •<br /><br />D • • E</div>
            </div>
            <div className="text-3xl text-indigo-600 font-bold">→</div>
            <div className="bg-white border border-slate-200 rounded-lg p-5 text-center min-w-[220px]">
              <p className="font-bold text-slate-900 mb-3">2D t-SNE map</p>
              <div className="font-mono text-slate-700 leading-7">A • B •<br />&nbsp;&nbsp;C •<br /><br />D • E •</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-5 text-center">Illustration only. Absolute positions, axes and cluster spacing are not direct measurements of the original feature space.</p>
        </div>

        <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
          Think of a classroom friendship map. If Alice's closest friends are Bob and Carla, a useful map should try to keep Bob and Carla near Alice. But the exact distance between the “football group” and the “music group” should not automatically be interpreted as a precise real-world distance.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <p className="font-bold text-amber-900 mb-3">A t-SNE plot is not a clustering algorithm</p>
          <p className="text-slate-800 leading-relaxed">
            t-SNE can make visually separated islands even though it is not directly assigning semantic cluster labels. If you need formal clustering, use and evaluate a clustering method separately rather than treating every visible island as a guaranteed class.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="fundamental-concepts">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Calculator className="mr-3 text-indigo-600" /> Fundamental Concepts in t-SNE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            ['1. Similarities', 'Convert high-dimensional neighborhood relationships into probabilities.'],
            ['2. Low-dimensional map', 'Represent low-dimensional similarities with a heavy-tailed t-distribution.'],
            ['3. Optimization', 'Move map points to reduce the mismatch measured by KL divergence.'],
          ].map(([title, text]) => (
            <div key={title} className="border border-slate-200 rounded-xl p-5 bg-white">
              <p className="font-bold text-slate-900 mb-2">{title}</p>
              <p className="text-slate-700">{text}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Distance & high-dimensional similarity</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          With the default metric, t-SNE starts from Euclidean-style relationships between samples and converts distances into neighborhood probabilities. A smaller distance generally means a stronger neighborhood relationship.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-3">Euclidean distance: easy worked example</p>
          <p className="font-mono text-slate-800 mb-2">A = (1, 2), B = (4, 6)</p>
          <p className="font-mono text-slate-800 mb-1">d = √[(4 − 1)² + (6 − 2)²]</p>
          <p className="font-mono text-slate-800 mb-1">d = √[3² + 4²]</p>
          <p className="font-mono text-slate-800 mb-1">d = √[9 + 16]</p>
          <p className="font-mono text-slate-900 font-bold">d = √25 = 5</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">High-dimensional probabilities</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          t-SNE does not try to copy every raw distance into 2D. It converts high-dimensional affinities into probabilities: close neighbors get larger probability mass than distant points. Different samples can use different Gaussian bandwidths so that the neighborhood scale matches the chosen perplexity.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Student t-distribution and the crowding problem</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In the low-dimensional map, t-SNE uses a Student t-distribution with heavy tails. The heavy tail gives moderately distant points more room in the map and reduces the tendency for many points to crowd into the center.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-900 mb-2">Simple interpretation</p>
          <p className="text-slate-700">High-dimensional Gaussian affinities answer: <strong>who should be neighbors?</strong></p>
          <p className="text-slate-700 mt-2">Low-dimensional t-distribution answers: <strong>how should those neighborhood relationships be represented on the map?</strong></p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="step-by-step">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Step-by-Step Working of t-SNE
        </h2>

        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto mb-10">
{`High-Dimensional Samples
          │
          ▼
Compute Neighborhood Affinities
          │
          ▼
Create Initial 2D/3D Positions
          │
          ▼
Compute Low-Dimensional Affinities
          │
          ▼
Compare P and Q with KL Divergence
          │
          ▼
Move Points to Reduce the Cost
          │
          ▼
Final Visualization`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">KL Divergence</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          t-SNE minimizes the mismatch between high-dimensional neighborhood probabilities <strong>P</strong> and low-dimensional neighborhood probabilities <strong>Q</strong> using Kullback-Leibler divergence:
        </p>
        <div className="bg-slate-900 text-slate-100 rounded-lg p-5 font-mono overflow-x-auto mb-6">
          KL(P || Q) = Σ pᵢⱼ log(pᵢⱼ / qᵢⱼ)
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 mb-3">Tiny KL contribution example</p>
          <p className="font-mono text-sm text-slate-800 mb-1">Suppose p = 0.20 and q = 0.10</p>
          <p className="font-mono text-sm text-slate-800 mb-1">p × ln(p/q) = 0.20 × ln(2)</p>
          <p className="font-mono text-sm text-slate-800 mb-1">≈ 0.20 × 0.693</p>
          <p className="font-mono text-sm text-slate-900 font-bold">≈ 0.139</p>
          <p className="text-sm text-slate-700 mt-3">The real t-SNE objective sums contributions across many pairs. This one pair is only for understanding the formula.</p>
        </div>

        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          Gradient-based optimization repeatedly changes the low-dimensional coordinates to reduce this objective. Because the objective is non-convex, different initializations or random seeds can end at different local solutions.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Understanding perplexity</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Perplexity is related to the effective neighborhood size t-SNE considers. It is <strong>not</strong> simply “the number of clusters” and it does not directly tell t-SNE how many groups to create.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border-l-4 border-sky-400 bg-sky-50 p-5 rounded-r-lg">
            <p className="font-bold text-sky-900 mb-2">Lower perplexity</p>
            <p className="text-slate-800">Uses a smaller effective neighborhood and can emphasize very local relationships.</p>
          </div>
          <div className="border-l-4 border-indigo-400 bg-indigo-50 p-5 rounded-r-lg">
            <p className="font-bold text-indigo-900 mb-2">Middle value</p>
            <p className="text-slate-800">Often a useful starting point, but still needs inspection rather than blind acceptance.</p>
          </div>
          <div className="border-l-4 border-violet-400 bg-violet-50 p-5 rounded-r-lg">
            <p className="font-bold text-violet-900 mb-2">Higher perplexity</p>
            <p className="text-slate-800">Uses a broader effective neighborhood and may smooth over smaller-scale patterns.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <p className="font-bold text-amber-900 mb-2">Do not memorize “5 = local” and “50 = global” as fixed rules</p>
          <p className="text-slate-800 leading-relaxed">
            Different perplexity values can produce noticeably different shapes, sizes and spacing. In Scikit-learn, perplexity must also be smaller than the number of samples. It is sensible to inspect more than one reasonable value rather than declaring one plot to be the truth.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">What must not be over-interpreted?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            ['Cluster size', 'A larger island on the map does not necessarily mean a proportionally larger high-dimensional group.'],
            ['Distance between islands', 'Far-apart islands are not guaranteed to be equally far apart in the original space.'],
            ['Shape', 'The outline of a t-SNE island can change with perplexity, initialization and optimization.'],
            ['Axes', 't-SNE axis 1 and axis 2 do not have the direct feature meaning that original variables have.'],
          ].map(([title, text]) => (
            <div key={title} className="border border-slate-200 rounded-lg p-5 bg-white">
              <p className="font-bold text-slate-900 mb-2">{title}</p>
              <p className="text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="preprocessing">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Preprocessing Before t-SNE</h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Because neighborhood methods depend on distances, feature scale matters. If one meaningful numerical feature ranges from 0–1 and another from 0–1,000,000, the larger-scale feature can dominate the distance calculation unless that scale difference is intentional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-2">Scaling</p>
            <p className="text-slate-700">Often useful when comparable numerical features use very different units. Do not standardize mechanically if the feature geometry has a domain-specific meaning.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-2">PCA/SVD first</p>
            <p className="text-slate-700">For very high-dimensional data, reducing to a moderate dimension first can speed up t-SNE and suppress some noise.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="code-implementation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation of t-SNE
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Scikit-learn provides <code className="bg-slate-100 px-1.5 py-0.5 rounded">TSNE</code>. The built-in handwritten-digits dataset used below has <strong>64 input features per image</strong>, not 784. The target labels are used only to color the final plot; t-SNE itself does not train on those labels.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: t-SNE on handwritten digits</h4>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`import matplotlib.pyplot as plt

from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.preprocessing import StandardScaler

# 1. Load data
digits = load_digits()
X = digits.data      # 1797 samples, 64 features
y = digits.target    # used only for plot colors

# 2. Put numerical features on a comparable scale
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 3. Optional pre-reduction before t-SNE
pca = PCA(n_components=40, random_state=42)
X_reduced = pca.fit_transform(X_scaled)

# 4. Build a 2D t-SNE embedding
tsne = TSNE(
    n_components=2,
    perplexity=30,
    init="pca",
    learning_rate="auto",
    max_iter=1000,
    random_state=42
)
X_tsne = tsne.fit_transform(X_reduced)

print("Original shape:", X.shape)
print("After PCA:", X_reduced.shape)
print("t-SNE shape:", X_tsne.shape)
print("Final KL divergence:", round(tsne.kl_divergence_, 3))

# 5. Visualize
plt.figure(figsize=(10, 8))
plt.scatter(
    X_tsne[:, 0],
    X_tsne[:, 1],
    c=y,
    cmap="tab10",
    s=12
)
plt.title("t-SNE Visualization of Handwritten Digits")
plt.show()`}</code></pre>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-emerald-900 mb-2">Expected deterministic console output</p>
          <pre className="font-mono text-sm text-slate-800 whitespace-pre-wrap">{`Original shape: (1797, 64)
After PCA: (1797, 40)
t-SNE shape: (1797, 2)
Final KL divergence: 0.83`}</pre>
          <p className="text-sm text-slate-700 mt-3">The exact last digits of the KL value can depend on library/platform details. The important output is the 2D embedding shape and the visualization.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="text-amber-700 mr-3 mt-1 shrink-0" />
            <div>
              <p className="font-bold text-amber-900 mb-2">t-SNE is not a normal train → transform-new-data pipeline in Scikit-learn</p>
              <p className="text-slate-800 leading-relaxed">
                The Scikit-learn <code className="bg-amber-100 px-1 rounded">TSNE</code> interface provides the fitted embedding for the samples used during fitting; it does not provide the same reusable <code className="bg-amber-100 px-1 rounded">transform()</code> workflow as PCA. That is one reason t-SNE is best treated here as an exploratory visualization method rather than a production feature transformer for incoming samples.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Advantages, Limitations & Comparisons</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Useful strengths</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Local visualization:</strong> Can make neighborhood structure easier to inspect.</li>
              <li><strong>Non-linear embedding:</strong> Can reveal patterns not visible in a simple linear 2D projection.</li>
              <li><strong>Representation inspection:</strong> Useful for exploring learned embeddings and feature spaces.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Important limitations</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Computational cost:</strong> Considerably more expensive than PCA on large datasets.</li>
              <li><strong>Non-convex optimization:</strong> Different seeds or settings can produce different maps.</li>
              <li><strong>Global geometry:</strong> Large-scale distances and cluster sizes can be misleading.</li>
              <li><strong>No ordinary transform:</strong> Scikit-learn t-SNE is not a drop-in feature transformer for unseen samples.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">t-SNE vs PCA</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700">t-SNE</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">PCA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Transformation</td>
                <td className="px-6 py-4 text-sm text-slate-700">Non-linear embedding</td>
                <td className="px-6 py-4 text-sm text-slate-700">Linear projection</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Main teaching focus</td>
                <td className="px-6 py-4 text-sm text-slate-700">Local neighborhoods</td>
                <td className="px-6 py-4 text-sm text-slate-700">Feature variance directions</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Reusable transform</td>
                <td className="px-6 py-4 text-sm text-slate-700">Not in Scikit-learn TSNE</td>
                <td className="px-6 py-4 text-sm text-slate-700">Yes</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Typical use</td>
                <td className="px-6 py-4 text-sm text-slate-700">Exploratory 2D/3D visualization</td>
                <td className="px-6 py-4 text-sm text-slate-700">Visualization or dimensionality reduction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <p className="font-bold text-slate-900 text-lg mb-3">What about UMAP?</p>
          <p className="text-slate-700 leading-relaxed">
            UMAP is another popular non-linear embedding method. Its behavior, speed and global/local trade-offs depend on its own settings and implementation, so avoid memorizing a blanket rule such as “UMAP always preserves global structure better.” The safest comparison is to understand each method's objective and test sensible settings on the dataset at hand.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common t-SNE Mistakes</h2>
        <ol className="list-decimal pl-6 text-lg text-slate-800 space-y-4 mb-8">
          <li><strong>Treating every island as a confirmed cluster.</strong> A t-SNE map is evidence for exploration, not automatic semantic clustering.</li>
          <li><strong>Reading between-cluster distance literally.</strong> Large gaps in 2D are not precise measurements of original-space separation.</li>
          <li><strong>Using only one perplexity or seed.</strong> The map can change; inspect stability rather than trusting one attractive image.</li>
          <li><strong>Ignoring feature scale.</strong> Distance-based neighborhoods can be dominated by large numerical units.</li>
          <li><strong>Using t-SNE as a normal production feature transformer.</strong> Scikit-learn TSNE does not expose the same out-of-sample transform workflow as PCA.</li>
        </ol>
      </div>

      <div id="faq" className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick FAQ</h2>
        <div className="space-y-4">
          <details className="border border-slate-200 rounded-lg p-4 bg-white">
            <summary className="font-bold text-slate-900 cursor-pointer">Does t-SNE find clusters?</summary>
            <p className="text-slate-700 mt-3">It creates an embedding that often makes local groups visually apparent, but it is not itself a semantic clustering algorithm.</p>
          </details>
          <details className="border border-slate-200 rounded-lg p-4 bg-white">
            <summary className="font-bold text-slate-900 cursor-pointer">Is perplexity the number of neighbors?</summary>
            <p className="text-slate-700 mt-3">It is related to an effective neighborhood size through the entropy of the neighborhood probability distribution. Thinking “rough neighborhood scale” is useful; treating it as an exact K-nearest-neighbor count is too literal.</p>
          </details>
          <details className="border border-slate-200 rounded-lg p-4 bg-white">
            <summary className="font-bold text-slate-900 cursor-pointer">Should I run PCA before t-SNE?</summary>
            <p className="text-slate-700 mt-3">For very high-dimensional data, pre-reducing to a moderate dimension with PCA for dense data or TruncatedSVD for sparse data can reduce noise and computation. It is not mandatory for every small dataset.</p>
          </details>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        t-SNE is a non-linear method designed primarily for visualizing high-dimensional samples in two or three dimensions. It converts high-dimensional and low-dimensional affinities into probability distributions and optimizes the map by minimizing their KL-divergence mismatch.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Its greatest teaching value is local: <strong>nearby samples should remain useful neighbors</strong>. Its biggest interpretation warning is equally important: cluster size, shape, orientation and long-range distances in the 2D picture should not automatically be treated as faithful measurements of the original feature space.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-8">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Use t-SNE to <strong>explore local neighborhoods</strong>, then verify any apparent pattern with additional analysis instead of believing the picture alone.
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
        <p className="font-bold text-indigo-900 mb-2">Continue learning</p>
        <p className="text-slate-700">
          Review <a href="/learn/pca" className="text-indigo-700 font-semibold hover:underline">PCA</a> for linear dimensionality reduction, <a href="/learn/feature-scaling" className="text-indigo-700 font-semibold hover:underline">Feature Scaling</a> for distance-sensitive preprocessing, or <a href="/learn/kmeans" className="text-indigo-700 font-semibold hover:underline">K-Means</a> if your goal is explicit clustering rather than visualization.
        </p>
      </div>
    </>
  );
}
