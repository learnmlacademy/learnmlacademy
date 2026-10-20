import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const read = file => fs.readFile(path.join(root, file), 'utf8');

test('Curriculum has 8 project lessons and portfolio has 12 project handbooks', () => {
  const output = execSync('npx tsx tests/run-project-taxonomy-checks.ts', { cwd: root, encoding: 'utf8' });
  assert(output.includes('ALL PROJECT TAXONOMY CHECKS PASS'), 'Project taxonomy checks must pass');
});

test('Project tutorial filters, progress calculations, and storage format pass all verification cases', () => {
  const output = execSync('npx tsx tests/run-project-filters-checks.ts', { cwd: root, encoding: 'utf8' });
  assert(output.includes('ALL PROJECT FILTERS AND PROGRESS CHECKS PASS'), 'Filters and progress checks must pass');
});

test('CurriculumPage renders distinct Section A (Handbooks) and Section B (Tutorial Lessons)', async () => {
  const source = await read('src/pages/CurriculumPage.tsx');
  // Category heading
  assert(source.includes('15. Project Handbooks'), 'Must render Category 15 header');
  // Section A: Handbooks
  assert(source.includes('Practical Project Handbooks'), 'Must render Practical Project Handbooks heading');
  assert(source.includes('12 Builds'), 'Must indicate 12 builds');
  assert(source.includes('projectPortfolio.map'), 'Must render handbooks from projectPortfolio');
  assert(source.includes('to={`/projects/${project.id}`}'), 'Must link to /projects/ routes');
  // Section B: Tutorial lessons
  assert(source.includes('Curriculum Tutorial Lessons'), 'Must render Curriculum Tutorial Lessons heading');
  assert(source.includes('8 Tracked Lessons'), 'Must indicate 8 tracked lessons');
  assert(source.includes('to={`/learn/${topic.id}`}'), 'Must link to /learn/:topicId routes');
  assert(source.includes('toggleCompleted(topic.id)'), 'Must allow toggling completion status');
  assert(source.includes('relatedHandbookMap'), 'Must cross-reference related handbook where applicable');
});

test('LessonProjectBridge connects curriculum lessons to project handbooks', async () => {
  const source = await read('src/components/lesson/LessonProjectBridge.tsx');
  assert(source.includes('"project-customer-churn": ["mlops"]'), 'Bridge must support project-customer-churn');
  assert(source.includes('"project-credit-risk": ["fraud"]'), 'Bridge must support project-credit-risk');
  assert(source.includes('"project-sales-forecasting": ["retail"]'), 'Bridge must support project-sales-forecasting');
  assert(source.includes('"project-image-classification": ["digit"]'), 'Bridge must support project-image-classification');
  assert(source.includes('"project-genai-app": ["studio"]'), 'Bridge must support project-genai-app');
  assert(source.includes('"project-rag-document-qa": ["rag"]'), 'Bridge must support project-rag-document-qa');
  assert(source.includes('"project-ai-agent": ["research"]'), 'Bridge must support project-ai-agent');
  assert(source.includes('"project-multi-agent-research": ["research"]'), 'Bridge must support project-multi-agent-research');
});

test('MidLessonCallout contains specific overrides for all 8 project tutorial lessons', async () => {
  const source = await read('src/components/lesson/MidLessonCallout.tsx');
  assert(source.includes('"project-customer-churn":'), 'Callout must override project-customer-churn');
  assert(source.includes('to: "/projects/model-to-production"'), 'Churn must link to model-to-production');
  assert(source.includes('"project-credit-risk":'), 'Callout must override project-credit-risk');
  assert(source.includes('to: "/projects/credit-card-fraud"'), 'Credit risk must link to credit-card-fraud');
  assert(source.includes('"project-sales-forecasting":'), 'Callout must override project-sales-forecasting');
  assert(source.includes('to: "/projects/retail-forecasting"'), 'Sales forecasting must link to retail-forecasting');
  assert(source.includes('"project-image-classification":'), 'Callout must override project-image-classification');
  assert(source.includes('to: "/projects/digit-recognizer"'), 'Image classification must link to digit-recognizer');
  assert(source.includes('"project-genai-app":'), 'Callout must override project-genai-app');
  assert(source.includes('to: "/projects/ai-content-creator"'), 'GenAI app must link to ai-content-creator');
  assert(source.includes('"project-rag-document-qa":'), 'Callout must override project-rag-document-qa');
  assert(source.includes('to: "/projects/pdf-rag"'), 'RAG document QA must link to pdf-rag');
  assert(source.includes('"project-ai-agent":'), 'Callout must override project-ai-agent');
  assert(source.includes('"project-multi-agent-research":'), 'Callout must override project-multi-agent-research');
  assert(source.includes('to: "/projects/ai-research-assistant"'), 'Agent lessons must link to ai-research-assistant');
});
