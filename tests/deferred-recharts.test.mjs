import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function getPageAssets(htmlContent) {
  const matches = [...htmlContent.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)];
  return matches.map(m => m[1]);
}

test('ordinary routes do not download or preload recharts or d3 chunks', () => {
  assert(fs.existsSync(distDir), 'dist directory must exist');

  const testPages = [
    { route: '/', file: path.join(distDir, 'index.html') },
    { route: '/projects', file: path.join(distDir, 'projects.html') },
    { route: '/learn/train-test-split', file: path.join(distDir, 'learn/train-test-split.html') },
  ];

  for (const { route, file } of testPages) {
    assert(fs.existsSync(file), `HTML file for ${route} must exist at ${file}`);
    const html = fs.readFileSync(file, 'utf8');
    const assets = getPageAssets(html);

    const eagerRecharts = assets.filter(url => /recharts|vendor-recharts|d3-/i.test(url));
    assert.equal(
      eagerRecharts.length,
      0,
      `Unrelated route ${route} eagerly loaded recharts or d3 chunks: ${eagerRecharts.join(', ')}`
    );
  }
});

test('initial entry bundle and core vendor chunks do not bundle recharts', () => {
  const assetsDir = path.join(distDir, 'assets');
  const files = fs.readdirSync(assetsDir);

  const entryJs = files.filter(f => /^index-.*\.js$/.test(f));
  assert(entryJs.length >= 1, 'Entry index-*.js must exist');

  const coreVendorJs = files.filter(f => /^(vendor-react|vendor-lucide)-.*\.js$/.test(f));
  assert(coreVendorJs.length >= 2, 'Core vendor-react and vendor-lucide chunks must exist');

  // Verify none of the initial entry/vendor files bundle Recharts
  for (const jsFile of [...entryJs, ...coreVendorJs]) {
    const code = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
    assert(
      !code.includes('recharts-surface') && !code.includes('ResponsiveContainer'),
      `${jsFile} unexpectedly contains Recharts symbols in the initial entry bundle`
    );
  }
});

test('recharts is deferred into separate dynamic chart chunks', () => {
  const assetsDir = path.join(distDir, 'assets');
  const files = fs.readdirSync(assetsDir);

  // Check that separate chart chunks exist
  const chartChunks = files.filter(f => /GenAIInteractiveCharts|CartesianChart/i.test(f));
  assert(
    chartChunks.length > 0,
    'Expected deferred chart chunks (e.g. GenAIInteractiveCharts or CartesianChart) in dist/assets'
  );

  // Verify that generative-ai-intro prerendered HTML exists and has stable chart container structure
  const genAiHtmlPath = path.join(distDir, 'learn/generative-ai-intro.html');
  assert(fs.existsSync(genAiHtmlPath), 'generative-ai-intro.html must exist');
  const genAiHtml = fs.readFileSync(genAiHtmlPath, 'utf8');

  // The lesson HTML must be populated and contain the GenAI Interactive Chart section
  assert(
    genAiHtml.includes('Historical Compute & Context Growth') || genAiHtml.includes('Compute Frontier'),
    'generative-ai-intro must contain interactive chart section content'
  );
});
