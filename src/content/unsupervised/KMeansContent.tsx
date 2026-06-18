import React from 'react';
import { 
  Target, Layers, Activity, Code, ShieldCheck, Check, X as CloseIcon, 
  AlertCircle, GitMerge, Cpu, TrendingUp, Calculator 
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, ReferenceDot, LineChart, Line } from 'recharts';

export function KMeansContent() {
  // data for elbow method chart
  const elbowData = [
    { k: 1, wcss: 1000 },
    { k: 2, wcss: 600 },
    { k: 3, wcss: 300 },
    { k: 4, wcss: 250 },
    { k: 5, wcss: 220 },
    { k: 6, wcss: 200 }
  ];

  // data for distance example A(2,3) B(6,7)
  const distanceData = [
    { x: 2, y: 3, name: 'A(2,3)' },
    { x: 6, y: 7, name: 'B(6,7)' }
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">K-Means Clustering</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        K-Means Clustering is an unsupervised machine learning algorithm used to partition data into K distinct clusters.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Unlike supervised learning algorithms such as Linear Regression, Logistic Regression, and Decision Trees, K-Means does not require labeled data. Instead, it attempts to discover <strong>Hidden structures and natural groupings inside raw unlabeled data</strong>.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This ability makes K-Means extremely useful in real-world Artificial Intelligence systems where labeled data may not exist. K-Means is used extensively in Customer segmentation, Recommendation systems, Fraud detection, Image compression, Medical analysis, Search engines, Social network analysis, Market research, and Pattern discovery.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 leading-relaxed mb-0">
          Even today, K-Means remains one of the foundational algorithms taught in Data Science and Machine Learning because it introduces the core idea of: <strong>Learning patterns without supervision</strong>.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY K-MEANS WAS NEEDED */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why K-Means Clustering Was Needed
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        In the early days of Machine Learning, most systems relied heavily on <strong>Labeled datasets</strong> (e.g., Input: Email → Output: Spam). But researchers soon realized that in many real-world situations, <strong>Labels are unavailable</strong>.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Huge amounts of raw data existed without predefined categories. For example:
      </p>
      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-1">
        <li>Millions of customers without predefined groups</li>
        <li>Medical records without diagnosis labels</li>
        <li>User browsing patterns without classifications</li>
        <li>Images without annotations</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This created a major challenge: <em>Can machines automatically discover patterns and groups inside data without human guidance?</em> This question became the foundation of <strong>Unsupervised Learning</strong>, and K-Means target emerged as one of the earliest and most successful solutions.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Real-Life Analogy of K-Means Clustering
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Imagine a teacher entering a classroom full of completely unknown students. The teacher does not know who studies well, who likes sports, who prefers art, or who enjoys science. After observing behavior for several days, the teacher naturally begins grouping students based on similarities (Sports enthusiasts, Quiet learners, Highly academic students, Creative students).
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-amber-900 font-bold mb-2">Notice something important:</p>
        <p className="text-amber-900 mb-0">Nobody explicitly provided labels for these groups. The groups emerged naturally from similarities. K-Means works using exactly this philosophy. It examines data and automatically discovers <strong>Natural clusters</strong> inside the dataset.</p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CORE CONCEPTS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Core Concepts: What is "K-Means"?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
           <h3 className="text-lg font-bold text-slate-800 mb-3">What Does the Word "Clustering" Mean?</h3>
           <p className="text-lg text-slate-700 leading-relaxed mb-4">
             Clustering means <strong>Grouping similar data points together</strong>. The goal is:
           </p>
           <ul className="list-disc pl-5 space-y-2 text-slate-700 text-lg">
             <li>Similar points → same cluster</li>
             <li>Dissimilar points → different clusters</li>
           </ul>
        </div>
        <div>
           <h3 className="text-lg font-bold text-slate-800 mb-3">What Does the "K" Mean?</h3>
           <p className="text-lg text-slate-700 leading-relaxed mb-4">
             The letter <strong>K</strong> represents <strong>Number of clusters</strong>.
           </p>
           <ul className="list-disc pl-5 space-y-2 text-slate-700 text-lg">
             <li>K = 2 → Create 2 clusters</li>
             <li>K = 3 → Create 3 clusters</li>
             <li>K = 5 → Create 5 clusters</li>
           </ul>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm calculates the <strong>Mean position of each cluster</strong>, which becomes the cluster center called the <strong>Centroid</strong>. The core idea is: <em>Points close to each other probably belong to the same group</em>.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-10">
           <h3 className="text-lg font-bold text-slate-800 mb-3">Machine Learning Hierarchy</h3>
           <p className="text-slate-700 text-sm mb-2 font-mono">MACHINE LEARNING</p>
           <ul className="list-none pl-4 space-y-1 text-slate-700">
             <li>├─ <strong>Supervised Learning</strong>
                <ul className="pl-6 text-slate-600"><li>├─ Regression</li><li>└─ Classification</li></ul>
             </li>
             <li className="mt-2">└─ <strong>Unsupervised Learning</strong>
                <ul className="pl-6 text-slate-600">
                  <li>└─ <strong>Clustering</strong>
                     <ul className="pl-6 font-bold text-indigo-600"><li>└─ K-Means</li></ul>
                  </li>
                </ul>
             </li>
           </ul>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* MATHEMATICS AND Euclidean distance */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Calculator className="mr-2 text-indigo-600" /> Mathematical Goal & Distance
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The primary mathematical goal is: <strong>Minimize the distance between points and cluster centers</strong>. The algorithm tries to make clusters Compact, Tight, and Well separated.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Distance Measurement (Euclidean Distance)
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        K-Means usually uses <strong>Euclidean Distance</strong> to measure similarity between points. For two points (x₁, y₁) and (x₂, y₂), the distance is:
      </p>

      <div className="bg-white p-4 inline-block rounded border text-indigo-700 font-serif text-xl shadow-sm mb-8">
           d = √(x₂ - x₁)² + (y₂ - y₁)²
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
         <div>
            <h4 className="font-bold text-slate-800 text-lg mb-3">Worked Example</h4>
            <p className="text-lg text-slate-700 mb-2">Suppose Point A = (2, 3) and Point B = (6, 7).</p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm text-slate-800 space-y-2">
               <p>Step 1: d = √(6 - 2)² + (7 - 3)²</p>
               <p>Step 2: d = √(4)² + (4)²</p>
               <p>Step 3: d = √16 + 16 = √32</p>
               <p className="font-bold text-indigo-700 mt-2">Distance = 5.65</p>
            </div>
         </div>
         <div className="bg-white border rounded-lg p-4 h-64">
           <ResponsiveContainer width="100%" height="100%">
             <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis type="number" dataKey="x" name="X" domain={[0, 10]} />
               <YAxis type="number" dataKey="y" name="Y" domain={[0, 10]} />
               <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
               <Scatter name="Points" data={distanceData} fill="#4f46e5">
               </Scatter>
             </ScatterChart>
           </ResponsiveContainer>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CORE WORKING */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-indigo-600" /> Core Working of K-Means
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        K-Means works iteratively. The major workflow is: Choose K ➔ Initialize Centroids ➔ Assign Points to Nearest Centroid ➔ Update Centroids ➔ Repeat Until Stable.
      </p>

      <div className="space-y-6 mb-10">
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 1 — Choose Number of Clusters (K)</h4>
          <p className="text-lg text-slate-700 mb-0">The first step is selecting how many clusters should exist. For example, K = 3 means create 3 clusters.</p>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 2 — Initialize Random Centroids</h4>
          <p className="text-lg text-slate-700 mb-0">The algorithm randomly selects initial cluster centers called <strong>centroids</strong>. A centroid represents the average location of all points inside that cluster.</p>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 3 — Assign Points to Nearest Centroid</h4>
          <p className="text-lg text-slate-700 mb-2">Each point calculates its distance to every centroid. Then the point joins the nearest cluster.</p>
          <div className="bg-slate-50 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300">
            Suppose Centroid A distance = 2, Centroid B distance = 8.<br/>
            The point joins Cluster A because it is closer.
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 4 — Recalculate Centroids</h4>
          <p className="text-lg text-slate-700 mb-2">After assignments, centroids are updated to the mean of all assigned points.</p>
          <div className="bg-slate-50 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300">
            Suppose x-values in a cluster are: 2, 4, 6.<br/>
            New Centroid = (2 + 4 + 6) / 3 = 12 / 3 = 4.<br/>
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm mb-4">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 5 — Repeat Iteratively</h4>
          <p className="text-lg text-slate-700 mb-0">Again: Assign points ➔ Update centroids ➔ Recalculate distances. This process continues until centroids stop changing completely. This state is called <strong>Convergence</strong>.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* OBJECTIVE FUNCTION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Objective Function & Choosing K
      </h2>

      <p>Here we explore the key concepts and techniques involved in this topic.</p>
      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Within Cluster Sum of Squares (WCSS)
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        K-Means minimizes the <strong>Within Cluster Sum of Squares (WCSS)</strong>, also called Inertia. WCSS measures <em>how compact clusters are</em>. Lower WCSS means better clustering and tighter clusters.
      </p>

      <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl mb-10">
        <h4 className="font-bold text-rose-900 text-lg mb-3">Worked Example of WCSS</h4>
        <p className="text-rose-800 text-lg mb-2">Suppose a centroid = 5, and it contains points: 4, 5, 6.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-rose-800 mb-4">
          <li>(4 - 5)² = 1</li>
          <li>(5 - 5)² = 0</li>
          <li>(6 - 5)² = 1</li>
        </ul>
        <p className="text-rose-900 font-bold text-lg mb-0">Total WCSS: 1 + 0 + 1 = 2</p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Methods to Determine Optimal K
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Choosing the correct K is critical. Too small K merges distinct groups; too large K splits similar groups. Therefore, finding the optimal K is an important task in K-Means.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
         <div>
            <h4 className="font-bold text-slate-800 text-xl mb-3 border-b pb-2">1. The Elbow Method</h4>
            <p className="text-lg text-slate-700 mb-4">
              It analyzes how WCSS decreases as K increases. As K increases, WCSS decreases. But after some point, the improvement becomes very small, creating an "elbow" shape. The elbow point represents the Optimal K.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-4">
              <p className="text-sm font-mono text-slate-700">K=1 (1000) ➔ K=2 (600) ➔ <strong>K=3 (300) [Elbow]</strong> ➔ K=4 (250)</p>
            </div>
            
            <h4 className="font-bold text-slate-800 text-xl mt-6 mb-3 border-b pb-2">2. Silhouette Method</h4>
            <p className="text-lg text-slate-700 mb-4">
              Measures how well each point fits inside its cluster.
              Score ranges from +1 (Excellent) to 0 (Boundary) to -1 (Wrong clustering). It measures separation quality mathematically.
            </p>

            <h4 className="font-bold text-slate-800 text-xl mt-6 mb-3 border-b pb-2">3. Gap Statistic & 4. Davies-Bouldin</h4>
            <p className="text-lg text-slate-700 mb-0">
               <strong>Gap Statistic</strong> compares actual clustering vs random clustering.<br/>
               <strong>Davies-Bouldin Index (DBI)</strong> measures cluster separation quality. Lower DBI means better clustering.
            </p>
         </div>
         <div className="bg-white border rounded-lg p-6 flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 text-lg">Elbow Method Visualization</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elbowData} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="k" name="Number of Clusters (K)" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="wcss" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 mt-4 italic">The 'Elbow' sits at K=3, the optimal number of clusters.</p>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* PYTHON COMPUTATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Implementing K-Means in Python
      </h2>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center">
             <Code className="text-indigo-600 mr-2" />
             <h4 className="font-bold text-indigo-800 text-xl">K-Means Python Implementation</h4>
          </div>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`# Step 1 — Import Libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# Step 2 — Create Dataset
X, y = make_blobs(
    n_samples=500,
    centers=3,
    n_features=2,
    random_state=42
)

# Step 3 — Train K-Means Model
model = KMeans(n_clusters=3, random_state=42)
model.fit(X)

# Step 4 — Predict Clusters
labels = model.predict(X)

# Step 5 — Visualize Clusters
plt.scatter(
    X[:,0], X[:,1], c=labels
)
plt.scatter(
    model.cluster_centers_[:,0],
    model.cluster_centers_[:,1],
    marker='*', s=300, color='red'
)
plt.show()`}</code>
          </pre>
        </div>
        <div className="p-4 bg-slate-50 text-slate-700 border-b border-slate-200 text-lg">
          <p className="mb-0"><strong>Output Interpretation:</strong> Different colors represent the inferred clusters. The large red stars represent the calculated centroids at the center of each group.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* ADVANTAGES & SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Advantages & Disadvantages
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li>Simple to understand and easy to implement.</li>
             <li>Fast and computationally efficient.</li>
             <li>Scalable, it works exceptionally well on robust large datasets.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li>Need to choose K manually in advance.</li>
             <li>Sensitive to outliers (since it calculates the mean).</li>
             <li>Sensitive to centroid initialization.</li>
             <li>Assumes spherical clusters (poor performance on irregular shapes).</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center">
        <GitMerge className="mr-2" /> K-Means vs Hierarchical Clustering
      </h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-10">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Feature</th>
              <th className="p-4 font-bold text-indigo-800">K-Means</th>
              <th className="p-4 font-bold text-emerald-800">Hierarchical</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Speed</td><td className="p-4 font-bold text-indigo-700">Faster</td><td className="p-4">Slower</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Scalability</td><td className="p-4 text-emerald-600">High</td><td className="p-4 text-rose-600">Lower</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Need K Initially</td><td className="p-4 text-rose-600">Yes</td><td className="p-4 text-emerald-600">No</td></tr>
             <tr><td className="p-4 font-medium">Complexity</td><td className="p-4 text-emerald-600">Low</td><td className="p-4 text-rose-600">High</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        K-Means Clustering is one of the foundational algorithms in Unsupervised Machine Learning. It works by Creating centroids, Measuring distances, Grouping similar points, and Updating cluster centers iteratively.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm aims to minimize the Within Cluster Sum of Squares (WCSS) and create compact, meaningful clusters. One of the biggest practical challenges in K-Means is finding the correct number of clusters using techniques like the Elbow Method.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Similar data points should belong to the same cluster. That single principle forms the foundation of clustering systems used throughout modern Artificial Intelligence."
         </p>
      </div>

    </>
  );
}
