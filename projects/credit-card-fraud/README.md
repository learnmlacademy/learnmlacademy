# Can AI Catch a Stolen Credit Card Transaction?

A reproducible LearnMLAcademy project about **imbalanced binary classification**.

## Practical problem

Fraud is rare. A useless model can call every transaction legitimate and still achieve about 99.8% accuracy on this dataset. The real problem is to catch fraudulent transactions without flooding reviewers or customers with false alarms.

This project teaches class imbalance, precision, recall, F1, ROC-AUC, Average Precision, class weighting, SMOTE inside training folds, ensemble classification, validation-only threshold selection, untouched-test evaluation, model persistence and a Streamlit fraud-review demo.

## Dataset

OpenML dataset **1597 — creditcard**.

OpenML metadata records 284,807 transactions, 492 frauds, Time, Amount, V1–V28, and target Class. V1–V28 are PCA-transformed because original transaction features are confidential. The OpenML licence field is Public.

## Run

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python download_data.py
python src/train_model.py
pytest -q
python -m streamlit run app.py
```

## Leakage rule

The untouched test set is never used for model-family choice or threshold tuning. SMOTE is inside an imbalanced-learn pipeline so synthetic samples are created only inside training folds.

## Research reviewed before implementation

Teaching structure was informed by OpenML dataset metadata, scikit-learn precision-recall documentation, imbalanced-learn documentation, GeeksforGeeks fraud/imbalance tutorials, and Analytics Vidhya material on class imbalance, SMOTE and threshold tuning. The LearnMLAcademy implementation and explanations are independently written.
