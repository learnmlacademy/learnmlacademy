import { cleanForSearch } from './generate-content-preservation-manifest.mjs';
import { createStorageProvider } from './storage-provider.mjs';

/**
 * Matches elements from baseline multiset to current multiset with strict 1-to-1 consumption.
 * Ensures a single current element cannot satisfy multiple baseline duplicate elements.
 *
 * @param {Array} baselineItems - Array of baseline items
 * @param {Array} currentItems - Array of candidate current items
 * @param {Function} predicate - (baseItem, currItem) => boolean
 * @param {Function} onMissing - (baseItem, unusedCurrentItems) => string (violation message)
 * @returns {Array<string>} list of violations
 */
export function matchMultiset(baselineItems, currentItems, predicate, onMissing) {
  const violations = [];
  const usedCurrentIndices = new Set();

  for (const bItem of baselineItems) {
    let matchedIdx = -1;
    for (let i = 0; i < currentItems.length; i++) {
      if (!usedCurrentIndices.has(i) && predicate(bItem, currentItems[i])) {
        matchedIdx = i;
        break;
      }
    }

    if (matchedIdx !== -1) {
      usedCurrentIndices.add(matchedIdx);
    } else {
      const unusedCurrent = currentItems.filter((_, idx) => !usedCurrentIndices.has(idx));
      violations.push(onMissing(bItem, unusedCurrent));
    }
  }

  return violations;
}

/**
 * Checks if two strings share significant partial text or prefix (ignoring punctuation).
 */
export function isPartialMatch(str1, str2) {
  const s1 = cleanForSearch(str1).toLowerCase();
  const s2 = cleanForSearch(str2).toLowerCase();
  if (!s1 || !s2) return false;
  const p1 = s1.replace(/[^\w\s]/g, '').trim();
  const p2 = s2.replace(/[^\w\s]/g, '').trim();
  if (!p1 || !p2) return false;
  if (p1.startsWith(p2) || p2.startsWith(p1)) return true;
  const minLen = Math.min(p1.length, p2.length, 12);
  if (p1.includes(p2.slice(0, minLen)) || p2.includes(p1.slice(0, minLen))) return true;

  // Word overlap detection for edited or shortened sentences
  const w1 = new Set(p1.split(/\s+/).filter(w => w.length > 2 || !isNaN(w)));
  const w2 = new Set(p2.split(/\s+/).filter(w => w.length > 2 || !isNaN(w)));
  let common = 0;
  for (const w of w2) {
    if (w1.has(w)) common++;
  }
  const minWords = Math.min(w1.size, w2.size);
  if (minWords > 0 && common / minWords >= 0.5) return true;
  if (common >= 2) return true;

  return false;
}

/**
 * Compares current extracted page content against baseline preservation requirements
 * using strict multiset-based 1-to-1 matching.
 */
