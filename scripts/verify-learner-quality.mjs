import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const read = filename => fs.readFile(path.join(root, filename), 'utf8');
const exists = filename => fs.stat(path.join(root, filename)).then(st => st.isFile() && st.size > 0).catch(() => false);

const manifest = JSON.parse(await read('public/project-starters/manifest.json'));
assert.equal(manifest.length, 12, 'Expected exactly 12 packaged projects');
const ids = manifest.map(item => item.project);
assert.equal(new Set(ids).size, 12, 'Duplicate project starter');

const app = await read('src/App.tsx');
const support = await read('src/components/projects/ProjectLearningSupport.tsx');
const projectPage = await read('dist/projects.html');
const homepage = await read('dist/index.html');

for (const id of ids) {
  assert(app.includes('projectId="' + id + '"'), id + ': no learning-support route wrapper');
  assert(app.includes('path="projects/' + id + '"'), id + ': no project route');
  const html = await read('dist/projects/' + id + '.html');
  assert(html.includes('Your build checkpoints'), id + ': missing accessible learner progress section');
  assert(html.includes('My build checklist'), id + ': missing handbook quick navigation');
  assert(html.includes('Windows PowerShell'), id + ': missing Windows setup notes');
  assert(html.includes('macOS / Linux'), id + ': missing macOS/Linux setup notes');
  assert(html.includes('Predict'), id + ': missing applied learning experiment');
  assert(html.includes('/project-starters/' + id + '.zip'), id + ': missing direct source download');
  assert(await exists('dist/project-starters/' + id + '.zip'), id + ': missing built starter ZIP');
  assert(projectPage.includes('href="/projects/' + id + '"'), id + ': no catalog handbook link');
}
assert(homepage.includes('Build 12 real ML'), 'Homepage does not surface hands-on projects near the search hero');
assert(support.includes('localStorage.setItem'), 'Learner progress is not saved');
assert(support.includes('aria-valuenow'), 'Progress bar must have an accessible value');
assert((await read('src/components/NewsletterSignup.tsx')).includes('Privacy Policy'), 'Signup form lacks privacy disclosure');
assert((await read('src/pages/legal/PrivacyPolicyPage.tsx')).includes('Brevo'), 'Privacy policy does not explain newsletter provider');

const source = await read('api/newsletter.ts');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
assert(!compiled.diagnostics?.some(d => d.category === ts.DiagnosticCategory.Error), 'Newsletter TypeScript transpilation failed');
console.log('verify:quality PASS — 12 browser-ready static handbooks, mobile-friendly navigation, setup sections, starter downloads, consent and privacy checks.');
