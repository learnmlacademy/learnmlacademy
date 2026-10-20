import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const read = file => fs.readFile(path.join(root, file), 'utf8');

test('SiteFooter renders Projects link with correct route', async () => {
  const footer = await read('src/components/layout/SiteFooter.tsx');
  assert(
    footer.includes('to: "/projects", label: "Projects"') ||
    footer.includes("to: '/projects', label: 'Projects'"),
    'SiteFooter missing link to /projects with label Projects'
  );
  assert(footer.includes('<Link key={link.to} to={link.to}'), 'Footer must render dynamic Links');
});

test('SearchResult does not hardcode /learn/ and supports both lessons and projects', async () => {
  const resultSource = await read('src/components/search/SearchResult.tsx');
  assert(!resultSource.includes('to={`/learn/${lesson.id}`}'), 'SearchResult must not hardcode /learn/ destination');
  assert(resultSource.includes('to={lesson.destination}'), 'SearchResult must use lesson.destination');
  assert(resultSource.includes('Project Handbook'), 'SearchResult must visibly label project handbooks');
  assert(resultSource.includes('Lesson'), 'SearchResult must visibly label lessons');
});

test('LessonSearch navigates to destination on Enter and does not hardcode /learn/', async () => {
  const searchSource = await read('src/components/search/LessonSearch.tsx');
  assert(!searchSource.includes('navigate(`/learn/${'), 'LessonSearch must not hardcode navigate to /learn/');
  assert(searchSource.includes('navigate(destination)'), 'LessonSearch must navigate to selected destination');
  assert(searchSource.includes('choose(selected.destination)'), 'Enter key must choose selected.destination');
  assert(searchSource.includes('No lessons or project handbooks match'), 'Empty state must mention lessons and project handbooks');
});

test('learningNavigation exports unified search items derived from curriculum and projectPortfolio', async () => {
  const navSource = await read('src/data/learningNavigation.ts');
  assert(/import\s*\{\s*projectPortfolio\s*\}\s*from\s*['"]\.\/projectPortfolio['"]/.test(navSource), 'Must import projectPortfolio');
  assert(/kind:\s*['"]lesson['"]/.test(navSource), 'Must tag lessons');
  assert(/kind:\s*['"]project['"]/.test(navSource), 'Must tag projects');
  assert(navSource.includes('destination: `/projects/${project.id}`'), 'Projects must route to /projects/${project.id}');
  assert(navSource.includes('destination: `/learn/${topic.id}`'), 'Lessons must route to /learn/${topic.id}');
});

test('Search returns correct acceptance query results for all required examples', () => {
  const output = execSync('npx tsx tests/run-search-checks.ts', { cwd: root, encoding: 'utf8' });
  assert(output.includes('ALL ACCEPTANCE SEARCHES PASS'), 'Acceptance searches must pass');
});
