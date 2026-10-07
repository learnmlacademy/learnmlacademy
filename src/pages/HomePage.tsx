import React, { useEffect, useMemo, useState, type ComponentType } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  FolderKanban,
  GraduationCap,
  MessageSquareText,
  Network,
  Search,
  ServerCog,
  Sparkles,
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { InterviewHandbookShowcase } from '../components/InterviewHandbookShowcase';
import { curriculum } from '../data/curriculum';
import { blogPosts } from '../data/blog';
import { projectPortfolio } from '../data/projectPortfolio';
import { useProgress } from '../context/ProgressContext';

type TrackCard = {
  title: string;
  description: string;
  route: string;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  categoryIds: string[];
  iconClass: string;
  panelClass: string;
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
    iconClass: 'bg-sky-100 text-sky-700',
    panelClass: 'from-sky-50 to-blue-50/40 border-sky-100',
  },
  {
    title: 'Deep Learning',
    description: 'Neural networks, backpropagation, CNNs, transformers, vision and advanced models.',
    route: '/learn/deep-learning-intro',
    icon: BrainCircuit,
    categoryIds: ['deep-learning', 'advanced-deep-learning'],
    iconClass: 'bg-violet-100 text-violet-700',
    panelClass: 'from-violet-50 to-purple-50/40 border-violet-100',
  },
  {
    title: 'Generative AI',
    description: 'VAEs, GANs, diffusion, multimodal generation, evaluation and deployment.',
    route: '/learn/generative-ai-intro',
    icon: Sparkles,
    categoryIds: ['generative-ai'],
    iconClass: 'bg-rose-100 text-rose-700',
    panelClass: 'from-rose-50 to-pink-50/40 border-rose-100',
  },
  {
    title: 'LLMs & RAG',
    description: 'Tokenization, transformers, embeddings, vector databases, RAG and LLMOps.',
    route: '/learn/llm-intro',
    icon: MessageSquareText,
    categoryIds: ['large-language-models'],
    iconClass: 'bg-emerald-100 text-emerald-700',
    panelClass: 'from-emerald-50 to-teal-50/40 border-emerald-100',
  },
  {
    title: 'Agentic AI',
    description: 'Tool calling, memory, planning, MCP, multi-agent systems, safety and deployment.',
    route: '/learn/agentic-ai-intro',
    icon: Bot,
    categoryIds: ['agentic-ai'],
    iconClass: 'bg-amber-100 text-amber-700',
    panelClass: 'from-amber-50 to-orange-50/40 border-amber-100',
  },
  {
    title: 'AI Engineering',
    description: 'Production pipelines, serving, monitoring, reliability, CI/CD and system design.',
    route: '/learn/ai-engineering-mlops',
    icon: ServerCog,
    categoryIds: ['ai-engineering-mlops'],
    iconClass: 'bg-indigo-100 text-indigo-700',
    panelClass: 'from-indigo-50 to-blue-50/40 border-indigo-100',
  },
];

const popularTopics = [
  { label: 'Gradient Descent', route: '/learn/gradient-descent' },
  { label: 'RAG', route: '/learn/rag' },
  { label: 'Transformers', route: '/learn/transformers-attention' },
  { label: 'AI Agents', route: '/learn/agentic-ai-intro' },
  { label: 'MCP', route: '/learn/model-context-protocol' },
  { label: 'Vector Databases', route: '/learn/vector-databases' },
];