export function comparePageContent(current, baseline, route) {
  const violations = [];

  // 1. Exact Authored Characters (preserves syntax, indentation, line breaks, math operators)
  if (current.exactCharCount < baseline.exactCharCount) {
    const lost = baseline.exactCharCount - current.exactCharCount;
    violations.push(
      `${route}: EXACT AUTHORED CHARACTER REGRESSION — Baseline had ${baseline.exactCharCount.toLocaleString()} chars, current has ${current.exactCharCount.toLocaleString()} chars (lost ${lost.toLocaleString()} characters).`
    );
  }

  // 2. Normalized Characters (whitespace-collapsed prose baseline)
  if (current.normalizedCharCount < baseline.normalizedCharCount) {
    const lost = baseline.normalizedCharCount - current.normalizedCharCount;
    violations.push(
      `${route}: NORMALIZED CHARACTER REGRESSION — Baseline had ${baseline.normalizedCharCount.toLocaleString()} chars, current has ${current.normalizedCharCount.toLocaleString()} chars (lost ${lost.toLocaleString()} characters).`
    );
  }

  // 3. Heading text and multiplicity preservation.
  // Semantic heading levels are audited independently against the rendered outline by
  // scripts/heading-hierarchy.mjs, so legitimate accessibility corrections (for example
  // H4 -> H3) do not look like deleted authored content here.
  const expandedBaselineHeadings = (baseline.headings || []).flatMap(h =>
    Array(h.count || 1).fill({ level: h.level, text: h.text })
  );
  const expandedCurrentHeadings = (current.headings || []).flatMap(h =>
    Array(h.count || 1).fill({ level: h.level, text: h.text })
  );

  const headingViolations = matchMultiset(
    expandedBaselineHeadings,
    expandedCurrentHeadings,
    (b, c) => cleanForSearch(b.text) === cleanForSearch(c.text),
    (b) => {
      const hadMatch = expandedCurrentHeadings.some(c => cleanForSearch(c.text) === cleanForSearch(b.text));
      if (hadMatch) {
        return \`${route}: Baseline heading [${b.level}] duplicate removed or multiplicity reduced: "${b.text}"\`;
      }
      return \`${route}: Missing or modified baseline heading [${b.level}]: "${b.text}"\`;
    }
  );
  violations.push(...headingViolations);

  // 4. Paragraphs Preservation (verifies text, multiplicity, and partial truncation with 1-to-1 matching)
  const expandedBaselineParas = (baseline.paragraphs || []).flatMap(p =>
    Array(p.count || 1).fill({ text: p.text })
  );
  const expandedCurrentParas = (current.paragraphs || []).flatMap(p =>
    Array(p.count || 1).fill({ text: p.text })
  );
  const searchableCurrent = cleanForSearch(current.normalizedText || '');

  const paraViolations = matchMultiset(
    expandedBaselineParas,
    expandedCurrentParas,
    (b, c) => cleanForSearch(b.text) === cleanForSearch(c.text),
    (b, unused) => {
      const key = cleanForSearch(b.text);
      const hadMatch = expandedCurrentParas.some(c => cleanForSearch(c.text) === key);
      if (hadMatch) {
        return `${route}: Baseline paragraph duplicate removed or multiplicity reduced: "${b.text.slice(0, 60)}..."`;
      }
      const isTruncated = unused.some(c => isPartialMatch(b.text, c.text)) ||
        searchableCurrent.includes(key.slice(0, Math.min(key.length, 20)));
      if (isTruncated) {
        return `${route}: Baseline paragraph was shortened or modified: "${b.text.slice(0, 60)}..."`;
      }
      return `${route}: Baseline paragraph missing or deleted: "${b.text.slice(0, 60)}..."`;
    }
  );
  violations.push(...paraViolations);

  // 5. List Items Preservation (multiset 1-to-1 matching)
  const baseListItems = baseline.listItems || [];
  const currListItems = current.listItems || [];
  const listViolations = matchMultiset(
    baseListItems,
    currListItems,
    (b, c) => cleanForSearch(b) === cleanForSearch(c),
    (b, unused) => {
      const key = cleanForSearch(b);
      const hadMatch = currListItems.some(c => cleanForSearch(c) === key);
      if (hadMatch) {
        return `${route}: Baseline list item duplicate removed or multiplicity reduced: "${b.slice(0, 60)}..."`;
      }
      const isShortened = unused.some(c => isPartialMatch(b, c));
      if (isShortened) {
        return `${route}: Baseline list item was shortened or modified: "${b.slice(0, 60)}..."`;
      }
      return `${route}: Baseline list item missing or deleted: "${b.slice(0, 60)}..."`;
    }
  );
  violations.push(...listViolations);

  // 6. Captions & Annotations Preservation (multiset 1-to-1 matching)
  const baseCaptions = baseline.captions || [];
  const currCaptions = current.captions || [];
  const captionViolations = matchMultiset(
    baseCaptions,
    currCaptions,
    (b, c) => cleanForSearch(b) === cleanForSearch(c),
    (b, unused) => {
      const key = cleanForSearch(b);
      const hadMatch = currCaptions.some(c => cleanForSearch(c) === key);
      if (hadMatch) {
        return `${route}: Baseline caption duplicate removed or multiplicity reduced: "${b.slice(0, 60)}..."`;
      }
      const isShortened = unused.some(c => isPartialMatch(b, c));
      if (isShortened) {
        return `${route}: Baseline caption was shortened or modified: "${b.slice(0, 60)}..."`;
      }
      return `${route}: Baseline caption missing or deleted: "${b.slice(0, 60)}..."`;
    }
  );
  violations.push(...captionViolations);

  // 7. Code Blocks Preservation (exact source, indentation, captions, multiplicity with 1-to-1 matching)
  const baseCodeBlocks = baseline.codeBlocks || [];
  const currCodeBlocks = current.codeBlocks || [];
  const codeViolations = matchMultiset(
    baseCodeBlocks,
    currCodeBlocks,
    (b, c) => c.hash === b.hash && (!b.caption || cleanForSearch(c.caption) === cleanForSearch(b.caption)),
    (b, unused) => {
      const hadMatch = currCodeBlocks.some(c => c.hash === b.hash && (!b.caption || cleanForSearch(c.caption) === cleanForSearch(b.caption)));
      if (hadMatch) {
        return `${route}: Baseline code block #${b.index} duplicate removed or multiplicity reduced.`;
      }
      const partial = unused.find(c =>
        (b.caption && c.caption && cleanForSearch(c.caption) === cleanForSearch(b.caption)) ||
        c.code.includes(b.code.slice(0, Math.min(b.code.length, 15))) ||
        b.code.includes(c.code.slice(0, Math.min(c.code.length, 15)))
      );
      if (partial) {
        return `${route}: Baseline code block #${b.index} was shortened or modified.`;
      }
      return `${route}: Baseline code block #${b.index} missing or replaced with unrelated code.`;
    }
  );
  violations.push(...codeViolations);

  // 8. Tables Preservation (all headers, rows, columns, and each row's cells with 1-to-1 matching)
  const baseTables = baseline.tables || [];
  const currTables = current.tables || [];
  const matchedTableIndices = new Set();

  for (const bTable of baseTables) {
    const candidates = currTables.filter((_, idx) => !matchedTableIndices.has(idx));
    let matchingIdx = -1;

    // A. Match by hash
    matchingIdx = candidates.findIndex(t => t.hash === bTable.hash);

    // B. Match by index and headers
    if (matchingIdx === -1 && bTable.headers && bTable.headers.length > 0) {
      matchingIdx = candidates.findIndex(
        t => t.index === bTable.index &&
             bTable.headers.every(h => t.headers.some(th => cleanForSearch(th) === cleanForSearch(h)))
      );
    }

    // C. Match by row subset
    if (matchingIdx === -1) {
      matchingIdx = candidates.findIndex(t => {
        const headersMatch = !bTable.headers || bTable.headers.length === 0 ||
          bTable.headers.every(h => t.headers.some(th => cleanForSearch(th) === cleanForSearch(h)));
        if (!headersMatch) return false;
        const rowOverlap = (bTable.rows || []).filter(bRow =>
          t.rows.some(cRow => bRow.every((cell, idx) => cleanForSearch(cRow[idx] || '') === cleanForSearch(cell)))
        ).length;
        return rowOverlap > 0;
      });
    }

    if (matchingIdx === -1 && bTable.rawText) {
      matchingIdx = candidates.findIndex(t =>
        cleanForSearch(t.rawText || '').includes(cleanForSearch(bTable.rawText.slice(0, 30)))
      );
    }

    if (matchingIdx === -1) {
      violations.push(
        `${route}: Baseline table #${bTable.index} (headers: [${(bTable.headers || []).join(', ')}]) is missing.`
      );
    } else {
      const realIdx = currTables.indexOf(candidates[matchingIdx]);
      matchedTableIndices.add(realIdx);
      const matchingTable = candidates[matchingIdx];

      if (matchingTable.colCount < bTable.colCount) {
        violations.push(
          `${route}: Baseline table #${bTable.index} columns decreased: expected at least ${bTable.colCount}, found ${matchingTable.colCount}.`
        );
      }
      if (matchingTable.rowCount < bTable.rowCount) {
        violations.push(
          `${route}: Baseline table #${bTable.index} rows decreased: expected at least ${bTable.rowCount}, found ${matchingTable.rowCount}.`
        );
      }

      // 1-to-1 multiset matching for table rows!
      const rowViolations = matchMultiset(
        bTable.rows || [],
        matchingTable.rows || [],
        (bRow, cRow) => bRow.every((cell, cIdx) => cleanForSearch(cRow[cIdx] || '') === cleanForSearch(cell)),
        (bRow) => {
          const hadMatch = (matchingTable.rows || []).some(cRow =>
            bRow.every((cell, cIdx) => cleanForSearch(cRow[cIdx] || '') === cleanForSearch(cell))
          );
          if (hadMatch) {
            return `${route}: Baseline table #${bTable.index} duplicate row removed or multiplicity reduced: [${bRow.slice(0, 3).join(', ')}...].`;
          }
          return `${route}: Baseline table #${bTable.index} has a modified or deleted row: [${bRow.slice(0, 3).join(', ')}...].`;
        }
      );
      violations.push(...rowViolations);
    }
  }

  // 9. Formulas Preservation (expressions and explanations via 1-to-1 matching)
  const baseFormulas = baseline.formulas || [];
  const currFormulas = current.formulas || [];
  const formulaViolations = matchMultiset(
    baseFormulas,
    currFormulas,
    (b, c) => cleanForSearch(c.expression) === cleanForSearch(b.expression || b.formula || '') &&
              (!b.explanation || cleanForSearch(c.explanation) === cleanForSearch(b.explanation)),
    (b, unused) => {
      const bExpr = b.expression || b.formula || '';
      const hadMatch = currFormulas.some(c =>
        cleanForSearch(c.expression) === cleanForSearch(bExpr) &&
        (!b.explanation || cleanForSearch(c.explanation) === cleanForSearch(b.explanation))
      );
      if (hadMatch) {
        return `${route}: Baseline formula duplicate removed or multiplicity reduced: "${bExpr}".`;
      }
      const exprMatch = unused.find(c => cleanForSearch(c.expression) === cleanForSearch(bExpr));
      if (exprMatch && b.explanation) {
        return `${route}: Baseline formula explanation for "${bExpr}" was modified or deleted.`;
      }
      return `${route}: Baseline formula expression missing or modified: "${bExpr}".`;
    }
  );
  violations.push(...formulaViolations);

  // 10. Figures Preservation (title and caption via 1-to-1 matching)
  const baseFigures = baseline.figures || [];
  const currFigures = current.figures || [];
  const figureViolations = matchMultiset(
    baseFigures,
    currFigures,
    (b, c) => cleanForSearch(c.title) === cleanForSearch(b.title) &&
              (!b.caption || cleanForSearch(c.caption) === cleanForSearch(b.caption)),
    (b, unused) => {
      const hadMatch = currFigures.some(c =>
        cleanForSearch(c.title) === cleanForSearch(b.title) &&
        (!b.caption || cleanForSearch(c.caption) === cleanForSearch(b.caption))
      );
      if (hadMatch) {
        return `${route}: Baseline figure #${b.index} ("${b.title}") duplicate removed or multiplicity reduced.`;
      }
      const titleMatch = unused.find(c => cleanForSearch(c.title) === cleanForSearch(b.title));
      if (titleMatch && b.caption) {
        return `${route}: Baseline figure #${b.index} ("${b.title}") caption was removed or modified.`;
      }
      return `${route}: Baseline figure #${b.index} ("${b.title}") missing or removed.`;
    }
  );
  violations.push(...figureViolations);

  return violations;
}

