import React from 'react';
import { 
  Target, Layers, Activity, Code, Check, X as CloseIcon, 
  AlertCircle, GitMerge, Calculator 
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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
        K-Means Clustering is an unsupervised learning algorithm that groups similar data points into <strong>K clusters</strong> without needing class labels.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">K-Means in Simple Words</h2>
        <p className="text-lg text-slate-700 mb-5">
          Imagine dots scattered on a page. K-Means repeatedly moves a few center points until each center sits near a group of nearby dots.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          {[
            ['1', 'Choose K', 'How many groups?'],
            ['2', 'Assign', 'Send each point to its nearest center'],
            ['3', 'Move', 'Move each center to its cluster mean'],
            ['4', 'Repeat', 'Stop when the solution stabilizes'],
          ].map(([step, title, note]) => (
            <div key={step} className="bg-white border border-indigo-100 rounded-lg p-4">
              <div className="mx-auto mb-2 w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">{step}</div>
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-600 mb-0">{note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Tiny Example: Group Customers by Two Features</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-3">Customer</th><th className="p-3">Visits / Month</th><th className="p-3">Average Spend</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b"><td className="p-3">A</td><td className="p-3">2</td><td className="p-3">₹500</td></tr>
              <tr className="border-b"><td className="p-3">B</td><td className="p-3">3</td><td className="p-3">₹650</td></tr>
              <tr className="border-b"><td className="p-3">C</td><td className="p-3">10</td><td className="p-3">₹3,000</td></tr>
              <tr><td className="p-3">D</td><td className="p-3">11</td><td className="p-3">₹3,200</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-700 mt-4 mb-0">
          With <strong>K = 2</strong>, K-Means may place A/B together and C/D together because their numerical patterns are closer. The algorithm does not know names such as “low-value” or “high-value”; a human interprets the clusters afterwards.
        </p>
        <p className="text-sm text-slate-600 mt-2 mb-0"><strong>Scaling note:</strong> Visits and spend use very different units, so a real project should consider scaling before distance-based clustering. We return to this later on the page.</p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Unlike supervised algorithms such as Logistic Regression or Decision Trees, K-Means does not train from target labels. It searches for structure using the numerical features supplied to it.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        K-Means is commonly considered for tasks such as customer segmentation, vector quantization/image compression, exploratory grouping, and other problems where compact numeric groups are useful. It is not automatically the right choice for every unlabeled dataset.
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
        Many machine-learning problems are supervised and use <strong>labeled datasets</strong> (for example, Email → Spam/Not Spam). But in many real-world situations, useful target labels are unavailable.
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
        This creates a common unsupervised-learning question: <em>Can we discover useful structure without predefined target labels?</em> K-Means is one classic algorithm for exploring that kind of grouping.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Real-Life Analogy of K-Means Clustering
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Imagine a teacher entering a classroom full of completely unknown students. The teacher does not know who studies well, who likes sports, who prefers art, or who enjoys science. After observing behavior for several days, the teacher naturally begins grouping students based on similarities (Sports enthusiasts, Quiet learners, Highly academic students, Creative students).
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-amber-900 font-bold mb-2">Notice something important:</p>
        <p className="text-amber-900 mb-0">Nobody explicitly provided class labels for these groups. K-Means follows a similar idea mathematically: it groups nearby numerical points. However, the resulting clusters are algorithmic groups, not guaranteed “natural” or meaningful categories; people still need to interpret them.</p>
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
        The algorithm calculates the <strong>mean position of the points assigned to each cluster</strong>. That mean becomes the cluster center, called the <strong>centroid</strong>. K-Means then assigns each point to the nearest centroid under its distance objective.
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
        The K-Means objective is to minimize the <strong>sum of squared distances from every point to the centroid of its assigned cluster</strong>. This encourages compact clusters. It does not directly maximize the distance between different clusters.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Distance Measurement (Euclidean Distance)
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Standard K-Means is based on squared Euclidean distance. To build intuition, the ordinary Euclidean distance between two points (x₁, y₁) and (x₂, y₂) is:
      </p>

      <div className="bg-white p-4 inline-block rounded border text-indigo-700 font-serif text-xl shadow-sm mb-8">
           d = √[(x₂ - x₁)² + (y₂ - y₁)²]
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
         <div>
            <h4 className="font-bold text-slate-800 text-lg mb-3">Worked Example</h4>
            <p className="text-lg text-slate-700 mb-2">Suppose Point A = (2, 3) and Point B = (6, 7).</p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg font-mono text-sm text-slate-800 space-y-2">
               <p>Step 1: d = √[(6 - 2)² + (7 - 3)²]</p>
               <p>Step 2: d = √[4² + 4²]</p>
               <p>Step 3: d = √[16 + 16] = √32</p>
               <p className="font-bold text-indigo-700 mt-2">Distance ≈ 5.66</p>
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
        K-Means alternates between two main operations: <strong>assign points to the nearest centroid</strong> and <strong>recompute each centroid as a mean</strong>. A typical workflow is: Choose K ➔ Initialize Centroids ➔ Assign Points ➔ Update Centroids ➔ Repeat.
      </p>

      <div className="space-y-6 mb-10">
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 1 — Choose Number of Clusters (K)</h4>
          <p className="text-lg text-slate-700 mb-0">The first step is selecting how many clusters should exist. For example, K = 3 means create 3 clusters.</p>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 2 — Initialize Centroids</h4>
          <p className="text-lg text-slate-700 mb-0">The algorithm needs starting centers. They may be initialized randomly, but practical implementations commonly use <strong>k-means++</strong>, which chooses spread-out starting centers to improve initialization.</p>
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
          <p className="text-lg text-slate-700 mb-2">After assignments, each centroid moves to the coordinate-wise mean of the points currently assigned to it.</p>
          <div className="bg-slate-50 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300 space-y-1">
            <p>Points: (2,2), (4,4), (6,2)</p>
            <p>Mean x = (2 + 4 + 6) / 3 = 4</p>
            <p>Mean y = (2 + 4 + 2) / 3 = 8 / 3 ≈ 2.67</p>
            <p className="font-bold text-indigo-700">New centroid ≈ (4, 2.67)</p>
          </div>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm mb-4">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">Step 5 — Repeat Iteratively</h4>
          <p className="text-lg text-slate-700 mb-0">Again: Assign points ➔ Update centroids. Implementations stop when the centers change only within a small tolerance, or when a maximum number of iterations is reached. The resulting solution is a <strong>local optimum</strong>, so initialization can matter.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* OBJECTIVE FUNCTION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Objective Function & Choosing K
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        K-Means needs both an objective to optimize and a practical way to decide whether a chosen value of K is useful.
      </p>
      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Within Cluster Sum of Squares (WCSS)
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        K-Means minimizes the <strong>Within-Cluster Sum of Squares (WCSS)</strong>, called <strong>inertia</strong> in Scikit-learn. For a fixed K, smaller inertia means points are closer to their assigned centroids. However, inertia always tends to fall as K grows, so “lower” does not by itself prove that one K is the most meaningful choice.
      </p>

      <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6">
        <p className="font-bold text-slate-900 mb-2">Objective</p>
        <div className="font-serif text-xl text-indigo-700 mb-3">
          WCSS = Σ ||xᵢ - μ<sub>c(i)</sub>||²
        </div>
        <p className="text-slate-700 mb-0">For every data point xᵢ, measure its squared distance from the centroid μ of the cluster it belongs to, then add those values.</p>
      </div>

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
        Methods to Choose a Useful K
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        K is a modeling choice. A small K may merge patterns that are useful to separate, while a large K may create clusters that are too fragmented for the task. Methods such as elbow plots and silhouette analysis provide evidence, but they do not guarantee one universally “correct” K.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
         <div>
            <h4 className="font-bold text-slate-800 text-xl mb-3 border-b pb-2">1. The Elbow Method</h4>
            <p className="text-lg text-slate-700 mb-4">
              Plot inertia for several K values. Inertia falls as K increases, but sometimes the curve bends and additional clusters bring much smaller improvements. That bend can be treated as a <strong>candidate K</strong>, not a mathematical guarantee of the best real-world grouping.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-4">
              <p className="text-sm font-mono text-slate-700">K=1 (1000) ➔ K=2 (600) ➔ <strong>K=3 (300) [Elbow]</strong> ➔ K=4 (250)</p>
            </div>
            
            <h4 className="font-bold text-slate-800 text-xl mt-6 mb-3 border-b pb-2">2. Silhouette Method</h4>
            <p className="text-lg text-slate-700 mb-4">
              The silhouette coefficient compares how close a point is to its own cluster with how close it is to the nearest other cluster. Scores range from -1 to 1: values near 1 indicate better separation, values near 0 indicate overlap/boundary-like placement, and negative values can indicate a point may fit another cluster better.
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
            <p className="text-sm text-slate-500 mt-4 italic">Illustrative data: K=3 is a reasonable elbow candidate here. Real datasets may have a weak or ambiguous elbow.</p>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Feature Scaling & When K-Means Fits the Data</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="text-xl font-bold text-amber-900 mb-3">Why Scaling Can Matter</h3>
          <p className="text-slate-700 mb-3">K-Means is distance-based. A feature with much larger numeric units can dominate Euclidean distance.</p>
          <div className="bg-white border border-amber-100 rounded-lg p-4 font-mono text-sm text-slate-700">
            Age difference = 5<br/>
            Salary difference = 20,000<br/><br/>
            Raw distance may be driven mainly by Salary.
          </div>
          <p className="text-slate-700 mt-3 mb-0">For real data, consider scaling comparable numeric features when their units differ substantially.</p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <h3 className="text-xl font-bold text-sky-900 mb-3">Cluster Shape Matters</h3>
          <p className="text-slate-700 mb-3">K-Means works most naturally when groups can be represented reasonably well by centroids under Euclidean distance.</p>
          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="bg-white rounded-lg border border-sky-100 p-4">
              <div className="font-bold text-emerald-700 mb-2">Better fit</div>
              <div className="tracking-widest">••• &nbsp;&nbsp; •••</div>
              <div className="text-slate-600 mt-2">compact, separated groups</div>
            </div>
            <div className="bg-white rounded-lg border border-sky-100 p-4">
              <div className="font-bold text-rose-700 mb-2">Can struggle</div>
              <div className="font-mono">◜••••◝<br/>◟••••◞</div>
              <div className="text-slate-600 mt-2">curved / irregular structure</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-10">
        <h3 className="text-xl font-bold text-slate-900 mb-3">Initialization Matters</h3>
        <p className="text-slate-700 mb-2">K-Means can converge to different local solutions from different starting centroids. <strong>k-means++</strong> is a smarter initialization than choosing every center uniformly at random.</p>
        <p className="text-slate-700 mb-0">Scikit-learn can run K-Means from multiple initializations and keep the run with the lowest inertia. In the code below, <code>n_init=10</code> is written explicitly so the teaching example behaves consistently across library versions.</p>
      </div>

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
<code>{`# Step 1 — Import libraries
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# Step 2 — Create a simple 2D teaching dataset
X, _ = make_blobs(
    n_samples=500,
    centers=3,
    n_features=2,
    random_state=42
)

# Step 3 — Fit K-Means
model = KMeans(
    n_clusters=3,
    init="k-means++",
    n_init=10,
    random_state=42
)
labels = model.fit_predict(X)

# Step 4 — Inspect the result
print("Number of clusters:", len(np.unique(labels)))
print("Inertia:", round(model.inertia_, 2))
print("Cluster sizes:", np.bincount(labels))

# Step 5 — Visualize clusters and centroids
plt.scatter(X[:, 0], X[:, 1], c=labels, s=20)
plt.scatter(
    model.cluster_centers_[:, 0],
    model.cluster_centers_[:, 1],
    marker="*",
    s=300,
    color="red"
)
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.title("K-Means Clusters")
plt.show()`}</code>
          </pre>
        </div>
        <div className="p-4 bg-slate-50 text-slate-700 border-b border-slate-200 text-lg">
          <p className="font-bold mb-2">Expected printed output</p>
          <pre className="bg-white border rounded p-3 text-sm overflow-x-auto mb-3">{`Number of clusters: 3
Inertia: 955.65
Cluster sizes: [167 166 167]`}</pre>
          <p className="mb-2"><strong>Interpretation:</strong> The algorithm found three cluster labels because we requested K=3. Inertia is the sum of squared distances to the assigned centroids. The underscore in <code>X, _</code> deliberately ignores the true blob labels because K-Means is being trained without them.</p>
          <p className="mb-0 text-sm text-slate-600"><strong>Important:</strong> Cluster numbers such as 0, 1 and 2 are arbitrary identifiers. Cluster 0 is not inherently “better” or “lower” than Cluster 1.</p>
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
             <li>Often computationally efficient for numeric data with a moderate number of clusters.</li>
             <li>Can scale to large datasets; Scikit-learn also provides MiniBatchKMeans for larger workloads.</li>
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
             <li>Can give unintuitive groups when clusters have strongly irregular shapes, very different sizes, or very different densities.</li>
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
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Representation</td><td className="p-4">Centroids</td><td className="p-4">Nested merge/split structure</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Choose K before fitting?</td><td className="p-4">Yes</td><td className="p-4">Not always; a dendrogram can be cut later</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Dataset size</td><td className="p-4">Often practical for larger datasets</td><td className="p-4">Can become expensive as sample count grows</td></tr>
             <tr><td className="p-4 font-medium">Main output</td><td className="p-4">Flat cluster assignment</td><td className="p-4">Hierarchy of relationships</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Common Mistakes</h2>
      <ul className="list-disc pl-8 mb-10 text-lg text-slate-700 space-y-3">
        <li><strong>Calling the elbow K “the true K”:</strong> an elbow is a heuristic clue, and some datasets have no clear elbow.</li>
        <li><strong>Ignoring feature units:</strong> distance-based clustering can be dominated by large-scale features.</li>
        <li><strong>Giving clusters meaning too early:</strong> labels 0, 1, 2 are arbitrary; interpret clusters only after examining their features.</li>
        <li><strong>Expecting K-Means to discover every shape:</strong> curved or strongly unequal-density groups may need another clustering method.</li>
        <li><strong>Trusting one initialization:</strong> different starting centers can lead to different local solutions.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Quick FAQ & What to Learn Next</h2>
      <div className="space-y-4 mb-8">
        <details className="bg-white border border-slate-200 rounded-lg p-4">
          <summary className="font-bold text-slate-900 cursor-pointer">Does K-Means need feature scaling?</summary>
          <p className="text-slate-700 mt-3 mb-0">Often yes when numerical features use very different units, because K-Means relies on Euclidean-distance geometry.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-lg p-4">
          <summary className="font-bold text-slate-900 cursor-pointer">Is K=3 always correct when the elbow looks like 3?</summary>
          <p className="text-slate-700 mt-3 mb-0">No. Treat it as a candidate and combine the plot with silhouette analysis, domain usefulness, stability, and visual inspection when possible.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-lg p-4">
          <summary className="font-bold text-slate-900 cursor-pointer">What if the groups are curved or have very different densities?</summary>
          <p className="text-slate-700 mt-3 mb-0">K-Means may be a poor fit. Compare it with methods such as DBSCAN or hierarchical clustering.</p>
        </details>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-indigo-900 mb-3">Continue learning</p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <a href="/learn/feature-scaling" className="text-indigo-700 underline">Feature Scaling</a>
          <a href="/learn/hierarchical" className="text-indigo-700 underline">Hierarchical Clustering</a>
          <a href="/learn/dbscan" className="text-indigo-700 underline">DBSCAN</a>
          <a href="/learn/pca" className="text-indigo-700 underline">PCA</a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        K-Means Clustering is one of the foundational algorithms in Unsupervised Machine Learning. It works by Creating centroids, Measuring distances, Grouping similar points, and Updating cluster centers iteratively.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm minimizes Within-Cluster Sum of Squares (WCSS/inertia), which favors compact groups around centroids. Practical work also involves choosing K, checking cluster quality, scaling features when necessary, and deciding whether centroid-shaped clusters match the structure of the data.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "K-Means repeatedly assigns points to the nearest centroid and moves each centroid to the mean of its assigned points. Simple loop, powerful idea — but the clusters still need validation and human interpretation."
         </p>
      </div>

    </>
  );
}
