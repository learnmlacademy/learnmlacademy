# Project 4 status — Customer Segmentation

## Goal
Turn raw retail transactions into understandable customer groups using RFM features and unsupervised learning.

## Engineering
- [x] UCI Online Retail downloader
- [x] row/schema validation
- [x] cancellation/invalid-purchase cleaning
- [x] RFM customer table
- [x] log transform + StandardScaler
- [x] K-Means k comparison using inertia + silhouette
- [x] Hierarchical clustering comparison
- [x] DBSCAN comparison with noise handling
- [x] PCA visualization
- [x] interpretable cluster profiles
- [x] saved K-Means + scaler bundle
- [x] Streamlit segment demo
- [x] automated tests
- [x] real app screenshot script
- [x] first clean CI run
- [x] pin UCI archive SHA256
- [ ] learner handbook
- [ ] website integration
- [ ] desktop/mobile verification
- [ ] final acceptance audit

## Dataset boundary
The project uses UCI Online Retail (dataset 352), a UK non-store retailer transaction dataset with 541,909 rows. UCI lists the dataset under CC BY 4.0. The project must preserve attribution.

The project title is a recognizable hook only. It does not use Amazon data and does not claim to reproduce Amazon's customer-segmentation system.


## First verified engineering run

GitHub Actions run **37790475672 — SUCCESS**.

- UCI archive SHA256: `f5385cbb54bbebf7196389109c6b0621faab0c304e3702548165e71c84aede8b`
- raw rows: 541,909
- rows retained after customer/purchase cleaning: 397,884
- customer-level RFM rows: 4,338
- RFM snapshot date: 2011-12-10
- selected K-Means k: 2
- K-Means silhouette: 0.432624
- hierarchical silhouette at k=2: 0.408629
- DBSCAN: no valid multi-cluster silhouette under the chosen educational settings; 42 customers marked as noise
- example profile (30 days, 5 orders, £800 historical spend): High-value active customers
- tests: 6 passed
- genuine Streamlit screenshots: captured successfully

Selected K-Means profiles from the verified run:

| Segment | Customers | Avg recency days | Avg completed orders | Avg monetary value |
| --- | ---: | ---: | ---: | ---: |
| High-value active customers | 1,669 | 26.45 | 8.44 | £4,544.39 |
| Loyal regular customers | 2,669 | 134.72 | 1.67 | £497.12 |

The human-readable segment names are educational interpretations of cluster averages; K-Means itself produces numeric cluster IDs, not business labels.
