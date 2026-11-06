export type LessonReference = {
  title: string;
  url: string;
  note: string;
};

const refs = {
  react: {
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    url: "https://arxiv.org/abs/2210.03629",
    note: "Original research on interleaving task reasoning with external actions and observations."
  },
  reflexion: {
    title: "Reflexion: Language Agents with Verbal Reinforcement Learning",
    url: "https://arxiv.org/abs/2303.11366",
    note: "Research on using feedback and episodic text memory to improve later agent attempts."
  },
  toolformer: {
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
    url: "https://arxiv.org/abs/2302.04761",
    note: "Original research on learning when to call APIs, what arguments to pass, and how to use returned results."
  },
  openaiAgents: {
    title: "OpenAI: A practical guide to building agents",
    url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
    note: "Primary guidance on agent suitability, orchestration, tools, guardrails, and human intervention."
  },
  hfAgents: {
    title: "Hugging Face Agents Course: Introduction to Agents",
    url: "https://huggingface.co/learn/agents-course/unit1/introduction",
    note: "Official course covering tool use and the thought-action-observation cycle."
  },
  functionCalling: {
    title: "OpenAI API: Function Calling",
    url: "https://developers.openai.com/api/docs/guides/function-calling",
    note: "Current API documentation for tool schemas, strict structured arguments, application-side execution, and returning tool results."
  },
  tokenCounting: {
    title: "OpenAI API: Counting Tokens",
    url: "https://developers.openai.com/api/docs/guides/token-counting",
    note: "Exact input-token counting for request content, tools, images, files, and message structure."
  },
  compaction: {
    title: "OpenAI API: Compaction",
    url: "https://developers.openai.com/api/docs/guides/compaction",
    note: "Current guidance for reducing long-running context while preserving state needed for later turns."
  },
  conversationState: {
    title: "OpenAI API: Conversation State",
    url: "https://developers.openai.com/api/docs/guides/conversation-state",
    note: "Explains conversation persistence, context-window accounting, input/output/reasoning tokens, and truncation risks."
  },
  langgraph: {
    title: "LangGraph: Overview",
    url: "https://docs.langchain.com/oss/python/langgraph/overview",
    note: "Current framework documentation for graph-based stateful workflows, persistence, interrupts, memory, and human-in-the-loop control."
  },
  langgraphState: {
    title: "LangGraph: Define and Update State",
    url: "https://docs.langchain.com/oss/python/langgraph/graph-api",
    note: "Official reference for graph state, nodes, edges, and controlled transitions."
  },
  langgraphMemory: {
    title: "LangGraph: Memory",
    url: "https://docs.langchain.com/oss/python/langgraph/add-memory",
    note: "Official guidance on thread-scoped state and longer-lived memory stores."
  },
  langgraphPersistence: {
    title: "LangGraph: Persistence",
    url: "https://docs.langchain.com/oss/python/langgraph/persistence",
    note: "Official guidance on checkpoints, resuming runs, and durable execution."
  },
  crewai: {
    title: "CrewAI: Introduction",
    url: "https://docs.crewai.com/en/introduction",
    note: "Current framework documentation describing agents, crews, flows, state, and execution control."
  },
  autogen: {
    title: "Microsoft AutoGen: AgentChat",
    url: "https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/",
    note: "Official documentation for single-agent and multi-agent applications, teams, handoffs, and human feedback."
  },
  mcpSpec: {
    title: "Model Context Protocol: Specification (2026-07-28)",
    url: "https://modelcontextprotocol.io/specification/2026-07-28",
    note: "The authoritative, versioned protocol specification for message patterns, capabilities, authorization, and compatibility."
  },
  mcpTools: {
    title: "Model Context Protocol: Server Tools (2026-07-28)",
    url: "https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/server/tools.mdx",
    note: "Normative tool discovery and invocation guidance, including validation, access control, human approval, and untrusted tool metadata."
  },
  selfRag: {
    title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
    url: "https://arxiv.org/abs/2310.11511",
    note: "Research on adaptive retrieval and self-critique instead of always adding a fixed number of passages."
  },
  correctiveRag: {
    title: "Corrective Retrieval Augmented Generation",
    url: "https://arxiv.org/abs/2401.15884",
    note: "Research on evaluating retrieval quality and triggering corrective retrieval actions when evidence is weak."
  },
  osworld: {
    title: "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments",
    url: "https://arxiv.org/abs/2404.07972",
    note: "Research benchmark for agents operating real desktop applications through visual and accessibility interfaces."
  },
  agentDojo: {
    title: "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents",
    url: "https://arxiv.org/abs/2406.13352",
    note: "Research benchmark for tool-using agents exposed to untrusted external content and prompt-injection attacks."
  },
  owaspAgentic: {
    title: "OWASP Top 10 for Agentic Applications (2026)",
    url: "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/",
    note: "Peer-reviewed security guidance for risks specific to autonomous and agentic AI applications."
  },
  agentBench: {
    title: "AgentBench: Evaluating LLMs as Agents",
    url: "https://arxiv.org/abs/2308.03688",
    note: "Multi-environment benchmark covering agent reasoning and decision-making in interactive tasks."
  },
  openTelemetryGenAI: {
    title: "OpenTelemetry: Semantic Conventions for Generative AI Spans",
    url: "https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md",
    note: "Emerging conventions for tracing model, retrieval, memory, and tool operations; content capture requires privacy-aware configuration."
  },
  gan: {
    title: "Generative Adversarial Networks",
    url: "https://arxiv.org/abs/1406.2661",
    note: "The original GAN paper describing the generator-discriminator minimax training framework."
  },
  vae: {
    title: "Auto-Encoding Variational Bayes",
    url: "https://arxiv.org/abs/1312.6114",
    note: "The foundational variational autoencoder paper and its reparameterized variational learning objective."
  },
  ddpm: {
    title: "Denoising Diffusion Probabilistic Models",
    url: "https://arxiv.org/abs/2006.11239",
    note: "Foundational research on learning to reverse a gradual noising process for image generation."
  },
  tfVae: {
    title: "TensorFlow: Convolutional Variational Autoencoder",
    url: "https://www.tensorflow.org/tutorials/generative/cvae",
    note: "Official worked implementation linking latent variables, reconstruction, sampling, and generation."
  },
  tfGan: {
    title: "TensorFlow: Deep Convolutional GAN",
    url: "https://www.tensorflow.org/tutorials/generative/dcgan",
    note: "Official implementation of a generator, discriminator, loss functions, and adversarial training loop."
  },
  diffusionCourse: {
    title: "Hugging Face Diffusion Course",
    url: "https://huggingface.co/learn/diffusion-course/en/unit0/1",
    note: "Practical course connecting diffusion intuition with training, sampling, guidance, and latent diffusion."
  },
  latentDiffusion: {
    title: "High-Resolution Image Synthesis with Latent Diffusion Models",
    url: "https://arxiv.org/abs/2112.10752",
    note: "Original latent diffusion research behind the compressed-latent approach used by Stable Diffusion."
  },
  diffusers: {
    title: "Hugging Face Diffusers: Training",
    url: "https://huggingface.co/docs/diffusers/training/overview",
    note: "Official implementation guidance for training and adapting diffusion pipelines."
  },
  classifierFree: {
    title: "Classifier-Free Diffusion Guidance",
    url: "https://arxiv.org/abs/2207.12598",
    note: "Original method for combining conditional and unconditional score estimates to control guidance strength."
  },
  controlNet: {
    title: "Adding Conditional Control to Text-to-Image Diffusion Models",
    url: "https://arxiv.org/abs/2302.05543",
    note: "Original ControlNet paper for spatial conditioning such as edges, depth, segmentation, and pose."
  },
  dreambooth: {
    title: "DreamBooth: Fine Tuning Text-to-Image Diffusion Models for Subject-Driven Generation",
    url: "https://arxiv.org/abs/2208.12242",
    note: "Research on personalizing a pretrained text-to-image model from a small set of subject images."
  },
  lora: {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    url: "https://arxiv.org/abs/2106.09685",
    note: "Original low-rank adaptation paper; the same parameter-efficient principle is widely applied to image-model adapters."
  },
  clip: {
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    url: "https://arxiv.org/abs/2103.00020",
    note: "Original CLIP research on learning aligned image and text representations from paired examples."
  },
  flamingo: {
    title: "Flamingo: a Visual Language Model for Few-Shot Learning",
    url: "https://arxiv.org/abs/2204.14198",
    note: "Research on few-shot visual-language models that process interleaved text, image, and video inputs."
  },
  imageBind: {
    title: "ImageBind: One Embedding Space To Bind Them All",
    url: "https://arxiv.org/abs/2305.05665",
    note: "Research on a joint representation space spanning image, text, audio, depth, thermal, and motion signals."
  },
  audioLm: {
    title: "AudioLM: a Language Modeling Approach to Audio Generation",
    url: "https://arxiv.org/abs/2209.03143",
    note: "Research on discrete audio representations and language-model-based generation with long-term coherence."
  },
  musicLm: {
    title: "MusicLM: Generating Music From Text",
    url: "https://arxiv.org/abs/2301.11325",
    note: "Research on hierarchical text-conditioned music generation."
  },
  videoPoet: {
    title: "VideoPoet: A Large Language Model for Zero-Shot Video Generation",
    url: "https://arxiv.org/abs/2312.14125",
    note: "Research on a language-model approach to zero-shot video and multimodal generation."
  },
  ctgan: {
    title: "Modeling Tabular data using Conditional GAN",
    url: "https://arxiv.org/abs/1907.00503",
    note: "Original CTGAN work for mixed continuous and discrete tabular synthetic data."
  },
  timeGan: {
    title: "Time-series Generative Adversarial Networks",
    url: "https://papers.nips.cc/paper_files/paper/2019/file/c9efe5f26cd17ba6216bbe2a7d26d490-Paper.pdf",
    note: "Original TimeGAN research on generating sequences while preserving temporal dynamics."
  },
  fid: {
    title: "GANs Trained by a Two Time-Scale Update Rule Converge to a Local Nash Equilibrium",
    url: "https://arxiv.org/abs/1706.08500",
    note: "Introduces the Fréchet Inception Distance (FID) alongside a two-time-scale GAN training rule."
  },
  helm: {
    title: "Holistic Evaluation of Language Models",
    url: "https://arxiv.org/abs/2211.09110",
    note: "Research framework for evaluating language models across multiple scenarios and metrics rather than one score."
  },
  nistGenAI: {
    title: "NIST AI 600-1: Artificial Intelligence Risk Management Framework — Generative AI Profile",
    url: "https://doi.org/10.6028/NIST.AI.600-1",
    note: "NIST profile for identifying, measuring, and managing risks across the generative-AI lifecycle."
  },
  owaspLlm: {
    title: "OWASP GenAI LLM Top 10 (2026)",
    url: "https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/",
    note: "Current community guidance on security risks and mitigations for LLM-powered applications."
  },
  structuredOutputs: {
    title: "OpenAI API: Structured Outputs",
    url: "https://developers.openai.com/api/docs/guides/structured-outputs",
    note: "Official guidance on constraining model outputs to a JSON Schema for downstream validation."
  },
  vllmPaper: {
    title: "Efficient Memory Management for Large Language Model Serving with PagedAttention",
    url: "https://arxiv.org/abs/2309.06180",
    note: "Original PagedAttention research underlying vLLM's KV-cache memory management and high-throughput serving."
  },
  vllmDocs: {
    title: "vLLM Documentation",
    url: "https://docs.vllm.ai/en/latest/",
    note: "Current serving documentation for batching, parallelism, scheduling, and deployment."
  },
  openaiModels: {
    title: "OpenAI API: Models",
    url: "https://developers.openai.com/api/docs/models",
    note: "Current model documentation for comparing supported capabilities, context limits, and API usage."
  }
} satisfies Record<string, LessonReference>;

