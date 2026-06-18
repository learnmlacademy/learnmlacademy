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
      <h3 className="font-extrabold text-violet-900 text-xl">{title}</h3>
      <p className="text-violet-700 text-sm mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export function ScikitLearnContent() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Scikit-Learn: The Complete ML Toolkit</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-2">
        Scikit-learn is the most widely used ML library in Python. It provides a clean, consistent API for every stage of the ML workflow — from preprocessing and model training to evaluation and hyperparameter tuning. Once you know scikit-learn, switching between algorithms takes just one line of code.
      </p>

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
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-4">The Universal Scikit-Learn API — same 3 steps for every algorithm</p>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {[
            { step: '1', name: 'Instantiate', code: 'model = Algorithm(\n  hyperparameters\n)', color: 'indigo', desc: 'Create the model object with your chosen settings' },
            { step: '2', name: 'Train', code: 'model.fit(\n  X_train, y_train\n)', color: 'emerald', desc: 'Learn patterns from training data' },
            { step: '3', name: 'Predict / Evaluate', code: 'model.predict(X_test)\nmodel.score(X_test,y_test)', color: 'amber', desc: 'Generate predictions and measure accuracy' },
          ].map(s => (
            <div key={s.step} className={`flex-1 bg-${s.color}-50 border border-${s.color}-200 rounded-xl p-4`}>
              <div className={`bg-${s.color}-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-3`}>{s.step}</div>
              <p className={`font-bold text-${s.color}-900 text-sm mb-2`}>{s.name}</p>
              <pre className={`bg-${s.color}-100 rounded-lg px-3 py-2 text-xs font-mono text-${s.color}-900 mb-2`}>{s.code}</pre>
              <p className="text-xs text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`pip install scikit-learn

import sklearn
print(sklearn.__version__)   # e.g. 1.4.2`} output={`1.4.2`} />

      {/* ── 1. Your first model ── */}
      <SectionHeader icon="🚀" title="1. Your First ML Model in 10 Lines" subtitle="From raw data to trained model to evaluation — the complete workflow" />

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

      <h4 className="text-lg font-bold text-slate-800 mt-6 mb-3">Feature Scaling</h4>
      <CodeBlock code={`from sklearn.preprocessing import StandardScaler, MinMaxScaler
import numpy as np

X = np.array([[1, 200], [2, 150], [3, 300], [4, 250]])

# StandardScaler: mean=0, std=1  (best for: SVM, neural nets, PCA)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
print("StandardScaler output:")
print(X_scaled.round(2))
print(f"Mean: {X_scaled.mean(axis=0).round(2)}")   # should be [0, 0]
print(f"Std:  {X_scaled.std(axis=0).round(2)}")    # should be [1, 1]`}
output={`StandardScaler output:
[[-1.34 -0.  ]
 [-0.45 -1.34]
 [ 0.45  1.34]
 [ 1.34  0.  ]]
Mean: [0. 0.]
Std:  [1. 1.]`} />

      <CodeBlock code={`from sklearn.preprocessing import MinMaxScaler

# MinMaxScaler: scales to [0, 1]  (best for: neural nets, image data)
minmax = MinMaxScaler()
X_minmax = minmax.fit_transform(X)
print("MinMaxScaler output (all values 0–1):")
print(X_minmax.round(2))`}
output={`MinMaxScaler output (all values 0–1):
[[0.   0.33]
 [0.33 0.  ]
 [0.67 1.  ]
 [1.   0.67]]`} />

      <h4 className="text-lg font-bold text-slate-800 mt-6 mb-3">Encoding Categorical Features</h4>
      <CodeBlock code={`from sklearn.preprocessing import LabelEncoder, OneHotEncoder
import pandas as pd

cities = ['Delhi', 'Mumbai', 'Pune', 'Delhi', 'Mumbai']

# Label Encoding — converts to integers (use only for ordinal features)
le = LabelEncoder()
encoded = le.fit_transform(cities)
print("LabelEncoder:", encoded)         # [0 1 2 0 1]
print("Classes:", le.classes_)          # ['Delhi' 'Mumbai' 'Pune']
print("Decode:", le.inverse_transform([0, 2]))  # ['Delhi' 'Pune']`}
output={`LabelEncoder: [0 1 2 0 1]
Classes: ['Delhi' 'Mumbai' 'Pune']
Decode: ['Delhi' 'Pune']`} />

      <CodeBlock code={`# One-Hot Encoding — creates binary columns (use for nominal features)
from sklearn.preprocessing import OneHotEncoder
import numpy as np

cities_2d = np.array(cities).reshape(-1, 1)   # must be 2D
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

      <h4 className="text-lg font-bold text-slate-800 mt-6 mb-3">Handling Missing Values</h4>
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
    'Decision Tree':       DecisionTreeClassifier(max_depth=5),
    'Random Forest':       RandomForestClassifier(n_estimators=100),
    'SVM':                 SVC(kernel='rbf'),
    'KNN':                 KNeighborsClassifier(n_neighbors=5),
    'Naive Bayes':         GaussianNB(),
    'Gradient Boosting':   GradientBoostingClassifier(n_estimators=100),
}

print(f"{'Algorithm':<25} {'Accuracy':>10}")
print("-" * 37)
for name, clf in classifiers.items():
    clf.fit(X_train_s, y_train)
    acc = clf.score(X_test_s, y_test)
    print(f"{name:<25} {acc:>10.2%}")`}
output={`Algorithm                 Accuracy
-------------------------------------
Logistic Regression          98.25%
Decision Tree                94.74%
Random Forest                97.37%
SVM                          98.25%
KNN                          96.49%
Naive Bayes                  93.86%
Gradient Boosting            97.37%`} />

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
output={`Accuracy:  0.9737
Precision: 0.9726
Recall:    0.9863
F1-Score:  0.9794
ROC-AUC:   0.9972

Confusion Matrix:
[[40  2]
 [ 1 71]]

Full Classification Report:
              precision    recall  f1-score   support
   Malignant       0.98      0.95      0.96        42
      Benign       0.97      0.99      0.98        72
    accuracy                           0.97       114
   macro avg       0.97      0.97      0.97       114
weighted avg       0.97      0.97      0.97       114`} />

      {/* ── 5. Cross Validation ── */}
      <SectionHeader icon="🔄" title="5. Cross-Validation — Reliable Model Evaluation" subtitle="A single train/test split can be lucky or unlucky. Cross-val gives you a stable estimate" />

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
print(f"95% CI: {scores.mean():.2%} ± {2*scores.std():.2%}")`}
output={`Fold scores: [0.9667 1.     0.9333 0.9667 1.    ]
Mean:  0.9733
Std:   0.0249  ← lower = more consistent
95% CI: 97.33% ± 4.97%`} />

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
Best parameters: {'max_depth': None, 'min_samples_split': 2, 'n_estimators': 200}
Best CV accuracy: 0.9666`} />

      {/* ── 7. Pipeline ── */}
      <SectionHeader icon="🔗" title="7. Pipeline — Chain Preprocessing + Model Together" subtitle="Pipelines prevent data leakage and make deployment dramatically simpler" />

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
output={`Test accuracy: 0.9737
CV accuracy: 0.9648 ± 0.0182`} />

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
              ["Encode labels","LabelEncoder().fit_transform(y)"],
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
    </div>
  );
}
