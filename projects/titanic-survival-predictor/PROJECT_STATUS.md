# Titanic Survival Predictor — Project Status

Working branch: `parallel/titanic-quality-review`

Upstream preserved implementation snapshot: `feat/titanic-hands-on-handbook` at `6392dde45b20db30aaa02c5f3fd4f3bbbfe1963c`.

## Checkpoints

- [x] 0 — preserve Codex implementation on a remote branch before further work
- [x] 1 — inspect executed notebook, training script, app, tests and measured outputs
- [x] 2 — audit modeling methodology: split before preprocessing, five-model CV comparison, training-only tuning, one final holdout
- [x] 3 — rebuild website handbook around the actual Streamlit implementation and recorded metrics
- [x] 4 — add block-level implementation explanations, exercises, interview guidance, production boundary and mastery gate
- [x] 5 — define real screenshot/evidence inventory and strict desktop/mobile handbook verifier
- [x] 6 — create reproducible CI dataset fingerprint, full train/test/app/screenshot/build workflow
- [ ] 7 — CI must reproduce training, pass model + Streamlit tests, capture real app screenshots and store public evidence
- [ ] 8 — TypeScript, production build/prerender, desktop/mobile handbook checks must pass
- [ ] 9 — final acceptance audit and draft PR; no merge without explicit approval

## Current reference model

- dataset: classic Titanic 891-row training table
- features: Pclass, Sex, Age, SibSp, Parch, Fare, Embarked
- target: Survived
- split: 712 training / 179 final holdout, stratified, random_state=42
- model comparison: Logistic Regression, KNN, SVM, Decision Tree, Random Forest
- primary selection metric: mean 5-fold CV F1
- winner: Random Forest
- tuned parameters: max_depth=None, min_samples_leaf=2, n_estimators=200
- holdout accuracy: 0.8100558659
- holdout precision: 0.8181818182
- holdout recall: 0.6521739130
- holdout F1: 0.7258064516
- confusion matrix: [[100, 10], [24, 45]]

## Important boundary

The measured reference build does not claim feature engineering. `FamilySize` is presented only as a learner experiment. This avoids teaching one implementation while reporting metrics from another.

The project remains **NOT READY TO MERGE** until checkpoints 7–9 pass.
