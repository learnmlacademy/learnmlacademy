import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../layout/classNames';

export type LearningDestination = {
  label: string;
  title: string;
  to: string;
  context?: string;
};

type PreviousNextCardProps = {
  destination: LearningDestination;
  direction: 'previous' | 'next';
  emphasized?: boolean;
};

export function PreviousNextCard({ destination, direction, emphasized = false }: PreviousNextCardProps) {
  const isNext = direction === 'next';
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      to={destination.to}
      className={cn(
        'group flex min-w-0 flex-col rounded-xl border p-4 no-underline transition sm:p-5',
        emphasized
          ? 'border-[var(--lma-brand-border)] bg-[var(--lma-brand)] text-[var(--lma-brand-contrast)] shadow-sm hover:bg-[var(--lma-brand-hover)]'
          : 'border-[var(--lma-border-default)] bg-[var(--lma-surface)] text-[var(--lma-text-secondary)] hover:border-[var(--lma-brand-border)] hover:bg-[var(--lma-brand-soft)]',
      )}
    >
      <span className={cn('flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.1em]', isNext && 'justify-between', emphasized ? 'text-[var(--lma-text-inverse)]' : 'text-[var(--lma-text-muted)]')}>
        {!isNext && <Icon className="h-4 w-4" aria-hidden="true" />}
        {destination.label}
        {isNext && <Icon className="h-4 w-4" aria-hidden="true" />}
      </span>
      <span className={cn('mt-2 break-words text-base font-extrabold leading-snug', emphasized ? 'text-[var(--lma-brand-contrast)]' : 'text-[var(--lma-text-primary)] group-hover:text-[var(--lma-brand-text)]')}>{destination.title}</span>
      {destination.context && <span className={cn('mt-2 text-xs leading-relaxed', emphasized ? 'text-[var(--lma-text-inverse)]' : 'text-[var(--lma-text-muted)]')}>{destination.context}</span>}
    </Link>
  );
}
