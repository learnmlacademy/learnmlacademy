import React from 'react';
import { Code, Layers, Activity, Fingerprint, Eye, Lightbulb, Combine, ScatterChart as ScatterIcon, Network, Maximize2, Variable, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

export function PCAContent() {
  const screeData = [
    { component: 'PC1', variance: 85 },
    { component: 'PC2', variance: 10 },
    { component: 'PC3', variance: 3 },
    { component: 'PC4', variance: 1.5 },
    { component: 'PC5', variance: 0.5 },
  ];

  const pcaData = [
    { x: 10, y: 12 }, { x: 15, y: 16 }, { x: 20, y: 22 }, { x: 25, y: 23 },
    { x: 30, y: 28 }, { x: 35, y: 34 }, { x: 40, y: 41 }, { x: 45, y: 46 }
  ];

  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Principal Component Analysis (PCA)</h1>
        
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Principal Component Analysis (PCA) is a dimensionality reduction technique used in:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Machine Learning</li>
          <li>Data Science</li>
          <li>Statistics</li>
          <li>Pattern Recognition</li>
        </ul>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          It transforms a dataset containing many correlated variables into a smaller set of new variables called <strong>Principal Components</strong> while preserving as much information from the original dataset as possible.
        </p>

        <p className="text-lg leading-relaxed mb-8 text-slate-800 text-indigo-700 font-medium">
          The primary goal of PCA is to reduce dimensions without losing important information.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-pca">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Why PCA Was Needed</h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Modern datasets often contain:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Hundreds of features</li>
          <li>Thousands of columns</li>
          <li>Highly correlated variables</li>
          <li>Redundant information</li>
        </ul>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          This creates several problems natively known as high-dimensional data problems, such as:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Slow training</li>
          <li>Increased memory usage</li>
          <li>Overfitting</li>
          <li>Difficult visualization</li>
          <li>Noise accumulation</li>
        </ul>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">The Curse of Dimensionality</p>
          <p className="text-slate-800 italic leading-relaxed">
            This phenomenon is known as the "Curse of Dimensionality". PCA was developed specifically to solve these issues by distilling the essence of the data into fewer variables.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="core-idea">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 text-indigo-600" /> Core Idea Behind PCA
        </h2>
        
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The central philosophy of PCA is to <strong>find directions where data varies most</strong> and project the data onto those directions.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Instead of keeping all original variables, PCA creates new optimized variables called <strong>Principal Components</strong>. These components are mathematically derived to capture maximum variance.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Real-Life Analogy of PCA</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-700 italic">
          Imagine a classroom containing measurements for Height, Weight, Arm length, Leg length, and Shoe size.
        </p>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Many of these variables are related. For example:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li>Taller students usually have larger shoe sizes</li>
          <li>Height and leg length are correlated</li>
        </ul>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          Instead of storing all measurements separately, PCA compresses information into fewer meaningful dimensions (e.g., a general "size" metric) without losing much information.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Fundamental Objective of PCA</p>
          <p className="text-slate-800 text-lg font-mono">Maximum Information + Minimum Dimensions</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="visualization-terminologies">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Visualization of PCA Concept</h2>
        
        <div className="flex flex-col space-y-10 mb-10">
          <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm max-w-2xl w-full">
             <h4 className="font-bold text-slate-800 text-lg mb-4 text-center">Original 2D Data Spread</h4>
             <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                   <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                   <XAxis type="number" dataKey="x" name="X" hide />
                   <YAxis type="number" dataKey="y" name="Y" hide />
                   <Scatter data={pcaData} fill="#818cf8" />
                 </ScatterChart>
               </ResponsiveContainer>
             </div>
             <p className="text-center text-sm text-slate-600 mt-2">Data spreads diagonally. PCA finds the direction of maximum variance (PC1).</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Important Terminologies in PCA</h3>
            <div className="font-mono text-emerald-900 bg-emerald-50 p-6 rounded-xl border border-emerald-100 whitespace-pre overflow-x-auto w-fit">
{`PCA TERMINOLOGIES
│
├── Features
├── Variance
├── Covariance
├── Eigenvectors
├── Eigenvalues
├── Principal Components
└── Explained Variance`}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="math-basics">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Understanding Variance and Covariance</h2>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
          <Variable className="mr-2 text-indigo-600" /> Understanding Variance
        </h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Variance measures <strong>how spread out data is</strong>. 
        </p>
        <div className="flex flex-col space-y-6 mb-8">
          <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-blue-900 mb-2">Higher Variance</p>
            <p className="text-slate-800">Means more information and more variation.</p>
          </div>
          <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-2">Lower Variance</p>
            <p className="text-slate-800">Often means redundant information and less useful features.</p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Variance Formula</p>
          <p className="text-slate-800 font-mono mb-2">Var(X) = (1/n) * Σ(xᵢ - μ)²</p>
          <p className="text-slate-700 text-sm">Where: μ = mean, n = total observations</p>
        </div>

        <h4 className="font-bold text-xl text-slate-800 mb-4">Worked Variance Example</h4>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 font-mono text-sm">
          <p className="text-slate-800 mb-2">Dataset: <span className="font-bold">2, 4, 6</span></p>
          <p className="text-slate-800 mb-2">Mean (μ) = <span className="font-bold">(2 + 4 + 6) / 3 = 4</span></p>
          <p className="text-slate-800 mt-4 mb-2">Var = <span className="font-bold">((2 - 4)² + (4 - 4)² + (6 - 4)²) / 3</span></p>
          <p className="text-slate-800 mb-2">Var = <span className="font-bold">(4 + 0 + 4) / 3 = 2.67</span></p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
          <Combine className="mr-2 text-indigo-600" /> What Is Covariance?
        </h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Covariance measures <strong>how two variables change together</strong>.
        </p>

        <div className="flex flex-col space-y-6 mb-8">
          <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md">
             <h4 className="font-bold text-emerald-900 mb-2">Positive Covariance</h4>
             <p className="text-slate-800 mb-4">If both variables increase together.</p>
             <ul className="list-disc pl-5 text-emerald-800 text-sm space-y-1">
               <li>Height increases</li>
               <li>Weight increases</li>
             </ul>
          </div>
          <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md">
             <h4 className="font-bold text-rose-900 mb-2">Negative Covariance</h4>
             <p className="text-slate-800 mb-4">If one increases while the other decreases.</p>
             <ul className="list-disc pl-5 text-rose-800 text-sm space-y-1">
               <li>Speed increases</li>
               <li>Travel time decreases</li>
             </ul>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Covariance Formula</p>
          <p className="text-slate-800 font-mono mb-2">Cov(X, Y) = (1/n) * Σ(xᵢ - x̄)(yᵢ - ȳ)</p>
          <p className="text-slate-700 text-sm mb-4">Where: x̄ and ȳ are the means of X and Y, n = total observations</p>
          
          <div className="mt-4 pt-4 border-t border-indigo-200">
            <p className="font-bold text-slate-800 mb-2">Worked Covariance Example:</p>
            <p className="font-mono text-slate-800 text-sm mb-1">Suppose X (Hours Studied): [2, 4, 6]  (Mean x̄ = 4)</p>
            <p className="font-mono text-slate-800 text-sm mb-1">Suppose Y (Test Score): [60, 80, 100] (Mean ȳ = 80)</p>
            <p className="font-mono text-slate-800 text-sm mb-2">Cov(X, Y) = [ (2-4)(60-80) + (4-4)(80-80) + (6-4)(100-80) ] / 3</p>
            <p className="font-mono text-slate-800 text-sm mb-2">Cov(X, Y) = [ (-2)(-20) + (0)(0) + (2)(20) ] / 3</p>
            <p className="font-mono text-slate-800 text-sm mb-2">Cov(X, Y) = [ 40 + 0 + 40 ] / 3 = 80 / 3 ≈ 26.67</p>
            <p className="text-slate-700 text-sm mt-3 italic">A positive covariance means as hours studied increase, the test score also increases.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="pca-workflow">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> PCA Step-by-Step Workflow
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Let's walk through a complete real-time example. Suppose we have a dataset of students with their scores in <strong>Math</strong> and <strong>Physics</strong>. We suspect these scores are highly correlated and want to reduce them into a single <strong>"Science Aptitude"</strong> score using PCA.
        </p>

        <div className="mb-8 w-fit">
          <h4 className="font-bold text-slate-800 mb-4">Original Student Dataset</h4>
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Student</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Math (X)</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Physics (Y)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-mono text-sm text-center">
              <tr><td className="px-6 py-4">A</td><td className="px-6 py-4">2</td><td className="px-6 py-4">4</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4">B</td><td className="px-6 py-4">4</td><td className="px-6 py-4">8</td></tr>
              <tr><td className="px-6 py-4">C</td><td className="px-6 py-4">6</td><td className="px-6 py-4">12</td></tr>
            </tbody>
          </table>
          <p className="text-center text-sm text-slate-600 mt-4 italic">Notice: Physics scores are exactly twice the Math scores (perfect correlation).</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 1 — Compute the Mean and Center the Data</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          First, we compute the mean for each feature. Then, we subtract the mean from each data point to "center" the data around the origin (0,0). This is a vital precursor step to calculating the covariance matrix.
        </p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-blue-900 text-lg mb-2">Calculation:</p>
          <p className="font-mono text-slate-800 text-sm mb-1">Mean of Math (μx) = (2 + 4 + 6) / 3 = <span className="font-bold text-indigo-700">4</span></p>
          <p className="font-mono text-slate-800 text-sm mb-4">Mean of Physics (μy) = (4 + 8 + 12) / 3 = <span className="font-bold text-indigo-700">8</span></p>
          <p className="text-slate-800 font-bold mb-2">Centered Data Matrix (X - μx, Y - μy):</p>
          <ul className="font-mono text-slate-800 text-sm space-y-1">
            <li>Student A: (2 - 4, 4 - 8) = <span className="font-bold text-indigo-700">(-2, -4)</span></li>
            <li>Student B: (4 - 4, 8 - 8) = <span className="font-bold text-indigo-700">(0, 0)</span></li>
            <li>Student C: (6 - 4, 12 - 8) = <span className="font-bold text-indigo-700">(2, 4)</span></li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 2 — Compute the Covariance Matrix</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          We construct a matrix that encapsulates how Math varies with itself (variance), how Physics varies with itself, and how Math and Physics vary together (covariance).
        </p>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Calculation (Using n-1 = 2 for sample covariance):</p>
          <p className="font-mono text-slate-800 text-sm mb-1">Var(Math) = [(-2)² + (0)² + (2)²] / 2 = (4 + 0 + 4) / 2 = <span className="font-bold text-indigo-700">4</span></p>
          <p className="font-mono text-slate-800 text-sm mb-1">Var(Physics) = [(-4)² + (0)² + (4)²] / 2 = (16 + 0 + 16) / 2 = <span className="font-bold text-indigo-700">16</span></p>
          <p className="font-mono text-slate-800 text-sm mb-4">Cov(Math, Physics) = [(-2)(-4) + (0)(0) + (2)(4)] / 2 = (8 + 0 + 8) / 2 = <span className="font-bold text-indigo-700">8</span></p>
          <p className="text-slate-800 font-bold mb-2">Covariance Matrix [2x2]:</p>
          <div className="bg-white p-3 rounded border border-emerald-200 font-mono text-slate-800 inline-block text-center whitespace-pre-wrap">
{`| 4   8 |
| 8  16 |`}
          </div>
          <p className="text-slate-700 text-sm mt-3 italic">This symmetric matrix shows a perfect positive covariance between the subjects.</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 3 — Compute Eigenvalues and Eigenvectors</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          This step uses linear algebra to extract the magical "components". <strong>Eigenvectors</strong> tell us the direction of the new axes, and <strong>Eigenvalues</strong> tell us how much variance each direction captures.
        </p>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">Calculation via the Characteristic Equation: det(A - λI) = 0</p>
          <div className="bg-white p-3 rounded border border-amber-200 font-mono text-slate-800 inline-block text-center whitespace-pre-wrap mb-4">
{`| 4 - λ    8   |
|   8   16 - λ | = 0`}
          </div>
          <p className="font-mono text-slate-800 text-sm mb-2">(4 - λ)(16 - λ) - (8 * 8) = 0</p>
          <p className="font-mono text-slate-800 text-sm mb-2">64 - 4λ - 16λ + λ² - 64 = 0</p>
          <p className="font-mono text-slate-800 text-sm mb-4">λ² - 20λ = 0  ⇒  λ(λ - 20) = 0</p>
          
          <p className="text-slate-800 font-bold mb-2">The Eigenvalues (λ) are:</p>
          <ul className="font-mono text-slate-800 text-sm space-y-2 mb-6">
            <li>λ₁ = <span className="font-bold text-indigo-700 bg-indigo-100 px-1 rounded">20</span> (Captures 100% of the mathematical variance structure)</li>
            <li>λ₂ = <span className="font-bold text-rose-600 bg-rose-100 px-1 rounded">0</span> (Captures 0% of the variance)</li>
          </ul>
          
          <p className="text-slate-800 font-bold mb-2">The Principal Eigenvector (for λ₁ = 20):</p>
          <p className="text-slate-800 text-sm leading-relaxed">
            Plugging λ = 20 back into the matrix gives the foundational direction vector: <span className="font-mono font-bold text-indigo-700">[1, 2]</span>. 
            This validates that for every 1 step in Math, Physics moves 2 steps.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 4 & 5 — Sort, Select, and Transform</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Because λ₁ = 20 and λ₂ = 0, our first Principal Component (PC1) captures 100% of the information! The original 2D data was secretly 1-Dimensional data hiding in a 2D space.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          We can now drop the second dimension entirely and project our centered data onto PC1 to get our completely new dataset.
        </p>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-blue-900 text-lg mb-2">Final 1D Transformation</p>
          <p className="text-slate-800 mb-4 italic text-sm">Formula: Final Data = Centered Data Matrix × Eigenvector [1, 2]</p>
          <ul className="font-mono text-slate-800 text-sm space-y-3 mb-6 bg-white p-4 rounded border border-blue-100">
            <li><span className="font-bold text-slate-900">Student A (PC1):</span> (-2 × 1) + (-4 × 2) = -2 - 8 = <span className="font-bold text-indigo-700 text-lg">-10</span></li>
            <li><span className="font-bold text-slate-900">Student B (PC1):</span> (0 × 1) + (0 × 2)  =  0 + 0 = <span className="font-bold text-indigo-700 text-lg">0</span></li>
            <li><span className="font-bold text-slate-900">Student C (PC1):</span> (2 × 1) + (4 × 2)  =  2 + 8 = <span className="font-bold text-indigo-700 text-lg">10</span></li>
          </ul>
          <p className="text-slate-800 font-bold mb-2">Resulting Matrix:</p>
          <p className="text-slate-800 text-base leading-relaxed">
            We successfully compressed our Math & Physics scores into a single mathematically optimal 1D array <span className="font-mono bg-indigo-100 px-2 py-1 rounded text-indigo-800 font-bold">[-10, 0, 10]</span> without losing <em>any</em> relative variance between the students!
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="scree-plot">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> Scree Plot Interpretation
        </h2>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          A scree plot helps determine the optimal number of components to keep. Sharp drops (the "elbow") indicate the last set of highly important components.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-10 w-full max-w-3xl">
          <h4 className="font-bold text-slate-800 text-lg mb-4 text-center">Variance Explained by Components</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={screeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="component" />
                <YAxis unit="%" />
                <Tooltip />
                <Line type="monotone" dataKey="variance" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="real-life-examples">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Real-Life Examples</h2>

        <div className="flex flex-col space-y-10 mb-10">
          <div>
            <div className="flex items-center mb-4">
              <Eye className="text-indigo-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-slate-900">Face Recognition</h3>
            </div>
            <p className="text-lg text-slate-800 mb-4">
              Suppose an image contains 10,000 pixels. Using all pixels directly is computationally expensive.
            </p>
            <p className="text-lg text-slate-800 mb-4">
              PCA compresses image information into <strong>important facial patterns</strong> (Eigenfaces), dramatically reducing dimensions.
            </p>
            <p className="text-sm font-bold text-indigo-700">Applications: Face recognition, Image compression, Computer vision.</p>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <Activity className="text-indigo-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-slate-900">Stock Market Analysis</h3>
            </div>
            <p className="text-lg text-slate-800 mb-4">
              Financial datasets contain heavily correlated variables: Stock prices, Interest rates, Inflation, and Currency values.
            </p>
            <p className="text-lg text-slate-800 mb-4">
              PCA helps identify the <strong>underlying market factors</strong>, eliminating noise and redundancy.
            </p>
            <p className="text-sm font-bold text-indigo-700">Applications: Portfolio optimization, Risk modeling.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="code-implementation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Python Implementation of PCA</h2>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: applying PCA with Scikit-Learn</h4>
          </div>
          <div className="p-0">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`# Step 1 — Import Libraries
import matplotlib.pyplot as plt
import pandas as pd

from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# Step 2 — Load Dataset
iris = load_iris()
X = iris.data
y = iris.target

# Step 3 — Standardize Data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 4 — Apply PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# Step 5 — Explained Variance
print(pca.explained_variance_ratio_)
# Output: [0.729 0.228]

# Step 6 — Visualization
plt.scatter(
    X_pca[:,0],
    X_pca[:,1],
    c=y
)

plt.xlabel("PC1")
plt.ylabel("PC2")
plt.title("PCA Projection")
plt.show()`}</code></pre>
            </div>
          </div>
          <div className="bg-slate-50 border-t border-slate-200 p-4">
            <p className="font-mono text-sm mb-2 text-slate-800"><strong>Code Interpretation:</strong></p>
            <p className="text-sm text-slate-600 mt-2">
              The output <span className="font-mono text-indigo-700 bg-indigo-50 px-1 rounded">[0.729, 0.228]</span> means PC1 captures 72.9% of the data variance, and PC2 captures 22.8%. By using just 2 dimensions instead of 4, we preserved 95.7% of the total dataset information!
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-and-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Advantages & Disadvantages</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages of PCA</h3>
          <ol className="list-decimal pl-6 mb-8 text-lg text-slate-800 space-y-4">
            <li><strong>Reduces Dimensions:</strong> Creates smaller datasets leading to faster training and lower memory usage.</li>
            <li><strong>Removes Redundancy:</strong> Highly correlated features are effectively combined and compressed.</li>
            <li><strong>Reduces Overfitting:</strong> Removing noisy components improves generalized model performance.</li>
            <li><strong>Improves Visualization:</strong> High-dimensional data becomes visualizable in 2D or 3D spaces.</li>
          </ol>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Disadvantages of PCA</h3>
          <ol className="list-decimal pl-6 mb-8 text-lg text-slate-800 space-y-4">
            <li><strong>Loss of Interpretability:</strong> Principal components are abstract mathetical combinations of original variables, making them harder to interpret directly.</li>
            <li><strong>Information Loss:</strong> Dropping lower-variance components may occasionally discard useful labels or nuanced information.</li>
            <li><strong>Assumes Linear Relationships:</strong> PCA works best when features exhibit linear correlations; it fails on complex non-linear manifolds.</li>
          </ol>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">PCA vs Feature Selection</h3>
        <div className="overflow-x-auto mb-8 max-w-3xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Attribute</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700">PCA</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Feature Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Mechanism</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Creates new variables</td>
                <td className="px-6 py-4 text-sm text-slate-700">Keeps original variables</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Goal</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Reduces dimensions</td>
                <td className="px-6 py-4 text-sm text-slate-700">Removes features</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Technique</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-medium">Uses spatial transformations</td>
                <td className="px-6 py-4 text-sm text-slate-700">Uses filter/wrapper selection</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Applications of PCA</h2>
        <div className="font-mono text-emerald-900 bg-emerald-50 p-6 rounded-xl border border-emerald-100 whitespace-pre overflow-x-auto mb-8">
{`APPLICATIONS
│
├── Image Compression
├── Face Recognition
├── Data Visualization
├── Noise Reduction
├── Finance (Portfolio Modeling)
├── Bioinformatics (Genomics)
├── Recommendation Systems
├── Signal Processing
└── Medical Diagnosis`}
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Principal Component Analysis (PCA) is a powerful dimensionality reduction algorithm that transforms high-dimensional correlated data into fewer principal components while strictly preserving the maximum amount of variance. It achieves this mathematically by computing eigenvectors and eigenvalues from a standardized covariance matrix.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        PCA is widely adopted across industries to improve computational efficiency, mitigate overfitting, eliminate feature redundancy, and enable accurate low-dimensional visualizations of extremely complex datasets.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          The core realization behind PCA is that real-world data almost always contains hidden redundancy and correlated dependencies. PCA mathematically discovers the most informative, varying directions inside the data and efficiently compresses information across those new axes, ensuring minimal data loss.
        </p>
      </div>

    </>
  );
}
