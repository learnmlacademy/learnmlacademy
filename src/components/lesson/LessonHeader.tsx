import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, BookOpen } from 'lucide-react';

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
    <header className="mb-6 border-b border-slate-200/80 pb-6">
      {/* Crisp Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
          <li>
            <Link to="/curriculum" className="hover:text-indigo-600 transition">
              Curriculum
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          </li>
          <li>
            <span className="text-slate-700 font-semibold">{cleanCategory}</span>
          </li>
          {module && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </li>
              <li>
                <span className="text-slate-500">{module}</span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Category Mini Badge */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
          {cleanCategory}
        </span>
        <span className="text-slate-300" aria-hidden="true">·</span>
        <span className="flex items-center gap-1 text-[11px] text-slate-500">
          <BookOpen className="h-3 w-3 text-slate-400" aria-hidden="true" />
          Interactive Tutorial
        </span>
      </div>

      {/* Lesson Title */}
      <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl leading-[1.18]">
        {title}
      </h1>

      {/* Direct Synopsis / Lead */}
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        {description}
      </p>
    </header>
  );
}
