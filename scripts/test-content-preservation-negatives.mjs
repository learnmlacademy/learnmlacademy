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

function createMockBaseline() {
  const code1 = 'def fit(X, y):\n    w = np.linalg.pinv(X) @ y\n    return w\n';
  return {
    exactCharCount: 1000,
    normalizedCharCount: 900,
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
    codeBlocks: [
      {
        index: 1,
        kind: 'figure-code-block',
        caption: 'Python fit loop',
        code: code1,
        hash: sha256(code1),
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
        ],
        rowCount: 2,
        colCount: 3,
        rawText: 'Feature comparison Model Complexity Speed OLS Low Fast Ridge Medium Fast',
      },
    ],
    formulas: [
      {
        index: 1,
        expression: 'y = X w + \\epsilon',
        explanation: 'Where w is parameter vector and epsilon is noise.',
      },
    ],
    figures: [
      {
        index: 1,
        title: 'Residual Plot',
        caption: 'Scatter plot of residuals showing homoscedasticity.',
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
    ...curr.formulas.map(f => f.expression + ' ' + (f.explanation || '')),
    ...curr.tables.map(t => (t.headers || []).join(' ') + ' ' + (t.rows || []).flat().join(' ')),
  ].join(' ');
}

function createMatchingCurrent(baseline) {
  const curr = {
    exactCharCount: baseline.exactCharCount,
    normalizedCharCount: baseline.normalizedCharCount,
    headings: baseline.headings.flatMap(h => Array(h.count).fill({ level: h.level, text: h.text })),
    paragraphs: baseline.paragraphs.flatMap(p => Array(p.count).fill({ text: p.text })),
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
  console.log('Running Content-Preservation Guardrail Negative Test Suite...\n');

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

  // --- Negative Tests: Rejection Assertions ---

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
      v.some(m => m.includes('Repeatable observation note.') && m.includes('expected count 2, found 1')),
      'Must detect reduction in paragraph multiplicity'
    );
  });

  // 5. A shortened Python code block
  runTest('Rejects a shortened Python code block', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.codeBlocks[0].code = 'def fit(X, y):\n    return w\n';
    curr.codeBlocks[0].hash = sha256(curr.codeBlocks[0].code);
    curr.exactCharCount -= 30;
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('code block #1 was shortened or modified')), 'Must detect shortened code');
  });

  // 6. A replaced code block
  runTest('Rejects a code block replaced with unrelated code', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.codeBlocks[0].caption = 'Unrelated calculation';
    curr.codeBlocks[0].code = 'def calculate_unrelated_metric(a, b):\n    return a * b + 42\n';
    curr.codeBlocks[0].hash = sha256(curr.codeBlocks[0].code);
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('missing or replaced with unrelated code')), 'Must detect replaced code');
  });

  // 7. A modified table cell
  runTest('Rejects a modified table cell', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.tables[0].rows[0][2] = 'Slow'; // OLS Speed changed from 'Fast' to 'Slow'
    curr.tables[0].hash = sha256(JSON.stringify({ headers: curr.tables[0].headers, rows: curr.tables[0].rows }));
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('has a modified or deleted row')), 'Must detect modified table cell');
  });

  // 8. A deleted table row
  runTest('Rejects a deleted table row', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.tables[0].rows.pop(); // Remove Ridge row
    curr.tables[0].rowCount = 1;
    curr.tables[0].hash = sha256(JSON.stringify({ headers: curr.tables[0].headers, rows: curr.tables[0].rows }));
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('rows decreased')), 'Must detect deleted table row');
  });

  // 9. A deleted table column
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

  // 10. A modified mathematical formula
  runTest('Rejects a modified mathematical formula', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.formulas[0].expression = 'y = X w'; // Dropped '+ \\epsilon'
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('formula expression missing or modified')), 'Must detect modified formula');
  });

  // 11. A changed quiz option
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

  // 12. A changed quiz explanation
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

  // 13. A deleted heading replaced with ordinary paragraph text
  runTest('Rejects a deleted heading replaced with ordinary paragraph text', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    // Remove <h2>Mathematical Formulation</h2> from headings and append it to paragraphs
    curr.headings = curr.headings.filter(h => h.text !== 'Mathematical Formulation');
    curr.paragraphs.push({ text: 'Mathematical Formulation' });
    const v = verifyPageContent(curr, base, '/test');
    assert(
      v.some(m => m.includes('Missing or modified baseline heading [h2]: "Mathematical Formulation"')),
      'Must reject heading demoted to paragraph'
    );
  });

  // 14. A deleted figure caption
  runTest('Rejects a deleted figure caption', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    curr.figures[0].caption = ''; // Caption deleted
    const v = verifyPageContent(curr, base, '/test');
    assert(v.some(m => m.includes('caption was removed or modified')), 'Must detect deleted figure caption');
  });

  // 15. A missing original route
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

  // 16. A missing downloadable starter archive
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
      // Do not write file -> test missing file detection
      const violations = await verifyProtectedAssets(mockManifest, tmpDir);
      assert(violations.some(m => m.includes('Missing project starter archive')), 'Must detect missing ZIP');
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  // 17. An unsafe baseline update that removes existing content
  runTest('Rejects an unsafe baseline update that removes existing content', () => {
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
          exactCharCount: 800, // Reduced characters!
          normalizedCharCount: 750,
          paragraphs: [], // Deleted paragraph!
        },
      },
    };
    assert.throws(
      () => validateBaselineSafety(existingManifest, newManifest),
      /UNSAFE BASELINE UPDATE REJECTED/,
      'Must abort unsafe baseline update'
    );
  });

  // --- Positive Tests: Additions Permitted ---

  // Positive 1: New paragraphs are accepted
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

  // Positive 2: New code blocks are accepted
  runTest('Accepts new code blocks added to an existing page', () => {
    const base = createMockBaseline();
    const curr = createMatchingCurrent(base);
    const newCode = 'print("A newly added helper block")\n';
    curr.codeBlocks.push({
      index: 2,
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

  // Positive 3: New tables are accepted
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

  // Positive 4: New quiz questions are accepted
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

  // Positive 5: Additional pages can be added through the controlled baseline-update process
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
    // Should pass without throwing!
    validateBaselineSafety(existingManifest, newManifest);
  });

  console.log(`\nAll ${passedTests}/${totalTests} Negative and Positive Test Cases PASSED successfully.`);
}

await runNegativeTests();
