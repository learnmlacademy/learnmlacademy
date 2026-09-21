import React from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { ProjectVisualFigure, projectVisualsByTopic } from "../../components/diagrams/ProjectDiagrams";
import { Callout } from "../../components/content/Callout";
import { CodeBlock as SharedCodeBlock, type CodeBlockType } from "../../components/content/CodeBlock";
import { DataTable } from "../../components/content/DataTable";
import { SummaryCard } from "../../components/lesson/SummaryCard";

type CodeKind = "RUNNABLE CODE" | "CONCEPTUAL PSEUDOCODE" | "PROVIDER-DEPENDENT CODE" | "OPTIONAL PRODUCTION EXTENSION";
type Row = string[];

type ProjectLesson = {
  goal: string;
  build: string[];
  prerequisites: Array<[string, string]>;
  inputsIntro: string;
  inputHeaders: string[];
  inputRows: Row[];
  architecture: string[];
  environment: string[];
  understanding: string[];
  baseline: string[];
  worked: { title: string; given: string; steps: string[]; result: string };
  implementation: Array<{ title: string; explanation: string; code?: string; kind?: CodeKind; output?: string }>;
  resultHeaders: string[];
  resultRows: Row[];
  resultNote: string;
  evaluation: string[];
  failureRows: Row[];
  improvements: string[];
  productionRows: Row[];
  summary: string[];
};

const churnSample = `import pandas as pd

# Each row is one customer at the prediction date.
df = pd.DataFrame([
  [2, 89, "Month-to-month", "No", 1],
  [48, 55, "Two year", "Yes", 0],
  [7, 76, "Month-to-month", "No", 1],
  [36, 62, "One year", "Yes", 0],
  [1, None, "Month-to-month", "No", 1],
  [60, 45, "Two year", "Yes", 0],
  [14, 71, "One year", "No", 0],
  [5, 95, "Month-to-month", "No", 1],
], columns=["tenure_months", "monthly_charge", "contract", "tech_support", "churn"])

X = df.drop(columns="churn")
y = df["churn"]  # 1 = left within the prediction window; 0 = stayed`;

const churnPipeline = `from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric = ["tenure_months", "monthly_charge"]
categorical = ["contract", "tech_support"]
preprocess = ColumnTransformer([
  ("num", Pipeline([("impute", SimpleImputer(strategy="median")),
                     ("scale", StandardScaler())]), numeric),
  ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
])
model = Pipeline([("prepare", preprocess),
                  ("classifier", LogisticRegression(class_weight="balanced"))])
model.fit(X_train, y_train)
probability = model.predict_proba(X_test)[:, 1]
prediction = (probability >= 0.40).astype(int)`;

const creditSample = `import pandas as pd
from sklearn.model_selection import train_test_split

# Compact German-Credit-style teaching sample; 1 means default within 12 months.
applications = pd.DataFrame([
  [3200, 0.42, 2, 1, "rent", "car", 0],
  [2100, 0.71, 1, 3, "rent", "business", 1],
  [5400, 0.28, 8, 0, "own", "home", 0],
  [1800, 0.83, 1, 4, "rent", "car", 1],
  [4600, 0.35, 6, 0, "own", "education", 0],
  [2500, 0.64, 2, 2, "other", "business", 1],
  [6100, 0.22, 10, 0, "own", "home", 0],
  [2900, 0.58, 3, 1, "rent", "education", 0],
], columns=["income", "debt_ratio", "employment_years", "late_payments",
            "housing", "loan_purpose", "default_12m"])

X = applications.drop(columns="default_12m")
y = applications["default_12m"]
X_development, X_test, y_development, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42
)
X_train, X_valid, y_train, y_valid = train_test_split(
    X_development, y_development, test_size=1/3,
    stratify=y_development, random_state=42
)`;

const creditPipeline = `from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric = ["income", "debt_ratio", "employment_years", "late_payments"]
categorical = ["housing", "loan_purpose"]
prepare = ColumnTransformer([
    ("num", StandardScaler(), numeric),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
])
risk_model = Pipeline([
    ("prepare", prepare),
    ("model", LogisticRegression(class_weight="balanced", random_state=42)),
])
risk_model.fit(X_train, y_train)
valid_probability = risk_model.predict_proba(X_valid)[:, 1]
# After threshold/model choices are frozen, evaluate once on X_test.
test_probability = risk_model.predict_proba(X_test)[:, 1]`;

const salesCode = `import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
months = pd.date_range("2023-01-01", periods=36, freq="MS")
trend = np.arange(36) * 1.5
season = 12 * np.sin(2 * np.pi * np.arange(36) / 12)
sales = 120 + trend + season + rng.normal(0, 3, 36)
series = pd.Series(sales, index=months, name="sales")

train = series.iloc[:24]
validation = series.iloc[24:30]
test = series.iloc[30:]

# Naive forecast: the last observed training value for every validation month.
naive_validation = np.repeat(train.iloc[-1], len(validation))`;

const salesModelCode = `from statsmodels.tsa.holtwinters import ExponentialSmoothing
from sklearn.metrics import mean_absolute_error, mean_squared_error

# 12 means one yearly season contains 12 monthly observations.
model = ExponentialSmoothing(train, trend="add", seasonal="add", seasonal_periods=12)
fit = model.fit(optimized=True)
forecast = fit.forecast(len(validation))

mae = mean_absolute_error(validation, forecast)
rmse = mean_squared_error(validation, forecast) ** 0.5
print(f"validation MAE={mae:.2f}, RMSE={rmse:.2f}")`;

const imageCode = `import torch
from torch import nn
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, models, transforms

train_tfms = transforms.Compose([
    transforms.RandomCrop(32, padding=4),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize((0.491, 0.482, 0.447), (0.247, 0.243, 0.262)),
])
eval_tfms = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.491, 0.482, 0.447), (0.247, 0.243, 0.262)),
])
augmented = datasets.CIFAR10("data", train=True, download=True, transform=train_tfms)
evaluation_copy = datasets.CIFAR10("data", train=True, download=False, transform=eval_tfms)
test_set = datasets.CIFAR10("data", train=False, download=True, transform=eval_tfms)

generator = torch.Generator().manual_seed(42)
indices = torch.randperm(len(augmented), generator=generator).tolist()
train_set = Subset(augmented, indices[:45_000])
validation_set = Subset(evaluation_copy, indices[45_000:])
train_loader = DataLoader(train_set, batch_size=32, shuffle=True)
validation_loader = DataLoader(validation_set, batch_size=64)
test_loader = DataLoader(test_set, batch_size=64)`;

const imageModelCode = `model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
for parameter in model.parameters():
    parameter.requires_grad = False

# ResNet-18 supplies 512 input features; CIFAR-10 has 10 classes.
model.fc = nn.Linear(512, 10)
optimizer = torch.optim.AdamW(model.fc.parameters(), lr=1e-3)

for images, labels in train_loader:
    optimizer.zero_grad()
    logits = model(images)
    loss = nn.functional.cross_entropy(logits, labels)
    loss.backward()
    optimizer.step()`;

const genaiCode = `import json
from dataclasses import dataclass

@dataclass
class Draft:
    title: str
    summary: str
    risk: str

def build_prompt(user_change: str) -> str:
    if not isinstance(user_change, str) or not 1 <= len(user_change) <= 500:
        raise ValueError("change description must contain 1–500 characters")
    return ("Create a release-note JSON object with string fields title, summary, "
            "and risk. risk must be low, medium, or high. Change: " + user_change)

def mock_provider(prompt: str) -> str:
    """Free deterministic stand-in for a paid model provider."""
    return json.dumps({"title": "Release note", "summary": prompt[:60], "risk": "low"})

def validate(raw: str) -> Draft:
    value = json.loads(raw)
    required = {"title": str, "summary": str, "risk": str}
    for field, expected_type in required.items():
        if field not in value or not isinstance(value[field], expected_type):
            raise ValueError(f"invalid field: {field}")
    if value["risk"] not in {"low", "medium", "high"}:
        raise ValueError("risk must be low, medium, or high")
    return Draft(**value)

draft = validate(mock_provider(build_prompt("Add CSV export")))
print(draft)`;

const genaiProvider = `# PROVIDER-DEPENDENT CODE: the adapter is the only layer that changes.
import os

def call_provider(prompt: str) -> str:
    api_key = os.environ["GENAI_API_KEY"]  # never commit this value
    response = provider_client.generate(prompt=prompt, api_key=api_key, timeout=15)
    return response.text`;

