import React from 'react';
import { ChevronRight, Zap, BookOpen, Target, ListTree, Activity } from "lucide-react";

interface IntroLayoutProps {
  title: string;
  description: string;
  realLifeExample: React.ReactNode;
  visualIntuition: React.ReactNode;
  algorithmTree: React.ReactNode;
  evaluationMetrics: React.ReactNode;
  decisionMap: React.ReactNode;
  summary: React.ReactNode;
  children?: React.ReactNode;
}

export function IntroLayout({
  title,
  description,
  realLifeExample,
  visualIntuition,
  algorithmTree,
  evaluationMetrics,
  decisionMap,
  summary,
  children
}: IntroLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
          <BookOpen className="w-48 h-48 text-indigo-300" />
        </div>
        <div className="relative z-10">
          <span className="bg-indigo-500/30 text-indigo-100 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-6 inline-block">
            Course Overview
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-indigo-100 font-light leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      </div>

      {/* SEQUENTIAL FLOW MARKER */}
      <div className="flex justify-center -my-6 relative z-20">
        <div className="bg-indigo-100 text-indigo-800 border-4 border-white p-2 rounded-full shadow-sm">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </div>

      {/* 2. REAL-LIFE EXAMPLES */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="text-4xl">🌍</span> Real-World Problems
        </h2>
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
          {realLifeExample}
        </div>
      </div>

      {/* SEQUENTIAL FLOW MARKER */}
      <div className="flex justify-center -my-6 relative z-20">
        <div className="bg-indigo-100 text-indigo-800 border-4 border-white p-2 rounded-full shadow-sm">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </div>

      {/* 3. VISUAL INTUITION */}
      <div className="bg-slate-50 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
         <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Target className="w-8 h-8 text-indigo-600" /> Core Concept
        </h2>
        <div className="w-full">
          {visualIntuition}
        </div>
      </div>

      {/* SEQUENTIAL FLOW MARKER */}
      <div className="flex justify-center -my-6 relative z-20">
        <div className="bg-indigo-100 text-indigo-800 border-4 border-white p-2 rounded-full shadow-sm">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </div>

      {/* 4. ALGORITHM TREE */}
      <div className="bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
          <ListTree className="w-8 h-8 text-indigo-400" /> The Family Tree
        </h2>
        <div className="relative z-10 space-y-6">
          {algorithmTree}
        </div>
      </div>

      {/* SEQUENTIAL FLOW MARKER */}
      <div className="flex justify-center -my-6 relative z-20">
        <div className="bg-indigo-100 text-indigo-800 border-4 border-white p-2 rounded-full shadow-sm">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </div>

      {/* 5. EVALUATION METRICS */}
      <div className="bg-[#1e1e1e] border-2 border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Activity className="w-8 h-8 text-blue-400" /> How do we measure success?
        </h2>
        {evaluationMetrics}
      </div>

       {/* 6. DECISION MAP */}
      <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-500" /> Cheat Sheet: Which one to use?
        </h2>
        {decisionMap}
      </div>

      {/* 7. SUMMARY */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-3xl p-10 text-center shadow-sm mt-12">
         <h2 className="text-3xl font-extrabold text-indigo-900 mb-4">Summary</h2>
         <div className="text-lg text-indigo-800 font-medium leading-relaxed max-w-4xl mx-auto">
            {summary}
         </div>
      </div>

      {children && (
        <>
          {/* SEQUENTIAL FLOW MARKER */}
          <div className="flex justify-center -my-6 relative z-20">
            <div className="bg-slate-100 text-slate-800 border-4 border-white p-2 rounded-full shadow-sm">
              <ChevronRight className="w-6 h-6 rotate-90" />
            </div>
          </div>
          
          <div className="bg-white border text-base border-slate-200 rounded-3xl p-10 shadow-sm mt-8">
             <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">In-Depth Tutorial & Foundations</h2>
             <div className="prose prose-slate max-w-none prose-img:rounded-xl">
               {children}
             </div>
          </div>
        </>
      )}

    </div>
  );
}