const referencesByTopic: Record<string, LessonReference[]> = {
  "agentic-ai-intro": [refs.react, refs.hfAgents, refs.openaiAgents],
  "tool-calling": [refs.functionCalling, refs.toolformer, refs.mcpTools],
  "building-ai-agent": [refs.openaiAgents, refs.hfAgents, refs.functionCalling],
  "planning-reflection": [refs.react, refs.reflexion],
  "agent-context-engineering": [refs.tokenCounting, refs.compaction, refs.conversationState],
  "agent-memory": [refs.langgraphMemory, refs.reflexion],
  "agent-state-graphs": [refs.langgraph, refs.langgraphState],
  "durable-long-running-agents": [refs.langgraphPersistence, refs.crewai, refs.conversationState],
  "agentic-rag": [refs.selfRag, refs.correctiveRag],
  "multi-agent-systems": [refs.autogen, refs.crewai],
  "model-context-protocol": [refs.mcpSpec, refs.mcpTools],
  "agent-frameworks": [refs.langgraph, refs.crewai, refs.autogen],
  "browser-computer-use-agents": [refs.osworld, refs.agentDojo],
  "agent-security": [refs.owaspAgentic, refs.agentDojo, refs.mcpTools],
  "agent-evaluation-safety": [refs.agentBench, refs.agentDojo, refs.osworld],
  "agent-observability-deployment": [refs.openTelemetryGenAI, refs.langgraph, refs.openaiAgents],
  "generative-ai-intro": [refs.gan, refs.vae, refs.ddpm],
  "generative-vs-discriminative": [refs.gan, refs.vae],
  "how-generative-models-learn": [refs.vae, refs.ddpm, refs.gan],
  "vae": [refs.vae, refs.tfVae],
  "gans": [refs.gan, refs.tfGan],
  "diffusion-models": [refs.ddpm, refs.diffusionCourse],
  "stable-latent-diffusion": [refs.latentDiffusion, refs.diffusers],
  "controlling-diffusion-models": [refs.classifierFree, refs.controlNet],
  "finetuning-image-models": [refs.dreambooth, refs.lora, refs.diffusers],
  "multimodal-ai": [refs.clip, refs.flamingo, refs.imageBind],
  "audio-music-video-generation": [refs.audioLm, refs.musicLm, refs.videoPoet],
  "synthetic-data": [refs.ctgan, refs.timeGan],
  "evaluating-generative-models": [refs.fid, refs.helm],
  "responsible-generative-ai": [refs.nistGenAI, refs.owaspLlm],
  "choosing-generative-model": [refs.helm, refs.openaiModels, refs.nistGenAI],
  "building-genai-apps": [refs.functionCalling, refs.structuredOutputs],
  "genai-deployment": [refs.vllmPaper, refs.vllmDocs]
};

export const AGENTIC_LESSON_IDS = [
  "agentic-ai-intro", "tool-calling", "building-ai-agent", "planning-reflection",
  "agent-context-engineering", "agent-memory", "agent-state-graphs", "durable-long-running-agents",
  "agentic-rag", "multi-agent-systems", "model-context-protocol", "agent-frameworks",
  "browser-computer-use-agents", "agent-security", "agent-evaluation-safety", "agent-observability-deployment"
] as const;

export const GENERATIVE_AI_LESSON_IDS = [
  "generative-ai-intro", "generative-vs-discriminative", "how-generative-models-learn",
  "vae", "gans", "diffusion-models", "stable-latent-diffusion", "controlling-diffusion-models",
  "finetuning-image-models", "multimodal-ai", "audio-music-video-generation", "synthetic-data",
  "evaluating-generative-models", "responsible-generative-ai", "choosing-generative-model",
  "building-genai-apps", "genai-deployment"
] as const;

export function getVerifiedModernAILessonReferences(topicId: string): LessonReference[] {
  return referencesByTopic[topicId] ?? [];
}

export function getAllVerifiedModernAIReferences(): Record<string, LessonReference[]> {
  return referencesByTopic;
}
