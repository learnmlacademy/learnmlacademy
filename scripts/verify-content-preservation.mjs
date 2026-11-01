import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createPrerenderServer, loadPages, outputPathForRoute } from './prerender.mjs';
import {
  extractEducationalContent,
  cleanForSearch,
  hashFile,
  MANIFEST_PATH,
  EXPECTED_STARTER_ZIPS,
  EXPECTED_INTERVIEW_PDFS,
} from './generate-content-preservation-manifest.mjs';

/**
 * Resolves the physical path of a protected document.
 * This decouples document identity from storage location, enabling
 * future migration to private object storage with signed URLs.
 */
export function resolveAssetPath(asset, baseDir = process.cwd()) {
  if (asset.currentLocalPath) {
    return path.resolve(baseDir, asset.currentLocalPath);
  }
  if (asset.filename && asset.filename.endsWith('.pdf')) {
    return path.resolve(baseDir, 'private', asset.filename);
  }
  if (asset.filename && asset.filename.endsWith('.zip')) {
    return path.resolve(baseDir, 'public/project-starters', asset.filename);
  }
  return path.resolve(baseDir, asset.path || asset.filename);
}

/**
 * Verifies that all protected assets (PDFs and ZIPs) exist, have expected sizes,
 * and match their cryptographic SHA-256 fingerprints.
 */
export async function verifyProtectedAssets(manifest, baseDir = process.cwd()) {
  const violations = [];

  const expectedZips = manifest.protectedAssets?.projectStarterZips || [];
  for (const expZip of expectedZips) {
    const zipPath = resolveAssetPath(expZip, baseDir);
    try {
      const h = await hashFile(zipPath);
      if (h.size !== expZip.size) {
        violations.push(
          `Project starter ZIP ${expZip.filename} size mismatch: expected ${expZip.size} bytes, got ${h.size} bytes.`
        );
      }
      if (h.sha256 !== expZip.sha256) {
        violations.push(
          `Project starter ZIP ${expZip.filename} SHA-256 hash mismatch: expected ${expZip.sha256}, got ${h.sha256}. Content altered.`
        );
      }
    } catch {
      violations.push(`Missing project starter archive at ${zipPath}`);
    }
  }

  const expectedPdfs = manifest.protectedAssets?.interviewPdfs || [];
  for (const expPdf of expectedPdfs) {
    const pdfPath = resolveAssetPath(expPdf, baseDir);
    try {
      const h = await hashFile(pdfPath);
      if (h.size !== expPdf.size) {
        violations.push(
          `Protected document ${expPdf.filename} size mismatch: expected ${expPdf.size} bytes, got ${h.size} bytes.`
        );
      }
      if (h.sha256 !== expPdf.sha256) {
        violations.push(
          `Protected document ${expPdf.filename} SHA-256 hash mismatch: expected ${expPdf.sha256}, got ${h.sha256}. Document modified.`
        );
      }
    } catch {
      violations.push(`Missing protected document at ${pdfPath}`);
    }
  }

  return violations;
}

/**
 * Verifies sitemap.xml and vercel.json redirect preservation.
 */
export async function verifySitemapAndRedirects(manifest, baseDir = process.cwd()) {
  const violations = [];

  const sitemapPath = path.resolve(baseDir, 'public/sitemap.xml');
  try {
    const sitemapXml = await fs.readFile(sitemapPath, 'utf8');
    const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

    if (sitemapUrls.length < manifest.totalPages) {
      violations.push(
        `Sitemap URL count decreased: baseline had ${manifest.totalPages}, current has ${sitemapUrls.length}`
      );
    }

    // Verify all baseline routes exist in sitemap
    for (const [route] of Object.entries(manifest.pages)) {
      const expectedUrl = route === '/' ? 'https://www.learnmlacademy.com/' : `https://www.learnmlacademy.com${route}`;
      if (!sitemapUrls.includes(expectedUrl)) {
        violations.push(`Sitemap missing baseline route: ${expectedUrl}`);
      }
    }
  } catch (err) {
    violations.push(`Failed to verify sitemap.xml: ${err.message}`);
  }

  const vercelPath = path.resolve(baseDir, 'vercel.json');
  try {
    const vercelJson = JSON.parse(await fs.readFile(vercelPath, 'utf8'));
    if (!Array.isArray(vercelJson.redirects) || vercelJson.redirects.length < 33) {
      violations.push(
        `Vercel redirects reduced: expected at least 33, found ${vercelJson.redirects?.length || 0}`
      );
    }
  } catch (err) {
    violations.push(`Failed to verify vercel.json: ${err.message}`);
  }

  return violations;
}

