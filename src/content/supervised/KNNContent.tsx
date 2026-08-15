import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Target, TrendingUp, AlertTriangle, Lightbulb, Calculator, Code, 
  CheckCircle, Activity, Maximize, Scissors, Binary, ArrowDown, Layers, MapPin, X as CloseIcon, Check
} from 'lucide-react';

export function KNNContent() {
  const elbowData = [
    { k: 1, error: 0.35 },
    { k: 3, error: 0.22 },
    { k: 5, error: 0.12 },
    { k: 7, error: 0.13 },
    { k: 9, error: 0.14 },
    { k: 11, error: 0.15 },
    { k: 13, error: 0.16 },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">K-Nearest Neighbors</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 rounded-r-md shadow-sm">
        K-Nearest Neighbors (KNN) is an algorithm used for both classification and regression tasks. Unlike many algorithms, it does not build a complex internal model but relies directly on the distance between data points to make predictions.</p>

      {/* Simple-first explanation */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        KNN in Simple Words
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        KNN answers a simple question: <strong>“Which known examples are closest to this new example?”</strong>
        It then uses those nearby examples to make a prediction.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-4 gap-3 my-6">
        {[
          ['1', 'New Example', 'A new data point arrives'],
          ['2', 'Measure Distance', 'Compare it with known points'],
          ['3', 'Choose K Neighbours', 'Keep the closest K examples'],
          ['4', 'Predict', 'Vote or take an average'],
        ].map(([step, title, text]) => (
          <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">{step}</div>
            <p className="font-bold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-3">A Tiny Student Example</h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Suppose we use only <strong>study hours</strong> to keep the first example easy. Past students are: 
      </p>
      <div className="overflow-x-auto mb-5">
        <table className="min-w-full border-collapse text-left text-base">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 px-4 py-2">Study Hours</th>
              <th className="border border-slate-200 px-4 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {[[1, 'Fail'], [2, 'Fail'], [4, 'Pass'], [5, 'Pass']].map(([hours, result]) => (
              <tr key={String(hours)}>
                <td className="border border-slate-200 px-4 py-2">{hours}</td>
                <td className="border border-slate-200 px-4 py-2">{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 mb-8">
        <p className="font-bold text-indigo-900 mb-3">New student: 3.6 study hours, K = 3</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700">
          <li>The three closest study-hour values are <strong>4, 5, and 2</strong>.</li>
          <li>Their results are <strong>Pass, Pass, Fail</strong>.</li>
          <li>Pass gets 2 votes and Fail gets 1 vote.</li>
        </ol>
        <p className="mt-4 font-bold text-indigo-900">Prediction: Pass</p>
        <p className="mt-2 text-sm text-slate-600">Real KNN problems can use many features. We start with one feature only so the idea is easy to see.</p>
      </div>

      {/* What is KNN? */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-2 text-indigo-600" /> What is K-Nearest Neighbors?
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        KNN is a supervised machine learning algorithm that predicts the output of a new, unseen data point by looking at the closest (nearest) data points in the training dataset.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-3">
        Algorithm Characteristics
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        KNN is commonly described using a few useful ideas:
      </p>
      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
        <ul className="list-none space-y-4 text-slate-700 text-lg">
          <li><strong className="text-indigo-900">Lazy / Instance-Based Learning:</strong> KNN does not fit a compact equation or tree of decision rules. It keeps the training examples and performs most of its work when a new point must be predicted.</li>
          <li><strong className="text-indigo-900">Local Prediction:</strong> The prediction depends mainly on training examples located near the new point, rather than on one global formula.</li>
          <li><strong className="text-indigo-900">Distance-Based Algorithm:</strong> A distance metric is used to define what “near” means mathematically.</li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Real-world Analogy */}
      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        Real-Life Intuition (Local Similarity)
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The core intuition of K-Nearest Neighbors is simple: <span className="text-lg text-slate-700 italic font-medium">"Nearby examples may have similar outputs."</span> This is useful only when the chosen features and distance metric make “nearby” meaningful.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        <strong>Analogy: The New Student.</strong> Suppose a new student joins a school. To predict the student's interests, observers evaluate: <em>Who are the student's closest friends?</em> If most nearby students (friends) play sports, it is highly likely the new student will too. KNN uses this exact principle.
      </p>

      {/* KNN Scatter Visual */}
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
            Figure 1 — KNN Classification: Query Point Q Votes from 5 Nearest Neighbours
          </figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <svg viewBox="0 0 500 310" className="w-full max-w-lg mx-auto block"
              aria-label="KNN scatter plot showing a new query point and its five nearest labelled neighbours">
              {[80,140,200,260,320,380,440].map(v=>(
                <g key={v}>
                  <line x1={v} y1="15" x2={v} y2="272" stroke="#f1f5f9" strokeWidth="1"/>
                </g>
              ))}
              <line x1="40" y1="272" x2="470" y2="272" stroke="#94a3b8" strokeWidth="1.5"/>
              <line x1="40" y1="15" x2="40" y2="272" stroke="#94a3b8" strokeWidth="1.5"/>
              <text x="255" y="292" textAnchor="middle" fontSize="10" fill="#94a3b8">Feature 1 (Study Hours)</text>
              <text x="14" y="148" textAnchor="middle" fontSize="10" fill="#94a3b8" transform="rotate(-90,14,148)">Feature 2 (Assignment Score)</text>
              {/* Class A Blue Triangles */}
              {[[80,232],[110,195],[125,178],[92,165],[148,148],[168,128],[122,128],[195,102],[158,78]].map(([x,y],i)=>(
                <polygon key={"a"+i} points={(x)+","+(y-10)+" "+(x-9)+","+(y+7)+" "+(x+9)+","+(y+7)}
                  fill="#3b82f6" fillOpacity="0.85" stroke="#1d4ed8" strokeWidth="0.8"/>
              ))}
              {/* Class B Red Circles */}
              {[[328,232],[358,215],[308,198],[378,178],[338,158],[398,232],[418,198],[368,128],[428,148]].map(([x,y],i)=>(
                <circle key={"b"+i} cx={x} cy={y} r="7" fill="#ef4444" fillOpacity="0.85" stroke="#b91c1c" strokeWidth="0.8"/>
              ))}
              {/* Search radius */}
              <circle cx="248" cy="165" r="105" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="6 3"/>
              <text x="345" y="78" fontSize="9" fill="#6366f1" fontWeight="700">Circle reaches the 5th neighbour</text>
              {/* Lines to 5 nearest */}
              {[[168,128,'#3b82f6'],[195,102,'#3b82f6'],[148,148,'#3b82f6'],[308,198,'#ef4444'],[338,158,'#ef4444']].map(([nx,ny,col],i)=>(
                <line key={"l"+i} x1="248" y1="165" x2={nx} y2={ny}
                  stroke={col} strokeWidth="1.2" strokeDasharray="4 2" opacity="0.7"/>
              ))}
              {/* Query point */}
              <circle cx="248" cy="165" r="11" fill="#7c3aed" stroke="white" strokeWidth="2"/>
              <text x="248" y="169" textAnchor="middle" fontSize="10" fill="white" fontWeight="800">Q</text>
              <text x="263" y="158" fontSize="9" fill="#7c3aed" fontWeight="700">New point</text>
              <text x="255" y="294" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="600">3 Blue (Pass) + 2 Red (Fail) inside radius → Majority Vote → Predict: Pass ▲</text>
            </svg>
          </div>
        </figure>
      </div>

      {/* Effect of K */}
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
            Figure 2 — Effect of K Value on the Prediction Decision
          </figcaption>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-red-700 mb-1">K = 1</p>
              <p className="text-xs font-bold text-red-800 mb-2 uppercase tracking-wide">Overfitting risk</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">Only 1 neighbour. Extremely sensitive to noise and outliers. Decision boundary is jagged.</p>
              <div className="bg-red-100 rounded-lg px-2 py-1.5 text-xs font-mono text-red-900">1 Red → Predict Red</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-emerald-700 mb-1">K = 5</p>
              <p className="text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Middle-sized example</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">Five neighbours vote. This can be less sensitive than K=1, but whether K=5 is good must be checked on validation data.</p>
              <div className="bg-emerald-100 rounded-lg px-2 py-1.5 text-xs font-mono text-emerald-900">3 Blue + 2 Red → Blue ✓</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-amber-700 mb-1">K = 15</p>
              <p className="text-xs font-bold text-amber-800 mb-2 uppercase tracking-wide">Underfitting risk</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">A larger neighbourhood can smooth local patterns. If K becomes too large for the dataset, underfitting can occur.</p>
              <div className="bg-amber-100 rounded-lg px-2 py-1.5 text-xs font-mono text-amber-900">8 Blue + 7 Red → barely Blue</div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">These K values are illustrations, not universal rules.</p>
        </figure>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        Meaning of "K" and "Nearest Neighbors"
      </h3>
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-6">
        <p className="text-lg text-emerald-900 mb-2">
          <strong>The "K"</strong> represents the predefined number of nearest neighbors considered during prediction.
        </p>
        <code className="text-sm font-mono text-emerald-800 bg-emerald-100 px-2 py-1 rounded">
          Example: K = 3 implies "consider the 3 closest neighbors"
        </code>
      </div>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-lg text-blue-900 mb-2">
          <strong>"Nearest Neighbors"</strong> refers to the actual data points from the training set that have the shortest mathematical distance to the new test point.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Regression vs Classification */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Binary className="mr-2 text-indigo-600" /> KNN Classification vs Regression
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        KNN is unique because it handles both classification (predicting categories) and regression (predicting continuous numbers) using the same underlying distance concept.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        1. Classification (Categories)
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Used when the output belongs to distinct classes (e.g., Spam / Not Spam).
      </p>
      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-indigo-900 mb-2">Prediction Rule: Majority Voting</p>
        <p className="text-indigo-800 mb-4">
          If <code>K = 5</code>, and the nearest neighbors are: Red, Red, Blue, Red, Blue.
        </p>
        <strong className="text-indigo-900 block bg-indigo-100 p-2 rounded text-center">Prediction = Red (Majority)</strong>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        2. Regression (Numerical)
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Used when predicting continuous numerical targets (e.g., House Prices).
      </p>
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-emerald-900 mb-2">Prediction Rule: Average Value</p>
        <p className="text-emerald-800 mb-4">
          If <code>K = 5</code>, and nearest neighbor house values are: 100k, 120k, 110k, 130k, 140k.
        </p>
        <div className="bg-white border border-emerald-200 rounded-lg p-4 font-mono text-base text-slate-800 space-y-1">
          <p>Step 1: 100 + 120 + 110 + 130 + 140 = 600</p>
          <p>Step 2: 600 ÷ 5 = 120</p>
          <p className="font-bold text-emerald-800">Prediction = 120k</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Complete Workflow */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <TrendingUp className="mr-2 text-blue-600" /> Complete KNN Workflow
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        KNN is called a <em>lazy learner</em> because it does not learn a compact predictive equation during fitting. Its <code>fit()</code> step stores the training examples and may prepare a neighbour-search structure; most of the prediction work happens when a query point arrives.
      </p>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Prediction Workflow</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-indigo-600 marker:font-bold">
              <li><strong>Fit / Store Training Examples:</strong> The estimator keeps the labelled examples and may build a search structure.</li>
              <li><strong>Receive New Data:</strong> A new, unseen data point is presented.</li>
              <li><strong>Find Nearby Points:</strong> The estimator uses the chosen distance metric and neighbour-search method to locate close training examples.</li>
              <li><strong>Select the K Nearest:</strong> Keep the nearest <code>K</code> training examples.</li>
              <li><strong>Generate Prediction:</strong> Use a class vote (classification) or a local average/interpolation (regression).</li>
            </ol>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Distance Metrics */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Maximize className="mr-2 text-indigo-600" /> Distance Metrics in KNN (The Math)
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Distance measurement is central to KNN because it determines which training examples count as neighbours. Below are two common distance calculations. Scikit-learn also supports the broader Minkowski family and other metrics.
      </p>

      {/* Euclidean */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        1. Euclidean Distance
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded ml-3 align-middle tracking-wider uppercase">Common</span>
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Measures straight-line distance between two points. In two dimensions, it is the familiar Pythagorean-distance calculation; the same idea extends to more features.
      </p>
      
      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="font-bold text-slate-900 mb-3">Formula</p>
        <code className="text-2xl font-mono text-slate-900 block font-bold mb-4">
          d = √( ∑(x_i - y_i)² )
        </code>
        <p className="font-bold text-slate-900 border-t border-slate-200 pt-4 mb-2">Worked Example [Points: A(2,3) & B(6,7)]</p>
        <div className="font-mono text-lg text-slate-800 space-y-1">
          <p>d = √( (6 - 2)² + (7 - 3)² )</p>
          <p>d = √( (4)² + (4)² )</p>
          <p>d = √( 16 + 16 ) = √32</p>
          <p className="text-indigo-700 font-bold mt-2">d ≈ 5.66</p>
        </div>
      </div>

      {/* Manhattan */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        2. Manhattan Distance (City Block)
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Measures movement along strictly horizontal and vertical grid lines. Think of it as how a taxicab moves through city blocks, unable to cut diagonally through buildings.
      </p>
      
      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="font-bold text-slate-900 mb-3">Formula</p>
        <code className="text-2xl font-mono text-slate-900 block font-bold mb-4">
          d = ∑ | x_i - y_i |
        </code>
        <p className="font-bold text-slate-900 border-t border-slate-200 pt-4 mb-2">Worked Example [Points: A(2,3) & B(6,7)]</p>
        <div className="font-mono text-lg text-slate-800 space-y-1">
          <p>d = |6 - 2| + |7 - 3|</p>
          <p>d = |4| + |4|</p>
          <p className="text-emerald-700 font-bold mt-2">d = 8</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-4 mt-10">Why Feature Scaling Matters in KNN</h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Distance compares numeric differences. If one feature is measured in much larger numbers, it can dominate the distance even when it is not more important.
      </p>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse text-left text-base">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 px-4 py-2">Feature</th>
              <th className="border border-slate-200 px-4 py-2">Student A</th>
              <th className="border border-slate-200 px-4 py-2">Student B</th>
              <th className="border border-slate-200 px-4 py-2">Raw difference</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 px-4 py-2">Age</td><td className="border border-slate-200 px-4 py-2">20</td><td className="border border-slate-200 px-4 py-2">25</td><td className="border border-slate-200 px-4 py-2">5</td></tr>
            <tr><td className="border border-slate-200 px-4 py-2">Salary</td><td className="border border-slate-200 px-4 py-2">₹30,000</td><td className="border border-slate-200 px-4 py-2">₹50,000</td><td className="border border-slate-200 px-4 py-2">20,000</td></tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-8">
        <p className="font-bold text-amber-900 mb-2">What would happen with raw Euclidean distance?</p>
        <p className="text-slate-700">The salary difference is numerically much larger than the age difference, so salary would dominate the calculation. Scaling puts features onto more comparable numerical scales when their units differ greatly.</p>
        <p className="text-sm text-slate-600 mt-2">Scaling is especially important for distance-based methods such as KNN. Fit the scaler on training data only, then transform validation/test data with the same scaler.</p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-4">Uniform Vote vs Distance-Weighted Vote</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="font-bold text-slate-900 mb-2">Uniform weights</p>
          <p className="text-slate-700">Every selected neighbour gets the same vote.</p>
          <code className="mt-3 block rounded bg-slate-100 px-3 py-2 text-sm">weights='uniform'</code>
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-bold text-indigo-900 mb-2">Distance weights</p>
          <p className="text-slate-700">Closer neighbours receive more influence than farther neighbours.</p>
          <code className="mt-3 block rounded bg-white px-3 py-2 text-sm">weights='distance'</code>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Choosing K */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Choosing a Useful Value of K
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        The value of K controls how local or smooth the prediction is. There is no universally best K: choose it using validation or cross-validation for the dataset and metric you care about.
      </p>

      <ul className="space-y-6 text-lg text-slate-700 leading-relaxed mb-8">
        <li>
          <strong className="text-red-700">Small K (for example K = 1):</strong> Can be very sensitive to individual noisy points and often has higher variance.
        </li>
        <li>
          <strong className="text-blue-700">Large K:</strong> Uses a broader neighbourhood and produces smoother predictions. If K is too large relative to the dataset, useful local patterns can be lost and underfitting can occur.
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-6">
        Methods for Selecting K
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        A rough heuristic can suggest values to try, but validation or cross-validation is the more dependable way to choose K. A validation-error plot can then make the comparison easy to see.
      </p>

      <h4 className="text-xl font-bold text-slate-800 mb-4">
        1. The Square Root Heuristic
      </h4>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The square-root heuristic (<code>K ≈ √N</code>) is a rough rule of thumb sometimes used to generate a starting value to try. It is <strong>not</strong> an optimization rule and should not replace validation.
      </p>
      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 text-base sm:text-lg">
        <p className="font-bold text-blue-900 mb-2">Step-by-Step:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-4">
          <li>Count the total number of samples (rows) in your training dataset (<code className="bg-white px-1">N</code>).</li>
          <li>Calculate the square root of <code className="bg-white px-1">N</code>.</li>
          <li>For binary classification with uniform voting, you may also try nearby odd values to reduce the chance of an equal vote.</li>
        </ol>
        <p className="font-bold text-blue-900 border-t border-blue-200 pt-4 mb-2">Practical Example:</p>
        <div className="font-mono text-slate-800 space-y-1">
          <p>Training set rows (N) = 1,000</p>
          <p>√1,000 ≈ 31.62</p>
          <p>Round to nearest whole number ≈ 32</p>
          <p>Nearby candidates might include 31, 32 and 33.</p>
          <p className="text-blue-700 font-bold mt-2">These are candidates to validate — not guaranteed optimal values.</p>
        </div>
      </div>

      <h4 className="text-xl font-bold text-slate-800 mb-4 mt-10">
        2. K-Fold Cross Validation
      </h4>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Cross-validation is a practical way to compare candidate K values without using the final test set for model selection. The training data is repeatedly divided into training and validation folds, and each K is evaluated across those folds. 
      </p>
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-base sm:text-lg">
        <p className="font-bold text-emerald-900 mb-2">Step-by-Step:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-4">
          <li>Define a range of odd K values to test (e.g., K = 1, 3, 5, 7, 9, 11).</li>
          <li>For each K value, fit KNN on the training folds.</li>
          <li>Evaluate it on the corresponding validation fold.</li>
          <li>Average the validation scores across folds and select a K using the metric that matters for your task.</li>
        </ol>
        <p className="font-bold text-emerald-900 border-t border-emerald-200 pt-4 mb-2">Practical Example (Testing Range 1-9):</p>
        <div className="bg-white p-4 font-mono text-sm sm:text-base border border-emerald-200 rounded">
          <p className="text-slate-600 mb-1">Iteration 1: K=1 {`->`} Accuracy: 82%</p>
          <p className="text-slate-600 mb-1">Iteration 2: K=3 {`->`} Accuracy: 87%</p>
          <p className="text-emerald-700 font-bold bg-emerald-100 p-2 mb-1 shadow-sm rounded">Iteration 3: K=5 {`->`} Validation Accuracy: 91% (best in this toy example)</p>
          <p className="text-slate-600 mb-1">Iteration 4: K=7 {`->`} Accuracy: 89%</p>
          <p className="text-slate-600 mb-1">Iteration 5: K=9 {`->`} Accuracy: 86%</p>
          <p className="text-slate-800 font-bold mt-4">Conclusion: In this toy comparison, K=5 would be the candidate to carry forward and then evaluate once on untouched test data.</p>
        </div>
      </div>

      <h4 className="text-xl font-bold text-slate-800 mb-4 mt-10">
        3. Validation Error Curve (Visual Aid)
      </h4>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A simple visual aid is to plot validation error for the K values you tested. Prefer the value that performs well on validation data while avoiding an unnecessarily sensitive or overly smooth model.
      </p>
      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-base sm:text-lg">
        <p className="font-bold text-amber-900 mb-2">Step-by-Step:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
          <li>Compute validation error (for example, <code>1 - accuracy</code>) for a range of K values.</li>
          <li>Plot K on the X-axis and validation error on the Y-axis.</li>
          <li>Compare the curve and select a K supported by validation performance.</li>
        </ol>
        <div className="bg-white p-2 sm:p-4 border border-amber-200 rounded shadow-sm w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={elbowData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
              <XAxis dataKey="k" label={{ value: 'K Value (Neighbors)', position: 'insideBottom', offset: -10 }} tick={{fontSize: 14}} />
              <YAxis label={{ value: 'Error Rate', angle: -90, position: 'insideLeft', offset: -10 }} tick={{fontSize: 14}} />
              <Tooltip wrapperClassName="font-mono text-sm shadow border border-slate-200 rounded"/>
              <Line type="monotone" dataKey="error" stroke="#d97706" strokeWidth={4} activeDot={{ r: 8, fill: "#b45309", stroke: "white" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-slate-700 italic mt-6">
          In this illustration, validation error is lowest at K=5. That makes K=5 the strongest candidate among the values shown, but a different dataset can prefer a different K.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Code Implementation */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-3 text-indigo-600" /> Implementation in Python
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is a small Scikit-Learn pipeline. The important detail is the order: <strong>split first, then fit the scaler using training data only</strong>, and finally transform the test data with that same scaler.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h3 className="font-bold text-xl text-indigo-800">
            Python Code: KNN Classifier
          </h3>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 text-sm sm:text-base font-mono overflow-x-auto">
          <pre className="!m-0 leading-relaxed">
            <code>{`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# 1. Small teaching dataset
data = {
    'Age': [22, 25, 47, 52, 46, 56, 31, 45, 33, 40],
    'Salary': [20000, 25000, 50000, 60000, 52000, 65000, 30000, 48000, 35000, 42000],
    'Buy': [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]
}
df = pd.DataFrame(data)

X = df[['Age', 'Salary']]
y = df['Buy']

# 2. Split BEFORE learning scaling parameters
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Fit scaler on training data only
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. KNN with K=3
model = KNeighborsClassifier(
    n_neighbors=3,
    weights='uniform'
)
model.fit(X_train_scaled, y_train)

# 5. Predict and evaluate
predictions = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, predictions)

print(f"Predictions: {predictions}")
print(f"Accuracy: {accuracy:.2f}")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">$ python knn_model.py</p>
          <p className="text-slate-300">Predictions: [0 1]</p>
          <p className="text-slate-300">Accuracy: 1.00</p>
          <p className="text-amber-300 mt-2">This tiny dataset is intentionally easy. A 1.00 score here is not evidence that KNN will be perfect on real data.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Pros Cons */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Advantages vs Disadvantages
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 mt-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Simple:</strong> Easy to logically understand and implement.</li>
             <li><strong>Little Model Fitting:</strong> There is no large parametric training loop; fitting mainly stores examples and may prepare a search structure.</li>
             <li><strong>Local, Non-linear Behaviour:</strong> KNN can represent flexible local decision boundaries when the distance measure is meaningful.</li>
             <li><strong>Versatile:</strong> Supports both classification and regression.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Prediction Cost:</strong> Neighbour searches can become expensive as the number of stored examples grows.</li>
             <li><strong>Curse of Dimensionality:</strong> Distance can become less informative in high-dimensional spaces, which can reduce KNN effectiveness.</li>
             <li><strong>Sensitive to Feature Scale:</strong> Features measured on very different numerical scales can distort distance unless handled appropriately.</li>
             <li><strong>Storage:</strong> KNN retains the training examples, so memory/storage requirements grow with the dataset.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FAQs and next steps */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Common KNN Questions
      </h2>
      <div className="space-y-4 mb-10">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="font-bold text-slate-900">Does KNN always need feature scaling?</p>
          <p className="mt-2 text-slate-700">Scaling is usually very important when numeric features use very different units because KNN relies directly on distance. If features are already meaningfully comparable, the exact preprocessing choice can differ.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="font-bold text-slate-900">Is K=5 always a good choice?</p>
          <p className="mt-2 text-slate-700">No. K=5 is a common teaching example, not a rule. Compare several K values using validation or cross-validation.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="font-bold text-slate-900">Why can KNN struggle with many features?</p>
          <p className="mt-2 text-slate-700">In high-dimensional spaces, points can all start to look far apart in similar ways. This is part of the <strong>curse of dimensionality</strong>, and it can make neighbourhoods less informative.</p>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 mb-10">
        <p className="font-bold text-indigo-900 mb-2">Continue learning</p>
        <p className="text-slate-700 leading-relaxed">
          Review <a className="font-semibold text-indigo-700 underline" href="/learn/feature-scaling">Feature Scaling</a>, compare KNN with other methods in <a className="font-semibold text-indigo-700 underline" href="/learn/classification-intro">Classification Algorithms Overview</a>, and use <a className="font-semibold text-indigo-700 underline" href="/learn/cross-validation">Cross-Validation</a> to choose K more reliably.
        </p>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        K-Nearest Neighbors is an intuitive machine learning algorithm based on proximity. Rather than fitting a compact predictive equation during training, it retains the training examples and uses nearby records to guide predictions.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        KNN can work well when meaningful nearby examples exist, but prediction cost, feature scaling, the choice of K, the distance metric, and high dimensionality all matter. Its simplicity also makes it a useful baseline for suitable small-to-medium problems.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "KNN predicts locally: define a meaningful distance, find nearby labelled examples, and let those neighbours guide the prediction."
         </p>
      </div>

    </>
  );
}
