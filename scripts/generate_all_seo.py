import json
import re

with open('scripts/topics-list.json') as f:
    topics = json.load(f)

# Define specific high-CTR titles and action prefixes for key topics
custom = {
    # Flagship & Priority Module 13 (Agentic AI)
    "tool-calling": (
        "AI Agent Tool Calling in Python: Schema Validation, Idempotency & Retries | LearnMLAcademy",
        "Master AI agent tool calling, schema validation, and safe error retries"
    ),
    "agentic-ai-intro": (
        "What Is Agentic AI? Autonomous Agents vs Workflows: 2026 Guide | LearnMLAcademy",
        "Learn autonomous AI agent architectures, deterministic workflows, and state graphs"
    ),
    "building-ai-agent": (
        "Build an Autonomous AI Agent from Scratch in Python: Step-by-Step | LearnMLAcademy",
        "Build an autonomous AI agent from scratch with step-by-step reasoning"
    ),
    "planning-reflection": (
        "Agent Planning, ReAct & Reflection in Python: Architecture & Code | LearnMLAcademy",
        "Implement AI agent planning loops, ReAct reasoning, and self-reflection"
    ),
    "agent-context-engineering": (
        "Context Engineering for AI Agents: Budgets & Compaction 2026 Guide | LearnMLAcademy",
        "Optimize AI agent context windows with token budgets and smart compaction"
    ),
    "agent-memory": (
        "AI Agent Memory Systems: Short-Term, Long-Term & Vector Memory Guide | LearnMLAcademy",
        "Design AI agent memory using short-term state and long-term vector storage"
    ),
    "agent-state-graphs": (
        "Agent State Graphs & Workflows in Python: LangGraph 2026 Guide | LearnMLAcademy",
        "Build reliable agent workflows, cyclical state graphs, and checkpoints"
    ),
    "durable-long-running-agents": (
        "Durable & Long-Running AI Agents: Human-in-the-Loop & 2026 Guide | LearnMLAcademy",
        "Implement durable long-running AI agents with human-in-the-loop checkpoints"
    ),
    "agentic-rag": (
        "Agentic RAG in Python: Router, Multi-Hop Search & Self-Correction | LearnMLAcademy",
        "Build agentic RAG systems with intelligent routing and self-correcting retrieval"
    ),
    "multi-agent-systems": (
        "Multi-Agent Systems in Python: Handoffs, Consensus & 2026 Guide | LearnMLAcademy",
        "Architect multi-agent systems with role delegation, handoffs, and consensus"
    ),
    "model-context-protocol": (
        "Model Context Protocol (MCP) Tutorial: AI Agent Interoperability & Python Example | LearnMLAcademy",
        "Implement Model Context Protocol (MCP) clients and servers for AI tools"
    ),
    "agent-frameworks": (
        "AI Agent Frameworks Compared: LangGraph vs CrewAI vs AutoGen Guide | LearnMLAcademy",
        "Compare top AI agent frameworks including LangGraph, CrewAI, and AutoGen"
    ),
    "browser-computer-use-agents": (
        "Browser & Computer-Use AI Agents in Python: Sandboxing 2026 Guide | LearnMLAcademy",
        "Build browser automation and computer-use AI agents with safe sandboxing"
    ),
    "agent-security": (
        "AI Agent Security: Prompt Injection, Guardrails & 2026 Guide | LearnMLAcademy",
        "Secure AI agents against prompt injection, privilege escalation, and loops"
    ),
    "agent-evaluation-safety": (
        "Evaluating AI Agents: Trajectory Benchmarks & Safety 2026 Guide | LearnMLAcademy",
        "Evaluate AI agent performance with trajectory benchmarks and safety metrics"
    ),
    "agent-observability-deployment": (
        "AI Agent Observability: Tracing, Latency, Cost & Deployment Guide | LearnMLAcademy",
        "Monitor production AI agents with distributed tracing, latency, and cost alerts"
    ),

    # Module 12 (Large Language Models & RAG)
    "rag": (
        "Retrieval-Augmented Generation (RAG) Architecture | ML Academy",
        "Understand Retrieval-Augmented Generation (RAG): indexing vs query phases, source attribution, failure boundaries, diagrams, and self-check quiz"
    ),
    "llm-intro": (
        "What Are Large Language Models? Architecture, Scaling & 2026 Guide | LearnMLAcademy",
        "Understand modern Large Language Model architectures, scaling laws, and pretraining"
    ),
    "tokenization-embeddings": (
        "LLM Tokenization & Embeddings in Python: BPE, RoPE & Context Guide | LearnMLAcademy",
        "Master Byte-Pair Encoding (BPE) tokenization, rotary embeddings, and context"
    ),
    "transformers-attention": (
        "Transformer Architecture & Self-Attention in Python: Math & Code | LearnMLAcademy",
        "Understand Transformer multi-head self-attention mechanics and QKV math"
    ),
    "text-generation-decoding": (
        "LLM Text Generation & Decoding in Python: Beam Search & Top-P Guide | LearnMLAcademy",
        "Control LLM text generation using temperature, top-k, top-p, and beam search"
    ),
    "prompt-engineering": (
        "Prompt Engineering & Structured Outputs in Python: 2026 Guide | LearnMLAcademy",
        "Design production prompts with few-shot examples and Pydantic structured schemas"
    ),
    "pretraining-finetuning": (
        "How LLMs Are Trained: Pretraining, Compute Scaling & 2026 Guide | LearnMLAcademy",
        "Explore how modern foundation LLMs are pretrained at scale on massive compute"
    ),
    "instruction-tuning-rlhf": (
        "Fine-Tuning LLMs with LoRA, SFT & RLHF in Python: 2026 Guide | LearnMLAcademy",
        "Fine-tune LLMs efficiently using Supervised Fine-Tuning (SFT) and LoRA adapters"
    ),
    "semantic-search-embeddings": (
        "Semantic Search with Neural Embeddings in Python: 2026 Guide | LearnMLAcademy",
        "Build semantic search engines using dense neural embeddings and cosine similarity"
    ),
    "vector-databases": (
        "Vector Databases for LLMs: Pinecone, Qdrant & Milvus 2026 Guide | LearnMLAcademy",
        "Select and query vector databases using HNSW indexing and metadata filtering"
    ),
    "advanced-rag": (
        "Advanced RAG in Python: Chunking, Reranking & Hybrid Search Guide | LearnMLAcademy",
        "Optimize RAG pipelines with semantic chunking, cross-encoder rerankers, and hybrid search"
    ),
    "llm-evaluation": (
        "Evaluating LLMs: Benchmarks, MMLU & RAG Triad in Python Guide | LearnMLAcademy",
        "Evaluate LLM output accuracy using MMLU benchmarks, RAG Triad, and automated judges"
    ),
    "llm-hallucinations-safety": (
        "LLM Hallucinations & Guardrails: NeMo, Llama-Guard & 2026 Guide | LearnMLAcademy",
        "Detect and eliminate LLM hallucinations using NeMo Guardrails and safety filters"
    ),
    "reasoning-models": (
        "Reasoning Models & Test-Time Compute: Chain-of-Thought 2026 Guide | LearnMLAcademy",
        "Understand reasoning models, chain-of-thought prompting, and test-time compute"
    ),
    "efficient-llm-serving": (
        "Efficient LLM Serving: vLLM, PagedAttention & Quantization Guide | LearnMLAcademy",
        "Serve LLMs at scale with vLLM PagedAttention, KV cache reuse, and quantization"
    ),
    "llmops": (
        "LLMOps in Production: Evaluation, Tracing, Cost & 2026 Guide | LearnMLAcademy",
        "Deploy and monitor enterprise LLM applications with tracing and latency budgets"
    ),

    # Module 11 (Generative AI)
    "generative-ai-intro": (
        "What is Generative AI? Architecture, Models & Python 2026 Guide | LearnMLAcademy",
        "Discover how Generative AI models synthesize novel text, images, and audio"
    ),
    "generative-vs-discriminative": (
        "Generative vs Discriminative Models in Python: Math, Examples & Guide | LearnMLAcademy",
        "Compare generative versus discriminative models with joint and conditional math"
    ),
    "how-generative-models-learn": (
        "How Generative Models Learn Data Distributions: 2026 Guide | LearnMLAcademy",
        "Understand how generative models estimate and sample high-dimensional data distributions"
    ),
    "vae": (
        "Variational Autoencoders (VAEs) in Python: Math, Architecture & Code | LearnMLAcademy",
        "Implement Variational Autoencoders (VAEs) using the reparameterization trick"
    ),
    "gans": (
        "Generative Adversarial Networks (GANs) in Python: Architecture & Code | LearnMLAcademy",
        "Train Generative Adversarial Networks (GANs) using minimax loss and DCGAN code"
    ),
    "diffusion-models": (
        "Diffusion Models from Scratch in Python: Math, Noise Schedules & Code | LearnMLAcademy",
        "Derive diffusion models from scratch using forward noise and reverse denoising"
    ),
    "stable-latent-diffusion": (
        "Stable Diffusion & Latent Architecture in Python: UNet & VAE Guide | LearnMLAcademy",
        "Explore Latent Stable Diffusion architectures with UNet denoisers and VAE latent spaces"
    ),
    "controlling-diffusion-models": (
        "ControlNet & Guided Diffusion in Python: Architecture & 2026 Guide | LearnMLAcademy",
        "Control image generation with ControlNet, edge maps, and classifier-free guidance"
    ),
    "finetuning-image-models": (
        "Fine-Tuning Diffusion Models: LoRA & DreamBooth in Python Guide | LearnMLAcademy",
        "Fine-tune image diffusion models using LoRA weights and DreamBooth personalization"
    ),
    "multimodal-ai": (
        "Multimodal Generative AI in Python: CLIP, Vision-Language & Code | LearnMLAcademy",
        "Connect text and visual modalities using CLIP contrastive embeddings and vision encoders"
    ),
    "audio-music-video-generation": (
        "AI Audio, Speech & Video Generation: Architecture & Python Guide | LearnMLAcademy",
        "Synthesize realistic audio, speech, music, and video using modern diffusion"
    ),
    "synthetic-data": (
        "Synthetic Data Generation in Python: CTGAN, Privacy & 2026 Guide | LearnMLAcademy",
        "Generate privacy-preserving synthetic tabular and text datasets using CTGAN"
    ),
    "evaluating-generative-models": (
        "Evaluating Generative AI: FID, IS, BLEU, ROUGE & Perplexity Guide | LearnMLAcademy",
        "Evaluate generative image and text models using FID scores and perplexity"
    ),
    "responsible-generative-ai": (
        "Responsible Generative AI: Safety, Bias & Watermarking 2026 Guide | LearnMLAcademy",
        "Implement responsible AI governance, synthetic watermarking, and bias detection"
    ),
    "choosing-generative-model": (
        "Choosing Generative Models: VAEs vs GANs vs Diffusion 2026 Guide | LearnMLAcademy",
        "Select the optimal generative model architecture based on latency and fidelity"
    ),
    "building-genai-apps": (
        "Building GenAI Applications in Python: Architecture, APIs & Code | LearnMLAcademy",
        "Build production Generative AI applications with streaming APIs and caching"
    ),
    "genai-deployment": (
        "Deploying Generative AI Applications: vLLM, Streaming & 2026 Guide | LearnMLAcademy",
        "Deploy generative models to production with auto-scaling and low-latency endpoints"
    ),

    # Module 15 (AI Engineering & MLOps)
    "ai-engineering-mlops": (
        "AI Engineering & MLOps in Production: Notebook to FastAPI Guide | LearnMLAcademy",
        "Transition machine learning models from prototype notebooks to production APIs"
    ),
    "ml-data-feature-pipelines": (
        "Production ML Data & Feature Pipelines in Python: 2026 Guide | LearnMLAcademy",
        "Build scalable ML data and feature pipelines with automated schema validation"
    ),
    "experiment-tracking-model-registry": (
        "MLflow Experiment Tracking & Model Registry in Python Guide | LearnMLAcademy",
        "Track machine learning experiments and manage model versions using MLflow"
    ),
    "batch-online-inference": (
        "Batch vs Online vs Streaming ML Inference: Architecture & Code | LearnMLAcademy",
        "Design batch, real-time online, and event streaming inference architectures"
    ),
    "ml-cicd-continuous-training": (
        "CI/CD for Machine Learning & Continuous Training (CT) 2026 Guide | LearnMLAcademy",
        "Implement automated CI/CD pipelines, integration testing, and continuous retraining"
    ),
    "ml-monitoring-drift": (
        "ML Monitoring & Data Drift Detection in Python: Evidently Guide | LearnMLAcademy",
        "Detect data drift, concept drift, and performance decay using Evidently metrics"
    ),
    "production-ai-reliability": (
        "Production AI Reliability, Cost Budgets & Security 2026 Guide | LearnMLAcademy",
        "Ensure production AI system reliability, cost optimization, and API security"
    ),
    "ml-system-design": (
        "End-to-End ML/AI System Design: Production Architecture Guide | LearnMLAcademy",
        "Master end-to-end ML system design interviews with scalable architectures"
    ),

    # Module 16 (Career & Interview Preparation)
    "ai-data-career-paths": (
        "AI & Data Career Paths: ML Engineer vs Data Scientist 2026 Guide | LearnMLAcademy",
        "Navigate high-growth AI and data science career paths, salaries, and skills"
    ),
    "ml-engineer-roadmap": (
        "Machine Learning Engineer Roadmap 2026: Skills, Math & Projects | LearnMLAcademy",
        "Follow the comprehensive 2026 Machine Learning Engineer study and skills roadmap"
    ),
    "ai-engineer-roadmap": (
        "AI Engineer Roadmap 2026: LLMs, RAG, Agents & Production Tools | LearnMLAcademy",
        "Master the 2026 AI Engineer curriculum covering LLMs, RAG, and agent frameworks"
    ),
    "genai-llm-engineer-roadmap": (
        "Generative AI & LLM Engineer Roadmap 2026: Complete Guide | LearnMLAcademy",
        "Accelerate your career with the Generative AI and LLM Engineer roadmap"
    ),
    "data-scientist-roadmap": (
        "Data Scientist Career Roadmap 2026: Statistics, Python & ML | LearnMLAcademy",
        "Explore the modern Data Scientist roadmap covering statistics, SQL, and modeling"
    ),
    "interview-preparation-strategy": (
        "How to Prepare for AI & ML Technical Interviews: 2026 Guide | LearnMLAcademy",
        "Prepare effectively for technical AI and machine learning interviews at top tech"
    ),
    "ml-interview-questions": (
        "Top 100 Machine Learning Interview Questions & Detailed Answers | LearnMLAcademy",
        "Ace machine learning interviews with top 100 solved theory and math questions"
    ),
    "deep-learning-interview-questions": (
        "Top Deep Learning Interview Questions & Solved Answers: 2026 Guide | LearnMLAcademy",
        "Master essential Deep Learning interview questions on CNNs, RNNs, and Transformers"
    ),
    "genai-llm-rag-interview": (
        "Generative AI, LLM & RAG Interview Questions: Solved 2026 Guide | LearnMLAcademy",
        "Prepare for Generative AI, LLM, and RAG interview rounds with solved questions"
    ),
    "agentic-ai-interview": (
        "Top Agentic AI Interview Questions & Architectures: 2026 Guide | LearnMLAcademy",
        "Prepare for Agentic AI interviews covering tool design, memory, and multi-agent coordination"
    ),
    "python-ai-ml-interview": (
        "Python Coding for Machine Learning Interviews: Solved Problems | LearnMLAcademy",
        "Practice essential Python coding problems asked in machine learning interviews"
    ),
    "sql-ai-data-interview": (
        "SQL Coding for Data & AI Interviews: Window Functions & Queries | LearnMLAcademy",
        "Solve practical SQL interview questions using window functions and aggregations"
    ),
    "ml-ai-system-design-interview": (
        "Machine Learning System Design Interview: Framework & Solved Cases | LearnMLAcademy",
        "Design scalable ML systems during interviews using proven structural frameworks"
    ),
    "mlops-production-interview": (
        "MLOps & Production AI Interview Questions: Debugging Scenarios | LearnMLAcademy",
        "Prepare for MLOps technical interviews with real-world debugging scenarios"
    ),
    "behavioral-project-interview": (
        "AI/ML Behavioral & Project Deep-Dive Interview: STAR Framework Guide | LearnMLAcademy",
        "Master behavioral and project deep-dive interviews using the STAR method"
    ),
}

