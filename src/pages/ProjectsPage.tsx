import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  Construction,
  Download,
  Hammer,
  Layers3,
  Wrench,
} from 'lucide-react';
import { projectPortfolio } from '../data/projectPortfolio';

export function ProjectsPage() {
  useEffect(() => {
    document.title = 'Hands-On ML & AI Project Handbooks | LearnMLAcademy';
    const description =
      'Build recognizable Machine Learning, Deep Learning, Generative AI, RAG, Agentic AI and MLOps projects with exact tools, step-by-step instructions and working outputs.';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.learnmlacademy.com/projects';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-black tracking-wide text-indigo-200">
              <Hammer className="h-4 w-4" aria-hidden="true" />
              HANDS-ON PROJECT HANDBOOKS
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Build projects you have actually heard of
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              These are not short demo notebooks. Each handbook is designed to take you from an empty folder to a working application with exact tools, commands, files, checks, troubleshooting and a final result you can show.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ['12', 'recognizable projects'],
                ['Step by step', 'open → click → run → check'],
                ['Real tools', 'clearly listed before you start'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                  <div className="text-xl font-black text-cyan-300">{value}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <strong>Project naming note:</strong> familiar product names such as Netflix, ChatGPT, Amazon or Perplexity are used only to make the learning goal immediately recognizable. LearnMLAcademy is not affiliated with those companies.
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projectPortfolio.map((project, index) => (
            <article key={project.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-br from-white to-indigo-50/50 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-black text-white">
                    PROJECT {index + 1}
                  </span>
                  <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[11px] font-bold text-indigo-800">
                    {project.level}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                    <Clock3 className="h-3 w-3" aria-hidden="true" />
                    {project.buildTime}
                  </span>
                  {project.status === 'ready' ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-black text-emerald-800">
                      HANDBOOK V1 READY
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-black text-amber-900">
                      BUILDING NEXT
                    </span>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-black leading-snug text-slate-950 sm:text-2xl">{project.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                    <Construction className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    What the student builds
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{project.build}</p>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                    <Wrench className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    Tools You Will Use
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                    <Layers3 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                    {project.topics ? 'Topics Covered' : 'Chapters covered'}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{(project.topics ?? project.chapters).join(' · ')}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.status === 'ready' ? (
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-black text-white transition hover:bg-indigo-700"
                    >
                      Start the handbook
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <div className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-500">
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      Full handbook will follow the Titanic template
                    </div>
                  )}
                  {project.status === 'ready' && (
                    <a href={`/project-starters/${project.id}.zip`} download={`${project.id}-starter.zip`}
                       className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-bold text-indigo-900 hover:bg-indigo-100">
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download source ZIP
                    </a>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">Starter ZIP contains real source and tests, not models or data. Open its START_HERE.txt first.</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-black text-emerald-950">The handbook standard</h2>
              <p className="mt-1 text-sm leading-6 text-emerald-900">
                Every finished project will include environment setup, exact folder structure, commands to run, complete code, expected outputs, checkpoints, common errors, final application, deployment guidance, interview questions and real screenshots captured from the actual tools used.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
