import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {ArrowLeft, CheckCircle2, Code2, FileText, ShieldCheck} from "lucide-react";
import {CodeBlock} from "../components/content/CodeBlock";
import {ContentStudioWorkflow, StudioQualityRubric, StructuredOutputVisual} from "../components/projects/AIContentStudioVisuals";
import {aiContentStudioSourceCode} from "../data/aiContentStudioSourceCode";

type StepProps = {number:number;title:string;why:string;check:string;children:React.ReactNode};
function Step({number,title,why,check,children}:StepProps) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-700 font-bold text-white">{number}</span>
      <h2 className="pt-1 text-xl font-extrabold text-slate-950 sm:text-2xl">{title}</h2>
    </div>
    <p className="mt-3 text-sm leading-7 text-slate-700"><strong>Why we do this:</strong> {why}</p>
    <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">{children}</div>
    <p className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"/>
      <span><strong>Check your result:</strong> {check}</span>
    </p>
  </section>;
}
const base="/project-handbooks/ai-content-creator/";
const files:Array<[string,string]>=[
  ["projects/ai-content-studio/.gitignore","text"],
  ["projects/ai-content-studio/requirements.txt","text"],
  ["projects/ai-content-studio/src/__init__.py","python"],
  ["projects/ai-content-studio/src/studio.py","python"],
  ["projects/ai-content-studio/demo.py","python"],
  ["projects/ai-content-studio/app.py","python"],
  ["projects/ai-content-studio/tests/test_studio.py","python"],
  ["projects/ai-content-studio/scripts/capture_screenshots.py","python"],
  ["scripts/verify-ai-content-source.mjs","javascript"],
  [".github/workflows/ai-content-studio-verify.yml","yaml"],
];

