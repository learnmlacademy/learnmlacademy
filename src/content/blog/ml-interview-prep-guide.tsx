import React from 'react';

export function MLInterviewPrepContent() {
  return (
    <div className="space-y-8">
      <p className="text-xl text-slate-600 leading-relaxed">
        Getting an ML engineer role at a top tech company requires preparation across four distinct areas. This guide breaks down exactly what to study, how to prepare, and what interviewers are actually looking for.
      </p>

      {[
        {
          phase: "Phase 1", title: "ML Theory & Algorithms", color: "indigo",
          items: [
            "Know the maths behind Linear and Logistic Regression — gradient descent, loss functions, regularisation",
            "Be able to explain any algorithm in 60 seconds using plain English, then go deeper if asked",
            "Bias-variance tradeoff — be able to diagnose overfitting and underfitting from learning curves",
            "Evaluation metrics — know when to use accuracy vs F1 vs AUC, and why",
            "Ensemble methods — Random Forest, XGBoost, AdaBoost — explain the key differences",
          ]
        },
        {
          phase: "Phase 2", title: "Coding & Python", color: "blue",
          items: [
            "Implement K-Means, KNN, linear regression from scratch using only NumPy",
            "Be fluent with Pandas — groupby, merge, pivot, handling missing data",
            "sklearn Pipeline — understand why it is essential and how to use it correctly",
            "Feature engineering — log transforms, one-hot encoding, target encoding",
            "SQL — GROUP BY, window functions, subqueries are commonly tested",
          ]
        },
        {
          phase: "Phase 3", title: "ML System Design", color: "emerald",
          items: [
            "Use the SCALE framework: Scope, Components, Algorithms, Learning, Evaluation",
            "Classic problems: recommendation system, fraud detection, content moderation, ETA prediction",
            "Always discuss: data collection, feature engineering, model choice WITH justification, deployment, monitoring",
            "Know how to handle class imbalance, cold start problems, concept drift",
            "Mention A/B testing and how you would measure success in production",
          ]
        },
        {
          phase: "Phase 4", title: "Behavioural & Communication", color: "amber",
          items: [
            "Use STAR method: Situation, Task, Action, Result for all experience questions",
            "Have 3 strong ML project stories ready — one success, one failure with learnings, one collaborative",
            "Practise explaining complex concepts to a non-technical audience",
            "Show intellectual curiosity — ask thoughtful questions at the end",
            "Google specifically asks about data ethics and fairness — be prepared",
          ]
        },
      ].map((phase) => (
        <div key={phase.phase} className={`border-l-4 border-${phase.color}-500 bg-white rounded-r-2xl p-6 shadow-sm`}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`bg-${phase.color}-100 text-${phase.color}-700 text-xs font-bold px-3 py-1 rounded-full`}>{phase.phase}</span>
            <h2 className="font-bold text-slate-900 text-xl">{phase.title}</h2>
          </div>
          <ul className="space-y-2">
            {phase.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bg-slate-900 rounded-2xl p-8">
        <h3 className="text-white font-bold text-xl mb-4">📥 Free Download</h3>
        <p className="text-slate-300 mb-4">
          Get our complete 100-question ML Interview Cheatsheet — covering all four phases above with detailed answers.
        </p>
        <a href="/ML_Interview_Cheatsheet.pdf" download
          className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          Download Free PDF →
        </a>
      </div>
    </div>
  );
}
