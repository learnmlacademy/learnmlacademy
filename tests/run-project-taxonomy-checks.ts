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

console.log('ALL PROJECT TAXONOMY CHECKS PASS');
