import React from 'react';
import { AdaBoostWeightDiagram } from '../../components/diagrams/EnsembleDiagrams';
import { 
  Target,
  Layers,
  BarChart3,
  GitMerge,
  ShieldCheck,
  Check,
  X as CloseIcon,
  Code,
  Activity,
  AlertCircle,
  TrendingDown
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
        AdaBoost belongs to a family of methods called <strong>Ensemble Learning Algorithms</strong>.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Ensemble Learning means combining multiple machine learning models to create a stronger predictive system. Before AdaBoost was introduced, most Machine Learning systems relied on building a single model and expecting that one model to solve the entire problem accurately. However, researchers soon realized that depending entirely on one model often creates major problems.
      </p>

      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-rose-900 font-bold mb-2 outline-none">Limitations of a Single Model</p>
        <ul className="list-disc pl-5 space-y-1 text-rose-800">
          <li>Overfit the training data</li>
          <li>Miss important patterns</li>
          <li>Become unstable</li>
          <li>Perform poorly on unseen data</li>
          <li>Fail on difficult observations</li>
        </ul>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This created a very important question in Machine Learning: <strong>Can many small weak models work together to create one powerful intelligent system?</strong>
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        AdaBoost was one of the first major algorithms to answer this question successfully. The algorithm introduced a revolutionary idea: <strong>Instead of building one perfect model, build many imperfect models and combine them intelligently.</strong>
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-10">
        This concept completely changed the direction of Machine Learning research and eventually led to the development of modern ensemble techniques like Gradient Boosting, XGBoost, LightGBM, and CatBoost. Today, many high-performance AI systems still use principles that originated from AdaBoost.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY ADABOOST WAS NEEDED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why AdaBoost Was Needed / Revolutionary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        To understand AdaBoost deeply, we first need to understand one of the biggest challenges in Machine Learning: <strong>Weak Learning</strong>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Many simple algorithms are only capable of producing slightly better predictions than random guessing. For example, suppose a binary classification problem contains two classes (YES or NO). Random guessing may produce 50% accuracy. A weak learner may produce 55% or 60% accuracy. Individually, such a model may seem almost useless.
      </p>
      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
        <p className="text-indigo-900 text-lg font-medium leading-relaxed italic mb-0">
          "But AdaBoost introduced a shocking discovery: Many weak learners, when combined correctly, can create an extremely powerful model. This became an influential idea in Artificial Intelligence."
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Real-Life Analogy of AdaBoost
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Imagine a school teacher preparing students for a difficult board examination. After conducting the first test, some students perform well, and some students make mistakes. Instead of teaching every student equally again, the teacher now focuses more attention on <strong>students who struggled</strong>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The teacher identifies weak areas, difficult topics, and common mistakes, and spends extra time improving those areas. After another test, some previous mistakes disappear and some new difficult areas emerge. The teacher again focuses on the remaining weak students. This process continues repeatedly until the overall class performance improves dramatically.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        AdaBoost works using exactly this philosophy. Each new model focuses more on: <strong>Data points that previous models failed to classify correctly.</strong> This continuous error-correction process is the heart of AdaBoost.
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
               <li>Error-focused learning is highly effective</li>
               <li>Simple models can achieve powerful results</li>
               <li>Ensemble intelligence often outperforms individual intelligence</li>
            </ul>
         </div>
         <div className="bg-white border shadow-sm rounded-lg p-6 border-l-4 border-l-blue-500">
            <h4 className="font-bold text-blue-900 mb-2">What is a Weak Learner?</h4>
            <p className="text-slate-700 mb-2">A weak learner is a model that performs only slightly better than random guessing.</p>
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
          A Decision Stump is a Decision Tree with only one split. Example: <code>Is Age {'>'} 30?</code> Only one condition exists. Decision stumps are extremely simple and weak individually. But AdaBoost combines many such weak learners to create a powerful final model.
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
          <p className="text-slate-700 mb-2">The first weak learner attempts to classify the data. Because it's weak, several points are classified incorrectly (e.g., 8 points misclassified). The decision boundary is poor because the learner is simple.</p>
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
          <p className="text-slate-700 mb-2">The next learner (B2) now focuses more on the difficult, heavy samples. B2 tries harder to classify them. Maybe now only 6 points remain incorrect. Then B3 shrinks this to 4. We repeat this process iteratively.</p>
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
             Error = Σ w_i (Misclassified) / Σ w_i (All)
          </div>
          <p className="text-slate-700 italic">Example: If total weight is 1, and misclassified weight is 0.2, then Error = 0.2.</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 text-lg mb-3">Step 2 — Compute Alpha (α) Value</h4>
          <p className="text-slate-700 mb-4">Alpha determines the <strong>Importance of the weak learner</strong> in the final vote.</p>
          <div className="bg-white p-3 rounded border text-center font-serif text-lg text-indigo-700 mb-4 shadow-sm">
             α = ½ ln( (1 - Error) / Error )
          </div>
          <p className="text-slate-700 italic">Example: For Error 0.2, α = ½ ln(0.8 / 0.2) = ½ ln(4) = 0.693. Higher alpha means a stronger classifier.</p>
        </div>
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
        <p className="text-emerald-800 mb-3">Sample weights are updated mathematically exactly via: <code>w_i = w_i * e^(-α * y_i * h_i(x_i))</code></p>
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
               <strong>Conclusion:</strong> Notice how the single misclassified sample's weight skyrocketed from <code>20%</code> to <code>50%</code>! 
               When Learner 2 trains in the next round, it will mathematically care about fixing Sample #3 as much as getting all the other 4 combined.
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
          <strong>AdaBoost Response:</strong> AdaBoost increases the weights of those difficult customers. The next classifier is mathematically forced to focus more on spending behavior, credit history, or debt ratio to get them right. Each new learner zeroes in on customers previously classified incorrectly, lowering risk and increasing bank profit.
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

class AdaBoost:
    def __init__(self, n_estimators=50):
        self.n_estimators = n_estimators
        self.alphas = []
        self.models = []
        
    def fit(self, X, y):
        n_samples, n_features = X.shape
        
        # 1. Initialize all sample weights equally
        w = np.ones(n_samples) / n_samples
        
        for _ in range(self.n_estimators):
            # 2. Train Weak Learner (Decision Stump)
            model = DecisionTreeClassifier(max_depth=1)
            model.fit(X, y, sample_weight=w) # Pass weights directly
            predictions = model.predict(X)
            
            # 3. Error Calculation (Weighted misclassifications)
            err = np.sum(w * (predictions != y)) / np.sum(w)
            
            # 4. Alpha (Learner Importance) Calculation
            alpha = 0.5 * np.log((1 - err) / (err + 1e-10))
            
            self.models.append(model)
            self.alphas.append(alpha)
            
            # 5. Weight Update
            w *= np.exp(-alpha * y * predictions)
            
            # 6. Normalize weights so they sum to 1
            w /= np.sum(w)`}</code>
          </pre>
        </div>
        <div className="p-4 bg-slate-50 text-slate-700 border-t border-slate-200">
          <p className="mb-0"><strong>Code Explanation:</strong> This <code>fit</code> loop perfectly mimics our mathematical workflow. We generate equal weights <code>np.ones() / n_samples</code>, train a stump bounded by <code>max_depth=1</code>, compute the weighted <code>err</code>, secure the <code>alpha</code> multiplier for this model, and then immediately scale every sample's weight via <code>np.exp(-alpha * y * preds)</code> before normalizing.</p>
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
        strong_preds = np.zeros(X.shape[0])
        # Combine all weak learner predictions scaled by their alpha
        for model, alpha in zip(self.models, self.alphas):
            predictions = model.predict(X)
            strong_preds += alpha * predictions
            
        return np.sign(strong_preds).astype(int)

# --- Execution & Evaluation ---
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, f1_score

# 5. Generate Target Dataset mapping classes to -1 and 1
X, y = make_classification(n_samples=1000, n_features=20, n_classes=2, random_state=42)
y = np.where(y == 0, -1, 1)

# 6. Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 7. Train Custom AdaBoost
adaboost = AdaBoost(n_estimators=50)
adaboost.fit(X_train, y_train)

# 8. Predictions & 9. Metrics
predictions = adaboost.predict(X_test)
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
          <p className="mb-1">Accuracy: 84.0%</p>
          <p className="mb-1">Precision: 0.836</p>
          <p className="text-slate-300">F1 Score: 0.847</p>
        </div>
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
             <li><strong>Very High Prediction Accuracy:</strong> By sequentially correcting mistakes, performance improves rapidly.</li>
             <li><strong>Automatic Focus on Difficult Samples:</strong> Hard-to-classify points algorithmic receive more attention.</li>
             <li><strong>Works Well with Simple Models:</strong> Achieves excellent performance using only shallow decision stumps.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Sensitivity to Noise & Outliers:</strong> Because outliers continuously receive higher weights, AdaBoost may obsess over them, damaging the model.</li>
             <li><strong>Overfitting Risk:</strong> It may overfit if too many learners (estimators) are added without limit.</li>
             <li><strong>Slower Training:</strong> Sequential learning limits parallelization, making it slower than Bagging.</li>
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
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Main Goal</td><td className="p-4 text-indigo-700 font-bold">Reduce Bias</td><td className="p-4 text-emerald-700 font-bold">Reduce Variance</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Weight Updates</td><td className="p-4">Yes</td><td className="p-4">No</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Error Correction</td><td className="p-4">Yes</td><td className="p-4">No</td></tr>
             <tr><td className="p-4 font-medium">Overfitting Risk</td><td className="p-4">Higher</td><td className="p-4">Lower</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        AdaBoost is an ensemble learning algorithm in Machine Learning. Its success comes from a simple but powerful philosophy: <em>Focus more on mistakes and improve continuously.</em>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        By sequentially training weak learners and mathematically adapting learning toward difficult samples via sample weights, AdaBoost creates strong classifiers with better accuracy, improved generalization, and reduced bias. It became the foundation for many advanced boosting algorithms used today in Artificial Intelligence systems.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Every new learner should focus more on samples that previous learners failed to classify correctly. That single principle—dynamically passing weighted failures from one weak learner to the next—forms the entire mathematical foundation of Adaptive Boosting."
         </p>
      </div>

    </>
  );
}
