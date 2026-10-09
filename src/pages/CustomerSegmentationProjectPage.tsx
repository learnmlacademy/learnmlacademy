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

const requirementsCode = "pandas==3.0.6\nnumpy==2.5.3\npyarrow==21.0.0\nopenpyxl==3.1.5\nscikit-learn==1.9.1\nmatplotlib==3.11.2\njoblib==1.6.0\nstreamlit==1.65.0\npytest==9.0.2\n";
const downloadCode = "\"\"\"Download and validate UCI Online Retail for the customer-segmentation project.\"\"\"\n\nfrom __future__ import annotations\n\nfrom io import BytesIO\nfrom pathlib import Path\nimport hashlib\nimport zipfile\nimport urllib.request\n\nimport pandas as pd\n\nROOT = Path(__file__).resolve().parent\nDATA_DIR = ROOT / \"data\"\nXLSX_PATH = DATA_DIR / \"Online Retail.xlsx\"\nPARQUET_PATH = DATA_DIR / \"online_retail.parquet\"\n\nSOURCE_URL = \"https://archive.ics.uci.edu/static/public/352/online+retail.zip\"\nEXPECTED_ROWS = 541_909\nEXPECTED_COLUMNS = [\n    \"InvoiceNo\",\n    \"StockCode\",\n    \"Description\",\n    \"Quantity\",\n    \"InvoiceDate\",\n    \"UnitPrice\",\n    \"CustomerID\",\n    \"Country\",\n]\n# Fingerprint recorded from verified official UCI archive and enforced on every download.\nEXPECTED_ZIP_SHA256 = \"f5385cbb54bbebf7196389109c6b0621faab0c304e3702548165e71c84aede8b\"\n\n\ndef download_bytes(url: str) -> bytes:\n    request = urllib.request.Request(\n        url,\n        headers={\"User-Agent\": \"LearnMLAcademy-customer-segmentation-handbook/1.0\"},\n    )\n    with urllib.request.urlopen(request, timeout=180) as response:\n        return response.read()\n\n\ndef main() -> None:\n    DATA_DIR.mkdir(parents=True, exist_ok=True)\n\n    raw = download_bytes(SOURCE_URL)\n    sha256 = hashlib.sha256(raw).hexdigest()\n    if EXPECTED_ZIP_SHA256 and sha256 != EXPECTED_ZIP_SHA256:\n        raise RuntimeError(\n            \"UCI dataset archive fingerprint changed: \"\n            f\"{sha256}; expected {EXPECTED_ZIP_SHA256}. Review before continuing.\"\n        )\n\n    with zipfile.ZipFile(BytesIO(raw)) as archive:\n        names = archive.namelist()\n        workbook_name = next(\n            (name for name in names if name.lower().endswith(\".xlsx\")),\n            None,\n        )\n        if workbook_name is None:\n            raise RuntimeError(f\"Expected an XLSX workbook in archive, found: {names}\")\n        XLSX_PATH.write_bytes(archive.read(workbook_name))\n\n    frame = pd.read_excel(XLSX_PATH, engine=\"openpyxl\")\n    if len(frame) != EXPECTED_ROWS:\n        raise RuntimeError(\n            f\"Unexpected row count {len(frame):,}; expected {EXPECTED_ROWS:,}.\"\n        )\n    if list(frame.columns) != EXPECTED_COLUMNS:\n        raise RuntimeError(\n            f\"Unexpected schema {list(frame.columns)!r}; expected {EXPECTED_COLUMNS!r}.\"\n        )\n\n    # Excel stores some identifier columns with mixed numeric/string values.\n    # Normalize text identifiers before writing Parquet so Arrow does not\n    # attempt to coerce cancellation invoice numbers such as \"C536379\" to int.\n    for column in [\"InvoiceNo\", \"StockCode\", \"Description\", \"Country\"]:\n        frame[column] = frame[column].astype(\"string\")\n\n    frame.to_parquet(PARQUET_PATH, index=False)\n\n    print(\"UCI dataset: Online Retail (dataset 352)\")\n    print(f\"Rows: {len(frame):,}\")\n    print(f\"Columns: {len(frame.columns)}\")\n    print(f\"CustomerID missing: {int(frame['CustomerID'].isna().sum()):,}\")\n    print(f\"Archive SHA256: {sha256}\")\n    print(f\"Saved workbook: {XLSX_PATH}\")\n    print(f\"Saved parquet: {PARQUET_PATH}\")\n\n\nif __name__ == \"__main__\":\n    main()\n";
const buildCode = "\"\"\"Build RFM customer segments from the UCI Online Retail dataset.\"\"\"\n\nfrom __future__ import annotations\n\nfrom pathlib import Path\nimport json\n\nimport joblib\nimport matplotlib.pyplot as plt\nimport numpy as np\nimport pandas as pd\nfrom sklearn.cluster import AgglomerativeClustering, DBSCAN, KMeans\nfrom sklearn.decomposition import PCA\nfrom sklearn.metrics import silhouette_score\nfrom sklearn.preprocessing import StandardScaler\n\nROOT = Path(__file__).resolve().parents[1]\nDATA_PATH = ROOT / \"data\" / \"online_retail.parquet\"\nMODEL_DIR = ROOT / \"models\"\nOUTPUT_DIR = ROOT / \"outputs\"\nRANDOM_STATE = 42\nRFM_COLUMNS = [\"recency_days\", \"frequency_orders\", \"monetary_value\"]\n\n\ndef load_transactions() -> pd.DataFrame:\n    if not DATA_PATH.is_file():\n        raise FileNotFoundError(\n            \"Dataset is missing. Run python download_data.py first.\"\n        )\n    frame = pd.read_parquet(DATA_PATH).copy()\n    frame[\"InvoiceNo\"] = frame[\"InvoiceNo\"].astype(str)\n    frame[\"InvoiceDate\"] = pd.to_datetime(frame[\"InvoiceDate\"], errors=\"raise\")\n    frame[\"CustomerID\"] = pd.to_numeric(frame[\"CustomerID\"], errors=\"coerce\")\n    return frame\n\n\ndef clean_transactions(frame: pd.DataFrame) -> pd.DataFrame:\n    cleaned = frame.loc[\n        frame[\"CustomerID\"].notna()\n        & ~frame[\"InvoiceNo\"].str.upper().str.startswith(\"C\")\n        & (frame[\"Quantity\"] > 0)\n        & (frame[\"UnitPrice\"] > 0)\n    ].copy()\n    cleaned[\"CustomerID\"] = cleaned[\"CustomerID\"].astype(int).astype(str)\n    cleaned[\"revenue\"] = cleaned[\"Quantity\"].astype(float) * cleaned[\"UnitPrice\"].astype(float)\n    return cleaned\n\n\ndef build_rfm(cleaned: pd.DataFrame) -> tuple[pd.DataFrame, pd.Timestamp]:\n    snapshot = cleaned[\"InvoiceDate\"].max().normalize() + pd.Timedelta(days=1)\n    rfm = (\n        cleaned.groupby(\"CustomerID\", as_index=False)\n        .agg(\n            last_purchase=(\"InvoiceDate\", \"max\"),\n            frequency_orders=(\"InvoiceNo\", \"nunique\"),\n            monetary_value=(\"revenue\", \"sum\"),\n            items_bought=(\"Quantity\", \"sum\"),\n        )\n    )\n    rfm[\"recency_days\"] = (\n        snapshot - rfm[\"last_purchase\"].dt.normalize()\n    ).dt.days.astype(int)\n    rfm[\"average_order_value\"] = (\n        rfm[\"monetary_value\"] / rfm[\"frequency_orders\"]\n    )\n    rfm = rfm[\n        [\n            \"CustomerID\",\n            \"recency_days\",\n            \"frequency_orders\",\n            \"monetary_value\",\n            \"items_bought\",\n            \"average_order_value\",\n        ]\n    ].copy()\n    return rfm, snapshot\n\n\ndef transform_rfm(rfm: pd.DataFrame) -> tuple[StandardScaler, np.ndarray]:\n    # log1p reduces the extreme right skew while keeping zero-safe arithmetic.\n    logged = np.log1p(rfm[RFM_COLUMNS].astype(float))\n    scaler = StandardScaler()\n    matrix = scaler.fit_transform(logged)\n    return scaler, matrix\n\n\ndef compare_kmeans(matrix: np.ndarray) -> pd.DataFrame:\n    rows = []\n    sample_size = min(5000, len(matrix))\n    for k in range(2, 9):\n        model = KMeans(\n            n_clusters=k,\n            n_init=20,\n            random_state=RANDOM_STATE,\n        )\n        labels = model.fit_predict(matrix)\n        silhouette = silhouette_score(\n            matrix,\n            labels,\n            sample_size=sample_size,\n            random_state=RANDOM_STATE,\n        )\n        rows.append(\n            {\n                \"k\": k,\n                \"inertia\": float(model.inertia_),\n                \"silhouette\": float(silhouette),\n            }\n        )\n    return pd.DataFrame(rows)\n\n\ndef safe_silhouette(matrix: np.ndarray, labels: np.ndarray) -> float | None:\n    mask = labels != -1\n    unique = np.unique(labels[mask])\n    if len(unique) < 2 or int(mask.sum()) < 3:\n        return None\n    return float(\n        silhouette_score(\n            matrix[mask],\n            labels[mask],\n            sample_size=min(5000, int(mask.sum())),\n            random_state=RANDOM_STATE,\n        )\n    )\n\n\ndef build_segment_names(\n    rfm: pd.DataFrame,\n    labels: np.ndarray,\n) -> tuple[pd.DataFrame, dict[int, str]]:\n    profiled = rfm.copy()\n    profiled[\"cluster\"] = labels\n    profiles = (\n        profiled.groupby(\"cluster\")\n        .agg(\n            customers=(\"CustomerID\", \"count\"),\n            recency_days=(\"recency_days\", \"mean\"),\n            frequency_orders=(\"frequency_orders\", \"mean\"),\n            monetary_value=(\"monetary_value\", \"mean\"),\n            average_order_value=(\"average_order_value\", \"mean\"),\n        )\n        .reset_index()\n    )\n\n    z = profiles[[\"recency_days\", \"frequency_orders\", \"monetary_value\"]].copy()\n    for column in z:\n        std = float(z[column].std(ddof=0))\n        if std == 0:\n            z[column] = 0.0\n        else:\n            z[column] = (z[column] - z[column].mean()) / std\n    profiles[\"value_score\"] = (\n        -z[\"recency_days\"] + z[\"frequency_orders\"] + z[\"monetary_value\"]\n    )\n\n    # Human-readable labels are *interpretations of measured RFM*, not fixed\n    # names assigned by arbitrary cluster rank. The thresholds below are\n    # explicit teaching heuristics, not learned business ground truth.\n    def describe(row: pd.Series) -> str:\n        days, orders, spend = (\n            float(row[\"recency_days\"]),\n            float(row[\"frequency_orders\"]),\n            float(row[\"monetary_value\"]),\n        )\n        if days <= 45 and orders >= 3 and spend >= 2000:\n            return \"High-value active customers\"\n        if days <= 45 and orders >= 3:\n            return \"Active repeat customers\"\n        if days <= 45:\n            return \"Recent occasional customers\"\n        if days > 90 and orders < 3:\n            return \"Lapsing occasional customers\"\n        if days > 90:\n            return \"Lapsing repeat customers\"\n        if orders >= 3:\n            return \"Repeat customers needing re-engagement\"\n        return \"Occasional customers needing re-engagement\"\n\n    names: dict[int, str] = {}\n    used: set[str] = set()\n    for _, row in profiles.sort_values(\"value_score\", ascending=False).iterrows():\n        cluster = int(row[\"cluster\"])\n        label = describe(row)\n        if label in used:\n            label = f\"{label} (group {cluster})\"\n        used.add(label)\n        names[cluster] = label\n    profiles[\"segment_name\"] = profiles[\"cluster\"].map(names)\n    return profiles.sort_values(\"value_score\", ascending=False), names\n\n\ndef save_figures(\n    rfm: pd.DataFrame,\n    matrix: np.ndarray,\n    labels: np.ndarray,\n    k_table: pd.DataFrame,\n    profiles: pd.DataFrame,\n    method_rows: list[dict],\n) -> None:\n    OUTPUT_DIR.mkdir(exist_ok=True)\n\n    fig, axes = plt.subplots(1, 3, figsize=(13, 4))\n    for ax, column, title in zip(\n        axes,\n        RFM_COLUMNS,\n        [\"Recency\", \"Frequency\", \"Monetary value\"],\n    ):\n        ax.hist(rfm[column], bins=40)\n        ax.set_title(title)\n        ax.set_xlabel(column)\n        ax.set_ylabel(\"Customers\")\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"rfm_distributions.png\", dpi=160)\n    plt.close(fig)\n\n    fig, ax1 = plt.subplots(figsize=(8, 5))\n    ax1.plot(k_table[\"k\"], k_table[\"silhouette\"], marker=\"o\")\n    ax1.set_xlabel(\"Number of K-Means clusters (k)\")\n    ax1.set_ylabel(\"Silhouette score\")\n    ax1.set_title(\"Choose k using separation, not guesswork\")\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"k_selection.png\", dpi=160)\n    plt.close(fig)\n\n    pca = PCA(n_components=2, random_state=RANDOM_STATE)\n    coords = pca.fit_transform(matrix)\n    fig, ax = plt.subplots(figsize=(8, 6))\n    scatter = ax.scatter(coords[:, 0], coords[:, 1], c=labels, s=12, alpha=0.65)\n    ax.set_xlabel(\"PCA component 1\")\n    ax.set_ylabel(\"PCA component 2\")\n    ax.set_title(\"Customer segments projected to two dimensions\")\n    fig.colorbar(scatter, ax=ax, label=\"Cluster\")\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"pca_segments.png\", dpi=160)\n    plt.close(fig)\n\n    profile_plot = profiles.sort_values(\"value_score\", ascending=False)\n    fig, ax = plt.subplots(figsize=(9, 5))\n    x = np.arange(len(profile_plot))\n    width = 0.25\n    standardized = profile_plot[\n        [\"recency_days\", \"frequency_orders\", \"monetary_value\"]\n    ].copy()\n    for column in standardized:\n        std = float(standardized[column].std(ddof=0))\n        standardized[column] = (\n            0.0\n            if std == 0\n            else (standardized[column] - standardized[column].mean()) / std\n        )\n    ax.bar(x - width, -standardized[\"recency_days\"], width, label=\"Recency strength\")\n    ax.bar(x, standardized[\"frequency_orders\"], width, label=\"Frequency\")\n    ax.bar(x + width, standardized[\"monetary_value\"], width, label=\"Monetary\")\n    ax.set_xticks(x)\n    ax.set_xticklabels(profile_plot[\"segment_name\"], rotation=20, ha=\"right\")\n    ax.set_title(\"How the selected segments differ\")\n    ax.legend()\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"cluster_profiles.png\", dpi=160)\n    plt.close(fig)\n\n    methods = pd.DataFrame(method_rows)\n    valid = methods.dropna(subset=[\"silhouette\"])\n    fig, ax = plt.subplots(figsize=(8, 4.5))\n    ax.bar(valid[\"method\"], valid[\"silhouette\"])\n    ax.set_ylabel(\"Silhouette score\")\n    ax.set_title(\"Clustering-method comparison\")\n    ax.tick_params(axis=\"x\", rotation=15)\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"method_comparison.png\", dpi=160)\n    plt.close(fig)\n\n\ndef main() -> None:\n    MODEL_DIR.mkdir(exist_ok=True)\n    OUTPUT_DIR.mkdir(exist_ok=True)\n\n    raw = load_transactions()\n    cleaned = clean_transactions(raw)\n    rfm, snapshot = build_rfm(cleaned)\n    scaler, matrix = transform_rfm(rfm)\n\n    k_table = compare_kmeans(matrix)\n    selected_k = int(\n        k_table.sort_values(\n            [\"silhouette\", \"k\"],\n            ascending=[False, True],\n        ).iloc[0][\"k\"]\n    )\n\n    kmeans = KMeans(\n        n_clusters=selected_k,\n        n_init=30,\n        random_state=RANDOM_STATE,\n    )\n    kmeans_labels = kmeans.fit_predict(matrix)\n    kmeans_silhouette = float(\n        silhouette_score(\n            matrix,\n            kmeans_labels,\n            sample_size=min(5000, len(matrix)),\n            random_state=RANDOM_STATE,\n        )\n    )\n\n    hierarchical = AgglomerativeClustering(n_clusters=selected_k)\n    hierarchical_labels = hierarchical.fit_predict(matrix)\n    hierarchical_silhouette = float(\n        silhouette_score(\n            matrix,\n            hierarchical_labels,\n            sample_size=min(5000, len(matrix)),\n            random_state=RANDOM_STATE,\n        )\n    )\n\n    dbscan = DBSCAN(eps=0.65, min_samples=8)\n    dbscan_labels = dbscan.fit_predict(matrix)\n    dbscan_silhouette = safe_silhouette(matrix, dbscan_labels)\n\n    profiles, names = build_segment_names(rfm, kmeans_labels)\n    segmented = rfm.copy()\n    segmented[\"cluster\"] = kmeans_labels\n    segmented[\"segment_name\"] = segmented[\"cluster\"].map(names)\n\n    method_rows = [\n        {\n            \"method\": f\"K-Means (k={selected_k})\",\n            \"silhouette\": kmeans_silhouette,\n            \"clusters\": selected_k,\n            \"noise_customers\": 0,\n        },\n        {\n            \"method\": f\"Hierarchical (k={selected_k})\",\n            \"silhouette\": hierarchical_silhouette,\n            \"clusters\": selected_k,\n            \"noise_customers\": 0,\n        },\n        {\n            \"method\": \"DBSCAN\",\n            \"silhouette\": dbscan_silhouette,\n            \"clusters\": int(len(set(dbscan_labels)) - (1 if -1 in dbscan_labels else 0)),\n            \"noise_customers\": int((dbscan_labels == -1).sum()),\n        },\n    ]\n\n    k_table.to_csv(OUTPUT_DIR / \"kmeans_k_comparison.csv\", index=False)\n    pd.DataFrame(method_rows).to_csv(\n        OUTPUT_DIR / \"clustering_method_comparison.csv\",\n        index=False,\n    )\n    profiles.to_csv(OUTPUT_DIR / \"segment_profiles.csv\", index=False)\n    segmented.to_csv(OUTPUT_DIR / \"customer_segments.csv\", index=False)\n\n    bundle = {\n        \"scaler\": scaler,\n        \"kmeans\": kmeans,\n        \"rfm_columns\": RFM_COLUMNS,\n        \"segment_names\": names,\n        \"segment_profiles\": profiles,\n        \"snapshot_date\": str(snapshot.date()),\n        \"selected_k\": selected_k,\n    }\n    joblib.dump(bundle, MODEL_DIR / \"customer_segmenter.joblib\")\n    reloaded = joblib.load(MODEL_DIR / \"customer_segmenter.joblib\")\n\n    example = pd.DataFrame(\n        [{\"recency_days\": 30, \"frequency_orders\": 5, \"monetary_value\": 800.0}]\n    )\n    example_matrix = reloaded[\"scaler\"].transform(np.log1p(example[RFM_COLUMNS]))\n    example_cluster = int(reloaded[\"kmeans\"].predict(example_matrix)[0])\n\n    metrics = {\n        \"raw_rows\": int(len(raw)),\n        \"clean_purchase_rows\": int(len(cleaned)),\n        \"customers\": int(len(rfm)),\n        \"snapshot_date\": str(snapshot.date()),\n        \"selected_k\": selected_k,\n        \"kmeans_silhouette\": kmeans_silhouette,\n        \"hierarchical_silhouette\": hierarchical_silhouette,\n        \"dbscan_silhouette\": dbscan_silhouette,\n        \"dbscan_noise_customers\": int((dbscan_labels == -1).sum()),\n        \"example_cluster\": example_cluster,\n        \"example_segment\": names[example_cluster],\n    }\n    (OUTPUT_DIR / \"metrics.json\").write_text(\n        json.dumps(metrics, indent=2) + \"\\n\",\n        encoding=\"utf-8\",\n    )\n\n    save_figures(\n        rfm,\n        matrix,\n        kmeans_labels,\n        k_table,\n        profiles,\n        method_rows,\n    )\n\n    print(\"Customer segmentation build completed.\")\n    print(json.dumps(metrics, indent=2))\n    print(\"\\nSelected K-Means profiles:\")\n    print(\n        profiles[\n            [\n                \"cluster\",\n                \"segment_name\",\n                \"customers\",\n                \"recency_days\",\n                \"frequency_orders\",\n                \"monetary_value\",\n            ]\n        ].to_string(index=False)\n    )\n\n\nif __name__ == \"__main__\":\n    main()\n";
const appCode = "\"\"\"Run from the project root with: python -m streamlit run app.py\"\"\"\n\nfrom pathlib import Path\n\nimport joblib\nimport numpy as np\nimport pandas as pd\nimport streamlit as st\n\nROOT = Path(__file__).resolve().parent\nMODEL_PATH = ROOT / \"models\" / \"customer_segmenter.joblib\"\nRFM_COLUMNS = [\"recency_days\", \"frequency_orders\", \"monetary_value\"]\n\nst.set_page_config(\n    page_title=\"Customer Segmentation\",\n    page_icon=\"🛍️\",\n    layout=\"wide\",\n)\nst.title(\"How Amazon Knows What Kind of Customer You Are\")\nst.caption(\n    \"Educational customer-segmentation project using UCI Online Retail data • \"\n    \"not Amazon data or Amazon's production algorithm\"\n)\n\nif not MODEL_PATH.is_file():\n    st.error(\"The saved customer-segmentation artifact is missing.\")\n    st.code(\n        \"python download_data.py\\npython src/build_segments.py\",\n        language=\"powershell\",\n    )\n    st.stop()\n\n\n@st.cache_resource\ndef load_bundle(modified_ns: int):\n    return joblib.load(MODEL_PATH)\n\n\nbundle = load_bundle(MODEL_PATH.stat().st_mtime_ns)\nprofiles = bundle[\"segment_profiles\"].copy()\n\nst.info(\n    \"RFM means Recency, Frequency and Monetary value. The model groups customers \"\n    \"by shopping behaviour without a pre-existing target label.\"\n)\n\nleft, right = st.columns([1, 1.3])\n\nwith left:\n    st.subheader(\"Try a customer profile\")\n    recency = st.number_input(\n        \"Days since last purchase\",\n        min_value=0,\n        max_value=800,\n        value=30,\n        step=1,\n    )\n    frequency = st.number_input(\n        \"Number of completed orders\",\n        min_value=1,\n        max_value=500,\n        value=5,\n        step=1,\n    )\n    monetary = st.number_input(\n        \"Total historical spend (£)\",\n        min_value=0.01,\n        max_value=500000.0,\n        value=800.0,\n        step=50.0,\n    )\n\n    if st.button(\"Find customer segment\", type=\"primary\", use_container_width=True):\n        row = pd.DataFrame(\n            [{\n                \"recency_days\": float(recency),\n                \"frequency_orders\": float(frequency),\n                \"monetary_value\": float(monetary),\n            }]\n        )\n        transformed = bundle[\"scaler\"].transform(np.log1p(row[RFM_COLUMNS]))\n        cluster = int(bundle[\"kmeans\"].predict(transformed)[0])\n        segment = bundle[\"segment_names\"][cluster]\n        st.success(f\"Assigned segment: {segment}\")\n        st.write(f\"Cluster ID: {cluster}\")\n        st.caption(\n            \"The name is an educational interpretation of that cluster's average RFM profile.\"\n        )\n\nwith right:\n    st.subheader(\"Verified segment profiles\")\n    display = profiles[\n        [\n            \"segment_name\",\n            \"customers\",\n            \"recency_days\",\n            \"frequency_orders\",\n            \"monetary_value\",\n        ]\n    ].copy()\n    display.columns = [\n        \"Segment\",\n        \"Customers\",\n        \"Avg recency (days)\",\n        \"Avg orders\",\n        \"Avg spend (£)\",\n    ]\n    st.dataframe(display, hide_index=True, use_container_width=True)\n    st.caption(\n        f\"Selected K-Means clusters: {bundle['selected_k']} • \"\n        f\"RFM snapshot date: {bundle['snapshot_date']}\"\n    )\n\nst.divider()\nst.caption(\n    \"This project demonstrates RFM clustering on a public UK online-retail dataset. \"\n    \"Real companies may use many more behavioural, product, demographic and real-time signals.\"\n)\n";
const testsCode = "from pathlib import Path\nimport importlib.util\n\nimport joblib\nimport numpy as np\nimport pandas as pd\n\nROOT = Path(__file__).resolve().parents[1]\nMODEL_PATH = ROOT / \"models\" / \"customer_segmenter.joblib\"\n\nspec = importlib.util.spec_from_file_location(\n    \"customer_segments\",\n    ROOT / \"src\" / \"build_segments.py\",\n)\ncore = importlib.util.module_from_spec(spec)\nspec.loader.exec_module(core)\n\n\ndef test_downloaded_dataset_contract():\n    frame = core.load_transactions()\n    assert len(frame) == 541_909\n    assert {\n        \"InvoiceNo\",\n        \"Quantity\",\n        \"InvoiceDate\",\n        \"UnitPrice\",\n        \"CustomerID\",\n        \"Country\",\n    }.issubset(frame.columns)\n\n\ndef test_cleaning_removes_cancellations_and_invalid_purchases():\n    cleaned = core.clean_transactions(core.load_transactions())\n    assert cleaned[\"CustomerID\"].notna().all()\n    assert (cleaned[\"Quantity\"] > 0).all()\n    assert (cleaned[\"UnitPrice\"] > 0).all()\n    assert not cleaned[\"InvoiceNo\"].str.upper().str.startswith(\"C\").any()\n\n\ndef test_rfm_has_positive_business_features():\n    cleaned = core.clean_transactions(core.load_transactions())\n    rfm, snapshot = core.build_rfm(cleaned)\n    assert len(rfm) > 4_000\n    assert (rfm[\"recency_days\"] >= 1).all()\n    assert (rfm[\"frequency_orders\"] >= 1).all()\n    assert (rfm[\"monetary_value\"] > 0).all()\n    assert snapshot > cleaned[\"InvoiceDate\"].max()\n\n\ndef test_saved_bundle_and_profiles_exist():\n    assert MODEL_PATH.is_file()\n    bundle = joblib.load(MODEL_PATH)\n    assert 2 <= int(bundle[\"selected_k\"]) <= 8\n    assert len(bundle[\"segment_names\"]) == int(bundle[\"selected_k\"])\n    assert len(bundle[\"segment_profiles\"]) == int(bundle[\"selected_k\"])\n\n\ndef test_example_prediction_is_deterministic():\n    bundle = joblib.load(MODEL_PATH)\n    row = pd.DataFrame(\n        [{\"recency_days\": 30.0, \"frequency_orders\": 5.0, \"monetary_value\": 800.0}]\n    )\n    transformed = bundle[\"scaler\"].transform(\n        np.log1p(row[bundle[\"rfm_columns\"]])\n    )\n    first = int(bundle[\"kmeans\"].predict(transformed)[0])\n    second = int(bundle[\"kmeans\"].predict(transformed)[0])\n    assert first == second\n    assert first in bundle[\"segment_names\"]\n\n\ndef test_required_outputs_exist():\n    for name in [\n        \"metrics.json\",\n        \"kmeans_k_comparison.csv\",\n        \"clustering_method_comparison.csv\",\n        \"segment_profiles.csv\",\n        \"customer_segments.csv\",\n        \"rfm_distributions.png\",\n        \"k_selection.png\",\n        \"pca_segments.png\",\n        \"cluster_profiles.png\",\n        \"method_comparison.png\",\n    ]:\n        assert (ROOT / \"outputs\" / name).is_file(), name\n\n\ndef test_segment_names_follow_measured_behavior_not_arbitrary_cluster_rank():\n    # Original fictional RFM teaching rows: second cluster is demonstrably\n    # lapsing (135-day recency) and occasional (under 2 mean orders).\n    rfm = pd.DataFrame({\n        \"CustomerID\": [\"recent\", \"lapsed\"],\n        \"recency_days\": [26.45, 134.72],\n        \"frequency_orders\": [8.44, 1.67],\n        \"monetary_value\": [4544.39, 497.12],\n        \"average_order_value\": [540.0, 298.0],\n    })\n    profiles, names = core.build_segment_names(rfm, np.asarray([0, 1]))\n    assert names[0] == \"High-value active customers\"\n    assert names[1] == \"Lapsing occasional customers\"\n    assert float(profiles.loc[profiles.cluster == 1, \"recency_days\"].iloc[0]) > 90\n";

