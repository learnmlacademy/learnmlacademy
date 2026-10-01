import { FigureShell } from "../content/FigureShell";
import React, { useId } from "react";
import type { LLMVisualId } from "../../content/modernai/llmLessonEnhancements";

type Tone = "indigo" | "cyan" | "emerald" | "amber" | "rose" | "slate";

const tones: Record<Tone, string> = {
  indigo: "border-indigo-300 bg-indigo-50 text-indigo-950",
  cyan: "border-cyan-300 bg-cyan-50 text-cyan-950",
  emerald: "border-emerald-300 bg-emerald-50 text-emerald-950",
  amber: "border-amber-300 bg-amber-50 text-amber-950",
  rose: "border-rose-300 bg-rose-50 text-rose-950",
  slate: "border-slate-300 bg-slate-50 text-slate-950",
};

function Figure({ id, title, caption, children }: { id: LLMVisualId; title: string; caption: string; children: React.ReactNode }) {
  return <FigureShell figureProps={{ "data-llm-visual": id }} title={title} caption={caption}>{children}</FigureShell>;
}

function Node({ title, detail, tone = "indigo", badge }: { title: string; detail?: string; tone?: Tone; badge?: string }) {
  return (
    <div className={`relative min-w-0 flex-1 rounded-xl border-2 p-3 text-center ${tones[tone]}`}>
      {badge && <span className="mb-2 inline-flex rounded-full border border-current bg-white/80 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">{badge}</span>}
      <p className="text-sm font-extrabold leading-snug">{title}</p>
      {detail && <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>}
    </div>
  );
}

function Arrow({ label, down = false, tone = "indigo" }: { label?: string; down?: boolean; tone?: Tone }) {
  const color = tone === "rose" ? "text-rose-600" : tone === "emerald" ? "text-emerald-600" : "text-indigo-500";
  return (
    <div className={`flex shrink-0 items-center justify-center ${color}`} aria-hidden="true">
      <span className={`${down ? "" : "md:hidden"} text-2xl font-black`}>↓</span>
      {!down && <span className="hidden px-1 text-2xl font-black md:block">→</span>}
      {label && <span className="ml-1 text-[10px] font-bold text-slate-500">{label}</span>}
    </div>
  );
}

