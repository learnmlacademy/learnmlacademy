import React, { useEffect, useRef, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { CurriculumNav } from './CurriculumNav';
import { LessonSearch } from '../search/LessonSearch';

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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    <div className="fixed inset-0 z-50 xl:hidden">
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

        <div className="shrink-0 border-b border-slate-100 p-4">
          <LessonSearch inputRef={searchInputRef} onNavigate={onClose} />
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
            <Link to="/curriculum" onClick={onClose} className="rounded-lg bg-slate-100 px-2 py-2.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700">Learn</Link>
            <Link to="/learn/project-customer-churn" onClick={onClose} className="rounded-lg bg-slate-100 px-2 py-2.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700">Projects</Link>
            <Link to="/learn/ai-data-career-paths" onClick={onClose} className="rounded-lg bg-slate-100 px-2 py-2.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700">Career</Link>
          </div>
        </div>

        <div className="lma-scrollbar flex-1 overflow-y-auto p-3">
          <CurriculumNav activeTopicId={activeTopicId} onNavigate={onClose} label="Curriculum" />
        </div>
      </div>
    </div>
  );
}
