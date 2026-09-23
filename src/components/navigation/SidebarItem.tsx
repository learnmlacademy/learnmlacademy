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
        'group relative flex items-center justify-between gap-2 rounded-md py-1.5 pl-3 pr-2 text-[13px] leading-snug transition-all duration-150',
        active
          ? 'bg-indigo-50/90 font-semibold text-indigo-700 shadow-2xs before:absolute before:bottom-1 before:left-0 before:top-1 before:w-[3px] before:rounded-full before:bg-indigo-600'
          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={cn(
            'w-4 shrink-0 font-mono text-[10px] tabular-nums',
            active ? 'font-bold text-indigo-600' : 'text-slate-400 group-hover:text-slate-500',
          )}
        >
          {lessonNumber}
        </span>
        <span className="truncate">{title}</span>
      </div>

      {completed && (
        <CheckCircle2
          className={cn('h-3.5 w-3.5 shrink-0', active ? 'text-indigo-600' : 'text-emerald-600')}
          aria-label="Completed"
        />
      )}
    </Link>
  );
}
