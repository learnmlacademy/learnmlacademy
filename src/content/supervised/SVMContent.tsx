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

  const innerCircle = Array.from({length: 40}, (_, i) => {
    const angle = (i / 40) * Math.PI * 2;
    return { x: 5 + 1.5 * Math.cos(angle) + (Math.random()-0.5)*0.5, y: 5 + 1.5 * Math.sin(angle) + (Math.random()-0.5)*0.5 };
  });

  const outerCircle = Array.from({length: 60}, (_, i) => {
    const angle = (i / 60) * Math.PI * 2;
    return { x: 5 + 4 * Math.cos(angle) + (Math.random()-0.5)*0.5, y: 5 + 4 * Math.sin(angle) + (Math.random()-0.5)*0.5 };
  });

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Support Vector Machine</h1>
      
      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">Support Vector Machine (SVM) is a supervised machine learning algorithm used for classification and regression tasks.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        SVM is considered an elegant algorithm in Machine Learning because it combines <strong>Geometry, Optimization, Linear Algebra, and Statistics</strong> into a single predictive framework.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Unlike simpler algorithms that only try to separate classes, SVM tries to find the <em>best possible separation boundary</em> between classes. This idea of finding the “best boundary” is what makes SVM powerful.
      </p>

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
          Instead of simply separating classes, SVM searches for a boundary that leaves the <strong>maximum possible distance</strong> between the classes. This makes the model more confident and improves prediction accuracy on unseen data.
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
        The primary objective of Support Vector Machine is to find the optimal decision boundary that maximizes separation between classes. This optimal boundary is called the <strong>Hyperplane</strong>.
      </p>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Overall Workflow of SVM</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-emerald-600 marker:font-bold">
              <li><strong>Input Dataset:</strong> Collect training data.</li>
              <li><strong>Identify Classes:</strong> Determine the categories to be separated.</li>
              <li><strong>Generate Possible Boundaries:</strong> Explore various dividing lines.</li>
              <li><strong>Measure Distance:</strong> Calculate the gap between classes for each line.</li>
              <li><strong>Select Maximum Margin:</strong> Pick the boundary with the largest gap.</li>
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
            <tr><td className="px-6 py-3 font-mono">Higher Dimensions</td><td className="px-6 py-3 text-slate-700 font-bold">Hyper-surface</td></tr>
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
        <p className="font-bold text-slate-900 border-t border-slate-200 pt-4 mb-2">Example of Hyperplane Calculation:</p>
        <div className="font-mono text-slate-800 space-y-1">
          <p>Suppose: w = (2, 3), x = (1, 2), b = -4</p>
          <p>Substitute values: (2)(1) + (3)(2) - 4 = 0</p>
          <p>Calculate: 2 + 6 - 4 = 4</p>
          <p className="text-indigo-700 font-bold mt-2">Since result {'>'} 0: Point belongs to the positive class.</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-4">
        2. What Are Support Vectors?
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Support vectors are the most important data points in SVM. These are the points closest to the hyperplane. They are called support vectors because they <em>support or define the position of the hyperplane</em>. Without them, the decision boundary would change.
      </p>
      
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-emerald-900 mb-2">Extremely Important Insight About Support Vectors</p>
        <p className="text-emerald-800 font-medium">
          One fascinating property of SVM is: <strong>Only support vectors influence the final boundary.</strong> Many other data points do not directly affect the final model. This makes SVM incredibly memory efficient!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-4">
        3. Understanding Margin
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Margin is the <strong>distance between the hyperplane and the nearest data points</strong> (which are the support vectors). 
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        A large margin provides several advantages: classes are well separated, noise affects the model less, generalization improves, and overfitting decreases. This is why SVM is often called a <strong>Maximum Margin Classifier</strong>.
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
        <strong>Hard Margin SVM</strong> assumes that the dataset is perfectly separable. That means there is absolutely no overlap, no noise, and no misclassification allowed. 
      </p>
      
      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-rose-900 mb-2">Optimization Objective (Hard Margin)</p>
        <p className="text-rose-800 mb-4">
          Hard Margin SVM tries to strictly minimize: <code>1/2 ||w||²</code><br/>
          Subject to: <code>yᵢ(wᵀxᵢ + b) ≥ 1</code>
        </p>
        <p className="text-rose-900 font-medium italic mt-2">
          Intuition: Smaller <code>||w||</code> mathematically equates to a larger margin!
        </p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Problem with Hard Margin:</strong> Real-world datasets are rarely perfectly separable. Real data contains noise, outliers, overlapping classes, and measurement errors. Hard Margin SVM becomes too strict and completely fails if just one outlier crosses the median.
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
          <li><strong>Small C Value:</strong> More classification errors allowed, wider margin created, better generalization possible.</li>
          <li><strong>Large C Value:</strong> Errors heavily penalized, narrow margin created, overfitting risk increases.</li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-4">
        Understanding Hinge Loss
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        SVM uses a specific loss function called <strong>Hinge Loss</strong>. It is formulated to penalize points purely based on how far past the margin boundary they have trespassed. The optimization process tries to strictly minimize this loss.
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
        <div className="font-mono text-slate-800 space-y-1">
          <p>Suppose: Target (y) = 1, Predicted raw output (wᵀx + b) = 0.4</p>
          <p>Substitute: Loss = max(0, 1 - (1)(0.4))</p>
          <p className="text-indigo-700 font-bold mt-2">Loss = 0.6</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* KERNEL TRICK */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Link className="mr-2 text-purple-600" /> Linear SVM and The Kernel Trick
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Linear SVM</strong> is fast, efficient, simple, and extremely suitable for high-dimensional sparse data (like text classification). It assumes classes can be separated using a straight line.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Problem With Nonlinear Data:</strong> Real-world datasets are often structured non-linearly (e.g., clusters arranged in rings or intricate messy blobs). No single straight line can possibly separate these classes directly.
      </p>

      <div className="pl-4 border-l-4 border-purple-400 bg-purple-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-purple-900 mb-2">The Solution: The Kernel Trick</p>
        <p className="text-purple-800">
          The Kernel Trick is a revolutionary idea in Machine Learning. Suppose data cannot be separated in 2D. The Kernel mathematically <strong>transforms the data into higher dimensions</strong> implicitly, without doing the cripplingly computationally expensive transformation explicitly. Once warped into higher dimensions, linear separation suddenly becomes possible!
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
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# 1. Circular data (like the plot)
X, y = make_circles(n_samples=500, noise=0.1, factor=0.3)

