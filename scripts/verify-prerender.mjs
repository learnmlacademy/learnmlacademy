import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createPrerenderServer, escapeHtml, loadPages, outputPathForRoute } from './prerender.mjs';

// These checks read generated HTML, before JavaScript or client effects can repair it.
const normalize = value => value.replace(/<!--[^]*?-->/g, '').replace(/\s+/g, ' ').trim();
const text = value => normalize(value.replace(/<script\b[^]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' '));

function decodeHtml(html) {
  return html
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&mdash;', '—')
    .replaceAll('&ndash;', '–');
}

const cleanText = value => normalize(decodeHtml(value.replace(/<script\b[^]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ')));

const AGENTIC_TOPIC_IDS = [
  'agentic-ai-intro',
  'tool-calling',
  'building-ai-agent',
  'planning-reflection',
  'agent-context-engineering',
  'agent-memory',
  'agent-state-graphs',
  'durable-long-running-agents',
  'agentic-rag',
  'multi-agent-systems',
  'model-context-protocol',
  'agent-frameworks',
  'browser-computer-use-agents',
  'agent-security',
  'agent-evaluation-safety',
  'agent-observability-deployment',
];
const AGENTIC_TOPIC_SET = new Set(AGENTIC_TOPIC_IDS);
const verifiedAgenticLabs = new Set();
const agenticLabs = JSON.parse(await fs.readFile('src/content/modernai/agenticTutorialLabs.json', 'utf8'));

function verifyAgenticWorkedLab(html, topicId, labData) {
  assert(labData, `${topicId}: Missing lab definition in agenticTutorialLabs.json`);

  // A. Lab integration
  const markerPattern = new RegExp(`data-agentic-worked-lab=["']${topicId}["']`, 'i');
  const allLabMarkers = [...html.matchAll(/data-agentic-worked-lab=["']([^"']*)["']/gi)];
  assert.equal(
    allLabMarkers.length,
    1,
    `${topicId}: Expected exactly one data-agentic-worked-lab marker; found ${allLabMarkers.length}`
  );
  assert.equal(allLabMarkers[0][1], topicId, `${topicId}: data-agentic-worked-lab value mismatch`);

  const startIndex = html.search(markerPattern);
  assert(startIndex !== -1, `${topicId}: data-agentic-worked-lab not found`);
  const endIndex = html.indexOf('data-agentic-summary', startIndex);
  assert(endIndex !== -1, `${topicId}: data-agentic-summary not found after worked lab`);
  const labHtml = html.slice(startIndex, endIndex);
  const labPlain = cleanText(labHtml);
  assert(labPlain.length > 500, `${topicId}: Lab section is unexpectedly empty or short`);

  const headings = [...labHtml.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => cleanText(m[1]));
  assert(
    headings.some(h => h.includes(labData.labTitle) || h.includes(decodeHtml(labData.labTitle))),
    `${topicId}: Expected lab heading containing "${labData.labTitle}"; found headings: ${JSON.stringify(headings)}`
  );

  // B. Learning content
  assert(labHtml.includes('data-formula-block'), `${topicId}: Missing data-formula-block in lab`);
  if (labData.formulaExplanation) {
    assert(
      labPlain.includes(normalize(decodeHtml(labData.formulaExplanation))),
      `${topicId}: Missing formula explanation`
    );
  }

  assert.equal(labData.steps.length, 4, `${topicId}: Expected lab JSON to have 4 steps`);
  for (let i = 0; i < labData.steps.length; i++) {
    const step = labData.steps[i];
    assert(
      labPlain.includes(normalize(decodeHtml(step))),
      `${topicId}: Missing lab step ${i + 1}: "${step}"`
    );
  }

  assert(
    labPlain.includes('Complete Python Exercise'),
    `${topicId}: Missing "Complete Python Exercise" title in lab`
  );
  assert(labHtml.includes('data-code-block'), `${topicId}: Missing data-code-block in lab`);

  assert(
    labPlain.includes('Output from This Exact Program'),
    `${topicId}: Missing "Output from This Exact Program" title in lab`
  );

  assert.equal(labData.notes.length, 3, `${topicId}: Expected lab JSON to have 3 notes`);
  assert(
    labPlain.includes('What This Run Shows'),
    `${topicId}: Missing "What This Run Shows" section in lab`
  );
  for (let i = 0; i < labData.notes.length; i++) {
    const note = labData.notes[i];
    assert(
      labPlain.includes(normalize(decodeHtml(note))),
      `${topicId}: Missing explanatory note ${i + 1}: "${note}"`
    );
  }

  assert(
    labPlain.includes('From the Exercise to an Application'),
    `${topicId}: Missing "From the Exercise to an Application" table in lab`
  );
  for (const row of labData.choices) {
    assert(
      labPlain.includes(normalize(decodeHtml(row[0]))),
      `${topicId}: Missing application choice situation: "${row[0]}"`
    );
  }

  assert(
    labPlain.includes('What This Exercise Does Not Prove'),
    `${topicId}: Missing "What This Exercise Does Not Prove" callout`
  );
  assert(
    labPlain.includes(normalize(decodeHtml(labData.limit))),
    `${topicId}: Missing limitation text: "${labData.limit}"`
  );

  assert(
    labPlain.includes(normalize(decodeHtml(labData.experiment))),
    `${topicId}: Missing experiment question: "${labData.experiment}"`
  );
  assert(
    labPlain.includes(normalize(decodeHtml(labData.answer))),
    `${topicId}: Missing experiment explanation: "${labData.answer}"`
  );

  // C. Diagram
  const allFigureMarkers = [...html.matchAll(/data-agentic-lab-figure=["']([^"']*)["']/gi)];
  assert.equal(
    allFigureMarkers.length,
    1,
    `${topicId}: Expected exactly one data-agentic-lab-figure; found ${allFigureMarkers.length}`
  );
  assert.equal(allFigureMarkers[0][1], topicId, `${topicId}: data-agentic-lab-figure value mismatch`);

  const figureMatches = [...html.matchAll(new RegExp(`<figure\\b[^>]*data-agentic-lab-figure=["']${topicId}["'][^>]*>([\\s\\S]*?)<\\/figure>`, 'gi'))];
  assert.equal(
    figureMatches.length,
    1,
    `${topicId}: Expected figure element for data-agentic-lab-figure; found ${figureMatches.length}`
  );
  const figureHtml = figureMatches[0][1];
  assert(
    figureHtml.includes('data-agentic-lab-svg'),
    `${topicId}: Missing SVG diagram in lab figure`
  );
  assert(
    /<title\b[^>]*>[\s\S]*?<\/title>/i.test(figureHtml),
    `${topicId}: Missing accessible <title> in SVG diagram`
  );
}

function verifyAgenticQuizIntegrity(agenticQuizData, expectedTopicIds) {
  assert(agenticQuizData && typeof agenticQuizData === 'object', 'Missing agenticQuizData');
  const quizTopicIds = Object.keys(agenticQuizData);
  assert.equal(
    quizTopicIds.length,
    16,
    `Expected exactly 16 Agentic AI quiz topics; found ${quizTopicIds.length}`
  );

  for (const topicId of expectedTopicIds) {
    assert(
      topicId in agenticQuizData,
      `Expected Agentic AI quiz data for ${topicId}`
    );
    const questions = agenticQuizData[topicId];
    assert(Array.isArray(questions), `${topicId}: Quiz questions must be an array`);
    assert.equal(
      questions.length,
      5,
      `${topicId}: Expected exactly 5 quiz questions; found ${questions.length}`
    );
    for (const q of questions) {
      assert(typeof q.id === 'number', `${topicId}: Quiz question missing numeric id`);
      assert(typeof q.question === 'string' && q.question.trim().length > 0, `${topicId}: Empty quiz question text`);
      assert(Array.isArray(q.options) && q.options.length >= 2, `${topicId}: Quiz question options invalid`);
      assert(
        typeof q.correctAnswerIndex === 'number' &&
        q.correctAnswerIndex >= 0 &&
        q.correctAnswerIndex < q.options.length,
        `${topicId}: Invalid correctAnswerIndex`
      );
      assert(typeof q.explanation === 'string' && q.explanation.trim().length > 0, `${topicId}: Empty explanation`);
    }
  }

  const totalQuestions = quizTopicIds.reduce((sum, id) => sum + agenticQuizData[id].length, 0);
  assert.equal(
    totalQuestions,
    80,
    `Expected exactly 80 total Agentic AI quiz questions; found ${totalQuestions}`
  );
}

function onlyMatch(html, pattern, label) {
  const matches = [...html.matchAll(pattern)];
  assert.equal(matches.length, 1, `Expected exactly one ${label}; found ${matches.length}`);
  return matches[0][1];
}

function verifyPage(html, page) {
  const head = onlyMatch(html, /<head>([^]*?)<\/head>/gi, 'head');
  const actualTitle = onlyMatch(head, /<title>([^]*?)<\/title>/gi, 'title');
  assert.equal(actualTitle, escapeHtml(page.title));
  assert(
    page.title.length <= 60,
    `SEO Title regression: Title exceeds 60 characters for route ${page.route} (${page.title.length} chars):\n  Actual Title: "${page.title}"`
  );
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
    const article = schema['@graph']?.find(node => node['@type']?.includes('TechArticle'));
    const breadcrumb = schema['@graph']?.find(node => node['@type'] === 'BreadcrumbList');
    const software = schema['@graph']?.find(node => node['@type'] === 'SoftwareSourceCode');
    const howto = schema['@graph']?.find(node => node['@type'] === 'HowTo');
    assert(article?.['@type']?.includes('LearningResource'), 'Project missing LearningResource');
    assert.equal(article?.headline, page.title, 'Project headline');
    assert.equal(breadcrumb?.itemListElement?.at(-1)?.item, page.canonical, 'Project breadcrumb canonical');
    assert.equal(software?.url, page.canonical, 'Project code schema URL');
    assert(software?.codeRepository?.startsWith('https://github.com/learnmlacademy/learnmlacademy/tree/main/projects/'), 'Project code repository');
    assert.equal(howto?.step?.length, 4, 'Project how-to steps');
    assert(page.image?.startsWith('/project-handbooks/'), 'Project image required');
  }
  if (page.kind === 'blog') {
    const schema = JSON.parse(onlyMatch(head, /<script\b[^>]*id="schema-topic"[^>]*>([^]*?)<\/script>/gi, 'blog schema'));
    const article = schema['@graph']?.find(node => node['@type']?.includes('TechArticle'));
    const breadcrumb = schema['@graph']?.find(node => node['@type'] === 'BreadcrumbList');
    assert(article?.['@type']?.includes('LearningResource'), 'Blog missing LearningResource');
    assert.equal(article?.headline, page.title, 'Blog headline');
    assert.equal(breadcrumb?.itemListElement?.at(-1)?.item, page.canonical, 'Blog breadcrumb canonical');
  }
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
    assert.equal(article.dateModified, page.dateModified, `dateModified mismatch for ${page.route}: expected ${page.dateModified}, got ${article.dateModified}`);
    if (page.route === '/learn/rag') {
      assert.equal(article.dateModified, '2026-10-16', `RAG dateModified must be 2026-10-16, got ${article.dateModified}`);
    }
    const breadcrumb = schema['@graph'].find(item => item['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumb?.itemListElement.at(-1).item, page.canonical);
    assert.equal(breadcrumb?.itemListElement.at(-2).name, page.category.replace(/^\d+\.\s*/, ''));
    assert.equal(onlyMatch(head, /<meta\b[^>]*property="og:type"[^>]*content="([^"]*)"[^>]*>/gi, 'og:type'), 'article');

    const topicId = page.route.replace(/^\/learn\//, '');
    if (AGENTIC_TOPIC_SET.has(topicId)) {
      verifyAgenticWorkedLab(html, topicId, agenticLabs[topicId]);
      verifiedAgenticLabs.add(topicId);
    }
  }
}

const vite = await createPrerenderServer();
try {
  const { agenticQuizData } = await vite.ssrLoadModule('/src/data/agenticQuizzes.ts');
  verifyAgenticQuizIntegrity(agenticQuizData, AGENTIC_TOPIC_IDS);

  const pages = await loadPages(vite);
  const lessons = pages.filter(page => page.kind === 'lesson');
  const lessonFiles = (await fs.readdir('dist/learn')).filter(name => name.endsWith('.html'));
  assert.equal(lessonFiles.length, 167, 'Expected exactly 167 generated canonical lesson files');
  assert.equal(new Set(lessons.map(page => page.title)).size, 167, 'Lesson SEO titles must be unique');
  assert.equal(new Set(pages.map(page => page.title)).size, pages.length, 'All page SEO titles across the site must be unique');
  const failures = [];
  for (const page of pages) {
    try {
      verifyPage(await fs.readFile(outputPathForRoute(page.route), 'utf8'), page);
    } catch (error) {
      failures.push(`${page.route}: ${error.message}`);
    }
  }
  assert.equal(failures.length, 0, `Prerender verification failed:\n${failures.join('\n')}`);
  assert.equal(
    verifiedAgenticLabs.size,
    16,
    `Expected exactly 16 Agentic AI worked labs verified; found ${verifiedAgenticLabs.size}`
  );
  console.log(`verify:prerender PASS — ${lessons.length} lessons, ${pages.filter(p => p.kind === 'blog').length} blog posts, ${pages.filter(p => p.kind === 'static').length} static pages; 16 Agentic AI worked labs & diagrams verified; 80 quizzes intact; unique titles, exact metadata/canonicals, schemas and rendered content.`);
} finally {
  await vite.close();
}
