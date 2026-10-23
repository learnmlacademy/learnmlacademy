import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  curriculum,
  curriculumTracks,
  getTrackById,
  type TrackId,
} from '../data/curriculum';
import { ArrowRight, BookOpen, CheckCircle2, Circle, Hammer, Sparkles, Wrench } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { CurriculumProgressCard, FilterStatus } from '../components/curriculum/CurriculumProgressCard';
import { projectPortfolio } from '../data/projectPortfolio';

const relatedHandbookMap: Record<string, { id: string; shortTitle: string; relationLabel?: string }> = {
  "project-customer-churn": { id: "model-to-production", shortTitle: "Model to Production", relationLabel: "Production Serving Build" },
  "project-credit-risk": { id: "credit-card-fraud", shortTitle: "Credit Card Fraud Detector", relationLabel: "Related Financial Risk Build" },
  "project-sales-forecasting": { id: "retail-forecasting", shortTitle: "Retail Sales Forecaster", relationLabel: "Practical Build" },
  "project-image-classification": { id: "digit-recognizer", shortTitle: "Handwritten Digit Recognizer", relationLabel: "Practical Build" },
  "project-genai-app": { id: "ai-content-creator", shortTitle: "AI Content Creator", relationLabel: "Practical Build" },
  "project-rag-document-qa": { id: "pdf-rag", shortTitle: "PDF RAG Assistant", relationLabel: "Practical Build" },
  "project-ai-agent": { id: "ai-research-assistant", shortTitle: "AI Research Assistant", relationLabel: "Practical Build" },
  "project-multi-agent-research": { id: "ai-research-assistant", shortTitle: "AI Research Assistant", relationLabel: "Practical Build" },
};

