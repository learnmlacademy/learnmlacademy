import React from 'react';
import { Target, TrendingUp, AlertTriangle, Lightbulb, BookOpen, Calculator, Code, Layers, ShieldCheck, Check, Network, Route } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function DBSCANContent() {
  const moonData = [
    { x: 1, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 6.5 }, { x: 4, y: 6 }, { x: 5, y: 5 },
    { x: 3, y: 4 }, { x: 4, y: 3.5 }, { x: 5, y: 3 }, { x: 6, y: 3.5 }, { x: 7, y: 4 }
  ];

  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">DBSCAN Clustering Guide</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          DBSCAN stands for <strong>Density-Based Spatial Clustering of Applications with Noise</strong>. It is an unsupervised Machine Learning clustering algorithm that groups together data points that are closely packed in high-density regions while identifying isolated points as noise or outliers.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Unlike clustering algorithms such as <strong>K-Means</strong> and <strong>Hierarchical Clustering</strong>, DBSCAN does not assume that clusters must be:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Circular</li>
          <li>Convex</li>
          <li>Spherical</li>
        </ul>

        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          Instead, DBSCAN can discover <strong>Clusters of arbitrary shapes</strong>, which makes it extremely useful for real-world datasets.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-density-based">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Why Density-Based Clustering Was Needed</h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Traditional clustering algorithms faced several limitations. For example, K-Means assumes that clusters are spherical. But real-world data often contains:
        </p>
        <ul className="list-disc pl-6 mb-8 text-lg text-slate-800 space-y-2">
          <li>Curved structures</li>
          <li>Irregular groups</li>
          <li>Uneven distributions</li>
        </ul>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8" id="moon-example">
          <p className="font-bold text-indigo-900 text-lg mb-2">Example: The Moon Shape Problem</p>
          <p className="text-slate-800 mb-4">Suppose data forms a moon shape:</p>
          <div className="text-4xl tracking-widest mb-4">🌙 &nbsp; &nbsp; 🌙</div>
          <p className="text-slate-800">K-Means struggles because it tries to divide data using centroid boundaries. It cannot wrap around curves.</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Another Major Problem — Noise and Outliers</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Real-world datasets often contain Fraudulent transactions, Sensor errors, Abnormal user behavior, or Random noisy points. K-Means incorrectly forces such points into clusters because every point must belong to a centroid.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Researchers needed an algorithm that could:
        </p>
        <ol className="list-decimal pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Discover arbitrary-shaped clusters</li>
          <li>Ignore noisy points</li>
          <li>Automatically determine cluster count</li>
        </ol>
        <p className="text-lg font-bold text-indigo-700">This led to the development of DBSCAN.</p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="fundamental-philosophy">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Fundamental Philosophy of DBSCAN</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The core idea behind DBSCAN is: <strong>Clusters are dense regions separated by sparse regions.</strong>
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          This idea is very different from centroid-based clustering. Instead of asking <em>"Where is the center?"</em>, DBSCAN asks <em>"Where are the dense neighborhoods?"</em>
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Real-Life Analogy</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-700 italic">
          Imagine a crowded city. Some areas contain dense residential populations, busy markets, and crowded railway stations. Other areas contain empty land, sparse populations, and isolated houses.
        </p>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          DBSCAN behaves similarly. It identifies <strong>dense populations of points</strong> as clusters and treats isolated points as noise.
        </p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 font-mono text-slate-800 whitespace-pre overflow-x-auto" id="density-visualization">
{`Dense Region 1       Dense Region 2

● ● ● ● ●            ● ● ● ●
 ● ● ● ●              ● ● ●
  ● ● ●                ● ●

          x      x

Noise / Outliers`}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-makes-special">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">What Makes DBSCAN Special</h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          DBSCAN introduced several revolutionary ideas in clustering. It can:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Detect irregular cluster shapes</li>
          <li>Automatically identify outliers</li>
          <li>Work without a predefined cluster count</li>
          <li>Handle noisy datasets effectively</li>
        </ul>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          These features made DBSCAN a fundamental clustering algorithm in Machine Learning.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="core-concepts">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Core Concepts in DBSCAN</h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          DBSCAN revolves around a few extremely important concepts. Understanding these concepts deeply is essential.
        </p>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 font-mono text-emerald-900 whitespace-pre" id="core-concepts-tree">
{`DBSCAN CORE CONCEPTS
│
├── Density
├── Epsilon (eps)
├── MinPts
├── Core Points
├── Border Points
└── Noise Points`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">What Is Density?</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Density refers to how closely packed points are inside a region.
        </p>
        <ul className="list-disc pl-6 mb-8 text-lg text-slate-800 space-y-2">
          <li><strong>High density:</strong> Many nearby points</li>
          <li><strong>Low density:</strong> Very few nearby points</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Important Parameters in DBSCAN</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          DBSCAN uses two major parameters to define density:
        </p>
        
        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8" id="parameters">
          <p className="text-lg font-bold text-amber-900 mb-2">1. Epsilon (eps or ε)</p>
          <p className="text-slate-800 mb-4">Epsilon represents the neighborhood radius. If two points lie within the epsilon distance, they are considered neighbors.</p>
          <div className="font-mono text-sm whitespace-pre bg-white p-4 rounded border border-amber-200 text-slate-700 mb-4">
{`        eps radius
      ┌───────────┐
      │     ●     │
      │  ●  ●  ●  │
      │     ●     │
      └───────────┘`}
          </div>
          <p className="text-slate-800 italic">All points inside the circle belong to the neighborhood.</p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Why eps Is Important:</strong> Choosing eps incorrectly creates problems. 
          If <em>eps is too small</em>, most points become noise because very few neighbors exist. 
          If <em>eps is too large</em>, different clusters merge together, reducing clustering quality.
        </p>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8" id="minpts">
          <p className="text-lg font-bold text-amber-900 mb-2">2. MinPts</p>
          <p className="text-slate-800 mb-4">MinPts means the minimum number of points required to form a dense region.</p>
          <p className="text-slate-800 mb-2"><strong>Simple Example:</strong> Suppose MinPts = 5. This means a point needs at least 5 neighboring points inside its eps radius to become a core point.</p>
          <p className="text-slate-800 font-bold mt-4">Rule of Thumb for Choosing MinPts:</p>
          <p className="text-slate-800 font-mono mt-2 bg-white inline-block px-3 py-1 rounded border border-amber-200">MinPts ≥ D + 1</p>
          <p className="text-slate-800 mt-2">Where D = number of dimensions. For 2D data, usually MinPts ≥ 3 or 4.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="types-of-points">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Types of Points in DBSCAN</h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          One of the most important ideas in DBSCAN is classifying points into three categories based on the parameters above.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-xl font-bold text-emerald-900 mb-3 text-center">1. Core Point</h4>
            <p className="text-slate-800 mb-4 text-center">A core point is a point having at least MinPts neighbors inside its eps radius. They represent dense cluster regions.</p>
            <div className="bg-white rounded p-3 text-center border border-emerald-100 font-mono text-sm leading-relaxed text-emerald-800">
              &nbsp;&nbsp;&nbsp;● ● ● <br/>
              &nbsp;● ●<strong className="text-emerald-600">C</strong>● ●<br/>
              &nbsp;&nbsp;&nbsp;● ● ● 
            </div>
            <p className="text-center text-sm font-medium mt-2 text-emerald-700">C = Core point</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-xl font-bold text-blue-900 mb-3 text-center">2. Border Point</h4>
            <p className="text-slate-800 mb-4 text-center">Border points lie near a dense region but do not themselves contain enough neighbors. They are connected to a cluster but not dense enough.</p>
            <div className="bg-white rounded p-3 text-center border border-blue-100 font-mono text-sm leading-relaxed text-blue-800">
              ● ● ● ● ●<br/>
              &nbsp;● ●<strong className="text-emerald-600">C</strong>● ●<br/>
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong className="text-blue-600">B</strong>
            </div>
            <p className="text-center text-sm font-medium mt-2 text-blue-700">B = Border point</p>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-xl font-bold text-rose-900 mb-3 text-center">3. Noise Point</h4>
            <p className="text-slate-800 mb-4 text-center">Noise points (also called outliers) are isolated points. They do not belong to clusters and do not satisfy density requirements.</p>
            <div className="bg-white rounded p-3 text-center border border-rose-100 font-mono text-sm leading-relaxed text-rose-800">
              ● ● ● ●<br/>
              <br/>
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong className="text-rose-600">x</strong>
            </div>
            <p className="text-center text-sm font-medium mt-2 text-rose-700">x = Noise point</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="how-it-works">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">How DBSCAN Works — Step-by-Step</h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The DBSCAN algorithm works iteratively. Here is the complete workflow:
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8 font-mono text-indigo-900 whitespace-pre" id="workflow">
{`Complete Workflow
Choose eps and MinPts
           │
           ▼
Find Core Points
           │
           ▼
Expand Dense Regions
           │
           ▼
Connect Neighboring Points
           │
           ▼
Form Clusters
           │
           ▼
Mark Remaining Points as Noise`}
        </div>

        <div className="space-y-6 text-lg text-slate-800">
          <div>
            <h4 className="font-bold text-xl text-slate-900">Step 1 — Select a Point</h4>
            <p>DBSCAN begins by selecting a random, unvisited point.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl text-slate-900">Step 2 — Find Neighbors</h4>
            <p>It calculates all points inside the eps radius. Distance is usually measured using Euclidean Distance.</p>
            <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md my-4">
              <p className="font-mono text-blue-900 font-bold mb-2">Euclidean Distance Formula:</p>
              <p className="font-mono text-slate-800">d = √((x₂ - x₁)² + (y₂ - y₁)²)</p>
              
              <div className="mt-4 pt-4 border-t border-blue-200" id="distance-example">
                <p className="font-bold text-slate-800 mb-2">Worked Example:</p>
                <p>Suppose A = (2, 3) and B = (5, 7)</p>
                <p>d = √((5 - 2)² + (7 - 3)²)</p>
                <p>d = √(9 + 16) = √25 = 5</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xl text-slate-900">Step 3 — Determine Point Type</h4>
            <p>If the number of neighbors ≥ MinPts, it is marked as a Core Point. Else, it is a Border point or noise.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl text-slate-900">Step 4 — Expand Cluster</h4>
            <p>DBSCAN recursively expands clusters from core points. Neighboring dense points are connected together. This process creates density-connected regions.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="reachability">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Reachability and Connectivity in DBSCAN</h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          These are extremely important theoretical concepts that explain how DBSCAN connects points into a single cluster.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Directly Density Reachable</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Point <em>q</em> is directly density reachable from point <em>p</em> if <em>q</em> lies inside the eps neighborhood of <em>p</em>, and <em>p</em> is a core point.
        </p>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md mb-8 font-mono">
          p ●────● q<br/>
          &nbsp;&nbsp;&nbsp;eps
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Density Reachable</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A point is density reachable if it can be connected through a chain of core points. Points become connected through dense paths.
        </p>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md mb-8 font-mono">
          A ●──●──●──● B
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Density Connected</h3>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          Two points are density connected if both are reachable from some common core point. This property is what ultimately creates complete clusters.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Why DBSCAN Handles Arbitrary Shapes</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Unlike K-Means, DBSCAN does not rely on centroids. Instead, it expands clusters through connected dense regions. Thus it can discover Curved clusters, Spiral structures, and Non-convex patterns.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-and-examples">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">DBSCAN vs K-Means</h2>
        
        <div className="overflow-x-auto mb-8" id="dbscan-vs-kmeans">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700 uppercase">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700 uppercase">DBSCAN</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700 uppercase">K-Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Need K Initially</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">No</td>
                <td className="px-6 py-4 text-sm text-slate-700">Yes</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Handles Noise</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Yes</td>
                <td className="px-6 py-4 text-sm text-slate-700">Poorly</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Arbitrary Shapes</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Yes</td>
                <td className="px-6 py-4 text-sm text-slate-700">No</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Uses Centroids</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">No</td>
                <td className="px-6 py-4 text-sm text-slate-700">Yes</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Outlier Detection</td>
                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Excellent</td>
                <td className="px-6 py-4 text-sm text-rose-600 font-bold">Weak</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Real-Life Example — Fraud Detection</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a bank analyzes transactions. Normal customers create dense transaction patterns. Fraudulent transactions appear Rare, Isolated, and Unusual.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          DBSCAN can identify sparse abnormal transactions as noise points. This makes DBSCAN highly useful in Fraud detection, Cybersecurity, and Anomaly detection.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Determining Optimal eps</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          One popular method to find the optimal epsilon is the <strong>K-Distance Graph</strong>.
        </p>
        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-3 pr-4 rounded-r-md mb-8 text-slate-800">
          <p className="font-bold mb-2">K-Distance Graph Idea:</p>
          <ul className="list-disc pl-5">
            <li>For each point, compute distance to k-th nearest neighbor</li>
            <li>Sort these distances</li>
            <li>Plot them</li>
          </ul>
          <p className="mt-2 italic">A sharp bend or "elbow" in the graph indicates a good eps value.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="implementation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Python Implementation of DBSCAN Using Scikit-Learn</h2>
        
        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: DBSCAN Clustering</h4>
          </div>
          <div className="p-0">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`# Step 1 — Import Libraries
import matplotlib.pyplot as plt
import numpy as np

from sklearn.cluster import DBSCAN
from sklearn.datasets import make_blobs

# Step 2 — Create Dataset
X, y_true = make_blobs(
    n_samples=300,
    centers=4,
    cluster_std=0.50,
    random_state=0
)

# Step 3 — Apply DBSCAN
db = DBSCAN(
    eps=0.3,
    min_samples=10
).fit(X)

# Step 4 — Get Labels
labels = db.labels_
# Important: Label = -1 means noise point

# Step 5 — Count Clusters
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
print("Clusters:", n_clusters)

# Step 6 — Visualize Clusters
plt.scatter(X[:,0], X[:,1], c=labels, cmap='viridis')
plt.title("DBSCAN Clustering")
plt.show()`}</code></pre>
            </div>
          </div>
          <div className="bg-slate-50 border-t border-slate-200 p-4">
            <p className="font-mono text-sm mb-2 text-slate-800"><strong>Output Interpretation:</strong></p>
            <p className="font-mono text-sm text-indigo-700">Clusters: 4</p>
            <p className="text-sm text-slate-600 mt-2">
              This means DBSCAN automatically discovered 4 dense regions without requiring a predefined K. Using color mapping, different colors represent different clusters, while black or isolated points represent noise.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="metrics">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Evaluation Metrics for DBSCAN</h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Two common evaluation metrics for assessing the quality of DBSCAN clustering are the <strong>Silhouette Score</strong> and the <strong>Adjusted Rand Index (ARI)</strong>.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Silhouette Score</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The Silhouette score measures cluster separation quality.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-4 text-center max-w-2xl">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded shadow-sm">
            <p className="font-bold text-xl text-emerald-800">+1</p>
            <p className="text-sm text-emerald-700">Excellent</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-3 rounded shadow-sm">
            <p className="font-bold text-xl text-amber-800">0</p>
            <p className="text-sm text-amber-700">Overlapping</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-3 rounded shadow-sm">
            <p className="font-bold text-xl text-rose-800">-1</p>
            <p className="text-sm text-rose-700">Incorrect</p>
          </div>
        </div>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md mb-8 inline-block">
          <p className="font-mono text-slate-800">s(i) = [b(i) - a(i)] / max(a(i), b(i))</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Adjusted Rand Index (ARI)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ARI measures similarity between predicted and true clusters. <strong>1</strong> means perfect clustering, and <strong>0</strong> means random clustering.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 w-full max-w-2xl">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h4 className="font-bold text-slate-800">Python Code for Evaluation</h4>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm">
<pre><code>{`from sklearn import metrics
from sklearn.metrics import adjusted_rand_score

sc = metrics.silhouette_score(X, labels)
ari = adjusted_rand_score(y_true, labels)

print("Silhouette:", sc)
print("ARI:", ari)`}</code></pre>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-and-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Complexity & Pros/Cons</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Time Complexity of DBSCAN</h3>
          <ul className="list-disc pl-6 text-lg text-slate-800 space-y-2">
            <li><strong>Without indexing:</strong> O(n²)</li>
            <li><strong>With spatial indexing structures (like KD-Tree):</strong> O(n log n)</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages of DBSCAN</h3>
        <ol className="list-decimal pl-6 mb-8 text-lg text-slate-800 space-y-4">
          <li><strong>No Need for Number of Clusters:</strong> Unlike K-Means, no predefined K is required.</li>
          <li><strong>Handles Arbitrary Shapes:</strong> Can detect curved clusters, irregular groups, and complex structures.</li>
          <li><strong>Excellent Outlier Detection:</strong> Noise points are naturally identified, which is extremely valuable in anomaly detection systems.</li>
          <li><strong>Robust Against Noise:</strong> Performs well on noisy datasets.</li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Disadvantages of DBSCAN</h3>
        <ol className="list-decimal pl-6 mb-8 text-lg text-slate-800 space-y-4">
          <li><strong>Sensitive to eps:</strong> Improper parameter selection severely affects performance.</li>
          <li><strong>Difficulty with Varying Densities:</strong> Struggles when clusters have very different neighborhood densities.</li>
          <li><strong>Poor Performance in High Dimensions:</strong> Distance calculations become less meaningful in high-dimensional spaces (Curse of Dimensionality).</li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">DBSCAN vs Hierarchical Clustering</h3>
        <div className="overflow-x-auto mb-8 max-w-3xl" id="dbscan-vs-hierarchical">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700">DBSCAN</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Hierarchical</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Noise Handling</td>
                <td className="px-6 py-4 text-sm text-emerald-600 font-medium">Excellent</td>
                <td className="px-6 py-4 text-sm text-rose-600">Weak</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Arbitrary Shapes</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Yes</td>
                <td className="px-6 py-4 text-sm text-slate-700">Moderate</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Scalability</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Better</td>
                <td className="px-6 py-4 text-sm text-slate-700">Slower</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Dendrogram</td>
                <td className="px-6 py-4 text-sm text-slate-700">No</td>
                <td className="px-6 py-4 text-sm text-indigo-700">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-variants">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Real-World Applications of DBSCAN</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ul className="list-disc pl-6 text-lg text-slate-800 space-y-2">
            <li>Fraud Detection</li>
            <li>Anomaly Detection</li>
            <li>GPS Location Clustering</li>
            <li>Image Segmentation</li>
          </ul>
          <ul className="list-disc pl-6 text-lg text-slate-800 space-y-2">
            <li>Customer Segmentation</li>
            <li>Social Network Analysis</li>
            <li>Medical Data Analysis</li>
            <li>Cybersecurity & Geographic Mining</li>
          </ul>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg shadow-sm mb-8" id="practical-insight">
          <p className="text-amber-900 font-bold mb-2 text-xl flex items-center">
            <Lightbulb className="mr-2" /> Important Practical Insight
          </p>
          <p className="text-amber-800 italic text-lg leading-relaxed">
            One of the most important lessons in clustering is: Not all datasets contain clear cluster structures. Some datasets naturally fail clustering algorithms. This is why parameter tuning, data understanding, and visualization are extremely important.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Advanced Variants of DBSCAN</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Researchers later developed improved versions to address DBSCAN's limitations:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li><strong>HDBSCAN</strong> (Hierarchical DBSCAN)</li>
          <li><strong>OPTICS</strong></li>
          <li><strong>ADBSCAN</strong></li>
          <li><strong>Lin-DBSCAN</strong></li>
        </ul>
        <p className="text-lg leading-relaxed text-slate-800 mb-8">
          These variants improve Scalability, Adaptive density handling, and Hierarchical density clustering.
        </p>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        DBSCAN is a density-based clustering algorithm that identifies dense regions of points while marking sparse regions as noise. Its major strengths include the fact that it needs no predefined cluster count, it has excellent outlier handling, the ability to detect arbitrary-shaped clusters, and strong performance on noisy data.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The algorithm works using two key parameters: <strong>eps</strong> and <strong>MinPts</strong>, and categorizes points into three regions: Core points, Border points, and Noise points.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10" id="final-insight">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          DBSCAN remains an essential clustering algorithm in Machine Learning because of its unparalleled ability to handle real-world irregular data structures and inherently filter out noise, avoiding the forced uniform shapes generated by centroid-based methods like K-Means.
        </p>
      </div>

    </>
  );
}
