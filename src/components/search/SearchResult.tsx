import React from 'react';
import { Link } from 'react-router-dom';
import type { SearchableLesson } from '../../data/learningNavigation';
import { cn } from '../layout/classNames';

type SearchResultProps = {
  key?: React.Key;
  lesson: SearchableLesson;
  resultId: string;
  highlighted: boolean;
  onSelect: () => void;
  onHover: () => void;
};

export function SearchResult({
  lesson,
  resultId,
  highlighted,
  onSelect,
  onHover,
}: SearchResultProps) {
  return (
    <Link
      id={resultId}
      role="option"
      aria-selected={highlighted}
      to={`/learn/${lesson.id}`}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        'block border-b border-slate-100 px-4 py-3 text-left last:border-b-0',
        highlighted ? 'bg-indigo-50' : 'bg-white hover:bg-slate-50',
      )}
    >
      <span className="block text-sm font-semibold leading-snug text-slate-900">
        {lesson.title}
      </span>
      <span className="mt-1 block text-xs leading-snug text-slate-500">
        {lesson.categoryTitle}{lesson.module ? ` · ${lesson.module}` : ''}
      </span>
    </Link>
  );
}
