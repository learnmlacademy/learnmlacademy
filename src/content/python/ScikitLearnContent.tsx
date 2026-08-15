import React from 'react';

const CodeBlock = ({ code, output }: { code: string; output?: string }) => (
  <div className="not-prose my-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"/><span className="w-3 h-3 rounded-full bg-yellow-500"/><span className="w-3 h-3 rounded-full bg-green-500"/></div>
      <span className="text-slate-400 text-xs font-mono ml-2">Python</span>
    </div>
    <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">{code}</pre>
    {output && (
      <>
        <div className="bg-slate-700 px-4 py-1.5 text-xs text-slate-400 font-mono border-t border-slate-600">Output</div>
        <pre className="bg-slate-950 p-4 text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed">{output}</pre>
      </>
    )}
  </div>
);

const SectionHeader = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => (
  <div className="not-prose flex items-start gap-4 my-8 p-5 bg-violet-50 border border-violet-100 rounded-2xl">
    <span className="text-3xl">{icon}</span>
    <div>
      <h2 className="font-extrabold text-violet-900 text-xl">{title}</h2>
      <p className="text-violet-700 text-sm mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export function ScikitLearnContent() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Scikit-Learn: The Complete ML Toolkit</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-2">
        Scikit-learn is one of the most widely used machine-learning libraries in Python. It provides a clean, consistent API for common stages of the ML workflow — from preprocessing and model training to evaluation and hyperparameter tuning. Once you understand its basic pattern, trying a different algorithm often requires only a small code change.
      </p>

      {/* Beginner-first mental model */}
      <section className="not-prose my-7 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 md:p-6">
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">Scikit-learn in Simple Words</h2>
        <p className="text-sm md:text-base text-slate-700 mb-5">
          Think of scikit-learn as a <strong>toolbox for machine learning</strong>. You give it data, choose a model, let the model learn from examples, and then ask it to make predictions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { n: '1', title: 'Prepare Data', text: 'Put your examples into X and the correct answers into y.' },
            { n: '2', title: 'Choose Model', text: 'For example, LinearRegression or KNeighborsClassifier.' },
            { n: '3', title: 'Learn', text: 'model.fit(X_train, y_train)' },
            { n: '4', title: 'Predict', text: 'model.predict(X_test)' },
          ].map(item => (
            <div key={item.n} className="rounded-xl border border-indigo-100 bg-white p-4 text-center">
              <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">{item.n}</div>
              <p className="font-bold text-slate-900 text-sm">{item.title}</p>
              <p className="text-xs text-slate-600 mt-1">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-white border border-indigo-100 p-4">
          <p className="font-bold text-slate-900 text-sm mb-2">A tiny example</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-slate-100"><th className="p-2 text-left border border-slate-200">Study hours</th><th className="p-2 text-left border border-slate-200">Marks</th></tr></thead>
              <tbody>
                {[['1','40'],['2','50'],['3','60'],['4','70']].map(([h,m]) => (
                  <tr key={h}><td className="p-2 border border-slate-200">{h}</td><td className="p-2 border border-slate-200">{m}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-700 mt-3">From these examples, a simple regression model can learn the pattern and predict a mark for a new number of study hours.</p>
        </div>
      </section>

      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          { icon: '🔄', label: 'Consistent API', sub: 'fit() predict() score() for all models' },
          { icon: '🧮', label: '40+ Algorithms', sub: 'Regression, classification, clustering' },
          { icon: '⚙️', label: 'Preprocessing', sub: 'Scaling, encoding, imputation' },
          { icon: '📊', label: 'Model Evaluation', sub: 'Cross-val, metrics, GridSearch' },
        ].map(f => (
          <div key={f.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{f.icon}</div>
            <p className="text-xs font-bold text-slate-800">{f.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{f.sub}</p>
          </div>
        ))}
      </div>

      {/* Estimator API visual */}
      <div className="not-prose my-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-4">The basic scikit-learn pattern</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <div className="bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-3">1</div>
            <p className="font-bold text-indigo-900 text-sm mb-2">Create</p>
            <pre className="bg-indigo-100 rounded-lg px-3 py-2 text-xs font-mono text-indigo-900 mb-2">model = Algorithm()</pre>
            <p className="text-xs text-slate-600">Choose the algorithm and its settings.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="bg-emerald-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-3">2</div>
            <p className="font-bold text-emerald-900 text-sm mb-2">Fit</p>
            <pre className="bg-emerald-100 rounded-lg px-3 py-2 text-xs font-mono text-emerald-900 mb-2">model.fit(X_train, y_train)</pre>
            <p className="text-xs text-slate-600">Learn patterns from the training examples.</p>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <div className="bg-sky-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-3">3</div>
            <p className="font-bold text-sky-900 text-sm mb-2">Predict</p>
            <pre className="bg-sky-100 rounded-lg px-3 py-2 text-xs font-mono text-sky-900 mb-2">model.predict(X_test)</pre>
            <p className="text-xs text-slate-600">Use the trained model on unseen examples.</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="bg-amber-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-3">4</div>
            <p className="font-bold text-amber-900 text-sm mb-2">Evaluate</p>
            <pre className="bg-amber-100 rounded-lg px-3 py-2 text-xs font-mono text-amber-900 mb-2">accuracy_score(y_test, y_pred)</pre>
            <p className="text-xs text-slate-600">Compare predictions with the correct answers.</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-bold text-slate-900 text-sm mb-2">fit(), transform(), predict() — what is the difference?</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-slate-100"><th className="p-2 border border-slate-200 text-left">Method</th><th className="p-2 border border-slate-200 text-left">Simple meaning</th><th className="p-2 border border-slate-200 text-left">Example</th></tr></thead>
              <tbody>
                <tr><td className="p-2 border border-slate-200 font-mono">fit()</td><td className="p-2 border border-slate-200">Learn from data</td><td className="p-2 border border-slate-200">Scaler learns mean; model learns a pattern</td></tr>
                <tr><td className="p-2 border border-slate-200 font-mono">transform()</td><td className="p-2 border border-slate-200">Change data using what was learned</td><td className="p-2 border border-slate-200">Scale new values</td></tr>
                <tr><td className="p-2 border border-slate-200 font-mono">predict()</td><td className="p-2 border border-slate-200">Give an answer for new data</td><td className="p-2 border border-slate-200">Predict Pass/Fail</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CodeBlock code={`pip install scikit-learn

import sklearn
print(sklearn.__version__)   # shows your installed version`} output={`1.x.x  # exact version depends on your environment`} />

      {/* ── 1. Your first model ── */}
      <SectionHeader icon="🚀" title="1. Your First Complete ML Workflow" subtitle="Start with one tiny example, then see a real built-in dataset" />

      <div className="not-prose rounded-2xl border border-emerald-200 bg-emerald-50 p-5 my-5">
        <h3 className="font-bold text-emerald-900 text-base mb-2">Start small: predict marks from study hours</h3>
        <p className="text-sm text-slate-700 mb-3">Here the input <code>X</code> is study hours and the target <code>y</code> is marks.</p>
        <CodeBlock code={`from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4]])
y = np.array([40, 50, 60, 70])

model = LinearRegression()
model.fit(X, y)

prediction = model.predict([[5]])
print(prediction[0])`} output={`80.0`} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3 text-xs">
          <div className="rounded-lg bg-white border border-emerald-100 p-3"><strong>1. Data</strong><br/>Give examples.</div>
          <div className="rounded-lg bg-white border border-emerald-100 p-3"><strong>2. fit()</strong><br/>Learn the pattern.</div>
          <div className="rounded-lg bg-white border border-emerald-100 p-3"><strong>3. predict()</strong><br/>Ask about 5 hours.</div>
          <div className="rounded-lg bg-white border border-emerald-100 p-3"><strong>4. Result</strong><br/>Predicted marks = 80.</div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Now try a real built-in dataset: Iris</h3>
      <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4">
        <p className="font-bold text-slate-900 text-sm mb-3">Why split the data?</p>
        <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-center">
          <div className="rounded-lg bg-white border border-slate-200 px-4 py-3 flex-1"><strong>150 flowers</strong><br/><span className="text-slate-500">all examples</span></div>
          <span className="text-slate-400">→</span>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 flex-1"><strong>120 train</strong><br/><span className="text-slate-500">model learns here</span></div>
          <span className="text-slate-400">+</span>
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex-1"><strong>30 test</strong><br/><span className="text-slate-500">final check here</span></div>
        </div>
      </div>
      <CodeBlock code={`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# 1. Load dataset (150 iris flowers, 4 features, 3 species)
X, y = load_iris(return_X_y=True)
print(f"Dataset shape: {X.shape}")  # (150, 4)

# 2. Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42  # 80% train, 20% test
)
print(f"Training: {X_train.shape}, Test: {X_test.shape}")

# 3. Instantiate model
model = KNeighborsClassifier(n_neighbors=5)

# 4. Train
model.fit(X_train, y_train)

# 5. Predict
y_pred = model.predict(X_test)

# 6. Evaluate
acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc:.2%}")`}
output={`Dataset shape: (150, 4)
Training: (120, 4), Test: (30, 4)
Accuracy: 100.00%`} />

      {/* ── 2. Preprocessing ── */}
      <SectionHeader icon="⚙️" title="2. Preprocessing — Prepare Data for Models" subtitle="Most ML models require scaled, encoded, clean inputs. Scikit-learn makes this easy" />

      <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Feature Scaling</h3>
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-bold text-slate-900 text-sm mb-2">Before scaling</p>
          <p className="text-sm text-slate-600">Age: 20–60 &nbsp;&nbsp; Salary: ₹20,000–₹2,00,000</p>
          <p className="text-xs text-slate-500 mt-2">Salary numbers are much larger than age numbers.</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-bold text-emerald-900 text-sm mb-2">After scaling</p>
          <p className="text-sm text-slate-600">Both features are placed on comparable numerical scales.</p>
          <p className="text-xs text-slate-500 mt-2">This helps algorithms that are sensitive to distances or feature magnitude.</p>
        </div>
      </div>
      <CodeBlock code={`from sklearn.preprocessing import StandardScaler, MinMaxScaler
import numpy as np

X = np.array([[1, 200], [2, 150], [3, 300], [4, 250]])

# StandardScaler: each feature is centred around 0 and scaled to unit variance
# Commonly useful for scale-sensitive models such as SVM, KNN and PCA
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
print("StandardScaler output:")
print(X_scaled.round(2))
print(f"Mean: {X_scaled.mean(axis=0).round(2)}")   # should be [0, 0]
print(f"Std:  {X_scaled.std(axis=0).round(2)}")    # should be [1, 1]`}
output={`StandardScaler output:
[[-1.34 -0.45]
 [-0.45 -1.34]
 [ 0.45  1.34]
 [ 1.34  0.45]]
Mean: [0. 0.]
Std:  [1. 1.]`} />

      <CodeBlock code={`from sklearn.preprocessing import MinMaxScaler

# MinMaxScaler: maps each feature into the range [0, 1]
# Useful when you want features on the same bounded scale
minmax = MinMaxScaler()
X_minmax = minmax.fit_transform(X)
print("MinMaxScaler output (all values 0–1):")
print(X_minmax.round(2))`}
output={`MinMaxScaler output (all values 0–1):
[[0.   0.33]
 [0.33 0.  ]
 [0.67 1.  ]
 [1.   0.67]]`} />

      <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Encoding Categorical Features</h3>
      <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 text-sm text-slate-700">
        <strong>Important:</strong> <code>LabelEncoder</code> is intended for the target <code>y</code> (the answer you want to predict), not for ordinary input columns in <code>X</code>. For nominal input features such as city names, use <code>OneHotEncoder</code> or a suitable alternative.
      </div>

      <CodeBlock code={`from sklearn.preprocessing import LabelEncoder

# LabelEncoder is useful for target labels (y)
species = ['setosa', 'versicolor', 'virginica', 'setosa']

le = LabelEncoder()
y_encoded = le.fit_transform(species)
print("Encoded target:", y_encoded)
print("Classes:", le.classes_)
print("Decode:", le.inverse_transform([0, 2]))`}
output={`Encoded target: [0 1 2 0]
Classes: ['setosa' 'versicolor' 'virginica']
Decode: ['setosa' 'virginica']`} />

      <CodeBlock code={`# One-Hot Encoding — creates binary columns for nominal input features
from sklearn.preprocessing import OneHotEncoder
import numpy as np

cities = ['Delhi', 'Mumbai', 'Pune', 'Delhi', 'Mumbai']
cities_2d = np.array(cities).reshape(-1, 1)

ohe = OneHotEncoder(sparse_output=False)
X_ohe = ohe.fit_transform(cities_2d)
print("One-Hot Encoded:")
print(X_ohe)
print("Feature names:", ohe.get_feature_names_out(['City']))`}
output={`One-Hot Encoded:
[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]
 [1. 0. 0.]
 [0. 1. 0.]]
Feature names: ['City_Delhi' 'City_Mumbai' 'City_Pune']`} />

      <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">Handling Missing Values</h3>
      <CodeBlock code={`from sklearn.impute import SimpleImputer
import numpy as np

X = np.array([[1, 2], [np.nan, 4], [7, np.nan], [4, 3]])

# Mean imputation for numerical columns
imputer = SimpleImputer(strategy='mean')   # or 'median', 'most_frequent'
X_filled = imputer.fit_transform(X)
print("After imputation:")
print(X_filled)`}
output={`After imputation:
[[1.   2.  ]
 [4.   4.  ]   ← NaN replaced with column mean (1+7+4)/3 = 4
 [7.   3.  ]   ← NaN replaced with column mean (2+4+3)/3 = 3
 [4.   3.  ]]`} />

      {/* ── 3. Algorithms ── */}
      <SectionHeader icon="🧠" title="3. Common Algorithms — Same API, Different Models" subtitle="The beauty of scikit-learn: swap one algorithm for another by changing just one line" />

      <CodeBlock code={`from sklearn.linear_model    import LinearRegression, LogisticRegression, Ridge
from sklearn.tree            import DecisionTreeClassifier
from sklearn.ensemble        import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm             import SVC
from sklearn.neighbors       import KNeighborsClassifier
from sklearn.naive_bayes     import GaussianNB
from sklearn.datasets        import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing   import StandardScaler

# Load dataset
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)   # ← NEVER fit on test data!

# Try multiple classifiers — identical API for all!
classifiers = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Decision Tree':       DecisionTreeClassifier(max_depth=5, random_state=42),
    'Random Forest':       RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM':                 SVC(kernel='rbf'),
    'KNN':                 KNeighborsClassifier(n_neighbors=5),
    'Naive Bayes':         GaussianNB(),
    'Gradient Boosting':   GradientBoostingClassifier(n_estimators=100, random_state=42),
}

print(f"{'Algorithm':<25} {'Accuracy':>10}")
print("-" * 37)
for name, clf in classifiers.items():
    clf.fit(X_train_s, y_train)
    acc = clf.score(X_test_s, y_test)
    print(f"{name:<25} {acc:>10.2%}")`}
output={`Algorithm                 Accuracy
-------------------------------------
Logistic Regression          97.37%
Decision Tree                94.74%
Random Forest                96.49%
SVM                          98.25%
KNN                          94.74%
Naive Bayes                  96.49%
Gradient Boosting            95.61%

# Example output; exact scores can vary slightly across library versions.`} />

      <div className="not-prose bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 text-sm text-slate-700">
        <strong>Scaling note:</strong> the example uses one scaled dataset so several algorithms can be compared with the same input. Scaling is especially important for models such as SVM, KNN and many linear models, while tree-based models such as Decision Trees and Random Forests generally do not require feature scaling.
      </div>

      {/* ── 4. Evaluation ── */}
      <SectionHeader icon="📊" title="4. Model Evaluation — Going Beyond Accuracy" subtitle="Accuracy alone can be misleading. Use the right metric for your problem" />

      <CodeBlock code={`from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)

print(f"Accuracy:  {accuracy_score(y_test, y_pred):.4f}")
print(f"Precision: {precision_score(y_test, y_pred):.4f}")
print(f"Recall:    {recall_score(y_test, y_pred):.4f}")
print(f"F1-Score:  {f1_score(y_test, y_pred):.4f}")
print(f"ROC-AUC:   {roc_auc_score(y_test, clf.predict_proba(X_test)[:,1]):.4f}")

print("\\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

print("\\nFull Classification Report:")
print(classification_report(y_test, y_pred, target_names=['Malignant','Benign']))`}
output={`Accuracy:  0.9649
Precision: 0.9589
Recall:    0.9859
F1-Score:  0.9722
ROC-AUC:   0.9953

Confusion Matrix:
[[40  3]
 [ 1 70]]

Full Classification Report:
              precision    recall  f1-score   support
   Malignant       0.98      0.93      0.95        43
      Benign       0.96      0.99      0.97        71
    accuracy                           0.96       114
   macro avg       0.97      0.96      0.96       114
weighted avg       0.97      0.96      0.96       114

# Example output; exact values can vary slightly across versions.`} />

      {/* ── 5. Cross Validation ── */}
      <SectionHeader icon="🔄" title="5. Cross-Validation — Reliable Model Evaluation" subtitle="A single train/test split can be lucky or unlucky. Cross-validation repeats the evaluation on different folds" />

      <div className="not-prose rounded-xl border border-sky-200 bg-sky-50 p-4 my-4">
        <p className="font-bold text-slate-900 text-sm mb-3">5-fold cross-validation — one simple picture</p>
        <div className="space-y-2 text-xs font-mono">
          {[0,1,2,3,4].map(testFold => (
            <div key={testFold} className="grid grid-cols-5 gap-1">
              {[0,1,2,3,4].map(fold => (
                <div key={fold} className={`rounded px-2 py-2 text-center border ${fold === testFold ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold' : 'bg-white border-sky-200 text-slate-600'}`}>
                  {fold === testFold ? 'TEST' : 'TRAIN'}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-700 mt-3">Each fold gets one turn as the test fold. The five scores are then summarized.</p>
      </div>

      <CodeBlock code={`from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
import numpy as np

X, y = load_iris(return_X_y=True)
clf = RandomForestClassifier(n_estimators=100, random_state=42)

# 5-fold cross validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(clf, X, y, cv=cv, scoring='accuracy')

print("Fold scores:", scores.round(4))
print(f"Mean:  {scores.mean():.4f}")
print(f"Std:   {scores.std():.4f}  ← lower = more consistent")
print(f"Rough spread (mean ± 2×std): {scores.mean():.2%} ± {2*scores.std():.2%}")`}
output={`Fold scores: [0.9667 0.9667 0.9333 0.9667 0.9000]
Mean:  0.9467
Std:   0.0267  ← lower means the fold scores vary less
Rough spread (mean ± 2×std): 94.67% ± 5.33%

# This is a simple spread summary, not a formal confidence interval.`} />

      {/* ── 6. Hyperparameter Tuning ── */}
      <SectionHeader icon="🎛️" title="6. Hyperparameter Tuning with GridSearchCV" subtitle="Automatically find the best hyperparameter combination using cross-validation" />

      <CodeBlock code={`from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)

# Define the search grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth':    [None, 5, 10],
    'min_samples_split': [2, 5],
}

rf = RandomForestClassifier(random_state=42)

# GridSearchCV tries every combination with 5-fold CV
# 3 × 3 × 2 = 18 combinations × 5 folds = 90 model fits
grid_search = GridSearchCV(
    rf, param_grid, cv=5, scoring='accuracy',
    n_jobs=-1, verbose=1
)
grid_search.fit(X, y)

print("Best parameters:", grid_search.best_params_)
print(f"Best CV accuracy: {grid_search.best_score_:.4f}")

# Use the best model directly
best_model = grid_search.best_estimator_`}
output={`Fitting 5 folds for each of 18 candidates, totalling 90 fits
Best parameters: {...}
Best CV accuracy: 0.96...

# The exact winner can vary with scikit-learn version and CV details.
# Always trust grid_search.best_params_ from your own run.`} />

      {/* ── 7. ColumnTransformer ── */}
      <SectionHeader icon="🧩" title="7. ColumnTransformer — Treat Different Columns Differently" subtitle="Scale numeric columns and encode categorical columns in one clean preprocessing step" />

      <div className="not-prose rounded-xl border border-violet-200 bg-violet-50 p-4 my-4">
        <p className="font-bold text-slate-900 text-sm mb-3">Imagine this small dataset</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse bg-white">
            <thead><tr className="bg-slate-100"><th className="p-2 border border-slate-200">Age</th><th className="p-2 border border-slate-200">Salary</th><th className="p-2 border border-slate-200">City</th></tr></thead>
            <tbody><tr><td className="p-2 border border-slate-200">25</td><td className="p-2 border border-slate-200">50000</td><td className="p-2 border border-slate-200">Delhi</td></tr></tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 text-center text-sm">
          <div className="rounded-lg border border-slate-200 bg-white p-3"><strong>Age + Salary</strong><br/><span className="text-slate-500">StandardScaler</span></div>
          <div className="rounded-lg border border-slate-200 bg-white p-3"><strong>City</strong><br/><span className="text-slate-500">OneHotEncoder</span></div>
          <div className="rounded-lg border border-violet-200 bg-violet-100 p-3"><strong>Combined</strong><br/><span className="text-slate-500">model-ready features</span></div>
        </div>
      </div>

      <CodeBlock code={`from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

preprocessor = ColumnTransformer([
    ('numbers', StandardScaler(), ['Age', 'Salary']),
    ('city', OneHotEncoder(handle_unknown='ignore'), ['City']),
])

# fit_transform() learns the preprocessing rules and transforms the data
X_ready = preprocessor.fit_transform(df)`} />

      {/* ── 8. Pipeline ── */}
      <SectionHeader icon="🔗" title="8. Pipeline — Chain Preprocessing + Model Together" subtitle="Pipelines keep preprocessing and modelling together and help prevent data leakage" />

      <div className="not-prose flex flex-col md:flex-row items-center gap-2 my-4 text-center text-sm">
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 flex-1"><strong>Raw Data</strong></div>
        <span className="text-slate-400">→</span>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex-1"><strong>Impute</strong><br/><span className="text-xs text-slate-500">fill missing values</span></div>
        <span className="text-slate-400">→</span>
        <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 flex-1"><strong>Scale</strong></div>
        <span className="text-slate-400">→</span>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 flex-1"><strong>Model</strong></div>
        <span className="text-slate-400">→</span>
        <div className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 flex-1"><strong>Prediction</strong></div>
      </div>

      <CodeBlock code={`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define pipeline steps: preprocessing → model
pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),  # Step 1: Fill NaN
    ('scaler',  StandardScaler()),                   # Step 2: Scale
    ('model',   RandomForestClassifier(n_estimators=100, random_state=42)),  # Step 3
])

# fit() applies all steps in sequence to training data only
pipeline.fit(X_train, y_train)

# predict() applies preprocessing then prediction automatically
print(f"Test accuracy: {pipeline.score(X_test, y_test):.4f}")

# Cross-validate the entire pipeline (no leakage!)
cv_scores = cross_val_score(pipeline, X, y, cv=5)
print(f"CV accuracy: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")`}
output={`Test accuracy: 0.9649
CV accuracy: 0.9561 ± 0.0228

# Example output; exact values can vary slightly across versions.`} />

      <div className="not-prose bg-violet-50 border border-violet-200 rounded-2xl p-5 my-6">
        <p className="font-bold text-violet-900 text-base mb-3">🎯 Scikit-Learn Quick Reference</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { category: 'Data Splitting', items: [
              ["Train/test split","train_test_split(X, y, test_size=0.2)"],
              ["K-Fold CV","cross_val_score(model, X, y, cv=5)"],
            ]},
            { category: 'Preprocessing', items: [
              ["Standardise","StandardScaler().fit_transform(X)"],
              ["Normalise","MinMaxScaler().fit_transform(X)"],
              ["Encode target y","LabelEncoder().fit_transform(y)"],
              ["Fill missing","SimpleImputer(strategy='mean').fit_transform(X)"],
            ]},
            { category: 'Metrics', items: [
              ["Accuracy","accuracy_score(y_true, y_pred)"],
              ["F1","f1_score(y_true, y_pred)"],
              ["Confusion matrix","confusion_matrix(y_true, y_pred)"],
              ["ROC-AUC","roc_auc_score(y_true, y_prob)"],
            ]},
            { category: 'Tuning', items: [
              ["Grid search","GridSearchCV(model, param_grid, cv=5)"],
              ["Random search","RandomizedSearchCV(model, param_dist, n_iter=20)"],
              ["Pipeline","Pipeline([('scaler', ...), ('model', ...)])"],
            ]},
          ].map(cat => (
            <div key={cat.category}>
              <p className="font-bold text-violet-800 text-sm mb-2 border-b border-violet-200 pb-1">{cat.category}</p>
              {cat.items.map(([task, code]) => (
                <div key={task} className="flex gap-2 text-xs mb-1.5">
                  <span className="text-slate-600 w-28 flex-shrink-0">{task}</span>
                  <code className="text-indigo-700 font-mono">{code}</code>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="not-prose my-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4">Common Scikit-learn Questions</h2>
        <div className="space-y-4 text-sm text-slate-700">
          <div><p className="font-bold text-slate-900">What is scikit-learn mainly used for?</p><p>It is commonly used for classical machine-learning tasks such as preprocessing, regression, classification, clustering, model evaluation and hyperparameter tuning.</p></div>
          <div><p className="font-bold text-slate-900">What is the difference between fit() and predict()?</p><p><code>fit()</code> learns from training data. <code>predict()</code> uses the learned model to produce answers for new data.</p></div>
          <div><p className="font-bold text-slate-900">Why should preprocessing be fitted only on training data?</p><p>If information from the test data is used while learning preprocessing rules, the evaluation can become unrealistically optimistic. This is called data leakage.</p></div>
          <div><p className="font-bold text-slate-900">When should I use a Pipeline?</p><p>Use a Pipeline when preprocessing and modelling should always run together. It keeps the workflow reproducible and is especially useful with cross-validation and tuning.</p></div>
        </div>
      </section>

      <div className="not-prose my-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-slate-700">
        <strong>Continue learning:</strong> Review <a href="/learn/train-test-split" className="font-semibold text-indigo-700 hover:underline">Train/Test Split</a>, <a href="/learn/feature-scaling" className="font-semibold text-indigo-700 hover:underline">Feature Scaling</a>, <a href="/learn/cross-validation" className="font-semibold text-indigo-700 hover:underline">Cross-Validation</a>, and <a href="/learn/hyperparameter-tuning" className="font-semibold text-indigo-700 hover:underline">Hyperparameter Tuning</a> when you reach those topics in the curriculum.
      </div>
    </div>
  );
}
