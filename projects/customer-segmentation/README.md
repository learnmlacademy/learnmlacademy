# How Amazon Knows What Kind of Customer You Are

This is a **customer-segmentation learning project**, not an Amazon implementation and not Amazon data.

## Practical problem

An online retailer has hundreds of thousands of invoice rows but no labels such as "loyal" or "at risk". The job is to turn transaction history into one customer-level row, measure three intuitive RFM features, then discover groups of customers with similar behaviour.

RFM means:

- **Recency** — days since the customer's most recent purchase.
- **Frequency** — number of distinct purchase invoices.
- **Monetary** — total spend across valid purchases.

## Dataset

UCI Machine Learning Repository — **Online Retail (ID 352)**.

The source contains 541,909 transaction rows from a UK non-store retailer from December 2010 to December 2011. UCI publishes the dataset under **CC BY 4.0**.

## Engineering choices

- remove rows with missing CustomerID;
- exclude cancellation invoices;
- exclude non-positive quantity and price rows;
- aggregate transaction rows into RFM customer profiles;
- cap each RFM feature at its training 99th percentile;
- apply log1p to reduce extreme right-skew;
- standardize before Euclidean-distance clustering;
- compare K-Means k=2..6 by silhouette;
- fit the selected K-Means model;
- project to two dimensions with PCA for visualization only;
- compare K-Means with Agglomerative clustering and DBSCAN as structural alternatives;
- save the exact scaler, caps, K-Means model, PCA transform and teaching segment names.

The business segment names are **heuristic interpretations of cluster profiles**, not labels learned from the dataset.

## Run

~~~powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python download_data.py
python src/build_segments.py
pytest -q
python -m streamlit run app.py
~~~

## Research reviewed

Before implementation, the project reviewed the UCI dataset page, scikit-learn clustering/silhouette documentation, GeeksforGeeks RFM and K-Means tutorials, and Analytics Vidhya RFM/customer-segmentation tutorials. The LearnMLAcademy code, figures and explanations are independently written.
