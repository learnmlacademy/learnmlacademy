import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, Code2, ShieldCheck } from 'lucide-react';
import { CodeBlock } from '../components/content/CodeBlock';
import { ResearchAgentFlow, ResearchLexicalNumerical, ResearchSourceTrustDiagram } from '../components/projects/ResearchAgentConceptVisuals';
import { aiResearchSourceCode } from '../data/aiResearchSourceCode';

type StepProps = { number: number; title: string; why: string; check: string; children: React.ReactNode };
function Step({ number, title, why, check, children }: StepProps) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-sm font-black text-white">{number}</span>
      <h2 className="pt-1 text-xl font-extrabold leading-snug text-slate-950 sm:text-2xl">{title}</h2>
    </div>
    <p className="mt-3 text-sm leading-7 text-slate-700"><strong>Why this matters:</strong> {why}</p>
    <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">{children}</div>
    <p className="mt-5 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span><strong>Check the output:</strong> {check}</span>
    </p>
  </section>;
}

const base = '/project-handbooks/ai-research-assistant/';
const structure = [
  'projects/ai-research-assistant/',
  '  requirements.txt',
  '  .gitignore',
  '  src/',
  '    __init__.py',
  '    research.py',
  '  tests/',
  '    test_research.py',
  '  scripts/',
  '    capture_screenshots.py',
  '  demo.py',
  '  app.py',
].join('\n');
const allFiles: Array<[string, string]> = [
  ['projects/ai-research-assistant/requirements.txt', 'text'],
  ['projects/ai-research-assistant/.gitignore', 'text'],
  ['projects/ai-research-assistant/src/__init__.py', 'python'],
  ['projects/ai-research-assistant/src/research.py', 'python'],
  ['projects/ai-research-assistant/demo.py', 'python'],
  ['projects/ai-research-assistant/app.py', 'python'],
  ['projects/ai-research-assistant/tests/test_research.py', 'python'],
  ['projects/ai-research-assistant/scripts/capture_screenshots.py', 'python'],
  ['.github/workflows/ai-research-assistant-verify.yml', 'yaml'],
];