const cleanSnippet = "def clean_transactions(frame):\n    cleaned = frame.loc[\n        frame[\"CustomerID\"].notna()\n        & ~frame[\"InvoiceNo\"].str.upper().str.startswith(\"C\")\n        & (frame[\"Quantity\"] > 0)\n        & (frame[\"UnitPrice\"] > 0)\n    ].copy()\n\n    cleaned[\"revenue\"] = (\n        cleaned[\"Quantity\"].astype(float)\n        * cleaned[\"UnitPrice\"].astype(float)\n    )\n    return cleaned";

const rfmSnippet = "snapshot = cleaned[\"InvoiceDate\"].max().normalize() + pd.Timedelta(days=1)\n\nrfm = (\n    cleaned.groupby(\"CustomerID\", as_index=False)\n    .agg(\n        last_purchase=(\"InvoiceDate\", \"max\"),\n        frequency_orders=(\"InvoiceNo\", \"nunique\"),\n        monetary_value=(\"revenue\", \"sum\"),\n    )\n)\n\nrfm[\"recency_days\"] = (\n    snapshot - rfm[\"last_purchase\"].dt.normalize()\n).dt.days";

const scaleSnippet = "logged = np.log1p(\n    rfm[[\"recency_days\", \"frequency_orders\", \"monetary_value\"]]\n)\n\nscaler = StandardScaler()\nmatrix = scaler.fit_transform(logged)";

