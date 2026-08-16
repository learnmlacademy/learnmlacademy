import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle,
  Code,
  GitMerge,
  Layers,
  Scale,
  Table2,
  Target,
  TrendingDown,
} from 'lucide-react';

export function CostFunctionsContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Cost Functions</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A Machine Learning model often needs a numerical way to answer one simple question:
          <strong> “How bad are my current predictions?”</strong> A loss or cost function provides that signal.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Cost Functions in Simple Words</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            {[
              ['1', 'Predict', 'Model makes a prediction'],
              ['2', 'Compare', 'Compare prediction with the target'],
              ['3', 'Measure Loss', 'Turn the mistake into a number'],
              ['4', 'Improve', 'Training tries to reduce the objective'],
            ].map(([step, title, text], index) => (
              <div key={title} className="relative bg-white border border-indigo-100 rounded-lg p-4">
                <p className="text-xs font-bold text-indigo-600 mb-1">STEP {step}</p>
                <p className="font-bold text-slate-900 mb-1">{title}</p>
                <p className="text-sm text-slate-600">{text}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-indigo-400 bg-indigo-50 rounded-full" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Real-Life Analogy — Archery</p>
          <p className="text-slate-800 italic leading-relaxed">
            Imagine learning archery. After each shot you need feedback about how far the arrow landed from the target.
            A loss function plays a similar role: it converts prediction quality into a number that an optimization
            procedure can use when adjusting a trainable model.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">Important terminology</p>
          <p className="text-amber-900 leading-relaxed">
            Books and libraries do not use the words <strong>loss</strong>, <strong>cost</strong>, and <strong>objective</strong>
            in exactly the same way. A useful convention is: a <strong>loss</strong> measures one example, a
            <strong> cost</strong> aggregates losses over data, and an <strong>objective</strong> may additionally contain
            regularization. Treat this as a helpful vocabulary guide, not a universal naming law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="font-bold text-slate-900 mb-2">Loss</p>
            <p className="text-sm text-slate-700 mb-3">Often refers to the penalty for one training example.</p>
            <p className="font-mono text-sm bg-slate-50 p-3 rounded">Actual 70, Predicted 66 → squared loss = 4² = 16</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="font-bold text-slate-900 mb-2">Cost</p>
            <p className="text-sm text-slate-700 mb-3">Often means an average or sum of losses over many examples.</p>
            <p className="font-mono text-sm bg-slate-50 p-3 rounded">Cost = average(loss₁, loss₂, ...)</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="font-bold text-slate-900 mb-2">Objective</p>
            <p className="text-sm text-slate-700 mb-3">What training actually optimizes; it may include a penalty.</p>
            <p className="font-mono text-sm bg-slate-50 p-3 rounded">Objective = data loss + regularization</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Not every Machine Learning algorithm trains by differentiating a cost function. Gradient-based models do,
          while Decision Trees choose splits using criteria such as impurity reduction, and KNN mainly stores examples
          instead of learning parameters through Gradient Descent. The broad idea is still the same: the algorithm needs
          a rule for deciding what counts as a better model or decision.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="error-measurement">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <TrendingDown className="mr-3 text-indigo-600" /> From Prediction Error to a Useful Loss
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          For a regression prediction, a signed residual can be written as:
        </p>

        <div className="pl-4 border-l-4 border-slate-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200 w-fit">
          <p className="font-mono text-lg font-bold text-slate-900 mb-2">Residual = y - ŷ</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-slate-700">
            <li><strong>y</strong> = actual target</li>
            <li><strong>ŷ</strong> = predicted target</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Why Simply Adding Signed Errors Is Usually Not Enough</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Positive and negative residuals can cancel each other even when every prediction is wrong.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-6 overflow-x-auto max-w-3xl">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Actual</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Predicted</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Residual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-sm">
              <tr><td className="px-4 py-3">50</td><td className="px-4 py-3">55</td><td className="px-4 py-3">-5</td></tr>
              <tr><td className="px-4 py-3">60</td><td className="px-4 py-3">55</td><td className="px-4 py-3">+5</td></tr>
              <tr className="font-bold"><td colSpan={2} className="px-4 py-3 text-right">Sum</td><td className="px-4 py-3">0</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A sum of zero clearly does not mean the predictions are perfect. Regression losses therefore commonly use
          operations such as <strong>squaring</strong> or <strong>absolute value</strong>. Classification losses use other
          constructions, such as logarithmic penalties for probabilities.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="regression">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Regression Loss Functions
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Regression predicts continuous values such as house price, temperature, demand, or delivery time. Different
          losses place different importance on small and large errors.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">1. Mean Squared Error (MSE)</h3>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5 w-fit max-w-full">
          <p className="font-mono text-lg font-bold text-emerald-950">MSE = (1/n) Σ (yᵢ - ŷᵢ)²</p>
        </div>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          MSE squares each error and then averages. Squaring makes larger errors contribute disproportionately more to
          the total loss.
        </p>

        <div className="pl-4 border-l-4 border-emerald-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200">
          <p className="font-bold text-emerald-900 mb-3">MSE Worked Example — House Prices (₹000s)</p>
          <p className="font-mono text-sm text-slate-700 mb-4">Actual: [100, 150, 200, 250] | Predicted: [90, 140, 220, 230]</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-slate-700">
            <li>Residuals: <code>10, 10, -20, 20</code></li>
            <li>Square them: <code>100, 100, 400, 400</code></li>
            <li>Add: <code>100 + 100 + 400 + 400 = 1000</code></li>
            <li>Average: <code>1000 / 4 = 250</code></li>
          </ol>
          <p className="text-slate-900 font-bold mt-4">MSE = 250</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">What to remember</p>
          <p className="text-amber-900">
            Because errors are squared, an unusually large error can have a strong influence on MSE. That can be useful
            when large misses are especially costly, but it also makes MSE more sensitive to outliers than MAE.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">2. Mean Absolute Error (MAE)</h3>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mb-5 w-fit max-w-full">
          <p className="font-mono text-lg font-bold text-sky-950">MAE = (1/n) Σ |yᵢ - ŷᵢ|</p>
        </div>

        <div className="pl-4 border-l-4 border-sky-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200">
          <p className="font-bold text-sky-900 mb-3">MAE Worked Example — Same Predictions</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-slate-700">
            <li>Residuals: <code>10, 10, -20, 20</code></li>
            <li>Absolute errors: <code>10, 10, 20, 20</code></li>
            <li>Add: <code>10 + 10 + 20 + 20 = 60</code></li>
            <li>Average: <code>60 / 4 = 15</code></li>
          </ol>
          <p className="text-slate-900 font-bold mt-4">MAE = 15</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">3. Root Mean Squared Error (RMSE)</h3>
        <p className="text-lg leading-relaxed mb-3 text-slate-800">
          RMSE is simply the square root of MSE. This returns the error measure to the original target units.
        </p>
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 max-w-xl shadow-sm">
          <p className="font-mono text-sm mb-2">MSE = 250</p>
          <p className="font-mono text-sm mb-2">RMSE = √250</p>
          <p className="font-mono text-sm font-bold">RMSE ≈ 15.81</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">4. Huber Loss</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Huber-style loss behaves quadratically for smaller errors and more linearly for sufficiently large errors.
          This can reduce the influence of outliers compared with pure squared loss while keeping a smooth region near
          zero. The transition point is controlled by a threshold parameter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-emerald-800">MSE</p>
            <p className="text-sm text-slate-700 mt-2">Large errors receive rapidly increasing weight because they are squared.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-sky-800">MAE</p>
            <p className="text-sm text-slate-700 mt-2">Penalty grows linearly with absolute error.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-violet-800">Huber</p>
            <p className="text-sm text-slate-700 mt-2">Quadratic near zero, more linear for larger errors.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="classification">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Classification Loss Functions
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Classification often works with class probabilities or decision scores. For probabilistic classifiers,
          Cross-Entropy / Log Loss is a natural choice because it rewards assigning high probability to the true class
          and strongly penalizes confident probability mistakes.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">A useful nuance</p>
          <p className="text-amber-900">
            MSE is not universally “forbidden” for classification. It can be optimized in some model formulations, but
            Cross-Entropy is generally a better-matched objective for probability-based classification and is standard
            for Logistic Regression-style models.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Binary Cross-Entropy (Log Loss)</h3>
        <div className="pl-4 border-l-4 border-rose-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200 w-fit max-w-full">
          <p className="font-mono text-base md:text-lg font-bold text-slate-900">
            Loss = -[ y log(p) + (1-y) log(1-p) ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-emerald-900 mb-3">Correct and confident</p>
            <p className="font-mono text-sm mb-2">Actual y = 1</p>
            <p className="font-mono text-sm mb-2">Predicted p = 0.95</p>
            <p className="font-mono text-sm mb-2">Loss = -log(0.95)</p>
            <p className="font-mono text-sm font-bold">≈ 0.051</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <p className="font-bold text-rose-900 mb-3">Confident and wrong</p>
            <p className="font-mono text-sm mb-2">Actual y = 1</p>
            <p className="font-mono text-sm mb-2">Predicted p = 0.02</p>
            <p className="font-mono text-sm mb-2">Loss = -log(0.02)</p>
            <p className="font-mono text-sm font-bold">≈ 3.912</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Notice the important idea: both examples have the same true class, but the model receives a much larger loss
          when it assigns only 2% probability to that true class.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Multiclass Cross-Entropy</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          With several classes, the model assigns a probability to each class and the loss focuses on the probability
          assigned to the true class.
        </p>
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 max-w-2xl shadow-sm">
          <p className="text-slate-800 mb-3">Suppose the true class is <strong>Cat</strong> and the model predicts:</p>
          <p className="font-mono text-sm mb-3">Cat = 0.70, Dog = 0.20, Horse = 0.10</p>
          <p className="font-mono text-sm mb-2">Loss = -log(0.70)</p>
          <p className="font-mono text-sm font-bold">≈ 0.357</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="other-models">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <GitMerge className="mr-3 text-indigo-600" /> Hinge Loss, Tree Criteria, and Reward
        </h2>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Hinge Loss — Margin-Based Classification</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Hinge loss is closely associated with linear Support Vector Machine objectives. It penalizes a point not only
          when it is misclassified, but also when it lies on the correct side with insufficient margin.
        </p>

        <div className="pl-4 border-l-4 border-violet-300 bg-white py-4 pr-4 rounded-r-md mb-6 shadow-sm border border-slate-200 w-fit max-w-full">
          <p className="font-mono text-lg font-bold text-slate-900 mb-2">Loss = max(0, 1 - y · f(x))</p>
          <p className="text-sm text-slate-700">For this binary form, y is +1 or -1 and f(x) is the decision score.</p>
        </div>

        <div className="pl-4 border-l-4 border-violet-400 bg-violet-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-violet-900 mb-3">Worked Example</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-violet-900">
            <li><strong>y = 1, f(x) = 1.5:</strong> <code>max(0, 1 - 1.5) = 0</code></li>
            <li>The point is correctly classified and beyond the unit-margin threshold.</li>
            <li><strong>y = 1, f(x) = 0.2:</strong> <code>max(0, 1 - 0.2) = 0.8</code></li>
            <li>The sign is correct, but the margin is too small.</li>
          </ol>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Gini Impurity / Entropy — Decision Tree Split Criteria</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Decision Trees are different from gradient-based models. They evaluate candidate splits using criteria such as
          Gini impurity or entropy. It is clearer to call these <strong>split criteria / impurity measures</strong> rather
          than pretending they are the same kind of training loss used by Logistic Regression.
        </p>

        <div className="pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-teal-900 mb-2">Worked Example — Gini Impurity</p>
          <p className="font-mono text-sm mb-3">Gini = 1 - Σ pᵢ²</p>
          <p className="text-teal-900 mb-2">A node contains 4 Apples and 6 Oranges.</p>
          <ol className="list-decimal pl-5 font-mono text-sm space-y-2 text-teal-900">
            <li><code>p(Apple) = 4/10 = 0.4</code></li>
            <li><code>p(Orange) = 6/10 = 0.6</code></li>
            <li><code>Gini = 1 - (0.4² + 0.6²)</code></li>
            <li><code>= 1 - (0.16 + 0.36) = 0.48</code></li>
          </ol>
          <p className="text-teal-900 mt-3 text-sm">
            A tree compares candidate splits by how much they reduce impurity after accounting for the child-node sizes.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Reward Function — Reinforcement Learning</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Reinforcement Learning is another important distinction. The environment gives a <strong>reward signal</strong>,
          and the agent typically aims to maximize expected cumulative reward. Some mathematical formulations minimize a
          negative objective, but a reward function should not automatically be called a supervised-learning cost function.
        </p>

        <div className="pl-4 border-l-4 border-orange-400 bg-orange-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-orange-900 mb-2">Simple Game Example</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-orange-900">
            <li>Collect useful item → Reward +10</li>
            <li>Waste a move → Reward -2</li>
            <li>Lose the game → Reward -100</li>
          </ul>
          <p className="text-orange-900 mt-3 text-sm">
            The learning objective concerns the expected return over time, not merely minimizing the immediate negative reward of one action.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="objective-vs-metric">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Scale className="mr-3 text-indigo-600" /> Training Objective vs Evaluation Metric
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          The quantity optimized during training does not have to be the same quantity reported to stakeholders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="font-bold text-indigo-900 mb-3">Training objective</p>
            <p className="text-sm text-slate-700 mb-3">Used internally to fit model parameters.</p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Log loss for Logistic Regression</li>
              <li>Squared error for many regression models</li>
              <li>Loss + regularization for Ridge/Lasso-style objectives</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="font-bold text-indigo-900 mb-3">Evaluation metric</p>
            <p className="text-sm text-slate-700 mb-3">Used to judge whether a trained model is useful.</p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Accuracy, precision, recall, F1</li>
              <li>MAE, RMSE, R²</li>
              <li>Business-specific cost or service-level metrics</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-indigo-900 mb-2">Example</p>
          <p className="text-indigo-900">
            A fraud classifier might be trained using log loss but evaluated using recall, precision, PR-AUC, and the
            financial cost of missed fraud. Optimizing one differentiable training objective does not mean it is the only
            metric that matters.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="optimizing">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <BrainCircuit className="mr-3 text-indigo-600" /> How Loss Connects to Optimization
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          When the objective is differentiable, an optimizer such as Gradient Descent can use derivatives to decide how
          parameters should change. In neural networks, gradients are computed efficiently through backpropagation.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center items-stretch">
            {['Weights', 'Prediction', 'Loss', 'Gradient', 'Updated Weights'].map((item, index) => (
              <div key={item} className="relative bg-white border border-slate-200 rounded-lg p-3 font-semibold text-slate-800">
                {item}
                {index < 4 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-400 bg-slate-50 rounded-full" size={18} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">Gradient Descent Analogy</p>
          <p className="text-amber-900 leading-relaxed">
            Imagine standing on a hill and repeatedly stepping in a direction that reduces altitude. The terrain is the
            objective surface, and the gradient describes the local slope. This analogy is useful for gradient-based
            models, but not every ML algorithm trains by walking down such a surface.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Example
        </h2>
        <p className="text-lg leading-relaxed text-slate-800 mb-4">
          Scikit-learn's metric functions let us calculate several common losses directly.
        </p>

        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl text-sm font-mono my-6 overflow-x-auto shadow-lg border border-slate-800">
          <pre className="!m-0">
<code className="language-python">{`from sklearn.metrics import (
    mean_squared_error,
    mean_absolute_error,
    log_loss,
)

actual_reg = [100, 150, 200, 250]
predicted_reg = [90, 140, 220, 230]

mse = mean_squared_error(actual_reg, predicted_reg)
mae = mean_absolute_error(actual_reg, predicted_reg)
rmse = mse ** 0.5

print(f"MSE: {mse:.1f}")
print(f"MAE: {mae:.1f}")
print(f"RMSE: {rmse:.2f}")

actual_clf = [1, 0, 1]
predicted_prob = [0.95, 0.10, 0.02]

loss = log_loss(actual_clf, predicted_prob)
print(f"Log Loss: {loss:.4f}")`}</code>
          </pre>
        </div>

        <div className="bg-slate-950 text-slate-100 p-5 rounded-xl font-mono text-sm mb-8 overflow-x-auto">
          <p className="text-slate-400 mb-2">Expected output</p>
          <pre className="!m-0">{`MSE: 250.0
MAE: 15.0
RMSE: 15.81
Log Loss: 1.3562`}</pre>
        </div>

        <p className="text-slate-700 mb-8">
          The combined log loss is relatively large because the third example assigns only <code>0.02</code> probability
          to a class that is actually positive.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Table2 className="mr-3 text-indigo-600" /> Quick Comparison
        </h2>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Measure</th>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Typical use</th>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Main idea</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
              <tr><td className="px-5 py-4 font-bold">MSE</td><td className="px-5 py-4">Regression</td><td className="px-5 py-4">Squares errors; large errors receive more weight</td></tr>
              <tr><td className="px-5 py-4 font-bold">MAE</td><td className="px-5 py-4">Regression</td><td className="px-5 py-4">Uses absolute error; linear penalty</td></tr>
              <tr><td className="px-5 py-4 font-bold">Huber</td><td className="px-5 py-4">Robust regression</td><td className="px-5 py-4">Quadratic for smaller errors, more linear for larger errors</td></tr>
              <tr><td className="px-5 py-4 font-bold">Cross-Entropy</td><td className="px-5 py-4">Probabilistic classification</td><td className="px-5 py-4">Penalizes low probability assigned to the true class</td></tr>
              <tr><td className="px-5 py-4 font-bold">Hinge</td><td className="px-5 py-4">Margin-based classification</td><td className="px-5 py-4">Penalizes margin violations</td></tr>
              <tr><td className="px-5 py-4 font-bold">Gini / Entropy</td><td className="px-5 py-4">Decision Trees</td><td className="px-5 py-4">Evaluate candidate split quality</td></tr>
              <tr><td className="px-5 py-4 font-bold">Reward</td><td className="px-5 py-4">Reinforcement Learning</td><td className="px-5 py-4">Defines desirable outcomes over sequential interaction</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="common-mistakes" className="mt-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-amber-600" /> Common Mistakes
        </h2>
        <div className="space-y-3 mb-8">
          {[
            'Calling every evaluation metric a training cost function.',
            'Assuming lower training loss always means better performance on unseen data.',
            'Choosing MSE or MAE only because one number looks smaller—their numerical scales are different.',
            'Treating Decision Tree impurity and Reinforcement Learning reward as if they were identical to supervised differentiable losses.',
            'Optimizing a convenient ML loss while ignoring the real business cost of different mistakes.',
          ].map((mistake) => (
            <div key={mistake} className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-lg p-4">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <p className="text-amber-950">{mistake}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="quick-recap" className="mt-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Recap</h2>
        <div className="space-y-4 mb-8">
          <details className="bg-white border border-slate-200 rounded-xl p-5">
            <summary className="font-bold text-slate-900 cursor-pointer">Why not simply add signed regression errors?</summary>
            <p className="mt-3 text-slate-700">Positive and negative residuals can cancel even when the individual predictions are wrong.</p>
          </details>
          <details className="bg-white border border-slate-200 rounded-xl p-5">
            <summary className="font-bold text-slate-900 cursor-pointer">Why does MSE react strongly to large errors?</summary>
            <p className="mt-3 text-slate-700">Because each error is squared before averaging.</p>
          </details>
          <details className="bg-white border border-slate-200 rounded-xl p-5">
            <summary className="font-bold text-slate-900 cursor-pointer">Is the training loss always the final evaluation metric?</summary>
            <p className="mt-3 text-slate-700">No. A model may optimize one objective and be judged using different validation, test, or business metrics.</p>
          </details>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
        <p className="font-bold text-slate-900 text-xl mb-3">Most Important Insight</p>
        <p className="text-slate-800 text-lg leading-relaxed">
          A loss function defines what kind of mistake the learning procedure should care about. Choosing it is therefore
          not just a mathematical detail: it determines the behavior the model is encouraged to learn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <a href="/learn/gradient-descent" className="border border-indigo-200 rounded-xl p-5 hover:bg-indigo-50 transition-colors">
          <p className="font-bold text-indigo-800 mb-1">Gradient Descent →</p>
          <p className="text-sm text-slate-600">See how differentiable objectives guide parameter updates.</p>
        </a>
        <a href="/learn/logistic-regression" className="border border-indigo-200 rounded-xl p-5 hover:bg-indigo-50 transition-colors">
          <p className="font-bold text-indigo-800 mb-1">Logistic Regression →</p>
          <p className="text-sm text-slate-600">Connect probabilities with log loss.</p>
        </a>
        <a href="/learn/hyperparameter-tuning" className="border border-indigo-200 rounded-xl p-5 hover:bg-indigo-50 transition-colors">
          <p className="font-bold text-indigo-800 mb-1">Hyperparameter Tuning →</p>
          <p className="text-sm text-slate-600">Next: choose model settings using validation evidence.</p>
        </a>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
        <CheckCircle size={17} className="text-emerald-600" />
        <span>Remember: lower loss is meaningful only in the context of the chosen objective, data split, and problem.</span>
      </div>
    </>
  );
}
