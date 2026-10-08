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
- [ ] first clean CI run
- [ ] pin UCI archive SHA256
- [ ] learner handbook
- [ ] website integration
- [ ] desktop/mobile verification
- [ ] final acceptance audit

## Dataset boundary
The project uses UCI Online Retail (dataset 352), a UK non-store retailer transaction dataset with 541,909 rows. UCI lists the dataset under CC BY 4.0. The project must preserve attribution.

The project title is a recognizable hook only. It does not use Amazon data and does not claim to reproduce Amazon's customer-segmentation system.
