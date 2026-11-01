# LearnMLAcademy Content-Preservation Baseline Summary

**Baseline Commit:** `4da2ece18a2e359b397c1504fb8585c4df5eb473`  
**Generated At:** `2026-11-01T06:18:46.355Z`  
**Total Canonical Pages:** `201`  

---

## 1. Site-Wide Preservation Totals

| Content Element | Baseline Count | Preservation Policy Requirement |
| :--- | :---: | :--- |
| **Exact Authored Characters** | **2,732,393** | **MUST NEVER DECREASE** (Meaningful whitespace and formatting preserved) |
| **Normalized Authored Characters** | **2,607,126** | **MUST NEVER DECREASE** (Whitespace-collapsed prose baseline) |
| **Educational Headings** | **4,015** | All existing headings must remain present on their pages |
| **Authored Paragraphs** | **9,144** | All existing paragraphs must remain intact (no deletion/shortening) |
| **Runnable Code Blocks** | **362** | All existing code blocks must remain present and executable |
| **Data & Comparison Tables** | **504** | All existing tables and row data must remain intact |
| **Mathematical Formulas** | **47** | All formula blocks must remain present |
| **Figure Shells & Diagrams** | **124** | All diagrams and visual anchors must remain intact |
| **Verified Quiz Questions** | **773** | All 773 quiz questions across 167 topics must remain intact |

---

## 2. Page Breakdown by Category

| Category / Track | Page Count | Exact Chars | Normalized Chars | Headings | Paragraphs | Code Blocks | Tables | Formulas | Quizzes |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1. Foundations | 7 | 71,365 | 69,857 | 108 | 305 | 0 | 17 | 0 | 28 |
| 10. Deep Learning | 24 | 361,017 | 350,596 | 405 | 1780 | 0 | 69 | 0 | 118 |
| 11. Advanced Deep Learning Topics | 3 | 30,645 | 29,946 | 32 | 145 | 0 | 5 | 0 | 15 |
| 12. Generative AI | 17 | 179,515 | 175,100 | 224 | 587 | 19 | 36 | 24 | 85 |
| 13. Large Language Models | 16 | 95,791 | 93,204 | 197 | 376 | 2 | 37 | 7 | 80 |
| 14. Agentic AI | 16 | 205,337 | 199,153 | 260 | 434 | 48 | 43 | 16 | 80 |
| 15. Projects | 8 | 91,145 | 88,009 | 217 | 212 | 27 | 32 | 0 | 40 |
| 16. AI Engineering & MLOps | 8 | 95,434 | 92,835 | 158 | 195 | 12 | 32 | 0 | 40 |
| 17. Career & Interview Preparation | 15 | 65,700 | 63,861 | 130 | 144 | 2 | 23 | 0 | 75 |
| 2. Python & ML Libraries | 4 | 59,837 | 55,720 | 65 | 172 | 0 | 18 | 0 | 16 |
| 3. Data Preprocessing & Feature Engineering | 8 | 110,423 | 106,218 | 202 | 353 | 0 | 34 | 0 | 32 |
| 4. Supervised Learning | 12 | 211,438 | 204,074 | 486 | 1003 | 0 | 62 | 0 | 48 |
| 5. Ensemble Learning | 6 | 88,728 | 85,920 | 170 | 417 | 0 | 12 | 0 | 24 |
| 6. Unsupervised Learning | 7 | 99,497 | 96,178 | 237 | 561 | 0 | 15 | 0 | 28 |
| 7. Model Evaluation & Optimization | 8 | 95,082 | 92,005 | 175 | 473 | 0 | 23 | 0 | 32 |
| 8. Time Series & Forecasting | 4 | 52,345 | 50,588 | 93 | 269 | 0 | 16 | 0 | 16 |
| 9. Advanced Learning Paradigms | 4 | 62,433 | 60,014 | 141 | 254 | 0 | 9 | 0 | 16 |
| Algorithms | 2 | 15,751 | 14,959 | 24 | 65 | 0 | 1 | 0 | 0 |
| Career | 6 | 26,592 | 25,843 | 48 | 102 | 0 | 0 | 0 | 0 |
| Data Science | 1 | 9,393 | 9,187 | 11 | 27 | 0 | 1 | 0 | 0 |
| Fundamentals | 1 | 7,893 | 7,652 | 20 | 36 | 0 | 1 | 0 | 0 |
| General | 10 | 54,726 | 51,801 | 132 | 192 | 0 | 0 | 0 | 0 |
| Generative AI | 1 | 20,776 | 20,198 | 19 | 84 | 0 | 2 | 0 | 0 |
| Hands-on Projects | 13 | 621,530 | 564,208 | 461 | 958 | 252 | 16 | 0 | 0 |

---

## 3. Automated Verification Command

Run the preservation verification suite:

```bash
npm run verify:content-preservation
```

If any existing page loses characters, paragraphs, headings, code, formulas, tables, or quizzes, the command exits with a non-zero error code and blocks deployment.
