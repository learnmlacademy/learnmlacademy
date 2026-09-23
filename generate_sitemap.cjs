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
  ...topicIds.map(id => `
  <url>
    <loc>${BASE_URL}/learn/${id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`),
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
console.log(`generate_sitemap.cjs: wrote ${total} URLs to public/sitemap.xml`);
