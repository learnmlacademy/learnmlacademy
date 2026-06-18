import React from 'react';
import { Target, Layers, PlayCircle, Eye, AlertTriangle, Code, Columns, Share2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';

export function CrossValidationContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Cross Validation</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Cross Validation evaluates how well a model performs on unseen data. It helps determine whether a model has truly learned meaningful patterns or is simply memorizing the training dataset.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Main Objective:</p>
          <p className="text-slate-800 italic leading-relaxed">
            Estimate how well a Machine Learning model will generalize to new unseen data.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Cross Validation is primarily used to evaluate model performance, detect overfitting, compare multiple models, tune hyperparameters, and improve model reliability. Without proper validation techniques, Machine Learning models may produce misleadingly high accuracy during training but fail badly in real-world situations.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Why Cross Validation Is Necessary</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a student memorizes answers to practice questions instead of understanding concepts. During practice, the student performs extremely well. But in the actual exam with unseen questions, performance becomes poor.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          This is similar to what happens in Machine Learning. A model may memorize training data rather than learning actual relationships. This problem is called <span className="font-bold text-rose-600">Overfitting</span>. Cross Validation helps identify whether the model truly generalizes to unseen data.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="the-problem">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> The Problem with Simple Train/Test Split
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In Train/Test Split, one portion is used for training and one portion is used for testing (e.g., 80% Training, 20% Testing). 
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The problem is: <strong>Performance depends heavily on the chosen split.</strong> Different random splits may produce different accuracy values.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-8 w-fit">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Split</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-mono text-sm">
              <tr><td className="px-6 py-4 font-bold">Split 1</td><td className="px-6 py-4 text-emerald-600">92%</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold">Split 2</td><td className="px-6 py-4 text-rose-600">84%</td></tr>
              <tr><td className="px-6 py-4 font-bold">Split 3</td><td className="px-6 py-4 text-blue-600">88%</td></tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          This inconsistency creates unreliable evaluation. Cross Validation solves this problem by evaluating the model multiple times on different subsets of data.
        </p>
        
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Core Idea Behind Cross Validation</p>
          <p className="text-slate-800 leading-relaxed">
            Instead of using only one train/test split, the dataset is repeatedly divided into multiple training and testing sets. The model is trained and evaluated multiple times. Final performance is computed using the average of all evaluation scores, producing a much more reliable estimate.
          </p>
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Real-Life Analogy</h3>
        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          Imagine a teacher evaluating students. Instead of conducting only one exam, the teacher conducts multiple tests, assignments, and quizzes, then calculates the average performance. This gives a more reliable evaluation. Cross Validation works similarly.
        </p>

        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto w-fit mb-10 text-sm">
{`CROSS VALIDATION GOALS
│
├── Estimate model performance
├── Reduce overfitting
├── Improve generalization
├── Tune hyperparameters
├── Compare algorithms
└── Detect model instability`}
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="types">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Types of Cross Validation
        </h2>

        <div className="space-y-12">
          
          {/* Hold-Out Validation */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Hold-Out Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Hold-Out Validation is the simplest validation technique. The dataset is divided into a Training set and a Testing set (e.g., 80% Training, 20% Testing).
            </p>
            <div className="pl-4 border-l-4 border-slate-300 bg-white py-4 pr-4 rounded-r-md mb-4 shadow-sm border border-slate-200">
              <p className="font-bold text-slate-900 mb-2">Worked-Out Example</p>
              <p className="text-slate-800 mb-2">Imagine a dataset of 10,000 photos of cats and dogs.</p>
              <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-slate-700">
                <li>You randomly choose <strong>8,000 photos</strong> (80%) to teach (train) the model what a cat or dog looks like.</li>
                <li>You hide the remaining <strong>2,000 photos</strong> (20%).</li>
                <li>After training, you evaluate the model by showing it the 2,000 hidden photos to see how many it guesses correctly.</li>
              </ul>
              <p className="text-sm text-slate-500 italic mt-3">This creates 1 model evaluation. If you happened to accidentally put all the "easy" photos in the 20% test set, your score will be falsely high.</p>
            </div>
            <div className="font-mono text-sm text-slate-800 bg-slate-50 p-4 rounded-lg border mb-4">
{`FULL DATASET
│
├── TRAINING DATA (80%)
└── TEST DATA (20%)`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <p className="font-bold text-emerald-900 mb-2">Advantages</p>
                <ul className="list-disc pl-5 text-emerald-800 text-sm space-y-1">
                  <li>Simple implementation and fast computation</li>
                  <li>Good for large datasets</li>
                </ul>
              </div>
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-100">
                <p className="font-bold text-rose-900 mb-2">Disadvantages</p>
                <ul className="list-disc pl-5 text-rose-800 text-sm space-y-1">
                  <li>Highly dependent on random split</li>
                  <li>Unstable performance estimates & poor reliability on small datasets</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-800 text-slate-200 text-sm font-mono p-4 rounded-lg overflow-x-auto">
{`from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)`}
            </div>
          </div>

          {/* K-Fold */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">2. K-Fold Cross Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              K-Fold Cross Validation is the most widely used Cross Validation technique. The dataset is divided into <em>K</em> equal-sized folds. The model is trained <em>K</em> times. Each time, one fold becomes validation data, and the remaining folds become training data.
            </p>
            
            <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-6">
              <p className="font-bold text-blue-900 text-lg mb-2">Detailed Working of K-Fold (K=5)</p>
              <p className="text-slate-800 leading-relaxed mb-2">Suppose dataset contains 100 samples. If K=5, each fold contains 20 samples. Each iteration: Training = 80 samples, Validation = 20 samples.</p>
              <ul className="list-none text-slate-800 font-mono text-sm space-y-2 mt-4 border-t border-blue-200 pt-3">
                <li>Iteration 1: Test → Fold 1 | Train → Fold 2,3,4,5</li>
                <li>Iteration 2: Test → Fold 2 | Train → Fold 1,3,4,5</li>
                <li>Iteration 3: Test → Fold 3 | Train → Fold 1,2,4,5</li>
                <li>...</li>
              </ul>
            </div>
            
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Suppose fold accuracies are: 91%, 89%, 92%, 88%, and 90%. Average accuracy = <strong>90%</strong>. This average becomes the final model accuracy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <p className="font-bold text-emerald-900 mb-2">Advantages</p>
                <ul className="list-disc pl-5 text-emerald-800 text-sm space-y-1">
                  <li>More reliable evaluation and reduces variance</li>
                  <li>Better dataset utilization and suitable for small datasets</li>
                </ul>
              </div>
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-100">
                <p className="font-bold text-rose-900 mb-2">Disadvantages</p>
                <ul className="list-disc pl-5 text-rose-800 text-sm space-y-1">
                  <li>Computationally expensive</li>
                  <li>Slower than Hold-Out validation</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-lg overflow-x-auto text-sm font-mono mt-4">
<pre><code>{`from sklearn.model_selection import KFold, cross_val_score
from sklearn.linear_model import LogisticRegression

# Initialization
kf = KFold(n_splits=5, shuffle=True, random_state=42)
model = LogisticRegression()

# Complete Example
scores = cross_val_score(model, X, y, cv=5)
print(scores)        # e.g. [0.91 0.89 0.92 0.88 0.90]
print(scores.mean()) # Average Accuracy = 0.90`}</code></pre>
            </div>
          </div>

          {/* Stratified K-Fold */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Stratified K-Fold Cross Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              In classification problems, datasets may be imbalanced (e.g., 90 Spam, 10 Not Spam). Normal K-Fold may create folds with uneven class distribution, causing biased evaluation. <strong>Stratified K-Fold</strong> solves this by ensuring each fold preserves the original class distribution.
            </p>
            <div className="pl-4 border-l-4 border-sky-300 bg-white py-4 pr-4 rounded-r-md mb-4 shadow-sm border border-slate-200">
              <p className="font-bold text-sky-900 mb-2">Worked-Out Example</p>
              <p className="text-slate-800 mb-2">Suppose you are predicting rare credit card fraud. Out of 10,000 transactions, only 100 are fraud (1%) and 9,900 are legitimate (99%). You use K=5 (5-Fold CV).</p>
              <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-slate-700">
                <li><strong>With Normal K-Fold:</strong> By random chance, Fold 1 might get 0 fraudulent rows. If Fold 1 is the test set, you have no way to evaluate fraud detection!</li>
                <li><strong>With Stratified K-Fold:</strong> The algorithm forces each of the 5 folds to contain exactly 1% fraud.</li>
                <li>Every fold will contain exactly 2,000 transactions (20 fraud, 1,980 legitimate).</li>
              </ul>
              <p className="text-sm text-slate-500 italic mt-3">This exact mirroring of the population guarantees stable and fair evaluation across all iterations.</p>
            </div>
            <div className="bg-sky-50 rounded-lg p-4 border border-sky-100 text-sky-900 font-mono text-sm mb-4">
{`ORIGINAL DATASET: 90% Class A, 10% Class B
Each Fold:        90% Class A, 10% Class B`}
            </div>
            <div className="bg-slate-800 text-slate-200 text-sm font-mono p-4 rounded-lg overflow-x-auto">
{`from sklearn.model_selection import StratifiedKFold
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)`}
            </div>
          </div>
          
          {/* LOOCV */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">4. Leave-One-Out Cross Validation (LOOCV)</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              LOOCV is an extreme version of K-Fold Cross Validation where K = N (Total number of samples). If the dataset has 100 samples, 99 are used for training, and 1 for testing. This repeats 100 times.
            </p>
            <div className="pl-4 border-l-4 border-rose-300 bg-white py-4 pr-4 rounded-r-md mb-4 shadow-sm border border-slate-200">
              <p className="font-bold text-rose-900 mb-2">Worked-Out Example</p>
              <p className="text-slate-800 mb-2">Imagine a medical study with only 10 rare-disease patients <code>[P1, P2, P3... P10]</code>.</p>
              <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-slate-700">
                <li><strong>Iteration 1:</strong> Train the model on patients <code>P2 through P10</code> (9 patients). Test if it correctly diagnoses <code>P1</code> (1 patient test set).</li>
                <li><strong>Iteration 2:</strong> Train on <code>P1, P3, P4... P10</code>. Test against <code>P2</code>.</li>
                <li>...</li>
                <li><strong>Iteration 10:</strong> Train on <code>P1 through P9</code>. Test against <code>P10</code>.</li>
              </ul>
              <p className="mt-3 text-slate-800 text-sm italic">You perform exactly 10 iterations. Because you only leave one sample out each time, the model is trained on the absolute maximum amount of data possible (90% of the dataset) in every iteration, making it highly data-efficient but computationally heavy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 space-y-1">
                <p className="font-bold text-emerald-900">Advantages:</p> Maximum data utilization, very low bias, good for very small datasets.
              </div>
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-100 space-y-1">
                <p className="font-bold text-rose-900">Disadvantages:</p> Extremely slow, computationally expensive, high variance.
              </div>
            </div>
          </div>

          {/* Other Techniques */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Advanced Techniques</h3>
            <div className="space-y-12">
              <div className="bg-slate-50 p-6 border rounded-xl shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-4">5. Leave-P-Out Cross Validation</h4>
                <p className="text-lg leading-relaxed text-slate-800 mb-4">
                  Leave-P-Out generalizes LOOCV by leaving <em>P</em> samples out for testing instead of just one. It creates training sets by selecting all possible combinations of N-P samples. 
                </p>
                <div className="pl-4 border-l-4 border-slate-300 bg-white py-4 pr-4 rounded-r-md mb-4">
                  <p className="font-bold text-slate-900 mb-2">Worked-Out Example (P=2)</p>
                  <p className="text-slate-800 mb-2">Suppose you have a dataset of 5 samples: <code>[A, B, C, D, E]</code>.</p>
                  <p className="text-slate-800 mb-2">With P=2, you must test on every possible pair (which is 5 choose 2 = 10 iterations):</p>
                  <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-slate-700">
                    <li>Iteration 1: Test = <code>[A, B]</code> | Train = <code>[C, D, E]</code></li>
                    <li>Iteration 2: Test = <code>[A, C]</code> | Train = <code>[B, D, E]</code></li>
                    <li>...</li>
                    <li>Iteration 10: Test = <code>[D, E]</code> | Train = <code>[A, B, C]</code></li>
                  </ul>
                  <p className="text-sm text-slate-500 italic mt-3">Notice how quickly the combinations grow. If N=100 and P=2, you perform 4,950 evaluations. This combinatorial explosion makes it unfeasible for most real-world datasets.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 border rounded-xl shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-4">6. Repeated K-Fold</h4>
                <p className="text-lg leading-relaxed text-slate-800 mb-4">
                  Repeated K-Fold performs the K-Fold process multiple times, using different random splits each time, which yields more stable performance estimates by reducing the randomness associated with a single K-fold partition.
                </p>
                <div className="pl-4 border-l-4 border-indigo-300 bg-white py-4 pr-4 rounded-r-md mb-4">
                  <p className="font-bold text-indigo-900 mb-2">Worked-Out Example</p>
                  <p className="text-slate-800 mb-2">Let's perform a <strong>5-Fold CV</strong> repeated <strong>10 times</strong>.</p>
                  <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-slate-700">
                    <li><strong>Run 1:</strong> Randomly shuffle data. Split into 5 folds. Produce 5 evaluations.</li>
                    <li><strong>Run 2:</strong> Randomly shuffle data differently. Split into 5 new folds. Produce 5 evaluations.</li>
                    <li>...</li>
                    <li><strong>Run 10:</strong> Final shuffle. 5 new evaluations.</li>
                  </ul>
                  <p className="mt-3 text-slate-800 font-bold">Total Evaluations: 5 × 10 = 50.</p>
                  <p className="text-sm text-slate-500 mt-1">The final accuracy is the average of all 50 evaluation metrics.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 border rounded-xl shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-4">7. Monte Carlo Cross Validation (Repeated Random Subsampling)</h4>
                <p className="text-lg leading-relaxed text-slate-800 mb-4">
                  Unlike K-Fold which splits data into fixed mutual exclusive sets, Monte Carlo CV randomly splits the dataset into training and testing sets multiple times. Folds are not fixed, which means some samples may be left out entirely while others appear multiple times.
                </p>
                <div className="pl-4 border-l-4 border-emerald-300 bg-white py-4 pr-4 rounded-r-md mb-4">
                  <p className="font-bold text-emerald-900 mb-2">Worked-Out Example</p>
                  <p className="text-slate-800 mb-2">Dataset: 100 samples. Split: 80 Train / 20 Test. Iterations: 100.</p>
                  <p className="text-slate-800 text-sm font-mono mb-2">
                    Iteration 1: Random selection of 80% and 20%. Evaluate.<br/>
                    Iteration 2: Fresh random selection of 80% and 20%. Evaluate.<br/>
                    ...<br/>
                    Iteration 100: Fresh random selection. Evaluate.
                  </p>
                  <p className="text-slate-800 text-sm">Because folds are drawn randomly with replacement <em>between</em> runs, it handles edge-case statistical variances well, but lacks the guarantee that every data point is tested exactly once like K-Fold does.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 border rounded-xl shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-4">8. Time Series Cross Validation</h4>
                <p className="text-lg leading-relaxed text-slate-800 mb-4">
                  Future data should never predict past data. Standard cross-validation randomly shuffles data, which breaks chronological order. Time Series CV ensures the training set only consists of observations that occurred prior to the test set.
                </p>
                <div className="pl-4 border-l-4 border-amber-300 bg-white py-4 pr-4 rounded-r-md mb-4">
                  <p className="font-bold text-amber-900 mb-2">Worked-Out Example</p>
                  <p className="text-slate-800 mb-2">Task: Predicting stock price for a year. Data: Jan, Feb, Mar, Apr, May.</p>
                  <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-slate-700">
                    <li>Iteration 1: Train on <code>Jan</code> → Test on <code>Feb</code></li>
                    <li>Iteration 2: Train on <code>Jan, Feb</code> → Test on <code>Mar</code></li>
                    <li>Iteration 3: Train on <code>Jan, Feb, Mar</code> → Test on <code>Apr</code></li>
                    <li>Iteration 4: Train on <code>Jan, Feb, Mar, Apr</code> → Test on <code>May</code></li>
                  </ul>
                  <p className="mt-3 text-slate-800 text-sm italic">This "expanding window" technique prevents future data leakage and faithfully replicates the reality of predicting the future using only what was known in the past.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 border rounded-xl shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 mb-4">9. Nested Cross Validation</h4>
                <p className="text-lg leading-relaxed text-slate-800 mb-4">
                  Nested Cross Validation is critical when you need to perform hyperparameter tuning AND evaluate the final model's generalized performance, without allowing the hyperparameters to accidentally "overfit" the test fold.
                </p>
                <div className="pl-4 border-l-4 border-purple-300 bg-white py-4 pr-4 rounded-r-md mb-4">
                  <p className="font-bold text-purple-900 mb-2">Worked-Out Example</p>
                  <p className="text-slate-800 mb-2">Let's use a 5-Fold Outer (Evaluation) and a 3-Fold Inner (Tuning) split on 100 samples.</p>
                  <ol className="list-decimal pl-5 text-sm space-y-2 text-slate-700 mb-3">
                    <li><strong>Outer Loop 1:</strong> 80 samples for "Outer Train", 20 samples for "Outer Test".</li>
                    <li><strong>Inner Tuning:</strong> Take the 80 "Outer Train" samples. Split them into 3 inner folds. Test different settings (e.g. Learning Rate = 0.01 vs 0.1). Choose the best learning rate based on these 3 inner folds.</li>
                    <li><strong>Outer Evaluation:</strong> Train a model with that best learning rate on the full 80 samples. Evaluate it against the unseen 20 "Outer Test" samples.</li>
                    <li>Repeat the entire process for Outer Loop 2, 3, 4, 5.</li>
                  </ol>
                  <p className="text-slate-800 font-bold text-sm border-t pt-2 border-slate-200">Total Evaluations: 5 outer loops * 3 inner loops = 15 training runs per hyperparameter setting evaluated.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Columns className="mr-3 text-indigo-600" /> Choosing the Right Cross Validation Method
        </h2>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Method</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Best Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr><td className="px-6 py-4 font-bold text-slate-800">Hold-Out</td><td className="px-6 py-4 text-slate-700">Very large datasets</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">K-Fold</td><td className="px-6 py-4 text-slate-700">General ML problems</td></tr>
              <tr><td className="px-6 py-4 font-bold text-slate-800">Stratified K-Fold</td><td className="px-6 py-4 text-slate-700">Imbalanced classification</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">LOOCV</td><td className="px-6 py-4 text-slate-700">Very small datasets</td></tr>
              <tr><td className="px-6 py-4 font-bold text-slate-800">Time Series CV</td><td className="px-6 py-4 text-slate-700">Sequential data (Stocks, Weather)</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">Nested CV</td><td className="px-6 py-4 text-slate-700">Robust hyperparameter tuning</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Cross Validation vs Train/Test Split</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm text-lg">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left font-bold text-indigo-700">Train/Test Split</th>
                <th className="px-6 py-3 text-left font-bold text-emerald-700">Cross Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Number of evaluations</td>
                <td className="px-6 py-4 text-indigo-700 font-bold">One</td>
                <td className="px-6 py-4 text-emerald-700">Multiple</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-medium">Reliability & Variance</td>
                <td className="px-6 py-4 text-indigo-700">Lower Reliability, High Variance</td>
                <td className="px-6 py-4 text-emerald-700 font-bold">Higher Reliability, Low Variance</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Computation cost</td>
                <td className="px-6 py-4 text-indigo-700 font-bold">Low (Faster)</td>
                <td className="px-6 py-4 text-emerald-700">Higher (Slower)</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-medium">Dataset utilization</td>
                <td className="px-6 py-4 text-indigo-700">Lower</td>
                <td className="px-6 py-4 text-emerald-700 font-bold">Better</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-10">
          <h4 className="text-xl font-bold flex items-center text-amber-900 mb-4">
            <AlertTriangle className="mr-2" /> Common Mistakes in Cross Validation
          </h4>
          <ul className="list-disc pl-6 text-lg text-amber-900 space-y-3">
            <li><strong>Data Leakage:</strong> Using test data during preprocessing. A very dangerous mistake.</li>
            <li><strong>Forgetting Stratification:</strong> Creates biased classification results.</li>
            <li><strong>Using Normal CV for Time Series:</strong> Breaks chronological order.</li>
            <li><strong>Too Few Folds:</strong> Leads to unstable estimates.</li>
            <li><strong>Too Many Folds:</strong> Increases computational cost unnecessarily.</li>
          </ul>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Cross Validation evaluates how well a model will generalize to unseen data by repeatedly splitting and evaluating the dataset.
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Among all techniques, K-Fold Cross Validation is the most widely used because it provides a good balance between reliability, computational efficiency, and model evaluation quality. Cross Validation is essential for building trustworthy, stable, and generalizable Machine Learning systems.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Cross Validation helps balance Bias (model too simple) and Variance (model too sensitive). A single Train/Test Split may accidentally produce very easy or very difficult test data. By averaging multiple splits, Cross Validation provides a more stable, trustworthy performance estimate that reflects how the model will truly behave in production.
        </p>
      </div>
    </>
  );
}

