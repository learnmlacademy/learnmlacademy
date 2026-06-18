import React from 'react';

export function BlogContent_xgboost_vs_random_forest() {
  return (
    <div className="space-y-10">
      <p className="text-xl text-slate-600 leading-relaxed">
        Both XGBoost and Random Forest are ensemble methods built on decision trees, and both consistently outperform single models on structured data. But they work in fundamentally different ways — and choosing the wrong one for a given problem can cost you significantly in accuracy, training time, or both.
      </p>

      {/* Core difference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">The Core Difference: Parallel vs Sequential</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <p className="font-bold text-blue-900 text-lg mb-2">Random Forest</p>
            <p className="text-blue-800 text-sm leading-relaxed mb-3">Builds many trees <strong>independently and in parallel</strong>. Each tree is trained on a random bootstrap sample of the data, and at each split, only a random subset of features is considered. Final prediction is the average (regression) or majority vote (classification) of all trees.</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-medium">Bagging</span>
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-medium">Parallel</span>
              <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-medium">Low variance</span>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <p className="font-bold text-amber-900 text-lg mb-2">XGBoost</p>
            <p className="text-amber-800 text-sm leading-relaxed mb-3">Builds trees <strong>sequentially</strong>. Each new tree corrects the residual errors of all previous trees. Uses gradient descent in function space to minimise a regularised objective. Final prediction is the weighted sum of all trees.</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-medium">Boosting</span>
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-medium">Sequential</span>
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-medium">Low bias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Head-to-head comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Head-to-Head Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700 rounded-tl-xl w-1/3">Property</th>
                <th className="text-left p-3 font-semibold text-blue-700">Random Forest</th>
                <th className="text-left p-3 font-semibold text-amber-700 rounded-tr-xl">XGBoost</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Accuracy (typical)", "Very good", "Excellent — state-of-the-art on tabular data"],
                ["Training speed", "Fast (parallelisable)", "Slower (sequential by nature, but optimised)"],
                ["Hyperparameter tuning", "Forgiving — few critical params", "Complex — learning rate, depth, subsample, etc."],
                ["Overfitting risk", "Low — hard to overfit", "Higher — can overfit without regularisation"],
                ["Handles missing values", "No (needs imputation)", "Yes — built-in missing value handling"],
                ["Feature importance", "Yes (impurity-based)", "Yes (gain, cover, weight — more informative)"],
                ["Memory usage", "High (stores all trees)", "Lower (smaller trees by design)"],
                ["Best for", "Quick baselines, noisy data, wide features", "Maximum accuracy, Kaggle, production systems"],
              ].map(([prop, rf, xgb], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="p-3 font-medium text-slate-700 border-t border-slate-100">{prop}</td>
                  <td className="p-3 text-slate-600 border-t border-slate-100">{rf}</td>
                  <td className="p-3 text-slate-600 border-t border-slate-100">{xgb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code: RF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Random Forest: Practical Setup</h2>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import numpy as np

model = RandomForestClassifier(
    n_estimators=300,       # more trees = more stable, diminishing returns after ~300
    max_depth=None,         # let trees grow fully (RF is robust to this)
    min_samples_leaf=1,     # default — try 2-5 if overfitting
    max_features='sqrt',    # standard for classification (try 'log2' for wide data)
    n_jobs=-1,              # use all CPU cores
    random_state=42,
    oob_score=True,         # free validation score using out-of-bag samples
)

model.fit(X_train, y_train)
print(f"OOB Score: {model.oob_score_:.4f}")  # reliable val score without a split

# Cross-validation score
cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='roc_auc')
print(f"CV ROC-AUC: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Feature importance
import pandas as pd
importances = pd.Series(
    model.feature_importances_,
    index=feature_names
).sort_values(ascending=False)
print(importances.head(10))`}
          </pre>
        </div>
      </section>

      {/* Code: XGBoost */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">XGBoost: Practical Setup with Early Stopping</h2>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`import xgboost as xgb
from sklearn.model_selection import cross_val_score

model = xgb.XGBClassifier(
    n_estimators=1000,       # high — early stopping will find the right number
    learning_rate=0.05,      # lower = better generalisation, needs more trees
    max_depth=6,             # typical range: 3-8. Deeper = more complex = more overfit risk
    subsample=0.8,           # fraction of rows per tree (reduces overfitting)
    colsample_bytree=0.8,    # fraction of features per tree
    min_child_weight=1,      # min samples in a leaf (increase to reduce overfitting)
    gamma=0,                 # regularisation: minimum loss reduction to split
    reg_alpha=0,             # L1 regularisation (Lasso)
    reg_lambda=1,            # L2 regularisation (Ridge)
    eval_metric='auc',
    use_label_encoder=False,
    random_state=42,
    n_jobs=-1,
)

# Training with early stopping
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    early_stopping_rounds=50,   # stop if val AUC doesn't improve for 50 rounds
    verbose=100
)

print(f"Best iteration: {model.best_iteration}")
print(f"Best val AUC: {model.best_score:.4f}")`}
          </pre>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-800 text-sm"><strong>Key insight:</strong> With XGBoost, always set <code className="bg-blue-100 px-1 rounded">n_estimators</code> high (500–2000) and rely on <code className="bg-blue-100 px-1 rounded">early_stopping_rounds</code> to find the optimal number of trees. This prevents overfitting automatically while avoiding the need to grid-search <code className="bg-blue-100 px-1 rounded">n_estimators</code>.</p>
        </div>
      </section>

      {/* Hyperparameter tuning */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Hyperparameter Tuning: Optuna (Recommended for Both)</h2>
        <p className="text-slate-700 leading-relaxed">
          Grid search is too slow for XGBoost's large parameter space. Optuna uses Bayesian optimisation to find good parameters efficiently.
        </p>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`import optuna
from sklearn.model_selection import cross_val_score
import xgboost as xgb

def objective(trial):
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 100, 1000),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'max_depth': trial.suggest_int('max_depth', 3, 9),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
        'reg_alpha': trial.suggest_float('reg_alpha', 1e-8, 1.0, log=True),
        'reg_lambda': trial.suggest_float('reg_lambda', 1e-8, 1.0, log=True),
        'random_state': 42, 'n_jobs': -1,
    }
    model = xgb.XGBClassifier(**params, use_label_encoder=False, eval_metric='logloss')
    score = cross_val_score(model, X_train, y_train, cv=5, scoring='roc_auc').mean()
    return score

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100, show_progress_bar=True)
print("Best params:", study.best_params)
print("Best CV AUC:", study.best_value)`}
          </pre>
        </div>
      </section>

      {/* When to use which */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Which Should You Choose?</h2>
        {[
          {
            title: "Use Random Forest when…",
            color: "blue",
            items: [
              "You need a fast, reliable baseline with minimal tuning",
              "Your dataset is noisy or has many outliers",
              "Interpretability and feature importance matter to stakeholders",
              "You have very wide data (many features, relatively few rows)",
              "Training time is a constraint (RF parallelises fully)",
            ]
          },
          {
            title: "Use XGBoost when…",
            color: "amber",
            items: [
              "You need maximum predictive accuracy on structured/tabular data",
              "You are competing (XGBoost won most Kaggle competitions from 2016–2020)",
              "Your dataset has missing values (XGBoost handles them natively)",
              "You have time to tune — the extra effort usually pays off",
              "You are in production and need a smaller model footprint",
            ]
          }
        ].map(({ title, color, items }) => (
          <div key={title} className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-6`}>
            <p className={`font-bold text-${color}-900 mb-3`}>{title}</p>
            <ul className={`text-${color}-800 text-sm space-y-1.5`}>
              {items.map(item => <li key={item}>✓ {item}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* Verdict */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
        <h3 className="font-bold text-indigo-900 text-xl mb-3">The Practical Verdict</h3>
        <p className="text-indigo-800 leading-relaxed">
          In practice, start with Random Forest. It is hard to misuse, gives solid results, and takes 10 minutes to set up. If you need more performance and are willing to spend time tuning, switch to XGBoost. On most real-world tabular datasets, a well-tuned XGBoost will beat a well-tuned Random Forest by 1–3% AUC — which matters in production even if it seems small.
        </p>
        <p className="text-indigo-800 leading-relaxed mt-3">
          When in doubt, run both and let your validation set decide.
        </p>
      </div>
    </div>
  );
}
