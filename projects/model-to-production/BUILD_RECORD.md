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
was used instead. Docker build and real container runtime passed in GitHub Actions.

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

## Checkpoint B — executed

- Startup-only trusted loader checks version/path containment, metadata schema,
  dataset/feature contract, package/Python compatibility and artifact SHA-256
  before deserializing verified bytes. A matching hash is not a signature:
  metadata and joblib must both remain operator-controlled.
- Endpoints: GET /health, GET /model-info, POST /predict; strict Pydantic inputs.
- All 16 API integration tests passed with FastAPI TestClient, including
  range/type/category errors, missing/extra fields, explicit unknown charges,
  real prediction and missing-model startup failure.
- Direct reload/inference on examples/customer.json returned churn probability
  0.6509942843701416, class churn, model v1. Measured one-call latency
  44.5385 ms is only an observed sample, not a performance guarantee.
- perf_counter covers dataframe construction, saved preprocessing,
  predict_proba and threshold selection; excludes HTTP parsing/validation,
  serialization, network and startup loading.
- Pinned Starlette emits a deprecation warning for its supported HTTPX TestClient
  adapter; tests pass. No local listener was needed for these integration tests.

## Checkpoint C — executed

- 44 Pytest cases passed, including bad checksums, unsafe version names,
  invalid metadata rejected before unpickling, failed artifact publication,
  no-fit inference, redacted logs/errors and malformed drift batches.
- Initial bounded noninteractive test process exited without a usable report;
  one retry with visible output and bytecode writes disabled passed in 4.50s.
- Structured JSON logging added without raw records. Validation responses omit
  input values; unexpected inference errors return a generic 500 and safe log.
- Training-only reference statistics saved for 5,634 rows. Normal 1,000-row
  batch: all eight features OK. Shifted MonthlyCharges: 2.5993635 training
  standard deviations of mean shift, DRIFT DETECTED. Contract total variation:
  0.4494143, WARNING. Other features OK.
- Drift thresholds: numeric mean shift >=0.5 training std or missing-rate
  change >=0.10; category total variation >=0.15. These are educational
  heuristics, not hypothesis tests or automated retraining authority.

## Checkpoint D — executed

- v2 trained with C=0.5, identical pinned data/split/features. Actual holdout:
  accuracy 0.7920511001; precision 0.6277602524; recall 0.5320855615;
  F1 0.5759768452; ROC-AUC 0.8379937482; confusion [[917,118],[175,199]].
  This version exists to exercise rollout, not as a claimed accuracy improvement.
- The operator command validates the target, fsyncs a temporary config and
  atomically replaces model.json. Invalid targets leave the original intact.
- Actual API lifespans verified v1 → v2 → v1. Example churn probabilities:
  0.6509942843701416 → 0.6512331113170234 → 0.6509942843701416.
  /health, /model-info and /predict all reported the selected version.
- A live old worker retains v1 until restart; a new lifespan loads v2. Rollback
  restores the exact v1 class/probability. No hot-reload/zero-downtime claim.
- Full suite: 46 passed, one documented HTTPX adapter deprecation warning.
- Both generated model directories and their metadata/reference files coexist
  locally. Main project config remains v1; verification uses disposable configs.

## Checkpoint E — executed in GitHub Actions

- Docker base pinned to official Python 3.13.16 slim-bookworm manifest
  sha256:a1165e272e578941b84abc79e4ab38a0305cd12803a5c4247979ac7655f4d641.
  Public Docker Hub tag metadata verified on 8 October 2026.
- Runtime copies only approved API/loader files, model versions and config.
  Non-root UID 10001, read-only runtime example, loopback-bound host port and
  an application health check. No image registry push or deployment configured.
- CI downloads the pinned public dataset without secrets, trains both versions,
  executes all tests, drift/switch/rollback checks, builds Docker and runs a real
  HTTP smoke test against that container. Artifacts exclude raw data/models.
- Local Docker is unavailable; build/runtime verification ran on Ubuntu 24.04 CI.
- Pre-CI review caught Linux private-directory permissions inherited from atomic
  training publication; Docker copies model folders with runtime-user ownership.
- The same ownership rule covers config/model.json after an atomic operator
  switch. CI switches the actual configuration v2 then v1 before Docker build
  so its private Linux permissions are exercised by the non-root runtime test.

### Executed evidence and final scope review

- Run: https://github.com/learnmlacademy/learnmlacademy/actions/runs/37776365418
  Commit: 873a9486f0a31f6d5495ef75b47b4ae95fed5119. Both jobs passed.
- Engineering: exact dependency installation/pip check, checksum-pinned data,
  both model trainings/reloads, 46/46 Pytest cases, drift checks, real API
  version switching/rollback and final contract checks all passed.
- Docker image actually built; container actually ran as UID 10001 with a
  read-only filesystem. Real TCP HTTP verified health, model-info, prediction,
  invalid-request 422, Swagger and OpenAPI. Docker's health check was healthy.
- Both versions' holdout metrics exactly match the Windows results above.
  Linux example probabilities were 0.6509942843701407 / 0.6512331113170211;
  tiny cross-platform floating-point differences are expected. Rollback was
  exactly equal within each environment.
- Repository checks: npm run lint (tsc --noEmit) and Vite build passed.
  Existing website dependencies reported 15 npm vulnerabilities (3 low,
  3 moderate, 8 high, 1 critical); existing large-chunk warnings remain.
  No website dependency or unrelated source change was made in this project.
- Uploaded run artifact contains JUnit, metrics, drift/version evidence and
  container logs; no raw data, model binaries, credentials or caches.
- Source review against starting main 90586d12f480f2d52a00b32a61467380d8e3f61a:
  changes are confined to projects/model-to-production and its one workflow.
  Reviewed leakage separation, strict API validation, startup-only loading,
  no-fit inference, redacted logging, immutable artifacts and atomic switching.
  No lesson, page, other project, SEO or deployment files were changed.
- Limitations: local Docker unavailable; HTTPX adapter deprecation warning;
  dataset-specific licensing caveat noted above; educational drift thresholds;
  no authentication/TLS/rate limiting/business validation for public production.
  No merge, registry publication or deployment was performed.
