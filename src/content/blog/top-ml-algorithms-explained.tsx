import React from 'react';

export function TopMLAlgorithmsContent() {
  return (
    <div className="space-y-6">
      <p className="text-xl text-slate-600 leading-relaxed">
        Whether you are just starting out or preparing for a data science interview, knowing these 10 algorithms deeply — not just their names — is what separates good ML practitioners from great ones. Here is a practical, code-backed guide to each.
      </p>

      {[
        {
          num: "01", name: "Linear Regression", tag: "Regression",
          color: "indigo",
          when: "Predicting a continuous value with a roughly linear relationship between features and target.",
          example: "House price prediction based on area, bedrooms and location.",
          code: `from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
print("R² score:", model.score(X_test, y_test))`,
          key: "Interpretable coefficients. Fast. Requires feature scaling for gradient descent."
        },
        {
          num: "02", name: "Logistic Regression", tag: "Classification",
          color: "blue",
          when: "Binary or multiclass classification where you need probability outputs and interpretability.",
          example: "Email spam detection, disease diagnosis (positive/negative).",
          code: `from sklearn.linear_model import LogisticRegression
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
proba = model.predict_proba(X_test)[:,1]  # probabilities`,
          key: "Excellent baseline for any classification task. Fast, interpretable."
        },
        {
          num: "03", name: "Decision Tree", tag: "Classification & Regression",
          color: "emerald",
          when: "When interpretability matters most and data has non-linear relationships.",
          example: "Customer credit risk scoring — explainable to business stakeholders.",
          code: `from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier(max_depth=5, random_state=42)
model.fit(X_train, y_train)`,
          key: "No scaling needed. Prone to overfitting alone — use inside ensembles."
        },
        {
          num: "04", name: "Random Forest", tag: "Ensemble",
          color: "green",
          when: "General-purpose go-to algorithm. Works on almost any structured dataset.",
          example: "Fraud detection, medical diagnosis, customer churn prediction.",
          code: `from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)
importances = model.feature_importances_`,
          key: "Robust, handles missing data, gives feature importance. Slightly slower than single tree."
        },
        {
          num: "05", name: "XGBoost", tag: "Boosting",
          color: "amber",
          when: "When you need maximum accuracy on structured/tabular data.",
          example: "Kaggle competition winner for most structured data challenges.",
          code: `import xgboost as xgb
model = xgb.XGBClassifier(n_estimators=300, learning_rate=0.05,
                           max_depth=6, random_state=42)
model.fit(X_train, y_train, eval_set=[(X_test, y_test)],
          early_stopping_rounds=20, verbose=False)`,
          key: "Best algorithm for tabular data. Requires careful hyperparameter tuning."
        },
        {
          num: "06", name: "SVM", tag: "Classification",
          color: "violet",
          when: "High-dimensional data (text, images) or when data is not linearly separable.",
          example: "Text classification, face recognition with small datasets.",
          code: `from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
model = Pipeline([('scaler', StandardScaler()), ('svm', SVC(kernel='rbf', C=1.0))])
model.fit(X_train, y_train)`,
          key: "Scales poorly to large datasets (>100k rows). Always requires feature scaling."
        },
        {
          num: "07", name: "K-Nearest Neighbors", tag: "Classification & Regression",
          color: "cyan",
          when: "Small datasets where prediction speed is not critical.",
          example: "Recommendation systems, anomaly detection.",
          code: `from sklearn.neighbors import KNeighborsClassifier
model = KNeighborsClassifier(n_neighbors=5, metric='euclidean')
model.fit(X_train, y_train)`,
          key: "No training phase. Very slow at prediction on large datasets."
        },
        {
          num: "08", name: "Naive Bayes", tag: "Classification",
          color: "pink",
          when: "Text classification with high-dimensional sparse features.",
          example: "Spam filtering, sentiment analysis, document categorisation.",
          code: `from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
model = Pipeline([('tfidf', TfidfVectorizer()), ('nb', MultinomialNB())])
model.fit(texts_train, labels_train)`,
          key: "Extremely fast. Works great with small datasets and text data."
        },
        {
          num: "09", name: "K-Means Clustering", tag: "Unsupervised",
          color: "orange",
          when: "Grouping data without labels — customer segmentation, data exploration.",
          example: "Customer segmentation by purchase behaviour.",
          code: `from sklearn.cluster import KMeans
model = KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)
model.fit(X)
labels = model.labels_`,
          key: "Must specify K in advance. Assumes spherical, equal-sized clusters."
        },
        {
          num: "10", name: "Neural Networks", tag: "Deep Learning",
          color: "rose",
          when: "Image, text, speech, large unstructured datasets.",
          example: "Image classification, language translation, voice assistants.",
          code: `from tensorflow import keras
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(n_features,)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(n_classes, activation='softmax')
])
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=50, validation_split=0.2)`,
          key: "Requires large data, GPU, and careful tuning. Overkill for small tabular datasets."
        },
      ].map((algo) => (
        <div key={algo.num} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className={`bg-${algo.color}-600 px-6 py-4 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <span className="text-white/60 font-black text-2xl">{algo.num}</span>
              <h2 className="text-white font-bold text-xl">{algo.name}</h2>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">{algo.tag}</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">When to use</p>
                <p className="text-slate-700 text-sm leading-relaxed">{algo.when}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Real-world example</p>
                <p className="text-slate-700 text-sm leading-relaxed">{algo.example}</p>
              </div>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"/><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"/><span className="w-2.5 h-2.5 rounded-full bg-green-400"/>
                <span className="text-slate-400 text-xs ml-1">Python (scikit-learn)</span>
              </div>
              <pre className="text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto leading-relaxed">{algo.code}</pre>
            </div>
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
              <span className="text-amber-500 font-bold text-sm flex-shrink-0">💡</span>
              <p className="text-amber-800 text-sm">{algo.key}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-indigo-600 rounded-2xl p-8 text-center">
        <h3 className="text-white font-bold text-2xl mb-3">Which algorithm should you start with?</h3>
        <p className="text-indigo-200 mb-4 leading-relaxed">
          Always start with <strong className="text-white">Logistic Regression</strong> or <strong className="text-white">Random Forest</strong> as your baseline. 
          They are fast, interpretable, and work well on most problems. Only move to XGBoost or Neural Networks after establishing a strong baseline.
        </p>
      </div>
    </div>
  );
}
