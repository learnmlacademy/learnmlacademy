import { useEffect, type ComponentType } from 'react';
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
} from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { curriculum } from '../data/curriculum';

type JourneyStage = {
  title: string;
  description: string;
  route: string;
  count: number;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
};

const countLessons = (categoryId: string) =>
  curriculum.find(category => category.id === categoryId)?.subtopics.length ?? 0;

const machineLearningCount = curriculum
  .slice(0, 9)
  .reduce((total, category) => total + category.subtopics.length, 0);

const journey: JourneyStage[] = [
  {
    title: 'Machine Learning',
    description: 'Learn how data becomes predictions and decisions.',
    route: '/learn/what-is-ml',
    count: machineLearningCount,
    icon: Network,
  },
  {
    title: 'Deep Learning',
    description: 'Build intuition for neural networks and modern architectures.',
    route: '/learn/deep-learning-intro',
    count: countLessons('deep-learning'),
    icon: BrainCircuit,
  },
  {
    title: 'Generative AI',
    description: 'Understand how models learn to create new data.',
    route: '/learn/generative-ai-intro',
    count: countLessons('generative-ai'),
    icon: Sparkles,
  },
  {
    title: 'LLMs & RAG',
    description: 'Study language models, retrieval, evaluation, and serving.',
    route: '/learn/llm-intro',
    count: countLessons('large-language-models'),
    icon: MessageSquareText,
  },
  {
    title: 'Agentic AI',
    description: 'Connect models, tools, memory, planning, and workflows.',
    route: '/learn/agentic-ai-intro',
    count: countLessons('agentic-ai'),
    icon: Bot,
  },
  {
    title: 'AI Engineering',
    description: 'Take reliable AI systems from notebook to production.',
    route: '/learn/ai-engineering-mlops',
    count: countLessons('ai-engineering-mlops'),
    icon: ServerCog,
  },
];

const startingPoints = [
  { label: "I'm completely new to ML", route: '/learn/what-is-ml' },
  { label: 'I know ML and want Deep Learning', route: '/learn/deep-learning-intro' },
  { label: 'I want to learn LLMs & RAG', route: '/learn/llm-intro' },
  { label: 'I want to build AI agents', route: '/learn/agentic-ai-intro' },
  { label: 'I want hands-on projects', route: '/learn/project-customer-churn' },
  { label: "I'm preparing for interviews", route: '/learn/ai-data-career-paths' },
];

const learningFormat = [
  { title: 'Simple explanations', icon: Lightbulb },
  { title: 'Worked examples', icon: FileQuestion },
  { title: 'Teaching diagrams', icon: Route },
  { title: 'Practical code', icon: Code2 },
  { title: 'Knowledge checks', icon: CheckCircle2 },
  { title: 'Real projects', icon: FolderKanban },
];

export function HomePage() {
  const tutorialCount = curriculum.reduce(
    (total, category) => total + category.subtopics.length,
    0,
  );
  const projectCount = countLessons('projects');

  useEffect(() => {
    document.title = 'ML Academy — Learn Machine Learning with Structured Tutorials & Code';
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

  return (
    <div className="bg-white">
      <WebsiteSchema />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        <div
          className="absolute inset-0 -z-10 opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#818cf8 1px, transparent 1px), linear-gradient(90deg, #818cf8 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">
            A structured path through modern AI
          </p>
          <h1 className="lma-display mx-auto max-w-5xl text-white">
            Master Machine Learning to Agentic AI — Step by Step
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Beginner-friendly explanations, worked examples, diagrams, code, quizzes and real projects across a structured AI curriculum.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/learn/what-is-ml"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-7 py-3 font-bold text-white shadow-lg shadow-indigo-950/30 transition-colors hover:bg-indigo-400 sm:w-auto"
            >
              Start Learning <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              to="/curriculum"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-bold text-white transition-colors hover:bg-white/15 sm:w-auto"
            >
              Explore Learning Paths
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span><strong className="text-white">{tutorialCount}</strong> lessons</span>
            <span aria-hidden="true">•</span>
            <span><strong className="text-white">{projectCount}</strong> guided projects</span>
            <span aria-hidden="true">•</span>
            <Link to="/cheatsheet" className="font-semibold text-indigo-300 hover:text-indigo-200">
              Free interview resource →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Core learning journey</p>
            <h2 id="journey-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              One path, from foundations to production
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Each stage builds the ideas needed for the next. Start at your level and move forward when you are ready.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-indigo-200 xl:block" aria-hidden="true" />
            {journey.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <li key={stage.title} className="relative">
                  <Link
                    to={stage.route}
                    className="group flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-300 hover:bg-indigo-50/40 md:flex-col"
                  >
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-extrabold text-white">
                        {index + 1}
                      </span>
                    </span>
                    <span>
                      <span className="block font-extrabold leading-tight text-slate-950 group-hover:text-indigo-700">{stage.title}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-slate-600">{stage.description}</span>
                      <span className="mt-3 block text-xs font-bold uppercase tracking-wide text-indigo-600">{stage.count} lessons</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="practice-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Link
              to="/learn/project-customer-churn"
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-colors hover:border-indigo-300 sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <FolderKanban className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Projects</p>
              <h2 id="practice-heading" className="mt-2 text-2xl font-extrabold text-slate-950">Learn by building real systems.</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                Turn concepts into end-to-end work across machine learning, forecasting, RAG, image classification and AI agents.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-indigo-700">
                Explore {projectCount} projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>

            <Link
              to="/learn/ai-data-career-paths"
              className="group rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-sm transition-colors hover:border-indigo-400 sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-indigo-300">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-indigo-300">Career & interview preparation</p>
              <h2 className="mt-2 text-2xl font-extrabold">Prepare for the work, not only the questions.</h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                Use role roadmaps, technical interview practice, system-design guidance and project storytelling frameworks.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-indigo-300">
                Explore career paths <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16" aria-labelledby="starting-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Choose your starting point</p>
              <h2 id="starting-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
                Start with what you want to learn next
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                You do not need to read every lesson in order. Choose the closest goal and the curriculum will show the surrounding path.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {startingPoints.map((item, index) => (
                <Link
                  key={item.route}
                  to={item.route}
                  className="group flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 transition-colors hover:border-indigo-300 hover:text-indigo-700"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">{item.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-indigo-600" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="format-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Inside every learning experience</p>
            <h2 id="format-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
              Concepts are explained, shown and checked
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {learningFormat.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                  <Icon className="mx-auto h-6 w-6 text-indigo-600" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold leading-snug text-slate-800">{item.title}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link to="/learn/rag" className="inline-flex items-center gap-2 font-bold text-indigo-700 hover:text-indigo-900">
              Preview a modern AI lesson <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
