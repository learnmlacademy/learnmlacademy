import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { curriculum } from '../data/curriculum';

const cleanTitle = (title: string) => title.replace(/^\d+\.\s*/, '');

export function CurriculumPage() {
  const tutorialCount = curriculum.reduce((total, category) => total + category.subtopics.length, 0);

  useEffect(() => {
    document.title = `AI Curriculum | ${tutorialCount} Free ML, LLM & Agent Tutorials | ML Academy`;
    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };
    const desc = `Browse ${tutorialCount} free tutorials covering Machine Learning, Deep Learning, Generative AI, Large Language Models, RAG, and Agentic AI with simple examples and code.`;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', 'Modern AI Curriculum | ML Academy');
    setMeta('meta[property="og:description"]', 'content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/curriculum');
  }, [tutorialCount]);

  return (
    <div className="bg-white">
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold text-indigo-700">Curriculum</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">
            {tutorialCount} lessons from Machine Learning foundations to production AI
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Use the curriculum in order for a complete learning path, or jump directly to the topic you need. Every lesson has a permanent URL and remains available as a standalone reference.
          </p>

          <nav aria-label="Curriculum sections" className="mt-8 border-y border-slate-200 py-4">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {curriculum.map((category, index) => (
                <a key={category.id} href={`#${category.id}`} className="text-slate-600 hover:text-indigo-700">
                  {String(index + 1).padStart(2, '0')} {cleanTitle(category.title)}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {curriculum.map((category, categoryIndex) => (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-24 grid gap-6 border-b border-slate-200 py-9 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12"
            aria-labelledby={`${category.id}-heading`}
          >
            <div>
              <p className="font-mono text-sm font-semibold text-slate-400">
                {String(categoryIndex + 1).padStart(2, '0')}
              </p>
              <h2 id={`${category.id}-heading`} className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
                {cleanTitle(category.title)}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{category.subtopics.length} lessons</p>
              <Link
                to={`/learn/${category.subtopics[0]?.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900"
              >
                Start this section <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ol className="grid gap-x-10 sm:grid-cols-2">
              {category.subtopics.map((topic, topicIndex) => {
                const previousModule = category.subtopics[topicIndex - 1]?.module;
                const showModule = Boolean(topic.module && topic.module !== previousModule);
                return (
                  <React.Fragment key={topic.id}>
                    {showModule && (
                      <li className="col-span-full border-t border-slate-200 pt-5 first:border-t-0 first:pt-0">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-700">{topic.module}</p>
                      </li>
                    )}
                    <li className="border-t border-slate-200 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                      <Link
                        to={`/learn/${topic.id}`}
                        className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-2 py-3.5"
                      >
                        <span className="font-mono text-xs font-semibold leading-6 text-slate-400">
                          {String(topicIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="font-semibold leading-6 text-slate-800 group-hover:text-indigo-700">
                          {topic.title}
                        </span>
                        <ArrowRight className="mt-1 h-4 w-4 text-slate-300 group-hover:text-indigo-600" aria-hidden="true" />
                      </Link>
                    </li>
                  </React.Fragment>
                );
              })}
            </ol>
          </section>
        ))}
      </main>
    </div>
  );
}