export function AIContentCreatorProjectPage(){
  useEffect(()=>{
    document.title="Build Your Own ChatGPT-Style AI Content Creator | LearnMLAcademy";
    const description="Build a real AI Content Studio with Python, Streamlit, Pydantic, structured JSON, optional OpenAI generation, rewrite, summarize, tests and copyable code.";
    const meta=document.querySelector('meta[name="description"]');
    if(meta)meta.setAttribute("content",description);
    let canonical=document.querySelector('link[rel="canonical"]') as HTMLLinkElement|null;
    if(!canonical){canonical=document.createElement("link");canonical.rel="canonical";document.head.appendChild(canonical);}
    canonical.href="https://www.learnmlacademy.com/projects/ai-content-creator";
  },[]);
  return <div className="min-h-screen bg-slate-50">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300"><ArrowLeft className="h-4 w-4"/> All projects</Link>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-widest text-cyan-300">Project 9 · Generative AI · Complete hands-on handbook</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">Build Your Own ChatGPT-Style AI Content Creator</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">A small bookshop is launching a reading club for college students. It needs a social announcement, an email campaign, and a clear description — without inventing dates, prices or discounts. Build an AI writing studio that uses the same approved business facts to create, revise and export all three.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#start" className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-slate-950">Build step by step</a>
          <a href="#all-code" className="rounded-xl border border-slate-500 px-5 py-3 text-sm font-extrabold text-white">View complete copyable code</a>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
        <h2 className="text-xl font-extrabold text-slate-950">Our practical challenge: publish one campaign across three channels</h2>
        <p className="mt-3 text-sm leading-7 text-slate-800">Sunrise Books starts a campus reading club. The shop wants to reach university students but has only one verified factual brief. We need a friendly social post, an email announcement and a product-style description, each with an appropriate tone and a call to action.</p>
        <p className="mt-3 text-sm leading-7 text-slate-800"><strong>Success:</strong> capture the facts once → choose format/tone → get a validated draft → inspect a review checklist → rewrite or summarize → export Markdown and JSON. The AI must not be credited with independently verifying any campaign claim.</p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950"><FileText className="h-5 w-5 text-indigo-700"/> What the student builds</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">A browser-based Streamlit Content Studio with a brief form, three writing formats, three tones, Create/Rewrite/Summarize operations, a session draft history, Pydantic output validation and Markdown/JSON downloads.</p>
          <p className="mt-3 text-sm leading-7 text-slate-700">Template mode is clearly labelled <strong>not AI</strong> and works without an account. Optional OpenAI mode actually generates fresh text using a model, requires consent and a local API key, and may incur charges.</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-950"><Code2 className="h-5 w-5 text-indigo-700"/> Exact tools</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">Python 3.12, VS Code, terminal, virtual environment, Streamlit, Pydantic v2, JSON, optional OpenAI API, pytest, Mock, Playwright, Git and GitHub Actions.</p>
          <p className="mt-3 text-sm leading-7 text-slate-700"><strong>Concepts:</strong> prompting vs fine-tuning, structured output, temperature, content validation, prompt injection limits, human evaluation, privacy and export.</p>
        </div>
      </section>
      <ContentStudioWorkflow/>
      <section className="grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border bg-white">
          <img src={base+"content-studio-desktop-form.png"} alt="Actual Content Studio app before generating draft" className="w-full border-b object-contain" loading="eager"/>
          <figcaption className="p-4 text-sm leading-6 text-slate-700"><strong>Fill the form.</strong> Select format, tone and the real facts about the reading club.</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border bg-white">
          <img src={base+"content-studio-desktop-result.png"} alt="Actual offline template result in the working Content Studio app" className="w-full border-b object-contain" loading="eager"/>
          <figcaption className="p-4 text-sm leading-6 text-slate-700"><strong>Inspect the result.</strong> The screenshot honestly shows a template demo, not a fabricated AI generation.</figcaption>
        </figure>
      </section>
      <div id="start" className="scroll-mt-24 space-y-5">
        <Step number={1} title="Create the workspace in VS Code" why="The hardest beginner error is running code from the wrong folder." check="Your VS Code Explorer contains app.py, demo.py, requirements.txt, src/studio.py and the tests folder.">
          <p>Install Python 3.12 and VS Code. From GitHub, open the <code>projects/ai-content-studio</code> folder or create that folder yourself. In VS Code choose <strong>File → Open Folder → ai-content-studio</strong>, then choose <strong>Terminal → New Terminal</strong>.</p>
          <CodeBlock title="Directory layout to create" language="text" type="config" code={"projects/ai-content-studio/\n  app.py\n  demo.py\n  requirements.txt\n  .gitignore\n  src/\n    __init__.py\n    studio.py\n  tests/\n    test_studio.py\n  scripts/\n    capture_screenshots.py"}/>
        </Step>
        <Step number={2} title="Create the environment and install libraries" why="Pinning library versions gives another student the same repeatable setup." check="The virtual environment is active and pip completes without errors.">
          <p>Choose the commands for your operating system; run them in the opened project directory.</p>
          <CodeBlock title="Windows terminal" language="powershell" type="runnable" code={"py -3.12 -m venv .venv\n.venv\\Scripts\\activate\npython -m pip install -r requirements.txt"}/>
          <CodeBlock title="macOS or Linux" language="bash" type="runnable" code={"python3.12 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt"}/>
          <p>Streamlit creates the UI, Pydantic validates objects, the OpenAI client makes optional real requests, pytest tests behavior and Playwright captures actual browser screenshots.</p>
        </Step>
        <Step number={3} title="Define what the writing assistant is allowed to receive" why="Structured inputs reduce guesswork and make output checks possible." check="The request object rejects unsupported operations, empty briefs and missing rewrite drafts.">
          <p>Open <code>src/studio.py</code>. <code>ContentRequest</code> describes the brand, audience, brief, operation, format, tone, CTA and word limit. It has strict minimum/maximum lengths and rejects API-key-like text in the brief.</p>
          <CodeBlock title="Example validated inputs" language="json" type="conceptual" code={'{"brand":"Sunrise Books","audience":"Local university students","kind":"Social post","operation":"Create","tone":"Friendly","max_words":100}'}/>
          <p>The class also checks that Rewrite or Summarize has an actual draft to work on. Creating, rewriting and summarizing are different instructions; the app makes the operation explicit.</p>
        </Step>
        <Step number={4} title="Build the prompt using approved business facts" why="A useful prompt specifies the task and output format without granting uploaded text control over the application." check="The model receives a fixed system policy and the campaign fields as quoted JSON-like data in a separate user message.">
          <p>The <code>build_messages()</code> function tells the model to return only named JSON fields, avoid inventing prices, discounts and dates, and treat pasted text as data. This is prompt engineering, not retraining a language model or guaranteed prompt-injection prevention.</p>
          <CodeBlock title="Prompt assembly pattern" language="python" type="conceptual" code={'messages = [\n  {"role": "system", "content": fixed_format_and_safety_rules},\n  {"role": "user", "content": validated_campaign_fields_as_json},\n]'}/>
        </Step>
        <Step number={5} title="Start safely with the offline template preview" why="Students can debug the complete app, validation and exports before spending credits on AI." check="The terminal prints SOURCE MODE: Template demo and a JSON record with human_fact_checked set to false.">
          <CodeBlock title="Exercise the format and validation without an API" language="bash" type="runnable" code={"python demo.py"}/>
          <p>This mode rearranges your own text using fixed rules; it does <strong>not</strong> generate original prose using a language model. It is a functioning UI test and teaching fixture, not a simulated AI response.</p>
        </Step>
        <Step number={6} title="Call a real model and parse structured JSON" why="To become an actual GenAI application, the studio must call a model and reject malformed responses." check="In real model mode, source_mode is OpenAI API and all required fields pass the Pydantic schema.">
          <StructuredOutputVisual/>
          <p>The <code>generate_with_openai()</code> function requests JSON output, converts it to <code>ContentResult</code> and rejects unknown fields, wrong tone or content exceeding the word limit. It does not silently convert an invalid API response into a fake success.</p>
          <p><strong>Key and consent:</strong> set <code>OPENAI_API_KEY</code> in your local terminal environment, not in your Python files. Select OpenAI API in the sidebar, read the notice and check the consent box. The provider receives the brief and any previous draft and may charge for the request.</p>
        </Step>
        <Step number={7} title="Review what the application can and cannot test" why="Passing a computer-checked word limit is not the same as being factually correct." check="The app displays checks for word count, selected tone, target audience, required phrase and CTA.">
          <p><code>review_content()</code> checks properties that are programmatically inspectable. It does not know whether a discount is real, an image is licensed or a statistic is supported. A human reviewer must check every factual statement before publishing.</p>
          <StudioQualityRubric/>
        </Step>
        <Step number={8} title="Run the tests and launch your content studio" why="Model output is variable, so deterministic mocked API tests catch formatting failures without consuming credits." check="The tests pass, Streamlit opens locally and the offline form creates a visible result.">
          <CodeBlock title="Run tests, then start the Streamlit UI" language="bash" type="runnable" code={"python -m pytest -q\npython -m streamlit run app.py"}/>
          <p>Open the local URL printed by Streamlit (usually <code>http://localhost:8501</code>). Leave the sample brief in place. Choose Create → Social post → Friendly → Template demo, then click <strong>Create content</strong>. Check the source-mode label and automatic quality checklist.</p>
        </Step>
        <Step number={9} title="Try three formats, rewrite, summarize, and export" why="The value of the studio is reusing a brief and keeping editorial control over every draft." check="You can create a draft, edit an existing one, inspect up to 10 session drafts and download Markdown/JSON.">
          <p>Switch formats to Email campaign and Product description. To improve an existing draft, choose Rewrite and paste at least 15 characters into Existing text; Summarize shortens the supplied draft. Draft history lasts only for the current Streamlit session, not in a shared production database.</p>
          <p>Download the Markdown and structured JSON exports. Confirm the JSON includes <code>human_fact_checked: false</code>. If you use real AI, compare output against the original fact brief and correct anything that cannot be verified.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <img className="mx-auto w-full max-w-xs rounded-xl border bg-white" src={base+"content-studio-mobile-form.png"} alt="Real Content Studio application form on a mobile screen" loading="lazy"/>
            <img className="mx-auto w-full max-w-xs rounded-xl border bg-white" src={base+"content-studio-mobile-result.png"} alt="Real Content Studio template preview and checks on a mobile screen" loading="lazy"/>
          </div>
        </Step>
        <Step number={10} title="Build a publishing checklist and know the limits" why="Safe content needs facts, permissions and final human judgment beyond any automatically validated schema." check="You can explain which checks are automated and which remain human responsibilities.">
          <p>Verify actual dates, prices, offers, rights to use names and images, accessibility, brand voice and what any customer-facing claim promises. If the API returns invalid JSON, missing fields or too many words, the app reports an error; it will not label a template as the AI's answer.</p>
          <p><strong>Future improvements:</strong> feedback scoring over many real drafts, saved revision history in a database, approval workflow, multiple provider support, versioned prompts and evaluation using a labelled test set. None of these features is claimed to be present in the current student project.</p>
        </Step>
      </div>
      <section id="all-code" className="scroll-mt-24 rounded-2xl border border-indigo-200 bg-white p-5 sm:p-7">
        <h2 className="text-2xl font-black text-slate-950">All the real source code — copy and build it yourself</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">These are the actual executable files, not truncated code samples. Every block is copyable. Save each block at the indicated path in VS Code. GitHub CI also checks that what students see here matches the tested files character-for-character.</p>
        <div className="mt-6 space-y-7">{files.map(([path,language])=><section key={path}>
          <h3 className="break-all text-base font-extrabold text-slate-950">{path}</h3>
          <CodeBlock code={aiContentStudioSourceCode[path]} language={language} title={path} type={language==="text"||language==="yaml"?"config":"runnable"}/>
        </section>)}</div>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-xl font-extrabold">Troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
            <li><strong>Python package missing:</strong> activate your venv and reinstall requirements.</li>
            <li><strong>API key unavailable:</strong> offline template mode works without it; use a key only in your local environment.</li>
            <li><strong>Response not valid JSON:</strong> the model output was rejected; review prompt and try again rather than claiming success.</li>
            <li><strong>Rewrite complains about draft:</strong> paste existing text before running Rewrite/Summarize.</li>
            <li><strong>Claims seem fabricated:</strong> check every price, date, performance promise and permission manually.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-extrabold">Interview and mastery questions</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7">
            <li>How does prompting differ from fine-tuning?</li>
            <li>Why use Pydantic even after requesting JSON?</li>
            <li>How does the sample 4.1/5 weighted rubric work?</li>
            <li>Why does format validation not prove claim truth?</li>
            <li>Why store secrets outside source code?</li>
            <li>How would you evaluate multiple prompts fairly?</li>
          </ol>
        </div>
      </section>
      <p className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-950"><ShieldCheck className="mt-1 h-5 w-5 shrink-0"/><span><strong>Completion:</strong> students can run the actual app, create a template demo, call a real model if they opt in, reject invalid structured output, rewrite a draft, export both formats and explain where human review is indispensable.</span></p>
      <Link to="/projects" className="inline-flex items-center gap-2 font-bold text-indigo-700 hover:underline"><ArrowLeft className="h-4 w-4"/> Back to all projects</Link>
    </main>
  </div>;
}
