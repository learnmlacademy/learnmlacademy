import type { ReactNode } from 'react';
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
    <figure
      data-formula-block
      className={cn('not-prose my-6 border-y border-[var(--lma-brand-border)] bg-[var(--lma-brand-soft)]', className)}
      aria-label={accessibleText ?? label}
    >
      {label && (
        <div className="px-4 pt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--lma-brand-text)] sm:px-6">
          {label}
        </div>
      )}
      <div
        className="lma-scrollbar overflow-x-auto px-4 py-5 text-center font-mono text-lg font-semibold text-[var(--lma-brand-text)] sm:px-6 sm:text-xl"
        aria-hidden={accessibleText ? 'true' : undefined}
      >
        {expression}
      </div>
      {accessibleText && <span className="sr-only">{accessibleText}</span>}
      {explanation && (
        <figcaption className="border-t border-[var(--lma-brand-border)] bg-white px-4 py-3 text-sm leading-relaxed text-[var(--lma-text-secondary)] sm:px-6">
          {explanation}
        </figcaption>
      )}
    </figure>
  );
}