const ragCode = `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

documents = {
  "returns.txt": "Returns are accepted within 30 days with the receipt.",
  "shipping.txt": "Standard shipping takes three to five business days.",
  "warranty.txt": "The device warranty covers manufacturing defects for one year.",
}

def chunk_text(source: str, text: str, chunk_size: int = 12, overlap: int = 3):
    words, chunks = text.split(), []
    step = chunk_size - overlap
    for start in range(0, len(words), step):
        part = words[start:start + chunk_size]
        if part:
            chunks.append({"source": source, "start_word": start, "text": " ".join(part)})
    return chunks

chunks = [chunk for name, text in documents.items() for chunk in chunk_text(name, text)]
vectorizer = TfidfVectorizer()
chunk_vectors = vectorizer.fit_transform([c["text"] for c in chunks])

def retrieve(question: str, top_k: int = 2):
    query_vector = vectorizer.transform([question])
    scores = (chunk_vectors @ query_vector.T).toarray().ravel()
    order = np.argsort(scores)[::-1][:top_k]
    return [{**chunks[i], "score": float(scores[i])} for i in order]`;

const ragAnswerCode = `def answer(question: str):
    hits = [hit for hit in retrieve(question, top_k=2) if hit["score"] >= 0.10]
    if not hits:
        return {"answer": "I do not have enough evidence.", "sources": []}
    context = "\n".join(f"[{h['source']}] {h['text']}" for h in hits)
    # A real generator receives this bounded context and must cite its labels.
    return {"prompt": f"Use only this evidence:\n{context}\nQuestion: {question}",
            "sources": [h["source"] for h in hits]}`;

const agentCode = `ORDERS = {1042: {"status": "shipped", "eta": "Friday"}}
MEMORY = {"customer_7": {"tone": "concise"}}  # approved durable preference
MAX_STEPS = 5

def get_order(order_id: int):
    if not isinstance(order_id, int):
        raise ValueError("order_id must be an integer")
    return ORDERS.get(order_id)

def run_support_agent(goal: str, order_id: int | None):
    state = {"goal": goal, "step": 0, "observations": [], "trace": []}
    for step in range(1, MAX_STEPS + 1):
        state["step"] = step
        if order_id is None:
            state["trace"].append("abstain: missing order id")
            return {"status": "needs_input", **state}
        state["trace"].append(f"tool get_order({order_id})")
        order = get_order(order_id)
        if not order:
            state["trace"].append("abstain: order not found")
            return {"status": "not_found", **state}
        state["observations"].append(order)
        state["trace"].append("answer from verified observation")
        return {"status": "success", "answer": order, **state}
    return {"status": "budget_exhausted", **state}`;

const multiAgentCode = `SOURCES = {
  "market.txt": "Pilot users completed the task 18% faster.",
  "risk.txt": "The sample contained 40 users and one industry.",
}

def researcher(task, source_name):
    return {"task": task, "source": source_name, "evidence": SOURCES[source_name]}

def verifier(findings):
    accepted = [f for f in findings if f["source"] in SOURCES and f["evidence"]]
    conflicts = []
    return {"accepted": accepted, "conflicts": conflicts}

def synthesizer(verified):
    return " ".join(f"{f['evidence']} [{f['source']}]" for f in verified["accepted"])

tasks = [("measure benefit", "market.txt"), ("identify limitation", "risk.txt")]
findings = [researcher(*task) for task in tasks]
report = synthesizer(verifier(findings))
print(report)`;

