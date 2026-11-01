# LearnMLAcademy Content-Preservation Baseline Summary

**Baseline Commit:** `4da2ece18a2e359b397c1504fb8585c4df5eb473`  
**Generated At:** `2026-11-01T07:24:01.793Z`  
**Total Canonical Pages:** `201`  

---

## 1. Site-Wide Preservation Totals

| Content Element | Baseline Count | Preservation Policy Requirement |
| :--- | :---: | :--- |
| **Exact Authored Characters** | **2,817,056** | **MUST NEVER DECREASE** (Preserves Python code indentation, line breaks, math operators, block breaks) |
| **Normalized Authored Characters** | **2,654,695** | **MUST NEVER DECREASE** (Whitespace-collapsed prose baseline) |
| **Educational Headings** | **4,015** | All existing headings with level and multiplicity must remain present on their pages |
| **Authored Paragraphs** | **11,505** | All existing paragraphs (regardless of character length) must remain intact with multiplicity preserved |
| **Authored List Items** | **3,361** | All list items across all lessons and handbooks preserved |
| **Captions & Annotations** | **488** | All figure and code block captions preserved |
| **Runnable Code Blocks** | **724** | All existing code blocks (both interactive figure blocks and pre-code blocks) preserved with exact code & indentation |
| **Data & Comparison Tables** | **504** | All existing tables, header cells, rows, and cell contents preserved |
| **Mathematical Formulas** | **47** | All formula blocks with expressions and parameter explanations preserved |
| **Figure Shells & Diagrams** | **124** | All diagrams, titles, captions, and visual anchors preserved |
| **Verified Quiz Questions** | **773** | All 773 quiz questions across 167 topics (including all options and explanations) preserved |
| **Project Starter Archives** | **12** | All 12 ZIP archives verified with SHA-256 content hashes |
| **Interview Handbooks (PDFs)** | **10** | All 10 PDF documents fingerprinted with SHA-256 for secure future delivery migration |

---

## 2. Character Count Methodology & Reconciliation

- **Audit DOM Text (Prompt 1 Reference):** Reported 2,692,619 characters based on DOM traversal of paragraph text.
- **Exact Authored Characters (2,817,056):** Authoritative measurement capturing all rendered educational content inside the lesson/content body, preserving meaningful line breaks (`\n`), Python code indentation, comments, mathematical symbols (`−`, `=`, `+`, `×`), table cells, and captions.
- **Normalized Authored Characters (2,654,695):** Secondary measurement collapsing whitespace sequences (`\s+`) to a single space.
- **Paragraph Count Reconciliation (11,505):** Includes all meaningful authored paragraphs without artificial length thresholds (including short labels, callouts, and step markers).

---

## 3. Page Breakdown by Category

