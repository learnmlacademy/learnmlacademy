# Customer Segmentation — Project 4

Build a practical RFM customer-segmentation workflow from raw retail transactions.

## What the project teaches

- why clustering is different from supervised learning
- transaction cleaning before customer-level aggregation
- RFM: Recency, Frequency and Monetary value
- why skewed behavioural features benefit from log transformation
- why scale matters for distance-based clustering
- K-Means and choosing k with silhouette score
- DBSCAN and the idea of noise points
- hierarchical clustering
- PCA as a 2D visualization, not the clustering target
- interpreting cluster profiles without pretending cluster IDs have business meaning
- saving the scaler + K-Means model together
- serving one new RFM profile in Streamlit

## Dataset

UCI Machine Learning Repository — Online Retail, dataset 352.

- 541,909 transaction rows
- transactions from a UK-based non-store retailer
- 2010-12-01 through 2011-12-09
- CC BY 4.0
- DOI: 10.24432/C5BW33

## Run

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python download_data.py
python src/build_segments.py
pytest -q
python -m streamlit run app.py
```

**Download and parse note:** The UCI archive contains an Excel workbook with 541,909 rows. The first `python download_data.py` run checks the pinned SHA-256 fingerprint of the official ZIP, parses the workbook with openpyxl and writes a local Parquet cache. This can take several minutes and needs free disk/memory; follow the terminal progress rather than repeatedly restarting. Future training reads the local Parquet file.

**Optional investigation — do not replace the verified baseline:** After reproducing the existing k=2 result, compare k=3, 4 and 5 as experiments with the same cleaned RFM table and the same train-only scaling. Try at least two seeds and compare silhouette, cluster sizes and measured group profiles. A different seed or a larger k is **not** automatically better. For each customer, you can separately calculate ordinal RFM scores 1–5 using clearly documented percentile thresholds (reverse recency so more recent purchases score higher). These descriptive scores are **not** the trained K-Means features unless you intentionally conduct a new, separate experiment.

**Dataset fingerprint:** `download_data.py` already enforces the official UCI archive SHA-256. Do not silently switch dataset files or report synthetic-data results as measured real-world performance.
