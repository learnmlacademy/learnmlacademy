import React from 'react';
import { XGBoostArchitectureDiagram } from '../../components/diagrams/EnsembleDiagrams';
import { 
  Target,
  Layers,
  Activity,
  Code,
  ShieldCheck,
  Check,
  X as CloseIcon,
  AlertCircle,
  GitMerge,
  Cpu,
  TrendingDown
} from 'lucide-react';

export function XGBoostContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">XGBoost</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        The name XGBoost stands for <strong>Extreme Gradient Boosting</strong>. It is an optimized distributed gradient boosting library.</p>
      <XGBoostArchitectureDiagram />


      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        It is an advanced implementation of Gradient Boosting designed specifically for High performance, Faster computation, Better accuracy, Scalability, Regularization, and Parallel processing.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        XGBoost became extremely famous because it consistently dominated Kaggle competitions, Data science hackathons, Industry prediction systems, and Real-world AI applications. For several years, XGBoost was considered the "king" of structured/tabular data Machine Learning problems. Even today, major companies still use XGBoost in production systems because of its exceptional predictive performance.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY XGBOOST WAS REVOLUTIONARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why XGBoost Became Revolutionary
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        To understand why XGBoost became an important algorithm in Machine Learning, we first need to understand the limitations of traditional Machine Learning systems. Earlier algorithms often suffered from major challenges:
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-1">
        <li>Poor prediction accuracy</li>
        <li>Slow training</li>
        <li>Overfitting</li>
        <li>Inability to handle large datasets efficiently</li>
        <li>Weak generalization</li>
        <li>High computational cost</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Traditional Gradient Boosting algorithms were already powerful, but they still had practical limitations. Traditional Gradient Boosting was accurate but computationally expensive. Training became slow for large datasets. Memory usage increased significantly. Overfitting became difficult to control.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Researchers wanted a system that could: <em>Maintain Gradient Boosting accuracy while dramatically improving speed, scalability and optimization.</em> This led to the development of XGBoost.
      </p>
      
      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        The Fundamental Philosophy Behind XGBoost
      </h3>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 leading-relaxed">
          <strong>Central Philosophy:</strong> Build models sequentially, where every new model corrects the mistakes of previous models using optimized gradient learning.
        </p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Like Gradient Boosting, XGBoost learns iteratively. But XGBoost improves the process using Advanced optimization, Regularization, Parallel processing, Smart tree pruning, and Efficient memory handling. This makes it significantly faster and more accurate than ordinary Gradient Boosting implementations.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Real-Life Analogy of XGBoost
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Imagine a student preparing for a highly competitive entrance examination. The student initially solves a mock test and makes many mistakes. Instead of restarting from scratch every time, the student follows a smart strategy:
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-1">
        <li>Identify mistakes carefully</li>
        <li>Focus specifically on weak areas</li>
        <li>Learn optimized shortcuts</li>
        <li>Avoid repeating previous errors</li>
        <li>Continuously refine performance</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        After every test: The student becomes progressively better by focusing mainly on remaining weaknesses. This is exactly how XGBoost works. Each new tree focuses on <strong>Residual errors</strong> left by previous trees. But unlike ordinary Gradient Boosting, XGBoost performs this process with highly optimized mathematical and computational techniques.
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-amber-900 font-bold mb-2">Why the Word “Extreme” Appears</p>
        <p className="text-amber-900 mb-0">
          The word <em>Extreme</em> does not mean dangerous. It means: <strong>Extremely optimized and highly scalable Gradient Boosting</strong>. The algorithm introduces several engineering improvements that make it dramatically faster and more efficient.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CORE IDEAS AND IMPROVEMENTS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Core Ideas & Improvements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
           <h3 className="text-lg font-bold text-slate-800 mb-3">Core Components</h3>
           <ul className="list-disc pl-5 space-y-2 text-slate-700 text-lg">
             <li>Gradient Boosting & Decision Trees</li>
             <li>Residual Learning</li>
             <li>Gradient Optimization</li>
             <li>Regularization</li>
             <li>Parallel Processing</li>
             <li>Tree Pruning & Shrinkage</li>
             <li>Feature Sampling</li>
           </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
           <h3 className="text-lg font-bold text-slate-800 mb-3">Ensemble Learning Hierarchy</h3>
           <p className="text-slate-700 text-sm mb-2 font-mono">ENSEMBLE LEARNING</p>
           <ul className="list-none pl-4 space-y-1 text-slate-700">
             <li>├─ <strong>Bagging</strong>
                <ul className="pl-6 text-slate-600"><li>└─ Random Forest</li></ul>
             </li>
             <li className="mt-2">└─ <strong>Boosting</strong>
                <ul className="pl-6 text-slate-600">
                  <li>├─ AdaBoost</li>
                  <li>├─ Gradient Boosting</li>
                  <li className="font-bold text-indigo-600">└─ XGBoost</li>
                </ul>
             </li>
           </ul>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        XGBoost became revolutionary because it combined Mathematical optimization, Ensemble learning, Gradient descent, Efficient computing, and Parallel execution into one highly optimized framework. This made it ideal for Large datasets, Real-world industrial systems, High-dimensional data, and Complex nonlinear relationships.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Major Improvements & What Problem It Solves
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Traditional Gradient Boosting already corrected residual errors sequentially, but XGBoost improved this process significantly by introducing Faster Training, Parallel Computation, Regularization, Automatic Pruning, Missing Value Handling, Sparse Data Support, and Cross Validation.
      </p>

      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-rose-900 font-bold mb-2">What Problem Does XGBoost Solve? (Regularization)</p>
        <p className="text-rose-800 mb-3">Suppose ordinary Gradient Boosting creates very deep trees. Deep trees may memorize training data, overfit heavily, and generalize poorly.</p>
        <p className="text-rose-800 mb-0">XGBoost introduces <strong>Regularization</strong> to control tree complexity. Regularization means penalizing overly complex models, which prevents excessive overfitting and dramatically improves performance.</p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        <strong>Regularized Objective Function</strong>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        XGBoost uses a special objective function: <code>Objective = Loss Function + Regularization</code>. This is an important innovation in XGBoost.
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-2">
        <li><strong>Loss Function:</strong> Measures prediction error (how wrong predictions are). Lower loss means better predictions.</li>
        <li><strong>Regularization Term:</strong> Penalizes very deep trees, too many leaf nodes, and excessive complexity. This improves generalization ability.</li>
      </ul>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* STEP-BY-STEP WORKING */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-indigo-600" /> Step-by-Step Working of XGBoost
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        The visualization of XGBoost learning flows through: Initial Prediction ➔ Calculate Residuals ➔ Train Tree 1 ➔ Update Predictions ➔ Train Tree 2 ➔ Correct Remaining Errors ➔ Final Strong Model. Let us deeply understand the complete working process.
      </p>

      <div className="space-y-8 mb-10">
        <div>
          <h4 className="text-lg font-bold text-slate-800 mb-2">Step 1 — Initial Prediction</h4>
          <p className="text-lg text-slate-700 mb-2">Initially, the model predicts a constant value. For regression problems, the initial prediction is usually the average target value.</p>
          <div className="bg-slate-100 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300">
            Suppose house prices are 40, 50, 60, 70.<br/>
            Average: (40+50+60+70) / 4 = 55.<br/>
            Initial prediction: 55 for every sample.
          </div>
        </div>

        <div>
           <h4 className="text-lg font-bold text-slate-800 mb-2">Step 2 — Compute Residual Errors</h4>
           <div className="bg-slate-100 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300 mb-2">
             Residual = Actual - Predicted
           </div>
           <p className="text-lg text-slate-700">Actual (40) - Predicted (55) = Residual (-15). These residuals become the learning target for the next tree.</p>
        </div>

        <div>
           <h4 className="text-lg font-bold text-slate-800 mb-2">Step 3 — Train First Decision Tree</h4>
           <p className="text-lg text-slate-700">A small tree learns how to correct prediction errors. The tree attempts to predict residual values.</p>
        </div>

        <div>
           <h4 className="text-lg font-bold text-slate-800 mb-2">Step 4 — Update Predictions</h4>
           <p className="text-lg text-slate-700 mb-2">Predictions are updated using: <code>New Prediction = Old Prediction + (Learning Rate × Tree Output)</code></p>
           <div className="bg-slate-100 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300">
             Old prediction = 55, Tree correction = 10, Learning rate = 0.1.<br/>
             Updated prediction = 55 + (0.1 × 10) = 56.
           </div>
        </div>

        <div>
           <h4 className="text-lg font-bold text-slate-800 mb-2">Step 5 — Repeat Sequentially</h4>
           <p className="text-lg text-slate-700">Again: Compute residuals ➔ Train new tree ➔ Update predictions. Each new tree reduces remaining errors.</p>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Why XGBoost Uses Decision Trees:</strong> Decision trees are excellent weak learners because they capture nonlinear relationships, handle mixed data types, require little preprocessing, and learn complex feature interactions.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHAT MAKES XGBOOST FASTER? */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Cpu className="mr-2 text-indigo-600" /> What Makes XGBoost Faster & Optimized?
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        XGBoost includes several engineering optimizations that define its superiority.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
         <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-indigo-500">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Parallel Processing</h4>
            <p className="text-slate-700">Unlike ordinary Gradient Boosting, XGBoost performs parallel computations <em>during</em> tree construction (specifically when finding the best split points). This significantly reduces training time.</p>
         </div>
         <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-emerald-500">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Tree Pruning</h4>
            <p className="text-slate-700">Ordinary trees may grow unnecessarily large. XGBoost uses Automatic Tree Pruning to remove weak branches. This improves speed, memory efficiency, and generalization.</p>
         </div>
         <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-amber-500">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Handling Missing Values</h4>
            <p className="text-slate-700">Automatic missing value handling is highly optimized. The algorithm intelligently learns how to route missing data points (left or right branch) during training.</p>
         </div>
         <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-rose-500">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Shrinkage</h4>
            <p className="text-slate-700">Shrinkage means adding corrections slowly instead of aggressively via the learning rate (η). Small learning rates reduce overfitting, improve generalization, but require more trees.</p>
         </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Important Hyperparameters in XGBoost
      </h3>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <ul className="list-disc pl-5 space-y-3 text-blue-900">
          <li><strong>max_depth:</strong> Controls tree depth. Small depth = Simpler trees, Better generalization. Large depth = Complex trees, Higher overfitting risk.</li>
          <li><strong>n_estimators:</strong> Controls Number of trees. More trees improve learning but increase computation.</li>
          <li><strong>subsample:</strong> Percentage of training samples used for each tree. Helps reduce overfitting.</li>
          <li><strong>colsample_bytree:</strong> Number of features selected for each tree. Improves randomness and generalization.</li>
          <li><strong>gamma, lambda, alpha:</strong> Various regularization terms to control tree weight and leaf construction constraints.</li>
        </ul>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-10 text-center">
        <h4 className="font-bold text-slate-800 text-xl mb-3">Mathematical Objective Function of XGBoost</h4>
        <p className="text-lg text-slate-700 mb-4">XGBoost minimizes the following equation:</p>
        <div className="bg-white p-4 inline-block rounded border text-indigo-700 font-serif text-xl shadow-sm">
           Obj = Σ L( y_i, ŷ_i ) + Σ Ω( f_k )
        </div>
        <p className="text-slate-600 mt-4">Where <strong>L</strong> = loss function, <strong>Ω</strong> = regularization term, and <strong>f_k</strong> = decision trees.</p>
      </div>

      <div className="bg-white border text-left border-rose-200 rounded-xl overflow-hidden shadow-sm mb-12">
         <div className="bg-rose-50 px-6 py-4 border-b border-rose-200">
             <h4 className="font-bold text-rose-900 text-lg uppercase tracking-wider flex items-center">
                 <Target className="w-5 h-5 mr-2" /> Complete Numerical Example (Objective Function)
             </h4>
         </div>
         <div className="p-6 text-lg text-slate-700 space-y-6">
            <p className="mb-4">
              Let us understand how XGBoost balances prediction error (Loss) and model complexity (Regularization). We want to decide whether to split a tree or keep it as a single leaf.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
               <p className="font-bold text-slate-800 mb-2">1. The Setup</p>
               <p>We are trying to predict 3 residual errors left from a previous tree: <strong><code>[-2, 2, 4]</code></strong>.</p>
               <p className="mt-2">XGBoost Regularization is defined as: <code>Ω = γT + ½λ(Σw²)</code></p>
               <ul className="list-disc pl-5 mt-2 space-y-1">
                 <li><strong>T:</strong> Number of leaves (Penalized by Gamma <strong>γ=2</strong>)</li>
                 <li><strong>w:</strong> Leaf weights (Penalized by Lambda <strong>λ=1</strong>)</li>
               </ul>
            </div>

            <div>
               <p className="font-bold text-slate-800 mb-2">2. Option A: Do Not Split (T = 1 Leaf)</p>
               <p>Instead of a simple average, XGBoost shrinks the leaf weight (w) using Lambda to reduce overfitting:</p>
               <p className="font-mono text-sm bg-slate-100 p-2 rounded inline-block mt-2 mb-2">w_root = Sum(Residuals) / (N + λ)</p>
               <p><code>w_root = (-2 + 2 + 4) / (3 + 1) = 4 / 4 = <strong>1</strong></code></p>
               
               <p className="mt-3 font-semibold text-slate-800">Calculating the Objective:</p>
               <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Loss (Squared Error):</strong> (-2 - 1)² + (2 - 1)² + (4 - 1)² = 9 + 1 + 9 = <strong>19</strong></li>
                  <li><strong>Regularization:</strong> γ(1) + ½λ(1²) = 2(1) + 0.5(1)(1) = <strong>2.5</strong></li>
               </ul>
               <p className="mt-3 font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded text-center">
                 Total Objective (Option A) = 19 + 2.5 = 21.5
               </p>
            </div>

            <div>
               <p className="font-bold text-slate-800 mb-2">3. Option B: Split into Two Leaves (T = 2 Leaves)</p>
               <p>We split the data. Leaf 1 gets <code>[-2]</code>. Leaf 2 gets <code>[2, 4]</code>.</p>
               <ul className="list-disc pl-5 mt-2 space-y-2 mb-3">
                 <li><strong>Leaf 1 weight (w₁):</strong> -2 / (1 + 1) = <strong>-1</strong></li>
                 <li><strong>Leaf 2 weight (w₂):</strong> (2 + 4) / (2 + 1) = 6 / 3 = <strong>2</strong></li>
               </ul>

               <p className="font-semibold text-slate-800">Calculating the Objective:</p>
               <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Loss (Leaf 1):</strong> (-2 - (-1))² = (-1)² = <strong>1</strong></li>
                  <li><strong>Loss (Leaf 2):</strong> (2 - 2)² + (4 - 2)² = 0 + 4 = <strong>4</strong></li>
                  <li><strong>Total Loss:</strong> 1 + 4 = <strong>5</strong></li>
                  <li><strong>Regularization:</strong> γ(2) + ½λ(w₁² + w₂²) = 2(2) + 0.5(1)(1 + 4) = 4 + 2.5 = <strong>6.5</strong></li>
               </ul>
               <p className="mt-3 font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 p-3 rounded text-center">
                 Total Objective (Option B) = 5 + 6.5 = 11.5
               </p>
            </div>

            <div className="border-l-4 border-emerald-400 pl-4 py-2 mt-4 text-emerald-900 bg-emerald-50/50 rounded-r-md">
               <strong>XGBoost's Decision:</strong> Because Option B has a much lower Objective Score (<code>11.5 {'<'} 21.5</code>), XGBoost mathematically proves that making this split is beneficial, even after paying the penalties for adding an extra leaf (γ) and larger weights (λ).
            </div>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* PYTHON IMPLEMENTATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Implementing XGBoost in Python
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Let us implement an XGBoost classifier to detect breast cancer based on medical data. To run this, you would first need to install it via <code>pip install xgboost</code>.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center">
             <Code className="text-indigo-600 mr-2" />
             <h4 className="font-bold text-indigo-800 text-xl">XGBoost Classification</h4>
          </div>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`# Step 1 — Install XGBoost
# pip install xgboost

# Step 2 — Import Libraries
from xgboost import XGBClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Step 3 — Load Dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Step 4 — Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 5 — Create XGBoost Model
model = XGBClassifier(
    n_estimators=100,
    max_depth=3,
    learning_rate=0.1,
    random_state=42
)

# Step 6 — Train Model
model.fit(X_train, y_train)

# Step 7 — Predictions
predictions = model.predict(X_test)

# Step 8 — Evaluate Accuracy
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2f}")`}</code>
          </pre>
        </div>
        <div className="p-4 bg-slate-50 text-slate-700 border-b border-slate-200 text-lg">
          <p className="mb-0"><strong>Code Explanation:</strong> We load the breast cancer dataset, split it, and initialize <code>XGBClassifier</code> with hyperparameters that control depth and learning rate to prevent overfitting. The model is trained (fit) and tested on unseen data.</p>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">Accuracy: 0.97</p>
          <p className="text-slate-400 text-sm mt-3 italic">Very high accuracy is one reason XGBoost became extremely popular.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* REAL LIFE SCENARIO */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Real-Life Scenario — Fraud Detection
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Suppose a bank wants to detect fraudulent credit card transactions. The dataset includes Transaction amount, Time, Location, Merchant category, Device ID, and Transaction frequency.
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-2">
        <li><strong>Initial Prediction:</strong> Initially many transactions may be classified incorrectly. Residual errors appear.</li>
        <li><strong>Sequential Learning:</strong> New trees gradually learn Unusual spending patterns, Suspicious transaction timing, and Abnormal customer behavior.</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-10">
        Each tree improves fraud detection accuracy. Eventually, the system becomes highly accurate at catching true fraud while ignoring regular behavior.
      </p>


      {/* ADVANTAGES VS DISADVANTAGES */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages & Disadvantages
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li>Extremely high predictive accuracy.</li>
             <li>Fast training via parallel computation.</li>
             <li>Built-in Regularization limits overfitting.</li>
             <li>Automatic missing value handling.</li>
             <li>Massive scalability for tabular data.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li>Hyperparameter tuning can be complex and time-consuming.</li>
             <li>Computationally expensive for extremely large datasets compared to simpler models.</li>
             <li>Interpretability is harder compared to single decision trees or linear models.</li>
             <li>Can still overfit if parameters (like depth/rate) are not tuned properly.</li>
          </ul>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center">
        <GitMerge className="mr-2" /> XGBoost vs Random Forest
      </h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-10">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Feature</th>
              <th className="p-4 font-bold text-indigo-800">XGBoost</th>
              <th className="p-4 font-bold text-emerald-800">Random Forest</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Training</td><td className="p-4">Sequential</td><td className="p-4">Parallel</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Accuracy</td><td className="p-4 font-bold text-indigo-700">Usually Higher</td><td className="p-4 font-bold text-emerald-700">Stable</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Speed</td><td className="p-4 text-emerald-600">Faster Optimized</td><td className="p-4">Moderate</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Overfitting Control</td><td className="p-4">Regularization</td><td className="p-4">Averaging</td></tr>
             <tr><td className="p-4 font-medium">Complexity</td><td className="p-4 text-rose-600">Higher</td><td className="p-4 text-emerald-600">Lower</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Applications and Kaggle Dominance
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        XGBoost became famous because it offered exceptional predictive power, efficient computation, strong generalization, scalability, and flexibility. For many years, it became the default choice for structured data competitions on Kaggle. Common applications include:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          "Fraud Detection", "Credit Risk Analysis", "Customer Churn Prediction", 
          "Recommendation Systems", "Medical Diagnosis", "Search Ranking", 
          "Insurance Analytics", "Stock Prediction", "Sales Forecasting"
        ].map((app, i) => (
          <div key={i} className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-center text-indigo-900 font-medium">
            {app}
          </div>
        ))}
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        XGBoost is an important Machine Learning algorithm. It extends Gradient Boosting using Optimization techniques, Regularization, Parallel processing, Efficient tree learning, and Advanced computational improvements.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm continuously learns residual errors and refines predictions iteratively. Its combination of High accuracy, Speed, Scalability, and Robustness made it a successful algorithm in modern Artificial Intelligence.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Every new tree learns how to correct the remaining errors of previous trees while controlling complexity through mathematical regularization. That single principle—combining gradient descent boosting with structural regularization—forms the optimized foundation of XGBoost."
         </p>
      </div>

    </>
  );
}
