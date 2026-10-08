# Customer Churn Prediction Service — engineering project

Python 3.13.16. Work from this directory. No website deployment is part of this
project. Dataset and model binaries are generated locally and ignored by Git.

## Checkpoint A commands (PowerShell)

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m pip check
python -m scripts.prepare_data
python -m src.train --version v1
python -m pytest tests/test_training.py -q
```

If activation is restricted, use `.\.venv\Scripts\python.exe` instead of
`python`; do not change machine-wide execution policy.

The stratified split is 80% training and 20% held-out testing. Missing numeric
values are imputed using training medians; numeric values are standardized and
categories one-hot encoded inside the saved pipeline. Logistic Regression uses
fixed parameters and a 0.5 decision threshold. No holdout-based tuning occurs.
Versions are immutable: do not overwrite a trained version.

This is a public educational sample, not evidence of readiness to make actual
retention decisions. Authentication, TLS, scaling and organizational deployment
controls are outside this small local/CI service.

## Start and call the API

```powershell
python -m uvicorn api.main:app --host 127.0.0.1 --port 8000
```

Keep that terminal open. In a second terminal in this project, activate the
environment and run:

```powershell
curl.exe http://127.0.0.1:8000/health
curl.exe http://127.0.0.1:8000/model-info
curl.exe -X POST http://127.0.0.1:8000/predict -H "Content-Type: application/json" --data-binary "@examples/customer.json"
python -m pytest -q
```

Open http://127.0.0.1:8000/docs for Swagger, or
http://127.0.0.1:8000/openapi.json for the exact request schema.
On Linux/macOS replace `curl.exe` with `curl`.

The API loads the active version once at startup and never calls fit.
Missing/corrupt/incompatible artifacts cause a clear startup failure, not a
silently healthy fallback. Every request field is required; only TotalCharges
may explicitly be null, in which case saved training-time imputation applies.
Unexpected fields, number-like strings, booleans as numbers, negative/out-of-range
numbers, inconsistent service categories and unknown categories are rejected.
Range limits are an educational API contract, not the data's observed maxima.

The returned latency measures dataframe construction, fitted preprocessing,
probability prediction and class selection. It excludes request validation,
network time, startup model loading and response serialization. It is not an
end-to-end latency benchmark. Probabilities are estimates, not guarantees.

## Feature drift and structured logs

```powershell
python -m scripts.prepare_drift --version v1
python -m src.drift --version v1 --batch data/normal_batch.csv
python -m src.drift --version v1 --batch data/shifted_batch.csv
```

The first command saves reference.json beside v1 using only the training split,
then creates two deterministic 1,000-row educational batches. Normal should be
all OK; shifted should flag MonthlyCharges and Contract. It does not retrain.

Numeric mean shift is divided by training standard deviation; 0.5 or more flags
drift. A missing-rate change of 0.10 also flags drift. Category total-variation
distance is half the summed absolute proportion differences; 0.15 or more warns.
These are explicit teaching thresholds, not statistically calibrated alarms.
Mean checks can miss changes that preserve the mean, batches under 50 rows are
rejected, and covariate shift is not evidence of reduced predictive performance.
Investigate data quality and collect fresh labels before deciding to retrain.

The API writes JSON events for startup, inference success/failure and validation
rejections. Logs include model version and measured inference latency, never
request bodies or customer feature values. Validation responses retain useful
field locations/messages without echoing input values.

## Version switching and rollback

```powershell
python -m src.train --version v2 --c 0.5
python -m scripts.prepare_drift --version v2
python -m scripts.verify_versions
python -m scripts.switch_model --version v2
```

Stop the API with Ctrl+C, then rerun its Uvicorn command. /health, /model-info
and /predict now report v2. To roll back:

```powershell
python -m scripts.switch_model --version v1
python -m uvicorn api.main:app --host 127.0.0.1 --port 8000
```

Stop the old process before that final command. Every worker must be restarted;
this example deliberately does not hot-reload or promise zero downtime.
The switch validates the complete target artifact before atomically replacing
config/model.json. A failed switch leaves the old configuration intact.

v2 changes only Logistic Regression's C from 1.0 to 0.5; stronger regularization
provides a genuinely different model. It is not selected by repeatedly testing
the holdout and is not claimed to outperform v1. Both artifacts coexist.
The verification command uses a disposable config and actual FastAPI TestClient
requests to prove v1 → v2 → v1 and identical predictions after rollback.
