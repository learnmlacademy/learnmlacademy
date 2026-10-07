export type InterviewHandbookId =
  | 'ml'
  | 'deep-learning'
  | 'generative-ai'
  | 'llm-rag'
  | 'agentic-ai'
  | 'python'
  | 'sql'
  | 'system-design'
  | 'mlops'
  | 'behavioral';

export type InterviewHandbookConfig = {
  guideId: InterviewHandbookId;
  title: string;
  shortTitle: string;
  description: string;
  filename: string;
};

export const interviewHandbooks: Record<InterviewHandbookId, InterviewHandbookConfig> = {
  ml: {
    guideId: 'ml',
    title: 'Free Download: ML Interview Cheatsheet',
    shortTitle: 'ML Interview Cheatsheet',
    description:
      '100 essential Machine Learning interview questions and answers covering foundations, algorithms, evaluation, deep learning, Python, system design and interview strategy.',
    filename: 'ML_Interview_Cheatsheet.pdf',
  },
  'deep-learning': {
    guideId: 'deep-learning',
    title: 'Free Download: Deep Learning Interview Handbook',
    shortTitle: 'Deep Learning Interview Handbook',
    description:
      'A detailed Deep Learning interview handbook with neural networks, backpropagation, CNNs, sequence models, Transformers, worked examples, code and production questions.',
    filename: 'Deep_Learning_Interview_Handbook_2026.pdf',
  },
  'generative-ai': {
    guideId: 'generative-ai',
    title: 'Free Download: Generative AI Interview Handbook',
    shortTitle: 'Generative AI Interview Handbook',
    description:
      'A detailed Generative AI interview handbook covering generative modelling, GANs, VAEs, diffusion, multimodal systems, evaluation, safety, examples and practical code.',
    filename: 'Generative_AI_Interview_Handbook_2026.pdf',
  },
  'llm-rag': {
    guideId: 'llm-rag',
    title: 'Free Download: LLM & RAG Interview Handbook',
    shortTitle: 'LLM & RAG Interview Handbook',
    description:
      'A detailed LLM and RAG interview handbook covering Transformers, embeddings, vector search, chunking, retrieval, reranking, evaluation, safety, serving and system design.',
    filename: 'LLM_RAG_Interview_Handbook_2026.pdf',
  },
  'agentic-ai': {
    guideId: 'agentic-ai',
    title: 'Free Download: Agentic AI Interview Handbook',
    shortTitle: 'Agentic AI Interview Handbook',
    description:
      'A detailed Agentic AI interview handbook covering tool calling, planning, memory, context, state graphs, agentic RAG, MCP, multi-agent systems, safety and evaluation.',
    filename: 'Agentic_AI_Interview_Handbook_2026.pdf',
  },
  python: {
    guideId: 'python',
    title: 'Free Download: Python for ML & AI Interviews',
    shortTitle: 'Python for ML & AI Interviews',
    description:
      'Solved Python interview problems for ML and AI roles with reasoning, code, dry runs, complexity, edge cases and practical data-processing patterns.',
    filename: 'Python_for_ML_AI_Interviews_2026.pdf',
  },
  sql: {
    guideId: 'sql',
    title: 'Free Download: SQL for Data & AI Interviews',
    shortTitle: 'SQL for Data & AI Interviews',
    description:
      'Solved SQL interview problems for data and AI roles with sample tables, step-by-step query logic, window functions, joins, analytics patterns and expected outputs.',
    filename: 'SQL_for_Data_AI_Interviews_2026.pdf',
  },
  'system-design': {
    guideId: 'system-design',
    title: 'Free Download: ML/AI System Design Interview Handbook',
    shortTitle: 'ML/AI System Design Interview Handbook',
    description:
      'Detailed ML and AI system-design cases covering requirements, architecture, data and feature pipelines, serving, scale, metrics, failure modes and trade-offs.',
    filename: 'ML_AI_System_Design_Interview_Handbook_2026.pdf',
  },
  mlops: {
    guideId: 'mlops',
    title: 'Free Download: MLOps & Production AI Interview Handbook',
    shortTitle: 'MLOps & Production AI Interview Handbook',
    description:
      'A detailed production AI handbook covering pipelines, CI/CD, registries, deployment, monitoring, drift, reliability, incident debugging and production trade-offs.',
    filename: 'MLOps_Production_AI_Interview_Handbook_2026.pdf',
  },
  behavioral: {
    guideId: 'behavioral',
    title: 'Free Download: Behavioral & Project Interview Handbook',
    shortTitle: 'Behavioral & Project Interview Handbook',
    description:
      'A practical behavioral and project interview handbook with STAR frameworks, project deep dives, stakeholder scenarios, leadership questions and answer structures.',
    filename: 'Behavioral_Project_Interview_Handbook_2026.pdf',
  },
};

export const defaultInterviewHandbook = interviewHandbooks.ml;

const topicGuideMap: Record<string, InterviewHandbookId> = {
  'ml-interview-questions': 'ml',
  'deep-learning-interview-questions': 'deep-learning',
  'genai-llm-rag-interview': 'llm-rag',
  'agentic-ai-interview': 'agentic-ai',
  'python-ai-ml-interview': 'python',
  'sql-ai-data-interview': 'sql',
  'ml-ai-system-design-interview': 'system-design',
  'mlops-production-interview': 'mlops',
  'behavioral-project-interview': 'behavioral',
};

const blogGuideMap: Record<string, InterviewHandbookId> = {
  'ml-interview-prep-guide': 'ml',
  'deep-learning-interview-prep-guide': 'deep-learning',
  'generative-ai-interview-prep-guide': 'generative-ai',
  'llm-rag-interview-prep-guide': 'llm-rag',
  'agentic-ai-interview-prep-guide': 'agentic-ai',
  'ai-engineering-mlops-interview-prep-guide': 'mlops',
};

export function getInterviewHandbookForTopic(topicId: string): InterviewHandbookConfig {
  return interviewHandbooks[topicGuideMap[topicId] ?? 'ml'];
}

export function getInterviewHandbookForBlog(slug: string): InterviewHandbookConfig {
  return interviewHandbooks[blogGuideMap[slug] ?? 'ml'];
}
