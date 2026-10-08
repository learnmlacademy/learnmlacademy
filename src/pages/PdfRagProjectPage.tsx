import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FileText, Code2 } from "lucide-react";
import { CodeBlock } from "../components/content/CodeBlock";
import { RagTwoPathDiagram, RagChunkOverlapVisual, RagCosineWorkedExample, RagCitationGateVisual } from "../components/projects/PdfRagConceptVisuals";
import { pdfRagSourceCode } from "../data/pdfRagSourceCode";

type StepProps = { n: number; title: string; why: string; check: string; children: React.ReactNode };
function Step({ n, title, why, check, children }: StepProps) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-700 font-black text-white">{n}</span>
      <h2 className="pt-1 text-xl font-extrabold text-slate-950 sm:text-2xl">{title}</h2>
    </div>
    <p className="mt-3 text-sm leading-7 text-slate-700"><strong>Why this matters:</strong> {why}</p>
    <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">{children}</div>
    <p className="mt-5 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /><span><strong>Verify:</strong> {check}</span>
    </p>
  </section>;
}

const base = "/project-handbooks/pdf-rag/";
const files: Array<[string, string]> = [
  ["projects/pdf-rag/requirements.txt", "config"],
  ["projects/pdf-rag/scripts/make_sample_pdf.py", "python"],
  ["projects/pdf-rag/src/rag.py", "python"],
  ["projects/pdf-rag/scripts/index_and_ask.py", "python"],
  ["projects/pdf-rag/app.py", "python"],
  ["projects/pdf-rag/tests/test_rag.py", "python"],
  ["projects/pdf-rag/scripts/capture_screenshots.py", "python"],
];