/**
 * Compares current topic quizzes against baseline quiz questions with 1-to-1 matching.
 */
export function compareTopicQuizzes(currentQuizzes, baselineQuizzes, route) {
  const violations = [];

  if (currentQuizzes.length < baselineQuizzes.length) {
    violations.push(
      `${route}: Quiz question count decreased: baseline had ${baselineQuizzes.length}, current has ${currentQuizzes.length}.`
    );
  }

  const quizViolations = matchMultiset(
    baselineQuizzes || [],
    currentQuizzes || [],
    (b, c) => {
      if (b.id !== undefined && c.id !== undefined && b.id !== c.id) return false;
      if (cleanForSearch(c.question) !== cleanForSearch(b.question)) return false;
      const bOptions = b.options || [];
      const cOptions = c.options || [];
      if (cOptions.length < bOptions.length) return false;
      for (let i = 0; i < bOptions.length; i++) {
        if (cleanForSearch(cOptions[i] || '') !== cleanForSearch(bOptions[i])) return false;
      }
      if (c.correctAnswerIndex !== b.correctAnswerIndex) return false;
      if (cleanForSearch(c.explanation) !== cleanForSearch(b.explanation)) return false;
      return true;
    },
    (b, unused) => {
      const qMatch = unused.find(
        c => b.id === c.id || cleanForSearch(c.question) === cleanForSearch(b.question)
      );
      if (qMatch) {
        const bOptions = b.options || [];
        const cOptions = qMatch.options || [];
        if (cOptions.length < bOptions.length) {
          return `${route}: Quiz question #${b.id} option count decreased: baseline had ${bOptions.length}, current has ${cOptions.length}.`;
        }
        for (let i = 0; i < bOptions.length; i++) {
          if (cleanForSearch(cOptions[i] || '') !== cleanForSearch(bOptions[i])) {
            return `${route}: Quiz question #${b.id} option [${i + 1}] was changed from "${bOptions[i]}" to "${cOptions[i]}".`;
          }
        }
        if (qMatch.correctAnswerIndex !== b.correctAnswerIndex) {
          return `${route}: Quiz question #${b.id} correct answer index changed from ${b.correctAnswerIndex} to ${qMatch.correctAnswerIndex}.`;
        }
        if (cleanForSearch(qMatch.explanation) !== cleanForSearch(b.explanation)) {
          return `${route}: Quiz question #${b.id} explanation was altered.`;
        }
      }
      return `${route}: Missing quiz question ID ${b.id}: "${b.question.slice(0, 60)}..."`;
    }
  );
  violations.push(...quizViolations);

  return violations;
}

