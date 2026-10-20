import assert from 'node:assert/strict';
import {
  curriculum,
  curriculumTracks,
  getTrackById,
  getCategoriesForTrack,
  type TrackId,
} from '../src/data/curriculum';
import { projectPortfolio } from '../src/data/projectPortfolio';

// 1. All nine tracks are available
const expectedTrackIds: TrackId[] = [
  'all',
  'foundations',
  'deep-learning',
  'generative-ai',
  'large-language-models',
  'agentic-ai',
  'projects',
  'ai-engineering-mlops',
  'career-interview',
];

assert.equal(curriculumTracks.length, 9, 'Must have exactly 9 curriculum tracks');
assert.deepEqual(
  curriculumTracks.map(t => t.id),
  expectedTrackIds,
  'Track IDs must match expected 9 tracks'
);

// 2. Track-to-category mapping includes all 17 categories exactly once across non-All tracks
const nonAllTracks = curriculumTracks.filter(t => t.id !== 'all');
const allAssignedCategories = nonAllTracks.flatMap(t => t.categoryIds);

assert.equal(allAssignedCategories.length, 17, 'Exactly 17 categories must be assigned across non-all tracks');
assert.equal(new Set(allAssignedCategories).size, 17, 'No duplicate category assignments across tracks');

const actualCurriculumCategoryIds = curriculum.map(c => c.id);
assert.deepEqual(
  new Set(allAssignedCategories),
  new Set(actualCurriculumCategoryIds),
  'Every category in the curriculum must belong to exactly one track'
);

// 3. Every track contains the correct categories
const expectedMapping: Record<TrackId, string[]> = {
  'all': actualCurriculumCategoryIds,
  'foundations': [
    'foundations',
    'python-ml-libs',
    'data-preprocessing',
    'supervised-learning',
    'ensemble-learning',
    'unsupervised-learning',
    'model-evaluation',
    'time-series',
    'advanced-paradigms',
  ],
  'deep-learning': ['deep-learning', 'advanced-deep-learning'],
  'generative-ai': ['generative-ai'],
  'large-language-models': ['large-language-models'],
  'agentic-ai': ['agentic-ai'],
  'projects': ['projects'],
  'ai-engineering-mlops': ['ai-engineering-mlops'],
  'career-interview': ['interview-preparation'],
};

for (const [trackId, expectedCats] of Object.entries(expectedMapping)) {
  const track = getTrackById(trackId);
  assert(track, `Track ${trackId} must be resolvable`);
  assert.deepEqual(
    track.categoryIds,
    expectedCats,
    `Track ${trackId} must contain expected categories`
  );

  const categories = getCategoriesForTrack(trackId as TrackId);
  assert.equal(categories.length, expectedCats.length, `getCategoriesForTrack(${trackId}) count mismatch`);
  assert.deepEqual(
    categories.map(c => c.id),
    expectedCats,
    `getCategoriesForTrack(${trackId}) IDs mismatch`
  );
}

// 4. Selecting a track does not modify the underlying curriculum data
const originalLength = curriculum.length;
const originalCategoryIds = curriculum.map(c => c.id);
const originalTotalLessons = curriculum.reduce((acc, c) => acc + c.subtopics.length, 0);

for (const track of curriculumTracks) {
  const filtered = getCategoriesForTrack(track.id);
  assert(Array.isArray(filtered));
}

assert.equal(curriculum.length, originalLength, 'curriculum array length must remain 17');
assert.deepEqual(curriculum.map(c => c.id), originalCategoryIds, 'curriculum category IDs must remain unchanged');
assert.equal(
  curriculum.reduce((acc, c) => acc + c.subtopics.length, 0),
  originalTotalLessons,
  'curriculum total lesson count must remain 167'
);

// 5. Track and status filters work together
// Simulate completion state: e.g. 2 deep-learning lessons completed
const mockCompleted = new Set<string>(['neural-networks', 'cnn']);

function simulateTrackAndStatusFilter(trackId: TrackId, status: 'all' | 'completed' | 'incomplete') {
  const cats = getCategoriesForTrack(trackId);
  return cats.map(cat => {
    const matchingSubtopics = cat.subtopics.filter(st => {
      const isDone = mockCompleted.has(st.id);
      if (status === 'completed') return isDone;
      if (status === 'incomplete') return !isDone;
      return true;
    });
    return {
      catId: cat.id,
      total: cat.subtopics.length,
      matching: matchingSubtopics.length,
      subtopics: matchingSubtopics,
    };
  });
}

