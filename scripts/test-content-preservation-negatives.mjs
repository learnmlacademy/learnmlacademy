import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {
  verifyPageContent,
  verifyTopicQuizzes,
  verifyProtectedAssets,
} from './verify-content-preservation.mjs';
import {
  validateBaselineSafety,
  sha256,
} from './generate-content-preservation-manifest.mjs';
import {
  matchMultiset,
} from './preservation-engine.mjs';

function createMockBaseline() {
  const code1 = 'def fit(X, y):\n    w = np.linalg.pinv(X) @ y\n    return w\n';
  const dupCode = 'def diag_utility():\n    return True\n';

  return {
    exactCharCount: 1200,
    normalizedCharCount: 1100,
    headings: [
      { level: 'h1', text: 'Linear Regression Guide', count: 1 },
      { level: 'h2', text: 'Mathematical Formulation', count: 1 },
      { level: 'h3', text: 'Summary', count: 2 },
    ],
    paragraphs: [
      { text: 'Linear regression models the linear relationship between targets and inputs.', count: 1 },
      { text: 'Short step.', count: 1 },
      { text: 'Repeatable observation note.', count: 2 },
    ],
    listItems: [
      'Standardize feature inputs prior to computing the pseudo-inverse.',
      'Initialize model weights with small normal values.',
      'Duplicate checklist item.',
      'Duplicate checklist item.',
    ],
    captions: [
      'Figure 1: Training convergence curve across iterations.',
      'Table 1: Hyperparameter bounds and defaults.',
      'Repeated figure caption.',
      'Repeated figure caption.',
    ],
    codeBlocks: [
      {
        index: 1,
        kind: 'figure-code-block',
        caption: 'Python fit loop',
        code: code1,
        hash: sha256(code1),
      },
      {
        index: 2,
        kind: 'figure-code-block',
        caption: 'Diagnostic utility block',
        code: dupCode,
        hash: sha256(dupCode),
      },
      {
        index: 3,
        kind: 'figure-code-block',
        caption: 'Diagnostic utility block',
        code: dupCode,
        hash: sha256(dupCode),
      },
    ],
    tables: [
      {
        index: 1,
        caption: 'Feature comparison',
        headers: ['Model', 'Complexity', 'Speed'],
        rows: [
          ['OLS', 'Low', 'Fast'],
          ['Ridge', 'Medium', 'Fast'],
          ['DupRow', 'Identical', 'Constant'],
          ['DupRow', 'Identical', 'Constant'],
        ],
        rowCount: 4,
        colCount: 3,
        rawText: 'Feature comparison Model Complexity Speed OLS Low Fast Ridge Medium Fast DupRow Identical Constant DupRow Identical Constant',
      },
    ],
    formulas: [
      {
        index: 1,
        expression: 'y = X w + \\epsilon',
        explanation: 'Where w is parameter vector and epsilon is noise.',
      },
      {
        index: 2,
        expression: 'E = \\frac{1}{2} ||y - X w||^2',
        explanation: 'Mean squared error loss function.',
      },
      {
        index: 3,
        expression: 'E = \\frac{1}{2} ||y - X w||^2',
        explanation: 'Mean squared error loss function.',
      },
    ],
    figures: [
      {
        index: 1,
        title: 'Residual Plot',
        caption: 'Scatter plot of residuals showing homoscedasticity.',
      },
      {
        index: 2,
        title: 'Loss Surface',
        caption: 'Convex quadratic bowl in weight space.',
      },
      {
        index: 3,
        title: 'Loss Surface',
        caption: 'Convex quadratic bowl in weight space.',
      },
    ],
    quizzes: [
      {
        id: 1,
        question: 'What does OLS minimize?',
        options: ['Sum of squared errors', 'Absolute error', 'Huber loss'],
        optionCount: 3,
        correctAnswerIndex: 0,
        explanation: 'OLS minimizes SSE.',
      },
    ],
  };
}

function syncNormalizedText(curr) {
  curr.normalizedText = [
    ...curr.headings.map(h => h.text),
    ...curr.paragraphs.map(p => p.text),
    ...(curr.listItems || []),
    ...(curr.captions || []),
    ...curr.formulas.map(f => f.expression + ' ' + (f.explanation || '')),
    ...curr.tables.map(t => (t.headers || []).join(' ') + ' ' + (t.rows || []).flat().join(' ')),
  ].join(' ');
}

