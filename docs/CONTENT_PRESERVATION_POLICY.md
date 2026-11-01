# LearnMLAcademy Content-Preservation Policy
**Mandatory Architecture Standard for All Engineers and AI Coding Agents**  
**Version:** 1.0.0  
**Effective Date:** 2026-11-01  
**Baseline Commit:** `4da2ece18a2e359b397c1504fb8585c4df5eb473`  
**Governing Principle:** Non-Negotiable Content Preservation (Additive-Only Policy)

---

## 1. Absolute Non-Negotiable Requirement

> **NO EXISTING TOPIC, LESSON, PROJECT HANDBOOK, BLOG POST OR WEBPAGE MAY LOSE EVEN ONE CHARACTER OF ITS EXISTING AUTHORED CONTENT.**

Future engineering and design work on LearnMLAcademy may **ADD** content, explanations, illustrations, diagrams, Python code, animations, interactive simulations, and educational material.

Existing authored content must **NEVER** be shortened, summarized, truncated, or removed.

### Protected Content Elements
This policy strictly protects:
- **Headings and Subheadings (`<h1>` - `<h6>`)**: Structure and terminology must remain.
- **Paragraphs and Explanations (`<p>`)**: In-depth conceptual reasoning, intuition, and prose.
- **Numerical Examples & Step-by-Step Derivations**: Small-number worked calculations.
- **Mathematical Formulas**: Expressions and symbol-by-symbol parameter explanations.
- **Python and Other Programming Code**: Complete, runnable code blocks and captured outputs.
- **Tables and Matrices**: Comparison tables, feature lists, and decision guides.
- **Quizzes and Diagnostics**: All 773 multiple-choice questions, options, answer indices, and explanations.
- **Captions, Callouts, and Notes**: Practical selections, edge cases, and misconception warnings.
- **Project Instructions**: End-to-end steps, setup commands, and verification criteria.
- **Blog Guides and Interview Solutions**: FAANG guides, system design topologies, and cheat sheets.

---

## 2. Rationale: Why Visual Redesigns Must Never Delete Content

A common pitfall in web development is replacing deep, thorough technical writing with "cleaner", compressed summaries during a visual redesign.

At LearnMLAcademy:
- **Naive-Learner Traceability** requires that a beginner can follow every step without inferring unstated prerequisites.
- **Search Engine Authority** depends on comprehensive, exhaustive educational coverage.
- **Educational Trust** requires that a returning learner finds every worked example, formula explanation, and code snippet intact.

Visual improvements (modern typography, better spacing, cards, animations, interactive widgets) must **enhance** the presentation of existing text, not replace it.

---

## 3. Character-Count & Content-Fingerprinting Methodology

The content-preservation system relies on two independent, deterministic measurements implemented in `scripts/generate-content-preservation-manifest.mjs`:

### Measurement A: Exact Authored-Text Character Count
- Extracts the rendered educational text from the primary container (`<article data-lesson-body>` for lessons, `<main>` for project handbooks and static pages).
- Strips non-authored technical artifacts: `<script>`, `<style>`, HTML comments `<!-- ... -->`, and SVG path geometry.
- Translates block elements (`<p>`, `<div>`, `<li>`, `<tr>`, `<pre>`, `<h1-h6>`, `<blockquote>`) into meaningful line breaks (`\n`).
- Decodes HTML entities (`&amp;` $\to$ `&`, `&#x27;` $\to$ `'`, `&quot;` $\to$ `"`, etc.).
- Preserves punctuation, numbers, formulas, and meaningful indentation.
- **Metric**: `exactCharCount` = length of exact formatted text string.

### Measurement B: Normalized Content Fingerprint (SHA-256)
- Collapses all whitespace into single spaces and trims leading/trailing space.
- Calculates cryptographic SHA-256 digests across:
  1. Entire page normalized text (`pageTextHash`).
  2. Every individual heading (`headings[].hash`).
  3. Every individual paragraph (`paragraphs[].hash`).
  4. Every individual code block (`codeBlocks[].hash`).
  5. Every individual table (`tables[].hash`).
  6. Every individual formula block (`formulas[].hash`).
  7. Every individual quiz question, option array, and answer index (`quizzes[].hash`).

---

## 4. Manifest Architecture & Storage

All baseline preservation data is stored in the versioned manifest:

```
quality/content-preservation/
├── manifest.json            # Versioned JSON manifest recording every page and element hash
└── BASELINE_SUMMARY.md      # Human-readable summary table and verification report
```

### Baseline Manifest Fields per Page
```json
{
  "route": "/learn/linear-regression",
  "kind": "lesson",
  "title": "Linear Regression: From Intuition to Math and Code",
  "category": "4. Supervised Learning",
  "exactCharCount": 14210,
  "normalizedCharCount": 13850,
  "pageTextHash": "3f8a...",
  "headingCount": 12,
  "paragraphCount": 38,
  "codeBlockCount": 2,
  "tableCount": 3,
  "formulaCount": 2,
  "quizCount": 5,
  "headings": [ ... ],
  "paragraphs": [ ... ],
  "codeBlocks": [ ... ],
  "tables": [ ... ],
  "formulas": [ ... ],
  "quizzes": [ ... ]
}
```

