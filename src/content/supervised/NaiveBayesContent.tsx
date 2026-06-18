import React from "react";
import {
  Brain, Calculator, Code, Layers, Briefcase, AlertTriangle, 
  CheckCircle, Activity, TextSelect, Binary, X as CloseIcon, Check, ArrowDown
} from "lucide-react";

export function NaiveBayesContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Naive Bayes Classifier</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-2 bg-slate-50 rounded-r-md shadow-sm">
        Naive Bayes is a probabilistic classifier based on applying Bayes’ Theorem with strong (naive) independence assumptions between the features.</p>

      {/* What is Naive Bayes? */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Briefcase className="mr-2 text-indigo-600" /> What is Naive Bayes?
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Naive Bayes is a supervised machine learning algorithm used mainly for classification problems. 
        It predicts the probability that a data point belongs to a particular class based on <strong className="text-indigo-700">Bayes' Theorem</strong> combined with a <strong className="text-indigo-700">Feature Independence Assumption</strong>.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Highly Effective For:
      </h3>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-3 text-lg leading-relaxed">
        <li><strong>Spam Detection:</strong> Filtering out junk emails.</li>
        <li><strong>Sentiment Analysis:</strong> Understanding positive/negative product reviews.</li>
        <li><strong>Document Classification:</strong> Organizing news articles into categories.</li>
        <li><strong>Medical Diagnosis:</strong> Predicting disease presence.</li>
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
        The word <strong>Naive</strong> comes from the assumption that <em>all input features are independent of each other</em>.
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-amber-900 mb-2">
          <strong>Example:</strong> Predicting whether a person buys a car based on their <strong>Income, Age, and Occupation</strong>.
        </p>
        <p className="text-amber-900 mb-2">Naive Bayes strictly assumes:</p>
        <ul className="list-disc pl-5 text-amber-800 space-y-2 mb-4 font-mono text-base">
          <li>Income does not affect Age</li>
          <li>Occupation does not affect Income</li>
        </ul>
        <p className="text-slate-600 italic">
          In real life this assumption is almost always false. However, surprisingly, the algorithm still works incredibly well.
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
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(A|B) Posterior:</strong> Final updated probability of class A given feature B.</li>
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(B|A) Likelihood:</strong> Probability of feature B existing given class A is true.</li>
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(A) Prior:</strong> Initial probability of class A.</li>
          <li><strong className="font-mono bg-white px-2 py-1 rounded">P(B) Evidence:</strong> Total mathematical probability of feature B across all.</li>
        </ul>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        <strong>Real-Life Analogy:</strong> Suppose a disease is rare, but a medical test is positive for a patient. Bayes’ theorem helps calculate the true <em>Probability that the patient actually has the disease</em>, after observing the positive test result (the evidence).
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
                <strong>Step 3: Posterior Calculation</strong>
                <div className="mt-2 font-mono bg-slate-50 p-3 rounded border text-base">
                  <p>P(Yes | Sunny) ∝ P(Sunny|Yes) × P(Yes)</p>
                  <p>∝ 0.666 × 0.6 ≈ 0.40</p>
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
        Naive Bayes is not a single algorithm — it is a family of classifiers, each designed for a different statistical distribution of features. Choosing the right variant is critical and depends entirely on the type of data you are working with.
      </p>

      {/* NB Types Tree */}
      <div className="not-prose my-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 overflow-x-auto">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">Figure — Naive Bayes Family Tree</p>
        <div className="flex flex-col items-center min-w-[560px]">
          <div className="bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow text-sm">Naive Bayes Classifier</div>
          <div className="w-0.5 bg-slate-300 h-6" />
          <div className="relative w-[85%] border-t-2 border-slate-300">
            {[0, 33, 66, 100].map(p => (
              <div key={p} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{left:`${p}%`, transform:'translateX(-50%)'}} />
            ))}
          </div>
          <div className="grid grid-cols-4 w-[90%] gap-3 mt-6">
            {[
              {name:'Gaussian NB', color:'blue', feature:'Continuous features', dist:'Normal distribution', eg:'Height, Salary, Temp'},
              {name:'Multinomial NB', color:'emerald', feature:'Count / frequency data', dist:'Multinomial distribution', eg:'Word counts in NLP'},
              {name:'Bernoulli NB', color:'amber', feature:'Binary features', dist:'Bernoulli distribution', eg:'Word present? (0/1)'},
              {name:'Complement NB', color:'rose', feature:'Imbalanced text data', dist:'Complement of classes', eg:'Spam detection'},
            ].map(t => (
              <div key={t.name} className={`bg-${t.color}-50 border border-${t.color}-200 rounded-xl p-3 text-center`}>
                <p className={`font-bold text-${t.color}-800 text-xs mb-1`}>{t.name}</p>
                <p className={`text-${t.color}-600 text-xs mb-1`}>{t.feature}</p>
                <p className="text-slate-400 text-xs italic">{t.eg}</p>
              </div>
            ))}
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
# Output: Accuracy: 97.37%`}</pre>
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
                  <li>For new text, multiply the word probabilities and classify via Bayes theorem</li>
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
                      <th className="px-3 py-2 text-center font-bold text-emerald-900">P(word|Spam)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {word:'free', spam:142, ham:8, p:'0.74'},
                      {word:'money', spam:98, ham:12, p:'0.65'},
                      {word:'click', spam:87, ham:5, p:'0.70'},
                      {word:'meeting', spam:4, ham:156, p:'0.02'},
                      {word:'report', spam:6, ham:134, p:'0.04'},
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
              Bernoulli NB is designed for <strong>binary feature vectors</strong> — each feature is either 0 (absent) or 1 (present). The key distinction from Multinomial NB is that Bernoulli NB cares only about <em>whether</em> a word appeared, not <em>how many times</em> it did. It also explicitly penalises the absence of words that are important to a class, making it particularly useful for short documents.
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
                        {aspect:'Best for', mult:'Long documents', bern:'Short texts / docs'},
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
print(model.predict_proba(new_email))   # [[0.04, 0.96]] → 96% spam`}</pre>
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
              Complement NB was developed to address a known weakness of Multinomial NB on <strong>imbalanced datasets</strong> — where one class has far more examples than another. Instead of modelling the probability of a document belonging to class C, it models the probability of it belonging to the <em>complement</em> (everything that is NOT class C) and uses that as evidence. Complement NB often outperforms Multinomial NB on real-world text classification benchmarks.
            </p>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-4">
              <p className="font-bold text-rose-900 text-sm mb-2">Why Complement? The imbalance problem:</p>
              <p className="text-rose-800 text-sm leading-relaxed">
                If 90% of your training data is "Not Spam" and only 10% is "Spam", Multinomial NB becomes biased toward predicting "Not Spam" simply because it has seen far more examples. Complement NB corrects this by estimating class probabilities from the <em>other</em> classes, making it more robust when class sizes are very unequal.
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
                  {v:'Gaussian NB', f:'Continuous (real numbers)', b:'Iris, medical, sensor data', s:'GaussianNB()', c:'blue'},
                  {v:'Multinomial NB', f:'Integer counts', b:'Long text, bag of words', s:'MultinomialNB()', c:'emerald'},
                  {v:'Bernoulli NB', f:'Binary (0/1)', b:'Short text, presence/absence', s:'BernoulliNB()', c:'amber'},
                  {v:'Complement NB', f:'Integer counts', b:'Imbalanced text datasets', s:'ComplementNB()', c:'rose'},
                ].map(r=>(
                  <tr key={r.v} className={`hover:bg-${r.c}-50 transition-colors`}>
                    <td className={`px-4 py-3 font-bold text-${r.c}-700`}>{r.v}</td>
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
        Suppose a word never appeared during training. Then its Probability becomes <strong>0</strong>. Because Naive Bayes multiplies all feature probabilities together, a single zero will make the entire prediction zero, ruining the algorithm.
      </p>
      
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-emerald-900 mb-2">Solution: Laplace Smoothing</p>
        <p className="text-emerald-800">
          Adds a small value (usually 1) to all counts, ensuring that no probability is ever strictly zero.
        </p>
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
            <li><strong>Very Fast:</strong> Calculates probabilities instantaneously.</li>
            <li><strong>NLP Standard:</strong> Excellent handling of text/words and documents.</li>
            <li><strong>Data Efficient:</strong> Works surprisingly well even with small datasets.</li>
            <li><strong>Multi-Class Prediction:</strong> Evaluates multiple category chances.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Naive Assumption:</strong> Ignores obvious correlations between features.</li>
            <li><strong>Zero Probabilities:</strong> Requires strict Laplace smoothing patches.</li>
            <li><strong>Poor Estimator:</strong> Raw probability output numbers are often inaccurate (though class wins are right).</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Naive Bayes is a cornerstone algorithm of statistical machine learning. Its foundation relies entirely on Bayes' Theorem and calculating conditional probabilities of historical events to accurately predict the future.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Despite the "naive" assumption—pretending that all input features are strictly independent—this algorithm often vastly outperforms highly complex models in high-dimensional datasets, particularly involving text classification (NLP).
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Naive Bayes relies on the fundamentally flawed assumption of total feature independence, yet paradoxically, it remains an effective algorithm in the real world for document classification."
         </p>
      </div>

    </>
  );
}
