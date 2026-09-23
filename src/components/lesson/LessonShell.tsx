import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { List, ChevronDown, Share2, ArrowUpRight, BookOpen } from 'lucide-react';
import { LessonHeader } from './LessonHeader';

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

function TableOfContents({
  items,
  activeId,
  compact = false,
}: {
  items: TocItem[];
  activeId?: string;
  compact?: boolean;
}) {
  const list = (
    <ol className={compact ? 'mt-2 space-y-1' : 'mt-2.5 space-y-1 text-xs'}>
      {items.map(item => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-md px-2 py-1 leading-snug transition-colors ${
                isActive
                  ? 'bg-indigo-50 font-semibold text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (compact) {
    return (
      <details className="mb-6 rounded-xl border border-slate-200 bg-white p-3.5 xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold text-slate-800">
          <span className="flex items-center gap-2">
            <List className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
            On this page
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        </summary>
        {list}
      </details>
    );
  }

  return (
    <nav aria-label="On this page" className="sticky top-20 pl-2">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
        <List className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
        On this page
      </p>
      {list}

      {/* Quick Community / Feedback link */}
      <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
          }}
          className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-indigo-600 transition"
        >
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Copy lesson link</span>
        </button>
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
  children,
}: LessonShellProps) {
  const contentRootRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    const root = contentRootRef.current;
    if (!root) return;

    let lastSignature = '';
    const collectHeadings = () => {
      const headings = Array.from(
        root.querySelectorAll<HTMLElement>('[data-lesson-body] h2'),
      ) as HTMLElement[];
      const visibleHeadings = headings.filter(heading => !heading.closest('[hidden]'));

      const items = visibleHeadings
        .map((heading, index) => {
          const label = (heading.textContent || '').replace(/\s+/g, ' ').trim();
          const generatedId = `lesson-section-${index + 1}-${slugify(label)}`;
          if (!heading.id || document.querySelectorAll(`[id="${heading.id}"]`).length > 1) {
            heading.id = generatedId;
          }
          return { id: heading.id, label, level: 2 as const };
        })
        .filter(item => item.label);

      const signature = items.map(item => `${item.id}:${item.label}`).join('|');
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

  // Scrollspy for active heading
  useEffect(() => {
    if (tocItems.length === 0) return;

    const onScroll = () => {
      const headings = tocItems
        .map(item => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      for (let i = headings.length - 1; i >= 0; i--) {
        const rect = headings[i].getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSectionId(headings[i].id);
          return;
        }
      }
      if (headings.length > 0) {
        setActiveSectionId(headings[0].id);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tocItems]);

  const showToc = tocItems.length >= 3;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <div
        ref={contentRootRef}
        className={
          showToc
            ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-10'
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
          />

          {showToc && <TableOfContents items={tocItems} activeId={activeSectionId} compact />}

          {children}
        </div>

        {/* Right Sticky Table of Contents (Option A Docs Style) */}
        {showToc && (
          <aside className="hidden xl:block">
            <TableOfContents items={tocItems} activeId={activeSectionId} />
          </aside>
        )}
      </div>
    </div>
  );
}
