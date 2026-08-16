import React from 'react';
import { AlertTriangle, Columns, Layers } from 'lucide-react';

const FoldRow = ({ label, validation }: { label: string; validation: number }) => (
  <div className="grid grid-cols-[88px_repeat(5,minmax(44px,1fr))] gap-2 items-center text-sm">
    <div className="font-bold text-slate-700">{label}</div>
    {[1, 2, 3, 4, 5].map((fold) => (
      <div
        key={fold}
        className={`rounded-md border px-2 py-3 text-center font-mono font-bold ${
          fold === validation
            ? 'bg-amber-100 border-amber-300 text-amber-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}
      >
        {fold === validation ? `V${fold}` : `T${fold}`}
      </div>
    ))}
  </div>
);

export function CrossValidationContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Cross-Validation</h1>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Cross-validation evaluates a model on several different held-out parts of the available training data. Instead of trusting one lucky or unlucky split, we rotate which observations are used for validation and summarize the results.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Main idea</p>
          <p className="text-slate-800 leading-relaxed">
            <strong>Split into folds → train on most folds → validate on one fold → rotate → average the scores.</strong>
          </p>
        </div>

        <h2 className="text-3xl font-bold text-indigo-800 mb-5">Cross-Validation in Simple Words</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-7">
          {[
            ['1', 'Split', 'Divide the development data into several folds.'],
            ['2', 'Train', 'Train the model using all but one fold.'],
            ['3', 'Validate', 'Score it on the fold that was left out.'],
            ['4', 'Rotate', 'Repeat so every fold gets a turn.'],
          ].map(([num, title, text]) => (
            <div key={num} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-extrabold flex items-center justify-center mb-3">{num}</div>
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-900 mb-3">Tiny 5-fold picture</p>
          <div className="space-y-2 overflow-x-auto min-w-[620px]">
            <FoldRow label="Round 1" validation={1} />
            <FoldRow label="Round 2" validation={2} />
            <FoldRow label="Round 3" validation={3} />
            <FoldRow label="Round 4" validation={4} />
            <FoldRow label="Round 5" validation={5} />
          </div>
          <p className="text-sm text-slate-600 mt-4">
            <strong>T</strong> = training fold in that round. <strong>V</strong> = validation fold. Each sample is used for validation once in ordinary K-Fold.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-indigo-800 mb-4">Why Do We Need It?</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Imagine judging a student's ability using only one short practice test. A very easy or unusually difficult test can give a misleading impression. Several different tests provide a broader picture. A single train/test split has the same weakness: the measured score can depend on which rows happened to land in the hold-out set.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Cross-validation does <strong>not automatically prevent overfitting</strong>. It gives repeated evidence about generalization and is useful for model comparison and hyperparameter selection. A model can still be over-tuned to repeated cross-validation decisions, which is why an untouched final test set can remain valuable.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="the-problem">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> Why One Split Can Be Misleading
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Suppose three reasonable train/validation splits of the same dataset produce these illustrative accuracy values:
        </p>

        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm mb-6 max-w-xl overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Split</th>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-sm">
              <tr><td className="px-5 py-3 font-bold">Split 1</td><td className="px-5 py-3">92%</td></tr>
              <tr><td className="px-5 py-3 font-bold">Split 2</td><td className="px-5 py-3">84%</td></tr>
              <tr><td className="px-5 py-3 font-bold">Split 3</td><td className="px-5 py-3">88%</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Cross-validation reduces our dependence on one particular partition by evaluating several partitions. It does not remove all uncertainty, but it lets us see both the <strong>average score</strong> and how much the score changes across folds.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-blue-950 mb-3">Worked average</p>
          <p className="font-mono text-blue-950 mb-2">Fold scores = 91%, 89%, 92%, 88%, 90%</p>
          <p className="text-blue-950 mb-2">
            Step 1: <span className="font-mono">91 + 89 + 92 + 88 + 90 = 450</span>
          </p>
          <p className="text-blue-950 mb-2">
            Step 2: <span className="font-mono">450 ÷ 5 = 90</span>
          </p>
          <p className="font-bold text-blue-950">Mean validation accuracy = 90%</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="types">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Cross-Validation and Validation Strategies
        </h2>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Hold-Out Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Hold-out validation makes one split into training and validation/test portions. It is fast and simple, but its estimate depends more strongly on that one split.
            </p>
            <div className="font-mono text-sm text-slate-800 bg-slate-50 p-4 rounded-lg border mb-4 overflow-x-auto">
{`FULL DATASET
│
├── TRAINING PORTION
└── HELD-OUT PORTION`}
            </div>
            <p className="text-slate-700 mb-4">
              Ratios such as 80/20 or 70/30 are examples, not universal rules. Dataset size and the reliability needed from evaluation should guide the choice.
            </p>
            <div className="bg-slate-900 text-slate-100 text-sm font-mono p-4 rounded-lg overflow-x-auto">
<pre><code>{`from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.20,
    random_state=42,
    stratify=y
)`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">2. K-Fold Cross-Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              K-Fold divides the data into <em>K</em> folds. In each round, one fold is held out for validation and the other <em>K − 1</em> folds are used for training. Every fold receives one validation turn.
            </p>
            <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-5">
              <p className="font-bold text-blue-900 mb-2">Example: 100 samples, K = 5</p>
              <p className="text-slate-800 mb-2">Each fold contains about 20 samples.</p>
              <ul className="list-disc pl-6 text-slate-800 space-y-1">
                <li>Each round trains on about 80 samples.</li>
                <li>Each round validates on about 20 samples.</li>
                <li>The process produces 5 validation scores.</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <p className="font-bold text-emerald-900 mb-2">Useful because</p>
                <ul className="list-disc pl-5 text-emerald-900 text-sm space-y-1">
                  <li>Uses every sample for both training and validation across different rounds.</li>
                  <li>Reduces dependence on one hold-out partition.</li>
                </ul>
              </div>
              <div className="bg-rose-50 rounded-lg p-4 border border-rose-100">
                <p className="font-bold text-rose-900 mb-2">Trade-off</p>
                <ul className="list-disc pl-5 text-rose-900 text-sm space-y-1">
                  <li>Requires fitting the model K times.</li>
                  <li>Fold choice must respect the structure of the data.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Stratified K-Fold</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              For binary or multiclass classification, Stratified K-Fold tries to preserve class proportions in each fold. This is particularly useful when one class is uncommon.
            </p>
            <div className="bg-sky-50 rounded-lg p-4 border border-sky-100 text-sky-950 font-mono text-sm mb-4 overflow-x-auto">
{`ORIGINAL: approximately 90% Class A, 10% Class B
FOLD 1:   approximately 90% Class A, 10% Class B
FOLD 2:   approximately 90% Class A, 10% Class B
...`}
            </div>
            <p className="text-slate-700 mb-4">
              Stratification preserves proportions as closely as possible; exact percentages are not always possible because sample counts must be whole numbers. It also does not solve class imbalance by itself—it only makes the evaluation folds more representative of the label proportions.
            </p>
            <div className="bg-slate-900 text-slate-100 text-sm font-mono p-4 rounded-lg overflow-x-auto">
<pre><code>{`from sklearn.model_selection import StratifiedKFold

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">4. Leave-One-Out Cross-Validation (LOOCV)</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              LOOCV sets K equal to the number of samples. With 10 observations, it fits 10 models: each round validates on one observation and trains on the other nine.
            </p>
            <div className="font-mono text-sm bg-slate-50 border rounded-lg p-4 mb-4 overflow-x-auto">
{`Round 1: validate P1 | train P2 ... P10
Round 2: validate P2 | train P1, P3 ... P10
...
Round 10: validate P10 | train P1 ... P9`}
            </div>
            <p className="text-slate-700">
              LOOCV uses nearly all observations for training in each round, but can be computationally expensive and is not automatically the best choice just because a dataset is small.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">5. Leave-P-Out</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Leave-P-Out validates on every possible set of <em>P</em> observations. The number of splits grows combinatorially.
            </p>
            <div className="bg-slate-50 border rounded-xl p-5">
              <p className="font-bold text-slate-900 mb-2">Example: N = 5, P = 2</p>
              <p className="text-slate-800 mb-2">Number of validation pairs:</p>
              <p className="font-mono text-lg text-indigo-800">C(5, 2) = 10</p>
              <p className="text-sm text-slate-600 mt-2">For N = 100 and P = 2, this already becomes 4,950 splits.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">6. Repeated K-Fold</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Repeated K-Fold builds several randomized K-Fold partitions. For example, 5 folds repeated 10 times produce 50 validation scores. This can show how sensitive performance is to different randomized fold assignments, at additional computational cost.
            </p>
            <div className="font-mono text-sm bg-indigo-50 border border-indigo-100 rounded-lg p-4">
{`5 folds × 10 repeats = 50 validation scores
Final report: summarize the distribution (for example mean ± standard deviation)`}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">7. Repeated Random Splits (Shuffle / Monte Carlo Style)</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Instead of partitioning the data into one fixed set of non-overlapping folds, repeated random splitting creates fresh train/validation partitions multiple times. Across repetitions, a sample may appear in validation more than once or not at all.
            </p>
            <div className="font-mono text-sm bg-emerald-50 border border-emerald-100 rounded-lg p-4 overflow-x-auto">
{`Run 1: random train 80% | validation 20%
Run 2: a new random 80/20 split
Run 3: another random 80/20 split
...`}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">8. Group-Aware Cross-Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              If several rows belong to the same person, customer, machine, household, patient, or other entity, ordinary K-Fold can leak entity-specific information across train and validation folds. Group-aware splitting keeps a group out of both sides of the same split.
            </p>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 mb-4">
              <p className="font-bold text-purple-950 mb-2">Example</p>
              <p className="text-purple-950">
                If each patient has five measurements, all measurements from Patient 17 should generally stay together in either training or validation for a given split—not be divided between both.
              </p>
            </div>
            <div className="bg-slate-900 text-slate-100 text-sm font-mono p-4 rounded-lg overflow-x-auto">
<pre><code>{`from sklearn.model_selection import GroupKFold, cross_val_score

cv = GroupKFold(n_splits=5)
scores = cross_val_score(model, X, y, cv=cv, groups=patient_id)`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">9. Time-Series Cross-Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Time-ordered data usually needs chronological splitting. Training on the future and validating on the past can create unrealistic leakage.
            </p>
            <div className="font-mono text-sm bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4 overflow-x-auto">
{`Round 1: Train Jan              → Validate Feb
Round 2: Train Jan, Feb         → Validate Mar
Round 3: Train Jan, Feb, Mar    → Validate Apr
Round 4: Train Jan ... Apr      → Validate May`}
            </div>
            <p className="text-slate-700">
              This expanding-window picture matches the basic idea behind <code>TimeSeriesSplit</code>: later training sets contain earlier training sets plus more historical data.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">10. Nested Cross-Validation</h3>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Nested CV separates <strong>hyperparameter/model selection</strong> from <strong>performance estimation</strong> when you want a less optimistically biased estimate of a tuning procedure.
            </p>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <ol className="list-decimal pl-5 text-purple-950 space-y-2">
                <li><strong>Outer split:</strong> hold out one fold for evaluation.</li>
                <li><strong>Inner CV:</strong> tune choices using only the outer-training portion.</li>
                <li><strong>Refit:</strong> train the selected setup on that outer-training portion.</li>
                <li><strong>Outer score:</strong> evaluate once on the outer held-out fold.</li>
                <li>Repeat across outer folds and summarize the outer scores.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="pipeline-leakage">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Cross-Validation and Data Leakage</h2>
        <p className="text-lg leading-relaxed text-slate-800 mb-5">
          Cross-validation only gives a trustworthy estimate when every learned preprocessing step is fitted <strong>inside each training fold</strong>. Scaling, imputation, feature selection and PCA can all leak information if they are fitted once on the entire dataset before CV.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <p className="font-bold text-rose-950 mb-3">Wrong</p>
            <pre className="text-sm font-mono whitespace-pre-wrap text-rose-950">{`X_scaled = scaler.fit_transform(X)

# CV now receives data whose scaling
# already learned from every row.
cross_val_score(model, X_scaled, y, cv=cv)`}</pre>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-emerald-950 mb-3">Better</p>
            <pre className="text-sm font-mono whitespace-pre-wrap text-emerald-950">{`pipeline = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000)
)

cross_val_score(pipeline, X, y, cv=cv)`}</pre>
          </div>
        </div>

        <p className="text-slate-700">
          A Scikit-learn <strong>Pipeline</strong> makes the scaler fit only on the training rows of each fold and then applies that fitted transformation to the fold being validated.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python-example">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Complete Python Example</h2>
        <p className="text-lg text-slate-800 leading-relaxed mb-5">
          The example below uses Iris classification, a Pipeline, and an explicit shuffled Stratified K-Fold so the splitting behavior is visible rather than hidden behind <code>cv=5</code>.
        </p>

        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-lg overflow-x-auto text-sm font-mono mb-6">
<pre><code>{`from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

model = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=1000)
)

scores = cross_val_score(
    model,
    X,
    y,
    cv=cv,
    scoring='accuracy'
)

print('Fold scores:', scores.round(3))
print('Mean accuracy:', round(scores.mean(), 3))
print('Std deviation:', round(scores.std(), 3))`}</code></pre>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
          <p className="font-bold text-slate-900 mb-3">Expected output with these exact settings</p>
          <pre className="font-mono text-sm text-slate-800 whitespace-pre-wrap">{`Fold scores: [1.    0.967 0.9   1.    0.9  ]
Mean accuracy: 0.953
Std deviation: 0.045`}</pre>
        </div>

        <p className="text-slate-700 leading-relaxed">
          The mean says the five validation accuracies average about <strong>95.3%</strong> for this educational example. The standard deviation gives a compact view of how much the five scores vary. These numbers are not a promised Logistic Regression accuracy on other datasets.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Columns className="mr-3 text-indigo-600" /> Choosing a Validation Strategy
        </h2>

        <div className="overflow-x-auto mb-10">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left font-bold text-slate-700">Situation</th>
                <th className="px-5 py-3 text-left font-bold text-slate-700">Useful starting strategy</th>
                <th className="px-5 py-3 text-left font-bold text-slate-700">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="px-5 py-4">Ordinary classification</td><td className="px-5 py-4 font-bold">Stratified K-Fold</td><td className="px-5 py-4">Preserves class proportions across folds.</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-4">Ordinary regression</td><td className="px-5 py-4 font-bold">K-Fold</td><td className="px-5 py-4">Rotates held-out folds across the dataset.</td></tr>
              <tr><td className="px-5 py-4">Repeated rows per person/entity</td><td className="px-5 py-4 font-bold">Group-aware CV</td><td className="px-5 py-4">Prevents the same group appearing on both sides of a split.</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-4">Time-ordered forecasting</td><td className="px-5 py-4 font-bold">Time-series CV</td><td className="px-5 py-4">Respects chronology.</td></tr>
              <tr><td className="px-5 py-4">Evaluating a tuning procedure</td><td className="px-5 py-4 font-bold">Nested CV</td><td className="px-5 py-4">Separates inner tuning from outer performance estimation.</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Cross-Validation vs One Train/Test Split</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left font-bold text-slate-700">Question</th>
                <th className="px-5 py-3 text-left font-bold text-indigo-700">Single split</th>
                <th className="px-5 py-3 text-left font-bold text-emerald-700">Cross-validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="px-5 py-4 font-medium">How many evaluation partitions?</td><td className="px-5 py-4">One</td><td className="px-5 py-4">Several</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-4 font-medium">Dependence on one split?</td><td className="px-5 py-4">Higher</td><td className="px-5 py-4">Reduced</td></tr>
              <tr><td className="px-5 py-4 font-medium">Computation?</td><td className="px-5 py-4">Lower</td><td className="px-5 py-4">Higher because models are refit</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-4 font-medium">Useful for model selection?</td><td className="px-5 py-4">Possible, but sensitive to one validation split</td><td className="px-5 py-4">Often more informative</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-10">
          <h3 className="text-2xl font-bold flex items-center text-amber-950 mb-4">
            <AlertTriangle className="mr-2" /> Common Mistakes
          </h3>
          <ul className="list-disc pl-6 text-amber-950 space-y-3">
            <li><strong>Leakage before CV:</strong> fitting a scaler, imputer, PCA, or feature selector on all rows first.</li>
            <li><strong>Ignoring groups:</strong> letting the same patient/customer/entity appear in training and validation.</li>
            <li><strong>Random CV for time series:</strong> allowing future data to influence models evaluated on the past.</li>
            <li><strong>Using accuracy blindly:</strong> an imbalanced classification problem may require precision, recall, F1, ROC-AUC, PR-AUC, or a business-specific metric instead.</li>
            <li><strong>Thinking more folds are always better:</strong> more folds increase computation and change the statistical properties of the estimate.</li>
            <li><strong>Tuning forever on the same CV:</strong> repeated decision-making can overfit the validation process itself.</li>
          </ul>
        </div>
      </div>

      <div id="scikit-learn-details" className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-indigo-950 mb-4">A Useful Scikit-learn Detail</h2>
        <p className="text-indigo-950 leading-relaxed mb-3">
          When <code>cross_val_score(..., cv=5)</code> receives an ordinary binary or multiclass classifier, Scikit-learn uses a stratified K-Fold strategy. For other cases it uses K-Fold. With an integer <code>cv</code>, those default splitters do not shuffle.
        </p>
        <p className="text-indigo-950 leading-relaxed">
          If you want shuffled folds with a fixed seed, create the splitter explicitly—as the Python example above does—and pass <code>cv=cv</code>. This also avoids a common coding mistake: creating a <code>KFold</code> object but then accidentally calling <code>cross_val_score(..., cv=5)</code>, which ignores that object.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Quick Recap</h2>
      <div className="space-y-3 mb-10">
        <details className="border border-slate-200 rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Why not trust one train/test split?</summary>
          <p className="mt-3 text-slate-700">Because the measured score can depend strongly on which rows happened to be held out. Cross-validation evaluates several held-out partitions.</p>
        </details>
        <details className="border border-slate-200 rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Does cross-validation prevent overfitting?</summary>
          <p className="mt-3 text-slate-700">No. It helps evaluate and select models more carefully, but models and even the model-selection process can still overfit.</p>
        </details>
        <details className="border border-slate-200 rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-900 cursor-pointer">Which splitter should I use for repeated measurements from the same patient?</summary>
          <p className="mt-3 text-slate-700">Use a group-aware strategy so measurements from one patient do not leak across training and validation in the same split.</p>
        </details>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Cross-validation repeatedly trains and validates a model across different subsets of the available development data. Its main benefit is reducing dependence on one arbitrary split and giving a distribution of validation scores rather than one number.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The most important skill is not memorizing “K = 5.” It is choosing a split strategy that matches the data: stratify classification labels when appropriate, respect groups, preserve time order, keep learned preprocessing inside each fold, and retain a genuinely untouched final test set when you need a final performance estimate.
      </p>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-10">
        <p className="font-bold text-slate-900 mb-3">Continue learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/train-test-split" className="text-indigo-700 hover:underline font-semibold">Train/Test Split</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/overfitting-underfitting" className="text-indigo-700 hover:underline font-semibold">Overfitting &amp; Underfitting</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/hyperparameter-tuning" className="text-indigo-700 hover:underline font-semibold">Hyperparameter Tuning</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/grid-random-search" className="text-indigo-700 hover:underline font-semibold">Grid &amp; Random Search</a>
        </div>
      </div>
    </>
  );
}
