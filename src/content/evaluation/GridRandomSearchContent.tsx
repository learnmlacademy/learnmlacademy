import React from 'react';
import { Target, Layers, Settings, Workflow, Table2, Lightbulb, Search, Dices, Grid, Cpu, ArrowRight, Code } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis } from 'recharts';

const gridSearchData = [
  { n_estimators: 10, learning_rate: 0.1, z: 1 }, { n_estimators: 10, learning_rate: 0.01, z: 1 }, { n_estimators: 10, learning_rate: 0.001, z: 1 },
  { n_estimators: 50, learning_rate: 0.1, z: 1 }, { n_estimators: 50, learning_rate: 0.01, z: 1 }, { n_estimators: 50, learning_rate: 0.001, z: 1 },
  { n_estimators: 100, learning_rate: 0.1, z: 1 }, { n_estimators: 100, learning_rate: 0.01, z: 1 }, { n_estimators: 100, learning_rate: 0.001, z: 1 },
];

const randomSearchData = [
  { n_estimators: 15, learning_rate: 0.08, z: 1 }, { n_estimators: 80, learning_rate: 0.004, z: 1 }, { n_estimators: 45, learning_rate: 0.02, z: 1 },
  { n_estimators: 95, learning_rate: 0.09, z: 1 }, { n_estimators: 20, learning_rate: 0.0015, z: 1 }, { n_estimators: 60, learning_rate: 0.05, z: 1 },
  { n_estimators: 35, learning_rate: 0.012, z: 1 }, { n_estimators: 75, learning_rate: 0.008, z: 1 }, { n_estimators: 85, learning_rate: 0.06, z: 1 },
];

