import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import {
  BookOpen, Target, Award, ArrowRight, ChevronDown, ChevronUp,
  Brain, Code2, BarChart3, Layers, Zap, Users, Star, CheckCircle2,
  GraduationCap, TrendingUp, FlaskConical, Cpu, Download, Pencil
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { NewsletterSignup } from '../components/NewsletterSignup';

const PREVIEW = 5;

function CategoryCard({ category, index }: { category: typeof curriculum[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const shown = open ? category.subtopics : category.subtopics.slice(0, PREVIEW);
  const extra = category.subtopics.length - PREVIEW;
  const icons = [Brain, Code2, BarChart3, Layers, Zap, TrendingUp, FlaskConical, Cpu, Target, BookOpen];
  const Icon = icons[index % icons.length];
  const colors = [
    'from-indigo-500 to-purple-600', 'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600', 'from-violet-500 to-indigo-600',
    'from-cyan-500 to-blue-600', 'from-teal-500 to-emerald-600',
    'from-orange-500 to-red-600', 'from-pink-500 to-rose-600',
  ];
  const bg = colors[index % colors.length];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className={`bg-gradient-to-br ${bg} p-5 flex items-center gap-3`}>
        <div className="bg-white/20 rounded-xl p-2.5 backdrop-blur-sm">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-white text-base leading-tight">{category.title}</h3>
        <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {category.subtopics.length} topics
        </span>
      </div>
      <div className="p-4">
        <ul className="space-y-1.5">
          {shown.map(topic => (
            <li key={topic.id}>
              <Link to={`/learn/${topic.id}`}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 py-1 px-2 rounded-lg hover:bg-indigo-50 transition-colors group/link">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-indigo-400 flex-shrink-0 transition-colors" />
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
        {extra > 0 && (
          <button onClick={() => setOpen(!open)}
            className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-lg transition-colors">
            {open ? <><ChevronUp className="w-3.5 h-3.5" />Show less</> : <><ChevronDown className="w-3.5 h-3.5" />+{extra} more topics</>}
          </button>
        )}
      </div>
    </div>
  );
}

const stats = [
  { value: '90+', label: 'In-depth tutorials', icon: BookOpen },
  { value: '10', label: 'Learning modules', icon: Layers },
  { value: '100%', label: 'Free forever', icon: Award },
  { value: '500+', label: 'Code examples', icon: Code2 },
];

const features = [
  {
    icon: GraduationCap, title: 'Structured curriculum',
    desc: 'Designed from ground-up — foundations to production MLOps. No jumping around, no gaps.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Code2, title: 'Code-first approach',
    desc: 'Every concept backed by real, runnable Python. scikit-learn, PyTorch, XGBoost — all included.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: BarChart3, title: 'Visual explanations',
    desc: 'Diagrams, charts, and interactive examples that make abstract math intuitive and memorable.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Target, title: 'Interview ready',
    desc: 'Quizzes, comparison tables, and real-world scenarios that prepare you for ML engineer interviews.',
    color: 'bg-rose-50 text-rose-600',
  },
];

const path = [
  { step: '01', title: 'ML Foundations', desc: 'Types of ML, the learning lifecycle, Python ecosystem', color: 'border-indigo-400 bg-indigo-50' },
  { step: '02', title: 'Data Mastery', desc: 'EDA, preprocessing, feature engineering & encoding', color: 'border-purple-400 bg-purple-50' },
  { step: '03', title: 'Core Algorithms', desc: 'Regression, classification, decision trees, SVM, KNN', color: 'border-cyan-400 bg-cyan-50' },
  { step: '04', title: 'Advanced ML', desc: 'Ensembles, boosting, unsupervised, time series', color: 'border-emerald-400 bg-emerald-50' },
  { step: '05', title: 'Deep Learning', desc: 'Neural networks, deep learning, modern architectures', color: 'border-amber-400 bg-amber-50' },
  { step: '06', title: 'Production ML', desc: 'Model evaluation, tuning, deployment, monitoring', color: 'border-rose-400 bg-rose-50' },
];

export function HomePage() {
  useEffect(() => {
    document.title = 'ML Academy — Learn Machine Learning from Zero to Expert';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Free machine learning tutorials covering Linear Regression, Decision Trees, Neural Networks and more. Learn ML with Python code examples from beginner to expert.');
    }
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.setAttribute('href', 'https://www.learnmlacademy.com');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://www.learnmlacademy.com');
      document.head.appendChild(canonical);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <WebsiteSchema />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-600 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-current" /> Free · No sign-up · 90+ tutorials
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
            Learn Machine Learning
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
              the Right Way
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            A structured, expert-written curriculum from absolute beginner to production ML engineer.
            Real code. Real examples. Labelled diagrams. Zero fluff.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={`/learn/${curriculum[0].subtopics[0].id}`}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5">
              Start Learning <ArrowRight className="w-5 h-5" />
            </Link>
            <button onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all border border-white/20 backdrop-blur-sm">
              View Curriculum <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-14">
            {stats.map(s => (
              <div key={s.label} className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-xl px-5 py-3 backdrop-blur-sm">
                <s.icon className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-lg">{s.value}</span>
                <span className="text-slate-400 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">Why ML Academy?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Built for serious learners</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING PATH ── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">Structured journey</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Your 6-phase learning roadmap</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">Follow the path in order, or jump to any topic. Everything is interlinked.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {path.map((p, i) => (
              <div key={p.step} className={`border-l-4 ${p.color} rounded-xl p-6 relative`}>
                <span className="text-5xl font-black text-slate-200 absolute top-4 right-5 select-none">{p.step}</span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phase {i + 1}</p>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section id="curriculum" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">Complete curriculum</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">90+ tutorials across 10 modules</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">
              From Python basics to deploying production models — every topic you need to become an ML engineer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {curriculum.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CHEATSHEET BANNER ── */}
      <section className="py-14 bg-slate-900 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-3">
              <Award className="w-4 h-4"/> Free Resource
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">ML Interview Cheatsheet PDF</h2>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              100 essential ML interview questions with detailed answers — covering algorithms, evaluation, Python, deep learning and real FAANG system design questions.
            </p>
            <div className="flex flex-wrap gap-3 mt-4 text-sm text-slate-400">
              {["100 questions","15 sections","FAANG questions included","Instant download"].map(f=>(
                <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-400"/>{f}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <a href="/ML_Interview_Cheatsheet.pdf" download
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-indigo-500/30 whitespace-nowrap">
              <Download className="w-5 h-5"/> Download Free PDF
            </a>
            <Link to="/cheatsheet" className="text-slate-400 hover:text-white text-sm transition-colors">
              Preview what's inside →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-20 bg-white border-b border-slate-100 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-2">
                <Pencil className="w-4 h-4"/> Latest articles
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">From the Blog</h2>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors">
              View all articles <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {slug:"top-ml-algorithms-explained",title:"Top 10 ML Algorithms Every Data Scientist Should Know",cat:"Algorithms",time:12},
              {slug:"ml-interview-prep-guide",title:"Complete ML Interview Prep Guide for FAANG Companies",cat:"Career",time:15},
              {slug:"overfitting-underfitting-guide",title:"Overfitting vs Underfitting: How to Diagnose and Fix Both",cat:"Fundamentals",time:8},
            ].map(post=>(
              <Link key={post.slug} to={"/blog/"+post.slug}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 h-24"/>
                <div className="p-5">
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{post.cat}</span>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-2 mb-3 leading-snug text-sm">{post.title}</h3>
                  <span className="text-xs text-slate-400">{post.time} min read</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/blog" className="text-indigo-600 font-semibold text-sm">View all articles →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Users className="w-12 h-12 text-indigo-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to master Machine Learning?</h2>
          <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
            Start with the fundamentals or jump straight to the algorithm you need.
            Every tutorial is free, ad-free, and written by practising ML engineers.
          </p>
          <Link to={`/learn/${curriculum[0].subtopics[0].id}`}
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
            Begin Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
