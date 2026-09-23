import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';

type LessonHeaderProps = {
  title: string;
  description: string;
  category: string;
  module?: string;
};

export function LessonHeader({
  title,
  description,
  category,
  module,
}: LessonHeaderProps) {
  const cleanCategory = category.replace(/^\d+\.\s*/, '');

  return (
    <header className="mx-auto mb-8 w-full max-w-[var(--lma-reading-width)] sm:mb-10">
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-slate-500">
          <li><Link to="/curriculum" className="hover:text-indigo-700">Curriculum</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-4 w-4 text-slate-300" /></li>
          <li><span className="text-slate-700">{cleanCategory}</span></li>
          {module && (
            <>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4 text-slate-300" /></li>
              <li><span className="text-slate-500">{module}</span></li>
            </>
          )}
        </ol>
      </nav>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--lma-shadow-low)] sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">{cleanCategory}</p>
            {module && <p className="mt-0.5 text-xs font-medium text-slate-500">{module}</p>}
          </div>
        </div>
        <h1 className="lma-lesson-title text-slate-950">{title}</h1>
        <p className="lma-lesson-lead mt-5 max-w-3xl">{description}</p>
      </div>
    </header>
  );
}
