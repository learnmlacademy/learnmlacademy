# Project 7 — Can AI Detect a Real Disaster Tweet?

## Practical hook
Someone posts "I am drowning in paperwork." Another posts "Floodwater has entered several homes." Which one describes an emergency? A machine learning classifier can learn language patterns, but it cannot establish whether an event really occurred. Build a reproducible NLP pipeline and inspect its mistakes.

## Tools and official dataset
Python 3.12, VS Code, pandas, scikit-learn, TF-IDF, Naive Bayes, Logistic Regression, Streamlit and pytest. Use Kaggle competition "Natural Language Processing with Disaster Tweets" (https://www.kaggle.com/competitions/nlp-getting-started/data). You must sign in and accept any competition rules to download train.csv. We do not redistribute competition content.

## Exact student steps
1. Install Python and VS Code. Select File → Open Folder → projects/disaster-tweets.
2. Open Terminal → New Terminal. Create an environment with python -m venv .venv.
3. Activate on Windows with .venv\Scripts\activate, or macOS/Linux with source .venv/bin/activate.
4. Install dependencies using python -m pip install -r requirements.txt.
5. Run python -m pytest -q. These tests use an original fictional 40-example fixture for code validation, NOT actual Kaggle accuracy.
6. On the Kaggle competition page accept the rules, download the dataset ZIP, and extract train.csv to data/train.csv in this project folder.
7. Run python train.py. It cleans text, deduplicates, separates train/validation/test, trains TF-IDF models and chooses model and probability threshold on validation F1.
8. Inspect artifacts/metrics.json. Compare confusion matrix, precision and recall against the majority baseline. Test data is never used to select the model.
9. Run python -m streamlit run app.py. Open the displayed localhost address, type a non-sensitive example message and press Classify.
10. Review false positives and false negatives from artifacts/test_predictions.csv. Consider changes without continuously tuning against the held-out test.

## Worked numbers
Suppose TP=8, FP=2, FN=4, TN=6. Precision = 8/(8+2) = 0.8. Recall = 8/(8+4) ≈ 0.667. F1 = 2×0.8×0.667/(0.8+0.667) ≈ 0.727. A model must balance missing real disaster-related posts against incorrectly labeling jokes or metaphors.

## Important safeguards
The model is a text classifier, NOT an emergency system, fact checker or live news verifier. It may misread figurative language, misinformation, dialect or rare words. Keep the negation "not" in cleaning. Exact duplicate texts are removed before splitting to avoid leakage. No saved user tweets are uploaded. Never load untrusted joblib files.

## Study questions
What is a TF-IDF score? Why does a bigram such as "not flooding" contain more context than the word "flood"? What happens to precision and recall as we lower the decision threshold? Which cases need human review? Understand every line of src/detect.py, train.py, app.py and the unit tests.
