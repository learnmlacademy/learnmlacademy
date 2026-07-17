import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import {
  BookOpen, Code2, Layers, Award, ArrowRight,
  ChevronDown, ChevronUp, CheckCircle2, Download,
  Brain, BarChart3, Zap, TrendingUp, FlaskConical,
  Cpu, Target, Pencil
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { NewsletterSignup } from '../components/NewsletterSignup';

/* ─── Category card ─── */
const MODULE_ICONS = [Brain, Code2, BarChart3, Layers, Zap, TrendingUp, FlaskConical, Cpu, Target, BookOpen];
const MODULE_COLORS = [
  'from-indigo-500 to-purple-600', 'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',    'from-violet-500 to-indigo-600',
  'from-cyan-500 to-blue-600',    'from-teal-500 to-emerald-600',
  'from-orange-500 to-red-600',   'from-pink-500 to-rose-600',
];

function ModuleCard({ cat, index }: { cat: typeof curriculum[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const preview = cat.subtopics.slice(0, 5);
  const extra   = cat.subtopics.length - 5;
  const Icon    = MODULE_ICONS[index % MODULE_ICONS.length];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`bg-gradient-to-br ${MODULE_COLORS[index % MODULE_COLORS.length]} p-4 flex items-center gap-3`}>
        <div className="bg-white/20 rounded-xl p-2">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold text-white text-sm leading-tight flex-1">{cat.title}</h3>
        <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
          {cat.subtopics.length}
        </span>
      </div>
      <div className="p-4">
        <ul className="space-y-1">
          {(open ? cat.subtopics : preview).map(t => (
            <li key={t.id}>
              <Link to={`/learn/${t.id}`}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 py-1 px-2 rounded-lg hover:bg-indigo-50 transition-colors">
                <CheckCircle2 className="w-3 h-3 text-slate-300 flex-shrink-0" />
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
        {extra > 0 && (
          <button onClick={() => setOpen(o => !o)}
            className="mt-2 w-full flex items-center justify-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-lg transition-colors">
            {open
              ? <><ChevronUp className="w-3 h-3" />Show less</>
              : <><ChevronDown className="w-3 h-3" />+{extra} more</>}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Frequently studied topics ─── */
const POPULAR = [
  { id: 'gradient-descent',         label: 'Gradient Descent' },
  { id: 'bias-variance',            label: 'Bias-Variance Tradeoff' },
  { id: 'random-forest',            label: 'Random Forest' },
  { id: 'cross-validation',         label: 'Cross-Validation' },
  { id: 'confusion-matrix',         label: 'Confusion Matrix & Metrics' },
  { id: 'xgboost',                  label: 'XGBoost' },
  { id: 'overfitting-underfitting',  label: 'Overfitting vs Underfitting' },
  { id: 'pca',                      label: 'PCA' },
  { id: 'svm',                      label: 'SVM' },
  { id: 'ml-interview-questions',   label: 'ML Interview Q&A' },
  { id: 'knn',                      label: 'K-Nearest Neighbors' },
  { id: 'decision-trees',           label: 'Decision Trees' },
  { id: 'linear-regression',        label: 'Linear Regression' },
  { id: 'logistic-regression',      label: 'Logistic Regression' },
  { id: 'feature-engineering',      label: 'Feature Engineering' },
  { id: 'regularization',           label: 'Regularisation' },
];

/* ─── Sample code (pulled verbatim from RandomForestContent) ─── */
const SAMPLE_CODE = `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

data = load_iris()
X, y = data.data, data.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
accuracy    = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy * 100:.1f}%")

importances = model.feature_importances_
print("Feature importances:", importances.round(3))`;

const SAMPLE_OUTPUT = `Accuracy: 100.0%
Feature importances: [0.108  0.030  0.440  0.422]`;

/* ─── Homepage ─── */
export function HomePage() {
  useEffect(() => {
    document.title = 'ML Academy — Learn Machine Learning with Structured Tutorials & Code';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content',
      'Free Machine Learning tutorials with structured curriculum, 190+ Python code examples, and interview preparation. 63 topics across 10 modules. No login required.');
    let can = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!can) {
      can = document.createElement('link');
      can.setAttribute('rel', 'canonical');
      document.head.appendChild(can);
    }
    can.setAttribute('href', 'https://www.learnmlacademy.com');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <WebsiteSchema />

      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-600 rounded-full opacity-10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">

          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
            <Award className="w-3.5 h-3.5" />
            Free · No login · No videos · Structured notes and code
          </div>

          {/* headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-5">
            Learn Machine Learning
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
              the structured way
            </span>
          </h1>

          {/* subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            A code-first ML reference with 63 tutorials, 190+ runnable Python examples,
            and structured curriculum — from foundations to advanced topics.
            Built for learning, revision, and interview preparation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/curriculum"
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5">
              Explore Curriculum <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/cheatsheet"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-8 py-4 rounded-xl text-lg border border-white/20 transition-all">
              <Download className="w-5 h-5" /> Interview Cheat Sheet
            </Link>
          </div>

          {/* stats */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { value: '63',   label: 'Tutorials',       icon: BookOpen },
              { value: '10',   label: 'Modules',         icon: Layers   },
              { value: '190+', label: 'Code Examples',   icon: Code2    },
              { value: 'Free', label: 'Forever',         icon: Award    },
            ].map(s => (
              <div key={s.label}
                className="flex items-center gap-2.5 bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                <s.icon className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-base">{s.value}</span>
                <span className="text-slate-400 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. FREQUENTLY STUDIED TOPICS
      ══════════════════════════════════════════════ */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-base font-bold text-slate-700 uppercase tracking-widest">
              Frequently studied topics
            </h2>
            <Link to="/curriculum"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
              Browse all 63 topics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map(t => (
              <Link key={t.id} to={`/learn/${t.id}`}
                className="bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-medium text-sm px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md">
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. CURRICULUM OVERVIEW
      ══════════════════════════════════════════════ */}
      <section id="curriculum" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Curriculum</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                63 tutorials across 10 modules
              </h2>
              <p className="text-slate-500 mt-2 max-w-xl">
                Follow the structured path from foundations to advanced topics — or jump to any module directly.
              </p>
            </div>
            <Link to="/curriculum"
              className="flex-shrink-0 inline-flex items-center gap-2 border border-indigo-300 text-indigo-600 hover:bg-indigo-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              Full curriculum <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {curriculum.map((cat, i) => (
              <div key={cat.id}><ModuleCard cat={cat} index={i} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. INTERVIEW CHEAT SHEET
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">

              {/* left — copy */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-4">
                  Free download
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                  ML Interview Cheat Sheet
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  100 ML interview questions with detailed answers — covering algorithms,
                  evaluation metrics, Python implementations, system design, and the most common
                  mistakes that cost candidates offers.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    '25+ theory questions with worked answers',
                    '5 coding implementations from scratch',
                    'System design frameworks',
                    'FAANG interview tips',
                    '8 common mistakes and how to fix them',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/cheatsheet"
                  className="inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all text-sm self-start">
                  <Download className="w-4 h-4" /> Get Free PDF
                </Link>
              </div>

              {/* right — preview cards */}
              <div className="bg-white/5 p-8 md:p-10 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-white/10">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  What's inside
                </p>
                {[
                  { q: 'What is the Bias-Variance Tradeoff?',         diff: 'Easy'   },
                  { q: 'How does data leakage happen and why is it dangerous?', diff: 'Medium' },
                  { q: 'Implement K-Means from scratch in Python',    diff: 'Medium' },
                  { q: 'Design a recommendation system end-to-end',   diff: 'Hard'   },
                  { q: 'Explain L1 vs L2 regularisation with examples', diff: 'Medium' },
                ].map(({ q, diff }) => {
                  const dc = { Easy: 'bg-emerald-500/20 text-emerald-300', Medium: 'bg-amber-500/20 text-amber-300', Hard: 'bg-red-500/20 text-red-300' }[diff];
                  return (
                    <div key={q} className="bg-white/8 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                      <p className="text-slate-200 text-xs leading-snug">{q}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${dc}`}>{diff}</span>
                    </div>
                  );
                })}
                <Link to="/learn/ml-interview-questions"
                  className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1 mt-1 transition-colors">
                  View full ML Interview Q&A <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. SAMPLE TUTORIAL PREVIEW
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">
                Tutorial preview
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                What the tutorials look like
              </h2>
              <p className="text-slate-500 mt-1.5 text-sm">
                Every tutorial has a clear explanation, a labelled diagram, and runnable Python code with actual output.
              </p>
            </div>
            <Link to="/learn/random-forest"
              className="flex-shrink-0 inline-flex items-center gap-2 border border-indigo-300 text-indigo-600 hover:bg-indigo-50 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              Read full tutorial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-md">
            {/* tutorial header */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Module 5 — Ensemble Learning</p>
                <p className="font-bold text-slate-900">Random Forest Classifier</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full">Intermediate</span>
            </div>

            {/* brief explanation */}
            <div className="bg-white px-6 py-5 border-b border-slate-200">
              <p className="text-slate-700 text-sm leading-relaxed">
                A Random Forest trains <strong>100 decision trees</strong>, each on a random sample of your data,
                then takes a majority vote for predictions. Because each tree sees different data and different
                features at each split, their errors are independent — and independent errors average out.
                This is why a Random Forest almost always outperforms a single decision tree without any
                extra tuning.
              </p>
            </div>

            {/* code block */}
            <div>
              <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-2 border-b border-slate-700">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 text-xs font-mono ml-2">random_forest_example.py</span>
              </div>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm leading-relaxed p-6 overflow-x-auto m-0">
                <code>{SAMPLE_CODE}</code>
              </pre>

              {/* output */}
              <div className="bg-slate-950 border-t border-slate-700 px-6 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">Output</span>
                </div>
                <pre className="text-emerald-400 font-mono text-sm leading-relaxed m-0 overflow-x-auto">
                  <code>{SAMPLE_OUTPUT}</code>
                </pre>
              </div>
            </div>

            {/* CTA bar */}
            <div className="bg-indigo-50 border-t border-indigo-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-indigo-800 text-sm font-medium">
                The full tutorial explains bootstrap sampling, feature importance, hyperparameter tuning, and when to use Random Forest vs XGBoost.
              </p>
              <Link to="/learn/random-forest"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Read full tutorial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. NEWSLETTER
      ══════════════════════════════════════════════ */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>

    </div>
  );
}
