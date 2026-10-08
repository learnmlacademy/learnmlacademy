"""Build RFM customer segments from the UCI Online Retail dataset."""

from __future__ import annotations

from pathlib import Path
import json
import platform

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sklearn
from sklearn.cluster import AgglomerativeClustering, DBSCAN, KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "Online Retail.xlsx"
MODEL_DIR = ROOT / "models"
OUTPUT_DIR = ROOT / "outputs"

RFM_FEATURES = ["Recency", "Frequency", "Monetary"]
SEED = 42
K_VALUES = list(range(2, 7))


def load_transactions() -> pd.DataFrame:
    if not DATA_PATH.is_file():
        raise FileNotFoundError(
            "Dataset missing. Run python download_data.py from the project root."
        )
    frame = pd.read_excel(DATA_PATH)
    expected = [
        "InvoiceNo",
        "StockCode",
        "Description",
        "Quantity",
        "InvoiceDate",
        "UnitPrice",
        "CustomerID",
        "Country",
    ]
    if len(frame) != 541_909 or list(frame.columns) != expected:
        raise ValueError("UCI Online Retail contract changed.")
    frame["InvoiceDate"] = pd.to_datetime(frame["InvoiceDate"], errors="raise")
    return frame


def clean_transactions(frame: pd.DataFrame) -> pd.DataFrame:
    clean = frame.dropna(subset=["CustomerID"]).copy()
    clean["InvoiceNo"] = clean["InvoiceNo"].astype(str)
    clean = clean[~clean["InvoiceNo"].str.upper().str.startswith("C")]
    clean = clean[(clean["Quantity"] > 0) & (clean["UnitPrice"] > 0)].copy()
    clean["CustomerID"] = clean["CustomerID"].astype(int).astype(str)
    clean["Revenue"] = clean["Quantity"].astype(float) * clean["UnitPrice"].astype(float)
    return clean


def build_rfm(clean: pd.DataFrame) -> tuple[pd.DataFrame, pd.Timestamp]:
    reference_date = clean["InvoiceDate"].max().normalize() + pd.Timedelta(days=1)
    grouped = clean.groupby("CustomerID", sort=True)
    rfm = grouped.agg(
        LastPurchase=("InvoiceDate", "max"),
        Frequency=("InvoiceNo", "nunique"),
        Monetary=("Revenue", "sum"),
    ).reset_index()
    rfm["Recency"] = (reference_date - rfm["LastPurchase"].dt.normalize()).dt.days
    rfm = rfm[["CustomerID", "Recency", "Frequency", "Monetary"]]
    if (rfm[RFM_FEATURES] <= 0).any().any():
        raise ValueError("RFM values must be positive after cleaning.")
    return rfm, reference_date


def fit_transformer(rfm: pd.DataFrame):
    caps = {
        feature: float(rfm[feature].quantile(0.99))
        for feature in RFM_FEATURES
    }
    clipped = rfm[RFM_FEATURES].copy()
    for feature in RFM_FEATURES:
        clipped[feature] = clipped[feature].clip(upper=caps[feature])
    logged = np.log1p(clipped)
    scaler = StandardScaler()
    scaled = scaler.fit_transform(logged)
    return caps, scaler, scaled


def transform_rfm(frame: pd.DataFrame, caps: dict, scaler: StandardScaler) -> np.ndarray:
    clipped = frame[RFM_FEATURES].astype(float).copy()
    for feature in RFM_FEATURES:
        clipped[feature] = clipped[feature].clip(lower=0, upper=float(caps[feature]))
    return scaler.transform(np.log1p(clipped))


def evaluate_kmeans(scaled: np.ndarray) -> pd.DataFrame:
    rows = []
    sample_size = min(2500, len(scaled))
    for k in K_VALUES:
        model = KMeans(
            n_clusters=k,
            n_init=20,
            random_state=SEED,
        )
        labels = model.fit_predict(scaled)
        silhouette = silhouette_score(
            scaled,
            labels,
            sample_size=sample_size,
            random_state=SEED,
        )
        rows.append(
            {
                "k": k,
                "silhouette": float(silhouette),
                "inertia": float(model.inertia_),
            }
        )
    return pd.DataFrame(rows)


def name_clusters(rfm: pd.DataFrame) -> tuple[pd.DataFrame, dict[int, str]]:
    profile = (
        rfm.groupby("cluster")
        .agg(
            Customers=("CustomerID", "count"),
            Recency=("Recency", "median"),
            Frequency=("Frequency", "median"),
            Monetary=("Monetary", "median"),
        )
        .reset_index()
    )
    profile["value_score"] = (
        -profile["Recency"].rank(pct=True)
        + profile["Frequency"].rank(pct=True)
        + profile["Monetary"].rank(pct=True)
    )

    names = {
        2: ["Needs Attention", "High Value"],
        3: ["Needs Attention", "Regular", "Champions"],
        4: ["Needs Attention", "Occasional", "Loyal", "Champions"],
        5: ["Dormant", "Needs Attention", "Occasional", "Loyal", "Champions"],
        6: ["Dormant", "Needs Attention", "Occasional", "Growing", "Loyal", "Champions"],
    }[len(profile)]
    ordered_clusters = profile.sort_values("value_score")["cluster"].astype(int).tolist()
    mapping = dict(zip(ordered_clusters, names))
    profile["Segment"] = profile["cluster"].astype(int).map(mapping)
    profile = profile.sort_values("value_score", ascending=False).reset_index(drop=True)
    return profile, mapping


