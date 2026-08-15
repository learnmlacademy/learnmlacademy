import React from "react";
import { Link } from "react-router-dom";
import {
  Brain, Calculator, Code, Briefcase, AlertTriangle,
  Activity, TextSelect, Binary, X as CloseIcon, Check
} from "lucide-react";

export function NaiveBayesContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Naive Bayes Classifier</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 rounded-r-md shadow-sm">
        Naive Bayes is a probabilistic classifier based on applying Bayes’ Theorem with a strong (naive) conditional-independence assumption between features given the class.</p>

      {/* Simple first layer */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Brain className="mr-2 text-indigo-600" /> Naive Bayes in Simple Words
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Naive Bayes looks at <strong>clues</strong>, checks how often those clues appeared with each class in the past,
        and chooses the class with the strongest probability score. A simple example is email spam detection.
      </p>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-4 gap-3 mb-8">
        {[
          { step: "1", title: "Past Emails", text: "Learn from examples labelled Spam or Not Spam." },
          { step: "2", title: "Look at Clues", text: "Words such as free, prize, meeting or report." },
          { step: "3", title: "Compare Scores", text: "How strongly do the clues support each class?" },
          { step: "4", title: "Choose a Class", text: "Predict the class with the larger score." },
        ].map((item) => (
          <div key={item.step} className="border border-slate-200 bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mx-auto mb-2">{item.step}</div>
            <p className="font-bold text-slate-800 mb-1">{item.title}</p>
            <p className="text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
        <p className="font-bold text-indigo-900 mb-3">Tiny Example — One New Email</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-white rounded-lg border border-indigo-100 p-3">
            <p className="text-slate-500 mb-1">New email contains</p>
            <p className="font-mono font-bold text-slate-800">free · prize · click</p>
          </div>
          <div className="bg-white rounded-lg border border-indigo-100 p-3">
            <p className="text-slate-500 mb-1">Past data suggests</p>
            <p className="font-semibold text-slate-800">These words occur more often in spam.</p>
          </div>
          <div className="bg-white rounded-lg border border-indigo-100 p-3">
            <p className="text-slate-500 mb-1">Prediction</p>
            <p className="font-bold text-rose-700">Spam</p>
          </div>
        </div>
        <p className="text-sm text-indigo-900 mt-3">
          The model does not understand the meaning of “free” like a human does. It uses probabilities learned from labelled examples.
        </p>
      </div>

      {/* What is Naive Bayes? */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Briefcase className="mr-2 text-indigo-600" /> What is Naive Bayes?
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Naive Bayes is a supervised machine learning algorithm used mainly for classification problems. 
        It predicts the probability that a data point belongs to a particular class based on <strong className="text-indigo-700">Bayes' Theorem</strong> combined with a <strong className="text-indigo-700">Feature Independence Assumption</strong>.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Common Uses:
      </h3>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-3 text-lg leading-relaxed">
        <li><strong>Spam Detection:</strong> Filtering out junk emails.</li>
        <li><strong>Sentiment Analysis:</strong> Understanding positive/negative product reviews.</li>
        <li><strong>Document Classification:</strong> Organizing news articles into categories.</li>
        <li><strong>Medical Data Classification:</strong> Supporting carefully validated research or decision-support tasks.</li>
      </ul>
      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 mb-8">
        <p className="text-slate-600 italic">
          * Naive Bayes is especially famous in Natural Language Processing (NLP) because it works efficiently with high-dimensional text data.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        Simple Example: Spam Detection
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Suppose an email contains words like: <code className="text-emerald-800 bg-emerald-100 px-2 py-1 rounded">FREE, WINNER, MONEY, CLICK</code>
      </p>
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="font-bold text-emerald-900 mb-2">Naive Bayes calculates two things:</p>
        <ul className="list-none space-y-2 text-emerald-800 font-mono mb-4">
            <li>1. Probability (Spam | Email)</li>
            <li>2. Probability (Not Spam | Email)</li>
        </ul>
        <p className="text-emerald-900">
            It then predicts the class with the higher probability.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-4">
        Why is it Called "Naive"?
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The “naive” assumption is more specific than saying that features are always unrelated.
        Naive Bayes treats the features as <strong>conditionally independent once the class is known</strong>.
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-amber-900 mb-3">
          <strong>Spam example:</strong> suppose an email contains both <code className="bg-white px-1 rounded">FREE</code> and <code className="bg-white px-1 rounded">MONEY</code>.
        </p>
        <p className="text-amber-900 mb-3">When scoring the class <strong>Spam</strong>, the simple Naive Bayes idea is:</p>
        <div className="bg-white border border-amber-200 rounded-lg p-3 font-mono text-sm text-slate-800 mb-3 overflow-x-auto">
          P(FREE and MONEY | Spam) ≈ P(FREE | Spam) × P(MONEY | Spam)
        </div>
        <p className="text-slate-700">
          In real language, words can clearly be related. The assumption is therefore a simplification, not a statement that the real world is independent.
          Even so, this approximation can work well for many classification tasks, especially text.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Calculator className="mr-2 text-blue-600" /> Bayes’ Theorem Formulas
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Naive Bayes is built directly on Bayes’ Theorem. Bayes’ Theorem helps calculate <strong>conditional probability</strong> — the probability of an event <em>given</em> another event has occurred.
      </p>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-6 pr-4 rounded-r-md mb-8">
        <p className="font-bold text-blue-900 mb-3 text-lg">Bayes' Formula</p>
        <code className="text-2xl font-mono text-slate-900 block font-bold mb-4">
           P(A | B) = [ P(B | A) × P(A) ] / P(B)
        </code>
        <p className="text-blue-800 font-semibold mb-6">
           Posterior = (Likelihood × Prior) / Evidence
        </p>
        <h4 className="font-bold text-blue-900 mb-3">Terminology</h4>
        <ul className="space-y-4 text-lg text-blue-800">
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(A|B) Posterior:</strong> Updated probability of class A after observing evidence B.</li>
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(B|A) Likelihood:</strong> Probability of observing evidence B when class A is true.</li>
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(A) Prior:</strong> Probability of class A before observing the new evidence.</li>
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(B) Evidence:</strong> Overall probability of observing evidence B.</li>
        </ul>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-4">A Tiny Bayes Calculation</h3>
      <p className="text-lg text-slate-700 mb-4">
        Suppose past email data tells us:
      </p>
      <div className="not-prose overflow-x-auto mb-5">
        <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-50"><tr><th className="p-3 text-left">Given value</th><th className="p-3 text-left">Meaning</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-mono">P(Spam) = 0.40</td><td className="p-3">40% of emails are spam.</td></tr>
            <tr><td className="p-3 font-mono">P(Free | Spam) = 0.75</td><td className="p-3">75% of spam emails contain “free”.</td></tr>
            <tr><td className="p-3 font-mono">P(Free) = 0.36</td><td className="p-3">36% of all emails contain “free”.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-900 mb-2">Step 1 — Multiply</p>
          <p className="font-mono text-sm">0.75 × 0.40 = 0.30</p>
          <p className="text-xs text-blue-800 mt-2">Likelihood × prior</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-900 mb-2">Step 2 — Divide</p>
          <p className="font-mono text-sm">0.30 ÷ 0.36 ≈ 0.833</p>
          <p className="text-xs text-blue-800 mt-2">Divide by the evidence</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="font-bold text-emerald-900 mb-2">Result</p>
          <p className="font-mono text-sm">P(Spam | Free) ≈ 83.3%</p>
          <p className="text-xs text-emerald-800 mt-2">For these made-up teaching numbers.</p>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        <strong>Real-Life Analogy:</strong> A common probability example is medical testing: if a condition is rare but a test is positive, Bayes’ theorem updates the probability after observing that result. In real healthcare, diagnosis requires validated clinical evidence and cannot be reduced to one toy calculation.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Numerical Example */}
      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-indigo-600" /> Worked Numerical Example
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Let's predict whether a day is suitable for playing golf based on the weather outlook.
      </p>

      <div className="overflow-x-auto shadow-sm rounded-lg mb-8 border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Outlook (Feature)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Play Golf (Target)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-base">
            <tr><td className="px-6 py-3 font-mono">Sunny</td><td className="px-6 py-3 text-emerald-600 font-bold">Yes</td></tr>
            <tr><td className="px-6 py-3 font-mono bg-slate-50">Rainy</td><td className="px-6 py-3 bg-slate-50 text-rose-600 font-bold">No</td></tr>
            <tr><td className="px-6 py-3 font-mono">Sunny</td><td className="px-6 py-3 text-emerald-600 font-bold">Yes</td></tr>
            <tr><td className="px-6 py-3 font-mono bg-slate-50">Overcast</td><td className="px-6 py-3 bg-slate-50 text-emerald-600 font-bold">Yes</td></tr>
            <tr><td className="px-6 py-3 font-mono">Rainy</td><td className="px-6 py-3 text-rose-600 font-bold">No</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Step-by-Step Probability Calculation</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-6 text-lg text-slate-700 marker:text-indigo-600 marker:font-bold">
              <li>
                <strong>Step 1: Calculate Priors</strong>
                <div className="mt-2 font-mono bg-slate-50 p-3 rounded border text-base">
                  <p>Total rows = 5</p>
                  <p>P(Yes) = 3/5 = 0.6</p>
                  <p>P(No) = 2/5 = 0.4</p>
                </div>
              </li>
              <li>
                <strong>Step 2: Calculate Likelihoods</strong>
                <div className="mt-2 font-mono bg-slate-50 p-3 rounded border text-base">
                  <p>Looking at "Sunny":</p>
                  <p>P(Sunny | Yes) = 2/3 ≈ 0.666</p>
                </div>
              </li>
              <li>
                <strong>Step 3: Calculate the Evidence</strong>
                <div className="mt-2 font-mono bg-slate-50 p-3 rounded border text-base">
                  <p>Sunny appears 2 times out of 5 rows.</p>
                  <p>P(Sunny) = 2/5 = 0.4</p>
                </div>
              </li>
              <li>
                <strong>Step 4: Calculate the Posterior</strong>
                <div className="mt-2 font-mono bg-slate-50 p-3 rounded border text-base">
                  <p>P(Yes | Sunny) = [(2/3) × (3/5)] ÷ (2/5)</p>
                  <p>= 0.4 ÷ 0.4 = 1.0</p>
                  <p className="mt-2 text-slate-600 font-sans">In this tiny dataset, every Sunny example is labelled Yes, so the posterior becomes 100%. Real datasets are larger and less perfect.</p>
                </div>
              </li>
            </ol>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Types of Naive Bayes */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Types of Naive Bayes
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Naive Bayes is not a single algorithm — it is a family of classifiers, each designed for a different statistical distribution of features. The appropriate variant depends mainly on how the input features are represented and what probability distribution the model assumes for them.
      </p>

      {/* Simple NB family guide */}
      <div className="not-prose my-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">Choose the variant from the feature type</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-bold text-blue-800 mb-1">Gaussian NB</p><p className="text-sm text-slate-700">Continuous numbers</p><p className="text-xs text-slate-500 mt-1">Height, temperature</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="font-bold text-emerald-800 mb-1">Multinomial NB</p><p className="text-sm text-slate-700">Counts / frequencies</p><p className="text-xs text-slate-500 mt-1">Word counts</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-bold text-amber-800 mb-1">Bernoulli NB</p><p className="text-sm text-slate-700">Binary 0/1 features</p><p className="text-xs text-slate-500 mt-1">Word present?</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p className="font-bold text-rose-800 mb-1">Complement NB</p><p className="text-sm text-slate-700">Count-like text features</p><p className="text-xs text-slate-500 mt-1">Often useful with imbalance</p>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <p className="font-bold text-violet-800 mb-1">Categorical NB</p><p className="text-sm text-slate-700">Categorical features</p><p className="text-xs text-slate-500 mt-1">Weather type, colour</p>
          </div>
        </div>
      </div>

      {/* Detailed explanations */}
      <div className="not-prose space-y-6 mb-12">

        {/* Gaussian NB */}
        <div className="bg-white border border-blue-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-blue-600 px-6 py-4 flex items-center gap-3">
            <Activity className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-bold text-white text-lg">1. Gaussian Naive Bayes</h3>
              <p className="text-blue-200 text-xs">For continuous, real-valued features</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              Gaussian NB is used when your features are <strong>continuous numerical values</strong> — things like temperature, salary, height, or age. It assumes that within each class, the values of each feature follow a <strong>normal (Gaussian / bell-curve) distribution</strong>. During training, it estimates the mean (μ) and variance (σ²) of each feature for each class.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold text-slate-800 text-sm mb-2">How it works:</p>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal pl-4">
                  <li>For each class, calculate the mean and variance of every feature</li>
                  <li>For a new sample, compute how likely each feature value is under that class's Gaussian curve</li>
                  <li>Multiply all likelihoods together (naïve assumption) and pick the class with highest probability</li>
                </ol>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm mb-2">Real-world use cases:</p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                  <li>Medical diagnosis (blood pressure, glucose levels)</li>
                  <li>Fraud detection (transaction amounts, timing)</li>
                  <li>Weather classification (temperature, humidity)</li>
                  <li>Iris flower species classification</li>
                </ul>
              </div>
            </div>
            {/* Gaussian bell visual */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-3">Gaussian Distribution per class — each class has its own μ and σ</p>
              <svg viewBox="0 0 420 120" className="w-full max-w-lg mx-auto block" aria-label="Two Gaussian bell curves showing class 0 and class 1 feature distributions">
                <text x="210" y="115" textAnchor="middle" fontSize="9" fill="#94a3b8">Feature Value (e.g. Sepal Length)</text>
                <line x1="20" y1="105" x2="400" y2="105" stroke="#e2e8f0" strokeWidth="1"/>
                {/* Class 0 bell curve */}
                {Array.from({length:60},(_, i)=>{
                  const x=20+i*4, z=(x-130)/22, y=105-70*Math.exp(-0.5*z*z);
                  return i===0?null:<line key={i} x1={20+(i-1)*4} y1={105-70*Math.exp(-0.5*(((20+(i-1)*4)-130)/22)**2)} x2={x} y2={y} stroke="#3b82f6" strokeWidth="2.5"/>;
                })}
                {/* Class 1 bell curve */}
                {Array.from({length:60},(_, i)=>{
                  const x=20+i*4, z=(x-260)/28, y=105-70*Math.exp(-0.5*z*z);
                  return i===0?null:<line key={i} x1={20+(i-1)*4} y1={105-70*Math.exp(-0.5*(((20+(i-1)*4)-260)/28)**2)} x2={x} y2={y} stroke="#10b981" strokeWidth="2.5"/>;
                })}
                <text x="130" y="25" textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="700">Class 0</text>
                <text x="130" y="36" textAnchor="middle" fontSize="8" fill="#3b82f6">μ=5.0, σ=0.8</text>
                <text x="260" y="25" textAnchor="middle" fontSize="10" fill="#10b981" fontWeight="700">Class 1</text>
                <text x="260" y="36" textAnchor="middle" fontSize="8" fill="#10b981">μ=6.5, σ=1.0</text>
              </svg>
            </div>
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 text-slate-400 text-xs font-mono">Python — Gaussian Naive Bayes</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`from sklearn.naive_bayes import GaussianNB
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load dataset (continuous features: sepal/petal length & width)
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Gaussian NB — automatically estimates μ and σ per class per feature
model = GaussianNB()
model.fit(X_train, y_train)

# Class-conditional means learned during training:
print(model.theta_)   # shape: [n_classes, n_features] → mean per class
print(model.var_)     # shape: [n_classes, n_features] → variance per class

predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions):.2%}")
# Output with this split: Accuracy: 100.00%`}</pre>
            </div>
          </div>
        </div>

        {/* Multinomial NB */}
        <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-emerald-600 px-6 py-4 flex items-center gap-3">
            <TextSelect className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-bold text-white text-lg">2. Multinomial Naive Bayes</h3>
              <p className="text-emerald-200 text-xs">For count data — the NLP workhorse</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              Multinomial NB works with <strong>discrete count or frequency data</strong> — most commonly word counts in text classification tasks. It models the probability of observing a particular word count given the class. For example: if the word "free" appears 50 times in spam emails and only 3 times in legitimate emails, Multinomial NB captures this frequency ratio as evidence.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold text-slate-800 text-sm mb-2">How it works:</p>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal pl-4">
                  <li>Convert text into a word frequency matrix (Bag of Words / TF-IDF)</li>
                  <li>For each class, estimate the probability of each word appearing</li>
                  <li>For new text, combine the word evidence with the class prior and choose the class with the larger score</li>
                </ol>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm mb-2">Real-world use cases:</p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                  <li>Email spam classification (most common use)</li>
                  <li>Sentiment analysis of reviews</li>
                  <li>News article categorisation</li>
                  <li>Language identification</li>
                </ul>
              </div>
            </div>
            {/* Word frequency example */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">Example — Word frequency evidence for spam classification</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-100">
                      <th className="px-3 py-2 text-left font-bold text-emerald-900">Word</th>
                      <th className="px-3 py-2 text-center font-bold text-red-700">Spam freq</th>
                      <th className="px-3 py-2 text-center font-bold text-blue-700">Ham freq</th>
                      <th className="px-3 py-2 text-center font-bold text-emerald-900">More common in</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {word:'free', spam:142, ham:8, p:'Spam'},
                      {word:'money', spam:98, ham:12, p:'Spam'},
                      {word:'click', spam:87, ham:5, p:'Spam'},
                      {word:'meeting', spam:4, ham:156, p:'Ham'},
                      {word:'report', spam:6, ham:134, p:'Ham'},
                    ].map(r=>(
                      <tr key={r.word} className="border-t border-emerald-100 hover:bg-emerald-50">
                        <td className="px-3 py-2 font-mono font-bold text-slate-800">"{r.word}"</td>
                        <td className="px-3 py-2 text-center text-red-700 font-semibold">{r.spam}</td>
                        <td className="px-3 py-2 text-center text-blue-700 font-semibold">{r.ham}</td>
                        <td className="px-3 py-2 text-center font-bold text-emerald-700">{r.p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Bernoulli NB */}
        <div className="bg-white border border-amber-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-amber-600 px-6 py-4 flex items-center gap-3">
            <Binary className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-bold text-white text-lg">3. Bernoulli Naive Bayes</h3>
              <p className="text-amber-200 text-xs">For binary presence/absence features</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              Bernoulli NB is designed for <strong>binary feature vectors</strong> — each feature is either 0 (absent) or 1 (present). The key distinction from Multinomial NB is that Bernoulli NB cares only about <em>whether</em> a word appeared, not <em>how many times</em> it did. It also explicitly penalises the absence of words that are important to a class, which can make it useful for presence/absence data and some short-text tasks.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold text-slate-800 text-sm mb-2">Multinomial vs Bernoulli — key difference:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse border border-slate-200 rounded-lg overflow-hidden">
                    <thead><tr className="bg-slate-100"><th className="px-3 py-2 text-left">Aspect</th><th className="px-3 py-2 text-center text-emerald-700">Multinomial</th><th className="px-3 py-2 text-center text-amber-700">Bernoulli</th></tr></thead>
                    <tbody>
                      {[
                        {aspect:'Feature value', mult:'Word count (0,1,2,...)', bern:'Word present? (0 or 1)'},
                        {aspect:'Email "free free free"', mult:'free = 3', bern:'free = 1'},
                        {aspect:'Absent word impact', mult:'No penalty', bern:'Explicitly penalised'},
                        {aspect:'Typical representation', mult:'Counts / frequencies', bern:'Presence / absence'},
                      ].map(r=>(
                        <tr key={r.aspect} className="border-t border-slate-100">
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.aspect}</td>
                          <td className="px-3 py-2 text-center text-emerald-700">{r.mult}</td>
                          <td className="px-3 py-2 text-center text-amber-700">{r.bern}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm mb-2">Use cases:</p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                  <li>Short text / tweet classification</li>
                  <li>Document presence/absence features</li>
                  <li>Medical symptom checkers (symptom present or not)</li>
                  <li>Click-stream data (did user click? Y/N)</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 text-slate-400 text-xs font-mono">Python — Bernoulli Naive Bayes</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`from sklearn.naive_bayes import BernoulliNB
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

emails = [
    "win free money now",      # spam
    "click here for prize",    # spam
    "meeting tomorrow at 10",  # ham
    "quarterly report attached", # ham
]
labels = [1, 1, 0, 0]  # 1=spam, 0=ham

# binary=True converts word counts to 0/1 presence flags
vectorizer = CountVectorizer(binary=True)
X = vectorizer.fit_transform(emails)
# Each row: [0,1,0,0,1,...] — word present (1) or absent (0)

model = BernoulliNB()
model.fit(X, labels)

new_email = vectorizer.transform(["free prize click"])
print(model.predict(new_email))         # [1] → classified as SPAM
print(np.round(model.predict_proba(new_email), 3))
# [[0.053 0.947]] → about 94.7% spam in this tiny example`}</pre>
            </div>
          </div>
        </div>

        {/* Complement NB */}
        <div className="bg-white border border-rose-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-rose-600 px-6 py-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-white" />
            <div>
              <h3 className="font-bold text-white text-lg">4. Complement Naive Bayes</h3>
              <p className="text-rose-200 text-xs">For imbalanced datasets — a Multinomial NB improvement</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              Complement NB is an adaptation of Multinomial NB that is particularly suited to <strong>imbalanced datasets</strong>. It builds its weights using statistics from the <em>complement</em> of each class — the samples that are not in that class. It is especially associated with text classification and can be worth comparing with Multinomial NB when classes are uneven.
            </p>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-4">
              <p className="font-bold text-rose-900 text-sm mb-2">Why Complement? The imbalance problem:</p>
              <p className="text-rose-800 text-sm leading-relaxed">
                If 90% of the training documents are "Not Spam" and 10% are "Spam", the class counts are strongly imbalanced. Complement NB uses statistics from the <em>other</em> classes when building its weights, which can make its estimates more stable for this kind of text problem. You should still compare models using suitable validation metrics.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 text-slate-400 text-xs font-mono">Python — Complement NB (imbalanced dataset)</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`from sklearn.naive_bayes import ComplementNB
from sklearn.feature_extraction.text import TfidfVectorizer

# Complement NB is a drop-in replacement for MultinomialNB
# Best for: imbalanced text classification tasks
vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train_text)
X_test_tfidf  = vectorizer.transform(X_test_text)

model = ComplementNB(alpha=1.0)  # alpha = Laplace smoothing
model.fit(X_train_tfidf, y_train)
print(f"Accuracy: {model.score(X_test_tfidf, y_test):.2%}")`}</pre>
            </div>
          </div>
        </div>

        {/* Categorical NB */}
        <div className="bg-white border border-violet-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-violet-600 px-6 py-4">
            <h3 className="font-bold text-white text-lg">5. Categorical Naive Bayes</h3>
            <p className="text-violet-200 text-xs">For features that are categories</p>
          </div>
          <div className="p-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              Categorical NB is designed for features such as <strong>Weather = Sunny/Rainy</strong> or <strong>Colour = Red/Blue/Green</strong>.
              Each feature is treated as having its own categorical distribution within each class. In scikit-learn, the categories are represented with integer codes such as 0, 1, 2.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-violet-50 border border-violet-100 rounded-lg p-3"><strong>Sunny</strong><br/><span className="text-slate-500">→ 0</span></div>
              <div className="bg-violet-50 border border-violet-100 rounded-lg p-3"><strong>Rainy</strong><br/><span className="text-slate-500">→ 1</span></div>
              <div className="bg-violet-50 border border-violet-100 rounded-lg p-3"><strong>Overcast</strong><br/><span className="text-slate-500">→ 2</span></div>
            </div>
            <p className="text-sm text-slate-600 mt-3">These numbers are category codes, not measurements — “2” is not twice “1”.</p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-slate-800 px-6 py-4">
            <h3 className="font-bold text-white text-lg">Quick-Reference: Which Naive Bayes to Use?</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-bold text-slate-700">Variant</th>
                <th className="px-4 py-3 text-left font-bold text-slate-700">Feature Type</th>
                <th className="px-4 py-3 text-left font-bold text-slate-700">Best For</th>
                <th className="px-4 py-3 text-left font-bold text-slate-700">sklearn Class</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {v:'Gaussian NB', f:'Continuous (real numbers)', b:'Continuous numeric features', s:'GaussianNB()', row:'hover:bg-blue-50', text:'text-blue-700'},
                  {v:'Multinomial NB', f:'Counts / non-negative frequencies', b:'Text counts; TF-IDF can also work', s:'MultinomialNB()', row:'hover:bg-emerald-50', text:'text-emerald-700'},
                  {v:'Bernoulli NB', f:'Binary (0/1)', b:'Presence / absence features', s:'BernoulliNB()', row:'hover:bg-amber-50', text:'text-amber-700'},
                  {v:'Complement NB', f:'Count / TF-IDF-like non-negative features', b:'Text data, especially with imbalance', s:'ComplementNB()', row:'hover:bg-rose-50', text:'text-rose-700'},
                  {v:'Categorical NB', f:'Encoded categorical values', b:'Discrete categories per feature', s:'CategoricalNB()', row:'hover:bg-violet-50', text:'text-violet-700'},
                ].map(r=>(
                  <tr key={r.v} className={`${r.row} transition-colors`}>
                    <td className={`px-4 py-3 font-bold ${r.text}`}>{r.v}</td>
                    <td className="px-4 py-3 text-slate-600">{r.f}</td>
                    <td className="px-4 py-3 text-slate-600">{r.b}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-800 bg-slate-50 rounded">{r.s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertTriangle className="mr-2 text-rose-600" /> The Zero Probability Problem
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        In count-based variants such as Multinomial Naive Bayes, a word that never appeared in a class can receive an estimated probability of <strong>0</strong>.
        Multiplying by zero can wipe out that class score. Additive smoothing prevents this problem.
      </p>
      
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-6 text-lg">
        <p className="font-bold text-emerald-900 mb-2">Solution: Additive Smoothing</p>
        <p className="text-emerald-800">
          Add a small value α to the counts. When α = 1, this is commonly called <strong>Laplace smoothing</strong>.
        </p>
      </div>

      <div className="not-prose bg-white border border-slate-200 rounded-xl p-5 mb-10">
        <p className="font-bold text-slate-800 mb-3">Tiny smoothing example</p>
        <p className="text-sm text-slate-600 mb-3">Suppose “offer” appeared 0 times in a class, there are 10 total word counts, and our vocabulary has 5 words.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-slate-50 rounded-lg p-3"><strong>Step 1</strong><br/><span className="font-mono">0 + 1 = 1</span><br/><span className="text-slate-500">add α = 1</span></div>
          <div className="bg-slate-50 rounded-lg p-3"><strong>Step 2</strong><br/><span className="font-mono">10 + (1 × 5) = 15</span><br/><span className="text-slate-500">adjust denominator</span></div>
          <div className="bg-emerald-50 rounded-lg p-3"><strong>Result</strong><br/><span className="font-mono">1 ÷ 15 ≈ 0.067</span><br/><span className="text-slate-500">small, but not zero</span></div>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Code Implementations */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-3 text-indigo-600" /> Python Implementations
      </h2>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h4 className="font-bold text-indigo-800 text-xl">Python Code: Multinomial NB (Text Data)</h4>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

texts = ["win free money", "hello friend", "claim prize free"]
y = ["spam", "ham", "spam"]

# Convert text to frequency counts
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

# Train Model
model = MultinomialNB()
model.fit(X, y)

# Predict a new email
test_email = ["free money now"]
test_vector = vectorizer.transform(test_email)
prediction = model.predict(test_vector)

print(f"Prediction for '{test_email[0]}': {prediction[0]}")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">$ python nb_classifier.py</p>
          <p className="text-slate-300">Prediction for 'free money now': spam</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* Summary */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Advantages vs Disadvantages
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Fast:</strong> Training and prediction can be very efficient compared with many more complex models.</li>
            <li><strong>Useful for Text:</strong> Count-based variants are classic baselines for document and spam classification.</li>
            <li><strong>Parameter Efficient:</strong> It can estimate the needed class-conditional statistics from relatively modest amounts of data.</li>
            <li><strong>Multi-Class:</strong> Naturally compares scores across multiple classes.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Strong Assumption:</strong> Conditional independence can be unrealistic when features strongly depend on one another.</li>
            <li><strong>Unseen Counts:</strong> Count-based variants need additive smoothing to avoid zero-probability problems.</li>
            <li><strong>Probability Calibration:</strong> Predicted probabilities may be poorly calibrated even when class predictions are useful.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Common Questions
      </h2>
      <div className="space-y-4 mb-10">
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-800 mb-2">Is Naive Bayes only for text?</h3>
          <p className="text-slate-700">No. Text is a famous use case, but Gaussian NB can handle continuous numerical features and Categorical NB can model categorical features.</p>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-800 mb-2">Does Naive Bayes require the features to be truly independent?</h3>
          <p className="text-slate-700">No real dataset has to be perfectly independent. Conditional independence is the model's simplifying assumption; validation tells you whether that approximation works well enough for your task.</p>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-800 mb-2">Naive Bayes or Logistic Regression?</h3>
          <p className="text-slate-700">Both can be strong classification baselines. Compare them using validation data and a metric that matches the problem instead of assuming one is always better.</p>
        </div>
      </div>

      <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-10">
        <p className="font-bold text-indigo-900 mb-3">Continue Learning</p>
        <div className="flex flex-wrap gap-2">
          <Link to="/learn/classification-intro" className="px-3 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-100">Classification Overview</Link>
          <Link to="/learn/logistic-regression" className="px-3 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-100">Logistic Regression</Link>
          <Link to="/learn/confusion-matrix" className="px-3 py-2 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-100">Confusion Matrix</Link>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Naive Bayes is a classic probabilistic classification method built on Bayes' theorem. It combines a class prior with feature likelihoods to score possible classes for a new observation.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Its conditional-independence assumption is deliberately simple, yet Naive Bayes can still be a strong and very fast baseline in suitable problems, especially text classification.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Naive Bayes makes a strong conditional-independence assumption. The assumption is simple, so always validate the model — but the method can still work very well for suitable classification tasks."
         </p>
      </div>

    </>
  );
}
