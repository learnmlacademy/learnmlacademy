import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createPrerenderServer, loadPages, outputPathForRoute } from './prerender.mjs';

const BASELINE_COMMIT = '4da2ece18a2e359b397c1504fb8585c4df5eb473';
const MANIFEST_PATH = path.resolve('quality/content-preservation/manifest.json');
const SUMMARY_PATH = path.resolve('quality/content-preservation/BASELINE_SUMMARY.md');

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

export const stripHtml = str => decodeHtml(str.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

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

  // Strip non-authored tags: scripts, styles, comments, SVG paths
  const cleaned = container
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '');

  // Extract structured elements
  const headings = [...cleaned.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map(m => {
      const text = stripHtml(m[2]);
      return {
        level: 'h' + m[1],
        text,
        hash: sha256(text),
      };
    })
    .filter(h => h.text.length > 0);

  const paragraphs = [...cleaned.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => {
      const text = stripHtml(m[1]);
      return {
        text,
        hash: sha256(text),
      };
    })
    .filter(p => p.text.length > 20);

  const codeBlocks = [...cleaned.matchAll(/<figure\b(?=[^>]*\bdata-code-block(?:\s|=|>))[^>]*>([\s\S]*?)<\/figure>/gi)]
    .map((m, idx) => {
      const codeMatch = m[1].match(/<code\b[^>]*>([\s\S]*?)<\/code>/i);
      const code = codeMatch ? decodeHtml(codeMatch[1].replace(/<[^>]+>/g, '')) : '';
      return {
        index: idx + 1,
        code,
        hash: sha256(code),
      };
    })
    .filter(cb => cb.code.length > 0);

  const tables = [...cleaned.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)]
    .map((m, idx) => {
      const text = stripHtml(m[1]);
      return {
        index: idx + 1,
        text,
        hash: sha256(text),
      };
    })
    .filter(t => t.text.length > 0);

  const formulas = [...cleaned.matchAll(/<figure\b(?=[^>]*\bdata-formula-block(?:\s|=|>))[^>]*>([\s\S]*?)<\/figure>/gi)]
    .map((m, idx) => {
      const text = stripHtml(m[1]);
      return {
        index: idx + 1,
        formula: text,
        hash: sha256(text),
      };
    })
    .filter(f => f.formula.length > 0);

  const figures = [...cleaned.matchAll(/<figure\b(?=[^>]*\bdata-figure-shell(?:\s|=|>))[^>]*>([\s\S]*?)<\/figure>/gi)]
    .map((m, idx) => {
      const titleMatch = m[1].match(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i);
      const title = titleMatch ? stripHtml(titleMatch[1]) : `Figure ${idx + 1}`;
      return {
        index: idx + 1,
        title,
        hash: sha256(title),
      };
    });

  // Meaningful text with line breaks preserved
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
    paragraphs,
    codeBlocks,
    tables,
    formulas,
    figures,
  };
}

async function generateManifest() {
  console.log('Generating content-preservation manifest from audited baseline...');
  const vite = await createPrerenderServer();
  try {
    const pages = await loadPages(vite);
    const { getQuizzesForTopicId } = await vite.ssrLoadModule('/src/data/quizzes.ts');

    const manifestPages = {};
    let grandExactChars = 0;
    let grandNormalizedChars = 0;
    let grandHeadings = 0;
    let grandParagraphs = 0;
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
            question: q.question,
            options: q.options,
            correctAnswerIndex: q.correctAnswerIndex,
            explanation: q.explanation,
          });
          return {
            id: q.id,
            question: q.question,
            optionCount: q.options.length,
            correctAnswerIndex: q.correctAnswerIndex,
            explanation: q.explanation,
            hash: sha256(canonicalPayload),
          };
        });
      }

      grandExactChars += extracted.exactCharCount;
      grandNormalizedChars += extracted.normalizedCharCount;
      grandHeadings += extracted.headings.length;
      grandParagraphs += extracted.paragraphs.length;
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
        headingCount: extracted.headings.length,
        paragraphCount: extracted.paragraphs.length,
        codeBlockCount: extracted.codeBlocks.length,
        tableCount: extracted.tables.length,
        formulaCount: extracted.formulas.length,
        figureCount: extracted.figures.length,
        quizCount: quizzes.length,
        headings: extracted.headings,
        paragraphs: extracted.paragraphs,
        codeBlocks: extracted.codeBlocks,
        tables: extracted.tables,
        formulas: extracted.formulas,
        figures: extracted.figures,
        quizzes,
      };
    }

    const manifest = {
      version: '1.0.0',
      baselineCommit: BASELINE_COMMIT,
      generatedAt: new Date().toISOString(),
      totalPages: pages.length,
      totals: {
        exactAuthoredCharacters: grandExactChars,
        normalizedAuthoredCharacters: grandNormalizedChars,
        headings: grandHeadings,
        paragraphs: grandParagraphs,
        codeBlocks: grandCodeBlocks,
        tables: grandTables,
        formulas: grandFormulas,
        figures: grandFigures,
        quizzes: grandQuizzes,
      },
      pages: manifestPages,
    };

    await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`Manifest written to: ${MANIFEST_PATH}`);

    // Generate markdown summary
    const summaryMd = `# LearnMLAcademy Content-Preservation Baseline Summary

**Baseline Commit:** \`${BASELINE_COMMIT}\`  
**Generated At:** \`${manifest.generatedAt}\`  
**Total Canonical Pages:** \`${manifest.totalPages}\`  

---

## 1. Site-Wide Preservation Totals

| Content Element | Baseline Count | Preservation Policy Requirement |
| :--- | :---: | :--- |
| **Exact Authored Characters** | **${grandExactChars.toLocaleString()}** | **MUST NEVER DECREASE** (Meaningful whitespace and formatting preserved) |
| **Normalized Authored Characters** | **${grandNormalizedChars.toLocaleString()}** | **MUST NEVER DECREASE** (Whitespace-collapsed prose baseline) |
| **Educational Headings** | **${grandHeadings.toLocaleString()}** | All existing headings must remain present on their pages |
| **Authored Paragraphs** | **${grandParagraphs.toLocaleString()}** | All existing paragraphs must remain intact (no deletion/shortening) |
| **Runnable Code Blocks** | **${grandCodeBlocks.toLocaleString()}** | All existing code blocks must remain present and executable |
| **Data & Comparison Tables** | **${grandTables.toLocaleString()}** | All existing tables and row data must remain intact |
| **Mathematical Formulas** | **${grandFormulas.toLocaleString()}** | All formula blocks must remain present |
| **Figure Shells & Diagrams** | **${grandFigures.toLocaleString()}** | All diagrams and visual anchors must remain intact |
| **Verified Quiz Questions** | **${grandQuizzes.toLocaleString()}** | All 773 quiz questions across 167 topics must remain intact |

---

## 2. Page Breakdown by Category

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

## 3. Automated Verification Command

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
