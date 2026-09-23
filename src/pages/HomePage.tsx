import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WebsiteSchema } from '../components/SchemaMarkup';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { curriculum } from '../data/curriculum';

const cleanCategoryTitle = (title: string) => title.replace(/^\d+\.\s*/, '');

const getCategory = (id: string) => curriculum.find(category => category.id === id);

const getTopic = (id: string) => {
  for (const category of curriculum) {
    const topic = category.subtopics.find(subtopic => subtopic.id === id);
    if (topic) return topic;
  }
  return null;
};

const countCategories = (ids: string[]) =>
  ids.reduce((total, id) => total + (getCategory(id)?.subtopics.length ?? 0), 0);

const learningAreas = [
  {
    number: '01',
    title: 'Machine Learning',
    description: 'Foundations, Python, preprocessing, supervised and unsupervised learning, evaluation, forecasting and advanced learning paradigms.',
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
    featuredIds: [
      'what-is-ml',
      'types-of-ml',
      'python-for-ml',
      'feature-engineering',
      'linear-regression',
      'decision-trees',
      'random-forest',
      'train-test-split',
    ],
  },
  {
    number: '02',
    title: 'Deep Learning',
    description: 'Neural networks from first principles through CNNs, sequence models, transformers, transfer learning and newer architectures.',
    route: '/learn/deep-learning-intro',
    categoryIds: ['deep-learning', 'advanced-deep-learning'],
    featuredIds: [
      'deep-learning-intro',
      'neural-networks',
      'activation-functions',
      'backpropagation',
      'cnn',
      'transformers-deep-learning',
      'transfer-learning',
      'graph-neural-networks',
    ],
  },
  {
    number: '03',
    title: 'Generative AI',
    description: 'How generative models learn, major model families, multimodal systems, evaluation, responsible use and production applications.',
    route: '/learn/generative-ai-intro',
    categoryIds: ['generative-ai'],
    featuredIds: [
      'generative-ai-intro',
      'how-generative-models-learn',
      'vae',
      'gans',
      'diffusion-models',
      'multimodal-ai',
      'building-genai-apps',
      'genai-deployment',
    ],
  },
  {
    number: '04',
    title: 'Large Language Models & RAG',
    description: 'Tokens, transformers, prompting, training, alignment, retrieval, evaluation, serving and production LLM systems.',
    route: '/learn/llm-intro',
    categoryIds: ['large-language-models'],
    featuredIds: [
      'llm-intro',
      'tokenization-embeddings',
      'transformers-attention',
      'prompt-engineering',
      'rag',
      'advanced-rag',
      'llm-evaluation',
      'llmops',
    ],
  },
  {
    number: '05',
    title: 'Agentic AI',
    description: 'Tool use, planning, context, memory, durable execution, agentic RAG, multi-agent systems, MCP, safety and deployment.',
    route: '/learn/agentic-ai-intro',
    categoryIds: ['agentic-ai'],
    featuredIds: [
      'agentic-ai-intro',
      'tool-calling',
      'building-ai-agent',
      'planning-reflection',
      'agent-memory',
      'agentic-rag',
      'model-context-protocol',
      'agent-security',
    ],
  },
  {
    number: '06',
    title: 'AI Engineering & MLOps',
    description: 'Data and feature pipelines, experiment tracking, inference, CI/CD, monitoring, reliability and end-to-end system design.',
    route: '/learn/ai-engineering-mlops',
    categoryIds: ['ai-engineering-mlops'],
    featuredIds: [
      'ai-engineering-mlops',
      'ml-data-feature-pipelines',
      'experiment-tracking-model-registry',
      'batch-online-inference',
      'ml-cicd-continuous-training',
      'ml-monitoring-drift',
      'production-ai-reliability',
      'ml-system-design',
    ],
  },
];

const popularLessonIds = [
  'train-test-split',
  'feature-selection',
  'types-of-ml',
  'data-visualization',
  'ridge-regression',
  'xgboost',
];

const projectIds = [
  'project-customer-churn',
  'project-sales-forecasting',
  'project-rag-document-qa',
  'project-ai-agent',
];

const startingPoints = [
  ['New to machine learning?', 'Start with What Is Machine Learning', '/learn/what-is-ml'],
  ['Know classical ML already?', 'Start Deep Learning', '/learn/deep-learning-intro'],
  ['Interested in modern generative models?', 'Start Generative AI', '/learn/generative-ai-intro'],
  ['Building with language models?', 'Start LLMs & RAG', '/learn/llm-intro'],
  ['Want systems that can use tools?', 'Start Agentic AI', '/learn/agentic-ai-intro'],
] as const;

