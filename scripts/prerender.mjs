import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

// Match the production React build that will hydrate these pages.
process.env.NODE_ENV = 'production';

const BASE_URL = 'https://www.learnmlacademy.com';
const DIST_DIR = path.resolve('dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function replaceHeadTag(html, regex, replacement) {
  // Restrict replacement to the head and remove duplicates, not just the first tag.
  return html.replace(/<head>([\s\S]*?)<\/head>/i, (_, head) =>
    `<head>${head.replace(new RegExp(regex.source, 'gi'), '')}    ${replacement}\n  </head>`);
}

function setPageMeta(html, { title, description, canonical, schema, category }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);

  html = replaceHeadTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${safeTitle}</title>`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="description" content="${safeDescription}" />`,
  );
  html = replaceHeadTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i,
    `<link rel="canonical" href="${safeCanonical}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:title" content="${safeTitle}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:description" content="${safeDescription}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:url" content="${safeCanonical}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="twitter:description" content="${safeDescription}" />`,
  );

  if (schema) {
    html = replaceHeadTag(html, /<meta\s+property="og:type"[^>]*>/i,
      '<meta property="og:type" content="article" />');
    html = replaceHeadTag(html, /<meta\s+property="og:site_name"[^>]*>/i,
      '<meta property="og:site_name" content="Learn ML Academy" />');
    html = replaceHeadTag(html, /<meta\s+property="article:section"[^>]*>/i,
      `<meta property="article:section" content="${escapeHtml(category.replace(/^\d+\.\s*/, ''))}" />`);
  }

  html = html.replace(/\s*<script[^>]+id="schema-topic"[^>]*>[\s\S]*?<\/script>/i, '');
  if (schema) {
    const safeSchema = schema.replaceAll('</script', '<\\/script');
    html = html.replace(
      '</head>',
      () => `    <script id="schema-topic" type="application/ld+json">${safeSchema}</script>\n  </head>`,
    );
  }

  return html;
}

export function outputPathForRoute(route) {
  if (route === '/') return TEMPLATE_PATH;
  const clean = route.replace(/^\/+|\/+$/g, '');
  // Vercel cleanUrls and Vite preview resolve /learn/id directly to /learn/id.html.
  // This avoids depending on a trailing slash to resolve a directory index.
  return path.join(DIST_DIR, `${clean}.html`);
}

const staticMeta = new Map([
  ['/', {
    title: 'ML Academy — Learn Machine Learning from Zero to Expert',
    description: 'Free machine learning tutorials covering Machine Learning, Deep Learning, Generative AI, LLMs, RAG and Agentic AI with worked examples and quizzes.',
  }],
  ['/curriculum', {
    title: 'AI & Machine Learning Curriculum | ML Academy',
    description: 'Explore the ML Academy learning path from machine-learning foundations through deep learning, Generative AI, LLMs, RAG, Agentic AI, projects and production AI.',
  }],
  ['/about', {
    title: 'About ML Academy',
    description: 'Learn about ML Academy and its beginner-first approach to teaching machine learning and modern AI step by step.',
  }],
  ['/blog', {
    title: 'Machine Learning & AI Blog | ML Academy',
    description: 'Practical machine-learning and AI guides covering algorithms, interviews, model evaluation, Generative AI and RAG.',
  }],
  ['/cheatsheet', {
    title: 'Free ML Interview Cheatsheet | ML Academy',
    description: 'Get the free ML Academy interview cheatsheet with practical questions and answers covering core ML, evaluation, deep learning and system design.',
  }],
  ['/projects', {
    title: 'Hands-On ML & AI Project Handbooks | LearnMLAcademy',
    description: 'Build recognizable Machine Learning, Deep Learning, Generative AI, RAG, Agentic AI and MLOps projects with exact tools and step-by-step instructions.',
  }],
  ['/projects/titanic-survival', {
    title: 'Titanic Survival Predictor Project Handbook | LearnMLAcademy',
    description: 'Build a complete Titanic machine-learning classifier from an empty Windows folder to a tested Streamlit app with five models, cross-validation, tuning and real evaluation.',
  }],
  ['/projects/house-price', {
    title: 'House Price Predictor Project Handbook | LearnMLAcademy',
    description: 'Build a house price predictor from an empty Windows folder to a tested Streamlit app using Ames Housing, Python, scikit-learn and XGBoost.',
  }],
  ['/privacy', {
    title: 'Privacy Policy | ML Academy',
    description: 'Read the ML Academy privacy policy to learn how site information is collected, used, stored, and handled when you visit or use our services.',
  }],
  ['/terms', {
    title: 'Terms of Service | ML Academy',
    description: 'Read the ML Academy terms of service for details about website use, educational content, user responsibilities, and important service conditions.',
  }],
  ['/disclaimer', {
    title: 'Disclaimer | ML Academy',
    description: 'Read the ML Academy disclaimer for important information about educational content, accuracy, external links, and limits of website information.',
  }],
]);

