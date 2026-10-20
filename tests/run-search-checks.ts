import assert from 'node:assert/strict';
import { searchableLessons } from '../src/data/learningNavigation';
import { curriculum } from '../src/data/curriculum';
import { projectPortfolio } from '../src/data/projectPortfolio';

// 0. Search Inventory Verification
const lessonItems = searchableLessons.filter(i => i.kind === 'lesson');
const projectItems = searchableLessons.filter(i => i.kind === 'project');

assert.equal(lessonItems.length, 167, 'Search must index all 167 curriculum lessons');
assert.equal(projectItems.length, 12, 'Search must index all 12 project handbooks');
assert.equal(searchableLessons.length, 179, 'Search must contain exactly 179 items');

// Verify all 167 curriculum lesson IDs occur in the lesson portion
const curriculumLessonIds = curriculum.flatMap(c => c.subtopics.map(s => s.id));
assert.equal(curriculumLessonIds.length, 167);
for (const id of curriculumLessonIds) {
  const match = lessonItems.find(i => i.id === id);
  assert(match, `Lesson ${id} missing from search index`);
  assert.equal(match.destination, `/learn/${id}`, `Lesson ${id} must route to /learn/${id}`);
  assert.equal(match.kind, 'lesson', `Lesson ${id} must have kind 'lesson'`);
}

// Verify all 12 project handbooks occur in the project portion
for (const project of projectPortfolio) {
  const match = projectItems.find(i => i.id === project.id);
  assert(match, `Project handbook ${project.id} missing from search index`);
  assert.equal(match.destination, `/projects/${project.id}`, `Project ${project.id} must route to /projects/${project.id}`);
  assert.equal(match.kind, 'project', `Project ${project.id} must have kind 'project'`);
}

// Verify the 8 project tutorial lessons are present and route to /learn/
const expectedTutorialLessons = [
  'project-customer-churn',
  'project-credit-risk',
  'project-sales-forecasting',
  'project-image-classification',
  'project-genai-app',
  'project-rag-document-qa',
  'project-ai-agent',
  'project-multi-agent-research',
];

for (const id of expectedTutorialLessons) {
  const match = lessonItems.find(i => i.id === id);
  assert(match, `Tutorial lesson ${id} must be in search index`);
  assert.equal(match.destination, `/learn/${id}`, `Tutorial lesson ${id} destination mismatch`);
  assert.equal(match.kind, 'lesson', `Tutorial lesson ${id} must be labeled as lesson`);
}

const normalize = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const tokens = (v: string) => normalize(v).split(/\s+/).filter(Boolean);

export function runSearch(query: string) {
  const qNorm = normalize(query);
  const qTokens = tokens(qNorm);

  return searchableLessons
    .map(item => {
      const title = normalize(item.title);
      const shortTitle = item.shortTitle ? normalize(item.shortTitle) : '';
      const allTitleTokens = [...tokens(title), ...(shortTitle ? tokens(shortTitle) : [])];
      const path = normalize(item.id.replace(/-/g, ' '));
      const context = normalize(item.categoryTitle + ' ' + (item.module || ''));
      const keywordTokens = (item.keywords || []).flatMap(k => tokens(k));
      const descTokens = tokens(item.description || '');

      let rank = Number.POSITIVE_INFINITY;
      if (title === qNorm || shortTitle === qNorm || path === qNorm) rank = 0;
      else if (title.startsWith(qNorm) || (shortTitle && shortTitle.startsWith(qNorm))) rank = 1;
      else if (qTokens.every(t => allTitleTokens.includes(t))) rank = 2;
      else if (qNorm.length > 3 && (title.includes(qNorm) || (shortTitle && shortTitle.includes(qNorm)))) rank = 3;
      else if (qTokens.every(t => tokens(path).includes(t) || tokens(context).includes(t))) rank = 4;
      else if (keywordTokens.length > 0 && qTokens.every(t => keywordTokens.includes(t))) rank = 5;
      else if (descTokens.length > 0 && qTokens.every(t => descTokens.includes(t))) rank = 6;

      return { item, rank };
    })
    .filter(r => Number.isFinite(r.rank))
    .sort((a, b) => a.rank - b.rank || a.item.title.localeCompare(b.item.title))
    .slice(0, 10);
}

// 1. Titanic
const titanic = runSearch('Titanic');
if (!titanic.some(r => r.item.destination === '/projects/titanic-survival')) {
  throw new Error('Titanic project missing');
}

// 2. House Price
const house = runSearch('House Price');
if (!house.some(r => r.item.destination === '/projects/house-price')) {
  throw new Error('House Price project missing');
}

// 3. Fraud
const fraud = runSearch('Fraud');
if (!fraud.some(r => r.item.destination === '/projects/credit-card-fraud')) {
  throw new Error('Fraud project missing');
}

// 4. Customer Segmentation
const cust = runSearch('Customer Segmentation');
if (!cust.some(r => r.item.destination === '/projects/customer-segmentation')) {
  throw new Error('Customer Segmentation project missing');
}

// 5. PDF RAG
const pdfRag = runSearch('PDF RAG');
if (!pdfRag.some(r => r.item.destination === '/projects/pdf-rag')) {
  throw new Error('PDF RAG project missing');
}

// 6. Model to Production
const m2p = runSearch('Model to Production');
if (!m2p.some(r => r.item.destination === '/projects/model-to-production')) {
  throw new Error('Model to Production project missing');
}

// 7. RAG
const rag = runSearch('RAG');
if (!rag.some(r => r.item.kind === 'project' && r.item.destination === '/projects/pdf-rag')) {
  throw new Error('RAG project missing');
}
if (!rag.some(r => r.item.kind === 'lesson' && r.item.destination === '/learn/rag')) {
  throw new Error('RAG lesson missing');
}

// 8. Credit Risk (Testing Tutorial Lesson search)
const creditRisk = runSearch('Credit Risk');
if (!creditRisk.some(r => r.item.kind === 'lesson' && r.item.destination === '/learn/project-credit-risk')) {
  throw new Error('Credit Risk tutorial lesson missing or wrong destination');
}

// 9. Customer Churn (Testing Tutorial Lesson search)
const churn = runSearch('Customer Churn');
if (!churn.some(r => r.item.kind === 'lesson' && r.item.destination === '/learn/project-customer-churn')) {
  throw new Error('Customer Churn tutorial lesson missing or wrong destination');
}

console.log('ALL ACCEPTANCE SEARCHES PASS');
