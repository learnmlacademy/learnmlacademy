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
          <Target className="h-7 w-7 shrink-0 text-[var(--lma-brand)]" aria-hidden="true" />
          Knowledge Check
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--lma-text-secondary)] sm:text-lg">
          Choose one answer for each question, then check it to reveal the result and explanation.
        </p>
      </div>

      <div className="divide-y divide-[var(--lma-border-default)] border-y border-[var(--lma-border-default)]">
        {quizzes.map((quiz, index) => {
          const isRevealed = Boolean(showResults[quiz.id]);
          const selected = selectedAnswers[quiz.id];
          const isCorrect = selected === quiz.correctAnswerIndex;
          const resultId = `quiz-result-${id}-${quiz.id}`;
          const groupName = `quiz-${id}-${quiz.id}`;

          return (
            <form
              key={quiz.id}
              className="py-7"
              onSubmit={event => {
                event.preventDefault();
                handleCheck(quiz.id);
              }}
            >
              <fieldset disabled={isRevealed} aria-describedby={isRevealed ? resultId : undefined}>
                <legend className="w-full text-lg font-extrabold leading-snug text-[var(--lma-text-primary)]">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--lma-brand)]">
                    Question {index + 1} of {quizzes.length}
                  </span>
                  {quiz.question}
                </legend>

                <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                  {quiz.options.map((option, optionIndex) => {
                    const selectedOption = selected === optionIndex;
                    const correctOption = isRevealed && optionIndex === quiz.correctAnswerIndex;
                    const incorrectSelection = isRevealed && selectedOption && !isCorrect;
                    const optionState = correctOption
                      ? 'bg-[var(--lma-success-soft)] text-[var(--lma-success-text)]'
                      : incorrectSelection
                        ? 'bg-[var(--lma-danger-soft)] text-[var(--lma-danger-text)]'
                        : selectedOption
                          ? 'bg-[var(--lma-brand-soft)] text-[var(--lma-brand-text)]'
                          : 'text-[var(--lma-text-secondary)] hover:bg-[var(--lma-canvas)]';

                    return (
                      <label
                        key={optionIndex}
                        className={`flex min-h-12 items-start gap-3 px-3 py-3.5 text-sm font-medium leading-relaxed transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--lma-focus-ring)] has-[:focus-visible]:ring-inset sm:px-4 ${optionState} ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
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
                  className="mt-5 min-h-11 bg-[var(--lma-brand)] px-5 py-2.5 font-bold text-[var(--lma-brand-contrast)] transition hover:bg-[var(--lma-brand-hover)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Check Answer
                </button>
              ) : (
                <div
                  id={resultId}
                  role="status"
                  tabIndex={-1}
                  aria-live="polite"
                  className={`mt-5 flex items-start gap-3 border-l-4 p-4 ${isCorrect ? 'border-l-[var(--lma-success)] bg-[var(--lma-success-soft)]' : 'border-l-[var(--lma-danger)] bg-[var(--lma-danger-soft)]'}`}
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
