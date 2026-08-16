import React from 'react';
import { AdaBoostWeightDiagram } from '../../components/diagrams/EnsembleDiagrams';
import { 
  Target,
  Layers,
  GitMerge,
  ShieldCheck,
  Check,
  X as CloseIcon,
  Code,
  Activity,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  BrainCircuit
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export function AdaBoostContent() {
  const alphaData = [
    { error: 0.1, alpha: 1.098 },
    { error: 0.2, alpha: 0.693 },
    { error: 0.3, alpha: 0.423 },
    { error: 0.4, alpha: 0.202 },
    { error: 0.5, alpha: 0.000 },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">AdaBoost</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        <strong>AdaBoost (Adaptive Boosting)</strong> builds several simple classifiers one after another. After each round, training examples that were misclassified receive more attention in the next round.
      </p>

      {/* SIMPLE FIRST LAYER */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">AdaBoost in Simple Words</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
          {[
            ['1', 'Train a simple model'],
            ['2', 'Find its mistakes'],
            ['3', 'Give mistakes more weight'],
            ['4', 'Train the next model'],
          ].map(([n, label]) => (
            <div key={n} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mx-auto mb-2">{n}</div>
              <p className="font-semibold text-slate-800 mb-0">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-600 mt-4 mb-0 text-center">
          Repeat the process, then combine the learners using <strong>weighted votes</strong>.
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
        <p className="font-bold text-indigo-900 mb-2">Tiny example</p>
        <p className="text-indigo-900 mb-2">Suppose 5 training students start with equal weight: <code>0.2, 0.2, 0.2, 0.2, 0.2</code>.</p>
        <p className="text-indigo-900 mb-0">If the first classifier gets Student 3 wrong, AdaBoost increases Student 3&apos;s relative importance before training the next classifier.</p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        AdaBoost belongs to <strong>ensemble learning</strong>: instead of relying on one model, it combines multiple base estimators. Its distinctive idea is <strong>adaptive reweighting</strong>—later learners are trained with more emphasis on examples that earlier learners classified incorrectly.
      </p>

      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-rose-900 font-bold mb-2 outline-none">Why combine models?</p>
        <ul className="list-disc pl-5 space-y-1 text-rose-800">
          <li>A single simple model may underfit useful patterns.</li>
          <li>A flexible model may be unstable or overfit.</li>
          <li>Different models may make different mistakes.</li>
          <li>An ensemble can sometimes generalize better than one estimator alone.</li>
        </ul>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-10">
        AdaBoost is historically important because it demonstrated how a sequence of relatively simple learners can be combined into a stronger classifier. It is one member of the broader boosting family; later methods such as Gradient Boosting use a different mathematical mechanism for sequential improvement.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY ADABOOST WAS NEEDED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why AdaBoost Was Important
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A useful way to understand AdaBoost is to start with the idea of a <strong>weak learner</strong>: a deliberately simple model that performs better than a trivial baseline but is not powerful enough by itself.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        In a simplified balanced binary example, random guessing is around 50% accurate, while a weak learner might be only modestly better. AdaBoost does not require every base estimator to be impressive on its own—the ensemble gains power from how the learners are trained and combined.
      </p>
      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
        <p className="text-indigo-900 text-lg font-medium leading-relaxed italic mb-0">
          "The important idea is not that every learner is strong. The important idea is that later learners respond to earlier mistakes, and the final prediction combines their contributions."
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Real-Life Analogy of AdaBoost
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Imagine a school teacher preparing students for a difficult board examination. After conducting the first test, some students perform well, and some students make mistakes. Instead of teaching every student equally again, the teacher now focuses more attention on <strong>students who struggled</strong>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The teacher identifies weak areas, difficult topics, and common mistakes, and spends extra time improving those areas. After another test, some previous mistakes disappear and some new difficult areas emerge. The teacher again focuses on the remaining weak students. This process continues repeatedly until the overall class performance can improve.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        AdaBoost follows the same intuition. Training examples that a learner misclassifies receive larger relative weights, so they influence the fitting of the next learner more strongly. This adaptive reweighting is the heart of AdaBoost classification.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        The Core Philosophy Behind AdaBoost
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The central philosophy of AdaBoost is: <strong>Learn from mistakes repeatedly and improve step by step.</strong>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Instead of treating all training examples equally forever, AdaBoost continuously adapts its learning focus toward difficult observations. This adaptive behavior is why the algorithm is called <strong>Adaptive Boosting</strong>, because it dynamically changes its attention during learning.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
         <div className="bg-white border shadow-sm rounded-lg p-6 border-l-4 border-l-emerald-500">
            <h4 className="font-bold text-emerald-900 mb-2">Why It Became Important</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
               <li>Weak learners can become strong collectively</li>
               <li>Sequential learning improves performance</li>
               <li>Later learners can respond to earlier mistakes</li>
               <li>Simple base estimators can form a useful ensemble</li>
               <li>The final decision gives stronger learners more influence</li>
            </ul>
         </div>
         <div className="bg-white border shadow-sm rounded-lg p-6 border-l-4 border-l-blue-500">
            <h4 className="font-bold text-blue-900 mb-2">What is a Weak Learner?</h4>
            <p className="text-slate-700 mb-2">A weak learner is a deliberately simple base estimator. In the classic binary theory, the learner should perform better than chance under the current sample weights.</p>
            <p className="text-slate-700 font-bold mb-1">Examples:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
               <li>Decision Stumps</li>
               <li>Small Decision Trees</li>
               <li>Simple Linear Models</li>
            </ul>
         </div>
      </div>

      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-slate-800 mb-2">What is a Decision Stump?</p>
        <p className="text-slate-700 mb-0">
          A Decision Stump is a Decision Tree with only one split. Example: <code>Is Age {'>'} 30?</code> It is intentionally simple. Scikit-learn&apos;s current <code>AdaBoostClassifier</code> uses a depth-1 <code>DecisionTreeClassifier</code> when no base estimator is supplied.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WORKFLOW AND COMPONENTS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> High-Level Workflow & Components
      </h2>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-12">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">AdaBoost Pipeline</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-indigo-600 marker:font-bold">
              <li>Original Dataset (All points equal weight)</li>
              <li>Train Weak Learner 1</li>
              <li>Find Misclassified Samples</li>
              <li>Increase Their Importance (adaptive weights)</li>
              <li>Train Weak Learner 2</li>
              <li>Correct Previous Mistakes</li>
              <li>Repeat Multiple Times</li>
              <li>Combine All Learners</li>
              <li>Final Strong Classifier</li>
            </ol>
         </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Understanding AdaBoost Step by Step
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Let us understand the complete working of AdaBoost deeply through iterations.
      </p>

      <div className="space-y-6 mb-10">
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-2">Step 1 — Initial Dataset</h4>
          <p className="text-slate-700 mb-2">Initially, every data point receives <strong>equal weight</strong>. If the dataset has 10 samples, the initial weight of each sample is <code>1/10 = 0.1</code>.</p>
          <div className="font-mono text-sm bg-slate-100 p-3 rounded text-slate-700">Weights: x1 (0.1), x2 (0.1), x3 (0.1)...</div>
        </div>

        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-2">Step 2 — Train First Weak Learner (B1)</h4>
          <p className="text-slate-700 mb-2">The first weak learner attempts to classify the weighted training data. In a simple binary illustration, suppose it misclassifies 2 of 10 equally weighted examples, giving weighted error <code>0.2</code>.</p>
        </div>

        <div className="bg-slate-50 p-6 border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-2">Step 3 & 4 — Identify & Increase Sample Weights</h4>
          <p className="text-slate-700 mb-4">AdaBoost identifies which points were mapped incorrectly. If a sample was difficult before, future models should focus more on it. Misclassified samples receive <strong>Higher Weights</strong>, correctly classified samples receive <strong>Lower Weights</strong>.</p>
          <div className="font-mono bg-[#1e1e1e] p-4 rounded text-[#d4d4d4] text-sm text-center">
             <p>Before Update: ○ ○ ○ ○ ○ | ● ● ● ● ● (All equal points)</p>
             <p className="mt-2 text-[#0cf277]">After Update:  ○ ○ ⬤ ⬤ ○ | ● ● ⬤ ● ● (Large points are misclassified elements)</p>
          </div>
        </div>

        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-2">Step 5 & 6 — Train Second Learner & Repeat</h4>
          <p className="text-slate-700 mb-2">The next learner (B2) is fitted using the updated sample weights, so the previously misclassified examples matter more during fitting. The process repeats. The number of mistakes does not have to decrease smoothly every round; what matters is the weighted sequential ensemble.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* MATHEMATICAL FOUNDATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-rose-600" /> Mathematical Foundation of AdaBoost
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Let us understand the mathematical logic behind AdaBoost and how it manipulates its learners and data to achieve this.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 text-lg mb-3">Step 1 — Compute Error Rate</h4>
          <p className="text-slate-700 mb-4">Error rate measures how many <em>weighted</em> samples were classified incorrectly.</p>
          <div className="bg-white p-3 rounded border text-center font-serif text-lg text-indigo-700 mb-4 shadow-sm">
             Error = Σ wᵢ · I(yᵢ ≠ h(xᵢ))
          </div>
          <p className="text-slate-700 italic">If the normalized sample weights sum to 1 and the misclassified examples carry total weight 0.2, then the weighted error is 0.2.</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 text-lg mb-3">Step 2 — Compute Alpha (α) Value</h4>
          <p className="text-slate-700 mb-4">In the classic binary AdaBoost derivation, alpha represents the learner&apos;s contribution to the final weighted vote.</p>
          <div className="bg-white p-3 rounded border text-center font-serif text-lg text-indigo-700 mb-4 shadow-sm">
             α = ½ ln( (1 - Error) / Error )
          </div>
          <p className="text-slate-700 italic">For Error 0.2: α = ½ ln(0.8 / 0.2) = ½ ln(4) ≈ 0.693. In this binary textbook form, lower weighted error gives a larger positive vote.</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8">
        <p className="font-bold text-amber-900 mb-2">Why error must matter</p>
        <p className="text-amber-900 mb-2">In the classic balanced binary formula, <code>error = 0.5</code> gives <code>α = 0</code>, so that learner contributes no useful direction to the weighted vote.</p>
        <p className="text-amber-900 mb-0">A learner with weighted error above 0.5 should not simply be treated as a useful positive contributor in this simplified implementation.</p>
      </div>

      <div className="bg-white border text-left border-indigo-200 rounded-xl overflow-hidden shadow-sm p-6 mb-10 flex flex-col items-center">
        <h4 className="font-bold text-slate-800 text-center mb-2">Alpha vs Error Relationship</h4>
        <p className="text-sm text-slate-500 text-center mb-6">As Error Rate increases, the Learner's Alpha (Voting Power) drops rapidly.</p>
        <div className="w-full h-[250px] max-w-2xl">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={alphaData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="error" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Line type="monotone" dataKey="alpha" stroke="#4f46e5" strokeWidth={3} dot={{r: 6}} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 font-bold mb-2">Step 3 — Update Sample Weights</p>
        <p className="text-emerald-800 mb-3">For the classic binary form with labels and predictions encoded as <code>-1</code> or <code>+1</code>, an unnormalized update is: <code>wᵢ ← wᵢ · e^(-α yᵢ h(xᵢ))</code>.</p>
        <p className="text-emerald-800 mb-0"><strong>Intuitively:</strong> If a sample is classified correctly, its weight decreases. If a sample is classified incorrectly, its weight increases. Thus difficult samples gain more attention continuously.</p>
      </div>

      <div className="bg-white border text-left border-rose-200 rounded-xl overflow-hidden shadow-sm mb-12">
         <div className="bg-rose-50 px-6 py-4 border-b border-rose-200">
             <h4 className="font-bold text-rose-900 text-lg uppercase tracking-wider flex items-center">
                 <Target className="w-5 h-5 mr-2" /> Complete Numerical Example (1 Iteration)
             </h4>
         </div>
         <div className="p-6 text-lg text-slate-700 space-y-6">
            <div>
               <p className="font-bold text-slate-800 mb-2">1. Setup & Initial Data</p>
               <p>We have 5 samples. All samples start with equal weights: <code>w = [0.2, 0.2, 0.2, 0.2, 0.2]</code>.</p>
               <p className="mt-1">Let's say <strong>Learner 1</strong> makes a mistake on Sample #3, but gets the others correct.</p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
               <p className="font-bold text-slate-800 mb-2">2. Calculate Error & Alpha</p>
               <p><strong>Total Error:</strong> Sum of weights of incorrect samples = <code>0.2</code> (because only Sample #3 failed).</p>
               <p className="mt-2"><strong>Calculate Learner Alpha (α):</strong></p>
               <p className="font-mono text-indigo-700">α = ½ * ln((1 - 0.2) / 0.2) = ½ * ln(4) = 0.693</p>
               <p className="text-sm italic text-slate-500 mt-1">This Alpha represents Learner 1's voting power in the final model.</p>
            </div>

            <div>
               <p className="font-bold text-slate-800 mb-2">3. Update the Weights</p>
               <p>For the 4 correct samples, the weight decreases: <code>w_new = w * e^(-α) = 0.2 * e^(-0.693) = 0.2 * 0.5 = 0.1</code>.</p>
               <p className="mt-2">For the 1 incorrect sample (Sample #3), the weight increases: <code>w_new = w * e^(α) = 0.2 * e^(0.693) = 0.2 * 2 = 0.4</code>.</p>
               <div className="mt-2 font-mono text-sm bg-slate-100 p-2 rounded inline-block">New Raw Weights: [0.1, 0.1, 0.4, 0.1, 0.1]</div>
            </div>

            <div>
               <p className="font-bold text-slate-800 mb-2">4. Normalize Weights</p>
               <p>The total sum of raw weights is now <code>0.1 + 0.1 + 0.4 + 0.1 + 0.1 = 0.8</code>.</p>
               <p className="mt-2">To make them add up to 1 again, we divide every weight by 0.8:</p>
               <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Correct samples: <code>0.1 / 0.8 = 0.125</code></li>
                  <li>Incorrect sample: <code>0.4 / 0.8 = 0.500</code></li>
               </ul>
               <p className="mt-4 font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded text-center">
                 Final Normalized Weights: [0.125, 0.125, 0.5, 0.125, 0.125]
               </p>
            </div>

            <div className="border-l-4 border-indigo-400 pl-4 py-2 mt-4 text-indigo-900 bg-indigo-50/50 rounded-r-md">
               <strong>Conclusion:</strong> The misclassified sample&apos;s normalized weight increases from <code>20%</code> to <code>50%</code>. In the next round, that one training example therefore has as much total weight as the other four examples combined.
            </div>
         </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-10">
        <h4 className="text-xl font-bold text-indigo-900 mb-3">Final Prediction Formula</h4>
        <p className="text-indigo-800 text-lg leading-relaxed mb-4">
          The final prediction combines all weak learners: <code>H(x) = sign( Σ (α_i * h_i(x)) )</code>
        </p>
        <p className="text-indigo-800 text-lg leading-relaxed mb-0">
          <strong>Example:</strong> Suppose Learner 1 (α=0.7) predicts +1, Learner 2 (α=0.5) predicts +1, and Learner 3 (α=0.2) predicts -1. The weighted sum is <code>(0.7 * 1) + (0.5 * 1) + (0.2 * -1) = 1.0</code>. Since 1.0 is positive, the Final Prediction is the Positive Class (+1).
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-slate-800 mb-3">Going Deeper — Textbook Formula vs Scikit-learn</h3>
        <p className="text-slate-700 mb-3">The <code>½ ln((1-error)/error)</code> formula above is the classic binary AdaBoost expression and is excellent for understanding the mechanism.</p>
        <p className="text-slate-700 mb-0">Current Scikit-learn <code>AdaBoostClassifier</code> implements the discrete SAMME formulation. Its stored estimator weights therefore should not be expected to numerically match the half-scaled binary textbook alpha shown above, even though the underlying idea—more influence for better learners and adaptive sample weighting—is closely related.</p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* REAL LIFE SCENARIO */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Real-Life Scenario — Loan Approval System
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Now let us understand AdaBoost using a real-world business scenario. A bank wants to predict: <em>Will a customer repay the loan?</em>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>First Weak Learner:</strong> The first classifier may only use 'Income' to make decisions. It incorrectly classifies some customers (e.g. customers with high income but unusual spending behavior).
      </p>
      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-slate-800 mb-0">
          <strong>AdaBoost Response:</strong> AdaBoost increases the relative weights of the misclassified customers. Those customers therefore influence the next base learner more strongly. The next learner may choose a different split or rule if that helps reduce the weighted classification error. This can improve the ensemble, but it does not guarantee lower business risk or higher profit by itself.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* PYTHON IMPLEMENTATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Implementing AdaBoost From Scratch in Python
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        To truly understand the math we just discussed, let us build AdaBoost step by step using NumPy and a basic Decision Stump.
      </p>

      {/* Steps 1 & 2 & 3 */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center">
             <Code className="text-indigo-600 mr-2" />
             <h4 className="font-bold text-indigo-800 text-xl">Steps 1 to 3: Structure & Fit Logic</h4>
          </div>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`import numpy as np
from sklearn.tree import DecisionTreeClassifier

class SimpleAdaBoost:
    def __init__(self, n_estimators=50, random_state=42):
        self.n_estimators = n_estimators
        self.random_state = random_state
        self.alphas = []
        self.models = []

    def fit(self, X, y):
        n_samples = X.shape[0]

        # 1. Start with equal sample weights
        w = np.ones(n_samples) / n_samples

        for round_idx in range(self.n_estimators):
            # 2. Train a decision stump using current weights
            stump = DecisionTreeClassifier(
                max_depth=1,
                random_state=self.random_state + round_idx
            )
            stump.fit(X, y, sample_weight=w)
            pred = stump.predict(X)

            # 3. Weighted classification error
            err = np.sum(w[pred != y])

            # Simple safeguards for this binary teaching version
            if err >= 0.5:
                break

            # 4. Classic binary learner weight
            # Clip only to avoid log(0) if a stump is perfect.
            safe_err = np.clip(err, 1e-12, 1 - 1e-12)
            alpha = 0.5 * np.log((1 - safe_err) / safe_err)
            self.models.append(stump)
            self.alphas.append(alpha)

            # A perfect classifier needs no later boosting rounds.
            if err <= 1e-12:
                break

            # 5. Increase weights of mistakes, decrease weights of correct cases
            w *= np.exp(-alpha * y * pred)

            # 6. Normalize
            w /= np.sum(w)

        return self`}</code>
          </pre>
        </div>
        <div className="p-4 bg-slate-50 text-slate-700 border-t border-slate-200">
          <p className="mb-0"><strong>Code Explanation:</strong> This is a deliberately small <strong>binary teaching implementation</strong>. Labels must be encoded as <code>-1</code> and <code>+1</code>. It follows the classic weight-update equations and includes simple stopping safeguards; production libraries handle additional details and multiclass cases for you.</p>
      <AdaBoostWeightDiagram />

        </div>
      </div>

      {/* Steps 4 onward */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center">
             <Code className="text-indigo-600 mr-2" />
             <h4 className="font-bold text-indigo-800 text-xl">Steps 4+: Prediction & Execution</h4>
          </div>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`    def predict(self, X):
        score = np.zeros(X.shape[0])

        # Weighted vote from all fitted stumps
        for model, alpha in zip(self.models, self.alphas):
            score += alpha * model.predict(X)

        # Avoid returning class 0 when the score is exactly zero
        return np.where(score >= 0, 1, -1)

# --- Execution & Evaluation ---
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, f1_score

# 7. Reproducible binary teaching dataset
X, y = make_classification(
    n_samples=1000,
    n_features=20,
    n_classes=2,
    random_state=42
)
y = np.where(y == 0, -1, 1)

# 8. Keep the test set untouched during training
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.3,
    random_state=42,
    stratify=y
)

# 9. Train our small implementation
model = SimpleAdaBoost(n_estimators=50, random_state=42)
model.fit(X_train, y_train)

# 10. Evaluate on unseen test rows
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions) * 100:.1f}%")
print(f"Precision: {precision_score(y_test, predictions):.3f}")
print(f"F1 Score: {f1_score(y_test, predictions):.3f}")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">Accuracy: 84.7%</p>
          <p className="mb-1">Precision: 0.842</p>
          <p className="text-slate-300">F1 Score: 0.848</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Using Scikit-learn AdaBoostClassifier
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        In real projects, use the tested library implementation rather than the small teaching class above. Current Scikit-learn uses the parameter name <code>estimator</code>; the older name <code>base_estimator</code> was replaced.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0"><code>{`from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = make_classification(
    n_samples=1000,
    n_features=20,
    n_classes=2,
    random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.3,
    random_state=42,
    stratify=y
)

stump = DecisionTreeClassifier(max_depth=1, random_state=42)

model = AdaBoostClassifier(
    estimator=stump,
    n_estimators=50,
    learning_rate=1.0,
    random_state=42
)

model.fit(X_train, y_train)
predictions = model.predict(X_test)

print(f"Test accuracy: {accuracy_score(y_test, predictions):.3f}")
print("First 5 estimator errors:", model.estimator_errors_[:5].round(3))
print("First 5 estimator weights:", model.estimator_weights_[:5].round(3))`}</code></pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <p className="mb-1">Test accuracy: 0.847</p>
          <p className="mb-1">First 5 estimator errors: [0.116 0.342 0.433 0.415 0.433]</p>
          <p className="text-slate-300">First 5 estimator weights: [2.034 0.653 0.272 0.343 0.271]</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-blue-900 mb-2">How to read this output</p>
        <p className="text-blue-900 mb-2">The first fitted stump has the lowest displayed weighted error, so it receives the largest estimator weight among these first five rounds.</p>
        <p className="text-blue-900 mb-0">The accuracy is for this one reproducible teaching dataset. AdaBoost is not guaranteed to reach 84.7% on other data.</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-slate-800 mb-3">Key Scikit-learn Parameters</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-slate-200"><th className="p-3">Parameter</th><th className="p-3">Meaning</th></tr></thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-100"><td className="p-3"><code>estimator</code></td><td className="p-3">Base classifier; if omitted, Scikit-learn uses a depth-1 decision tree.</td></tr>
              <tr className="border-b border-slate-100"><td className="p-3"><code>n_estimators</code></td><td className="p-3">Maximum number of boosting rounds; training can stop early after a perfect fit.</td></tr>
              <tr className="border-b border-slate-100"><td className="p-3"><code>learning_rate</code></td><td className="p-3">Scales each classifier&apos;s contribution; it trades off with the number of estimators.</td></tr>
              <tr><td className="p-3"><code>random_state</code></td><td className="p-3">Makes supported randomized behavior reproducible.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-indigo-900 mb-2">AdaBoost can also do regression</p>
        <p className="text-indigo-900 mb-0">Scikit-learn provides <code>AdaBoostRegressor</code>. It uses an AdaBoost.R2-style procedure in which later regressors receive more focus on observations with larger prediction errors.</p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* ADVANTAGES VS DISADVANTAGES */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages vs Disadvantages
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Can strengthen simple learners:</strong> Sequential reweighting can produce a useful nonlinear ensemble from shallow trees.</li>
             <li><strong>Adaptive focus:</strong> Misclassified training examples receive greater relative influence in later rounds.</li>
             <li><strong>Few core ideas:</strong> Sample weights, learner weights and weighted voting make the mechanism relatively interpretable.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Sensitivity to difficult/noisy labels:</strong> Repeatedly increasing the importance of misclassified examples can make noisy observations influential.</li>
             <li><strong>Needs validation:</strong> The estimator count, learning rate and base learner complexity should be chosen using validation rather than the final test set.</li>
             <li><strong>Sequential rounds:</strong> Later boosting rounds depend on earlier ones, so round-level training is less naturally parallel than independent bagged models.</li>
          </ul>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center">
        <GitMerge className="mr-2" /> AdaBoost vs Bagging
      </h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Feature</th>
              <th className="p-4 font-bold text-indigo-800">AdaBoost</th>
              <th className="p-4 font-bold text-emerald-800">Bagging</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Training</td><td className="p-4">Sequential</td><td className="p-4">Parallel</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Core idea</td><td className="p-4">Adapt sample importance and combine sequential learners</td><td className="p-4">Randomize training samples/models and aggregate</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Sample weights</td><td className="p-4">Updated across rounds</td><td className="p-4">Usually not adaptively reweighted after mistakes</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Typical effect</td><td className="p-4">Can improve a sequence of simple learners</td><td className="p-4">Often reduces variance of unstable learners</td></tr>
             <tr><td className="p-4 font-medium">Model selection</td><td className="p-4">Validate learning rate, rounds and base learner</td><td className="p-4">Validate estimator count and base-model settings</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* COMMON MISTAKES */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <AlertTriangle className="mr-2 text-amber-500" /> Common Mistakes
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-lg text-slate-700 mb-10">
        <li>Assuming every misclassified point should keep getting larger forever. Weights are recomputed and normalized each round based on the current learner.</li>
        <li>Assuming the raw number of training mistakes must decrease after every new stump.</li>
        <li>Using the binary <code>½ ln((1-error)/error)</code> formula as though it were the exact stored estimator-weight formula for every multiclass implementation.</li>
        <li>Choosing <code>n_estimators</code> or <code>learning_rate</code> repeatedly on the final test set.</li>
        <li>Assuming AdaBoost automatically solves noisy labels, outliers or class imbalance.</li>
      </ul>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <HelpCircle className="mr-2 text-indigo-600" /> Quick Questions
      </h2>
      <div className="space-y-4 mb-10">
        <details className="border rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Does AdaBoost always use decision stumps?</summary>
          <p className="mt-3 text-slate-700">No. Decision stumps are the classic beginner example and Scikit-learn&apos;s default classifier when <code>estimator=None</code>, but another classifier can be used if it supports sample weighting and the required classification interface.</p>
        </details>
        <details className="border rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Is a bigger learner weight always better?</summary>
          <p className="mt-3 text-slate-700">A larger positive learner weight means that estimator has more influence in the ensemble. It is produced from that round&apos;s weighted performance; it is not a hyperparameter you should manually maximize.</p>
        </details>
        <details className="border rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">AdaBoost or Gradient Boosting?</summary>
          <p className="mt-3 text-slate-700">Both are sequential ensemble methods, but their mechanics differ. AdaBoost classification emphasizes adaptive sample weights; Gradient Boosting adds learners that follow the gradient of a chosen loss function.</p>
        </details>
      </div>

      {/* NEXT LINKS */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <p className="font-bold text-indigo-900 text-lg mb-3 flex items-center"><BrainCircuit className="w-5 h-5 mr-2" /> Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/boosting" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">Boosting Overview</a>
          <a href="/learn/gradient-boosting" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">Gradient Boosting →</a>
          <a href="/learn/bagging" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">Compare with Bagging</a>
          <a href="/learn/decision-trees" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">Decision Trees</a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        AdaBoost is an ensemble learning algorithm in Machine Learning. Its success comes from a simple but powerful philosophy: <em>Focus more on mistakes and improve continuously.</em>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        AdaBoost trains base classifiers sequentially, adapts sample weights after each round, and combines the fitted learners using weighted contributions. It can improve performance over a single simple learner, but the result still depends on the data, base estimator, noise and validated hyperparameters.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           <strong>Misclassified training examples receive more relative weight, so later learners pay more attention to difficult cases; the final ensemble combines the learners with unequal influence.</strong>
         </p>
      </div>

    </>
  );
}
