import React, { useState } from 'react';
import { getQuizzesForTopicId, QuizQuestion } from '../data/quizzes';
import { Target, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function QuizSection({ topicTitle, topicId }: { topicTitle?: string; topicId?: string }) {
  const id = topicId || topicTitle || '';
  const quizzes = getQuizzesForTopicId(id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  if (!quizzes || quizzes.length === 0) return null;

  const handleSelect = (quizId: number, optionIndex: number) => {
    if (showResults[quizId]) return;
    setSelectedAnswers(prev => ({ ...prev, [quizId]: optionIndex }));
  };

  const handleCheck = (quizId: number) => {
    if (selectedAnswers[quizId] === undefined || selectedAnswers[quizId] === null) return;
    setShowResults(prev => ({ ...prev, [quizId]: true }));
  };

  return (
    <div className="mt-16 pt-12 border-t-2 border-slate-200">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 flex items-center mb-4">
          <Target className="mr-3 text-indigo-600 h-8 w-8" />
          Knowledge Check
        </h2>
        <p className="text-lg text-slate-600">
          Test your understanding with these questions. Select an answer and click Check to see the explanation.
        </p>
      </div>

      <div className="space-y-8">
        {quizzes.map((quiz, index) => {
          const isRevealed = showResults[quiz.id];
          const selected = selectedAnswers[quiz.id];
          const isCorrect = selected === quiz.correctAnswerIndex;

          return (
            <div key={quiz.id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg flex items-start">
                  <span className="bg-indigo-100 text-indigo-800 text-sm py-1 px-3 rounded-full mr-3 mt-0.5 shrink-0">
                    Q{index + 1}
                  </span>
                  {quiz.question}
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {quiz.options.map((opt, optIdx) => {
                    let optionClass = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 cursor-pointer text-slate-700";

                    if (isRevealed) {
                      if (optIdx === quiz.correctAnswerIndex) {
                        optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900";
                      } else if (optIdx === selected) {
                        optionClass = "border-rose-500 bg-rose-50 text-rose-900";
                      } else {
                        optionClass = "border-slate-200 opacity-50 cursor-not-allowed";
                      }
                    } else if (selected === optIdx) {
                      optionClass = "border-indigo-500 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500";
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelect(quiz.id, optIdx)}
                        className={`p-4 rounded-lg border-2 transition-all ${optionClass}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center shrink-0
                            ${selected === optIdx ? 'border-indigo-500' : 'border-slate-300'}
                            ${isRevealed && optIdx === quiz.correctAnswerIndex ? 'border-emerald-500 bg-emerald-500' : ''}
                            ${isRevealed && optIdx === selected && !isCorrect ? 'border-rose-500 bg-rose-500' : ''}
                          `}>
                            {isRevealed && optIdx === quiz.correctAnswerIndex && <CheckCircle2 className="w-4 h-4 text-white" />}
                            {isRevealed && optIdx === selected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                            {!isRevealed && selected === optIdx && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                          </div>
                          <span className="font-medium text-sm leading-relaxed">{opt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!isRevealed ? (
                  <button
                    onClick={() => handleCheck(quiz.id)}
                    disabled={selected === undefined || selected === null}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className={`p-4 rounded-lg flex items-start border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                    <AlertCircle className={`h-6 w-6 mr-3 shrink-0 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`} />
                    <div>
                      <p className={`font-bold text-sm mb-1 ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                        {isCorrect ? 'Correct!' : 'Not quite'}
                      </p>
                      <p className={`text-sm ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {quiz.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
