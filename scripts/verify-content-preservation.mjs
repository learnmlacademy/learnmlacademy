import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createPrerenderServer, loadPages, outputPathForRoute } from './prerender.mjs';
import { extractEducationalContent, stripHtml } from './generate-content-preservation-manifest.mjs';

const MANIFEST_PATH = path.resolve('quality/content-preservation/manifest.json');

const EXPECTED_STARTER_ZIPS = [
  'ai-content-creator.zip',
  'ai-research-assistant.zip',
  'credit-card-fraud.zip',
  'customer-segmentation.zip',
  'digit-recognizer.zip',
  'disaster-tweets.zip',
  'house-price.zip',
  'model-to-production.zip',
  'movie-recommender.zip',
  'pdf-rag.zip',
  'retail-forecasting.zip',
  'titanic-survival.zip',
];

const EXPECTED_INTERVIEW_PDFS = [
  'Agentic_AI_Interview_Handbook_2026.pdf',
  'Behavioral_Project_Interview_Handbook_2026.pdf',
  'Deep_Learning_Interview_Handbook_2026.pdf',
  'Generative_AI_Interview_Handbook_2026.pdf',
  'LLM_RAG_Interview_Handbook_2026.pdf',
  'MLOps_Production_AI_Interview_Handbook_2026.pdf',
  'ML_AI_System_Design_Interview_Handbook_2026.pdf',
  'ML_Interview_Cheatsheet.pdf',
  'Python_for_ML_AI_Interviews_2026.pdf',
  'SQL_for_Data_AI_Interviews_2026.pdf',
];

const cleanForSearch = s =>
  s.replace(/[\u2018\u2019]/g, "'")
   .replace(/[\u201c\u201d]/g, '"')
   .replace(/\s+/g, ' ')
   .trim();

