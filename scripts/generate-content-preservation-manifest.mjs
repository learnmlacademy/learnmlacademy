import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createPrerenderServer, loadPages, outputPathForRoute } from './prerender.mjs';

export const BASELINE_COMMIT = '4da2ece18a2e359b397c1504fb8585c4df5eb473';
export const MANIFEST_PATH = path.resolve('quality/content-preservation/manifest.json');
export const SUMMARY_PATH = path.resolve('quality/content-preservation/BASELINE_SUMMARY.md');

export const EXPECTED_STARTER_ZIPS = [
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

export const EXPECTED_INTERVIEW_PDFS = [
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

export function decodeHtml(html) {
  const namedEntities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
    '&nbsp;': ' ',
  };
  return html
    .replace(/&#(x[\da-f]+|\d+);/gi, (entity, code) => {
      const value = code[0].toLowerCase() === 'x'
        ? Number.parseInt(code.slice(1), 16)
        : Number.parseInt(code, 10);
      return Number.isInteger(value) && value >= 0 && value <= 0x10ffff
        ? String.fromCodePoint(value)
        : entity;
    })
    .replace(/&(amp|lt|gt|quot|apos|mdash|ndash|nbsp);/gi, entity =>
      namedEntities[entity.toLowerCase()] ?? entity
    );
}

export function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

export const cleanForSearch = s =>
  (s || '')
   .replace(/[\u2018\u2019]/g, "'")
   .replace(/[\u201c\u201d]/g, '"')
   .replace(/\s+/g, ' ')
   .trim();

export const stripHtml = str => cleanForSearch(decodeHtml(str.replace(/<[^>]+>/g, ' ')));

