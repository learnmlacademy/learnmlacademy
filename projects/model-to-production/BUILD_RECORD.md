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

## Checkpoint E — implementation, execution pending

- Docker base pinned to official Python 3.13.16 slim-bookworm manifest
  sha256:a1165e272e578941b84abc79e4ab38a0305cd12803a5c4247979ac7655f4d641.
  Public Docker Hub tag metadata verified on 8 October 2026.
- Runtime copies only approved API/loader files, model versions and config.
  Non-root UID 10001, read-only runtime example, loopback-bound host port and
  an application health check. No image registry push or deployment configured.
- CI downloads the pinned public dataset without secrets, trains both versions,
  executes all tests, drift/switch/rollback checks, builds Docker and runs a real
  HTTP smoke test against that container. Artifacts exclude raw data/models.
- Local Docker is unavailable. Build/runtime success will be recorded only after
  the actual GitHub Actions run completes.
- Pre-CI review caught Linux private-directory permissions inherited from atomic
  training publication; Docker copies model folders with runtime-user ownership.