// Deep Learning with 'incomplete' status:
const dlIncomplete = simulateTrackAndStatusFilter('deep-learning', 'incomplete');
assert.equal(dlIncomplete.length, 2, 'Deep learning has 2 categories');
const dlIncompleteSubtopics = dlIncomplete.flatMap(c => c.subtopics);
assert(!dlIncompleteSubtopics.some(s => mockCompleted.has(s.id)), 'Incomplete DL lessons must exclude completed ones');
assert.equal(dlIncompleteSubtopics.length, 27 - 2, '25 incomplete lessons in DL');

// Deep Learning with 'completed' status:
const dlCompleted = simulateTrackAndStatusFilter('deep-learning', 'completed');
const dlCompletedSubtopics = dlCompleted.flatMap(c => c.subtopics);
assert.equal(dlCompletedSubtopics.length, 2, 'Only 2 completed lessons in DL');
assert.deepEqual(
  dlCompletedSubtopics.map(s => s.id).sort(),
  ['cnn', 'neural-networks'],
  'Completed DL lessons match toggled set'
);

// Returning to 'all' track restores all categories permitted by status filter
const allIncomplete = simulateTrackAndStatusFilter('all', 'incomplete');
assert.equal(allIncomplete.length, 17, 'All track returns all 17 categories');
assert.equal(
  allIncomplete.reduce((acc, c) => acc + c.matching, 0),
  167 - 2,
  '165 incomplete lessons across whole curriculum'
);

// 6. Overall progress remains based on 167 lesson IDs
assert.equal(curriculum.reduce((acc, c) => acc + c.subtopics.length, 0), 167, 'Total lessons must remain 167');

// 7. Project Learning track retains 8 tutorial lessons and 12 handbooks
const projectCat = curriculum.find(c => c.id === 'projects');
assert(projectCat, 'Projects category exists');
assert.equal(projectCat.subtopics.length, 8, 'Projects category has 8 tutorial lessons');
assert.equal(projectPortfolio.length, 12, 'Project portfolio has 12 handbooks');
assert(projectPortfolio.every(p => p.status === 'ready'), 'All 12 handbooks are ready');

// 8. Track URL History & State Navigation Simulation (Task 2)
class SimulatedBrowserHistory {
  private stack: string[] = ['/curriculum'];
  private pointer: number = 0;

  get currentUrl(): string {
    return this.stack[this.pointer];
  }

  get currentTrackParam(): string | null {
    const url = new URL(this.currentUrl, 'https://www.learnmlacademy.com');
    return url.searchParams.get('track');
  }

  push(url: string) {
    this.stack = this.stack.slice(0, this.pointer + 1);
    this.stack.push(url);
    this.pointer++;
  }

  replace(url: string) {
    this.stack[this.pointer] = url;
  }

  back(): boolean {
    if (this.pointer > 0) {
      this.pointer--;
      return true;
    }
    return false;
  }

  forward(): boolean {
    if (this.pointer < this.stack.length - 1) {
      this.pointer++;
      return true;
    }
    return false;
  }
}

function resolveActiveTrack(trackParam: string | null): TrackId {
  if (!trackParam) return 'all';
  const match = getTrackById(trackParam);
  return match ? match.id : 'all';
}

const history = new SimulatedBrowserHistory();
assert.equal(resolveActiveTrack(history.currentTrackParam), 'all', 'Initial track is all');

// 8.1 Direct navigation with query param
history.push('/curriculum?track=deep-learning');
assert.equal(resolveActiveTrack(history.currentTrackParam), 'deep-learning', 'Direct deep-link loads deep-learning');

// 8.2 Refresh persistence
const reloadedParam = history.currentTrackParam;
assert.equal(resolveActiveTrack(reloadedParam), 'deep-learning', 'Reload retains deep-learning');

// 8.3 Selecting another track (push history entry)
history.push('/curriculum?track=agentic-ai');
assert.equal(resolveActiveTrack(history.currentTrackParam), 'agentic-ai', 'Selecting agentic-ai pushes history');

// 8.4 Back button navigation
history.back();
assert.equal(resolveActiveTrack(history.currentTrackParam), 'deep-learning', 'Back restores deep-learning');

history.back();
assert.equal(resolveActiveTrack(history.currentTrackParam), 'all', 'Back again restores all curriculum');

// 8.5 Forward button navigation
history.forward();
assert.equal(resolveActiveTrack(history.currentTrackParam), 'deep-learning', 'Forward restores deep-learning');

// 8.6 Returning to All Curriculum resets query parameter
history.push('/curriculum');
assert.equal(resolveActiveTrack(history.currentTrackParam), 'all', 'Reset to all clears query parameter');

// 8.7 Invalid or unknown track parameter fails safely
const invalidResolved = resolveActiveTrack('unknown-track-slug');
assert.equal(invalidResolved, 'all', 'Invalid track parameter fails safely to all');

console.log('ALL CURRICULUM TRACKS CHECKS PASS');
