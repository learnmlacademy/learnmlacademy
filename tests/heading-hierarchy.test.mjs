import test from 'node:test';
import assert from 'node:assert/strict';
import { auditPageHeadingHierarchy, summarizeHeadingAudit } from '../scripts/heading-hierarchy.mjs';

test('accepts a correctly nested page heading outline', () => {
  const html = '<main><h1>Page title</h1><h2>Section</h2><h3>Subsection</h3><h2>Next section</h2></main>';
  const result = auditPageHeadingHierarchy(html, '/valid');
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.headings.map(item => item.level), [1, 2, 3, 2]);
});

test('detects a skipped heading level', () => {
  const html = '<main><h1>Page title</h1><h3>Skipped section</h3></main>';
  const result = auditPageHeadingHierarchy(html, '/skipped');
  assert.equal(result.issues.filter(issue => issue.code === 'skipped-level').length, 1);
});

test('requires one H1 and an H1 as the first content heading', () => {
  const result = auditPageHeadingHierarchy(
    '<main><h2>Section</h2><h1>Late title</h1><h1>Duplicate title</h1></main>',
    '/h1-errors'
  );
  assert(result.issues.some(issue => issue.code === 'first-heading-not-h1'));
  assert(result.issues.some(issue => issue.code === 'h1-count'));
});

test('ignores headings in navigation, sidebars, footer, and explicitly hidden regions', () => {
  const html = '<main><nav><h2>Navigation</h2></nav><aside><h4>Sidebar</h4></aside>' +
    '<div hidden><h5>Hidden dialog</h5></div><section><h1>Page title</h1><h2>Content</h2></section>' +
    '<footer><h2>Footer</h2></footer></main>';
  const result = auditPageHeadingHierarchy(html, '/landmarks');
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.headings.map(item => item.text), ['Page title', 'Content']);
});

test('reports missing main landmarks and empty headings', () => {
  const missingMain = auditPageHeadingHierarchy('<section><h1>Title</h1></section>', '/missing-main');
  assert(missingMain.issues.some(issue => issue.code === 'main-landmark-count'));

  const empty = auditPageHeadingHierarchy('<main><h1>Title</h1><h2><svg></svg></h2></main>', '/empty');
  assert(empty.issues.some(issue => issue.code === 'empty-heading'));
});

test('summarizes page and issue counts for the full-site report', () => {
  const results = [
    auditPageHeadingHierarchy('<main><h1>Good</h1><h2>Section</h2></main>', '/good'),
    auditPageHeadingHierarchy('<main><h1>Needs review</h1><h4>Jump</h4></main>', '/needs-review'),
  ];
  const summary = summarizeHeadingAudit(results);
  assert.equal(summary.pageCount, 2);
  assert.equal(summary.cleanPageCount, 1);
  assert.equal(summary.flaggedPageCount, 1);
  assert.equal(summary.issueCounts['skipped-level'], 1);
});


test('does not mistake a CSS hidden utility class for an HTML hidden attribute', () => {
  const html = '<main><div class="hidden xl:block"><h1>Page title</h1><h2>Content section</h2></div></main>';
  const result = auditPageHeadingHierarchy(html, '/css-hidden-class');
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.headings.map(item => item.text), ['Page title', 'Content section']);
});
