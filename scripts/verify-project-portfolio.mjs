/**
 * Checks that every portfolio item advertised as Ready is genuinely reachable
 * and discoverable in the built, pre-rendered website.
 *
 * Run after npm run prerender (npm run build invokes this automatically).
 * Deliberately checks generated HTML rather than trusting the React source alone.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve('.');
const read = file => fs.readFile(path.join(root, file), 'utf8');
const exists = async file => Boolean(await fs.stat(path.join(root, file)).catch(() => null));
const baseUrl = 'https://www.learnmlacademy.com';

function getPortfolio(source) {
  const ast = ts.createSourceFile('projectPortfolio.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let initializer;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'projectPortfolio') initializer = node.initializer;
    ts.forEachChild(node, visit);
  }
  visit(ast);
  assert(initializer && ts.isArrayLiteralExpression(initializer), 'projectPortfolio array could not be parsed');

  const field = (object, name) => {
    const property = object.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(ast) === name);
    assert(property && ts.isStringLiteral(property.initializer), `Missing literal ${name} in projectPortfolio`);
    return property.initializer.text;
  };
  return initializer.elements.map((element, index) => {
    assert(ts.isObjectLiteralExpression(element), `Portfolio entry ${index + 1} must be a plain object`);
    return {id: field(element, 'id'), title: field(element, 'title'), status: field(element, 'status')};
  });
}

const projects = getPortfolio(await read('src/data/projectPortfolio.ts'));
const app = await read('src/App.tsx');
const prerender = await read('scripts/prerender.mjs');
const sitemapGenerator = await read('generate_sitemap.cjs');
const sitemap = await read('dist/sitemap.xml');
const index = await read('dist/projects.html');

assert.equal(projects.length, 12, 'Expected the 12 agreed portfolio projects');
assert.equal(new Set(projects.map(p => p.id)).size, projects.length, 'Duplicate project ID');
assert.equal(new Set(projects.map(p => p.title)).size, projects.length, 'Duplicate project title');
assert(index.includes('HANDS-ON PROJECT HANDBOOKS'), 'Projects catalog missing from generated HTML');

const result = [];
for (const project of projects) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id), `Invalid slug ${project.id}`);
  assert(['ready', 'next'].includes(project.status), `${project.id}: unsupported status ${project.status}`);
  const route = `/projects/${project.id}`;
  const canonical = `${baseUrl}${route}`;
  const routed = app.includes(`path="projects/${project.id}"`);
  const indexed = sitemap.includes(`<loc>${canonical}</loc>`);
  const includedInGenerator = sitemapGenerator.includes(`url: '${route}'`);
  const prerenderMeta = prerender.includes(`['${route}', {`);
  const linked = index.includes(`href="${route}"`);
  const file = `dist/projects/${project.id}.html`;
  const built = await exists(file);

  if (project.status === 'ready') {
    assert(routed, `${route}: Ready project missing React route`);
    assert(prerenderMeta, `${route}: Ready project missing prerender SEO metadata`);
    assert(includedInGenerator, `${route}: Ready project missing sitemap generator entry`);
    assert(indexed, `${route}: Ready project missing generated sitemap entry`);
    assert(linked, `${route}: Ready project not linked from catalog`);
    assert(built, `${route}: Ready project has no generated HTML`);
    const html = await read(file);
    assert(html.includes(`href="${canonical}"`), `${route}: Missing canonical URL`);
    assert(/<h1\b[^>]*>/.test(html), `${route}: Missing H1`);
    assert(/<meta\b[^>]*name="description"/.test(html), `${route}: Missing meta description`);
    assert((html.match(/data-code-block/g) || []).length >= 3, `${route}: Fewer than three accessible copyable code examples`);
    assert(/<img\b/.test(html), `${route}: No evidence screenshot or figure`);
    assert(!html.includes('<div id="root"></div>'), `${route}: Empty pre-rendered app shell`);
  } else {
    assert(!linked, `${route}: Unfinished project incorrectly linked as ready`);
    assert(!indexed, `${route}: Unfinished project incorrectly indexed`);
    assert(!routed, `${route}: Unfinished project has a public route while marked next`);
  }
  result.push(`${project.status.toUpperCase().padEnd(5)} ${route}`);
}

const ready = projects.filter(p => p.status === 'ready').length;
console.log(`verify:projects PASS — ${ready} ready, ${projects.length - ready} planned; catalog, routes, code, visual evidence, prerendered HTML, canonical metadata and sitemap checked.\n${result.join('\n')}`);