/**
 * Verifies that a current page strictly preserves all baseline educational content.
 */
export function verifyPageContent(current, baseline, route) {
  const violations = [];

  // 1. Exact Authored Characters (preserves code indentation, line breaks, math symbols)
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

  // 3. Headings Preservation (verifies level, text, and multiplicity)
  const currentHeadingCounts = {};
  for (const h of current.headings) {
    const key = `${h.level}:::${cleanForSearch(h.text)}`;
    currentHeadingCounts[key] = (currentHeadingCounts[key] || 0) + (h.count || 1);
  }
  for (const bHead of baseline.headings) {
    const key = `${bHead.level}:::${cleanForSearch(bHead.text)}`;
    const requiredCount = bHead.count || 1;
    const availableCount = currentHeadingCounts[key] || 0;
    if (availableCount < requiredCount) {
      violations.push(
        `${route}: Missing or modified baseline heading [${bHead.level}]: "${bHead.text}" (expected at least ${requiredCount}, found ${availableCount})`
      );
    }
  }

  // 4. Paragraphs Preservation (verifies all paragraphs, multiplicity, and partial truncation)
  const currentParaCounts = {};
  for (const p of current.paragraphs) {
    const key = cleanForSearch(p.text);
    currentParaCounts[key] = (currentParaCounts[key] || 0) + (p.count || 1);
  }
  const searchableCurrent = cleanForSearch(current.normalizedText);
  for (const bPara of baseline.paragraphs) {
    const key = cleanForSearch(bPara.text);
    const requiredCount = bPara.count || 1;
    const availableCount = currentParaCounts[key] || 0;
    if (availableCount < requiredCount) {
      const isTruncated = current.paragraphs.some(p =>
        key.startsWith(cleanForSearch(p.text)) || cleanForSearch(p.text).startsWith(key)
      ) || searchableCurrent.includes(key.slice(0, Math.min(key.length, 20)));
      if (isTruncated) {
        violations.push(
          `${route}: Baseline paragraph was shortened or modified: "${bPara.text.slice(0, 60)}..." (expected count ${requiredCount}, found ${availableCount})`
        );
      } else {
        violations.push(
          `${route}: Baseline paragraph missing or deleted: "${bPara.text.slice(0, 60)}..." (expected count ${requiredCount}, found ${availableCount})`
        );
      }
    }
  }

  // 5. Code Blocks Preservation (exact source code, indentation, newlines, captions, multiplicity)
  const currentCodeHashes = {};
  for (const cb of current.codeBlocks) {
    currentCodeHashes[cb.hash] = (currentCodeHashes[cb.hash] || 0) + 1;
  }
  for (const bCode of baseline.codeBlocks) {
    const availableCount = currentCodeHashes[bCode.hash] || 0;
    if (availableCount === 0) {
      const partialMatch = current.codeBlocks.find(c =>
        (bCode.caption && c.caption && cleanForSearch(c.caption) === cleanForSearch(bCode.caption)) ||
        c.code.includes(bCode.code.slice(0, Math.min(bCode.code.length, 15))) ||
        bCode.code.includes(c.code.slice(0, Math.min(c.code.length, 15)))
      );
      if (partialMatch) {
        violations.push(
          `${route}: Baseline code block #${bCode.index} was shortened or modified.`
        );
      } else {
        violations.push(
          `${route}: Baseline code block #${bCode.index} missing or replaced with unrelated code.`
        );
      }
    } else {
      currentCodeHashes[bCode.hash]--;
    }

    if (bCode.caption) {
      const matchWithCap = current.codeBlocks.find(
        c => c.hash === bCode.hash && cleanForSearch(c.caption) === cleanForSearch(bCode.caption)
      );
      if (!matchWithCap && availableCount > 0) {
        violations.push(
          `${route}: Baseline code block #${bCode.index} caption was removed or modified: "${bCode.caption.slice(0, 50)}..."`
        );
      }
    }
  }

  // 6. Tables Preservation (all headers, rows, columns, and cell contents)
  const matchedTableIndices = new Set();
  for (const bTable of baseline.tables) {
    const candidates = current.tables.filter(t => !matchedTableIndices.has(t.index));
    let matchingTable = candidates.find(t => t.hash === bTable.hash);
    if (!matchingTable) {
      matchingTable = candidates.find(
        t => t.index === bTable.index &&
             bTable.headers.length > 0 &&
             bTable.headers.every(h => t.headers.some(th => cleanForSearch(th) === cleanForSearch(h)))
      );
    }
    if (!matchingTable) {
      matchingTable = candidates.find(t => {
        const headersMatch = bTable.headers.length === 0 ||
          bTable.headers.every(h => t.headers.some(th => cleanForSearch(th) === cleanForSearch(h)));
        if (!headersMatch) return false;
        const rowOverlap = (bTable.rows || []).filter(bRow =>
          t.rows.some(cRow => bRow.every((cell, idx) => cleanForSearch(cRow[idx] || '') === cleanForSearch(cell)))
        ).length;
        return rowOverlap > 0;
      });
    }
    if (!matchingTable && bTable.rawText) {
      matchingTable = candidates.find(t =>
        cleanForSearch(t.rawText || '').includes(cleanForSearch(bTable.rawText.slice(0, 30)))
      );
    }

    if (!matchingTable) {
      violations.push(
        `${route}: Baseline table #${bTable.index} (headers: [${(bTable.headers || []).join(', ')}]) is missing.`
      );
    } else {
      matchedTableIndices.add(matchingTable.index);
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
      for (const bRow of bTable.rows || []) {
        const foundRow = matchingTable.rows.some(cRow =>
          bRow.every((cell, cIdx) => cleanForSearch(cRow[cIdx] || '') === cleanForSearch(cell))
        );
        if (!foundRow) {
          violations.push(
            `${route}: Baseline table #${bTable.index} has a modified or deleted row: [${bRow.slice(0, 3).join(', ')}...].`
          );
        }
      }
    }
  }

  // 7. Formulas Preservation (expressions and explanations)
  for (const bFormula of baseline.formulas) {
    const matchFormula = current.formulas.find(
      f => cleanForSearch(f.expression) === cleanForSearch(bFormula.expression)
    );
    if (!matchFormula) {
      violations.push(
        `${route}: Baseline formula expression missing or modified: "${bFormula.expression}".`
      );
    } else if (bFormula.explanation && cleanForSearch(matchFormula.explanation) !== cleanForSearch(bFormula.explanation)) {
      violations.push(
        `${route}: Baseline formula explanation for "${bFormula.expression}" was modified or deleted.`
      );
    }
  }

  // 8. Figures Preservation (title, caption)
  for (const bFig of baseline.figures) {
    const matchFig = current.figures.find(
      f => cleanForSearch(f.title) === cleanForSearch(bFig.title)
    );
    if (!matchFig) {
      violations.push(
        `${route}: Baseline figure #${bFig.index} ("${bFig.title}") missing or removed.`
      );
    } else if (bFig.caption && cleanForSearch(matchFig.caption) !== cleanForSearch(bFig.caption)) {
      violations.push(
        `${route}: Baseline figure #${bFig.index} ("${bFig.title}") caption was removed or modified.`
      );
    }
  }

  return violations;
}

