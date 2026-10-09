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


## How the system fits together

Training path:

```text
OpenML Ames Housing
    -> download_data.py
    -> data/ames_housing.parquet
    -> src/train_model.py
    -> feature engineering + preprocessing
    -> 5-fold comparison of 5 model families
    -> training-only tuning
    -> one untouched holdout evaluation
    -> models/house_price_pipeline.joblib
    -> outputs/metrics + chart
```

Prediction path:

```text
Streamlit form
    -> app.py
    -> build_model_row()
    -> saved preprocessing + XGBoost pipeline
    -> estimated historical sale price
```

The app does not retrain the model. It loads the already-fitted pipeline so training and inference use the same learned preprocessing.

## What you should understand after building it

You should be able to explain:

- why the target is sale price and which fields are model inputs
- why missing values, categorical encoding and scaling are handled inside a pipeline
- why the final holdout set is not used for model selection
- how 5-fold cross-validation compares Linear Regression, Ridge, Lasso, Random Forest and XGBoost
- why XGBoost won this verified run
- what MAE, RMSE and R² mean in practical dollar terms
- what Joblib saves and why the app loads the whole pipeline
- how one Streamlit form submission becomes the model row used for prediction
- the limitations of applying historical Ames, Iowa data to current or different housing markets

## Verified reference result

Using the pinned project dependencies, OpenML dataset 43926 and random seed 42, the verified build produced:

| Result | Value |
| --- | ---: |
| Winning model | XGBoost |
| Best tuned CV RMSE | $26,542 |
| Final holdout MAE | $15,670 |
| Final holdout RMSE | $23,792 |
| Final holdout R² | 0.929 |

These numbers are evidence from the executable project. They are not promised performance for other housing data.

## Practice changes

After reproducing the reference build, make at least two modifications rather than stopping at copy-and-run:

1. Remove one feature such as `garage_cars`, retrain and compare CV RMSE.
2. Add `max_depth=4` to the XGBoost tuning grid and compare the selected parameters.
3. Trace one Streamlit prediction through `build_model_row()` into the saved pipeline.
4. Temporarily rename the saved model file, observe the app error, then restore it.

The point is to understand which project decisions affect behavior and how to debug the system.

## Production limitations

This is an educational implementation, not a professional appraisal system. A real deployment would need fresher local data, time/inflation treatment, stricter input validation, monitoring for drift, subgroup/fairness checks, model/version logging, authentication, deployment controls and a human-review process for consequential decisions.

## Interview talking points

Be ready to explain:

- why preprocessing belongs inside the scikit-learn pipeline
- why model selection uses cross-validation instead of the final test set
- why RMSE was the primary comparison metric
- why XGBoost was selected from evidence rather than assumed in advance
- how saving the full pipeline prevents training-serving mismatch
- what the model cannot reliably claim outside historical Ames housing data


## Working prediction smoke test

Run `python -m pytest -q` after training. The Streamlit AppTest now clicks **Estimate sale price**, checks no exception, and asserts a nonempty positive result from the actual saved fitted pipeline. Merely opening a page is not sufficient. Optional extension: on training-only folds compare raw-target regression to `TransformedTargetRegressor(func=np.log1p, inverse_func=np.expm1)` and calculate metrics in dollars, then leave the sealed holdout alone until selection.
