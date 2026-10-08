import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FolderTree, Target } from 'lucide-react';
import {
  HandbookCode,
  HandbookSection,
  HandbookTable,
  Screenshot,
} from '../components/projects/HandbookPrimitives';
import { projectPortfolioById } from '../data/projectPortfolio';

const requirementsCode = "pandas==3.0.6\nnumpy==2.5.3\nscipy==1.16.3\nscikit-learn==1.9.1\nimbalanced-learn==0.14.2\npyarrow==21.0.0\nmatplotlib==3.11.2\njoblib==1.6.0\nstreamlit==1.65.0\npytest==9.0.2\n";
const downloadCode = "\"\"\"Download and validate the public OpenML credit-card fraud dataset.\"\"\"\n\nfrom __future__ import annotations\n\nfrom pathlib import Path\nimport hashlib\nimport json\nimport urllib.request\n\nimport pandas as pd\n\nROOT = Path(__file__).resolve().parent\nDATA_DIR = ROOT / \"data\"\nDATA_PATH = DATA_DIR / \"creditcard.parquet\"\n\nOPENML_ID = 1597\nMETADATA_URL = f\"https://www.openml.org/api/v1/json/data/{OPENML_ID}\"\nEXPECTED_NAME = \"creditcard\"\nEXPECTED_VERSION = \"1\"\nEXPECTED_LICENSE = \"Public\"\nEXPECTED_ROWS = 284_807\nEXPECTED_COLUMNS = 31\nEXPECTED_FRAUDS = 492\nEXPECTED_SHA256 = \"b7efcb35a428bbe22347a05d2437d9177bab07ce61e51214a17bec584ad9496d\"\nEXPECTED_FEATURES = [\"Time\", *[f\"V{i}\" for i in range(1, 29)], \"Amount\", \"Class\"]\n\n\ndef download_bytes(url: str) -> bytes:\n    request = urllib.request.Request(\n        url,\n        headers={\"User-Agent\": \"LearnMLAcademy-credit-card-fraud-handbook/1.0\"},\n    )\n    with urllib.request.urlopen(request, timeout=120) as response:\n        return response.read()\n\n\ndef main() -> None:\n    DATA_DIR.mkdir(parents=True, exist_ok=True)\n\n    metadata = json.loads(download_bytes(METADATA_URL).decode(\"utf-8\"))[\n        \"data_set_description\"\n    ]\n    if metadata[\"name\"] != EXPECTED_NAME:\n        raise RuntimeError(f\"Unexpected OpenML dataset name: {metadata['name']!r}\")\n    if str(metadata[\"version\"]) != EXPECTED_VERSION:\n        raise RuntimeError(f\"Unexpected OpenML version: {metadata['version']!r}\")\n    if metadata.get(\"licence\") != EXPECTED_LICENSE:\n        raise RuntimeError(f\"Unexpected OpenML licence: {metadata.get('licence')!r}\")\n\n    parquet_url = metadata.get(\"parquet_url\")\n    if not parquet_url:\n        raise RuntimeError(\"OpenML metadata did not provide a parquet_url.\")\n\n    raw = download_bytes(parquet_url)\n    sha256 = hashlib.sha256(raw).hexdigest()\n    if sha256 != EXPECTED_SHA256:\n        raise RuntimeError(\n            \"OpenML parquet fingerprint changed: \"\n            f\"{sha256}; expected {EXPECTED_SHA256}. \"\n            \"Do not continue until the dataset change is reviewed.\"\n        )\n    DATA_PATH.write_bytes(raw)\n\n    frame = pd.read_parquet(DATA_PATH)\n    if frame.shape != (EXPECTED_ROWS, EXPECTED_COLUMNS):\n        raise RuntimeError(\n            f\"Unexpected shape {frame.shape}; expected \"\n            f\"({EXPECTED_ROWS}, {EXPECTED_COLUMNS}).\"\n        )\n    if list(frame.columns) != EXPECTED_FEATURES:\n        raise RuntimeError(\n            \"Unexpected column order/schema. Do not continue until reviewed.\"\n        )\n\n    frame[\"Class\"] = frame[\"Class\"].astype(int)\n    frauds = int(frame[\"Class\"].sum())\n    if frauds != EXPECTED_FRAUDS:\n        raise RuntimeError(f\"Unexpected fraud count {frauds}; expected {EXPECTED_FRAUDS}.\")\n    if set(frame[\"Class\"].unique()) != {0, 1}:\n        raise RuntimeError(\"Class must contain only 0 and 1.\")\n\n    print(f\"OpenML dataset ID: {OPENML_ID}\")\n    print(f\"Rows: {len(frame):,}\")\n    print(f\"Columns: {frame.shape[1]}\")\n    print(f\"Fraud transactions: {frauds}\")\n    print(f\"Fraud rate: {frauds / len(frame):.6%}\")\n    print(f\"SHA256: {sha256}\")\n    print(f\"Saved: {DATA_PATH}\")\n\n\nif __name__ == \"__main__\":\n    main()\n";
const trainingCode = "\"\"\"Train the fraud detector from the project root: python src/train_model.py.\"\"\"\n\nfrom __future__ import annotations\n\nfrom pathlib import Path\nimport json\nimport platform\n\nimport joblib\nimport matplotlib.pyplot as plt\nimport numpy as np\nimport pandas as pd\nimport sklearn\nfrom imblearn.over_sampling import SMOTE\nfrom imblearn.pipeline import Pipeline as ImbPipeline\nfrom sklearn.base import clone\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import (\n    ConfusionMatrixDisplay,\n    accuracy_score,\n    average_precision_score,\n    confusion_matrix,\n    f1_score,\n    precision_recall_curve,\n    precision_score,\n    recall_score,\n    roc_auc_score,\n)\nfrom sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nROOT = Path(__file__).resolve().parents[1]\nDATA_PATH = ROOT / \"data\" / \"creditcard.parquet\"\nMODEL_DIR = ROOT / \"models\"\nOUTPUT_DIR = ROOT / \"outputs\"\n\nFEATURES = [\"Time\", *[f\"V{i}\" for i in range(1, 29)], \"Amount\"]\nTARGET = \"Class\"\nSEED = 42\nTARGET_RECALL = 0.80\n\n\ndef load_data() -> tuple[pd.DataFrame, pd.Series]:\n    if not DATA_PATH.is_file():\n        raise FileNotFoundError(\n            \"Dataset missing. Run python download_data.py from the project root.\"\n        )\n    frame = pd.read_parquet(DATA_PATH)\n    expected = FEATURES + [TARGET]\n    if list(frame.columns) != expected:\n        raise ValueError(\"Dataset schema changed.\")\n    y = frame[TARGET].astype(int)\n    if len(frame) != 284_807 or int(y.sum()) != 492:\n        raise ValueError(\"Dataset counts changed.\")\n    return frame[FEATURES].astype(float), y\n\n\ndef split_data(X: pd.DataFrame, y: pd.Series):\n    X_build, X_test, y_build, y_test = train_test_split(\n        X,\n        y,\n        test_size=0.15,\n        stratify=y,\n        random_state=SEED,\n    )\n    validation_fraction_of_build = 0.15 / 0.85\n    X_train, X_val, y_train, y_val = train_test_split(\n        X_build,\n        y_build,\n        test_size=validation_fraction_of_build,\n        stratify=y_build,\n        random_state=SEED,\n    )\n    return X_train, X_val, X_test, y_train, y_val, y_test\n\n\ndef candidate_models():\n    logistic = Pipeline(\n        [\n            (\"scale\", StandardScaler()),\n            (\n                \"model\",\n                LogisticRegression(\n                    max_iter=1500,\n                    solver=\"lbfgs\",\n                    random_state=SEED,\n                ),\n            ),\n        ]\n    )\n    weighted_logistic = Pipeline(\n        [\n            (\"scale\", StandardScaler()),\n            (\n                \"model\",\n                LogisticRegression(\n                    max_iter=1500,\n                    solver=\"lbfgs\",\n                    class_weight=\"balanced\",\n                    random_state=SEED,\n                ),\n            ),\n        ]\n    )\n    smote_logistic = ImbPipeline(\n        [\n            (\"scale\", StandardScaler()),\n            (\n                \"smote\",\n                SMOTE(\n                    sampling_strategy=0.10,\n                    random_state=SEED,\n                    k_neighbors=5,\n                ),\n            ),\n            (\n                \"model\",\n                LogisticRegression(\n                    max_iter=1500,\n                    solver=\"lbfgs\",\n                    random_state=SEED,\n                ),\n            ),\n        ]\n    )\n    forest = RandomForestClassifier(\n        n_estimators=120,\n        max_depth=12,\n        min_samples_leaf=2,\n        class_weight=\"balanced_subsample\",\n        n_jobs=-1,\n        random_state=SEED,\n    )\n    return {\n        \"Logistic Regression\": logistic,\n        \"Class-weighted Logistic Regression\": weighted_logistic,\n        \"SMOTE + Logistic Regression\": smote_logistic,\n        \"Class-weighted Random Forest\": forest,\n    }\n\n\ndef compare_models(X_train: pd.DataFrame, y_train: pd.Series) -> pd.DataFrame:\n    cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=SEED)\n    rows = []\n    for name, model in candidate_models().items():\n        print(f\"Cross-validating {name} ...\", flush=True)\n        scores = cross_validate(\n            clone(model),\n            X_train,\n            y_train,\n            cv=cv,\n            scoring={\n                \"ap\": \"average_precision\",\n                \"roc_auc\": \"roc_auc\",\n                \"precision\": \"precision\",\n                \"recall\": \"recall\",\n                \"f1\": \"f1\",\n            },\n            n_jobs=1,\n            error_score=\"raise\",\n        )\n        rows.append(\n            {\n                \"model\": name,\n                \"cv_average_precision\": float(scores[\"test_ap\"].mean()),\n                \"cv_roc_auc\": float(scores[\"test_roc_auc\"].mean()),\n                \"cv_precision_at_0_5\": float(scores[\"test_precision\"].mean()),\n                \"cv_recall_at_0_5\": float(scores[\"test_recall\"].mean()),\n                \"cv_f1_at_0_5\": float(scores[\"test_f1\"].mean()),\n            }\n        )\n    result = pd.DataFrame(rows).sort_values(\n        \"cv_average_precision\",\n        ascending=False,\n        kind=\"stable\",\n    )\n    result.to_csv(OUTPUT_DIR / \"model_comparison.csv\", index=False)\n    return result\n\n\ndef choose_threshold(\n    y_val: pd.Series,\n    scores: np.ndarray,\n    target_recall: float = TARGET_RECALL,\n) -> tuple[float, pd.DataFrame]:\n    precision, recall, thresholds = precision_recall_curve(y_val, scores)\n    table = pd.DataFrame(\n        {\n            \"threshold\": thresholds,\n            \"precision\": precision[:-1],\n            \"recall\": recall[:-1],\n        }\n    )\n    table[\"f1\"] = (\n        2 * table[\"precision\"] * table[\"recall\"]\n        / (table[\"precision\"] + table[\"recall\"] + 1e-12)\n    )\n\n    feasible = table[table[\"recall\"] >= target_recall]\n    if not feasible.empty:\n        chosen = feasible.sort_values(\n            [\"precision\", \"threshold\"],\n            ascending=[False, False],\n            kind=\"stable\",\n        ).iloc[0]\n    else:\n        chosen = table.sort_values(\"f1\", ascending=False, kind=\"stable\").iloc[0]\n\n    table.to_csv(OUTPUT_DIR / \"validation_thresholds.csv\", index=False)\n    return float(chosen[\"threshold\"]), table\n\n\ndef metrics_at_threshold(\n    y_true: pd.Series,\n    scores: np.ndarray,\n    threshold: float,\n) -> tuple[dict, np.ndarray]:\n    predictions = (scores >= threshold).astype(int)\n    matrix = confusion_matrix(y_true, predictions, labels=[0, 1])\n    metrics = {\n        \"accuracy\": float(accuracy_score(y_true, predictions)),\n        \"precision\": float(precision_score(y_true, predictions, zero_division=0)),\n        \"recall\": float(recall_score(y_true, predictions, zero_division=0)),\n        \"f1\": float(f1_score(y_true, predictions, zero_division=0)),\n        \"average_precision\": float(average_precision_score(y_true, scores)),\n        \"roc_auc\": float(roc_auc_score(y_true, scores)),\n    }\n    return metrics, matrix\n\n\ndef save_figures(\n    y: pd.Series,\n    comparison: pd.DataFrame,\n    threshold_table: pd.DataFrame,\n    chosen_threshold: float,\n    y_test: pd.Series,\n    test_scores: np.ndarray,\n    matrix: np.ndarray,\n) -> None:\n    counts = y.value_counts().sort_index()\n    labels = [\"Legitimate (0)\", \"Fraud (1)\"]\n    values = [int(counts.get(0, 0)), int(counts.get(1, 0))]\n    fig, ax = plt.subplots(figsize=(8, 5))\n    bars = ax.bar(labels, values)\n    ax.set_yscale(\"log\")\n    ax.set_ylabel(\"Transactions (log scale)\")\n    ax.set_title(\"Why fraud detection is an imbalanced classification problem\")\n    for bar, value in zip(bars, values):\n        pct = value / len(y) * 100\n        ax.text(\n            bar.get_x() + bar.get_width() / 2,\n            value,\n            f\"{value:,}\\n{pct:.3f}%\",\n            ha=\"center\",\n            va=\"bottom\",\n        )\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"class_imbalance.png\", dpi=160)\n    plt.close(fig)\n\n    fig, ax = plt.subplots(figsize=(9, 5))\n    ax.barh(comparison[\"model\"], comparison[\"cv_average_precision\"])\n    ax.invert_yaxis()\n    ax.set_xlim(0, 1)\n    ax.set_xlabel(\"Mean 3-fold Average Precision\")\n    ax.set_title(\"Training-only model comparison\")\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"model_comparison.png\", dpi=160)\n    plt.close(fig)\n\n    sampled = threshold_table.iloc[:: max(1, len(threshold_table) // 500)].copy()\n    fig, ax = plt.subplots(figsize=(9, 5))\n    ax.plot(sampled[\"threshold\"], sampled[\"precision\"], label=\"Precision\")\n    ax.plot(sampled[\"threshold\"], sampled[\"recall\"], label=\"Recall\")\n    ax.axvline(\n        chosen_threshold,\n        linestyle=\"--\",\n        label=f\"Chosen threshold = {chosen_threshold:.3f}\",\n    )\n    ax.set(\n        xlabel=\"Fraud-score threshold\",\n        ylabel=\"Metric value\",\n        ylim=(0, 1.02),\n    )\n    ax.set_title(\"Validation-only threshold trade-off\")\n    ax.legend()\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"threshold_tradeoff.png\", dpi=160)\n    plt.close(fig)\n\n    precision, recall, _ = precision_recall_curve(y_test, test_scores)\n    fig, ax = plt.subplots(figsize=(7, 5))\n    ax.plot(recall, precision)\n    ax.set(\n        xlabel=\"Recall\",\n        ylabel=\"Precision\",\n        xlim=(0, 1),\n        ylim=(0, 1.02),\n    )\n    ax.set_title(\"Final untouched-test precision-recall curve\")\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"precision_recall_curve.png\", dpi=160)\n    plt.close(fig)\n\n    fig, ax = plt.subplots(figsize=(7, 5))\n    ConfusionMatrixDisplay(\n        matrix,\n        display_labels=[\"Legitimate\", \"Fraud\"],\n    ).plot(ax=ax, colorbar=False, values_format=\"d\")\n    ax.set_title(\"Final untouched-test confusion matrix\")\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"confusion_matrix.png\", dpi=160)\n    plt.close(fig)\n\n\ndef save_demo_transactions(\n    bundle: dict,\n    X_test: pd.DataFrame,\n    y_test: pd.Series,\n) -> None:\n    scores = bundle[\"model\"].predict_proba(X_test)[:, 1]\n    demo = X_test.copy()\n    demo[\"historical_label\"] = y_test.to_numpy()\n    demo[\"fraud_score\"] = scores\n\n    fraud_examples = demo[demo[\"historical_label\"] == 1].nlargest(6, \"fraud_score\")\n    legitimate_examples = demo[demo[\"historical_label\"] == 0].nsmallest(6, \"fraud_score\")\n    selected = pd.concat(\n        [fraud_examples, legitimate_examples],\n        ignore_index=True,\n    )\n    selected.insert(\n        0,\n        \"example_id\",\n        [f\"TX-{index + 1:02d}\" for index in range(len(selected))],\n    )\n    selected.to_csv(OUTPUT_DIR / \"demo_transactions.csv\", index=False)\n\n\ndef main() -> None:\n    MODEL_DIR.mkdir(exist_ok=True)\n    OUTPUT_DIR.mkdir(exist_ok=True)\n\n    X, y = load_data()\n    X_train, X_val, X_test, y_train, y_val, y_test = split_data(X, y)\n\n    print(\n        f\"Rows -> train: {len(X_train):,}, validation: {len(X_val):,}, \"\n        f\"test: {len(X_test):,}\"\n    )\n    print(\n        f\"Fraud rows -> train: {int(y_train.sum())}, validation: {int(y_val.sum())}, \"\n        f\"test: {int(y_test.sum())}\"\n    )\n    print(f\"Always-legitimate accuracy: {(y == 0).mean():.6%}\")\n\n    comparison = compare_models(X_train, y_train)\n    print(\"\\nTraining-only model comparison:\")\n    print(comparison.to_string(index=False))\n\n    winner_name = str(comparison.iloc[0][\"model\"])\n    winner = clone(candidate_models()[winner_name])\n    winner.fit(X_train, y_train)\n\n    val_scores = winner.predict_proba(X_val)[:, 1]\n    threshold, threshold_table = choose_threshold(y_val, val_scores)\n    val_metrics, _ = metrics_at_threshold(y_val, val_scores, threshold)\n\n    X_build = pd.concat([X_train, X_val], axis=0)\n    y_build = pd.concat([y_train, y_val], axis=0)\n    final_model = clone(candidate_models()[winner_name])\n    final_model.fit(X_build, y_build)\n\n    test_scores = final_model.predict_proba(X_test)[:, 1]\n    test_metrics, matrix = metrics_at_threshold(y_test, test_scores, threshold)\n\n    bundle = {\n        \"model\": final_model,\n        \"threshold\": threshold,\n        \"features\": FEATURES,\n        \"selected_model\": winner_name,\n        \"target_recall\": TARGET_RECALL,\n    }\n    joblib.dump(bundle, MODEL_DIR / \"fraud_detector.joblib\")\n\n    reloaded = joblib.load(MODEL_DIR / \"fraud_detector.joblib\")\n    reload_scores = reloaded[\"model\"].predict_proba(X_test.iloc[:25])[:, 1]\n    if not np.allclose(reload_scores, test_scores[:25]):\n        raise RuntimeError(\"Reloaded fraud scores differ from in-memory scores.\")\n\n    save_demo_transactions(bundle, X_test, y_test)\n    save_figures(\n        y,\n        comparison,\n        threshold_table,\n        threshold,\n        y_test,\n        test_scores,\n        matrix,\n    )\n\n    report = {\n        \"python\": platform.python_version(),\n        \"scikit_learn\": sklearn.__version__,\n        \"rows\": int(len(X)),\n        \"fraud_rows\": int(y.sum()),\n        \"fraud_rate\": float(y.mean()),\n        \"features\": FEATURES,\n        \"seed\": SEED,\n        \"train_rows\": int(len(X_train)),\n        \"validation_rows\": int(len(X_val)),\n        \"test_rows\": int(len(X_test)),\n        \"selected_model\": winner_name,\n        \"selection_metric\": \"mean 3-fold average precision on training data\",\n        \"target_validation_recall\": TARGET_RECALL,\n        \"chosen_threshold\": threshold,\n        \"validation_metrics\": val_metrics,\n        \"test_metrics\": test_metrics,\n        \"confusion_matrix\": matrix.tolist(),\n        \"always_legitimate_accuracy\": float((y_test == 0).mean()),\n    }\n    (OUTPUT_DIR / \"metrics.json\").write_text(\n        json.dumps(report, indent=2) + \"\\n\",\n        encoding=\"utf-8\",\n    )\n\n    print(f\"\\nSelected model: {winner_name}\")\n    print(f\"Chosen validation threshold: {threshold:.6f}\")\n    print(\"Final untouched-test metrics:\")\n    for name, value in test_metrics.items():\n        print(f\"  {name}: {value:.6f}\")\n    print(\"Confusion matrix [[TN, FP], [FN, TP]]:\")\n    print(matrix)\n    print(\"Saved: models/fraud_detector.joblib\")\n\n\nif __name__ == \"__main__\":\n    main()\n";
const appCode = "\"\"\"Run with: python -m streamlit run app.py\"\"\"\n\nfrom __future__ import annotations\n\nfrom pathlib import Path\n\nimport joblib\nimport pandas as pd\nimport streamlit as st\n\nROOT = Path(__file__).resolve().parent\nMODEL_PATH = ROOT / \"models\" / \"fraud_detector.joblib\"\nDEMO_PATH = ROOT / \"outputs\" / \"demo_transactions.csv\"\n\nst.set_page_config(\n    page_title=\"Credit Card Fraud Detector\",\n    page_icon=\"💳\",\n    layout=\"wide\",\n)\nst.title(\"💳 Can AI Catch a Stolen Credit Card Transaction?\")\nst.caption(\n    \"Educational fraud-scoring demo using the public anonymized OpenML credit-card dataset\"\n)\nst.info(\n    \"This is not a banking or payment-security product. The historical dataset is anonymized, \"\n    \"and V1–V28 are PCA-transformed features whose original meanings are not public.\"\n)\n\n\n@st.cache_resource\ndef load_bundle():\n    return joblib.load(MODEL_PATH)\n\n\nif not MODEL_PATH.is_file() or not DEMO_PATH.is_file():\n    st.error(\"Training artifacts are missing.\")\n    st.code(\n        \"python download_data.py\\npython src/train_model.py\",\n        language=\"powershell\",\n    )\n    st.stop()\n\nbundle = load_bundle()\ndemos = pd.read_csv(DEMO_PATH)\nfeatures = bundle[\"features\"]\nthreshold = float(bundle[\"threshold\"])\n\nst.subheader(\"Score a verified holdout example\")\nselected_id = st.selectbox(\n    \"Transaction example\",\n    demos[\"example_id\"].tolist(),\n)\nrow = demos.loc[demos[\"example_id\"] == selected_id].iloc[0]\n\nleft, right, third = st.columns(3)\nleft.metric(\"Transaction amount\", f\"{float(row['Amount']):,.2f}\")\nright.metric(\"Seconds from dataset start\", f\"{float(row['Time']):,.0f}\")\nthird.metric(\"Decision threshold\", f\"{threshold:.3f}\")\n\nwith st.expander(\"See all anonymized model inputs\"):\n    st.dataframe(\n        pd.DataFrame([row[features].to_dict()]),\n        hide_index=True,\n        use_container_width=True,\n    )\n\nif st.button(\"Score transaction\", type=\"primary\"):\n    model_row = pd.DataFrame(\n        [[float(row[name]) for name in features]],\n        columns=features,\n    )\n    score = float(bundle[\"model\"].predict_proba(model_row)[0, 1])\n    flagged = score >= threshold\n\n    if flagged:\n        st.error(\"Model decision: FLAG FOR FRAUD REVIEW\")\n    else:\n        st.success(\"Model decision: do not flag at this threshold\")\n\n    metric_col, truth_col = st.columns(2)\n    metric_col.metric(\"Fraud score\", f\"{score:.1%}\")\n    historical_label = int(row[\"historical_label\"])\n    truth_col.metric(\n        \"Historical label\",\n        \"Fraud\" if historical_label == 1 else \"Legitimate\",\n    )\n\n    if flagged and historical_label == 1:\n        st.write(\n            \"This example is a **true positive**: the model flagged a transaction \"\n            \"historically labelled fraud.\"\n        )\n    elif flagged and historical_label == 0:\n        st.write(\n            \"This example is a **false positive**: a legitimate historical \"\n            \"transaction was flagged.\"\n        )\n    elif not flagged and historical_label == 1:\n        st.write(\n            \"This example is a **false negative**: a historical fraud was missed.\"\n        )\n    else:\n        st.write(\n            \"This example is a **true negative**: a legitimate transaction was not flagged.\"\n        )\n\nst.divider()\nst.caption(\n    \"Real fraud systems use richer live signals, cost-sensitive decisions, monitoring, \"\n    \"human review, security controls and continuously changing adversarial patterns.\"\n)\n";
const testCode = "from pathlib import Path\nimport importlib.util\nimport json\n\nimport joblib\nimport numpy as np\nimport pandas as pd\nimport pytest\n\nROOT = Path(__file__).resolve().parents[1]\nDATA = ROOT / \"data\" / \"creditcard.parquet\"\nMODEL = ROOT / \"models\" / \"fraud_detector.joblib\"\nMETRICS = ROOT / \"outputs\" / \"metrics.json\"\nDEMOS = ROOT / \"outputs\" / \"demo_transactions.csv\"\n\nspec = importlib.util.spec_from_file_location(\n    \"fraud_train\",\n    ROOT / \"src\" / \"train_model.py\",\n)\ntrain = importlib.util.module_from_spec(spec)\nspec.loader.exec_module(train)\n\n\ndef test_dataset_contract():\n    frame = pd.read_parquet(DATA)\n    assert frame.shape == (284_807, 31)\n    assert list(frame.columns) == train.FEATURES + [train.TARGET]\n    assert int(frame[\"Class\"].astype(int).sum()) == 492\n    assert set(frame[\"Class\"].astype(int).unique()) == {0, 1}\n\n\ndef test_three_way_split_is_disjoint_and_stratified():\n    X, y = train.load_data()\n    X_train, X_val, X_test, y_train, y_val, y_test = train.split_data(X, y)\n    assert len(X_train) + len(X_val) + len(X_test) == len(X)\n    assert set(X_train.index).isdisjoint(X_val.index)\n    assert set(X_train.index).isdisjoint(X_test.index)\n    assert set(X_val.index).isdisjoint(X_test.index)\n    for part in [y_train, y_val, y_test]:\n        assert 0 < int(part.sum()) < len(part)\n        assert abs(float(part.mean()) - float(y.mean())) < 0.0005\n\n\ndef test_candidates_include_imbalance_strategies():\n    candidates = train.candidate_models()\n    assert set(candidates) == {\n        \"Logistic Regression\",\n        \"Class-weighted Logistic Regression\",\n        \"SMOTE + Logistic Regression\",\n        \"Class-weighted Random Forest\",\n    }\n\n\ndef test_threshold_selection_meets_target_when_feasible():\n    y = pd.Series([0, 0, 0, 1, 1])\n    scores = np.array([0.05, 0.10, 0.20, 0.60, 0.90])\n    threshold, table = train.choose_threshold(y, scores, target_recall=1.0)\n    row = table.loc[np.isclose(table[\"threshold\"], threshold)].iloc[0]\n    assert row[\"recall\"] >= 1.0\n    assert 0 <= threshold <= 1\n\n\ndef test_saved_artifact_and_report_exist():\n    assert MODEL.is_file()\n    assert METRICS.is_file()\n    bundle = joblib.load(MODEL)\n    report = json.loads(METRICS.read_text(encoding=\"utf-8\"))\n    assert 0 < float(bundle[\"threshold\"]) < 1\n    assert bundle[\"selected_model\"] == report[\"selected_model\"]\n    assert report[\"selection_metric\"].startswith(\"mean 3-fold average precision\")\n\n\ndef test_final_metrics_are_probability_aware():\n    report = json.loads(METRICS.read_text(encoding=\"utf-8\"))\n    metrics = report[\"test_metrics\"]\n    assert 0 <= metrics[\"average_precision\"] <= 1\n    assert 0 <= metrics[\"roc_auc\"] <= 1\n    assert 0 <= metrics[\"precision\"] <= 1\n    assert 0 <= metrics[\"recall\"] <= 1\n    assert report[\"test_rows\"] > 40_000\n\n\ndef test_demo_transactions_cover_both_historical_classes():\n    demos = pd.read_csv(DEMOS)\n    assert len(demos) == 12\n    assert set(demos[\"historical_label\"].astype(int)) == {0, 1}\n    assert set(train.FEATURES).issubset(demos.columns)\n\n\n@pytest.mark.parametrize(\"example_index\", [0, 6])\ndef test_reloaded_model_scores_demo_rows(example_index):\n    bundle = joblib.load(MODEL)\n    demos = pd.read_csv(DEMOS)\n    row = demos.iloc[[example_index]][bundle[\"features\"]]\n    score = float(bundle[\"model\"].predict_proba(row)[0, 1])\n    assert 0 <= score <= 1\n";

