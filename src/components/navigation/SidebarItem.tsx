import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
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
  onNavigate,
}: SidebarItemProps) {
  return (
    <Link
      to={`/learn/${id}`}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs leading-snug transition-colors',
        active
          ? 'bg-indigo-50 font-semibold text-indigo-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      )}
    >
      <span
        className={cn(
          'w-5 shrink-0 text-right text-[10px] tabular-nums font-mono',
          active ? 'font-bold text-indigo-600' : 'text-slate-400 group-hover:text-slate-500',
        )}
      >
        {lessonNumber}
      </span>

      <span className="min-w-0 flex-1 truncate">{title}</span>

      {completed && (
        <CheckCircle2
          className={cn('h-3.5 w-3.5 shrink-0', active ? 'text-indigo-600' : 'text-emerald-600')}
          aria-label="Completed"
        />
      )}
    </Link>
  );
}