---

## 5. Automated Verification & CI Enforcement

The preservation test suite is executed locally and in CI via:

```bash
npm run verify:content-preservation
npm run test:preservation-negatives
```

### Verification Rules Enforced by the Test Suite
1. **Zero Character Regression**: For every baseline page, `current.exactCharCount >= baseline.exactCharCount` (2,817,056 baseline exact characters) and `current.normalizedCharCount >= baseline.normalizedCharCount` (2,654,695 baseline normalized characters).
2. **Heading Retention & Hierarchy**: Every heading present in the baseline must exist with its exact heading level (`h1`-`h6`), exact text, and multiplicity preserved. Headings demoted to paragraph text are rejected.
3. **Paragraph Retention & Multiplicity**: All 11,505 baseline paragraphs—regardless of length—must remain present with multiplicity preserved. Truncation, partial deletion, duplicate removal, and replacement with filler are rejected.
4. **Code Block Source Integrity**: All 724 code blocks (362 interactive figure code blocks + 362 standalone pre-code blocks) are verified against baseline SHA-256 hashes. Code content, indentation, comments, line breaks, and captions must remain intact.
5. **Table Structure & Cell Data**: All 504 tables are validated cell-by-cell. No table, row, column, header, or cell value may be deleted or modified. Additive rows and new tables are permitted.
6. **Mathematical Formula Invariance**: All 47 formula blocks are verified for exact mathematical expressions (symbols, operators, variables) and accompanying parameter definitions.
7. **Complete Quiz Preservation**: All 773 quiz questions across 167 curriculum topics must retain their exact question ID, question text, option texts in exact order, correct answer index, and full educational explanation.
8. **Protected Asset Integrity**: All 12 downloadable project starter ZIP archives and 10 interview PDF handbooks are validated against cryptographic SHA-256 digests. Document identity is decoupled from local storage paths, enabling future migration to private object storage with signed URLs.
9. **Route & Growth Permissiveness**: All 201 baseline routes must remain present. Additional pages and routes may be added and protected through the controlled baseline-evolution workflow.
10. **Automated Negative Test Guard**: The 22-case negative and positive test suite (`npm run test:preservation-negatives`) proves that any attempted omission or truncation is immediately flagged and blocked.

---

## 6. Baseline Evolution & Update Rules

As the platform grows, new lessons, project handbooks, and expanded explanations will be added.

### Rules for Updating the Baseline Manifest
1. **Explicit Operation Only**: Updating the baseline must be an intentional action executed via:
   ```bash
   npm run update:content-preservation
   ```
2. **No Silent CI Rewrites**: Normal builds (`npm run build`), test commands, or CI workflows must **NEVER** automatically rewrite `manifest.json`.
3. **Additive Updates**: When running `update:content-preservation`, new pages or added paragraphs are incorporated into the baseline. Character counts for existing pages must be equal to or greater than the previous baseline.
4. **Exception Handling**:
   - If an existing educational section requires a genuine factual correction that inadvertently reduces characters, it cannot be committed without explicit documentation.
   - The developer must document the old fingerprint, new fingerprint, page URL, reason for correction, and ensure the overall page character count is maintained or expanded with accompanying clarifying text.

---

## 7. Examples of Acceptable vs. Unacceptable Changes

| Change Proposed | Classification | Verdict | Rationale |
| :--- | :---: | :---: | :--- |
| **Adding an animated SVG diagram below an existing explanation** | Additive Enhancement | **PERMITTED** | Enhances visual learning while keeping 100% of the authored prose intact. |
| **Adding interactive Python execution to a static code block** | Additive Enhancement | **PERMITTED** | The existing Python code remains executable; interactive running supplements learning. |
| **Adding 2 new worked examples to a Deep Learning lesson** | Content Expansion | **PERMITTED** | Increases authored characters and enriches educational value. |
| **Adding a 6th question to an existing 5-question quiz** | Quiz Expansion | **PERMITTED** | Increases diagnostic testing coverage. |
| **Replacing a 4-paragraph derivation with a summary card** | Text Reduction | **STRICTLY FORBIDDEN** | Violates naive-learner traceability and character-count baseline. |
| **Removing "redundant" sentences to make a page look cleaner** | Prose Truncation | **STRICTLY FORBIDDEN** | Breaches the zero-character-reduction requirement. |
| **Replacing a Python code block with an image screenshot** | Code Removal | **STRICTLY FORBIDDEN** | Code blocks must remain text-selectable, copyable, and executable. |
| **Deleting a column from a comparison table** | Table Reduction | **STRICTLY FORBIDDEN** | All comparison rows and columns must remain preserved. |
| **Altering a quiz question explanation to be shorter** | Quiz Truncation | **STRICTLY FORBIDDEN** | Detailed feedback explanations are protected educational material. |

---

## 8. Summary Checklist for Pull Requests

Before opening any Pull Request:
- [ ] Run `npm run lint` (0 TypeScript errors).
- [ ] Run `npm run build` (builds 201 pages and verifies SSG).
- [ ] Run `npm run verify:content-preservation` (confirms 0 character regressions and 100% content preservation).
- [ ] Verify that no existing paragraphs, code blocks, tables, formulas, or quiz questions were removed or shortened.
