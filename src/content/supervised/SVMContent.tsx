import React from 'react';
import { 
  Lightbulb, 
  Goal, 
  Layers, 
  Maximize, 
  Link, 
  ShieldCheck, 
  Check, 
  X as CloseIcon, 
  Activity, 
  TextSelect, 
  Banknote, 
  Code
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

export function SVMContent() {
  const classA = [
    { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 2 }, { x: 3.5, y: 6 }, { x: 2.5, y: 8 },
    { x: 4, y: 4 }, { x: 4, y: 5 } // Support vectors
  ];
  const classB = [
    { x: 7, y: 4 }, { x: 8, y: 6 }, { x: 9, y: 2 }, { x: 6.5, y: 7 }, { x: 8.5, y: 8 },
    { x: 6, y: 3 }, { x: 6, y: 5 } // Support vectors
  ];

  // Fixed points keep the teaching visual identical on every page load.
  const innerCircle = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    return { x: 5 + 1.5 * Math.cos(angle), y: 5 + 1.5 * Math.sin(angle) };
  });

  const outerCircle = Array.from({ length: 32 }, (_, i) => {
    const angle = (i / 32) * Math.PI * 2;
    return { x: 5 + 4 * Math.cos(angle), y: 5 + 4 * Math.sin(angle) };
  });

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Support Vector Machine</h1>
      
      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">Support Vector Machine (SVM) is a supervised machine learning algorithm used for classification and regression tasks.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        SVM is considered an elegant algorithm in Machine Learning because it combines <strong>Geometry, Optimization, Linear Algebra, and Statistics</strong> into a single predictive framework.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        For classification, SVM looks for a separating boundary with a <strong>wide margin</strong> between classes. With soft-margin SVM, it can also allow some margin violations so the model can handle overlapping or noisy data.
      </p>

      {/* SIMPLE FIRST-PASS EXPLANATION */}
      <section className="bg-white border border-indigo-100 rounded-xl p-5 sm:p-6 mb-10 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">SVM in Simple Words</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Imagine two groups of students standing on opposite sides of a playground. You want to draw a line between them. SVM prefers a line that leaves a <strong>comfortable gap</strong> on both sides instead of placing the divider very close to one group.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
          <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
            <p className="font-bold text-slate-800 mb-3">1. See Two Classes</p>
            <div className="font-mono text-lg tracking-wider">
              <span className="text-rose-600">● ● ●</span>
              <span className="mx-3 text-slate-400">&nbsp;</span>
              <span className="text-blue-600">▲ ▲ ▲</span>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
            <p className="font-bold text-slate-800 mb-3">2. Draw a Separator</p>
            <div className="font-mono text-lg tracking-wider">
              <span className="text-rose-600">● ●</span>
              <span className="mx-3 text-slate-700 font-bold">|</span>
              <span className="text-blue-600">▲ ▲</span>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
            <p className="font-bold text-slate-800 mb-3">3. Keep a Wide Gap</p>
            <div className="font-mono text-sm sm:text-base">
              <span className="text-rose-600">● ●</span>
              <span className="mx-2 text-slate-500">← gap →</span>
              <span className="text-slate-700 font-bold">|</span>
              <span className="mx-2 text-slate-500">← gap →</span>
              <span className="text-blue-600">▲ ▲</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Word</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Simple Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr><td className="px-4 py-3 font-semibold">Hyperplane</td><td className="px-4 py-3">The separating boundary</td></tr>
              <tr><td className="px-4 py-3 font-semibold">Margin</td><td className="px-4 py-3">The gap around that boundary</td></tr>
              <tr><td className="px-4 py-3 font-semibold">Support vectors</td><td className="px-4 py-3">Training points closest to the boundary that help determine it</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY SVM WAS CREATED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-2 text-indigo-600" /> Why SVM Was Created
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Imagine you have two categories of data points: <strong>Red points</strong> and <strong>Blue points</strong>. Your task is to separate them using a line. Many machine learning algorithms can separate the points, but SVM asks a more intelligent question:
      </p>
      
      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-xl text-indigo-900 font-medium italic mb-2">
          "Among all possible separating lines, which line is the safest and most reliable?"
        </p>
        <p className="text-lg text-indigo-800">
          For linearly separable data, the maximum-margin idea chooses the separating boundary that leaves the widest possible margin. With noisy or overlapping data, soft-margin SVM balances a wide margin against classification violations.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Real-Life Intuition of SVM
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Suppose two groups of students are standing in a playground. One group likes cricket, another group likes football. You want to place a divider between them. Now imagine three possible dividers:
      </p>
      <ul className="list-disc pl-5 mb-4 text-slate-700 space-y-3 text-lg leading-relaxed">
        <li><strong>Divider A:</strong> very close to the cricket group.</li>
        <li><strong>Divider B:</strong> very close to the football group.</li>
        <li><strong>Divider C:</strong> equally far from both groups.</li>
      </ul>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Which divider is safest? Obviously, <strong>Divider C</strong> because it creates maximum separation. That is exactly the philosophy of SVM.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* MAIN OBJECTIVE & WORKFLOW */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Goal className="mr-2 text-emerald-600" /> Main Objective of SVM
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        For classification, SVM learns a decision boundary called a <strong>hyperplane</strong>. In the hard-margin case it maximizes the margin between separable classes; in the more practical soft-margin case it balances margin width with violations controlled by the parameter <strong>C</strong>.
      </p>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Overall Workflow of SVM</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-emerald-600 marker:font-bold">
              <li><strong>Input Dataset:</strong> Collect training data.</li>
              <li><strong>Identify Classes:</strong> Determine the categories to be separated.</li>
              <li><strong>Consider Candidate Boundaries:</strong> Search for a boundary that separates the classes well.</li>
              <li><strong>Measure the Margin:</strong> Look at how close the nearest training points are to the boundary.</li>
              <li><strong>Optimize the Trade-off:</strong> Prefer a wide margin while controlling violations when soft-margin SVM is used.</li>
              <li><strong>Classify New Data Points:</strong> Make predictions using this optimal boundary.</li>
            </ol>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CORE COMPONENTS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-blue-600" /> Core Components of SVM
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        To understand SVM deeply, we must understand five critical concepts: <strong>Hyperplane, Margin, Support Vectors, Kernel Trick, and Optimization</strong>. Each concept plays a critical role in how SVM works.
      </p>

      <h3 className="text-2xl font-bold text-indigo-800 mt-8 mb-4">
        1. Understanding the Hyperplane
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The hyperplane is the decision boundary that separates classes. In simple 2-dimensional space, the hyperplane is simply a straight line. But SVM does not stop at simple 2D space:
      </p>
      <div className="overflow-x-auto shadow-sm rounded-lg mb-6 border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Dimensions</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Hyperplane Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-base">
            <tr><td className="px-6 py-3 font-mono">2D</td><td className="px-6 py-3 text-slate-700 font-bold">Line</td></tr>
            <tr><td className="px-6 py-3 font-mono bg-slate-50">3D</td><td className="px-6 py-3 bg-slate-50 text-slate-700 font-bold">Plane</td></tr>
            <tr><td className="px-6 py-3 font-mono">Higher Dimensions</td><td className="px-6 py-3 text-slate-700 font-bold">Hyperplane</td></tr>
          </tbody>
        </table>
      </div>

      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-slate-900 mb-3">Mathematical Formula of Hyperplane</p>
        <code className="text-2xl font-mono text-slate-900 block font-bold mb-4">
          wᵀx + b = 0
        </code>
        <ul className="list-disc pl-5 mb-4 text-slate-700 space-y-2">
          <li><strong>w:</strong> weight vector (controls the orientation or direction of the boundary)</li>
          <li><strong>x:</strong> feature vector (the data point)</li>
          <li><strong>b:</strong> bias/intercept (controls where the boundary is placed)</li>
        </ul>
        <p className="font-bold text-slate-900 border-t border-slate-200 pt-4 mb-2">Example: Which Side of the Boundary?</p>
        <div className="font-mono text-slate-800 space-y-2">
          <p>Suppose: w = (2, 3), x = (1, 2), b = -4</p>
          <p><strong>Step 1 — Dot product:</strong> (2 × 1) + (3 × 2) = 2 + 6 = 8</p>
          <p><strong>Step 2 — Add bias:</strong> 8 + (-4) = 4</p>
          <p><strong>Step 3 — Read the sign:</strong> 4 is greater than 0.</p>
          <p className="text-indigo-700 font-bold mt-2">So this point lies on the positive side of this decision boundary.</p>
        </div>
        <p className="text-sm text-slate-600 mt-4">
          Important: the equation <code>wᵀx + b = 0</code> describes points <em>on</em> the boundary. A positive or negative value tells us which side of the boundary a point lies on.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-4">
        2. What Are Support Vectors?
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Support vectors are training points that lie on or inside the margin and are especially important in determining the fitted SVM boundary. They are the points closest to the decision boundary in the simple separable picture.
      </p>
      
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-emerald-900 mb-2">Extremely Important Insight About Support Vectors</p>
        <p className="text-emerald-800 font-medium">
          In the fitted SVM decision function, the support vectors are the training examples with non-zero influence on the boundary. Prediction can therefore depend on a subset of the training data, although training an SVC can still be expensive and the number of support vectors can be large.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8 text-center">
        <p className="font-bold text-slate-800 mb-3">Simple Picture of Support Vectors</p>
        <div className="font-mono text-sm sm:text-base leading-8">
          <span className="text-rose-600">● ● </span>
          <span className="px-2 py-1 rounded bg-rose-100 text-rose-700 font-bold">● SV</span>
          <span className="mx-3 text-slate-400">margin</span>
          <span className="font-bold text-slate-900">| boundary |</span>
          <span className="mx-3 text-slate-400">margin</span>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-bold">SV ▲</span>
          <span className="text-blue-600"> ▲ ▲</span>
        </div>
        <p className="text-sm text-slate-600 mt-3">SV = support vector. These nearby points help pin down the margin and boundary.</p>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-4">
        3. Understanding Margin
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Margin is the <strong>distance between the hyperplane and the nearest data points</strong> (which are the support vectors). 
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        The maximum-margin principle prefers a boundary that stays far from the closest training points. A wider margin can support better generalization, but real performance still depends on the data, kernel, regularization and other hyperparameters.
      </p>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-10 w-full max-w-4xl mx-auto shadow-sm">
        <h4 className="font-bold text-center text-slate-800 mb-2">Visualizing the Hyperplane and Margin</h4>
        <p className="text-sm text-center text-slate-600 mb-6">The solid line is the Hyperplane. The dashed lines represent the margins intersecting the support vectors.</p>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis type="number" dataKey="x" name="Feature X" domain={[0, 10]} tickCount={11} />
              <YAxis type="number" dataKey="y" name="Feature Y" domain={[0, 10]} tickCount={11} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              
              <ReferenceLine x={5} stroke="#1e293b" strokeWidth={3} label={{ position: 'top', value: 'Hyperplane', fill: '#1e293b', fontSize: 14, fontWeight: 'bold' }} />
              <ReferenceLine x={4} stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} label={{ position: 'insideTopLeft', value: 'Margin (-1)', fill: '#64748b', fontSize: 12 }} />
              <ReferenceLine x={6} stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} label={{ position: 'insideTopRight', value: 'Margin (+1)', fill: '#64748b', fontSize: 12 }} />
              
              <Scatter name="Class A" data={classA} fill="#ef4444" shape="circle" />
              <Scatter name="Class B" data={classB} fill="#3b82f6" shape="triangle" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-blue-900 mb-3">Mathematical Formula for Margin Distance</p>
        <code className="text-2xl font-mono text-slate-900 block font-bold mb-4">
          d = |wᵀx + b| / ||w||
        </code>
        <p className="font-bold text-blue-900 border-t border-blue-200 pt-4 mb-2">Worked Numerical Example:</p>
        <div className="font-mono text-slate-800 space-y-2">
          <p>Suppose: w = (2, 2), x = (3, 1), b = -2</p>
          <p><strong>Step 1 — Dot Product:</strong> (2)(3) + (2)(1) = 8</p>
          <p><strong>Step 2 — Add Bias:</strong> 8 - 2 = 6</p>
          <p><strong>Step 3 — Magnitude of w:</strong> √(2² + 2²) = √8</p>
          <p><strong>Step 4 — Final Distance:</strong> d = 6 / √8</p>
          <p className="text-indigo-700 font-bold mt-2">Distance ≈ 2.12</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* HARD VS SOFT MARGIN */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Maximize className="mr-2 text-rose-600" /> Hard Margin vs Soft Margin SVM
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Hard Margin SVM</strong> assumes that the dataset is perfectly separable. That means there is no margin violation allowed in the idealized hard-margin formulation.
      </p>

      <div className="overflow-x-auto rounded-lg border border-slate-200 mb-8">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Type</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Simple Idea</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Best Picture to Remember</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            <tr><td className="px-4 py-3 font-semibold">Hard Margin</td><td className="px-4 py-3">No violations allowed</td><td className="px-4 py-3">Cleanly separated classes</td></tr>
            <tr><td className="px-4 py-3 font-semibold">Soft Margin</td><td className="px-4 py-3">Some violations can be accepted</td><td className="px-4 py-3">Noisy or overlapping classes</td></tr>
          </tbody>
        </table>
      </div>
      
      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-rose-900 mb-2">Optimization Objective (Hard Margin)</p>
        <p className="text-rose-800 mb-4">
          Hard Margin SVM tries to strictly minimize: <code>1/2 ||w||²</code><br/>
          Subject to: <code>yᵢ(wᵀxᵢ + b) ≥ 1</code>
        </p>
        <p className="text-rose-900 font-medium italic mt-2">
          Intuition: in the canonical SVM scaling, a smaller <code>||w||</code> corresponds to a wider geometric margin.
        </p>
        <div className="border-t border-rose-200 mt-4 pt-4 font-mono text-slate-800 space-y-2">
          <p className="font-bold text-rose-900 font-sans">Tiny numerical example</p>
          <p>Suppose w = (1, 2)</p>
          <p><strong>Step 1:</strong> ||w||² = 1² + 2² = 5</p>
          <p><strong>Step 2:</strong> 1/2 ||w||² = 1/2 × 5 = 2.5</p>
          <p className="font-sans text-sm text-slate-600">The optimizer searches for parameters that keep this objective small while satisfying the hard-margin constraints.</p>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Problem with Hard Margin:</strong> Real-world datasets are often not perfectly separable. Noise, outliers or overlapping classes can make the hard-margin constraints infeasible or make the fitted boundary overly sensitive to unusual points.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Soft Margin SVM</strong> solves this problem by creating more realistic boundaries. Instead of forcing perfect separation, it allows a few mistakes and balances a Large Margin vs Classification Errors.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-emerald-900 mb-2">Understanding Parameter C (Soft Margin Constraint)</p>
        <code className="text-xl font-mono text-slate-900 block font-bold mb-4 bg-white p-2 rounded w-fit">
          min 1/2 ||w||² + C ∑ ζᵢ
        </code>
        <ul className="list-disc pl-5 mt-2 space-y-3 text-emerald-900">
          <li><strong>Smaller C:</strong> Margin violations are penalized less strongly, so the model can accept more violations in exchange for stronger regularization and often a wider margin.</li>
          <li><strong>Larger C:</strong> Margin violations are penalized more strongly, so the model tries harder to fit the training examples and may use a tighter boundary.</li>
        </ul>
        <div className="border-t border-emerald-200 mt-4 pt-4 font-mono text-slate-800 space-y-2">
          <p className="font-bold text-emerald-900 font-sans">Tiny numerical example</p>
          <p>Suppose 1/2 ||w||² = 2.5, C = 2, and total slack = 0.5</p>
          <p><strong>Step 1:</strong> C × total slack = 2 × 0.5 = 1</p>
          <p><strong>Step 2:</strong> Objective = 2.5 + 1 = 3.5</p>
          <p className="font-sans text-sm text-slate-600">This shows how C determines how strongly margin violations contribute to the objective.</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-4">
        Understanding Hinge Loss
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A common linear SVM formulation uses <strong>hinge loss</strong>. Points that are correctly classified with enough margin have zero hinge loss; points inside the margin or on the wrong side receive a positive loss.
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-amber-900 mb-3">Formula & Example</p>
        <code className="text-2xl font-mono text-slate-900 block font-bold mb-4">
          Loss = max(0, 1 − y(wᵀx + b))
        </code>
        <p className="text-amber-800 mb-4">
          If classification is correct with sufficient margin, Loss = 0. If classification is incorrect or too close to the boundary, Loss becomes positive.
        </p>
        <p className="font-bold text-amber-900 border-t border-amber-200 pt-4 mb-2">Worked Example:</p>
        <div className="font-mono text-slate-800 space-y-2">
          <p>Suppose: y = 1 and decision score = 0.4</p>
          <p><strong>Step 1:</strong> y × score = 1 × 0.4 = 0.4</p>
          <p><strong>Step 2:</strong> 1 − 0.4 = 0.6</p>
          <p><strong>Step 3:</strong> max(0, 0.6) = 0.6</p>
          <p className="text-indigo-700 font-bold mt-2">Hinge loss = 0.6</p>
        </div>
        <p className="text-sm text-slate-600 mt-3">The point is on the correct side, but it does not yet have the desired margin of 1, so it still receives positive hinge loss.</p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* KERNEL TRICK */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Link className="mr-2 text-purple-600" /> Linear SVM and The Kernel Trick
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Linear SVM</strong> uses a linear decision boundary in the chosen feature space. It can be a strong option for high-dimensional sparse data such as text, especially when a linear boundary is adequate.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Problem With Nonlinear Data:</strong> Some datasets contain patterns such as rings or curved groups that cannot be separated well by one straight line in the original feature space.
      </p>

      <div className="pl-4 border-l-4 border-purple-400 bg-purple-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-purple-900 mb-2">The Solution: The Kernel Trick</p>
        <p className="text-purple-800">
          A kernel lets SVM measure similarity as if the data had been represented in a richer feature space, without explicitly constructing every transformed feature. This can produce nonlinear decision boundaries in the original input space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-center">
          <h4 className="font-bold text-center text-slate-800 border-b border-slate-100 pb-2 mb-4">Non-linear Data (Not Linearly Separable)</h4>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" dataKey="x" domain={[0, 10]} hide />
                <YAxis type="number" dataKey="y" domain={[0, 10]} hide />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Inner Class" data={innerCircle} fill="#ef4444" shape="circle" />
                <Scatter name="Outer Class" data={outerCircle} fill="#3b82f6" shape="triangle" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-2 w-5 h-5" />
            <h4 className="font-bold text-indigo-800 text-sm">Linear vs RBF Kernel (Code Proof)</h4>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs sm:text-sm leading-relaxed p-4 overflow-x-auto flex-1">
            <pre className="!m-0">
