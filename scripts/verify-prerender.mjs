import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createPrerenderServer, escapeHtml, loadPages, outputPathForRoute } from './prerender.mjs';

// These checks read generated HTML, before JavaScript or client effects can repair it.
const normalize = value => value.replace(/<!--[^]*?-->/g, '').replace(/\s+/g, ' ').trim();
const text = value => normalize(value.replace(/<script\b[^]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' '));

function onlyMatch(html, pattern, label) {
  const matches = [...html.matchAll(pattern)];
  assert.equal(matches.length, 1, `Expected exactly one ${label}; found ${matches.length}`);
  return matches[0][1];
}

function verifyPage(html, page) {
  const head = onlyMatch(html, /<head>([^]*?)<\/head>/gi, 'head');
  assert.equal(onlyMatch(head, /<title>([^]*?)<\/title>/gi, 'title'), escapeHtml(page.title));
  const description = onlyMatch(head, /<meta\b[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/gi, 'description');
  assert.equal(description, escapeHtml(page.description));
  const canonicals = [...head.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)];
  assert.equal(canonicals.length, 1, 'Expected exactly one canonical link');
  assert.equal(canonicals[0][0].match(/href="([^"]*)"/)[1], page.canonical);
  for (const [property, expected] of Object.entries({
    'og:title': page.title, 'og:description': page.description, 'og:url': page.canonical,
    'twitter:title': page.title, 'twitter:description': page.description,
  })) {
    const value = onlyMatch(head, new RegExp(`<meta\\b[^>]*(?:property|name)="${property}"[^>]*content="([^"]*)"[^>]*>`, 'gi'), property);
    assert.equal(value, escapeHtml(expected), property);
  }
  assert(!html.includes('<div id="root"></div>'), 'Empty app shell');
  assert(!html.includes('<!--$!-->') && !html.includes('<!--$?-->'), 'Unresolved/failed Suspense boundary');
  // Legacy lesson bodies have their own headings as well as the shared header.
  // Preserve them; this check requires the curriculum title, not a heading rewrite.
  const headings = [...html.matchAll(/<h1\b[^>]*>([^]*?)<\/h1>/gi)].map(match => text(match[1]));
  if (page.heading) assert(headings.includes(normalize(escapeHtml(page.heading))), 'Missing expected lesson/blog H1');
  else assert(headings.some(heading => heading.length > 0), 'Missing static-page H1');

  if (page.kind === 'lesson') {
    assert(page.canonical.endsWith(page.route) && page.route.startsWith('/learn/'));
    const body = onlyMatch(html, /<article\b[^>]*data-lesson-body[^>]*>([^]*?)<\/article>/gi, 'lesson body');
    const paragraphs = [...body.matchAll(/<p\b[^>]*>([^]*?)<\/p>/gi)];
    assert(paragraphs.some(match => text(match[1]).length > 80), 'Missing lesson prose/introduction');
    assert(text(body).length > 500, 'Missing substantial lesson content');
    assert(/<h[23]\b/.test(body), 'Missing lesson sections');
    const schema = JSON.parse(onlyMatch(head, /<script\b[^>]*id="schema-topic"[^>]*>([^]*?)<\/script>/gi, 'lesson schema'));
    const article = schema['@graph'].find(item => item['@type']?.includes('TechArticle'));
    assert(article?.['@type'].includes('LearningResource'), 'Missing LearningResource');
    assert.equal(article.url, page.canonical);
    assert.equal(article.headline, page.title);
    assert.equal(article.description, page.description);
    const breadcrumb = schema['@graph'].find(item => item['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumb?.itemListElement.at(-1).item, page.canonical);
    assert.equal(breadcrumb?.itemListElement.at(-2).name, page.category.replace(/^\d+\.\s*/, ''));
    assert.equal(onlyMatch(head, /<meta\b[^>]*property="og:type"[^>]*content="([^"]*)"[^>]*>/gi, 'og:type'), 'article');
  }
}

const vite = await createPrerenderServer();
try {
  const pages = await loadPages(vite);
  const lessons = pages.filter(page => page.kind === 'lesson');
  const lessonFiles = (await fs.readdir('dist/learn')).filter(name => name.endsWith('.html'));
  assert.equal(lessonFiles.length, 167, 'Expected exactly 167 generated canonical lesson files');
  assert.equal(new Set(lessons.map(page => page.title)).size, 167, 'Lesson SEO titles must be unique');
  const failures = [];
  for (const page of pages) {
    try {
      verifyPage(await fs.readFile(outputPathForRoute(page.route), 'utf8'), page);
    } catch (error) {
      failures.push(`${page.route}: ${error.message}`);
    }
  }
  assert.equal(failures.length, 0, `Prerender verification failed:\n${failures.join('\n')}`);
  console.log(`verify:prerender PASS — ${lessons.length} lessons, ${pages.filter(p => p.kind === 'blog').length} blog posts, ${pages.filter(p => p.kind === 'static').length} static pages; unique titles, exact metadata/canonicals, schemas and rendered content.`);
} finally {
  await vite.close();
}
