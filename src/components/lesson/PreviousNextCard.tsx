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
        'group flex min-w-0 flex-col border-y border-[var(--lma-border-default)] py-4 no-underline transition sm:py-5',
        emphasized ? 'text-[var(--lma-brand)]' : 'text-[var(--lma-text-secondary)]',
      )}
    >
      <span className={cn(
        'flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.1em]',
        isNext && 'justify-between',
        emphasized ? 'text-[var(--lma-brand)]' : 'text-[var(--lma-text-muted)]',
      )}>
        {!isNext && <Icon className="h-4 w-4" aria-hidden="true" />}
        {destination.label}
        {isNext && <Icon className="h-4 w-4" aria-hidden="true" />}
      </span>
      <span className="mt-2 break-words text-base font-extrabold leading-snug text-[var(--lma-text-primary)] group-hover:text-[var(--lma-brand-text)]">
        {destination.title}
      </span>
      {destination.context && <span className="mt-2 text-xs leading-relaxed text-[var(--lma-text-muted)]">{destination.context}</span>}
    </Link>
  );
}