export function PdfRagProjectPage() {
  useEffect(() => {
    document.title = "Chat With Your PDFs — RAG Project Handbook | LearnMLAcademy";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Build a page-aware PDF RAG assistant with real Python code, TF-IDF vectors, cosine similarity, source citations, Streamlit, screenshots and tests.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://www.learnmlacademy.com/projects/pdf-rag";
  }, []);

  return <div className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300"><ArrowLeft className="h-4 w-4" /> All projects</Link>
        <p className="mt-6 text-xs font-black tracking-widest text-cyan-300">PROJECT 10 · COMPLETE BEGINNER HANDBOOK · RAG</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">Chat With Your PDFs — Build Your Own RAG Assistant</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">A student has a long travel-policy PDF, but their conference trip is cancelled. How quickly must they notify the university? Build a real application that finds the answer and its source page — or admits when the PDF has no answer.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#start" className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-slate-950">Start building</a>
          <a href="#code" className="rounded-xl border border-slate-500 px-5 py-3 text-sm font-extrabold text-white">Copy complete code</a>
        </div>
      </div>
    </header>

    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
        <h2 className="text-xl font-extrabold text-slate-950">Practical problem: find the right rule, not a plausible guess</h2>
        <p className="mt-3 text-sm leading-7 text-slate-800">Students often search university policies, manuals and reports for one rule. A useful PDF assistant must retrieve evidence from the correct page. We will generate an original, fictional three-page <strong>Campus Travel Policy</strong> and work through one question from start to finish.</p>
        <p className="mt-3 text-sm leading-7 text-slate-800"><strong>Known correct answer:</strong> Cancellation must be reported within 48 hours, and the rule is on <strong>page 3</strong>. Another example asks about reimbursement receipts — <strong>14 days, page 2</strong>. Unsupported questions must yield a clear no-evidence answer.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="flex items-center gap-2 text-lg font-extrabold"><FileText className="h-5 w-5 text-indigo-600" /> What the student builds</h2>
          <p className="mt-3 text-sm leading-7">A working Streamlit web app that uploads PDFs, extracts real text and page numbers, splits long passages with overlap, builds a sparse searchable vector index, retrieves evidence with cosine similarity and shows honest source citations.</p>
          <p className="mt-3 text-sm leading-7">The standard mode works <strong>offline, without a paid API key</strong>. Optional cloud summarization is clearly separated and uses only selected passages.</p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="flex items-center gap-2 text-lg font-extrabold"><Code2 className="h-5 w-5 text-indigo-600" /> Tools you will use</h2>
          <p className="mt-3 text-sm leading-7">Python 3.12 · VS Code · terminal · virtual environment · PyMuPDF · scikit-learn · SciPy · NumPy · Streamlit · pytest · ReportLab · Playwright · GitHub Actions · optional OpenAI API.</p>
          <p className="mt-3 text-sm leading-7"><strong>Important distinction:</strong> TF-IDF creates local word vectors and is a transparent lexical baseline, not a neural semantic embedding. It cannot understand every paraphrase.</p>
        </div>
      </section>

      <RagTwoPathDiagram />
      <section className="grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border bg-white">
          <img src={base + "pdf-rag-app-desktop-form.png"} className="w-full border-b object-contain" alt="Verified real Streamlit app upload and question interface" loading="eager" />
          <figcaption className="p-4 text-sm leading-6"><strong>Real app:</strong> select an example or upload your permitted PDF.</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-2xl border bg-white">
          <img src={base + "pdf-rag-app-desktop-answer.png"} className="w-full border-b object-contain" alt="Verified live Streamlit result showing real page 3 citation" loading="eager" />
          <figcaption className="p-4 text-sm leading-6"><strong>Real output:</strong> retrieved answer and source page.</figcaption>
        </figure>
      </section>

      <div id="start" className="scroll-mt-24 space-y-5">
        <Step n={1} title="Open the project correctly in VS Code" why="Students need to know the exact working folder before running commands." check="VS Code Explorer shows pdf-rag and its requirements.txt, src, scripts and tests folders.">
          <p>Install Python 3.12 and VS Code. Download the project folder from <a href="https://github.com/learnmlacademy/learnmlacademy/tree/main/projects/pdf-rag" className="font-bold text-indigo-700 underline">GitHub</a>, or copy all files from the complete-code section. Choose <strong>File → Open Folder → pdf-rag</strong>, then <strong>Terminal → New Terminal</strong>.</p>
          <CodeBlock code={"projects/pdf-rag/\n  requirements.txt\n  app.py\n  src/rag.py\n  src/__init__.py\n  scripts/make_sample_pdf.py\n  scripts/index_and_ask.py\n  scripts/capture_screenshots.py\n  tests/test_rag.py\n  sample_docs/ (generated)\n  storage/ (generated, private)"} language="text" title="Folder structure" type="config" />
        </Step>
        <Step n={2} title="Create a fresh environment and install packages" why="Virtual environments keep the project's Python libraries isolated." check="The active terminal installs dependencies without an error.">
          <p>Choose the command block for your operating system. Run inside <code>pdf-rag</code>.</p>
          <CodeBlock code={"py -3.12 -m venv .venv\n.venv\\Scripts\\activate\npython -m pip install -r requirements.txt"} language="powershell" title="Windows terminal" type="runnable" />
          <CodeBlock code={"python3.12 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt"} language="bash" title="macOS or Linux" type="runnable" />
          <p>PyMuPDF opens pages, scikit-learn makes vectors, SciPy holds sparse numbers, Streamlit builds the app and pytest checks accuracy.</p>
        </Step>
        <Step n={3} title="Generate a known-answer PDF" why="A controlled example lets us verify page attribution before trying unknown documents." check="sample_docs/Campus_Travel_Policy.pdf is created with three pages and a cancellation rule on page 3.">
          <CodeBlock code={"python scripts/make_sample_pdf.py"} language="bash" title="Create sample document" type="runnable" />
          <p>This example policy is fictional and written specifically for the tutorial. Open the PDF and read page 2 (reimbursement) and page 3 (cancellation) before running AI retrieval.</p>
        </Step>
        <Step n={4} title="Extract each PDF page before splitting it" why="The original PDF parser, not the LLM, must own source page numbers." check="Every chunk has a file name, 1-based page number, and stable chunk ID.">
          <p>Open <code>src/rag.py</code> and study <code>read_pdf()</code>. It checks the file extension, header, size, password and page count. It then reads each page and attaches metadata before any vector indexing. A scanned PDF with no selectable text is rejected rather than pretending to read it.</p>
          <CodeBlock code={"for i, page in enumerate(pdf):\n    extracted_text = page.get_text('text', sort=True)\n    # Record page i + 1 on every chunk extracted from this page"} language="python" title="Page numbers belong to extraction" type="conceptual" />
        </Step>
        <Step n={5} title="Make overlapping chunks without losing source pages" why="A key sentence might cross chunk boundaries and disappear without overlap." check="Adjacent chunks share boundary words; they still refer to the same original page.">
          <RagChunkOverlapVisual />
          <p>With <strong>140 words per chunk</strong> and <strong>30 overlap words</strong>, the stride is 140 − 30 = <strong>110 words</strong>. Chunk 1 covers 1–140, chunk 2 starts at word 111. The example uses word counts, not model token counts.</p>
          <CodeBlock code={"chunk_words = 140\noverlap_words = 30\nstride = chunk_words - overlap_words  # 110"} language="python" title="Chunk size calculation" type="conceptual" />
        </Step>
        <Step n={6} title="Convert text into searchable numerical vectors" why="We need a measurable rule to decide which passage best matches a question." check="The index creates one sparse vector row for every text chunk.">
          <p>TF-IDF weighs words by how informative they are across chunks. The vectors are stored sparsely because most possible word features are absent from any given chunk. The question is transformed with the <em>same</em> fitted vectorizer.</p>
          <RagCosineWorkedExample />
          <p>These two-dimensional vectors explain the formula; the actual application calculates many-dimensional sparse vectors from the PDF. High similarity means word-vector closeness, not proof that the passage answers correctly.</p>
        </Step>
        <Step n={7} title="Retrieve evidence, check citations and abstain when needed" why="Fluent model output is not a substitute for seeing supporting document text." check="The cancellation question finds page 3 and an unrelated question has no supported citation.">
          <RagCitationGateVisual />
          <p>Our offline default quotes the strongest passage directly. The optional LLM may summarize retrieved excerpts. Citation numbers are allowed only if they map to retrieved source IDs. This check blocks fabricated ID numbers but <strong>does not automatically verify every generated claim</strong>.</p>
        </Step>
        <Step n={8} title="Save the vector index, then reload and ask a question" why="A reused local index is faster and avoids repeating PDF extraction on every new query." check="The answer cites Campus_Travel_Policy.pdf, page 3.">
          <CodeBlock code={"python scripts/index_and_ask.py"} language="bash" title="Create, persist, reload and query" type="runnable" />
          <p>The CLI creates <code>storage/sample_index/index.json</code> with source text and vocabulary and <code>vectors.npz</code> with numeric features. The loader checks source and index integrity. Do not commit private document indexes to Git.</p>
        </Step>
        <Step n={9} title="Run all tests, then open the Streamlit web app" why="Tests catch corrupt files, duplicate uploads, wrong source pages, unknown answers and invented citation IDs." check="pytest passes, Streamlit starts and the sample loads in your browser.">
          <CodeBlock code={"python -m pytest -q\npython -m streamlit run app.py"} language="bash" title="Check and run the application" type="runnable" />
          <p>Open the local address printed by Streamlit, usually <code>http://localhost:8501</code>. Keep the sample checkbox selected, click <strong>Find answer and page citation</strong>, then expand the source panel to see page 3.</p>
        </Step>
        <Step n={10} title="Try all three questions and inspect real outputs" why="A complete student project must show both supported and unsupported cases." check="You can explain why the answer uses page 3, page 2 or abstains.">
          <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm">
            <thead><tr><th className="border bg-slate-100 p-3">Question</th><th className="border bg-slate-100 p-3">Expected behavior</th></tr></thead>
            <tbody>
              <tr><td className="border p-3">When must cancellation be reported?</td><td className="border p-3">48 hours; page 3</td></tr>
              <tr><td className="border p-3">When are reimbursements submitted?</td><td className="border p-3">14 days; page 2</td></tr>
              <tr><td className="border p-3">What are the meal voucher rules on Mars?</td><td className="border p-3">No document evidence; abstain</td></tr>
            </tbody>
          </table></div>
          <p>To use your own permitted text PDF, disable the sample checkbox and upload one or more documents. Keep offline mode on for sensitive material. Scanned PDFs require separate OCR and cannot be processed directly by this version.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <img src={base + "pdf-rag-app-mobile-form.png"} alt="Real mobile Streamlit PDF RAG form" className="mx-auto w-full max-w-xs rounded-xl border bg-white" loading="lazy" />
            <img src={base + "pdf-rag-app-mobile-answer.png"} alt="Real mobile Streamlit grounded answer and original source" className="mx-auto w-full max-w-xs rounded-xl border bg-white" loading="lazy" />
          </div>
        </Step>
      </div>

      <section id="code" className="scroll-mt-24 rounded-2xl border border-indigo-200 bg-white p-5 sm:p-7">
        <h2 className="text-2xl font-black text-slate-950">Complete real source code — copy every file</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">No placeholder functions or shortened snippets here. All project source files are shown below exactly as used by the executable app and its tests. Create the named file in VS Code, click Copy, paste and save. The same code is available from the GitHub project folder.</p>
        <div className="mt-6 space-y-6">{files.map(([path, language]) =>
          <section key={path}>
            <h3 className="break-all text-base font-extrabold text-slate-950">{path}</h3>
            <CodeBlock code={pdfRagSourceCode[path]} language={language} title={path} type={language === "config" ? "config" : "runnable"} />
          </section>
        )}</div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-xl font-extrabold">Troubleshooting</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
            <li><strong>No selectable text:</strong> the file is likely a scan, so use OCR first.</li>
            <li><strong>Wrong passage:</strong> examine ranked chunks, reformulate the question and consider top-k.</li>
            <li><strong>Module missing:</strong> activate the environment and reinstall requirements.</li>
            <li><strong>API key missing:</strong> use offline grounded-passage mode without a key.</li>
            <li><strong>Slow app:</strong> start with the three-page PDF and small text documents.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-extrabold">Next-level enhancements</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
            <li>OCR for image scans with visual quality checks.</li>
            <li>Neural sentence-transformer embeddings as a semantic upgrade.</li>
            <li>A reranker and quantitative Recall@k benchmarks.</li>
            <li>Claim-by-claim citation faithfulness evaluation.</li>
            <li>Privacy, size, prompt-injection and latency tests.</li>
          </ul>
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-5 sm:p-7">
        <h2 className="text-xl font-extrabold">Interview questions and mastery</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7">
          <li>What changes when generation is augmented with retrieved evidence?</li>
          <li>Why must PDF page numbers be preserved before calling a model?</li>
          <li>Explain the calculation 140 − 30 = 110 in chunking.</li>
          <li>Calculate cosine similarity for two sample vectors.</li>
          <li>Why can TF-IDF miss paraphrases? How would semantic retrieval help?</li>
          <li>Why can a valid citation ID still accompany an unsupported claim?</li>
          <li>How should sensitive PDFs, malformed files and prompt injections be handled?</li>
          <li>How would you measure retrieval recall, answer quality, latency and cost?</li>
        </ol>
      </section>
      <Link to="/projects" className="inline-flex items-center gap-2 font-bold text-indigo-700"><ArrowLeft className="h-4 w-4" /> Back to all projects</Link>
    </main>
  </div>;
}
