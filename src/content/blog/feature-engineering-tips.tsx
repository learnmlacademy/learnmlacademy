import React from 'react';

export function BlogContent_feature_engineering_tips() {
  return (
    <div className="space-y-10">
      <p className="text-xl text-slate-600 leading-relaxed">
        Kaggle grandmasters have a saying: <em>"Data beats algorithms."</em> The features you feed your model matter far more than which algorithm you choose. A well-engineered feature can boost a logistic regression past an untuned neural network. Here are the techniques that actually move the needle.
      </p>

      {/* Why it matters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Why Feature Engineering Still Matters in the Deep Learning Era</h2>
        <p className="text-slate-700 leading-relaxed">
          Deep learning models can learn features automatically from raw data — but only when you have enormous datasets and compute. For most real-world tabular problems (fraud detection, churn prediction, demand forecasting), you have thousands or hundreds of thousands of rows, not billions. In this regime, manual feature engineering is still one of the highest-ROI activities you can do.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Even in NLP and computer vision, preprocessing choices — tokenisation strategy, image normalisation, data augmentation — are a form of feature engineering that consistently impacts final performance.
        </p>
      </section>

      {/* Technique 1: Handling missing values */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">1. Handle Missing Values Strategically</h2>
        <p className="text-slate-700 leading-relaxed">
          Never drop rows with missing values as a default. Missing data itself is often a signal. A missing income field on a loan application may indicate the applicant chose not to disclose — which is predictive.
        </p>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer, KNNImputer

df = pd.read_csv('data.csv')

# Strategy 1: Add a "was missing" indicator BEFORE imputing
df['income_was_missing'] = df['income'].isna().astype(int)

# Strategy 2: Median imputation (robust to outliers)
imputer = SimpleImputer(strategy='median')
df['income'] = imputer.fit_transform(df[['income']])

# Strategy 3: KNN imputation (uses similar rows to fill)
knn_imputer = KNNImputer(n_neighbors=5)
df_imputed = pd.DataFrame(
    knn_imputer.fit_transform(df),
    columns=df.columns
)`}
          </pre>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-800 text-sm"><strong>Pro tip:</strong> The "was_missing" binary indicator is often one of the most predictive features in datasets with informative missingness. Always add it before imputing.</p>
        </div>
      </section>

      {/* Technique 2: Date/time */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">2. Extract Rich Features from Datetime Columns</h2>
        <p className="text-slate-700 leading-relaxed">
          A raw timestamp is nearly useless to a model. But broken into components, it becomes a rich source of signal — especially for behaviour prediction and demand forecasting.
        </p>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`df['timestamp'] = pd.to_datetime(df['timestamp'])

# Decompose into components
df['hour']        = df['timestamp'].dt.hour
df['day_of_week'] = df['timestamp'].dt.dayofweek    # 0=Mon, 6=Sun
df['month']       = df['timestamp'].dt.month
df['is_weekend']  = (df['day_of_week'] >= 5).astype(int)
df['is_holiday']  = df['timestamp'].isin(holiday_list).astype(int)

# Cyclical encoding (so hour 23 is "close" to hour 0)
df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
df['dow_sin']  = np.sin(2 * np.pi * df['day_of_week'] / 7)
df['dow_cos']  = np.cos(2 * np.pi * df['day_of_week'] / 7)

# Time since a reference event
df['days_since_signup'] = (df['timestamp'] - df['signup_date']).dt.days`}
          </pre>
        </div>
        <p className="text-slate-700 text-sm">
          Cyclical encoding is important: if you give a model raw hour values, it will think hour 23 (11 PM) is far from hour 0 (midnight), when they are actually adjacent. Sine/cosine encoding places them correctly in continuous space.
        </p>
      </section>

      {/* Technique 3: Encoding categoricals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">3. Encode Categorical Variables Correctly</h2>
        <p className="text-slate-700 leading-relaxed">
          Choosing the wrong encoding strategy is one of the most common mistakes. Here is a practical guide to when to use each method:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700 rounded-tl-xl">Encoding</th>
                <th className="text-left p-3 font-semibold text-slate-700">Use when</th>
                <th className="text-left p-3 font-semibold text-slate-700 rounded-tr-xl">Watch out for</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["One-Hot Encoding", "Low cardinality (<15 categories)", "Curse of dimensionality with many categories"],
                ["Label Encoding", "Ordinal categories (Low/Med/High)", "Tree models only — implies order to linear models"],
                ["Target Encoding", "High cardinality (city, user_id)", "Data leakage if not done within CV folds"],
                ["Frequency Encoding", "High cardinality, no target info", "Loses ordering of rare vs common"],
                ["Binary Encoding", "Medium-high cardinality", "Less interpretable than OHE"],
              ].map(([enc, use, watch], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="p-3 font-medium text-slate-800 border-t border-slate-100">{enc}</td>
                  <td className="p-3 text-slate-600 border-t border-slate-100">{use}</td>
                  <td className="p-3 text-rose-600 border-t border-slate-100 text-xs">{watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`import category_encoders as ce
from sklearn.model_selection import KFold

# Target encoding safely (within CV folds to prevent leakage)
encoder = ce.TargetEncoder(cols=['city', 'product_category'])
encoder.fit(X_train, y_train)
X_train_enc = encoder.transform(X_train)
X_test_enc  = encoder.transform(X_test)   # uses training stats only`}
          </pre>
        </div>
      </section>

      {/* Technique 4: Interaction features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4. Create Interaction and Ratio Features</h2>
        <p className="text-slate-700 leading-relaxed">
          Linear models and even tree models sometimes miss relationships between features. Explicitly creating interaction terms and ratios can surface these patterns.
        </p>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`# Ratio features
df['income_per_dependent']   = df['annual_income'] / (df['num_dependents'] + 1)
df['debt_to_income']         = df['total_debt'] / (df['annual_income'] + 1)
df['revenue_per_employee']   = df['revenue'] / (df['employees'] + 1)

# Interaction terms (multiply two features)
df['age_x_experience'] = df['age'] * df['years_experience']

# Polynomial features (for linear models)
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False, interaction_only=False)
X_poly = poly.fit_transform(X[['age', 'income', 'credit_score']])

# Aggregate features (group-level statistics)
df['mean_spend_by_city']   = df.groupby('city')['spend'].transform('mean')
df['count_orders_by_user'] = df.groupby('user_id')['order_id'].transform('count')`}
          </pre>
        </div>
      </section>

      {/* Technique 5: Scaling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5. Scale Features — But Only When It Matters</h2>
        <p className="text-slate-700 leading-relaxed">
          Not every model needs feature scaling, but getting this wrong can severely degrade certain algorithms.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="font-bold text-emerald-800 mb-2">Needs scaling</p>
            <ul className="text-emerald-700 text-sm space-y-1">
              <li>• Linear/Logistic Regression</li>
              <li>• SVM (especially RBF kernel)</li>
              <li>• KNN and K-Means</li>
              <li>• Neural Networks</li>
              <li>• PCA and other decompositions</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-bold text-slate-800 mb-2">Does NOT need scaling</p>
            <ul className="text-slate-600 text-sm space-y-1">
              <li>• Decision Trees</li>
              <li>• Random Forest</li>
              <li>• XGBoost / LightGBM</li>
              <li>• Naive Bayes</li>
            </ul>
          </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# StandardScaler: zero mean, unit variance — use for most cases
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)   # NEVER fit on test set!

# RobustScaler: uses median & IQR — better when you have outliers
from sklearn.preprocessing import RobustScaler
scaler = RobustScaler()

# MinMaxScaler: scales to [0,1] — use for neural nets, image pixels
scaler = MinMaxScaler()`}
          </pre>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
          <p className="text-rose-800 text-sm"><strong>Critical rule:</strong> Always fit your scaler on the training set only, then apply the same transformation to the test set. Fitting on the full dataset causes data leakage and inflated evaluation scores.</p>
        </div>
      </section>

      {/* Technique 6: Feature selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">6. Remove Useless Features</h2>
        <p className="text-slate-700 leading-relaxed">
          More features is not always better. Irrelevant or redundant features add noise, slow training, and can hurt generalisation. Feature selection is the other side of feature engineering.
        </p>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`from sklearn.feature_selection import SelectKBest, f_classif, RFE
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

# Method 1: Correlation filter (remove highly correlated features)
corr_matrix = pd.DataFrame(X_train).corr().abs()
upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
to_drop = [col for col in upper.columns if any(upper[col] > 0.95)]
X_train.drop(columns=to_drop, inplace=True)

# Method 2: Feature importance from Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
importances = pd.Series(rf.feature_importances_, index=feature_names)
top_features = importances.nlargest(20).index.tolist()

# Method 3: Recursive Feature Elimination
rfe = RFE(estimator=rf, n_features_to_select=15)
rfe.fit(X_train, y_train)
selected = X_train.columns[rfe.support_].tolist()`}
          </pre>
        </div>
      </section>

      {/* Key takeaway */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
        <h3 className="font-bold text-indigo-900 text-xl mb-3">The Feature Engineering Mindset</h3>
        <p className="text-indigo-800 leading-relaxed">
          The best feature engineers are domain experts first and ML practitioners second. Ask yourself: "What would a human expert look at to make this decision?" Then encode that reasoning as a feature. The most powerful features are almost always derived from domain insight, not automated search.
        </p>
      </div>
    </div>
  );
}
