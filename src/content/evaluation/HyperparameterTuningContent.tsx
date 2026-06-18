import React from 'react';
import { Target, Layers, Settings, Workflow, Table2, Lightbulb, TrendingUp, Cpu } from 'lucide-react';

export function HyperparameterTuningContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Hyperparameter Tuning</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Machine Learning models learn patterns from data, but the quality of learning depends heavily on the settings used during training. These settings control how the algorithm behaves, how quickly it learns, how complex the model becomes, and how well it generalizes to unseen data. These settings are known as <strong>Hyperparameters</strong>.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Hyperparameter tuning is the process of finding the most suitable combination of these settings so that the model performs optimally on unseen data.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-indigo-900 italic text-lg leading-relaxed">
            In practical Machine Learning projects, selecting the correct algorithm alone is not enough. Two engineers may use the exact same algorithm on the exact same dataset and still get very different results simply because their hyperparameter values are different.
          </p>
        </div>

        <ul className="list-disc pl-5 text-lg space-y-2 text-slate-800 mb-6">
          <li>A Decision Tree with very small depth may fail to learn important patterns.</li>
          <li>A Decision Tree with extremely large depth may memorize the training dataset and overfit.</li>
          <li>A Neural Network with a very high learning rate may never converge.</li>
          <li>A Neural Network with a very low learning rate may take extremely long to train.</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Why Hyperparameter Tuning Is Important</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Hyperparameter tuning affects almost every aspect of model performance. Proper tuning can:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center"><span className="text-emerald-800 font-bold">Accuracy ↑</span></div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center"><span className="text-emerald-800 font-bold">Overfitting ↓</span></div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center"><span className="text-emerald-800 font-bold">Generalization ↑</span></div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center"><span className="text-emerald-800 font-bold">Training Time ↓</span></div>
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Real-Life Analogy (Preparing Tea)</p>
          <p className="text-slate-800 italic leading-relaxed">
            Imagine preparing tea. The ingredients may be excellent (Milk, Tea powder, Sugar, Water), but the final quality still depends on settings such as boiling time, sugar quantity, and temperature. These settings behave like Hyperparameters. Even with the same ingredients, too much sugar ruins the tea, while too little tea powder makes it tasteless. Similarly, incorrect hyperparameters can ruin model performance.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-are-hyperparameters">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Settings className="mr-3 text-indigo-600" /> What Are Hyperparameters?
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Hyperparameters are configuration variables that are set <strong>before model training begins</strong>. They are NOT learned automatically from the dataset. Instead, the engineer or optimization algorithm must choose them.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Difference Between Parameters and Hyperparameters</h3>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-10 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Parameters</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Hyperparameters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-800">
              <tr>
                <td className="px-6 py-4 font-bold">Learned automatically from data</td>
                <td className="px-6 py-4 text-emerald-600 font-bold">Yes</td>
                <td className="px-6 py-4 text-rose-600 font-bold">No</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 font-bold">Set before training begins</td>
                <td className="px-6 py-4 text-rose-600 font-bold">No</td>
                <td className="px-6 py-4 text-emerald-600 font-bold">Yes</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold">Updated during training</td>
                <td className="px-6 py-4 text-emerald-600 font-bold">Yes</td>
                <td className="px-6 py-4 text-rose-600 font-bold">Usually No</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 font-bold">Example</td>
                <td className="px-6 py-4">Neural Network weights & bias</td>
                <td className="px-6 py-4">Learning rate, batch size</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold">Controlled by</td>
                <td className="px-6 py-4">The learning algorithm</td>
                <td className="px-6 py-4">The engineer or tuning process</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="categories-examples">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Categories and Examples
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-indigo-900 border-b pb-2 mb-4 text-lg">1. Model Hyperparameters</h4>
            <p className="text-slate-800 mb-4">These control the <strong>structure and complexity</strong> of the model, determining how flexible or powerful it becomes.</p>
            <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-indigo-900">
              <li>Tree depth (Decision Trees)</li>
              <li>Number of layers (Neural Networks)</li>
              <li>Number of neighbors (KNN)</li>
              <li>Number of estimators (Random Forest)</li>
            </ul>
          </div>
          
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-sky-900 border-b pb-2 mb-4 text-lg">2. Optimization Hyperparameters</h4>
            <p className="text-slate-800 mb-4">These control <strong>how the model learns</strong>, influencing the training behavior and convergence stability.</p>
            <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-sky-900">
              <li>Learning rate</li>
              <li>Batch size</li>
              <li>Number of epochs</li>
              <li>Momentum</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-6">Algorithm-Specific Hyperparameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border border-slate-200 bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-slate-800 border-b pb-2 mb-3">Decision Trees</h4>
            <ul className="text-sm text-slate-600 space-y-1 font-mono">
              <li>max_depth</li>
              <li>min_samples_split</li>
              <li>criterion (Gini/Entropy)</li>
            </ul>
          </div>
          <div className="border border-slate-200 bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-slate-800 border-b pb-2 mb-3">Random Forest</h4>
            <ul className="text-sm text-slate-600 space-y-1 font-mono">
              <li>n_estimators</li>
              <li>max_features</li>
              <li>max_depth</li>
            </ul>
          </div>
          <div className="border border-slate-200 bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-slate-800 border-b pb-2 mb-3">Neural Networks</h4>
            <ul className="text-sm text-slate-600 space-y-1 font-mono">
              <li>learning_rate</li>
              <li>batch_size</li>
              <li>hidden_layers</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="workflow">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Workflow className="mr-3 text-indigo-600" /> Hyperparameter Tuning Workflow
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The complete workflow for finding the best hyperparameters usually follows these seven systematic stages.
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="bg-slate-50 p-4 border-b border-slate-200">
            <h4 className="font-bold text-slate-800">The 7-Step Pipeline</h4>
          </div>
          <div className="p-6">
            <ol className="list-decimal pl-5 text-lg space-y-4 text-slate-800">
              <li><strong>Select Algorithm:</strong> Choose a baseline (e.g., Random Forest, SVM).</li>
              <li><strong>Define Search Space:</strong> Choose candidate values to test (e.g., <code>max_depth: [3, 5, 7]</code>).</li>
              <li><strong>Select Tuning Technique:</strong> Choose method (Grid Search, Random Search, etc.).</li>
              <li><strong>Train Multiple Models:</strong> Different combinations are systematically tested.</li>
              <li><strong>Evaluate Performance:</strong> Measure performance using cross-validation on metrics like Accuracy or RMSE.</li>
              <li><strong>Select Best Combination:</strong> The best-performing hyperparameters are chosen.</li>
              <li><strong>Retrain Final Model:</strong> The final model is trained on the entire training set using the optimal settings.</li>
            </ol>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="techniques">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Major Hyperparameter Tuning Techniques
        </h2>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">1. Manual Search</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Manual tuning is the oldest approach where human experts manually try different hyperparameter values based on intuition, observe performance, and improve settings gradually.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
            <p className="font-bold text-emerald-900 mb-2">Advantages</p>
            <ul className="list-disc pl-5 text-sm text-emerald-800 space-y-1">
              <li>Easy to understand and requires no special libraries</li>
              <li>Helpful for building intuition and understanding model behavior</li>
              <li>Useful for small-scale educational projects</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
            <p className="font-bold text-rose-900 mb-2">Disadvantages</p>
            <ul className="list-disc pl-5 text-sm text-rose-800 space-y-1">
              <li>Extremely time-consuming for large problems</li>
              <li>Large search spaces become completely unmanageable</li>
              <li>Human intuition may fail or waste computational resources</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">2. Grid Search</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Grid Search is one of the most commonly used hyperparameter tuning techniques. It systematically tests <strong>every possible combination</strong> of hyperparameter values from a predefined search grid.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 mb-2">The Computational Explosion Problem</p>
          <p className="text-indigo-800 text-sm mb-3">Suppose we want to tune a Neural Network with Grid Search:</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-indigo-900">
            <li>Learning rate values: 10 options</li>
            <li>Max depth values: 10 options</li>
            <li>Estimators: 10 options</li>
          </ul>
          <p className="text-indigo-800 text-sm mt-3 font-bold">Total combinations to try: 10 × 10 × 10 = 1,000.</p>
          <p className="text-indigo-800 text-sm mt-1">If each model takes 10 minutes to train, total time becomes enormous. This is why Grid Search becomes impractical for Deep Learning.</p>
        </div>

        <h4 className="text-xl font-bold text-slate-800 mb-4 mt-8">Implementing Grid Search in Python</h4>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Grid Search uses Cross-Validation internally. If only one train-test split were used, the results might depend heavily on random data splitting. Cross-validation averages performance across multiple folds, giving more reliable estimates.
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <h4 className="font-bold text-slate-800">GridSearchCV with Scikit-learn</h4>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">Python</span>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0">
<code className="language-python">{`from sklearn.datasets import load_iris
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Load dataset
iris = load_iris()
X = iris.data
y = iris.target

# Create baseline model
model = RandomForestClassifier(random_state=42)

# Define parameter grid
param_grid = {
    'n_estimators': [10, 50, 100],
    'max_depth': [2, 4, 6]
}

# Grid Search (Testing 3 x 3 = 9 combinations, using 5-fold CV)
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5, 
    scoring='accuracy'
)

# Train all models
grid_search.fit(X, y)

# Print best result
print("Best Parameters:", grid_search.best_params_)
print("Best Score:", round(grid_search.best_score_, 4))`}</code>
            </pre>
          </div>
          <div className="bg-slate-900 text-emerald-400 p-4 font-mono text-sm">
            <p>Output:</p>
            <p>Best Parameters: {'{'} 'max_depth': 4, 'n_estimators': 50 {'}'}</p>
            <p>Best Score: 0.9600</p>
          </div>
        </div>

      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Hyperparameters act as the strategic blueprints for Machine Learning algorithms, dictating the nuances of model complexity and learning speed before training even begins. While parameters are internally calculated weights, hyperparameters are externally tuned architectural controls.
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Finding the right hyperparameter combination via methods like Manual tuning or exhaustive Grid Search is highly complex but fundamentally necessary. Unoptimized hyperparameters will compromise or entirely break powerful algorithms, whereas carefully tuned hyperparameters are the key to unlocking robust real-world generalization and accuracy.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Choosing the algorithm is merely the first step; hyperparameter tuning dictates the intelligence and behavior of the model. However, be extremely wary of the computational explosion that scaling hyperparameter grids brings—systematic intelligence via bounded search spaces and cross-validation is preferred over blind computational exhaustion.
        </p>
      </div>

    </>
  );
}