export function GridRandomSearchContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Grid Search and Random Search</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Machine Learning algorithms do not automatically become intelligent after receiving data. Every Machine Learning model contains several internal configuration settings that determine how the model behaves during training. These settings influence how fast the model learns, its complexity, its flexibility, how much it overfits, and how well it generalizes.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          These settings are called <strong>Hyperparameters</strong>.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-indigo-900 text-lg leading-relaxed mb-4">
            Hyperparameters are extremely important because they directly control the learning process of the algorithm. Even if the dataset is excellent, the features are meaningful, and the algorithm is powerful, the model can still perform poorly if the hyperparameters are badly chosen.
          </p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-indigo-900">
            <li><strong>Random Forest:</strong> Too few trees → may not learn enough patterns. Too many deep trees → overfits and becomes computationally expensive.</li>
            <li><strong>Deep Learning:</strong> Learning rate too high → unstable training. Learning rate too low → extremely slow training.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="understanding-hyperparameters">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Settings className="mr-3 text-indigo-600" /> Understanding Hyperparameters First
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Before understanding Grid Search and Random Search, it is necessary to clearly understand what hyperparameters actually are. Hyperparameters are external settings chosen <em>before</em> the training process begins. They are NOT learned automatically from the dataset.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Algorithm</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Crucial Hyperparameter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-800">
              <tr><td className="px-6 py-4 font-bold">KNN</td><td className="px-6 py-4">Number of neighbors (k)</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold">Decision Tree</td><td className="px-6 py-4">Maximum depth</td></tr>
              <tr><td className="px-6 py-4 font-bold">Random Forest</td><td className="px-6 py-4">Number of trees</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold">Neural Network</td><td className="px-6 py-4">Learning rate</td></tr>
              <tr><td className="px-6 py-4 font-bold">SVM</td><td className="px-6 py-4">Kernel type</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold">XGBoost</td><td className="px-6 py-4">Learning rate and max depth</td></tr>
            </tbody>
          </table>
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Real-Life Analogy (Cooking Food)</p>
          <p className="text-slate-800 italic leading-relaxed">
            Imagine preparing food: The ingredients represent the Training Data. The cooking method represents the Machine Learning Algorithm. But settings such as cooking temperature, amount of salt, cooking duration, and flame intensity behave like Hyperparameters. Even if the ingredients are excellent: too much heat burns the food, too little cooking leaves it raw, and excess salt ruins taste.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Why Hyperparameter Tuning Is Necessary</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Different hyperparameter values produce entirely different models. Some combinations may lead to Underfitting, Overfitting, slow learning, or poor generalization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-rose-800 border-b pb-2 mb-3">Case 1: Underfitting</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">max_depth = 1</p>
            <p className="text-sm text-slate-800 leading-relaxed">The tree is extremely simple and fails to capture important patterns. High errors on both training and testing data.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-rose-800 border-b pb-2 mb-3">Case 2: Overfitting</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">max_depth = 100</p>
            <p className="text-sm text-slate-800 leading-relaxed">The tree becomes highly complex, memorizing training samples and noise instead of finding generalized patterns.</p>
          </div>
          <div className="bg-white border-2 border-emerald-400 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-emerald-800 border-b pb-2 mb-3">Case 3: Balanced Generalization</h4>
            <p className="text-sm font-mono text-slate-600 mb-2">max_depth = 5</p>
            <p className="text-sm text-slate-800 leading-relaxed">The tree captures critical structural patterns without memorizing noise, yielding high performance on unseen test data.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-grid-search">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Grid className="mr-3 text-indigo-600" /> What Is Grid Search?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Grid Search is an exhaustive hyperparameter tuning technique that systematically tests <strong>every possible combination</strong> of hyperparameter values from a predefined set of candidate values.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The name "Grid Search" comes from the fact that all parameter combinations form a structured grid. It is highly systematic and reliable because no possible combination inside the geometric search space is ignored.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-10 overflow-x-auto">
          <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre w-fit text-sm">
{`                    n_estimators
                 50           100
             ------------------------
depth = 2   |   Model1    |  Model2 |
depth = 4   |   Model3    |  Model4 |
depth = 6   |   Model5    |  Model6 |`}
          </div>
          <p className="text-slate-600 text-sm mt-3 italic">Each cell represents a completely different trained model. Grid Search evaluates every single cell.</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Step-by-Step Working of Grid Search</h3>
        <div className="space-y-4 mb-8">
          <div className="flex items-start">
            <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4 mt-1">1</div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Define Search Space</h4>
              <p className="text-slate-700">Select candidate values (e.g., <code>max_depth: 2, 4, 6</code> and <code>n_estimators: 50, 100</code>). This collection is called the Parameter Grid.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4 mt-1">2</div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Generate All Combinations</h4>
              <p className="text-slate-700">Grid Search formulates the Cartesian product for every possible combination (Total: 3 × 2 = 6 models to train).</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4 mt-1">3</div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Train Models</h4>
              <p className="text-slate-700">For each combination: a model is initialized, trained, and its cross-validation score is strictly computed.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4 mt-1">4</div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Evaluate Performance Metrics</h4>
              <p className="text-slate-700">Scores are measured using standard metrics (Accuracy, Precision, Recall for Classification — RMSE, MAE for Regression).</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4 mt-1">5</div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Select Best Hyperparameters</h4>
              <p className="text-slate-700">Validation scores are compared globally, and the combination yielding the highest score becomes the final choice.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Mathematical Reality of Grid Search</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          If you have 5 learning rates, 4 max depths, and 3 batch sizes, Grid Search must check every combination: <code>5 × 4 × 3 = 60 models</code>. 
        </p>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          If each model takes 10 minutes to compile and train, the total physical time required is <code>60 × 10 = 600 minutes (10 Hours)</code>. This geometric scaling issue makes Grid Search computationally disastrous for very complex architectures like Deep Learning with many parameters.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Python Implementation (Scikit-Learn)</h3>
        
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="bg-slate-50 p-4 border-b border-slate-200">
            <h4 className="font-bold text-slate-800 flex items-center"><Code className="h-5 w-5 mr-2 text-indigo-600" /> Random Forest Hyperparameter Tuning</h4>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0">
