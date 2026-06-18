import React from 'react';
import { GradientBoostingResidualDiagram } from '../../components/diagrams/EnsembleDiagrams';
import { 
  Target,
  Layers,
  Activity,
  Code,
  ShieldCheck,
  Check,
  X as CloseIcon,
  AlertCircle,
  GitMerge
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export function GradientBoostingContent() {
  const errorReductionData = [
    { tree: 1, error: 20 },
    { tree: 2, error: 14.5 },
    { tree: 3, error: 10 },
    { tree: 4, error: 6.5 },
    { tree: 5, error: 4 },
    { tree: 6, error: 2.2 },
    { tree: 7, error: 1.1 },
    { tree: 8, error: 0.5 },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Gradient Boosting</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md">
        Gradient Boosting belongs to a broader family of methods known as: <strong>Ensemble Learning Algorithms</strong>.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Ensemble learning refers to a very important idea in Artificial Intelligence:
      </p>

      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        "Instead of depending on one model, combine many models together to create a stronger intelligent system."
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This concept is inspired by real-world human decision making.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        For example: Suppose a hospital wants to diagnose a dangerous disease. Instead of depending on the opinion of a single doctor, the hospital may combine opinions from:
      </p>
      
      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-2">
        <li>A radiologist</li>
        <li>A cardiologist</li>
        <li>A neurologist</li>
        <li>A senior surgeon</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Each expert contributes partial knowledge, and together they make a more reliable decision. Ensemble learning works using exactly the same philosophy. Instead of depending on one Machine Learning model, the system combines multiple smaller models together to achieve better predictive performance.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Gradient Boosting is an advanced ensemble technique. It became the foundation for some of the world’s most successful Machine Learning systems, including: <strong>XGBoost, LightGBM, and CatBoost</strong>.
      </p>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-blue-900 font-bold mb-2 text-lg">These algorithms dominate:</p>
        <ul className="list-disc pl-5 space-y-1 text-blue-800 text-lg">
          <li>Kaggle competitions</li>
          <li>Banking systems</li>
          <li>Fraud detection systems</li>
          <li>Recommendation engines</li>
          <li>Insurance analytics</li>
          <li>Search ranking systems</li>
          <li>Customer churn prediction</li>
          <li>Credit scoring systems</li>
        </ul>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-10">
        Even today, many large companies continue to use Gradient Boosting models in production because of their exceptional accuracy on structured/tabular data.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY GRADIENT BOOSTING WAS NEEDED */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why Gradient Boosting Was Needed
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        To understand why Gradient Boosting became revolutionary, we first need to understand a major limitation of traditional Machine Learning models. Earlier Machine Learning systems often relied on building: <strong>One single predictive model</strong>.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        However, depending on a single model creates many problems:
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-2">
        <li>The model may underfit</li>
        <li>The model may overfit</li>
        <li>Complex nonlinear patterns may be missed</li>
        <li>Prediction errors may remain large</li>
        <li>Difficult observations may never get corrected</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Researchers realized that most models make mistakes in different regions of the dataset. This led to a very important question:
      </p>

      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        "What if a new model could learn from the mistakes of previous models?"
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This idea became the foundation of Boosting algorithms. Gradient Boosting introduced a remarkable strategy: <strong>Build models sequentially, where every new model focuses specifically on correcting previous errors.</strong> This changed the entire landscape of Machine Learning.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Real-World Intuition Behind Gradient Boosting
      </h3>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Imagine a sculptor carving a statue from a rough block of stone. Initially: The sculpture is imperfect and contains many rough areas. The sculptor does not create the final masterpiece in one step. Instead:
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-2">
        <li>First rough carving</li>
        <li>Then small refinements</li>
        <li>Then finer corrections</li>
        <li>Then polishing</li>
        <li>Then tiny adjustments</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Each step removes some remaining imperfection. After many iterations, the final sculpture becomes highly refined and beautiful.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Gradient Boosting works using exactly the same philosophy. The first model creates a rough prediction. The next model identifies: <em>What mistakes still remain?</em> and tries to correct them. Then another model corrects the remaining errors. Then another. Then another. Over time, prediction quality improves dramatically. This iterative error-correction process is the heart of Gradient Boosting.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        The Fundamental Philosophy of Gradient Boosting
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The central philosophy behind Gradient Boosting is: <strong>Learn from mistakes repeatedly until errors become very small.</strong>
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Unlike Bagging algorithms such as Random Forest, where trees are trained independently in parallel, Gradient Boosting trains models: <strong>Sequentially</strong>. This means:
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-2">
        <li>Every new learner depends on previous learners</li>
        <li>Every learner improves existing predictions</li>
        <li>Every stage attempts to minimize remaining errors</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        This sequential refinement makes Gradient Boosting extremely powerful.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Why the Word “Gradient” Appears
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The term <strong>Gradient</strong> comes from calculus and optimization theory. In mathematics, a gradient tells us: <em>Which direction reduces error fastest.</em>
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Gradient Boosting uses this optimization principle to minimize prediction errors step by step. This is why the algorithm combines Machine Learning, Ensemble learning, Optimization theory, and Gradient descent mathematics into one unified system.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="text-emerald-900 font-bold mb-2">Why Gradient Boosting Became So Powerful</p>
        <p className="text-emerald-800 mb-2">Gradient Boosting became famous because it solved several major Machine Learning challenges simultaneously. It can:</p>
        <ul className="list-disc pl-5 space-y-1 text-emerald-800 mb-4">
          <li>Capture nonlinear relationships</li>
          <li>Learn highly complex patterns</li>
          <li>Reduce prediction errors iteratively</li>
          <li>Handle structured data extremely well</li>
          <li>Produce very high predictive accuracy</li>
        </ul>
        <p className="text-emerald-800 mb-0 font-bold">The Core Insight: New models do not learn the original target directly. They learn the mistakes of previous models.</p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CORE PHILOSOPHY & WORKFLOW */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Core Workflow and Components
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Before Gradient Boosting, traditional algorithms usually train once and stop learning. But Gradient Boosting introduced a revolutionary idea: Build models sequentially, where every new model focuses on correcting previous errors.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Suppose a student is learning mathematics. Initially, the student solves many problems incorrectly. The teacher now analyzes: <em>Which mistakes are still remaining?</em> The teacher then focuses only on those mistakes. After improvement, fewer mistakes remain. Again the teacher identifies remaining weak areas and improves them. Gradient Boosting works using exactly this philosophy.
      </p>

      <div className="pl-4 border-l-4 border-purple-400 bg-purple-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-purple-900 border-b border-purple-200 pb-2 mb-3 text-xl font-bold">Breaking Down the Name</p>
        <p className="mb-2 text-purple-900"><strong>Boosting:</strong> Combining multiple weak learners to create a strong learner. Instead of depending on one large model, it combines many small models sequentially. Each model improves the mistakes of previous models.</p>
        <p className="mb-0 text-purple-900"><strong>Gradient:</strong> Comes from Gradient Descent Optimization. The gradient tells us how to reduce prediction error step by step. Gradient Boosting uses gradients to optimize model performance iteratively.</p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        High-Level Workflow of Gradient Boosting
      </h3>

      <div className="mb-10 text-lg space-y-4">
        <div className="pl-4 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors py-2">
            <strong>1. Initial Prediction:</strong> Starts with an initial guess (often the average).
        </div>
        <div className="pl-4 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors py-2">
            <strong>2. Calculate Errors (Residuals):</strong> See how far the guess was from the actual target.
        </div>
        <div className="pl-4 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors py-2">
            <strong>3. Train Weak Learner on Residual Errors:</strong> The next model is built using the residuals as targets, not the original target.
        </div>
        <div className="pl-4 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors py-2">
            <strong>4. Update Predictions:</strong> Add the new model's output (scaled by a learning rate) to the previous prediction.
        </div>
        <div className="pl-4 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors py-2">
            <strong>5. Calculate New Residuals:</strong> Re-calculate how far off we are now.
        </div>
        <div className="pl-4 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors py-2">
            <strong>6. Train Next Learner:</strong> Build a model on the <em>new</em> residuals.
        </div>
        <div className="pl-4 border-l-2 border-indigo-200 hover:border-indigo-500 transition-colors py-2">
            <strong>7. Final Strong Model:</strong> Combine all learners after repeating sequentially.
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Gradient Boosting usually uses <strong>Small Decision Trees</strong> as weak learners. These trees are intentionally kept small because small trees generalize better, sequential correction improves accuracy, and simpler learners reduce overfitting.
      </p>
      <GradientBoostingResidualDiagram />


      <hr className="border-slate-200 mt-10 mb-10" />

      {/* MATHEMATICAL FOUNDATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-rose-600" /> Loss Functions and Residual Errors
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The main objective is: <strong>Minimize the loss function iteratively.</strong> The algorithm continuously tries to reduce prediction error. A loss function measures how wrong the predictions are. Higher loss means more errors, lower loss means better predictions.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Common Loss Functions include Mean Squared Error, Log Loss, Absolute Error, and Huber Loss.
      </p>

      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-rose-900 mb-2">Mean Squared Error (MSE)</p>
        <p className="text-rose-800 mb-3">A common loss function: <code>MSE = (1/n) * Σ(y_actual - y_predicted)²</code></p>
        <p className="text-rose-800 mb-2"><strong>Worked Example of MSE:</strong></p>
        <ul className="list-disc pl-8 mb-2 text-rose-800">
           <li>Actual: 10, Predicted: 8 ➔ Error: 2 ➔ Sq Error: 4</li>
           <li>Actual: 15, Predicted: 14 ➔ Error: 1 ➔ Sq Error: 1</li>
           <li>Actual: 20, Predicted: 18 ➔ Error: 2 ➔ Sq Error: 4</li>
        </ul>
        <p className="text-rose-800 font-bold">MSE = (4 + 1 + 4) / 3 = 3</p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Understanding Residual Errors
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Residual error means the difference between actual value and predicted value.
      </p>
      
      <p className="text-lg text-slate-700 font-mono bg-slate-100 px-3 py-1 rounded inline-block mb-6">
        Residual = Actual - Predicted
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        For example, if actual value = 100, and predicted value = 80, the residual is <code>100 - 80 = 20</code>. This remaining error (20) becomes the learning target for the next learner. The next learner does NOT predict original outputs directly. Instead it predicts Residual Errors. This is the most important idea in Gradient Boosting.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Step-by-Step Working with Examples
      </h3>

      <div className="space-y-8 mb-10">
        <div>
          <p className="text-lg font-bold text-slate-800 mb-2">Step 1 — Initial Prediction</p>
          <p className="text-lg text-slate-700">The algorithm first creates a simple prediction. For regression, it is usually the mean. If target values are 10, 12, 14, 16. Mean = (10+12+14+16)/4 = 13. Initial prediction becomes 13 for all samples.</p>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-800 mb-2">Step 2 — Calculate Residual Errors</p>
          <p className="text-lg text-slate-700">Compute <code>Actual - Predicted</code>.<br/>Actual: 10, Pred: 13 ➔ Residual: -3<br/>Actual: 16, Pred: 13 ➔ Residual: +3</p>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-800 mb-2">Step 3 — Train Weak Learner on Residuals</p>
          <p className="text-lg text-slate-700">A small decision tree is trained on Residual Errors. The tree learns how much correction is needed.</p>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-800 mb-2">Step 4 — Update Predictions</p>
          <p className="text-lg text-slate-700 mb-2">New predictions are updated using: <code>New Prediction = Old Prediction + (Learning Rate × Tree Output)</code>.</p>
          <p className="text-lg text-slate-700 italic border-l-4 border-slate-300 pl-3">Example: Old Prediction = 13, Tree Output = 2, Learning Rate = 0.1. Updated prediction = 13 + (0.1 × 2) = 13.2. Prediction improves gradually.</p>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h4 className="font-bold text-indigo-900 text-xl mb-4">Iterative Error Reduction Visualization</h4>
        <div className="w-full h-[300px] bg-white border rounded-xl shadow-sm pt-6 pr-6 pb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={errorReductionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="tree" label={{ value: 'Number of Trees', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'Residual Error', angle: -90, position: 'insideLeft', offset: 10 }} />
              <Tooltip cursor={{fill: 'transparent'}} formatter={(value: any) => [`${value}`, 'Error']} />
              <Line type="monotone" dataKey="error" stroke="#10b981" strokeWidth={4} dot={{r: 6}} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Hyperparameters in Gradient Boosting
      </h3>
      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-3">
        <li><strong>Number of Trees:</strong> Controls how many weak learners will be created. Too many may cause overfitting.</li>
        <li><strong>Maximum Depth:</strong> Controls tree complexity. Small depth = simpler trees, better generalization. Large depth = higher overfitting risk.</li>
        <li><strong>Learning Rate vs Number of Trees:</strong> Important relationship: Small Learning Rate requires More Trees. This usually improves performance.</li>
      </ul>


      <hr className="border-slate-200 mt-10 mb-10" />

      {/* PYTHON IMPLEMENTATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Implementing Gradient Boosting in Python
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Now let us implement Gradient Boosting step by step using Scikit-Learn. We will predict house prices using a sample regression dataset.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center">
             <Code className="text-indigo-600 mr-2" />
             <h4 className="font-bold text-indigo-800 text-xl">Gradient Boosting Regression</h4>
          </div>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`# Step 1 — Import Libraries
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error

# Step 2 — Load Dataset (using California Housing instead of Boston)
data = fetch_california_housing()
X = data.data
y = data.target

# Step 3 — Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 4 — Create Gradient Boosting Model
model = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)

# Step 5 — Train the Model
model.fit(X_train, y_train)

# Step 6 — Predictions
predictions = model.predict(X_test)

# Step 7 — Evaluate Model
mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse:.2f}")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">Mean Squared Error: 0.29</p>
          <p className="text-slate-400 text-sm mt-3 italic">Output may vary based on dataset choice (value shown is an example scaled MSE for CA housing. For Boston the textbook example is ~8.91).</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* ADVANTAGES VS DISADVANTAGES & COMPARISON */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages & Comparison
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Extremely High Accuracy:</strong> Often outperforms many traditional ML algorithms on tabular data.</li>
             <li><strong>Captures Complex Patterns:</strong> Excellent at finding highly complex nonlinear relationships.</li>
             <li><strong>Handles Mixed Data:</strong> Deals smoothly with mixed feature types and requires less preprocessing.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Slower Training:</strong> Models train sequentially, meaning it can't easily be parallelized like Bagging.</li>
             <li><strong>Overfitting Risk:</strong> It can overfit specifically if too many trees are used or learning rate is too high.</li>
             <li><strong>Tuning Sensitivity:</strong> Hyperparameter tuning is critical for optimal performance.</li>
          </ul>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center">
        <GitMerge className="mr-2" /> Gradient Boosting vs Random Forest
      </h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-10">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Feature</th>
              <th className="p-4 font-bold text-indigo-800">Gradient Boosting</th>
              <th className="p-4 font-bold text-emerald-800">Random Forest</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Training Style</td><td className="p-4">Sequential</td><td className="p-4">Parallel</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Main Goal</td><td className="p-4 font-bold text-indigo-700">Reduce Bias</td><td className="p-4 font-bold text-emerald-700">Reduce Variance</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Speed</td><td className="p-4 text-rose-700">Slower</td><td className="p-4 text-emerald-700">Faster</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Overfitting Risk</td><td className="p-4">Higher</td><td className="p-4">Lower</td></tr>
             <tr><td className="p-4 font-medium">Accuracy</td><td className="p-4 font-bold">Usually Higher</td><td className="p-4">Stable</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Gradient Boosting is a powerful ensemble learning algorithm in Machine Learning. Its success comes from combining sequential learning, residual correction, gradient optimization, and weak learners.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm continuously learns from mistakes and improves predictions iteratively. Modern AI systems heavily rely on Gradient Boosting because of its high accuracy, flexibility, strong predictive performance, and robust ability to model complex patterns in tabular data. Because it iteratively zeroes in on errors through gradient descent logic, it has become the standard for predictive superiority.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Every new learner should focus on predicting the remaining errors of previous learners. New models do not learn the original target directly. They learn the mistakes of previous models. That single principle forms the foundation of all Gradient Boosting algorithms used in modern Artificial Intelligence systems."
         </p>
      </div>

    </>
  );
}
