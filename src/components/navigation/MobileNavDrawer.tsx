import React, { useEffect, useRef, type RefObject } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sparkles, FileText, BookOpen, FolderKanban, BriefcaseBusiness, Newspaper, Info } from 'lucide-react';
import { CurriculumNav } from './CurriculumNav';
import { LessonSearch } from '../search/LessonSearch';
import { useProgress } from '../../context/ProgressContext';
import { cn } from '../layout/classNames';

type MobileNavDrawerProps = {
  open: boolean;
  activeTopicId?: string;
  initialFocus: 'menu' | 'search';
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

export function MobileNavDrawer({
  open,
  activeTopicId,
  initialFocus,
  returnFocusRef,
  onClose,
}: MobileNavDrawerProps) {
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { progressPercentage, completedCount, totalLessonsCount } = useProgress();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTarget = initialFocus === 'search' ? searchInputRef.current : closeButtonRef.current;
    window.requestAnimationFrame(() => focusTarget?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ) as HTMLElement[];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [initialFocus, onClose, open, returnFocusRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-slate-950/45 backdrop-blur-sm"
        aria-label="Close curriculum navigation"
        onClick={onClose}
      />
      <div
        id="mobile-curriculum-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-curriculum-title"
        className="absolute inset-y-0 left-0 flex w-[min(92vw,360px)] flex-col bg-white shadow-2xl"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <Link to="/" onClick={onClose} className="flex items-center gap-2" aria-label="LearnMLAcademy home">
            <img src="/favicon.svg" alt="" className="h-8 w-8" />
            <span id="mobile-curriculum-title" className="font-extrabold text-slate-950">
              LearnML<span className="text-indigo-600">Academy</span>
            </span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close curriculum navigation"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Progress Bar in Drawer */}
        <div className="shrink-0 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Progress
            </span>
            <span className="font-bold text-indigo-600">
              {progressPercentage}% ({completedCount}/{totalLessonsCount})
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="shrink-0 border-b border-slate-100 p-4">
          <LessonSearch inputRef={searchInputRef} onNavigate={onClose} />
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              to="/curriculum"
              onClick={onClose}
              className={cn(
                'flex items-center justify-between rounded-lg px-2.5 py-2.5 transition',
                location.pathname === '/curriculum'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
              )}
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Curriculum</span>
              </span>
              {completedCount > 0 && (
                <span className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                  location.pathname === '/curriculum' ? 'bg-indigo-500 text-white' : 'bg-emerald-100 text-emerald-800'
                )}>
                  {progressPercentage}%
                </span>
              )}
            </Link>
            <Link
              to="/learn/project-customer-churn"
              onClick={onClose}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-2.5 transition',
                location.pathname.includes('project-')
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
              )}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>
            <Link
              to="/learn/ai-data-career-paths"
              onClick={onClose}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-2.5 transition',
                location.pathname.includes('career')
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
              )}
            >
              <BriefcaseBusiness className="w-3.5 h-3.5" />
              <span>Career</span>
            </Link>
            <Link
              to="/cheatsheet"
              onClick={onClose}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-2.5 font-bold transition',
                location.pathname === '/cheatsheet'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Free PDF</span>
            </Link>
            <Link
              to="/blog"
              onClick={onClose}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] transition',
                location.pathname.startsWith('/blog')
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Newspaper className="w-3 h-3 text-slate-500" />
              <span>Blog Articles</span>
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] transition',
                location.pathname === '/about'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Info className="w-3 h-3 text-slate-500" />
              <span>About Us</span>
            </Link>
          </div>
        </div>

        <div className="lma-scrollbar flex-1 overflow-y-auto p-3">
          <CurriculumNav
            activeTopicId={activeTopicId}
            onNavigate={onClose}
            label="Curriculum"
            hideSearch={true}
          />
        </div>
      </div>
    </div>
  );
}