<code className="language-python">{`from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

# 1. Load dataset
X, y = load_iris(return_X_y=True)

# 2. Create model
model = RandomForestClassifier(random_state=42)

# 3. Define parameter grid (Total combinatorial explosion: 3 * 3 = 9 configurations)
param_grid = {
    'n_estimators': [10, 50, 100],
    'max_depth': [2, 4, 6]
}

# 4. Create Grid Search object (cv=5 means 5-fold cross validation)
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5, 
    scoring='accuracy'
)

# 5. Train Grid Search
grid_search.fit(X, y)

# 6. Retrieve optimal settings
print("Best Parameters:", grid_search.best_params_)
print("Best Accuracy:", round(grid_search.best_score_, 4))`}</code>
            </pre>
          </div>
          <div className="bg-slate-900 text-emerald-400 p-4 font-mono text-sm border-t border-slate-700">
            <p>Output:</p>
            <p>Best Parameters: {'{'} 'max_depth': 4, 'n_estimators': 50 {'}'}</p>
            <p>Best Accuracy: 0.9600</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="cross-validation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Why Cross-Validation is Required
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Using only one single train-test split to tune parameters can produce wildly unreliable results because the performance essentially depends purely on the random shuffle of that split. The model might just get "lucky." Cross-validation entirely stops this vulnerability by actively rotating different folds of data to validate over multiple cycles, averaging out variance anomalies.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8 w-fit">
          <p className="font-bold text-slate-800 text-center mb-4">5-Fold Cross Validation Structure</p>
          
          <div className="space-y-2 font-mono text-sm">
            <div className="flex"><div className="w-16 text-slate-500 py-1">Split 1</div><div className="flex-1 flex gap-1"><div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded">Test</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div></div></div>
            <div className="flex"><div className="w-16 text-slate-500 py-1">Split 2</div><div className="flex-1 flex gap-1"><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded">Test</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div></div></div>
            <div className="flex"><div className="w-16 text-slate-500 py-1">Split 3</div><div className="flex-1 flex gap-1"><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded">Test</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div></div></div>
            <div className="flex"><div className="w-16 text-slate-500 py-1">Split 4</div><div className="flex-1 flex gap-1"><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded">Test</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div></div></div>
            <div className="flex"><div className="w-16 text-slate-500 py-1">Split 5</div><div className="flex-1 flex gap-1"><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-sky-100 text-sky-800 px-3 py-1 rounded flex-1">Train</div><div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded">Test</div></div></div>
          </div>
        </div>

      </div>
      
      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-random-search">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Dices className="mr-3 text-indigo-600" /> What Is Random Search?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Random Search is another hyperparameter tuning method where random combinations of hyperparameters are selected instead of sequentially testing every possible combination. Unlike Grid Search, <strong>Random Search does NOT perform exhaustive mapping</strong>.
        </p>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Instead, it samples coordinates randomly from the search space, allowing engineers to directly dictate a firm computational budget via <code>n_iter</code> (e.g., "try exactly 50 total configurations and give me the best one").
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Why Random Search Became Highly Popular</h3>
        
        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-sky-900 text-lg leading-relaxed mb-2">Not all hyperparameters are equally important.</p>
          <p className="text-slate-800 italic leading-relaxed">
            Researchers discovered that models are often highly sensitive to a single parameter (like Learning Rate) but remarkably indifferent to another (like batch size). Grid Search wastes enormous computing time extensively mapping variations of absolutely meaningless secondary parameters. Random Search naturally explores a broader array of values for the critical parameters much faster.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-6 mt-8">Visual Contrast: Grid vs. Random Space Exploration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-indigo-800 mb-2">Grid Search Space</h4>
            <p className="text-center text-xs text-slate-500 mb-4">Highly regimented; Only tests 3 unique learning rates.</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="n_estimators" type="number" label={{ value: 'n_estimators', position: 'insideBottom', offset: -10 }} />
                  <YAxis dataKey="learning_rate" type="number" scale="log" domain={[0.001, 0.1]} label={{ value: 'Learning Rate (log)', angle: -90, position: 'insideLeft', offset: -10 }} />
                  <ZAxis dataKey="z" range={[50, 50]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Tests" data={gridSearchData} fill="#4f46e5" shape="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-emerald-800 mb-2">Random Search Space</h4>
            <p className="text-center text-xs text-slate-500 mb-4">High variance; Tests 9 totally unique learning rates.</p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="n_estimators" type="number" label={{ value: 'n_estimators', position: 'insideBottom', offset: -10 }} />
                  <YAxis dataKey="learning_rate" type="number" scale="log" domain={[0.001, 0.1]} label={{ value: 'Learning Rate (log)', angle: -90, position: 'insideLeft', offset: -10 }} />
                  <ZAxis dataKey="z" range={[50, 50]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Tests" data={randomSearchData} fill="#10b981" shape="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Hyperparameter Tuning is fundamentally essential for turning basic algorithmic mechanics into highly performant and intelligent customized models. It involves adjusting configurations that dictate tree depths, learning velocities, and structure shapes purely prior to the model training cycle.
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Grid Search tests absolutely every combinatorial intersection available logically on a defined plane. Random Search disrupts this massive structural lag by testing randomized coordinate clusters across that exact same space, theoretically skipping useless coordinate overlaps and arriving at high-performing combinations using drastically less raw computation.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          The Curse of Dimensionality will violently collapse Grid Search pipelines as more hyperparameters are integrated. As complexity scales from basic trees to massive Deep Learning nets, Random Search (and its Bayesian successors) completely outclasses Grid mapping due to asymmetrical sensitivity—not all hyperparameters physically matter to the engine, and Random Search efficiently tests far more variations of the ones that do.
        </p>
      </div>

    </>
  );
}

