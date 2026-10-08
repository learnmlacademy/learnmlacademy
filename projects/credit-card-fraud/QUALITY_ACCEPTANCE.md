# Project 3 — Quality Acceptance

## Result

**PASS — ready for merge review.**

## Technical correctness
- official OpenML dataset 1597 metadata checked
- parquet fingerprint pinned
- natural class imbalance preserved in validation and test data
- split is train / validation / untouched test
- SMOTE runs only inside training folds
- model family selected using training-only 3-fold Average Precision
- threshold selected using validation data only
- final test evaluated once after model/threshold decisions
- saved model bundle reload verified

## Beginner reproducibility
- detailed practical problem statement appears before implementation
- 99.827% accuracy trap is calculated explicitly
- precision, recall, F1 and Average Precision are explained
- model strategies are compared rather than presented as magic
- validation threshold trade-off is visualized
- final confusion counts are converted back into precision/recall numerically
- full source files remain copyable after conceptual teaching
- exact Windows commands are provided
- tests, screenshots, outputs and project tree are included

## Real evidence
- class imbalance chart
- model comparison chart
- threshold trade-off chart
- final precision-recall curve
- final confusion matrix
- real Streamlit form
- real flagged fraud example
- real legitimate example

## Verified workflow

GitHub Actions run **37776917207** passed training, tests, live app, screenshot capture, TypeScript, production build/prerender and desktop/mobile handbook verification.
