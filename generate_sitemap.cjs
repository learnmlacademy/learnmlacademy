#!/usr/bin/env node
/**
 * generate_sitemap.cjs
 * Runs automatically before every build (see package.json "prebuild" script).
 * Reads all topic IDs and blog slugs and writes a complete sitemap.xml to public/.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.learnmlacademy.com';
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/curriculum', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/cheatsheet', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
];

// Read tutorial IDs directly from the curriculum so the sitemap cannot become stale.
const curriculumSource = fs.readFileSync(
  path.join(__dirname, 'src', 'data', 'curriculum.ts'),
  'utf8'
);
const topicIds = [...curriculumSource.matchAll(/\{\s*id:\s*"([^"]+)",\s*title:\s*"[^"]+"(?:,\s*module:\s*"[^"]+")?\s*\}/g)]
  .map(match => match[1]);

// Only publish <lastmod> when we have a verified date for a significant content change.
// Do not use the build date: rebuilding the site does not mean every page changed.
const verifiedTopicLastmods = {
  '2026-09-27': [
    // Generative AI — expanded and then reorganized into coherent chapter flows.
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

    // LLM & RAG — expanded with worked tutorials, then integrated into chapter flow.
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
  '2026-09-28': [
    // Agentic AI — expanded across all 16 lessons with illustrated, tested tutorials.
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
};

const topicLastmod = new Map();
for (const [date, ids] of Object.entries(verifiedTopicLastmods)) {
  for (const id of ids) {
    if (!topicIds.includes(id)) {
      throw new Error(`generate_sitemap.cjs: verified lastmod topic not found in curriculum: ${id}`);
    }
    topicLastmod.set(id, date);
  }
}

// Blog post slugs (kept in sync with src/data/blog.ts)
const blogSlugs = [
  'top-ml-algorithms-explained',
  'ml-interview-prep-guide',
  'overfitting-underfitting-guide',
  'feature-engineering-tips',
  'xgboost-vs-random-forest',
  'what-is-rag',
];

const urls = [
  ...staticPages.map(p => `
  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
  ...topicIds.map(id => {
    const lastmod = topicLastmod.get(id);
    return `
  <url>
    <loc>${BASE_URL}/learn/${id}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }),
  ...blogSlugs.map(slug => `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>
`;

const outDir = path.join(__dirname, 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');

const total = staticPages.length + topicIds.length + blogSlugs.length;
console.log(`generate_sitemap.cjs: wrote ${total} URLs to public/sitemap.xml (${topicLastmod.size} with verified lastmod dates)`);
