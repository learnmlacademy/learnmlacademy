import assert from 'node:assert/strict';
import { curriculum } from '../src/data/curriculum';
import { projectPortfolio } from '../src/data/projectPortfolio';

// 1. Establish Category & Subtopics
const projectsCat = curriculum.find(c => c.id === 'projects');
assert(projectsCat, 'Projects category must exist');
const subtopics = projectsCat.subtopics;
assert.equal(subtopics.length, 8, 'Must have 8 subtopics');

// 2. Simulate Filter Logic as used in CurriculumPage
function filterSubtopics(filter: 'all' | 'completed' | 'incomplete', completedSet: Set<string>) {
  return subtopics.filter((topic) => {
    const completed = completedSet.has(topic.id);
    if (filter === 'completed') return completed;
    if (filter === 'incomplete') return !completed;
    return true;
  });
}

function computeCategoryProgress(completedSet: Set<string>) {
  const total = subtopics.length;
  let completed = 0;
  for (const st of subtopics) {
    if (completedSet.has(st.id)) completed++;
  }
  const percentage = Math.round((completed / total) * 100);
  return { completed, total, percentage };
}

// Check 1: Initial state (0 completed)
let completed = new Set<string>();
assert.equal(filterSubtopics('all', completed).length, 8, 'Initial "all" must display 8 lessons');
assert.equal(filterSubtopics('completed', completed).length, 0, 'Initial "completed" must display 0 lessons');
assert.equal(filterSubtopics('incomplete', completed).length, 8, 'Initial "incomplete" must display 8 lessons');

let prog = computeCategoryProgress(completed);
assert.equal(prog.completed, 0);
assert.equal(prog.total, 8);
assert.equal(prog.percentage, 0);

// Check 2: Toggle 3 lessons complete
completed.add('project-customer-churn');
completed.add('project-credit-risk');
completed.add('project-rag-document-qa');

const allItems = filterSubtopics('all', completed);
const completedItems = filterSubtopics('completed', completed);
const incompleteItems = filterSubtopics('incomplete', completed);

assert.equal(allItems.length, 8, '"all" filter must always contain all 8 tutorial lessons');
assert.equal(completedItems.length, 3, '"completed" filter must contain only completed lessons');
assert.deepEqual(
  completedItems.map(i => i.id),
  ['project-customer-churn', 'project-credit-risk', 'project-rag-document-qa'],
  'Completed items match toggled lessons'
);
assert.equal(incompleteItems.length, 5, '"incomplete" filter must contain only remaining 5 lessons');
assert(!incompleteItems.some(i => completed.has(i.id)), 'Incomplete items must not contain completed lessons');

prog = computeCategoryProgress(completed);
assert.equal(prog.completed, 3);
assert.equal(prog.total, 8);
assert.equal(prog.percentage, 38); // 3 / 8 = 37.5% -> round 38%

// Check 3: Toggle one lesson back to incomplete
completed.delete('project-customer-churn');
assert.equal(filterSubtopics('completed', completed).length, 2);
assert.equal(filterSubtopics('incomplete', completed).length, 6);
prog = computeCategoryProgress(completed);
assert.equal(prog.completed, 2);
assert.equal(prog.percentage, 25);

// Check 4: Complete all 8 lessons
for (const st of subtopics) {
  completed.add(st.id);
}
assert.equal(filterSubtopics('all', completed).length, 8);
assert.equal(filterSubtopics('completed', completed).length, 8);
assert.equal(filterSubtopics('incomplete', completed).length, 0);
prog = computeCategoryProgress(completed);
assert.equal(prog.completed, 8);
assert.equal(prog.percentage, 100);

// Check 5: 12 Handbooks remain completely independent of filter and lesson completion
assert.equal(projectPortfolio.length, 12, 'Handbooks array must remain 12');
for (const p of projectPortfolio) {
  assert(!completed.has(p.id), `Handbook ${p.id} must not be confused with lesson IDs in completed set`);
}

// Check 6: Total curriculum lessons remain 167
const totalCurriculumLessons = curriculum.reduce((sum, c) => sum + c.subtopics.length, 0);
assert.equal(totalCurriculumLessons, 167, 'Total curriculum lessons must be exactly 167');

// Check 7: Storage format serialization compatibility
const serialized = JSON.stringify(Array.from(completed));
const deserialized = JSON.parse(serialized);
assert(Array.isArray(deserialized), 'Storage must parse as an array');
assert.equal(deserialized.length, 8, 'Storage must preserve completed lesson count');
assert(deserialized.includes('project-credit-risk'));

console.log('ALL PROJECT FILTERS AND PROGRESS CHECKS PASS');
