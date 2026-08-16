import React from 'react';
import {
  Lightbulb,
  Target,
  Layers,
  ShieldCheck,
  Check,
  X as CloseIcon,
  Code,
  TrendingDown,
  Repeat,
  LayoutTemplate,
  ArrowRight,
  AlertTriangle,
  BrainCircuit,
  Gauge,
  GitCompare,
  Calculator,
  HelpCircle
} from 'lucide-react';

export function BoostingContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Boosting</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        Boosting is an ensemble-learning idea in which models are built <strong>sequentially</strong>. Each new model is trained using information about what the current ensemble is still getting wrong, and the models are combined into one final predictor.
      </p>

      {/* SIMPLE FIRST LAYER */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
          <Lightbulb className="mr-2 text-amber-500" /> Boosting in Simple Words
        </h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Imagine solving a difficult worksheet with three tutors. Tutor 1 solves most questions but misses a few. Tutor 2 studies those remaining mistakes and improves them. Tutor 3 studies what is still wrong. The final answer combines what all the tutors learned.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 not-prose">
          {[
            ['1', 'Model 1', 'Makes a first attempt'],
            ['2', 'Find remaining errors', 'What is still difficult?'],
            ['3', 'Model 2, 3, ...', 'Add corrections step by step'],
            ['4', 'Final ensemble', 'Combine all learners']
          ].map(([n, title, text], index) => (
            <div key={title} className="relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-3">{n}</div>
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-600">{text}</p>
              {index < 3 && <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 z-10" />}
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
          <p className="font-bold text-indigo-900 mb-2">One sentence to remember</p>
          <p className="text-indigo-800 text-lg">
            <strong>Bagging builds many models independently; Boosting builds models one after another.</strong>
          </p>
        </div>
      </section>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* ENSEMBLE INTRO */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Introduction to Ensemble Learning
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        <strong>Ensemble Learning</strong> means combining multiple models so that the final system can perform better or more reliably than relying on one model alone.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 font-bold mb-2">Real-life analogy</p>
        <p className="text-emerald-800">
          One teacher checks your first attempt, another concentrates on the questions you still misunderstand, and a third works on the remaining weak areas. Boosting follows this sequential-improvement idea.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8">
        <p className="font-bold text-amber-900 mb-2 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Important distinction</p>
        <p className="text-amber-900 leading-relaxed">
          Different boosting algorithms define “focus on mistakes” differently. <strong>AdaBoost</strong> changes sample weights. <strong>Gradient Boosting</strong> adds a new model that follows the negative gradient of the loss; for squared-error regression, this looks like fitting residual errors. So not every boosting method literally reweights misclassified rows.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY BOOSTING */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-rose-600" /> Why Use Boosting?
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A single simple model may miss important patterns. Boosting builds an <strong>additive ensemble</strong>: each new learner contributes another correction to the current prediction.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-6 border-l-4 border-rose-400 pl-4 bg-rose-50 py-3 rounded-r-md">
        Boosting is often especially useful when individual learners have limited predictive power. It can reduce bias substantially, although its final bias-variance behaviour depends on the algorithm, model complexity, learning rate, number of learners, noise and regularization.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">What is a Weak Learner?</h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        In the classic boosting idea, a <strong>weak learner</strong> is a model that performs only a little better than chance on the task. In practical tree boosting, shallow decision trees are commonly used as base learners.
      </p>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
        <p className="font-semibold text-slate-900 mb-2">Decision stump</p>
        <p className="text-slate-700 mb-3">A decision stump is a tree with one split.</p>
        <div className="font-mono text-center text-sm sm:text-base bg-white border rounded-lg p-4 text-slate-700">
          Is Age &gt; 30?<br />
          <span className="text-emerald-700">├── Yes → Class A</span><br />
          <span className="text-rose-700">└── No&nbsp; → Class B</span>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* GENERIC WORKFLOW */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Repeat className="mr-2 text-emerald-600" /> High-Level Boosting Workflow
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The common pattern is sequential. Later learners depend on information created by earlier learners.
      </p>

      <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden mb-8">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800">Generic Sequential Workflow</h3>
        </div>
        <div className="p-6">
          <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-emerald-600 marker:font-bold">
            <li>Train the first learner.</li>
            <li>Measure what the current ensemble still gets wrong.</li>
            <li>Create a new training signal from those errors.</li>
            <li>Train the next learner using that signal.</li>
            <li>Add the learner to the ensemble.</li>
            <li>Repeat until the chosen stopping rule is reached.</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 not-prose">
        <div className="border rounded-lg p-5 bg-white">
          <p className="font-bold text-slate-900">Round 1</p>
          <p className="text-slate-600 mt-1">Learner makes initial predictions</p>
        </div>
        <div className="border rounded-lg p-5 bg-white">
          <p className="font-bold text-slate-900">Round 2</p>
          <p className="text-slate-600 mt-1">New learner targets remaining error signal</p>
        </div>
        <div className="border rounded-lg p-5 bg-white">
          <p className="font-bold text-slate-900">Round 3+</p>
          <p className="text-slate-600 mt-1">Continue adding useful corrections</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-blue-900 mb-2">Does error always keep decreasing?</p>
        <p className="text-blue-900">
          Training loss often falls as more learners are added, but <strong>validation performance does not have to improve forever</strong>. This is why learning rate, number of estimators, tree complexity, early stopping and validation are important.
        </p>
      </div>

      {/* BAGGING VS BOOSTING */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <GitCompare className="mr-2 text-violet-600" /> Bagging vs Boosting
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3">Idea</th>
              <th className="border p-3">Bagging</th>
              <th className="border p-3">Boosting</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr><td className="border p-3 font-semibold">Training order</td><td className="border p-3">Mostly independent</td><td className="border p-3">Sequential / dependent</td></tr>
            <tr><td className="border p-3 font-semibold">Main mechanism</td><td className="border p-3">Randomized samples/models + aggregation</td><td className="border p-3">Add learners that improve the current ensemble</td></tr>
            <tr><td className="border p-3 font-semibold">Typical effect</td><td className="border p-3">Often strong variance reduction</td><td className="border p-3">Often strong bias reduction; can also affect variance</td></tr>
            <tr><td className="border p-3 font-semibold">Parallel training</td><td className="border p-3">Usually easier</td><td className="border p-3">Core boosting rounds depend on earlier rounds</td></tr>
            <tr><td className="border p-3 font-semibold">Example</td><td className="border p-3">Bagging, Random Forest</td><td className="border p-3">AdaBoost, Gradient Boosting, XGBoost</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* ADABOOST */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <TrendingDown className="mr-2 text-indigo-600" /> AdaBoost (Adaptive Boosting)
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        AdaBoost is a classic boosting algorithm. For classification, it repeatedly fits a base classifier while adjusting the importance of training examples so that later classifiers pay more attention to examples that were difficult in earlier rounds.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 text-lg text-slate-700 shadow-sm">
        <h3 className="font-bold text-indigo-900 mb-5 border-b border-slate-200 pb-2 flex items-center">
          <Calculator className="w-5 h-5 mr-2" /> Easy AdaBoost Numerical Example
        </h3>

        <div className="space-y-6">
          <div>
            <p className="font-bold text-slate-900">Step 1 — Give all 10 samples equal weight</p>
            <p className="mt-1">Each sample starts with:</p>
            <div className="font-mono bg-white border rounded p-3 mt-2 text-center">1 / 10 = 0.1</div>
          </div>

          <div>
            <p className="font-bold text-slate-900">Step 2 — Train a weak learner</p>
            <p className="mt-1">Suppose it misclassifies 2 of the 10 equally weighted samples.</p>
            <div className="font-mono bg-white border rounded p-3 mt-2 text-center">weighted error = 2 × 0.1 = 0.2</div>
          </div>

          <div>
            <p className="font-bold text-slate-900">Step 3 — Compute learner importance</p>
            <p className="mt-1">In the classic binary AdaBoost notation:</p>
            <div className="text-center text-xl font-serif text-slate-800 bg-white p-3 rounded border shadow-sm max-w-xl mx-auto mt-2">
              α = ½ ln((1 − error) / error)
            </div>
            <div className="font-mono bg-white border rounded p-3 mt-3 text-center">
              α = ½ ln(0.8 / 0.2) = ½ ln(4) ≈ 0.693
            </div>
          </div>

          <div>
            <p className="font-bold text-slate-900">Step 4 — Change sample weights</p>
            <p className="mt-1">With this binary formulation, misclassified samples are multiplied by <code>e^α ≈ 2</code>; correctly classified samples are multiplied by <code>e^-α ≈ 0.5</code>, then all weights are normalized.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-base">
              <div className="bg-rose-50 border border-rose-200 rounded p-3"><strong>Wrong sample:</strong> 0.1 × 2 = 0.2 before normalization</div>
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3"><strong>Correct sample:</strong> 0.1 × 0.5 = 0.05 before normalization</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-amber-900 mb-2">Why this matters</p>
        <p className="text-amber-900">
          The next learner now sees the previously difficult examples as more important. The exact multiclass formula and implementation details can differ from this classic binary derivation, but the central AdaBoost idea remains adaptive reweighting and weighted combination of learners.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">Final AdaBoost Prediction</h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Learners do not necessarily contribute equally. Better learners receive greater influence in the final ensemble.
      </p>
      <div className="bg-white border rounded-lg p-5 mb-10 not-prose">
        <div className="font-mono text-center text-sm sm:text-base text-slate-700 space-y-2">
          <div>Learner 1: α = 0.7 → votes +1</div>
          <div>Learner 2: α = 0.2 → votes −1</div>
          <div className="border-t pt-2 font-bold text-indigo-700">Weighted score = 0.7 − 0.2 = +0.5 → positive class</div>
        </div>
      </div>

      {/* MODERN TYPES */}
      <h2 className="text-2xl font-bold text-indigo-800 mt-12 mb-6 flex items-center">
        <LayoutTemplate className="mr-2 text-rose-500" /> Major Boosting Families
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-indigo-200 shadow-sm rounded-lg p-5">
          <h3 className="font-bold text-indigo-900 text-lg border-b border-indigo-100 pb-2 mb-3">AdaBoost</h3>
          <p className="text-slate-700 leading-relaxed">Adaptively changes training-example importance and combines learners using weighted contributions.</p>
        </div>
        <div className="bg-white border border-rose-200 shadow-sm rounded-lg p-5">
          <h3 className="font-bold text-rose-900 text-lg border-b border-rose-100 pb-2 mb-3">Gradient Boosting</h3>
          <p className="text-slate-700 leading-relaxed">Adds learners that move predictions in the direction that reduces a chosen loss. With squared-error regression, the next learner fits residual-like errors.</p>
        </div>
        <div className="bg-white border border-emerald-200 shadow-sm rounded-lg p-5">
          <h3 className="font-bold text-emerald-900 text-lg border-b border-emerald-100 pb-2 mb-3">XGBoost</h3>
          <p className="text-slate-700 leading-relaxed">A gradient-boosted tree library with a regularized objective and engineering optimizations for efficient tree learning.</p>
        </div>
        <div className="bg-white border border-blue-200 shadow-sm rounded-lg p-5">
          <h3 className="font-bold text-blue-900 text-lg border-b border-blue-100 pb-2 mb-3">LightGBM</h3>
          <p className="text-slate-700 leading-relaxed">A gradient-boosting implementation known for histogram-based learning and leaf-wise tree growth.</p>
        </div>
        <div className="bg-white border border-amber-200 shadow-sm rounded-lg p-5 md:col-span-2">
          <h3 className="font-bold text-amber-900 text-lg border-b border-amber-100 pb-2 mb-3">CatBoost</h3>
          <p className="text-slate-700 leading-relaxed">A gradient-boosted tree library with dedicated support for categorical features and ordered boosting techniques. It can work directly with declared categorical features instead of requiring ordinary one-hot encoding first.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* LEARNING RATE */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Gauge className="mr-2 text-violet-600" /> Learning Rate and Number of Learners
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        In many boosting algorithms, the <strong>learning rate</strong> controls how much each new learner contributes. A smaller learning rate usually means each learner makes a smaller correction, so more learners may be needed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-5 bg-slate-50"><p className="font-bold">Smaller learning rate</p><p className="text-slate-600 mt-2">Smaller individual corrections; often requires more estimators.</p></div>
        <div className="border rounded-lg p-5 bg-slate-50"><p className="font-bold">Larger learning rate</p><p className="text-slate-600 mt-2">Larger corrections; can become too aggressive depending on the problem.</p></div>
        <div className="border rounded-lg p-5 bg-slate-50"><p className="font-bold">Best choice</p><p className="text-slate-600 mt-2">Tune learning rate and model count together using validation.</p></div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* PROS CONS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages vs Limitations
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center"><Check className="mr-2 w-6 h-6" /> Advantages</h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Strong predictive performance:</strong> Boosted trees are often competitive on structured/tabular prediction tasks.</li>
            <li><strong>Sequential improvement:</strong> Later learners can correct patterns the current ensemble still misses.</li>
            <li><strong>Flexible objectives:</strong> Gradient-boosting methods can optimize different differentiable loss functions.</li>
            <li><strong>Nonlinear relationships:</strong> Tree-based boosting can model interactions and nonlinear patterns.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center"><CloseIcon className="mr-2 w-6 h-6" /> Limitations</h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Sequential dependence:</strong> Core boosting rounds are harder to parallelize than independent bagged models.</li>
            <li><strong>Hyperparameter sensitivity:</strong> Learning rate, tree complexity and number of estimators interact.</li>
            <li><strong>Noise/outliers:</strong> Some boosting methods can spend too much capacity on difficult or noisy observations.</li>
            <li><strong>Interpretability:</strong> A large boosted ensemble is harder to explain than a single small tree.</li>
          </ul>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-rose-900 mb-2">Common misconception</p>
        <p className="text-rose-900">
          Adding more boosting rounds does <strong>not automatically guarantee better unseen-data performance</strong>. Use a validation strategy rather than selecting the model that simply has the lowest training loss.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CODE */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Python Implementation — AdaBoost
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This example uses the Scikit-learn breast-cancer dataset only as an educational binary-classification dataset. It is not a clinical deployment example.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h3 className="font-bold text-indigo-800 text-xl">AdaBoostClassifier</h3>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0"><code>{`from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

# 1. Load data
X, y = load_breast_cancer(return_X_y=True)

# 2. Keep the test set separate
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 3. A simple base learner: one-split decision tree
stump = DecisionTreeClassifier(
    max_depth=1,
    random_state=42
)

# 4. Build AdaBoost
model = AdaBoostClassifier(
    estimator=stump,
    n_estimators=50,
    learning_rate=1.0,
    random_state=42
)

# 5. Train and evaluate
model.fit(X_train, y_train)
predictions = model.predict(X_test)

print(f"Test accuracy: {accuracy_score(y_test, predictions):.2%}")
print(confusion_matrix(y_test, predictions))`}</code></pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <p>Test accuracy: 95.61%</p>
          <p>[[38&nbsp;&nbsp;4]</p>
          <p>&nbsp;[ 1 71]]</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-blue-900 mb-2">How to read this result</p>
        <p className="text-blue-900">
          The model correctly classified 109 of 114 test examples in this particular reproducible split. The score is a teaching result, not evidence that AdaBoost will always achieve about 96% accuracy on other datasets.
        </p>
      </div>

      {/* COMMON MISTAKES */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <AlertTriangle className="mr-2 text-amber-500" /> Common Mistakes
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-lg text-slate-700 mb-10">
        <li>Thinking every boosting algorithm reweights misclassified training rows exactly like AdaBoost.</li>
        <li>Assuming training error must decrease smoothly and validation performance must improve with every added learner.</li>
        <li>Using the final test set repeatedly to choose the number of estimators or learning rate.</li>
        <li>Assuming boosting automatically solves class imbalance.</li>
        <li>Calling Random Forest a boosting algorithm; it is an averaging/bagging-style ensemble.</li>
      </ul>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <HelpCircle className="mr-2 text-indigo-600" /> Quick Questions
      </h2>
      <div className="space-y-4 mb-10">
        <details className="border rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Is Boosting always better than Bagging?</summary>
          <p className="mt-3 text-slate-700">No. They use different strategies and the better choice depends on the dataset, base learners, noise, computation and validation performance.</p>
        </details>
        <details className="border rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Does every boosting model use decision stumps?</summary>
          <p className="mt-3 text-slate-700">No. Stumps are common in simple AdaBoost examples, while modern gradient-boosted tree systems often use shallow trees with several leaves.</p>
        </details>
        <details className="border rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Can Boosting be used for regression?</summary>
          <p className="mt-3 text-slate-700">Yes. Boosting methods exist for both classification and regression. Gradient Boosting is especially easy to understand in regression because squared-error boosting can be explained through residual corrections.</p>
        </details>
      </div>

      {/* NEXT LINKS */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <p className="font-bold text-indigo-900 text-lg mb-3 flex items-center"><BrainCircuit className="w-5 h-5 mr-2" /> Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/adaboost" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">AdaBoost →</a>
          <a href="/learn/gradient-boosting" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">Gradient Boosting →</a>
          <a href="/learn/xgboost" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">XGBoost →</a>
          <a href="/learn/bagging" className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 font-semibold hover:bg-indigo-100">Compare with Bagging</a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Boosting creates an ensemble <strong>sequentially</strong>. Each new learner is added using information about what the current ensemble still needs to improve.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        AdaBoost does this by adaptively changing sample importance. Gradient Boosting uses loss gradients, and modern libraries such as XGBoost, LightGBM and CatBoost build sophisticated boosted-tree systems around the same broad sequential-improvement idea.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight</p>
        <p className="text-slate-800 text-lg leading-relaxed">
          <strong>Bagging asks many models independently and combines them. Boosting builds a sequence where later learners improve the current ensemble.</strong>
        </p>
      </div>
    </>
  );
}