function createMatchingCurrent(baseline) {
  const curr = {
    exactCharCount: baseline.exactCharCount,
    normalizedCharCount: baseline.normalizedCharCount,
    headings: baseline.headings.flatMap(h => Array(h.count || 1).fill({ level: h.level, text: h.text })),
    paragraphs: baseline.paragraphs.flatMap(p => Array(p.count || 1).fill({ text: p.text })),
    listItems: [...(baseline.listItems || [])],
    captions: [...(baseline.captions || [])],
    codeBlocks: baseline.codeBlocks.map(c => ({ ...c })),
    tables: baseline.tables.map(t => ({
      ...t,
      rows: t.rows.map(r => [...r]),
      headers: [...t.headers],
    })),
    formulas: baseline.formulas.map(f => ({ ...f })),
    figures: baseline.figures.map(f => ({ ...f })),
  };
  syncNormalizedText(curr);
  return curr;
}

async function runNegativeTests() {
  console.log('Running Content-Preservation Guardrail Comprehensive Test Suite...\n');

  let passedTests = 0;
  let totalTests = 0;

  function runTest(name, fn) {
    totalTests++;
    try {
      fn();
      console.log(`  ✓ Case ${totalTests}: ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  ✗ Case ${totalTests} FAILED: ${name}`);
      console.error(`    ${err.message}`);
      throw err;
    }
  }

  // --- Negative Tests: Paragraph Preservation ---

  // 1. A deleted paragraph
  runTest('Rejects a deleted paragraph', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.paragraphs = curr.paragraphs.filter(p => !p.text.includes('Linear regression models'));
    syncNormalizedText(curr);
    curr.exactCharCount -= 75;
    curr.normalizedCharCount -= 75;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('Baseline paragraph missing or deleted')), 'Must detect deleted paragraph');
  });

  // 2. A shortened paragraph
  runTest('Rejects a shortened paragraph', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.paragraphs = curr.paragraphs.map(p =>
      p.text.includes('Linear regression models')
        ? { text: 'Linear regression models.' }
        : p
    );
    syncNormalizedText(curr);
    curr.exactCharCount -= 40;
    curr.normalizedCharCount -= 40;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('Baseline paragraph was shortened or modified')), 'Must detect shortened paragraph');
  });

  // 3. A deleted short paragraph
  runTest('Rejects a deleted short paragraph (<= 20 chars)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.paragraphs = curr.paragraphs.filter(p => p.text !== 'Short step.');
    syncNormalizedText(curr);
    curr.exactCharCount -= 11;
    curr.normalizedCharCount -= 11;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('Short step.') && m.includes('missing or deleted')), 'Must detect deleted short paragraph');
  });

  // 4. A removed duplicate paragraph (multiplicity test)
  runTest('Rejects a removed duplicate paragraph (loss of multiplicity)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    let kept = false;
    curr.paragraphs = curr.paragraphs.filter(p => {
      if (p.text === 'Repeatable observation note.') {
        if (!kept) {
          kept = true;
          return true;
        }
        return false;
      }
      return true;
    });
    syncNormalizedText(curr);
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Repeatable observation note.') && (m.includes('multiplicity') || m.includes('duplicate'))),
      'Must detect reduction in paragraph multiplicity'
    );
  });

  // --- Negative Tests: List Items Preservation ---

  // 5. A deleted list item
  runTest('Rejects a deleted list item', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.listItems = curr.listItems.filter(l => !l.includes('Standardize feature inputs'));
    syncNormalizedText(curr);
    curr.exactCharCount -= 60;
    curr.normalizedCharCount -= 60;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('Baseline list item missing or deleted')), 'Must detect deleted list item');
  });

  // 6. A shortened or modified list item
  runTest('Rejects a shortened or modified list item', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.listItems[0] = 'Standardize feature inputs.';
    syncNormalizedText(curr);
    curr.exactCharCount -= 25;
    curr.normalizedCharCount -= 25;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('Baseline list item was shortened or modified')), 'Must detect modified list item');
  });

  // 7. A removed duplicate list item (loss of multiplicity)
  runTest('Rejects a removed duplicate list item (loss of multiplicity)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    const idx = curr.listItems.indexOf('Duplicate checklist item.');
    curr.listItems.splice(idx, 1);
    syncNormalizedText(curr);
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Duplicate checklist item.') && (m.includes('multiplicity') || m.includes('duplicate'))),
      'Must detect reduction in list item multiplicity'
    );
  });

  // --- Negative Tests: Captions Preservation ---

  // 8. A deleted caption
  runTest('Rejects a deleted caption', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.captions = curr.captions.filter(c => !c.includes('Figure 1: Training convergence'));
    syncNormalizedText(curr);
    curr.exactCharCount -= 50;
    curr.normalizedCharCount -= 50;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('Baseline caption missing or deleted')), 'Must detect deleted caption');
  });

  // 9. A shortened or modified caption
  runTest('Rejects a shortened or modified caption', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.captions[0] = 'Figure 1: Convergence.';
    syncNormalizedText(curr);
    curr.exactCharCount -= 25;
    curr.normalizedCharCount -= 25;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('Baseline caption was shortened or modified')), 'Must detect modified caption');
  });

  // 10. A removed duplicate caption (loss of multiplicity)
  runTest('Rejects a removed duplicate caption (loss of multiplicity)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    const idx = curr.captions.indexOf('Repeated figure caption.');
    curr.captions.splice(idx, 1);
    syncNormalizedText(curr);
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Repeated figure caption.') && (m.includes('multiplicity') || m.includes('duplicate'))),
      'Must detect reduction in caption multiplicity'
    );
  });

  // --- Negative Tests: Code Blocks Preservation ---

  // 11. A shortened Python code block
  runTest('Rejects a shortened Python code block', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.codeBlocks[0].code = 'def fit(X, y):\n    return w\n';
    curr.codeBlocks[0].hash = sha256(curr.codeBlocks[0].code);
    curr.exactCharCount -= 30;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('code block #1 was shortened or modified')), 'Must detect shortened code');
  });

  // 12. A replaced code block
  runTest('Rejects a code block replaced with unrelated code', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.codeBlocks[0].caption = 'Unrelated calculation';
    curr.codeBlocks[0].code = 'def calculate_unrelated_metric(a, b):\n    return a * b + 42\n';
    curr.codeBlocks[0].hash = sha256(curr.codeBlocks[0].code);
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('missing or replaced with unrelated code')), 'Must detect replaced code');
  });

  // 13. A removed duplicate code block (loss of multiplicity)
  runTest('Rejects a removed duplicate code block (loss of multiplicity)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.codeBlocks.pop(); // Remove the second duplicate diagnostic block
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Baseline code block') && (m.includes('multiplicity') || m.includes('duplicate'))),
      'Must detect duplicate code block deletion'
    );
  });

  // --- Negative Tests: Tables Preservation ---

  // 14. A modified table cell
  runTest('Rejects a modified table cell', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.tables[0].rows[0][2] = 'Slow'; // OLS Speed changed from 'Fast' to 'Slow'
    curr.tables[0].hash = sha256(JSON.stringify({ headers: curr.tables[0].headers, rows: curr.tables[0].rows }));
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('has a modified or deleted row')), 'Must detect modified table cell');
  });

  // 15. A deleted table row
  runTest('Rejects a deleted table row', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.tables[0].rows = curr.tables[0].rows.filter(r => r[0] !== 'Ridge');
    curr.tables[0].rowCount = 3;
    curr.tables[0].hash = sha256(JSON.stringify({ headers: curr.tables[0].headers, rows: curr.tables[0].rows }));
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('rows decreased')), 'Must detect deleted table row');
  });

  // 16. A removed duplicate table row (loss of multiplicity)
  runTest('Rejects a removed duplicate table row (loss of multiplicity)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.tables[0].rows.pop(); // Remove one of the DupRow rows
    curr.tables[0].rowCount = 3;
    curr.tables[0].hash = sha256(JSON.stringify({ headers: curr.tables[0].headers, rows: curr.tables[0].rows }));
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('table #1') && (m.includes('duplicate row') || m.includes('multiplicity') || m.includes('rows decreased'))),
      'Must detect duplicate table row removal'
    );
  });

  // 17. A deleted table column
  runTest('Rejects a deleted table column', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.tables[0].headers = ['Model', 'Complexity']; // Dropped 'Speed' column
    curr.tables[0].colCount = 2;
    curr.tables[0].rows = curr.tables[0].rows.map(r => [r[0], r[1]]);
    curr.tables[0].hash = sha256(JSON.stringify({ headers: curr.tables[0].headers, rows: curr.tables[0].rows }));
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('columns decreased')), 'Must detect deleted table column');
  });

  // --- Negative Tests: Formulas Preservation ---

  // 18. A modified mathematical formula
  runTest('Rejects a modified mathematical formula', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.formulas[0].expression = 'y = X w'; // Dropped '+ \\epsilon'
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('formula expression missing or modified')), 'Must detect modified formula');
  });

  // 19. A removed duplicate formula (loss of multiplicity)
  runTest('Rejects a removed duplicate formula (loss of multiplicity)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.formulas.pop(); // Remove the second duplicate MSE formula
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Baseline formula') && (m.includes('multiplicity') || m.includes('duplicate'))),
      'Must detect duplicate formula deletion'
    );
  });

  // 20. A modified formula explanation
  runTest('Rejects a modified formula explanation', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.formulas[0].explanation = 'Altered noise explanation.';
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('formula explanation for "y = X w + \\epsilon" was modified or deleted')), 'Must detect modified formula explanation');
  });

  // --- Negative Tests: Figures Preservation ---

  // 21. A deleted figure caption
  runTest('Rejects a deleted figure caption', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.figures[0].caption = ''; // Caption deleted
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('caption was removed or modified')), 'Must detect deleted figure caption');
  });

  // 22. A removed duplicate figure (loss of multiplicity)
  runTest('Rejects a removed duplicate figure (loss of multiplicity)', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.figures.pop(); // Remove the second duplicate Loss Surface figure
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Baseline figure') && (m.includes('multiplicity') || m.includes('duplicate'))),
      'Must detect duplicate figure deletion'
    );
  });

  // --- Negative Tests: Quiz Preservation ---

  // 23. A changed quiz option
  runTest('Rejects a changed quiz option', () => {
    const base = createMockBaseline();
    const currQuizzes = [
      {
        id: 1,
        question: 'What does OLS minimize?',
        options: ['Sum of squared differences', 'Absolute error', 'Huber loss'], // Changed option 1
        correctAnswerIndex: 0,
        explanation: 'OLS minimizes SSE.',
      },
    ];
    const v = verifyTopicQuizzes(currQuizzes, base.quizzes, '/learn/test-topic');
    assert(v.some(m => m.includes('option [1] was changed')), 'Must detect changed quiz option');
  });

  // 24. A changed quiz explanation
  runTest('Rejects a changed quiz explanation', () => {
    const base = createMockBaseline();
    const currQuizzes = [
      {
        id: 1,
        question: 'What does OLS minimize?',
        options: ['Sum of squared errors', 'Absolute error', 'Huber loss'],
        correctAnswerIndex: 0,
        explanation: 'OLS minimizes something else entirely.', // Altered explanation
      },
    ];
    const v = verifyTopicQuizzes(currQuizzes, base.quizzes, '/learn/test-topic');
    assert(v.some(m => m.includes('explanation was altered')), 'Must detect altered quiz explanation');
  });

  // --- Negative Tests: Structural & Multiset Matching Invariants ---

  // 25. A deleted heading replaced with ordinary paragraph text
  runTest('Rejects a deleted heading replaced with ordinary paragraph text', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.headings = curr.headings.filter(h => h.text !== 'Mathematical Formulation');
    curr.paragraphs.push({ text: 'Mathematical Formulation' });
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Missing or modified baseline heading [h2]: "Mathematical Formulation"')),
      'Must reject heading demoted to paragraph'
    );
  });

  // 26. Reuse of a single current item to satisfy multiple baseline items
  runTest('Rejects reuse of one current element to satisfy multiple baseline items', () => {
    const baselineItems = ['Item A', 'Item A'];
    const currentItems = ['Item A']; // Only 1 instance available
    const violations = matchMultiset(
      baselineItems,
      currentItems,
      (b, c) => b === c,
      (b) => `Missing element: ${b}`
    );
    assert.equal(violations.length, 1, 'Second baseline item must fail to match because first consumed the only available item');
    assert(violations[0].includes('Missing element: Item A'));
  });

  // 27. A missing original route
  runTest('Rejects a missing original baseline route', () => {
    const baselinePages = {
      '/learn/topic-a': {},
      '/learn/topic-b': {},
    };
    const currentRoutes = ['/learn/topic-a']; // '/learn/topic-b' missing
    const violations = [];
    for (const route of Object.keys(baselinePages)) {
      if (!currentRoutes.includes(route)) {
        violations.push(`${route}: Route was removed or replaced.`);
      }
    }
    assert(violations.some(m => m.includes('/learn/topic-b: Route was removed or replaced.')), 'Must detect missing route');
  });

  // 28. A missing downloadable starter archive
  runTest('Rejects a missing or altered downloadable starter archive', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'lma-asset-test-'));
    try {
      const mockManifest = {
        protectedAssets: {
          projectStarterZips: [
            {
              id: 'titanic-survival.zip',
              filename: 'titanic-survival.zip',
              size: 50,
              sha256: sha256('dummy-content'),
              currentLocalPath: 'titanic-survival.zip',
            },
          ],
        },
      };
      const violations = await verifyProtectedAssets(mockManifest, tmpDir);
      assert(violations.some(m => m.includes('Missing project starter archive')), 'Must detect missing ZIP');
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  // --- Negative Tests: Baseline Updater Validation ---

  // 29. Baseline updater rejects character/paragraph reduction
  runTest('Baseline updater rejects an unsafe baseline update that removes existing content', () => {
    const existingManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 1000,
          normalizedCharCount: 900,
          paragraphs: [{ text: 'Core explanation', count: 1 }],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 800,
          normalizedCharCount: 750,
          paragraphs: [],
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /UNSAFE BASELINE UPDATE REJECTED/,
      'Must abort unsafe baseline update on paragraph deletion'
    );
  });

  // 30. Baseline updater rejects changed quiz explanation
  runTest('Baseline updater rejects changed quiz explanation during baseline update', () => {
    const existingManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          paragraphs: [{ text: 'P', count: 1 }],
          quizzes: [
            {
              id: 1,
              question: 'Q?',
              options: ['A', 'B'],
              correctAnswerIndex: 0,
              explanation: 'Original explanation.',
            },
          ],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          paragraphs: [{ text: 'P', count: 1 }],
          quizzes: [
            {
              id: 1,
              question: 'Q?',
              options: ['A', 'B'],
              correctAnswerIndex: 0,
              explanation: 'Tampered explanation.',
            },
          ],
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /explanation was altered/,
      'Must abort baseline update when quiz explanation changes'
    );
  });

  // 31. Baseline updater rejects changed quiz option
  runTest('Baseline updater rejects changed quiz option during baseline update', () => {
    const existingManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          paragraphs: [{ text: 'P', count: 1 }],
          quizzes: [
            {
              id: 1,
              question: 'Q?',
              options: ['Option 1', 'Option 2'],
              correctAnswerIndex: 0,
              explanation: 'Exp',
            },
          ],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          paragraphs: [{ text: 'P', count: 1 }],
          quizzes: [
            {
              id: 1,
              question: 'Q?',
              options: ['Option 1 Altered', 'Option 2'],
              correctAnswerIndex: 0,
              explanation: 'Exp',
            },
          ],
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /option \[1\] was changed/,
      'Must abort baseline update when quiz option changes'
    );
  });

  // 32. Baseline updater rejects deleted list item
  runTest('Baseline updater rejects deleted list item during baseline update', () => {
    const existingManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          listItems: ['Item 1', 'Item 2'],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          listItems: ['Item 1'],
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /Baseline list item missing or deleted/,
      'Must abort baseline update when list item is deleted'
    );
  });

  // 33. Baseline updater rejects deleted caption
  runTest('Baseline updater rejects deleted caption during baseline update', () => {
    const existingManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          captions: ['Caption 1', 'Caption 2'],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          captions: ['Caption 1'],
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /Baseline caption missing or deleted/,
      'Must abort baseline update when caption is deleted'
    );
  });

  // 34. Baseline updater rejects duplicate code block deletion
  runTest('Baseline updater rejects duplicate code block deletion during baseline update', () => {
    const code = 'print(1)\n';
    const existingManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          codeBlocks: [
            { index: 1, code, hash: sha256(code), caption: 'C' },
            { index: 2, code, hash: sha256(code), caption: 'C' },
          ],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          codeBlocks: [
            { index: 1, code, hash: sha256(code), caption: 'C' },
          ],
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /Baseline code block.*multiplicity reduced/,
      'Must abort baseline update when duplicate code block is removed'
    );
  });

  // 35. Baseline updater rejects duplicate table row deletion
  runTest('Baseline updater rejects duplicate table row deletion during baseline update', () => {
    const existingManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          tables: [
            {
              index: 1,
              headers: ['Col'],
              rows: [['Dup'], ['Dup']],
              rowCount: 2,
              colCount: 1,
              hash: sha256('tbl'),
            },
          ],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/test': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          tables: [
            {
              index: 1,
              headers: ['Col'],
              rows: [['Dup']],
              rowCount: 1,
              colCount: 1,
              hash: sha256('tbl-short'),
            },
          ],
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /Baseline table #1 rows decreased/,
      'Must abort baseline update when duplicate table row is removed'
    );
  });

  // --- Positive Tests: Additions Permitted ---

  // 36. Positive: New paragraphs are accepted
  runTest('Accepts new paragraphs added to an existing page', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.paragraphs.push({ text: 'An additional new insight explaining gradient flow.' });
    curr.exactCharCount += 52;
    curr.normalizedCharCount += 52;
    curr.normalizedText += ' An additional new insight explaining gradient flow.';
    const v = verifyPageContent(curr, base, '/test');
    assert.equal(v.length, 0, 'Additive paragraphs must pass cleanly');
  });

  // 37. Positive: New list items and captions are accepted
  runTest('Accepts new list items and captions added to an existing page', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.listItems.push('Third newly introduced optimization checklist item.');
    curr.captions.push('Figure 4: Brand new architectural diagram caption.');
    curr.exactCharCount += 105;
    curr.normalizedCharCount += 105;
    syncNormalizedText(curr);
    const v = verifyPageContent(curr, base, '/test');
    assert.equal(v.length, 0, 'Additive list items and captions must pass cleanly');
  });

  // 38. Positive: New code blocks are accepted
  runTest('Accepts new code blocks added to an existing page', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    const newCode = 'print("A newly added helper block")\n';
    curr.codeBlocks.push({
      index: 4,
      kind: 'figure-code-block',
      caption: 'Diagnostic helper',
      code: newCode,
      hash: sha256(newCode),
    });
    curr.exactCharCount += 35;
    curr.normalizedCharCount += 35;
    const v = verifyPageContent(curr, base, '/test');
    assert.equal(v.length, 0, 'Additive code blocks must pass cleanly');
  });

  // 39. Positive: New tables and rows are accepted
  runTest('Accepts new tables added to an existing page', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.tables.push({
      index: 2,
      caption: 'Hyperparameter grid',
      headers: ['Param', 'Range'],
      rows: [['alpha', '[0.01, 10.0]']],
      rowCount: 1,
      colCount: 2,
      rawText: 'Hyperparameter grid Param Range alpha [0.01, 10.0]',
      hash: sha256('new-table'),
    });
    const v = verifyPageContent(curr, base, '/test');
    assert.equal(v.length, 0, 'Additive tables must pass cleanly');
  });

  // 40. Positive: New formulas are accepted
  runTest('Accepts new formulas added to an existing page', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.formulas.push({
      index: 4,
      expression: 'L_{ridge} = ||y - X w||^2 + \\lambda ||w||_2^2',
      explanation: 'Ridge L2 regularized objective.',
    });
    const v = verifyPageContent(curr, base, '/test');
    assert.equal(v.length, 0, 'Additive formulas must pass cleanly');
  });

  // 41. Positive: New quiz questions are accepted
  runTest('Accepts new quiz questions added to an existing topic', () => {
    const base = createMockBaseline();
    const currQuizzes = [
      ...base.quizzes,
      {
        id: 2,
        question: 'Which regularizer induces sparsity?',
        options: ['Lasso (L1)', 'Ridge (L2)', 'ElasticNet (ratio=0)'],
        correctAnswerIndex: 0,
        explanation: 'L1 penalization induces exact zero coefficients.',
      },
    ];
    const v = verifyTopicQuizzes(currQuizzes, base.quizzes, '/learn/test-topic');
    assert.equal(v.length, 0, 'Additive quiz questions must pass cleanly');
  });

  // 42. Positive: Additional pages can be added through the controlled baseline-update process
  runTest('Accepts new routes and pages added through controlled baseline evolution', () => {
    const existingManifest = {
      pages: {
        '/learn/topic-1': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          paragraphs: [{ text: 'Topic 1 content', count: 1 }],
          headings: [{ level: 'h1', text: 'Topic 1', count: 1 }],
        },
      },
    };
    const newManifest = {
      pages: {
        '/learn/topic-1': {
          exactCharCount: 500,
          normalizedCharCount: 450,
          paragraphs: [{ text: 'Topic 1 content', count: 1 }],
          headings: [{ level: 'h1', text: 'Topic 1', count: 1 }],
        },
        '/learn/topic-2-new': {
          exactCharCount: 600,
          normalizedCharCount: 550,
          paragraphs: [{ text: 'Brand new topic content', count: 1 }],
          headings: [{ level: 'h1', text: 'Topic 2', count: 1 }],
        },
      },
    };
    validateBaselineSafety(existingManifest, newManifest);
  });

  // 43. Positive: a heading can be promoted without changing its authored text.
  runTest('Accepts an accessibility heading-level correction when text and multiplicity are preserved', () => {
    const base = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [
        { level: 'h2', text: 'Main section', count: 1 },
        { level: 'h4', text: 'Nested subsection', count: 1 },
      ],
      paragraphs: [{ text: 'Paragraph under heading.', count: 1 }],
    };
    const curr = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [
        { level: 'h2', text: 'Main section' },
        { level: 'h3', text: 'Nested subsection' },
      ],
      paragraphs: [{ text: 'Paragraph under heading.' }],
    };
    const violations = verifyPageContent(curr, base, '/learn/sample-topic');
    assert.equal(violations.length, 0, 'Heading-level corrections must pass when text and multiplicity remain intact');
  });

  // 44. Negative: changing the heading wording remains prohibited.
  runTest('Rejects rewritten heading text even when the heading level is corrected', () => {
    const base = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [{ level: 'h4', text: 'Original subheading', count: 1 }],
      paragraphs: [{ text: 'Paragraph under heading.', count: 1 }],
    };
    const curr = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [{ level: 'h3', text: 'Rewritten subheading' }],
      paragraphs: [{ text: 'Paragraph under heading.' }],
    };
    const violations = verifyPageContent(curr, base, '/learn/sample-topic');
    assert(violations.some(message => message.includes('Missing or modified baseline heading [h4]')),
      `Expected changed heading text to be rejected, got ${violations.join("; ")}`);
  });

  // 45. Negative: deleting a heading is still prohibited.
  runTest('Rejects a missing heading regardless of heading-level policy', () => {
    const base = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [{ level: 'h3', text: 'Required subsection', count: 1 }],
      paragraphs: [{ text: 'Paragraph under heading.', count: 1 }],
    };
    const curr = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [],
      paragraphs: [{ text: 'Paragraph under heading.' }],
    };
    const violations = verifyPageContent(curr, base, '/learn/sample-topic');
    assert(violations.some(message => message.includes('Missing or modified baseline heading [h3]')),
      `Expected missing heading to be rejected, got ${violations.join("; ")}`);
  });

  // 46. Positive: semantic heading-level corrections apply consistently across routes.
  runTest('Accepts heading-level corrections on routes other than the original GenAI exception', () => {
    const base = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [{ level: 'h4', text: 'Shared figure heading', count: 1 }],
      paragraphs: [{ text: 'Paragraph under heading.', count: 1 }],
    };
    const curr = {
      exactCharCount: 800,
      normalizedCharCount: 750,
      headings: [{ level: 'h3', text: 'Shared figure heading' }],
      paragraphs: [{ text: 'Paragraph under heading.' }],
    };
    const violations = verifyPageContent(curr, base, '/projects/movie-recommender');
    assert.equal(violations.length, 0, 'Text-preserving heading corrections must not depend on route-specific exceptions');
  });

  // 47. Negative: duplicate heading multiplicity remains enforced after level corrections.
  runTest('Enforces duplicate heading multiplicity when heading levels are corrected', () => {
    const base = {
      exactCharCount: 1200,
      normalizedCharCount: 1100,
      headings: [{ level: 'h4', text: 'Repeated subsection', count: 2 }],
      paragraphs: [{ text: 'Paragraph under heading.', count: 1 }],
    };
    const curr = {
      exactCharCount: 1200,
      normalizedCharCount: 1100,
      headings: [{ level: 'h3', text: 'Repeated subsection' }],
      paragraphs: [{ text: 'Paragraph under heading.' }],
    };
    const violations = verifyPageContent(curr, base, '/learn/sample-topic');
    assert(violations.some(message => message.includes('duplicate removed or multiplicity reduced')),
      `Expected duplicate heading reduction to be rejected, got ${violations.join("; ")}`);
  });

  console.log(`\nAll ${passedTests}/${totalTests} Negative and Positive Test Cases PASSED successfully.`);
}

await runNegativeTests();

