import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ScatterChart, Scatter, LabelList, Cell, ZAxis, BarChart, Bar, Legend, ComposedChart, Line, LineChart } from 'recharts';
import { Target, TrendingUp, AlertTriangle, Lightbulb, BookOpen, Calculator, Code, Layers, ArrowRight, ArrowDown } from 'lucide-react';
import { GradientDescentDiagram } from '../../components/diagrams/MLDiagrams';

export function GradientDescentContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Gradient Descent</h1>
      
      <p className="text-lg leading-relaxed mb-4">
        Gradient Descent is an optimization algorithm that helps models learn patterns from data by minimizing prediction errors through iterative parameter updates.</p>

      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">What is Gradient Descent?</h2>
      <p className="text-lg leading-relaxed mb-4">
        Gradient Descent is an optimization algorithm used to minimize a loss function by repeatedly adjusting model parameters in the direction that reduces error.
      </p>
      <p className="text-lg text-slate-800 font-medium mb-6">
        <em>In simple terms: Gradient Descent teaches a machine learning model how to improve itself step by step.</em>
      </p>

      {/* Real-Life Intuition Section */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Real-Life Intuition</h3>
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg mb-6">
        <p className="text-lg leading-relaxed mb-4 text-emerald-900">
          Imagine standing on a mountain in dense fog and trying to reach the lowest valley. You cannot see the complete landscape, but you can feel the slope beneath your feet.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-emerald-800 text-lg">
          <li>If the ground slopes downward → move that way</li>
          <li>If slope becomes flatter → slow down</li>
          <li>Eventually → reach the lowest point</li>
        </ul>
        <p className="text-lg font-medium text-emerald-900 mt-4">
          This is exactly how Gradient Descent works.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Core Objective of Gradient Descent</h3>
      <p className="text-lg leading-relaxed mb-4">The main goals are:</p>
      <ul className="list-disc pl-6 space-y-2 text-slate-800 text-lg mb-8">
        <li>Minimize prediction error</li>
        <li>Reduce cost function value</li>
        <li>Optimize model parameters</li>
        <li>Improve prediction accuracy</li>
        <li>Train machine learning models</li>
      </ul>

      {/* Visual Overview */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Visual Overview of Gradient Descent</h3>
      <GradientDescentDiagram />
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 overflow-hidden shadow-sm flex flex-col items-center">
        <div className="w-full flex justify-between px-8 text-sm font-bold text-slate-500 mb-2">
          <span>HIGH ERROR</span>
          <span className="text-emerald-600">LOW ERROR</span>
        </div>
        <div className="h-[250px] w-full max-w-lg relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({length: 41}, (_, i) => ({x: i - 20, y: Math.pow(i - 20, 2)}))} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
              <XAxis dataKey="x" hide />
              <YAxis hide domain={[0, 'dataMax']} />
              <Area type="monotone" dataKey="y" stroke="#3b82f6" fill="#bfdbfe" fillOpacity={0.5} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="absolute top-[10%] left-[10%] w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md" title="Current Position"></div>
          <div className="absolute top-[10%] left-[15%] text-xs font-bold text-red-600 whitespace-nowrap">Current Position</div>
          
          <div className="absolute bottom-[2%] left-[48%] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md" title="Global Minimum"></div>
          <div className="absolute bottom-[8%] left-[50%] -translate-x-1/2 text-xs font-bold text-emerald-700 whitespace-nowrap">Global Minimum</div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-10 mb-4">Core Components of Gradient Descent</h3>
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-8 shadow-sm">
        <p className="font-bold text-indigo-900 mb-6 text-lg text-center">Hierarchical Structure</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-indigo-200 text-center w-full md:w-1/3 transition-transform hover:-translate-y-1">
            <h4 className="font-bold text-indigo-800 text-lg">Cost Function</h4>
            <p className="text-sm text-slate-600 mt-2 font-medium bg-slate-100 py-1 rounded">Measures Error</p>
          </div>
          <ArrowRight className="hidden md:block text-indigo-300 w-8 h-8" />
          <ArrowDown className="block md:hidden text-indigo-300 w-8 h-8" />
          <div className="bg-white p-5 rounded-lg shadow-sm border border-indigo-200 text-center w-full md:w-1/3 transition-transform hover:-translate-y-1">
            <h4 className="font-bold text-indigo-800 text-lg">Gradient</h4>
            <p className="text-sm text-slate-600 mt-2 font-medium bg-slate-100 py-1 rounded">Direction of Change</p>
          </div>
          <ArrowRight className="hidden md:block text-indigo-300 w-8 h-8" />
          <ArrowDown className="block md:hidden text-indigo-300 w-8 h-8" />
          <div className="bg-white p-5 rounded-lg shadow-sm border border-indigo-200 text-center w-full md:w-1/3 transition-transform hover:-translate-y-1">
            <h4 className="font-bold text-indigo-800 text-lg">Learning Rate</h4>
            <p className="text-sm text-slate-600 mt-2 font-medium bg-slate-100 py-1 rounded">Step Size</p>
          </div>
        </div>
      </div>

      {/* Cost Function Section */}
      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">Understanding the Cost Function</h2>
      <p className="text-lg leading-relaxed mb-4">
        A Cost Function measures how wrong a model's predictions are.
      </p>
      <p className="text-lg leading-relaxed mb-4">Lower cost means:</p>
      <ul className="list-disc pl-6 space-y-2 text-slate-800 text-lg mb-8">
        <li>Better predictions</li>
        <li>Better learning</li>
        <li>Better optimization</li>
      </ul>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Cost Function Visualization</h3>
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 shadow-sm">
        <div className="h-[250px] w-full max-w-xl mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.from({length: 30}, (_, i) => ({ iteration: i, error: 100 * Math.exp(-0.15 * i) }))} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="iteration" label={{ value: 'Iterations', position: 'insideBottom', offset: -10 }} stroke="#64748b" />
              <YAxis label={{ value: 'Error', angle: -90, position: 'insideLeft', offset: 0 }} stroke="#64748b" />
              <Line type="monotone" dataKey="error" stroke="#ef4444" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-6 text-slate-600 italic text-center text-sm font-medium">As training progresses, the error reduces gradually.</p>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Mean Squared Error (MSE)</h3>
      <p className="text-lg leading-relaxed mb-4">
        MSE is a common cost function used in regression models.
      </p>
      
      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Formula</p>
        <code className="text-slate-900 font-mono text-xl block mb-4">MSE = (1/n) * Σ(yᵢ - ŷᵢ)²</code>
        <ul className="list-disc list-inside text-slate-800">
          <li><strong>yᵢ</strong> = actual value</li>
          <li><strong>ŷᵢ</strong> = predicted value</li>
          <li><strong>n</strong> = total samples</li>
        </ul>
      </div>

      {/* Mathematical Calculation Example */}
      <h3 className="text-2xl font-bold text-indigo-800 mt-8 mb-4">Worked Example for MSE</h3>
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-8 shadow-sm">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse bg-white rounded-md overflow-hidden">
            <thead>
              <tr className="bg-amber-100 border-b border-amber-200 text-amber-900">
                <th className="p-3 font-semibold">Actual</th>
                <th className="p-3 font-semibold">Predicted</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-amber-50">
                <td className="p-3">10</td>
                <td className="p-3">12</td>
              </tr>
              <tr className="border-b border-amber-50">
                <td className="p-3">20</td>
                <td className="p-3">18</td>
              </tr>
              <tr>
                <td className="p-3">30</td>
                <td className="p-3">33</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="font-bold text-amber-900 mb-2">Step 1 — Compute squared errors</p>
        <ul className="list-disc pl-5 mb-4 text-amber-800 space-y-1">
          <li>(10 - 12)² = (-2)² = 4</li>
          <li>(20 - 18)² = (2)² = 4</li>
          <li>(30 - 33)² = (-3)² = 9</li>
        </ul>
        
        <p className="font-bold text-amber-900 mb-2">Step 2 — Average errors</p>
        <ul className="list-none pl-0 mb-0 text-amber-800 font-mono space-y-1">
          <li>MSE = (4 + 4 + 9) / 3</li>
          <li>MSE = 17 / 3</li>
          <li>MSE = 5.67</li>
        </ul>
      </div>

      {/* What is a Gradient Section */}
      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">What is a Gradient?</h2>
      <p className="text-lg leading-relaxed mb-4">The gradient indicates:</p>
      <ul className="list-disc pl-6 space-y-2 text-slate-800 text-lg mb-6">
        <li>Direction of maximum increase</li>
        <li>Slope of the function</li>
        <li>Rate of change</li>
      </ul>
      <p className="text-lg font-medium text-slate-900 mb-6 bg-slate-100 p-3 rounded-md">
        Gradient Descent moves in the <strong>opposite direction</strong> of the gradient to reduce errors.
      </p>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Gradient Visualization</h3>
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 shadow-sm">
        <div className="h-[250px] w-full max-w-lg mx-auto relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({length: 41}, (_, i) => ({x: i - 20, y: Math.pow(i - 20, 2)}))} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
              <XAxis dataKey="x" hide />
              <YAxis hide domain={[0, 'dataMax']} />
              <Area type="monotone" dataKey="y" stroke="#64748b" fill="none" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="absolute top-[30%] left-[25%] w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md z-10"></div>
          <div className="absolute top-[30%] left-[25%] w-24 border-t-2 border-red-500 transform -rotate-[45deg] origin-left shadow-sm"></div>
          <p className="absolute top-[18%] left-[25%] text-xs font-bold text-slate-700 bg-white/80 px-1 rounded">Tangent (Slope)</p>
          <div className="absolute top-[33%] left-[28%] flex items-center text-blue-600 font-bold text-sm bg-white/80 px-1 rounded">
            Step <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
        <p className="text-center text-slate-700 font-medium mt-4">Gradient Descent moves in the opposite direction of the gradient slope.</p>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Gradient Descent Formula</h3>
      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Parameter Update Equation</p>
        <code className="text-slate-900 font-mono text-xl block mb-4">θ = θ - α * (∂J/∂θ)</code>
        <ul className="list-disc list-inside text-slate-800">
          <li><strong>θ</strong> = parameter or weight</li>
          <li><strong>α</strong> = learning rate</li>
          <li><strong>J</strong> = cost function</li>
          <li><strong>∂J/∂θ</strong> = gradient</li>
        </ul>
      </div>

      <h4 className="text-xl font-bold text-slate-800 mb-3">Formula Breakdown</h4>
      <p className="text-lg leading-relaxed mb-4">The equation means:</p>
      <ol className="list-decimal pl-6 space-y-2 text-slate-800 text-lg mb-8">
        <li>Calculate current error</li>
        <li>Find gradient</li>
        <li>Move opposite gradient direction</li>
        <li>Update parameter</li>
        <li>Repeat until minimum error</li>
      </ol>

      <h3 className="text-2xl font-bold text-indigo-800 mt-8 mb-4">Worked Example of Gradient Update</h3>
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-8 shadow-sm">
        <p className="font-bold text-amber-900 mb-3">Suppose:</p>
        <ul className="list-disc pl-5 mb-4 text-amber-800 space-y-1">
          <li>Current weight = 8</li>
          <li>Learning rate = 0.2</li>
          <li>Gradient = 5</li>
        </ul>
        
        <p className="font-bold text-amber-900 mb-2">Then:</p>
        <ul className="list-none pl-0 mb-4 text-amber-800 font-mono space-y-1">
          <li>θ = 8 - 0.2 * (5)</li>
          <li>θ = 8 - 1</li>
          <li>θ = 7</li>
        </ul>
        <p className="font-medium text-amber-900 bg-amber-200/50 p-2 rounded inline-block">Updated parameter becomes 7.</p>
      </div>

      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">Step-by-Step Working Process</h2>
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-8 shadow-sm flex flex-col items-center">
        <p className="font-bold text-indigo-900 mb-6 text-xl">Complete Gradient Descent Workflow</p>
        <div className="w-full max-w-sm flex flex-col gap-2">
          {["Initialize Parameters", "Generate Predictions", "Calculate Error", "Compute Gradients", "Update Parameters", "Repeat Iteratively"].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-white border text-lg border-indigo-200 text-indigo-800 font-bold py-4 px-6 rounded-lg shadow-sm w-full text-center">
                {step}
              </div>
              {i < 5 && <ArrowDown className="text-indigo-400 w-8 h-8 my-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Continue with Learning Rate and Variants */}
      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">Learning Rate in Gradient Descent</h2>
      <p className="text-lg leading-relaxed mb-4">
        The learning rate determines the size of each parameter update step.
      </p>
      
      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Learning Rate Formula</p>
        <code className="text-slate-900 font-mono text-xl block">W_new = W_old - α × gradient</code>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Learning Rate Visualization</h3>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        The learning rate (η) is the single most important hyperparameter in gradient descent. It controls <em>how large a step</em> the algorithm takes at each iteration along the loss surface. Too small and training crawls; too large and the algorithm overshoots the minimum entirely.
      </p>

      {/* SVG Learning Rate Diagram */}
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
            Figure — Effect of Learning Rate on Gradient Descent Convergence
          </figcaption>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Small LR */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
              <div className="bg-blue-600 px-4 py-2.5 text-center">
                <span className="text-white font-bold text-sm">η = 0.001 · Too Small</span>
              </div>
              <div className="p-4">
                <svg viewBox="0 0 200 130" className="w-full" aria-label="Small learning rate: many tiny steps down the loss curve, slow to reach minimum">
                  {/* loss curve */}
                  <path d="M 15,110 Q 100,5 185,110" fill="#dbeafe" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                  {/* tiny steps */}
                  {[20,34,48,62,76,90,103,114,122,128,132,135].map((x,i) => {
                    const y = (x < 100) ? (110 - 0.011*(x-15)*(185-x)) : (110 - 0.011*(185-x)*(x-15));
                    return <circle key={i} cx={x} cy={y} r="3.5" fill="#3b82f6" opacity="0.9" />;
                  })}
                  <circle cx="100" cy="5" r="5" fill="#10b981" />
                  <text x="100" y="125" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="600">Many tiny steps → very slow</text>
                  <text x="15" y="118" fontSize="8" fill="#64748b">Start</text>
                  <text x="85" y="14" fontSize="8" fill="#10b981" fontWeight="600">Min</text>
                </svg>
                <p className="text-xs text-blue-800 mt-2 text-center leading-relaxed"><strong>Result:</strong> Training takes thousands of epochs. Computationally expensive. Risk of getting stuck in shallow local minima.</p>
              </div>
            </div>

            {/* Large LR */}
            <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden">
              <div className="bg-red-600 px-4 py-2.5 text-center">
                <span className="text-white font-bold text-sm">η = 10.0 · Too Large</span>
              </div>
              <div className="p-4">
                <svg viewBox="0 0 200 130" className="w-full" aria-label="Large learning rate: steps overshoot the minimum, bouncing back and forth">
                  {/* loss curve */}
                  <path d="M 15,110 Q 100,5 185,110" fill="#fee2e2" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" />
                  {/* overshooting steps */}
                  <circle cx="25" cy="100" r="4.5" fill="#ef4444" />
                  <line x1="25" y1="100" x2="172" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="172" cy="100" r="4.5" fill="#ef4444" />
                  <line x1="172" y1="100" x2="35" y2="96" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="35" cy="96" r="4.5" fill="#ef4444" />
                  <line x1="35" y1="96" x2="162" y2="97" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="162" cy="97" r="4.5" fill="#ef4444" />
                  <circle cx="100" cy="5" r="5" fill="#10b981" />
                  <text x="100" y="125" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="600">Overshoots → diverges</text>
                  <text x="15" y="118" fontSize="8" fill="#64748b">Start</text>
                  <text x="85" y="14" fontSize="8" fill="#10b981" fontWeight="600">Min</text>
                  <text x="100" y="68" textAnchor="middle" fontSize="8" fill="#ef4444" fontStyle="italic">bouncing ↔</text>
                </svg>
                <p className="text-xs text-red-800 mt-2 text-center leading-relaxed"><strong>Result:</strong> Algorithm bounces past the minimum each step. Loss may never decrease — or even diverge to infinity.</p>
              </div>
            </div>

            {/* Optimal LR */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl overflow-hidden">
              <div className="bg-emerald-600 px-4 py-2.5 text-center">
                <span className="text-white font-bold text-sm">η = 0.01 · Optimal</span>
              </div>
              <div className="p-4">
                <svg viewBox="0 0 200 130" className="w-full" aria-label="Optimal learning rate: steps curve smoothly down to the minimum in few iterations">
                  {/* loss curve */}
                  <path d="M 15,110 Q 100,5 185,110" fill="#d1fae5" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
                  {/* smooth steps */}
                  {[22,45,65,80,91,98,102].map((x,i) => {
                    const yv = 110 - 0.011*(x-15)*(185-x);
                    return <circle key={i} cx={x} cy={yv} r="4" fill="#10b981" opacity="0.9" />;
                  })}
                  <circle cx="100" cy="5" r="6" fill="#10b981" />
                  <text x="100" y="125" textAnchor="middle" fontSize="9" fill="#065f46" fontWeight="600">Smooth descent → converges fast</text>
                  <text x="15" y="118" fontSize="8" fill="#64748b">Start</text>
                  <text x="80" y="14" fontSize="8" fill="#10b981" fontWeight="700">✓ Min</text>
                </svg>
                <p className="text-xs text-emerald-800 mt-2 text-center leading-relaxed"><strong>Result:</strong> Converges steadily in a reasonable number of epochs. Loss decreases smoothly each step.</p>
              </div>
            </div>
          </div>
        </figure>
      </div>

      {/* Comparison table */}
      <div className="not-prose overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200 text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-5 py-3 font-semibold">Learning Rate</th>
              <th className="px-5 py-3 font-semibold">Typical Value</th>
              <th className="px-5 py-3 font-semibold">Behaviour</th>
              <th className="px-5 py-3 font-semibold">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-blue-50">
              <td className="px-5 py-3 font-bold text-blue-700">Too Small</td>
              <td className="px-5 py-3 font-mono">η &lt; 0.0001</td>
              <td className="px-5 py-3">Tiny steps, crawls toward minimum</td>
              <td className="px-5 py-3 text-blue-700">Slow training, stuck in local minima</td>
            </tr>
            <tr className="hover:bg-red-50">
              <td className="px-5 py-3 font-bold text-red-700">Too Large</td>
              <td className="px-5 py-3 font-mono">η &gt; 1.0</td>
              <td className="px-5 py-3">Overshoots minimum, bounces wildly</td>
              <td className="px-5 py-3 text-red-700">Divergence, loss increases</td>
            </tr>
            <tr className="hover:bg-emerald-50 bg-emerald-50/40">
              <td className="px-5 py-3 font-bold text-emerald-700">✓ Optimal</td>
              <td className="px-5 py-3 font-mono">0.001 – 0.1</td>
              <td className="px-5 py-3">Steady, smooth convergence</td>
              <td className="px-5 py-3 text-emerald-700">None — this is the goal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <p className="font-bold text-amber-900 mb-2">💡 Practical Tips for Choosing Learning Rate</p>
        <ul className="text-sm text-amber-800 space-y-1.5 list-disc pl-5">
          <li>Start with <strong>η = 0.01</strong> as a default and adjust based on validation loss</li>
          <li>Use a <strong>learning rate scheduler</strong> (e.g., reduce on plateau) to decay η as training progresses</li>
          <li>Run a <strong>learning rate range test</strong>: train for a few epochs while exponentially increasing η, then pick the value just before loss starts rising</li>
          <li>Modern optimisers like <strong>Adam</strong> are less sensitive to η choice than vanilla SGD</li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Problems with Learning Rate</h3>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
              <th className="p-4 font-semibold text-lg">Learning Rate</th>
              <th className="p-4 font-semibold text-lg">Effect</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 text-lg divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium">Too Small</td>
              <td className="p-4">Extremely slow training</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium">Too Large</td>
              <td className="p-4">Divergence and instability</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium text-emerald-600">Optimal</td>
              <td className="p-4 text-emerald-600">Fast and stable convergence</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">Variants of Gradient Descent</h2>
      <p className="text-lg leading-relaxed mb-6">
        Gradient Descent has several variants optimized for different datasets and computational requirements.
      </p>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-10 shadow-sm flex flex-col items-center">
        <p className="font-bold text-indigo-900 mb-6 text-lg">Hierarchical Tree of Gradient Descent Variants</p>
        <div className="flex flex-col items-center w-full max-w-4xl">
          <div className="bg-white border-2 border-indigo-500 text-indigo-900 font-bold py-2 px-6 rounded-lg mb-0 z-10 relative">Gradient Descent</div>
          <div className="w-full flex justify-center mt-0 mb-0 px-[16.66%]">
            <div className="border-t-2 border-l-2 border-r-2 border-indigo-300 w-full h-6 rounded-t-lg -mt-3"></div>
          </div>
          <div className="flex w-full justify-between gap-4 mb-4 relative relative z-10">
            <div className="w-1/3 flex flex-col items-center">
              <div className="bg-white border border-indigo-200 text-indigo-800 font-semibold py-2 px-4 rounded text-center w-full shadow-sm text-sm">Batch GD</div>
            </div>
            <div className="w-1/3 flex flex-col items-center relative">
              <div className="bg-white border-2 border-indigo-400 text-indigo-800 font-semibold py-2 px-4 rounded text-center w-full shadow-sm text-sm">Mini-Batch GD</div>
              <div className="border-l-2 border-indigo-300 h-8 absolute -bottom-8"></div>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              <div className="bg-white border border-indigo-200 text-indigo-800 font-semibold py-2 px-4 rounded text-center w-full shadow-sm text-sm">Stochastic GD</div>
            </div>
          </div>
          <div className="mt-6 w-full flex flex-col items-center">
            <ArrowDown className="text-indigo-400 w-6 h-6 mb-2" />
            <div className="bg-indigo-100 border border-indigo-300 text-indigo-900 font-bold py-2 px-6 rounded mb-0 z-10 relative text-sm">Advanced Optimizers</div>
            <div className="w-full flex justify-center mt-0 mb-0 px-[12.5%]">
              <div className="border-t-2 border-l-2 border-r-2 border-indigo-300 w-full h-6 rounded-t-lg -mt-3"></div>
            </div>
            <div className="flex w-full justify-between gap-2 md:gap-4 relative z-10">
              {["Momentum", "Adagrad", "RMSProp", "Adam"].map((opt, i) => (
                <div key={opt} className={`w-1/4 flex flex-col items-center relative`}>
                  {i > 0 && i < 3 && <div className="absolute -top-6 w-[2px] h-6 bg-indigo-300"></div>}
                  <div className="bg-white border border-indigo-200 text-indigo-800 font-medium py-2 px-1 md:px-4 rounded text-center w-full shadow-sm text-xs md:text-sm">{opt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Batch GD */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">1. Batch Gradient Descent</h3>
      <div className="not-prose bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-5 mb-5">
        <p className="font-bold text-blue-900 mb-1">Core idea</p>
        <p className="text-blue-800 text-sm leading-relaxed">
          Batch GD computes the gradient of the loss function using <strong>the entire training dataset</strong> in a single pass before updating the model parameters once. Think of it as a professor who reads every exam paper in the class before deciding how to adjust the teaching — perfectly informed but slow.
        </p>
      </div>
      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Because it averages gradients across all <em>m</em> examples, the update direction is very stable and noise-free. This makes Batch GD reliable for small, well-understood datasets, but impractical when datasets have millions of rows — loading everything into memory just to compute one update step is extremely expensive.
      </p>

      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md block">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Batch GD Formula</p>
        <code className="text-slate-900 font-mono text-xl block mb-2">θ = θ - α * (1/m) * Σ ∇J_i(θ)</code>
        <p className="text-sm text-slate-700 italic">Where m = total number of samples.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Workflow Diagram</p>
          <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-700 pb-4">
            <div className="bg-white border border-slate-300 rounded px-4 py-3 w-full max-w-xs text-center shadow-sm font-bold text-slate-700">Entire Dataset</div>
            <ArrowDown className="w-5 h-5 text-slate-400" />
            <div className="bg-white border border-slate-300 rounded px-4 py-3 w-full max-w-xs text-center shadow-sm">Compute Full Vectorized Gradient</div>
            <ArrowDown className="w-5 h-5 text-slate-400" />
            <div className="bg-white border border-slate-300 rounded px-4 py-3 w-full max-w-xs text-center shadow-sm bg-blue-50 font-medium text-blue-700">Update Parameters (Once per epoch)</div>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wider">Characteristics</p>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-center"><span className="w-32 font-medium">Dataset Usage:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm">Full dataset</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Speed per step:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm text-red-600">Slow</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Stability:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm text-emerald-600">High</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Memory Usage:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm">High</span></li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="font-bold text-emerald-700 mb-2 text-lg">Advantages</p>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>Stable convergence</li>
            <li>Accurate gradients</li>
            <li>Smooth optimization path</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-red-600 mb-2 text-lg">Disadvantages</p>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>Slow for huge datasets</li>
            <li>Requires large memory</li>
            <li>Inefficient for real-time learning</li>
          </ul>
        </div>
      </div>
      
      <p className="font-bold text-slate-800 mb-2 mt-4 text-lg">Best Use Cases:</p>
      <p className="text-slate-700 mb-8 border-l-2 border-slate-300 pl-4 py-1">Small datasets, Convex optimization problems, Offline training</p>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mb-12 shadow-sm">
        <p className="font-bold text-amber-900 mb-3 text-lg border-b border-amber-200 pb-2">Batch GD Numericals / Example</p>
        <p className="text-amber-800 mb-2">Suppose a dataset has 1000 records. Wait for all 1000 examples to calculate the cumulative gradient.</p>
        <div className="bg-white p-4 rounded border border-amber-200 font-mono text-sm">
          <p className="mb-1 text-slate-600">Gradient sum = Σ (error_i) for i=1 to 1000</p>
          <p className="mb-1">Let total gradient = 4500, m = 1000, lr = 0.01.</p>
          <p className="font-bold text-amber-900 mt-2">θ = θ - 0.01 * (4500 / 1000)</p>
          <p className="font-bold text-amber-900">θ = θ - 0.045</p>
        </div>
        <p className="text-amber-900 font-medium mt-3 bg-amber-100 p-2 rounded">Result: Only <strong>1 parameter update</strong> happens per epoch.</p>
      </div>

      {/* 2. SGD */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">2. Stochastic Gradient Descent (SGD)</h3>
      <div className="not-prose bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-5 mb-5">
        <p className="font-bold text-orange-900 mb-1">Core idea</p>
        <p className="text-orange-800 text-sm leading-relaxed">
          SGD updates model parameters after <strong>every single training example</strong>. Rather than waiting to see all data, it makes a quick, rough guess at the gradient from one sample and immediately takes a step. Think of a student who adjusts study strategy after every single practice question — very reactive, sometimes erratic, but learns fast.
        </p>
      </div>
      <p className="text-lg leading-relaxed mb-4 text-slate-700">
        Because each update is based on just one noisy sample, the path through parameter space is irregular and "bouncy" — it never settles into a perfectly smooth descent. Paradoxically, this noise is sometimes <em>beneficial</em>: it can kick the optimizer out of shallow local minima that would trap Batch GD. SGD is the foundation of modern deep learning training pipelines.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        SGD updates parameters after processing each individual training example.
      </p>

      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md block">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">SGD Formula</p>
        <code className="text-slate-900 font-mono text-xl block mb-2">θ = θ - α * ∇J_i(θ)</code>
        <p className="text-sm text-slate-700 italic">Where `i` is a randomly selected single data point.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">SGD Workflow</p>
          <div className="flex flex-col gap-2 relative">
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded shadow-sm text-sm">
                <span className="text-slate-800 font-medium">Data Point {i+1}</span>
                <ArrowRight className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded">Update θ</span>
              </div>
            ))}
            <div className="text-center text-slate-500 text-sm mt-1 italic">...repeats for every row</div>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wider">Characteristics</p>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-center"><span className="w-32 font-medium">Dataset Usage:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm">One sample</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Speed per step:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm text-emerald-600">Very Fast</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Stability:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm text-red-600">Noisy / High Variance</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Memory Usage:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm text-emerald-600">Very Low</span></li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="font-bold text-emerald-700 mb-2 text-lg">Advantages</p>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>Fastest parameter updates</li>
            <li>Lowest memory usage</li>
            <li>Helps escape shallow local minima (due to noise)</li>
            <li>Suitable for online streaming learning</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-red-600 mb-2 text-lg">Disadvantages</p>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>Unstable and erratic convergence path</li>
            <li>Oscillates heavily around the minimum</li>
            <li>Cannot utilize GPU vectorization optimally</li>
          </ul>
        </div>
      </div>

      <p className="font-bold text-slate-800 mb-2 mt-4 text-lg">Best Use Cases:</p>
      <p className="text-slate-700 mb-8 border-l-2 border-slate-300 pl-4 py-1">Streaming data, Online systems where memory is heavily constrained.</p>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mb-12 shadow-sm">
        <p className="font-bold text-amber-900 mb-3 text-lg border-b border-amber-200 pb-2">SGD Numericals / Example</p>
        <p className="text-amber-800 mb-3">Dataset with 1000 records. For the first item, error gradient = 5, lr = 0.01.</p>
        <div className="bg-white p-4 rounded border border-amber-200 font-mono text-sm">
          <p className="font-bold text-amber-900">θ = θ - 0.01 * 5</p>
          <p className="font-bold text-amber-900">θ = θ - 0.05</p>
        </div>
        <p className="text-amber-900 font-medium mt-3 bg-amber-100 p-2 rounded">Result: <strong>1000 parameter updates</strong> happen sequentially per epoch.</p>
      </div>

      {/* 3. Mini-Batch */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">3. Mini-Batch Gradient Descent</h3>
      <div className="not-prose bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-5 mb-5">
        <p className="font-bold text-emerald-900 mb-1">Core idea — the industry standard</p>
        <p className="text-emerald-800 text-sm leading-relaxed">
          Mini-Batch GD splits the dataset into small batches (typically 32–512 samples) and updates parameters after each batch. It is the <strong>best of both worlds</strong> — more stable than SGD (because it averages noise over a batch), yet far faster and more memory-efficient than Batch GD. This is what virtually every modern deep learning framework uses by default.
        </p>
      </div>
      <p className="text-lg leading-relaxed mb-4 -slate-700">
        The batch size is a critical hyperparameter. Smaller batches (16–32) introduce more gradient noise, which can act as regularisation. Larger batches (256–512) give smoother, more reliable gradient estimates but require more GPU memory. Modern hardware (GPUs/TPUs) is specifically optimised for the vectorised matrix operations that mini-batches enable, making this variant orders of magnitude faster in practice than the formula alone would suggest.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        Mini-Batch Gradient Descent combines the strengths of Batch GD and SGD. Instead of using the entire dataset or a single sample, it uses small, manageable batches.
      </p>

      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md block">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Mini-Batch GD Formula</p>
        <code className="text-slate-900 font-mono text-xl block mb-2">θ = θ - α * (1/B) * Σ_batch ∇J_i(θ)</code>
        <p className="text-sm text-slate-700 italic">Where `B` is the batch size (e.g., 32, 64).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Mini-Batch Workflow</p>
          <div className="flex flex-col gap-3 relative">
            <div className="bg-slate-800 text-white rounded px-4 py-2 w-full text-center shadow-sm font-bold mb-1 z-10">Full Dataset (e.g. 1000 items)</div>
            <div className="absolute left-6 top-10 bottom-6 border-l-3 border-slate-400/50"></div>
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="flex items-center ml-6 bg-white border border-slate-200 p-2 rounded shadow-sm text-sm z-10">
                <div className="w-6 border-t-3 border-slate-400/50 mr-2 -ml-6"></div>
                <span className="text-slate-700 font-medium flex-1">Batch {i+1} (e.g., 32 items)</span>
                <ArrowRight className="w-4 h-4 text-slate-400 mx-2" />
                <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">Update</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-3 uppercase text-sm tracking-wider">Characteristics</p>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-center"><span className="w-32 font-medium">Dataset Usage:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm text-blue-700 font-medium">Small batches</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Speed per step:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm">Fast</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">Stability:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm">Balanced</span></li>
            <li className="flex items-center"><span className="w-32 font-medium">GPU Efficiency:</span> <span className="bg-white px-2 py-1 rounded border shadow-sm text-emerald-600 font-bold">Maximized</span></li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="font-bold text-emerald-700 mb-2 text-lg">Advantages</p>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>Faster than Batch GD</li>
            <li>More stable than SGD</li>
            <li>Efficient for GPUs</li>
            <li>Widely used in Deep Learning</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-red-600 mb-2 text-lg">Disadvantages</p>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>Batch size tuning required</li>
            <li>More hyperparameters</li>
          </ul>
        </div>
      </div>

      <p className="font-bold text-slate-800 mb-2">Common Batch Sizes:</p>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
              <th className="p-3 font-semibold">Batch Size</th>
              <th className="p-3 font-semibold">Usage</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 divide-y divide-slate-100">
            <tr><td className="p-3 font-medium">16</td><td className="p-3">Small memory systems</td></tr>
            <tr><td className="p-3 font-medium">32</td><td className="p-3">Standard default</td></tr>
            <tr><td className="p-3 font-medium">64</td><td className="p-3">Balanced performance</td></tr>
            <tr><td className="p-3 font-medium">128+</td><td className="p-3">Large-scale training</td></tr>
          </tbody>
        </table>
      </div>

      {/* Advanced Optimizers Section */}
      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">Advanced Optimizers</h2>

      {/* Momentum */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">Momentum Optimization</h3>
      <p className="text-lg leading-relaxed mb-4">
        Momentum improves Gradient Descent by accelerating movement in consistent directions.
      </p>
      <p className="text-lg leading-relaxed mb-4"><strong>Core Idea:</strong> Momentum behaves like a rolling ball: it gains speed downhill, smooths zig-zag motion, and reaches the minimum faster.</p>
      
      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Momentum Formula</p>
        <code className="text-slate-900 font-mono text-xl block">v_t = β*v_(t-1) + α*∇J(θ)</code>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wider">Visualization</p>
          <div className="flex flex-col gap-6 pt-2">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Standard SGD (Noisy Zig-Zag)</p>
              <svg viewBox="0 0 200 40" className="w-full h-12 bg-white rounded border border-slate-200 shadow-inner px-2 py-1">
                <path d="M10,20 L30,5 L50,35 L70,10 L90,30 L110,12 L130,28 L150,15 L170,25 L180,20" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="180" cy="20" r="3" fill="#ef4444"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-2">With Momentum (Smooth & Fast)</p>
              <svg viewBox="0 0 200 40" className="w-full h-12 bg-white rounded border border-slate-200 shadow-inner px-2 py-1">
                <path d="M10,20 Q50,0 120,20 T180,20" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="180" cy="20" r="4" fill="#10b981"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg shadow-sm flex flex-col justify-center">
          <p className="font-bold text-amber-900 mb-3 text-lg border-b border-amber-200 pb-2">Worked Example / Numerical</p>
          <div className="bg-white p-4 rounded border border-amber-200 font-mono text-sm mb-3">
            <ul className="list-disc pl-5 mb-3 text-amber-800 space-y-1">
              <li>Previous velocity = 2</li>
              <li>β (momentum term) = 0.9</li>
              <li>Gradient (∇J) = 3</li>
              <li>α (learning rate) = 0.1</li>
            </ul>
            <p className="font-bold text-amber-900 border-t border-amber-100 pt-2">v_t = 0.9 * 2 + 0.1 * 3</p>
            <p className="font-bold text-amber-900">v_t = 1.8 + 0.3 = 2.1</p>
            <p className="font-bold text-amber-900">θ_new = θ_old - 2.1</p>
          </div>
          <p className="text-amber-900 text-sm font-medium bg-amber-100 p-2 rounded">Notice velocity acts as a weighted average over previous updates, accelerating convergence.</p>
        </div>
      </div>

      {/* Adagrad */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-8">Adagrad Optimizer</h3>
      <p className="text-lg leading-relaxed mb-4">Adagrad adapts learning rates individually for each parameter.</p>
      <p className="text-lg leading-relaxed mb-4"><strong>Main Idea:</strong> Frequent parameters receive smaller learning rates. Rare parameters receive larger learning rates. Useful for sparse datasets.</p>
      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md block">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Adagrad Formula</p>
        <code className="text-slate-900 font-mono text-xl block mb-2">θ = θ - (α / √(G_t + ε)) * g_t</code>
        <ul className="list-disc list-inside text-slate-700 text-sm italic">
          <li><strong>G_t</strong> = Sum of squared past gradients</li>
          <li><strong>g_t</strong> = Current gradient</li>
          <li><strong>ε</strong> = Small smoothing term (1e-8) to prevent division by zero</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <p className="font-bold text-emerald-700 mb-2">Advantages</p>
          <ul className="list-disc pl-5 text-slate-700 text-sm"><li>Automatic LR adjustment</li><li>Good for sparse data</li><li>Minimal tuning</li></ul>
        </div>
        <div>
          <p className="font-bold text-red-600 mb-2">Disadvantages</p>
          <ul className="list-disc pl-5 text-slate-700 text-sm"><li>LR continuously decreases</li><li>Training may stop early due to vanishing LR</li></ul>
        </div>
      </div>
      <p className="text-slate-700 mb-6 text-sm border-l-2 border-slate-300 pl-4 py-1"><strong>Real Applications:</strong> NLP models, Sparse recommendation systems.</p>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mb-10 shadow-sm">
        <p className="font-bold text-amber-900 mb-3 text-lg border-b border-amber-200 pb-2">Adagrad Numerical</p>
        <div className="bg-white p-4 rounded border border-amber-200 font-mono text-sm">
          <p className="text-slate-600 italic mb-2">Step 1: g_1 = 4.  G_1 = 4² = 16.</p>
          <p className="mb-2">Update 1: θ = θ - (0.1 / √16) * 4  = θ - (0.1 / 4) * 4 = θ - 0.1</p>
          <p className="text-slate-600 italic mb-2">Step 2: g_2 = 3.  G_2 = 16 + 3² = 25.</p>
          <p className="mb-2">Update 2: θ = θ - (0.1 / √25) * 3 = θ - (0.1 / 5) * 3 = θ - 0.06</p>
        </div>
        <p className="text-amber-900 mt-3 font-medium bg-amber-100 p-2 rounded text-sm">Notice how the effective learning rate denominator (√G_t) keeps growing, shrinking the step size over time.</p>
      </div>

      {/* RMSProp */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-8">RMSProp Optimizer</h3>
      <p className="text-lg leading-relaxed mb-4">RMSProp improves Adagrad by preventing excessive learning-rate decay by using exponential moving averages of squared gradients instead of a simple cumulative sum.</p>
      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md block">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">RMSProp Formula</p>
        <code className="text-slate-900 font-mono text-xl block mb-2">E[g²]_t = β * E[g²]_(t-1) + (1-β) * g²_t</code>
        <code className="text-slate-900 font-mono text-xl block mb-2">θ = θ - (α / √(E[g²]_t + ε)) * g_t</code>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <p className="font-bold text-emerald-700 mb-2">Advantages</p>
          <ul className="list-disc pl-5 text-slate-700 text-sm"><li>Faster convergence</li><li>Fixes Adagrad's rapidly decaying learning rate</li><li>Works well in deep networks</li></ul>
        </div>
        <div>
          <p className="font-bold text-red-600 mb-2">Disadvantages</p>
          <ul className="list-disc pl-5 text-slate-700 text-sm"><li>More hyperparameters (requires tuning β)</li></ul>
        </div>
      </div>
      <p className="text-slate-700 mb-6 text-sm border-l-2 border-slate-300 pl-4 py-1"><strong>Applications:</strong> Recurrent Neural Networks (RNNs), Sequence models.</p>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mb-10 shadow-sm">
        <p className="font-bold text-amber-900 mb-3 text-lg border-b border-amber-200 pb-2">RMSProp Numerical</p>
        <div className="bg-white p-4 rounded border border-amber-200 font-mono text-sm">
          <p className="text-slate-700 mb-2">Let β = 0.9, past avg E[g²] = 10, current gradient g_t = 5, lr = 0.1.</p>
          <p className="mb-2 font-bold text-amber-900 border-t border-amber-100 pt-2">E[g²]_new = 0.9*10 + 0.1*(5²) = 9 + 2.5 = 11.5</p>
          <p className="mb-1 font-bold text-amber-900">θ = θ - (0.1 / √11.5) * 5</p>
          <p className="font-bold text-amber-900">θ ≈ θ - 0.147</p>
        </div>
      </div>

      {/* Adam */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-8">Adam Optimizer</h3>
      <p className="text-lg leading-relaxed mb-4">Adam (Adaptive Moment Estimation) is among the most widely used optimizers in Deep Learning today. It combines Momentum (past gradients) and RMSProp (past squared gradients) for highly adaptive and fast learning rates.</p>

      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md block">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Adam Formula</p>
        <code className="text-slate-900 font-mono text-[16px] block mb-1">m_t = β1 * m_(t-1) + (1 - β1) * g_t   <span className="text-slate-500 text-sm">// Momentum estimate</span></code>
        <code className="text-slate-900 font-mono text-[16px] block mb-1">v_t = β2 * v_(t-1) + (1 - β2) * g²_t  <span className="text-slate-500 text-sm">// RMSProp estimate</span></code>
        <code className="text-slate-900 font-mono text-[16px] block mt-3 mb-1">θ = θ - α * m_t / (√v_t + ε)</code>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6 mt-8">
        <div className="flex-1 bg-slate-50 border border-slate-200 p-6 rounded-lg shadow-sm">
          <p className="font-bold text-slate-800 mb-6 uppercase text-sm tracking-wider text-center">Adam Architecture Flow</p>
          <div className="flex flex-col items-center gap-3">
             <div className="bg-white border-2 border-blue-400 font-bold text-blue-800 py-3 px-6 rounded-lg shadow w-full max-w-xs text-center transition-transform hover:-translate-y-1">Momentum (Velocity)</div>
             <div className="text-slate-400 font-extrabold flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-300 text-xl shadow-sm bg-white z-10 my-1">+</div>
             <div className="bg-white border-2 border-emerald-400 font-bold text-emerald-800 py-3 px-6 rounded-lg shadow w-full max-w-xs text-center transition-transform hover:-translate-y-1">RMSProp (Adaptive LR)</div>
             <ArrowDown className="text-indigo-400 w-8 h-8 my-2" />
             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-md w-full max-w-xs text-center text-lg shadow-indigo-500/30">Adam Optimizer</div>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-emerald-700 mb-2">Advantages</p>
          <ul className="list-disc pl-5 text-slate-700 text-sm mb-6 space-y-1">
            <li><strong>Fastest:</strong> Very quick initial convergence</li>
            <li><strong>Stable:</strong> Handles noisy gradients elegantly</li>
            <li><strong>Efficient:</strong> Excellent for extremely large models</li>
            <li><strong>Popular:</strong> Default optimizer in PyTorch and TensorFlow</li>
          </ul>
          <p className="font-bold text-red-600 mb-2">Disadvantages</p>
          <ul className="list-disc pl-5 text-slate-700 text-sm space-y-1">
            <li><strong>Memory usage:</strong> Stores 2 extra states (m, v) per parameter</li>
            <li><strong>Complex tuning:</strong> Requires tuning β1, β2, and learning rate</li>
            <li>Can sometimes fail to converge to the absolute global minimum compared to carefully tuned SGD.</li>
          </ul>
        </div>
      </div>
      <p className="text-slate-700 mb-10 text-sm border-l-2 border-slate-300 pl-4 py-1"><strong>Adam Use Cases:</strong> Deep neural networks, Transformers (LLMs), Computer vision, NLP systems.</p>

      <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mb-12 shadow-sm">
        <p className="font-bold text-amber-900 mb-3 text-lg border-b border-amber-200 pb-2">Adam Numerical Approximation</p>
        <div className="bg-white p-4 rounded border border-amber-200 font-mono text-sm leading-relaxed">
          <p className="text-slate-700 mb-2">Let params: α=0.1, β1=0.9, β2=0.999. Current g = 10.</p>
          <p className="text-slate-700 mb-2 italic">Assuming previous m=0, v=0 for t=1 (Unbiased estimates not shown for simplicity):</p>
          <p className="mb-1 font-bold text-blue-900">m_1 = 0.9(0) + 0.1(10) = 1.0 <span className="font-normal text-slate-500">// Momentum</span></p>
          <p className="mb-2 font-bold text-emerald-900 border-b border-amber-100 pb-2">v_1 = 0.999(0) + 0.001(10²) = 0.1 <span className="font-normal text-slate-500">// RMSProp</span></p>
          <p className="mb-1 font-bold text-amber-900">θ = θ - 0.1 * (1.0 / √0.1)</p>
          <p className="font-bold text-amber-900">θ ≈ θ - 0.1 * (1.0 / 0.316) ≈ θ - 0.316</p>
        </div>
      </div>

      {/* Comparison Table */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Comparison of Gradient Descent Variants</h3>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
              <th className="p-3 font-semibold">Variant</th>
              <th className="p-3 font-semibold">Speed</th>
              <th className="p-3 font-semibold">Stability</th>
              <th className="p-3 font-semibold">Memory</th>
              <th className="p-3 font-semibold">Best For</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 divide-y divide-slate-100 text-sm">
            <tr><td className="p-3 font-medium">Batch GD</td><td className="p-3">Slow</td><td className="p-3 text-emerald-600">High</td><td className="p-3 text-red-500">High</td><td className="p-3">Small datasets</td></tr>
            <tr><td className="p-3 font-medium">SGD</td><td className="p-3 text-emerald-600">Fast</td><td className="p-3 text-red-500">Low</td><td className="p-3 text-emerald-600">Low</td><td className="p-3">Online learning</td></tr>
            <tr><td className="p-3 font-medium">Mini-Batch</td><td className="p-3 text-emerald-600">Fast</td><td className="p-3">Medium</td><td className="p-3">Medium</td><td className="p-3 font-medium">Deep learning</td></tr>
            <tr><td className="p-3 font-medium">Momentum</td><td className="p-3 text-emerald-600">Faster</td><td className="p-3 text-emerald-600">High</td><td className="p-3">Medium</td><td className="p-3">Faster convergence</td></tr>
            <tr><td className="p-3 font-medium">Adagrad</td><td className="p-3">Medium</td><td className="p-3">Medium</td><td className="p-3">Medium</td><td className="p-3">Sparse data</td></tr>
            <tr><td className="p-3 font-medium">RMSProp</td><td className="p-3 text-emerald-600">Fast</td><td className="p-3 text-emerald-600">High</td><td className="p-3">Medium</td><td className="p-3">RNNs</td></tr>
            <tr><td className="p-3 font-medium">Adam</td><td className="p-3 font-bold text-indigo-600">Very Fast</td><td className="p-3 font-bold text-indigo-600">Very High</td><td className="p-3">Medium</td><td className="p-3 font-medium text-indigo-600">Modern deep learning</td></tr>
          </tbody>
        </table>
      </div>

      {/* Common Challenges */}
      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6 flex items-center">
        <AlertTriangle className="mr-3 text-amber-500" /> Common Challenges in Gradient Descent
      </h2>
      <div className="space-y-12 mb-10">
        
        {/* 1. Local Minima */}
        <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-xl text-indigo-800 mb-2">1. Local Minima</h3>
            <p className="text-slate-700 m-0 leading-relaxed mb-4">Gradient Descent can get stuck in a "local valley" thinking it has reached the bottom, missing the true lowest point (global minimum). This is common in highly non-convex loss functions.</p>
            <div className="h-[200px] w-full max-w-lg mx-auto relative bg-white border border-slate-200 rounded-lg p-2 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={Array.from({length: 40}, (_, i) => ({x: i/10 - 2, y: Math.pow(i/10-2, 4) - 3*Math.pow(i/10-2, 2) + (i/10-2)}))} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
                  <XAxis dataKey="x" hide />
                  <YAxis hide domain={['dataMin', 'dataMax + 2']} />
                  <Area type="monotone" dataKey="y" stroke="#3b82f6" fill="#bfdbfe" fillOpacity={0.4} strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="absolute top-[35%] left-[23%] text-center">
                <div className="w-3 h-3 bg-red-500 border-2 border-white rounded-full mx-auto shadow"></div>
                <span className="text-[10px] font-bold text-red-600 block mt-1">Global Min</span>
              </div>
              <div className="absolute top-[68%] left-[75%] text-center">
                <div className="w-3 h-3 bg-amber-500 border-2 border-white rounded-full mx-auto shadow"></div>
                <span className="text-[10px] font-bold text-amber-600 block mt-1">Local Min (Stuck)</span>
              </div>
            </div>
            
            <p className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Python Demonstration:</p>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-0">
              <pre className="!m-0 leading-relaxed"><code>{`import numpy as np

# Loss function: y = x^4 - 3x^2 + x 
# It has two valleys: one lower (global) and one higher (local).
def gradient(x):
    return 4*(x**3) - 6*x + 1

x_stuck = 1.5      # Starting near local min
x_good = -2.0      # Starting near global min
lr = 0.05
epochs = 20

# Doing GD from x_stuck
for _ in range(epochs): x_stuck = x_stuck - lr * gradient(x_stuck)
print(f"Stuck at local min x = {x_stuck:.2f}")  # Output: ~1.00

# Doing GD from x_good
for _ in range(epochs): x_good = x_good - lr * gradient(x_good)
print(f"Reached global min x = {x_good:.2f}")  # Output: ~-1.30`}</code></pre>
            </div>
          </div>
        </div>

        {/* 2. Saddle Points */}
        <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-xl text-indigo-800 mb-2">2. Saddle Points</h3>
            <p className="text-slate-700 m-0 leading-relaxed mb-4">A point where the slope is zero, but it's not a minimum. It curves up in one direction and down in another. GD drastically slows down here because the gradient is nearly zero.</p>
            <div className="h-[150px] w-full max-w-lg mx-auto relative bg-white border border-slate-200 rounded-lg p-2 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={Array.from({length: 40}, (_, i) => ({x: i/10 - 2, y: Math.pow(i/10-2, 3)}))} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
                  <XAxis dataKey="x" hide />
                  <YAxis hide domain={['dataMin', 'dataMax']} />
                  <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div className="absolute top-[48%] left-[50%] text-center -translate-x-1/2">
                <div className="w-3 h-3 bg-red-500 border-2 border-white rounded-full mx-auto shadow"></div>
                <span className="text-[10px] font-bold text-red-600 block mt-1">Plateau (Gradient ≈ 0)</span>
              </div>
            </div>
            <p className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Python Demonstration:</p>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-0">
              <pre className="!m-0 leading-relaxed"><code>{`# Loss function y = x^3. Saddle point is at x = 0
def gradient(x): return 3*(x**2)

x = 0.5
lr = 0.1

print(f"Start: {x:.2f}")
for _ in range(5):
    grad = gradient(x)
    x = x - lr * grad
    print(f"Step: {x:.4f}, Grad: {grad:.4f}")
    
# Output shows gradient getting infinitely small.
# GD takes forever to cross x=0. Advanced optimizers like Momentum fix this.`}</code></pre>
            </div>
          </div>
        </div>

        {/* 3. Vanishing Gradient */}
        <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-xl text-indigo-800 mb-2">3. Vanishing Gradient Problem</h3>
            <p className="text-slate-700 m-0 leading-relaxed mb-4">In deep neural networks (many layers), gradients are multiplied together during backpropagation. If gradients are small (e.g., &lt; 1), multiplying them causes the final gradient for early layers to shrink to exactly zero. The network stops learning.</p>
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded border shadow-sm flex items-center gap-2 font-mono text-sm">
                <span>Output Layer: 0.8</span> <ArrowRight className="w-3 h-3"/>
                <span>Layer 3: 0.1</span> <ArrowRight className="w-3 h-3"/>
                <span>Layer 2: 0.005</span> <ArrowRight className="w-3 h-3"/>
                <span className="text-red-500 font-bold">Layer 1: 0.00002 (Vanished!)</span>
              </div>
            </div>
            <p className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Python Demonstration:</p>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-0">
              <pre className="!m-0 leading-relaxed"><code>{`# Deep network simulation backpropagating a Sigmoid derivative
# Sigmoid derivative maxes at 0.25
layer_gradients = [0.25, 0.25, 0.25, 0.25, 0.25] 

gradient = 1.0 # Error at end
for i, deriv in enumerate(layer_gradients):
    gradient = gradient * deriv
    print(f"Layer {5-i} Gradient: {gradient:.5f}")

# Reaches 0.00097 at Layer 1. The first layer will not update its weights!
# Fix: Use ReLU activation instead of Sigmoid.
`}</code></pre>
            </div>
          </div>
        </div>

        {/* 4. Exploding Gradient */}
        <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-xl text-indigo-800 mb-2">4. Exploding Gradient Problem</h3>
            <p className="text-slate-700 m-0 leading-relaxed mb-4">The opposite of vanishing gradients. If gradients are consistently &gt; 1, repeated multiplication causes them to grow exponentially to infinity. Weights oscillate wildly or return `NaN`.</p>
            <p className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Python Demonstration:</p>
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-sm font-mono overflow-x-auto border border-slate-800 mb-0">
              <pre className="!m-0 leading-relaxed"><code>{`# Weights > 1 multiplied over 10 layers (e.g. RNNs)
layer_weights = [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5]

gradient = 1.0
import math

try:
    for i, w in enumerate(layer_weights):
        gradient = gradient * w
        print(f"Layer {i+1} Gradient: {gradient:.2f}")
    # Gradient quickly blows up to ~57.66
    
    # Fix: Gradient Clipping
    # Prevent gradient from exceeding 5.0
    gradient = min(gradient, 5.0) 
    print(f"Clipped Gradient safe: {gradient}")
except OverflowError:
    print("Gradient Exploded to Infinity!")`}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Convergence in Gradient Descent</h3>
      <p className="text-lg leading-relaxed mb-4">Convergence means reaching minimum error, stable parameter updates, and minimal further improvements.</p>
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 shadow-sm">
        <ul className="list-none space-y-2 text-slate-700 font-mono text-sm max-w-lg mx-auto">
          <li className="flex justify-between items-center"><span className="font-bold">Iteration 1</span> <span className="text-red-500">→ Very High Error</span></li>
          <li className="flex justify-between items-center"><span className="font-bold">Iteration 5</span> <span className="text-orange-500">→ Reduced Error</span></li>
          <li className="flex justify-between items-center"><span className="font-bold">Iteration 20</span> <span className="text-yellow-600">→ Small Error</span></li>
          <li className="flex justify-between items-center"><span className="font-bold">Iteration N</span> <span className="text-emerald-500 font-bold">→ Minimum Error</span></li>
        </ul>
      </div>

      {/* Gradient Descent in Linear Regression with Python */}
      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6 flex items-center">
        <Code className="mr-3 text-purple-600" /> Gradient Descent in Linear Regression
      </h2>
      <p className="text-lg leading-relaxed mb-4">Gradient Descent helps Linear Regression learn the best-fit line.</p>
      <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Linear Regression Formula</p>
        <code className="text-slate-900 font-mono text-xl block">y = wx + b</code>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mb-6 shadow-sm">
        <p className="font-bold text-amber-900 mb-2">Worked Example:</p>
        <p className="text-sm text-amber-800 space-y-1 mb-3">Suppose: x = 5, w = 2, b = 1</p>
        <p className="text-sm text-amber-800 space-y-1 font-mono">Prediction: y = 2(5) + 1 = 10 + 1 = 11</p>
        <p className="text-sm text-amber-900 space-y-1 mt-3">If actual value = 15:<br/>Error = 15 - 11 = 4<br/><em>Gradient Descent updates weights to reduce this error.</em></p>
      </div>

      <p className="text-xl font-bold text-slate-800 mb-4 mt-8">Python Implementation Example</p>
      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-t-xl text-sm font-mono overflow-x-auto border border-slate-800 mb-0">
        <pre className="!m-0 leading-relaxed"><code>{`# Import Libraries
import numpy as np
import matplotlib.pyplot as plt

# Sample Dataset
X = np.array([1,2,3,4,5])
Y = np.array([5,7,9,11,13])

# Initialize Parameters
w = 0
b = 0
learning_rate = 0.01
epochs = 1000
n = len(X)

# Gradient Descent Loop
for i in range(epochs):
    # Make Prediction
    y_pred = w * X + b
    
    # Calculate Gradients
    dw = (-2/n) * sum(X * (Y - y_pred))
    db = (-2/n) * sum(Y - y_pred)
    
    # Update Parameters
    w = w - learning_rate * dw
    b = b - learning_rate * db
    
print(f"Final w: {w:.2f}, Final b: {b:.2f}")

# Visualization
plt.scatter(X, Y)
plt.plot(X, w*X + b, color='red')
plt.show()`}</code></pre>
      </div>

      <div className="bg-slate-50 border-x border-slate-200 p-6">
        <p className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-wider">Line-by-Line Explanation:</p>
        <ul className="list-disc pl-5 space-y-3 text-slate-700 text-sm">
          <li><strong>Import Libraries:</strong> Numpy for math, Matplotlib for charts.</li>
          <li><strong>Sample Dataset:</strong> Simple continuous relationship (y = 2x + 3 style).</li>
          <li><strong>Initialize Parameters:</strong> Start with weights <code>w=0, b=0</code>, set small step size <code>LR=0.01</code>, and run 1000 times (epochs).</li>
          <li><strong>Gradient Descent Loop:</strong>
            <ul className="list-none pl-4 mt-2 space-y-1 text-slate-600">
              <li><code>y_pred</code> calculates current guesses.</li>
              <li><code>dw, db</code> compute how wrong the guesses were using derivative of MSE.</li>
              <li><code>w = w - ...</code> steps the weights in the correct direction.</li>
            </ul>
          </li>
          <li><strong>Visualization:</strong> Plots original dots against the final trained red line.</li>
        </ul>
      </div>

      <div className="bg-[#0cf277]/10 border border-[#0cf277]/30 p-5 rounded-b-xl mb-8">
        <p className="font-bold text-[#09994c] mb-2 text-xs uppercase tracking-wider">Terminal Output</p>
        <pre className="font-mono text-sm text-[#09994c] mb-6">Final w: 2.00, Final b: 3.00</pre>
        <p className="font-bold text-[#09994c] mb-4 text-xs uppercase tracking-wider">Visual Output (Simulation)</p>
        <div className="h-[250px] w-full max-w-md bg-white border border-slate-200 rounded p-4 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={[
              {x:1, y:5, line: 2*1+3}, {x:2, y:7, line: 2*2+3}, {x:3, y:9, line: 2*3+3}, {x:4, y:11, line: 2*4+3}, {x:5, y:13, line: 2*5+3}
            ]} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="x" type="number" domain={[0,6]} stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[0,15]} />
              <Scatter dataKey="y" fill="#3b82f6" />
              <Line type="linear" dataKey="line" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-10 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Training Process Visualization
      </h3>
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 shadow-sm flex justify-center">
        <div className="w-full max-w-sm flex flex-col gap-2 my-2">
          {["Random Weights", "Prediction", "Error Calculation", "Gradient Computation", "Parameter Update", "Better Predictions"].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`border font-bold py-3 px-6 rounded-lg shadow-sm w-full text-center transition-colors ${
                i === 0 ? "bg-slate-100 border-slate-300 text-slate-700" :
                i === 5 ? "bg-emerald-100 border-emerald-300 text-emerald-800" :
                "bg-white border-indigo-200 text-indigo-800"
              }`}>
                {step}
              </div>
              {i < 5 && <ArrowDown className={`w-6 h-6 my-1 ${i === 4 ? "text-emerald-400" : "text-indigo-300"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center"><Target className="mr-2 text-emerald-600 w-5 h-5"/> Advantages</h3>
          <ul className="space-y-4">
            <li className="bg-emerald-50 p-3 rounded border border-emerald-100"><strong className="text-emerald-900 block">Simple:</strong> <span className="text-emerald-800 text-sm">Easy implementation</span></li>
            <li className="bg-emerald-50 p-3 rounded border border-emerald-100"><strong className="text-emerald-900 block">Scalable:</strong> <span className="text-emerald-800 text-sm">Handles massive datasets</span></li>
            <li className="bg-emerald-50 p-3 rounded border border-emerald-100"><strong className="text-emerald-900 block">Flexible:</strong> <span className="text-emerald-800 text-sm">Works across many algorithms</span></li>
            <li className="bg-emerald-50 p-3 rounded border border-emerald-100"><strong className="text-emerald-900 block">Powerful:</strong> <span className="text-emerald-800 text-sm">Enables deep learning</span></li>
            <li className="bg-emerald-50 p-3 rounded border border-emerald-100"><strong className="text-emerald-900 block">Efficient:</strong> <span className="text-emerald-800 text-sm">Optimizes high-dimensional models</span></li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center"><AlertTriangle className="mr-2 text-red-600 w-5 h-5"/> Disadvantages</h3>
          <ul className="space-y-4">
            <li className="bg-red-50 p-3 rounded border border-red-100"><strong className="text-red-900 block">Sensitive to learning rate:</strong> <span className="text-red-800 text-sm">Poor tuning affects training</span></li>
            <li className="bg-red-50 p-3 rounded border border-red-100"><strong className="text-red-900 block">Local minima:</strong> <span className="text-red-800 text-sm">May miss global optimum</span></li>
            <li className="bg-red-50 p-3 rounded border border-red-100"><strong className="text-red-900 block">Slow convergence:</strong> <span className="text-red-800 text-sm">Large models require time</span></li>
            <li className="bg-red-50 p-3 rounded border border-red-100"><strong className="text-red-900 block">Hyperparameter tuning:</strong> <span className="text-red-800 text-sm">Multiple settings required</span></li>
            <li className="bg-red-50 p-3 rounded border border-red-100"><strong className="text-red-900 block">Gradient issues:</strong> <span className="text-red-800 text-sm">Vanishing/exploding gradients</span></li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-indigo-800 mt-10 mb-6">Industry Applications of Gradient Descent</h2>
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-8 shadow-sm flex flex-col items-center">
        <p className="font-bold text-indigo-900 mb-6 text-xl">Hierarchical Industry Tree</p>
        <div className="w-full max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md z-10 text-lg">
              Gradient Descent Applications
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border text-left border-indigo-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-indigo-100 text-indigo-900 font-bold px-4 py-2 border-b border-indigo-200">Deep Learning</div>
              <ul className="p-4 space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400" /> <span className="font-medium">CNNs</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400" /> <span className="font-medium">RNNs</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-400" /> <span className="font-medium">Transformers</span></li>
              </ul>
            </div>
            <div className="bg-white border text-left border-emerald-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-emerald-100 text-emerald-900 font-bold px-4 py-2 border-b border-emerald-200">Finance</div>
              <ul className="p-4 space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-emerald-400" /> <span className="font-medium">Stock Prediction</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-emerald-400" /> <span className="font-medium">Risk Analysis</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-emerald-400" /> <span className="font-medium">Fraud Detection</span></li>
              </ul>
            </div>
            <div className="bg-white border text-left border-rose-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-rose-100 text-rose-900 font-bold px-4 py-2 border-b border-rose-200">Healthcare</div>
              <ul className="p-4 space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-rose-400" /> <span className="font-medium">Disease Prediction</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-rose-400" /> <span className="font-medium">Medical Imaging</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-rose-400" /> <span className="font-medium">Drug Discovery</span></li>
              </ul>
            </div>
            <div className="bg-white border text-left border-purple-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-purple-100 text-purple-900 font-bold px-4 py-2 border-b border-purple-200">Recommendation Systems</div>
              <ul className="p-4 space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-purple-400" /> <span className="font-medium">Netflix</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-purple-400" /> <span className="font-medium">Amazon</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-purple-400" /> <span className="font-medium">YouTube</span></li>
              </ul>
            </div>
            <div className="bg-white border text-left border-sky-200 shadow-sm rounded-lg overflow-hidden">
              <div className="bg-sky-100 text-sky-900 font-bold px-4 py-2 border-b border-sky-200">Computer Vision</div>
              <ul className="p-4 space-y-2 text-slate-700">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-sky-400" /> <span className="font-medium">Face Recognition</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-sky-400" /> <span className="font-medium">Object Detection</span></li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-sky-400" /> <span className="font-medium">Autonomous Vehicles</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-8">Best Practices</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {[
          "Normalize features before training",
          "Use suitable learning rates",
          "Monitor loss curves",
          "Use adaptive optimizers",
          "Apply mini-batch training",
          "Initialize weights properly",
          "Use learning-rate scheduling"
        ].map((practice, i) => (
          <li key={i} className="flex items-center text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3"></div>
            {practice}
          </li>
        ))}
      </ul>

      {/* End to end and summary */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">End-to-End Gradient Descent Pipeline</h3>
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 shadow-sm flex justify-center">
        <pre className="font-mono text-slate-700 text-sm whitespace-pre">
{`Input Dataset
      │
      ▼
Initialize Parameters
      │
      ▼
Forward Propagation
      │
      ▼
Compute Loss
      │
      ▼
Calculate Gradients
      │
      ▼
Update Parameters
      │
      ▼
Repeat Iteratively
      │
      ▼
Model Convergence`}
        </pre>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-3 text-indigo-400" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Gradient Descent is the core optimization engine behind modern Machine Learning and Deep Learning systems. It systematically enables models to learn by continuously computing gradients and updating parameters to minimize the loss function.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        While simple Batch Gradient Descent is highly stable, modern neural networks primarily rely on adaptive variants like Adam or RMSProp. These sophisticated optimizers dynamically adjust learning rates and incorporate momentum to navigate highly complex, multidimensional loss landscapes quickly and efficiently.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Loss functions define the mathematical landscape of error, but Gradient Descent is the algorithmic engine that physically navigates that landscape to discover the optimally trained model."
         </p>
      </div>

    </>
  );
}
