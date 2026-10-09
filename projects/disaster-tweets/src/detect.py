"""Disaster tweet classification with deduplication, validation selection, holdout test.

Kaggle competition data must be downloaded by the learner, respecting its rules.
"""
from pathlib import Path
import json
import re

import joblib
import numpy as np
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

ROOT = Path(__file__).resolve().parents[1]
SEED = 42

def clean_text(text):
    if not isinstance(text, str) or len(text) > 2000:
        raise ValueError("Expected text of at most 2000 characters")
    text = re.sub(r"https?://\S+|www\.\S+", " ", text, flags=re.I)
    text = re.sub(r"(?<!\w)@\w+", " ", text)
    return re.sub(r"\s+", " ", text.replace("#", " ").lower()).strip()

def validate_data(df):
    if not {"text", "target"}.issubset(df.columns):
        raise ValueError("Missing Kaggle train.csv text or target column")
    rows = df[["text", "target"]].copy()
    if rows.isna().any().any() or not rows.target.isin([0, 1]).all():
        raise ValueError("Missing/invalid text or labels (must be 0 or 1)")
    rows["text"] = rows.text.map(clean_text)
    rows = rows.loc[rows.text.str.len() > 0].copy()
    conflicting = rows.groupby("text").target.nunique()
    rows = rows.loc[~rows.text.isin(conflicting[conflicting > 1].index)]
    rows = rows.drop_duplicates(subset=["text"]).reset_index(drop=True)
    if len(rows) < 35 or rows.target.value_counts().min() < 15:
        raise ValueError("At least 35 unique samples with 15 per class required")
    return rows

def split_rows(rows):
    trainval, test = train_test_split(rows, test_size=.15, random_state=SEED, stratify=rows.target)
    train, val = train_test_split(trainval, test_size=.17647058823529413, random_state=SEED,
                                  stratify=trainval.target)
    assert not (set(train.text) & set(val.text) or set(val.text) & set(test.text)
                or set(train.text) & set(test.text))
    return train, val, test

def candidates():
    vec = dict(lowercase=False, ngram_range=(1, 2), min_df=1, max_df=1.0,
               strip_accents="unicode", sublinear_tf=True)
    return {
        "LogisticRegression": Pipeline([
            ("tfidf", TfidfVectorizer(**vec)),
            ("model", LogisticRegression(max_iter=1000, class_weight="balanced", random_state=SEED))
        ]),
        "MultinomialNB": Pipeline([
            ("tfidf", TfidfVectorizer(**vec)),
            ("model", MultinomialNB(alpha=1.0))
        ]),
    }

def metrics(truth, probability, threshold=.5):
    if not 0 <= threshold <= 1:
        raise ValueError("Threshold must lie within [0,1]")
    predicted = np.asarray(probability) >= threshold
    return {
        "accuracy": float(accuracy_score(truth, predicted)),
        "precision": float(precision_score(truth, predicted, zero_division=0)),
        "recall": float(recall_score(truth, predicted, zero_division=0)),
        "f1": float(f1_score(truth, predicted, zero_division=0)),
        "matrix": confusion_matrix(truth, predicted, labels=[0, 1]).tolist(),
    }

def train_and_evaluate(df, dest):
    rows = validate_data(df)
    train, val, test = split_rows(rows)
    candidates_eval = []
    for name, candidate in candidates().items():
        candidate.fit(train.text, train.target)
        prob = candidate.predict_proba(val.text)[:, 1]
        for threshold in (.3, .4, .5, .6, .7):
            candidates_eval.append({"name": name, "threshold": threshold,
                                    **metrics(val.target, prob, threshold)})
    winner = max(candidates_eval,
                 key=lambda r: (r["f1"], r["recall"], -abs(r["threshold"] - .5)))
    trainval = pd.concat([train, val])
    fitted = candidates()[winner["name"]].fit(trainval.text, trainval.target)
    test_prob = fitted.predict_proba(test.text)[:, 1]
    baseline = DummyClassifier(strategy="most_frequent").fit(
        np.arange(len(trainval)).reshape(-1, 1), trainval.target)
    baseline_prob = baseline.predict(np.arange(len(test)).reshape(-1, 1))
    report = {
        "dataset": "Official Kaggle Disaster Tweets (competition rules apply)",
        "split": {"train": len(train), "validation": len(val), "test": len(test)},
        "cleaned_n": len(rows),
        "chosen_from_validation": {"model": winner["name"], "threshold": winner["threshold"],
                                   "f1": winner["f1"], "recall": winner["recall"]},
        "test": metrics(test.target, test_prob, winner["threshold"]),
        "test_majority_baseline": metrics(test.target, baseline_prob),
        "safety": "Language classification does not verify real disaster occurrence.",
    }
    dest = Path(dest)
    dest.mkdir(parents=True, exist_ok=True)
    joblib.dump({"pipeline": fitted, "threshold": winner["threshold"]}, dest / "model.joblib")
    (dest / "metrics.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    pd.DataFrame({"text": test.text, "actual": test.target, "probability": test_prob}).to_csv(
        dest / "test_predictions.csv", index=False)
    return report

def classify(bundle, text):
    cleaned = clean_text(text)
    if not cleaned:
        raise ValueError("Enter a nonempty message")
    prob = float(bundle["pipeline"].predict_proba([cleaned])[0, 1])
    return {"probability": prob, "predicted": int(prob >= bundle["threshold"])}
