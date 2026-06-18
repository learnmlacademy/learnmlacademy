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
        KNN operates on a few distinct principles:
      </p>
      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
        <ul className="list-none space-y-4 text-slate-700 text-lg">
          <li><strong className="text-indigo-900">Lazy Learning Algorithm:</strong> It does not learn a model immediately during training. It simply memorizes the dataset and does all the computational heavy-lifting during the prediction phase.</li>
          <li><strong className="text-indigo-900">Instance-Based Learning:</strong> It doesn't formulate an internal model or function. Instead, it predicts outcomes based on exact instances from the training data.</li>
          <li><strong className="text-indigo-900">Distance-Based Algorithm:</strong> Uses distance metrics (like finding the physical distance between two points) to quantify similarity mathematically.</li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Real-world Analogy */}
      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        Real-Life Intuition (Local Similarity)
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The core assumption of K-Nearest Neighbors is beautifully simple: <span className="text-lg text-slate-700 italic font-medium">"Similar data points exist close to each other."</span>
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
              aria-label="KNN scatter plot showing blue triangle class A pass students and red circle class B fail students with query point Q and dashed radius for k equals 5">
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
              <circle cx="248" cy="165" r="82" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="6 3"/>
              <text x="333" y="95" fontSize="9" fill="#6366f1" fontWeight="700">K=5 search radius</text>
              {/* Lines to 5 nearest */}
              {[[168,128,'#3b82f6'],[195,102,'#3b82f6'],[158,78,'#3b82f6'],[308,198,'#ef4444'],[338,158,'#ef4444']].map(([nx,ny,col],i)=>(
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
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-red-700 mb-1">K = 1</p>
              <p className="text-xs font-bold text-red-800 mb-2 uppercase tracking-wide">Overfitting risk</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">Only 1 neighbour. Extremely sensitive to noise and outliers. Decision boundary is jagged.</p>
              <div className="bg-red-100 rounded-lg px-2 py-1.5 text-xs font-mono text-red-900">1 Red → Predict Red</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-emerald-700 mb-1">K = 5</p>
              <p className="text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Balanced (ideal)</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">5 neighbours vote. Smoother boundary, good generalisation. Industry starting point.</p>
              <div className="bg-emerald-100 rounded-lg px-2 py-1.5 text-xs font-mono text-emerald-900">3 Blue + 2 Red → Blue ✓</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-amber-700 mb-1">K = 15</p>
              <p className="text-xs font-bold text-amber-800 mb-2 uppercase tracking-wide">Underfitting risk</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">Too many neighbours. Overly smooth boundary misses local patterns in data.</p>
              <div className="bg-amber-100 rounded-lg px-2 py-1.5 text-xs font-mono text-amber-900">8 Blue + 7 Red → barely Blue</div>
            </div>
          </div>
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
        <strong className="text-emerald-900 block bg-emerald-100 p-2 rounded text-center">Prediction = 120k (Average)</strong>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Complete Workflow */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <TrendingUp className="mr-2 text-blue-600" /> Complete KNN Workflow
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        KNN basically has <em>no actual training phase</em>. Standard algorithms learn models first and predict later. KNN stores data first and calculates distances lazily at prediction time.
      </p>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Prediction Workflow</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-indigo-600 marker:font-bold">
              <li><strong>Store Training Data:</strong> The algorithm loads the dataset into memory.</li>
              <li><strong>Receive New Data:</strong> A new, unseen data point is presented.</li>
              <li><strong>Calculate Distances:</strong> Math is utilized to find the distance from the new point to EVERY stored point.</li>
              <li><strong>Sort & Select Top K:</strong> The distances are sorted ascendingly to locate the closest neighbors.</li>
              <li><strong>Generate Prediction:</strong> Run majority vote (classification) or average (regression).</li>
            </ol>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Distance Metrics */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Maximize className="mr-2 text-indigo-600" /> Distance Metrics in KNN (The Math)
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Distance measurement is the core computational engine of KNN. The algorithm must determine, mathematically, which points are nearest. Here are the three primary methods to calculate distance:
      </p>

      {/* Euclidean */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        1. Euclidean Distance
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded ml-3 align-middle tracking-wider uppercase">Most Common</span>
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Measures the "straight-line" physical distance between two points in geometry. It utilizes the Pythagorean theorem in N-dimensional space.
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

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Choosing K */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Choosing the Optimal Value of K
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Selecting the correct value of K is arguably the most critical configuration step when building a KNN system. Extreme values of K lead to underfitting or overfitting.
      </p>

      <ul className="space-y-6 text-lg text-slate-700 leading-relaxed mb-8">
        <li>
          <strong className="text-red-700">Small K (e.g., K = 1):</strong> Reacts heavily to outliers and noisy data. Leads to High Variance, Low Bias, and typically results in Overfitting.
        </li>
        <li>
          <strong className="text-blue-700">Large K (e.g., K = 50):</strong> Averages out the output, ignoring local structures. Leads to High Bias, Low Variance, and results in Underfitting ("oversmoothing").
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-6">
        Methods for Selecting K
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        There are three primary techniques used to determine the best value for K. Each has its place depending on the size of your dataset and the computing power available.
      </p>

      <h4 className="text-xl font-bold text-slate-800 mb-4">
        1. The Square Root Heuristic
      </h4>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The square root heuristic is a quick, basic mathematical rule of thumb. While not as mathematically rigorous as cross-validation, it gives an excellent starting point for K without requiring any machine learning code or iterative testing.
      </p>
      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 text-base sm:text-lg">
        <p className="font-bold text-blue-900 mb-2">Step-by-Step:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-4">
          <li>Count the total number of samples (rows) in your training dataset (<code className="bg-white px-1">N</code>).</li>
          <li>Calculate the square root of <code className="bg-white px-1">N</code>.</li>
          <li>If the result is even, add or subtract 1 to make it odd (preventing tie votes in binary classification).</li>
        </ol>
        <p className="font-bold text-blue-900 border-t border-blue-200 pt-4 mb-2">Practical Example:</p>
        <div className="font-mono text-slate-800 space-y-1">
          <p>Training set rows (N) = 1,000</p>
          <p>√1,000 ≈ 31.62</p>
          <p>Round to nearest whole number = 32</p>
          <p>Since 32 is even, we adjust to nearest odd number for tie-breaking.</p>
          <p className="text-blue-700 font-bold mt-2">Optimal starting K ≈ 31 or 33</p>
        </div>
      </div>

      <h4 className="text-xl font-bold text-slate-800 mb-4 mt-10">
        2. K-Fold Cross Validation
      </h4>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Cross-validation is the most statistically rigorous method for selecting K. Instead of guessing, we systematically test a range of K values and evaluate how well each one performs on a hold-out test validation set. 
      </p>
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-base sm:text-lg">
        <p className="font-bold text-emerald-900 mb-2">Step-by-Step:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-4">
          <li>Define a range of odd K values to test (e.g., K = 1, 3, 5, 7, 9, 11).</li>
          <li>For each K value, train the KNN model using the training data subset.</li>
          <li>Evaluate the accuracy of the model on the unseen validation subset.</li>
          <li>Select the K value that yields the highest accuracy (or lowest error).</li>
        </ol>
        <p className="font-bold text-emerald-900 border-t border-emerald-200 pt-4 mb-2">Practical Example (Testing Range 1-9):</p>
        <div className="bg-white p-4 font-mono text-sm sm:text-base border border-emerald-200 rounded">
          <p className="text-slate-600 mb-1">Iteration 1: K=1 {`->`} Accuracy: 82%</p>
          <p className="text-slate-600 mb-1">Iteration 2: K=3 {`->`} Accuracy: 87%</p>
          <p className="text-emerald-700 font-bold bg-emerald-100 p-2 mb-1 shadow-sm rounded">Iteration 3: K=5 {`->`} Accuracy: 91% (Peak Performance)</p>
          <p className="text-slate-600 mb-1">Iteration 4: K=7 {`->`} Accuracy: 89%</p>
          <p className="text-slate-600 mb-1">Iteration 5: K=9 {`->`} Accuracy: 86%</p>
          <p className="text-slate-800 font-bold mt-4">Conclusion: We implement the final model with K=5.</p>
        </div>
      </div>

      <h4 className="text-xl font-bold text-slate-800 mb-4 mt-10">
        3. The Elbow Method (Visualization)
      </h4>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The Elbow Method is a visual approach heavily utilized in data science. We plot the error rate for various values of K on a line chart. We look for the "elbow" point—the point where the error drops drastically and then begins to plateau or stabilize. 
      </p>
      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-base sm:text-lg">
        <p className="font-bold text-amber-900 mb-2">Step-by-Step:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
          <li>Compute the error rate (1 - Accuracy) for a wide range of K values.</li>
          <li>Plot K values on the X-axis and Error Rate on the Y-axis.</li>
          <li>Find the K value where the graph sharply bends and flattens out (the elbow).</li>
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
          Notice how the error rate aggressively drops as we move from K=1 to K=5. After K=5, the error rate stabilizes and fluctuates slightly. Therefore, K=5 is the optimal "elbow" in this visualization.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Code Implementation */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-3 text-indigo-600" /> Implementation in Python
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is a complete practical pipeline utilizing standard Scikit-Learn tools. Notice the critical feature scaling phase.
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

# 1. Dataset setup
data = {
    'Age': [22, 25, 47, 52, 46, 56, 31, 45, 33, 40],
    'Salary': [20000, 25000, 50000, 60000, 52000, 65000, 30000, 48000, 35000, 42000],
    'Buy': [0, 0, 1, 1, 1, 1, 0, 1, 0, 1] 
}
df = pd.DataFrame(data)

X = df[['Age', 'Salary']]
y = df['Buy']

# 2. Mandatory Feature Scaling (Mean=0, Variance=1)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X) 

# 3. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# 4. Initialize and fit KNN with K=3
model = KNeighborsClassifier(n_neighbors=3, weights='uniform')
model.fit(X_train, y_train)

# 5. Predict & Evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"Predictions: {predictions}")
print(f"Model Accuracy Evaluated at: {accuracy * 100}%")`}</code>
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
          <p className="text-slate-300">Predictions: [1 0]</p>
          <p className="text-slate-300">Model Accuracy Evaluated at: 100.0%</p>
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
             <li><strong>No Training Overhead:</strong> Extremely fast initial setup as there is no real training loop.</li>
             <li><strong>Flexible Boundaries:</strong> Automatically adapts to complex, highly non-linear data natively.</li>
             <li><strong>Versatile:</strong> Supports both robust classification and regression pipelines.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Expensive Predictions:</strong> Inference is extremely slow for large datasets.</li>
             <li><strong>Curse of Dimensionality:</strong> Fails catastrophically on high-dimensional data (many columns).</li>
             <li><strong>Fragile to Scale:</strong> Needs rigorous feature standardization/scaling or it breaks mathematically.</li>
             <li><strong>Memory Intensive:</strong> The entire dataset must be stored in memory constantly.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        K-Nearest Neighbors is a beautifully intuitive machine learning algorithm based purely on proximity. Rather than determining an explicit mathematical equation during training, it simply memorizes the data and "votes" based on the closest records during prediction.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        While it struggles efficiently handling very high-dimensional data and massive datasets due to intense distance calculations, it remains highly effective for simpler localized datasets and sets a strong baseline for complex problem spaces.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "KNN does not actively 'learn' generalized patterns during a training phase; it merely uses the existing data as a map, making distance the single most critical factor in its predictions."
         </p>
      </div>

    </>
  );
}