const lessons: Record<string, ProjectLesson> = {
  "project-customer-churn": {
    goal: "Build a reproducible classifier that estimates whether a subscription customer will leave during a defined future window, then turn probabilities into a retention decision whose business costs are explicit. Churn is the target event; it does not mean an unhappy customer unless the label definition says so.",
    build: ["A leakage-safe preprocessing and modeling pipeline", "A Logistic Regression baseline and tree-based comparison", "Threshold-aware evaluation with a confusion matrix, precision, recall, F1 and ROC-AUC", "A short model card covering feature influence, failure groups and monitoring"],
    prerequisites: [["Handling missing data", "/learn/handling-missing-data"], ["Encoding categorical data", "/learn/encoding-categorical"], ["Logistic Regression", "/learn/logistic-regression"], ["Confusion matrix", "/learn/confusion-matrix"], ["ROC-AUC", "/learn/roc-auc"]],
    inputsIntro: "Use one row per customer at a fixed snapshot date. The label must look forward—for example, churned within the next 30 days—while every feature must be known at the snapshot. The inline Telco-style sample keeps the mechanics reproducible; a larger CSV should keep the same schema.",
    inputHeaders: ["Field", "Example", "Meaning / origin"],
    inputRows: [["tenure_months", "7", "Completed months since signup; numeric feature"], ["monthly_charge", "76", "Current monthly bill; missing values are imputed from training data"], ["contract", "Month-to-month", "Plan category; one-hot encoded"], ["tech_support", "No", "Whether support is included"], ["churn", "1", "Target: left in the next 30 days; 0 means stayed"]],
    architecture: ["Split customers before learning any preprocessing values.", "Fit imputers, encoders, optional scaling and the classifier only on training rows.", "Return probabilities so the decision threshold can reflect retention capacity and error cost.", "Evaluate once on untouched test customers and save the complete pipeline."],
    environment: ["Python 3.10+", "pandas and NumPy", "scikit-learn", "matplotlib or seaborn for optional plots"],
    understanding: ["Check label rate, missingness, category values and duplicated customer IDs before modeling. A customer must appear in only one split.", "Scaling is useful for Logistic Regression because coefficients are optimized across numeric features with different units. Trees split on ordered values and usually do not require scaling. One pipeline can scale numeric features for the linear baseline while the tree comparison uses an appropriate preprocessing branch."],
    baseline: ["Begin with a majority-class rule and Logistic Regression. The majority rule reveals how misleading accuracy can be; Logistic Regression supplies probabilities and directional coefficients. Compare with a Random Forest only after the baseline is stable.", "Choose a threshold on validation data, not the test set. A lower threshold flags more customers: recall usually rises, while precision and contact cost may fall."],
    worked: { title: "Calculate classification metrics at threshold 0.50", given: "Nine held-out customers produce TN = 4, FP = 1, FN = 1 and TP = 3. These counts come directly from comparing each predicted class with the true churn label.", steps: ["Precision = TP / (TP + FP) = 3 / (3 + 1) = 0.75.", "Recall = TP / (TP + FN) = 3 / (3 + 1) = 0.75.", "F1 = 2 × precision × recall / (precision + recall) = 2 × 0.75 × 0.75 / 1.50 = 0.75.", "Accuracy = (TP + TN) / 9 = (3 + 4) / 9 = 0.78."], result: "The model finds three quarters of churners and three quarters of contacted customers truly churn. Accuracy alone hides the missed churner and unnecessary retention contact." },
    implementation: [{title:"Create and inspect the reproducible fallback", explanation:"The eight rows are deliberately tiny: they let a learner trace every value, but they are not enough for a trustworthy business model.", code:churnSample, kind:"RUNNABLE CODE", output:"Expected inspection: 8 rows, 4 churn labels, and one missing monthly_charge."}, {title:"Split before preprocessing", explanation:"For a real dataset, stratification preserves the churn proportion. The fixed random state makes the teaching split reproducible.", code:`from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=42\n)`, kind:"RUNNABLE CODE"}, {title:"Fit the complete baseline pipeline", explanation:"The median, scaling statistics, category vocabulary and model coefficients are all learned by model.fit from X_train and y_train.", code:churnPipeline, kind:"RUNNABLE CODE"}, {title:"Compare a tree without changing the test set", explanation:"Use validation or cross-validation to compare candidates; keep the final test set for one unbiased estimate.", code:`from sklearn.ensemble import RandomForestClassifier\nforest = Pipeline([(\"prepare\", preprocess), (\"classifier\", RandomForestClassifier(\n    n_estimators=200, class_weight=\"balanced\", random_state=42\n))])`, kind:"RUNNABLE CODE"}],
    resultHeaders: ["Model / rule", "Recall", "Precision", "ROC-AUC", "Interpretation"],
    resultRows: [["Predict everyone stays", "0.00", "undefined", "0.50", "Accuracy may look high but no churner is found"], ["Logistic Regression", "0.75", "0.75", "0.82", "Transparent probability baseline"], ["Random Forest", "0.79", "0.70", "0.85", "Finds more churners but contacts more non-churners"]],
    resultNote: "These are labelled illustrative results for a larger fixed Telco-style split, not outputs from the eight-row teaching table. Reproduce them only with the corresponding dataset and split; your values will differ with different rows.",
    evaluation: ["ROC-AUC measures ranking across thresholds; it does not choose the operational threshold. Inspect precision, recall and F1 at candidate thresholds and translate FP/FN counts into money or capacity.", "A false negative misses a customer who leaves. A false positive spends retention effort on someone who would stay. Segment results by tenure, contract and acquisition channel to find concentrated failure."],
    failureRows: [["Leakage", "A cancellation-date feature appears before the prediction date", "Rebuild features from snapshot-time data"], ["Low churn recall", "Threshold too high or minority pattern underlearned", "Tune on validation; use class weights and better signals"], ["Many false positives", "Threshold too low", "Raise threshold or limit offers by expected value"], ["Coefficient misread", "Association treated as cause", "Describe influence, validate with domain evidence"]],
    improvements: ["Add service-quality and recent-usage trends available before the snapshot.", "Calibrate probabilities so 0.40 corresponds more closely to observed churn frequency.", "Compare expected retention value, not only metric differences.", "Audit performance and offer impact across meaningful customer groups."],
    productionRows: [["Saved artifact", "Preprocessor + model + threshold + feature schema"], ["Online check", "Reject missing/unknown required fields; log version"], ["Monitoring", "Input drift, probability drift, recall when labels arrive, offer uptake"], ["Retraining", "Time-based schedule or performance trigger; revalidate threshold"]],
    summary: ["Churn must be defined as a future target relative to a clear customer snapshot.", "Splitting before preprocessing prevents test information from influencing imputation, encoding and scaling.", "A majority rule and Logistic Regression establish honest baselines before a tree comparison.", "Precision, recall and F1 describe different consequences hidden by accuracy.", "ROC-AUC evaluates ranking, while a validation-chosen threshold controls the actual retention action.", "Feature influence explains the fitted model but does not prove that a feature causes churn.", "A production churn system saves its schema, preprocessing, model and threshold and monitors both drift and business outcomes."],
  },
  "project-credit-risk": {
    goal: "Build an explainable probability-of-default model for learning purposes, then place it inside a responsible decision workflow. The target is whether an account defaulted within a stated horizon—not whether a person is 'good' or 'bad'. This toy project must never be used to make real lending decisions.",
    build: ["A reproducible German-Credit-style tabular example", "A majority baseline, Logistic Regression and tree/boosting comparison", "Threshold and error-cost analysis focused on the minority default class", "An individual explanation plus fairness and responsible-use checks"],
    prerequisites: [["Classification overview", "/learn/classification-intro"], ["Logistic Regression", "/learn/logistic-regression"], ["Decision Trees", "/learn/decision-trees"], ["Confusion matrix", "/learn/confusion-matrix"]],
    inputsIntro: "Each row represents an application at decision time. Features may include income, debt ratio, employment length, housing and loan purpose. The label default_12m = 1 means default occurred within 12 months. Never include later collections events or outcome-derived fields.",
    inputHeaders: ["Field", "Type", "Responsible interpretation"],
    inputRows: [["income", "numeric", "Verified income available at application time"], ["debt_ratio", "numeric", "Monthly debt obligations divided by income"], ["late_payments", "count", "Past recorded late payments; may encode historical inequity"], ["housing", "category", "Rent / own / other; review proxy risk"], ["default_12m", "binary target", "Observed outcome within a fixed 12-month horizon"]],
    architecture: ["Validate application-time fields and document provenance.", "Split with stratification, then fit preprocessing and candidate models on training data only.", "Calibrate and explain the score; test group-level error rates and data limitations.", "Let policy and qualified human review—not the toy model—own consequential decisions."],
    environment: ["Python 3.10+", "pandas and scikit-learn", "Optional matplotlib for precision-recall curves", "A documented data dictionary and review policy"],
    understanding: ["Defaults are often less common than repayments, so a high-accuracy model can still miss nearly every costly event. Report label counts before fitting.", "Historical outcomes reflect earlier policies, access and social conditions. Removing a protected field does not guarantee fairness because other variables can act as proxies."],
    baseline: ["First predict the majority class, then fit Logistic Regression with class weights. Its standardized coefficients make directional influence inspectable. Compare a shallow decision tree or gradient boosting model only if it improves validated recall/precision without unacceptable instability.", "Use a precision-recall curve when the positive class is rare. Each threshold produces a different pair: how many flagged applications truly default, and how many defaults are found."],
    worked: { title: "Compare error cost at one threshold", given: "On a validation set, the threshold produces 2 false negatives and 12 false positives. The teaching policy assigns $20,000 expected loss to a missed default and $200 review cost to an unnecessary flag.", steps: ["Missed-default cost = 2 × $20,000 = $40,000.", "Unnecessary-review cost = 12 × $200 = $2,400.", "Total modeled error cost = $40,000 + $2,400 = $42,400.", "Repeat this calculation for candidate thresholds using costs agreed with domain experts."], result: "The threshold with the highest accuracy may not have the lowest business or social cost. Cost assumptions must be documented and stress-tested." },
    implementation: [{title:"Create and split the compact teaching sample", explanation:"Every row is visible and reproducible. The sample is only for tracing the workflow, never for a real lending model.", code:creditSample, kind:"RUNNABLE CODE", output:"Expected split: 4 training, 2 validation and 2 test applications."}, {title:"Prepare a leakage-safe model", explanation:"The pipeline learns numeric scaling and category columns only from the training applications.", code:creditPipeline, kind:"RUNNABLE CODE"}, {title:"Inspect threshold trade-offs", explanation:"precision_recall_curve returns one precision and recall pair per score threshold. Choose on validation data.", code:`from sklearn.metrics import precision_recall_curve\nprecision, recall, thresholds = precision_recall_curve(y_valid, valid_probability)\nfor p, r, t in zip(precision[:-1], recall[:-1], thresholds):\n    if r >= 0.80:\n        print(f\"threshold={t:.2f}, precision={p:.2f}, recall={r:.2f}\")`, kind:"RUNNABLE CODE"}, {title:"Explain one recommendation carefully", explanation:"For a linear model, coefficient × standardized feature value is a local log-odds contribution. Show direction and uncertainty; do not present it as causation.", code:`row = prepare.transform(one_application)\ncontributions = row.toarray()[0] * risk_model.named_steps[\"model\"].coef_[0]\n# Pair contributions with transformed feature names and sort by absolute size.`, kind:"CONCEPTUAL PSEUDOCODE"}],
    resultHeaders: ["Approach", "Default recall", "Precision", "PR-AUC", "Use"],
    resultRows: [["All repay", "0.00", "—", "0.10", "Sanity baseline for 10% default rate"], ["Logistic Regression", "0.78", "0.42", "0.48", "Explainable baseline"], ["Gradient boosting", "0.81", "0.46", "0.53", "Candidate only after calibration and fairness review"]],
    resultNote: "Illustrative validation results show how to compare models; they are not evidence that either model is suitable for lending. Real use requires lawful governance, representative data and qualified review.",
    evaluation: ["Report the confusion matrix, default precision/recall, PR-AUC, calibration and uncertainty. ROC-AUC can supplement these measures but may look optimistic under heavy imbalance.", "Compare false-negative and false-positive rates across legally and ethically relevant groups with adequate sample sizes. A metric gap is a signal for investigation, not a complete fairness judgment."],
    failureRows: [["High accuracy, zero recall", "Majority-class shortcut", "Use class-aware metrics and threshold review"], ["Score shifts after launch", "Population or policy drift", "Monitor calibration and input distributions"], ["Explanation sounds causal", "Contribution wording is too strong", "Use 'raised/lowered this model score'"], ["Group harm", "Historical/proxy bias", "Pause, investigate data/policy and involve responsible reviewers"]],
    improvements: ["Calibrate probabilities on a later validation period.", "Compare cost curves across plausible, not single-point, cost assumptions.", "Use monotonic constraints or simpler features when interpretability requirements justify them.", "Document appeal, correction and human-review paths before any real deployment."],
    productionRows: [["Governance", "Purpose limitation, legal review, model/data cards, owner"], ["Decision boundary", "Model recommends; policy and authorized people decide"], ["Monitoring", "Calibration, group errors, drift, overrides and complaints"], ["Rollback", "Versioned model/threshold with immediate disable path"]],
    summary: ["Credit risk is a future default probability tied to a precise outcome horizon, not a judgment of personal worth.", "Class imbalance makes majority accuracy an especially dangerous success signal.", "Logistic Regression is a useful explainable baseline before more complex tree or boosting comparisons.", "Precision-recall analysis and explicit error costs connect threshold choice to consequences.", "An individual explanation describes contributions to this model score, not causal reasons for default.", "Historical credit data can encode exclusion and proxy effects, so fairness requires data, metric and process review.", "A toy model must remain educational; real lending needs lawful governance, qualified human judgment, monitoring and appeal mechanisms."],
  },
  "project-sales-forecasting": {
    goal: "Forecast monthly retail sales six months ahead so inventory planners can compare a simple baseline with a seasonal model, understand every evaluation value and monitor when the time series changes.",
    build: ["A deterministic 36-month retail series with trend, seasonality and small noise", "Chronological train, validation and test windows", "Naive and moving-average/statistical baselines plus Holt-Winters", "Actual-versus-forecast and residual diagnostics with MAE and RMSE"],
    prerequisites: [["Forecasting basics", "/learn/forecasting-basics"], ["Moving averages", "/learn/moving-average"], ["Exponential smoothing", "/learn/exponential-smoothing"], ["ARIMA", "/learn/arima"]],
    inputsIntro: "The example generates one sales total for the first day of each month. In a real file, each row needs a timestamp, the amount being forecast and only covariates that would be known before the forecast is issued.",
    inputHeaders: ["Element", "Value", "Why it matters"],
    inputRows: [["Frequency", "monthly", "All observations share one regular interval"], ["History", "36 months", "Two years train, six months validate, six months test"], ["Forecast horizon", "6 months", "How far future decisions must extend"], ["Season length", "12", "One yearly cycle contains 12 monthly observations"], ["Random seed", "42", "Makes the synthetic noise reproducible"]],
    architecture: ["Order observations by timestamp and resolve missing periods.", "Reserve the newest horizon as test and the preceding horizon as validation.", "Fit baselines and stronger candidates without using future observations.", "Refit the selected approach through validation, forecast test, diagnose residuals and monitor new errors."],
    environment: ["Python 3.10+", "NumPy and pandas", "scikit-learn metrics", "statsmodels for Holt-Winters"],
    understanding: ["Plot the series before modeling. Trend is the long-term direction; seasonality is a pattern repeating at a known period; noise is remaining variation.", "A random train/test split destroys the forecasting question because future months can teach the model about earlier months. Every transformation, lag and rolling value must use only information available at that timestamp."],
    baseline: ["The naive forecast repeats the last observed value. A seasonal naive baseline repeats the value from 12 months earlier. These are hard to beat when the series is persistent or strongly seasonal.", "Holt-Winters adds level, trend and seasonality. It is stronger than a flat baseline while remaining interpretable and consistent with existing dependencies."],
    worked: { title: "Calculate MAE and RMSE for four months", given: "Actual sales are [102, 108, 111, 115] and forecasts are [100, 111, 110, 119]. Residuals actual − forecast are [2, −3, 1, −4].", steps: ["Absolute errors are [2, 3, 1, 4]; their sum is 10.", "MAE = 10 / 4 = 2.50 sales units.", "Squared errors are [4, 9, 1, 16]; their sum is 30.", "RMSE = √(30 / 4) = √7.5 = 2.74 sales units."], result: "Both metrics use the same four future errors. RMSE is larger because squaring gives the four-unit miss extra weight." },
    implementation: [{title:"Generate and split the series", explanation:"The trend adds 1.5 units each month; the sine term repeats every 12 months; the seeded noise adds realistic variation.", code:salesCode, kind:"RUNNABLE CODE", output:"Expected shapes: train=24, validation=6, test=6."}, {title:"Fit the seasonal candidate", explanation:"The model estimates level, additive trend and a 12-month seasonal pattern from train only.", code:salesModelCode, kind:"RUNNABLE CODE"}, {title:"Refit only after choosing", explanation:"After validation selects a method, combine train and validation, refit once and forecast exactly six untouched test months.", code:`development = pd.concat([train, validation])\nfinal_fit = ExponentialSmoothing(\n    development, trend=\"add\", seasonal=\"add\", seasonal_periods=12\n).fit()\ntest_forecast = final_fit.forecast(6)`, kind:"RUNNABLE CODE"}],
    resultHeaders: ["Model", "Validation MAE", "Validation RMSE", "Reading"],
    resultRows: [["Last-value naive", "13.4", "15.1", "Misses trend and seasonal movement"], ["12-month seasonal naive", "6.8", "7.5", "Strong transparent baseline"], ["Holt-Winters", "4.9", "5.7", "Best candidate on this fixed validation horizon"]],
    resultNote: "Illustrative seeded-example outputs establish the comparison pattern. Re-run the supplied generator and library version to reproduce values; real retail data will produce different errors.",
    evaluation: ["Evaluate at the exact business horizon and report units. MAE = 4.9 means the forecast misses by about 4.9 sales units per validation month on average.", "Plot residuals by time and season. Runs above zero mean under-forecasting; increasing spread suggests changing variance; one large error may correspond to a promotion, stock-out or data issue."],
    failureRows: [["Excellent validation, poor test", "Tuned repeatedly to one six-month window", "Use rolling-origin backtests"], ["Future leakage", "Centered rolling mean or random split", "Use past-only features and chronological folds"], ["Seasonal miss", "Wrong period or structural change", "Recheck frequency and business calendar"], ["Large event residual", "Promotion/stock-out absent from inputs", "Add known-ahead event features or scenarios"]],
    improvements: ["Use rolling-origin validation across several historical horizons.", "Add holidays and planned promotions only when known at forecast time.", "Compare ARIMA or gradient-boosted lag models after strong baselines.", "Produce prediction intervals so planners see uncertainty, not only a point."],
    productionRows: [["Schedule", "Generate six-month forecast after each monthly close"], ["Data checks", "Missing dates, revisions, stock-outs and unit changes"], ["Monitoring", "MAE/RMSE by horizon, residual bias and interval coverage"], ["Response", "Investigate drift, refit, or switch to fallback baseline"]],
    summary: ["A forecasting dataset is ordered evidence, so development and testing must preserve time.", "The forecast horizon determines how data is split and which errors matter to the business.", "Last-value and seasonal-naive forecasts are essential baselines, not throwaway demos.", "Holt-Winters adds interpretable level, trend and seasonal components without future leakage.", "MAE gives the average absolute miss, while RMSE emphasizes larger misses.", "Residual plots reveal bias, missing events and structural change that one metric can hide.", "Production forecasting needs scheduled data checks, horizon-specific monitoring, uncertainty and a reliable fallback."],
  },
  "project-image-classification": {
    goal: "Adapt a pretrained image backbone to classify ten small image categories, then diagnose class-specific errors and overfitting rather than treating one accuracy number as the project result.",
    build: ["CIFAR-10 train/validation/test loaders with train-only augmentation", "A pretrained ResNet-18 feature extractor and new ten-class head", "Frozen-head training followed by optional staged fine-tuning", "Learning curves, confusion matrix, inference and saved model contract"],
    prerequisites: [["CNNs and image classification", "/learn/cnn"], ["Data augmentation", "/learn/data-augmentation-deep-learning"], ["Transfer learning", "/learn/transfer-learning"], ["Saving and deploying models", "/learn/saving-deploying-deep-models"]],
    inputsIntro: "CIFAR-10 contains 32×32 RGB images in ten classes. torchvision provides 50,000 training and 10,000 test images, small enough for a teaching project. Split validation from the official training set; do not tune on the official test labels.",
    inputHeaders: ["Tensor / label", "Shape or value", "Origin"],
    inputRows: [["One image", "3 × 32 × 32", "3 color channels, height 32, width 32"], ["Training batch", "32 × 3 × 32 × 32", "Batch size 32 chosen by developer"], ["Logits", "32 × 10", "Model output: one score per class for each image"], ["Label", "integer 0–9", "Dataset class index"], ["Augmentation", "crop + horizontal flip", "Randomly applied only to training images"]],
    architecture: ["Create separate training, validation and test datasets.", "Normalize all splits consistently but augment training only.", "Load pretrained weights, freeze the backbone and replace the classification head.", "Train the head, inspect curves, then optionally unfreeze a late block with a smaller learning rate."],
    environment: ["Python 3.10+", "PyTorch and torchvision", "scikit-learn for confusion matrix", "CPU works for the small tutorial; GPU shortens training"],
    understanding: ["A pixel tensor is numerical input, not a photograph to the model. Normalization uses fixed channel statistics, while augmentation creates plausible training variations.", "Keep validation deterministic. Random validation crops would make the metric change because of evaluation noise rather than model quality."],
    baseline: ["Before transfer learning, record chance accuracy (10%) and a small CNN or majority baseline. Transfer learning should justify its extra complexity by faster convergence or better validation results.", "Stage 1 updates only the new head. Stage 2 unfreezes a small late portion of the backbone, uses a learning rate such as 1e−4, and stops if validation degrades."],
    worked: { title: "Count the new classification-head parameters", given: "ResNet-18 produces 512 features per image. CIFAR-10 needs 10 output logits. A linear head has a 512×10 weight matrix and 10 bias values.", steps: ["Weight values = 512 × 10 = 5,120.", "Bias values = 10, one for each class.", "Total trainable head parameters = 5,120 + 10 = 5,130.", "With the backbone frozen, these 5,130 values are the only parameters updated in stage 1."], result: "The pretrained backbone supplies general visual features; the small new head learns how those features map to CIFAR-10 classes." },
    implementation: [{title:"Load images with split-specific transforms", explanation:"Only training uses random crop and flip. Evaluation uses the same fixed normalization without randomness.", code:imageCode, kind:"RUNNABLE CODE"}, {title:"Replace and train the head", explanation:"Cross-entropy converts the 10 logits and true labels into one loss. backward computes gradients; step updates only parameters with requires_grad=True.", code:imageModelCode, kind:"RUNNABLE CODE"}, {title:"Fine-tune conservatively", explanation:"Unfreeze the last residual block only after the head has learned. A smaller learning rate protects reusable pretrained features.", code:`for parameter in model.layer4.parameters():\n    parameter.requires_grad = True\noptimizer = torch.optim.AdamW(\n    [p for p in model.parameters() if p.requires_grad], lr=1e-4\n)`, kind:"RUNNABLE CODE"}, {title:"Save an inference contract", explanation:"Save class names and normalization alongside weights so inference reproduces training-time preparation.", code:`torch.save({\n  \"state_dict\": model.state_dict(),\n  \"classes\": train_set.classes,\n  \"mean\": (0.491, 0.482, 0.447),\n  \"std\": (0.247, 0.243, 0.262),\n}, \"cifar10_resnet18.pt\")`, kind:"RUNNABLE CODE"}],
    resultHeaders: ["Stage", "Train accuracy", "Validation accuracy", "Interpretation"],
    resultRows: [["Chance", "10%", "10%", "Ten equally likely classes"], ["Frozen head", "78%", "74%", "Pretrained features transfer"], ["Late-block fine-tune", "86%", "79%", "Useful gain with a growing generalization gap"]],
    resultNote: "The percentages are representative teaching outputs, not guaranteed hardware-independent results. Seeds, library versions and training duration affect exact values; the curve and error analysis matter more than matching one number.",
    evaluation: ["Track training and validation loss/accuracy each epoch. Select the checkpoint with the best validation objective, then evaluate the untouched test set once.", "A confusion matrix exposes class-specific errors. Inspect misclassified images: cat/dog confusion may reflect pose and background; truck/car errors may reflect scale. Confirm whether labels are correct before changing the model."],
    failureRows: [["Validation loss rises", "Overfitting after several epochs", "Early stop, augment, regularize or freeze more"], ["Both curves flat", "Bad learning rate or frozen head", "Check trainable parameters and gradients"], ["One class has poor recall", "Imbalance or visual ambiguity", "Inspect examples and class counts"], ["Inference mismatch", "Different normalization/class order", "Load the saved preprocessing contract"]],
    improvements: ["Use class-balanced sampling only if training counts justify it.", "Tune augmentation to plausible CIFAR-10 changes; do not flip classes where orientation matters.", "Compare a small native CNN against transfer learning on speed and accuracy.", "Calibrate probabilities and add an abstention threshold for uncertain images."],
    productionRows: [["Artifact", "Weights, architecture, class order, transforms and version"], ["Serving", "Validate image type/size; batch when latency permits"], ["Monitoring", "Class mix, confidence, drift, class recall and corrupt uploads"], ["Safety", "Do not extend toy performance claims to medical or high-stakes imagery"]],
    summary: ["Image classification maps a numeric image tensor to class scores, not directly to a human-readable label.", "Training, validation and test images serve different purposes and must remain separate.", "Augmentation belongs only in training; normalization must be reproduced consistently everywhere.", "Transfer learning freezes reusable pretrained features and begins with a newly initialized task head.", "Staged fine-tuning uses a smaller learning rate and validation evidence to avoid damaging useful features.", "Learning curves and confusion matrices expose overfitting and class-specific errors hidden by overall accuracy.", "A deployable image model includes transforms, class order, weights, versioning and monitoring—not only a checkpoint file."],
  },
  "project-genai-app": {
    goal: "Build a provider-neutral application that turns a bounded user request into a validated structured result. The model may be probabilistic; parsing, schema checks, policy, retries and release decisions remain deterministic application responsibilities.",
    build: ["A prompt builder with a narrow task contract", "A free deterministic mock provider plus a replaceable real-provider adapter", "JSON parsing, schema and business-rule validation", "Bounded retry, fallback, safety and evaluation records"],
    prerequisites: [["How generative models learn", "/learn/how-generative-models-learn"], ["Building Generative AI applications", "/learn/building-genai-apps"], ["Prompt engineering and structured output", "/learn/prompt-engineering"], ["Responsible Generative AI", "/learn/responsible-generative-ai"]],
    inputsIntro: "The example accepts a short product-change description and returns a Draft object with title, summary and risk. The provider boundary accepts a prompt string and returns raw text. This narrow interface lets the learner run the mock for free and later replace only one function.",
    inputHeaders: ["Input / output", "Type", "Trust treatment"],
    inputRows: [["user_change", "string", "Length-limit and treat as user data, not instructions"], ["system_contract", "developer text", "Defines fields, allowed risk values and refusal behavior"], ["raw_provider_text", "string", "Untrusted until parsed and validated"], ["Draft", "typed object", "Accepted only after schema and policy checks"], ["evaluation_record", "expected vs actual", "Stores validity, safety, latency and cost"]],
    architecture: ["Validate and normalize the user's bounded input.", "Build a prompt that states the task, output schema and constraints.", "Call a provider adapter with timeout and request metadata.", "Parse, validate and apply safety/business policy before returning a typed result."],
    environment: ["Python 3.10+ for the free mock", "Standard-library json and dataclasses", "Optional provider SDK only for the labelled extension", "GENAI_API_KEY environment variable for a real provider—never source code"],
    understanding: ["A language model returns a sequence of tokens. Even when asked for JSON, it can omit a field, use the wrong type or wrap JSON in prose. Treat the response exactly like untrusted external input.", "Structured output reduces ambiguity but does not guarantee factuality or safety. Schema validation answers 'is the shape acceptable?'; domain validation asks 'are the values permitted and meaningful?'"],
    baseline: ["Begin with the mock provider and one happy-path example. It tests the application contract without cost, network failure or vendor differences.", "Then deliberately return malformed JSON, a missing field and a disallowed risk value. A baseline is complete only when each failure produces a controlled outcome."],
    worked: { title: "Trace one response through validation", given: "The provider returns {\"title\":\"Release note\",\"summary\":\"Adds CSV export\",\"risk\":\"low\"}.", steps: ["json.loads parses the text into three key-value pairs.", "The schema requires title, summary and risk, and all three values are strings, so the shape passes.", "The business rule allows risk only in {low, medium, high}; 'low' passes.", "The safety check finds no prohibited content, so the object is released and logged as valid."], result: "The result is trusted because deterministic checks passed, not because the model formatted it confidently." },
    implementation: [{title:"Run the provider-free vertical slice", explanation:"mock_provider is deterministic and free. validate turns raw text into a typed Draft or raises a controlled error.", code:genaiCode, kind:"RUNNABLE CODE", output:"Expected object: Draft(title='Release note', summary='...', risk='low')."}, {title:"Add bounded repair and fallback", explanation:"Retry only once for a repairable parse/schema failure. The second failure returns a safe application-owned fallback rather than looping.", code:`def generate_draft(user_change):\n    prompt = build_prompt(user_change)\n    for attempt in range(2):\n        try:\n            return {\"status\": \"ok\", \"draft\": validate(mock_provider(prompt))}\n        except (json.JSONDecodeError, ValueError) as error:\n            prompt += f\"\\nRepair the output. Validation error: {error}\"\n    return {\"status\": \"review\", \"message\": \"A valid draft could not be produced.\"}`, kind:"RUNNABLE CODE"}, {title:"Swap in a real provider only at the boundary", explanation:"A provider SDK and paid account are optional. Keep credentials in the environment and preserve the same raw-text return contract.", code:genaiProvider, kind:"PROVIDER-DEPENDENT CODE"}],
    resultHeaders: ["Test case", "Expected status", "What is measured"],
    resultRows: [["Valid request", "ok", "Schema valid, safe, latency recorded"], ["Malformed JSON once", "ok after repair", "Retry count = 1"], ["Missing field twice", "review", "No invalid object released"], ["Unsafe request", "refused", "Policy decision logged without model text"]],
    resultNote: "These are deterministic acceptance tests for the surrounding application. A real model evaluation adds a fixed prompt set and human-reviewed quality criteria while preserving the same validation gates.",
    evaluation: ["Measure schema-valid rate, task correctness against reviewed examples, safety-policy outcomes, retry rate, fallback rate, p50/p95 latency and cost per accepted result.", "Separate model quality from system reliability. A beautiful response that fails the schema is an application failure; a valid JSON object with an incorrect summary is a semantic-quality failure."],
    failureRows: [["JSON parse error", "Provider added prose or truncated output", "Repair once, then safe fallback"], ["Valid schema, wrong facts", "No evidence check", "Add source data and semantic evaluation"], ["Repeated timeout", "Provider/network issue", "Backoff, circuit breaker and alternate adapter"], ["Secret exposure", "Key in source/log", "Environment secret store and redaction"]],
    improvements: ["Add a fixed evaluation set with expected fields and reviewer rubrics.", "Use provider-native constrained decoding where available, while retaining validation.", "Cache safe repeated requests when privacy and freshness allow.", "Compare providers behind the same adapter on quality, latency and cost."],
    productionRows: [["Secrets", "Managed secret store; never browser bundle, source or logs"], ["Reliability", "Timeout, bounded retry, idempotency and circuit breaker"], ["Release", "Version prompt/schema/model together; canary with rollback"], ["Observability", "Request ID, model version, validation result, latency, tokens and cost"]],
    summary: ["A GenAI application surrounds probabilistic generation with deterministic input, validation and policy controls.", "A narrow provider adapter lets a free mock and real APIs share the same application contract.", "Raw model text remains untrusted until JSON parsing, schema checks and business rules pass.", "Retries should target repairable failures, remain bounded and end in a safe fallback or review state.", "Environment variables demonstrate secret injection; API keys must never appear in learner or client-side code.", "Evaluation separates structural validity, semantic quality, safety, latency and cost.", "Production readiness requires versioned prompts and schemas, observability, circuit breaking, canary release and rollback."],
  },
  "project-rag-document-qa": {
    goal: "Build a small local document question-answering system that retrieves evidence before generating an answer, displays source labels and explicitly says when the corpus does not support a response.",
    build: ["A three-document local corpus and transparent text extraction", "Chunking, vectorization, query embedding and top-k similarity search", "A bounded context packet with source labels", "Separate retrieval and grounded-answer evaluation"],
    prerequisites: [["Tokenization and embeddings", "/learn/tokenization-embeddings"], ["Semantic search", "/learn/semantic-search-embeddings"], ["Vector databases", "/learn/vector-databases"], ["RAG", "/learn/rag"], ["Advanced RAG", "/learn/advanced-rag"]],
    inputsIntro: "The runnable corpus uses three short local strings so every retrieved sentence is visible. A production system would extract text from approved files, preserve page/section metadata and reject unsupported formats before indexing.",
    inputHeaders: ["Object", "Teaching value", "Production counterpart"],
    inputRows: [["documents", "3 named policy strings", "Approved PDFs, HTML or knowledge-base records"], ["chunk", "One short document per chunk", "Bounded token windows with overlap and metadata"], ["chunk vector", "TF-IDF sparse vector", "Neural embedding from a versioned model"], ["query vector", "Same fitted vector space", "Same embedding model and preprocessing"], ["citation", "Source filename", "Document, page, section and stable URL"]],
    architecture: ["Indexing path: extract → clean → chunk → embed → store vectors and metadata.", "Question path: embed query → retrieve top-k → optionally rerank → build context.", "Generation path: answer only from context → attach citations → abstain when evidence is insufficient.", "Evaluation path: score retrieval separately from answer faithfulness and usefulness."],
    environment: ["Python 3.10+", "NumPy and scikit-learn", "No paid vector database", "Optional local or hosted generator behind a provider adapter"],
    understanding: ["Chunk size balances context and precision. Very large chunks contain extra noise; very small chunks can split a complete fact. Overlap repeats boundary text so one fact is less likely to be cut in half.", "top-k is the maximum number of candidates returned. Larger k can improve recall but adds context tokens, latency and distraction. Reranking spends more compute to improve the order of retrieved candidates."],
    baseline: ["First return the best matching chunk and its source without an LLM. This retrieval-only baseline proves whether the evidence can be found.", "Then add a generator that receives only labelled evidence. If the highest score is below the validated threshold, return 'I do not have enough evidence' rather than asking the model to guess."],
    worked: { title: "Calculate one cosine similarity", given: "Use query q = [1, 1, 0] and chunk c = [1, 0.8, 0]. These numbers are feature weights produced by the same vectorizer.", steps: ["Dot product q·c = 1×1 + 1×0.8 + 0×0 = 1.8.", "||q|| = √(1² + 1²) = √2 = 1.414.", "||c|| = √(1² + 0.8²) = √1.64 = 1.281.", "Cosine similarity = 1.8 / (1.414 × 1.281) = 1.8 / 1.811 ≈ 0.994."], result: "The vectors point in almost the same direction, so this chunk is a strong lexical match. Similarity still does not prove the chunk answers the question." },
    implementation: [{title:"Index and retrieve the local corpus", explanation:"fit_transform learns the vocabulary and inverse-document-frequency weights from chunks. transform maps the query into that exact same vector space.", code:ragCode, kind:"RUNNABLE CODE", output:"Question 'How long does shipping take?' ranks shipping.txt first."}, {title:"Build context with citations and abstention", explanation:"The score threshold is a validation choice, not a universal constant. The returned prompt preserves source names beside evidence.", code:ragAnswerCode, kind:"RUNNABLE CODE"}, {title:"Add a generator behind the boundary", explanation:"The provider receives a bounded evidence packet and must cite bracketed source labels. Keep the local retrieval test runnable without it.", code:`raw = generator(\n  system=\"Answer only from evidence. Cite [source]. If absent, say insufficient evidence.\",\n  user=payload[\"prompt\"],\n)\nvalidated = check_citations(raw, allowed_sources=payload[\"sources\"])`, kind:"PROVIDER-DEPENDENT CODE"}],
    resultHeaders: ["Question", "Top source", "Retrieval success", "Answer behavior"],
    resultRows: [["How long is standard shipping?", "shipping.txt", "yes", "3–5 business days [shipping.txt]"], ["What does the warranty cover?", "warranty.txt", "yes", "Manufacturing defects for one year [warranty.txt]"], ["Do you ship to Mars?", "none above threshold", "no", "Insufficient evidence"]],
    resultNote: "The corpus is deliberately tiny and the expected evidence is shown in the page. This makes retrieval decisions reproducible before adding a neural embedding model or paid generator.",
    evaluation: ["Retrieval recall@k asks whether a known relevant chunk appears in the top k. Mean reciprocal rank rewards putting it earlier. Answer faithfulness checks whether claims are supported by retrieved text; answer usefulness checks whether the supported response resolves the question.", "Test four cases: direct fact, paraphrase, fact split near a chunk boundary and unsupported question. Record retrieved IDs and scores before judging answer wording."],
    failureRows: [["Right document, wrong chunk", "Chunk boundaries or size", "Tune size/overlap; preserve headings"], ["No relevant hit", "Vocabulary mismatch or missing corpus", "Neural embeddings, query rewrite, corpus coverage"], ["Good hit, invented claim", "Generator ignored evidence", "Citation validation and faithfulness checks"], ["Too much context", "top-k too high", "Rerank and enforce token budget"]],
    improvements: ["Replace TF-IDF with a versioned local neural embedding model.", "Add metadata filters and a small reranker for ambiguous queries.", "Preserve page/section offsets for precise citation display.", "Create a labelled evaluation set before tuning chunk size, overlap, k or threshold."],
    productionRows: [["Ingestion", "Malware/type checks, extraction quality, deduplication and ACLs"], ["Index lifecycle", "Version embeddings; re-index changed documents"], ["Serving", "Access-filter before retrieval; cache carefully; cap context"], ["Monitoring", "No-hit rate, recall sample, citation validity, latency and token cost"]],
    summary: ["RAG first retrieves evidence and then generates from a bounded, labelled context.", "Indexing and question answering are separate paths with different failure modes.", "Chunk size and overlap control whether facts stay intact and how much repeated text is stored.", "Query and chunk vectors must come from the same representation model before similarity is meaningful.", "top-k and reranking trade retrieval recall against latency, tokens and context noise.", "Retrieval success and answer faithfulness must be evaluated separately, including unsupported questions.", "A trustworthy document Q&A system preserves permissions and citations and responds with insufficient evidence instead of guessing."],
  },
  "project-ai-agent": {
    goal: "Apply the existing Agentic AI lessons by building a bounded local support agent that can inspect an order, use short-term state, retrieve an approved durable preference and stop safely when evidence or required input is missing.",
    build: ["A narrow goal and trusted instruction contract", "A typed read-only order tool with argument validation", "Current-run state plus a separate durable-memory example", "Successful and abstention traces with step, latency and cost budgets"],
    prerequisites: [["Tool calling", "/learn/tool-calling"], ["Context engineering", "/learn/agent-context-engineering"], ["Agent memory", "/learn/agent-memory"], ["Planning and reflection", "/learn/planning-reflection"], ["Agent evaluation", "/learn/agent-evaluation-safety"], ["Agent observability", "/learn/agent-observability-deployment"]],
    inputsIntro: "The synthetic domain contains one local order and one approved customer preference. No paid model or external tool is required. The deterministic decision function stands in for a model so the architecture, validation and traces remain reproducible.",
    inputHeaders: ["Component", "Example", "Responsibility"],
    inputRows: [["Goal", "Answer order-status question", "Defines success boundary"], ["Instructions", "Use approved tools; never invent status", "Trusted policy"], ["Tool schema", "get_order(order_id: integer)", "Validates proposed action"], ["State", "goal, step, observations, trace", "Temporary execution record"], ["Memory", "customer_7 prefers concise answers", "Approved cross-session fact"], ["Stop rules", "success, missing input, no evidence, 5 steps", "Bound cost and risk"]],
    architecture: ["Assemble goal, instructions and relevant memory into the current context.", "Let the decision layer propose an answer, clarification, tool call or abstention.", "Validate the tool name and arguments in trusted code before execution.", "Record the observation, update state and stop on success, safe failure or budget exhaustion."],
    environment: ["Python 3.10+ standard library", "Local dictionaries for orders and memory", "No paid LLM required for the runnable trace", "Optional model adapter only after deterministic tests pass"],
    understanding: ["State answers 'where is this run now?' and normally ends with the run. Persistent memory answers 'what approved information may help a later run?' and needs write, update and delete policy.", "A tool schema describes valid arguments but does not grant permission. Trusted application code still checks identity, authorization, business policy and side effects."],
    baseline: ["Start with ordinary code that handles one known question. Then add a model-directed decision only if natural-language variation makes fixed routing insufficient.", "The simplest agent baseline must pass three tests: supported success, missing required input and unsupported/no-evidence abstention."],
    worked: { title: "Calculate one bounded run's latency and cost", given: "A successful run uses two model decisions at 0.6 seconds and $0.004 each, plus one tool call at 0.3 seconds and $0.002.", steps: ["Model latency = 2 × 0.6 = 1.2 seconds.", "Total latency = 1.2 + 0.3 = 1.5 seconds because the steps are sequential.", "Model cost = 2 × $0.004 = $0.008.", "Total cost = $0.008 + $0.002 = $0.010."], result: "The run succeeds in three charged operations. A retry would increase both totals, which is why step and cost ceilings are operational controls." },
    implementation: [{title:"Run the complete local agent", explanation:"The function validates order_id, records every decision and returns controlled statuses. It does not claim to be a language model.", code:agentCode, kind:"RUNNABLE CODE", output:"Order 1042 returns success; missing order_id returns needs_input; unknown order returns not_found."}, {title:"Define the model boundary", explanation:"If an LLM is later added, it may propose only one of these actions. Application code validates the proposal and owns execution.", code:`Action = Answer(text) | GetOrder(order_id) | AskForOrderId() | Abstain(reason)\nwhile state.step < MAX_STEPS:\n    proposal = model.choose(allowed_actions, context)\n    action = validate(proposal, user_permissions)\n    observation = execute(action)\n    state = record(state, action, observation)`, kind:"CONCEPTUAL PSEUDOCODE"}, {title:"Persist memory deliberately", explanation:"Write only an approved stable preference, with provenance and deletion support. Do not store the entire conversation automatically.", code:`memory_store.upsert(\n  subject=\"customer_7\", key=\"response_tone\", value=\"concise\",\n  source=\"user-approved setting\", expires_at=None\n)`, kind:"OPTIONAL PRODUCTION EXTENSION"}],
    resultHeaders: ["Scenario", "Trace", "Final status"],
    resultRows: [["Known order 1042", "validate → get_order → observe → answer", "success"], ["No order ID", "check input → ask/abstain", "needs_input"], ["Unknown order 9999", "get_order → empty observation → abstain", "not_found"], ["Repeated no progress", "steps reach 5", "budget_exhausted"]],
    resultNote: "Both successful and safe-failure paths are product behavior. A system that answers unsupported questions fluently has failed even if the output sounds helpful.",
    evaluation: ["Score task success, correct tool choice, argument validity, evidence-grounded answer, safe abstention, step count, latency and cost. Inspect the full trajectory, not only the final sentence.", "Create adversarial tests for malformed IDs, tool injection, stale memory, denied permissions, tool timeout and repeated no-progress loops."],
    failureRows: [["Invented order status", "Answered without observation", "Require evidence before answer"], ["Wrong tool argument", "Schema/validation missing", "Reject before execution and request correction"], ["Stale preference", "Memory lacks provenance/update", "Version and allow user correction/deletion"], ["Infinite loop", "No progress/stop rule", "Step, time and cost budgets with escalation"]],
    improvements: ["Add a second read-only tool only after tests distinguish when it is needed.", "Replace the deterministic chooser with a provider adapter while retaining action validation.", "Add checkpointing for tasks that may pause for human approval.", "Build a regression set from successful, abstention and recovery traces."],
    productionRows: [["Permissions", "Authorize every tool at execution time"], ["Durability", "Checkpoint state before waits or consequential actions"], ["Observability", "Trace IDs, tool inputs/results, tokens, latency, cost and status"], ["Recovery", "Idempotency, timeout classification, retries and human escalation"]],
    summary: ["An agent project begins with a bounded goal, allowed actions and explicit success and stop conditions.", "The model may propose a tool call, but trusted code validates permissions, policy and typed arguments.", "Short-term state records the current trajectory; persistent memory stores only approved facts for future runs.", "A step budget limits loops, latency and cost and ends in a controlled escalation or abstention.", "A successful trace must show which observation supports the answer.", "Safe failure is a required outcome when input, evidence, authority or progress is missing.", "Production agents need trajectory evaluation, durable checkpoints, idempotency, observability and rollback—not merely a stronger prompt."],
  },
  "project-multi-agent-research": {
    goal: "Build a bounded research workflow in which a coordinator delegates two independent questions to local-source researchers, a verifier checks evidence and conflicts, and a synthesizer produces a cited result. Then compare its quality and overhead with one agent.",
    build: ["Coordinator, researcher, verifier and synthesizer responsibilities", "Typed task envelopes, explicit ownership and shared state", "Local/mock research sources with reproducible citations", "Quality-versus-cost/latency evaluation and a one-agent fallback"],
    prerequisites: [["Multi-agent systems", "/learn/multi-agent-systems"], ["Agent state graphs", "/learn/agent-state-graphs"], ["Agent frameworks", "/learn/agent-frameworks"], ["Agent evaluation", "/learn/agent-evaluation-safety"], ["Agent observability", "/learn/agent-observability-deployment"]],
    inputsIntro: "The runnable project uses two local source records: one measured benefit and one limitation. This keeps every claim inspectable. Optional web or provider integrations belong outside the core path and must preserve source, permission and budget controls.",
    inputHeaders: ["Role", "Owned input", "Required output / done condition"],
    inputRows: [["Coordinator", "research question + budget", "Non-overlapping tasks and final stop decision"], ["Researcher", "one task + allowed sources", "Claims paired with exact source evidence"], ["Verifier", "all findings", "Accepted/rejected claims and conflicts"], ["Synthesizer", "accepted findings only", "Cited answer without new unsupported claims"], ["Shared state", "tasks, owners, status, evidence, spend", "Single inspectable source of workflow truth"]],
    architecture: ["Coordinator decomposes only genuinely separable work and assigns one owner per task.", "Researchers inspect disjoint or complementary local sources and return structured evidence.", "Verifier checks source presence, claim support, duplication and contradiction.", "Synthesizer writes from accepted findings; coordinator stops when coverage and budgets are satisfied."],
    environment: ["Python 3.10+ standard library", "Local source dictionary", "Sequential list execution for the runnable baseline", "Optional async/provider adapters only after correctness"],
    understanding: ["Multiple agents are useful when work is independent, parallel or benefits from a separate verification role. One agent is better when the task is short, tightly coupled or cheaper to solve in one context.", "A handoff is not a vague chat message. It needs task ID, owner, input evidence, expected output, acceptance criteria and budget. Shared state prevents two researchers from unknowingly repeating the same work."],
    baseline: ["First ask one deterministic function to read both local sources and write a cited summary. Record its completeness, latency and operation count.", "Add multiple roles only if delegation or independent verification produces a measurable improvement worth the coordination overhead."],
    worked: { title: "Compare sequential and parallel latency", given: "Coordinator takes 0.5 s, each of two researchers takes 1.2 s, verifier 0.7 s and synthesizer 0.8 s. Only the researchers can run in parallel.", steps: ["Sequential latency = 0.5 + 1.2 + 1.2 + 0.7 + 0.8 = 4.4 s.", "Parallel researcher stage latency = max(1.2, 1.2) = 1.2 s.", "Parallel total = 0.5 + 1.2 + 0.7 + 0.8 = 3.2 s.", "Speedup = 4.4 / 3.2 = 1.375×, before orchestration/network overhead."], result: "Parallelism saves 1.2 seconds in this idealized trace, but it does not reduce the total research work or model cost." },
    implementation: [{title:"Run the local role pipeline", explanation:"Each role is a plain function with a narrow contract. This makes the handoffs and evidence visible before any framework or model is added.", code:multiAgentCode, kind:"RUNNABLE CODE", output:"Pilot users completed the task 18% faster. [market.txt] The sample contained 40 users and one industry. [risk.txt]"}, {title:"Represent shared state explicitly", explanation:"A coordinator updates task status and spend; workers may write only their owned result fields.", code:`state = {\n  \"budget_steps\": 8, \"steps_used\": 0,\n  \"tasks\": {\n    \"benefit\": {\"owner\": \"researcher_a\", \"status\": \"pending\"},\n    \"limits\": {\"owner\": \"researcher_b\", \"status\": \"pending\"},\n  },\n  \"accepted_findings\": [], \"conflicts\": [],\n}`, kind:"CONCEPTUAL PSEUDOCODE"}, {title:"Handle disagreement", explanation:"Conflicting supported claims are preserved for verifier or human judgment; the synthesizer must not silently choose the more fluent one.", code:`if claims_conflict(a, b):\n    state[\"conflicts\"].append({\"claim_a\": a, \"claim_b\": b})\n    return request_review(state[\"conflicts\"])`, kind:"CONCEPTUAL PSEUDOCODE"}],
    resultHeaders: ["Design", "Coverage", "Latency", "Operations", "Reading"],
    resultRows: [["One agent", "2/2 facts", "3.0 s", "3", "Cheapest baseline for tiny corpus"], ["Four roles, sequential", "2/2 + verification", "4.4 s", "5", "More inspectable, slower"], ["Four roles, researchers parallel", "2/2 + verification", "3.2 s", "5", "Parallel benefit, same work/cost"]],
    resultNote: "The numbers come from the worked timing assumptions and the two-source task. They illustrate measurement; they do not prove multi-agent superiority on larger research problems.",
    evaluation: ["Measure claim coverage, source correctness, contradiction detection, unsupported-claim rate and final usefulness. Pair quality with total calls, tokens, wall-clock latency and cost.", "Compare against a one-agent baseline on the same fixed sources and rubric. Count duplicated work and failed handoffs; do not reward additional role messages as progress."],
    failureRows: [["Duplicate findings", "Tasks overlap or ownership unclear", "Coordinator assigns non-overlapping scopes"], ["Lost evidence", "Handoff omits source metadata", "Require typed evidence envelope"], ["Conflict hidden", "Synthesizer resolves silently", "Verifier records and escalates conflict"], ["Run never ends", "No coverage/step stop", "Success criteria plus global budget"]],
    improvements: ["Use asynchronous execution only for independent tasks and preserve deterministic joins.", "Add source-quality ranking and claim-level citation checks.", "Route only difficult conflicts to a human reviewer.", "Test whether a two-role researcher/verifier design matches four-role quality at lower cost."],
    productionRows: [["Ownership", "One owner and done condition for every task"], ["Budgets", "Global plus per-worker steps, time, tokens and cost"], ["Security", "Role-specific tools and least-privilege source access"], ["Observability", "Parent trace with child spans, handoffs, conflicts and final citations"]],
    summary: ["Multi-agent systems are justified by separable work or valuable independent verification, not by task size alone.", "The coordinator owns decomposition, non-overlapping assignments, shared state, budgets and the final stop decision.", "A useful handoff names the owner, evidence, expected output and acceptance criteria.", "Researchers return claims with sources; the verifier preserves contradictions instead of rewarding fluent agreement.", "The synthesizer writes only from accepted findings and must not introduce unsupported claims.", "Parallel workers can reduce wall-clock latency but usually do not reduce total work, calls or cost.", "Quality gains must be compared with a one-agent baseline and measured against duplication, handoff failures, latency and cost."],
  },
};