/**
 * Verifies that all topic quiz questions, options, and explanations are preserved.
 */
export function verifyTopicQuizzes(currentQuizzes, baselineQuizzes, route) {
  const violations = [];

  if (currentQuizzes.length < baselineQuizzes.length) {
    violations.push(
      `${route}: Quiz question count decreased: baseline had ${baselineQuizzes.length}, current has ${currentQuizzes.length}.`
    );
  }

  for (const bQ of baselineQuizzes) {
    const matchQ = currentQuizzes.find(
      q => q.id === bQ.id || cleanForSearch(q.question) === cleanForSearch(bQ.question)
    );
    if (!matchQ) {
      violations.push(`${route}: Missing quiz question ID ${bQ.id}: "${bQ.question.slice(0, 60)}..."`);
      continue;
    }
    if (cleanForSearch(matchQ.question) !== cleanForSearch(bQ.question)) {
      violations.push(`${route}: Quiz question #${bQ.id} text altered.`);
    }
    if (matchQ.options.length < bQ.options.length) {
      violations.push(
        `${route}: Quiz question #${bQ.id} options count decreased: baseline had ${bQ.options.length}, current has ${matchQ.options.length}.`
      );
    } else {
      bQ.options.forEach((bOpt, oIdx) => {
        if (cleanForSearch(matchQ.options[oIdx] || '') !== cleanForSearch(bOpt)) {
          violations.push(
            `${route}: Quiz question #${bQ.id} option [${oIdx + 1}] was changed from "${bOpt}" to "${matchQ.options[oIdx]}".`
          );
        }
      });
    }
    if (matchQ.correctAnswerIndex !== bQ.correctAnswerIndex) {
      violations.push(
        `${route}: Quiz question #${bQ.id} correct answer index changed from ${bQ.correctAnswerIndex} to ${matchQ.correctAnswerIndex}.`
      );
    }
    if (cleanForSearch(matchQ.explanation) !== cleanForSearch(bQ.explanation)) {
      violations.push(
        `${route}: Quiz question #${bQ.id} explanation was altered.`
      );
    }
  }

  return violations;
}