const recommendedLessons = [
  {
    title: 'Linear Regression Step by Step',
    description: 'Build intuition for the line of best fit, loss and a complete Python workflow.',
    route: '/learn/linear-regression',
    level: 'Beginner',
    time: '12 min',
    icon: Network,
  },
  {
    title: 'Neural Networks Explained',
    description: 'Understand neurons, layers, activations and how a network learns from data.',
    route: '/learn/neural-networks',
    level: 'Intermediate',
    time: '18 min',
    icon: BrainCircuit,
  },
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Learn retrieval, grounding, embeddings and the complete RAG information flow.',
    route: '/learn/rag',
    level: 'Intermediate',
    time: '20 min',
    icon: Database,
  },
  {
    title: 'What Is an AI Agent?',
    description: 'Connect tools, planning, memory and decisions into an agentic workflow.',
    route: '/learn/agentic-ai-intro',
    level: 'Beginner',
    time: '15 min',
    icon: Bot,
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

const allLessons = curriculum
  .filter(category => category.id !== 'projects')
  .flatMap(category =>
    category.subtopics.map(lesson => ({
      ...lesson,
      categoryTitle: category.title.replace(/^\d+\.\s*/, ''),
      route: `/learn/${lesson.id}`,
    })),
  );

const curriculumLessonCount = curriculum.reduce(
  (total, category) => total + category.subtopics.length,
  0,
);

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const {
    completedCount,
    progressPercentage,
    totalLessonsCount,
    isCompleted,
    getNextIncompleteTopic,
  } = useProgress();

  const tutorialCount = curriculumLessonCount;
  const projectCount = projectPortfolio.length;

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return allLessons
      .filter(lesson =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.categoryTitle.toLowerCase().includes(query) ||
        lesson.module?.toLowerCase().includes(query),
      )
      .slice(0, 8);
  }, [searchQuery]);

  const nextIncomplete = getNextIncompleteTopic();

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

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchResults[0]) {
      navigate(searchResults[0].route);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <WebsiteSchema />

      {/* Search-first hero */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_68%_75%,rgba(99,102,241,0.15),transparent_28%)]" />
        <div className="pointer-events-none absolute right-[-3rem] top-[-2.5rem] hidden h-[15rem] w-[15rem] rounded-full border border-cyan-300/15 lg:block">
          <div className="absolute inset-10 rounded-full border border-indigo-300/15" />
          <div className="absolute inset-20 rounded-full border border-sky-300/15" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-cyan-300/20 bg-cyan-400/5 shadow-[0_0_45px_rgba(56,189,248,0.10)]">
              <Network className="h-9 w-9 text-cyan-300/70" aria-hidden="true" />
            </div>
          </div>
          <span className="absolute left-14 top-24 h-2 w-2 rounded-full bg-cyan-300/70" />
          <span className="absolute bottom-24 left-20 h-2.5 w-2.5 rounded-full bg-indigo-300/70" />
          <span className="absolute right-16 top-36 h-2 w-2 rounded-full bg-sky-300/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-5">
          <a
            href="#free-interview-handbooks"
            className="absolute right-8 top-1/2 hidden w-[300px] -translate-y-1/2 rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-indigo-500/15 p-4 shadow-2xl backdrop-blur transition hover:-translate-y-[52%] hover:border-cyan-300/50 lg:block"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-black tracking-wide text-slate-950">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              NEW · 10 FREE PDFs
            </div>
            <h2 className="mt-3 text-lg font-black leading-tight text-white">
              ML & AI Interview Handbooks
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              ML, Deep Learning, GenAI, LLM & RAG, Agentic AI, Python, SQL, System Design, MLOps and Behavioral.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-black text-cyan-300">
              Browse & download
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          </a>

          <div className="max-w-3xl">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-bold text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
              <span>{tutorialCount} free lessons from ML foundations to production AI</span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-tight">
              What do you want to <span className="text-cyan-400">learn today?</span>
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-5 text-slate-300 sm:text-[15px]">
              Search practical tutorials across Machine Learning, Deep Learning, Generative AI,
              LLMs, RAG, Agentic AI and production AI engineering.
            </p>

            <form onSubmit={handleSearchSubmit} className="relative mt-3 max-w-3xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search tutorials — e.g. RAG, Linear Regression, AI Agents..."
                aria-label="Search tutorials"
                className="h-11 w-full rounded-xl border border-white/10 bg-white pl-11 pr-12 text-sm font-medium text-slate-900 shadow-xl outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15"
              />
              <button
                type="submit"
                aria-label="Open first search result"
                className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <Search className="h-4.5 w-4.5" aria-hidden="true" />
              </button>

              {searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-[3.2rem] z-30 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 text-left shadow-2xl">
                  {searchResults.length === 0 ? (
                    <p className="px-3 py-4 text-sm text-slate-500">
                      No lessons found for &quot;{searchQuery}&quot;.
                    </p>
                  ) : (
                    <ul className="max-h-80 overflow-y-auto">
                      {searchResults.map(result => (
                        <li key={result.id}>
                          <Link
                            to={result.route}
                            onClick={() => setSearchQuery('')}
                            className="group flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition hover:bg-slate-50"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-slate-900 group-hover:text-blue-700">
                                {result.title}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500">
                                {result.categoryTitle}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-600" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </form>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold text-slate-400">Popular searches:</span>
              {popularTopics.map(topic => (
                <Link
                  key={topic.route}
                  to={topic.route}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition hover:border-cyan-400/60 hover:bg-slate-800 hover:text-white"
                >
                  {topic.label}
                </Link>
              ))}
            </div>

            <a
              href="#free-interview-handbooks"
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-xs font-black text-violet-200 lg:hidden"
            >
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Explore 10 free interview handbook PDFs
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <InterviewHandbookShowcase />

      {/* Browse by topic */}
      <section className="bg-white py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Explore the curriculum</p>
              <h2 className="mt-0.5 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                Browse by topic
              </h2>
            </div>
            <Link
              to="/curriculum"
              className="hidden items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 sm:inline-flex"
            >
              View full curriculum
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {tracks.map(track => {
              const Icon = track.icon;
              const count = lessonCountFor(track.categoryIds);

              return (
                <Link
                  key={track.title}
                  to={track.route}
                  className={`group rounded-xl border bg-gradient-to-br p-3.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${track.panelClass}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-lg ${track.iconClass}`}>
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-2.5 text-sm font-black text-slate-950">{track.title}</h3>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-500">{count} lessons</p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{track.description}</p>
                </Link>
              );
            })}
          </div>

          <Link
            to="/curriculum"
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 sm:hidden"
          >
            View full curriculum
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Continue learning */}
      {completedCount > 0 && nextIncomplete && (
        <section className="border-y border-slate-200 bg-slate-50 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">Continue learning</p>
                  <h2 className="mt-1 text-lg font-black text-slate-950">{nextIncomplete.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {completedCount} of {totalLessonsCount} lessons completed · {progressPercentage}% progress
                  </p>
                </div>
              </div>
              <Link
                to={`/learn/${nextIncomplete.id}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Continue lesson
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recommended */}
      <section className="bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Start with a strong lesson</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Recommended for you
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Machine Learning</span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Deep Learning</span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">LLMs & RAG</span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Agentic AI</span>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {recommendedLessons.map(lesson => {
              const Icon = lesson.icon;
              const topicId = lesson.route.split('/').pop() ?? '';
              const completed = isCompleted(topicId);

              return (
                <Link
                  key={lesson.route}
                  to={lesson.route}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="relative grid h-36 place-items-center overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
                    <div className="absolute left-6 top-5 h-16 w-16 rounded-full border border-blue-200/70" />
                    <div className="absolute bottom-4 right-7 h-12 w-12 rounded-xl border border-indigo-200/70 rotate-12" />
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white bg-white/90 text-blue-700 shadow-lg">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    {completed && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-black leading-snug text-slate-950 group-hover:text-blue-700">
                      {lesson.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{lesson.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{lesson.level}</span>
                      <span className="text-slate-400">{lesson.time}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-y border-slate-200 bg-white py-9 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">From the blog</p>
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

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {homepageBlogPosts.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{post.readTime} min read</span>
                </div>
                <h3 className="mt-4 text-base font-black leading-snug text-slate-950 transition group-hover:text-emerald-700">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-600">
                  Read article
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/blog"
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 sm:hidden"
          >
            View all articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Interview prep */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-700">Career preparation</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Preparing for an interview?</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  Practice ML, Python, SQL, LLM/RAG and system-design questions with dedicated interview lessons.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {interviewLinks.map(item => (
                <Link
                  key={item.route}
                  to={item.route}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 sm:p-7">
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-950">10 Free Interview Handbooks</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Download detailed PDFs for Machine Learning, Deep Learning, Generative AI, LLM & RAG, Agentic AI, Python, SQL, System Design, MLOps and Behavioral interviews.
              </p>
            </div>
            <a
              href="#free-interview-handbooks"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Explore all free PDFs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Project + stats strip */}
      <section className="border-y border-slate-200 bg-slate-950 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-300">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{tutorialCount}</p>
                <p className="text-xs font-semibold text-slate-400">Free lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/15 text-amber-300">
                <FolderKanban className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{projectCount}</p>
                <p className="text-xs font-semibold text-slate-400">Project handbooks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{curriculum.length}</p>
                <p className="text-xs font-semibold text-slate-400">Curriculum modules</p>
              </div>
            </div>
            <Link
              to="/projects"
              className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 transition hover:border-blue-500/60 hover:bg-slate-800"
            >
              <div>
                <p className="text-sm font-black text-white">Build something real</p>
                <p className="mt-1 text-xs text-slate-400">Explore step-by-step ML & AI project handbooks</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-300" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
