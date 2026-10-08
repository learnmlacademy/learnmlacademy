# Project 12 build record

## Scope and provenance

- Isolated branch: feat/model-to-production-engineering.
- Starting main: 90586d12f480f2d52a00b32a61467380d8e3f61a.
- Titanic's paused workspace is untouched. No page, SEO, routing or other project changes.
- Dataset: IBM Telco Customer Churn, public sample in IBM/telco-customer-churn-on-icp4d.
- Pinned revision: d5371f5d83a446ad5673cbcca3b814b926491f8a.
- Source: https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/d5371f5d83a446ad5673cbcca3b814b926491f8a/data/Telco-Customer-Churn.csv
- SHA-256: 16320c9c1ec72448db59aa0a26a0b95401046bef5d02fd3aeb906448e3055e91.
- The IBM repository includes an Apache-2.0 LICENSE and identifies this as a
  code-pattern sample. No separate CSV-specific license statement was found.
  We record that distinction; we do not label the data public domain or CC0.
  Dataset license source: https://github.com/IBM/telco-customer-churn-on-icp4d/blob/d5371f5d83a446ad5673cbcca3b814b926491f8a/LICENSE
  Raw data is not committed. Downloader retrieves the unmodified IBM file.
- Chosen because it has meaningful charges, tenure and service fields and is
  reproducibly accessible without credentials. Original shape: 7,043 × 21.
- Eight predictors: tenure, MonthlyCharges, TotalCharges, Contract,
  PaymentMethod, InternetService, OnlineSecurity, TechSupport.
  Customer identifier, demographics and target never enter the feature pipeline.
- Baseline: Logistic Regression; fixed C=1, max_iter=2000, random seed 42.
  Fixed stratified 80/20 split. A second version will teach rollout, not selection.

## Verification status

Implementation and measured results are recorded at each checkpoint below.
Docker executable was not found in this Windows environment; CI verification
will be used instead. No Docker success is claimed yet.

## Checkpoint A — executed 8 October 2026

- Python 3.13.16, isolated virtual environment, all direct and resolved
  transitive dependencies pinned. pip check: no broken requirements.
- Dataset downloaded from the exact IBM URL and SHA-256 verified: 970,457 bytes.
  Contract checks: 7,043 rows, 21 columns, 11 blank TotalCharges values,
  5,174 stay / 1,869 churn labels.
- Split: 5,634 train / 1,409 holdout, stratified with seed 42.
- v1 actual holdout: accuracy 0.7927608233; precision 0.6289308176;
  recall 0.5347593583; F1 0.5780346821; ROC-AUC 0.8382572528.
  Majority baseline accuracy: 0.7345635202.
  Confusion matrix (rows actual, columns predicted, stay/churn):
  [[917, 118], [174, 200]].
- Created models/v1/model.joblib and metadata.json; reload predictions exactly
  match. Both are generated/ignored, not downloaded from an untrusted source.
- Four training tests passed: dataset, disjoint split, training-only statistics,
  artifact/metadata/reload/determinism and immutable-version behavior.
- Initial pip installation stalled during its final stage; the bounded retry
  with --no-compile completed. No security setting was changed.
- Review found a double-read race in dataset verification; parsing now uses the
  same verified bytes. No inference API or Docker runtime success claimed yet.
