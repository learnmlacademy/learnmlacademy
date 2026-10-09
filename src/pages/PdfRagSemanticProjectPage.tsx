import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, Code2, ShieldCheck } from "lucide-react";
import { CodeBlock } from "../components/content/CodeBlock";
import { RagTwoPathDiagram, RagCitationGateVisual } from "../components/projects/PdfRagConceptVisuals";
import { semanticRagCoreA } from "../data/pdfRagSemanticCoreA";
import { semanticRagCoreB } from "../data/pdfRagSemanticCoreB";
import { semanticRagScripts } from "../data/pdfRagSemanticScripts";
import { semanticRagTestsA } from "../data/pdfRagSemanticTestsA";
import { semanticRagTestsB } from "../data/pdfRagSemanticTestsB";

const allFiles: Record<string, string> = {
  ...semanticRagCoreA,
  ...semanticRagCoreB,
  ...semanticRagScripts,
  ...semanticRagTestsA,
  ...semanticRagTestsB,
};
const groups = [
  {id: "complete-core", name: "1 · Complete app, embeddings and retrieval code", paths: Object.keys({...semanticRagCoreA, ...semanticRagCoreB})},
  {id: "complete-scripts", name: "2 · Complete reproducibility and browser scripts", paths: Object.keys(semanticRagScripts)},
  {id: "complete-tests", name: "3 · All tests and the verified engineering CI workflow", paths: Object.keys({...semanticRagTestsA, ...semanticRagTestsB})},
];
const imgBase = "/project-handbooks/pdf-rag-semantic/";
const repoUrl = "https://github.com/learnmlacademy/learnmlacademy/tree/main/projects/pdf-rag-assistant";
const syntaxFor = (path: string) => path.endsWith(".py") ? "python" : path.endsWith(".yml") ? "yaml" : path.endsWith(".toml") ? "toml" : "text";

type StepProps = {number: number; title: string; why: string; verify: string; children: React.ReactNode};
function Step({number, title, why, verify, children}: StepProps) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <h2 className="flex items-start gap-3 text-xl font-extrabold text-slate-950 sm:text-2xl">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-sm text-white">{number}</span>
      <span className="pt-1">{title}</span>
    </h2>
    <p className="mt-3 text-sm leading-7 text-slate-700"><strong>Why:</strong> {why}</p>
    <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">{children}</div>
    <p className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span><strong>Check:</strong> {verify}</span>
    </p>
  </section>;
}