def alternative_cluster_evidence(scaled: np.ndarray, best_k: int) -> dict:
    sample_size = min(2500, len(scaled))

    agg = AgglomerativeClustering(n_clusters=best_k, linkage="ward")
    agg_labels = agg.fit_predict(scaled)
    agg_silhouette = float(
        silhouette_score(
            scaled,
            agg_labels,
            sample_size=sample_size,
            random_state=SEED,
        )
    )

    dbscan = DBSCAN(eps=0.55, min_samples=12)
    dbscan_labels = dbscan.fit_predict(scaled)
    non_noise = dbscan_labels != -1
    dbscan_clusters = len(set(dbscan_labels[non_noise]))
    dbscan_noise = int((~non_noise).sum())
    dbscan_silhouette = None
    if dbscan_clusters >= 2 and int(non_noise.sum()) >= 10:
        subset = scaled[non_noise]
        labels = dbscan_labels[non_noise]
        dbscan_silhouette = float(
            silhouette_score(
                subset,
                labels,
                sample_size=min(2500, len(subset)),
                random_state=SEED,
            )
        )

    return {
        "agglomerative_clusters": int(best_k),
        "agglomerative_silhouette": agg_silhouette,
        "dbscan_eps": 0.55,
        "dbscan_min_samples": 12,
        "dbscan_clusters_excluding_noise": int(dbscan_clusters),
        "dbscan_noise_customers": dbscan_noise,
        "dbscan_silhouette_excluding_noise": dbscan_silhouette,
    }


def save_figures(
    rfm: pd.DataFrame,
    k_table: pd.DataFrame,
    profile: pd.DataFrame,
    alternative: dict,
) -> None:
    fig, axes = plt.subplots(1, 3, figsize=(13, 4))
    for ax, feature in zip(axes, RFM_FEATURES):
        ax.hist(rfm[feature], bins=40)
        ax.set_title(feature)
        ax.set_xlabel(feature)
        ax.set_ylabel("Customers")
    fig.suptitle("Raw RFM distributions before clipping/log scaling")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "rfm_distributions.png", dpi=160)
    plt.close(fig)

    fig, ax1 = plt.subplots(figsize=(8, 5))
    ax1.plot(k_table["k"], k_table["silhouette"], marker="o")
    ax1.set_xlabel("Number of K-Means clusters (k)")
    ax1.set_ylabel("Silhouette score")
    ax1.set_xticks(k_table["k"])
    ax1.set_title("Choose k using separation plus interpretability")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "k_selection.png", dpi=160)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(9, 6))
    for segment, part in rfm.groupby("Segment"):
        ax.scatter(
            part["PCA1"],
            part["PCA2"],
            s=14,
            alpha=0.45,
            label=segment,
        )
    ax.set_xlabel("PCA component 1")
    ax.set_ylabel("PCA component 2")
    ax.set_title("Customer segments projected to two dimensions")
    ax.legend(fontsize=8)
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "pca_segments.png", dpi=160)
    plt.close(fig)

    matrix = profile[RFM_FEATURES].astype(float).copy()
    matrix["Recency"] = -matrix["Recency"]
    normalized = StandardScaler().fit_transform(matrix)
    fig, ax = plt.subplots(figsize=(8, max(4, len(profile) * 0.8)))
    image = ax.imshow(normalized, aspect="auto")
    ax.set_xticks(range(len(RFM_FEATURES)), labels=["Recent purchase", "Frequency", "Monetary"])
    ax.set_yticks(range(len(profile)), labels=profile["Segment"].tolist())
    ax.set_title("Relative segment profile (higher means stronger)")
    for row in range(normalized.shape[0]):
        for col in range(normalized.shape[1]):
            ax.text(col, row, f"{normalized[row, col]:.2f}", ha="center", va="center")
    fig.colorbar(image, ax=ax, label="Standardized profile strength")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "segment_profiles.png", dpi=160)
    plt.close(fig)

    algorithm_names = ["K-Means", "Agglomerative"]
    algorithm_scores = [
        float(k_table.sort_values("silhouette", ascending=False).iloc[0]["silhouette"]),
        float(alternative["agglomerative_silhouette"]),
    ]
    if alternative["dbscan_silhouette_excluding_noise"] is not None:
        algorithm_names.append("DBSCAN*")
        algorithm_scores.append(float(alternative["dbscan_silhouette_excluding_noise"]))
    fig, ax = plt.subplots(figsize=(8, 4.5))
    ax.bar(algorithm_names, algorithm_scores)
    ax.set_ylim(-0.1, 1)
    ax.set_ylabel("Silhouette score")
    ax.set_title("Alternative clustering structures")
    ax.text(
        0.02,
        0.02,
        "* DBSCAN score excludes customers labelled noise",
        transform=ax.transAxes,
        fontsize=8,
    )
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "algorithm_comparison.png", dpi=160)
    plt.close(fig)


