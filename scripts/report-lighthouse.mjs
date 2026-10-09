import fs from 'node:fs';
import assert from 'node:assert/strict';

const pages = ['home', 'projects', 'lesson'];
const summary = [];

for (const page of pages) {
  const path = `lighthouse-reports/${page}-mobile.json`;
  const report = JSON.parse(fs.readFileSync(path, 'utf8'));
  const scores = Object.fromEntries(
    ['performance', 'accessibility', 'best-practices', 'seo'].map(name =>
      [name, Math.round(100 * (report.categories[name]?.score ?? 0))])
  );
  const vitals = {};
  for (const name of ['first-contentful-paint', 'largest-contentful-paint', 'speed-index', 'total-blocking-time', 'cumulative-layout-shift']) {
    const audit = report.audits[name];
    vitals[name] = { score: audit?.score ?? null, display: audit?.displayValue ?? null };
  }
  const problems = Object.values(report.audits)
    .filter(a => a.score !== null && a.score !== undefined && a.score < 0.9 && a.details?.type !== 'opportunity')
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 18)
    .map(a => ({ id: a.id, title: a.title, score: a.score, display: a.displayValue }));
  summary.push({ page, testedUrl: report.finalUrl, scores, vitals, problems });
}
fs.writeFileSync('lighthouse-reports/summary.json', JSON.stringify(summary, null, 2));
const markdown = ['# LearnMLAcademy automated Lighthouse mobile baseline', '',
  '| Page | Performance | Accessibility | Best practices | SEO |',
  '|---|---:|---:|---:|---:|',
  ...summary.map(x => `| ${x.page} | ${x.scores.performance} | ${x.scores.accessibility} | ${x.scores['best-practices']} | ${x.scores.seo} |`),
  '', 'Lighthouse results are laboratory measures and vary between runs. The original JSON and individual audit issues are attached to the GitHub Actions run.',
  ...summary.flatMap(x => ['', `## ${x.page}`, ...x.problems.slice(0, 8).map(p => `- ${p.title} (score ${p.score}): ${p.display ?? ''}`)]),
  ''].join('\n');
fs.writeFileSync('lighthouse-reports/summary.md', markdown);
const gh = process.env.GITHUB_STEP_SUMMARY;
if (gh) fs.appendFileSync(gh, markdown);
console.log(markdown);
assert.equal(summary.length, 3);