export function PdfRagSemanticProjectPage() {
  useEffect(() => {
    document.title = "Build a Semantic PDF RAG Assistant — Complete Advanced Handbook | LearnMLAcademy";
    const description = "Build semantic PDF search with local MiniLM ONNX embeddings, token chunking, cosine similarity, reranking, citations, a working Streamlit app and 53 engineering tests.";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical);
    }
    canonical.href = "https://www.learnmlacademy.com/projects/pdf-rag/semantic";
  }, []);

  return <div className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Link to="/projects/pdf-rag" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-100"><ArrowLeft className="h-4 w-4" /> Start with the beginner PDF RAG handbook</Link>
        <p className="mt-5 text-xs font-black uppercase tracking-widest text-cyan-200">Project 10 · Advanced semantic RAG build</p>
        <h1 className="mt-3 max-w-5xl text-3xl font-black tracking-tight sm:text-5xl">Chat With Your PDFs — Teach AI to Understand Questions, Not Just Match Words</h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-200">
          A customer types “Can I still return an item after a month?” but the policy says
          “The refund window is 30 days.” Keyword matching may miss paraphrases. Build a
          real local semantic search system that retrieves the policy, checks its source
          page, and refuses to invent an answer when evidence is missing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-slate-950" href="#start">Build it step by step</a>
          <a className="rounded-xl border border-slate-500 px-5 py-3 text-sm font-extrabold text-white" href="#complete-core">Copy complete code</a>
          <a className="rounded-xl border border-slate-500 px-5 py-3 text-sm font-extrabold text-white" href={repoUrl}>Source folder on GitHub</a>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
        <h2 className="text-xl font-extrabold text-slate-950">The challenge we will solve</h2>
        <p className="mt-3 text-sm leading-7 text-slate-800">Imagine a customer service team has a refunds and shipping policy PDF, plus a separate employee handbook. Answer six questions without mixing up documents or page numbers: the refund window, damaged goods, international return shipping, annual leave, remote work, and expense limits. The system must also <strong>abstain</strong> when asked an unrelated question.</p>
        <p className="mt-3 text-sm leading-7 text-slate-800">This tutorial generates two <strong>original synthetic PDFs</strong> (six pages total), builds a real 384-dimensional local index, tests all six expected source pages, and captures screenshots from a running Streamlit application. No confidential PDFs or paid API calls are required.</p>
        <p className="mt-3 text-sm font-semibold leading-7 text-amber-950">Two learning levels: the <Link to="/projects/pdf-rag" className="underline">beginner track</Link> teaches transparent TF-IDF retrieval; this advanced track uses token-aware MiniLM embeddings, two-stage ranking and stronger source verification. Both are preserved.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-extrabold text-slate-950">What the student builds</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">A working semantic PDF search assistant with real uploads, bounded page extraction, overlapping WordPiece chunks, local ONNX MiniLM embeddings, normalized cosine search, reranking, JSON/NumPy index persistence, validated exact quotations, a privacy-aware Streamlit UI and offline tests.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-extrabold text-slate-950">Actual tools and libraries</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700"><strong>Python 3.13</strong>, VS Code, venv, pypdf, Hugging Face model assets, WordPiece Tokenizers, ONNX Runtime (CPU), NumPy, Streamlit, HTTPX (optional provider), pytest, Playwright, GitHub Actions and Vite.</p>
          <p className="mt-2 text-xs leading-6 text-slate-600">The first installation downloads pinned local embedding-model assets. Afterward, PDF embeddings are computed locally.</p>
        </article>
      </section>

      <RagTwoPathDiagram />

      <section className="grid gap-4 md:grid-cols-3">
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={imgBase + "01-index-built.png"} alt="Real Streamlit PDF upload and index-build output for original example PDFs" className="w-full border-b object-contain" loading="eager" />
          <figcaption className="p-3 text-sm leading-6 text-slate-700">Real screenshot: uploading two PDFs and building a six-page index.</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={imgBase + "02-answer-citations-evidence.png"} alt="Real semantic RAG result with policy PDF citation, page, source ID and expanded evidence" className="w-full border-b object-contain" loading="eager" />
          <figcaption className="p-3 text-sm leading-6 text-slate-700">Real desktop result: answer, page and expanded retrieved evidence.</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={imgBase + "03-answer-mobile.png"} alt="Real mobile-sized semantic PDF RAG response with verified citations and evidence" className="w-full border-b object-contain" loading="eager" />
          <figcaption className="p-3 text-sm leading-6 text-slate-700">Real mobile result: source and retrieval scores stay visible.</figcaption>
        </figure>
      </section>

      <section id="start" className="scroll-mt-24 space-y-5">
        <Step number={1} title="Create your project and open it in VS Code" why="A complete project starts with the actual folder, not an unexplained code snippet." verify="VS Code shows app.py, requirements.txt, scripts/, src/, tests/ and the original README.">
          <p>Install Python 3.13 and VS Code. Download <a href={repoUrl} className="font-bold text-indigo-700 underline">projects/pdf-rag-assistant</a> or create it with the complete code from this page. In VS Code choose <strong>File → Open Folder</strong>, select <strong>pdf-rag-assistant</strong>, then <strong>Terminal → New Terminal</strong>.</p>
          <CodeBlock title="Main folders" language="text" type="config" code={"projects/pdf-rag-assistant/\n  app.py\n  requirements.txt\n  src/                   # extract, chunk, embed, search, rerank, answer\n  scripts/               # synthetic PDFs, indexing, queries, browser captures\n  tests/                 # 53 passing test cases\n  data/                   # local generated example PDFs, ignored by Git\n  indexes/                # local private indexes, ignored by Git"} />
        </Step>
        <Step number={2} title="Create a virtual environment and install the exact packages" why="Python dependencies and ONNX Runtime must agree before the model can run." verify="The environment activates, requirements install and pip check finishes without errors.">
          <CodeBlock title="Windows PowerShell" language="powershell" type="runnable" code={"py -3.13 -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install -r requirements.txt\npython -m pip check"} />
          <CodeBlock title="macOS or Linux" language="bash" type="runnable" code={"python3.13 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt\npython -m pip check"} />
          <p>The first model run fetches pinned tokenizer and ONNX assets from Hugging Face, validates their SHA-256 checksums and reuses them locally. This requires internet once; document text is not sent to the model provider for embedding.</p>
        </Step>
        <Step number={3} title="Generate real example PDFs and verify their pages" why="Known-answer original documents make retrieval and citations objectively testable." verify="The data/pdfs directory contains policy.pdf and employee_guide.pdf; each is three pages long.">
          <CodeBlock title="Create the synthetic document set" language="bash" type="runnable" code={"python -m scripts.create_test_pdfs"} />
          <p>Open both PDFs. Record which page contains each answer before building the vector index. This gives us a reliable expected result against which to test semantic retrieval.</p>
        </Step>
        <Step number={4} title="Extract PDF text and preserve page metadata" why="The generator must never invent the page where a supporting rule originated." verify="The parser retains file names, document fingerprints, page numbers and skipped-page markers.">
          <p>Read <code>src/pdf_loader.py</code> and <code>src/pdf_worker.py</code>. They validate PDF bytes, sanitize file names, extract text page by page with pypdf and record pages before chunking. Image-only scans require OCR and cannot be silently read.</p>
          <p>Parser work runs in a subprocess with a timeout. These defenses limit common errors but are not a hardened hostile-file sandbox.</p>
        </Step>
        <Step number={5} title="Split by WordPiece tokens, with a controlled overlap" why="A language model reads tokens, not always whole words. Token-bounded chunks prevent unexpected text truncation." verify="The default size is 160 tokens, overlap 32, giving an advance of 128 tokens per chunk. No chunk crosses a PDF page boundary.">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <p className="font-bold text-indigo-950">Worked example — calculate chunk positions</p>
            <p className="mt-2">Chunk 1: tokens 1–160. Chunk 2: tokens 129–288. Chunk 3: tokens 257–416, if that many tokens exist on the same page.</p>
            <p className="mt-2"><strong>Stride = 160 − 32 = 128.</strong> Duplicating 32 tokens preserves local context but consumes more index space. At the end of each page, stop and start a new page-bound chunk.</p>
          </div>
          <p>The application uses the model's real WordPiece token offsets. <code>src/chunker.py</code> contains the exact implementation; <code>test_chunking.py</code> checks boundaries and reproducibility.</p>
        </Step>
        <Step number={6} title="Turn each chunk into a 384-dimensional semantic embedding" why="Related sentences may use different words; a trained encoder maps contextual meaning into numerical vectors." verify="The embedding array has shape (number of chunks, 384) and each vector has L2 norm approximately 1.">
          <p>The pipeline uses the pinned <strong>all-MiniLM-L6-v2</strong> model through local ONNX Runtime. It performs attention-mask-aware mean pooling, then divides each vector by its Euclidean length. This is actual neural semantic embedding, unlike the beginner TF-IDF baseline.</p>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-bold">Count the numbers</p>
            <p className="mt-2">For 6 extracted chunks × 384 dimensions, the embedding matrix has <strong>2,304</strong> floating-point numbers. In float32, the raw numeric contents occupy approximately <strong>9,216 bytes (9 KiB)</strong>, excluding metadata.</p>
            <p className="mt-2">Vector normalization: <strong>v_normalized = v / √(v₁² + v₂² + … + v₃₈₄²)</strong>.</p>
          </div>
        </Step>
        <Step number={7} title="Build, save and inspect the vector index" why="A persistent index lets the learner ask several questions without re-extracting every PDF." verify="Index metadata, chunk text and NumPy vectors exist locally; loading the index reproduces the same citations.">
          <CodeBlock title="Build the real local semantic index" language="bash" type="runnable" code={"python -m scripts.build_index --pdf-dir data/pdfs --name demo"} />
          <p>The index uses JSON metadata/chunks and float32 NPY vectors, with shape and checksum checks and <code>allow_pickle=False</code>. The app never commits uploaded files or index contents. Checksums help detect accidental corruption; they are not malicious-file authentication.</p>
        </Step>
        <Step number={8} title="Search with cosine similarity and rerank the top passages" why="Semantic closeness and direct question-term coverage complement each other." verify="The top eight cosine candidates are reranked, with up to four shown to the student.">
          <p>Because vectors are normalized, their dot product equals cosine similarity. The second stage uses the documented score:</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
            <p className="font-bold">Rerank score = 0.75 × cosine + 0.25 × query-term coverage</p>
            <table className="mt-3 w-full border-collapse text-sm text-left">
              <thead><tr><th className="border bg-slate-100 p-3">Illustrative passage</th><th className="border bg-slate-100 p-3">Cosine</th><th className="border bg-slate-100 p-3">Coverage</th><th className="border bg-slate-100 p-3">Weighted score</th></tr></thead>
              <tbody>
                <tr><td className="border p-3">A</td><td className="border p-3">0.80</td><td className="border p-3">0.40</td><td className="border p-3">0.75×0.80 + 0.25×0.40 = <strong>0.700</strong></td></tr>
                <tr><td className="border p-3">B</td><td className="border p-3">0.70</td><td className="border p-3">0.90</td><td className="border p-3">0.75×0.70 + 0.25×0.90 = <strong>0.750</strong></td></tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm leading-6">Passage B ranks higher after reranking, despite lower raw cosine similarity. These numbers are <strong>teaching illustrations</strong>, not scores from the test documents.</p>
          </div>
          <p>Evidence eligibility also uses cosine and query-term coverage thresholds. These are heuristics, not proof that an answer is true or even present.</p>
        </Step>
        <Step number={9} title="Answer from evidence, validate the quotation and page" why="A convincing generated answer is not trustworthy if its cited words are absent from the retrieved PDF." verify="Every citation maps to an allowed source marker, actual file, page, chunk ID and exact quotation.">
          <RagCitationGateVisual />
          <p>Read <code>src/rag.py</code> and <code>src/llm.py</code>. Offline mode uses a deterministic passage selector; remote mode is optional, requires explicit consent, and selects quotations instead of free-form answers. The application rejects unknown source IDs and phrases not present in the approved retrieved chunks.</p>
          <p>This verifies quotation <em>provenance</em>, not real-world scientific truth or all semantic implications of a claim.</p>
        </Step>
        <Step number={10} title="Run all tests and reproduce six page-level answers" why="A completed project should be reproducible before asking students to trust a screenshot." verify="All engineering tests pass; six known questions rank their expected original PDF page first, and an unsupported question abstains.">
          <CodeBlock title="Run 53 engineering tests, real retrieval and a query" language="bash" type="runnable" code={"python -m pytest -q\npython -m scripts.engineering_evidence\npython -m scripts.query --name demo --question \"What is the refund window?\""} />
          <p>The verified examples cover refunds (policy p.1), damaged goods (p.2), international shipping (p.3), annual leave (employee guide p.1), remote work (p.2) and meal expenses (p.3). Their result pages are derived from the PDF parser, not inserted by the answer provider.</p>
        </Step>
        <Step number={11} title="Start Streamlit and ask your own question" why="Students must run the complete PDF upload, indexing and answering workflow themselves." verify="The app shows two uploaded files, a built index, a sourced answer and expandable ranked retrieval evidence.">
          <CodeBlock title="Launch the real semantic RAG app" language="bash" type="runnable" code={"python -m streamlit run app.py --server.address 127.0.0.1 --server.port 8501"} />
          <p>Open <code>http://127.0.0.1:8501</code>. Click <strong>Browse files</strong> and choose the two PDFs from <code>data/pdfs</code>. Click <strong>Build Index</strong>, ask “What is the refund window?”, click <strong>Ask</strong>, then expand <strong>Retrieved evidence</strong>. Inspect the score, document, page and chunk ID.</p>
          <p>Open another browser session to see its document collection is independent. Use <strong>Clear documents and index</strong> to reset the current one. The included Chromium screenshot test checks the real flow.</p>
        </Step>
        <Step number={12} title="Try the optional LLM and understand the tradeoffs" why="Calling a remote model changes privacy and cost; it must never be the only way the tutorial works." verify="Offline mode continues to work without an API key. Remote mode requires an explicit consent checkbox and configuration.">
          <p>Optional OpenAI-compatible calls use <code>RAG_LLM_BASE_URL</code>, <code>RAG_LLM_MODEL</code> and <code>RAG_LLM_API_KEY</code> from your local environment. Read provider data-retention and billing terms before enabling. These calls send selected retrieved passages and the question to the provider—not the entire PDF, and not zero data.</p>
          <p>Provider compatibility is exercised with mocks in CI; a paid provider call has not been independently demonstrated. Do not use confidential PDFs for this teaching exercise.</p>
        </Step>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950"><BookOpen className="h-5 w-5 text-indigo-700"/> Try, explain and improve</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">Compare beginner TF-IDF retrieval with MiniLM semantic search. Repeat the same question in different words and inspect ranking changes. Explain token overlaps, 384-element vectors, cosine versus rerank scores, and why a correct source marker still requires human judgment.</p>
        <p className="mt-3 text-sm leading-7 text-slate-700">Known limitations include scanned PDFs without OCR, tables/multi-column extraction, multilingual questions, contradictory evidence, broad abstractive summarization, and hostile-file/public-server hardening. This is a reproducible engineering foundation, not a public multi-user production service.</p>
      </section>

      <section id="complete-code" className="rounded-2xl border border-indigo-200 bg-white p-5 sm:p-7">
        <h2 className="flex items-center gap-2 text-2xl font-black text-slate-950"><Code2 className="h-6 w-6 text-indigo-700"/> All original, executable source and tests</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">Every source file below is copied directly from the engineering implementation, including the Streamlit UI, tokenizer/ONNX embedding logic, page parsing, storage, CLI scripts, tests and its CI workflow. No placeholder functions or shortened pseudocode. Create the listed file path in VS Code, copy and save it. In a real repository checkout, the files already exist.</p>
        <nav className="mt-4 flex flex-wrap gap-3 text-sm font-bold">{groups.map(group=><a key={group.id} href={"#"+group.id} className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-indigo-800 hover:underline">{group.name}</a>)}</nav>
        {groups.map(group=><section key={group.id} id={group.id} className="mt-7 scroll-mt-24 space-y-5">
          <h3 className="text-lg font-black text-slate-950">{group.name}</h3>
          {group.paths.map(path=><div key={path} className="min-w-0">
            <h4 className="break-all text-sm font-extrabold text-slate-950">{path}</h4>
            <CodeBlock title={path} code={allFiles[path]} language={syntaxFor(path)} type={path.endsWith(".py") ? "runnable" : "config"}/>
          </div>)}
        </section>)}
      </section>
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="flex items-center gap-2 text-xl font-extrabold"><ShieldCheck className="h-5 w-5"/> Safety and evaluation checklist</h2>
        <p className="mt-3 text-sm leading-7">Only upload documents you may process. The local index contains plaintext excerpts and embeddings, so keep it private. PDF parsing has bounded time, size and page limits but is not a security sandbox. Do not publicly host this unauthenticated demo. Never treat numeric similarity or model confidence as proof of factual correctness.</p>
      </section>
      <Link to="/projects/pdf-rag" className="inline-flex items-center gap-2 font-bold text-indigo-700 hover:underline"><ArrowLeft className="h-4 w-4"/> Return to the beginner PDF RAG project</Link>
    </main>
  </div>;
}
