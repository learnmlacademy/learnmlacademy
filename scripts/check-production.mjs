import assert from 'node:assert/strict';

const base = 'https://www.learnmlacademy.com';
const projects = [
  'titanic-survival', 'house-price', 'credit-card-fraud',
  'customer-segmentation', 'retail-forecasting', 'movie-recommender',
  'disaster-tweets', 'digit-recognizer', 'ai-content-creator',
  'pdf-rag', 'ai-research-assistant', 'model-to-production',
];

async function load(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'LearnMLAcademy-reliability-check/1.0' },
    signal: AbortSignal.timeout(30000),
  });
  assert.equal(response.status, 200, 'Unexpected HTTP status for ' + url + ': ' + response.status);
  return response;
}

const homepage = await (await load(base + '/')).text();
assert(homepage.includes('Build 12 real ML'), 'Homepage lost the main hands-on project link');
const catalog = await (await load(base + '/projects')).text();
assert(catalog.includes('HANDS-ON PROJECT HANDBOOKS'), 'Catalog content is missing');
assert(!catalog.includes('BUILDING NEXT'), 'Catalog is showing an unfinished project');
const sitemap = await (await load(base + '/sitemap.xml')).text();

const results = [];
for (const id of projects) {
  const pageUrl = base + '/projects/' + id;
  const page = await (await load(pageUrl)).text();
  assert(page.includes('Your build checkpoints'), pageUrl + ': new learner checklist missing; is production behind main?');
  assert(page.includes('/project-starters/' + id + '.zip'), pageUrl + ': source download missing');
  assert(page.includes('<h1'), pageUrl + ': pre-rendered H1 missing');
  assert(sitemap.includes('/projects/' + id), pageUrl + ': sitemap entry missing');
  const archive = await (await load(base + '/project-starters/' + id + '.zip')).arrayBuffer();
  const magic = new Uint8Array(archive, 0, 4);
  assert.deepEqual([...magic], [80, 75, 3, 4], id + ': invalid source archive');
  assert(archive.byteLength > 100, id + ': suspiciously empty archive');
  results.push({ project: id, html: 'ok', zipBytes: archive.byteLength });
}
console.log('LIVE PRODUCTION PASS — all 12 public handbook pages, 12 ZIPs, catalog, homepage and sitemap.');
console.log(JSON.stringify(results, null, 2));
