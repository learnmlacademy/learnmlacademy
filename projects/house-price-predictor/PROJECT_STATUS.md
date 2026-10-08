# House Price Predictor — Project Status

Branch: `parallel/house-price-handbook`

Project title: **What Is This House Really Worth? Build a House Price Predictor**

Access plan: **Free project** under the locked LearnMLAcademy 3-free / 9-premium model.

## Locked execution rule

This project is built first and documented from the real build. Do not invent screenshots, metrics, commands, outputs, or model results.

The work sequence is:

**BUILD → VERIFY → RECORD OUTPUT → CAPTURE REAL EVIDENCE → WRITE HANDBOOK → VERIFY AGAIN**

## Checkpoints

- [x] Checkpoint 0 — isolated parallel branch created
- [x] Checkpoint 1 — project folder, dependency file, official dataset downloader, training pipeline, Streamlit app, and app smoke test created
- [x] Checkpoint 2 — execute the complete ML training workflow in CI and capture real metrics/artifacts
- [x] Checkpoint 3 — inspect actual model comparison, tune/fix methodology if necessary, rerun until clean
- [x] Checkpoint 4 — verify saved model reload and Streamlit application
- [x] Checkpoint 5 — capture real screenshots/output evidence
- [x] Checkpoint 6 — absolute-beginner website handbook written with visible complete code, real outputs, real screenshots, troubleshooting and completion checklist
- [x] Checkpoint 7 — `/projects/house-price` route, prerendering, sitemap, project catalog status and SEO integrated on the isolated branch
- [x] Checkpoint 8 — final paid-value learning audit + expanded screenshot evidence + desktop/mobile/build/CI re-verification passed; PR remains draft pending explicit user approval

## Dataset decision

Use the public **Ames Housing** dataset, OpenML dataset **43926**.

Official dataset page:
https://www.openml.org/search?id=43926&sort=runs&type=data

Why this dataset:
- created for data-science education
- 2,930 home sales
- realistic numeric and categorical property features
- target is actual sale price
- good fit for regression, regularization, feature engineering, preprocessing, ensembles and deployment

Do not commit the raw dataset into the LearnMLAcademy repository. The learner downloads it from the official source by running `python download_data.py`.

## Modeling methodology

1. Keep a final 20% holdout test set untouched during model comparison.
2. Compare candidate models using 5-fold cross-validation on training data only.
3. Primary selection metric: mean CV RMSE.
4. Candidate models: Linear Regression, Ridge, Lasso, Random Forest, XGBoost.
5. Tune only the selected model using training data.
6. Evaluate exactly once on the holdout set after model selection/tuning.
7. Report MAE, RMSE and R².
8. Save the complete preprocessing + model pipeline with Joblib.
9. Reload the saved pipeline and make a prediction to prove persistence works.

## App decision

Final framework: **Streamlit**, consistent with the current project-handbook standard.

The app must clearly state that Ames data is historical and the result is an educational estimate, not a professional appraisal.

## Screenshot rule

Only screenshots captured from the real project are allowed. No generated UI screenshots and no fabricated model results.

If a Windows-only installer screen cannot be reproduced in the available execution environment, provide exact verified text instructions rather than a fake screenshot.


## Verified execution evidence

Latest successful GitHub Actions run: `37650476988`

The workflow completed all executable checks successfully:
- downloaded the official OpenML Ames Housing dataset: 2,930 rows, 81 columns
- trained and compared all five candidate models
- selected the winner using 5-fold cross-validation on training data only
- tuned the selected model on training data only
- evaluated the final model once on the untouched holdout set
- saved and reloaded the fitted pipeline
- passed the Streamlit application test
- passed a live Streamlit health check
- captured real Streamlit screenshots with Chromium

### Real 5-fold cross-validation results

| Model | Mean CV RMSE | Mean CV MAE | Mean CV R² |
| --- | ---: | ---: | ---: |
| XGBoost | $26,575 | $16,867 | 0.874 |
| Random Forest | $27,585 | $17,438 | 0.867 |
| Ridge | $31,214 | $19,154 | 0.825 |
| Linear Regression | $31,251 | $18,887 | 0.824 |
| Lasso | $31,562 | $19,432 | 0.820 |

Winner: **XGBoost**

Best tuning result:
- `learning_rate = 0.06`
- `max_depth = 3`
- `n_estimators = 450`
- best CV RMSE after tuning: **$26,542**

### Final untouched holdout result

- MAE: **$15,670**
- RMSE: **$23,792**
- R²: **0.929**
- training rows: **2,344**
- test rows: **586**
- reload-check prediction: **$153,563**

These figures are real execution output. Do not replace them with illustrative numbers unless the project code or dataset changes and the workflow is rerun.

### Real screenshots captured

The successful CI run produced:
- `streamlit-house-price-app.png`
- `streamlit-house-price-prediction.png`
- `actual_vs_predicted.png`

These screenshots must be used as the source of truth for the handbook.


## Parallel-work state

This project is intentionally isolated on `parallel/house-price-handbook` so Titanic/Codex work can continue independently.

Current branch state:
- checkpoints 1–8 are complete under the stricter implementation-learning and screenshot-quality gate
- the branch is based on current `main` and is kept separate to minimize conflicts with Titanic work
- the stricter expanded workflow passed in push run `37741183525` and PR run `37741188510`, including 11 required evidence images, build/prerender and desktop/mobile handbook verification
- next repository action is PR review/merge coordination; merge order should be chosen to avoid unnecessary conflicts with any active Titanic branch touching `src/App.tsx`, `src/data/projectPortfolio.ts`, `scripts/prerender.mjs` or `generate_sitemap.cjs`
