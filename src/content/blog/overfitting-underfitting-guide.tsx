import React from 'react';

export function BlogContent_overfitting_underfitting_guide() {
  return (
    <div className="space-y-10">
      <p className="text-xl text-slate-600 leading-relaxed">
        Every ML practitioner hits the same wall: your model looks brilliant on training data, then falls apart on real data — or it never learned anything useful in the first place. These are overfitting and underfitting, and understanding them deeply is the difference between models that work in the lab and models that work in production.
      </p>

      {/* What is overfitting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">What is Overfitting?</h2>
        <p className="text-slate-700 leading-relaxed">
          Overfitting happens when your model learns the training data <em>too well</em> — including its noise, outliers, and random quirks that have nothing to do with the underlying pattern. The model memorises instead of generalising.
        </p>
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
          <p className="font-semibold text-rose-800 mb-2">Classic symptom</p>
          <p className="text-rose-700">Training accuracy: 99% &nbsp;→&nbsp; Validation accuracy: 72%. That gap is the fingerprint of overfitting.</p>
        </div>
        <p className="text-slate-700 leading-relaxed">
          Think of a student who memorises every answer in the textbook word-for-word but cannot solve a problem that is phrased differently. They have overfit the textbook.
        </p>
      </section>

      {/* What is underfitting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">What is Underfitting?</h2>
        <p className="text-slate-700 leading-relaxed">
          Underfitting is the opposite: the model is too simple to capture the patterns in the data. It performs poorly on both training and validation sets. This usually means your model lacks the capacity (too few parameters, too shallow, too much regularisation) to learn what it needs to.
        </p>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <p className="font-semibold text-amber-800 mb-2">Classic symptom</p>
          <p className="text-amber-700">Training accuracy: 61% &nbsp;→&nbsp; Validation accuracy: 60%. Low on both sides — the model has not learned anything meaningful.</p>
        </div>
      </section>

      {/* The bias-variance tradeoff */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">The Bias–Variance Tradeoff</h2>
        <p className="text-slate-700 leading-relaxed">
          These two failure modes map directly onto a foundational ML concept: bias and variance.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="font-bold text-slate-800 mb-1">High Bias = Underfitting</p>
            <p className="text-slate-600 text-sm">The model has oversimplified assumptions. It consistently misses the target — not due to randomness, but due to a fundamentally wrong model structure.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="font-bold text-slate-800 mb-1">High Variance = Overfitting</p>
            <p className="text-slate-600 text-sm">The model is too sensitive to the training data. Small changes in input produce wildly different predictions. It has learned noise as signal.</p>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed">
          The goal is to find the sweet spot — low bias <em>and</em> low variance — which is the region where your model generalises well to unseen data.
        </p>
      </section>

      {/* How to detect */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">How to Detect Each Problem</h2>
        <p className="text-slate-700 leading-relaxed">
          The most reliable diagnostic tool is the <strong>learning curve</strong> — plotting training and validation loss (or accuracy) against the number of training examples or epochs.
        </p>
        <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm leading-relaxed">{`import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import learning_curve
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42)

train_sizes, train_scores, val_scores = learning_curve(
    model, X, y,
    train_sizes=np.linspace(0.1, 1.0, 10),
    cv=5, scoring='accuracy'
)

plt.figure(figsize=(8, 5))
plt.plot(train_sizes, train_scores.mean(axis=1), label='Training accuracy')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation accuracy')
plt.xlabel('Training set size')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Learning Curve')
plt.tight_layout()
plt.show()

# Reading the curve:
# Large gap between lines → Overfitting (high variance)
# Both lines low and converging → Underfitting (high bias)`}
          </pre>
        </div>
      </section>

      {/* Fixing overfitting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">5 Ways to Fix Overfitting</h2>

        {[
          {
            num: "01", title: "Get more training data",
            body: "More data is often the single most powerful fix. When a model has more diverse examples, it cannot memorise patterns specific to a small sample.",
          },
          {
            num: "02", title: "Regularisation (L1 / L2)",
            body: "Regularisation adds a penalty to the loss function for large weights, forcing the model to stay simpler.",
            code: `from sklearn.linear_model import Ridge, Lasso
# Ridge = L2 regularisation
ridge = Ridge(alpha=1.0)   # larger alpha = stronger penalty
# Lasso = L1 regularisation (also does feature selection)
lasso = Lasso(alpha=0.1)`,
          },
          {
            num: "03", title: "Dropout (neural networks)",
            body: "Randomly 'drops' neurons during training, preventing any single neuron from becoming overly specialised.",
            code: `import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Dense(256, activation='relu'),
    tf.keras.layers.Dropout(0.4),   # drop 40% of neurons each step
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(1, activation='sigmoid')
])`,
          },
          {
            num: "04", title: "Reduce model complexity",
            body: "Use a shallower tree, fewer layers, fewer features. A simpler model has less capacity to memorise noise.",
            code: `from sklearn.tree import DecisionTreeClassifier
# Limit depth to prevent memorisation
model = DecisionTreeClassifier(max_depth=4, min_samples_leaf=10)`,
          },
          {
            num: "05", title: "Early stopping",
            body: "Stop training when validation loss stops improving, before the model has time to overfit.",
            code: `from tensorflow.keras.callbacks import EarlyStopping
callback = EarlyStopping(
    monitor='val_loss',
    patience=5,          # stop after 5 epochs of no improvement
    restore_best_weights=True
)
model.fit(X_train, y_train, validation_split=0.2,
          epochs=200, callbacks=[callback])`,
          },
        ].map(({ num, title, body, code }) => (
          <div key={num} className="border border-slate-100 rounded-2xl p-6 bg-white shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{num}</span>
              <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
            {code && (
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-xs leading-relaxed">{code}</pre>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Fixing underfitting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">4 Ways to Fix Underfitting</h2>
        {[
          {
            num: "01", title: "Increase model complexity",
            body: "Add more layers, increase tree depth, add more neurons. Give the model enough capacity to learn.",
          },
          {
            num: "02", title: "Add more features or engineer better ones",
            body: "If the raw features do not contain enough signal, the model cannot learn the pattern no matter how large it is. Interaction terms, polynomial features, or domain-specific features often help.",
            code: `from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X_train)   # adds x², x·y, etc.`,
          },
          {
            num: "03", title: "Reduce regularisation",
            body: "If you added L1/L2 penalties or strong dropout, try reducing them. You may be constraining the model too much.",
          },
          {
            num: "04", title: "Train longer",
            body: "For deep learning, the model may simply not have been given enough epochs to converge. Monitor validation loss and let it run.",
          },
        ].map(({ num, title, body, code }) => (
          <div key={num} className="border border-slate-100 rounded-2xl p-6 bg-white shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{num}</span>
              <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
            {code && (
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-xs leading-relaxed">{code}</pre>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Quick reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Quick-Reference Cheat Sheet</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 font-semibold text-slate-700 rounded-tl-xl">Symptom</th>
                <th className="text-left p-3 font-semibold text-slate-700">Diagnosis</th>
                <th className="text-left p-3 font-semibold text-slate-700 rounded-tr-xl">Fix</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["High train acc, low val acc", "Overfitting", "More data, regularisation, dropout, early stopping"],
                ["Low train acc, low val acc", "Underfitting", "Bigger model, more features, less regularisation"],
                ["Both scores low and equal", "Underfitting", "Wrong model family, noisy labels — rethink the problem"],
                ["Both scores high and equal", "Good fit ✓", "Deploy and monitor"],
              ].map(([symptom, diag, fix], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="p-3 text-slate-700 border-t border-slate-100">{symptom}</td>
                  <td className="p-3 border-t border-slate-100">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diag.includes('✓') ? 'bg-green-100 text-green-700' : diag === 'Overfitting' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{diag}</span>
                  </td>
                  <td className="p-3 text-slate-600 border-t border-slate-100">{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key takeaway */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
        <h3 className="font-bold text-indigo-900 text-xl mb-3">Key Takeaway</h3>
        <p className="text-indigo-800 leading-relaxed">
          Overfitting and underfitting are not bugs — they are signals. A large train–val gap tells you your model has memorised; equal low scores tell you it has not learned. Always plot your learning curves before tuning anything, and let the data tell you which direction to move.
        </p>
      </div>
    </div>
  );
}