suffix = ", with Python code, architecture diagrams, worked examples, and interview quiz."
suffix_len = len(suffix) # 79

verbs = ["Master", "Build", "Learn", "Understand", "Implement", "Train", "Optimize", "Explore", "Deploy"]

seo_dict = {}

for item in topics:
    tid = item["id"]
    title = item["title"]
    
    if tid in custom:
        seo_title, prefix = custom[tid]
    else:
        # High-CTR developer search pattern
        clean_name = re.sub(r'^\d+\.\s*', '', title)
        seo_title = f"{clean_name} in Python: Step-by-Step Architecture & Code | LearnMLAcademy"
        if len(seo_title) > 90:
            seo_title = f"{clean_name} Tutorial: Architecture & Code | LearnMLAcademy"
        if len(seo_title) > 90:
            seo_title = f"{clean_name} Guide: Architecture & Code | LearnMLAcademy"
        prefix = f"Master {clean_name.lower()} step by step and understand core concepts"

    # Ensure prefix length is between 61 and 81 characters
    # so that prefix + suffix is between 140 and 160 characters!
    current_desc = prefix + suffix
    if len(current_desc) < 140:
        # Pad prefix naturally
        diff = 140 - len(current_desc)
        prefix = prefix + " thoroughly"
        current_desc = prefix + suffix
    if len(current_desc) < 140:
        diff = 140 - len(current_desc)
        prefix = prefix.replace("Master ", "Master modern ")
        current_desc = prefix + suffix
    if len(current_desc) > 160:
        # Shorten prefix naturally
        excess = len(current_desc) - 160
        # Truncate prefix safely at a word boundary
        allowed_prefix_len = 160 - suffix_len
        words = prefix.split(" ")
        new_prefix = ""
        for w in words:
            if len(new_prefix) + len(w) + 1 <= allowed_prefix_len:
                new_prefix = (new_prefix + " " + w).strip()
            else:
                break
        prefix = new_prefix
        current_desc = prefix + suffix

    # Verify first word is an action verb
    first_word = prefix.split(" ")[0]
    if first_word not in verbs:
        prefix = "Master " + prefix[0].lower() + prefix[1:]
        current_desc = prefix + suffix

    # Final length clamp within 140-160
    assert 140 <= len(current_desc) <= 160, f"Topic {tid}: desc length {len(current_desc)} out of range! '{current_desc}'"
    assert "Python code, architecture diagrams, worked examples, and interview quiz" in current_desc

    seo_dict[tid] = {
        "title": seo_title,
        "description": current_desc
    }

print(f"Successfully processed all {len(seo_dict)} topics.")
with open("scripts/new-seo-data.json", "w") as f:
    json.dump(seo_dict, f, indent=2)
