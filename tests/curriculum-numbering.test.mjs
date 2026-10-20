import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const read = file => fs.readFile(path.join(root, file), 'utf8');

test('Curriculum has 17 sequentially numbered categories, 167 lessons, and explicit beginner overrides', () => {
  const output = execSync('npx tsx tests/run-curriculum-checks.ts', { cwd: root, encoding: 'utf8' });
  assert(output.includes('ALL CURRICULUM NUMBERING AND DIFFICULTY CHECKS PASS'), 'Curriculum checks must pass');
});

test('CurriculumPage renders 15. Project Handbooks and does not retain stale 14.', async () => {
  const source = await read('src/pages/CurriculumPage.tsx');
  assert(source.includes('15. Project Handbooks'), 'CurriculumPage must display 15. Project Handbooks');
  assert(!source.includes('14. Project Handbooks'), 'CurriculumPage must not contain stale 14. Project Handbooks');
});

test('LessonShell and TopicPage wire subtopic difficulty to LessonHeader', async () => {
  const topicPageSource = await read('src/pages/TopicPage.tsx');
  assert(topicPageSource.includes('difficulty={subtopic.difficulty}'), 'TopicPage must pass subtopic.difficulty to LessonShell');

  const shellSource = await read('src/components/lesson/LessonShell.tsx');
  assert(shellSource.includes('difficulty?:'), 'LessonShellProps must accept difficulty');
  assert(shellSource.includes('difficulty={difficulty}'), 'LessonShell must pass difficulty to LessonHeader');
});

test('LessonHeader uses explicit override before falling back to category', async () => {
  const headerSource = await read('src/components/lesson/LessonHeader.tsx');
  assert(
    headerSource.includes("if (override === 'Beginner' || override === 'Intermediate' || override === 'Advanced')"),
    'LessonHeader must prioritize explicit difficulty override'
  );
});
