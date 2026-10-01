import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

type LessonCompletionBannerProps = {
  topicId: string;
  topicTitle: string;
  nextTopic?: { id: string; title: string };
};

export function LessonCompletionBanner({
  topicId,
  topicTitle,
  nextTopic,
}: LessonCompletionBannerProps) {
  const { isCompleted, toggleCompleted, completedCount, totalLessonsCount, progressPercentage } = useProgress();
  const completed = isCompleted(topicId);

  return (
    <div
      className={`my-12 rounded-2xl border p-6 sm:p-8 transition-all ${
        completed
          ? 'border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-indigo-50/30'
          : 'border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50/20'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {completed ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Lesson Completed!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Track Your Progress
              </span>
            )}
            <span className="text-xs font-semibold text-slate-500">
              {progressPercentage}% curriculum done
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {completed ? `Great job completing "${topicTitle}"!` : `Finished "${topicTitle}"?`}
          </h3>

          <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
            {completed
              ? `You've completed ${completedCount} of ${totalLessonsCount} lessons across the curriculum. Keep up the great pace!`
              : 'Mark this lesson as completed to update your progress bar and track your milestones across the full curriculum.'}
          </p>

          {/* Mini progress bar */}
          <div className="pt-2 max-w-md">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
              <span>Overall Progress</span>
              <span>{completedCount} / {totalLessonsCount} lessons</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:items-end gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => toggleCompleted(topicId)}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition-all ${
              completed
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{completed ? 'Completed ✓ (Click to Undo)' : 'Mark Lesson as Complete'}</span>
          </button>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs w-full">
            {nextTopic && (
              <Link
                to={`/learn/${nextTopic.id}`}
                className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <span className="text-slate-300">·</span>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>All Modules</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
