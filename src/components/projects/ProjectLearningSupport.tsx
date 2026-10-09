import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ListChecks } from 'lucide-react';
import { projectPortfolio } from '../../data/projectPortfolio';

type Experiment = { prediction: string; experiment: string; evidence: string; caution: string };

const experiments: Record<string, Experiment> = {
  'titanic-survival': {
    prediction: 'Predict how passenger class and fare may affect the result before running the app.',
    experiment: 'Change one passenger input at a time while keeping the others fixed.',
    evidence: 'Record both predicted survival probabilities and explain what changed.',
    caution: 'Kaggle competition data requires an account and acceptance of its rules; synthetic examples are not substitute evaluation data.',
  },
  'house-price': {
    prediction: 'Predict whether a larger property would receive a higher estimate.',
    experiment: 'Change one area or quality input at a time.',
    evidence: 'Record the two estimates and calculate the difference in sale-price units.',
    caution: 'Treat predictions as historic dataset estimates, not current professional valuations.',
  },
  'credit-card-fraud': {
    prediction: 'Predict what happens to false alarms when the decision threshold is lowered.',
    experiment: 'Compare the reported validation precision and recall at two candidate thresholds.',
    evidence: 'Calculate TP / (TP + FP) and TP / (TP + FN) from measured counts.',
    caution: 'Never retune the threshold using the sealed test set.',
  },
  'customer-segmentation': {
    prediction: 'Predict which customer group would need a re-engagement campaign.',
    experiment: 'Compare each cluster\'s measured recency, order frequency and spending before naming it.',
    evidence: 'Explain whether the cluster profiles actually support your group names.',
    caution: 'Cluster numbers do not have fixed business meanings; the RFM-based names are interpretive.',
  },
  'retail-forecasting': {
    prediction: 'Predict whether last week\'s sales would beat a simple rolling-average forecast.',
    experiment: 'Compare the actual chronological validation errors of two lag-based forecasts.',
    evidence: 'Compute a mean absolute error from the held-out daily differences.',
    caution: 'One-day-ahead forecasts using observed prior days are not 28-day recursive future forecasts.',
  },
  'movie-recommender': {
    prediction: 'Predict whether two movies with similar genres will rank highly together.',
    experiment: 'Compare popularity, content-based and hybrid recommendations for one title.',
    evidence: 'Record the top results and the measured held-out Hit Rate@10 where available.',
    caution: 'Synthetic user ratings in the teaching dataset are not real Netflix user behaviour.',
  },
  'disaster-tweets': {
    prediction: 'Decide whether a figurative message sounds like a real emergency before classifying it.',
    experiment: 'Enter fictional examples with literal and metaphorical uses of disaster words.',
    evidence: 'Record model outputs and explain possible false positives and false negatives.',
    caution: 'This classifier does not verify actual emergencies or replace emergency alerts.',
  },
  'digit-recognizer': {
    prediction: 'Predict which handwriting shapes the 8×8 trained CNN may confuse.',
    experiment: 'Try an original single-digit image and inspect the resized 8×8 input.',
    evidence: 'Compare the predicted label with all ten probabilities and the test confusion matrix.',
    caution: 'Phone photographs are different from the small built-in training images.',
  },
  'ai-content-creator': {
    prediction: 'Predict how the same brief will differ in a friendly post versus a formal email.',
    experiment: 'Compare two formats using the same verified factual brief.',
    evidence: 'Inspect the actual structured JSON and distinguish template mode from real LLM mode.',
    caution: 'A template is not an AI model; real provider calls may cost money.',
  },
  'pdf-rag': {
    prediction: 'Predict which document page contains the answer to a sample question.',
    experiment: 'Ask one supported and one deliberately unsupported question.',
    evidence: 'Check retrieved page citations, matching quotations and the abstention case.',
    caution: 'Never treat a generated answer without supporting document evidence as verified.',
  },
  'ai-research-assistant': {
    prediction: 'Predict what evidence is required to answer an open research question.',
    experiment: 'Compare a source-supported claim with one absent from the collected source text.',
    evidence: 'Trace exact quotations and source identifiers to the final report.',
    caution: 'Offline teaching examples are not independent live research.',
  },
  'model-to-production': {
    prediction: 'Predict how an API should respond to an invalid model input.',
    experiment: 'Send one valid and one deliberately invalid test request to the local service.',
    evidence: 'Record the response and identify the corresponding automated test.',
    caution: 'Public deployment needs authentication, budget limits and rate limiting.',
  },
};

