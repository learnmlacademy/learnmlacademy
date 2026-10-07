# House Price Predictor — Value & Learning Acceptance Audit

This audit applies the same learning-value bar intended for LearnMLAcademy premium projects, even though House Price Predictor is one of the free flagship projects.

A project is not complete merely because its code runs.

## Acceptance dimensions

| Dimension | Required standard | Current state |
| --- | --- | --- |
| Technical correctness | Real data, sound split/evaluation, reproducible pipeline, tested application | PASS |
| Beginner reproducibility | A learner starting from ordinary laptop skills can create the folders/files, run commands and verify each stage | PASS, pending final post-change CI |
| Implementation understanding | The handbook explains what each important block does, why it exists and how training connects to inference | IMPROVED — architecture and block-by-block walkthrough added |
| Active learning | Learner changes the project, reruns it and observes consequences | IMPROVED — four implementation exercises added |
| Debugging | Common symptoms map to concrete causes and fixes | PASS |
| Evidence | Metrics, outputs and screenshots come from the real executable project | PENDING — expanded screenshot workflow is being re-verified |
| Portfolio readiness | Clean source tree, README, Git/GitHub path, limitations and system explanation | IMPROVED |
| Interview readiness | Learner can explain pipeline, validation, metrics, model choice, inference and limitations | IMPROVED — interview Q&A added |
| Production awareness | Handbook distinguishes educational demo from real operational requirements | IMPROVED |
| Mastery check | Learner can answer implementation questions without merely copying code | IMPROVED — 14-question mastery gate added |

## Gaps found when the stricter rule was first applied

The initial technically-complete version still had these weaknesses:

1. only three visual evidence items were exposed in the handbook,
2. the 380-line training program was shown completely but did not have enough block-by-block explanation,
3. the Streamlit source was shown but its inference flow was not decomposed clearly enough,
4. there were no learner modification exercises,
5. there was no dedicated interview explanation section,
6. production limitations were mentioned only briefly,
7. there was no explicit implementation-mastery gate.

Those gaps are being fixed on the isolated branch before merge.

## Merge gate

PR #24 must remain draft until all of the following are true:

- expanded screenshot capture succeeds,
- every required evidence image loads on desktop and mobile,
- project training/test/app checks pass,
- TypeScript validation passes,
- website production build and prerender pass,
- handbook verification checks the implementation-learning sections,
- no placeholder language remains.

Only then may this audit be changed to **READY TO MERGE**.
