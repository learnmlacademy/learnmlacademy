import assert from 'node:assert/strict';

const base = 'https://www.learnmlacademy.com';
const projectIds = [
  'titanic-survival', 'house-price', 'credit-card-fraud',
  'customer-segmentation', 'retail-forecasting', 'movie-recommender',
  'disaster-tweets', 'digit-recognizer', 'ai-content-creator',
  'pdf-rag', 'ai-research-assistant', 'model-to-production',
];

const normalize = value => {
  const url = new URL(value, base);
  const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : '/';
  return url.origin + pathname;
};

async function load(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'LearnMLAcademy-production-quality-check/2.0' },
    signal: AbortSignal.timeout(30000),
  });
  assert.equal(response.status, 200, 'Unexpected HTTP status for ' + url + ': ' + response.status);
  return response;
}

function parseAttribute(tag, name) {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*"([^"]*)"', 'i'));
  return match?.[1] ?? '';
}

function pageMetadata(html, url) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const title = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
  const descriptions = [...head.matchAll(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi)].map(m => parseAttribute(m[0], 'content'));
  const canonicals = [...head.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)].map(m => parseAttribute(m[0], 'href'));
  const robots = [...head.matchAll(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi)].map(m => parseAttribute(m[0], 'content').toLowerCase());
  assert(title.length >= 12, url + ': missing or suspiciously short HTML title');
  assert.equal(descriptions.length, 1, url + ': expected exactly one meta description, found ' + descriptions.length);
  assert(descriptions[0].trim().length >= 50, url + ': meta description is too short');
  assert.equal(canonicals.length, 1, url + ': expected exactly one canonical link, found ' + canonicals.length);
  assert.equal(normalize(canonicals[0]), normalize(url), url + ': canonical points to ' + canonicals[0]);
  assert(!robots.some(value => /noindex/.test(value)), url + ': robots meta blocks indexing');
  assert(/<h1\b/i.test(html), url + ': pre-rendered H1 is missing');
  return { url, title: title.replace(/&amp;/g, '&'), descriptionLength: descriptions[0].length, canonical: canonicals[0] };
}

const sitemapResponse = await load(base + '/sitemap.xml');
const sitemapXml = await sitemapResponse.text();
const urls = [...sitemapXml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map(m => m[1].trim()).filter(Boolean);
assert(urls.length >= 180, 'Unexpectedly small sitemap: ' + urls.length + ' URLs');
assert.equal(new Set(urls.map(normalize)).size, urls.length, 'Sitemap contains duplicate normalized URLs');
assert(urls.every(url => new URL(url).host === 'www.learnmlacademy.com'), 'Unexpected host in sitemap');
const sitemapPaths = new Set(urls.map(url => new URL(url).pathname.replace(/\/$/, '') || '/'));

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    const response = await load(url);
    const html = await response.text();
    results.push(pageMetadata(html, url));
  }
}
await Promise.all(Array.from({ length: 8 }, () => worker()));

const titles = new Map();
for (const page of results) titles.set(page.title, (titles.get(page.title) || 0) + 1);
const duplicateTitles = [...titles].filter(([, count]) => count > 1).map(([title, count]) => ({ title, count }));

const homepage = await (await load(base + '/')).text();
assert(homepage.includes('Build 12 real ML'), 'Homepage lost its main hands-on project link');
const catalog = await (await load(base + '/projects')).text();
assert(catalog.includes('HANDS-ON PROJECT HANDBOOKS'), 'Project catalog content is missing');
assert(!catalog.includes('BUILDING NEXT'), 'Project catalog is showing an unfinished project');

const projectResults = [];
for (const id of projectIds) {
  const pageUrl = base + '/projects/' + id;
  const page = await (await load(pageUrl)).text();
  assert(page.includes('Your build checkpoints'), pageUrl + ': learner checklist is missing');
  assert(page.includes('/project-starters/' + id + '.zip'), pageUrl + ': starter ZIP link is missing');
  const archive = await (await load(base + '/project-starters/' + id + '.zip')).arrayBuffer();
  const magic = new Uint8Array(archive, 0, 4);
  assert.deepEqual([...magic], [80, 75, 3, 4], id + ': invalid source archive');
  assert(archive.byteLength > 100, id + ': suspiciously empty source archive');
  projectResults.push({ project: id, zipBytes: archive.byteLength });
}

console.log('LIVE PRODUCTION PASS — ' + urls.length + ' sitemap URLs returned 200 and passed title, description, canonical, robots and H1 checks.');
console.log('Project downloads PASS — 12/12 handbooks and 12 source ZIPs.');
console.log('Title uniqueness review — ' + duplicateTitles.length + ' duplicate title groups; review the report below without failing legitimate same-title variants.');
if (duplicateTitles.length) console.log(JSON.stringify(duplicateTitles.slice(0, 25), null, 2));
console.log(JSON.stringify({ sitemapUrls: urls.length, checkedPages: results.length, uniqueTitles: titles.size, projects: projectResults.length, sitemapPathsCount: sitemapPaths.size }, null, 2));
