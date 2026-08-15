import React from "react";
import { BookOpen } from "lucide-react";

// Simple, classroom-style lifecycle overview. Kept intentionally static and mobile-friendly.
function MLLifecycleOverview() {
  const stages = [
    { num: 1, title: 'Problem Framing', question: 'What should we solve?' },
    { num: 2, title: 'Data Collection', question: 'What examples do we need?' },
    { num: 3, title: 'Data Preparation', question: 'Is the data clean and usable?' },
    { num: 4, title: 'Model Training', question: 'Can a model learn the pattern?' },
    { num: 5, title: 'Model Evaluation', question: 'Does it work on unseen data?' },
    { num: 6, title: 'Deployment', question: 'How will people use it?' },
    { num: 7, title: 'Monitoring & Retraining', question: 'Is it still working well?' },
  ];

  return (
    <figure className="my-8">
      <figcaption className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        The ML Lifecycle — One Step at a Time
      </figcaption>
      <div className="max-w-2xl mx-auto space-y-2">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.num}>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-800">
                {stage.num}
              </div>
              <div>
                <p className="font-bold text-slate-900 m-0">{stage.title}</p>
                <p className="text-sm text-slate-600 m-0">{stage.question}</p>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="text-center text-slate-400 font-bold" aria-hidden="true">↓</div>
            )}
          </React.Fragment>
        ))}
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
      body: `Everything starts with the business problem. Before touching a single line of code, data scientists and business stakeholders should define: What exact problem are we trying to solve? Is Machine Learning actually required, or would simple rules be enough? What clear, measurable result will tell us that the solution is useful?`,
      example: `A streaming company doesn't say "Make a recommendation engine." They frame the problem as: "Increase the average user's session length by 5 minutes within 6 months by predicting the highest probability TV show they will click next."`,
      bullets: ['Define the ML objective and success metric.', 'Identify stakeholders and engineering constraints.', 'Assess data availability and feasibility.'],
    },
    {
      num: 2, title: 'Data Collection',
      tools: ['SQL', 'REST APIs', 'Scrapy', 'Apache Kafka', 'AWS S3'],
      toolColor: 'violet',
      body: `Once the problem and success measure are clear, you gather the historical or live data needed to teach the machine. This can come from internal databases, approved third-party datasets, APIs, sensors, application logs, surveys, or other relevant sources.`,
      example: `To build a credit card fraud model, a bank must securely pipe 10 years of historical transaction logs (timestamps, locations, amounts) into a central data lake, ensuring all personally identifiable information (PII) like names and raw card numbers are legally hashed or anonymised.`,
      bullets: ['Identify data sources: SQL Databases, Third-party APIs, raw web scraping.', 'Ensure legal compliance and privacy standards (GDPR, HIPAA).', 'Combine relevant data from different sources into a reliable storage or processing system, such as a data lake or data warehouse.'],
    },
    {
      num: 3, title: 'Data Preparation',
      tools: ['Pandas', 'NumPy', 'dbt', 'Apache Spark', 'Great Expectations'],
      toolColor: 'cyan',
      body: `Raw data is often messy, incomplete, biased, duplicated, or noisy. Cleaning and preparation can take a large share of an ML project's effort. If important data-quality problems are ignored, model performance can become unreliable.`,
      example: `If predicting housing prices, you must decide what to do if 30% of the dataset is missing the "Square Footage" column. Do you delete those rows? Do you impute (guess) the missing values using the city average? You must also convert text categories ("Detached", "Condo") into mathematical numbers (0, 1) that the algorithm can actually calculate.`,
      bullets: ['Handle Missing Values: strategically remove rows or impute missing data.', 'Investigate Outliers: decide whether extreme values are genuine cases, data-entry errors, or values that need special treatment.', 'Feature Engineering: create new meaningful metrics (e.g., dividing "Price" by "Square Feet" to get "Price_Per_SqFt").'],
    },
    {
      num: 4, title: 'Model Training',
      tools: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'XGBoost', 'Optuna'],
      toolColor: 'emerald',
      body: `With prepared data ready, it is time to train candidate models. You select an algorithm suited to the problem and data, separate data for training and evaluation, and let the algorithm learn useful patterns from the training examples.`,
      example: `An engineer splits a dataset of 10,000 spam emails into an 8,000-email "Training Set" and a 2,000-email "Test Set". They feed the 8,000 emails into a Logistic Regression algorithm, which calculates the mathematical probability that the word "Prince" and "Wire Transfer" equate to Spam.`,
      bullets: ['Select the right algorithm based on data size and the architectural problem type.', 'Separate training data from evaluation data. Depending on the project, this may use train/validation/test sets or cross-validation rather than one fixed percentage.', 'Feed the training data into the algorithm so it can learn model parameters or rules that reduce prediction error.'],
    },
    {
      num: 5, title: 'Model Evaluation',
      tools: ['MLflow', 'Weights & Biases', 'Evidently', 'Scikit-learn metrics'],
      toolColor: 'amber',
      body: `Before deployment, the model should be evaluated on data that was not used to fit it. Validation data or cross-validation is commonly used while choosing models and settings, while a final held-out test set can provide a cleaner estimate of performance on new data. A model that performs extremely well on training data but poorly on new data may be overfitting.`,
      example: `A medical AI diagnosing cancer might boast 99% accuracy. However, during evaluation, engineers realise it only achieved this by predicting "Healthy" for everyone, because 99% of the dataset was actually healthy patients. They must switch to evaluation metrics like 'Recall' to ensure it correctly flags the 1% who are actually sick.`,
      bullets: ['Check Accuracy, Precision, Recall, F1-Score, and ROC-AUC.', 'Diagnose Overfitting: model memorises training data but fails terribly on new data.', 'Diagnose Underfitting: model fails to learn even basic training patterns.'],
    },
    {
      num: 6, title: 'Deployment',
      tools: ['Docker', 'FastAPI / Flask', 'AWS SageMaker', 'GCP Vertex AI', 'Kubernetes'],
      toolColor: 'red',
      body: `A useful model must eventually be made available where the application or business process can use its predictions. Deployment might be a real-time API, a scheduled batch job, an embedded model, or another production setup depending on the problem.`,
      example: `The final fraud detection model is exported as a file, wrapped in a Python FastAPI web server, containerised into a Docker image, and deployed to AWS. Now, when a user swipes their card at a store, the live cash register pings the AWS endpoint, getting a "Fraud: Yes/No" prediction in 50 milliseconds.`,
      bullets: ['Package the model in a form the application can use, such as a REST API or scheduled batch prediction job.', 'Containerise with Docker for reproducible deployment across servers.', 'Set up CI/CD pipelines for automated redeployment of newer model versions.'],
    },
    {
      num: 7, title: 'Monitoring & Retraining',
      tools: ['Grafana', 'Prometheus', 'Apache Airflow', 'Evidently AI', 'Great Expectations'],
      toolColor: 'pink',
      body: `The world can change after a model is deployed. If the distribution of incoming data changes, this is called data drift. If the relationship between inputs and the correct outcome changes, this is called concept drift. Either can reduce model quality, so production systems need monitoring.`,
      example: `Imagine an airline-price model trained mainly on pre-2020 travel patterns. A sudden event such as the pandemic could make those old patterns much less useful. Monitoring would help engineers notice unusual changes, investigate performance, and decide whether the model needs to be paused, adjusted, or retrained on newer data.`,
      bullets: ['Monitor live prediction quality and latency with engineering dashboards.', 'Watch for data drift and, when labels become available, changes in prediction quality or concept drift.', 'Review and retrain the model when monitoring shows that performance or data has changed enough to require it.'],
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
      <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900 border-b pb-2">
        What is the Machine Learning Lifecycle?
      </h2>
      <p className="text-lg text-slate-800 leading-relaxed mb-4">
        The <strong>Machine Learning lifecycle</strong> is the step-by-step journey of turning a real problem and raw data into a model that can be used safely in the real world. It is not just "train a model and finish". A useful ML system must first solve the right problem, learn from suitable data, be tested carefully, and continue to be checked after deployment.
      </p>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-lg mb-6">
        <p className="text-lg text-slate-800 m-0">
          <strong>Think of it like a school project:</strong> first decide the question, collect information, clean it, build the solution, test it, present it, and later improve it when something changes.
        </p>
      </div>

      <MLLifecycleOverview />

      <h2 className="text-2xl font-bold mt-12 mb-5 text-slate-900 border-b pb-2">
        One Simple Example: Predicting House Prices
      </h2>
      <p className="text-lg text-slate-800 leading-relaxed mb-4">
        Suppose we want to build a small ML system that predicts a house price from information such as area and number of rooms. The same example can travel through all seven lifecycle stages.
      </p>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-3">Stage</th>
              <th className="border border-slate-300 p-3">What happens in simple words?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1. Problem', 'Decide: predict the selling price of a house.'],
              ['2. Collect Data', 'Gather past houses with area, rooms, location and actual selling price.'],
              ['3. Prepare Data', 'Fix missing values, remove obvious data-entry errors and convert useful categories into model-ready values.'],
              ['4. Train', 'Let the algorithm learn how house features are related to price.'],
              ['5. Evaluate', 'Give it houses it did not train on and compare predicted prices with actual prices.'],
              ['6. Deploy', 'Put the model in an app where a user enters house details and receives a predicted price.'],
              ['7. Monitor', 'Check whether predictions remain useful as neighbourhood prices and market conditions change.'],
            ].map(([stage, action]) => (
              <tr key={stage}>
                <td className="border border-slate-300 p-3 font-semibold text-slate-900 whitespace-nowrap">{stage}</td>
                <td className="border border-slate-300 p-3 text-slate-700">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          Many Machine Learning projects struggle to reach or remain successful in production when teams jump straight to algorithm selection (Stage 4) without defining a measurable problem (Stage 1), or when data preparation and production engineering are treated as afterthoughts. Models can also lose usefulness when data or real-world behaviour changes after deployment. Following a structured, iterative lifecycle makes it easier to build systems that are reliable, maintainable, responsible, and aligned with real goals.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 border-b pb-2 text-slate-800">Universal ML Engineering Considerations</h2>
      <div className="space-y-6 mb-12">
        {[
          { title: 'Data Quality First', body: 'No algorithm can reliably rescue a project built on irrelevant, badly biased, or unrepresentative data ("garbage in, garbage out"). Data problems should be investigated in context: some extreme values are genuine, some models are sensitive to multicollinearity, and different algorithms make different assumptions.' },
          { title: 'Overfitting & Regularisation', body: 'If a model overfits (it learns training-specific noise instead of patterns that generalise), regularisation can be one useful remedy. Techniques such as Ridge, Lasso, or Dropout reduce certain forms of model complexity, while other approaches include collecting better data, simplifying the model, or tuning it more carefully.' },
          { title: 'Feature Scaling & Dimensionality', body: 'Feature scaling matters especially for distance-based and gradient-based methods because variables with very different numerical scales can influence calculations unevenly. Tree-based models are generally much less sensitive to scaling. Very high-dimensional data can also become difficult for some methods, so feature selection or dimensionality reduction such as PCA may be useful when appropriate.' },
        ].map(c => (
          <div key={c.title} className="pl-4 border-l-4 border-slate-400 bg-white py-2 mb-4">
            <h4 className="text-lg font-bold text-slate-800 mb-2">{c.title}</h4>
            <p className="text-slate-700 text-lg leading-relaxed m-0">{c.body}</p>
          </div>
        ))}
      </div>

            
      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2">Common Questions About the ML Lifecycle</h2>
      <div className="space-y-4 mb-12">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Why is the ML lifecycle iterative?</h3>
          <p className="text-slate-700 text-lg leading-relaxed m-0">Because later stages can reveal new problems. For example, monitoring may show that incoming data has changed, sending the team back to data collection, preparation, training, and evaluation.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Is model training the most important stage?</h3>
          <p className="text-slate-700 text-lg leading-relaxed m-0">Training is important, but it cannot compensate for an unclear problem, poor-quality data, weak evaluation, or missing monitoring. A reliable ML system depends on the complete lifecycle.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Does every deployed model need a real-time API?</h3>
          <p className="text-slate-700 text-lg leading-relaxed m-0">No. Some models return predictions instantly through an API, while others run once per hour, day, or week as batch jobs. Deployment should match the real problem.</p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-12">
        <p className="text-lg text-slate-800 m-0">
          <strong>Continue learning:</strong> later lessons explain important lifecycle stages in more detail, including <a href="/learn/handling-missing-data" className="text-indigo-700 font-semibold underline underline-offset-2">Handling Missing Data</a>, <a href="/learn/train-test-split" className="text-indigo-700 font-semibold underline underline-offset-2">Train/Test Split</a>, <a href="/learn/overfitting-underfitting" className="text-indigo-700 font-semibold underline underline-offset-2">Overfitting &amp; Underfitting</a>, and <a href="/learn/online-learning" className="text-indigo-700 font-semibold underline underline-offset-2">Online Learning</a>.
        </p>
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
        The Machine Learning lifecycle is a structured, iterative process that turns a real problem and data into a model that can be evaluated, deployed, monitored, and improved. The stages are connected, and teams often move backward as well as forward when they discover new information.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          In production ML projects, a large share of the work often happens outside model training. Problem framing, reliable data, careful evaluation, deployment, and monitoring can matter just as much as the choice of algorithm. A strong model is useful only when the whole system around it is trustworthy and maintainable.
        </p>
      </div>
    </>
  );
}