| Category / Track | Page Count | Exact Chars | Normalized Chars | Headings | Paragraphs | Code Blocks | Tables | Formulas | Quizzes |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1. Foundations | 7 | 72,286 | 70,079 | 108 | 387 | 0 | 17 | 0 | 28 |
| 10. Deep Learning | 24 | 378,598 | 363,353 | 405 | 2587 | 24 | 69 | 0 | 118 |
| 11. Advanced Deep Learning Topics | 3 | 31,271 | 30,340 | 32 | 203 | 2 | 5 | 0 | 15 |
| 12. Generative AI | 17 | 213,196 | 199,326 | 224 | 707 | 19 | 36 | 24 | 85 |
| 13. Large Language Models | 16 | 97,320 | 93,841 | 197 | 486 | 2 | 37 | 7 | 80 |
| 14. Agentic AI | 16 | 213,170 | 204,573 | 260 | 490 | 48 | 43 | 16 | 80 |
| 15. Projects | 8 | 92,550 | 88,191 | 217 | 236 | 27 | 32 | 0 | 40 |
| 16. AI Engineering & MLOps | 8 | 96,496 | 93,266 | 158 | 195 | 12 | 32 | 0 | 40 |
| 17. Career & Interview Preparation | 15 | 66,574 | 63,861 | 130 | 144 | 2 | 23 | 0 | 75 |
| 2. Python & ML Libraries | 4 | 60,397 | 55,720 | 65 | 248 | 103 | 18 | 0 | 16 |
| 3. Data Preprocessing & Feature Engineering | 8 | 112,487 | 107,256 | 202 | 407 | 87 | 34 | 0 | 32 |
| 4. Supervised Learning | 12 | 215,426 | 205,179 | 486 | 1289 | 40 | 62 | 0 | 48 |
| 5. Ensemble Learning | 6 | 90,180 | 86,353 | 170 | 529 | 9 | 12 | 0 | 24 |
| 6. Unsupervised Learning | 7 | 100,716 | 96,420 | 237 | 688 | 15 | 15 | 0 | 28 |
| 7. Model Evaluation & Optimization | 8 | 96,021 | 92,124 | 175 | 621 | 24 | 23 | 0 | 32 |
| 8. Time Series & Forecasting | 4 | 52,637 | 50,588 | 93 | 328 | 9 | 16 | 0 | 16 |
| 9. Advanced Learning Paradigms | 4 | 63,218 | 60,337 | 141 | 296 | 12 | 9 | 0 | 16 |
| Algorithms | 2 | 15,843 | 14,959 | 24 | 91 | 13 | 1 | 0 | 0 |
| Career | 6 | 26,946 | 25,843 | 48 | 114 | 0 | 0 | 0 | 0 |
| Data Science | 1 | 9,439 | 9,187 | 11 | 30 | 6 | 1 | 0 | 0 |
| Fundamentals | 1 | 7,939 | 7,652 | 20 | 40 | 6 | 1 | 0 | 0 |
| General | 10 | 56,642 | 51,813 | 132 | 241 | 1 | 0 | 0 | 0 |
| Generative AI | 1 | 20,828 | 20,198 | 19 | 115 | 7 | 2 | 0 | 0 |
| Hands-on Projects | 13 | 626,876 | 564,236 | 461 | 1033 | 256 | 16 | 0 | 0 |

---

## 4. Automated Verification Command

Run the preservation verification suite:

```bash
npm run verify:content-preservation
npm run test:preservation-negatives
```

If any existing page loses characters, paragraphs, headings, code, formulas, tables, list items, captions, or quizzes, the command exits with a non-zero error code and blocks deployment.

---

## 5. Final Hardening Architecture & Invariants (Prompt 2B)

### A. Multiset 1-to-1 Matching Engine (`scripts/preservation-engine.mjs`)
- Replaces loose count checks and unrestricted `Array.find` searches with strict multiset 1-to-1 matching.
- An element from current content is consumed at most once (`usedCurrentIndices = new Set()`).
- Identical duplicates in the baseline (such as repeated formula blocks, identical code blocks, repeated captions, duplicate list items, and repeated table rows) require an equal multiplicity in current content.
- Deleting one duplicate out of multiple identical entries is immediately detected as a violation.

### B. Full Coverage for List Items & Educational Captions
- All 3,361 list items and 488 captions/annotations across all 201 pages are fingerprinted and matched 1-to-1.
- Detects deleted, shortened, modified, or reduced multiplicity for list items and captions.

### C. Unified Verifier & Baseline Updater Logic
- Both `verify-content-preservation.mjs` and `generate-content-preservation-manifest.mjs` share identical comparison logic exported from `preservation-engine.mjs`.
- Attempting to update the baseline via `validateBaselineSafety` enforces the exact same non-negotiable checks (character thresholds, headings, paragraphs, code, tables, formulas, figures, quizzes, lists, captions, and protected assets). Unsafe updates are strictly rejected.

### D. Private Object Storage Provider Abstraction (`scripts/storage-provider.mjs`)
- Implements `StorageProvider` interface for protected documents and project starter ZIPs.
- `LocalStorageProvider`: Active during local development and build verification, verifying files against local disk paths.
- `PrivateObjectStorageProvider`: Release 1 specification for migrating PDF interview handbooks to private, signed-URL object storage (e.g., S3, Cloud Storage, Cloudflare R2) without exposing public buckets or credentials.
- All documents retain exact SHA-256 integrity verification regardless of the underlying storage backend.

### E. GitHub Main Branch Protection
- Configured via GitHub REST API on `main` branch:
  - Required status checks: `['verify', 'audit', 'browser-check']`
  - Strict branch update requirement enabled
  - Enforce admins enabled