const splitSnippet = "X_build, X_test, y_build, y_test = train_test_split(\n    X, y,\n    test_size=0.15,\n    stratify=y,\n    random_state=42,\n)\n\nX_train, X_val, y_train, y_val = train_test_split(\n    X_build, y_build,\n    test_size=0.15 / 0.85,\n    stratify=y_build,\n    random_state=42,\n)\n\n# 70% train | 15% validation | 15% final test";

const smoteSnippet = "smote_logistic = ImbPipeline([\n    (\"scale\", StandardScaler()),\n    (\"smote\", SMOTE(\n        sampling_strategy=0.10,\n        random_state=42,\n        k_neighbors=5,\n    )),\n    (\"model\", LogisticRegression(max_iter=1500)),\n])\n\n# During cross-validation SMOTE runs only inside each training fold.\n# Validation/test rows are never synthetically oversampled.";

const thresholdSnippet = "precision, recall, thresholds = precision_recall_curve(\n    y_val,\n    validation_scores,\n)\n\n# Among thresholds that reach at least 80% recall on validation,\n# choose the one with the highest precision.\nfeasible = table[table[\"recall\"] >= 0.80]\nchosen = feasible.sort_values(\n    [\"precision\", \"threshold\"],\n    ascending=[False, False],\n).iloc[0]";

