# Titanic handbook: execution record

This is an engineering record, not a claim that an unperformed step succeeded.
Date: 7 October 2026. Platform: Windows x64.

## Repository baseline

Started on local main. Fetched and pulled origin/main, preserving existing work.
Latest remote revision incorporated: a9987db17b71bc513909d555717f48840348a367.
Implementation branch: feat/titanic-hands-on-handbook, based on that remote revision.
Existing public/sitemap.xml line-ending state and untracked dist were preserved.

## Runtime, performed before writing the handbook

Downloaded the official CPython NuGet package python/3.13.16 to a workspace-only
runtime, not a system-wide installation. Its executable reports Python 3.13.16.
The same release has a normal Windows x64 installer for learners:
https://www.python.org/downloads/release/python-31316/ .
The NuGet runtime is a test-environment detail, not the learner installation path.

The sandbox's default temporary directory caused a venv/ensurepip permission error.
Setting TEMP and TMP to a task-owned workspace temp directory allowed venv creation.
This is an automation-environment restriction, not a required learner setup step.

## Dataset access observed

Opened the official Kaggle Titanic Data tab in a real browser, signed out.
It shows Join Competition, the dataset dictionary, and Subject to Competition Rules.
No account sign-in or competition-rule acceptance was performed by automation.
The handbook must describe personal sign-in/rule acceptance honestly; no fabricated
download/installer screenshots are permitted. Training-data acquisition is recorded
below once completed. No raw CSV will be bundled in website downloads.

### Data obtained for execution

The automated environment has no signed-in Kaggle session. Used the public Data
Science Dojo mirror of the standard 891-row, 12-column Titanic training table:
https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv .
Saved locally as data/train.csv. Download SHA-256:
4a437fde05fe5264e1701a7387ac6fb75393772ba38bb2c9c566405af5af4bd7.
Verified row count 891 and exact headers by reading the CSV. This is NOT claimed
to be an authenticated Kaggle download or proof of byte identity with a fresh
Kaggle archive. The primary learner path remains Kaggle; the mirror is disclosed
as this execution's provenance. The raw CSV is ignored by Git and excluded from
both starter and completed ZIPs.

### Notebook construction

Created notebooks/01_titanic_exploration.ipynb with separate cells for loading,
shape/types, missing values, target counts, feature selection, stratified split,
and a training-only class/survival chart. ROOT handles launching from either the
project directory or its notebooks subdirectory. Execution evidence follows.

Executed all notebook cells with Python 3.13.16 through nbconvert. Verified
notebook language_info.version=3.13.16 and all code cells have outputs, no errors.
An initial unactivated `python -m jupyter` command dispatched a pre-existing
system Jupyter installation; reran with the intended Scripts directory first on
PATH and `python -m nbconvert`. The learner path activates .venv explicitly.
Observed (891,12); missing Age=177, Cabin=687, Embarked=2; target counts
0=549, 1=342. Split (712,7)/(179,7), rates .3834/.3855, disjoint indexes=True.
Saved actual training-only chart to outputs/training_class_rates.png.

## Training script, first execution

Created src/train_model.py incrementally: imports, load/check CSV, features/target,
stratified split, numeric and categorical pipelines, ColumnTransformer, five
candidate definitions. Ran from the project root using the isolated Python.
Observed: training rows=712, final test rows=179, prepared training shape=(712,12).
No preprocessing was fitted to the final test data. Next added five-fold
cross-validation using a freshly constructed full pipeline for every candidate.

## Model comparison, tuning, and final evaluation

Ran all five candidates with StratifiedKFold(5, shuffle=True, random_state=42).
Selected the highest mean validation F1, not the highest held-out score.
Random Forest: .746342 F1; SVM: .7447; Logistic Regression: .7301;
KNN: .7194; Decision Tree: .7153. Exact results: outputs/model_comparison.csv.
Removed SVC(probability=True) after the installed version reported its deprecation;
probabilities are not required for this candidate comparison. Reran comparison;
the order and scores stayed the same. The final Random Forest supports predict_proba.

GridSearchCV tried nine Random Forest combinations: max_depth=[5,8,None] and
min_samples_leaf=[1,2,4], keeping 200 trees. refit='f1' selected None/2, the
existing baseline settings. Tuning did NOT improve CV F1; that is a valid result.
The final pipeline was refitted on 712 training rows, then evaluated once on
179 untouched test rows. Accuracy=.8100559, precision=.8181818,
recall=.6521739, F1=.7258065; confusion matrix [[100,10],[24,45]].
The majority-class baseline test accuracy was .6145251.

Saved the complete pipeline to models/titanic_pipeline.joblib and loaded it back.
Confirmed identical predictions for two synthetic profiles. First-class female,
age29, no family, fare80, portS: label1, probability .9937586813. Third-class male,
age35, no family, fare8, portS: label0, probability .1756140596.
These are illustrative model outputs, not claims about actual passengers.
Saved machine-readable results and real Matplotlib charts under outputs/.

## Streamlit construction

Created app.py after the saved pipeline was verified. It accepts the seven raw
fields, can pass unknown age as NaN, loads only the local trusted pipeline, checks
for a missing artifact, and uses pipeline.predict for the class label. It does
not duplicate preprocessing or fit the model in the app. Runtime verification
and screenshots follow after launch.

## Verification boundary on 8 October 2026

Nine model/data tests passed without refitting: schema, split, feature contract,
preprocessing structure, training-only fitted statistics, model comparison,
saved examples, manually recomputed metrics, and missing/unseen input handling.
Three Streamlit AppTest cases exist but are not verified. They stall while
Windows asyncio creates a local socket pair, before the app-test timeout starts.
The bounded diagnostic stack ends in socket._fallback_socketpair -> socket.accept.

JupyterLab logged successful startup on loopback. Streamlit likewise logged
Uvicorn startup and a local URL. However, the browser timed out connecting to
both. A separate minimal Node HTTP listener had the same connectivity failure.
Changing neither app code nor security configuration is justified by that evidence.
No firewall, authentication, sandbox, or network-isolation protection was disabled.

Consequently the app is not claimed to have passed visual testing. The full
handbook replacement, app screenshots, download packaging, website verification,
and publication remain unfinished. Existing TitanicProjectPage.tsx is untouched.
No commit, push, PR or merge has been performed for this implementation branch.
Resume with actual app/browser verification once local loopback access works;
do not recreate or label mock screens as evidence.
