import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Share2,
  ArrowUp,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  BookOpen,
  HelpCircle,
  X,
} from 'lucide-react';
import { LessonHeader } from './LessonHeader';
import { useProgress } from '../../context/ProgressContext';

type TocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

type LessonShellProps = {
  topicId: string;
  title: string;
  description: string;
  category: string;
  module?: string;
  nextTopic?: { id: string; title: string };
  prevTopic?: { id: string; title: string };
  children: ReactNode;
};

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48) || 'section'
  );
}

function MobileTableOfContentsSheet({
  items,
  activeId,
  copied,
  onCopyLink,
  open,
  onClose,
  completed,
  onToggleCompleted,
}: {
  items: TocItem[];
  activeId?: string;
  copied: boolean;
  onCopyLink: () => void;
  open: boolean;
  onClose: () => void;
  completed: boolean;
  onToggleCompleted: () => void;
}) {
  if (!open) return null;

  const handleSelect = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        history.replaceState(null, '', `#${id}`);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-slate-950/60 backdrop-blur-xs transition-opacity"
        aria-label="Close table of contents"
        onClick={onClose}
      />

      {/* Sheet Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-toc-title"
        className="absolute inset-x-0 bottom-0 max-h-[82vh] flex flex-col rounded-t-2xl border-t border-slate-200 bg-white shadow-2xl animate-in slide-in-from-bottom duration-200"
      >
        {/* Grab Handle */}
        <div className="pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-slate-300" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <List className="h-4 w-4 text-indigo-600" />
            <h3 id="mobile-toc-title" className="text-sm font-bold text-slate-900">
              On This Page
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {items.length} sections
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sections List */}
        <div className="flex-1 overflow-y-auto lma-scrollbar px-3 py-2 space-y-1">
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between gap-3 text-left rounded-xl px-3 py-2.5 text-xs transition ${
                  isActive
                    ? 'bg-indigo-50 font-bold text-indigo-900 ring-1 ring-indigo-200/80'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && (
                  <span className="shrink-0 h-2 w-2 rounded-full bg-indigo-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Shortcuts & Actions */}
        <div className="border-t border-slate-100 bg-slate-50/90 px-4 py-3 grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleSelect('quiz-section')}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-slate-700 font-semibold hover:border-indigo-300 hover:text-indigo-700 shadow-2xs"
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-600" />
            <span>Knowledge Quiz</span>
          </button>

          <button
            type="button"
            onClick={onCopyLink}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-slate-700 font-semibold hover:border-indigo-300 hover:text-indigo-700 shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Share Lesson</span>
              </>
            )}
          </button>

          <Link
            to="/cheatsheet"
            onClick={onClose}
            className="col-span-2 flex items-center justify-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-100 py-2 text-indigo-700 font-bold hover:bg-indigo-100"
          >
            <FileText className="h-3.5 w-3.5 text-indigo-600" />
            <span>Interview Cheatsheet (PDF)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileTableOfContents({
  items,
  activeId,
  copied,
  onCopyLink,
}: {
  items: TocItem[];
  activeId?: string;
  copied: boolean;
  onCopyLink: () => void;
}) {
  const [open, setOpen] = useState(false);
  const activeItem = items.find((it) => it.id === activeId);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        history.replaceState(null, '', `#${id}`);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div
      data-mobile-toc
      className="mb-6 rounded-xl border border-slate-200 bg-white shadow-2xs xl:hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-slate-800"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 truncate">
          <List className="h-4 w-4 text-indigo-600 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {activeItem ? activeItem.label : `On this page (${items.length} sections)`}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-500 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="border-t border-slate-100 p-3 pt-2">
          <ol className="space-y-1 text-xs max-h-64 overflow-y-auto lma-scrollbar pr-1">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`block rounded-lg px-2.5 py-1.5 leading-snug transition-colors ${
                      isActive
                        ? 'bg-indigo-50 font-bold text-indigo-700 border-l-2 border-indigo-600 pl-2'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ol>

          {/* Quick shortcuts on mobile TOC */}
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <a
              href="#quiz-section"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition"
            >
              <HelpCircle className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
              <span>Quiz</span>
            </a>
            <Link
              to="/cheatsheet"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition"
            >
              <FileText className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
              <span>Cheatsheet PDF</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopTableOfContents({
  items,
  activeId,
  copied,
  onCopyLink,
}: {
  items: TocItem[];
  activeId?: string;
  copied: boolean;
  onCopyLink: () => void;
}) {
  return (
    <nav aria-label="On this page" className="sticky top-20 pl-2">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
          <List className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
          <span>On this page</span>
        </p>
        <span className="text-[10px] text-slate-400 font-semibold">{items.length} sections</span>
      </div>

      <ol className="mt-2.5 space-y-1 text-xs max-h-[calc(100vh-220px)] overflow-y-auto lma-scrollbar pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-md px-2 py-1 leading-snug transition-colors ${
                  isActive
                    ? 'bg-indigo-50 font-semibold text-indigo-700 border-l-2 border-indigo-600 pl-2.5'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>

      {/* Quick shortcuts & actions */}
      <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2.5">
        <button
          type="button"
          onClick={onCopyLink}
          className="flex w-full items-center gap-1.5 font-medium text-slate-600 hover:text-indigo-600 transition"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Link copied to clipboard!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Share this tutorial</span>
            </>
          )}
        </button>

        <a
          href="#quiz-section"
          className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-indigo-600 transition"
        >
          <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
          <span>Jump to Knowledge Quiz</span>
        </a>

        <a
          href="/cheatsheet"
          className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-indigo-600 transition"
        >
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          <span>Interview Cheatsheet (PDF)</span>
        </a>
      </div>
    </nav>
  );
}

export function LessonShell({
  topicId,
  title,
  description,
  category,
  module,
  nextTopic,
  prevTopic,
  children,
}: LessonShellProps) {
  const contentRootRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tocSheetOpen, setTocSheetOpen] = useState(false);

  const { isCompleted, toggleCompleted } = useProgress();
  const completed = isCompleted(topicId);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  // Collect headings for Table of Contents
  useEffect(() => {
    const root = contentRootRef.current;
    if (!root) return;

    let lastSignature = '';
    const collectHeadings = () => {
      const headings = Array.from(
        root.querySelectorAll<HTMLElement>('[data-lesson-body] h2'),
      ) as HTMLElement[];
      const visibleHeadings = headings.filter((heading) => !heading.closest('[hidden]'));

      const items = visibleHeadings
        .map((heading, index) => {
          const label = (heading.textContent || '').replace(/\s+/g, ' ').trim();
          const generatedId = `lesson-section-${index + 1}-${slugify(label)}`;
          if (!heading.id || document.querySelectorAll(`[id="${heading.id}"]`).length > 1) {
            heading.id = generatedId;
          }
          return { id: heading.id, label, level: 2 as const };
        })
        .filter((item) => item.label);

      const signature = items.map((item) => `${item.id}:${item.label}`).join('|');
      if (signature !== lastSignature) {
        lastSignature = signature;
        setTocItems(items);
      }
    };

    collectHeadings();
    const observer = new MutationObserver(collectHeadings);
    observer.observe(root, { childList: true, subtree: true });
    const stopObserving = window.setTimeout(() => observer.disconnect(), 3000);

    return () => {
      window.clearTimeout(stopObserving);
      observer.disconnect();
    };
  }, [topicId]);

  // Reading progress and Scrollspy for active heading (supporting both main-scroll and window)
  useEffect(() => {
    const handleScroll = () => {
      const mainScrollEl = document.getElementById('main-scroll');
      const scrollY = mainScrollEl ? mainScrollEl.scrollTop : window.scrollY;
      const scrollHeight = mainScrollEl
        ? mainScrollEl.scrollHeight - mainScrollEl.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / scrollHeight) * 100));
        setScrollProgress(progress);
      }

      setShowBackToTop(scrollY > 350);

      // Heading detection
      if (tocItems.length > 0) {
        const headings = tocItems
          .map((item) => document.getElementById(item.id))
          .filter((el): el is HTMLElement => el !== null);

        for (let i = headings.length - 1; i >= 0; i--) {
          const rect = headings[i].getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSectionId(headings[i].id);
            return;
          }
        }
        if (headings.length > 0) {
          setActiveSectionId(headings[0].id);
        }
      }
    };

    const mainScrollEl = document.getElementById('main-scroll');
    if (mainScrollEl) {
      mainScrollEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    handleScroll();

    return () => {
      if (mainScrollEl) mainScrollEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [tocItems]);

  const scrollToTop = () => {
    const mainScrollEl = document.getElementById('main-scroll');
    if (mainScrollEl) {
      mainScrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToc = tocItems.length >= 3;

  return (
    <>
      {/* Top Reading Progress Bar (Synchronized with reading position) */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50"
        role="progressbar"
        aria-label="Lesson reading progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-indigo-600 to-purple-600 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 pb-24 xl:pb-8">
        <div
          ref={contentRootRef}
          className={
            showToc
              ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_250px] xl:gap-10'
              : 'max-w-4xl mx-auto'
          }
        >
          {/* Main Reading Center */}
          <div className="min-w-0 max-w-3xl">
            <LessonHeader
              title={title}
              description={description}
              category={category}
              module={module}
              topicId={topicId}
            />

            {showToc && (
              <MobileTableOfContents
                items={tocItems}
                activeId={activeSectionId}
                copied={copied}
                onCopyLink={handleCopyLink}
              />
            )}

            {children}
          </div>

          {/* Right Sticky Table of Contents (Desktop) */}
          {showToc && (
            <aside className="hidden xl:block">
              <DesktopTableOfContents
                items={tocItems}
                activeId={activeSectionId}
                copied={copied}
                onCopyLink={handleCopyLink}
              />
            </aside>
          )}
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-20 xl:bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg border border-slate-200/90 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Table of Contents Sheet */}
      <MobileTableOfContentsSheet
        items={tocItems}
        activeId={activeSectionId}
        copied={copied}
        onCopyLink={handleCopyLink}
        open={tocSheetOpen}
        onClose={() => setTocSheetOpen(false)}
        completed={completed}
        onToggleCompleted={() => toggleCompleted(topicId)}
      />

      {/* Synchronized Mobile Bottom Action Bar (Screen < xl) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/95 backdrop-blur px-2.5 sm:px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg xl:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-1.5 text-xs">
          {/* Open Curriculum Drawer Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('learnml:open-nav', { detail: { focusSearch: false } }))}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2 font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition"
            title="Browse Curriculum"
            aria-label="Curriculum navigation"
          >
            <BookOpen className="h-4 w-4 text-indigo-600 shrink-0" />
            <span className="hidden min-[380px]:inline">Curriculum</span>
          </button>

          {/* Quick TOC Sheet Toggle */}
          {showToc && (
            <button
              type="button"
              onClick={() => setTocSheetOpen(true)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2 font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition"
              title="Table of Contents"
              aria-label="TOC — Open table of contents"
            >
              <List className="h-4 w-4 text-indigo-600 shrink-0" />
              <span>TOC</span>
            </button>
          )}

          {/* Previous Lesson Button */}
          {prevTopic && (
            <Link
              to={`/learn/${prevTopic.id}`}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-2 font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-indigo-600 active:scale-95 transition"
              title={`Previous: ${prevTopic.title}`}
              aria-label={`Previous: ${prevTopic.title}`}
            >
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span className="hidden min-[430px]:inline">Prev</span>
            </Link>
          )}

          {/* Complete Toggle Button */}
          <button
            type="button"
            onClick={() => toggleCompleted(topicId)}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-2 font-bold shadow-2xs active:scale-95 transition ${
              completed
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700'
            }`}
            aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <CheckCircle2
              className={`h-4 w-4 shrink-0 ${
                completed ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'
              }`}
            />
            <span>{completed ? 'Done' : 'Complete'}</span>
          </button>

          {/* Next Lesson or Finish Button */}
          {nextTopic ? (
            <Link
              to={`/learn/${nextTopic.id}`}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 font-bold text-white shadow-xs hover:bg-indigo-700 active:scale-95 transition"
              title={`Next: ${nextTopic.title}`}
              aria-label={`Next: ${nextTopic.title}`}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : (
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 font-bold text-white shadow-xs hover:bg-indigo-700 active:scale-95 transition"
              title="Full Curriculum"
            >
              <span>Finish</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
