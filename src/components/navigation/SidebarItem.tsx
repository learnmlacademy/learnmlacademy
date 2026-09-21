import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, CheckCircle2 } from 'lucide-react';
import { cn } from '../layout/classNames';

type SidebarItemProps = {
  id: string;
  title: string;
  lessonNumber: number;
  active?: boolean;
  completed?: boolean;
  bookmarked?: boolean;
  onNavigate?: () => void;
};

export function SidebarItem({
  id,
  title,
  lessonNumber,
  active = false,
  completed = false,
  bookmarked = false,
  onNavigate,
}: SidebarItemProps) {
  return (
    <Link
      to={`/learn/${id}`}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex min-h-11 items-start gap-2.5 rounded-lg px-3 py-2.5 text-sm leading-snug transition-colors',
        active
          ? 'bg-indigo-600 font-semibold text-white shadow-sm'
          : 'font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950',
      )}
    >
      <span
        className={cn(
          'mt-0.5 w-6 shrink-0 text-right text-[11px] tabular-nums',
          active ? 'text-indigo-200' : 'text-slate-400',
        )}
      >
        {lessonNumber}.
      </span>
      <span className="min-w-0 flex-1 break-words">{title}</span>
      {completed && (
        <CheckCircle2
          className={cn('mt-0.5 h-4 w-4 shrink-0', active ? 'text-white' : 'text-emerald-600')}
          aria-label="Completed"
        />
      )}
      {bookmarked && (
        <Bookmark
          className={cn('mt-0.5 h-4 w-4 shrink-0', active ? 'text-white' : 'text-indigo-600')}
          aria-label="Bookmarked"
        />
      )}
    </Link>
  );
}
