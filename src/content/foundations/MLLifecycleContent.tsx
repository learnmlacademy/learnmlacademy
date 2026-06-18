import React from "react";

// Inline SVG lifecycle diagram — synced to the exact 7 stage names below
function MLLifecycleSVG() {
  const stages = [
    { label: 'Problem Framing',         icon: '💡', color: '#6366f1', tools: 'Confluence · Notion · JIRA' },
    { label: 'Data Collection',         icon: '🗄️', color: '#8b5cf6', tools: 'SQL · APIs · Scrapy · Kafka' },
    { label: 'Data Preparation',        icon: '⚙️', color: '#06b6d4', tools: 'Pandas · NumPy · dbt · Spark' },
    { label: 'Model Training',          icon: '🧠', color: '#10b981', tools: 'Scikit-learn · PyTorch · TF' },
    { label: 'Model Evaluation',        icon: '📊', color: '#f59e0b', tools: 'MLflow · W&B · Evidently' },
    { label: 'Deployment',              icon: '🚀', color: '#ef4444', tools: 'Docker · FastAPI · AWS/GCP' },
    { label: 'Monitoring & Retraining', icon: '📡', color: '#ec4899', tools: 'Grafana · Prometheus · Airflow' },
  ];
  const W = 440, H = 440, cx = 220, cy = 220, r = 148;
  return (
    <figure className="my-6 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure — The 7-Stage ML Lifecycle (Iterative &amp; Continuous)
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto block"
          aria-label="Circular ML lifecycle diagram with 7 stages">
          <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5 3" />
          <circle cx={cx} cy={cy} r="54" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fill="#94a3b8" fontWeight="700">ML</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11" fill="#94a3b8">Lifecycle</text>
          {stages.map((s, i) => {
            const angle = (2 * Math.PI * i / stages.length) - Math.PI / 2;
            const nx = cx + r * Math.cos(angle);
            const ny = cy + r * Math.sin(angle);
            const tx = cx + (r + 40) * Math.cos(angle);
            const ty = cy + (r + 40) * Math.sin(angle);
            const a1 = angle + 0.28;
            const a2 = (2 * Math.PI * (i + 1) / stages.length) - Math.PI / 2 - 0.28;
            const ax1 = cx + (r - 22) * Math.cos(a1), ay1 = cy + (r - 22) * Math.sin(a1);
            const ax2 = cx + (r - 22) * Math.cos(a2), ay2 = cy + (r - 22) * Math.sin(a2);
            return (
              <g key={i}>
                <defs>
                  <marker id={`lca${i}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <path d="M0,0 L0,7 L7,3.5 z" fill={s.color} />
                  </marker>
                </defs>
                <path d={`M ${ax1} ${ay1} A ${r - 22} ${r - 22} 0 0 1 ${ax2} ${ay2}`}
                  fill="none" stroke={s.color} strokeWidth="1.8" strokeOpacity="0.4"
                  markerEnd={`url(#lca${i})`} />
                <circle cx={nx} cy={ny} r="23" fill={s.color} fillOpacity="0.13" stroke={s.color} strokeWidth="1.5" />
                <text x={nx} y={ny + 2} textAnchor="middle" dominantBaseline="middle" fontSize="16">{s.icon}</text>
                <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fontWeight="700" fill="#1e293b">{s.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

export function MLLifecycleContent() {
  const stages = [
    {
      num: 1, title: 'Problem Framing',
      tools: ['Confluence', 'Notion', 'JIRA', 'Miro'],
      toolColor: 'indigo',
      body: `Everything starts with the business problem. Before touching any data, data scientists and business stakeholders must answer: What is the exact problem we are trying to solve? Is Machine Learning actually required, or would simple rules suffice? What is the metric for success (e.g., "Reduce customer churn by 5%")?`,
      bullets: ['Define the ML objective and success metric', 'Identify stakeholders and constraints', 'Assess data availability and feasibility'],
    },
    {
      num: 2, title: 'Data Collection',
      tools: ['SQL', 'REST APIs', 'Scrapy', 'Apache Kafka', 'AWS S3'],
      toolColor: 'violet',
      body: 'Once the problem is defined, you must gather the historical data required to teach the machine.',
      bullets: ['Identify data sources: Databases, Third-party APIs, web scraping, sensors', 'Ensure legal compliance and privacy standards (GDPR, HIPAA)', 'Combine data from different silos into a central Data Lake or Warehouse'],
    },
    {
      num: 3, title: 'Data Preparation',
      tools: ['Pandas', 'NumPy', 'dbt', 'Apache Spark', 'Great Expectations'],
      toolColor: 'cyan',
      body: 'Raw data is almost always messy, incomplete, and noisy. This step often takes up to 70% of a Data Scientist\'s total project time.',
      bullets: ['Handle Missing Values: remove empty rows or impute with mean/median', 'Remove Duplicates & Outliers: filter extreme anomalies that confuse models', 'Feature Engineering: create new meaningful metrics from existing columns', 'Encoding: convert text categories into numerical data'],
    },
    {
      num: 4, title: 'Model Training',
      tools: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'XGBoost', 'Optuna'],
      toolColor: 'emerald',
      body: 'With clean data ready, it\'s time to build the brain.',
      bullets: ['Select the right algorithm (Linear Regression, Decision Tree, Neural Network) based on data size and problem type', 'Split data into Training Set (~80%) and Test Set (~20%)', 'Feed training data into the algorithm and iteratively minimise prediction errors'],
    },
    {
      num: 5, title: 'Model Evaluation',
      tools: ['MLflow', 'Weights & Biases', 'Evidently', 'Scikit-learn metrics'],
      toolColor: 'amber',
      body: 'Before deploying, the model is tested against the unseen Test Set to gauge its true generalisation performance.',
      bullets: ['Check Accuracy, Precision, Recall, F1-Score, ROC-AUC', 'Diagnose Overfitting: model memorises training data but fails on new data', 'Diagnose Underfitting: model fails to learn even training patterns', 'Use confusion matrix and learning curves for deeper diagnostics'],
    },
    {
      num: 6, title: 'Deployment',
      tools: ['Docker', 'FastAPI / Flask', 'AWS SageMaker', 'GCP Vertex AI', 'Kubernetes'],
      toolColor: 'red',
      body: 'A model provides zero business value sitting on a laptop. It must be deployed to production where it can serve real-time or batch predictions.',
      bullets: ['Package model as a REST API using FastAPI or Flask', 'Containerise with Docker for reproducible deployment', 'Host on cloud platforms: AWS SageMaker, GCP Vertex AI, Azure ML', 'Set up CI/CD pipelines for automated redeployment'],
    },
    {
      num: 7, title: 'Monitoring & Retraining',
      tools: ['Grafana', 'Prometheus', 'Apache Airflow', 'Evidently AI', 'Great Expectations'],
      toolColor: 'pink',
      body: 'Over time, real-world data changes (e.g., consumer behaviour shifts after a market event). This is called Data Drift and causes model accuracy to degrade gradually.',
      bullets: ['Monitor live prediction quality with dashboards', 'Detect Data Drift: statistical shifts in input distributions', 'Trigger automated retraining pipelines when drift exceeds threshold', 'Restart the lifecycle to keep the model accurate and relevant'],
    },
  ];

  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    violet: 'bg-violet-50 border-violet-200 text-violet-800',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    pink: 'bg-pink-50 border-pink-200 text-pink-800',
  };
  const headColors: Record<string, string> = {
    indigo: 'text-indigo-800', violet: 'text-violet-800', cyan: 'text-cyan-800',
    emerald: 'text-emerald-800', amber: 'text-amber-700', red: 'text-red-700', pink: 'text-pink-700',
  };

  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Machine Learning Lifecycle</h1>
      <p className="text-lg leading-relaxed mb-6">The Machine Learning Lifecycle is a comprehensive engineering process that dictates the steps necessary to build, deploy, and maintain a successful Machine Learning system. It is not a one-time process — it is a continuous iterative loop.</p>

      <MLLifecycleSVG />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-900 border-b pb-2">
        The 7 Stages of the ML Lifecycle
      </h2>

      <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden my-6 not-prose">
        <ul className="divide-y divide-slate-100 list-none pl-0 m-0">
          {stages.map(s => (
            <li key={s.num} className="p-6 hover:bg-slate-50 transition-colors">
              <h3 className={`text-xl font-bold mt-0 mb-2 ${headColors[s.toolColor]}`}>
                {s.num}. {s.title}
              </h3>
              <p className="text-slate-700 mb-3">{s.body}</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm mb-4">
                {s.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              {/* Tools row */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mr-1 self-center">Tools:</span>
                {s.tools.map(t => (
                  <span key={t} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorMap[s.toolColor]}`}>
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded mt-8 mb-8 not-prose">
        <h3 className="font-bold text-lg text-indigo-800 mb-2">Why the Lifecycle Matters</h3>
        <p className="text-indigo-900">
          Many organisations fail at ML because they skip straight to algorithm selection (Stage 4) without understanding the business problem or cleaning their data. Following this strict lifecycle ensures that models are reliable, ethical, maintainable, and aligned with real business goals.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Universal ML Considerations in Production</h2>
      <div className="space-y-5 mb-8 not-prose">
        {[
          { title: '1. Data Quality First', body: 'No algorithm compensates for irrelevant or unrepresentative data ("garbage in, garbage out"). Performance degrades severely with extreme outliers, high multicollinearity, or data that violates algorithm assumptions.' },
          { title: '2. Overfitting & Regularisation', body: 'If a model overfits (captures random noise instead of signal), introduce or increase regularisation constraints (Ridge, Lasso, Dropout). Regularisation penalises overly complex models and ensures generalisation.' },
          { title: '3. Feature Scaling & Dimensionality', body: 'Without proper scaling (Standardisation or Normalisation), features with large magnitudes dominate distance calculations or gradient updates. Under the "curse of dimensionality", high-dimensional spaces require PCA or feature selection.' },
          { title: '4. Computational Complexity', body: 'For time-critical, low-latency mobile or edge deployments, model size and inference speed matter as much as accuracy. Quantisation, pruning, and model distillation are common optimisation techniques.' },
          { title: '5. Continuous Monitoring & Retraining', body: '"Concept drift" (shifting data distributions over time) causes accuracy to degrade proportionally. Learning curves (Training vs. Validation loss over epochs) help diagnose whether a model has high bias or high variance.' },
        ].map(c => (
          <div key={c.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="text-base font-bold text-indigo-900 mb-1.5">{c.title}</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