export function AIResearchAssistantProjectPage() {
  useEffect(() => {
    document.title = 'AI Research Assistant Project — Agent Tools and Citations | LearnMLAcademy';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Build a Perplexity-style educational research assistant from scratch using a bounded agent, source reading, exact citations, tests and Streamlit.');
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = 'https://www.learnmlacademy.com/projects/ai-research-assistant';
  }, []);

  return <div className="min-h-screen bg-slate-50">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
          <ArrowLeft className="h-4 w-4" /> View all 12 projects
        </Link>
        <p className="mt-6 text-xs font-black uppercase tracking-widest text-cyan-300">Project 11 · Agentic AI · Verified hands-on handbook</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
          Build Your Own Perplexity-Style AI Research Assistant
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
          Your city council asks: <strong>“Do urban trees cool cities, and what limits their benefits?”</strong>
          A confident answer is not enough. Build a research agent that searches sources, reads them,
          keeps checkable notes, identifies evidence gaps and writes a cited research brief.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#start" className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-slate-950">Start with step 1</a>
          <a href="#complete-code" className="rounded-xl border border-slate-500 px-5 py-3 text-sm font-extrabold text-white">Copy all the code</a>
        </div>
      </div>
    </header>

    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
        <h2 className="text-xl font-extrabold text-slate-950">The problem we will solve during this lesson</h2>
        <p className="mt-3 text-sm leading-7 text-slate-800">
          Imagine a city wants to reduce summer heat. Should it fund street trees?
          A search result may look convincing, but we need a method that does not invent citations.
          Our assistant must plan the question, find candidate sources, read their actual text,
          quote relevant passages, check the cited source and explicitly state what is still uncertain.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-800">
          The first demo uses <strong>three original classroom notes</strong>, not published scientific
          studies. This makes the agent reproducible and teaches the mechanics. Afterwards, you
          can select live Wikipedia reading to investigate a public question. That is an
          introductory source search, <strong>not a comprehensive review of the web or scientific literature</strong>.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950"><FileText className="h-5 w-5 text-indigo-600" /> What the student builds</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            A working Streamlit research application with two source modes, a bounded six-stage agent,
            original source quotes, citation verification, a full tool trace, a Markdown research brief
            and a downloadable JSON evidence log.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">The default mode works without accounts or API keys. The live mode reads Wikipedia article text; optional OpenAI synthesis needs your own API key, explicit consent and manual claim review.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950"><Code2 className="h-5 w-5 text-indigo-600" /> Exactly which tools you will use</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Python 3.12, VS Code, terminal, venv, Python dataclasses, Requests, Wikipedia MediaWiki API,
            Streamlit, pytest, mocking, Playwright, Git, GitHub, GitHub Actions and an optional OpenAI API client.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            The first agent uses <strong>deterministic tool orchestration and lexical matching</strong>;
            it does not pretend to be an unrestricted AI browser or an LLM choosing arbitrary tools.
          </p>
        </div>
      </section>

      <ResearchAgentFlow />
      <section className="grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img className="w-full border-b object-contain" src={base + 'research-desktop-question.png'}
               alt="Real research assistant Streamlit page with question and source controls" loading="eager" />
          <figcaption className="p-4 text-sm leading-6 text-slate-700">First, ask a real research question and choose the evidence source.</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img className="w-full border-b object-contain" src={base + 'research-desktop-result.png'}
               alt="Real completed research assistant Streamlit result with tool tabs and verified quotes" loading="eager" />
          <figcaption className="p-4 text-sm leading-6 text-slate-700">Then inspect the completed source-backed research brief and tool trace.</figcaption>
        </figure>
      </section>

      <section id="start" className="scroll-mt-24 space-y-5">
        <Step number={1} title="Prepare VS Code and create the project folders"
              why="Students need to know the exact files to create and where commands will run."
              check="The Explorer shows app.py, demo.py, src/research.py, requirements.txt and tests/test_research.py.">
          <p>Install Python 3.12 and VS Code. In VS Code choose <strong>File → Open Folder</strong> and open the <strong>ai-research-assistant</strong> project folder. Choose <strong>Terminal → New Terminal</strong>. Download the full source folder from GitHub or create these paths and copy the files provided at the bottom of this handbook.</p>
          <CodeBlock title="Create this folder layout" language="text" code={structure} type="config" />
        </Step>
        <Step number={2} title="Install the Python libraries in a virtual environment"
              why="An isolated environment makes the exact versions reproducible on another laptop."
              check="Python packages install without dependency errors and the terminal shows an active environment.">
          <CodeBlock title="Windows" language="powershell" type="runnable"
            code={'py -3.12 -m venv .venv\n.venv\\Scripts\\activate\npython -m pip install -r requirements.txt'} />
          <CodeBlock title="macOS or Linux" language="bash" type="runnable"
            code={'python3.12 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt'} />
          <p>Requests makes bounded API calls, Streamlit builds the interface, pytest runs offline tests and Playwright captures genuine browser evidence.</p>
        </Step>
        <Step number={3} title="Study the question, then plan the research"
              why="A plan prevents the agent from mixing searching, evidence review and report writing into an uncheckable single step."
              check="The plan contains finding source IDs, reading real text, checking quotations and reporting limitations.">
          <p>Open <code>src/research.py</code>. The agent first validates a sensible question of at most 250 characters, then creates a bounded plan. <strong>Each subsequent state is explicit</strong>; the model cannot quietly jump to a new external tool.</p>
          <CodeBlock language="python" title="The agent's explicitly recorded state transitions" type="conceptual"
            code={'state.step = "search"\n# search candidates ...\nstate.step = "read"\n# retrieve actual source text ...\nstate.step = "take_notes"\n# copy relevant sentences ...\nstate.step = "verify"\n# confirm exact quote and source ID ...\nstate.step = "report"'} />
        </Step>
        <Step number={4} title="Search for source candidates, not invented answers"
              why="A search snippet or URL is not enough to know what a source actually says."
              check="Offline mode returns the three labelled classroom candidates. Live mode obtains bounded Wikipedia page IDs.">
          <p>Find <code>search_sources()</code>. It provides two modes: an original offline source pack and an optional Wikipedia search. Live mode calls only a fixed <code>en.wikipedia.org</code> API endpoint and asks for up to four results. Users cannot make it fetch arbitrary network addresses.</p>
          <p>We distinguish <em>finding</em> a result from <em>reading</em> it. The search stage records candidate IDs, not citation-ready evidence.</p>
        </Step>
        <Step number={5} title="Read the source and assign traceable IDs"
              why="Only text actually returned by an approved source should be eligible for quotation."
              check="The source record contains a title, ID, origin, text and an original URL when live.">
          <p>In <code>read_source()</code>, offline notes are loaded as original teaching fixtures. Wikipedia candidates are read by the MediaWiki API using numeric page IDs. The app preserves the article URL, rejects invalid IDs and handles unavailable pages without fabricating excerpts.</p>
          <CodeBlock language="text" title="What one source record looks like" type="output"
            code={'source_id: DEMO-1\ntitle: Classroom note A — shade and evaporation\norigin: original classroom fixture\nurl: classroom:note-A\ntext: [the actual copied lesson sentence]'} />
        </Step>
        <Step number={6} title="Take notes using relevant exact source sentences"
              why="Students can inspect a sentence copied from a source, unlike opaque generated prose."
              check="Every note has the original source ID, a quotation, overlapping terms and a reproducible lexical score.">
          <p>Find <code>take_notes()</code>. It splits source excerpts into sentences and counts the shared meaningful words with the question. This is transparent <strong>lexical scoring</strong>, not an embedding model or fact checker. If a synonym has different spelling, it may be missed.</p>
          <ResearchLexicalNumerical />
        </Step>
        <Step number={7} title="Verify quotations before writing the answer"
              why="A fabricated source reference makes a research report impossible to check."
              check="A correct quote survives; a mismatched ID or a made-up quotation is rejected by tests.">
          <p>The <code>verify_notes()</code> tool checks exact passage membership and source ID provenance. The report only includes notes that pass. Our tests intentionally supply fake quotes and invented IDs to confirm the app excludes them.</p>
          <ResearchSourceTrustDiagram />
        </Step>
        <Step number={8} title="Build a cautious cited brief and visible tool trace"
              why="A useful research assistant must explain both what the sources say and what remains unknown."
              check="The report lists source-ID quotation blocks and limits; the trace shows PLAN, SEARCH, READ, VERIFY and REPORT.">
          <CodeBlock title="Run the complete offline state machine" language="bash" type="runnable"
            code={'python demo.py'} />
          <p>Read the output. It is deliberately an <strong>evidence brief</strong>, not a claim that a fictional classroom note proves science. An audit trace records the stages and source counts, and a JSON export keeps the source text and associated notes for review.</p>
        </Step>
        <Step number={9} title="Run the tests, then launch the real Streamlit app"
              why="A trustworthy workflow needs repeatable validation before calling its outputs reliable."
              check="pytest passes and Streamlit opens at the localhost address printed in the terminal.">
          <CodeBlock title="Run engineering tests and launch the app" language="bash" type="runnable"
            code={'python -m pytest -q\npython -m streamlit run app.py'} />
          <p>Click <strong>Run research</strong>, open the Research Plan, Cited Research Brief, Original Evidence and Agent Trace tabs. Try the Markdown and JSON download buttons. Compare every quotation with the displayed original note.</p>
        </Step>
        <Step number={10} title="Try live public research and evaluate its limits"
              why="A classroom exercise must explain what changes when retrieval reads external content."
              check="Live sources have real Wikipedia URLs; failed requests return an explicit error rather than a fake answer.">
          <p>Select <strong>Wikipedia articles (live)</strong> and enter a public research question. This mode makes network requests; do not use confidential topics. Because the source is Wikipedia, verify important claims against original research. The app is intentionally <em>not</em> a general-purpose search engine and does not claim to browse every website.</p>
          <p><strong>Optional AI writing:</strong> open the Cited Research Brief tab, check the explicit sharing consent, and choose Generate optional AI synthesis. Configure OPENAI_API_KEY in your local environment before starting the app. The selected excerpts and question are sent to OpenAI, may incur charges, and every generated claim still needs a human check. Invalid or missing source markers are rejected rather than shown as verified research.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <img src={base + 'research-mobile-question.png'} className="mx-auto w-full max-w-xs rounded-xl border bg-white" alt="Actual Streamlit research assistant mobile question form" loading="lazy" />
            <img src={base + 'research-mobile-result.png'} className="mx-auto w-full max-w-xs rounded-xl border bg-white" alt="Actual Streamlit research assistant mobile research result" loading="lazy" />
          </div>
        </Step>
      </section>

      <section id="complete-code" className="scroll-mt-24 rounded-2xl border border-indigo-200 bg-white p-5 sm:p-7">
        <h2 className="text-2xl font-black text-slate-950">Complete working source code — copy all files</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">The code blocks below are generated directly from the <strong>actual repository files</strong>. They are not shortened pseudocode. Open the indicated file path in VS Code, click Copy, paste and save. You can also find the complete repository at <a href="https://github.com/learnmlacademy/learnmlacademy/tree/main/projects/ai-research-assistant" className="font-bold text-indigo-700 underline">GitHub</a> after this project is merged.</p>
        <div className="mt-6 space-y-7">{allFiles.map(([path, language]) => <section key={path}>
          <h3 className="break-all text-base font-extrabold text-slate-950">{path}</h3>
          <CodeBlock code={aiResearchSourceCode[path]} language={language} title={path} type={language === 'text' || language === 'yaml' ? 'config' : 'runnable'} />
        </section>)}</div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-xl font-extrabold">Troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
            <li><strong>Wikipedia unavailable:</strong> use offline mode and verify network access separately.</li>
            <li><strong>No note for a question:</strong> sources may be irrelevant or share too few words; never manufacture evidence.</li>
            <li><strong>No Python package:</strong> activate the environment and rerun pip install.</li>
            <li><strong>Missing source URL:</strong> original classroom fixtures are intentionally not external publications.</li>
            <li><strong>Looks confident but vague:</strong> inspect each original quotation before accepting any research claim.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-extrabold">How to improve the agent later</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
            <li>Add a reviewed web-search service and primary-paper retrieval.</li>
            <li>Introduce an optional LLM planner with a strict schema and bounded tool permissions.</li>
            <li>Try semantic embeddings and multiple search query reformulations.</li>
            <li>Score source authority, dates, evidence conflicts and claim support.</li>
            <li>Benchmark source precision, reliability, search latency and cost.</li>
          </ul>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="flex items-center gap-2 text-xl font-extrabold"><ShieldCheck className="h-5 w-5 text-emerald-700" /> Practice and interview questions</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
          <li>Why must a research agent read the source rather than quote a search snippet?</li>
          <li>What makes our finite-state tool execution controllable?</li>
          <li>Count word overlap for two question–sentence pairs using set intersection.</li>
          <li>Explain why a valid quotation can still be false or misleading.</li>
          <li>How do you defend against text in a source that tells the agent to ignore its rules?</li>
          <li>How would you add an LLM, trusted paper search and claim-checking tests without losing auditability?</li>
        </ol>
      </section>
      <Link to="/projects" className="inline-flex items-center gap-2 font-bold text-indigo-700 hover:underline"><ArrowLeft className="h-4 w-4" /> Back to all projects</Link>
    </main>
  </div>;
}
