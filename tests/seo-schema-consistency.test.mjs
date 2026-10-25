import test from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';

const root = process.cwd();

test('SEO schema dateModified matches sitemap lastmod and respects topic overrides', () => {
  const output = execSync('npx tsx tests/run-seo-schema-checks.ts', { cwd: root, encoding: 'utf8' });
  assert(output.includes('ALL SEO SCHEMA CONSISTENCY CHECKS PASS'), 'SEO schema consistency checks must pass');
});
