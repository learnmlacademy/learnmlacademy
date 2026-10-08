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
