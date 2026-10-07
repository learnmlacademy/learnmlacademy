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
- [ ] Checkpoint 2 — execute the complete ML training workflow in CI and capture real metrics/artifacts
- [ ] Checkpoint 3 — inspect actual model comparison, tune/fix methodology if necessary, rerun until clean
- [ ] Checkpoint 4 — verify saved model reload and Streamlit application
- [ ] Checkpoint 5 — capture real screenshots/output evidence
- [ ] Checkpoint 6 — write absolute-beginner website handbook with visible complete code
- [ ] Checkpoint 7 — integrate `/projects/house-price`, prerendering, sitemap, project catalog status, SEO
- [ ] Checkpoint 8 — mobile/accessibility/beginner audit, lint/build/CI, PR

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
