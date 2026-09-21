export type LLMVisualId =
  "language-evolution"
  | "text-to-vectors"
  | "context-budget"
  | "attention-lookup"
  | "transformer-families"
  | "generation-loop"
  | "decoding-controls"
  | "pretraining-pipeline"
  | "distributed-strategies"
  | "post-training-alignment"
  | "lora-path"
  | "kv-cache"
  | "precision-memory"
  | "tool-boundary"
  | "semantic-search"
  | "vector-record"
  | "exact-vs-ann"
  | "rag-two-phases"
  | "rag-evidence-trace"
  | "retrieval-reranking"
  | "rag-debug-chain"
  | "chunking-retrieval-tradeoff"
  | "evaluation-gates"
  | "guardrails"
  | "claim-evidence-decision-map"
  | "test-time-compute"
  | "llmops-lifecycle"
  | "canary-release-rollback";

export type LLMCodeLabel =
  | "Runnable Python"
  | "Runnable Python — external dependency/model required"
  | "Runnable Python — external dependency required"
  | "Illustrative API fragment"
  | "Conceptual pseudocode";

type LLMEnhancement = {
  summary: string[];
  visuals: LLMVisualId[];
  codeLabel: LLMCodeLabel;
  codeNote: string;
};

// Exact lesson endings, visual mapping, and code classifications from the final specification.
export const llmLessonEnhancements: Record<string, LLMEnhancement> = {
  "llm-intro": {
    summary: [
      "A language model assigns probabilities or scores to possible continuations of a token sequence.",
      "Text generation repeats next-token prediction: score candidates, select one token, append it, and predict again.",
      "An LLM is the prediction model; a chatbot is an application that may add instructions, history, retrieval, tools, safety checks, and a user interface.",
      "N-gram models use short local count statistics, so sparse or unseen sequences and distant context are major limitations.",
      "Neural language models learn shared numerical representations, while Transformers use attention to connect relevant token positions more directly.",
      "Modern LLM capability depends on architecture, data, parameters, compute, and post-training, but fluent continuation is still not guaranteed factual retrieval.",
      "Important applications therefore add evidence, validation, permissions, and monitoring around the model."
    ],
    visuals: ["language-evolution"],
    codeLabel: "Runnable Python",
    codeNote: "Runs with the Python standard library.",
  },
  "tokenization-embeddings": {
    summary: [
      "A tokenizer converts text into model-specific tokens; a token is not necessarily one word.",
      "A vocabulary maps each token to an integer ID, and the ID is an index rather than a measure of meaning.",
      "An embedding lookup maps token IDs to learned vectors whose individual dimensions do not have fixed human-readable meanings.",
      "Positional information is needed because token order changes meaning even when the token set is the same.",
      "A context window is a finite token budget shared by the request's instructions, history, user input, retrieved evidence, and output allowance according to the model/API.",
      "A larger context window is not persistent memory and does not guarantee that every distant detail will be used well.",
      "Token budgets should be planned with the actual model tokenizer instead of estimating from visible word count alone."
    ],
    visuals: ["text-to-vectors","context-budget"],
    codeLabel: "Runnable Python — external dependency/model required",
    codeNote: "Requires the Transformers package and access to the named tokenizer files.",
  },
  "transformers-attention": {
    summary: [
      "A Transformer creates context-dependent token representations by combining token/position information with repeated attention and feed-forward transformations.",
      "Query, Key, and Value are learned projections: Queries seek relevant information, Keys support matching, and Values carry information into the weighted result.",
      "Scaled dot-product attention computes `softmax(QKᵀ / √dₖ)V`; scaling helps keep dot products from making softmax excessively sharp.",
      "Multi-head attention uses several learned projection sets, but individual heads should not be assumed to have one fixed human-interpretable role.",
      "Feed-forward layers transform each position, while residual connections and normalization help deep Transformer stacks train and preserve information.",
      "Encoder-only models usually expose bidirectional input context, decoder-only models use causal visibility for autoregressive generation, and encoder-decoder models combine source encoding with target generation.",
      "Causal masking prevents a decoder from using future target tokens during next-token training."
    ],
    visuals: ["attention-lookup","transformer-families"],
    codeLabel: "Runnable Python — external dependency required",
    codeNote: "Requires PyTorch.",
  },
  "text-generation-decoding": {
    summary: [
      "An autoregressive LLM generates text one token at a time rather than producing a full paragraph in one operation.",
      "The model produces logits for vocabulary candidates, and softmax converts those scores into a normalized probability distribution.",
      "Greedy decoding always selects the highest-probability candidate, while sampling draws from the probability distribution.",
      "Temperature rescales logits: lower positive values sharpen the distribution and higher values flatten it; deterministic generation should not be described as literal `T = 0` division.",
      "Top-k limits sampling to exactly k high-scoring candidates, while top-p keeps the smallest high-probability set reaching a cumulative probability threshold.",
      "EOS tokens, application stop sequences, and maximum-new-token limits determine when generation ends.",
      "Decoding settings affect determinism, diversity, repetition, and reproducibility, but they do not add factual knowledge to the model."
    ],
    visuals: ["generation-loop","decoding-controls"],
    codeLabel: "Illustrative API fragment",
    codeNote: "Assumes model and tokenized inputs already exist.",
  },
  "pretraining-finetuning": {
    summary: [
      "LLM pretraining begins with traceable data collection, parsing, quality filtering, deduplication, privacy/safety handling, and deliberate domain/language mixture design.",
      "A causal language model learns shifted next-token targets: earlier tokens are inputs and the following observed tokens become prediction targets.",
      "Cross-entropy or negative log-likelihood penalizes low probability on the observed next token; backpropagation and an optimizer update model parameters.",
      "Batch, optimizer step, and epoch describe different units of training work, and very large corpora are often discussed in tokens and steps rather than many full epochs.",
      "Scaling laws are empirical relationships among parameters, data, compute, and loss; historical compute-optimal ratios are planning evidence rather than universal rules.",
      "Raw weight memory is only part of training memory because activations, gradients, optimizer state, buffers, and communication also consume resources.",
      "Data parallelism replicates the model across different batches, while sharding/tensor/pipeline strategies distribute training state or computation when one device is insufficient."
    ],
    visuals: ["pretraining-pipeline","distributed-strategies"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Model, optimizer, batches, and the complete training setup are placeholders.",
  },
  "instruction-tuning-rlhf": {
    summary: [
      "Pretraining creates broad next-token capability, while post-training shapes how a model responds to instructions, preferences, safety goals, and specialized tasks.",
      "Supervised fine-tuning learns from curated instruction/input and target-response pairs.",
      "Preference alignment uses comparisons among candidate responses; classic RLHF is important, but direct preference optimization and other post-training methods also exist.",
      "Alignment changes behavior under its data and objective but does not permanently guarantee truthfulness or safety.",
      "Full fine-tuning updates many or all trainable model parameters, while PEFT methods adapt a much smaller set of parameters.",
      "LoRA keeps the base matrix frozen and learns a low-rank update `ΔW = BA`, reducing trainable matrix parameters when rank r is small.",
      "Prompting changes request-time guidance, RAG supplies external evidence, and fine-tuning changes learned behavior; choose the smallest intervention that solves the measured gap."
    ],
    visuals: ["post-training-alignment","lora-path"],
    codeLabel: "Illustrative API fragment",
    codeNote: "Assumes a loaded base model and a separate training setup.",
  },
  "efficient-llm-serving": {
    summary: [
      "Inference uses a trained model at request time, and efficient serving must manage model compatibility, memory, latency, throughput, queueing, quality, and cost together.",
      "Prefill processes the prompt, while autoregressive decoding generates later tokens incrementally.",
      "A KV cache reuses previous attention key/value states to reduce repeated computation, but it consumes memory and can grow with context and active sequences.",
      "Quantization reduces numerical precision and raw weight memory, but real speed and quality effects depend on hardware, kernels, calibration, and runtime support.",
      "Batching can improve throughput while adding queue delay; continuous batching dynamically groups active sequences.",
      "Knowledge distillation trains a smaller student from teacher signals and is conceptually different from quantization.",
      "Hugging Face is a practical model/tokenizer ecosystem example, not the definition of LLM inference or serving."
    ],
    visuals: ["kv-cache","precision-memory"],
    codeLabel: "Runnable Python — external dependency/model required",
    codeNote: "Requires the Transformers package and downloads the named pretrained model.",
  },
  "prompt-engineering": {
    summary: [
      "Prompt engineering makes a request testable by defining the task, relevant context, constraints, and expected output contract.",
      "Zero-shot prompting describes the task directly, while few-shot prompting adds examples when they measurably clarify the desired pattern.",
      "Longer prompts are not automatically better; ambiguity, missing evidence, conflicting instructions, and unnecessary examples should be debugged against a fixed test set.",
      "Valid JSON proves parseability, and schema validation can prove fields/types/allowed values, but neither proves factual or business correctness.",
      "In tool calling, the model proposes a tool and arguments; trusted application code validates authorization, ranges, schema, and side effects before execution.",
      "Tool results can return to the model for a final response, but function calling by itself does not make the LLM an autonomous agent.",
      "High-impact or side-effecting actions require ordinary application controls beyond model-generated intent."
    ],
    visuals: ["tool-boundary"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Tool calls, identity, authorization, and service functions are application-provided placeholders.",
  },
  "semantic-search-embeddings": {
    summary: [
      "Keyword search matches lexical patterns and remains valuable for exact names, codes, and phrases; semantic search solves a different retrieval problem.",
      "Semantic search converts corpus passages and the query into vectors in a compatible embedding space and ranks candidates by similarity.",
      "Cosine similarity compares vector direction using `cos(q,d) = (q·d)/(||q||||d||)` rather than treating vector magnitude as meaning.",
      "Top-k returns a developer-chosen number of highest-ranked candidates, while optional score thresholds must be calibrated for the embedding model and domain.",
      "Search embeddings are not the same thing as token IDs or individual token-embedding rows inside an LLM.",
      "Poor chunks, stale embeddings, model/domain mismatch, multilingual mismatch, and semantically similar but irrelevant passages can all hurt retrieval.",
      "Similarity is a candidate-ranking signal, not proof of truth, authorization, or task relevance; vector databases add the storage/index/filter/update infrastructure covered next."
    ],
    visuals: ["semantic-search"],
    codeLabel: "Runnable Python — external dependency required",
    codeNote: "Requires NumPy.",
  },
  "vector-databases": {
    summary: [
      "An embedding model creates vectors; a vector database stores, indexes, filters, updates, and retrieves vector records.",
      "A useful vector record normally includes a unique ID, embedding, source content/reference, and metadata such as tenant, language, document type, date, or embedding version.",
      "Exact nearest-neighbour search compares all eligible vectors and may be completely adequate for small collections.",
      "Approximate nearest-neighbour indexes such as HNSW or IVF-style approaches reduce search work at scale by accepting a possible recall trade-off.",
      "Metadata filtering can improve relevance and scope, but application authorization must still prevent access to prohibited records.",
      "Changing to an incompatible embedding model may require re-embedding, index migration, validation, and rollback rather than mixing vector spaces casually.",
      "A relational database with vector support may be sufficient for many workloads; specialized vector systems are justified by measured scale, latency, filtering, write, or operational needs—not by RAG alone."
    ],
    visuals: ["vector-record","exact-vs-ann"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "The embed and index functions represent application interfaces.",
  },
  "rag": {
    summary: [
      "RAG connects an LLM to current, private, or domain-specific evidence without retraining the whole model on that evidence.",
      "The indexing phase ingests trusted sources, preserves provenance/access metadata, creates chunks and embeddings, and stores searchable records.",
      "The query phase retrieves candidate evidence for a question, builds a bounded context, asks the LLM to generate, and validates the resulting claims and citations.",
      "Retrieval and generation are separate responsibilities: the retriever selects evidence and the generator writes a candidate answer from it.",
      "A RAG failure can begin in retrieval, context assembly, or generation, so the retrieved passages should be inspected before changing the model.",
      "Traceable citations require stored source metadata; a citation invented by the model is not evidence.",
      "RAG can still return stale, conflicting, malicious, irrelevant, or unauthorized information, so it reduces dependence on parametric memory without guaranteeing factuality or security."
    ],
    visuals: ["rag-two-phases", "rag-evidence-trace"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Retriever, context builder, generator, and citation validator are application components.",
  },
  "advanced-rag": {
    summary: [
      "Advanced RAG treats retrieval as a pipeline whose chunk boundaries, metadata, lexical/semantic signals, candidate depth, reranking, and context packing all affect the evidence reaching the model.",
      "Fixed-size chunks are simple, overlap preserves boundary context at a duplication cost, and structure-aware/semantic chunking may preserve headings or tables more coherently.",
      "Dense retrieval is useful for semantic similarity, while sparse lexical retrieval is strong for exact names, numbers, and codes; hybrid retrieval combines complementary signals.",
      "A first-stage retriever can gather a broad candidate set and a reranker can score query-document pairs more deeply before only a small context is passed to the LLM.",
      "Recall@k measures what fraction of known relevant items appeared in the top k, while answer correctness/groundedness must be evaluated separately.",
      "Retrieval results should be sliced by important query/document groups such as language, freshness, or document type instead of relying only on one average.",
      "Debug in pipeline order—ingestion, chunks, retrieval, reranking, context, generation—so the first failing boundary is corrected rather than masking it with more complexity."
    ],
    visuals: ["retrieval-reranking", "rag-debug-chain", "chunking-retrieval-tradeoff"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Dense, sparse, fusion, and reranking functions are pipeline placeholders.",
  },
  "llm-evaluation": {
    summary: [
      "There is no universally best LLM; evaluation begins with the real user job, failure cost, and operating requirements.",
      "A fixed, versioned evaluation set should contain representative cases, edge cases, adversarial cases, and important user/task slices.",
      "Different properties need different evaluators: deterministic checks for exact structure or latency, human rubrics for nuanced qualities, and calibrated model judges where appropriate.",
      "LLM-as-a-judge can scale evaluation but is not ground truth and should be checked for rubric, ordering, and correlated biases against human-reviewed cases.",
      "Public benchmark scores belong to a defined task set, prompt/scoring protocol, model version, and sometimes serving setup; contamination, saturation, and domain mismatch limit generalization.",
      "Hard requirements such as data residency, licensing, safety, schema/tool support, or latency should eliminate ineligible candidates before softer quality/cost trade-offs are ranked.",
      "Re-evaluate whenever the model, prompt, decoding, retrieval, tools, or serving setup changes materially."
    ],
    visuals: ["evaluation-gates"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Candidate evaluation and filtering functions represent an application evaluation harness.",
  },
  "llm-hallucinations-safety": {
    summary: [
      "Fluent LLM output can still be factually wrong, unsupported by required evidence, stale, or accompanied by a fabricated citation, and these failures should be diagnosed separately.",
      "Prompt injection is a trust-boundary problem in which untrusted content attempts to manipulate instructions, data access, or tool behavior.",
      "Guardrails should be layered across input validation, context/retrieval scope, model output, tools/actions, and human review rather than relying on one prompt or filter.",
      "RAG and grounding can improve evidence availability but do not guarantee factuality, citation correctness, freshness, or authorization.",
      "Tool access should follow least privilege and application-side authorization; model-generated text cannot grant itself permissions.",
      "Guardrails have false positives and false negatives, so normal, adversarial, multilingual, and high-impact cases need evaluation and monitoring.",
      "Production incidents should feed back into tests, while sensitive prompts and retrieved data must be handled with privacy-aware logging and retention."
    ],
    visuals: ["guardrails", "claim-evidence-decision-map"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Generation, source, and policy checks represent application controls.",
  },
  "reasoning-models": {
    summary: [
      "Reasoning-oriented models still generate tokens autoregressively at the interface; the term refers to training/inference strategies that allocate additional computation to harder tasks.",
      "Test-time compute can include longer attempts, multiple sampled candidates, voting, verifier-guided selection, search, or adaptive effort allocation.",
      "Different commercial models may use different or undisclosed mechanisms, so evaluation should focus on observable inputs, outputs, budgets, and verification.",
      "More inference computation can improve some difficult tasks but increases token use, latency, monetary cost, and energy, and it does not guarantee a better result.",
      "Easy tasks may gain little from extra effort, while weak selection or a wrong initial assumption can make longer/multiple attempts wasteful.",
      "Deterministic external checks—tests, calculators, constraint solvers, approved sources, or independent evaluators—can be stronger than simply requesting a longer response.",
      "Math or coding benchmark gains should not be generalized into claims of universal human-like reasoning or exposed hidden chain-of-thought."
    ],
    visuals: ["test-time-compute"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Candidate generation and verification functions are conceptual.",
  },
  "llmops": {
    summary: [
      "LLMOps covers the lifecycle of the whole LLM application: input controls, versioned prompts/context, optional retrieval/tools, model access, validation, evaluation, observability, release, and rollback.",
      "Reproducibility requires more than a model name; teams may need the model revision, prompt, decoding settings, embedding model, index/chunking configuration, schemas, tools, and evaluation-set version.",
      "Offline regression evaluation checks known quality/safety/format/latency cases before release, while online observability measures behavior under real traffic.",
      "Useful production metrics include request/error rates, p50/p95/p99 latency, token/compute cost, tool errors, retrieval health, and privacy-safe quality/safety signals.",
      "Reliability needs bounded retries, timeouts, queue/rate controls, fallbacks, and idempotency where duplicate side-effecting or billed operations are possible.",
      "Shadow/canary releases, explicit stop conditions, and tested rollback limit exposure when a model, prompt, retrieval, or tool stack changes.",
      "Production incidents should become labelled regression cases, and Agentic AI begins when systems extend beyond bounded calls into multi-step stateful action selection/planning loops."
    ],
    visuals: ["llmops-lifecycle", "canary-release-rollback"],
    codeLabel: "Conceptual pseudocode",
    codeNote: "Tracing, evaluation, canary, and rollback functions are production-system placeholders.",
  },
};
