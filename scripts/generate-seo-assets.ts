import fs from 'node:fs';
import path from 'node:path';
import { curriculum } from '../src/data/curriculum.ts';
import { projectPortfolio } from '../src/data/projectPortfolio.ts';
import { blogPosts } from '../src/data/blog.ts';
import { interviewHandbooks, type InterviewHandbookId } from '../src/data/interviewHandbooks.ts';
import { getSEOData } from '../src/utils/seo.ts';

const BASE_URL = 'https://www.learnmlacademy.com';
const TODAY = '2026-03-28';

// ─────────────────────────────────────────────────────────────────────────────
// 1. SITEMAP.XML GENERATION
// ─────────────────────────────────────────────────────────────────────────────
interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

const staticCorePages: SitemapEntry[] = [
  { url: '/', lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
  { url: '/curriculum', lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
  { url: '/projects', lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
  { url: '/blog', lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },
  { url: '/about', lastmod: TODAY, changefreq: 'weekly', priority: '0.7' },
  { url: '/cheatsheet', lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },
  { url: '/contact', lastmod: TODAY, changefreq: 'monthly', priority: '0.5' },
  { url: '/privacy', lastmod: '2026-01-01', changefreq: 'weekly', priority: '0.3' },
  { url: '/terms', lastmod: '2026-01-01', changefreq: 'weekly', priority: '0.3' },
  { url: '/disclaimer', lastmod: '2026-01-01', changefreq: 'weekly', priority: '0.3' },
];

const verifiedTopicLastmods: Record<string, string[]> = {
  '2026-09-28': [
    'agentic-ai-intro',
    'tool-calling',
    'building-ai-agent',
    'planning-reflection',
    'agent-context-engineering',
    'agent-memory',
    'agent-state-graphs',
    'durable-long-running-agents',
    'agentic-rag',
    'multi-agent-systems',
    'model-context-protocol',
    'agent-frameworks',
    'browser-computer-use-agents',
    'agent-security',
    'agent-evaluation-safety',
    'agent-observability-deployment',
  ],
  '2026-09-27': [
    'generative-ai-intro',
    'generative-vs-discriminative',
    'how-generative-models-learn',
    'vae',
    'gans',
    'diffusion-models',
    'stable-latent-diffusion',
    'controlling-diffusion-models',
    'finetuning-image-models',
    'multimodal-ai',
    'audio-music-video-generation',
    'synthetic-data',
    'evaluating-generative-models',
    'responsible-generative-ai',
    'choosing-generative-model',
    'building-genai-apps',
    'genai-deployment',
    'llm-intro',
    'tokenization-embeddings',
    'transformers-attention',
    'text-generation-decoding',
    'prompt-engineering',
    'pretraining-finetuning',
    'instruction-tuning-rlhf',
    'rag',
    'semantic-search-embeddings',
    'vector-databases',
    'advanced-rag',
    'llm-evaluation',
    'llm-hallucinations-safety',
    'reasoning-models',
    'efficient-llm-serving',
    'llmops',
  ],
};

const topicLastmodMap = new Map<string, string>();
for (const [date, ids] of Object.entries(verifiedTopicLastmods)) {
  for (const id of ids) {
    topicLastmodMap.set(id, date);
  }
}

const allTopics = curriculum.flatMap(c => c.subtopics);

const projectRoutes: string[] = [
  '/projects/retail-forecasting',
  '/projects/disaster-tweets',
  '/projects/digit-recognizer',
  '/projects/titanic-survival',
  '/projects/house-price',
  '/projects/movie-recommender',
  '/projects/credit-card-fraud',
  '/projects/customer-segmentation',
  '/projects/pdf-rag/semantic',
  '/projects/pdf-rag',
  '/projects/ai-content-creator',
  '/projects/ai-research-assistant',
  '/projects/model-to-production',
];

const sitemapEntries: SitemapEntry[] = [
  ...staticCorePages,
  ...projectRoutes.map(route => ({
    url: route,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    priority: '0.8',
  })),
  ...allTopics.map(t => ({
    url: `/learn/${t.id}`,
    lastmod: topicLastmodMap.get(t.id) || TODAY,
    changefreq: 'weekly' as const,
    priority: '0.8',
  })),
  ...blogPosts.map(p => ({
    url: `/blog/${p.slug}`,
    lastmod: p.date || TODAY,
    changefreq: 'weekly' as const,
    priority: '0.7',
  })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    entry => `  <url>
    <loc>${BASE_URL}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

// ─────────────────────────────────────────────────────────────────────────────
// 2. ROBOTS.TXT GENERATION
// ─────────────────────────────────────────────────────────────────────────────
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

// ─────────────────────────────────────────────────────────────────────────────
// 3. LLMS.TXT AND LLMS-FULL.TXT GENERATION (Standard /llms.txt spec)
// ─────────────────────────────────────────────────────────────────────────────
const handbookUrlMap: Record<InterviewHandbookId, string> = {
  ml: `${BASE_URL}/blog/ml-interview-prep-guide`,
  'deep-learning': `${BASE_URL}/blog/deep-learning-interview-prep-guide`,
  'generative-ai': `${BASE_URL}/blog/generative-ai-interview-prep-guide`,
  'llm-rag': `${BASE_URL}/blog/llm-rag-interview-prep-guide`,
  'agentic-ai': `${BASE_URL}/blog/agentic-ai-interview-prep-guide`,
  python: `${BASE_URL}/learn/python-ai-ml-interview`,
  sql: `${BASE_URL}/learn/sql-ai-data-interview`,
  'system-design': `${BASE_URL}/learn/ml-ai-system-design-interview`,
  mlops: `${BASE_URL}/blog/ai-engineering-mlops-interview-prep-guide`,
  behavioral: `${BASE_URL}/learn/behavioral-project-interview`,
};

const moduleSummaries: Record<string, string> = {
  foundations:
    'Mathematical prerequisites, linear algebra, calculus, probability, NumPy, Pandas, and exploratory data analysis.',
  'python-ml-libs':
    'Essential Python for ML, vectorized NumPy operations, Pandas DataFrames, data visualization, and scikit-learn.',
  'data-preprocessing':
    'Encoding strategies, standard scaling, feature selection, missing data imputation, and leakage-free pipeline design.',
  'supervised-learning':
    'Linear regression, logistic regression, decision trees, random forests, SVMs, Naive Bayes, and gradient boosting algorithms.',
  'ensemble-learning':
    'Bagging, boosting, AdaBoost, Gradient Boosting, XGBoost, LightGBM, CatBoost, stacking, and voting classifiers.',
  'unsupervised-learning':
    'K-Means, hierarchical clustering, DBSCAN, PCA dimensionality reduction, t-SNE, and anomaly detection.',
  'model-evaluation':
    'Cross-validation, ROC-AUC, PR curves, bias-variance tradeoff, leakage prevention, and model calibration.',
  'time-series':
    'Time-series decomposition, ARIMA, SARIMA, Prophet, chronological validation, and lag feature engineering.',
  'advanced-paradigms':
    'Semi-supervised learning, self-supervised representation, active learning, transfer learning, and few-shot learning.',
  'deep-learning':
    'Perceptrons, multilayer neural networks, backpropagation, CNNs, RNNs, LSTMs, Transformers, and PyTorch implementations.',
  'advanced-deep-learning':
    'State-Space Models (SSMs/Mamba), Graph Neural Networks (GNNs), Physics-Informed NNs (PINNs), and KANs.',
  'generative-ai':
    'VAEs, GANs, Latent Diffusion, Stable Diffusion, ControlNet, multimodal AI, and synthetic data generation.',
  'large-language-models':
    'Architecture of modern LLMs, tokenization, BPE, rotary embeddings (RoPE), KV cache, RAG, and fine-tuning.',
  'agentic-ai':
    'ReAct patterns, tool calling, memory management, multi-agent coordination, Model Context Protocol (MCP), and sandboxed execution.',
  projects:
    'Hands-on production machine learning and AI projects with verifiable code, datasets, and deployable Streamlit apps.',
  'ai-engineering-mlops':
    'Model deployment with FastAPI/Docker, quantization (AWQ/GGUF), vLLM serving, monitoring, and data drift detection.',
  'interview-preparation':
    'Technical questions, system design architecture, coding exercises, and behavioral frameworks for big-tech AI roles.',
};

const llmsTxt = `# LearnMLAcademy

> Free, production-grade Machine Learning, Deep Learning, Generative AI, Large Language Models (LLMs), and Agentic AI educational platform with step-by-step mathematical reasoning, original visual diagrams, and reproducible Python code.

LearnMLAcademy provides open-access tutorials, reproducible project handbooks, interactive knowledge checks, and interview preparation guides. All lessons are written for beginners through practitioners, peer-grounded in industry practices, and free of hype.

- Website: ${BASE_URL}
- Curriculum: ${BASE_URL}/curriculum
- Hands-On Projects: ${BASE_URL}/projects
- Technical Blog: ${BASE_URL}/blog
- Author: Prateek Sharan (${BASE_URL}/about)

## Curriculum Modules (17)

${curriculum
  .map(
    (c, i) => {
      const cleanTitle = c.title.replace(/^\d+\.\s*/, '');
      return `- [${i + 1}. ${cleanTitle}](${BASE_URL}/curriculum): ${moduleSummaries[c.id] || c.description || 'Comprehensive step-by-step module.'}`;
    }
  )
  .join('\n')}

## Core Lessons (167)

${allTopics
  .map(t => {
    const seo = getSEOData(t.id, t.title);
    return `- [${t.title}](${BASE_URL}/learn/${t.id}): ${seo.description}`;
  })
  .join('\n')}

## Hands-On Project Handbooks (12)

${projectPortfolio
  .map(p => {
    const toolsStr = p.tools ? ` Uses ${p.tools.slice(0, 5).join(', ')}.` : '';
    return `- [${p.title}](${BASE_URL}/projects/${p.id}): ${p.description}${toolsStr}`;
  })
  .join('\n')}

## Interview Preparation Handbooks (10)

${Object.values(interviewHandbooks)
  .map(h => {
    const url = handbookUrlMap[h.guideId] || `${BASE_URL}/blog`;
    return `- [${h.shortTitle}](${url}): ${h.description}`;
  })
  .join('\n')}

## Optional & Index Feeds

- Full Index: ${BASE_URL}/llms-full.txt
- XML Sitemap: ${BASE_URL}/sitemap.xml
- Crawl Policy: ${BASE_URL}/robots.txt
`;

const llmsFullTxt = `# LearnMLAcademy — Full Knowledge Directory

> Comprehensive technical directory of all 17 curriculum modules, 167 verified lessons, 12 hands-on project handbooks, and 10 interview preparation guides published on LearnMLAcademy.com.

Canonical Domain: ${BASE_URL}
License: CC BY-SA 4.0 / Code under MIT License
Author: Prateek Sharan (${BASE_URL}/about)

---

## 1. Curriculum Overview

${curriculum
  .map((cat, catIdx) => {
    return `### Module ${catIdx + 1}: ${cat.title}
- Overview: ${moduleSummaries[cat.id] || cat.description || ''}
- Canonical URL: ${BASE_URL}/curriculum
- Total Lessons: ${cat.subtopics.length}
- Lessons:
${cat.subtopics
  .map(st => {
    const seo = getSEOData(st.id, st.title);
    return `  - [${st.title}](${BASE_URL}/learn/${st.id}): ${seo.description}`;
  })
  .join('\n')}
`;
  })
  .join('\n\n')}

---

## 2. Hands-On Project Portfolio (12 Production Handbooks)

${projectPortfolio
  .map(proj => {
    return `### ${proj.title}
- Route: ${BASE_URL}/projects/${proj.id}
- Summary: ${proj.description}
- Build: ${proj.build}
- Tools: ${proj.tools?.join(', ') || 'Python, Scikit-learn, Streamlit'}
- Code Repository: https://github.com/learnmlacademy/learnmlacademy/tree/main/projects/${proj.id}
- Difficulty: ${proj.level}
- Build Time: ${proj.buildTime}
`;
  })
  .join('\n')}

---

## 3. Interview Preparation Guides (10 Handbooks)

${Object.values(interviewHandbooks)
  .map(guide => {
    const url = handbookUrlMap[guide.guideId] || `${BASE_URL}/blog`;
    return `### ${guide.shortTitle}
- URL: ${url}
- Description: ${guide.description}
`;
  })
  .join('\n')}

---

## 4. Technical Blog Articles (${blogPosts.length} Guides)

${blogPosts
  .map(post => {
    return `### ${post.title}
- URL: ${BASE_URL}/blog/${post.slug}
- Category: ${post.category} | Read time: ${post.readTime} min | Published: ${post.date}
- Excerpt: ${post.excerpt}
`;
  })
  .join('\n')}
`;

// ─────────────────────────────────────────────────────────────────────────────
// 4. WRITE ASSETS TO PUBLIC AND DIST
// ─────────────────────────────────────────────────────────────────────────────
const publicDir = path.resolve('public');
const distDir = path.resolve('dist');

fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf8');

console.log(
  `[SEO Assets] Successfully wrote sitemap.xml (${sitemapEntries.length} URLs), robots.txt, llms.txt, and llms-full.txt to public/`,
);

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf8');
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf8');
  console.log('[SEO Assets] Successfully mirrored SEO assets to dist/');
}
