import React from 'react';
import { Code2, Zap, Globe, Users, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

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

export function PythonForMLContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Python for Machine Learning</h1>
      <p className="text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Python is the undisputed language of Machine Learning. This tutorial teaches you the Python concepts and patterns you will actually use every day as an ML practitioner.
      </p>

      {/* Why Python */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">Why Python for Machine Learning?</h2>
      <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { icon: <Code2 className="w-5 h-5" />, color: 'indigo', title: 'Readable Syntax', desc: 'Python reads almost like English. ML involves complex maths — Python lets you focus on logic, not language quirks.' },
          { icon: <Zap className="w-5 h-5" />, color: 'violet', title: 'Massive Library Ecosystem', desc: 'NumPy, Pandas, Scikit-learn, PyTorch, TensorFlow — you never write algorithms from scratch.' },
          { icon: <Globe className="w-5 h-5" />, color: 'emerald', title: 'Cross-Platform', desc: 'Code written on Windows runs seamlessly on Linux cloud servers. No rewrites needed for deployment.' },
          { icon: <Users className="w-5 h-5" />, color: 'amber', title: 'Huge Community', desc: 'Every error you encounter has been solved before. Millions of tutorials, Stack Overflow answers, and open-source projects.' },
        ].map(f => (
          <div key={f.title} className={`bg-${f.color}-50 border border-${f.color}-200 rounded-xl p-4 flex gap-3`}>
            <span className={`text-${f.color}-600 flex-shrink-0 mt-0.5`}>{f.icon}</span>
            <div>
              <p className="font-bold text-slate-800 mb-1 text-sm">{f.title}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Setup */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">Setting Up Your Environment</h2>
      <p className="mb-3">The fastest way to get a full ML environment running is with <strong>Anaconda</strong>, which installs Python plus all key libraries in one click.</p>
      <CodeBlock title="Terminal — install & verify" code={`# 1. Download Anaconda from https://www.anaconda.com
# 2. Verify installation
python --version       # Python 3.11.x
conda --version        # conda 23.x

# 3. Install key libraries (if not already included)
pip install numpy pandas scikit-learn matplotlib seaborn`} />

      <InfoBox color="indigo" title="💡 Use Jupyter Notebooks">
        Jupyter Notebooks (<code>jupyter notebook</code>) let you write and run Python code in interactive cells — perfect for ML experiments. Google Colab is a free cloud alternative.
      </InfoBox>

      {/* Core Python for ML */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">Core Python Concepts for ML</h2>

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
      <p className="text-sm text-slate-600 mb-2">Lists hold sequences of values. List comprehensions are a Pythonic shorthand used constantly in ML data pipelines.</p>
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
      <p className="mb-4">This is what a real, simplified ML pipeline looks like end-to-end using only Python standard libraries + Scikit-learn:</p>
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
              ['XGBoost', 'Gradient boosted trees (competition winner)', 'XGBClassifier', 'import xgboost as xgb'],
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

      <InfoBox color="emerald" title="✅ Next Steps">
        Now that you understand Python fundamentals, proceed to <strong>NumPy Essentials</strong> to learn fast numerical computation, then <strong>Pandas Essentials</strong> for data manipulation — these two libraries underpin everything else in ML.
      </InfoBox>
    </div>
  );
}
