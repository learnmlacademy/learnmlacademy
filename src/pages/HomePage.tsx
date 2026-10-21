import React, { useEffect, useId, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Download,
  FileCode,
  FolderKanban,
  GraduationCap,
  Layers,
  LineChart,
  MessageSquareText,
  Network,
  Rocket,
  ServerCog,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { InterviewHandbookShowcase } from '../components/InterviewHandbookShowcase';
import { LessonSearch } from '../components/search/LessonSearch';
import { curriculum } from '../data/curriculum';
import { blogPosts } from '../data/blog';
import { projectPortfolio, type ProjectPortfolioItem } from '../data/projectPortfolio';
import { useProgress } from '../context/ProgressContext';

type TrackCard = {
  title: string;
  description: string;
  route: string;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  categoryIds: string[];
  badge: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  borderHover: string;
  sampleTopics: string[];
};

const lessonCountFor = (categoryIds: string[]) =>
  curriculum
    .filter(category => categoryIds.includes(category.id))
    .reduce((total, category) => total + category.subtopics.length, 0);

const tracks: TrackCard[] = [
  {
    title: 'Machine Learning',
    description: 'Foundations, data preparation, classical algorithms, evaluation and forecasting.',
    route: '/learn/what-is-ml',
    icon: Network,
    categoryIds: [
      'foundations',
      'python-ml-libs',
      'data-preprocessing',
      'supervised-learning',
      'ensemble-learning',
      'unsupervised-learning',
      'model-evaluation',
      'time-series',
      'advanced-paradigms',
    ],
    badge: 'Core Foundations',
    gradient: 'from-sky-500/10 via-cyan-500/5 to-transparent',
    iconBg: 'bg-sky-500/15',
    iconColor: 'text-sky-600',
    borderHover: 'hover:border-sky-400/80 hover:shadow-sky-500/10',
    sampleTopics: ['Linear Regression', 'Random Forests', 'PCA', 'Gradient Descent'],
  },
  {
    title: 'Deep Learning',
    description: 'Neural networks, backpropagation, CNNs, transformers, vision and advanced models.',
    route: '/learn/deep-learning-intro',
    icon: BrainCircuit,
    categoryIds: ['deep-learning', 'advanced-deep-learning'],
    badge: 'Neural Architectures',
    gradient: 'from-violet-500/10 via-purple-500/5 to-transparent',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-600',
    borderHover: 'hover:border-violet-400/80 hover:shadow-violet-500/10',
    sampleTopics: ['Backpropagation', 'Convolutional Nets', 'Attention', 'Transformers'],
  },
  {
    title: 'Generative AI',
    description: 'VAEs, GANs, diffusion, multimodal generation, evaluation and deployment.',
    route: '/learn/generative-ai-intro',
    icon: Sparkles,
    categoryIds: ['generative-ai'],
    badge: 'Creative Models',
    gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-600',
    borderHover: 'hover:border-rose-400/80 hover:shadow-rose-500/10',
    sampleTopics: ['Latent Diffusion', 'Score Matching', 'VAEs & GANs', 'Multimodal'],
  },
  {
    title: 'LLMs & RAG',
    description: 'Tokenization, transformers, embeddings, vector databases, RAG and LLMOps.',
    route: '/learn/llm-intro',
    icon: MessageSquareText,
    categoryIds: ['large-language-models'],
    badge: 'Language & Retrieval',
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-600',
    borderHover: 'hover:border-emerald-400/80 hover:shadow-emerald-500/10',
    sampleTopics: ['Vector Embeddings', 'Hybrid Retrieval', 'Reranking', 'Context Windows'],
  },
  {
    title: 'Agentic AI',
    description: 'Tool calling, memory, planning, MCP, multi-agent systems, safety and deployment.',
    route: '/learn/agentic-ai-intro',
    icon: Bot,
    categoryIds: ['agentic-ai'],
    badge: 'Autonomous Systems',
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-600',
    borderHover: 'hover:border-amber-400/80 hover:shadow-amber-500/10',
    sampleTopics: ['Tool Calling', 'Agent Memory', 'ReAct Planning', 'Multi-Agent MCP'],
  },
  {
    title: 'AI Engineering',
    description: 'Production pipelines, serving, monitoring, reliability, CI/CD and system design.',
    route: '/learn/ai-engineering-mlops',
    icon: ServerCog,
    categoryIds: ['ai-engineering-mlops'],
    badge: 'Production Systems',
    gradient: 'from-indigo-500/10 via-blue-500/5 to-transparent',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-600',
    borderHover: 'hover:border-indigo-400/80 hover:shadow-indigo-500/10',
    sampleTopics: ['FastAPI Serving', 'Docker Containers', 'Drift Detection', 'CI/CD Pipelines'],
  },
];

const popularTopics = [
  { label: 'Linear Regression', route: '/learn/linear-regression' },
  { label: 'Neural Networks', route: '/learn/neural-networks' },
  { label: 'Gradient Descent', route: '/learn/gradient-descent' },
  { label: 'Generative AI', route: '/learn/generative-ai-intro' },
  { label: 'RAG', route: '/learn/rag' },
  { label: 'AI Agents', route: '/learn/agentic-ai-intro' },
];

const recommendedLessons = [
  {
    title: 'Linear Regression Step by Step',
    description: 'Build intuition for the line of best fit, loss and a complete Python workflow.',
    route: '/learn/linear-regression',
    level: 'Beginner',
    time: '12 min',
    icon: Network,
    category: 'Foundations',
    diagramType: 'regression' as const,
  },
  {
    title: 'Neural Networks Explained',
    description: 'Understand neurons, layers, activations and how a network learns from data.',
    route: '/learn/neural-networks',
    level: 'Intermediate',
    time: '18 min',
    icon: BrainCircuit,
    category: 'Deep Learning',
    diagramType: 'neural' as const,
  },
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Learn retrieval, grounding, embeddings and the complete RAG information flow.',
    route: '/learn/rag',
    level: 'Intermediate',
    time: '20 min',
    icon: Database,
    category: 'LLMs & RAG',
    diagramType: 'rag' as const,
  },
  {
    title: 'What Is an AI Agent?',
    description: 'Connect tools, planning, memory and decisions into an agentic workflow.',
    route: '/learn/agentic-ai-intro',
    level: 'Beginner',
    time: '15 min',
    icon: Bot,
    category: 'Agentic AI',
    diagramType: 'agent' as const,
  },
];

