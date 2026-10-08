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
