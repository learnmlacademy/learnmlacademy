import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export function CurriculumPage() {
  const tutorialCount = curriculum.reduce((total, category) => total + category.subtopics.length, 0);

  useEffect(() => {
    document.title = `AI Curriculum | ${tutorialCount} Free ML, LLM & Agent Tutorials | ML Academy`;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };
    const desc = `Browse ${tutorialCount} free tutorials covering Machine Learning, Deep Learning, Generative AI, Large Language Models, RAG, and Agentic AI with simple examples and code.`;
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
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Modern AI Curriculum
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          A complete, step-by-step roadmap from Machine Learning basics to Deep Learning, Generative AI, LLMs, and safe AI agents.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {curriculum.map((category) => (
          <div key={category.id} className="bg-white border text-left border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3 border-b border-indigo-100 pb-3">
              <BookOpen className="text-indigo-500 w-6 h-6" /> 
              {category.title}
            </h2>
            <ul className="space-y-3">
              {category.subtopics.map((topic, topicIndex) => (
                <React.Fragment key={topic.id}>
                  {topic.module && topic.module !== category.subtopics[topicIndex - 1]?.module && (
                    <li className="pt-3 first:pt-0 text-xs font-bold uppercase tracking-[0.12em] text-indigo-500">
                      {topic.module}
                    </li>
                  )}
                  <li>
                    <Link 
                      to={`/learn/${topic.id}`}
                      className="flex items-start gap-3 group"
                    >
                      <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors mt-0.5 shrink-0" />
                      <span className="text-lg text-slate-700 font-medium group-hover:text-indigo-600 transition-colors">
                        {topic.title}
                      </span>
                    </Link>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