async function verifyContentPreservation() {
  console.log('Validating content preservation against baseline manifest...');

  // 1. Load manifest
  let manifestRaw;
  try {
    manifestRaw = await fs.readFile(MANIFEST_PATH, 'utf8');
  } catch {
    throw new Error(`Missing preservation manifest at ${MANIFEST_PATH}. Run 'node scripts/generate-content-preservation-manifest.mjs' to generate it.`);
  }
  const manifest = JSON.parse(manifestRaw);

  // 2. Verify static asset integrity
  for (const zip of EXPECTED_STARTER_ZIPS) {
    const zipPath = path.join('public/project-starters', zip);
    try {
      const st = await fs.stat(zipPath);
      assert(st.size > 1000, `Project starter ZIP ${zip} is unexpectedly small (${st.size} bytes)`);
    } catch {
      throw new Error(`Preservation violation: Missing project starter ZIP ${zipPath}`);
    }
  }

  for (const pdf of EXPECTED_INTERVIEW_PDFS) {
    const pdfPath = path.join('private', pdf);
    try {
      const st = await fs.stat(pdfPath);
      assert(st.size > 10000, `Interview PDF ${pdf} is unexpectedly small (${st.size} bytes)`);
    } catch {
      throw new Error(`Preservation violation: Missing protected interview PDF ${pdfPath}`);
    }
  }

  // 3. Verify sitemap and redirect preservation
  const sitemapXml = await fs.readFile('public/sitemap.xml', 'utf8');
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(
    sitemapUrls.length,
    manifest.totalPages,
    `Sitemap URL count mismatch: expected ${manifest.totalPages}, got ${sitemapUrls.length}`
  );

  const vercelJson = JSON.parse(await fs.readFile('vercel.json', 'utf8'));
  assert(
    Array.isArray(vercelJson.redirects) && vercelJson.redirects.length >= 33,
    `Preservation violation: vercel.json legacy redirects reduced (found ${vercelJson.redirects?.length || 0})`
  );

  // 4. Verify rendered page contents against baseline
  const vite = await createPrerenderServer();
  const failures = [];

  try {
    const pages = await loadPages(vite);
    assert.equal(
      pages.length,
      manifest.totalPages,
      `Canonical page route count mismatch: expected ${manifest.totalPages}, found ${pages.length}`
    );

    const { getQuizzesForTopicId } = await vite.ssrLoadModule('/src/data/quizzes.ts');

    for (const page of pages) {
      const baseline = manifest.pages[page.route];
      if (!baseline) {
        failures.push(`${page.route}: Route exists in current build but is missing from baseline manifest.`);
        continue;
      }

      const htmlPath = outputPathForRoute(page.route);
      let html;
      try {
        html = await fs.readFile(htmlPath, 'utf8');
      } catch {
        failures.push(`${page.route}: Prerendered HTML file missing at ${htmlPath}`);
        continue;
      }

      const current = extractEducationalContent(html, page.route);
      const searchableCurrentText = cleanForSearch(current.normalizedText);

      // A. Zero-Character-Loss Rule (Exact Authored Characters)
      if (current.exactCharCount < baseline.exactCharCount) {
        const lost = baseline.exactCharCount - current.exactCharCount;
        failures.push(
          `${page.route}: EXACT AUTHORED CHARACTER REGRESSION — Baseline had ${baseline.exactCharCount.toLocaleString()} chars, but current has ${current.exactCharCount.toLocaleString()} chars (lost ${lost.toLocaleString()} characters).`
        );
      }

      // B. Zero-Character-Loss Rule (Normalized Characters)
      if (current.normalizedCharCount < baseline.normalizedCharCount) {
        const lost = baseline.normalizedCharCount - current.normalizedCharCount;
        failures.push(
          `${page.route}: NORMALIZED CHARACTER REGRESSION — Baseline had ${baseline.normalizedCharCount.toLocaleString()} chars, but current has ${current.normalizedCharCount.toLocaleString()} chars (lost ${lost.toLocaleString()} characters).`
        );
      }

      // C. Headings Preservation
      for (const bHead of baseline.headings) {
        const needle = cleanForSearch(bHead.text);
        const found = current.headings.some(h => cleanForSearch(h.text) === needle) ||
                      searchableCurrentText.includes(needle);
        if (!found) {
          failures.push(`${page.route}: Missing baseline heading: "${bHead.text}"`);
        }
      }

      // D. Paragraphs Preservation (Detects deleted paragraphs even if filler text was added)
      for (const bPara of baseline.paragraphs) {
        const needle = cleanForSearch(bPara.text);
        if (!searchableCurrentText.includes(needle)) {
          failures.push(`${page.route}: Missing baseline paragraph starting with: "${needle.slice(0, 80)}..."`);
        }
      }

      // E. Code Block Preservation
      if (current.codeBlockCount < baseline.codeBlockCount) {
        failures.push(
          `${page.route}: Code block count decreased: baseline had ${baseline.codeBlockCount}, current has ${current.codeBlockCount}`
        );
      }

      // F. Table Preservation
      if (current.tableCount < baseline.tableCount) {
        failures.push(
          `${page.route}: Table count decreased: baseline had ${baseline.tableCount}, current has ${current.tableCount}`
        );
      }

      // G. Formula Preservation
      if (current.formulaCount < baseline.formulaCount) {
        failures.push(
          `${page.route}: Formula count decreased: baseline had ${baseline.formulaCount}, current has ${current.formulaCount}`
        );
      }

      // H. Quiz Preservation (for lesson routes)
      if (page.kind === 'lesson') {
        const topicId = page.route.replace(/^\/learn\//, '');
        const currentQuizzes = getQuizzesForTopicId(topicId) || [];
        if (currentQuizzes.length < baseline.quizCount) {
          failures.push(
            `${page.route}: Quiz question count decreased: baseline had ${baseline.quizCount}, current has ${currentQuizzes.length}`
          );
        } else {
          for (const bQ of baseline.quizzes) {
            const matchQ = currentQuizzes.find(q => q.id === bQ.id);
            if (!matchQ) {
              failures.push(`${page.route}: Missing quiz question ID ${bQ.id}`);
            } else {
              if (matchQ.question.trim() !== bQ.question.trim()) {
                failures.push(`${page.route}: Quiz question ${bQ.id} text altered`);
              }
              if (matchQ.options.length !== bQ.optionCount) {
                failures.push(`${page.route}: Quiz question ${bQ.id} options count altered`);
              }
              if (matchQ.correctAnswerIndex !== bQ.correctAnswerIndex) {
                failures.push(`${page.route}: Quiz question ${bQ.id} correct answer index altered`);
              }
              if (matchQ.explanation.trim() !== bQ.explanation.trim()) {
                failures.push(`${page.route}: Quiz question ${bQ.id} explanation altered`);
              }
            }
          }
        }
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
    `verify:content-preservation PASS — All ${manifest.totalPages} pages verified; 0 character regressions; 100% headings, paragraphs, code blocks, tables, formulas, and quizzes preserved.`
  );
}

await verifyContentPreservation();
