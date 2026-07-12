import React from "react";
import { AnimatedMLLifecycle } from "../../components/diagrams/AnimatedFoundationDiagrams";

import { BookOpen } from "lucide-react";

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
    <figure className="my-10">
      <figcaption className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Figure — The 7-Stage ML Lifecycle (Iterative &amp; Continuous)
      </figcaption>
      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-6 rounded-r-md">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg mx-auto block"
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
      body: `Everything starts with the business problem. Before touching a single line of code, data scientists and business stakeholders must explicitly define: What is the exact problem we are trying to solve? Is Machine Learning actually required, or would simple SQL rules suffice? What is the strict mathematical metric for success?`,
      example: `A streaming company doesn't say "Make a recommendation engine." They frame the problem as: "Increase the average user's session length by 5 minutes within 6 months by predicting the highest probability TV show they will click next."`,
      bullets: ['Define the ML objective and success metric.', 'Identify stakeholders and engineering constraints.', 'Assess data availability and feasibility.'],
    },
    {
      num: 2, title: 'Data Collection',
      tools: ['SQL', 'REST APIs', 'Scrapy', 'Apache Kafka', 'AWS S3'],
      toolColor: 'violet',
      body: `Once the problem is mathematically defined, you must physically gather the historical data required to teach the machine. This involves tapping into internal databases, buying third-party datasets, or deploying sensors to gather new raw data.`,
      example: `To build a credit card fraud model, a bank must securely pipe 10 years of historical transaction logs (timestamps, locations, amounts) into a central data lake, ensuring all personally identifiable information (PII) like names and raw card numbers are legally hashed or anonymised.`,
      bullets: ['Identify data sources: SQL Databases, Third-party APIs, raw web scraping.', 'Ensure legal compliance and privacy standards (GDPR, HIPAA).', 'Combine data from different structural silos into a central Data Warehouse.'],
    },
    {
      num: 3, title: 'Data Preparation',
      tools: ['Pandas', 'NumPy', 'dbt', 'Apache Spark', 'Great Expectations'],
      toolColor: 'cyan',
      body: `Raw data is almost always messy, incomplete, heavily biased, and noisy. Data cleaning and preparation often takes up to 70% of a Data Scientist's total project time. If you skip this, your model will fail.`,
      example: `If predicting housing prices, you must decide what to do if 30% of the dataset is missing the "Square Footage" column. Do you delete those rows? Do you impute (guess) the missing values using the city average? You must also convert text categories ("Detached", "Condo") into mathematical numbers (0, 1) that the algorithm can actually calculate.`,
      bullets: ['Handle Missing Values: strategically remove rows or impute missing data.', 'Remove Outliers: filter extreme anomalies that will mathematically confuse models.', 'Feature Engineering: create new meaningful metrics (e.g., dividing "Price" by "Square Feet" to get "Price_Per_SqFt").'],
    },
    {
      num: 4, title: 'Model Training',
      tools: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'XGBoost', 'Optuna'],
      toolColor: 'emerald',
      body: `With highly cleaned data ready, it's time to build the "brain". You select an algorithm based on the data type (e.g., Random Forests for tabular data, Neural Networks for images), split the data to prevent cheating, and let the algorithm mathematically fit its internal parameters to the historical patterns.`,
      example: `An engineer splits a dataset of 10,000 spam emails into an 8,000-email "Training Set" and a 2,000-email "Test Set". They feed the 8,000 emails into a Logistic Regression algorithm, which calculates the mathematical probability that the word "Prince" and "Wire Transfer" equate to Spam.`,
      bullets: ['Select the right algorithm based on data size and the architectural problem type.', 'Strictly split data into Training Sets (~80%) and Hold-Out Test Sets (~20%).', 'Feed training data into the algorithm and iteratively minimise its prediction errors.'],
    },
    {
      num: 5, title: 'Model Evaluation',
      tools: ['MLflow', 'Weights & Biases', 'Evidently', 'Scikit-learn metrics'],
      toolColor: 'amber',
      body: `Before deploying, the model is strictly tested against the completely unseen "Test Set" to gauge its true generalisation performance. A model that scores 100% on its training data is likely "overfitting" (memorising the answers rather than learning the concepts).`,
      example: `A medical AI diagnosing cancer might boast 99% accuracy. However, during evaluation, engineers realise it only achieved this by predicting "Healthy" for everyone, because 99% of the dataset was actually healthy patients. They must switch to evaluation metrics like 'Recall' to ensure it correctly flags the 1% who are actually sick.`,
      bullets: ['Check Accuracy, Precision, Recall, F1-Score, and ROC-AUC.', 'Diagnose Overfitting: model memorises training data but fails terribly on new data.', 'Diagnose Underfitting: model fails to learn even basic training patterns.'],
    },
    {
      num: 6, title: 'Deployment',
      tools: ['Docker', 'FastAPI / Flask', 'AWS SageMaker', 'GCP Vertex AI', 'Kubernetes'],
      toolColor: 'red',
      body: `A highly accurate model provides absolutely zero business value sitting on a data scientist's laptop. It must be wrapped in software engineering, containerised, and deployed to a live production environment where it can serve real-time predictions to end-users.`,
      example: `The final fraud detection model is exported as a file, wrapped in a Python FastAPI web server, containerised into a Docker image, and deployed to AWS. Now, when a user swipes their card at a store, the live cash register pings the AWS endpoint, getting a "Fraud: Yes/No" prediction in 50 milliseconds.`,
      bullets: ['Package the mathematical model as a live REST API using FastAPI.', 'Containerise with Docker for reproducible deployment across servers.', 'Set up CI/CD pipelines for automated redeployment of newer model versions.'],
    },
    {
      num: 7, title: 'Monitoring & Retraining',
      tools: ['Grafana', 'Prometheus', 'Apache Airflow', 'Evidently AI', 'Great Expectations'],
      toolColor: 'pink',
      body: `The world changes; models do not. Over time, real-world data shifts (e.g., consumer purchasing behaviour completely changing due to a viral trend). This is called Data Drift, and it causes model accuracy to degrade silently but rapidly in production.`,
      example: `An AI trained in 2019 to predict airline ticket prices based on historical trends failed catastrophically in 2020 when the pandemic hit. The monitoring system detected massive mathematical anomalies in the live prediction requests, alerting engineers to pause the model and retrain it on fresh 2020 data.`,
      bullets: ['Monitor live prediction quality and latency with engineering dashboards.', 'Detect Data Drift: calculate statistical shifts in live input distributions vs training distributions.', 'Trigger automated retraining pipelines when drift exceeds safety thresholds.'],
    },
  ];

  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-100 border-indigo-200 text-indigo-900',
    violet: 'bg-violet-100 border-violet-200 text-violet-900',
    cyan: 'bg-cyan-100 border-cyan-200 text-cyan-900',
    emerald: 'bg-emerald-100 border-emerald-200 text-emerald-900',
    amber: 'bg-amber-100 border-amber-200 text-amber-900',
    red: 'bg-red-100 border-red-200 text-red-900',
    pink: 'bg-pink-100 border-pink-200 text-pink-900',
  };
  const bgMap: Record<string, string> = {
    indigo: 'bg-indigo-50 border-indigo-400',
    violet: 'bg-violet-50 border-violet-400',
    cyan: 'bg-cyan-50 border-cyan-400',
    emerald: 'bg-emerald-50 border-emerald-400',
    amber: 'bg-amber-50 border-amber-400',
    red: 'bg-red-50 border-red-400',
    pink: 'bg-pink-50 border-pink-400',
  };
  const headColors: Record<string, string> = {
    indigo: 'text-indigo-800', violet: 'text-violet-800', cyan: 'text-cyan-800',
    emerald: 'text-emerald-800', amber: 'text-amber-700', red: 'text-red-700', pink: 'text-pink-700',
  };

  return (
    <>
      <MLLifecycleSVG />

      <h2 className="text-2xl font-bold mt-12 mb-8 text-slate-900 border-b pb-2">
        The 7 Stages of the ML Lifecycle
      </h2>

      <div className="space-y-8 mb-12">
        {stages.map(s => (
          <div key={s.num} className={`pl-4 border-l-4 ${bgMap[s.toolColor]} py-4 pr-6 rounded-r-md`}>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-4">
              <h3 className={`text-xl font-bold m-0 ${headColors[s.toolColor]}`}>
                Stage {s.num}: {s.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide mr-1 self-center">Tools:</span>
                {s.tools.map(t => (
                  <span key={t} className={`text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm ${colorMap[s.toolColor]}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-lg text-slate-800 leading-relaxed mb-4">{s.body}</p>
      <AnimatedMLLifecycle />

            <p className="text-lg text-slate-700 italic leading-relaxed mb-4 font-medium">
               <strong>Real-World Example:</strong> {s.example}
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 text-lg">
              {s.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 text-white p-8 rounded-xl relative overflow-hidden mt-12 mb-12 shadow-lg">
        <BookOpen className="absolute right-4 top-4 h-24 w-24 text-slate-700 opacity-30" />
        <h4 className="text-xl font-bold mt-0 border-b border-slate-600 pb-3 mb-4 text-amber-400">
          Why the Lifecycle Fails in Reality
        </h4>
        <p className="text-lg text-slate-200 leading-relaxed">
          Statistically, the vast majority of enterprise Machine Learning projects fail to ever reach production. Why? Because teams skip straight to algorithm selection (Stage 4) without actually defining a measurable business problem (Stage 1), or they fail to invest engineering hours into data cleaning pipelines (Stage 3). Furthermore, models deployed without continuous monitoring (Stage 7) will inevitably degrade and cause financial damage due to Concept Drift. Following this strict lifecycle ensures that models are reliable, ethical, maintainable, and aligned with real business goals.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 border-b pb-2 text-slate-800">Universal ML Engineering Considerations</h2>
      <div className="space-y-6 mb-12">
        {[
          { title: 'Data Quality First', body: 'No algorithm, no matter how advanced, can mathematically compensate for irrelevant, heavily biased, or unrepresentative data ("garbage in, garbage out"). Model performance degrades severely with extreme outliers, high multicollinearity, or data that violates fundamental algorithmic assumptions.' },
          { title: 'Overfitting & Regularisation', body: 'If a model overfits (it captures random background noise instead of the true signal), engineers must introduce regularisation constraints (like Ridge, Lasso, or Dropout layers). Regularisation mathematically penalises overly complex models and forces them to generalise.' },
          { title: 'Feature Scaling & Dimensionality', body: 'Without proper scaling (Standardisation or Min-Max Normalisation), features with large numerical magnitudes (like "Salary: 100,000") will completely mathematically dominate smaller features (like "Age: 35") during gradient updates. Furthermore, under the "curse of dimensionality", datasets with thousands of columns require Dimensionality Reduction (like PCA).' },
        ].map(c => (
          <div key={c.title} className="pl-4 border-l-4 border-slate-400 bg-white py-2 mb-4">
            <h4 className="text-lg font-bold text-slate-800 mb-2">{c.title}</h4>
            <p className="text-slate-700 text-lg leading-relaxed m-0">{c.body}</p>
          </div>
        ))}
      </div>

            
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">Glossary of Key Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Data Ingestion</p>
          <p className="text-slate-700 text-base leading-relaxed">The automated process of extracting, obtaining, and importing raw data from various sources for immediate use or storage.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Feature Engineering</p>
          <p className="text-slate-700 text-base leading-relaxed">The mathematical process of using domain knowledge to extract new, predictive features from raw data to improve model accuracy.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Hyperparameter Tuning</p>
          <p className="text-slate-700 text-base leading-relaxed">The systematic process of searching for the optimal combination of model configuration settings to yield the highest performance.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Model Deployment</p>
          <p className="text-slate-700 text-base leading-relaxed">The final engineering step of integrating a trained machine learning model into a live production environment to serve predictions.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-6">
        The Machine Learning lifecycle is a rigid, iterative process that transforms raw data into reliable, automated decision-making engines. Skipping steps or rushing to model training without proper data preparation almost guarantees failure in production.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Machine Learning is mostly Data Engineering and Software Engineering. Training the algorithm (Stage 4) is often the easiest and fastest part of the entire lifecycle. The true difficulty lies in correctly framing the business problem, building robust data ingestion pipelines, and deploying reliable, monitored API endpoints that can safely serve live traffic without degrading over time.
        </p>
      </div>
    </>
  );
}
