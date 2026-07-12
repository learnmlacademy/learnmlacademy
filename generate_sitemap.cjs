#!/usr/bin/env node
/**
 * generate_sitemap.cjs
 * Runs automatically before every build (see package.json "prebuild" script).
 * Reads all topic IDs and blog slugs and writes a complete sitemap.xml to public/.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.learnmlacademy.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/curriculum', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
];

// All 63 tutorial topic IDs (kept in sync with src/data/curriculum.ts)
const topicIds = [
  // Foundations
  'what-is-ml', 'types-of-ml', 'supervised-learning-intro', 'unsupervised-learning-intro',
  'reinforcement-learning-intro', 'batch-vs-online', 'ml-lifecycle',
  // Python & ML Libraries
  'python-for-ml', 'numpy-essentials', 'pandas-essentials', 'scikit-learn-essentials',
  // Data Preprocessing & Feature Engineering
  'eda', 'handling-missing-data', 'encoding-categorical', 'bias-variance', 'feature-scaling',
  'feature-engineering', 'feature-selection', 'data-visualization',
  // Supervised Learning
  'regression-intro', 'linear-regression', 'gradient-descent', 'polynomial-regression',
  'ridge-regression', 'lasso-regression', 'classification-intro', 'logistic-regression',
  'decision-trees', 'naive-bayes', 'knn', 'svm',
  // Ensemble Learning
  'random-forest', 'bagging', 'boosting', 'adaboost', 'gradient-boosting', 'xgboost',
  // Unsupervised Learning
  'kmeans', 'hierarchical', 'dbscan', 'pca', 'tsne', 'association-rules', 'apriori',
  // Model Evaluation & Optimization
  'train-test-split', 'cross-validation', 'overfitting-underfitting', 'cost-functions',
  'hyperparameter-tuning', 'grid-random-search', 'confusion-matrix', 'roc-auc',
  // Time Series & Forecasting
  'arima', 'moving-average', 'exponential-smoothing', 'forecasting-basics',
  // Advanced Learning Paradigms
  'semi-supervised', 'online-learning', 'reinforcement-learning-adv', 'multi-armed-bandits',
  // Deep Learning & Interviews
  'neural-networks', 'deep-learning-intro', 'ml-interview-questions',
];

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
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
  ...topicIds.map(id => `
  <url>
    <loc>${BASE_URL}/learn/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`),
  ...blogSlugs.map(slug => `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
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
console.log(`generate_sitemap.cjs: wrote ${total} URLs to public/sitemap.xml`);
