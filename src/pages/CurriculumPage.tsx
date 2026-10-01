import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { BookOpen, CheckCircle2, Circle, Check } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { CurriculumProgressCard, FilterStatus } from '../components/curriculum/CurriculumProgressCard';

export function CurriculumPage() {
  const tutorialCount = curriculum.reduce((total, category) => total + category.subtopics.length, 0);
  const { isCompleted, toggleCompleted, getCategoryProgress } = useProgress();
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    document.title = `AI Curriculum | ${tutorialCount} Free ML, LLM & Agent Tutorials | ML Academy`;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };
    const desc = `Browse ${tutorialCount} free tutorials covering Machine Learning, Deep Learning, Generative AI, Large Language Models, RAG, and Agentic AI with simple examples and code. Track your progress as you learn.`;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', 'Modern AI Curriculum | ML Academy');
    setMeta('meta[property="og:description"]', 'content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/curriculum');
  }, [tutorialCount]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      {/* Page Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
          Modern AI Curriculum
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A complete, step-by-step roadmap from Machine Learning foundations to Deep Learning, Generative AI, LLMs, and Production AI Agents.
        </p>
      </div>

      {/* Interactive Curriculum Progress Dashboard */}
      <CurriculumProgressCard activeFilter={filter} onFilterChange={setFilter} />

      {/* Curriculum Categories Grid */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {curriculum.map((category) => {
          const catProgress = getCategoryProgress(category.id);
          const filteredSubtopics = category.subtopics.filter((topic) => {
            const completed = isCompleted(topic.id);
            if (filter === 'completed') return completed;
            if (filter === 'incomplete') return !completed;
            return true;
          });

          return (
            <div
              key={category.id}
              className={`flex flex-col bg-white border rounded-2xl p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-md ${
                catProgress.percentage === 100
                  ? 'border-emerald-200/90 bg-gradient-to-b from-white to-emerald-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Category Header with Title & Category-level Progress */}
              <div className="border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-indigo-950 flex items-center gap-2.5">
                    <BookOpen className="text-indigo-600 w-5 h-5 shrink-0" />
                    <span>{category.title}</span>
                  </h2>
                  <span
                    className={`inline-flex items-center shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      catProgress.percentage === 100
                        ? 'bg-emerald-100 text-emerald-800'
                        : catProgress.completed > 0
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {catProgress.completed}/{catProgress.total}
                  </span>
                </div>

                {/* Category Progress Bar */}
                <div className="mt-3 flex items-center gap-2.5">
                  <div
                    className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={catProgress.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${category.title} progress`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        catProgress.percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${catProgress.percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 w-8 text-right">
                    {catProgress.percentage}%
                  </span>
                </div>
              </div>

              {/* Lessons List */}
              {filteredSubtopics.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 italic">
                  {filter === 'completed'
                    ? 'No lessons completed yet in this module.'
                    : 'All lessons completed in this module! 🎉'}
                </div>
              ) : (
                <ul className="space-y-2 flex-1">
                  {filteredSubtopics.map((topic, topicIndex) => {
                    const completed = isCompleted(topic.id);
                    return (
                      <React.Fragment key={topic.id}>
                        {topic.module && topic.module !== filteredSubtopics[topicIndex - 1]?.module && (
                          <li className="pt-2.5 pb-1 first:pt-0 text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-600">
                            {topic.module}
                          </li>
                        )}
                        <li className="flex items-center justify-between gap-2.5 rounded-xl p-2 sm:p-1.5 transition-colors hover:bg-slate-50">
                          {/* Left: Completion Toggle Checkbox Button with 44px mobile touch target */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleCompleted(topic.id);
                            }}
                            title={completed ? 'Mark as incomplete' : 'Mark as completed'}
                            aria-label={`Mark ${topic.title} as ${completed ? 'incomplete' : 'completed'}`}
                            className="h-10 w-10 sm:h-8 sm:w-8 -ml-1 flex items-center justify-center rounded-lg text-slate-300 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 shrink-0"
                          >
                            {completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                            )}
                          </button>

                          {/* Center: Lesson Link */}
                          <Link
                            to={`/learn/${topic.id}`}
                            className="flex-1 min-w-0 py-1.5 group"
                          >
                            <span
                              className={`text-sm font-medium transition-colors group-hover:text-indigo-600 block truncate ${
                                completed
                                  ? 'text-slate-500 line-through decoration-slate-300'
                                  : 'text-slate-800'
                              }`}
                            >
                              {topic.title}
                            </span>
                          </Link>

                          {/* Right: Quick Completed Pill if done */}
                          {completed && (
                            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded px-1.5 py-0.5">
                              Done
                            </span>
                          )}
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
