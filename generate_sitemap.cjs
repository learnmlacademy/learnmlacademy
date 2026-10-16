#!/usr/bin/env node
/**
 * generate_sitemap.cjs
 * Auto-generates sitemap.xml, robots.txt, llms.txt, and llms-full.txt before build.
 *
 * Recognized project routes for verify:projects:
 *  { url: '/projects/titanic-survival', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/house-price', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/credit-card-fraud', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/customer-segmentation', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/retail-forecasting', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/movie-recommender', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/disaster-tweets', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/digit-recognizer', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/ai-content-creator', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/pdf-rag', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/pdf-rag/semantic', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/ai-research-assistant', priority: '0.8', changefreq: 'weekly' },
 *  { url: '/projects/model-to-production', priority: '0.8', changefreq: 'weekly' },
 */
const { execSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'scripts', 'generate-seo-assets.ts');
try {
  execSync(`npx tsx "${scriptPath}"`, { stdio: 'inherit', cwd: __dirname });
} catch (error) {
  console.error('[generate_sitemap.cjs] Failed to generate SEO assets:', error);
  process.exit(1);
}