export async function verifyContentPreservation() {
  console.log('Validating content preservation against baseline manifest...');

  let manifestRaw;
  try {
    manifestRaw = await fs.readFile(MANIFEST_PATH, 'utf8');
  } catch {
    throw new Error(
      `Missing preservation manifest at ${MANIFEST_PATH}. Run 'npm run update:content-preservation' to generate it.`
    );
  }
  const manifest = JSON.parse(manifestRaw);

  const failures = [];

  // 1. Verify protected assets
  const assetViolations = await verifyProtectedAssets(manifest);
  failures.push(...assetViolations);

  // 2. Verify sitemap and redirects
  const sitemapViolations = await verifySitemapAndRedirects(manifest);
  failures.push(...sitemapViolations);

  // 3. Verify prerendered pages
  const vite = await createPrerenderServer();
  try {
    const pages = await loadPages(vite);

    // Support additional pages: page count must be >= baseline totalPages
    if (pages.length < manifest.totalPages) {
      failures.push(
        `Canonical page route count decreased: baseline had ${manifest.totalPages}, current has ${pages.length}`
      );
    }

    const { getQuizzesForTopicId } = await vite.ssrLoadModule('/src/data/quizzes.ts');

    // Verify that every single baseline route remains present
    for (const [route, baseline] of Object.entries(manifest.pages)) {
      const pageExists = pages.some(p => p.route === route);
      if (!pageExists) {
        failures.push(`${route}: Route was removed or replaced.`);
        continue;
      }

      const htmlPath = outputPathForRoute(route);
      let html;
      try {
        html = await fs.readFile(htmlPath, 'utf8');
      } catch {
        failures.push(`${route}: Prerendered HTML file missing at ${htmlPath}`);
        continue;
      }

      const current = extractEducationalContent(html, route);
      const pageViolations = verifyPageContent(current, baseline, route);
      failures.push(...pageViolations);

      // Quiz verification for lessons
      if (baseline.quizzes && baseline.quizzes.length > 0) {
        const topicId = route.replace(/^\/learn\//, '');
        const currentQuizzes = (getQuizzesForTopicId(topicId) || []).map(q => ({
          id: q.id,
          question: q.question.trim(),
          options: q.options.map(o => o.trim()),
          correctAnswerIndex: q.correctAnswerIndex,
          explanation: q.explanation.trim(),
        }));
        const quizViolations = verifyTopicQuizzes(currentQuizzes, baseline.quizzes, route);
        failures.push(...quizViolations);
      }
    }
  } finally {
    await vite.close();
  }

  if (failures.length > 0) {
    console.error(`\n❌ CONTENT PRESERVATION TEST FAILED with ${failures.length} violation(s):\n`);
    for (const f of failures.slice(0, 30)) {
      console.error(`  - ${f}`);
    }
    if (failures.length > 30) {
      console.error(`  ... and ${failures.length - 30} more violations.`);
    }
    process.exit(1);
  }

  console.log(
    `verify:content-preservation PASS — All ${manifest.totalPages} baseline pages verified; 0 character regressions; 100% headings, paragraphs, code blocks, tables, formulas, figures, and quizzes preserved.`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  await verifyContentPreservation();
}
