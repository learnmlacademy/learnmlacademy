import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const BASE_URL = 'https://www.learnmlacademy.com';
const DIST_DIR = path.resolve('dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function replaceHeadTag(html, regex, replacement) {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

function setPageMeta(html, { title, description, canonical, schema }) {
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

  html = html.replace(/\s*<script[^>]+id="schema-topic"[^>]*>[\s\S]*?<\/script>/i, '');
  if (schema) {
    const safeSchema = schema.replaceAll('</script', '<\\/script');
    html = html.replace(
      '</head>',
      `    <script id="schema-topic" type="application/ld+json">${safeSchema}</script>\n  </head>`,
    );
  }

  return html;
}

function outputPathForRoute(route) {
  if (route === '/') return TEMPLATE_PATH;
  const clean = route.replace(/^\/+|\/+$/g, '');
  return path.join(DIST_DIR, clean, 'index.html');
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
  ['/privacy', {
    title: 'Privacy Policy | ML Academy',
    description: 'Read the ML Academy privacy policy.',
  }],
  ['/terms', {
    title: 'Terms of Service | ML Academy',
    description: 'Read the ML Academy terms of service.',
  }],
  ['/disclaimer', {
    title: 'Disclaimer | ML Academy',
    description: 'Read the ML Academy disclaimer.',
  }],
]);

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const template = await fs.readFile(TEMPLATE_PATH, 'utf8');
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html does not contain the expected empty root element.');
  }

  const [{ render }, { curriculum }, { blogPosts }, seo] = await Promise.all([
    vite.ssrLoadModule('/prerender/entry-server.tsx'),
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

  const lessonRoutes = topics.map((topic) => `/learn/${topic.id}`);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const routes = [
    ...staticMeta.keys(),
    ...lessonRoutes,
    ...blogRoutes,
  ];

  for (const route of routes) {
    const appHtml = await render(route);
    if (!appHtml || appHtml.length < 100) {
      throw new Error(`Prerender returned unexpectedly little HTML for ${route}.`);
    }

    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );

    let meta = staticMeta.get(route);
    let schema;

    if (route.startsWith('/learn/')) {
      const topicId = route.slice('/learn/'.length);
      const topic = topics.find((item) => item.id === topicId);
      if (!topic) throw new Error(`Missing curriculum data for ${route}.`);
      meta = seo.getSEOData(topicId, topic.title);
      schema = seo.getLearningResourceSchema(topicId, meta.title, meta.description);
    } else if (route.startsWith('/blog/')) {
      const slug = route.slice('/blog/'.length);
      const post = blogPosts.find((item) => item.slug === slug);
      if (!post) throw new Error(`Missing blog data for ${route}.`);
      meta = {
        title: `${post.title} | ML Academy Blog`,
        description: post.excerpt,
      };
    }

    if (!meta) {
      throw new Error(`Missing metadata for ${route}.`);
    }

    const canonical = `${BASE_URL}${route === '/' ? '/' : route}`;
    html = setPageMeta(html, {
      ...meta,
      canonical,
      schema,
    });

    const outPath = outputPathForRoute(route);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html, 'utf8');
  }

  console.log(
    `prerender: wrote ${routes.length} static HTML pages (${lessonRoutes.length} lessons, ${blogRoutes.length} blog posts, ${staticMeta.size} static pages).`,
  );
} finally {
  await vite.close();
}
