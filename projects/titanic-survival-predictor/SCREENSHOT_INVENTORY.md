# Titanic Survival Predictor — Evidence Inventory

Every visual below must come from the real project or the real source page used by the learner. No AI-generated, hand-drawn or mock application screenshots are accepted.

| File | Handbook checkpoint | What it proves |
| --- | --- | --- |
| `public/projects/titanic-survival/kaggle-data.jpg` | Dataset step | The real Kaggle Titanic data page used to explain where the learner obtains the competition files |
| `public/project-handbooks/titanic/training_class_rates.png` | Training-only EDA | The executable notebook/training evidence shows a real ticket-class pattern without using the final holdout for exploration |
| `public/project-handbooks/titanic/model_comparison.png` | Model comparison | The executable training program compared all five candidate classifiers |
| `public/project-handbooks/titanic/confusion_matrix.png` | Final evaluation | The real 179-row holdout produced the recorded 100/10/24/45 confusion counts |
| `public/project-handbooks/titanic/titanic-app-form.png` | Streamlit app | The real running app renders before prediction |
| `public/project-handbooks/titanic/titanic-prediction-survived.png` | Inference example A | The real app can produce the Survived class from the saved pipeline |
| `public/project-handbooks/titanic/titanic-prediction-not-survived.png` | Inference example B | A contrasting input produces the opposite class through the same saved pipeline |

## Evidence rules

- Generated charts must be recreated by `src/train_model.py`.
- App screenshots must be captured from a live Streamlit server by Playwright.
- The website verifier must load every required image on both desktop and mobile.
- Windows-only installer dialogs are not fabricated in Linux CI; those steps use exact written instructions instead.
- Raw Kaggle CSV files and the generated Joblib model are not committed.