export function parseTable(tableHtml, idx = 1) {
  const capMatch = tableHtml.match(/<caption\b[^>]*>([\s\S]*?)<\/caption>/i);
  const caption = capMatch ? stripHtml(capMatch[1]) : '';
  const headers = [];
  const rows = [];
  const trs = [...tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
  for (const tr of trs) {
    const ths = [...tr[1].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map(m => stripHtml(m[1]));
    const tds = [...tr[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(m => stripHtml(m[1]));
    if (ths.length > 0 && tds.length === 0) {
      headers.push(ths);
    } else if (tds.length > 0) {
      rows.push(tds);
    } else if (ths.length > 0 && tds.length > 0) {
      rows.push([...ths, ...tds]);
    }
  }
  const flattenedHeaders = headers.flat();
  const colCount = Math.max(flattenedHeaders.length, ...rows.map(r => r.length), 0);
  const rawText = stripHtml(tableHtml);
  return {
    index: idx,
    caption,
    headers: flattenedHeaders,
    rows,
    rowCount: rows.length,
    colCount,
    rawText,
    hash: sha256(JSON.stringify({ caption, headers: flattenedHeaders, rows })),
  };
}

export function parseFormula(formulaHtml, idx = 1) {
  const exprMatch = formulaHtml.match(/<div\b[^>]*font-mono[^>]*>([\s\S]*?)<\/div>/i) ||
                    formulaHtml.match(/<div\b[^>]*data-formula-expression[^>]*>([\s\S]*?)<\/div>/i);
  const capMatch = formulaHtml.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
  const expression = exprMatch ? stripHtml(exprMatch[1]) : '';
  const explanation = capMatch ? stripHtml(capMatch[1]) : '';
  const fullText = stripHtml(formulaHtml);
  return {
    index: idx,
    expression: expression || fullText,
    explanation,
    fullText,
    hash: sha256(JSON.stringify({ expression: expression || fullText, explanation })),
  };
}

export function parseFigure(figHtml, idx = 1) {
  const titleMatch = figHtml.match(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i);
  const capMatch = figHtml.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
  const title = titleMatch ? stripHtml(titleMatch[1]) : `Figure ${idx}`;
  const caption = capMatch ? stripHtml(capMatch[1]) : '';
  const svgMatch = figHtml.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i);
  const imgMatch = figHtml.match(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/i);
  const visualAsset = imgMatch ? imgMatch[1] : (svgMatch ? 'inline-svg' : 'unknown');
  return {
    index: idx,
    title,
    caption,
    visualAsset,
    hash: sha256(JSON.stringify({ title, caption, visualAsset })),
  };
}

export function extractCodeBlocks(container) {
  const codeBlocks = [];
  let idx = 0;
  const replaced = container.replace(
    /<figure\b(?=[^>]*\bdata-code-block(?:\s|=|>))[^>]*>([\s\S]*?)<\/figure>/gi,
    (match, figureInner) => {
      idx++;
      const capMatch = figureInner.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
      const caption = capMatch ? stripHtml(capMatch[1]) : '';
      const codeMatch = figureInner.match(/<code\b[^>]*>([\s\S]*?)<\/code>/i);
      let rawCode = '';
      if (codeMatch) {
        rawCode = codeMatch[1];
      } else {
        const preMatch = figureInner.match(/<pre\b[^>]*>([\s\S]*?)<\/pre>/i);
        rawCode = preMatch ? preMatch[1] : figureInner;
      }
      const code = decodeHtml(rawCode.replace(/<[^>]+>/g, ''));
      codeBlocks.push({
        index: idx,
        kind: 'figure-code-block',
        caption,
        code,
        hash: sha256(code),
        captionHash: caption ? sha256(caption) : undefined,
      });
      return `\n<!-- CODE_BLOCK_PLACEHOLDER_${idx} -->\n`;
    }
  );

  const preMatches = [...replaced.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi)];
  for (const pm of preMatches) {
    idx++;
    const codeMatch = pm[1].match(/<code\b[^>]*>([\s\S]*?)<\/code>/i);
    const rawCode = codeMatch ? codeMatch[1] : pm[1];
    const code = decodeHtml(rawCode.replace(/<[^>]+>/g, ''));
    if (code.trim().length > 0) {
      codeBlocks.push({
        index: idx,
        kind: 'pre-code-block',
        caption: '',
        code,
        hash: sha256(code),
      });
    }
  }
  return codeBlocks;
}

export function extractEducationalContent(html, route) {
  let container = '';
  if (route.startsWith('/learn/')) {
    const match = html.match(/<article\b[^>]*data-lesson-body[^>]*>([\s\S]*?)<\/article>/i);
    container = match ? match[1] : '';
  }
  if (!container) {
    const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    container = match ? match[1] : '';
  }
  if (!container) {
    const match = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
    container = match ? match[1] : html;
  }

  // Strip non-authored tags: scripts, styles, comments
  const cleaned = container
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Extract headings with levels and multiplicity
  const rawHeadings = [...cleaned.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map(m => ({
      level: 'h' + m[1],
      text: stripHtml(m[2]),
    }))
    .filter(h => h.text.length > 0);

  const headingCounts = {};
  for (const h of rawHeadings) {
    const key = `${h.level}:::${h.text}`;
    headingCounts[key] = (headingCounts[key] || 0) + 1;
  }
  const headings = Object.entries(headingCounts).map(([key, count]) => {
    const [level, text] = key.split(':::');
    return {
      level,
      text,
      count,
      hash: sha256(text),
    };
  });

  // Extract all paragraphs with multiplicity (NO minimum character filter)
  const rawParagraphs = [...cleaned.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => stripHtml(m[1]))
    .filter(t => t.length > 0);

  const paraCounts = {};
  for (const p of rawParagraphs) {
    paraCounts[p] = (paraCounts[p] || 0) + 1;
  }
  const paragraphs = Object.entries(paraCounts).map(([text, count]) => ({
    text,
    count,
    hash: sha256(text),
  }));

  // Extract list items
  const listItems = [...cleaned.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map(m => stripHtml(m[1]))
    .filter(t => t.length > 0);

  // Extract captions
  const captions = [...cleaned.matchAll(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/gi)]
    .map(m => stripHtml(m[1]))
    .filter(t => t.length > 0);

  // Extract code blocks (both figure-code-block and standalone pre-code-block)
  const codeBlocks = extractCodeBlocks(cleaned);

  // Extract tables
  const tables = [...cleaned.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)]
    .map((m, idx) => parseTable(m[1], idx + 1))
    .filter(t => t.headers.length > 0 || t.rows.length > 0);

  // Extract formulas
  const formulas = [...cleaned.matchAll(/<figure\b(?=[^>]*\bdata-formula-block(?:\s|=|>))[^>]*>([\s\S]*?)<\/figure>/gi)]
    .map((m, idx) => parseFormula(m[1], idx + 1))
    .filter(f => f.expression.length > 0);

  // Extract figures
  const figures = [...cleaned.matchAll(/<figure\b(?=[^>]*\bdata-figure-shell(?:\s|=|>))[^>]*>([\s\S]*?)<\/figure>/gi)]
    .map((m, idx) => parseFigure(m[1], idx + 1));

  // Full authored text representation preserving line breaks and spacing
  const textWithBreaks = cleaned
    .replace(/<(?:p|div|section|article|li|tr|blockquote|h[1-6]|figcaption|header|footer)\b[^>]*>/gi, '\n')
    .replace(/<\/(?:p|div|section|article|li|tr|blockquote|h[1-6]|figcaption|header|footer)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');

  const exactText = decodeHtml(textWithBreaks)
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const normalizedText = exactText.replace(/\s+/g, ' ').trim();

  return {
    exactText,
    normalizedText,
    exactCharCount: exactText.length,
    normalizedCharCount: normalizedText.length,
    pageTextHash: sha256(exactText),
    normalizedTextHash: sha256(normalizedText),
    headings,
    rawHeadingCount: rawHeadings.length,
    paragraphs,
    rawParagraphCount: rawParagraphs.length,
    listItems,
    captions,
    codeBlocks,
    tables,
    formulas,
    figures,
  };
}

export async function hashFile(filePath) {
  const buf = await fs.readFile(filePath);
  return {
    size: buf.length,
    sha256: crypto.createHash('sha256').update(buf).digest('hex'),
  };
}

export function validateBaselineSafety(existingManifest, newManifest) {
  if (!existingManifest || !existingManifest.pages) return;

  const violations = [];

  // 1. Verify that all existing routes remain present
  for (const [route, oldPage] of Object.entries(existingManifest.pages)) {
    const newPage = newManifest.pages[route];
    if (!newPage) {
      violations.push(`Route removed: ${route}`);
      continue;
    }

    // 2. Authored character counts must never decrease
    if (newPage.exactCharCount < oldPage.exactCharCount) {
      violations.push(
        `${route}: Exact character count decreased from ${oldPage.exactCharCount} to ${newPage.exactCharCount}`
      );
    }
    if (newPage.normalizedCharCount < oldPage.normalizedCharCount) {
      violations.push(
        `${route}: Normalized character count decreased from ${oldPage.normalizedCharCount} to ${newPage.normalizedCharCount}`
      );
    }

    // 3. Headings preservation
    for (const oldHead of oldPage.headings || []) {
      const match = (newPage.headings || []).find(
        h => h.level === oldHead.level && cleanForSearch(h.text) === cleanForSearch(oldHead.text)
      );
      if (!match || (match.count || 1) < (oldHead.count || 1)) {
        violations.push(
          `${route}: Missing or modified baseline heading [${oldHead.level}]: "${oldHead.text}"`
        );
      }
    }

    // 4. Paragraphs preservation
    for (const oldPara of oldPage.paragraphs || []) {
      const match = (newPage.paragraphs || []).find(
        p => cleanForSearch(p.text) === cleanForSearch(oldPara.text)
      );
      if (!match || (match.count || 1) < (oldPara.count || 1)) {
        violations.push(
          `${route}: Missing or reduced baseline paragraph: "${oldPara.text.slice(0, 60)}..."`
        );
      }
    }

    // 5. Code blocks preservation
    for (const oldCode of oldPage.codeBlocks || []) {
      const match = (newPage.codeBlocks || []).find(c => c.hash === oldCode.hash);
      if (!match) {
        violations.push(
          `${route}: Missing or modified baseline code block #${oldCode.index}`
        );
      }
    }

    // 6. Tables preservation
    for (const oldTable of oldPage.tables || []) {
      const match = (newPage.tables || []).find(t => {
        if (oldTable.headers && Array.isArray(oldTable.headers) && oldTable.headers.length > 0) {
          return oldTable.headers.every(h => t.headers.some(th => cleanForSearch(th) === cleanForSearch(h)));
        }
        if (oldTable.text) {
          const cleanOld = cleanForSearch(oldTable.text);
          const tFlat = cleanForSearch(t.rawText || ((t.caption ? t.caption + ' ' : '') + t.headers.join(' ') + ' ' + t.rows.flat().join(' ')));
          return tFlat.includes(cleanOld.slice(0, 30)) || cleanOld.includes(tFlat.slice(0, 30));
        }
        return false;
      });
      if (!match) {
        violations.push(
          `${route}: Missing baseline table #${oldTable.index}`
        );
      }
    }

    // 7. Formulas preservation
    for (const oldFormula of oldPage.formulas || []) {
      const oldExpr = oldFormula.expression || oldFormula.formula || '';
      const match = (newPage.formulas || []).find(f => {
        const cleanExpr = cleanForSearch(f.expression);
        const cleanOld = cleanForSearch(oldExpr);
        return cleanExpr === cleanOld || f.fullText.includes(cleanOld.slice(0, 30)) || cleanOld.includes(cleanExpr.slice(0, 30));
      });
      if (!match) {
        violations.push(
          `${route}: Missing baseline formula: "${oldExpr}"`
        );
      }
    }

    // 8. Quizzes preservation
    for (const oldQuiz of oldPage.quizzes || []) {
      const match = (newPage.quizzes || []).find(
        q => q.id === oldQuiz.id || cleanForSearch(q.question) === cleanForSearch(oldQuiz.question)
      );
      if (!match) {
        violations.push(`${route}: Missing quiz question #${oldQuiz.id}`);
      } else {
        if (cleanForSearch(match.question) !== cleanForSearch(oldQuiz.question)) {
          violations.push(`${route}: Quiz question #${oldQuiz.id} text altered`);
        }
        if (match.optionCount < (oldQuiz.optionCount || oldQuiz.options?.length || 0)) {
          violations.push(`${route}: Quiz question #${oldQuiz.id} option count decreased`);
        }
        if (match.correctAnswerIndex !== oldQuiz.correctAnswerIndex) {
          violations.push(`${route}: Quiz question #${oldQuiz.id} correct answer index changed`);
        }
      }
    }
  }

  // 9. Protected assets preservation
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

  if (violations.length > 0) {
    throw new Error(
      `UNSAFE BASELINE UPDATE REJECTED with ${violations.length} violation(s):\n` +
      violations.map(v => `  - ${v}`).join('\n')
    );
  }
}

export async function generateManifest() {
  console.log('Generating content-preservation manifest from audited baseline...');
  const vite = await createPrerenderServer();
  try {
    const pages = await loadPages(vite);
    const { getQuizzesForTopicId } = await vite.ssrLoadModule('/src/data/quizzes.ts');

    // 1. Build protected assets inventory
    const projectStarterZips = [];
    for (const zip of EXPECTED_STARTER_ZIPS) {
      const p = path.join('public/project-starters', zip);
      const h = await hashFile(p);
      projectStarterZips.push({
        id: zip,
        filename: zip,
        size: h.size,
        sha256: h.sha256,
        currentLocalPath: p,
      });
    }

    const interviewPdfs = [];
    for (const pdf of EXPECTED_INTERVIEW_PDFS) {
      const p = path.join('private', pdf);
      const h = await hashFile(p);
      interviewPdfs.push({
        id: pdf,
        filename: pdf,
        size: h.size,
        sha256: h.sha256,
        storageType: 'local',
        currentLocalPath: p,
      });
    }

    const protectedAssets = {
      projectStarterZips,
      interviewPdfs,
      visualAssetReplacements: {},
    };

    const manifestPages = {};
    let grandExactChars = 0;
    let grandNormalizedChars = 0;
    let grandHeadings = 0;
    let grandParagraphs = 0;
    let grandListItems = 0;
    let grandCaptions = 0;
    let grandCodeBlocks = 0;
    let grandTables = 0;
    let grandFormulas = 0;
    let grandFigures = 0;
    let grandQuizzes = 0;

    for (const page of pages) {
      const htmlPath = outputPathForRoute(page.route);
      const html = await fs.readFile(htmlPath, 'utf8');

      const extracted = extractEducationalContent(html, page.route);

      let quizzes = [];
      if (page.kind === 'lesson') {
        const topicId = page.route.replace(/^\/learn\//, '');
        const rawQuizzes = getQuizzesForTopicId(topicId) || [];
        quizzes = rawQuizzes.map(q => {
          const canonicalPayload = JSON.stringify({
            id: q.id,
            question: q.question.trim(),
            options: q.options.map(o => o.trim()),
            correctAnswerIndex: q.correctAnswerIndex,
            explanation: q.explanation.trim(),
          });
          return {
            id: q.id,
            question: q.question.trim(),
            options: q.options.map(o => o.trim()),
            optionCount: q.options.length,
            correctAnswerIndex: q.correctAnswerIndex,
            explanation: q.explanation.trim(),
            hash: sha256(canonicalPayload),
          };
        });
      }

      grandExactChars += extracted.exactCharCount;
      grandNormalizedChars += extracted.normalizedCharCount;
      grandHeadings += extracted.rawHeadingCount;
      grandParagraphs += extracted.rawParagraphCount;
      grandListItems += extracted.listItems.length;
      grandCaptions += extracted.captions.length;
      grandCodeBlocks += extracted.codeBlocks.length;
      grandTables += extracted.tables.length;
      grandFormulas += extracted.formulas.length;
      grandFigures += extracted.figures.length;
      grandQuizzes += quizzes.length;

      manifestPages[page.route] = {
        route: page.route,
        kind: page.kind,
        title: page.title,
        category: page.category || 'General',
        exactCharCount: extracted.exactCharCount,
        normalizedCharCount: extracted.normalizedCharCount,
        pageTextHash: extracted.pageTextHash,
        normalizedTextHash: extracted.normalizedTextHash,
        headingCount: extracted.rawHeadingCount,
        paragraphCount: extracted.rawParagraphCount,
        listItemCount: extracted.listItems.length,
        captionCount: extracted.captions.length,
        codeBlockCount: extracted.codeBlocks.length,
        tableCount: extracted.tables.length,
        formulaCount: extracted.formulas.length,
        figureCount: extracted.figures.length,
        quizCount: quizzes.length,
        headings: extracted.headings,
        paragraphs: extracted.paragraphs,
        listItems: extracted.listItems,
        captions: extracted.captions,
        codeBlocks: extracted.codeBlocks,
        tables: extracted.tables,
        formulas: extracted.formulas,
        figures: extracted.figures,
        quizzes,
      };
    }

    const newManifest = {
      version: '1.1.0',
      baselineCommit: BASELINE_COMMIT,
      generatedAt: new Date().toISOString(),
      totalPages: pages.length,
      totals: {
        exactAuthoredCharacters: grandExactChars,
        normalizedAuthoredCharacters: grandNormalizedChars,
        headings: grandHeadings,
        paragraphs: grandParagraphs,
        listItems: grandListItems,
        captions: grandCaptions,
        codeBlocks: grandCodeBlocks,
        tables: grandTables,
        formulas: grandFormulas,
        figures: grandFigures,
        quizzes: grandQuizzes,
      },
      protectedAssets,
      pages: manifestPages,
    };

    // If an existing manifest is present, validate safety before saving!
    try {
      const existingRaw = await fs.readFile(MANIFEST_PATH, 'utf8');
      const existingManifest = JSON.parse(existingRaw);
      console.log('Validating baseline evolution against existing manifest...');
      validateBaselineSafety(existingManifest, newManifest);
      console.log('Baseline safety check PASSED — Zero content regressions detected.');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    // Atomic write
    const tmpPath = `${MANIFEST_PATH}.tmp`;
    const backupPath = path.resolve('quality/content-preservation/manifest.backup.json');

    await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
    await fs.writeFile(tmpPath, JSON.stringify(newManifest, null, 2), 'utf8');

    // Backup existing if exists
    try {
      await fs.copyFile(MANIFEST_PATH, backupPath);
    } catch {
      // fine if first run
    }

    await fs.rename(tmpPath, MANIFEST_PATH);
    console.log(`Manifest written atomically to: ${MANIFEST_PATH}`);

    // Generate markdown summary
    const summaryMd = `# LearnMLAcademy Content-Preservation Baseline Summary

**Baseline Commit:** \`${BASELINE_COMMIT}\`  
**Generated At:** \`${newManifest.generatedAt}\`  
**Total Canonical Pages:** \`${newManifest.totalPages}\`  

---

## 1. Site-Wide Preservation Totals

| Content Element | Baseline Count | Preservation Policy Requirement |
| :--- | :---: | :--- |
| **Exact Authored Characters** | **${grandExactChars.toLocaleString()}** | **MUST NEVER DECREASE** (Preserves Python code indentation, line breaks, math operators, block breaks) |
| **Normalized Authored Characters** | **${grandNormalizedChars.toLocaleString()}** | **MUST NEVER DECREASE** (Whitespace-collapsed prose baseline) |
| **Educational Headings** | **${grandHeadings.toLocaleString()}** | All existing headings with level and multiplicity must remain present on their pages |
| **Authored Paragraphs** | **${grandParagraphs.toLocaleString()}** | All existing paragraphs (regardless of character length) must remain intact with multiplicity preserved |
| **Authored List Items** | **${grandListItems.toLocaleString()}** | All list items across all lessons and handbooks preserved |
| **Captions & Annotations** | **${grandCaptions.toLocaleString()}** | All figure and code block captions preserved |
| **Runnable Code Blocks** | **${grandCodeBlocks.toLocaleString()}** | All existing code blocks (both interactive figure blocks and pre-code blocks) preserved with exact code & indentation |
| **Data & Comparison Tables** | **${grandTables.toLocaleString()}** | All existing tables, header cells, rows, and cell contents preserved |
| **Mathematical Formulas** | **${grandFormulas.toLocaleString()}** | All formula blocks with expressions and parameter explanations preserved |
| **Figure Shells & Diagrams** | **${grandFigures.toLocaleString()}** | All diagrams, titles, captions, and visual anchors preserved |
| **Verified Quiz Questions** | **${grandQuizzes.toLocaleString()}** | All 773 quiz questions across 167 topics (including all options and explanations) preserved |
| **Project Starter Archives** | **${projectStarterZips.length}** | All 12 ZIP archives verified with SHA-256 content hashes |
| **Interview Handbooks (PDFs)** | **${interviewPdfs.length}** | All 10 PDF documents fingerprinted with SHA-256 for secure future delivery migration |

---

## 2. Character Count Methodology & Reconciliation

- **Audit DOM Text (Prompt 1 Reference):** Reported 2,692,619 characters based on DOM traversal of paragraph text.
- **Exact Authored Characters (${grandExactChars.toLocaleString()}):** Authoritative measurement capturing all rendered educational content inside the lesson/content body, preserving meaningful line breaks (\`\\n\`), Python code indentation, comments, mathematical symbols (\`−\`, \`=\`, \`+\`, \`×\`), table cells, and captions.
- **Normalized Authored Characters (${grandNormalizedChars.toLocaleString()}):** Secondary measurement collapsing whitespace sequences (\`\\s+\`) to a single space.
- **Paragraph Count Reconciliation (${grandParagraphs.toLocaleString()}):** Includes all meaningful authored paragraphs without artificial length thresholds (including short labels, callouts, and step markers).

---

## 3. Page Breakdown by Category

| Category / Track | Page Count | Exact Chars | Normalized Chars | Headings | Paragraphs | Code Blocks | Tables | Formulas | Quizzes |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
${Object.entries(
  Object.values(manifestPages).reduce((acc, p) => {
    const cat = p.category || 'General';
    if (!acc[cat]) {
      acc[cat] = { count: 0, exact: 0, norm: 0, headings: 0, paragraphs: 0, code: 0, tables: 0, formulas: 0, quizzes: 0 };
    }
    acc[cat].count++;
    acc[cat].exact += p.exactCharCount;
    acc[cat].norm += p.normalizedCharCount;
    acc[cat].headings += p.headingCount;
    acc[cat].paragraphs += p.paragraphCount;
    acc[cat].code += p.codeBlockCount;
    acc[cat].tables += p.tableCount;
    acc[cat].formulas += p.formulaCount;
    acc[cat].quizzes += p.quizCount;
    return acc;
  }, {})
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([cat, d]) => `| ${cat} | ${d.count} | ${d.exact.toLocaleString()} | ${d.norm.toLocaleString()} | ${d.headings} | ${d.paragraphs} | ${d.code} | ${d.tables} | ${d.formulas} | ${d.quizzes} |`)
  .join('\n')}

---

## 4. Automated Verification Command

Run the preservation verification suite:

\`\`\`bash
npm run verify:content-preservation
\`\`\`

If any existing page loses characters, paragraphs, headings, code, formulas, tables, or quizzes, the command exits with a non-zero error code and blocks deployment.
`;

    await fs.writeFile(SUMMARY_PATH, summaryMd, 'utf8');
    console.log(`Summary written to: ${SUMMARY_PATH}`);
  } finally {
    await vite.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  await generateManifest();
}
