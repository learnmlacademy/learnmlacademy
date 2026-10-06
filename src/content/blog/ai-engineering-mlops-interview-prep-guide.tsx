import React from 'react';
import { Link } from 'react-router-dom';

export function AIEngineeringMLOpsInterviewPrepContent() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'ML Systems & Data Pipelines',
      items: [
        'Explain the path from raw data to features, training, validation, registry and production inference.',
        'Know the difference between batch, online and streaming inference and the latency requirements that drive each choice.',
        'Understand data validation, feature consistency, training-serving skew and reproducible datasets.',
        'Be ready to discuss orchestration, retries, idempotency and backfills in production pipelines.',
        'Know when a feature store is useful and when it adds unnecessary operational complexity.',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Experimentation, CI/CD & Deployment',
      items: [
        'Track experiments with parameters, metrics, artifacts, code version and data lineage.',
        'Explain model registries, promotion stages and how you decide whether a model is ready for production.',
        'Know unit tests, data tests, model tests and integration tests for an ML delivery pipeline.',
        'Understand canary releases, shadow deployments, blue-green deployment and rollback strategies.',
        'Be able to discuss containers, infrastructure configuration and environment reproducibility without tying the answer to one cloud.',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Monitoring, Drift & Reliability',
      items: [
        'Separate system monitoring from data-quality monitoring and model-performance monitoring.',
        'Know data drift, concept drift and model decay and why they require different responses.',
        'Discuss latency, throughput, error rates, cost, feature availability and prediction-quality signals.',
        'Explain alert thresholds, dashboards, incident response and when automated retraining is unsafe.',
        'Prepare an example where the model is technically healthy but the business KPI still degrades.',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'ML System Design Interviews',
      items: [
        'Clarify scale, latency, freshness, availability, privacy and business metrics before drawing architecture.',
        'Design the offline training path and online serving path separately, then connect them through shared data contracts.',
        'Discuss model choice only after defining constraints; simpler models often win when latency or explainability matters.',
        'Include monitoring, feedback loops, retraining triggers, rollback and failure handling in the design.',
        'Practise systems such as recommendations, fraud detection, ranking, forecasting and LLM/RAG services.',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-xl text-slate-600 leading-relaxed">
        AI Engineering and MLOps interviews test whether you can move beyond a notebook and design reliable systems. Prepare to connect data, training, deployment, monitoring and operational trade-offs.
      </p>

      {phases.map((phase) => (
        <section key={phase.phase} className="border-l-4 border-indigo-500 bg-white rounded-r-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">{phase.phase}</span>
            <h2 className="font-bold text-slate-900 text-xl">{phase.title}</h2>
          </div>
          <ul className="space-y-2">
            {phase.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Continue with MLOps & production interview scenarios</h3>
        <p className="text-slate-600 text-sm mb-4">
          Use the dedicated interview lesson for production debugging questions, then practise full ML system-design scenarios.
        </p>
        <Link to="/learn/mlops-production-interview" className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">
          MLOps Interview Scenarios →
        </Link>
      </div>
    </div>
  );
}
