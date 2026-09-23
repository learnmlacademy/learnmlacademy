import React, { type RefObject } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { LessonSearch } from '../search/LessonSearch';
import { cn } from './classNames';

type SiteHeaderProps = {
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  searchButtonRef: RefObject<HTMLButtonElement | null>;
  navigationOpen: boolean;
  onOpenNavigation: (focusSearch?: boolean) => void;
};

const primaryLinks = [
  { to: '/curriculum', label: 'Learn' },
  { to: '/learn/project-customer-churn', label: 'Projects' },
  { to: '/learn/ai-data-career-paths', label: 'Career' },
];

export function SiteHeader({ menuButtonRef, searchButtonRef, navigationOpen, onOpenNavigation }: SiteHeaderProps) {
  return (
    <header className="relative z-40 h-16 shrink-0 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-3">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open curriculum navigation"
          aria-controls="mobile-curriculum-drawer"
          aria-expanded={navigationOpen}
          onClick={() => onOpenNavigation(false)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-950 xl:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="LearnMLAcademy home">
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          <span className="hidden text-base font-extrabold tracking-tight text-slate-950 sm:block">
            LearnML<span className="text-indigo-600">Academy</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="ml-2 hidden items-center gap-1 lg:flex">
          {primaryLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cn(
                'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950',
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <LessonSearch className="ml-auto hidden w-full max-w-xs md:block" />

        <button
          ref={searchButtonRef}
          type="button"
          aria-label="Search lessons"
          aria-controls="mobile-curriculum-drawer"
          aria-expanded={navigationOpen}
          onClick={() => onOpenNavigation(true)}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-950 md:hidden"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>

        <Link
          to="/cheatsheet"
          className="hidden min-h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white transition-colors hover:bg-indigo-700 sm:inline-flex"
        >
          Free PDF
        </Link>

        <div className="hidden w-5 shrink-0 2xl:block" aria-hidden="true" />
      </div>
    </header>
  );
}
