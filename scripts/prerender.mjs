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

function setPageMeta(html, { title, description, canonical, schema, category, image }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  const safeImage = escapeHtml(image ? `${BASE_URL}${image}` : `${BASE_URL}/og-image.png`);

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
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:image" content="${safeImage}" />`,
  );
  html = replaceHeadTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="twitter:image" content="${safeImage}" />`,
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
    title: 'About LearnMLAcademy — Hands-On AI & Machine Learning Education',
    description: 'Learn about LearnMLAcademy and its beginner-first approach to teaching Machine Learning, Deep Learning, Generative AI, LLMs, and Agentic AI with code.',
  }],
  ['/blog', {
    title: 'Machine Learning & AI Engineering Blog | LearnMLAcademy',
    description: 'Practical machine learning and AI guides covering algorithms, FAANG interviews, model evaluation, Generative AI, large language models, and RAG systems.',
  }],
  ['/cheatsheet', {
    title: 'Free ML Interview Cheatsheet | ML Academy',
    description: 'Get the free ML Academy interview cheatsheet with practical questions and answers covering core ML, evaluation, deep learning and system design.',
  }],
  ['/projects', {
    title: 'Hands-On ML & AI Project Handbooks | LearnMLAcademy',
    description: 'Build recognizable Machine Learning, Deep Learning, Generative AI, RAG, Agentic AI and MLOps projects with exact tools and step-by-step instructions.',
  }],
  ['/projects/retail-forecasting', {title: 'Retail Forecasting — Complete Time Series Handbook | LearnMLAcademy', description: 'Build a real UK retail sales forecasting system with leakage-safe lag features, chronological splits, baseline evaluation, Streamlit, and complete code.'}],
  ['/projects/disaster-tweets', {title: 'Disaster Tweet Detector — Complete NLP Handbook | LearnMLAcademy', description: 'Build a real disaster-language classifier from Kaggle tweets using TF-IDF, Naive Bayes, Logistic Regression, validation, metrics and complete runnable code.'}],
  ['/projects/digit-recognizer', {title: 'Digit Recognizer — Complete CNN Handbook | LearnMLAcademy', description: 'Train a real PyTorch CNN from scratch on 1797 handwritten digit examples and build a Streamlit digit recognition app with all code and numerical exercises.'}],
  ['/projects/titanic-survival', {
    title: 'Titanic Survival Predictor Project Handbook | LearnMLAcademy',
    description: 'Build a complete Titanic machine-learning classifier from scratch to a tested Streamlit web app with five models, cross-validation, and performance tuning.',
  }],
  ['/projects/house-price', {
    title: 'House Price Predictor Project Handbook | LearnMLAcademy',
    description: 'Build an end-to-end Ames house price predictor from an empty folder to a tested Streamlit app using Python, scikit-learn regression, and XGBoost models.',
  }],
  ['/projects/movie-recommender', {
    title: 'Movie Recommendation System Project Handbook | LearnMLAcademy',
    description: 'Build a Netflix-style educational movie recommender using synthetic ratings, content similarity, collaborative filtering, hybrid ranking, and Streamlit.',
  }],
  ['/projects/credit-card-fraud', {
    title: 'Credit Card Fraud Detector Project Handbook | LearnMLAcademy',
    description: 'Build an imbalanced credit-card fraud detector using OpenML data, class weighting, SMOTE, Random Forest, Average Precision, threshold tuning, tests and Streamlit.',
  }],
  ['/projects/customer-segmentation', {
    title: 'Customer Segmentation Project — RFM, K-Means, DBSCAN, PCA | LearnMLAcademy',
    description: 'Build customer segments from 541,909 retail transactions using RFM analysis, K-Means clustering, DBSCAN, PCA dimensionality reduction, and Streamlit.',
  }],
  ['/projects/pdf-rag/semantic', {
    title: 'Build a Semantic PDF RAG Assistant — Complete Advanced Handbook | LearnMLAcademy',
    description: 'Build a semantic PDF search assistant with local MiniLM ONNX embeddings, page-bound tokens, cosine similarity ranking, reranking, and Streamlit app code.',
  }],
  ['/projects/pdf-rag', {
    title: 'Chat With Your PDFs — RAG Project Handbook | LearnMLAcademy',
    description: 'Build a page-aware PDF RAG assistant with real Python code, TF-IDF, cosine similarity, source citations, Streamlit web interface, and automated tests.',
  }],
  ['/projects/ai-content-creator', {
    title: 'Build Your Own ChatGPT-Style AI Content Creator | LearnMLAcademy',
    description: 'Create a real Streamlit content studio using Python, structured JSON, Pydantic, optional OpenAI generation, writing modes, tests and complete copyable code.',
  }],
  ['/projects/ai-research-assistant', {
    title: 'AI Research Assistant Project — Agent Tools and Citations | LearnMLAcademy',
    description: 'Build a Perplexity-style educational research assistant from scratch using a bounded agent, source reading, citation verification, tests, and Streamlit.',
  }],
  ['/projects/model-to-production', {
    title: 'Model to Production Project — FastAPI, Docker, CI, Drift & Rollback | LearnMLAcademy',
    description: 'Take a trained ML model from laptop to production using a tested FastAPI service with validation, Docker, CI, model versioning, drift checks, and rollback.',
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


// Each image is a real, previously verified app screenshot in public/.
// An absolute og:image is required by many social-sharing crawlers.
const projectEvidence = new Map([
  ['/projects/titanic-survival', ['titanic/titanic-app-form.png', 'titanic-survival']],
  ['/projects/house-price', ['house-price/streamlit-house-price-app.png', 'house-price']],
  ['/projects/credit-card-fraud', ['credit-card-fraud/fraud-app-form.png', 'credit-card-fraud']],
  ['/projects/customer-segmentation', ['customer-segmentation/customer-segmentation-app.png', 'customer-segmentation']],
  ['/projects/retail-forecasting', ['retail-forecasting/desktop-app.png', 'retail-forecasting']],
  ['/projects/movie-recommender', ['movie-recommender/movie-recommender-form.png', 'movie-recommender']],
  ['/projects/disaster-tweets', ['disaster-tweets/desktop-app.png', 'disaster-tweets']],
  ['/projects/digit-recognizer', ['digit-recognizer/desktop-app.png', 'digit-recognizer']],
  ['/projects/ai-content-creator', ['ai-content-creator/content-studio-desktop-form.png', 'ai-content-studio']],
  ['/projects/pdf-rag', ['pdf-rag/pdf-rag-app-desktop-form.png', 'pdf-rag']],
  ['/projects/pdf-rag/semantic', ['pdf-rag-semantic/01-index-built.png', 'pdf-rag-assistant']],
  ['/projects/ai-research-assistant', ['ai-research-assistant/research-desktop-question.png', 'ai-research-assistant']],
  ['/projects/model-to-production', ['model-to-production/api-swagger-docs.png', 'model-to-production']],
]);

function projectSchema(route, meta, repositoryFolder) {
  const canonical = BASE_URL + route;
  const repository = 'https://github.com/learnmlacademy/learnmlacademy/tree/main/projects/' + repositoryFolder;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TechArticle', 'LearningResource'],
        '@id': `${canonical}#article`,
        url: canonical,
        headline: meta.title,
        name: meta.title,
        description: meta.description,
        educationalLevel: 'Intermediate',
        learningResourceType: 'Project Handbook',
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        image: `${BASE_URL}/og-image.png`,
        datePublished: '2026-02-01',
        dateModified: '2026-03-28',
        timeRequired: 'PT45M',
        author: {
          '@type': 'Person',
          name: 'Prateek Sharan',
          url: `${BASE_URL}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'LearnMLAcademy',
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/favicon.svg`,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${BASE_URL}/projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: meta.title,
            item: canonical,
          },
        ],
      },
      {
        '@type': 'SoftwareSourceCode',
        name: meta.title,
        description: meta.description,
        url: canonical,
        codeRepository: repository,
        programmingLanguage: 'Python',
        isAccessibleForFree: true,
      },
      {
        '@type': 'HowTo',
        name: meta.title,
        description: meta.description,
        url: canonical,
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Get the verified source', text: 'Open the project repository and follow the learner handbook.' },
          { '@type': 'HowToStep', position: 2, name: 'Set up the environment', text: 'Install dependencies using the project-specific instructions and requirements file.' },
          { '@type': 'HowToStep', position: 3, name: 'Build, evaluate, and verify', text: 'Run the documented training or retrieval steps, run tests, and inspect the observed results.' },
          { '@type': 'HowToStep', position: 4, name: 'Run the demo', text: 'Launch the documented application locally and complete the handbook experiments.' },
        ],
      },
    ],
  });
}

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
    ...Array.from(staticMeta, ([route, meta]) => {
      const evidence = projectEvidence.get(route);
      return {
        route, ...meta, kind: 'static',
        ...(evidence ? {
          image: '/project-handbooks/' + evidence[0],
          category: 'Hands-on Projects',
          schema: projectSchema(route, meta, evidence[1]),
        } : {}),
      };
    }),
    ...topics.map((topic) => {
      const meta = seo.getSEOData(topic.id, topic.title);
      return {
        route: `/learn/${topic.id}`, ...meta, kind: 'lesson',
        heading: topic.title, category: topic.category,
        schema: seo.getLearningResourceSchema(topic.id, meta.title, meta.description, topic.category),
      };
    }),
    ...blogPosts.map((post) => {
      const canonical = `${BASE_URL}/blog/${post.slug}`;
      const title = post.seoTitle ?? `${post.title} | ML Academy Blog`;
      const description = seo.fitMetaDescription(post.excerpt);
      const blogSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['TechArticle', 'LearningResource'],
            '@id': `${canonical}#article`,
            url: canonical,
            headline: title,
            name: post.title,
            description: description,
            educationalLevel: post.tags?.includes('beginner') ? 'Beginner' : 'Intermediate',
            learningResourceType: 'Guide',
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            image: `${BASE_URL}/og-image.png`,
            datePublished: post.date,
            dateModified: '2026-03-28',
            timeRequired: `PT${post.readTime || 12}M`,
            author: {
              '@type': 'Person',
              name: 'Prateek Sharan',
              url: `${BASE_URL}/about`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'LearnMLAcademy',
              url: BASE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/favicon.svg`,
              },
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: BASE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${BASE_URL}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: canonical,
              },
            ],
          },
        ],
      });
      return {
        route: `/blog/${post.slug}`,
        title,
        description,
        heading: post.title,
        category: post.category,
        schema: blogSchema,
        kind: 'blog',
      };
    }),
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
