import { useId, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { cn } from '../layout/classNames';

type DataTableProps = {
  title?: ReactNode;
  caption?: string;
  headers: ReactNode[];
  rows: ReactNode[][];
  firstColumnEmphasis?: boolean;
  minWidthClassName?: string;
  className?: string;
};

export function DataTable({
  title,
  caption,
  headers,
  rows,
  firstColumnEmphasis = true,
  minWidthClassName = 'min-w-[640px]',
  className,
}: DataTableProps) {
  const titleId = `table-title-${useId().replace(/:/g, '')}`;
  const description = caption ?? (typeof title === 'string' ? title : undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const check = () => setOverflows(element.scrollWidth > element.clientWidth + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => observer.disconnect();
  }, [rows, headers]);

  return (
    <section data-data-table className={cn('not-prose my-5 overflow-hidden rounded-xl border border-[var(--lma-border-default)] bg-[var(--lma-surface)] shadow-sm', className)} aria-labelledby={title ? titleId : undefined}>
      {title && <h3 id={titleId} className="border-b border-[var(--lma-border-default)] bg-[var(--lma-canvas)] px-4 py-3 text-base font-extrabold leading-snug text-[var(--lma-text-primary)] sm:px-5">{title}</h3>}
      <div className="relative">
        <div ref={scrollRef} className="lma-scrollbar overflow-x-auto" tabIndex={overflows ? 0 : undefined} role={overflows ? "region" : undefined} aria-label={overflows ? description ?? "Scrollable data table" : undefined}>
          <table className={cn('w-full border-collapse text-left text-sm', minWidthClassName)}>
            {description && <caption className="sr-only">{description}</caption>}
            <thead className="bg-[var(--lma-brand-soft)] text-[var(--lma-brand-text)]">
              <tr>{headers.map((header, index) => <th key={index} scope="col" className="border-b border-[var(--lma-brand-border)] px-4 py-3 font-bold leading-snug">{header}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[var(--lma-border-default)]">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-top odd:bg-[var(--lma-surface)] even:bg-[var(--lma-canvas)]">
                  {row.map((cell, cellIndex) => cellIndex === 0 && firstColumnEmphasis ? (
                    <th key={cellIndex} scope="row" className="px-4 py-3 font-semibold leading-relaxed text-[var(--lma-text-primary)]">{cell}</th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-3 leading-relaxed text-[var(--lma-text-secondary)]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {overflows && <div className="pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />}
      </div>
      {overflows && <p className="flex items-center gap-2 border-t border-[var(--lma-border-default)] bg-[var(--lma-canvas)] px-4 py-2 text-xs font-medium text-[var(--lma-text-muted)]">
        <ArrowLeftRight className="h-4 w-4" aria-hidden="true" /> Scroll horizontally to view every column.
      </p>}
    </section>
  );
}
