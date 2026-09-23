import React, { useState, useEffect, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FileQuestion,
  FolderKanban,
  Lightbulb,
  MessageSquareText,
  Network,
  Route,
  ServerCog,
  Sparkles,
  Search,
  BookOpen,
  Terminal,
  Zap,
  GraduationCap,
  Layers,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { curriculum } from '../data/curriculum';

type JourneyStage = {
  id: string;
  title: string;
  categoryTitle: string;
  description: string;
  route: string;
  count: number;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  highlights: { title: string; route: string }[];
};

const countLessons = (categoryId: string) =>
  curriculum.find(category => category.id === categoryId)?.subtopics.length ?? 0;

const machineLearningCount = curriculum
  .slice(0, 9)
  .reduce((total, category) => total + category.subtopics.length, 0);

const journeyStages: JourneyStage[] = [
  {
    id: 'foundations',
    title: 'Machine Learning',
    categoryTitle: 'Foundations to Advanced Algorithms',
    description: 'Master data preparation, regression, classification, clustering, and ensemble models.',
    route: '/learn/what-is-ml',
    count: machineLearningCount,
    icon: Network,
    highlights: [
      { title: 'Linear & Logistic Regression', route: '/learn/linear-regression' },
      { title: 'Decision Trees & Random Forest', route: '/learn/random-forest' },
      { title: 'Gradient Boosting & XGBoost', route: '/learn/xgboost' },
      { title: 'Model Evaluation & Metrics', route: '/learn/classification-metrics' },
    ],
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    categoryTitle: 'Neural Nets, Vision & Attention',
    description: 'Build intuition for backpropagation, CNNs, RNNs, and transformer architectures.',
    route: '/learn/deep-learning-intro',
    count: countLessons('deep-learning'),
    icon: BrainCircuit,
    highlights: [
      { title: 'Neural Networks from Scratch', route: '/learn/neural-network-from-scratch' },
      { title: 'Backpropagation & Optimizers', route: '/learn/backpropagation' },
      { title: 'Convolutional Neural Networks (CNNs)', route: '/learn/cnn' },
      { title: 'Attention & Transformers', route: '/learn/transformers' },
    ],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    categoryTitle: 'Diffusion, VAEs & Modern GenAI',
    description: 'Learn how probabilistic models and diffusion generate images, audio, and synthesis.',
    route: '/learn/generative-ai-intro',
    count: countLessons('generative-ai'),
    icon: Sparkles,
    highlights: [
      { title: 'Diffusion Models Explained', route: '/learn/diffusion-models' },
      { title: 'Variational Autoencoders (VAEs)', route: '/learn/vae' },
      { title: 'Generative Adversarial Nets (GANs)', route: '/learn/gans' },
      { title: 'Prompt Engineering & Multimodal', route: '/learn/prompt-engineering' },
    ],
  },
  {
    id: 'large-language-models',
    title: 'LLMs & RAG',
    categoryTitle: 'Embeddings, Retrieval & Fine-Tuning',
    description: 'Study language models, vector databases, semantic search, and production RAG.',
    route: '/learn/llm-intro',
    count: countLessons('large-language-models'),
    icon: MessageSquareText,
    highlights: [
      { title: 'Retrieval-Augmented Generation (RAG)', route: '/learn/rag' },
      { title: 'Embeddings & Vector Databases', route: '/learn/vector-databases' },
      { title: 'Fine-Tuning: SFT, LoRA & RLHF', route: '/learn/instruction-tuning-rlhf' },
      { title: 'LLM Evaluation & Benchmarks', route: '/learn/llm-evaluation' },
    ],
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    categoryTitle: 'Autonomous Agents, Tools & Graphs',
    description: 'Connect models with real tools, state graphs, long-term memory, and multi-agent systems.',
    route: '/learn/agentic-ai-intro',
    count: countLessons('agentic-ai'),
    icon: Bot,
    highlights: [
      { title: 'Tool Calling & Function Design', route: '/learn/tool-calling' },
      { title: 'ReAct, Planning & Reflection', route: '/learn/planning-reflection' },
      { title: 'Agent Memory & Context Engineering', route: '/learn/agent-memory' },
      { title: 'Multi-Agent Workflows & MCP', route: '/learn/multi-agent-systems' },
    ],
  },
  {
    id: 'ai-engineering-mlops',
    title: 'AI Engineering & MLOps',
    categoryTitle: 'From Experiment to Production',
    description: 'Deploy reliable inference pipelines, monitor drift, and design production AI systems.',
    route: '/learn/ai-engineering-mlops',
    count: countLessons('ai-engineering-mlops'),
    icon: ServerCog,
    highlights: [
      { title: 'Batch & Online Serving Architectures', route: '/learn/batch-online-inference' },
      { title: 'Pipelines & Model Registries', route: '/learn/experiment-tracking-model-registry' },
      { title: 'Drift Monitoring & Model Decay', route: '/learn/ml-monitoring-drift' },
      { title: 'End-to-End System Design', route: '/learn/ml-system-design' },
    ],
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
  const [searchFilter, setSearchFilter] = useState('');

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

  const activeStage = journeyStages[selectedTrackIndex];
  const ActiveIcon = activeStage.icon;

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
    <div className="bg-slate-50">
      <WebsiteSchema />

      {/* Hero Section: Compact, Content-First, Immediate High-Value Exploration */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            
            {/* Left Column: Direct Value Proposition & Action */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span>FREE INTERACTIVE CURRICULUM</span>
                <span aria-hidden="true">·</span>
                <span>{tutorialCount} LESSONS</span>
                <span aria-hidden="true">·</span>
                <span>{projectCount} GUIDED PROJECTS</span>
              </div>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-[1.15]">
                Learn Machine Learning to Agentic AI
              </h1>
              
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                Step-by-step tutorials with real Python code, interactive diagrams, quizzes, and production architectures. No fluff, completely free.
              </p>

              {/* Quick Navigation Action Hub */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to="/learn/what-is-ml"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start From Day 1 <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/curriculum"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 hover:border-slate-400"
                >
                  <BookOpen className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  Full Curriculum
                </Link>
                <Link
                  to="/cheatsheet"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 text-sm font-semibold text-indigo-900 transition hover:bg-indigo-100"
                >
                  Interview Cheatsheet (PDF)
                </Link>
              </div>

              {/* Instant Inline Topic Quick-Filter */}
              <div className="mt-6 relative max-w-lg">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search any topic (e.g., 'RAG', 'Random Forest', 'Backpropagation')..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {searchFilter && (
                    <button
                      type="button"
                      onClick={() => setSearchFilter('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Live Search Quick Results Dropdown */}
                {searchFilter.trim() && (
                  <div className="absolute left-0 right-0 top-12 z-20 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    {filteredCurriculum.length === 0 ? (
                      <p className="p-3 text-sm text-slate-500">No lessons matched &quot;{searchFilter}&quot;.</p>
                    ) : (
                      <div className="space-y-2">
                        {filteredCurriculum.map(cat => (
                          <div key={cat.id} className="text-xs">
                            <p className="px-2 py-1 font-bold text-indigo-700">{cat.title}</p>
                            <div className="space-y-0.5">
                              {cat.subtopics.map(st => (
                                <Link
                                  key={st.id}
                                  to={`/learn/${st.id}`}
                                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-900"
                                >
                                  <span>{st.title}</span>
                                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
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
            </div>

            {/* Right Column: Interactive Track Switcher Visible Above the Fold */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <ActiveIcon className="h-5 w-5 text-indigo-400" aria-hidden={true} />
                    <span className="text-sm font-bold text-slate-100">{activeStage.title} Track</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{activeStage.count} lessons</span>
                </div>

                {/* Track Selector Tabs */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {journeyStages.map((stage, idx) => (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setSelectedTrackIndex(idx)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                        selectedTrackIndex === idx
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {stage.title}
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  {activeStage.description}
                </p>

                {/* Immediate Topic Highlights */}
                <div className="mt-3.5 space-y-1.5">
                  {activeStage.highlights.map(item => (
                    <Link
                      key={item.route}
                      to={item.route}
                      className="group flex items-center justify-between rounded-lg bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-indigo-950/60 hover:text-white border border-slate-800"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                        <span className="truncate">{item.title}</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-indigo-300" aria-hidden="true" />
                    </Link>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400">Jump right into this topic</span>
                  <Link
                    to={activeStage.route}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                  >
                    Explore Track <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Immediate Content Grid: Start Learning Right Away */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                Learning Pathways & Core Topics
              </h2>
              <p className="text-xs text-slate-500 sm:text-sm mt-0.5">
                Every track contains verified Python snippets, conceptual diagrams, and knowledge checks.
              </p>
            </div>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 sm:text-sm"
            >
              View all 16 modules ({tutorialCount} lessons) <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* 6 Core Journey Stage Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {journeyStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-indigo-300 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                        <Icon className="h-5 w-5" aria-hidden={true} />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        {stage.count} lessons
                      </span>
                    </div>
                    
                    <h3 className="mt-3.5 text-base font-bold text-slate-950">
                      <Link to={stage.route} className="hover:text-indigo-600 transition">
                        {stage.title}
                      </Link>
                    </h3>
                    
                    <p className="mt-1 text-xs font-semibold text-indigo-600">
                      {stage.categoryTitle}
                    </p>
                    
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {stage.description}
                    </p>

                    {/* Quick Lesson Links inside card */}
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Topics</p>
                      <ul className="space-y-1.5">
                        {stage.highlights.slice(0, 3).map(h => (
                          <li key={h.route}>
                            <Link
                              to={h.route}
                              className="group flex items-center justify-between text-xs text-slate-700 hover:text-indigo-600 transition"
                            >
                              <span className="truncate group-hover:underline">{h.title}</span>
                              <ChevronRight className="h-3 w-3 shrink-0 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-600" aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={stage.route}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      Start module <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guided Projects & Career Interview Section */}
      <section className="border-t border-slate-200 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Real Guided Projects (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    <h2 className="text-lg font-bold text-slate-950">Hands-on Guided Projects</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">End-to-end code implementations ready to run and portfolio-grade.</p>
                </div>
                <Link
                  to="/learn/project-customer-churn"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  All {projectCount} projects →
                </Link>
              </div>

              <div className="space-y-3">
                {featuredProjects.map(project => (
                  <Link
                    key={project.route}
                    to={project.route}
                    className="group block rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-indigo-300 hover:bg-white hover:shadow-xs"
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
                        <p className="mt-1 text-xs text-slate-600">
                          {project.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition mt-1" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Career & Interview Preparation (5 cols) */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    <h2 className="text-lg font-bold text-slate-950">Career Roadmaps & Prep</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Role requirements, technical interview questions, and system design.</p>
                </div>
                <Link
                  to="/learn/ai-data-career-paths"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  View roadmaps →
                </Link>
              </div>

              <div className="grid gap-2.5">
                {careerTracks.map(track => (
                  <Link
                    key={track.route}
                    to={track.route}
                    className="group flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 transition hover:border-indigo-300 hover:bg-white hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition">
                        {track.title}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-600 transition" aria-hidden="true" />
                    </div>
                    <span className="mt-1 text-[11px] text-slate-500 leading-snug">
                      {track.desc}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Free PDF Banner Box */}
              <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-indigo-950">ML Interview Cheatsheet</p>
                  <p className="text-[11px] text-indigo-700">Concise 8-page reference PDF with math, code & metrics.</p>
                </div>
                <Link
                  to="/cheatsheet"
                  className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
                >
                  Get PDF
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Teaching Standard / Features Bar */}
      <section className="border-t border-slate-200 bg-slate-100/70 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900">Intuitive First</p>
                <p className="text-[11px] text-slate-500">Visual analogies before dense mathematical proofs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Code2 className="h-5 w-5 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900">Runnable Python</p>
                <p className="text-[11px] text-slate-500">260+ copyable snippets with scikit-learn, PyTorch & APIs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900">Knowledge Checks</p>
                <p className="text-[11px] text-slate-500">Instant interactive quizzes on key concepts and pitfalls</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ServerCog className="h-5 w-5 text-indigo-600 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-slate-900">Production Focus</p>
                <p className="text-[11px] text-slate-500">System design, drift, MLOps, and cost optimization</p>
              </div>
            </div>
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