# 2. Linear SVM
lin_svm = SVC(kernel='linear')
lin_svm.fit(X, y)
lin_acc = accuracy_score(y, lin_svm.predict(X))

# 3. RBF Kernel SVM
rbf_svm = SVC(kernel='rbf')
rbf_svm.fit(X, y)
rbf_acc = accuracy_score(y, rbf_svm.predict(X))

print(f"Linear Accuracy: {lin_acc * 100}%")
print(f"RBF Accuracy:    {rbf_acc * 100}%")`}</code>
            </pre>
          </div>
          <div className="bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed p-3 border-t border-slate-700">
            <p className="mb-1 text-slate-300">$ python kernel_test.py</p>
            <p className="text-rose-400">Linear Accuracy: 50.0%  <span className="text-slate-500"># Fails completely</span></p>
            <p className="text-emerald-400">RBF Accuracy:    100.0% <span className="text-slate-500"># Perfect via Kernel</span></p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Types of Kernels
      </h3>
      <ul className="space-y-6 text-lg text-slate-700 leading-relaxed mb-8">
        <li>
          <strong className="text-slate-900">1. Linear Kernel:</strong> The simplest kernel. Formula: <code>K(xᵢ, xⱼ) = xᵢᵀxⱼ</code>. It is suitable for linearly separable datasets.
        </li>
        <li>
          <strong className="text-slate-900">2. Polynomial Kernel:</strong> Creates curved boundaries. Formula: <code>K(xᵢ, xⱼ) = (xᵢᵀxⱼ + c)ᵈ</code>. It can model complex structural relationships.
        </li>
        <li>
          <strong className="text-slate-900">3. RBF Kernel (Gaussian):</strong> The most popular nonlinear kernel. Formula: <code>K(xᵢ, xⱼ) = e^(-γ ||xᵢ - xⱼ||²)</code>.
        </li>
      </ul>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-md flex flex-col mb-10">
        <h4 className="font-bold text-slate-800 mb-3">Understanding Gamma in the RBF Kernel</h4>
        <p className="text-lg text-slate-700 mb-4">Gamma fundamentally controls the sphere of influence of a single nearby point.</p>
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
        <strong>Curse of Dimensionality:</strong> SVM handles high-dimensional data better than almost all other algorithms. This is why it performs flawlessly in scenarios containing thousands of text or image feature dimensions.<br/><br/>
        <strong>Feature Scaling:</strong> Feature scaling is MANDATORY for SVM because the algorithm relies strictly on geometric distance calculation. Without transforming scale (using Standardization or Min-Max scaling), large-valued features will dominate, completely distorting the margin and corrupting predictions.
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
             <li><strong>High Dimensions:</strong> Works extremely well in highly dimensional spaces.</li>
             <li><strong>Nonlinear Data:</strong> Capable of resolving extreme nonlinear problems gracefully via the Kernel Trick.</li>
             <li><strong>Robust:</strong> Maximizes the margin which intrinsically shields the model from severe overfitting.</li>
             <li><strong>Memory Efficient:</strong> Uses a small dedicated subset of training samples (Support Vectors) sequentially.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Slow Scaling:</strong> Optimization complexity scales terribly. Training is highly computationally expensive for datasets scaling beyond tens of thousands.</li>
             <li><strong>Parameter Tuning:</strong> Requires careful hyperparameter tuning for C, Gamma, and Kernel configuration.</li>
             <li><strong>Black Box Nature:</strong> Not highly interpretable relative to plain regressors or Decision Trees.</li>
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
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Stock Prediction</li>
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
        Here is a complete practical pipeline utilizing Scikit-Learn utilizing a breast cancer dataset, deploying an RBF Kernel instance.
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
    X, y, test_size=0.2, random_state=42
)

# Step 4: Feature Scaling (Crucial for SVM)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Step 5: Train SVM Model (RBF kernel, Soft Margin C=1)
model = SVC(kernel='rbf', C=1)
model.fit(X_train, y_train)

# Step 6: Predictions & Accuracy
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

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
          <p className="mb-1">$ python svm_classifier.py</p>
          <p className="text-slate-300">Model Accuracy Evaluated at: 98.24561403508771%</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Support Vector Machine is a powerful classification algorithm in Machine Learning. Its entire philosophy revolves around one central idea: <strong>Find the safest and most confident decision boundary possible.</strong>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Instead of merely separating classes, SVM tries to maximize the margin between classes, producing robust and accurate predictions. The algorithm becomes even more powerful through the kernel trick, which enables it to solve highly nonlinear problems efficiently.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "The best boundary is not merely a separating boundary, but the boundary with completely maximized confidence and separation."
         </p>
      </div>

    </>
  );
}
