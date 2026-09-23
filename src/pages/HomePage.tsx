import React, { useState, useEffect, type ComponentType } from 'react';
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
  Check,
  Flame,
  Terminal,
  Layers,
  ArrowUpRight,
  GraduationCap,
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { curriculum } from '../data/curriculum';

type JourneyStage = {
  id: string;
  number: string;
  title: string;
  categoryTitle: string;
  tagline: string;
  description: string;
  route: string;
  count: number;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  highlights: { title: string; route: string; badge?: string }[];
  keyConcepts: string[];
};

const countLessons = (categoryId: string) =>
  curriculum.find(category => category.id === categoryId)?.subtopics.length ?? 0;

const machineLearningCount = curriculum
  .slice(0, 9)
  .reduce((total, category) => total + category.subtopics.length, 0);

const journeyStages: JourneyStage[] = [
  {
    id: 'foundations',
    number: '01',
    title: 'Machine Learning',
    categoryTitle: 'Foundations to Advanced Algorithms',
    tagline: 'Math, Data Pipelines, Classifiers & Trees',
    description: 'Master core algorithmic thinking: exploratory data analysis, regularized regression, tree ensembles, boosting, and rigorous evaluation.',
    route: '/learn/what-is-ml',
    count: machineLearningCount,
    icon: Network,
    highlights: [
      { title: 'What is Machine Learning?', route: '/learn/what-is-ml', badge: 'Start Here' },
      { title: 'Linear & Logistic Regression', route: '/learn/linear-regression', badge: 'Core' },
      { title: 'Gradient Descent Optimization', route: '/learn/gradient-descent', badge: 'Math' },
      { title: 'Decision Trees & Random Forest', route: '/learn/random-forest', badge: 'Ensemble' },
      { title: 'Gradient Boosting & XGBoost', route: '/learn/xgboost', badge: 'Industry' },
      { title: 'Classification Metrics & ROC/AUC', route: '/learn/classification-metrics', badge: 'Eval' },
    ],
    keyConcepts: ['Scikit-learn', 'Feature Engineering', 'Bias-Variance', 'Ensembles', 'Cross-Validation'],
  },
  {
    id: 'deep-learning',
    number: '02',
    title: 'Deep Learning',
    categoryTitle: 'Neural Nets, Vision & Attention',
    tagline: 'Backprop, CNNs, Attention & Vision',
    description: 'Build neural intuition from ground zero: implement forward/backward passes in raw code, then scale to convolutions and self-attention.',
    route: '/learn/deep-learning-intro',
    count: countLessons('deep-learning'),
    icon: BrainCircuit,
    highlights: [
      { title: 'Deep Learning Foundations', route: '/learn/deep-learning-intro', badge: 'Intuition' },
      { title: 'Neural Networks from Scratch', route: '/learn/neural-network-from-scratch', badge: 'Code' },
      { title: 'Backpropagation & Gradient Flow', route: '/learn/backpropagation', badge: 'Math' },
      { title: 'CNNs for Computer Vision', route: '/learn/cnn', badge: 'Vision' },
      { title: 'Transformers & Self-Attention', route: '/learn/transformers', badge: 'Essential' },
      { title: 'Transfer Learning & Fine-Tuning', route: '/learn/transfer-learning', badge: 'PyTorch' },
    ],
    keyConcepts: ['PyTorch', 'Backpropagation', 'Self-Attention', 'Residual Nets', 'Embeddings'],
  },
  {
    id: 'generative-ai',
    number: '03',
    title: 'Generative AI',
    categoryTitle: 'Diffusion, VAEs & Modern GenAI',
    tagline: 'Latent Spaces, Diffusion & Synthesis',
    description: 'Understand how models learn probability distributions: from Variational Autoencoders and GANs to modern score-based diffusion models.',
    route: '/learn/generative-ai-intro',
    count: countLessons('generative-ai'),
    icon: Sparkles,
    highlights: [
      { title: 'What is Generative AI?', route: '/learn/generative-ai-intro', badge: 'Foundations' },
      { title: 'Variational Autoencoders (VAEs)', route: '/learn/vae', badge: 'Latents' },
      { title: 'Generative Adversarial Nets (GANs)', route: '/learn/gans', badge: 'Adversarial' },
      { title: 'Diffusion Models Explained', route: '/learn/diffusion-models', badge: 'Math' },
      { title: 'Latent & Stable Diffusion', route: '/learn/stable-latent-diffusion', badge: 'Architecture' },
      { title: 'Multimodal AI & Speech/Video', route: '/learn/multimodal-ai', badge: 'Multimodal' },
    ],
    keyConcepts: ['Latent Distributions', 'U-Net', 'Classifier-Free Guidance', 'Synthetic Data'],
  },
  {
    id: 'large-language-models',
    number: '04',
    title: 'LLMs & RAG',
    categoryTitle: 'Embeddings, Retrieval & Fine-Tuning',
    tagline: 'Vector DBs, Advanced RAG & LoRA',
    description: 'Master modern language models: tokenization, dense semantic retrieval, vector databases, chunking strategies, LoRA fine-tuning, and evaluation.',
    route: '/learn/llm-intro',
    count: countLessons('large-language-models'),
    icon: MessageSquareText,
    highlights: [
      { title: 'Large Language Models Explained', route: '/learn/llm-intro', badge: 'Beginner' },
      { title: 'Tokens, Embeddings & Context', route: '/learn/tokenization-embeddings', badge: 'Core' },
      { title: 'Retrieval-Augmented Generation (RAG)', route: '/learn/rag', badge: 'Must-Know' },
      { title: 'Vector Databases & Similarity Search', route: '/learn/vector-databases', badge: 'Search' },
      { title: 'Advanced RAG: Chunking & Rerank', route: '/learn/advanced-rag', badge: 'Production' },
      { title: 'Fine-Tuning: SFT, LoRA & RLHF', route: '/learn/instruction-tuning-rlhf', badge: 'Training' },
    ],
    keyConcepts: ['Vector Search', 'Reranking', 'Hybrid Search', 'LoRA / QLoRA', 'RAG Triad Eval'],
  },
  {
    id: 'agentic-ai',
    number: '05',
    title: 'Agentic AI',
    categoryTitle: 'Autonomous Agents, Tools & Graphs',
    tagline: 'Tool Calling, ReAct, Memory & MCP',
    description: 'Transform passive language models into active problem solvers: reliable tool calling, state graphs, reflection loops, and multi-agent protocols.',
    route: '/learn/agentic-ai-intro',
    count: countLessons('agentic-ai'),
    icon: Bot,
    highlights: [
      { title: 'What is Agentic AI? Workflows & Types', route: '/learn/agentic-ai-intro', badge: 'Architecture' },
      { title: 'Tool Calling & Schema Design', route: '/learn/tool-calling', badge: 'Reliability' },
      { title: 'Build a Simple AI Agent End-to-End', route: '/learn/building-ai-agent', badge: 'Hands-on' },
      { title: 'Planning, ReAct & Reflection', route: '/learn/planning-reflection', badge: 'Reasoning' },
      { title: 'Memory & Long-Term Persistence', route: '/learn/agent-memory', badge: 'State' },
      { title: 'Multi-Agent Systems & MCP', route: '/learn/multi-agent-systems', badge: 'Orchestration' },
    ],
    keyConcepts: ['Function Calling', 'State Machines', 'Context Management', 'LangGraph / CrewAI'],
  },
  {
    id: 'ai-engineering-mlops',
    number: '06',
    title: 'AI Engineering & MLOps',
    categoryTitle: 'From Experiment to Production',
    tagline: 'Pipelines, Drift, Serving & System Design',
    description: 'Bridge research and scalable systems: online vs batch serving architectures, model registry workflows, drift detection, and ML system design.',
    route: '/learn/ai-engineering-mlops',
    count: countLessons('ai-engineering-mlops'),
    icon: ServerCog,
    highlights: [
      { title: 'AI Engineering & MLOps Overview', route: '/learn/ai-engineering-mlops', badge: 'Roadmap' },
      { title: 'Production Data & Feature Pipelines', route: '/learn/ml-data-feature-pipelines', badge: 'Data' },
      { title: 'Batch & Online Serving Architectures', route: '/learn/batch-online-inference', badge: 'Serving' },
      { title: 'CI/CD & Continuous Training', route: '/learn/ml-cicd-continuous-training', badge: 'Automation' },
      { title: 'ML Monitoring & Data Drift', route: '/learn/ml-monitoring-drift', badge: 'Observability' },
      { title: 'End-to-End ML System Design', route: '/learn/ml-system-design', badge: 'Interviews' },
    ],
    keyConcepts: ['Latency & Throughput', 'Feature Stores', 'Model Drift', 'System Design'],
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

      {/* THE MAIN SHOW: INTERACTIVE TRACK EXPLORER ABOVE THE FOLD */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Primary Curriculum Pathways</p>
              <h2 className="text-lg sm:text-xl font-black text-slate-950">
                Interactive Track Explorer — Pick Your Stage
              </h2>
            </div>
            <span className="hidden sm:inline-flex text-xs font-medium text-slate-500">
              Click any stage tab below to preview lessons & start learning immediately
            </span>
          </div>

          {/* Large 6-Track Switcher Bar (The Star of the Show) */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label="Learning Tracks">
            {journeyStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = selectedTrackIndex === idx;
              return (
                <button
                  key={stage.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setSelectedTrackIndex(idx)}
                  className={`group relative flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-900 text-white shadow-md ring-2 ring-indigo-500/30'
                      : 'border-slate-200 bg-slate-50/80 text-slate-800 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`}>
                      {stage.number}
                    </span>
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-indigo-300' : 'text-slate-500 group-hover:text-indigo-600'}`} aria-hidden={true} />
                  </div>

                  <div className="mt-2.5">
                    <p className={`text-xs sm:text-sm font-black leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {stage.title}
                    </p>
                    <p className={`mt-0.5 text-[11px] font-medium leading-snug truncate ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {stage.count} lessons
                    </p>
                  </div>

                  {/* Active Indicator Arrow */}
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-900 border-r border-b border-indigo-600 rotate-45" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Deep Interactive Preview Box for Selected Track */}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:p-6">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              
              {/* Left Column: Track Identity & Synopsis (4 cols) */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-400">
                    <ActiveIcon className="h-5 w-5" aria-hidden={true} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Track {activeStage.number}</span>
                    <h3 className="text-xl font-extrabold text-white leading-tight">{activeStage.title}</h3>
                  </div>
                </div>

                <p className="mt-2 text-xs font-semibold text-indigo-300">
                  {activeStage.tagline}
                </p>

                <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Key Concepts Tags */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Core Competencies</p>
                  <div className="flex flex-wrap gap-1">
                    {activeStage.keyConcepts.map(c => (
                      <span key={c} className="rounded bg-slate-800/90 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700/50">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    to={activeStage.route}
                    className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-xs font-bold text-white shadow-xs hover:bg-indigo-500 transition"
                  >
                    Start {activeStage.title} ({activeStage.count} Tutorials) <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Instant High-Priority Lessons Grid (8 cols) */}
              <div className="lg:col-span-8 lg:border-l lg:border-slate-800 lg:pl-6">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300">
                    Selected Tutorials & Deep Dives in this Track
                  </span>
                  <Link
                    to={activeStage.route}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition"
                  >
                    View all {activeStage.count} lessons <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>

                {/* 2-Column Lesson Tiles for Immediate Jump */}
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {activeStage.highlights.map((lesson) => (
                    <Link
                      key={lesson.route}
                      to={lesson.route}
                      className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs transition hover:border-indigo-500/50 hover:bg-slate-800/90 hover:shadow-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          {lesson.badge && (
                            <span className="rounded bg-indigo-950 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300 border border-indigo-800/60">
                              {lesson.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-slate-100 group-hover:text-indigo-300 transition truncate">
                          {lesson.title}
                        </p>
                      </div>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer Quick Bar inside track preview */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/70 text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Code2 className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                      Runnable Code
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      Knowledge Checks
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Terminal className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                      Visual Intuition
                    </span>
                  </div>
                  <Link
                    to="/curriculum"
                    className="font-bold text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Compare with full curriculum →
                  </Link>
                </div>

              </div>

            </div>
          </div>

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
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-950">
                Complete Curriculum Breakdown (16 Core Modules)
              </h2>
              <p className="text-xs text-slate-600">
                Browse every section from foundational linear algebra to autonomous multi-agent systems.
              </p>
            </div>
            <Link
              to="/curriculum"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Full Interactive Curriculum Guide →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {curriculum.map((cat, catIdx) => (
              <div key={cat.id} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                    Module {catIdx + 1}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {cat.subtopics.length} topics
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900 line-clamp-1 mb-2">
                  {cat.title}
                </p>
                <ul className="space-y-1 text-[11px] text-slate-600">
                  {cat.subtopics.slice(0, 2).map(st => (
                    <li key={st.id} className="truncate">
                      <Link to={`/learn/${st.id}`} className="hover:text-indigo-600 transition flex items-center gap-1">
                        <span className="text-slate-300">·</span>
                        <span className="truncate">{st.title}</span>
                      </Link>
                    </li>
                  ))}
                  {cat.subtopics.length > 2 && (
                    <li className="pt-0.5">
                      <Link to={`/learn/${cat.subtopics[0].id}`} className="text-[10px] font-bold text-indigo-600 hover:underline">
                        +{cat.subtopics.length - 2} more lessons →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
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
