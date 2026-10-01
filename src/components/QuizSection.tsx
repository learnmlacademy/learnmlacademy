import { useState } from 'react';
import { getQuizzesForTopicId } from '../data/quizzes';
import { AlertCircle, CheckCircle2, Target, XCircle } from 'lucide-react';

export function QuizSection({ topicTitle, topicId }: { topicTitle?: string; topicId?: string }) {
  const id = topicId || topicTitle || '';
  const quizzes = getQuizzesForTopicId(id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  if (!quizzes || quizzes.length === 0) return null;

  const handleSelect = (quizId: number, optionIndex: number) => {
    if (showResults[quizId]) return;
    setSelectedAnswers(previous => ({ ...previous, [quizId]: optionIndex }));
  };

  const handleCheck = (quizId: number) => {
    if (selectedAnswers[quizId] === undefined || selectedAnswers[quizId] === null) return;
    setShowResults(previous => ({ ...previous, [quizId]: true }));
    requestAnimationFrame(() => document.getElementById(`quiz-result-${id}-${quizId}`)?.focus({ preventScroll: true }));
  };

  return (
    <section data-knowledge-check className="mt-16 border-t-2 border-[var(--lma-border-default)] pt-10 sm:pt-12" aria-labelledby={`knowledge-check-${id}`}>
      <div className="mb-7">
        <h2 id={`knowledge-check-${id}`} className="flex items-center gap-3 text-3xl font-extrabold text-[var(--lma-text-primary)]">
          <Target className="h-8 w-8 shrink-0 text-[var(--lma-brand)]" aria-hidden="true" />
          Knowledge Check
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--lma-text-secondary)] sm:text-lg">
          Test your understanding. Choose one answer for each question, then check it to reveal the result and explanation.
        </p>
      </div>

      <div className="space-y-6">
        {quizzes.map((quiz, index) => {
          const isRevealed = Boolean(showResults[quiz.id]);
          const selected = selectedAnswers[quiz.id];
          const isCorrect = selected === quiz.correctAnswerIndex;
          const resultId = `quiz-result-${id}-${quiz.id}`;
          const groupName = `quiz-${id}-${quiz.id}`;

          return (
            <form
              key={quiz.id}
              className="rounded-2xl border border-[var(--lma-border-default)] bg-[var(--lma-surface)] p-4 shadow-sm sm:p-6"
              onSubmit={event => {
                event.preventDefault();
                handleCheck(quiz.id);
              }}
            >
              <fieldset disabled={isRevealed} aria-describedby={isRevealed ? resultId : undefined}>
                <legend className="w-full text-lg font-extrabold leading-snug text-[var(--lma-text-primary)]">
                  <span className="mb-3 block text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--lma-brand)]">
                    Question {index + 1} of {quizzes.length}
                  </span>
                  {quiz.question}
                </legend>

                <div className="mt-5 space-y-3">
                  {quiz.options.map((option, optionIndex) => {
                    const selectedOption = selected === optionIndex;
                    const correctOption = isRevealed && optionIndex === quiz.correctAnswerIndex;
                    const incorrectSelection = isRevealed && selectedOption && !isCorrect;
                    const optionState = correctOption
                      ? 'border-[var(--lma-success)] bg-[var(--lma-success-soft)] text-[var(--lma-success-text)]'
                      : incorrectSelection
                        ? 'border-[var(--lma-danger)] bg-[var(--lma-danger-soft)] text-[var(--lma-danger-text)]'
                        : selectedOption
                          ? 'border-[var(--lma-brand)] bg-[var(--lma-brand-soft)] text-[var(--lma-brand-text)] ring-1 ring-[var(--lma-focus-ring)]'
                          : 'border-[var(--lma-border-default)] bg-[var(--lma-surface)] text-[var(--lma-text-secondary)] hover:border-[var(--lma-brand-border)] hover:bg-[var(--lma-canvas)]';

                    return (
                      <label
                        key={optionIndex}
                        className={`flex min-h-12 items-start gap-3 rounded-xl border-2 p-3.5 text-sm font-medium leading-relaxed transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--lma-focus-ring)] has-[:focus-visible]:ring-offset-2 sm:p-4 ${optionState} ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <input
                          type="radio"
                          name={groupName}
                          value={optionIndex}
                          checked={selectedOption}
                          onChange={() => handleSelect(quiz.id, optionIndex)}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--lma-brand)]"
                        />
                        <span className="min-w-0 flex-1">
                        <span>{option}</span>
                        {correctOption && (
                          <span className="mt-2 flex items-center gap-1 text-xs font-extrabold text-[var(--lma-success-text)]">
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            {selectedOption ? 'Your answer · Correct' : 'Correct answer'}
                          </span>
                        )}
                        {incorrectSelection && (
                          <span className="mt-2 flex items-center gap-1 text-xs font-extrabold text-[var(--lma-danger-text)]">
                            <XCircle className="h-4 w-4" aria-hidden="true" /> Your answer
                          </span>
                        )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {!isRevealed ? (
                <button
                  type="submit"
                  disabled={selected === undefined || selected === null}
                  className="mt-5 min-h-11 rounded-lg bg-[var(--lma-brand)] px-5 py-2.5 font-bold text-[var(--lma-brand-contrast)] transition hover:bg-[var(--lma-brand-hover)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Check Answer
                </button>
              ) : (
                <div
                  id={resultId}
                  role="status"
                  tabIndex={-1}
                  aria-live="polite"
                  className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${isCorrect ? 'border-[var(--lma-success-border)] bg-[var(--lma-success-soft)]' : 'border-[var(--lma-danger-border)] bg-[var(--lma-danger-soft)]'}`}
                >
                  <AlertCircle className={`mt-0.5 h-5 w-5 shrink-0 ${isCorrect ? 'text-[var(--lma-success-text)]' : 'text-[var(--lma-danger-text)]'}`} aria-hidden="true" />
                  <div>
                    <p className={`font-extrabold ${isCorrect ? 'text-[var(--lma-success-text)]' : 'text-[var(--lma-danger-text)]'}`}>{isCorrect ? 'Correct.' : 'Incorrect.'}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--lma-text-secondary)]">{quiz.explanation}</p>
                    <p className="mt-2 text-xs font-semibold text-[var(--lma-text-secondary)]">This answer is now locked for this attempt.</p>
                  </div>
                </div>
              )}
            </form>
          );
        })}
      </div>
    </section>
  );
}