<code>{`from sklearn.datasets import make_circles
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# 1. Create reproducible circular data
X, y = make_circles(
    n_samples=500,
    noise=0.1,
    factor=0.3,
    random_state=42
)

# 2. Keep a separate test set
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.25,
    random_state=42,
    stratify=y
)

# 3. Linear SVM
lin_svm = SVC(kernel='linear', C=1)
lin_svm.fit(X_train, y_train)
lin_acc = accuracy_score(y_test, lin_svm.predict(X_test))

# 4. RBF-kernel SVM
rbf_svm = SVC(kernel='rbf', C=1, gamma='scale')
rbf_svm.fit(X_train, y_train)
rbf_acc = accuracy_score(y_test, rbf_svm.predict(X_test))

print(f"Linear test accuracy: {lin_acc * 100:.1f}%")
print(f"RBF test accuracy:    {rbf_acc * 100:.1f}%")`}</code>
            </pre>
          </div>
          <div className="bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed p-3 border-t border-slate-700">
            <p className="mb-1 text-slate-300">$ python kernel_test.py</p>
            <p className="text-rose-400">Linear test accuracy: 60.8% <span className="text-slate-500"># Straight boundary struggles here</span></p>
            <p className="text-emerald-400">RBF test accuracy:    100.0% <span className="text-slate-500"># Fits this toy ring pattern well</span></p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Types of Kernels
      </h3>
      <ul className="space-y-6 text-lg text-slate-700 leading-relaxed mb-8">
        <li>
          <strong className="text-slate-900">1. Linear Kernel:</strong> Formula: <code>K(xᵢ, xⱼ) = xᵢᵀxⱼ</code>. It creates a linear boundary in the original feature space and is often useful when a linear separator is sufficient.
        </li>
        <li>
          <strong className="text-slate-900">2. Polynomial Kernel:</strong> Can create curved boundaries. A common form is <code>K(xᵢ, xⱼ) = (γxᵢᵀxⱼ + c)ᵈ</code>. Degree and other parameters control the shape.
        </li>
        <li>
          <strong className="text-slate-900">3. RBF Kernel (Gaussian):</strong> A commonly used nonlinear kernel. Formula: <code>K(xᵢ, xⱼ) = e^(-γ ||xᵢ - xⱼ||²)</code>.
        </li>
      </ul>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-8">
        <p className="font-bold text-purple-900 mb-3">Tiny RBF Kernel Example</p>
        <div className="font-mono text-slate-800 space-y-2">
          <p>xᵢ = (1, 1), xⱼ = (2, 1), γ = 0.5</p>
          <p><strong>Step 1 — Squared distance:</strong> (1−2)² + (1−1)² = 1</p>
          <p><strong>Step 2 — Multiply by −γ:</strong> −0.5 × 1 = −0.5</p>
          <p><strong>Step 3 — Exponent:</strong> e<sup>−0.5</sup> ≈ 0.607</p>
          <p className="font-sans text-sm text-slate-600">A larger RBF similarity means the two points are more similar under this kernel.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 mb-8">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Kernel</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">Simple Picture</th>
              <th className="px-4 py-3 text-sm font-bold text-slate-700">When to Consider It</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            <tr><td className="px-4 py-3 font-semibold">Linear</td><td className="px-4 py-3">Straight boundary</td><td className="px-4 py-3">A linear separator may be enough</td></tr>
            <tr><td className="px-4 py-3 font-semibold">Polynomial</td><td className="px-4 py-3">Curved polynomial boundary</td><td className="px-4 py-3">Interactions of a chosen polynomial degree may help</td></tr>
            <tr><td className="px-4 py-3 font-semibold">RBF</td><td className="px-4 py-3">Flexible nonlinear boundary</td><td className="px-4 py-3">The relationship is nonlinear and local similarity matters</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-md flex flex-col mb-10">
        <h4 className="font-bold text-slate-800 mb-3">Understanding Gamma in the RBF Kernel</h4>
        <p className="text-lg text-slate-700 mb-4">Gamma controls how far the influence of an individual training example reaches in the RBF kernel.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border text-left border-emerald-200 shadow-sm rounded-lg overflow-hidden p-4">
             <strong className="text-emerald-800">Small Gamma</strong><br/>
             <span className="text-slate-600">Creates smooth boundaries and simpler overarching models.</span>
          </div>
          <div className="bg-white border text-left border-rose-200 shadow-sm rounded-lg overflow-hidden p-4">
             <strong className="text-rose-800">Large Gamma</strong><br/>
             <span className="text-slate-600">Creates highly flexible boundaries, tightly wrapping decision surfaces around data (higher overfitting risk).</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* EDGE CONCEPTS & EVALUATION */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> General Evaluation & Considerations
      </h2>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        <strong>High-dimensional data:</strong> Linear SVMs can work well with high-dimensional sparse representations such as text, but performance still depends on sample size, signal, regularization and the chosen representation.<br/><br/>
        <strong>Feature Scaling:</strong> Scaling is usually very important for SVMs when numeric features have very different units, because the geometry of the feature space affects margins and kernels. A common workflow is to fit the scaler on the training data and apply the same transformation to validation/test data.
      </p>

      <h3 className="text-xl font-bold text-slate-800 mt-12 mb-4">
        Advantages vs Disadvantages
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>High Dimensions:</strong> Linear SVMs can be effective with many features, including sparse text representations.</li>
             <li><strong>Nonlinear Boundaries:</strong> Kernels such as RBF can model nonlinear decision boundaries.</li>
             <li><strong>Regularized Margin:</strong> The C parameter lets us control the trade-off between margin size and training violations.</li>
             <li><strong>Support-Vector Prediction:</strong> The fitted kernel decision function depends on the support vectors rather than every training point.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Training Cost:</strong> Kernel SVC training can become expensive as the number of samples grows.</li>
             <li><strong>Parameter Tuning:</strong> C, gamma and the kernel can materially change performance and usually need validation.</li>
             <li><strong>Interpretability:</strong> Nonlinear kernel models are harder to explain directly than a small Decision Tree or a simple linear model.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* APPLICATIONS */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Real-World Applications
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12">
        <div className="bg-white border text-left border-rose-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-rose-100 text-rose-900 font-bold px-4 py-3 border-b border-rose-200 flex items-center">
             <Activity className="w-5 h-5 mr-2"/> Healthcare
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Cancer Detection</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Disease Diagnosis</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Medical Imaging</li>
             </ul>
          </div>
        </div>
        
        <div className="bg-white border text-left border-blue-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-blue-100 text-blue-900 font-bold px-4 py-3 border-b border-blue-200 flex items-center">
             <TextSelect className="w-5 h-5 mr-2"/> NLP
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Spam Detection</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Sentiment Analysis</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Text Classification</li>
             </ul>
          </div>
        </div>
        
        <div className="bg-white border text-left border-emerald-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-emerald-100 text-emerald-900 font-bold px-4 py-3 border-b border-emerald-200 flex items-center">
             <Banknote className="w-5 h-5 mr-2"/> Finance
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Fraud Detection</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Credit Risk Analysis</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Credit / Risk Classification</li>
             </ul>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CODE IMPLEMENTATION */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Python Implementation
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is a simple Scikit-learn pipeline using the built-in Breast Cancer Wisconsin dataset and an RBF-kernel Support Vector Classifier. This is an educational dataset, not a clinical deployment example.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h4 className="font-bold text-indigo-800 text-xl">Python Code: Support Vector Classifier</h4>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Step 2: Load Dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Step 3: Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Step 4: Learn scaling from the training data only
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 5: Train an RBF-kernel SVM
model = SVC(kernel='rbf', C=1, gamma='scale')
model.fit(X_train_scaled, y_train)

