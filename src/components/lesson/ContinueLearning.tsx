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
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--lma-brand)]">Next in the curriculum</p>
        <h2 id={headingId} className="mt-2 text-3xl font-extrabold text-[var(--lma-text-primary)]">Continue learning</h2>
      </div>

      {(primary || secondary) && (
        <div className="grid gap-x-8 sm:grid-cols-2">
          {primary && <PreviousNextCard destination={primary} direction="next" emphasized />}
          {secondary && <PreviousNextCard destination={secondary} direction="previous" />}
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-7">
          <h3 className="text-sm font-extrabold text-[var(--lma-text-primary)]">Related topics</h3>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {related.map((item) => (
              <Link key={item.to} to={item.to} className="text-sm font-semibold leading-snug text-[var(--lma-brand)] no-underline hover:text-[var(--lma-brand-text)] hover:underline">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