export function CurriculumPage() {
  const tutorialCount = curriculum.reduce((total, category) => total + category.subtopics.length, 0);
  const { isCompleted, toggleCompleted, getCategoryProgress } = useProgress();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchParams, setSearchParams] = useSearchParams();

  const trackParam = searchParams.get('track');
  const matchedTrack = trackParam ? getTrackById(trackParam) : undefined;
  const initialTrack: TrackId = matchedTrack ? matchedTrack.id : 'all';
  const [selectedTrack, setSelectedTrack] = useState<TrackId>(initialTrack);

  useEffect(() => {
    const currentParam = searchParams.get('track');
    if (!currentParam) {
      setSelectedTrack('all');
      return;
    }
    const found = getTrackById(currentParam);
    if (found) {
      setSelectedTrack(found.id);
    } else {
      // Invalid track parameter -> fail safely to 'all' and normalize URL
      setSelectedTrack('all');
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('track');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleTrackChange = (newTrackId: TrackId) => {
    if (newTrackId === selectedTrack) return;

    setSelectedTrack(newTrackId);
    const nextParams = new URLSearchParams(searchParams);
    if (newTrackId === 'all') {
      nextParams.delete('track');
    } else {
      nextParams.set('track', newTrackId);
    }
    setSearchParams(nextParams);
  };

  const currentTrack = getTrackById(selectedTrack) || curriculumTracks[0];
  const displayedCategories = curriculum.filter((category) => {
    if (selectedTrack !== 'all' && !currentTrack.categoryIds.includes(category.id)) {
      return false;
    }
    return true;
  });

  const totalTrackLessons = displayedCategories.reduce(
    (total, category) => total + category.subtopics.length,
    0
  );
  const trackIncludesProjects = displayedCategories.some((c) => c.id === 'projects');

  useEffect(() => {
    document.title = `AI Curriculum | ${tutorialCount} Free ML, LLM & Agent Tutorials | LearnMLAcademy`;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };
    const desc = `Browse ${tutorialCount} free tutorials covering Machine Learning, Deep Learning, Generative AI, Large Language Models, RAG, and Agentic AI with simple examples and code. Track your progress as you learn.`;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', 'Modern AI Curriculum | LearnMLAcademy');
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

      {/* Learning Track Filter & Guided Discovery */}
      <section aria-labelledby="track-filter-heading" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3.5">
          <div>
            <h2 id="track-filter-heading" className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Explore by Learning Track
            </h2>
            <p className="text-xs text-slate-500">
              Filter modules by your learning goal or view the complete curriculum roadmap.
            </p>
          </div>
          {selectedTrack !== 'all' && (
            <button
              type="button"
              onClick={() => handleTrackChange('all')}
              className="self-start sm:self-auto text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1.5 focus:outline-none focus:underline"
            >
              <span>Reset to full curriculum</span>
              <span aria-hidden="true" className="font-mono text-sm leading-none">✕</span>
            </button>
          )}
        </div>

        {/* Accessible Track Buttons / Tabs */}
        <div
          role="tablist"
          aria-label="Curriculum Learning Tracks"
          className="flex flex-wrap gap-2"
        >
          {curriculumTracks.map((track) => {
            const isSelected = selectedTrack === track.id;
            const trackCategoryCount = track.id === 'all' ? 17 : track.categoryIds.length;

            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="curriculum-track-panel"
                id={`track-tab-${track.id}`}
                onClick={() => handleTrackChange(track.id)}
                className={`group inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                    : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isSelected ? (
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true" />
                ) : (
                  <span className="flex h-2 w-2 rounded-full bg-slate-300 group-hover:bg-slate-400" aria-hidden="true" />
                )}
                <span>{track.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                    isSelected
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  {trackCategoryCount} {trackCategoryCount === 1 ? 'module' : 'modules'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Track Explanatory Callout Banner */}
        <div
          id="curriculum-track-panel"
          role="tabpanel"
          aria-labelledby={`track-tab-${selectedTrack}`}
          className="mt-3.5 rounded-xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-100 text-indigo-700 shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-slate-900">{currentTrack.label}</span>
                <span className="text-[11px] font-medium text-slate-500">
                  · {displayedCategories.length} {displayedCategories.length === 1 ? 'module' : 'modules'}, {totalTrackLessons} tutorial lessons
                  {trackIncludesProjects ? ' + 12 project handbooks' : ''}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {currentTrack.description}
              </p>
            </div>
          </div>
          {selectedTrack !== 'all' && (
            <button
              type="button"
              onClick={() => handleTrackChange('all')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 shrink-0 self-start sm:self-center flex items-center gap-1 focus:outline-none focus:underline"
            >
              Show all 17 modules →
            </button>
          )}
        </div>
      </section>

      {/* Curriculum Categories Grid */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {displayedCategories.map((category) => {
          if (category.id === 'projects') {
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
                className="md:col-span-2 flex flex-col overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-xs transition-shadow hover:shadow-md"
              >
                {/* Module Header with Progress */}
                <div className="border-b border-indigo-900/40 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 p-5 sm:p-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/20 text-indigo-200">
                        <Hammer className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-indigo-300">Hands-on builds & practical lessons</p>
                        <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">
                          {category.id === 'projects' ? '15. Project Handbooks & Tutorial Lessons' : category.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:self-center">
                      <span className="text-xs font-medium text-indigo-200">Tutorial Lessons Tracked:</span>
                      <span
                        className={`inline-flex items-center shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                          catProgress.percentage === 100
                            ? 'bg-emerald-500 text-white'
                            : catProgress.completed > 0
                            ? 'bg-indigo-500/40 text-indigo-100 border border-indigo-400/30'
                            : 'bg-white/10 text-indigo-200'
                        }`}
                      >
                        {catProgress.completed}/{catProgress.total} completed ({catProgress.percentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar for tracked tutorial lessons */}
                  <div className="mt-4 flex items-center gap-2.5">
                    <div
                      className="h-2 flex-1 rounded-full bg-indigo-950/80 overflow-hidden border border-indigo-800/40"
                      role="progressbar"
                      aria-valuenow={catProgress.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${category.title} progress`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          catProgress.percentage === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-indigo-400 to-cyan-400'
                        }`}
                        style={{ width: `${catProgress.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-indigo-200 w-10 text-right">
                      {catProgress.percentage}%
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-indigo-100/90">
                    This module features two distinct learning formats: <strong>12 full practical project handbooks</strong> (complete runnable applications built from an empty folder) and <strong>8 curriculum tutorial lessons</strong> (core lessons teaching project problem-framing, architectures, baselines, and production readiness).
                  </p>
                </div>

                {/* Dual-Section Presentation */}
                <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* SECTION A: Practical Project Handbooks (12 Builds) */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-amber-600" aria-hidden="true" />
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Practical Project Handbooks
                        </h3>
                        <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                          12 Builds
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-normal">
                        Full reference implementations with raw data, pipelines, Streamlit UI, tests, and starter downloads. Available independently of lesson progress.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
                      {projectPortfolio.map(project => (
                        <Link
                          key={project.id}
                          to={`/projects/${project.id}`}
                          className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs transition hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900 group-hover:text-indigo-600 leading-snug">
                              {project.shortTitle}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-600" aria-hidden="true" />
                          </div>
                          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              project.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                              project.level === 'Intermediate' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                              'bg-purple-50 text-purple-700 border border-purple-100'
                            }`}>
                              {project.level}
                            </span>
                            <span className="text-slate-400 text-[10px] font-mono">/projects/{project.id}</span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Need starter ZIPs & walkthroughs?</span>
                      <Link
                        to="/projects"
                        className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-800"
                      >
                        View All Handbooks Directory <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {/* SECTION B: Project Tutorial Lessons (8 Tracked Lessons) */}
                  <div className="lg:col-span-5 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
                    <div className="border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Curriculum Tutorial Lessons
                        </h3>
                        <span className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                          8 Tracked Lessons
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-normal">
                        Sequential curriculum lessons teaching methodology, validation, and error analysis. Tracked in your learning progress.
                      </p>
                    </div>

                    {filteredSubtopics.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        {filter === 'completed'
                          ? 'No project tutorial lessons completed yet.'
                          : 'All project tutorial lessons completed! 🎉'}
                      </div>
                    ) : (
                      <ul className="space-y-2 flex-1">
                        {filteredSubtopics.map((topic, topicIndex) => {
                          const completed = isCompleted(topic.id);
                          const related = relatedHandbookMap[topic.id];
                          return (
                            <li
                              key={topic.id}
                              className="flex items-start justify-between gap-2 rounded-xl p-2 sm:p-1.5 transition-colors hover:bg-slate-50 border border-transparent hover:border-slate-200"
                            >
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
                                className="h-10 w-10 sm:h-8 sm:w-8 -ml-1 mt-0.5 flex items-center justify-center rounded-lg text-slate-300 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 shrink-0"
                              >
                                {completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                                )}
                              </button>

                              {/* Center: Lesson Link */}
                              <div className="flex-1 min-w-0 py-1">
                                <div className="flex items-start gap-1.5">
                                  <span
                                    aria-hidden="true"
                                    className="font-mono text-xs text-slate-400 shrink-0 tabular-nums mt-0.5"
                                  >
                                    {topicIndex + 1}.
                                  </span>
                                  <div className="min-w-0">
                                    <Link
                                      to={`/learn/${topic.id}`}
                                      className={`text-sm font-medium transition-colors hover:text-indigo-600 block leading-snug ${
                                        completed
                                          ? 'text-slate-500 line-through decoration-slate-300'
                                          : 'text-slate-800'
                                      }`}
                                    >
                                      {topic.title}
                                    </Link>
                                    {related && (
                                      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                                        <span>↳ {related.relationLabel || 'Related Handbook'}:</span>
                                        <Link
                                          to={`/projects/${related.id}`}
                                          className="font-medium text-indigo-600 hover:text-indigo-800 underline truncate"
                                        >
                                          {related.shortTitle}
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Right: Quick Completed Pill if done */}
                              {completed && (
                                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded px-1.5 py-0.5 mt-1">
                                  Done
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
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
                            className="flex-1 min-w-0 py-1.5 group flex items-center gap-2"
                          >
                            <span
                              aria-hidden="true"
                              className="font-mono text-xs text-slate-400 group-hover:text-indigo-600 shrink-0 tabular-nums"
                            >
                              {topicIndex + 1}.
                            </span>
                            {' '}
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
