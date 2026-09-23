import type { ReactNode } from 'react';
import { Sigma } from 'lucide-react';
import { cn } from '../layout/classNames';

type FormulaBlockProps = {
  expression: ReactNode;
  label?: string;
  explanation?: ReactNode;
  accessibleText?: string;
  className?: string;
};

export function FormulaBlock({ expression, label, explanation, accessibleText, className }: FormulaBlockProps) {
  return (
    <figure data-formula-block className={cn('not-prose my-5 overflow-hidden rounded-xl border border-[var(--lma-brand-border)] bg-[var(--lma-brand-soft)]', className)} aria-label={accessibleText ?? label}>
      {label && <div className="flex items-center gap-2 border-b border-[var(--lma-brand-border)] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--lma-brand-text)]"><Sigma className="h-4 w-4" aria-hidden="true" />{label}</div>}
      <div className="lma-scrollbar overflow-x-auto px-4 py-5 text-center font-mono text-lg font-semibold text-[var(--lma-brand-text)] sm:px-6 sm:text-xl" aria-hidden={accessibleText ? 'true' : undefined}>{expression}</div>
      {accessibleText && <span className="sr-only">{accessibleText}</span>}
      {explanation && <figcaption className="border-t border-[var(--lma-brand-border)] bg-[var(--lma-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--lma-text-secondary)] sm:px-6">{explanation}</figcaption>}
    </figure>
  );
}
