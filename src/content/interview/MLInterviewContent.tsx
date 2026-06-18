import React from 'react';

export function MLInterviewContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Top Machine Learning Interview Questions</h1>

      <p className="text-lg leading-relaxed mb-4">
        Preparing for a Machine Learning interview requires demonstrating theoretical knowledge, practical coding ability, and strong problem-solving skills for open-ended system design.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Algorithm & Theory Questions</h2>
      
      <div className="space-y-6 my-6">
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Q1. Explain the Bias-Variance Tradeoff.</h3>
          <p className="text-slate-700 leading-relaxed">
            <strong>Answer:</strong> Bias is the simplifying assumptions made by a model to make the target function easier to learn (causing underfitting). Variance is the amount that the estimate of the target function will change if different training data was used (causing overfitting). The tradeoff is the tension between minimizing these two sources of error. As you increase model complexity, bias decreases but variance increases. The goal is to find the sweet spot that minimizes total error.
          </p>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Q2. What is the difference between Generative and Discriminative models?</h3>
          <p className="text-slate-700 leading-relaxed">
            <strong>Answer:</strong> A discriminative model (e.g., Logistic Regression, SVM) learns the decision boundary between classes, computing $P(Y|X)$. A generative model (e.g., Naive Bayes, GANs) learns the distribution of the individual classes themselves, computing $P(X|Y)$ and $P(X)$.
          </p>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Q3. How do you handle imbalanced datasets?</h3>
          <p className="text-slate-700 leading-relaxed">
            <strong>Answer:</strong> I would approach it in several ways: 1) Change the evaluation metric (use F1-score, Precision/Recall, ROC-AUC instead of Accuracy). 2) Try resampling techniques (SMOTE for oversampling minority, random undersampling for majority). 3) Use algorithms that handle imbalance well (tree-based models). 4) Use penalized learning algorithms that increase the cost of classifying the minority class incorrectly.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Coding & Implementation</h2>
      <p className="text-lg leading-relaxed mb-4">
        You may be asked to implement basic algorithms from scratch in Python to prove you understand the underlying mathematics.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm my-6 text-sm">
        <div className="bg-slate-50 px-4 py-3 border-b flex items-center">
          <span className="font-bold text-slate-800">Task: Implement a basic K-Means algorithm from scratch.</span>
        </div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono overflow-auto">
{`import numpy as np

def kmeans(X, k, max_iters=100):
    # 1. Randomly initialize centroids
    idx = np.random.choice(len(X), k, replace=False)
    centroids = X[idx]
    
    for _ in range(max_iters):
        # 2. Assign points to nearest centroid
        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        labels = np.argmin(distances, axis=1)
        
        # 3. Update centroids
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        
        # Check for convergence
        if np.all(centroids == new_centroids):
            break
        centroids = new_centroids
        
    return labels, centroids`}</pre>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Tips for FAANG / Big Tech Interviews</h2>
      <p className="text-lg leading-relaxed mb-4">
        Companies like Google, Facebook, Amazon, and Microsoft look for specific traits:
      </p>
      <ul className="list-disc pl-8 space-y-3 ms-4 mb-6 text-lg">
        <li><strong>System Design Matters:</strong> How would you build a recommendation system for Netflix? You need to discuss data ingestion, feature generation, candidate generation, ranking, and deployment serving latency.</li>
        <li><strong>Know the Assumptions:</strong> Don't just know how to call `model.fit()`. Be able to explain the statistical assumptions behind Linear Regression (Linearity, Homoscedasticity, Independence, Normality).</li>
        <li><strong>Deployment & MLOps:</strong> Often neglected by students. Know how you would monitor model drift and handle A/B testing in production.</li>
      </ul>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Common Mistakes to Avoid</h2>
      <ul className="list-disc pl-8 space-y-3 ms-4 mb-6 text-lg">
        <li>Applying Deep Learning to every problem. Start with baselines like Logistic Regression or Random Forests.</li>
        <li>Data Leakage during cross-validation (e.g., scaling data before splitting, rather than scaling the training fold and applying that transform to the validation fold).</li>
        <li>Not communicating your thought process during coding tasks.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Success in ML interviews comes from a balanced mastery of theoretical statistics, pragmatic implementation skills, and high-level system design. Ensure you can explain complex mathematical concepts in simple, intuitive language.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Interviewers care more about your problem-solving methodology than your memorization of formulas. When given a problem, start by asking clarifying questions, establish a dumb baseline model, and iteratively improve it while explicitly stating trade-offs.
        </p>
      </div>
    </div>
  );
}
