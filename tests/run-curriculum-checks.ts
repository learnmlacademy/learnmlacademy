import assert from 'node:assert/strict';
import { curriculum, getTopicById } from '../src/data/curriculum';

const EXPECTED_CATEGORIES = [
  '1. Foundations',
  '2. Python & ML Libraries',
  '3. Data Preprocessing & Feature Engineering',
  '4. Supervised Learning',
  '5. Ensemble Learning',
  '6. Unsupervised Learning',
  '7. Model Evaluation & Optimization',
  '8. Time Series & Forecasting',
  '9. Advanced Learning Paradigms',
  '10. Deep Learning',
  '11. Advanced Deep Learning Topics',
  '12. Generative AI',
  '13. Large Language Models',
  '14. Agentic AI',
  '15. Projects',
  '16. AI Engineering & MLOps',
  '17. Career & Interview Preparation',
];

const EXPECTED_CATEGORY_COUNTS: Record<string, number> = {
  'foundations': 7,
  'python-ml-libs': 4,
  'data-preprocessing': 8,
  'supervised-learning': 12,
  'ensemble-learning': 6,
  'unsupervised-learning': 7,
  'model-evaluation': 8,
  'time-series': 4,
  'advanced-paradigms': 4,
  'deep-learning': 24,
  'advanced-deep-learning': 3,
  'generative-ai': 17,
  'large-language-models': 16,
  'agentic-ai': 16,
  'projects': 8,
  'ai-engineering-mlops': 8,
  'interview-preparation': 15,
};

// Check 1: 17 categories exactly matching sequence
assert.equal(curriculum.length, 17, 'Must have exactly 17 categories');
const titles = curriculum.map(c => c.title);
assert.deepEqual(titles, EXPECTED_CATEGORIES, 'Category titles must match standardized 1..17 sequence');

// Check 2: Sequential numbering 1..17
const numbers = titles.map(t => {
  const match = t.match(/^(\d+)\.\s+/);
  assert(match, `Title must start with number dot space: ${t}`);
  return Number(match[1]);
});
assert.deepEqual(numbers, Array.from({ length: 17 }, (_, i) => i + 1), 'Numbers must be 1 to 17 sequentially');
assert.equal(new Set(numbers).size, 17, 'No duplicate category numbers');

// Check 3: Every individual category has exact expected lesson count
for (const cat of curriculum) {
  const expectedCount = EXPECTED_CATEGORY_COUNTS[cat.id];
  assert.equal(
    cat.subtopics.length,
    expectedCount,
    `Category ${cat.title} (${cat.id}) must have exactly ${expectedCount} lessons, found ${cat.subtopics.length}`
  );
}

// Check 4: 167 total lessons and 167 unique lesson IDs
const allSubtopicIds = curriculum.flatMap(c => c.subtopics.map(st => st.id));
assert.equal(allSubtopicIds.length, 167, 'Total lessons sum must remain 167');
assert.equal(new Set(allSubtopicIds).size, 167, 'All 167 lesson IDs must be completely unique');

// Check 4: Explicit Beginner difficulty on introductory lessons
const introIds = [
  'deep-learning-intro',
  'generative-ai-intro',
  'llm-intro',
  'agentic-ai-intro',
];

for (const id of introIds) {
  const topic = getTopicById(id);
  assert(topic, `Lesson ${id} must exist in curriculum`);
  assert.equal(
    topic.subtopic.difficulty,
    'Beginner',
    `Lesson ${id} must have explicit Beginner difficulty override`
  );
}

console.log('ALL CURRICULUM NUMBERING AND DIFFICULTY CHECKS PASS');
