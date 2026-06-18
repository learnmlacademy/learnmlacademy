import React from 'react';
import { BoostingChainDiagram } from '../../components/diagrams/EnsembleDiagrams';
import { 
  Lightbulb, 
  Target,
  Layers,
  BarChart3,
  GitMerge,
  Star,
  ShieldCheck,
  Check,
  X as CloseIcon,
  Code,
  Activity,
  TrendingDown,
  Repeat,
  LayoutTemplate
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

export function BoostingContent() {
  const errorReductionData = [
    { estimator: 'Learner 1', error: 0.45, type: 'Sequential' },
    { estimator: 'Learner 2', error: 0.35, type: 'Sequential' },
    { estimator: 'Learner 3', error: 0.25, type: 'Sequential' },
    { estimator: 'Learner 4', error: 0.15, type: 'Sequential' },
    { estimator: 'Learner 5', error: 0.08, type: 'Sequential' },
  ];

  const baggingVsBoostingData = [
    { metric: 'Variance Reduction', bagging: 90, boosting: 40 },
    { metric: 'Bias Reduction', bagging: 20, boosting: 95 },
    { metric: 'Parallelizability', bagging: 100, boosting: 10 },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Boosting</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        Boosting is an ensemble learning technique designed to convert multiple weak learners into a strong learner by training models sequentially, where each new model focuses on correcting the mistakes made by previous models.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Boosting has become a successful idea in modern Machine Learning because it dramatically improves prediction accuracy and model performance. Algorithms like <strong>AdaBoost, Gradient Boosting, XGBoost, LightGBM, and CatBoost</strong> are all based on the concept of Boosting and are widely used in real-world Artificial Intelligence systems.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* ENSEMBLE LEARNING & INTRO */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Introduction to Ensemble Learning
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Before understanding Boosting deeply, we must first understand <strong>Ensemble Learning</strong>. Ensemble learning means combining multiple machine learning models to create a stronger predictive system.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 font-bold mb-2">Collective Intelligence</p>
        <p className="text-emerald-800">
          The main idea behind ensemble learning is inspired by collective intelligence. In many real-life situations, relying on only one opinion may produce mistakes. However, when multiple experts independently analyze a problem and combine their decisions, the final outcome is usually more accurate, stable, and reliable.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Real-Life Analogy of Boosting
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Suppose a teacher is teaching mathematics to a class. After the first test, some students perform well, but some perform poorly. Instead of teaching everyone equally again, the teacher now focuses more attention on the <em>weak students who made mistakes</em>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        After the second test, fewer mistakes remain. The teacher again focuses on the remaining weak areas. This process continues until the overall class performance improves significantly. Boosting works using this exact philosophy: <strong>Each new model focuses more on correcting errors made by earlier models.</strong>
      </p>

      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Main Idea Behind Boosting</h3>
        <p className="text-indigo-800 text-lg leading-relaxed mb-2">
          The core idea behind Boosting can be summarized as: <strong>Sequentially improve weak learners by focusing on previous mistakes.</strong>
        </p>
      <BoostingChainDiagram />

        <p className="text-indigo-800 text-lg leading-relaxed">
          Unlike Bagging, where models train independently in parallel, Boosting trains models sequentially. Each new learner attempts to fix the weaknesses of the previous learner.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY BOOSTING WAS CREATED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-rose-600" /> Why Boosting Was Created: The Problem of High Bias
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Many Machine Learning models suffer from <strong>High Bias</strong>. High bias means the model is too simple to capture complex patterns. Such models underfit the data, miss important relationships, and produce poor accuracy.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-6 border-l-4 border-rose-400 pl-4 bg-rose-50 py-2 rounded-r-md">
        Boosting solves this problem by repeatedly improving the model step by step. The core philosophy is: <em>Learn from mistakes repeatedly until performance improves.</em> This iterative correction process creates extremely powerful predictive systems.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        What is a Weak Learner?
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A weak learner is a simple model that performs only slightly better than random guessing. Examples include simple linear models or <strong>Decision Stumps</strong>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        A Decision Stump is a decision tree with only <em>one</em> split (e.g., <code>Is Age {'>'} 30?</code>). Individually, weak learners make many mistakes. But sequential correction creates a powerful combined model.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WORKFLOW AND SEQUENTIAL TRAINING */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Repeat className="mr-2 text-emerald-600" /> High-Level Workflow & Sequential Learning
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        an important concept in Boosting is exactly how it trains. Models are trained one after another, NOT simultaneously. Each new learner mathematically depends on previous learners.
      </p>

      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Sequential Boosting Workflow</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-emerald-600 marker:font-bold">
              <li>Train Weak Learner 1 on the Original Dataset.</li>
              <li>Identify Mistakes (Misclassified samples).</li>
              <li>Increase Focus on Errors (Assign them higher weights for the next round).</li>
              <li>Train Weak Learner 2 strictly to correct previous errors.</li>
              <li>Repeat Sequentially.</li>
              <li>Combine All Models into a final strong model.</li>
            </ol>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border text-left border-blue-200 rounded-xl overflow-hidden shadow-sm p-6 flex flex-col">
          <h4 className="font-bold text-slate-800 text-center mb-2">Sequential Error Reduction</h4>
          <p className="text-sm text-slate-500 text-center mb-6">Training error steadily drops as each learner focuses on mistakes.</p>
          <div className="w-full h-[250px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={errorReductionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="estimator" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} formatter={(value: any) => [`${(value * 100).toFixed(0)}%`, "Error Rate"]} />
                <Line type="monotone" dataKey="error" stroke="#4f46e5" strokeWidth={3} dot={{r: 6}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border text-left border-purple-200 rounded-xl overflow-hidden shadow-sm p-6 flex flex-col">
          <h4 className="font-bold text-slate-800 text-center mb-2">Bagging vs Boosting Profiles</h4>
          <p className="text-sm text-slate-500 text-center mb-6">Comparing algorithm focus characteristics.</p>
          <div className="w-full h-[250px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={baggingVsBoostingData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                <XAxis type="number" tick={{fontSize: 12}} domain={[0, 100]} />
                <YAxis dataKey="metric" type="category" tick={{fontSize: 12}} width={120} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="bagging" name="Bagging" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="boosting" name="Boosting" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* ADABOOST AND ALGORITHMS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <TrendingDown className="mr-2 text-indigo-600" /> AdaBoost (Adaptive Boosting)
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        AdaBoost is one of the earliest and most famous Boosting algorithms. It is called <em>adaptive</em> because the algorithm adapts itself by focusing more on difficult samples via weight assignments.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10 text-lg text-slate-700 shadow-sm">
        <h4 className="font-bold text-indigo-900 mb-4 border-b border-slate-200 pb-2">Step-by-Step Mathematical Workflow</h4>
        <ul className="space-y-6">
          <li>
            <strong className="text-slate-900">Step 1 — Assign Equal Weights:</strong> Initially, all training samples receive equal importance. For 10 samples, initial weight = 1/10 = 0.1.
          </li>
          <li>
            <strong className="text-slate-900">Step 2 & 3 — Train & Compute Error:</strong> Train a Decision Stump. If it gets 2 out of 10 wrong, the Error Rate = 0.2.
          </li>
          <li>
            <strong className="text-slate-900">Step 4 — Compute Learner Importance (Alpha):</strong> AdaBoost scores how strong this learner is. Higher alpha means stronger learner. 
            <div className="mt-2 text-center text-xl font-serif text-slate-800 bg-white p-3 rounded border shadow-sm max-w-sm mx-auto">
              α = ½ ln( (1 - Error) / Error )
            </div>
            For Error = 0.2, α = 0.5 * ln(4) = 0.693.
          </li>
          <li>
            <strong className="text-slate-900">Step 5 — Update Sample Weights:</strong> Misclassified samples receive mathematically <em>higher</em> weights. Correctly classified samples receive <em>lower</em> weights. This forces the next learner to focus strictly on what was missed.
          </li>
        </ul>
      </div>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-amber-900 mb-2">Final Prediction Mechanism</p>
        <p className="text-amber-800">
          The final prediction combines all learners using <strong>weighted voting</strong>. Unlike Random Forest where all trees have equal say, AdaBoost gives more voting power to learners with a higher <code>Alpha (α)</code> score! If Learner 1 (α=0.7) votes +1, and Learner 3 (α=0.2) votes -1, Learner 1 easily overpowers it.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-indigo-800 mt-12 mb-6 flex items-center">
        <LayoutTemplate className="mr-2 text-rose-500" /> Modern Types of Boosting Algorithms
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border text-left border-rose-200 shadow-sm rounded-lg overflow-hidden p-5">
           <h4 className="font-bold text-rose-900 text-lg border-b border-rose-100 pb-2 mb-3">Gradient Boosting</h4>
           <p className="text-slate-700 text-base leading-relaxed">
             Instead of adjusting sample weights like AdaBoost, Gradient Boosting mathematically minimizes the loss function by fitting new models directly onto the <strong>residual errors</strong> of the previous models.
           </p>
        </div>
        <div className="bg-white border text-left border-emerald-200 shadow-sm rounded-lg overflow-hidden p-5">
           <h4 className="font-bold text-emerald-900 text-lg border-b border-emerald-100 pb-2 mb-3">XGBoost (Extreme GB)</h4>
           <p className="text-slate-700 text-base leading-relaxed">
             An optimized version of Gradient Boosting heavily enhanced with regularization, parallel processing, and missing value handling. It became insanely popular in Kaggle competitions for tabular data.
           </p>
        </div>
        <div className="bg-white border text-left border-blue-200 shadow-sm rounded-lg overflow-hidden p-5">
           <h4 className="font-bold text-blue-900 text-lg border-b border-blue-100 pb-2 mb-3">LightGBM</h4>
           <p className="text-slate-700 text-base leading-relaxed">
             Developed by Microsoft. Improves speed and memory efficiency drastically using histogram-based learning and leaf-wise tree growth strategies. Super fast on massive datasets.
           </p>
        </div>
        <div className="bg-white border text-left border-amber-200 shadow-sm rounded-lg overflow-hidden p-5">
           <h4 className="font-bold text-amber-900 text-lg border-b border-amber-100 pb-2 mb-3">CatBoost</h4>
           <p className="text-slate-700 text-base leading-relaxed">
             Developed by Yandex. Unlike others, CatBoost is uniquely engineered to directly process Categorical Data without requiring extensive one-hot encoding or preprocessing steps.
           </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* PROS CONS APPLICATIONS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages vs Disadvantages
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Extreme Accuracy:</strong> Often outperforms all other traditional Machine Learning algorithms.</li>
             <li><strong>Effective Bias Reduction:</strong> Sequential structure inherently captures and maps highly complex patterns.</li>
             <li><strong>Handles Imbalance:</strong> Difficult minority classes naturally receive higher focus points as they are misclassified early.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Noise Sensitivity:</strong> Heavily punishes outliers, forcing the model to try and learn noisy artifacts.</li>
             <li><strong>Slow Training:</strong> Because it is sequential, you cannot easily train 1,000 trees in parallel like Random Forest.</li>
             <li><strong>Overfitting Risk:</strong> Unlike Bagging, if you add too many models in Boosting, the system will eventually overfit.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CODE IMPLEMENTATION */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Python Implementation (AdaBoost)
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is a practical script utilizing Scikit-Learn to construct an AdaBoost ensemble utilizing Decision Stumps.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h4 className="font-bold text-indigo-800 text-xl">Python Code: AdaBoost Classifier</h4>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Step 2 & 3: Load and Split Dataset
data = load_breast_cancer()
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Create Weak Learner (Decision Stump)
base_model = DecisionTreeClassifier(max_depth=1)

# Step 5: Create Target AdaBoost Model
model = AdaBoostClassifier(
    estimator=base_model,
    n_estimators=50,
    learning_rate=1.0,
    random_state=42
)

# Step 6: Train Model
model.fit(X_train, y_train)

# Step 7 & 8: Predictions and Accuracy
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"AdaBoost Accuracy: {accuracy * 100:.2f}%")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">$ python text_adaboost.py</p>
          <p className="text-slate-300">AdaBoost Accuracy: 97.37%</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Boosting is a powerful and utilized ensemble technique in Machine Learning ecosystem. Its success comes from a very intelligent philosophy: Learn from mistakes repeatedly and improve step by step.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        By sequentially training weak learners—and mathematically forcing new learners to focus explicitly on what former learners failed to classify—Boosting continually drives down the system's Bias, resulting in exceptional prediction accuracy on structured tabular datasets.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Whereas Bagging runs models independently in parallel to reduce variance, Boosting constructs dependent models sequentially to destroy bias. Every new model in Boosting purposefully targets the specific weaknesses of the preceding models."
         </p>
      </div>

    </>
  );
}