export function HomePage() {
  const tutorialCount = curriculum.reduce(
    (total, category) => total + category.subtopics.length,
    0,
  );
  const projectCount = getCategory('projects')?.subtopics.length ?? 0;

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
    <div className="bg-white text-slate-900">
      <WebsiteSchema />

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-indigo-700">LearnMLAcademy</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[3.45rem] lg:leading-[1.05]">
              Learn Machine Learning, Deep Learning and Modern AI
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              A free, structured curriculum with clear explanations, mathematics, worked examples, Python code, original teaching diagrams and practice questions.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/learn/what-is-ml" className="inline-flex items-center gap-2 text-indigo-700 hover:text-indigo-900">
                Start with Machine Learning <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/curriculum" className="text-slate-700 hover:text-slate-950">
                Browse the full curriculum
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              <strong className="font-semibold text-slate-800">{tutorialCount} lessons</strong>
              <span className="mx-2" aria-hidden="true">·</span>
              {projectCount} guided projects
              <span className="mx-2" aria-hidden="true">·</span>
              Machine Learning to production AI systems
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12" aria-labelledby="curriculum-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 border-b border-slate-200 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(18rem,32rem)] md:items-end">
            <div>
              <p className="text-sm font-semibold text-indigo-700">Curriculum</p>
              <h2 id="curriculum-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                See what you can learn before you scroll
              </h2>
            </div>
            <p className="leading-7 text-slate-600">
              The curriculum is organized as a progression, but every lesson can also be used as a standalone reference.
            </p>
          </div>

          <div className="grid gap-x-10 lg:grid-cols-2">
            {learningAreas.map(area => {
              const topics = area.featuredIds.map(getTopic).filter(Boolean);
              const count = countCategories(area.categoryIds);
              return (
                <section key={area.number} className="border-b border-slate-200 py-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm font-semibold text-slate-400">{area.number}</span>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">{area.title}</h3>
                  </div>
                  <p className="mt-3 max-w-2xl leading-7 text-slate-600">{area.description}</p>
                  <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {topics.map(topic => topic && (
                      <li key={topic.id}>
                        <Link
                          to={`/learn/${topic.id}`}
                          className="group inline-flex items-start gap-2 text-[0.95rem] font-medium leading-6 text-slate-700 hover:text-indigo-700"
                        >
                          <span className="mt-[0.65rem] h-px w-3 shrink-0 bg-slate-300 group-hover:bg-indigo-500" aria-hidden="true" />
                          <span>{topic.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={area.route} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900">
                    Explore {count} lessons <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </section>
              );
            })}
          </div>

          <div className="pt-7">
            <Link to="/curriculum" className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-indigo-700">
              View all {tutorialCount} lessons in the curriculum <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-12 sm:py-16" aria-labelledby="lesson-example-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:items-start">
          <div>
            <p className="text-sm font-semibold text-indigo-700">Inside a lesson</p>
            <h2 id="lesson-example-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              The page teaches the idea instead of decorating it
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Concepts are introduced in plain language, then traced through the mathematics, a small worked example, code and interpretation.
            </p>
            <Link to="/learn/gradient-descent" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900">
              Open the Gradient Descent lesson <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-l-2 border-slate-900 pl-6 sm:pl-8">
            <p className="text-sm font-bold text-slate-950">Worked example — one gradient descent step</p>
            <div className="mt-5 space-y-4 text-slate-700">
              <p>Start with <code className="font-mono font-semibold text-slate-950">J(w) = (w − 3)²</code> and <code className="font-mono font-semibold text-slate-950">w = 7</code>.</p>
              <p><strong className="text-slate-950">1.</strong> Cost: <code className="font-mono">J(7) = 16</code></p>
              <p><strong className="text-slate-950">2.</strong> Gradient: <code className="font-mono">2(w − 3) = 8</code></p>
              <p><strong className="text-slate-950">3.</strong> With learning rate <code className="font-mono">0.1</code>: <code className="font-mono">w_new = 7 − 0.1 × 8 = 6.2</code></p>
              <p><strong className="text-slate-950">4.</strong> New cost: <code className="font-mono">J(6.2) = 10.24</code></p>
              <p className="border-t border-slate-300 pt-4 text-sm leading-6 text-slate-600">
                The cost fell from 16 to 10.24, so this update moved the parameter in the right direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <section aria-labelledby="start-heading">
            <p className="text-sm font-semibold text-indigo-700">Start at your level</p>
            <h2 id="start-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Where should I start?</h2>
            <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {startingPoints.map(([question, answer, route]) => (
                <div key={route} className="py-4">
                  <p className="text-sm text-slate-500">{question}</p>
                  <Link to={route} className="mt-1 inline-flex items-center gap-2 font-bold text-slate-900 hover:text-indigo-700">
                    {answer} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="projects-heading">
            <p className="text-sm font-semibold text-indigo-700">Practice</p>
            <h2 id="projects-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Projects that connect the lessons</h2>
            <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {projectIds.map(id => {
                const project = getTopic(id);
                return project ? (
                  <Link key={id} to={`/learn/${id}`} className="group flex items-center justify-between gap-4 py-4">
                    <span className="font-semibold leading-6 text-slate-800 group-hover:text-indigo-700">{project.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-indigo-600" aria-hidden="true" />
                  </Link>
                ) : null;
              })}
            </div>
            <Link to="/learn/project-customer-churn" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900">
              Explore all {projectCount} projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-12" aria-labelledby="popular-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="text-sm font-semibold text-indigo-700">Useful references</p>
              <h2 id="popular-heading" className="mt-2 text-2xl font-extrabold text-slate-950">Popular lessons</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">A few lessons learners frequently discover while searching for practical ML explanations.</p>
            </div>
            <div className="grid gap-x-8 border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-3">
              {popularLessonIds.map(id => {
                const topic = getTopic(id);
                return topic ? (
                  <Link key={id} to={`/learn/${id}`} className="group flex min-h-16 items-center justify-between gap-3 border-b border-slate-300 py-3">
                    <span className="font-semibold leading-5 text-slate-800 group-hover:text-indigo-700">{topic.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-indigo-600" aria-hidden="true" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