/**
 * Validates baseline safety before writing an updated manifest.
 * Applies the exact same comparison standards as the verification suite.
 */
export function compareManifestSafety(existingManifest, newManifest) {
  if (!existingManifest || !existingManifest.pages) return [];

  const violations = [];

  // 1. Verify that all existing routes remain present
  for (const [route, oldPage] of Object.entries(existingManifest.pages)) {
    const newPage = newManifest.pages[route];
    if (!newPage) {
      violations.push(`Route removed: ${route}`);
      continue;
    }

    // Apply shared page content comparison!
    const pageViolations = comparePageContent(newPage, oldPage, route);
    violations.push(...pageViolations);

    // Apply shared quiz comparison if quizzes exist
    if (oldPage.quizzes && oldPage.quizzes.length > 0) {
      const quizViolations = compareTopicQuizzes(newPage.quizzes || [], oldPage.quizzes, route);
      violations.push(...quizViolations);
    }
  }

  // 2. Protected assets preservation
  if (existingManifest.protectedAssets) {
    for (const oldZip of existingManifest.protectedAssets.projectStarterZips || []) {
      const newZip = (newManifest.protectedAssets?.projectStarterZips || []).find(z => z.filename === oldZip.filename);
      if (!newZip || newZip.sha256 !== oldZip.sha256) {
        violations.push(`Project starter ZIP ${oldZip.filename} altered or missing`);
      }
    }
    for (const oldPdf of existingManifest.protectedAssets.interviewPdfs || []) {
      const newPdf = (newManifest.protectedAssets?.interviewPdfs || []).find(p => p.filename === oldPdf.filename);
      if (!newPdf || newPdf.sha256 !== oldPdf.sha256) {
        violations.push(`Interview PDF ${oldPdf.filename} altered or missing`);
      }
    }
  }

  return violations;
}

/**
 * Verifies all protected assets using the active StorageProvider.
 */
export async function verifyProtectedAssetsWithProvider(manifest, storageProvider = createStorageProvider()) {
  const violations = [];

  const expectedZips = manifest.protectedAssets?.projectStarterZips || [];
  for (const expZip of expectedZips) {
    const res = await storageProvider.verifyAssetIntegrity(expZip);
    if (!res.valid) {
      if (res.error) {
        violations.push(`Missing project starter archive: ${expZip.filename} (${res.error})`);
      } else {
        violations.push(
          `Project starter ZIP ${expZip.filename} integrity violation: expected SHA-256 ${expZip.sha256}, got ${res.actualSha256}.`
        );
      }
    }
  }

  const expectedPdfs = manifest.protectedAssets?.interviewPdfs || [];
  for (const expPdf of expectedPdfs) {
    const res = await storageProvider.verifyAssetIntegrity(expPdf);
    if (!res.valid) {
      if (res.error) {
        violations.push(`Missing protected document: ${expPdf.filename} (${res.error})`);
      } else {
        violations.push(
          `Protected document ${expPdf.filename} integrity violation: expected SHA-256 ${expPdf.sha256}, got ${res.actualSha256}.`
        );
      }
    }
  }

  return violations;
}
