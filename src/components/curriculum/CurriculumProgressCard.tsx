import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import {
  Trophy,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ListFilter,
  Flame,
  ArrowRight,
} from 'lucide-react';

export type FilterStatus = 'all' | 'incomplete' | 'completed';

type CurriculumProgressCardProps = {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
};

export function CurriculumProgressCard({
  activeFilter,
  onFilterChange,
}: CurriculumProgressCardProps) {
  const {
    completedCount,
    totalLessonsCount,
    progressPercentage,
    resetProgress,
    lastVisitedTopicId,
    getNextIncompleteTopic,
  } = useProgress();

  const [confirmReset, setConfirmReset] = useState(false);

  const nextTopic = getNextIncompleteTopic();
  const resumeTopicId = lastVisitedTopicId || (nextTopic ? nextTopic.id : null);

  const getMilestoneMessage = (pct: number) => {
    if (pct === 100) return { title: 'Curriculum Mastered! 🎉', desc: 'Incredible work! You have completed every lesson in the curriculum.' };
    if (pct >= 75) return { title: 'Final Stretch! 🚀', desc: "You're in the advanced stages. Finish strong!" };
    if (pct >= 50) return { title: 'Halfway Milestone! ⚡', desc: 'Over halfway completed! Your AI engineering skills are solidifying.' };
    if (pct >= 25) return { title: 'Building Momentum! 🔥', desc: 'Great consistency! Keep pushing through the modules.' };
    if (pct > 0) return { title: 'Off to a Great Start! 🌱', desc: 'Every lesson completed builds real practical AI intuition.' };
    return { title: 'Begin Your AI Journey 🧭', desc: 'Select any topic to start reading, or follow the curated order.' };
  };

  const milestone = getMilestoneMessage(progressPercentage);

  return (
    <div className="mb-10 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/70 p-6 sm:p-7 shadow-sm">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 px-3 py-1 text-xs font-bold text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Personal Learning Progress</span>
            </span>
            {progressPercentage > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <Flame className="w-3 h-3 text-emerald-600" />
                <span>{completedCount} completed</span>
              </span>
            )}
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            {milestone.title}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {milestone.desc}
          </p>
        </div>

        {/* Big percentage & stats badge */}
        <div className="flex items-baseline gap-2 sm:text-right shrink-0">
          <span className="text-4xl font-black tracking-tight text-indigo-600">
            {progressPercentage}%
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            ({completedCount}/{totalLessonsCount} Lessons)
          </span>
        </div>
      </div>

      {/* Main Progress Bar Container */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
          <span>Overall Course Completion</span>
          <span className="text-indigo-600 font-extrabold">{progressPercentage}%</span>
        </div>
        <div
          className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200/90 shadow-inner"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Curriculum Progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-indigo-600 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Action Strip: Resume + Filters + Reset */}
      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Quick Resume Button */}
        <div className="flex w-full sm:w-auto items-center">
          {resumeTopicId ? (
            <Link
              to={`/learn/${resumeTopicId}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>
                {lastVisitedTopicId ? 'Resume Where You Left Off' : 'Start Next Lesson'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to="/learn/what-is-ml"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start First Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Middle/Right: Filter tabs */}
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 text-xs font-semibold overflow-x-auto lma-scrollbar">
          <span className="hidden md:inline-flex items-center gap-1 px-2 text-slate-500 font-medium text-[11px]">
            <ListFilter className="w-3 h-3" />
            Filter:
          </span>
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`flex-1 sm:flex-none text-center rounded-lg px-2.5 py-2 transition whitespace-nowrap min-h-[38px] ${
              activeFilter === 'all'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All <span className="text-[11px] opacity-80">({totalLessonsCount})</span>
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('incomplete')}
            className={`flex-1 sm:flex-none text-center rounded-lg px-2.5 py-2 transition whitespace-nowrap min-h-[38px] ${
              activeFilter === 'incomplete'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Incomplete <span className="text-[11px] opacity-80">({totalLessonsCount - completedCount})</span>
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('completed')}
            className={`flex-1 sm:flex-none text-center rounded-lg px-2.5 py-2 transition whitespace-nowrap min-h-[38px] ${
              activeFilter === 'completed'
                ? 'bg-white text-indigo-700 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed <span className="text-[11px] opacity-80">({completedCount})</span>
          </button>
        </div>

        {/* Reset progress with inline confirm */}
        {completedCount > 0 && (
          <div>
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-rose-600 transition"
                title="Reset all progress tracking"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600 font-medium">Clear progress?</span>
                <button
                  type="button"
                  onClick={() => {
                    resetProgress();
                    setConfirmReset(false);
                  }}
                  className="rounded px-2 py-0.5 bg-rose-600 text-white font-bold hover:bg-rose-700"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded px-2 py-0.5 bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
