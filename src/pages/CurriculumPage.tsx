import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { ArrowRight, BookOpen, CheckCircle2, Circle, Hammer, Wrench } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { CurriculumProgressCard, FilterStatus } from '../components/curriculum/CurriculumProgressCard';
import { projectPortfolio } from '../data/projectPortfolio';

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
          if (category.id === 'projects') {
            return (
              <div
                key={category.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 shadow-sm"
              >
                <div className="border-b border-indigo-100 bg-indigo-950 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/20 text-indigo-200">
                      <Hammer className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-indigo-300">Hands-on learning</p>
                      <h2 className="mt-1 text-xl font-black text-white">14. Project Handbooks</h2>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-indigo-100">
                    {projectPortfolio.length} recognizable projects built from an empty folder to a working application.
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-white p-4">
                    <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-black text-slate-900">Every project shows the exact tools first</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Python, libraries, IDE, notebook, model, UI, deployment and supporting tools are listed before the learner starts.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {projectPortfolio.slice(0, 6).map(project => (
                      <span key={project.id} className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-800">
                        {project.shortTitle}
                      </span>
                    ))}
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600">
                      +{projectPortfolio.length - 6} more
                    </span>
                  </div>
                  <Link
                    to="/projects"
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-black text-white transition hover:bg-indigo-700"
                  >
                    Explore all project handbooks
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          }

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
