import { Link } from "react-router-dom";
import { Callout } from "../../components/content/Callout";
import { DataTable } from "../../components/content/DataTable";
import { FigureShell } from "../../components/content/FigureShell";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";

function Bridge({ question, to, label }: { question: string; to: string; label: string }) {
  return (
    <section className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Why the next lesson matters</p>
      <p className="mt-2 text-lg font-bold leading-relaxed text-indigo-950">{question}</p>
      <Link to={to} className="mt-3 inline-flex font-semibold text-indigo-700 hover:underline">{label} →</Link>
    </section>
  );
}

function Steps({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <div className="not-prose grid gap-3">
      {items.map((item,index)=>(
        <div key={item.title} className="grid grid-cols-[2rem_1fr] gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">{index+1}</span>
          <div><h3 className="font-bold text-slate-900">{item.title}</h3><p className="mt-1 leading-relaxed text-slate-700">{item.body}</p></div>
        </div>
      ))}
    </div>
  );
}

function RAGPipelineFigure() {
  return (
    <FigureShell
      title="RAG: find useful evidence before asking the LLM to answer"
      caption="Retrieval does not replace the LLM. It supplies selected external evidence to the generation step."
      accessibleDescription="A four-step pipeline shows a user question, retrieval from approved documents, assembly of relevant passages into context, and an LLM answer grounded in that evidence."
    >
      <div className="grid gap-3 md:grid-cols-4">
        {[
          ["Question","How many casual-leave days do I get?"],
          ["Retrieve","Find relevant passages in the approved HR manual"],
          ["Add evidence","Place the best passages beside the question"],
          ["Generate","LLM answers using the supplied evidence"],
        ].map(([title,body],index)=>(
          <div key={title} className="relative rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold text-indigo-600">STEP {index+1}</p>
            <p className="mt-1 font-bold text-slate-900">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>
            {index<3 && <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-xl font-bold text-indigo-500 md:block" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </FigureShell>
  );
}

function RAGLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>What if the LLM simply does not know your information?</h2>
        <p className="text-lg">Imagine asking a general LLM: <strong>“According to our company's current HR manual, how many casual-leave days do I get?”</strong> The policy may be private, recently changed, or absent from the model's training data.</p>
        <p>Fine-tuning is not the natural first solution when the problem is missing current evidence. A simpler idea is: <strong>find the relevant approved information first, give it to the LLM with the question, then generate the answer.</strong></p>
        <p>That pattern is called <strong>Retrieval-Augmented Generation (RAG)</strong>.</p>
      </section>

      <RAGPipelineFigure />

      <section className="space-y-4">
        <h2>Two phases make the system work</h2>
        <DataTable
          title="Offline preparation versus online answering"
          headers={["Phase","What happens","When"]}
          rows={[
            ["Offline indexing","Collect approved sources, split them into chunks, create searchable representations, store text + metadata","Before individual user questions"],
            ["Online question","Represent/search the question, retrieve relevant chunks, assemble context, generate and validate an answer","For each user request"],
          ]}
        />
        <Callout role="tip" title="The quiz distinction"><p>Chunking and embedding source documents belong to the indexing phase. Generating the final answer belongs to the online question phase.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>A complete beginner example</h2>
        <Steps items={[
          {title:"Question",body:"The employee asks: “How many casual-leave days do I get?”"},
          {title:"Retrieve",body:"The search layer finds a current HR-policy chunk that says eligible employees receive 12 casual-leave days per year."},
          {title:"Assemble context",body:"The application sends the user's question plus that policy passage to the LLM."},
          {title:"Generate",body:"The LLM answers: “The current HR policy states 12 casual-leave days per year.”"},
          {title:"Validate and show source",body:"The application checks that the cited source ID really came from retrieval and presents the answer with traceable evidence."},
        ]}/>
      </section>

      <section className="space-y-4">
        <h2>RAG has several failure boundaries</h2>
        <DataTable
          title="Where a RAG answer can fail"
          headers={["Stage","Example failure","What to inspect"]}
          rows={[
            ["Source/index","Old policy was indexed","Freshness, versioning, authorization"],
            ["Retrieval","Correct passage was not found","Query representation, filters, retrieval method"],
            ["Context assembly","Correct passage was retrieved but dropped","Selection, token budget, ordering"],
            ["Generation","Evidence is present but answer contradicts it","Prompt, model behavior, claim checks"],
            ["Citation/validation","Answer cites a source ID that was never retrieved","Citation mapping and provenance validation"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>What should happen when the evidence is missing?</h2>
        <p>If no approved source contains enough evidence, the safer behavior is often to <strong>abstain, ask for clarification, or escalate</strong> according to the application's policy—not invent a plausible answer.</p>
        <Callout role="warning" title="RAG reduces one class of risk; it does not guarantee truth"><p>Retrieval can provide current or private evidence, but the wrong passage may be retrieved, old data may be indexed, or the generator may still misuse the evidence. Each stage needs evaluation.</p></Callout>
      </section>

      <Bridge question="The RAG idea is simple: retrieve relevant evidence. But how can retrieval find a passage even when the user's wording is different from the document?" to="/learn/semantic-search-embeddings" label="Semantic Search with Embeddings" />

      <SummaryCard items={[
        "RAG retrieves external evidence and supplies it to an LLM before generation.",
        "RAG is useful for current, private, or domain information that should not rely only on model parameters.",
        "Indexing prepares source documents before user questions; online retrieval and generation happen per request.",
        "Retrieval, context assembly, generation, and citation validation are separate failure boundaries.",
        "Citations should map to actually retrieved source metadata.",
        "When approved evidence is insufficient, a controlled abstention or escalation is safer than unsupported generation.",
      ]}/>
    </div>
  );
}

function SemanticSearchFigure() {
  return (
    <FigureShell
      title="Semantic search matches meaning, not only exact wording"
      caption="The same embedding model should place both indexed passages and incoming queries into a compatible vector space."
      accessibleDescription="Two differently worded sentences about a computer not powering on are represented near each other in an embedding space, while a sentence about screen brightness is farther away."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><strong>Query</strong><p className="mt-2">“Why won't my computer turn on?”</p></div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4"><strong>Close meaning</strong><p className="mt-2">“Laptop fails to power on.”</p></div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><strong>Farther meaning</strong><p className="mt-2">“Change screen brightness.”</p></div>
      </div>
    </FigureShell>
  );
}

function SemanticSearchLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Why exact keyword matching can miss the right answer</h2>
        <p className="text-lg">A user writes <strong>“Why won't my computer turn on?”</strong> while the support document says <strong>“Laptop fails to power on.”</strong> The meaning is similar even though several words differ.</p>
        <p><strong>Semantic search</strong> represents queries and passages as vectors so the system can compare meaning-related numerical representations rather than requiring exact word overlap.</p>
      </section>

      <SemanticSearchFigure />

      <section className="space-y-4">
        <h2>From text to searchable vectors</h2>
        <Steps items={[
          {title:"Embed the corpus",body:"Use an embedding model to turn each passage into a vector and store it with its text and metadata."},
          {title:"Embed the query",body:"Use a compatible embedding model to turn the user's question into a vector in the same representation space."},
          {title:"Measure similarity",body:"Compare the query vector with passage vectors using a similarity or distance measure."},
          {title:"Return top candidates",body:"Pass the best-ranked authorized passages to the next RAG stage."},
        ]}/>
        <Callout role="warning" title="Do not mix unrelated embedding spaces"><p>If passages are indexed with embedding model A and new queries use an unrelated model B, vector distances may no longer be meaningful.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Cosine similarity — compare direction</h2>
        <p>Cosine similarity compares the angle between two vectors after accounting for their magnitudes. A value near 1 means they point in a similar direction; 0 means roughly perpendicular; negative values point in opposing directions.</p>
        <FormulaBlock expression="cos(q,d) = (q · d) / (||q|| ||d||)" explanation="Dot product in the numerator measures alignment; the norms in the denominator remove the effect of overall vector length." />
        <p>For <strong>q = [1,1]</strong> and <strong>d = [1,0]</strong>:</p>
        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm leading-7">
          <p>q · d = 1</p>
          <p>||q|| = √2, ||d|| = 1</p>
          <p className="font-bold text-indigo-800">cos(q,d) = 1 / √2 ≈ 0.707</p>
        </div>
        <p>For <strong>dB = [2,2]</strong>, the direction is exactly the same as q, so cosine similarity is <strong>1.0</strong> even though dB has a larger magnitude.</p>
      </section>

      <section className="space-y-4">
        <h2>Semantic search is not always the only search you need</h2>
        <p>Exact identifiers such as <code>INV-009381</code>, legal clause numbers, product codes, or names can be better handled by lexical matching. Many production systems therefore use <strong>hybrid retrieval</strong>: combine lexical signals with dense semantic similarity.</p>
        <DataTable
          title="Choose the signal that matches the query"
          headers={["Query type","Useful starting approach"]}
          rows={[
            ["Natural-language paraphrase","Dense semantic retrieval"],
            ["Exact invoice/product/code","Lexical or metadata lookup"],
            ["Contains both exact code + description","Hybrid lexical + dense retrieval"],
          ]}
        />
      </section>

      <Bridge question="We can turn millions of passages into vectors. Where do we store those vectors, metadata, and permissions—and how do we search them efficiently?" to="/learn/vector-databases" label="Vector Databases" />

      <SummaryCard items={[
        "Semantic search retrieves meaning-related passages even when the wording differs.",
        "Queries and indexed passages must use compatible embedding representations.",
        "Cosine similarity compares vector direction after normalizing for magnitude.",
        "q=[1,1] and d=[1,0] have cosine similarity about 0.707; [2,2] points in the same direction as [1,1], so cosine is 1.",
        "Dense semantic search is not automatically best for exact identifiers.",
        "Hybrid retrieval combines lexical and semantic signals when a query needs both.",
      ]}/>
    </div>
  );
}

function VectorDatabaseLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Once you have vectors, how do you manage them?</h2>
        <p className="text-lg">A RAG system may need to search thousands or millions of passage embeddings and still keep track of the original text, document ID, date, tenant, and permissions.</p>
        <p>A <strong>vector database</strong> or vector-capable data store keeps vectors together with metadata and provides similarity-search capabilities. The embedding model creates the vector; the database stores and searches it.</p>
      </section>

      <section className="space-y-4">
        <h2>What is stored for one passage?</h2>
        <DataTable
          title="Illustrative record"
          headers={["Field","Example","Why it matters"]}
          rows={[
            ["Text","Employees receive 12 casual-leave days...","Material returned to RAG"],
            ["Embedding","[0.18, -0.04, ...]","Used for similarity search"],
            ["Document ID","hr-policy-2026","Traceability"],
            ["Version/date","2026-08-01","Freshness"],
            ["Tenant / ACL","company-A / HR-read","Authorization filtering"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>Exact search versus approximate nearest neighbours</h2>
        <p>For a small collection, comparing the query with every eligible vector can be simple and completely exact. As collections grow, scanning everything may become too expensive.</p>
        <DataTable
          title="Search trade-off"
          headers={["Approach","Strength","Trade-off"]}
          rows={[
            ["Exact nearest-neighbour search","Checks every eligible vector and finds the true nearest neighbours under the chosen metric","Work grows with collection size"],
            ["Approximate nearest-neighbour (ANN) index","Reduces search work and scales to larger collections","May miss some true nearest neighbours; recall must be measured"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>Metadata filters are useful—but authorization is stronger</h2>
        <p>A topic filter such as <code>department = "HR"</code> can improve relevance. It does not automatically prove that the current user is allowed to read every HR document.</p>
        <Callout role="mistake" title="Relevance filter ≠ access control"><p>Tenant isolation, document permissions, and user authorization must be enforced explicitly before retrieved text is exposed to the LLM or user.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Do you always need a specialized vector database?</h2>
        <p>No. If a team already uses PostgreSQL, has a moderate vector workload, and needs relational joins or transactional metadata, a vector extension in the existing database can be a sensible starting point. Specialized infrastructure becomes useful when measured scale, latency, indexing, or operational requirements justify it.</p>
      </section>

      <Bridge question="The vector store can return candidates. How do chunk boundaries, hybrid search, reranking, and retrieval metrics improve what reaches the LLM?" to="/learn/advanced-rag" label="Advanced RAG" />

      <SummaryCard items={[
        "The embedding model creates vectors; the vector-capable database stores and searches them.",
        "A useful record keeps the vector together with source text and traceable metadata.",
        "Exact search can be simple and fully accurate for small enough collections.",
        "ANN indexes reduce search work but can lose neighbour recall, so the trade-off should be measured.",
        "Metadata relevance filters do not replace explicit authorization and tenant isolation.",
        "An existing relational database with vector support may be enough before specialized infrastructure is justified.",
      ]}/>
    </div>
  );
}

function AdvancedRAGLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Basic RAG works. Why does retrieval still fail?</h2>
        <p className="text-lg">A document may be split at the wrong place, an exact product code may be missed by semantic search, or a relevant passage may appear in the top 20 but be pushed out by a reranker.</p>
        <p>Advanced RAG is mostly about improving and measuring the path from <strong>source document → candidate passages → final context</strong>.</p>
      </section>

      <section className="space-y-4">
        <h2>Chunking decides what unit can be retrieved</h2>
        <p>If chunks are too large, one vector may represent several unrelated ideas and consume too much context. If chunks are too small, the answer may be split away from the surrounding explanation.</p>
        <DataTable
          title="Chunking choices"
          headers={["Choice","Potential benefit","Potential cost"]}
          rows={[
            ["Smaller chunks","Focused retrieval","Can lose surrounding context"],
            ["Larger chunks","More context stays together","May mix topics and waste token budget"],
            ["Overlap","Preserves information across boundaries","Duplicates text and increases index/context cost"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>Hybrid retrieval uses more than one signal</h2>
        <p>A query such as <strong>“INV-009381 late-payment policy”</strong> contains both an exact identifier and a semantic description. Lexical search is strong for the code; dense retrieval is strong for related meaning. Hybrid retrieval combines both candidate sources.</p>
      </section>

      <section className="space-y-4">
        <h2>Reranking asks a more expensive second question</h2>
        <Steps items={[
          {title:"Retrieve broadly",body:"Use dense, lexical, or hybrid retrieval to get perhaps the top 20 candidates."},
          {title:"Rerank narrowly",body:"Apply a more precise scoring model to those candidates."},
          {title:"Assemble context",body:"Keep the strongest evidence that fits the context budget."},
          {title:"Generate",body:"Ask the LLM to answer using the selected evidence."},
        ]}/>
        <Callout role="warning" title="Debug the first stage that fails"><p>If the relevant chunk is in the top 20 but disappears after reranking, retrieval succeeded. Inspect reranker scores, features, and ordering before blaming the embedding model.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Measure retrieval separately from generation</h2>
        <p>Suppose an evaluation query has <strong>2 known relevant chunks</strong>. If only <strong>1</strong> appears in the top 3 retrieved results:</p>
        <FormulaBlock expression="Recall@3 = relevant chunks retrieved in top 3 / all known relevant chunks = 1 / 2 = 0.50" explanation="Recall@k measures whether retrieval found the known relevant items. It does not prove the final generated answer is correct." />
        <p>If Recall@3 improves from 0.50 to 1.00 for that case, retrieval found both labelled relevant chunks in the top 3. Generation, citation support, latency, and safety still need separate evaluation.</p>
      </section>

      <Bridge question="We can now measure retrieval quality. How do we evaluate the whole LLM application—including answer quality, latency, structure, safety, and product constraints?" to="/learn/llm-evaluation" label="LLM Evaluation" />

      <SummaryCard items={[
        "Chunk size determines the unit of retrieval; overlap can preserve boundary context but duplicates content.",
        "Hybrid retrieval combines lexical and dense signals when exact terms and semantic meaning both matter.",
        "Reranking applies a more precise second-stage score to a smaller candidate set.",
        "Debug the first stage where the relevant evidence disappears instead of changing unrelated components.",
        "Recall@k measures retrieval coverage of known relevant items; 1 of 2 relevant chunks retrieved gives Recall@3 = 0.50 in the example.",
        "Better retrieval metrics do not by themselves prove the final LLM answer is correct.",
      ]}/>
    </div>
  );
}

export function LLMRAGBeginnerContent({ topicId }: { topicId: string }) {
  if (topicId === "rag") return <RAGLesson />;
  if (topicId === "semantic-search-embeddings") return <SemanticSearchLesson />;
  if (topicId === "vector-databases") return <VectorDatabaseLesson />;
  if (topicId === "advanced-rag") return <AdvancedRAGLesson />;
  return null;
}
