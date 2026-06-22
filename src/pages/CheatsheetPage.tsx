import React from 'react';
import { Download, BookOpen, Star, CheckCircle2, Users, Award } from 'lucide-react';
import { NewsletterSignup } from '../components/NewsletterSignup';

export function CheatsheetPage() {
  const sections = [
    { num: "01", title: "Foundations of ML", count: 10, color: "indigo" },
    { num: "02", title: "Regression Algorithms", count: 5, color: "blue" },
    { num: "03", title: "Classification Algorithms", count: 9, color: "violet" },
    { num: "04", title: "Ensemble Methods", count: 5, color: "emerald" },
    { num: "05", title: "Unsupervised Learning", count: 5, color: "teal" },
    { num: "06", title: "Model Evaluation & Tuning", count: 6, color: "amber" },
    { num: "07", title: "Feature Engineering", count: 5, color: "orange" },
    { num: "08", title: "Deep Learning", count: 8, color: "rose" },
    { num: "09", title: "Python & ML Libraries", count: 5, color: "pink" },
    { num: "10", title: "ML System Design & Production", count: 6, color: "red" },
    { num: "11", title: "Statistics & Probability", count: 5, color: "cyan" },
    { num: "12", title: "Advanced ML Topics", count: 10, color: "purple" },
    { num: "13", title: "Time Series", count: 5, color: "lime" },
    { num: "14", title: "Interview Strategy & Coding", count: 5, color: "yellow" },
    { num: "15", title: "Real FAANG Interview Questions", count: 10, color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Award className="w-3.5 h-3.5"/> Free Download — No sign-up required
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            ML Interview Cheatsheet
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              100 Questions &amp; Answers
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            A comprehensive PDF covering everything you need for ML engineer interviews — from basic theory to FAANG system design questions. Written by practising ML engineers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#get-pdf"
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5">
              <Download className="w-5 h-5"/> Get Free PDF
            </a>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-400"/>
              <span>PDF • 100 questions • Enter email to download</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[["100", "Questions"], ["15", "Sections"], ["Free", "Forever"], ["PDF", "Format"]].map(([v,l]) => (
              <div key={l} className="bg-white/8 border border-white/12 rounded-xl px-5 py-3 text-center">
                <div className="font-bold text-white text-xl">{v}</div>
                <div className="text-slate-400 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">What's inside</h2>
          <p className="text-slate-500 text-center mb-10">15 sections covering every topic asked in ML engineer interviews</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((s) => (
              <div key={s.num} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <span className={`w-9 h-9 rounded-lg bg-${s.color}-100 text-${s.color}-600 flex items-center justify-center text-xs font-black flex-shrink-0`}>{s.num}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm leading-tight">{s.title}</p>
                  <p className="text-slate-400 text-xs">{s.count} questions</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Q&A */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">Sample questions</h2>
          <p className="text-slate-500 text-center mb-10">A taste of what's inside the PDF</p>
          <div className="space-y-4">
            {[
              {
                q: "What is the Bias-Variance Tradeoff?",
                a: "Bias = error from oversimplified assumptions (underfitting). Variance = error from oversensitivity to training data noise (overfitting). Reducing one typically increases the other. The goal is finding the complexity sweet spot with both low bias and low variance.",
                tag: "Foundations"
              },
              {
                q: "When should you use Precision vs Recall as your primary metric?",
                a: "Prioritise Recall when missing a positive is catastrophic (cancer detection, fraud). Prioritise Precision when false alarms are costly (spam filters, content moderation). Use F1 when neither error type is clearly more costly.",
                tag: "Evaluation"
              },
              {
                q: "How would you design a fraud detection system at scale?",
                a: "Feature engineer transaction velocity, merchant category, location change speed. Use XGBoost with class_weight='balanced' for initial model. Deploy as REST API with <100ms latency. Monitor for concept drift weekly and retrain on recent transactions.",
                tag: "System Design"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{item.tag}</span>
                  <span className="text-xs text-slate-400">Q{i+1}</span>
                </div>
                <p className="font-bold text-slate-900 mb-3">{item.q}</p>
                <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-emerald-400 pl-4">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-slate-500 mb-4">These are just 3 of 100 questions in the full PDF</p>
            <a href="#get-pdf"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-sm">
              <Download className="w-5 h-5"/> Get All 100 Questions Free
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter — email gate before download */}
      <section id="get-pdf" className="py-16 px-4 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
