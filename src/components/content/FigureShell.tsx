import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../layout/classNames';

type FigureShellProps = {
  children: ReactNode;
  title?: ReactNode;
  eyebrow?: string;
  learningQuestion?: ReactNode;
  legend?: ReactNode;
  caption?: ReactNode;
  note?: ReactNode;
  accessibleDescription?: string;
  width?: 'reading' | 'wide';
  className?: string;
  figureProps?: Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'> & { [key: `data-${string}`]: string | boolean };
};

export function FigureShell({
  children,
  title,
  eyebrow,
  learningQuestion,
  legend,
  caption,
  note,
  accessibleDescription,
  width = 'reading',
  className,
  figureProps,
}: FigureShellProps) {
  const prefix = `figure-${useId().replace(/:/g, '')}`;
  const labelledBy = title ? `${prefix}-title` : undefined;
  const describedBy = [caption || note ? `${prefix}-caption` : '', accessibleDescription ? `${prefix}-description` : ''].filter(Boolean).join(' ') || undefined;

  return (
    <figure
      {...figureProps}
      data-figure-shell
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={cn('not-prose my-8 overflow-hidden border-y border-[var(--lma-border-default)] bg-[var(--lma-surface)]', width === 'wide' && 'lesson-wide', className)}
    >
      {(title || eyebrow || learningQuestion) && (
        <header className="border-b border-[var(--lma-border-default)] px-4 py-4 sm:px-6">
          {eyebrow && <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--lma-brand)]">{eyebrow}</p>}
          {title && <h3 id={`${prefix}-title`} className={cn('text-lg font-extrabold leading-snug text-[var(--lma-text-primary)]', eyebrow && 'mt-1')}>{title}</h3>}
          {learningQuestion && <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--lma-text-secondary)]">{learningQuestion}</p>}
        </header>
      )}
      <div className="lma-scrollbar overflow-x-auto p-4 sm:p-6">{children}</div>
      {legend && <div className="border-t border-[var(--lma-border-default)] px-4 py-3 text-xs leading-relaxed text-[var(--lma-text-secondary)] sm:px-6" aria-label="Figure legend">{legend}</div>}
      {(caption || note) && (
        <figcaption id={`${prefix}-caption`} className="border-t border-[var(--lma-border-default)] bg-[var(--lma-canvas)] px-4 py-3 text-sm leading-relaxed text-[var(--lma-text-secondary)] sm:px-6">
          {caption && <div>{caption}</div>}
          {note && <div className={cn(caption && 'mt-2 text-xs text-[var(--lma-text-muted)]')}>{note}</div>}
        </figcaption>
      )}
      {accessibleDescription && <p id={`${prefix}-description`} className="sr-only">{accessibleDescription}</p>}
    </figure>
  );
}
