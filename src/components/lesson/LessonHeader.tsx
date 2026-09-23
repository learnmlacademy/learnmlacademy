import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
    <header className="mx-auto mb-9 w-full max-w-[var(--lma-reading-width)] border-b border-slate-300 pb-8 sm:mb-11 sm:pb-10">
      <nav aria-label="Breadcrumb" className="mb-6">
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

      <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-700">
        {cleanCategory}
        {module ? <span className="ml-2 font-medium normal-case tracking-normal text-slate-500">/ {module}</span> : null}
      </p>
      <h1 className="lma-lesson-title mt-3 text-slate-950">{title}</h1>
      <p className="lma-lesson-lead mt-5 max-w-3xl">{description}</p>
    </header>
  );
}
