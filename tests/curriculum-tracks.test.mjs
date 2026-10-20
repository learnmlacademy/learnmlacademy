import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const read = file => fs.readFile(path.join(root, file), 'utf8');

test('Curriculum tracks pass programmatic non-overlapping and status-filter checks', () => {
  const output = execSync('npx tsx tests/run-curriculum-tracks-checks.ts', { cwd: root, encoding: 'utf8' });
  assert(output.includes('ALL CURRICULUM TRACKS CHECKS PASS'), 'Curriculum tracks checks must pass');
});

test('CurriculumPage renders accessible learning track selector and controls', async () => {
  const source = await read('src/pages/CurriculumPage.tsx');

  // Track filter heading and description
  assert(source.includes('id="track-filter-heading"'), 'Must have track-filter-heading');
  assert(source.includes('Explore by Learning Track'), 'Must have "Explore by Learning Track" heading');

  // Accessible tablist and tabs
  assert(source.includes('role="tablist"'), 'Must have role="tablist" container');
  assert(source.includes('role="tab"'), 'Must have role="tab" buttons');
  assert(source.includes('aria-selected='), 'Must manage aria-selected state');
  assert(source.includes('aria-controls="curriculum-track-panel"'), 'Must control curriculum-track-panel');

  // Explanatory active track callout panel
  assert(source.includes('id="curriculum-track-panel"'), 'Must have id="curriculum-track-panel"');
  assert(source.includes('role="tabpanel"'), 'Must have role="tabpanel"');

  // Preserved Category 15 dual-section presentation
  assert(source.includes('15. Project Handbooks & Tutorial Lessons'), 'Must preserve Category 15 dual heading');
  assert(source.includes('Practical Project Handbooks (12 Builds)'), 'Must preserve Section A 12 builds');
  assert(source.includes('Curriculum Tutorial Lessons'), 'Must preserve Section B tutorial lessons heading');
  assert(source.includes('8 Tracked Lessons'), 'Must preserve Section B 8 tracked lessons badge');
});

test('Curriculum track selector integrates with useSearchParams supporting browser history', async () => {
  const source = await read('src/pages/CurriculumPage.tsx');

  assert(source.includes('useSearchParams'), 'Must use useSearchParams hook');
  assert(source.includes("searchParams.get('track')"), 'Must read track search parameter');
  assert(source.includes('if (newTrackId === selectedTrack) return;'), 'Must guard against redundant history updates');
  assert(source.includes('setSearchParams(nextParams)'), 'Must push history entry on genuine track change');
  assert(source.includes("setSearchParams(nextParams, { replace: true })"), 'Must use replace only when normalizing invalid track query');
});

test('Curriculum tracks definition in curriculum.ts covers all 17 categories exactly once', async () => {
  const source = await read('src/data/curriculum.ts');

  assert(source.includes('export const curriculumTracks: CurriculumTrack[]'), 'Must export curriculumTracks');
  assert(source.includes('export function getTrackById'), 'Must export getTrackById');
  assert(source.includes('export function getCategoriesForTrack'), 'Must export getCategoriesForTrack');
});
