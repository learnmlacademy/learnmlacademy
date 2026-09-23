import { useId } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../layout/classNames';

type SummaryCardProps = {
  items: string[];
  heading?: string;
  headingId?: string;
  className?: string;
};

export function SummaryCard({ items, heading = 'Summary / Key Takeaways', headingId, className }: SummaryCardProps) {
  const generatedId = `summary-${useId().replace(/:/g, '')}`;
  const id = headingId ?? generatedId;

  return (
    <section
      data-summary-card
      className={cn('not-prose mt-12 border-y border-[var(--lma-success-border)] py-6', className)}
      aria-labelledby={id}
    >
      <h2 id={id} className="flex items-start gap-3 text-2xl font-extrabold leading-tight text-slate-950">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[var(--lma-success)]" aria-hidden="true" />
        {heading}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} data-summary-point className="grid grid-cols-[0.5rem_minmax(0,1fr)] gap-3 leading-relaxed text-[var(--lma-text-secondary)]">
            <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[var(--lma-success)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