const modelRows = [
  ['Class-weighted Random Forest', '0.8360', '0.9718', '0.8863', '0.7557', '0.8152'],
  ['SMOTE + Logistic Regression', '0.7700', '0.9778', '0.3479', '0.8546', '0.4944'],
  ['Logistic Regression', '0.7698', '0.9800', '0.8695', '0.6597', '0.7482'],
  ['Class-weighted Logistic Regression', '0.7693', '0.9799', '0.0664', '0.9127', '0.1239'],
];

export function CreditCardFraudProjectPage() {
  const project = projectPortfolioById['credit-card-fraud'];

  useEffect(() => {
    document.title = 'Credit Card Fraud Detector Project Handbook | LearnMLAcademy';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to projects
          </Link>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-rose-700">Project 3 · Imbalanced classification</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
            Build a fraud-scoring system where <strong>99.8% accuracy can still mean failure</strong>. You will learn why rare-event
            classification needs precision, recall, Average Precision, leakage-safe resampling and an explicit decision threshold.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-black text-rose-950">
            <Target className="h-5 w-5" aria-hidden="true" />
            The practical problem: which transactions should a fraud team investigate?
          </h2>
          <p className="mt-3 text-sm leading-7 text-rose-950">
            Imagine a payment company receives thousands of card transactions. Most are genuine. A tiny fraction are fraudulent.
            The system must assign each transaction a fraud score and decide which ones cross a review threshold.
          </p>
          <p className="mt-3 text-sm leading-7 text-rose-950">
            The trap is that a model can predict <strong>“legitimate” for everything</strong> and still be correct about 99.83% of
            this historical dataset. That model would catch <strong>zero fraud</strong>. Our goal is therefore not maximum accuracy.
            We need useful fraud recall while keeping false alarms low enough to be operationally sensible.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Input', '30 numerical signals: Time, Amount and anonymized PCA components V1–V28.'],
              ['Output', 'A fraud score plus a decision: flag for review or do not flag.'],
              ['Constraint', 'Only 492 of 284,807 transactions are fraud, so the classes are extremely imbalanced.'],
              ['Deliverable', 'A saved model + threshold and a Streamlit review app using untouched holdout examples.'],
            ].map(([label, body]) => (
              <div key={label} className="rounded-xl border border-rose-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-wide text-rose-700">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 overflow-x-auto">
            <div className="flex min-w-[830px] items-center gap-2 rounded-xl border border-rose-200 bg-white p-4 text-center text-xs font-bold text-slate-800">
              {[
                'OpenML data',
                '70/15/15 split',
                '4 imbalance strategies',
                '3-fold PR-based CV',
                'Choose model',
                'Tune threshold on validation',
                'Final test once',
                'Fraud-review app',
              ].map((item, index, items) => (
                <React.Fragment key={item}>
                  <div className="min-w-[90px] flex-1 rounded-lg bg-slate-100 px-2 py-3">{item}</div>
                  {index < items.length - 1 && <span className="text-lg text-rose-600">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-amber-950">The 99.83% accuracy trap — calculate it before building anything</h2>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            There are 284,807 transactions: 284,315 legitimate and only 492 fraud. If we predict every row as legitimate:
          </p>
          <div className="mt-4 rounded-xl border border-amber-200 bg-white p-4 text-center font-mono text-sm leading-8 text-slate-900">
            accuracy = 284,315 ÷ 284,807 = <strong>99.827%</strong><br />
            fraud recall = 0 ÷ 492 = <strong>0%</strong>
          </div>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            This one calculation explains the whole project: ordinary accuracy is not enough when the event we care about is rare.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-xl font-black text-slate-950">See the imbalance before modeling</h2>
          <Screenshot
            src="/project-handbooks/credit-card-fraud/class_imbalance.png"
            alt="Real class-imbalance chart showing legitimate and fraud transaction counts on a log scale"
            title="284,315 legitimate transactions versus 492 frauds"
            caption={<>Generated from the verified OpenML dataset. The logarithmic y-axis is necessary because the fraud bar would otherwise be almost invisible.</>}
          />
        </section>

        <HandbookSection id="dataset" number={1} title="Understand the public fraud dataset and its privacy limits" checkpoint={<>You can explain why V1–V28 are not given human-readable meanings.</>}>
          <p>
            We use OpenML dataset <strong>1597 — creditcard</strong>. It contains transactions made by European cardholders over two days,
            with 492 fraud cases among 284,807 transactions.
          </p>
          <p>
            The original sensitive transaction variables are not public. <code>V1</code> through <code>V28</code> are PCA-transformed
            numerical components. Only <code>Time</code> and <code>Amount</code> retain direct meanings. <code>Class=1</code> means fraud.
          </p>
          <p>
            That means this project can teach fraud-model engineering honestly, but it must not invent interpretations such as
            “V7 means merchant risk” or “V12 means cardholder age.” We simply do not know those original meanings.
          </p>
        </HandbookSection>

        <HandbookSection id="setup" number={2} title="Create the project environment" checkpoint={<>The environment installs without dependency conflicts.</>}>
          <HandbookCode code={requirementsCode} language="text" title="requirements.txt" type="config" />
          <HandbookCode
            code={'python -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install -r requirements.txt\npython -m pip check'}
            language="powershell"
            title="Windows PowerShell setup"
            type="runnable"
          />
        </HandbookSection>

        <HandbookSection id="download" number={3} title="Download the exact OpenML dataset reproducibly" checkpoint={<>The downloader reports 284,807 rows, 492 frauds and the expected SHA256 fingerprint.</>}>
          <p>
            The downloader first checks OpenML metadata, then downloads the official parquet file, verifies its SHA256 fingerprint,
            schema, row count and fraud count before saving it locally.
          </p>
          <details className="rounded-xl border border-slate-300 bg-slate-50 p-4">
            <summary className="cursor-pointer font-black">Open complete download_data.py</summary>
            <div className="mt-3"><HandbookCode code={downloadCode} language="python" title="download_data.py" type="runnable" /></div>
          </details>
          <HandbookCode code={'python download_data.py'} language="powershell" title="Download and verify" type="runnable" />
          <HandbookCode
            code={'Rows: 284,807\nColumns: 31\nFraud transactions: 492\nFraud rate: 0.172749%\nSHA256: b7efcb35a428bbe22347a05d2437d9177bab07ce61e51214a17bec584ad9496d'}
            language="text"
            title="Verified checkpoint"
            type="output"
          />
        </HandbookSection>

        <HandbookSection id="split" number={4} title="Create train, validation and final-test sets before experimentation" checkpoint={<>The split is 199,364 / 42,721 / 42,722 rows and fraud prevalence stays close across all three parts.</>}>
          <p>
            We need <strong>three</strong> sets because threshold selection is itself a modeling decision. Training data learns model
            parameters; validation data chooses the decision threshold; the final test set remains sealed until everything is fixed.
          </p>
          <HandbookCode code={splitSnippet} language="python" title="Leakage-safe 70 / 15 / 15 split" type="runnable" />
          <HandbookCode
            code={'Train: 199,364 rows / 344 frauds\nValidation: 42,721 rows / 74 frauds\nFinal test: 42,722 rows / 74 frauds'}
            language="text"
            title="Verified split"
            type="output"
          />
        </HandbookSection>

        <HandbookSection id="metrics" number={5} title="Use metrics that can see the rare class" checkpoint={<>You can explain precision, recall and Average Precision without relying on accuracy.</>}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-950">
              <strong>Precision = TP / (TP + FP)</strong><br />When we flag a transaction, how often is it actually fraud?
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-950">
              <strong>Recall = TP / (TP + FN)</strong><br />Of all actual frauds, how many did we catch?
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-950">
              <strong>F1</strong><br />A harmonic balance between precision and recall at one chosen threshold.
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-950">
              <strong>Average Precision</strong><br />Summarizes the precision-recall trade-off across thresholds and is especially useful for highly imbalanced binary problems.
            </div>
          </div>
        </HandbookSection>

        <HandbookSection id="strategies" number={6} title="Compare four ways to handle the imbalance" checkpoint={<>You can explain what changes between the plain, class-weighted, SMOTE and ensemble strategies.</>}>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <HandbookTable
              headers={['Strategy', 'What changes', 'What it teaches']}
              rows={[
                ['Logistic Regression', 'No special balancing', 'A clean probability baseline'],
                ['Class-weighted Logistic', 'Fraud mistakes receive more training weight', 'Cost-sensitive learning'],
                ['SMOTE + Logistic', 'Synthetic minority examples are generated inside training folds', 'Resampling without leakage'],
                ['Class-weighted Random Forest', 'Weighted ensemble of decision trees', 'Non-linear ensemble learning'],
              ]}
            />
          </div>
        </HandbookSection>

        <HandbookSection id="smote" number={7} title="Use SMOTE inside the pipeline — never before the split" checkpoint={<>You can explain why oversampling the full dataset would contaminate evaluation.</>}>
          <p>
            SMOTE creates synthetic minority examples by interpolating between existing fraud examples. If you SMOTE before splitting,
            information derived from a transaction can leak into validation/test data and make evaluation too optimistic.
          </p>
          <HandbookCode code={smoteSnippet} language="python" title="Correct leakage-safe pattern" type="runnable" />
        </HandbookSection>

        <HandbookSection id="training" number={8} title="Build the training program in logical pieces, then assemble it" checkpoint={<>You can trace data → candidates → CV → threshold → final test → saved bundle.</>}>
          <p>
            The complete file is intentionally shown only after the architecture is clear. Read it as six blocks:
            load → split → candidate models → cross-validation → validation threshold → final evaluation/save.
          </p>
          <details className="rounded-xl border border-slate-300 bg-slate-50 p-4">
            <summary className="cursor-pointer font-black">Open complete verified src/train_model.py</summary>
            <div className="mt-3"><HandbookCode code={trainingCode} language="python" title="src/train_model.py" type="runnable" /></div>
          </details>
        </HandbookSection>

        <HandbookSection id="compare" number={9} title="Select the model by training-only Average Precision" checkpoint={<>Class-weighted Random Forest has the highest mean 3-fold Average Precision: 0.8360.</>}>
          <HandbookTable
            headers={['Model', 'Avg Precision', 'ROC-AUC', 'Precision @ .5', 'Recall @ .5', 'F1 @ .5']}
            rows={modelRows}
          />
          <Screenshot
            src="/project-handbooks/credit-card-fraud/model_comparison.png"
            alt="Real bar chart comparing four fraud-detection models by training-only Average Precision"
            title="Training-only model comparison"
            caption={<>The class-weighted Random Forest ranked first by the metric we chose before looking at the final test set.</>}
          />
          <p>
            Notice the trade-off: class-weighted Logistic Regression reaches very high recall at the default 0.5 threshold but precision
            collapses to about 6.6%. Catching more fraud is useful only if the false-alarm cost remains acceptable.
          </p>
        </HandbookSection>

        <HandbookSection id="threshold" number={10} title="Tune the decision threshold on validation data, not the final test" checkpoint={<>The chosen threshold is 0.673629 and you understand why 0.5 is not sacred.</>}>
          <p>
            A probability model gives a score. The threshold converts that score into an operational decision. We ask for at least
            80% recall on the validation set, then choose the threshold with the highest precision among those feasible points.
          </p>
          <HandbookCode code={thresholdSnippet} language="python" title="Validation-only threshold rule" type="runnable" />
          <Screenshot
            src="/project-handbooks/credit-card-fraud/threshold_tradeoff.png"
            alt="Real validation-only precision and recall curves across fraud-score thresholds"
            title="Changing the threshold changes the business trade-off"
            caption={<>Lower thresholds generally catch more fraud but also create more false alarms. The dashed line marks the chosen validation threshold.</>}
          />
          <p>
            Important: meeting an 80% recall target on validation does <strong>not</strong> guarantee 80% recall on future/test data.
            The untouched test recall became 74.3%. That difference is exactly why we keep a final test set.
          </p>
        </HandbookSection>

        <HandbookSection id="final-test" number={11} title="Open the sealed test set once and interpret every error" checkpoint={<>You can derive precision and recall from 42,641 TN, 7 FP, 19 FN and 55 TP.</>}>
          <div className="grid gap-4 lg:grid-cols-2">
            <Screenshot
              src="/project-handbooks/credit-card-fraud/confusion_matrix.png"
              alt="Real final fraud test confusion matrix with 42641 true negatives, 7 false positives, 19 false negatives and 55 true positives"
              title="Final untouched-test confusion matrix"
              caption={<>42,722 transactions were evaluated only after model family and threshold had already been fixed.</>}
            />
            <Screenshot
              src="/project-handbooks/credit-card-fraud/precision_recall_curve.png"
              alt="Real precision-recall curve on the final untouched fraud test set"
              title="Final precision-recall curve"
              caption={<>Average Precision on the untouched test set was 0.7874.</>}
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>Precision</strong> = 55 / (55 + 7) = <strong>88.71%</strong>.</div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>Recall</strong> = 55 / (55 + 19) = <strong>74.32%</strong>.</div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>F1</strong> = <strong>0.8088</strong>.</div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>ROC-AUC</strong> = <strong>0.9643</strong>, while Average Precision = <strong>0.7874</strong>.</div>
          </div>
        </HandbookSection>

        <HandbookSection id="app" number={12} title="Turn the model + threshold into a fraud-review application" checkpoint={<>The app scores a real holdout example and explains TP, FP, FN or TN.</>}>
          <p>
            A user does not type V1–V28 from memory. In a real payment system those features would arrive from the transaction pipeline.
            Our educational app therefore lets you select a verified holdout example, inspect its anonymized inputs, score it and compare
            the decision with the historical label.
          </p>
          <details className="rounded-xl border border-slate-300 bg-slate-50 p-4">
            <summary className="cursor-pointer font-black">Open complete app.py</summary>
            <div className="mt-3"><HandbookCode code={appCode} language="python" title="app.py" type="runnable" /></div>
          </details>
          <HandbookCode code={'python -m streamlit run app.py'} language="powershell" title="Start the app" type="runnable" />
          <Screenshot
            src="/project-handbooks/credit-card-fraud/fraud-app-form.png"
            alt="Real Streamlit credit-card fraud scoring form using a verified holdout transaction"
            title="Real fraud-review app"
            caption={<>The app displays Amount, Time and the learned decision threshold before scoring.</>}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Screenshot
              src="/project-handbooks/credit-card-fraud/fraud-app-flagged-example.png"
              alt="Real Streamlit fraud example flagged for review"
              title="Flagged holdout example"
              caption={<>A real holdout fraud example scored by the saved model and threshold.</>}
            />
            <Screenshot
              src="/project-handbooks/credit-card-fraud/fraud-app-legitimate-example.png"
              alt="Real Streamlit legitimate example not flagged at the fraud threshold"
              title="Legitimate holdout example"
              caption={<>A contrasting legitimate holdout example follows the same inference path.</>}
            />
          </div>
        </HandbookSection>

        <HandbookSection id="tests" number={13} title="Run automated checks so screenshots are not your only proof" checkpoint={<>pytest finishes without failure.</>}>
          <p>
            The suite checks the exact dataset contract, split separation, class prevalence, four candidate strategies, threshold logic,
            saved artifact/report consistency, probability-aware final metrics and both historical classes in the demo set.
          </p>
          <details className="rounded-xl border border-slate-300 bg-slate-50 p-4">
            <summary className="cursor-pointer font-black">Open tests/test_fraud_detector.py</summary>
            <div className="mt-3"><HandbookCode code={testCode} language="python" title="tests/test_fraud_detector.py" type="runnable" /></div>
          </details>
          <HandbookCode code={'pytest -q'} language="powershell" title="Run tests" type="runnable" />
        </HandbookSection>

        <HandbookSection id="alternatives" number={14} title="Know what SMOTE and supervised classification do not solve" checkpoint={<>You can name at least two reasons a production fraud system needs more than this model.</>}>
          <p>
            Fraud patterns change because attackers adapt. The dataset is historical and anonymized, has only two days of transactions,
            and does not expose customer/device/merchant/network context. A production system would need temporal validation, drift
            monitoring, calibrated decision costs, security controls and human-review workflows.
          </p>
          <p>
            <strong>Anomaly detection</strong> is another family of techniques. For example, Isolation Forest looks for observations
            that are easier to isolate than normal ones. It can help when labels are scarce, but “unusual” is not automatically the
            same as “fraud,” so it is an extension rather than a magic replacement.
          </p>
        </HandbookSection>

        <HandbookSection id="project-tree" number={15} title="Understand the complete project folder" checkpoint={<>You can point to the file responsible for data acquisition, training, tests and browser inference.</>}>
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm">
            credit-card-fraud/<br />
            ├── data/creditcard.parquet <span className="text-slate-400"># downloaded locally</span><br />
            ├── models/fraud_detector.joblib <span className="text-slate-400"># generated model + threshold</span><br />
            ├── outputs/ <span className="text-slate-400"># metrics, plots, demo rows</span><br />
            ├── scripts/capture_app_screenshots.py<br />
            ├── src/train_model.py<br />
            ├── tests/test_fraud_detector.py<br />
            ├── app.py<br />
            ├── download_data.py<br />
            ├── requirements.txt<br />
            └── README.md
          </div>
        </HandbookSection>

        <section className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-fuchsia-950">Now change the project yourself</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-fuchsia-950">
            <p><strong>Exercise 1:</strong> Change the validation recall target from 80% to 90%. Record what happens to precision and false positives.</p>
            <p><strong>Exercise 2:</strong> Remove SMOTE and compare class weighting alone. Explain why resampling is not automatically better.</p>
            <p><strong>Exercise 3:</strong> Try an Isolation Forest as an anomaly-detection extension and compare its ranking with the supervised model.</p>
            <p><strong>Exercise 4:</strong> Define a simple cost where missing fraud costs 20× more than reviewing a legitimate transaction. Choose a threshold using cost instead of recall.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-blue-950">How to explain this project in an interview</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-blue-950">
            {[
              ['Why is 99.8% accuracy useless here?', 'Because the majority class is so dominant that predicting every transaction as legitimate achieves that accuracy while fraud recall is zero.'],
              ['Why Average Precision?', 'It evaluates the precision-recall ranking across thresholds and focuses attention on performance for the rare positive class.'],
              ['Why is SMOTE inside a pipeline?', 'So synthetic minority samples are created only from each training fold; validation and test rows remain natural and uncontaminated.'],
              ['Why have validation and test separately?', 'Threshold selection uses validation data. The final test must remain untouched so it measures the completed decision process.'],
              ['Why did validation target recall not equal test recall?', 'A threshold chosen on one finite sample will not reproduce identical metrics on unseen data. That generalization gap is real evidence, not an error to hide.'],
            ].map(([q,a]) => (
              <div key={q} className="rounded-xl border border-blue-200 bg-white p-4">
                <p className="font-black">{q}</p><p className="mt-1">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-emerald-950">Implementation mastery check</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              'Why does always-legitimate prediction reach about 99.83% accuracy?',
              'What is the difference between precision and recall in fraud review?',
              'Why is PR-oriented evaluation especially useful here?',
              'What does class_weight="balanced" change?',
              'What exactly does SMOTE create?',
              'Why must SMOTE stay inside training folds?',
              'Why do we need a validation set for threshold selection?',
              'What does a threshold of 0.674 mean operationally?',
              'How do 55 TP, 7 FP and 19 FN produce the final precision and recall?',
              'Why can validation recall be 80% while test recall is 74.3%?',
              'What is stored inside fraud_detector.joblib?',
              'Why are V1–V28 not given business meanings?',
              'When might anomaly detection be useful?',
              'What would you add before deploying fraud detection at a real bank?',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-white p-3 text-sm leading-6 text-emerald-950">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
            <FolderTree className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            Complete-project checkpoint
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              'Public OpenML dataset fingerprint verified',
              'Extreme class imbalance visualized',
              '70/15/15 stratified split created',
              'Accuracy trap calculated',
              'Four imbalance strategies compared',
              'SMOTE kept inside training folds',
              'Model selected by training-only Average Precision',
              'Threshold selected on validation only',
              'Final test opened once',
              'Precision/recall derived from confusion counts',
              'Model + threshold saved and reloaded',
              'Streamlit app scores real holdout examples',
              'Automated tests verify contracts',
              'You can explain limitations and extensions',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