# Step 6: Predictions & Accuracy
predictions = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, predictions)

print(f"Test accuracy: {accuracy * 100:.2f}%")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">$ python svm_classifier.py</p>
          <p className="text-slate-300">Test accuracy: 98.25%</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-amber-900 mb-2">Remember</p>
        <p className="text-amber-900 leading-relaxed">
          A high score on this built-in teaching dataset does not mean an SVM is automatically the best model for medical diagnosis. Real applications require careful validation, appropriate metrics, domain review and external testing.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-5 text-slate-800 border-b pb-2">Common Questions About SVM</h2>
      <div className="space-y-4 mb-10">
        <div className="border border-slate-200 rounded-lg p-5 bg-white">
          <p className="font-bold text-slate-900 mb-2">What are support vectors?</p>
          <p className="text-slate-700">They are the training points with non-zero influence on the fitted SVM decision function. In the simple linear picture, they are the points nearest to the margin/boundary.</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-5 bg-white">
          <p className="font-bold text-slate-900 mb-2">Is a larger C always better?</p>
          <p className="text-slate-700">No. Larger C penalizes violations more strongly, while smaller C regularizes more strongly. Choose C using validation or cross-validation.</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-5 bg-white">
          <p className="font-bold text-slate-900 mb-2">Does SVM need feature scaling?</p>
          <p className="text-slate-700">Usually yes when numeric features use very different scales, especially for RBF and other geometry-sensitive kernels. Fit the scaler on training data only.</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-5 bg-white">
          <p className="font-bold text-slate-900 mb-2">What should I learn next?</p>
          <p className="text-slate-700">
            Review <a href="/learn/feature-scaling" className="text-indigo-700 font-semibold hover:underline">Feature Scaling</a>, then use <a href="/learn/cross-validation" className="text-indigo-700 font-semibold hover:underline">Cross-Validation</a> and <a href="/learn/grid-random-search" className="text-indigo-700 font-semibold hover:underline">Grid & Random Search</a> to compare C, gamma and kernels. For classification evaluation, continue to the <a href="/learn/confusion-matrix" className="text-indigo-700 font-semibold hover:underline">Confusion Matrix</a> lesson.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Support Vector Machine is a supervised learning method that can be used for classification and regression. For classification, its central geometric idea is to learn a decision boundary with a useful margin while controlling training violations through regularization.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Linear SVM uses a linear boundary in the chosen feature space, while kernel methods such as RBF can create nonlinear boundaries. The quality of the result depends on the data, feature scaling, kernel choice and hyperparameters such as C and gamma.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Think of SVM as: find a separating boundary, keep a useful margin, and let the closest training points guide where that boundary should be."
         </p>
      </div>

    </>
  );
}
