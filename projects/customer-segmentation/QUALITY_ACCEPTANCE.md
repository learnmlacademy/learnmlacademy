# Project 4 quality acceptance — PASS

## Decision
**PASS — ready for merge.**

## Why this project is acceptable

The learner is not handed a clustering script first. The handbook begins with the business problem, explains why there is no target label, builds Recency/Frequency/Monetary intuition, then introduces scaling and distance before clustering.

The implementation is executable and verified:
- public UCI Online Retail dataset with exact archive SHA256 pin
- cancellation, missing-customer and invalid-price/quantity cleaning
- RFM feature construction
- log transform + StandardScaler
- K-Means k search using silhouette score
- hierarchical clustering comparison
- DBSCAN comparison including explicit noise handling
- PCA used only for visualization
- cluster profiling and human-readable educational labels
- persisted scaler + K-Means bundle
- real Streamlit inference example
- automated tests and CI

## Verified numerical result

- raw rows: 541,909
- clean purchase rows: 397,884
- customer RFM rows: 4,338
- selected k: 2
- K-Means silhouette: 0.432624
- hierarchical silhouette: 0.408629
- DBSCAN: no valid multi-cluster silhouette under the chosen settings; 42 noise customers
- segment 1: 1,669 high-value active customers
- segment 2: 2,669 loyal regular customers

## Visual evidence

The handbook includes real generated evidence for:
- RFM distributions
- k selection
- PCA segment projection
- cluster-profile comparison
- clustering-method comparison
- live Streamlit app
- live segment-assignment result

No fabricated screenshots are used.

## Website verification

GitHub Actions run **37792070792 — SUCCESS**:
- Python project build/tests passed
- real Streamlit screenshots captured
- TypeScript validation passed
- production Vite build/prerender passed
- desktop and 390px mobile handbook checks passed
- required text and all visual evidence loaded
- no horizontal overflow

## Limitations stated

Cluster labels are interpretations of average cluster profiles, not labels learned by K-Means itself. The hook references Amazon only as a familiar concept; the project uses UCI retail data and does not claim to reproduce Amazon's internal segmentation system.