def main() -> None:
    MODEL_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)

    raw = load_transactions()
    clean = clean_transactions(raw)
    rfm, reference_date = build_rfm(clean)

    caps, scaler, scaled = fit_transformer(rfm)
    k_table = evaluate_kmeans(scaled)
    best_k = int(
        k_table.sort_values(
            ["silhouette", "k"],
            ascending=[False, True],
            kind="stable",
        ).iloc[0]["k"]
    )

    kmeans = KMeans(
        n_clusters=best_k,
        n_init=30,
        random_state=SEED,
    )
    labels = kmeans.fit_predict(scaled)
    rfm = rfm.copy()
    rfm["cluster"] = labels.astype(int)

    profile, segment_names = name_clusters(rfm)
    rfm["Segment"] = rfm["cluster"].map(segment_names)

    pca = PCA(n_components=2, random_state=SEED)
    coords = pca.fit_transform(scaled)
    rfm["PCA1"] = coords[:, 0]
    rfm["PCA2"] = coords[:, 1]

    alternative = alternative_cluster_evidence(scaled, best_k)

    bundle = {
        "caps": caps,
        "scaler": scaler,
        "kmeans": kmeans,
        "pca": pca,
        "features": RFM_FEATURES,
        "segment_names": segment_names,
        "reference_date": reference_date.isoformat(),
        "best_k": best_k,
    }
    joblib.dump(bundle, MODEL_DIR / "customer_segments.joblib")
    reloaded = joblib.load(MODEL_DIR / "customer_segments.joblib")
    if not np.array_equal(
        reloaded["kmeans"].predict(scaled[:50]),
        kmeans.predict(scaled[:50]),
    ):
        raise RuntimeError("Reloaded K-Means predictions differ.")

    # Pick the real customer closest to each centroid as a reproducible app example.
    distances = kmeans.transform(scaled)
    example_rows = []
    for cluster in range(best_k):
        indexes = np.where(labels == cluster)[0]
        nearest = indexes[np.argmin(distances[indexes, cluster])]
        row = rfm.iloc[nearest].copy()
        row["example_id"] = f"SEG-{cluster + 1:02d}"
        example_rows.append(row)
    examples = pd.DataFrame(example_rows)
    examples.to_csv(OUTPUT_DIR / "segment_examples.csv", index=False)

    rfm.to_csv(OUTPUT_DIR / "customer_segments.csv", index=False)
    profile.to_csv(OUTPUT_DIR / "cluster_profiles.csv", index=False)
    k_table.to_csv(OUTPUT_DIR / "k_selection.csv", index=False)
    (OUTPUT_DIR / "alternative_clustering.json").write_text(
        json.dumps(alternative, indent=2) + "\n",
        encoding="utf-8",
    )

    save_figures(rfm, k_table, profile, alternative)

    metrics = {
        "python": platform.python_version(),
        "scikit_learn": sklearn.__version__,
        "raw_rows": int(len(raw)),
        "clean_rows": int(len(clean)),
        "customers": int(len(rfm)),
        "reference_date": reference_date.isoformat(),
        "best_k": best_k,
        "best_k_silhouette": float(
            k_table.loc[k_table["k"] == best_k, "silhouette"].iloc[0]
        ),
        "explained_variance_pca_2d": float(pca.explained_variance_ratio_.sum()),
        "caps_99pct": caps,
        "segment_names": {str(key): value for key, value in segment_names.items()},
        "alternative_clustering": alternative,
    }
    (OUTPUT_DIR / "metrics.json").write_text(
        json.dumps(metrics, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Raw rows: {len(raw):,}")
    print(f"Clean purchase rows: {len(clean):,}")
    print(f"Customers with RFM profiles: {len(rfm):,}")
    print(f"Reference date: {reference_date.date()}")
    print("\nK selection:")
    print(k_table.to_string(index=False))
    print(f"\nSelected K-Means k: {best_k}")
    print(f"Silhouette: {metrics['best_k_silhouette']:.6f}")
    print("\nCluster profiles:")
    print(profile.to_string(index=False))
    print("\nAlternative clustering:")
    print(json.dumps(alternative, indent=2))
    print("Saved: models/customer_segments.joblib")


if __name__ == "__main__":
    main()
