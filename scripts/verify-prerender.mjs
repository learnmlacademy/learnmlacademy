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

const SITE_HOSTS = new Set(['www.learnmlacademy.com', 'learnmlacademy.com']);
const normalizePath = pathname => {
  let decoded = pathname;
  try { decoded = decodeURIComponent(pathname); } catch { /* keep the original encoded path */ }
  return decoded === '/' ? '/' : decoded.replace(/\/+$/, '');
};

async function isBuiltFile(pathname) {
  let decoded = pathname;
  try { decoded = decodeURIComponent(pathname); } catch { /* keep encoded path */ }
  const candidate = path.resolve('dist', '.' + decoded);
  const root = path.resolve('dist') + path.sep;
  if (!candidate.startsWith(root)) return false;
  try { return (await fs.stat(candidate)).isFile(); } catch { return false; }
}

async function verifyInternalNavigation(pages) {
  const pagePaths = new Set(pages.map(page => normalizePath(new URL(page.canonical).pathname)));
  const failures = [];
  let linksChecked = 0;
  for (const page of pages) {
    const html = await fs.readFile(outputPathForRoute(page.route), 'utf8');
    const anchors = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)];
    for (const match of anchors) {
      const rawHref = match[1].replaceAll('&amp;', '&').replaceAll('&#x2F;', '/');
      if (!rawHref || rawHref.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(rawHref)) continue;
      let target;
      try { target = new URL(rawHref, page.canonical); }
      catch { failures.push(page.route + ': invalid link ' + rawHref); continue; }
      if (!['http:', 'https:'].includes(target.protocol) || !SITE_HOSTS.has(target.hostname.toLowerCase())) continue;
      const targetPath = normalizePath(target.pathname);
      if (targetPath.startsWith('/api/')) continue;
      linksChecked++;
      if (pagePaths.has(targetPath)) continue;
      if (await isBuiltFile(target.pathname)) continue;
      if (!/\.[a-z0-9]{1,8}$/i.test(targetPath) && await isBuiltFile(targetPath + '.html')) continue;
      failures.push(`${page.route}: ${rawHref} resolves to missing internal path ${targetPath}`);
    }
  }
  assert.equal(failures.length, 0, 'Broken internal navigation links (' + failures.length + '):\n' + failures.slice(0, 100).join('\n'));
  console.log(`verify:links PASS — checked ${linksChecked} same-site anchor links across ${pages.length} prerendered pages.`);
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
    'og:image': 'https://www.learnmlacademy.com' + (page.image || '/og-image.png'),
    'twitter:title': page.title, 'twitter:description': page.description,
    'twitter:image': 'https://www.learnmlacademy.com' + (page.image || '/og-image.png'),
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

  if (page.kind === 'static' && page.route.startsWith('/projects/')) {
    const schema = JSON.parse(onlyMatch(head, /<script\b[^>]*id="schema-topic"[^>]*>([^]*?)<\/script>/gi, 'project schema'));
    const software = schema['@graph']?.find(node => node['@type'] === 'SoftwareSourceCode');
    const howto = schema['@graph']?.find(node => node['@type'] === 'HowTo');
    assert.equal(software?.url, page.canonical, 'Project code schema URL');
    assert(software?.codeRepository?.startsWith('https://github.com/learnmlacademy/learnmlacademy/tree/main/projects/'), 'Project code repository');
    assert.equal(howto?.step?.length, 4, 'Project how-to steps');
    assert(page.image?.startsWith('/project-handbooks/'), 'Project image required');
  }
  if (page.kind === 'lesson') {
    assert(page.canonical.endsWith(page.route) && page.route.startsWith('/learn/'));
    const body = onlyMatch(html, /<article\b[^>]*data-lesson-body[^>]*>([^]*?)<\/article>/gi, 'lesson body');
    const paragraphs = [...body.matchAll(/<p\b[^>]*>([^]*?)<\/p>/gi)];
    assert(paragraphs.some(match => text(match[1]).length > 80), 'Missing lesson prose/introduction');
    assert(text(body).length > 500, 'Missing substantial lesson content');
    assert(/<h[23]\b/.test(body), 'Missing lesson sections');
    assert(!body.includes('Welcome to the comprehensive guide on'), 'GenericContent fallback placeholder is rendered instead of a real lesson');
    assert(!body.includes('Example Standard Implementation Flow'), 'Generic implementation placeholder is rendered instead of the verified lesson code');
    assert(!body.includes('Accuracy / Error evaluation goes here'), 'Placeholder evaluation output is rendered as lesson content');
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
  await verifyInternalNavigation(pages);
  console.log(`verify:prerender PASS — ${lessons.length} lessons, ${pages.filter(p => p.kind === 'blog').length} blog posts, ${pages.filter(p => p.kind === 'static').length} static pages; unique titles, exact metadata/canonicals, schemas and real lesson content and internal links.`);
} finally {
  await vite.close();
}