export function createPrerenderServer() {
  return createServer({
    configLoader: 'runner',
    mode: 'production',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [{
      name: 'prerender-only',
      configResolved(config) {
        // React's plugin adds browser prebundles; this server only loads SSR modules.
        config.optimizeDeps.include = [];
      },
    }],
    // Resolve Router's ESM exports through Vite, as in the browser build.
    ssr: {
      noExternal: ['react-router', 'react-router-dom'],
      resolve: { conditions: ['module', 'import', 'production'] },
    },
    appType: 'custom',
    logLevel: 'error',
  });
}

// Both generation and verification use the curriculum, never a second lesson list.
export async function loadPages(vite) {
  const [{ curriculum }, { blogPosts }, seo] = await Promise.all([
    vite.ssrLoadModule('/src/data/curriculum.ts'),
    vite.ssrLoadModule('/src/data/blog.ts'),
    vite.ssrLoadModule('/src/utils/seo.ts'),
  ]);

  const topics = curriculum.flatMap((category) =>
    category.subtopics.map((subtopic) => ({
      id: subtopic.id,
      title: subtopic.title,
      category: category.title,
    })),
  );

  if (topics.length !== 167) {
    throw new Error(`Expected 167 canonical lesson routes, found ${topics.length}.`);
  }

  const pages = [
    ...Array.from(staticMeta, ([route, meta]) => ({ route, ...meta, kind: 'static' })),
    ...topics.map((topic) => {
      const meta = seo.getSEOData(topic.id, topic.title);
      return {
        route: `/learn/${topic.id}`, ...meta, kind: 'lesson',
        heading: topic.title, category: topic.category,
        schema: seo.getLearningResourceSchema(topic.id, meta.title, meta.description, topic.category),
      };
    }),
    ...blogPosts.map((post) => ({
      route: `/blog/${post.slug}`,
      title: post.seoTitle ?? `${post.title} | ML Academy Blog`,
      description: seo.fitMetaDescription(post.excerpt),
      heading: post.title,
      kind: 'blog',
    })),
  ];

  if (new Set(pages.map((page) => page.route)).size !== pages.length) {
    throw new Error('Duplicate prerender routes.');
  }
  return pages.map((page) => ({ ...page, canonical: `${BASE_URL}${page.route}` }));
}

async function prerender() {
  const vite = await createPrerenderServer();
  try {
    const template = await fs.readFile(TEMPLATE_PATH, 'utf8');
    if (!template.includes('<div id="root"></div>')) {
      throw new Error('dist/index.html does not contain the expected empty root element. Run the Vite build first.');
    }
    const [{ render }, pages] = await Promise.all([
      vite.ssrLoadModule('/prerender/entry-server.tsx'), loadPages(vite),
    ]);

    for (const page of pages) {
      const { route } = page;
      const appHtml = await render(route);
      if (!appHtml || appHtml.length < 100) {
        throw new Error(`Prerender returned unexpectedly little HTML for ${route}.`);
      }

      // A replacer function preserves literal $ sequences in lesson code/formulas.
      let html = template.replace(
        '<div id="root"></div>',
        () => `<div id="root">${appHtml}</div>`,
      );
      html = setPageMeta(html, page);

      const outPath = outputPathForRoute(route);
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, html, 'utf8');
    }

    console.log(
      `prerender: wrote ${pages.length} static HTML pages (${pages.filter(page => page.kind === 'lesson').length} lessons, ${pages.filter(page => page.kind === 'blog').length} blog posts, ${staticMeta.size} static pages).`,
    );
  } finally {
    await vite.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await prerender();
}