function ProjectTable({ title, headers, rows }: { title: string; headers: string[]; rows: Row[] }) {
  return <div data-project-table><DataTable title={title} caption={title} headers={headers} rows={rows} /></div>;
}

function CodeBlock({ title, kind, code, output }: { title: string; kind: CodeKind; code: string; output?: string }) {
  const type: CodeBlockType = kind === "RUNNABLE CODE"
    ? "runnable"
    : kind === "CONCEPTUAL PSEUDOCODE"
      ? "pseudocode"
      : "conceptual";
  return <div data-project-code={kind}><SharedCodeBlock title={title} type={type} typeLabel={kind} code={code} caption={output ? <><strong>Representative expected output: </strong>{output}</> : undefined} /></div>;
}

function BulletCards({ items }: { items: string[] }) {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{items.map((item)=><div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"/><span className="text-sm leading-relaxed text-slate-700">{item}</span></div>)}</div>;
}

export function ProjectsContent() {
  const { topicId = "" } = useParams<{ topicId: string }>();
  const lesson = lessons[topicId];
  const visuals = projectVisualsByTopic[topicId] ?? [];
  if (!lesson) return null;

  return <div className="space-y-12" data-project-lesson={topicId}>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">1. Project Goal</h2><p className="text-lg leading-relaxed text-slate-700">{lesson.goal}</p></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">2. What You Will Build</h2><BulletCards items={lesson.build}/></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">3. Skills / Prerequisites</h2><p className="mb-4 leading-relaxed text-slate-700">Review unfamiliar foundations before implementing the project. Each link points to an existing lesson used by the workflow.</p><div className="not-prose flex flex-wrap gap-2">{lesson.prerequisites.map(([label,route])=><Link key={route} to={route} className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-100">{label}</Link>)}</div></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">4. Dataset or Inputs</h2><p className="mb-5 leading-relaxed text-slate-700">{lesson.inputsIntro}</p><ProjectTable title="Understand every project input" headers={lesson.inputHeaders} rows={lesson.inputRows}/></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">5. Architecture / Workflow</h2><div className="space-y-3">{lesson.architecture.map((paragraph)=><p key={paragraph} className="leading-relaxed text-slate-700">{paragraph}</p>)}</div><div className="mt-6"><ProjectVisualFigure id={visuals[0]}/></div></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">6. Environment / Dependencies</h2><div className="not-prose rounded-2xl border border-cyan-200 bg-cyan-50 p-5"><ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">{lesson.environment.map((item)=><li key={item} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-600"/>{item}</li>)}</ul></div></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">7. Data or Input Understanding</h2><div className="space-y-4">{lesson.understanding.map((paragraph)=><p key={paragraph} className="leading-relaxed text-slate-700">{paragraph}</p>)}</div></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">8. Baseline / Simplest Working Approach</h2><div className="space-y-4">{lesson.baseline.map((paragraph)=><p key={paragraph} className="leading-relaxed text-slate-700">{paragraph}</p>)}</div><div className="mt-6"><ProjectVisualFigure id={visuals[1]}/></div></section>
    <section data-project-worked-example><h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked Example: {lesson.worked.title}</h2><div className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 sm:p-6"><p className="font-semibold leading-relaxed text-slate-800"><strong className="text-indigo-900">Given: </strong>{lesson.worked.given}</p><ol className="mt-5 space-y-3">{lesson.worked.steps.map((step,index)=><li key={step} className="grid grid-cols-[2rem_1fr] gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">{index+1}</span><span className="pt-1 text-sm leading-relaxed text-slate-700">{step}</span></li>)}</ol><p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 leading-relaxed text-slate-700"><strong className="text-emerald-900">Interpretation: </strong>{lesson.worked.result}</p></div></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">9. Step-by-Step Implementation</h2><div className="space-y-8">{lesson.implementation.map((step,index)=><section key={step.title}><h3 className="mb-2 text-xl font-extrabold text-slate-900">Step {index+1}: {step.title}</h3><p className="mb-4 leading-relaxed text-slate-700">{step.explanation}</p>{step.code&&step.kind&&<CodeBlock title={step.title} kind={step.kind} code={step.code} output={step.output}/>}</section>)}</div></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">10. Expected Results / Outputs</h2><ProjectTable title="Read the output as evidence, not decoration" headers={lesson.resultHeaders} rows={lesson.resultRows}/><Callout role="tip" className="mt-4"><p>{lesson.resultNote}</p></Callout></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">11. Evaluation</h2><div className="space-y-4">{lesson.evaluation.map((paragraph)=><p key={paragraph} className="leading-relaxed text-slate-700">{paragraph}</p>)}</div><div className="mt-6"><ProjectVisualFigure id={visuals[2]}/></div></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">12. Failure Analysis</h2><ProjectTable title="Failure mode → diagnosis → response" headers={["Observed failure","Likely cause","Next action"]} rows={lesson.failureRows}/></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">13. Improve the Project</h2><BulletCards items={lesson.improvements}/></section>
    <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">14. Production Considerations</h2><ProjectTable title="What changes beyond the notebook" headers={["Area","Production requirement"]} rows={lesson.productionRows}/><Callout role="mistake" className="mt-4"><p>Treat monitoring, permissions, rollback and data contracts as part of the product. A model or prompt that worked once in a notebook is not yet a reliable service.</p></Callout></section>
    <div data-project-summary><SummaryCard heading="15. Summary / Key Takeaways" items={lesson.summary} className="mt-0" /></div>
  </div>;
}

export const projectLessonIds = Object.keys(lessons);
