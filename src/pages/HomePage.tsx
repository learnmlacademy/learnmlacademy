import React, { useState, useEffect, useRef, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FolderKanban,
  Lightbulb,
  MessageSquareText,
  Network,
  ServerCog,
  Sparkles,
  Search,
  BookOpen,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  Flame,
  Terminal,
  Layers,
  ArrowUpRight,
  GraduationCap,
  Play,
  ListFilter,
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { curriculum, type Category } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

type ChapterTrack = {
  id: string;
  number: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  description: string;
  route: string;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  categories: Category[];
  keyConcepts: string[];
};

const countLessons = (categoryId: string) =>
  curriculum.find(category => category.id === categoryId)?.subtopics.length ?? 0;

const chapterTracks: ChapterTrack[] = [
  {
    id: 'machine-learning',
    number: '01',
    title: 'Machine Learning',
    shortTitle: 'Machine Learning',
    tagline: 'Math, Data Pipelines, Classifiers, Regressors, Trees & Ensembles',
    description: 'Master core algorithmic thinking: exploratory data analysis, regularized regression, decision trees, random forests, boosting ensembles, unsupervised learning, and model evaluation.',
    route: '/learn/what-is-ml',
    icon: Network,
    categories: curriculum.slice(0, 9),
    keyConcepts: ['Scikit-learn', 'Feature Engineering', 'Bias-Variance', 'Ensembles', 'Cross-Validation'],
  },
  {
    id: 'deep-learning',
    number: '02',
    title: 'Deep Learning',
    shortTitle: 'Deep Learning',
    tagline: 'Backprop, CNNs, Attention, Vision & Transformers',
    description: 'Build neural intuition from ground zero: implement forward/backward passes in raw code, then scale to convolutions, self-attention, vision transformers, and deployment.',
    route: '/learn/deep-learning-intro',
    icon: BrainCircuit,
    categories: curriculum.filter(category => category.id === 'deep-learning' || category.id === 'advanced-deep-learning'),
    keyConcepts: ['PyTorch', 'Backpropagation', 'Self-Attention', 'Residual Nets', 'Vision Transformers'],
  },
  {
    id: 'generative-ai',
    number: '03',
    title: 'Generative AI',
    shortTitle: 'Generative AI',
    tagline: 'Latent Spaces, VAEs, GANs & Diffusion Models',
    description: 'Understand how models learn probability distributions: from Variational Autoencoders and GANs to modern score-based diffusion models and multimodal generation.',
    route: '/learn/generative-ai-intro',
    icon: Sparkles,
    categories: curriculum.filter(category => category.id === 'generative-ai'),
    keyConcepts: ['Latent Distributions', 'U-Net', 'Diffusion Models', 'Classifier-Free Guidance', 'Multimodal'],
  },
  {
    id: 'large-language-models',
    number: '04',
    title: 'LLMs & RAG',
    shortTitle: 'LLMs & RAG',
    tagline: 'Tokenization, Embeddings, Vector DBs, RAG & Fine-Tuning',
    description: 'Master modern language models: dense semantic retrieval, vector databases, chunking strategies, LoRA fine-tuning, reasoning models, and evaluation.',
    route: '/learn/llm-intro',
    icon: MessageSquareText,
    categories: curriculum.filter(category => category.id === 'large-language-models'),
    keyConcepts: ['Vector Search', 'Hybrid RAG', 'LoRA / QLoRA', 'Context Windows', 'RAG Evaluation'],
  },
  {
    id: 'agentic-ai',
    number: '05',
    title: 'Agentic AI',
    shortTitle: 'Agentic AI',
    tagline: 'Tool Calling, ReAct, Memory, State Graphs & Multi-Agent',
    description: 'Transform passive language models into active problem solvers: reliable tool calling, state graphs, reflection loops, and multi-agent protocols.',
    route: '/learn/agentic-ai-intro',
    icon: Bot,
    categories: curriculum.filter(category => category.id === 'agentic-ai'),
    keyConcepts: ['Function Calling', 'State Machines', 'Context Management', 'LangGraph / CrewAI', 'MCP'],
  },
  {
    id: 'ai-engineering-mlops',
    number: '06',
    title: 'AI Engineering & MLOps',
    shortTitle: 'AI Eng & MLOps',
    tagline: 'Pipelines, Drift, Serving & ML System Design',
    description: 'Bridge research and scalable systems: online vs batch serving architectures, model registry workflows, drift detection, and ML system design.',
    route: '/learn/ai-engineering-mlops',
    icon: ServerCog,
    categories: curriculum.filter(category => category.id === 'ai-engineering-mlops'),
    keyConcepts: ['Latency & Throughput', 'Feature Stores', 'Model Drift', 'Continuous Training', 'System Design'],
  },
  {
    id: 'projects',
    number: '07',
    title: 'Guided Projects',
    shortTitle: 'Projects',
    tagline: '8 End-to-End Production ML & AI Applications',
    description: 'Build portfolio-grade code implementations with runnable notebooks, clean architectures, and interview-ready trade-off discussions.',
    route: '/learn/project-customer-churn',
    icon: FolderKanban,
    categories: curriculum.filter(category => category.id === 'projects'),
    keyConcepts: ['Customer Churn', 'Document Q&A RAG', 'Multi-Agent Research', 'Credit Risk', 'End-to-End ML'],
  },
  {
    id: 'interview-preparation',
    number: '08',
    title: 'Career & Interviews',
    shortTitle: 'Career & Prep',
    tagline: 'Role Roadmaps, FAANG Q&A, Coding & System Design',
    description: 'Land machine learning and AI roles: comprehensive roadmaps for MLE, AI Engineer, and Data Scientist, plus curated technical and system design questions.',
    route: '/learn/ai-data-career-paths',
    icon: BriefcaseBusiness,
    categories: curriculum.filter(category => category.id === 'interview-preparation'),
    keyConcepts: ['System Design', 'ML Interview Q&A', 'Role Roadmaps', 'FAANG Scenarios', 'Salary & Prep'],
  },
];

const featuredProjects = [
  {
    title: 'Customer Churn Prediction',
    category: 'End-to-End ML',
    description: 'Production pipeline with feature engineering, XGBoost, and model evaluation.',
    route: '/learn/project-customer-churn',
    difficulty: 'Beginner / Intermediate',
  },
  {
    title: 'Document Q&A System with RAG',
    category: 'LLM & Search',
    description: 'Semantic vector retrieval, chunking strategies, and grounded answer synthesis.',
    route: '/learn/project-rag-document-qa',
    difficulty: 'Intermediate',
  },
  {
    title: 'Autonomous AI Research Agent',
    category: 'Agentic AI',
    description: 'Multi-agent orchestration with live search tools, state machine, and synthesis.',
    route: '/learn/project-multi-agent-research',
    difficulty: 'Advanced',
  },
];

const careerTracks = [
  {
    title: 'Machine Learning Engineer',
    route: '/learn/ml-engineer-roadmap',
    desc: 'Algorithms, feature pipelines, scikit-learn, and production modeling.',
  },
  {
    title: 'AI / LLM Engineer',
    route: '/learn/genai-llm-engineer-roadmap',
    desc: 'RAG systems, embeddings, prompt engineering, and evaluation.',
  },
  {
    title: 'Data Scientist',
    route: '/learn/data-scientist-roadmap',
    desc: 'Statistical inference, EDA, business insights, and predictive modeling.',
  },
  {
    title: 'System Design & Interview Prep',
    route: '/learn/ml-ai-system-design-interview',
    desc: 'Scalable architecture questions, failure recovery, and trade-offs.',
  },
];

export function HomePage() {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [syllabusView, setSyllabusView] = useState<'focused' | 'accordion'>('focused');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'machine-learning': true,
  });
  const [expandedCurriculumModules, setExpandedCurriculumModules] = useState<Record<string, boolean>>({});
  const [searchFilter, setSearchFilter] = useState('');
  const [inChapterFilter, setInChapterFilter] = useState('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('all');
  const syllabusRef = useRef<HTMLDivElement>(null);
  const { isCompleted } = useProgress();

  const handleSelectTrack = (idx: number) => {
    setSelectedTrackIndex(idx);
    setInChapterFilter('');
    setSelectedSubcategoryId('all');
    const track = chapterTracks[idx];
    if (track) {
      setExpandedChapters(prev => ({ ...prev, [track.id]: true }));
    }
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        syllabusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }
  };

  const toggleChapterExpanded = (trackId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [trackId]: !prev[trackId],
    }));
  };

  const expandAllChapters = () => {
    const allExpanded: Record<string, boolean> = {};
    chapterTracks.forEach(t => {
      allExpanded[t.id] = true;
    });
    setExpandedChapters(allExpanded);
  };

  const collapseAllChapters = () => {
    setExpandedChapters({});
  };

  const toggleCurriculumModule = (catId: string) => {
    setExpandedCurriculumModules(prev => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const expandAllCurriculumModules = () => {
    const allExp: Record<string, boolean> = {};
    curriculum.forEach(c => {
      allExp[c.id] = true;
    });
    setExpandedCurriculumModules(allExp);
  };

  const collapseAllCurriculumModules = () => {
    setExpandedCurriculumModules({});
  };

  const activeTrack = chapterTracks[selectedTrackIndex] ?? chapterTracks[0];
  const ActiveIcon = activeTrack.icon;

  const allLessonsInTrack = activeTrack.categories.flatMap(cat => cat.subtopics);
  const totalLessonsInTrack = allLessonsInTrack.length;
  const completedInTrack = allLessonsInTrack.filter(lesson => isCompleted(lesson.id)).length;
  const firstLesson = allLessonsInTrack[0];

  const tutorialCount = curriculum.reduce(
    (total, category) => total + category.subtopics.length,
    0,
  );
  const projectCount = countLessons('projects');

  useEffect(() => {
    document.title = 'Learn ML Academy — Machine Learning to Agentic AI Curriculum';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        `Free AI tutorials with a structured curriculum, 260+ code examples, and interview preparation. ${tutorialCount} topics across Machine Learning, Deep Learning, Generative AI, LLMs, and Agentic AI.`,
      );
    }
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com');
  }, [tutorialCount]);

  const filteredCurriculum = searchFilter.trim()
    ? curriculum
        .map(category => ({
          ...category,
          subtopics: category.subtopics.filter(st =>
            st.title.toLowerCase().includes(searchFilter.toLowerCase()),
          ),
        }))
        .filter(category => category.subtopics.length > 0)
    : [];

  return (
    <div className="bg-slate-50 min-h-screen">
      <WebsiteSchema />

      {/* CLEAN HERO HEADER & SEARCH */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Machine Learning & AI Engineering Curriculum
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Intuitive explanations, runnable code snippets, and end-to-end production systems.
              </p>
            </div>

            {/* Quick Actions & Live Topic Search */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search any topic (e.g. RAG, CNN)..."
                  className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {searchFilter && (
                  <button
                    type="button"
                    onClick={() => setSearchFilter('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}
                {/* Dropdown search results */}
                {searchFilter.trim() && (
                  <div className="absolute right-0 top-10 z-40 max-h-64 w-80 overflow-y-auto rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
                    {filteredCurriculum.length === 0 ? (
                      <p className="p-2 text-xs text-slate-500">No lessons matching &quot;{searchFilter}&quot;</p>
                    ) : (
                      <div className="space-y-1.5">
                        {filteredCurriculum.map(cat => (
                          <div key={cat.id} className="text-xs">
                            <p className="px-2 py-0.5 font-bold text-indigo-700">{cat.title}</p>
                            <div className="space-y-0.5">
                              {cat.subtopics.map(st => (
                                <Link
                                  key={st.id}
                                  to={`/learn/${st.id}`}
                                  className="flex items-center justify-between rounded px-2 py-1 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-900"
                                >
                                  <span>{st.title}</span>
                                  <ArrowRight className="h-3 w-3 text-slate-400" aria-hidden="true" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/curriculum"
                className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition"
              >
                Curriculum Index
              </Link>
              <Link
                to="/cheatsheet"
                className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 px-3.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
              >
                Interview PDF
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE MAIN SHOW: COMPLETE CHAPTER EXPLORER WITH ALL LESSONS */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200/60">
                  Interactive Course Syllabus
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {tutorialCount} Lessons across 8 Master Chapters
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
                Course Syllabus — Click Any Chapter to See All Lessons
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Click any chapter to immediately reveal all of its lessons. Browse the complete course content right here on the home page.
              </p>
            </div>

            {/* View Mode Toggle: Focused Tabs vs All Chapters Accordion */}
            <div className="inline-flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/80 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setSyllabusView('focused')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  syllabusView === 'focused'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Chapter Explorer</span>
              </button>
              <button
                type="button"
                onClick={() => setSyllabusView('accordion')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  syllabusView === 'accordion'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ListFilter className="h-3.5 w-3.5" aria-hidden="true" />
                <span>All Chapters Accordion</span>
              </button>
            </div>
          </div>

          {/* MODE 1: FOCUSED CHAPTER EXPLORER */}
          {syllabusView === 'focused' ? (
            <div>
              {/* Large 8-Chapter Switcher Bar */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8" role="tablist" aria-label="Curriculum Chapters">
                {chapterTracks.map((track, idx) => {
                  const Icon = track.icon;
                  const isSelected = selectedTrackIndex === idx;
                  const count = track.categories.reduce((acc, cat) => acc + cat.subtopics.length, 0);

                  return (
                    <button
                      key={track.id}
                      role="tab"
                      aria-selected={isSelected}
                      type="button"
                      onClick={() => handleSelectTrack(idx)}
                      className={`group relative flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500/20'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {track.number}
                        </span>
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'}`} aria-hidden={true} />
                      </div>

                      <div className="mt-2.5">
                        <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                          {track.shortTitle || track.title}
                        </p>
                        <p className={`mt-0.5 text-[11px] font-medium leading-snug truncate ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {count} lessons
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Full Interactive Syllabus Card for Selected Chapter */}
              <div ref={syllabusRef} className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
                {/* Chapter Header */}
                <div className="border-b border-slate-100 pb-5 mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-0.5 text-xs font-bold text-indigo-700">
                          <ActiveIcon className="h-3.5 w-3.5 text-indigo-600" aria-hidden={true} />
                          <span>Chapter {activeTrack.number} · {activeTrack.title}</span>
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                          {totalLessonsInTrack} Lessons
                        </span>
                        {completedInTrack > 0 && (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                            {completedInTrack} Completed ({Math.round((completedInTrack / totalLessonsInTrack) * 100)}%)
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                        {activeTrack.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm font-semibold text-indigo-600">
                        {activeTrack.tagline}
                      </p>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {activeTrack.description}
                      </p>

                      {/* Competencies */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Skills:</span>
                        {activeTrack.keyConcepts.map(c => (
                          <span key={c} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200/60">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Start Button & Links */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 shrink-0">
                      {firstLesson && (
                        <Link
                          to={`/learn/${firstLesson.id}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Start Lesson 1 ({firstLesson.title})</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      <Link
                        to="/curriculum"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                      >
                        View Full Interactive Curriculum →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* In-Chapter Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Complete Chapter Content ({totalLessonsInTrack} Lessons Displayed)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Showing every lesson in Chapter {activeTrack.number}. Click any lesson below to start reading.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={inChapterFilter}
                      onChange={(e) => setInChapterFilter(e.target.value)}
                      placeholder={`Filter in Chapter ${activeTrack.number}...`}
                      className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    {inChapterFilter && (
                      <button
                        type="button"
                        onClick={() => setInChapterFilter('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Subcategory Pills (if multiple categories) */}
                {activeTrack.categories.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto lma-scrollbar pb-3 mb-5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setSelectedSubcategoryId('all')}
                      className={`rounded-lg px-3 py-1.5 whitespace-nowrap transition ${
                        selectedSubcategoryId === 'all'
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      All Sections ({totalLessonsInTrack})
                    </button>
                    {activeTrack.categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedSubcategoryId(cat.id)}
                        className={`rounded-lg px-3 py-1.5 whitespace-nowrap transition ${
                          selectedSubcategoryId === cat.id
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {cat.title.replace(/^\d+\.\s*/, '')} ({cat.subtopics.length})
                      </button>
                    ))}
                  </div>
                )}

                {/* ALL LESSONS DISPLAYED */}
                <div className="space-y-6">
                  {activeTrack.categories.map((category) => {
                    if (selectedSubcategoryId !== 'all' && category.id !== selectedSubcategoryId) {
                      return null;
                    }

                    const matchingLessons = category.subtopics.filter(st =>
                      !inChapterFilter.trim() ||
                      st.title.toLowerCase().includes(inChapterFilter.toLowerCase()) ||
                      (st.module && st.module.toLowerCase().includes(inChapterFilter.toLowerCase()))
                    );

                    if (matchingLessons.length === 0) return null;

                    return (
                      <div key={category.id} className="space-y-3">
                        {activeTrack.categories.length > 1 && (
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                              {category.title}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400">
                              {matchingLessons.length} {matchingLessons.length === 1 ? 'lesson' : 'lessons'}
                            </span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {matchingLessons.map((lesson) => {
                            const globalIndex = allLessonsInTrack.findIndex(l => l.id === lesson.id);
                            const completed = isCompleted(lesson.id);

                            return (
                              <Link
                                key={lesson.id}
                                to={`/learn/${lesson.id}`}
                                className={`group flex items-center justify-between rounded-xl border p-3 text-xs transition-all ${
                                  completed
                                    ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-300'
                                    : 'border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/30 hover:shadow-xs'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                  <span
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold ${
                                      completed
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-white border border-slate-200 text-slate-500 group-hover:border-indigo-300 group-hover:text-indigo-600'
                                    }`}
                                  >
                                    {String(globalIndex + 1).padStart(2, '0')}
                                  </span>
                                  <div className="min-w-0">
                                    <p
                                      className={`font-bold leading-snug line-clamp-2 ${
                                        completed
                                          ? 'text-emerald-950 group-hover:text-emerald-800'
                                          : 'text-slate-800 group-hover:text-indigo-700'
                                      }`}
                                    >
                                      {lesson.title}
                                    </p>
                                    {lesson.module && (
                                      <p className="mt-0.5 text-[10px] font-medium text-slate-400 truncate">
                                        {lesson.module}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="shrink-0 flex items-center ml-2">
                                  {completed ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 fill-emerald-100" />
                                  ) : (
                                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty state if search found nothing */}
                  {inChapterFilter.trim() && activeTrack.categories.every(cat =>
                    cat.subtopics.filter(st =>
                      st.title.toLowerCase().includes(inChapterFilter.toLowerCase()) ||
                      (st.module && st.module.toLowerCase().includes(inChapterFilter.toLowerCase()))
                    ).length === 0
                  ) && (
                    <div className="py-8 text-center">
                      <p className="text-sm font-semibold text-slate-700">
                        No lessons found matching &quot;{inChapterFilter}&quot; in {activeTrack.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => setInChapterFilter('')}
                        className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
                      >
                        Clear search and show all {totalLessonsInTrack} lessons
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* MODE 2: ALL CHAPTERS ACCORDION (Click any chapter to expand all its lessons in-place) */
            <div className="space-y-4">
              {/* Accordion Quick Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200/90 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAllChapters}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Expand All Chapters</span>
                  </button>
                  <button
                    type="button"
                    onClick={collapseAllChapters}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                  >
                    <ChevronUp className="h-3.5 w-3.5 text-slate-500" />
                    <span>Collapse All</span>
                  </button>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={inChapterFilter}
                    onChange={(e) => setInChapterFilter(e.target.value)}
                    placeholder="Search any lesson in all chapters..."
                    className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {inChapterFilter && (
                    <button
                      type="button"
                      onClick={() => setInChapterFilter('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Chapter Accordion Cards */}
              <div className="space-y-3">
                {chapterTracks.map((track) => {
                  const Icon = track.icon;
                  const isExpanded = !!expandedChapters[track.id];
                  const allLessons = track.categories.flatMap(cat => cat.subtopics);
                  const completedLessons = allLessons.filter(l => isCompleted(l.id)).length;
                  const matchingCount = inChapterFilter.trim()
                    ? allLessons.filter(st =>
                        st.title.toLowerCase().includes(inChapterFilter.toLowerCase()) ||
                        (st.module && st.module.toLowerCase().includes(inChapterFilter.toLowerCase()))
                      ).length
                    : allLessons.length;

                  if (inChapterFilter.trim() && matchingCount === 0) {
                    return null;
                  }

                  return (
                    <div
                      key={track.id}
                      className={`overflow-hidden rounded-2xl border transition-all ${
                        isExpanded
                          ? 'border-indigo-200 bg-white shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      {/* Clickable Chapter Header Button */}
                      <button
                        type="button"
                        onClick={() => toggleChapterExpanded(track.id)}
                        aria-expanded={isExpanded}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-3">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                            isExpanded
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-indigo-50 border border-indigo-100 text-indigo-700'
                          }`}>
                            <Icon className="h-5 w-5" aria-hidden={true} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono font-bold text-indigo-600">
                                Chapter {track.number}
                              </span>
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                                {allLessons.length} Lessons
                              </span>
                              {completedLessons > 0 && (
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                                  {completedLessons}/{allLessons.length} Completed
                                </span>
                              )}
                            </div>
                            <h3 className="text-base sm:text-lg font-black text-slate-950 truncate mt-0.5">
                              {track.title}
                            </h3>
                            <p className="text-xs text-slate-500 truncate hidden sm:block">
                              {track.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="hidden sm:inline text-xs font-semibold text-indigo-600">
                            {isExpanded ? 'Hide Lessons' : 'Show All Lessons'}
                          </span>
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-transform ${
                            isExpanded
                              ? 'rotate-180 bg-indigo-50 border-indigo-200 text-indigo-600'
                              : 'bg-white border-slate-200 text-slate-400 group-hover:text-slate-600'
                          }`}>
                            <ChevronDown className="h-4 w-4" aria-hidden={true} />
                          </div>
                        </div>
                      </button>

                      {/* Expanded Section with ALL Lessons */}
                      {isExpanded && (
                        <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-6 space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-slate-200/80 rounded-xl p-3.5">
                            <div>
                              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                                {track.description}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {track.keyConcepts.map(c => (
                                  <span key={c} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {allLessons[0] && (
                              <Link
                                to={`/learn/${allLessons[0].id}`}
                                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
                              >
                                <Play className="h-3 w-3 fill-current" />
                                <span>Start Chapter</span>
                              </Link>
                            )}
                          </div>

                          {/* List of categories and all lessons in this chapter */}
                          <div className="space-y-5">
                            {track.categories.map(category => {
                              const matchingLessons = category.subtopics.filter(st =>
                                !inChapterFilter.trim() ||
                                st.title.toLowerCase().includes(inChapterFilter.toLowerCase()) ||
                                (st.module && st.module.toLowerCase().includes(inChapterFilter.toLowerCase()))
                              );

                              if (matchingLessons.length === 0) return null;

                              return (
                                <div key={category.id} className="space-y-2.5">
                                  {track.categories.length > 1 && (
                                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
                                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                                        {category.title}
                                      </span>
                                      <span className="text-[11px] font-semibold text-slate-400">
                                        {matchingLessons.length} {matchingLessons.length === 1 ? 'lesson' : 'lessons'}
                                      </span>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                    {matchingLessons.map(lesson => {
                                      const globalIndex = allLessons.findIndex(l => l.id === lesson.id);
                                      const completed = isCompleted(lesson.id);

                                      return (
                                        <Link
                                          key={lesson.id}
                                          to={`/learn/${lesson.id}`}
                                          className={`group flex items-center justify-between rounded-xl border p-3 text-xs transition-all ${
                                            completed
                                              ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300'
                                              : 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/30 hover:shadow-xs'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                            <span
                                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold ${
                                                completed
                                                  ? 'bg-emerald-100 text-emerald-800'
                                                  : 'bg-slate-100 border border-slate-200 text-slate-500 group-hover:border-indigo-300 group-hover:text-indigo-600'
                                              }`}
                                            >
                                              {String(globalIndex + 1).padStart(2, '0')}
                                            </span>
                                            <div className="min-w-0">
                                              <p
                                                className={`font-bold leading-snug line-clamp-2 ${
                                                  completed
                                                    ? 'text-emerald-950 group-hover:text-emerald-800'
                                                    : 'text-slate-800 group-hover:text-indigo-700'
                                                }`}
                                              >
                                                {lesson.title}
                                              </p>
                                              {lesson.module && (
                                                <p className="mt-0.5 text-[10px] font-medium text-slate-400 truncate">
                                                  {lesson.module}
                                                </p>
                                              )}
                                            </div>
                                          </div>

                                          <div className="shrink-0 flex items-center ml-2">
                                            {completed ? (
                                              <CheckCircle2 className="h-4 w-4 text-emerald-600 fill-emerald-100" />
                                            ) : (
                                              <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
                                            )}
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-b border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="flex items-center gap-2.5">
              <Lightbulb className="h-4 w-4 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Intuitive First</p>
                <p className="text-[11px] text-slate-500">Visual analogies before dense proofs</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Code2 className="h-4 w-4 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">260+ Python Examples</p>
                <p className="text-[11px] text-slate-500">Clean, copyable, scikit-learn & PyTorch</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Quizzes & Checks</p>
                <p className="text-[11px] text-slate-500">Validate intuition immediately</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ServerCog className="h-4 w-4 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Production AI & MLOps</p>
                <p className="text-[11px] text-slate-500">System design, drift & serving</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDED PROJECTS & CAREER ROADMAPS */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Guided Projects (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-950">Guided Portfolio Projects</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">End-to-end code implementations ready to run and discuss in interviews.</p>
                </div>
                <Link
                  to="/learn/project-customer-churn"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  All {projectCount} projects →
                </Link>
              </div>

              <div className="space-y-2.5">
                {featuredProjects.map(project => (
                  <Link
                    key={project.route}
                    to={project.route}
                    className="group block rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-indigo-300 hover:shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <span className="text-indigo-700 font-bold">{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.difficulty}</span>
                        </div>
                        <h3 className="mt-1 text-sm font-bold text-slate-950 group-hover:text-indigo-600 transition">
                          {project.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-600">
                          {project.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition mt-1" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Career Roadmaps & Interview Prep (5 cols) */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-950">Career Roadmaps & Prep</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Role roadmaps, interview questions, and system design.</p>
                </div>
                <Link
                  to="/learn/ai-data-career-paths"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="grid gap-2">
                {careerTracks.map(track => (
                  <Link
                    key={track.route}
                    to={track.route}
                    className="group flex flex-col justify-center rounded-lg border border-slate-200 bg-white p-3 transition hover:border-indigo-300 hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition">
                        {track.title}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-600 transition" aria-hidden="true" />
                    </div>
                    <span className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                      {track.desc}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Free PDF Box */}
              <div className="mt-3.5 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-indigo-950">ML Interview Cheatsheet (PDF)</p>
                  <p className="text-[11px] text-indigo-700">8-page instant reference with formulas, code & trade-offs.</p>
                </div>
                <Link
                  to="/cheatsheet"
                  className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
                >
                  Download
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ALL 16 CURRICULUM MODULES OVERVIEW */}
      <section className="border-t border-slate-200 bg-slate-100/60 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-950">
                Complete Curriculum Breakdown (All 16 Chapters & Lessons)
              </h2>
              <p className="text-xs text-slate-600">
                Click any chapter card below to expand and view all of its lessons directly on this page.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={expandAllCurriculumModules}
                className="inline-flex items-center gap-1 rounded-lg bg-white border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
              >
                <ChevronDown className="h-3.5 w-3.5 text-indigo-600" />
                <span>Expand All 16 Chapters</span>
              </button>
              <button
                type="button"
                onClick={collapseAllCurriculumModules}
                className="inline-flex items-center gap-1 rounded-lg bg-white border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
              >
                <ChevronUp className="h-3.5 w-3.5 text-slate-500" />
                <span>Collapse All</span>
              </button>
              <Link
                to="/curriculum"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 ml-1"
              >
                Interactive Guide →
              </Link>
            </div>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 items-start">
            {curriculum.map((cat, catIdx) => {
              const isExpanded = !!expandedCurriculumModules[cat.id];
              const completedLessons = cat.subtopics.filter(st => isCompleted(st.id)).length;

              return (
                <div
                  key={cat.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded
                      ? 'border-indigo-300 bg-white shadow-xs col-span-1 sm:col-span-2 lg:col-span-2'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  {/* Card Header (Click to toggle all lessons) */}
                  <button
                    type="button"
                    onClick={() => toggleCurriculumModule(cat.id)}
                    aria-expanded={isExpanded}
                    className="w-full p-3.5 text-left flex items-start justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                          Chapter {catIdx + 1}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {cat.subtopics.length} lessons
                        </span>
                        {completedLessons > 0 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {completedLessons}/{cat.subtopics.length} done
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {cat.title}
                      </h3>
                    </div>

                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-transform ${
                      isExpanded
                        ? 'rotate-180 bg-indigo-50 border-indigo-200 text-indigo-600'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </div>
                  </button>

                  {/* Lessons List: Expanded Shows ALL Lessons, Collapsed Shows Summary with Expand Button */}
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100">
                    {isExpanded ? (
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                          <span className="text-[11px] font-bold text-indigo-700">
                            All {cat.subtopics.length} Lessons in this Chapter:
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleCurriculumModule(cat.id)}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-700"
                          >
                            Hide lessons ↑
                          </button>
                        </div>
                        <ul className="space-y-1 max-h-96 overflow-y-auto lma-scrollbar pr-1">
                          {cat.subtopics.map((st, idx) => {
                            const completed = isCompleted(st.id);
                            return (
                              <li key={st.id}>
                                <Link
                                  to={`/learn/${st.id}`}
                                  className={`flex items-center justify-between gap-2 rounded-lg p-1.5 text-xs transition ${
                                    completed
                                      ? 'bg-emerald-50/50 text-emerald-950 hover:bg-emerald-100/50'
                                      : 'hover:bg-indigo-50/70 hover:text-indigo-900 text-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 w-4">
                                      {idx + 1}.
                                    </span>
                                    <span className="font-medium truncate">{st.title}</span>
                                  </div>
                                  <div className="shrink-0 flex items-center">
                                    {completed ? (
                                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                    ) : (
                                      <ArrowRight className="h-3 w-3 text-slate-300" />
                                    )}
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <ul className="space-y-1 text-[11px] text-slate-600">
                          {cat.subtopics.slice(0, 3).map(st => (
                            <li key={st.id} className="truncate">
                              <Link to={`/learn/${st.id}`} className="hover:text-indigo-600 transition flex items-center gap-1">
                                <span className="text-slate-300">·</span>
                                <span className="truncate">{st.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => toggleCurriculumModule(cat.id)}
                          className="pt-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 w-full text-left"
                        >
                          <span>Show all {cat.subtopics.length} lessons</span>
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup at Bottom */}
      <section className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
