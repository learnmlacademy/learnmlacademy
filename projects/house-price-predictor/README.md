# What Is This House Really Worth? — House Price Predictor

This is the executable source project used by the LearnMLAcademy House Price Predictor handbook.

It is deliberately written so the website handbook can show the same files learners run on their own laptop.

## What the project builds

A complete regression workflow using the Ames Housing dataset:

- downloads the public dataset from OpenML
- engineers beginner-friendly age and bathroom features
- preprocesses numeric and categorical columns in a leakage-safe pipeline
- compares Linear Regression, Ridge, Lasso, Random Forest and XGBoost
- chooses the model using 5-fold cross-validation on the training data
- tunes the selected model without touching the final holdout set
- evaluates once on the holdout set using MAE, RMSE and R²
- saves and reloads the complete fitted pipeline
- serves predictions through a Streamlit web app

## Folder structure

```text
house-price-predictor/
├── data/
├── models/
├── outputs/
├── src/
│   └── train_model.py
├── tests/
│   └── test_app.py
├── app.py
├── download_data.py
├── requirements.txt
└── PROJECT_STATUS.md
```

Generated files inside `data/`, `models/` and `outputs/` are ignored by Git.

## Run from a fresh computer

### 1. Create a virtual environment

Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Download the dataset

```bash
python download_data.py
```

### 4. Train, compare, tune and save the model

```bash
python src/train_model.py
```

### 5. Run the app

```bash
streamlit run app.py
```

### 6. Run the app smoke test

```bash
pytest -q
```

## Data source

Ames Housing, OpenML dataset 43926:
https://www.openml.org/search?id=43926&sort=runs&type=data

The source data describes historical residential property sales in Ames, Iowa. The app is educational and is not a current real-estate appraisal service.