function Flow({ nodes }: { nodes: Array<{ title: string; detail?: string; tone?: Tone; badge?: string }> }) {
  return (
    <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      {nodes.map((node, index) => (
        <React.Fragment key={`${node.title}-${index}`}>
          <Node {...node} />
          {index < nodes.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ProbabilityBars({ title, values, note }: { title: string; values: Array<[string, number, Tone]>; note: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-center text-xs font-extrabold text-slate-900">{title}</p>
      <div className="mt-3 space-y-2">
        {values.map(([label, value, tone]) => (
          <div key={label} className="grid grid-cols-[2.4rem_1fr_2.4rem] items-center gap-2 text-[11px] font-bold text-slate-600">
            <span>{label}</span><span className="h-3 overflow-hidden rounded-full bg-white"><span className={`block h-full rounded-full ${tone === "indigo" ? "bg-indigo-500" : tone === "cyan" ? "bg-cyan-500" : tone === "emerald" ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${value}%` }} /></span><span>{value}%</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] font-semibold text-slate-500">{note}</p>
    </div>
  );
}

function LanguageEvolution() {
  return <Figure id="language-evolution" title="How language modelling evolved without changing the core prediction job" caption="Mechanisms changed from local counts to learned, attention-based systems; the central job remained scoring likely continuations.">
    <Flow nodes={[
      { title: "N-gram counts", detail: "short fixed history · count statistics", tone: "slate" },
      { title: "Neural representations", detail: "learned embeddings · shared parameters", tone: "cyan" },
      { title: "Recurrent models", detail: "sequential learned state", tone: "amber" },
      { title: "Transformer attention", detail: "connections across permitted context", tone: "indigo" },
      { title: "Modern LLM", detail: "scale + pretraining + post-training", tone: "emerald" },
    ]} />
    <p className="mt-4 rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white">Core job throughout: use available context to score what may come next</p>
  </Figure>;
}

function TextToVectors() {
  return <Figure id="text-to-vectors" title="From visible text to vectors the model can process" caption="The displayed split is illustrative only: real token boundaries depend on the model-specific tokenizer.">
    <Flow nodes={[
      { title: "“unbelievable!”", detail: "visible text", tone: "slate" },
      { title: "Tokenizer", detail: "model-specific rules", tone: "amber" },
      { title: "un · believ · able · !", detail: "illustrative token split", tone: "cyan", badge: "example only" },
      { title: "Token IDs", detail: "vocabulary indexes—not meaning", tone: "indigo" },
      { title: "Vector rows + position", detail: "learned embedding plus order information", tone: "emerald" },
    ]} />
  </Figure>;
}

function ContextBudget() {
  const parts: Array<[string, number, string]> = [["Instructions", 220, "bg-indigo-500"], ["Question", 180, "bg-cyan-500"], ["Evidence", 1100, "bg-emerald-500"], ["Output reserve", 500, "bg-amber-500"]];
  return <Figure id="context-budget" title="Several pieces compete for the same context budget" caption="This developer-chosen 1,600-token toy limit is smaller than the 2,000-token plan, so the request overflows by 400 tokens.">
    <div className="hidden overflow-hidden rounded-xl border-2 border-slate-300 md:flex" aria-label="Planned context of 2000 tokens">
      {parts.map(([label, count, color]) => <div key={label} className={`${color} flex min-h-24 items-center justify-center p-2 text-center text-xs font-bold text-white`} style={{ width: `${count / 20}%` }}>{label}<br />{count}</div>)}
    </div>
    <div className="space-y-2 md:hidden">{parts.map(([label, count, color]) => <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-slate-200 p-2"><span className="flex items-center gap-2 text-sm font-bold"><span className={`h-4 w-4 rounded ${color}`} />{label}</span><span className="font-mono text-sm">{count}</span></div>)}</div>
    <div className="mt-3 grid gap-2 text-center text-xs font-bold sm:grid-cols-3"><span className="rounded-lg bg-slate-100 p-2">Planned: 2,000</span><span className="rounded-lg bg-amber-100 p-2 text-amber-950">Toy limit: 1,600</span><span className="rounded-lg bg-rose-100 p-2 text-rose-950">Overflow: 400</span></div>
  </Figure>;
}

function AttentionLookup() {
  return <Figure id="attention-lookup" title="Attention is a learned weighted lookup" caption="Attention weights are learned computations that mix information; they are not a complete explanation of model reasoning.">
    <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
      <Node title="Highlighted token" detail="Query Q: what information is useful here?" tone="indigo" /><Arrow />
      <div className="space-y-2"><Node title="Candidate keys" detail="Q·K scores → softmax" tone="cyan" /><div className="grid grid-cols-2 gap-2"><Node title="0.731 × V₁" detail="V₁=[1,0]" tone="emerald" /><Node title="0.269 × V₂" detail="V₂=[0,2]" tone="amber" /></div></div><Arrow />
      <Node title="Output vector" detail="[0.731, 0.538]" tone="emerald" />
    </div>
  </Figure>;
}

function TransformerFamilies() {
  const lanes = [
    { title: "Encoder-only", detail: "↔ all input positions ↔", footer: "bidirectional input visibility", tone: "cyan" as Tone },
    { title: "Decoder-only", detail: "t₁ → t₂ → t₃ → ?", footer: "causal left-to-right mask", tone: "indigo" as Tone },
    { title: "Encoder-decoder", detail: "source ↔ encoder ⇢ decoder → target", footer: "cross-attention joins source and target", tone: "emerald" as Tone },
  ];
  return <Figure id="transformer-families" title="Three Transformer information-flow families" caption="The arrows show which token information is permitted to flow in each architecture family.">
    <div className="grid gap-3 lg:grid-cols-3">{lanes.map(lane => <div key={lane.title} className={`rounded-xl border-2 p-4 ${tones[lane.tone]}`}><p className="text-center text-sm font-extrabold">{lane.title}</p><div className="my-4 rounded-lg border border-current bg-white p-4 text-center font-mono text-sm font-bold">{lane.detail}</div><p className="text-center text-xs text-slate-600">{lane.footer}</p></div>)}</div>
  </Figure>;
}

function GenerationLoop() {
  return <Figure id="generation-loop" title="A paragraph emerges one selected token at a time" caption="Every selected token is appended to the context before the next prediction step.">
    <Flow nodes={[
      { title: "Current context", detail: "The model …", tone: "slate" }, { title: "Model logits", detail: "one score per candidate", tone: "indigo" }, { title: "Probabilities", detail: "normalized distribution", tone: "cyan" }, { title: "Decoding rule", detail: "choose or sample", tone: "amber" }, { title: "Selected token", detail: "append and repeat ↺", tone: "emerald" },
    ]} />
    <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm font-bold text-slate-700 sm:flex-row"><span className="rounded-lg bg-slate-100 p-2">The model</span><span aria-hidden="true">→</span><span className="rounded-lg bg-indigo-50 p-2">The model learns</span><span aria-hidden="true">→</span><span className="rounded-lg bg-emerald-50 p-2">The model learns patterns</span></div>
  </Figure>;
}

function DecodingControls() {
  return <Figure id="decoding-controls" title="Greedy, temperature, top-k and top-p change selection—not knowledge" caption="The bars use one illustrative candidate distribution; k and p are developer-chosen controls rather than universal recommendations.">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <ProbabilityBars title="Greedy / original" values={[["A",55,"indigo"],["B",25,"cyan"],["C",13,"emerald"],["D",7,"amber"]]} note="select highest: A" />
      <ProbabilityBars title="Higher temperature" values={[["A",40,"indigo"],["B",28,"cyan"],["C",19,"emerald"],["D",13,"amber"]]} note="flatter distribution" />
      <ProbabilityBars title="Top-k (k=2 toy)" values={[["A",69,"indigo"],["B",31,"cyan"],["C",0,"emerald"],["D",0,"amber"]]} note="exactly 2 retained" />
      <ProbabilityBars title="Top-p (p=0.80 toy)" values={[["A",59,"indigo"],["B",27,"cyan"],["C",14,"emerald"],["D",0,"amber"]]} note="smallest set reaching p" />
    </div>
  </Figure>;
}

function PretrainingPipeline() {
  return <Figure id="pretraining-pipeline" title="Pretraining begins with data engineering before optimization" caption="Validation measures a held-out split and informs checkpoints; it is not a source of parameter updates.">
    <Flow nodes={[{title:"Sources + provenance",detail:"traceable inputs",tone:"slate"},{title:"Parse · clean",detail:"quality · dedupe · privacy",tone:"cyan"},{title:"Tokenize · pack",detail:"shifted next-token targets",tone:"indigo"},{title:"Forward + loss",detail:"cross-entropy / NLL",tone:"amber"},{title:"Backprop + update",detail:"optimizer changes weights",tone:"emerald"}]} />
    <div className="mt-3 flex items-center justify-center gap-3 rounded-lg border border-dashed border-indigo-300 bg-indigo-50 p-3 text-center text-xs font-bold text-indigo-950"><span>held-out validation</span><span aria-hidden="true">→</span><span>checkpoint / next training step ↺</span><span className="text-rose-700">never train on validation</span></div>
  </Figure>;
}

function DistributedStrategies() {
  const items = [
    ["Data parallel", "GPU A: full model + batch A\n⇄ synchronized gradients ⇄\nGPU B: full model + batch B", "full model fits per device"],
    ["FSDP / ZeRO-style", "GPU A: state shard 1 ⇄ GPU B: state shard 2", "training state is sharded"],
    ["Tensor parallel", "matrix slice A ⇄ matrix slice B", "one operation is split"],
    ["Pipeline parallel", "GPU A: layers 1–N → GPU B: later layers", "layer groups are split"],
  ];
  return <Figure id="distributed-strategies" title="Data parallelism and model sharding solve different constraints" caption="This is a simplified conceptual comparison; real training systems can combine several strategies.">
    <div className="grid gap-3 md:grid-cols-2">{items.map(([title, diagram, footer],i)=><div key={title} className={`rounded-xl border-2 p-4 ${tones[i===0?"cyan":i===1?"indigo":i===2?"amber":"emerald"]}`}><p className="font-extrabold">{title}</p><div className="my-3 whitespace-pre-line rounded-lg border border-current bg-white p-3 text-center font-mono text-xs font-bold leading-6">{diagram}</div><p className="text-xs text-slate-600">{footer}</p></div>)}</div>
  </Figure>;
}

function PostTrainingAlignment() {
  return <Figure id="post-training-alignment" title="Post-training can use demonstrations and preferences" caption="Direct preference optimization is shown as an alternative branch, not as a mandatory step inside every RLHF pipeline.">
    <Flow nodes={[{title:"Pretrained model",detail:"broad next-token capability",tone:"slate"},{title:"SFT",detail:"instruction/response demonstrations",tone:"cyan"},{title:"Candidate responses",detail:"human or rule comparisons",tone:"amber"},{title:"Preference signal",detail:"ranked response evidence",tone:"indigo"}]} />
    <div className="mx-auto mt-3 grid max-w-2xl grid-cols-[1fr_auto_1fr] items-center gap-2"><Node title="RLHF branch" detail="reward signal + policy optimization" tone="indigo" /><span className="text-center font-black text-indigo-500" aria-hidden="true">↘ ↙</span><Node title="Direct-preference branch" detail="optimize comparisons directly" tone="emerald" /></div>
    <div className="mx-auto mt-2 max-w-xs"><Arrow down /><Node title="Evaluated adapted model" detail="behavior improves only if measured" tone="emerald" /></div>
  </Figure>;
}

function LoraPath() {
  return <Figure id="lora-path" title="LoRA learns a small low-rank update beside a frozen matrix" caption="The frozen base path and trainable adapter path are added together; matching dimensions are required.">
    <div className="grid gap-3 md:grid-cols-[0.7fr_auto_1.6fr_auto_0.8fr] md:items-center"><Node title="Input x" tone="slate" /><Arrow /><div className="space-y-3"><Node title="Frozen W path" detail="base matrix does not update" tone="slate" badge="fixed" /><div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"><Node title="A: r × dᵢₙ" detail="trainable" tone="cyan" /><Arrow /><Node title="B: dₒᵤₜ × r" detail="scaled ΔW = BA" tone="indigo" /></div></div><Arrow /><Node title="Sum → output" detail="Wx + scaled BAx" tone="emerald" /></div>
    <p className="mt-4 rounded-lg bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-950">512×512 full matrix: 262,144 parameters · rank-8 A+B: 4,096 + 4,096 = 8,192 trainable parameters</p>
  </Figure>;
}

function KVCache() {
  return <Figure id="kv-cache" title="KV caching reuses past attention state during token-by-token decoding" caption="The cache stores reusable attention states for the active sequence; it is runtime state, not persistent model memory.">
    <Flow nodes={[{title:"Request",detail:"tokenize prompt",tone:"slate"},{title:"Prefill",detail:"process all prompt tokens",tone:"cyan"},{title:"KV cache",detail:"past K/V states",tone:"indigo"},{title:"Decode token 1",detail:"reuse cache + append",tone:"amber"},{title:"Decode token 2 …",detail:"cache grows until stop",tone:"emerald"}]} />
    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold"><span className="rounded-lg bg-indigo-100 p-2">cache: prompt</span><span className="rounded-lg bg-indigo-200 p-2">cache: prompt + t₁</span><span className="rounded-lg bg-indigo-300 p-2">cache: prompt + t₁ + t₂</span></div>
  </Figure>;
}

function PrecisionMemory() {
  const bars = [["16-bit",100,"≈ 2 GB","bg-indigo-500"],["8-bit",50,"≈ 1 GB","bg-cyan-500"],["4-bit",25,"≈ 0.5 GB","bg-emerald-500"]] as const;
  return <Figure id="precision-memory" title="Lower bit width can reduce raw model storage—but runtime memory is larger" caption="Toy estimate for 1B parameters. Speedup still depends on kernels, hardware, runtime, and workload.">
    <div className="space-y-3">{bars.map(([label,width,value,color])=><div key={label} className="grid grid-cols-[3.5rem_1fr_4rem] items-center gap-3 text-xs font-bold"><span>{label}</span><span className="h-7 rounded bg-slate-100"><span className={`flex h-7 items-center justify-center rounded text-white ${color}`} style={{width:`${width}%`}}>{width}%</span></span><span>{value}</span></div>)}</div>
    <div className="mt-4 grid gap-2 text-center text-xs font-semibold text-slate-700 sm:grid-cols-4"><span className="rounded-lg border p-2">+ KV cache</span><span className="rounded-lg border p-2">+ buffers</span><span className="rounded-lg border p-2">+ quantization metadata</span><span className="rounded-lg border p-2">+ runtime overhead</span></div>
  </Figure>;
}

function ToolBoundary() {
  return <Figure id="tool-boundary" title="The model proposes; trusted application code validates and executes" caption="Tool arguments must pass schema, authorization, range, and side-effect checks before trusted code runs anything.">
    <Flow nodes={[{title:"User",tone:"slate"},{title:"LLM",detail:"proposes tool + arguments",tone:"indigo"},{title:"Validator",detail:"schema · identity · authorization",tone:"amber"},{title:"Trusted tool",detail:"application executes",tone:"emerald"},{title:"Result → LLM → User",detail:"structured result supports response",tone:"cyan"}]} />
    <div className="mx-auto mt-3 flex max-w-lg flex-col items-center"><span className="font-black text-rose-600" aria-hidden="true">↘</span><Node title="Reject or request correction" detail="invalid or unauthorized arguments never reach the tool" tone="rose" /></div>
  </Figure>;
}

function SemanticSearch() {
  return <Figure id="semantic-search" title="Semantic search uses one compatible embedding space for passages and the query" caption="The query can retrieve a paraphrase without exact word overlap; ranking still requires relevance, freshness, and authorization checks.">
    <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center"><div className="space-y-2"><Node title="“Laptop won't start”" tone="slate" /><Node title="“Computer fails to power on”" tone="slate" /><Node title="“Change screen brightness”" tone="slate" /><p className="text-center text-xs font-bold text-slate-500">corpus passages</p></div><Arrow /><Node title="Compatible embedding model" detail="corpus and query → learned vectors" tone="cyan" badge="same space" /><Arrow /><div className="space-y-2"><Node title="Query" detail="“Why won't my computer turn on?”" tone="emerald" /><ol className="rounded-lg bg-emerald-50 p-3 text-sm text-slate-700"><li><b>1. B</b> — closest meaning</li><li><b>2. A</b> — related</li><li><b>3. C</b> — weaker</li></ol></div></div>
  </Figure>;
}

function VectorRecord() {
  return <Figure id="vector-record" title="A vector database stores more than the vector" caption="The application applies authorization before returning records; a topic filter alone is not an access-control boundary.">
    <div className="grid gap-4 lg:grid-cols-[0.7fr_auto_1.5fr_auto_0.8fr] lg:items-center"><Node title="Embedding model" detail="source text → vector" tone="cyan" /><Arrow /><div className="overflow-hidden rounded-xl border-2 border-indigo-300"><p className="bg-indigo-600 p-2 text-center text-sm font-extrabold text-white">Vector record</p>{[["ID","chunk-204"],["Source","text/reference"],["Embedding","[0.12, −0.08, …]"],["Metadata","product · language · tenant/access · embedding_version"]].map(([k,v])=><div key={k} className="grid grid-cols-[6rem_1fr] border-t border-indigo-200 bg-indigo-50 p-2 text-xs"><b>{k}</b><span>{v}</span></div>)}</div><Arrow /><Node title="Authorized query" detail="identity + scope surround retrieval" tone="emerald" badge="shield" /></div>
  </Figure>;
}

function ExactVsANN() {
  return <Figure id="exact-vs-ann" title="ANN reduces search work by accepting a recall trade-off" caption="Exact and approximate approaches should be compared on both latency and recall@k for the real collection.">
    <div className="grid gap-4 md:grid-cols-2"><div className="rounded-xl border-2 border-cyan-300 bg-cyan-50 p-4"><p className="font-extrabold text-cyan-950">Exact scan</p><div className="my-3 text-center font-bold text-cyan-700" aria-hidden="true">query → ● ● ● ● ● → exact nearest</div><p className="text-xs text-slate-600">Compare every eligible vector. Simple and exact; often sufficient when the collection is small.</p></div><div className="rounded-xl border-2 border-indigo-300 bg-indigo-50 p-4"><p className="font-extrabold text-indigo-950">ANN index</p><div className="my-3 text-center font-bold text-indigo-700" aria-hidden="true">query → ●—●—● ⇢ candidate region</div><p className="text-xs text-slate-600">Navigate an HNSW-like graph or IVF-like cluster region. Fewer comparisons; some true neighbours may be missed.</p></div></div>
    <p className="mt-3 rounded-lg bg-slate-900 p-2 text-center text-sm font-bold text-white">Measure latency AND recall@k</p>
  </Figure>;
}

function RAGTwoPhases() {
  return <Figure id="rag-two-phases" title="Index once, retrieve at question time" caption="The offline index supplies scoped evidence to the online path; retrieved source IDs support traceable citations.">
    <div className="space-y-4"><div className="rounded-xl border-2 border-cyan-300 bg-cyan-50 p-3"><p className="mb-3 text-xs font-extrabold uppercase text-cyan-800">Offline / indexing</p><Flow nodes={[{title:"Approved documents",tone:"slate"},{title:"Parse + chunks",tone:"cyan"},{title:"Embeddings",tone:"indigo"},{title:"Index + source metadata",tone:"emerald"}]} /></div><div className="flex justify-center text-2xl font-black text-indigo-600" aria-hidden="true">↓ index connects to retrieval</div><div className="rounded-xl border-2 border-indigo-300 bg-indigo-50 p-3"><p className="mb-3 text-xs font-extrabold uppercase text-indigo-800">Online / query</p><Flow nodes={[{title:"User question",tone:"slate"},{title:"Retrieve allowed scope",tone:"indigo"},{title:"Bounded context",tone:"amber"},{title:"LLM answer + source IDs",tone:"cyan"},{title:"Support validation",tone:"emerald"}]} /></div></div>
  </Figure>;
}

function RAGEvidenceTrace() {
  return <Figure id="rag-evidence-trace" title="RAG evidence trace: a citation must remain connected to accepted evidence" caption="The similar-sounding travel chunk and the wrong-region policy are rejected. If CH-17 is missing, the correct behavior is to report insufficient evidence rather than invent a number.">
    <div className="grid gap-3 lg:grid-cols-[0.8fr_auto_1.6fr_auto_1.1fr] lg:items-center">
      <Node title="User query" detail="How many leave days can an India employee carry forward?" tone="slate" />
      <Arrow />
      <div className="space-y-2">
        <Node title="CH-17 · score 0.91" detail="India leave policy: up to 5 days · ACCEPT" tone="emerald" badge="relevant + allowed" />
        <Node title="CH-42 · score 0.84" detail="Meal allowance cannot carry over · REJECT" tone="rose" badge="plausible wording" />
        <Node title="CH-08 · score 0.80" detail="UK leave policy: 8 days · REJECT" tone="amber" badge="wrong region" />
      </div>
      <Arrow />
      <div className="space-y-2">
        <Node title="Context packet" detail="Question + CH-17 text + source ID" tone="indigo" />
        <Node title="Answer" detail="Up to 5 unused days [CH-17]" tone="emerald" />
        <Node title="Fallback" detail="No accepted chunk → insufficient evidence" tone="rose" />
      </div>
    </div>
  </Figure>;
}

function RetrievalReranking() {
  return <Figure id="retrieval-reranking" title="Retrieve broadly, rerank deeply, send only the strongest context" caption="All counts are illustrative and developer-chosen; production candidate depths must be evaluated.">
    <div className="mx-auto max-w-4xl space-y-2"><Node title="10,000 chunks" detail="authorized searchable corpus" tone="slate" /><Arrow down /><div className="grid grid-cols-2 gap-3"><Node title="Dense top 20" detail="semantic candidates" tone="cyan" /><Node title="Sparse top 20" detail="exact lexical candidates" tone="amber" /></div><Arrow down /><Node title="Hybrid fusion + metadata scope" detail="combine complementary signals" tone="indigo" /><Arrow down /><Node title="Reranker" detail="deeper query-document scoring" tone="indigo" /><Arrow down /><Node title="Top 5 context → LLM" detail="smallest strong evidence set" tone="emerald" /></div>
  </Figure>;
}

function RAGDebugChain() {
  return <Figure id="rag-debug-chain" title="Find the first broken boundary instead of blaming the final answer" caption="Inspect the pipeline in order and fix the earliest stage whose observable evidence is wrong.">
    <Flow nodes={[{title:"Ingestion",detail:"parsed source correct?",tone:"slate"},{title:"Chunking",detail:"relevant unit preserved?",tone:"cyan"},{title:"Retrieval",detail:"known evidence in top-k?",tone:"indigo"},{title:"Reranking",detail:"correct candidates promoted?",tone:"amber"},{title:"Context",detail:"evidence actually included?",tone:"cyan"},{title:"Generation",detail:"answer supported?",tone:"emerald"}]} />
  </Figure>;
}

function ChunkingRetrievalTradeoff() {
  const choices = [
    { title: "Too small", sample: "…up to 5 days…", consequence: "High focus, but region, date, and exceptions are lost", tone: "rose" as Tone },
    { title: "Useful unit", sample: "India leave policy · 2026 · carry forward up to 5 days", consequence: "Question and conditions stay together", tone: "emerald" as Tone },
    { title: "Too large", sample: "Leave + payroll + travel + expenses · 4 pages", consequence: "Useful text is diluted and consumes more context", tone: "amber" as Tone },
  ];
  return <Figure id="chunking-retrieval-tradeoff" title="Chunk boundaries change what retrieval can prove" caption="Chunk size and overlap are evaluation choices. The useful unit preserves the answer together with its scope; overlap can rescue boundary text but duplicates index and context content.">
    <div className="grid gap-3 md:grid-cols-3">
      {choices.map((choice) => <div key={choice.title} className={`rounded-xl border-2 p-4 ${tones[choice.tone]}`}>
        <p className="text-center text-sm font-extrabold">{choice.title}</p>
        <div className="my-3 rounded-lg border border-current bg-white p-3 text-center text-xs font-bold leading-relaxed">{choice.sample}</div>
        <p className="text-xs leading-relaxed text-slate-600">{choice.consequence}</p>
      </div>)}
    </div>
    <div className="mt-4 grid gap-2 text-center text-xs font-bold sm:grid-cols-3">
      <span className="rounded-lg bg-rose-100 p-2 text-rose-950">precision may rise · completeness falls</span>
      <span className="rounded-lg bg-emerald-100 p-2 text-emerald-950">balanced evidence unit</span>
      <span className="rounded-lg bg-amber-100 p-2 text-amber-950">surrounding context rises · noise/cost rise</span>
    </div>
  </Figure>;
}

function EvaluationGates() {
  return <Figure id="evaluation-gates" title="The best model is the best eligible fit for the use case" caption="Hard requirements eliminate ineligible candidates before softer quality, cost, throughput, and convenience trade-offs are ranked.">
    <Flow nodes={[{title:"User job + failure cost",tone:"slate"},{title:"Fixed evaluation set",tone:"cyan"},{title:"Hard gates",detail:"license · residency · safety · p95 · schema/tools",tone:"rose"},{title:"Eligible candidates",detail:"only gate passers",tone:"amber"},{title:"Soft ranking",detail:"quality · cost · throughput · error slices",tone:"emerald"}]} />
    <div className="mt-4 grid gap-3 sm:grid-cols-2"><Node title="Candidate A · ineligible" detail="quality 4.7 · p95 3.2s · structure 99.5%; fails p95≤2s" tone="rose" /><Node title="Candidate B · eligible" detail="quality 4.3 · p95 1.6s · structure 99.2%; passes all gates" tone="emerald" /></div>
  </Figure>;
}

function Guardrails() {
  return <Figure id="guardrails" title="No single guardrail owns the whole safety problem" caption="Untrusted retrieved text cannot grant tool permissions or data authority; independent controls operate at each boundary.">
    <div className="rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 p-4"><div className="mb-3 grid gap-2 text-center text-xs font-bold sm:grid-cols-2"><span className="rounded-lg bg-rose-100 p-2 text-rose-900">Before release: red-team + evaluation</span><span className="rounded-lg bg-amber-100 p-2 text-amber-900">After release: monitoring + incidents</span></div><Flow nodes={[{title:"Input/user",tone:"slate"},{title:"Input validation",detail:"classify data + trust",tone:"cyan"},{title:"LLM",detail:"trusted/untrusted context boundary",tone:"indigo"},{title:"Output checks",detail:"schema · evidence · policy",tone:"amber"},{title:"Tool authorization",detail:"least privilege",tone:"rose"},{title:"User / human review",tone:"emerald"}]} /></div>
  </Figure>;
}

function ClaimEvidenceDecisionMap() {
  const rows = [
    ["C1 · up to 5 days [S1]", "S1 says up to 5", "SUPPORTED", "State + cite", "emerald"],
    ["C2 · all 5 guaranteed [S1]", "S1 says may / up to", "PARTIAL", "Qualify", "amber"],
    ["C3 · valid to June 30 [S1]", "S1 says March 31", "CONTRADICTED", "Correct", "rose"],
    ["C4 · office closes Friday [S2]", "S2 is allowance policy", "UNSUPPORTED", "Abstain / omit", "rose"],
  ] as const;
  return <Figure id="claim-evidence-decision-map" title="A real citation can still fail to support its claim" caption="Citation validity is checked claim by claim. Merely naming S1 or S2 is not enough: the cited text must actually support the attached statement.">
    <div className="space-y-2">
      <div className="hidden grid-cols-[1.25fr_1.25fr_0.8fr_0.8fr] gap-2 px-2 text-[10px] font-extrabold uppercase tracking-wide text-slate-500 sm:grid">
        <span>Answer claim</span><span>Cited evidence</span><span>Support</span><span>Permitted action</span>
      </div>
      {rows.map(([claim, evidence, status, action, tone]) => <div key={claim} className="grid gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-[1.25fr_1.25fr_0.8fr_0.8fr] sm:items-center">
        <p className="text-xs font-bold text-slate-900">{claim}</p>
        <p className="text-xs text-slate-600">{evidence}</p>
        <span className={`rounded-full border px-2 py-1 text-center text-[10px] font-extrabold ${tones[tone as Tone]}`}>{status}</span>
        <p className="text-xs font-bold text-slate-800">{action}</p>
      </div>)}
    </div>
  </Figure>;
}

function TestTimeCompute() {
  return <Figure id="test-time-compute" title="Extra inference effort is a budget—not a correctness guarantee" caption="Commercial systems may implement these ideas differently; hidden internal reasoning is not assumed visible.">
    <div className="grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-center"><div className="rounded-lg bg-rose-50 p-3 text-center text-xs font-bold text-rose-900 lg:[writing-mode:vertical-rl]">latency / cost ↑</div><div className="grid gap-2 sm:grid-cols-5">{[["1","Single fast attempt"],["2","Longer deliberation"],["3","Multiple candidates"],["4","Vote / consensus"],["5","Verifier-guided adaptive search"]].map(([n,t],i)=><div key={n} className={`rounded-xl border-2 p-3 text-center ${tones[i<2?"cyan":i<4?"indigo":"emerald"]}`}><span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{n}</span><p className="text-xs font-extrabold">{t}</p></div>)}</div><div className="rounded-lg bg-emerald-50 p-3 text-center text-xs font-bold text-emerald-900 lg:[writing-mode:vertical-rl]">quality potential: task-dependent, not guaranteed ↑</div></div>
  </Figure>;
}

function LLMOpsLifecycle() {
  return <Figure id="llmops-lifecycle" title="A production answer is produced by a versioned system, not only a model" caption="Release controls and monitoring surround the request path; incidents become regression cases and bounded workflows lead into Agentic AI.">
    <div className="rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 p-4"><Flow nodes={[{title:"Authenticate + validate",tone:"slate"},{title:"Prompt + retrieval/tools",tone:"cyan"},{title:"Model",tone:"indigo"},{title:"Structured output",tone:"amber"},{title:"Evidence · business · safety checks",tone:"rose"},{title:"User / action",tone:"emerald"}]} /><div className="mt-4 grid gap-2 text-center text-[11px] font-bold text-slate-700 sm:grid-cols-2 lg:grid-cols-4"><span className="rounded-lg border bg-white p-2">version model · prompt · embeddings · index · schema</span><span className="rounded-lg border bg-white p-2">offline regression eval + online monitoring</span><span className="rounded-lg border bg-white p-2">rate · queue · timeout · retry · idempotency</span><span className="rounded-lg border bg-white p-2">shadow/canary · stop rules · rollback · incident feedback</span></div></div>
    <p className="mt-3 rounded-lg bg-emerald-100 p-3 text-center text-sm font-bold text-emerald-950">bounded LLM workflow <span aria-hidden="true">→</span> Agentic AI next</p>
  </Figure>;
}

function CanaryReleaseRollback() {
  return <Figure id="canary-release-rollback" title="A better average cannot override a hard release gate" caption="The candidate improves latency and cost, passes offline evaluation, and enters a 5% canary. One critical safety failure crosses the zero-tolerance stop condition, so traffic returns to the baseline.">
    <Flow nodes={[
      { title: "Candidate manifest", detail: "model · prompt · index · schema versions", tone: "slate" },
      { title: "Offline gates", detail: "quality · schema · safety · p95", tone: "cyan" },
      { title: "5% canary", detail: "compare live slices", tone: "indigo" },
      { title: "Stop condition", detail: "critical safety failures > 0", tone: "rose" },
      { title: "Rollback", detail: "restore baseline + record regression", tone: "amber" },
    ]} />
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      <Node title="p95: 1.8 → 1.6 s" detail="11.1% faster" tone="emerald" />
      <Node title="cost/success: $0.024 → $0.020" detail="16.7% lower" tone="emerald" />
      <Node title="critical safety: 0 → 1" detail="hard gate fails" tone="rose" />
    </div>
  </Figure>;
}

const visualComponents: Record<LLMVisualId, React.ComponentType> = {
  "language-evolution": LanguageEvolution,
  "text-to-vectors": TextToVectors,
  "context-budget": ContextBudget,
  "attention-lookup": AttentionLookup,
  "transformer-families": TransformerFamilies,
  "generation-loop": GenerationLoop,
  "decoding-controls": DecodingControls,
  "pretraining-pipeline": PretrainingPipeline,
  "distributed-strategies": DistributedStrategies,
  "post-training-alignment": PostTrainingAlignment,
  "lora-path": LoraPath,
  "kv-cache": KVCache,
  "precision-memory": PrecisionMemory,
  "tool-boundary": ToolBoundary,
  "semantic-search": SemanticSearch,
  "vector-record": VectorRecord,
  "exact-vs-ann": ExactVsANN,
  "rag-two-phases": RAGTwoPhases,
  "rag-evidence-trace": RAGEvidenceTrace,
  "retrieval-reranking": RetrievalReranking,
  "rag-debug-chain": RAGDebugChain,
  "chunking-retrieval-tradeoff": ChunkingRetrievalTradeoff,
  "evaluation-gates": EvaluationGates,
  guardrails: Guardrails,
  "claim-evidence-decision-map": ClaimEvidenceDecisionMap,
  "test-time-compute": TestTimeCompute,
  "llmops-lifecycle": LLMOpsLifecycle,
  "canary-release-rollback": CanaryReleaseRollback,
};

export const llmVisualTitles: Record<LLMVisualId, string> = {
  "language-evolution": "How language modelling evolved without changing the core prediction job",
  "text-to-vectors": "From visible text to vectors the model can process",
  "context-budget": "Several pieces compete for the same context budget",
  "attention-lookup": "Attention is a learned weighted lookup",
  "transformer-families": "Three Transformer information-flow families",
  "generation-loop": "A paragraph emerges one selected token at a time",
  "decoding-controls": "Greedy, temperature, top-k and top-p change selection—not knowledge",
  "pretraining-pipeline": "Pretraining begins with data engineering before optimization",
  "distributed-strategies": "Data parallelism and model sharding solve different constraints",
  "post-training-alignment": "Post-training can use demonstrations and preferences",
  "lora-path": "LoRA learns a small low-rank update beside a frozen matrix",
  "kv-cache": "KV caching reuses past attention state during token-by-token decoding",
  "precision-memory": "Lower bit width can reduce raw model storage—but runtime memory is larger",
  "tool-boundary": "The model proposes; trusted application code validates and executes",
  "semantic-search": "Semantic search uses one compatible embedding space for passages and the query",
  "vector-record": "A vector database stores more than the vector",
  "exact-vs-ann": "ANN reduces search work by accepting a recall trade-off",
  "rag-two-phases": "Index once, retrieve at question time",
  "rag-evidence-trace": "RAG evidence trace: a citation must remain connected to accepted evidence",
  "retrieval-reranking": "Retrieve broadly, rerank deeply, send only the strongest context",
  "rag-debug-chain": "Find the first broken boundary instead of blaming the final answer",
  "chunking-retrieval-tradeoff": "Chunk boundaries change what retrieval can prove",
  "evaluation-gates": "The best model is the best eligible fit for the use case",
  guardrails: "No single guardrail owns the whole safety problem",
  "claim-evidence-decision-map": "A real citation can still fail to support its claim",
  "test-time-compute": "Extra inference effort is a budget—not a correctness guarantee",
  "llmops-lifecycle": "A production answer is produced by a versioned system, not only a model",
  "canary-release-rollback": "A better average cannot override a hard release gate",
};

export function LLMVisualFigure({ id }: { id: LLMVisualId }) {
  const Component = visualComponents[id];
  return <Component />;
}
