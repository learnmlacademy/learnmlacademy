import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { curriculum, getTopicById } from '../src/data/curriculum.ts';
import { projectPortfolio } from '../src/data/projectPortfolio.ts';

const root = process.cwd();
const read = file => fs.readFile(path.join(root, file), 'utf8');

test('HomePage renders search-first hero with unified LessonSearch and balanced popular searches', async () => {
  const source = await read('src/pages/HomePage.tsx');

  // Hero headline and explanation
  assert(source.includes('What do you want to'), 'Hero must contain headline');
  assert(source.includes('learn today?'), 'Hero must contain learn today');

  // Unified LessonSearch integration
  assert(source.includes('<LessonSearch'), 'Hero must use unified LessonSearch component');
  assert(
    source.includes('placeholder="Search tutorials & project handbooks'),
    'Search placeholder must mention tutorials and project handbooks'
  );

  // Balanced popular search shortcuts
  const expectedPopular = [
    { label: 'Linear Regression', route: '/learn/linear-regression' },
    { label: 'Neural Networks', route: '/learn/neural-networks' },
    { label: 'Gradient Descent', route: '/learn/gradient-descent' },
    { label: 'Generative AI', route: '/learn/generative-ai-intro' },
    { label: 'RAG', route: '/learn/rag' },
    { label: 'AI Agents', route: '/learn/agentic-ai-intro' },
  ];

  for (const item of expectedPopular) {
    assert(source.includes(`label: '${item.label}', route: '${item.route}'`), `Must include popular topic ${item.label}`);
    const topicId = item.route.replace('/learn/', '');
    assert(getTopicById(topicId), `Popular search ${item.label} must resolve to a valid curriculum lesson`);
  }
});

test('HomePage renders Choose your learning path section with four distinct entry points', async () => {
  const source = await read('src/pages/HomePage.tsx');

  // Section title & description
  assert(source.includes('Choose your learning path'), 'Must have "Choose your learning path" heading');
  assert(
    source.includes('One complete AI library, four focused ways to learn'),
    'Must introduce goal-based discovery'
  );

  // Card A: Start from the beginning
  assert(source.includes('Start from the beginning'), 'Must render Card A title');
  assert(source.includes('to="/learn/what-is-ml"'), 'Card A must link to /learn/what-is-ml');
  assert(source.includes('to="/learn/python-for-ml"'), 'Card A must link to /learn/python-for-ml');
  assert(source.includes('to="/learn/linear-regression"'), 'Card A must link to /learn/linear-regression');
  assert(source.includes('to="/curriculum"'), 'Card A must link to /curriculum');

  // Card B: Learn a specific topic
  assert(source.includes('Learn a specific topic'), 'Must render Card B title');
  assert(source.includes('to="/learn/deep-learning-intro"'), 'Card B must link to /learn/deep-learning-intro');
  assert(source.includes('to="/learn/generative-ai-intro"'), 'Card B must link to /learn/generative-ai-intro');
  assert(source.includes('to="/learn/llm-intro"'), 'Card B must link to /learn/llm-intro');
  assert(source.includes('to="/learn/agentic-ai-intro"'), 'Card B must link to /learn/agentic-ai-intro');
  assert(source.includes('href="#browse-by-topic"'), 'Card B must link to #browse-by-topic anchor');

  // Card C: Deepen professional expertise
  assert(source.includes('Deepen professional expertise'), 'Must render Card C title');
  assert(source.includes('to="/learn/advanced-rag"'), 'Card C must link to /learn/advanced-rag');
  assert(source.includes('to="/learn/llm-evaluation"'), 'Card C must link to /learn/llm-evaluation');
  assert(source.includes('to="/learn/agent-security"'), 'Card C must link to /learn/agent-security');
  assert(source.includes('to="/learn/ml-system-design"'), 'Card C must link to /learn/ml-system-design');

  // Card D: Build practical AI systems
  assert(source.includes('Build practical AI systems'), 'Must render Card D title');
  assert(source.includes('to="/projects"'), 'Card D must link to /projects');
  assert(source.includes('to="/projects/titanic-survival"'), 'Card D must link to /projects/titanic-survival');
  assert(source.includes('to="/projects/pdf-rag"'), 'Card D must link to /projects/pdf-rag');
  assert(source.includes('to="/projects/ai-research-assistant"'), 'Card D must link to /projects/ai-research-assistant');
  assert(source.includes('to="/projects/model-to-production"'), 'Card D must link to /projects/model-to-production');
});

test('All entry-point destination routes in HomePage resolve to valid curriculum lessons or handbooks', () => {
  const verifiedLessonIds = [
    'what-is-ml',
    'python-for-ml',
    'linear-regression',
    'deep-learning-intro',
    'generative-ai-intro',
    'llm-intro',
    'agentic-ai-intro',
    'advanced-rag',
    'llm-evaluation',
    'agent-security',
    'ml-system-design',
  ];

  for (const id of verifiedLessonIds) {
    const topic = getTopicById(id);
    assert(topic, `Lesson route /learn/${id} must resolve in curriculum`);
  }

  const verifiedProjectIds = [
    'titanic-survival',
    'pdf-rag',
    'ai-research-assistant',
    'model-to-production',
  ];

  for (const id of verifiedProjectIds) {
    const project = projectPortfolio.find(p => p.id === id);
    assert(project, `Handbook route /projects/${id} must resolve in projectPortfolio`);
    assert.equal(project.status, 'ready');
  }
});

test('Career and interview resources remain accessible on HomePage', async () => {
  const source = await read('src/pages/HomePage.tsx');

  assert(source.includes('InterviewHandbookShowcase'), 'Must retain InterviewHandbookShowcase component');
  assert(source.includes('#free-interview-handbooks'), 'Must retain #free-interview-handbooks anchor');
  assert(source.includes('10 Free Interview Handbooks'), 'Must feature 10 Free Interview Handbooks');
  assert(source.includes('/learn/ml-interview-questions'), 'Must link to ml-interview-questions');
  assert(source.includes('/learn/python-ai-ml-interview'), 'Must link to python-ai-ml-interview');
  assert(source.includes('/learn/genai-llm-rag-interview'), 'Must link to genai-llm-rag-interview');
  assert(source.includes('/learn/ml-ai-system-design-interview'), 'Must link to ml-ai-system-design-interview');
});

test('HomePage satisfies the six user journeys', async () => {
  const source = await read('src/pages/HomePage.tsx');

  // Journey 1: Beginner can start with foundations
  assert(source.includes('/learn/what-is-ml'), 'Journey 1: Beginner path to What Is ML exists');

  // Journey 2: Direct jump to Generative AI without classical ML
  assert(source.includes('/learn/generative-ai-intro'), 'Journey 2: Direct GenAI path exists');

  // Journey 3: Experienced ML practitioner direct advanced access
  assert(source.includes('/learn/advanced-rag') && source.includes('/learn/ml-system-design'), 'Journey 3: Advanced direct paths exist');

  // Journey 4: Software engineer building an application
  assert(source.includes('to="/projects"'), 'Journey 4: Project handbooks directory link exists');

  // Journey 5: Career-focused learner interview resources
  assert(source.includes('10 Free Interview Handbooks') && source.includes('openHandbooks'), 'Journey 5: Interview handbooks & questions accessible');

  // Journey 6: Search-first learner
  assert(source.includes('<LessonSearch'), 'Journey 6: Global unified search exists in hero');
});
