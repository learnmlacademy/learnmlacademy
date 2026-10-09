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

The first clean CI run will record the UCI archive SHA256, after which the downloader will be pinned to that exact archive fingerprint.
