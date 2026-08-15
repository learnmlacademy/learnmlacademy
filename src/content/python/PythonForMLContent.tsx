import React from 'react';
import { Code2, Zap, Globe, Users, Terminal } from 'lucide-react';

function CodeBlock({ title, code, output }: { title?: string; code: string; output?: string }) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-slate-200 shadow-sm not-prose">
      {title && <div className="bg-slate-800 text-slate-300 px-4 py-2 text-xs font-mono flex items-center gap-2"><Terminal className="w-3.5 h-3.5" />{title}</div>}
      <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto m-0"><code>{code}</code></pre>
      {output && (
        <div className="bg-white border-t border-slate-200">
          <div className="bg-slate-50 px-4 py-1 text-xs text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">Output</div>
          <pre className="p-4 text-sm font-mono text-slate-800 m-0 overflow-x-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}

function InfoBox({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
  const cls: Record<string,string> = {
    indigo: 'border-indigo-400 bg-indigo-50 text-indigo-900',
    emerald: 'border-emerald-400 bg-emerald-50 text-emerald-900',
    amber: 'border-amber-400 bg-amber-50 text-amber-900',
  };
  return (
    <div className={`border-l-4 pl-4 py-3 pr-4 rounded-r-md my-5 not-prose ${cls[color]}`}>
      <p className="font-bold mb-1">{title}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function PythonMLFlow() {
  const steps = [
    { n: '1', title: 'Collect Data', example: 'Study hours + marks' },
    { n: '2', title: 'Use Python', example: 'Store and prepare the data' },
    { n: '3', title: 'Train a Model', example: 'Let an ML library learn the pattern' },
    { n: '4', title: 'Make a Prediction', example: 'Predict marks for a new student' },
  ];

  return (
    <div className="my-6 not-prose">
      <div className="grid sm:grid-cols-4 gap-3">
        {steps.map((step, index) => (
          <React.Fragment key={step.n}>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{step.n}</div>
              <p className="font-bold text-slate-800 text-sm">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{step.example}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden" aria-hidden="true">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">Python is the tool that connects your data, ML libraries, and predictions.</p>
    </div>
  );
}

function BeginnerSetupTable() {
  const rows = [
    ['Google Colab', 'Nothing to install', 'Best if you want to start immediately'],
    ['Anaconda', 'One beginner-friendly package', 'Useful for a local data-science setup'],
    ['Python + virtual environment', 'Lightweight setup', 'Useful when you want more control'],
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm not-prose my-5">
      <table className="min-w-full text-sm bg-white">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-3 font-bold text-left text-slate-700">Option</th>
            <th className="p-3 font-bold text-left text-slate-700">Setup</th>
            <th className="p-3 font-bold text-left text-slate-700">Good for</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map(([option, setup, use]) => (
            <tr key={option}>
              <td className="p-3 font-semibold text-indigo-700">{option}</td>
              <td className="p-3 text-slate-600">{setup}</td>
              <td className="p-3 text-slate-600">{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PythonForMLContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Python for Machine Learning</h1>
      <p className="text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Python is one of the most widely used languages for Machine Learning. This tutorial focuses on the Python concepts you actually need to begin working with ML data and models.
      </p>

      {/* Beginner mental model */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">How Python Fits Into Machine Learning</h2>
      <p>
        You do <strong>not</strong> need to master all of Python before starting Machine Learning. Think of Python as the tool you use to <strong>store data, prepare it, train a model, and ask the model for a prediction</strong>.
      </p>
      <PythonMLFlow />

      <h3 className="text-xl font-bold mt-7 mb-3">A Tiny First ML Example: Study Hours → Marks</h3>
      <p className="mb-3">Suppose we have four students. We know how long they studied and the marks they received:</p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 not-prose my-4">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr><th className="p-3 text-left font-bold text-slate-700">Study Hours</th><th className="p-3 text-left font-bold text-slate-700">Marks</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3">1</td><td className="p-3">40</td></tr>
            <tr><td className="p-3">2</td><td className="p-3">50</td></tr>
            <tr><td className="p-3">3</td><td className="p-3">60</td></tr>
            <tr><td className="p-3">4</td><td className="p-3">70</td></tr>
          </tbody>
        </table>
      </div>
      <p>With only a few lines of Python, we can give these examples to a simple ML model and ask it to predict the marks for a student who studies for 5 hours.</p>
      <CodeBlock title="first_ml_example.py" code={`from sklearn.linear_model import LinearRegression

# X = input feature: study hours
X = [[1], [2], [3], [4]]

# y = known answers: marks
y = [40, 50, 60, 70]

model = LinearRegression()
model.fit(X, y)

predicted_marks = model.predict([[5]])
print(predicted_marks[0])`} output={`80.0`} />
      <div className="grid sm:grid-cols-2 gap-3 my-5 not-prose">
        {[
          ['Step 1', 'X stores the information we give the model: study hours. Each inner list represents one student row.'],
          ['Step 2', 'y stores the correct answers we already know: marks.'],
          ['Step 3', 'model.fit(X, y) lets the model learn the simple pattern in those examples.'],
          ['Step 4', 'model.predict([[5]]) asks: what marks would you expect for 5 study hours?'],
        ].map(([step, text]) => (
          <div key={step} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-bold text-indigo-700 mb-1">{step}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
      <InfoBox color="amber" title="Keep this example simple">
        Real marks depend on many factors, not only study hours. This tiny dataset is only meant to show what Python does in an ML workflow. The <a href="/learn/linear-regression" className="font-semibold underline">Linear Regression</a> lesson later explains the model and its mathematics properly.
      </InfoBox>

      {/* Why Python */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">Why Python for Machine Learning?</h2>
      <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { icon: <Code2 className="w-5 h-5" />, box: 'bg-indigo-50 border-indigo-200', iconClass: 'text-indigo-600', title: 'Readable Syntax', desc: 'Python is designed to be readable, so beginners can spend more attention on the data and ML idea instead of complicated language syntax.' },
          { icon: <Zap className="w-5 h-5" />, box: 'bg-violet-50 border-violet-200', iconClass: 'text-violet-600', title: 'Large ML Library Ecosystem', desc: 'Libraries such as NumPy, Pandas, Scikit-learn and PyTorch provide ready-made tools for many common ML tasks.' },
          { icon: <Globe className="w-5 h-5" />, box: 'bg-emerald-50 border-emerald-200', iconClass: 'text-emerald-600', title: 'Cross-Platform', desc: 'Python works across Windows, macOS and Linux. You still need to manage packages and environments correctly when moving code between systems.' },
          { icon: <Users className="w-5 h-5" />, box: 'bg-amber-50 border-amber-200', iconClass: 'text-amber-600', title: 'Large Community', desc: 'Python has extensive documentation, tutorials and open-source examples, so help is available for many common beginner and ML problems.' },
        ].map(f => (
          <div key={f.title} className={`${f.box} border rounded-xl p-4 flex gap-3`}>
            <span className={`${f.iconClass} flex-shrink-0 mt-0.5`}>{f.icon}</span>
            <div>
              <p className="font-bold text-slate-800 mb-1 text-sm">{f.title}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Setup */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">Setting Up Python for Machine Learning</h2>
      <p className="mb-3">You have several good ways to start. If you are completely new, choose the option that creates the least setup work for you.</p>
      <BeginnerSetupTable />
      <p className="mb-3">If you choose a local Anaconda setup, verify that Python and Conda are available, then install any libraries you still need:</p>
      <CodeBlock title="Terminal — verify & install" code={`# Verify your local installation
python --version
conda --version

# Install key libraries if needed
pip install numpy pandas scikit-learn matplotlib seaborn`} />

      <InfoBox color="indigo" title="Beginner tip: notebooks are convenient">
        Jupyter Notebooks let you run Python one cell at a time, which is useful while learning and experimenting. Google Colab offers a browser-based notebook option if you do not want to set up Python locally at first.
      </InfoBox>

      {/* Core Python for ML */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">Core Python Concepts for ML</h2>
      <p>You do not need every Python feature before learning ML. Start with these five building blocks:</p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 not-prose my-5">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr><th className="p-3 text-left font-bold text-slate-700">Python concept</th><th className="p-3 text-left font-bold text-slate-700">Simple ML use</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-semibold">Variables</td><td className="p-3 text-slate-600">Store values such as age, salary or learning rate.</td></tr>
            <tr><td className="p-3 font-semibold">Lists</td><td className="p-3 text-slate-600">Keep several values such as marks or predictions together.</td></tr>
            <tr><td className="p-3 font-semibold">Dictionaries</td><td className="p-3 text-slate-600">Store named settings such as model hyperparameters.</td></tr>
            <tr><td className="p-3 font-semibold">Functions</td><td className="p-3 text-slate-600">Reuse a calculation instead of writing it repeatedly.</td></tr>
            <tr><td className="p-3 font-semibold">Files</td><td className="p-3 text-slate-600">Load datasets and save predictions or results.</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-2">1. Variables &amp; Data Types</h3>
      <CodeBlock title="variables_types.py" code={`# Basic types
age        = 25           # int
gpa        = 3.8          # float
name       = "Alice"      # string
passed     = True         # bool

# Check type
print(type(gpa))          # <class 'float'>
print(isinstance(age, int)) # True`} output={`<class 'float'>
True`} />

      <h3 className="text-xl font-bold mt-6 mb-2">2. Lists &amp; List Comprehensions</h3>
      <p className="text-sm text-slate-600 mb-2">Lists hold sequences of values. List comprehensions are a compact Python shorthand that is often useful when preparing data.</p>
      <CodeBlock title="lists.py" code={`scores = [88, 72, 95, 61, 84]

# Slice: first 3 elements
print(scores[:3])           # [88, 72, 95]

# List comprehension: scale scores to 0-1
normalised = [s / 100 for s in scores]
print(normalised)           # [0.88, 0.72, 0.95, 0.61, 0.84]

# Filter: only scores above 80
high = [s for s in scores if s > 80]
print(high)                 # [88, 95, 84]`} output={`[88, 72, 95]
[0.88, 0.72, 0.95, 0.61, 0.84]
[88, 95, 84]`} />

      <h3 className="text-xl font-bold mt-6 mb-2">3. Dictionaries</h3>
      <p className="text-sm text-slate-600 mb-2">Dictionaries map keys to values — essential for storing model hyperparameters and results.</p>
      <CodeBlock title="dictionaries.py" code={`params = {"learning_rate": 0.01, "max_depth": 5, "n_estimators": 100}

# Access
print(params["learning_rate"])    # 0.01

# Add / Update
params["max_features"] = "sqrt"
print(params)

# Loop over hyperparameters
for key, value in params.items():
    print(f"{key}: {value}")`} output={`0.01
{'learning_rate': 0.01, 'max_depth': 5, 'n_estimators': 100, 'max_features': 'sqrt'}
learning_rate: 0.01
max_depth: 5
n_estimators: 100
max_features: sqrt`} />

      <h3 className="text-xl font-bold mt-6 mb-2">4. Functions</h3>
      <CodeBlock title="functions.py" code={`def mean_squared_error(actual, predicted):
    """Calculate MSE between two lists."""
    n = len(actual)
    squared_errors = [(a - p) ** 2 for a, p in zip(actual, predicted)]
    return sum(squared_errors) / n

actual    = [10, 20, 30, 40]
predicted = [12, 18, 33, 37]

mse = mean_squared_error(actual, predicted)
print(f"MSE: {mse}")     # MSE: 6.5`} output={`MSE: 6.5`} />
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 my-5 not-prose">
        <p className="font-bold text-indigo-900 mb-2">What did this function calculate?</p>
        <p className="text-sm text-slate-700 mb-3">Do not worry if you have not learned MSE yet. The purpose here is to see how a Python function turns repeated calculation steps into reusable code.</p>
        <div className="overflow-x-auto rounded-lg border border-indigo-100 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50"><tr><th className="p-2 text-left">Actual</th><th className="p-2 text-left">Predicted</th><th className="p-2 text-left">Error²</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-2">10</td><td className="p-2">12</td><td className="p-2">(10 − 12)² = 4</td></tr>
              <tr><td className="p-2">20</td><td className="p-2">18</td><td className="p-2">(20 − 18)² = 4</td></tr>
              <tr><td className="p-2">30</td><td className="p-2">33</td><td className="p-2">(30 − 33)² = 9</td></tr>
              <tr><td className="p-2">40</td><td className="p-2">37</td><td className="p-2">(40 − 37)² = 9</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 space-y-1 text-sm text-slate-700">
          <p><strong>Step 1:</strong> Add the squared errors: 4 + 4 + 9 + 9 = <strong>26</strong>.</p>
          <p><strong>Step 2:</strong> There are 4 predictions, so divide by 4.</p>
          <p><strong>Step 3:</strong> MSE = 26 ÷ 4 = <strong>6.5</strong>.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-2">5. File Handling (Loading Datasets)</h3>
      <CodeBlock title="file_io.py" code={`import csv

# Read a CSV file without Pandas
with open("students.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["score"])

# Write results to a CSV
with open("results.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "prediction"])
    writer.writerow(["Alice", 0.92])`} />

      {/* Full ML workflow */}
      <h2 className="text-2xl font-bold mt-12 mb-4 text-indigo-800 border-b pb-2">Complete Python ML Workflow Example</h2>
      <p className="mb-4">The next example is more realistic than our tiny first example. Read the six numbered comments first; they tell you the whole story before you worry about every line of code.</p>
      <div className="grid sm:grid-cols-3 gap-3 my-5 not-prose">
        {[
          ['1', 'Load the student data'],
          ['2', 'Choose inputs (X) and answer (y)'],
          ['3', 'Create train and test sets'],
          ['4', 'Scale the input features'],
          ['5', 'Train the model'],
          ['6', 'Predict and evaluate'],
        ].map(([n, text]) => (
          <div key={n} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">{n}</span>
            <span className="text-sm text-slate-700">{text}</span>
          </div>
        ))}
      </div>
      <CodeBlock title="ml_pipeline.py" code={`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# ── 1. Load Data ────────────────────────────────
df = pd.read_csv("students.csv")
print(df.head())

# ── 2. Define Features (X) and Label (y) ───────
X = df[["study_hours", "sleep_hours", "attendance_pct"]]
y = df["passed"]          # 1 = passed, 0 = failed

# ── 3. Split into Train / Test ──────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train samples: {len(X_train)}, Test samples: {len(X_test)}")

# ── 4. Feature Scaling ─────────────────────────
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # fit on train only!
X_test  = scaler.transform(X_test)

# ── 5. Train Model ─────────────────────────────
model = LogisticRegression()
model.fit(X_train, y_train)

# ── 6. Predict & Evaluate ──────────────────────
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions):.2%}")
print(classification_report(y_test, predictions))`}
output={`Train samples: 800, Test samples: 200
Accuracy: 87.50%
              precision    recall  f1-score
           0       0.85      0.88      0.87
           1       0.90      0.87      0.88`} />

      {/* Library overview */}
      <h2 className="text-2xl font-bold mt-12 mb-4 text-indigo-800 border-b pb-2">The ML Python Library Stack</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm not-prose">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-3 font-bold text-left text-slate-700">Library</th>
              <th className="p-3 font-bold text-left text-slate-700">Purpose</th>
              <th className="p-3 font-bold text-left text-slate-700">Key Objects</th>
              <th className="p-3 font-bold text-left text-slate-700">Import</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['NumPy', 'Fast numerical arrays & linear algebra', 'ndarray', 'import numpy as np'],
              ['Pandas', 'Tabular data loading, cleaning & analysis', 'DataFrame, Series', 'import pandas as pd'],
              ['Matplotlib', 'Static plots & charts', 'Figure, Axes', 'import matplotlib.pyplot as plt'],
              ['Seaborn', 'Statistical visualisations (built on Matplotlib)', 'heatmap, pairplot', 'import seaborn as sns'],
              ['Scikit-learn', 'Classic ML algorithms & evaluation', 'estimator API', 'from sklearn import ...'],
              ['PyTorch', 'Deep Learning & neural networks', 'Tensor, nn.Module', 'import torch'],
              ['XGBoost', 'Efficient gradient-boosted decision trees', 'XGBClassifier', 'import xgboost as xgb'],
            ].map(([lib, purpose, obj, imp]) => (
              <tr key={lib} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-indigo-700">{lib}</td>
                <td className="p-3 text-slate-600">{purpose}</td>
                <td className="p-3 font-mono text-xs text-slate-500">{obj}</td>
                <td className="p-3 font-mono text-xs text-slate-500">{imp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-indigo-800 border-b pb-2">Common Beginner Questions</h2>
      <div className="space-y-4 not-prose my-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-bold text-slate-800">Do I need advanced Python before learning Machine Learning?</p>
          <p className="mt-1 text-sm text-slate-600">No. Be comfortable with variables, lists, dictionaries, loops, functions and basic file/data handling. You can learn more Python as your ML tasks become more advanced.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-bold text-slate-800">Is Python the only language used for Machine Learning?</p>
          <p className="mt-1 text-sm text-slate-600">No. ML can be built with several languages. Python is especially popular for learning, experimentation and data science because of its readable syntax and strong library ecosystem.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-bold text-slate-800">What should I learn after basic Python?</p>
          <p className="mt-1 text-sm text-slate-600">Learn NumPy for numerical arrays, Pandas for tables and data preparation, and Scikit-learn for classic ML workflows.</p>
        </div>
      </div>

      <InfoBox color="emerald" title="Next Steps">
        Continue with <a href="/learn/numpy-essentials" className="font-semibold underline">NumPy Essentials</a>, then <a href="/learn/pandas-essentials" className="font-semibold underline">Pandas Essentials</a>, and finally <a href="/learn/scikit-learn-essentials" className="font-semibold underline">Scikit-learn Essentials</a>. These pages build directly on the Python basics you learned here.
      </InfoBox>
    </div>
  );
}