const kSnippet = "for k in range(2, 9):\n    model = KMeans(\n        n_clusters=k,\n        n_init=20,\n        random_state=42,\n    )\n    labels = model.fit_predict(matrix)\n\n    score = silhouette_score(\n        matrix,\n        labels,\n        sample_size=min(5000, len(matrix)),\n        random_state=42,\n    )";

const compareSnippet = "kmeans = KMeans(n_clusters=selected_k, n_init=30, random_state=42)\nkmeans_labels = kmeans.fit_predict(matrix)\n\nhierarchical = AgglomerativeClustering(n_clusters=selected_k)\nhierarchical_labels = hierarchical.fit_predict(matrix)\n\ndbscan = DBSCAN(eps=0.65, min_samples=8)\ndbscan_labels = dbscan.fit_predict(matrix)";

export function CustomerSegmentationProjectPage() {
  const project = projectPortfolioById['customer-segmentation'];

  useEffect(() => {
    document.title = 'Customer Segmentation Project — RFM, K-Means, DBSCAN, PCA | LearnMLAcademy';
    const description = 'Build a real customer-segmentation system from 541,909 UCI Online Retail transactions using RFM, K-Means, hierarchical clustering, DBSCAN, silhouette analysis, PCA and Streamlit.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="mt-5 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Project 4 · Unsupervised Learning</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Turn raw retail transactions into customer groups without a pre-existing target label. You will build the RFM table,
              choose a defensible number of clusters, compare three clustering ideas, interpret the groups, and ship a working app.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-6xl px-5 pt-4 text-sm text-amber-900"><strong>Saved-model safety:</strong> Only load Joblib model artifacts you generated yourself or explicitly trust. Joblib uses pickle-based loading and must never open untrusted uploads.</p>
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-black text-amber-950">
            <Target className="h-5 w-5" aria-hidden="true" />
            The practical problem: thousands of shoppers, but no customer labels
          </h2>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            Imagine an online retailer has more than half a million transaction rows. Marketing cannot treat every customer exactly the
            same, but nobody has supplied labels such as “VIP”, “occasional” or “at risk”. We therefore cannot train an ordinary
            classifier. Our job is to turn purchase history into measurable behaviour, discover natural groups, and explain what those
            groups actually mean.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Raw evidence', '541,909 historical UCI retail transaction rows.'],
              ['Behaviour features', 'Recency, Frequency and Monetary value for each known customer.'],
              ['ML task', 'Unsupervised clustering: discover groups without a target column.'],
              ['Deliverable', 'A saved K-Means segmenter plus a Streamlit app that assigns a new RFM profile.'],
            ].map(([label, body]) => (
              <div key={label} className="rounded-xl border border-amber-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-wide text-amber-800">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 overflow-x-auto">
            <div className="flex min-w-[800px] items-center gap-2 rounded-xl border border-amber-200 bg-white p-4 text-center text-xs font-bold text-slate-800">
              {['Transactions','Clean purchases','RFM table','Log + scale','Choose k','Compare clustering','Interpret segments','Streamlit app'].map((item, index, items) => (
                <React.Fragment key={item}>
                  <div className="min-w-[88px] flex-1 rounded-lg bg-slate-100 px-2 py-3">{item}</div>
                  {index < items.length - 1 && <span className="text-lg text-amber-600">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-indigo-950">What are we actually asking the algorithm to discover?</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {[
              ['Recency (R)', 'How many days ago did this customer last buy? Smaller usually means more recently active.'],
              ['Frequency (F)', 'How many distinct completed orders did this customer place? Larger means more repeat buying.'],
              ['Monetary (M)', 'How much historical revenue came from this customer? Larger means greater historical spend.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl border border-indigo-200 bg-white p-4">
                <p className="font-black text-indigo-950">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-indigo-950">
            Important: K-Means will return cluster IDs such as 0 and 1. It does <strong>not</strong> know words like “high-value”.
            We create business-friendly names only after examining the measured profile of each cluster.
          </p>
        </section>

        <HandbookSection id="setup" number={1} title="Create the project environment" checkpoint={<>The virtual environment is active and every pinned dependency installs without conflicts.</>}>
          <p>Work inside <code>projects/customer-segmentation</code>. The versions below are the ones used by the verified build.</p>
          <HandbookCode code={requirementsCode} language="text" title="requirements.txt" type="runnable" />
          <HandbookCode code={'python -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install -r requirements.txt\npython -m pip check'} language="powershell" title="Create and verify the environment" type="runnable" />
        </HandbookSection>

        <HandbookSection id="data" number={2} title="Download a real retail dataset reproducibly" checkpoint={<>You have 541,909 rows and the archive checksum matches the verified build.</>}>
          <p>
            We use UCI Online Retail, dataset 352. It contains transactions from a UK-based non-store retailer and is licensed CC BY 4.0.
            The downloader validates the exact schema and pins the downloaded archive fingerprint so a silent upstream data change cannot
            pass unnoticed.
          </p>
          <HandbookCode code={downloadCode} language="python" title="Complete download_data.py" type="runnable" />
          <HandbookCode code={'python download_data.py'} language="powershell" title="Download and verify" type="runnable" />
          <HandbookCode code={'Rows: 541,909\nCustomerID missing: 135,080\nArchive SHA256: f5385cbb54bbebf7196389109c6b0621faab0c304e3702548165e71c84aede8b'} language="text" title="Verified output" type="output" />
        </HandbookSection>

        <HandbookSection id="clean" number={3} title="Turn messy transactions into valid purchases" checkpoint={<>Only known customers with completed positive-value purchases remain.</>}>
          <p>
            A transaction file is not yet a customer table. We remove rows without a customer ID, cancellation invoice numbers,
            non-positive quantities and non-positive prices. Then each line gets <code>revenue = Quantity × UnitPrice</code>.
          </p>
          <HandbookCode code={cleanSnippet} language="python" title="Cleaning block" type="runnable" />
          <HandbookTable
            headers={['Stage','Rows','Why it matters']}
            rows={[
              ['Raw UCI data','541,909','Includes cancellations, returns and rows without a known customer'],
              ['Verified clean purchases','397,884','Rows used to build customer behaviour'],
              ['Customer-level RFM table','4,338','One row per customer for clustering'],
            ]}
          />
        </HandbookSection>

        <HandbookSection id="rfm" number={4} title="Build one behavioural row per customer" checkpoint={<>You can calculate Recency, Frequency and Monetary value for one customer by hand.</>}>
          <p>
            We take one day after the last transaction as the snapshot date. If a customer last bought on 1 December and the snapshot is
            10 December, recency is 9 days. Frequency counts distinct completed invoices, while monetary value sums line-level revenue.
          </p>
          <HandbookCode code={rfmSnippet} language="python" title="RFM aggregation" type="runnable" />
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-950">
            <strong>Mini numerical example:</strong> suppose Customer A has orders 10 days ago, 30 days ago and 60 days ago worth
            £120, £80 and £200. Then <strong>R = 10</strong>, <strong>F = 3</strong>, and
            <strong> M = £400</strong>. Those three numbers become one point in clustering space.
          </div>
        </HandbookSection>

        <HandbookSection id="visualize-rfm" number={5} title="See why raw RFM values need preparation" checkpoint={<>You can explain why one very large spender could dominate Euclidean distance.</>}>
          <Screenshot
            src="/project-handbooks/customer-segmentation/rfm_distributions.png"
            alt="Verified histograms of customer recency, frequency and monetary value before clustering"
            title="Real RFM distributions"
            caption={<>Generated by the executable project. Frequency and spend are strongly right-skewed, which is why we apply <code>log1p</code> before scaling.</>}
          />
          <p>
            K-Means uses distances. If Monetary ranges into thousands while Frequency is mostly single digits, raw units can make spend
            dominate. A log transform compresses long right tails; StandardScaler then puts the three transformed features onto
            comparable standardized scales.
          </p>
        </HandbookSection>

        <HandbookSection id="scale" number={6} title="Log-transform and scale before distance-based clustering" checkpoint={<>The clustering matrix has the same three behavioural features, but on comparable transformed scales.</>}>
          <HandbookCode code={scaleSnippet} language="python" title="Transform RFM" type="runnable" />
          <p>
            <code>log1p(x)</code> means <code>log(1 + x)</code>, so it is safe at zero. StandardScaler then subtracts the training-column
            mean and divides by its standard deviation. We save that exact scaler with the final K-Means model so new profiles are
            transformed the same way.
          </p>
        </HandbookSection>

        <HandbookSection id="kmeans" number={7} title="Understand what K-Means is trying to minimize" checkpoint={<>You can describe assign → move centroids → repeat without memorizing library syntax.</>}>
          <p>
            Pick <strong>k</strong> cluster centres. Each customer is assigned to the nearest centre. The centre moves to the mean of its
            assigned customers. Assignment and movement repeat until the solution stabilizes. K-Means therefore favors compact groups in
            distance space; it does not discover business labels automatically.
          </p>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm leading-7 text-violet-950">
            <strong>Distance intuition:</strong> after transformation, imagine Customer A = (−1.0, 1.2, 1.4) and centroid C =
            (−0.8, 1.0, 1.1). Euclidean distance is
            √[(−0.2)² + (0.2)² + (0.3)²] ≈ <strong>0.41</strong>. K-Means assigns A to whichever centroid gives the smallest distance.
          </div>
        </HandbookSection>

        <HandbookSection id="choose-k" number={8} title="Choose k with evidence instead of guessing" checkpoint={<>You can explain what the silhouette score rewards and why we compare multiple k values.</>}>
          <HandbookCode code={kSnippet} language="python" title="Compare k = 2 to 8" type="runnable" />
          <Screenshot
            src="/project-handbooks/customer-segmentation/k_selection.png"
            alt="Verified K-Means silhouette comparison for cluster counts from 2 through 8"
            title="Real k-selection evidence"
            caption={<>The verified run selected <strong>k = 2</strong> because it had the highest measured silhouette among the tested values.</>}
          />
          <p>
            Silhouette compares how close a sample is to its own cluster versus neighboring clusters. Higher is generally better:
            values near +1 indicate better separation, values near 0 indicate overlap, and negative values suggest possible
            mis-assignment. It is a diagnostic, not proof that a business truly has exactly k natural customer types.
          </p>
        </HandbookSection>

        <HandbookSection id="compare-methods" number={9} title="Compare three different ideas about what a cluster is" checkpoint={<>You can explain why K-Means, hierarchical clustering and DBSCAN may disagree.</>}>
          <HandbookCode code={compareSnippet} language="python" title="Three clustering methods" type="runnable" />
          <HandbookTable
            headers={['Method','Verified result','What it assumes / reveals']}
            rows={[
              ['K-Means (k=2)','Silhouette 0.4326','Compact groups around centroids'],
              ['Hierarchical (k=2)','Silhouette 0.4086','Builds groups from a hierarchy of pairwise merges'],
              ['DBSCAN','42 noise customers; no valid multi-cluster silhouette here','Looks for dense regions and can mark isolated points as noise'],
            ]}
          />
          <Screenshot
            src="/project-handbooks/customer-segmentation/method_comparison.png"
            alt="Verified silhouette comparison between K-Means and hierarchical clustering"
            title="Real clustering-method comparison"
            caption={<>DBSCAN is intentionally not forced into a silhouette bar when the chosen settings do not produce a valid multi-cluster score.</>}
          />
        </HandbookSection>

        <HandbookSection id="pca" number={10} title="Project three RFM dimensions into two so humans can inspect the result" checkpoint={<>You know that PCA is a visualization projection here, not the algorithm that created the clusters.</>}>
          <Screenshot
            src="/project-handbooks/customer-segmentation/pca_segments.png"
            alt="Verified PCA projection of the selected customer clusters into two dimensions"
            title="Two-dimensional view of the customer clusters"
            caption={<>PCA compresses the transformed RFM coordinates to two components for plotting. The K-Means labels were learned in the original three-feature transformed space.</>}
          />
        </HandbookSection>

        <HandbookSection id="interpret" number={11} title="Translate numeric cluster IDs into understandable customer profiles" checkpoint={<>You can justify every segment name from measured averages instead of from the numeric ID.</>}>
          <HandbookTable
            headers={['Educational segment name','Customers','Avg recency','Avg orders','Avg spend']}
            rows={[
              ['High-value active customers','1,669','26.45 days','8.44','£4,544.39'],
              ['Lapsing occasional customers','2,669','134.72 days','1.67','£497.12'],
            ]}
          />
          <Screenshot
            src="/project-handbooks/customer-segmentation/cluster_profiles.png"
            alt="Verified standardized RFM profile chart for the selected customer segments"
            title="Why the segment names differ"
            caption={<>The labels are explicit recency/frequency/spend heuristics calculated from measured cluster profiles, not arbitrarily assigned by rank. Cluster 0 is not inherently “better” than cluster 1; numeric IDs are arbitrary.</>}
          />
          <p>
            This two-cluster answer is what this dataset and these three RFM features support under the verified selection rule. If a
            business needs finer campaign groups, that is a new modeling requirement—not permission to arbitrarily force more clusters
            and call them “better”.
          </p>
        </HandbookSection>

        <HandbookSection id="full-build" number={12} title="Assemble the complete verified segmentation engine" checkpoint={<>You can connect cleaning → RFM → transform → selection → clustering → interpretation → persistence.</>}>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open complete src/build_segments.py</summary>
            <p className="mt-3 text-sm leading-7 text-slate-700">Use the complete source only after understanding the earlier blocks.</p>
            <div className="mt-3"><HandbookCode code={buildCode} language="python" title="Complete build_segments.py" type="runnable" /></div>
          </details>
          <HandbookCode code={'python src/build_segments.py'} language="powershell" title="Build the verified segments" type="runnable" />
          <HandbookCode code={'raw_rows: 541909\nclean_purchase_rows: 397884\ncustomers: 4338\nselected_k: 2\nkmeans_silhouette: 0.432624\nhierarchical_silhouette: 0.408629\nexample_segment: High-value active customers'} language="text" title="Verified build summary" type="output" />
        </HandbookSection>

        <HandbookSection id="persistence" number={13} title="Save the scaler and K-Means model together" checkpoint={<>A new profile is transformed by the same scaler used during clustering before K-Means assigns it.</>}>
          <p>
            The Joblib bundle stores the fitted scaler, fitted K-Means model, RFM feature order, chosen k, snapshot date, segment names
            and profiles. That avoids the common mistake of scaling new customers differently from the historical customers.
          </p>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-950">
            Verified example input: <strong>30 days since last purchase, 5 completed orders, £800 total historical spend</strong> →
            <strong> High-value active customers</strong>. This is a model assignment from the saved pipeline, not a hard-coded rule.
          </div>
        </HandbookSection>

        <HandbookSection id="app" number={14} title="Build the Streamlit customer-segmentation app" checkpoint={<>The browser shows verified segment profiles and assigns the default example using the saved model.</>}>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open complete app.py</summary>
            <div className="mt-3"><HandbookCode code={appCode} language="python" title="Complete app.py" type="runnable" /></div>
          </details>
          <HandbookCode code={'python -m streamlit run app.py'} language="powershell" title="Start the app" type="runnable" />
          <div className="grid gap-4 lg:grid-cols-2">
            <Screenshot
              src="/project-handbooks/customer-segmentation/customer-segmentation-app.png"
              alt="Real Streamlit Customer Segmentation app with RFM inputs and verified segment profile table"
              title="Real app before assignment"
              caption={<>Captured from the running verified Streamlit application.</>}
            />
            <Screenshot
              src="/project-handbooks/customer-segmentation/customer-segmentation-result.png"
              alt="Real Streamlit Customer Segmentation app showing the assigned segment for the default RFM profile"
              title="Real saved-model assignment"
              caption={<>The default 30-day, 5-order, £800 profile is transformed and assigned by the persisted model.</>}
            />
          </div>
        </HandbookSection>

        <HandbookSection id="tests" number={15} title="Prove the project works with automated tests" checkpoint={<>All six behavioural tests pass on the fingerprinted dataset and generated model.</>}>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open tests/test_customer_segmentation.py</summary>
            <div className="mt-3"><HandbookCode code={testsCode} language="python" title="Complete test file" type="runnable" /></div>
          </details>
          <HandbookCode code={'pytest -q\n......\n6 passed in 2.14s'} language="text" title="Verified test result" type="output" />
        </HandbookSection>

        <HandbookSection id="tree" number={16} title="Understand the complete project folder" checkpoint={<>You can point to data acquisition, clustering, model persistence, tests, outputs and the browser app.</>}>
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm">
            customer-segmentation/<br />
            ├── data/ <span className="text-slate-400"># downloaded locally; not committed</span><br />
            ├── models/customer_segmenter.joblib <span className="text-slate-400"># generated artifact</span><br />
            ├── outputs/ <span className="text-slate-400"># metrics, CSVs, figures, screenshots</span><br />
            ├── scripts/capture_app_screenshots.py<br />
            ├── src/build_segments.py<br />
            ├── tests/test_customer_segmentation.py<br />
            ├── app.py<br />
            ├── download_data.py<br />
            ├── requirements.txt<br />
            └── README.md
          </div>
        </HandbookSection>

        <section className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-fuchsia-950">Troubleshooting checkpoints</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-fuchsia-950">
            <p><strong>Parquet says it cannot convert an invoice such as C536379:</strong> invoice IDs mix numeric-looking values and cancellation codes. Keep identifiers as strings before Parquet export.</p>
            <p><strong>One feature dominates the clusters:</strong> verify that log transformation and StandardScaler are applied to all three RFM features.</p>
            <p><strong>DBSCAN gives mostly one cluster or lots of noise:</strong> density methods are sensitive to <code>eps</code> and <code>min_samples</code>. Do not force a misleading silhouette score when fewer than two non-noise clusters exist.</p>
            <p><strong>Your cluster numbers change meaning:</strong> cluster IDs are arbitrary. Interpret clusters from their measured RFM profiles, never from the number 0/1/2 itself.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-blue-950">How to explain this project in an interview</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-blue-950">
            {[
              ['Why is this unsupervised learning?', 'There is no target label telling us the correct customer segment. We discover structure from RFM behaviour.'],
              ['Why clean before aggregation?', 'Cancellations, returns and unknown customers would distort revenue, order counts and recency.'],
              ['Why log-transform and scale?', 'RFM features are skewed and measured on very different numeric ranges; distance-based clustering is sensitive to that.'],
              ['Why silhouette rather than only the elbow method?', 'Silhouette explicitly compares within-cluster cohesion with separation from neighboring clusters. We still treat it as evidence, not business truth.'],
              ['Why compare DBSCAN?', 'It represents a different density-based idea of a cluster and can identify noise instead of forcing every customer into a centroid-based group.'],
              ['Why is PCA not the clustering algorithm here?', 'PCA is used to project the transformed three-dimensional RFM space into two dimensions for visualization.'],
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
              'Can you compute R, F and M for one customer manually?',
              'Why are cancellation invoices removed?',
              'Why do missing CustomerIDs prevent customer-level segmentation?',
              'Why does Monetary value need the Quantity × UnitPrice calculation?',
              'What does log1p change about a long right tail?',
              'Why does StandardScaler matter to Euclidean distance?',
              'What is a K-Means centroid?',
              'What does a silhouette score near zero suggest?',
              'Why is the best k not automatically the best marketing strategy?',
              'How is hierarchical clustering conceptually different from K-Means?',
              'What does DBSCAN noise mean?',
              'Why are human-readable segment names added after clustering?',
              'What is stored in customer_segmenter.joblib?',
              'What would you validate before using these segments in a real marketing campaign?',
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
              'Fingerprint-pinned UCI dataset downloaded',
              'Raw transaction quality issues understood',
              'RFM table created from valid purchases',
              'Skew visualized before clustering',
              'Log transform + scaling explained',
              'K-Means mechanics understood',
              'k chosen from measured silhouette evidence',
              'Hierarchical and DBSCAN alternatives compared',
              'PCA used correctly as a visualization',
              'Cluster IDs translated from measured profiles',
              'Model + scaler saved together',
              'Real Streamlit app verified',
              'Six automated tests passed',
              'Limitations and business interpretation understood',
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
