import React from "react";
import { Target, AlertTriangle, Layers, Percent, BookOpen } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

const dataSplit = [
  { name: "Training Data", value: 80, color: "#4f46e5" },
  { name: "Testing Data", value: 20, color: "#f59e0b" },
];

export function EvaluationContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Train/Test Split</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Before you trust a machine learning model to make real-world decisions,
        you must evaluate its performance. The easiest and most fundamental way
        to do this is using the <strong>Train/Test Split</strong> method.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Key Vocabulary to Know First
      </h2>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-1">Overfitting</strong>
          <p className="text-sm text-slate-600 m-0">
            When a model memorizes the training data perfectly but fails
            completely on new, unseen data. It is the primary reason we must
            test models on data they haven't seen before.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-1">Data Leakage</strong>
          <p className="text-sm text-slate-600 m-0">
            When information from outside the training dataset (i.e., from the
            testing dataset) is used to create the model. This creates an
            artificially inflated performance score.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-1">Validation Set</strong>
          <p className="text-sm text-slate-600 m-0">
            An optional third slice of the dataset used specifically to tune a
            model's hyperparameters (settings), keeping the final Testing Set
            completely pure for the final exam.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-1">Generalization</strong>
          <p className="text-sm text-slate-600 m-0">
            A model's ability to adapt properly to new, previously unseen data,
            drawn from the same distribution as the one used to create the
            model.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        The Core Concept: Why Split?
      </h2>
      <p>
        Imagine a student studying for a math exam. If the teacher gives the
        student the final exam paper to practice with (the exact questions), the
        student will score 100%. But did they learn math, or did they just
        memorize the answers?
      </p>
      <p>
        Machine Learning models behave the same way. If you train a model on a
        dataset and then test it on that <em>exact same dataset</em>, the model
        will look incredibly accurate because it simply memorized the data. This
        is <strong>Overfitting</strong>.
      </p>
      <p>
        To get a true measure of a model's predictive power on unseen data, we
        literally cut our dataset into two distinct parts:
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white border-2 border-indigo-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-full z-0"></div>
          <h3 className="font-bold text-indigo-900 text-lg relative z-10 flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" /> Training Set
          </h3>
          <p className="text-slate-600 mt-2 relative z-10">
            The larger portion of the dataset used to train the model. The model
            looks at the features and the targets to learn the patterns and
            build the mathematical rules.
          </p>
          <div className="mt-4 font-mono text-sm bg-indigo-50 text-indigo-800 inline-block px-3 py-1 rounded">
            Usually 70% - 80%
          </div>
        </div>

        <div className="bg-white border-2 border-amber-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full z-0"></div>
          <h3 className="font-bold text-amber-900 text-lg relative z-10 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-600" /> Testing Set
          </h3>
          <p className="text-slate-600 mt-2 relative z-10">
            The smaller portion of the dataset hidden from the model during
            training. After training, the model is asked to predict the outcomes
            for this unseen data to grade its accuracy.
          </p>
          <div className="mt-4 font-mono text-sm bg-amber-50 text-amber-800 inline-block px-3 py-1 rounded">
            Usually 20% - 30%
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Visualizing the Split
      </h2>
      <div className="bg-white border border-slate-200 rounded-xl p-6 my-6 flex flex-col items-center">
        <h4 className="font-bold text-slate-700 mb-2">Standard 80/20 Ratio</h4>
        <div className="h-64 w-full max-w-sm">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataSplit}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {dataSplit.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => `${value}%`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Step-by-Step Splitting Process
      </h2>
      <ol className="space-y-4 my-6 bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-700">
        <li>
          <strong>Randomization (Shuffle):</strong> Always scramble your dataset
          first. If your data is ordered by a category (e.g., all 0s first, then
          all 1s), splitting straight down the middle might mean the training
          set only sees 0s, and the testing set is only 1s. The model will fail
          completely.
        </li>
        <li>
          <strong>Stratification (Optional but Recommended):</strong> If your
          dataset is highly imbalanced (e.g., 99% healthy patients, 1% sick), a
          random split might accidentally put all the sick patients in the test
          set. Stratified splitting ensures the exact ratio of classes is
          maintained in both the train and test sets.
        </li>
        <li>
          <strong>The Cut:</strong> Physically split the data rows into the
          chosen logical ratio (e.g., 80% / 20%).
        </li>
        <li>
          <strong>Separating X and Y:</strong> For both sets, split the Features
          (X) from the Labels (y). You will end up with four distinct arrays:{" "}
          <code>X_train, X_test, y_train, y_test</code>.
        </li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Crucial Considerations (The "Gotchas")
      </h2>

      <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-xl my-6 shadow-sm">
        <h4 className="flex items-center gap-2 font-bold text-rose-900 mt-0 mb-3 text-lg">
          <AlertTriangle className="h-5 w-5" /> Data Leakage Crisis
        </h4>
        <p className="text-rose-800/90 m-0">
          You must perform feature engineering (like scaling values or filling
          missing data) <strong>AFTER</strong> the train/test split. If you
          calculate the average of the whole dataset to fill missing values
          before splitting, information from the test set "leaks" into the
          training set, ruining the integrity of your test. Your model will
          cheat.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Code Example (Python)
      </h2>
      <p>
        Scikit-learn makes this historically tedious task single-line simple:
      </p>

      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl text-sm font-mono my-6 overflow-x-auto border border-slate-800">
        <pre className="!m-0">
          <code className="language-python">
            <span className="text-[#569cd6]">from</span> sklearn.model_selection{" "}
            <span className="text-[#569cd6]">import</span> train_test_split
            {"\n"}
            {"\n"}
            <span className="text-[#6a9955]">
              # Assuming X is your features matrix and y is your target array
            </span>
            {"\n"}
            X_train, X_test, y_train, y_test = train_test_split({"\n"}
            X, {"\n"}
            y, {"\n"}
            test_size=<span className="text-[#b5cea8]">0.20</span>,{" "}
            <span className="text-[#6a9955]"># Sets 20% for testing</span>
            {"\n"}
            random_state=<span className="text-[#b5cea8]">42</span>,{" "}
            <span className="text-[#6a9955]">
              # Ensures the random shuffle is reproducible
            </span>
            {"\n"}
            stratify=y{" "}
            <span className="text-[#6a9955]">
              # Optional: Ensures class balance is maintained (critical for
              classification)
            </span>
            {"\n"}){"\n"}
            {"\n"}
            <span className="text-[#4fc1ff]">print</span>(
            <span className="text-[#ce9178]">"Training data size:"</span>,{" "}
            <span className="text-[#4ecec1]">len</span>(X_train)){"\n"}
            <span className="text-[#4fc1ff]">print</span>(
            <span className="text-[#ce9178]">"Testing data size:"</span>,{" "}
            <span className="text-[#4ecec1]">len</span>(X_test))
          </code>
        </pre>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Practice Checkpoint
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden">
        <BookOpen className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Test Your Setup
        </h4>
        <p className="font-medium text-slate-200">Scenario:</p>
        <p className="text-sm bg-slate-700/50 p-3 rounded mb-4">
          You are preparing data for a Machine Learning model. You decide to
          standardize your numeric features by subtracting the mean and dividing
          by the standard deviation. <br />
          <br />
          Should you calculate this mean/std-dev and apply it to the whole
          dataset <strong>before</strong> the train-test split, or{" "}
          <strong>after</strong>? Why?
        </p>
        <details className="group cursor-pointer">
          <summary className="font-bold text-indigo-400 outline-none select-none">
            Reveal Answer
          </summary>
          <div className="mt-3 p-4 bg-emerald-900/40 border border-emerald-800/50 text-emerald-100 rounded text-sm space-y-2">
            <p>
              You must apply it <strong>after</strong> the split.
            </p>
            <p>
              You calculate the mean and standard deviation using{" "}
              <strong>ONLY the Training data</strong>, and then apply those
              exact values to standardize both the Training and Testing data. If
              you calculate it before splitting, you are using data from the
              Test set to influence the Training set, resulting in Data Leakage.
            </p>
          </div>
        </details>
      </div>
    </>
  );
}