const interviewLinks = [
  { label: 'ML interview questions', route: '/learn/ml-interview-questions' },
  { label: 'Python & SQL interview prep', route: '/learn/python-ai-ml-interview' },
  { label: 'LLM & RAG interview questions', route: '/learn/genai-llm-rag-interview' },
  { label: 'ML system design interviews', route: '/learn/ml-ai-system-design-interview' },
];

const homepageBlogPosts = [...blogPosts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

const curriculumLessonCount = curriculum.reduce(
  (total, category) => total + category.subtopics.length,
  0,
);

/**
 * Editorial mini-diagrams illustrating the actual concept inside recommended lessons
 */
function LessonDiagram({ type }: { type: 'regression' | 'neural' | 'rag' | 'agent' }) {
  if (type === 'regression') {
    return (
      <svg viewBox="0 0 160 80" className="h-full w-full" aria-hidden="true">
        <line x1="20" y1="70" x2="150" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="20" y1="10" x2="20" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="25" y1="65" x2="145" y2="15" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="35" cy="58" r="3.5" fill="#38bdf8" />
        <circle cx="50" cy="52" r="3.5" fill="#38bdf8" />
        <circle cx="65" cy="48" r="3.5" fill="#38bdf8" />
        <circle cx="85" cy="38" r="3.5" fill="#38bdf8" />
        <circle cx="105" cy="28" r="3.5" fill="#38bdf8" />
        <circle cx="120" cy="26" r="3.5" fill="#38bdf8" />
        <circle cx="138" cy="18" r="3.5" fill="#38bdf8" />
        <line x1="65" y1="48" x2="65" y2="40" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="105" y1="28" x2="105" y2="24" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    );
  }
  if (type === 'neural') {
    return (
      <svg viewBox="0 0 160 80" className="h-full w-full" aria-hidden="true">
        {/* Layer connections */}
        <line x1="30" y1="25" x2="80" y2="20" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="25" x2="80" y2="40" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="25" x2="80" y2="60" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="55" x2="80" y2="20" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="55" x2="80" y2="40" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="55" x2="80" y2="60" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="80" y1="20" x2="135" y2="40" stroke="#818cf8" strokeWidth="1.5" />
        <line x1="80" y1="40" x2="135" y2="40" stroke="#818cf8" strokeWidth="1.5" />
        <line x1="80" y1="60" x2="135" y2="40" stroke="#818cf8" strokeWidth="1.5" />
        {/* Input Nodes */}
        <circle cx="30" cy="25" r="7" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
        <circle cx="30" cy="55" r="7" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
        {/* Hidden Nodes */}
        <circle cx="80" cy="20" r="7" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="80" cy="40" r="7" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="80" cy="60" r="7" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        {/* Output Node */}
        <circle cx="135" cy="40" r="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2.5" />
      </svg>
    );
  }
  if (type === 'rag') {
    return (
      <svg viewBox="0 0 160 80" className="h-full w-full" aria-hidden="true">
        {/* Document box */}
        <rect x="15" y="22" width="28" height="36" rx="3" fill="#f8fafc" stroke="#059669" strokeWidth="1.5" />
        <line x1="22" y1="32" x2="35" y2="32" stroke="#059669" strokeWidth="1.5" />
        <line x1="22" y1="38" x2="35" y2="38" stroke="#059669" strokeWidth="1.5" />
        <line x1="22" y1="44" x2="31" y2="44" stroke="#059669" strokeWidth="1.5" />
        {/* Vector cylinder */}
        <path d="M72,25 C72,20 94,20 94,25 C94,30 72,30 72,25 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
        <path d="M72,25 L72,55 C72,60 94,60 94,55 L94,25" fill="none" stroke="#0d9488" strokeWidth="1.5" />
        <path d="M72,40 C72,45 94,45 94,40" fill="none" stroke="#0d9488" strokeWidth="1" strokeDasharray="2 2" />
        {/* Arrow to LLM */}
        <line x1="47" y1="40" x2="68" y2="40" stroke="#10b981" strokeWidth="1.5" />
        <polygon points="68,40 63,37 63,43" fill="#10b981" />
        <line x1="98" y1="40" x2="119" y2="40" stroke="#10b981" strokeWidth="1.5" />
        <polygon points="119,40 114,37 114,43" fill="#10b981" />
        {/* Response spark */}
        <rect x="122" y="24" width="28" height="32" rx="4" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <circle cx="136" cy="40" r="4" fill="#10b981" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 80" className="h-full w-full" aria-hidden="true">
      {/* Agent loop */}
      <circle cx="45" cy="40" r="18" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <text x="45" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b45309">Agent</text>
      <circle cx="115" cy="40" r="16" fill="#f0fdf4" stroke="#059669" strokeWidth="1.8" />
      <text x="115" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#047857">Tools</text>
      {/* Curved loop arrows */}
      <path d="M58,28 C75,18 85,18 102,28" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="102,28 94,25 97,32" fill="#f59e0b" />
      <path d="M102,52 C85,62 75,62 58,52" fill="none" stroke="#059669" strokeWidth="2" />
      <polygon points="58,52 66,55 63,48" fill="#059669" />
    </svg>
  );
}

export function HomePage() {
  const [showHandbooks, setShowHandbooks] = useState(false);
  const [projectCategory, setProjectCategory] = useState<string>('all');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const {
    completedCount,
    progressPercentage,
    totalLessonsCount,
    isCompleted,
    getNextIncompleteTopic,
  } = useProgress();

  const tutorialCount = curriculumLessonCount;
  const projectCount = projectPortfolio.length;
  const nextIncomplete = getNextIncompleteTopic();

  const openHandbooks = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    setShowHandbooks(true);
    window.history.replaceState(null, '', '#free-interview-handbooks');
    window.setTimeout(() => {
      document.getElementById('free-interview-handbooks')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#free-interview-handbooks') {
        setShowHandbooks(true);
        window.setTimeout(() => {
          document.getElementById('free-interview-handbooks')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 50);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const title = 'ML Academy — Learn Machine Learning from Zero to Expert';
    const description =
      'Free machine learning tutorials covering Machine Learning, Deep Learning, Generative AI, LLMs, RAG and Agentic AI with worked examples and quizzes.';

    document.title = title;

    const setMeta = (selector: string, attribute: string, value: string) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/');
  }, []);

  // Filter project handbooks for the showcase
  const filteredProjects = projectPortfolio.filter(project => {
    if (projectCategory === 'all') return true;
    if (projectCategory === 'ml') {
      return ['titanic-survival', 'house-price', 'credit-card-fraud', 'customer-segmentation', 'retail-forecasting', 'movie-recommender'].includes(project.id);
    }
    if (projectCategory === 'dl-nlp') {
      return ['disaster-tweets', 'digit-recognizer'].includes(project.id);
    }
    if (projectCategory === 'genai-rag') {
      return ['ai-content-creator', 'pdf-rag'].includes(project.id);
    }
    if (projectCategory === 'agents-mlops') {
      return ['ai-research-assistant', 'model-to-production'].includes(project.id);
    }
    return true;
  });

  const flagshipProject = projectPortfolio.find(p => p.id === 'pdf-rag') ?? projectPortfolio[0];

  // Visual Journey stages in the hero
  const journeyStages = [
    {
      num: '01',
      title: 'Machine Learning',
      sub: 'Foundations, Regression, Trees, Evaluation',
      route: '/learn/what-is-ml',
      categoryIds: [
        'foundations',
        'python-ml-libs',
        'data-preprocessing',
        'supervised-learning',
        'ensemble-learning',
        'unsupervised-learning',
        'model-evaluation',
        'time-series',
        'advanced-paradigms',
      ],
      color: 'from-sky-500 to-blue-600',
      activeBorder: 'border-sky-400 bg-sky-950/40 text-sky-300',
      tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      icon: Network,
    },
    {
      num: '02',
      title: 'Deep Learning',
      sub: 'Backprop, CNNs, Transformers',
      route: '/learn/deep-learning-intro',
      categoryIds: ['deep-learning', 'advanced-deep-learning'],
      color: 'from-violet-500 to-purple-600',
      activeBorder: 'border-violet-400 bg-violet-950/40 text-violet-300',
      tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
      icon: BrainCircuit,
    },
    {
      num: '03',
      title: 'Generative AI',
      sub: 'Diffusion, VAEs, Multimodal Models',
      route: '/learn/generative-ai-intro',
      categoryIds: ['generative-ai'],
      color: 'from-rose-500 to-pink-600',
      activeBorder: 'border-rose-400 bg-rose-950/40 text-rose-300',
      tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      icon: Sparkles,
    },
    {
      num: '04',
      title: 'LLMs & RAG',
      sub: 'Vector Search, Context, Chunking',
      route: '/learn/llm-intro',
      categoryIds: ['large-language-models'],
      color: 'from-emerald-500 to-teal-600',
      activeBorder: 'border-emerald-400 bg-emerald-950/40 text-emerald-300',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: MessageSquareText,
    },
    {
      num: '05',
      title: 'Agentic AI',
      sub: 'Tool Calling, Memory, MCP, Multi-Agent',
      route: '/learn/agentic-ai-intro',
      categoryIds: ['agentic-ai'],
      color: 'from-amber-500 to-orange-600',
      activeBorder: 'border-amber-400 bg-amber-950/40 text-amber-300',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      icon: Bot,
    },
    {
      num: '06',
      title: 'AI Engineering & MLOps',
      sub: 'FastAPI, Docker, CI/CD, Drift Monitoring',
      route: '/learn/ai-engineering-mlops',
      categoryIds: ['ai-engineering-mlops'],
      color: 'from-indigo-500 to-blue-600',
      activeBorder: 'border-indigo-400 bg-indigo-950/40 text-indigo-300',
      tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      icon: ServerCog,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-900">
      <WebsiteSchema />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: PREMIUM 2-COLUMN SPLIT WITH INTERACTIVE SPECTRUM VISUAL */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-[#080d1a] pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-16">
        {/* Ambient atmospheric gradients & technical grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.18),transparent_70%),radial-gradient(ellipse_60%_50%_at_85%_70%,rgba(99,102,241,0.14),transparent_60%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Headline, Search, Popular Searches, Primary CTAs */}
            <div className="lg:col-span-7">
              {/* Unboxed clean metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="text-cyan-400 font-bold uppercase tracking-wider">Free AI/ML Education</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300 font-mono tabular-nums">{tutorialCount} Lessons</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300 font-mono tabular-nums">{projectCount} Project Handbooks</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-emerald-400">Zero Paywalls</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[46px] lg:leading-[1.12]">
                What do you want to <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">learn today?</span>
              </h1>

              {/* Supporting Value Proposition */}
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Search practical, beginner-friendly tutorials across Machine Learning, Deep Learning,
                Generative AI, LLMs, RAG, Agentic AI and production AI engineering. With worked
                equations, small reproducible numbers, and complete Python implementations.
              </p>

              {/* High-visibility unified search field */}
              <div className="mt-5 max-w-2xl">
                <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-1 shadow-2xl backdrop-blur-sm ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-cyan-400">
                  <LessonSearch
                    placeholder="Search tutorials & project handbooks — e.g. RAG, Linear Regression, Titanic..."
                    className="w-full"
                    inputClassName="h-12 w-full rounded-xl border border-transparent bg-slate-900/90 pl-11 pr-10 text-sm font-medium text-white shadow-inner placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Popular Searches */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-xs font-semibold text-slate-400">Popular searches:</span>
                {popularTopics.map(topic => (
                  <Link
                    key={topic.route}
                    to={topic.route}
                    className="rounded-lg border border-slate-700/80 bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-slate-300 transition duration-150 hover:border-cyan-400/80 hover:bg-slate-800 hover:text-cyan-200"
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>

              {/* Primary Call to Action buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-black text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20"
                >
                  <FolderKanban className="h-4 w-4" aria-hidden="true" />
                  Build 12 real ML & AI projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/curriculum"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-bold text-white transition hover:border-slate-500 hover:bg-slate-800"
                >
                  <BookOpen className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  Explore 167 Free Lessons
                </Link>

                <a
                  href="#free-interview-handbooks"
                  onClick={openHandbooks}
                  aria-expanded={showHandbooks}
                  aria-controls="free-interview-handbooks"
                  className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-950/40 px-3.5 py-2.5 text-xs font-bold text-violet-200 transition hover:border-violet-400/60 hover:bg-violet-900/50"
                >
                  <GraduationCap className="h-4 w-4 text-violet-300" aria-hidden="true" />
                  10 Free Interview Handbooks
                  <ArrowRight className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column: Distinctive Educational Product Illustration (AI Journey Map) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-700/70 bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-5 shadow-2xl backdrop-blur-md">
                {/* Header of the Journey visual */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true" />
                      <h2 className="text-xs font-black uppercase tracking-wider text-white">
                        Modern AI Learning Roadmap
                      </h2>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Step-by-step conceptual progression from zero to production
                    </p>
                  </div>
                  <Link
                    to="/curriculum"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
                  >
                    Roadmap
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>

                {/* Vertical roadmap list with connected flow */}
                <div className="relative mt-3.5 space-y-2">
                  {/* Subtle connecting vertical line */}
                  <div className="pointer-events-none absolute left-6 top-3 bottom-3 w-0.5 bg-gradient-to-b from-sky-500/50 via-violet-500/50 to-indigo-500/50" aria-hidden="true" />

                  {journeyStages.map((stage, idx) => {
                    const Icon = stage.icon;
                    const isActive = activeStageIndex === idx;

                    return (
                      <Link
                        key={stage.num}
                        to={stage.route}
                        onMouseEnter={() => setActiveStageIndex(idx)}
                        className={`group relative flex items-center justify-between rounded-xl border p-2.5 transition duration-150 ${
                          isActive
                            ? 'border-cyan-400/60 bg-slate-800/80 shadow-md'
                            : 'border-slate-800/90 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Node Icon */}
                          <div className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${stage.color} text-white shadow-sm`}>
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] font-bold text-slate-400">{stage.num}</span>
                              <h3 className="truncate text-xs font-black text-white group-hover:text-cyan-300">
                                {stage.title}
                              </h3>
                            </div>
                            <p className="truncate text-[11px] text-slate-400">
                              {stage.sub}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pl-2">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {lessonCountFor(stage.categoryIds)} lessons
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-400" aria-hidden="true" />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Integrated Interview Handbooks callout at the base of visual */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <a
                    href="#free-interview-handbooks"
                    onClick={openHandbooks}
                    aria-expanded={showHandbooks}
                    aria-controls="free-interview-handbooks"
                    className="group flex items-center justify-between rounded-xl border border-violet-500/30 bg-gradient-to-r from-violet-950/60 via-indigo-950/50 to-slate-900/90 p-3 transition duration-150 hover:border-cyan-400/50 hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-400/20 text-amber-300">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white">10 Free Interview Handbooks</span>
                          <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-300">
                            PDFs
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          ML, Deep Learning, GenAI, LLM & RAG, System Design
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-black text-cyan-300">
                      <span>Download</span>
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modal / Handbooks Showcase Drawer */}
      {showHandbooks && (
        <InterviewHandbookShowcase
          onClose={() => {
            setShowHandbooks(false);
            if (typeof window !== 'undefined' && window.location.hash === '#free-interview-handbooks') {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 2. STATS & QUALITY EVIDENCE STRIP */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-white py-5 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 items-center">
            
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xl font-black text-slate-950 tabular-nums">{tutorialCount}</p>
                <p className="text-xs font-medium text-slate-500">Free lessons</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
                <FolderKanban className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xl font-black text-slate-950 tabular-nums">{projectCount}</p>
                <p className="text-xs font-medium text-slate-500">Project handbooks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xl font-black text-slate-950 tabular-nums">{curriculum.length}</p>
                <p className="text-xs font-medium text-slate-500">Curriculum modules</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xl font-black text-slate-950 tabular-nums">100%</p>
                <p className="text-xs font-medium text-slate-500">Free & open access</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex justify-start lg:justify-end">
              <Link
                to="/curriculum"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
              >
                <span>View complete index</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CONTINUE LEARNING: USER PROGRESS BANNER (IF ACTIVE PROGRESS EXISTS) */}
      {/* ========================================================================= */}
      {completedCount > 0 && nextIncomplete && (
        <section className="border-b border-slate-200 bg-emerald-50/50 py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3.5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Continue learning</p>
                  <h2 className="mt-0.5 text-base font-black text-slate-950">{nextIncomplete.title}</h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {completedCount} of {totalLessonsCount} lessons completed · {progressPercentage}% progress
                  </p>
                </div>
              </div>
              <Link
                to={`/learn/${nextIncomplete.id}`}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white transition hover:bg-emerald-700"
              >
                Continue lesson
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. CHOOSE YOUR LEARNING PATH: GOAL-BASED DISCOVERY */}
      {/* ========================================================================= */}
      <section aria-labelledby="learning-paths-heading" className="border-b border-slate-200 bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Goal-based learning</p>
            <h2 id="learning-paths-heading" className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Choose your learning path
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              One complete AI library, four focused ways to learn. Start with foundational concepts, jump directly into a specialized subject, develop advanced production expertise, or build working software.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card A: Start from the beginning */}
            <div className="flex flex-col justify-between rounded-2xl border border-sky-200/80 bg-white p-5 shadow-xs transition duration-200 hover:border-sky-400 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                    Beginners
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">Path 1</span>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-700">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-black text-slate-950">Start from the beginning</h3>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  New to machine learning? Follow a sensible progression from core intuition to working algorithms, data preprocessing, and evaluation.
                </p>
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs space-y-2">
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Recommended sequence:</p>
                  <ol className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="font-mono text-sky-600 font-bold text-[11px]">1.</span>
                      <Link to="/learn/what-is-ml" className="hover:text-sky-700 hover:underline">What Is Machine Learning?</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-mono text-sky-600 font-bold text-[11px]">2.</span>
                      <Link to="/learn/python-for-ml" className="hover:text-sky-700 hover:underline">Python for ML & Libraries</Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-mono text-sky-600 font-bold text-[11px]">3.</span>
                      <Link to="/learn/linear-regression" className="hover:text-sky-700 hover:underline">Linear Regression</Link>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/learn/what-is-ml"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-black text-white transition hover:bg-sky-700"
                >
                  Start First Lesson
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/curriculum"
                  className="text-center text-[11px] font-bold text-slate-500 hover:text-sky-600"
                >
                  View full curriculum roadmap →
                </Link>
              </div>
            </div>

            {/* Card B: Learn a specific topic */}
            <div className="flex flex-col justify-between rounded-2xl border border-violet-200/80 bg-white p-5 shadow-xs transition duration-200 hover:border-violet-400 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700">
                    Direct Subject Entry
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">Path 2</span>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-black text-slate-950">Learn a specific topic</h3>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Already familiar with basic concepts? Jump straight into modern AI subjects without being forced to start at the beginning.
                </p>
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs space-y-2">
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Direct entry points:</p>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center justify-between">
                      <Link to="/learn/deep-learning-intro" className="font-medium text-slate-800 hover:text-violet-700 hover:underline">
                        Deep Learning
                      </Link>
                      <span className="text-[10px] font-bold text-violet-700">Intro</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Link to="/learn/generative-ai-intro" className="font-medium text-slate-800 hover:text-violet-700 hover:underline">
                        Generative AI
                      </Link>
                      <span className="text-[10px] font-bold text-violet-700">Intro</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Link to="/learn/llm-intro" className="font-medium text-slate-800 hover:text-violet-700 hover:underline">
                        Large Language Models
                      </Link>
                      <span className="text-[10px] font-bold text-violet-700">Intro</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Link to="/learn/agentic-ai-intro" className="font-medium text-slate-800 hover:text-violet-700 hover:underline">
                        Agentic AI
                      </Link>
                      <span className="text-[10px] font-bold text-violet-700">Intro</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/learn/generative-ai-intro"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-black text-white transition hover:bg-violet-700"
                >
                  Explore Modern AI
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#browse-by-topic"
                  className="text-center text-[11px] font-bold text-slate-500 hover:text-violet-600"
                >
                  Browse all topic tracks ↓
                </a>
              </div>
            </div>

            {/* Card C: Deepen professional expertise */}
            <div className="flex flex-col justify-between rounded-2xl border border-amber-200/80 bg-white p-5 shadow-xs transition duration-200 hover:border-amber-400 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                    Advanced
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">Path 3</span>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
                    <ServerCog className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-black text-slate-950">Deepen professional expertise</h3>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For engineers and ML practitioners seeking advanced architectures, evaluation benchmarks, reliability, and system design.
                </p>
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs space-y-2">
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Advanced topics:</p>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>
                      <Link to="/learn/advanced-rag" className="font-medium text-slate-800 hover:text-amber-700 hover:underline block truncate">
                        • Advanced RAG & Dense Retrieval
                      </Link>
                    </li>
                    <li>
                      <Link to="/learn/llm-evaluation" className="font-medium text-slate-800 hover:text-amber-700 hover:underline block truncate">
                        • LLM Evaluation & Benchmarking
                      </Link>
                    </li>
                    <li>
                      <Link to="/learn/agent-security" className="font-medium text-slate-800 hover:text-amber-700 hover:underline block truncate">
                        • Agent Security & Guardrails
                      </Link>
                    </li>
                    <li>
                      <Link to="/learn/ml-system-design" className="font-medium text-slate-800 hover:text-amber-700 hover:underline block truncate">
                        • End-to-End AI System Design
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/learn/ml-system-design"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-black text-white transition hover:bg-amber-700"
                >
                  Study System Design
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/curriculum"
                  className="text-center text-[11px] font-bold text-slate-500 hover:text-amber-700"
                >
                  View MLOps & Architecture modules →
                </Link>
              </div>
            </div>

            {/* Card D: Build practical AI systems */}
            <div className="flex flex-col justify-between rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-xs transition duration-200 hover:border-emerald-400 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Hands-On Builds
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">Path 4</span>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <FolderKanban className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-black text-slate-950">Build practical AI systems</h3>
                </div>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Turn theory into working software with 12 complete project handbooks built from scratch with code, tests, and Streamlit UIs.
                </p>
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs space-y-2">
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Featured handbooks:</p>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>
                      <Link to="/projects/titanic-survival" className="font-medium text-slate-800 hover:text-emerald-700 hover:underline block truncate">
                        • Titanic Survival Predictor
                      </Link>
                    </li>
                    <li>
                      <Link to="/projects/pdf-rag" className="font-medium text-slate-800 hover:text-emerald-700 hover:underline block truncate">
                        • Chat With Your PDFs (RAG)
                      </Link>
                    </li>
                    <li>
                      <Link to="/projects/ai-research-assistant" className="font-medium text-slate-800 hover:text-emerald-700 hover:underline block truncate">
                        • AI Research Assistant (Agent)
                      </Link>
                    </li>
                    <li>
                      <Link to="/projects/model-to-production" className="font-medium text-slate-800 hover:text-emerald-700 hover:underline block truncate">
                        • Model to Production (FastAPI & CI)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/projects"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white transition hover:bg-emerald-700"
                >
                  Browse 12 Project Handbooks
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/curriculum"
                  className="text-center text-[11px] font-bold text-slate-500 hover:text-emerald-700"
                >
                  View 8 project tutorial lessons →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROJECT SHOWCASE: 12 REAL PROJECT HANDBOOKS (HIGH PROMINENCE SECTION) */}
      {/* ========================================================================= */}
      <section id="project-showcase" className="border-b border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Category Tabs */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Production-Grade Software</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                12 Real Machine Learning & AI Projects
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Full-fidelity handbooks with reproducible data pipelines, baseline comparisons, unit tests,
                Streamlit interfaces, and downloadable starter ZIPs. No mock data or half-finished code.
              </p>
            </div>

            {/* Segmented Filter Controls */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1">
              {[
                { id: 'all', label: 'All (12)' },
                { id: 'ml', label: 'Machine Learning (6)' },
                { id: 'dl-nlp', label: 'Deep Learning & NLP (2)' },
                { id: 'genai-rag', label: 'GenAI & RAG (2)' },
                { id: 'agents-mlops', label: 'Agents & MLOps (2)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setProjectCategory(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                    projectCategory === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Marquee Flagship Project Spotlight */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-6 text-white shadow-xl sm:p-8">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-emerald-400/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                    Flagship Handbook
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Build Time: {flagshipProject.buildTime}</span>
                </div>
                <h3 className="mt-3 text-xl font-black tracking-tight text-white sm:text-2xl">
                  {flagshipProject.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {flagshipProject.description}
                </p>

                <div className="mt-4 rounded-xl bg-slate-900/80 border border-white/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Deliverable Outcome</p>
                  <p className="mt-1 text-xs text-slate-200">{flagshipProject.build}</p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {flagshipProject.tools.slice(0, 7).map(t => (
                    <span key={t} className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                  <span className="text-xs text-slate-400 font-mono">+{flagshipProject.tools.length - 7} more</span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/projects/${flagshipProject.id}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2 text-xs font-black text-slate-950 transition hover:bg-cyan-300"
                  >
                    Read Complete Handbook
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/20 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    View All 12 Projects
                  </Link>
                </div>
              </div>

              {/* Verified Code & Test Preview Panel */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-slate-700/80 bg-slate-950/90 p-4 font-mono text-xs shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                      verified-test-suite.py
                    </span>
                    <span className="text-emerald-400 font-bold">100% PASS</span>
                  </div>
                  <pre className="mt-3 overflow-x-auto text-[11px] leading-5 text-slate-300">
                    <code>{`# Verified Handbook Deliverables
✓ test_page_level_extraction()
✓ test_sparse_tfidf_retrieval()
✓ test_citation_faithfulness()
✓ test_streamlit_offline_mode()

📦 starter_code.zip (Full scaffold)
🧪 10 automated unit tests included`}</code>
                  </pre>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Clean pipeline architecture</span>
                    <span className="text-cyan-400">Zero synthetic mockups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Handbooks */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      {project.level}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{project.buildTime}</span>
                  </div>

                  <h3 className="mt-3 text-base font-black text-slate-950 group-hover:text-emerald-700 transition">
                    {project.shortTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-700 text-[11px] block">Deliverable:</span>
                    <span className="text-slate-600 line-clamp-2 mt-0.5">{project.build}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tools.slice(0, 4).map(t => (
                      <span key={t} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-600">
                        {t}
                      </span>
                    ))}
                    {project.tools.length > 4 && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                        +{project.tools.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Read Handbook</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          {/* Project tutorial lessons link bridge */}
          <div className="mt-8 rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-100 text-indigo-700">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600">
                Looking for foundational tutorials that teach the concepts step by step before building?
              </p>
            </div>
            <Link
              to="/curriculum"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 shrink-0 inline-flex items-center gap-1"
            >
              Explore 8 project tutorial lessons in curriculum →
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BROWSE BY TOPIC: CURRICULUM TOPICS & LESSON COUNTS */}
      {/* ========================================================================= */}
      <section id="browse-by-topic" className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Curriculum Map</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Browse by topic
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Structured into 6 specialized tracks covering 17 modules and 167 verified lessons.
              </p>
            </div>
            <Link
              to="/curriculum"
              className="hidden items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 sm:inline-flex"
            >
              View full curriculum roadmap
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {tracks.map(track => {
              const Icon = track.icon;
              const count = lessonCountFor(track.categoryIds);

              return (
                <Link
                  key={track.title}
                  to={track.route}
                  className={`group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-1 hover:shadow-lg ${track.borderHover}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`grid h-10 w-10 place-items-center rounded-xl ${track.iconBg} ${track.iconColor}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true" />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-slate-950 group-hover:text-blue-600 transition">
                      {track.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-blue-600 tabular-nums">
                        {count}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">lessons</span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {track.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key topics:</p>
                    <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600">
                      {track.sampleTopics.map(st => (
                        <li key={st} className="truncate">• {st}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              View full curriculum roadmap
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. RECOMMENDED FOR YOU: EDITORIAL & VISUAL LESSON SPOTLIGHTS */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">High-Impact Starting Points</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Recommended for you
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Hand-picked cornerstone lessons featuring interactive diagrams, worked calculations, and clear intuition.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
              <span className="rounded-md bg-slate-100 px-2.5 py-1">Machine Learning</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1">Deep Learning</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1">LLMs & RAG</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1">Agentic AI</span>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {recommendedLessons.map(lesson => {
              const Icon = lesson.icon;
              const topicId = lesson.route.split('/').pop() ?? '';
              const completed = isCompleted(topicId);

              return (
                <Link
                  key={lesson.route}
                  to={lesson.route}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
                >
                  <div>
                    {/* Visual Diagram Box */}
                    <div className="relative h-32 w-full border-b border-slate-100 bg-gradient-to-br from-slate-50 via-slate-100/50 to-blue-50/40 p-4">
                      <LessonDiagram type={lesson.diagramType} />
                      {completed && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          Completed
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-indigo-600">{lesson.category}</span>
                        <span>{lesson.time} read</span>
                      </div>
                      <h3 className="mt-2 text-base font-black leading-snug text-slate-950 group-hover:text-blue-600 transition">
                        {lesson.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-blue-600">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-medium">
                        {lesson.level}
                      </span>
                      <span className="inline-flex items-center gap-1 group-hover:underline">
                        Start Lesson
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CAREER & FREE RESOURCES: INTERVIEW HANDBOOKS & PRACTICE QUESTIONS */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          
          {/* Left Column: Interview questions links */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Career preparation</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Preparing for an interview?</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                  Practice ML, Python, SQL, LLM/RAG and system-design questions with dedicated interview lessons.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {interviewLinks.map(item => (
                <Link
                  key={item.route}
                  to={item.route}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-bold text-slate-800 transition hover:border-violet-300 hover:bg-white hover:text-violet-700 hover:shadow-xs"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                </Link>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <Link
                to="/learn/ai-data-career-paths"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900"
              >
                <span>Explore AI & Data career roadmaps, compensation and role expectations</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: 10 Free Interview Handbooks (PDFs) */}
          <div className="flex flex-col justify-between rounded-2xl border border-indigo-900/60 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 sm:p-8 text-white shadow-xl lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20">
                  <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-black text-amber-300 uppercase tracking-wider">
                  10 Free PDFs
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black text-white">10 Free Interview Handbooks</h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Download detailed PDFs for Machine Learning, Deep Learning, Generative AI, LLM & RAG, Agentic AI,
                Python, SQL, System Design, MLOps and Behavioral interviews.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {['ML', 'Deep Learning', 'GenAI', 'LLM & RAG', 'Agents', 'System Design', 'MLOps'].map(tag => (
                  <span key={tag} className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href="#free-interview-handbooks"
                onClick={openHandbooks}
                aria-expanded={showHandbooks}
                aria-controls="free-interview-handbooks"
                className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-xs font-black text-slate-950 transition hover:bg-cyan-300"
              >
                Explore all free PDFs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ARTICLES & EDITORIAL GUIDES FROM THE BLOG */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">From the blog</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Practical ML & AI articles
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-600">
                Deeper guides, comparisons and career articles that complement the lesson curriculum.
              </p>
            </div>
            <Link
              to="/blog"
              className="hidden items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 sm:inline-flex"
            >
              View all articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {homepageBlogPosts.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span className="font-bold text-emerald-700">{post.category}</span>
                    <span className="font-mono">{post.readTime} min read</span>
                  </div>
                  <h3 className="mt-3 text-base font-black leading-snug text-slate-950 transition group-hover:text-emerald-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Read article</span>
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              View all articles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CALL TO ACTION STRIP: START LEARNING TODAY */}
      {/* ========================================================================= */}
      <section className="bg-slate-950 py-12 sm:py-16 text-white border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to master machine learning and artificial intelligence?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Start with zero prerequisites. 167 verified tutorials, 12 full-stack projects, and 10 interview handbooks—free forever.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/learn/what-is-ml"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-xs font-black text-slate-950 transition hover:bg-cyan-300"
              >
                Start Lesson 1: What Is ML?
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <FolderKanban className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                Browse 12 Project Handbooks
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
