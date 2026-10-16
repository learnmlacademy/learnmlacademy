import { useState } from 'react';
import { getQuizzesForTopicId } from '../data/quizzes';
import { AlertCircle, CheckCircle2, Target, XCircle, RotateCcw, Trophy, Award, Sparkles, Check } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export function QuizSection({ topicTitle, topicId }: { topicTitle?: string; topicId?: string }) {
  const id = topicId || topicTitle || '';
  const quizzes = getQuizzesForTopicId(id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const { isCompleted, markCompleted } = useProgress();

  if (!quizzes || quizzes.length === 0) return null;

  const totalQuestions = quizzes.length;
  const answeredCount = Object.keys(showResults).filter(k => showResults[Number(k)]).length;
  const correctCount = quizzes.filter(q => showResults[q.id] && selectedAnswers[q.id] === q.correctAnswerIndex).length;
  const isFinished = answeredCount === totalQuestions;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const lessonDone = id ? isCompleted(id) : false;

  const handleSelect = (quizId: number, optionIndex: number) => {
    if (showResults[quizId]) return;
    setSelectedAnswers(previous => ({ ...previous, [quizId]: optionIndex }));
  };

  const handleCheck = (quizId: number) => {
    if (selectedAnswers[quizId] === undefined || selectedAnswers[quizId] === null) return;
    setShowResults(previous => ({ ...previous, [quizId]: true }));
    requestAnimationFrame(() => document.getElementById(`quiz-result-${id}-${quizId}`)?.focus({ preventScroll: true }));
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setShowResults({});
  };

  return (
    <section data-knowledge-check className="mt-16 border-t-2 border-[var(--lma-border-default)] pt-10 sm:pt-12" aria-labelledby={`knowledge-check-${id}`}>
      {/* Header & Score Bar */}
      <div className="mb-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id={`knowledge-check-${id}`} className="flex items-center gap-3 text-3xl font-extrabold text-[var(--lma-text-primary)]">
            <Target className="h-8 w-8 shrink-0 text-[var(--lma-brand)]" aria-hidden="true" />
            Knowledge Check
          </h2>

          {/* Live Progress Pill */}
          <div className="flex items-center gap-3 rounded-full border border-[var(--lma-border-default)] bg-[var(--lma-surface)] px-4 py-1.5 shadow-2xs">
            <span className="text-xs font-bold text-[var(--lma-text-secondary)]">
              Progress: <strong className="text-[var(--lma-text-primary)] font-mono">{answeredCount}/{totalQuestions}</strong>
            </span>
            {answeredCount > 0 && (
              <span className={`rounded-full px-2 py-0.5 text-xs font-mono font-bold ${
                correctCount === answeredCount ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
              }`}>
                {correctCount} Correct
              </span>
            )}
          </div>
        </div>

        <p className="mt-3 text-base leading-relaxed text-[var(--lma-text-secondary)] sm:text-lg">
          Test your active recall. Choose one answer for each question, then check it to reveal the step-by-step reasoning.
        </p>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--lma-border-default)]/60">
          <div
            className="h-full bg-[var(--lma-brand)] transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions List */}
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
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--lma-brand)]">
                    Question {index + 1} of {quizzes.length}
                  </span>
                  {quiz.questionType && (
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      {quiz.questionType}
                    </span>
                  )}
                </div>

                <legend className="w-full text-lg font-extrabold leading-snug text-[var(--lma-text-primary)]">
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
                  </div>
                </div>
              )}
            </form>
          );
        })}
      </div>

      {/* Completion Summary Card when all questions are answered */}
      {isFinished && (
        <div className="mt-8 rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/90 via-white to-indigo-50/60 p-6 sm:p-8 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-indigo-600 p-3 text-white shadow-md">
                {scorePercent === 100 ? (
                  <Trophy className="h-8 w-8 text-amber-300" />
                ) : (
                  <Award className="h-8 w-8 text-indigo-100" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Quiz Completed
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {scorePercent === 100
                    ? 'Perfect Score! 🌟 Topic Mastered'
                    : scorePercent >= 75
                    ? 'Great Work! 🚀 Strong Understanding'
                    : 'Good Effort! 📚 Review & Retake'}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  You scored <strong className="text-slate-900 font-bold">{correctCount} out of {totalQuestions}</strong> ({scorePercent}%).
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Quiz</span>
              </button>

              {id && !lessonDone && (
                <button
                  type="button"
                  onClick={() => markCompleted(id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500"
                >
                  <Check className="h-4 w-4" />
                  <span>Mark Lesson Complete</span>
                </button>
              )}

              {lessonDone && (
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100 px-4 py-2.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Lesson Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Check Review & Detailed Answers (Crawlable DOM & Quick Review) */}
      <div className="mt-10 border-t border-slate-200/90 pt-8">
        <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <span>Knowledge Check Review & Explanations</span>
        </h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Review the questions, verified correct answers, and conceptual explanations for this lesson.
        </p>
        <div className="space-y-3">
          {quizzes.map((quiz, index) => (
            <details
              key={quiz.id}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition hover:border-indigo-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900">
                <span className="flex items-start gap-2.5 pr-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-black text-indigo-700">
                    {index + 1}
                  </span>
                  <span>{quiz.question}</span>
                </span>
                <span className="ml-2 shrink-0 text-xs font-semibold text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-3.5 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                <p className="font-bold text-emerald-700 flex items-center gap-1.5 mb-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  Correct Answer: {quiz.options[quiz.correctAnswerIndex]}
                </p>
                <p className="text-slate-600 leading-normal">{quiz.explanation}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
