# Titanic Survival Predictor

Windows project, tested model environment: Python 3.13.16 (64-bit).
The training notebook and pipeline have been executed. Browser verification of
JupyterLab and Streamlit is still blocked by this task environment's local
loopback connectivity. Do not treat this working branch as the published handbook.

## Files

```text
titanic-survival-predictor/
  data/train.csv                         # download yourself; not redistributed
  notebooks/01_titanic_exploration.ipynb  # executed exploration, with real output
  src/train_model.py                     # repeatable training workflow
  models/titanic_pipeline.joblib         # generated locally, not committed
  outputs/                              # measured results and charts
  tests/test_project.py                  # model checks and Streamlit tests
  app.py                                # prediction form
  requirements.txt                      # exact direct dependencies
  .gitignore
```

## Run locally

1. Install the 64-bit Python 3.13.16 release from
   https://www.python.org/downloads/release/python-31316/ .
2. Open this project folder in VS Code. Choose **Terminal → New Terminal**.
   The terminal must show this folder, not `src` or `notebooks`.
3. Enter these PowerShell commands one line at a time:

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python --version
python -m pip install -r requirements.txt
python -m pip check
```

`python --version` should say `Python 3.13.16`. If activation is blocked,
do not change machine-wide security settings: use the explicit environment
executable instead, for example
`.\.venv\Scripts\python.exe -m pip install -r requirements.txt`.

4. Visit https://www.kaggle.com/competitions/titanic/data . Sign in and review
   the competition rules personally. Download/extract the competition files and
   put `train.csv` in `data`. It has 891 passengers, 12 columns, and a `Survived`
   column. Kaggle's `test.csv` has no survival labels and is not our local test set.
5. From the activated terminal, run:

```powershell
python -m jupyterlab
```

Open `notebooks/01_titanic_exploration.ipynb` in the browser file list. Run cells
in order using **Shift+Enter**. Use **Ctrl+S** to save. To stop the notebook server,
return to its terminal and press **Ctrl+C**, confirming shutdown if asked.

6. Train from the same project root:

```powershell
python src/train_model.py
```

The script compares Logistic Regression, KNN, SVM, Decision Tree and Random
Forest with five-fold stratified cross-validation on 712 training rows. It
selects mean F1, searches a small parameter grid, and only then evaluates on
179 untouched test rows. Imputation, encoding, scaling and the classifier stay
inside the cross-validated pipeline.

The recorded run selected Random Forest with 200 trees, unrestricted depth,
and a minimum of two training examples per leaf. Tuning did not improve on
the baseline settings. Final accuracy 0.8101; precision 0.8182; recall 0.6522;
F1 0.7258. Confusion matrix `[[100,10],[24,45]]`, actual rows and predicted
columns ordered 0 then 1. See `outputs/metrics.json` for exact values.

7. Start the app:

```powershell
python -m streamlit run app.py
```

Open the local URL printed in the terminal. Choose passenger values and click
**Predict survival**. Keep this terminal running while using the app. Press
**Ctrl+C** to stop it. On the next day, reopen this folder and reactivate `.venv`;
you do not need to retrain unless changing the training code/data.

8. Optional automated verification, after training:

```powershell
python -m unittest discover -s tests -v
```

## Dataset provenance and limits

Execution used the public Data Science Dojo mirror of the standard Titanic
training table because the automation did not have an authenticated Kaggle
session: https://github.com/datasciencedojo/datasets/blob/master/titanic.csv .
The precise downloaded-file hash is recorded in `outputs/metrics.json`.
It is not claimed to be an authenticated Kaggle download. No CSV is included
in the repository/download packages.

These are historical associations, not causal explanations or forecasts of a
real person's fate. The app's probability is an uncalibrated model estimate.
The small difference between Random Forest and SVM CV scores does not establish
a universally better algorithm. Family/ticket groups can also make a simple
random passenger split optimistic; this is a first-project baseline.

Only load a joblib file you made or trust: loading one can execute code. Do not
upload raw passenger data, virtual environments, passwords or model files to Git.