const steps = [
  'Understand the problem, inputs, expected result and limitations.',
  'Download the complete source and read START_HERE.txt and README.md.',
  'Create a project-specific environment, install requirements and obtain permitted data.',
  'Run the documented tests, train or build the actual application, and inspect artifacts.',
  'Perform the prediction experiment below and explain the observed results.',
];

export function ProjectLearningSupport({ projectId, children }: { projectId: string; children: React.ReactNode }) {
  const project = projectPortfolio.find(item => item.id === projectId);
  const challenge = experiments[projectId];
  const [complete, setComplete] = useState<number[]>([]);
  const storageKey = 'learnmlacademy.project-progress.' + projectId;

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setComplete(Array.isArray(saved) ? saved.filter((item): item is number => Number.isInteger(item) && item >= 0 && item < steps.length) : []);
    } catch {
      setComplete([]);
    }
  }, [storageKey]);

  if (!project || !challenge) return <>{children}</>;

  const toggle = (index: number) => {
    const next = complete.includes(index) ? complete.filter(n => n !== index) : [...complete, index].sort();
    setComplete(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Browsers may disable local storage. */ }
  };
  const pythonVersion = projectId === 'titanic-survival' ? '3.13' : '3.12';

  return (
    <>
      <nav aria-label="Project handbook quick actions" className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 pt-4 text-sm sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 font-semibold text-slate-800 hover:border-indigo-400">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
        </Link>
        <a href="#project-build-checkpoints" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 font-semibold text-indigo-800 hover:border-indigo-400">
          <ListChecks className="h-4 w-4" aria-hidden="true" /> My build checklist
        </a>
        <a href={'/project-starters/' + projectId + '.zip'} download={projectId + '-starter.zip'} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-700 px-4 font-semibold text-white hover:bg-indigo-800">
          <Download className="h-4 w-4" aria-hidden="true" /> Download complete source
        </a>
      </nav>
      {children}
      <section id="project-build-checkpoints" aria-labelledby="project-build-heading" className="mx-auto my-10 max-w-6xl scroll-mt-8 px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 id="project-build-heading" className="text-2xl font-extrabold text-slate-950">Your build checkpoints — {project.shortTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Keep the full handbook and all source code visible above. These optional checkpoints help you track what you can actually build and explain. Progress is saved only in this browser.
          </p>
          <p className="mt-3 text-sm font-bold text-indigo-800" role="status">{complete.length} of {steps.length} checkpoints completed</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Project checkpoints completed" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={complete.length}>
            <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: (complete.length / steps.length * 100) + '%' }} />
          </div>
          <ol className="mt-5 space-y-3">
            {steps.map((step, index) => (
              <li key={index}>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm leading-6 text-slate-800 focus-within:ring-2 focus-within:ring-indigo-600">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-indigo-700" checked={complete.includes(index)} onChange={() => toggle(index)} />
                  <span><strong>Step {index + 1}.</strong> {step}</span>
                </label>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-indigo-50 p-4">
              <h3 className="font-extrabold text-slate-950">Predict → change → observe → explain</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700"><strong>Before:</strong> {challenge.prediction}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700"><strong>Try:</strong> {challenge.experiment}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700"><strong>Show your evidence:</strong> {challenge.evidence}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-extrabold text-slate-950">Environment setup on your computer</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Unzip the source first, open its project folder in VS Code, then read its README for dataset/download instructions. Python {pythonVersion} is the documented starting version for this project; follow its README if it specifies a more exact patch release.
              </p>
              <details className="mt-3 rounded-lg border border-slate-200 p-3">
                <summary className="cursor-pointer font-bold text-indigo-800">Windows PowerShell commands</summary>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-slate-100">{'py -' + pythonVersion + ' -m venv .venv\n.\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt\n.\\.venv\\Scripts\\python.exe -m pip check'}</pre>
              </details>
              <details className="mt-2 rounded-lg border border-slate-200 p-3">
                <summary className="cursor-pointer font-bold text-indigo-800">macOS / Linux commands</summary>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-6 text-slate-100">{'python' + pythonVersion + ' -m venv .venv\n.venv/bin/python -m pip install -r requirements.txt\n.venv/bin/python -m pip check'}</pre>
              </details>
              <p className="mt-3 text-xs leading-5 text-slate-600">No global package installation or machine-wide policy changes are necessary. For Windows, explicit environment Python avoids PowerShell activation-policy issues. PyTorch or downloaded datasets may require substantial disk space.</p>
            </div>
          </div>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"><strong>Important limitation:</strong> {challenge.caution}</p>
        </div>
      </section>
    </>
  );
}
