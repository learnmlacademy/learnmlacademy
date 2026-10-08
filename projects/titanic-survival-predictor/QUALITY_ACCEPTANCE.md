# Titanic Survival Predictor — Learning Value Acceptance

This free flagship project is held to the same implementation-learning standard intended for paid LearnMLAcademy projects.

## Current quality gate

| Dimension | Standard |
| --- | --- |
| Technical correctness | Split before preprocessing, five training-only model comparisons, training-only tuning, one final holdout evaluation, saved full pipeline |
| Beginner reproducibility | Exact Windows clicks, filenames, commands, expected outputs and checkpoints |
| Implementation understanding | The learner can explain data flow, preprocessing, cross-validation, tuning, metrics, serialization and inference |
| Active learning | Learner changes model-selection behavior, adds an optional feature, changes preprocessing and safely breaks/fixes inference |
| Debugging | Common setup/data/model/schema failures have concrete fixes |
| Evidence | Charts and application screenshots come from the real executable project |
| Portfolio readiness | Clean project tree, README, tests, Git path, measured results and limitations |
| Interview readiness | Learner can justify the Pipeline, stratification, F1 selection, model choice and holdout design |
| Production awareness | The handbook distinguishes this historical teaching classifier from a production system |
| Mastery | Learner can answer the implementation questions without reading the code |

## Important modeling boundary

The reference build intentionally uses seven existing Titanic fields. Feature engineering is taught as an **optional learner experiment** (`FamilySize = SibSp + Parch + 1`) rather than falsely claiming it was part of the measured reference model.

## Merge gate

Do not merge until:

1. reproducible CI data fingerprint check passes,
2. training reproduces the recorded model comparison and final metrics,
3. model/data tests and Streamlit tests pass,
4. live Streamlit screenshots are captured,
5. real output charts are copied to the public handbook evidence directory,
6. TypeScript validation passes,
7. production build/prerender passes,
8. desktop and mobile handbook verification passes,
9. PR remains reviewable with no raw CSV, Joblib model, secrets, caches or build output committed.
