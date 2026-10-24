import assert from 'node:assert/strict';
import { curriculum, getTopicById } from '../src/data/curriculum';
import { projectPortfolio } from '../src/data/projectPortfolio';

// 1. Check Projects Category in Curriculum
const projectsCategory = curriculum.find(c => c.id === 'projects');
assert(projectsCategory, 'Projects category must exist in curriculum');
assert.equal(projectsCategory.subtopics.length, 8, 'Projects category must contain exactly 8 curriculum tutorial lessons');

const expectedLessons = [
  { id: 'project-customer-churn', title: 'Customer Churn Prediction — End-to-End ML Project' },
  { id: 'project-credit-risk', title: 'Credit Risk Prediction with Explainable ML' },
  { id: 'project-sales-forecasting', title: 'Sales Forecasting — End-to-End Time-Series Project' },
  { id: 'project-image-classification', title: 'Image Classification with Transfer Learning' },
  { id: 'project-genai-app', title: 'Build a Generative AI Application End-to-End' },
  { id: 'project-rag-document-qa', title: 'Build a Document Q&A System with RAG' },
  { id: 'project-ai-agent', title: 'Build an AI Agent with Tools & Memory' },
  { id: 'project-multi-agent-research', title: 'Build a Multi-Agent Research Assistant' },
];

for (let i = 0; i < expectedLessons.length; i++) {
  const actual = projectsCategory.subtopics[i];
  const expected = expectedLessons[i];
  assert.equal(actual.id, expected.id, `Subtopic ${i} id mismatch`);
  assert.equal(actual.title, expected.title, `Subtopic ${i} title mismatch`);

  const resolved = getTopicById(actual.id);
  assert(resolved, `Lesson ${actual.id} must resolve via getTopicById`);
  assert.equal(resolved.category.id, 'projects', `Lesson ${actual.id} category mismatch`);
}

// 2. Check Project Portfolio Handbooks
assert.equal(projectPortfolio.length, 12, 'Must have exactly 12 dedicated project handbooks');
const expectedProjects = [
  'titanic-survival',
  'house-price',
  'credit-card-fraud',
  'customer-segmentation',
  'retail-forecasting',
  'movie-recommender',
  'disaster-tweets',
  'digit-recognizer',
  'ai-content-creator',
  'pdf-rag',
  'ai-research-assistant',
  'model-to-production',
];

const portfolioIds = projectPortfolio.map(p => p.id);
assert.deepEqual(portfolioIds, expectedProjects, 'Project portfolio IDs must match expected 12 handbooks');

for (const project of projectPortfolio) {
  assert(project.title && project.title.length > 0, `Project ${project.id} missing title`);
  assert(project.shortTitle && project.shortTitle.length > 0, `Project ${project.id} missing shortTitle`);
  assert(project.build && project.build.length > 0, `Project ${project.id} missing build`);
  assert(Array.isArray(project.tools) && project.tools.length > 0, `Project ${project.id} missing tools`);
  assert.equal(project.status, 'ready', `Project ${project.id} must be ready`);
}

// 3. Verify Starters and Prerequisite Resolution
import fs from 'node:fs';
import path from 'node:path';

const manifestRaw = fs.readFileSync(path.resolve('public/project-starters/manifest.json'), 'utf8');
const manifest = JSON.parse(manifestRaw);
assert.equal(manifest.length, 12, 'Manifest must contain 12 starter entries');
for (const project of projectPortfolio) {
  const item = manifest.find((m: any) => m.project === project.id);
  assert(item, `Manifest missing starter entry for ${project.id}`);
  const zipPath = path.resolve(`public/project-starters/${project.id}.zip`);
  assert(fs.existsSync(zipPath), `Starter archive missing: ${project.id}.zip`);
  const stat = fs.statSync(zipPath);
  assert(stat.size > 1000, `Starter archive too small or empty: ${project.id}.zip`);
  assert.equal(stat.size, item.bytes, `Starter archive size mismatch for ${project.id}.zip`);
}

// 4. Verify all Prerequisite URLs in CorePrerequisitesCard resolve to valid lessons
const prereqSource = fs.readFileSync(path.resolve('src/components/navigation/CorePrerequisitesCard.tsx'), 'utf8');
const urls = [...prereqSource.matchAll(/url:\s*\"([^\"]+)\"/g)].map(m => m[1]);
assert(urls.length > 0, 'Must have prerequisite URLs in CorePrerequisitesCard');

for (const url of urls) {
  const slugMatch = url.match(/^\/learn\/([a-zA-Z0-9-]+)$/);
  assert(slugMatch, `Prerequisite URL ${url} is not a valid /learn/ route`);
  const topic = getTopicById(slugMatch[1]);
  assert(topic, `Prerequisite slug ${slugMatch[1]} does not resolve to any curriculum lesson`);
}

console.log('ALL PROJECT TAXONOMY CHECKS PASS');

