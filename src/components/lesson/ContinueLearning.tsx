import { PreviousNextCard, type LearningDestination } from './PreviousNextCard';
import { Link } from 'react-router-dom';

type RelatedDestination = { title: string; to: string };

type ContinueLearningProps = {
  headingId: string;
  primary?: LearningDestination;
  secondary?: LearningDestination;
  related?: RelatedDestination[];
};

export function ContinueLearning({ headingId, primary, secondary, related = [] }: ContinueLearningProps) {
  return (
    <section data-continue-learning className="mt-16 border-t-2 border-[var(--lma-border-default)] pt-10 sm:pt-12" aria-labelledby={headingId}>
      <div className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--lma-brand)]">Keep moving through the path</p>
        <h2 id={headingId} className="mt-2 text-3xl font-extrabold text-[var(--lma-text-primary)]">Continue Learning</h2>
      </div>

      {(primary || secondary) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {primary && <PreviousNextCard destination={primary} direction="next" emphasized />}
          {secondary && <PreviousNextCard destination={secondary} direction="previous" />}
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-6 rounded-xl border border-[var(--lma-border-default)] bg-[var(--lma-surface)] p-4 sm:p-5">
          <h3 className="text-sm font-extrabold text-[var(--lma-text-primary)]">Related topics</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((item) => (
              <Link key={item.to} to={item.to} className="rounded-lg bg-[var(--lma-brand-soft)] px-3 py-2 text-sm font-semibold leading-snug text-[var(--lma-brand)] no-underline transition hover:bg-[var(--lma-brand-soft)] hover:text-[var(--lma-brand-text)]">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
