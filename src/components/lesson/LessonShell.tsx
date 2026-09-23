import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { List, ChevronDown } from 'lucide-react';
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
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'section';
}

function TableOfContents({ items, compact = false }: { items: TocItem[]; compact?: boolean }) {
  const list = (
    <ol className={compact ? 'mt-3 space-y-1.5' : 'mt-4 space-y-2'}>
      {items.map(item => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="block rounded-lg px-2 py-1.5 text-sm leading-snug text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  if (compact) {
    return (
      <details className="mb-7 rounded-xl border border-slate-200 bg-white p-4 2xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-900">
          <span className="flex items-center gap-2"><List className="h-4 w-4 text-indigo-600" aria-hidden="true" />On this page</span>
          <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
        </summary>
        {list}
      </details>
    );
  }

  return (
    <nav aria-label="On this page" className="sticky top-6 rounded-xl border border-slate-200 bg-white p-4">
      <p className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
        <List className="h-4 w-4 text-indigo-600" aria-hidden="true" />
        On this page
      </p>
      {list}
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

  useEffect(() => {
    const root = contentRootRef.current;
    if (!root) return;

    let lastSignature = '';
    const collectHeadings = () => {
      const headings = Array.from(
        root.querySelectorAll<HTMLElement>('[data-lesson-body] h2'),
      ) as HTMLElement[];
      const visibleHeadings = headings.filter(heading => !heading.closest('[hidden]'));

      const items = visibleHeadings.map((heading, index) => {
        const label = (heading.textContent || '').replace(/\s+/g, ' ').trim();
        const generatedId = `lesson-section-${index + 1}-${slugify(label)}`;
        if (!heading.id || document.querySelectorAll(`[id="${heading.id}"]`).length > 1) {
          heading.id = generatedId;
        }
        return { id: heading.id, label, level: 2 as const };
      }).filter(item => item.label);

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

  const showToc = tocItems.length >= 4;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <LessonHeader
        title={title}
        description={description}
        category={category}
        module={module}
      />

      <div
        ref={contentRootRef}
        className={showToc
          ? '2xl:grid 2xl:grid-cols-[minmax(0,var(--lma-reading-width))_var(--lma-toc-width)] 2xl:justify-center 2xl:gap-10'
          : 'mx-auto max-w-[var(--lma-reading-width)]'}
      >
        <div className="min-w-0">
          {showToc && <TableOfContents items={tocItems} compact />}
          {children}
        </div>
        {showToc && (
          <aside className="hidden 2xl:block">
            <TableOfContents items={tocItems} />
          </aside>
        )}
      </div>
    </div>
  );
}
