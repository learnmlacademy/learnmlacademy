import React from 'react';
import { Lightbulb, Code } from 'lucide-react';

export function DBSCANContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">DBSCAN Clustering Guide</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          DBSCAN stands for <strong>Density-Based Spatial Clustering of Applications with Noise</strong>. It is an unsupervised clustering algorithm that looks for <strong>dense neighborhoods of points</strong> and can leave sufficiently isolated points outside the clusters as noise.
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8" id="dbscan-simple-words">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">DBSCAN in Simple Words</h2>
          <p className="text-lg text-slate-800 mb-5">Imagine dots on a map. DBSCAN asks: <strong>“Where are enough dots packed close together?”</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            {[
              ['1', 'Choose a radius', 'eps'],
              ['2', 'Count nearby points', 'min_samples'],
              ['3', 'Grow dense regions', 'Clusters'],
              ['4', 'Leave isolated points', 'Noise'],
            ].map(([step, title, label]) => (
              <div key={step} className="bg-white border border-indigo-100 rounded-lg p-4">
                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">{step}</div>
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="text-sm text-slate-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8" id="dense-vs-noise-intuition">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-emerald-900 mb-3">Dense region → possible cluster</p>
            <div className="font-mono text-emerald-900 whitespace-pre text-center">{`● ● ●
 ● ● ● ●
  ● ● ●`}</div>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <p className="font-bold text-rose-900 mb-3">Sparse / isolated → possible noise</p>
            <div className="font-mono text-rose-900 whitespace-pre text-center">{`●             ×
       ●
                 ×`}</div>
          </div>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Unlike K-Means, DBSCAN does not use centroids and does not require you to choose the final number of clusters before fitting. This lets it find many <strong>non-convex or curved cluster shapes</strong> when density is reasonably consistent within each cluster.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-1">Important:</p>
          <p className="text-amber-900">A DBSCAN noise label means “this point did not satisfy the chosen density rules.” It does <strong>not</strong> automatically prove that the point is fraud, an error, or a real-world anomaly.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-density-based">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Why Density-Based Clustering Was Needed</h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Centroid-based clustering such as K-Means works best when groups can be represented well by compact centers. Real-world data may instead contain:
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
          <p className="text-slate-800">K-Means can struggle on this kind of non-convex geometry because each cluster is represented by a centroid. DBSCAN can instead connect points through dense neighborhoods.</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Another Major Problem — Noise and Outliers</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Real-world datasets can contain sensor errors, unusual transactions, abnormal behavior, or simply sparse observations. K-Means assigns every sample to one of its clusters, while DBSCAN can label samples that do not satisfy its density rules as noise.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Researchers needed an algorithm that could:
        </p>
        <ol className="list-decimal pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Discover arbitrary-shaped clusters</li>
          <li>Ignore noisy points</li>
          <li>Form clusters without specifying the final cluster count in advance</li>
        </ol>
        <p className="text-lg font-semibold text-indigo-700">DBSCAN addresses these needs with a density-based definition of a cluster.</p>
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
          DBSCAN is useful because its clustering rule can:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Detect irregular cluster shapes</li>
          <li>Assign sparse observations a noise label</li>
          <li>Work without a predefined cluster count</li>
          <li>Avoid forcing every sample into a cluster</li>
        </ul>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          These properties make DBSCAN an important alternative when centroid-based clustering does not match the geometry of the data.
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
├── min_samples
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
          <p className="text-slate-800 mb-4"><code>eps</code> is the maximum neighborhood distance. Samples whose distance is at most <code>eps</code> can belong to the same local neighborhood.</p>
          <div className="font-mono text-sm whitespace-pre bg-white p-4 rounded border border-amber-200 text-slate-700 mb-4">
{`        eps radius
      ┌───────────┐
      │     ●     │
      │  ●  ●  ●  │
      │     ●     │
      └───────────┘`}
          </div>
          <p className="text-slate-800 italic">Think of eps as the size of the local neighborhood around a point.</p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Why eps Is Important:</strong> Choosing eps incorrectly creates problems. 
          If <em>eps is too small</em>, more points may be labeled noise because neighborhoods are tiny. 
          If <em>eps is too large</em>, nearby dense regions may merge into one cluster.
        </p>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8" id="minpts">
          <p className="text-lg font-bold text-amber-900 mb-2">2. min_samples (the MinPts idea)</p>
          <p className="text-slate-800 mb-4"><code>min_samples</code> is the minimum number of samples required in an <code>eps</code>-neighborhood for the center sample to be a core point.</p>
          <p className="text-slate-800 mb-3"><strong>Important Scikit-learn detail:</strong> this count <strong>includes the point itself</strong>.</p>
          <p className="text-slate-800"><strong>Example:</strong> if <code>min_samples = 5</code>, a point is core when its eps-neighborhood contains at least 5 samples in total, counting itself.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8" id="eps-minsamples-worked-example">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Tiny Worked Example: Is P a Core Point?</h3>
          <p className="text-lg text-slate-800 mb-4">Suppose <code>eps = 1.5</code> and <code>min_samples = 4</code>.</p>
          <div className="font-mono bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 whitespace-pre text-center text-slate-800">{`Q      R
   P
      S        T`}</div>
          <p className="text-slate-800 mb-2"><strong>Step 1:</strong> P's eps-neighborhood contains P, Q, R and S.</p>
          <p className="text-slate-800 mb-2"><strong>Step 2:</strong> Total samples in the neighborhood = <strong>4</strong>.</p>
          <p className="text-slate-800 mb-4"><strong>Step 3:</strong> Because <code>4 ≥ min_samples</code>, <strong>P is a core point</strong>.</p>
          <p className="text-sm text-slate-600">If P had only 3 samples in its neighborhood, P would not be core. It could still become a border point if it lies within eps of another core point.</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8" id="feature-scaling-dbscan">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Why Feature Scaling Can Matter</h3>
          <p className="text-lg text-slate-800 mb-4">DBSCAN commonly uses a distance metric. If one feature has much larger numerical units, it can dominate the distance.</p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm bg-white border border-blue-100">
              <thead><tr className="bg-blue-100"><th className="p-3 text-left">Feature</th><th className="p-3 text-left">Example difference</th></tr></thead>
              <tbody>
                <tr className="border-t"><td className="p-3">Age</td><td className="p-3">5</td></tr>
                <tr className="border-t"><td className="p-3">Annual income</td><td className="p-3">20,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-800">With raw Euclidean distance, income could dominate simply because of its units. Standardization is therefore often useful when numerical feature scales differ greatly, but scaling should still respect the meaning of the variables.</p>
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
            <p className="text-slate-800 mb-4 text-center">A core point has at least <code>min_samples</code> samples in its eps-neighborhood, counting itself. Core points form the dense interior of clusters.</p>
            <div className="bg-white rounded p-3 text-center border border-emerald-100 font-mono text-sm leading-relaxed text-emerald-800">
              &nbsp;&nbsp;&nbsp;● ● ● <br/>
              &nbsp;● ●<strong className="text-emerald-600">C</strong>● ●<br/>
              &nbsp;&nbsp;&nbsp;● ● ● 
            </div>
            <p className="text-center text-sm font-medium mt-2 text-emerald-700">C = Core point</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-xl font-bold text-blue-900 mb-3 text-center">2. Border Point</h4>
            <p className="text-slate-800 mb-4 text-center">A border point is not core itself, but it lies within eps of a core point and can therefore belong to that core point's cluster.</p>
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
            <p className="text-slate-800 mb-4 text-center">A final noise point is neither a core point nor assigned as a border point of a cluster. Scikit-learn gives such samples the label <code>-1</code>.</p>
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
Choose eps and min_samples
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
            <p>Conceptually, DBSCAN considers an unvisited point and inspects its local neighborhood. The exact processing order is an implementation detail.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl text-slate-900">Step 2 — Find Neighbors</h4>
            <p>It finds samples whose distance is within <code>eps</code>. Euclidean distance is common, but Scikit-learn's DBSCAN supports other metrics too.</p>
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
            <p>If the eps-neighborhood contains at least <code>min_samples</code> samples (including the point itself), it is a core point. A non-core point can later belong to a cluster as a border point if it is within eps of a core point; otherwise it remains noise.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl text-slate-900">Step 4 — Expand Cluster</h4>
            <p>From a core point, DBSCAN expands through neighboring core points and includes their reachable border points. This is what allows a cluster to follow a curved or irregular dense region.</p>
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
          Point q is density-reachable from p if there is a chain of points from p to q where each next point is directly density-reachable from the previous one. Intermediate expansion points must satisfy the core-point condition.
        </p>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md mb-8 font-mono">
          A ●──●──●──● B
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Density Connected</h3>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          Two points are density-connected if there exists a point from which both are density-reachable. This relation helps define which samples belong to the same density-based cluster.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Why DBSCAN Handles Arbitrary Shapes</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Unlike K-Means, DBSCAN does not rely on one centroid per cluster. It expands through connected dense regions, so it can represent many curved or non-convex patterns when the density assumptions are suitable.
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
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Explicit noise label</td>
                <td className="px-6 py-4 text-sm text-slate-700">Assigns every point</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Arbitrary Shapes</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Can model many non-convex shapes</td>
                <td className="px-6 py-4 text-sm text-slate-700">Favors compact centroid-based groups</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Uses Centroids</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">No</td>
                <td className="px-6 py-4 text-sm text-slate-700">Yes</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Sparse observations</td>
                <td className="px-6 py-4 text-sm text-emerald-700 font-medium">Can label them as noise</td>
                <td className="px-6 py-4 text-sm text-slate-700">No built-in noise class</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Real-Life Example — Fraud Detection</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a bank represents transactions using suitable behavioral features. Some unusual transactions may appear in sparse regions compared with common patterns.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          DBSCAN can flag such sparse observations as density-based noise candidates. They would still need investigation or a separate supervised/anomaly-detection process before being called fraud.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Choosing a Useful eps</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A common heuristic for exploring <code>eps</code> is a <strong>k-distance graph</strong>. It is a visual aid, not a guarantee of one mathematically “optimal” epsilon.
        </p>
        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-3 pr-4 rounded-r-md mb-8 text-slate-800">
          <p className="font-bold mb-2">K-Distance Graph Idea:</p>
          <ul className="list-disc pl-5">
            <li>For each point, compute distance to k-th nearest neighbor</li>
            <li>Sort these distances</li>
            <li>Plot them</li>
          </ul>
          <p className="mt-2 italic">A bend can suggest a candidate eps value. Real datasets may have a weak or ambiguous bend, so validate the resulting clusters and use domain knowledge.</p>
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
<pre><code>{`# Step 1 — Import libraries
import matplotlib.pyplot as plt
import numpy as np

from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons
from sklearn.preprocessing import StandardScaler

# Step 2 — Create a curved, unlabeled-looking dataset
# y_true is kept ONLY for evaluation later; DBSCAN never sees it.
X, y_true = make_moons(
    n_samples=300,
    noise=0.05,
    random_state=42
)

# Step 3 — Scale because DBSCAN is distance-based
X_scaled = StandardScaler().fit_transform(X)

# Step 4 — Fit DBSCAN
db = DBSCAN(
    eps=0.20,
    min_samples=5
)
labels = db.fit_predict(X_scaled)

# In Scikit-learn, label -1 means noise.
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise = np.sum(labels == -1)
n_core = len(db.core_sample_indices_)
n_border = len(X_scaled) - n_core - n_noise

print("Clusters:", n_clusters)
print("Noise points:", n_noise)
print("Core points:", n_core)
print("Border points:", n_border)

# Step 5 — Visualize
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=labels, cmap='viridis')
plt.title("DBSCAN on Two-Moons Data")
plt.show()`}</code></pre>
            </div>
          </div>
          <div className="bg-slate-50 border-t border-slate-200 p-4">
            <p className="font-mono text-sm mb-2 text-slate-800"><strong>Output Interpretation:</strong></p>
            <div className="font-mono text-sm text-indigo-700 space-y-1">
              <p>Clusters: 2</p>
              <p>Noise points: 2</p>
              <p>Core points: 289</p>
              <p>Border points: 9</p>
            </div>
            <p className="text-sm text-slate-600 mt-3">
              DBSCAN finds two curved dense regions without receiving the generated class labels or a predefined cluster count. The numeric cluster IDs and plot colors are arbitrary; label <code>-1</code> is the special Scikit-learn noise label.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="metrics">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Evaluation Metrics for DBSCAN</h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Cluster evaluation depends on what information you have. <strong>Silhouette Score</strong> is an internal geometry-based measure, while <strong>Adjusted Rand Index (ARI)</strong> requires reference labels and is therefore mainly available in labeled benchmarks or synthetic teaching examples.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Silhouette Score</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The Silhouette score compares how close each sample is to its own cluster with how close it is to the nearest other cluster. Values range from -1 to 1. For DBSCAN, decide explicitly how you want to treat noise; below we compute the score on non-noise samples only.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-4 text-center max-w-2xl">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded shadow-sm">
            <p className="font-bold text-xl text-emerald-800">+1</p>
            <p className="text-sm text-emerald-700">Well separated</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-3 rounded shadow-sm">
            <p className="font-bold text-xl text-amber-800">0</p>
            <p className="text-sm text-amber-700">Overlapping</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-3 rounded shadow-sm">
            <p className="font-bold text-xl text-rose-800">-1</p>
            <p className="text-sm text-rose-700">Possibly assigned poorly</p>
          </div>
        </div>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md mb-8 inline-block">
          <p className="font-mono text-slate-800">s(i) = [b(i) - a(i)] / max(a(i), b(i))</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Adjusted Rand Index (ARI)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ARI compares two cluster assignments while adjusting for chance. <strong>1</strong> means perfect agreement, values near <strong>0</strong> are expected for random-like independent labelings, and negative values are possible. In real unsupervised projects, true cluster labels often do not exist.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 w-full max-w-2xl">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h4 className="font-bold text-slate-800">Python Code for Evaluation</h4>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm">
<pre><code>{`from sklearn.metrics import silhouette_score, adjusted_rand_score

# Exclude DBSCAN noise for this silhouette calculation.
non_noise = labels != -1
sil = silhouette_score(
    X_scaled[non_noise],
    labels[non_noise]
)

# y_true exists only because make_moons generated it for us.
ari = adjusted_rand_score(y_true, labels)

print(f"Silhouette (non-noise): {sil:.3f}")
print(f"ARI vs generated labels: {ari:.3f}")`}</code></pre>
          </div>
          <div className="bg-slate-50 border-t border-slate-200 p-4">
            <div className="font-mono text-sm text-indigo-700 space-y-1">
              <p>Silhouette (non-noise): 0.389</p>
              <p>ARI vs generated labels: 0.987</p>
            </div>
            <p className="text-sm text-slate-600 mt-3">The high ARI is possible here because this is a controlled synthetic dataset with reference labels. Do not expect ARI to be available in an ordinary unlabeled clustering task.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-and-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Complexity & Pros/Cons</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Computation and Memory</h3>
          <p className="text-lg text-slate-800 mb-4">Runtime depends on the distance metric, dimensionality, neighborhood-search algorithm, and how many neighbors each point has. Brute-force neighborhood search can become quadratic.</p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md">
            <p className="text-amber-900"><strong>Scikit-learn note:</strong> its DBSCAN implementation can require <code>O(n²)</code> memory in a worst case such as very large <code>eps</code> with low <code>min_samples</code>. So avoid memorizing one universal “O(n log n)” complexity claim.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages of DBSCAN</h3>
        <ol className="list-decimal pl-6 mb-8 text-lg text-slate-800 space-y-4">
          <li><strong>No Need for Number of Clusters:</strong> Unlike K-Means, no predefined K is required.</li>
          <li><strong>Non-convex shapes:</strong> Can follow many curved or irregular dense regions.</li>
          <li><strong>Explicit noise label:</strong> Sparse samples can remain outside the discovered clusters.</li>
          <li><strong>No forced assignment:</strong> Every observation does not have to belong to a cluster.</li>
        </ol>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Disadvantages of DBSCAN</h3>
        <ol className="list-decimal pl-6 mb-8 text-lg text-slate-800 space-y-4">
          <li><strong>Sensitive to eps and min_samples:</strong> Different density settings can substantially change the result.</li>
          <li><strong>Difficulty with Varying Densities:</strong> Struggles when clusters have very different neighborhood densities.</li>
          <li><strong>High dimensions:</strong> Distance neighborhoods can become less informative as dimensionality increases, especially without appropriate representation/scaling.</li>
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
                <td className="px-6 py-4 text-sm text-emerald-700 font-medium">Explicit noise label</td>
                <td className="px-6 py-4 text-sm text-slate-700">Usually assigns samples within the hierarchy</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Arbitrary Shapes</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Often strong for non-convex dense shapes</td>
                <td className="px-6 py-4 text-sm text-slate-700">Depends strongly on linkage + metric</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Scalability</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Depends on neighborhood search</td>
                <td className="px-6 py-4 text-sm text-slate-700">Can become expensive as n grows</td>
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
          Related density-based algorithms can address some limitations of a single global <code>eps</code>:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li><strong>HDBSCAN</strong> — combines density clustering across varying epsilon values and can better accommodate varying densities.</li>
          <li><strong>OPTICS</strong> — orders samples by density-based reachability so cluster structure can be explored across neighborhood scales.</li>
        </ul>
        <p className="text-lg leading-relaxed text-slate-800 mb-8">
          They are worth exploring when one fixed DBSCAN neighborhood scale is too restrictive.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common DBSCAN Mistakes</h2>
        <ol className="list-decimal pl-6 text-lg text-slate-800 space-y-3 mb-8">
          <li><strong>Forgetting that min_samples includes the point itself</strong> in Scikit-learn.</li>
          <li><strong>Ignoring feature scale</strong> when using a distance metric.</li>
          <li><strong>Treating every -1 label as a confirmed anomaly.</strong> It is only noise under the chosen density settings.</li>
          <li><strong>Calling the k-distance elbow “the optimal eps.”</strong> It is a heuristic candidate that still needs validation.</li>
          <li><strong>Expecting one eps to fit clusters with very different densities.</strong> Consider OPTICS or HDBSCAN when density varies strongly.</li>
        </ol>
      </div>

      <div id="dbscan-faq" className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick FAQs</h2>
        <div className="space-y-4">
          <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Does DBSCAN need the number of clusters first?</summary>
            <p className="mt-3 text-slate-700">No. You choose density parameters such as eps and min_samples; the number of resulting clusters emerges from those settings and the data.</p>
          </details>
          <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Does DBSCAN always find arbitrary-shaped clusters?</summary>
            <p className="mt-3 text-slate-700">It can represent many non-convex shapes, but results still depend on density, feature representation, distance metric, eps and min_samples. Strongly varying cluster densities can be difficult.</p>
          </details>
          <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Does a DBSCAN noise point mean fraud?</summary>
            <p className="mt-3 text-slate-700">No. It only means that the point did not belong to a sufficiently dense region under the chosen parameters.</p>
          </details>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10" id="where-next">
        <h2 className="text-2xl font-bold text-indigo-900 mb-3">Where to Go Next</h2>
        <p className="text-slate-800 mb-3">Connect DBSCAN with the surrounding lessons:</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/feature-scaling" className="text-indigo-700 underline font-medium">Feature Scaling</a>
          <a href="/learn/kmeans" className="text-indigo-700 underline font-medium">K-Means</a>
          <a href="/learn/hierarchical" className="text-indigo-700 underline font-medium">Hierarchical Clustering</a>
          <a href="/learn/pca" className="text-indigo-700 underline font-medium">PCA</a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        DBSCAN is a density-based clustering algorithm that expands clusters from dense neighborhoods and can label sufficiently sparse samples as noise. It does not require a predefined final cluster count and can represent many non-convex shapes when the data fits its density assumptions.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The two central parameters are <strong>eps</strong> and <strong>min_samples</strong>. Together they determine core points, border points, and final noise points.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10" id="final-insight">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Think of DBSCAN as <strong>“find dense neighborhoods and connect them.”</strong> Its results are only as meaningful as the chosen features, distance metric, scaling and density parameters, so always inspect and validate the discovered structure.
        </p>
      </div>

    </>
  );
}
