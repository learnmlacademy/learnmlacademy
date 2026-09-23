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
    <header className="relative z-40 h-16 shrink-0 border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-3">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open curriculum navigation"
          aria-controls="mobile-curriculum-drawer"
          aria-expanded={navigationOpen}
          onClick={() => onOpenNavigation(false)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-950 xl:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="LearnMLAcademy home">
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          <span className="hidden text-base font-extrabold tracking-tight text-slate-950 sm:block">
            LearnML<span className="text-indigo-600">Academy</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="ml-4 hidden h-full items-center gap-6 lg:flex">
          {primaryLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cn(
                'flex h-full items-center border-b-2 pt-0.5 text-sm font-semibold transition-colors',
                isActive
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-950',
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
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-950 md:hidden"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>

        <Link
          to="/cheatsheet"
          className="hidden min-h-10 items-center justify-center border-l border-slate-200 pl-4 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-700 sm:inline-flex"
        >
          Interview PDF
        </Link>

        <div className="hidden w-5 shrink-0 2xl:block" aria-hidden="true" />
      </div>
    </header>
  );
}
