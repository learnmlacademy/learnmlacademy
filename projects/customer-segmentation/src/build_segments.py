"""Build RFM customer segments from the UCI Online Retail dataset."""

from __future__ import annotations

from pathlib import Path
import json

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.cluster import AgglomerativeClustering, DBSCAN, KMeans
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "online_retail.parquet"
MODEL_DIR = ROOT / "models"
OUTPUT_DIR = ROOT / "outputs"
RANDOM_STATE = 42
RFM_COLUMNS = ["recency_days", "frequency_orders", "monetary_value"]


def load_transactions() -> pd.DataFrame:
    if not DATA_PATH.is_file():
        raise FileNotFoundError(
            "Dataset is missing. Run python download_data.py first."
        )
    frame = pd.read_parquet(DATA_PATH).copy()
    frame["InvoiceNo"] = frame["InvoiceNo"].astype(str)
    frame["InvoiceDate"] = pd.to_datetime(frame["InvoiceDate"], errors="raise")
    frame["CustomerID"] = pd.to_numeric(frame["CustomerID"], errors="coerce")
    return frame


def clean_transactions(frame: pd.DataFrame) -> pd.DataFrame:
    cleaned = frame.loc[
        frame["CustomerID"].notna()
        & ~frame["InvoiceNo"].str.upper().str.startswith("C")
        & (frame["Quantity"] > 0)
        & (frame["UnitPrice"] > 0)
    ].copy()
    cleaned["CustomerID"] = cleaned["CustomerID"].astype(int).astype(str)
    cleaned["revenue"] = cleaned["Quantity"].astype(float) * cleaned["UnitPrice"].astype(float)
    return cleaned


def build_rfm(cleaned: pd.DataFrame) -> tuple[pd.DataFrame, pd.Timestamp]:
    snapshot = cleaned["InvoiceDate"].max().normalize() + pd.Timedelta(days=1)
    rfm = (
        cleaned.groupby("CustomerID", as_index=False)
        .agg(
            last_purchase=("InvoiceDate", "max"),
            frequency_orders=("InvoiceNo", "nunique"),
            monetary_value=("revenue", "sum"),
            items_bought=("Quantity", "sum"),
        )
    )
    rfm["recency_days"] = (
        snapshot - rfm["last_purchase"].dt.normalize()
    ).dt.days.astype(int)
    rfm["average_order_value"] = (
        rfm["monetary_value"] / rfm["frequency_orders"]
    )
    rfm = rfm[
        [
            "CustomerID",
            "recency_days",
            "frequency_orders",
            "monetary_value",
            "items_bought",
            "average_order_value",
        ]
    ].copy()
    return rfm, snapshot


def transform_rfm(rfm: pd.DataFrame) -> tuple[StandardScaler, np.ndarray]:
    # log1p reduces the extreme right skew while keeping zero-safe arithmetic.
    logged = np.log1p(rfm[RFM_COLUMNS].astype(float))
    scaler = StandardScaler()
    matrix = scaler.fit_transform(logged)
    return scaler, matrix


def compare_kmeans(matrix: np.ndarray) -> pd.DataFrame:
    rows = []
    sample_size = min(5000, len(matrix))
    for k in range(2, 9):
        model = KMeans(
            n_clusters=k,
            n_init=20,
            random_state=RANDOM_STATE,
        )
        labels = model.fit_predict(matrix)
        silhouette = silhouette_score(
            matrix,
            labels,
            sample_size=sample_size,
            random_state=RANDOM_STATE,
        )
        rows.append(
            {
                "k": k,
                "inertia": float(model.inertia_),
                "silhouette": float(silhouette),
            }
        )
    return pd.DataFrame(rows)


def safe_silhouette(matrix: np.ndarray, labels: np.ndarray) -> float | None:
    mask = labels != -1
    unique = np.unique(labels[mask])
    if len(unique) < 2 or int(mask.sum()) < 3:
        return None
    return float(
        silhouette_score(
            matrix[mask],
            labels[mask],
            sample_size=min(5000, int(mask.sum())),
            random_state=RANDOM_STATE,
        )
    )


def build_segment_names(
    rfm: pd.DataFrame,
    labels: np.ndarray,
) -> tuple[pd.DataFrame, dict[int, str]]:
    profiled = rfm.copy()
    profiled["cluster"] = labels
    profiles = (
        profiled.groupby("cluster")
        .agg(
            customers=("CustomerID", "count"),
            recency_days=("recency_days", "mean"),
            frequency_orders=("frequency_orders", "mean"),
            monetary_value=("monetary_value", "mean"),
            average_order_value=("average_order_value", "mean"),
        )
        .reset_index()
    )

    z = profiles[["recency_days", "frequency_orders", "monetary_value"]].copy()
    for column in z:
        std = float(z[column].std(ddof=0))
        if std == 0:
            z[column] = 0.0
        else:
            z[column] = (z[column] - z[column].mean()) / std
    profiles["value_score"] = (
        -z["recency_days"] + z["frequency_orders"] + z["monetary_value"]
    )

    # Human-readable labels are *interpretations of measured RFM*, not fixed
    # names assigned by arbitrary cluster rank. The thresholds below are
    # explicit teaching heuristics, not learned business ground truth.
    def describe(row: pd.Series) -> str:
        days, orders, spend = (
            float(row["recency_days"]),
            float(row["frequency_orders"]),
            float(row["monetary_value"]),
        )
        if days <= 45 and orders >= 3 and spend >= 2000:
            return "High-value active customers"
        if days <= 45 and orders >= 3:
            return "Active repeat customers"
        if days <= 45:
            return "Recent occasional customers"
        if days > 90 and orders < 3:
            return "Lapsing occasional customers"
        if days > 90:
            return "Lapsing repeat customers"
        if orders >= 3:
            return "Repeat customers needing re-engagement"
        return "Occasional customers needing re-engagement"

    names: dict[int, str] = {}
    used: set[str] = set()
    for _, row in profiles.sort_values("value_score", ascending=False).iterrows():
        cluster = int(row["cluster"])
        label = describe(row)
        if label in used:
            label = f"{label} (group {cluster})"
        used.add(label)
        names[cluster] = label
    profiles["segment_name"] = profiles["cluster"].map(names)
    return profiles.sort_values("value_score", ascending=False), names


def save_figures(
    rfm: pd.DataFrame,
    matrix: np.ndarray,
    labels: np.ndarray,
    k_table: pd.DataFrame,
    profiles: pd.DataFrame,
    method_rows: list[dict],
) -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)

    fig, axes = plt.subplots(1, 3, figsize=(13, 4))
    for ax, column, title in zip(
        axes,
        RFM_COLUMNS,
        ["Recency", "Frequency", "Monetary value"],
    ):
        ax.hist(rfm[column], bins=40)
        ax.set_title(title)
        ax.set_xlabel(column)
        ax.set_ylabel("Customers")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "rfm_distributions.png", dpi=160)
    plt.close(fig)

    fig, ax1 = plt.subplots(figsize=(8, 5))
    ax1.plot(k_table["k"], k_table["silhouette"], marker="o")
    ax1.set_xlabel("Number of K-Means clusters (k)")
    ax1.set_ylabel("Silhouette score")
    ax1.set_title("Choose k using separation, not guesswork")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "k_selection.png", dpi=160)
    plt.close(fig)

    pca = PCA(n_components=2, random_state=RANDOM_STATE)
    coords = pca.fit_transform(matrix)
    fig, ax = plt.subplots(figsize=(8, 6))
    scatter = ax.scatter(coords[:, 0], coords[:, 1], c=labels, s=12, alpha=0.65)
    ax.set_xlabel("PCA component 1")
    ax.set_ylabel("PCA component 2")
    ax.set_title("Customer segments projected to two dimensions")
    fig.colorbar(scatter, ax=ax, label="Cluster")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "pca_segments.png", dpi=160)
    plt.close(fig)

    profile_plot = profiles.sort_values("value_score", ascending=False)
    fig, ax = plt.subplots(figsize=(9, 5))
    x = np.arange(len(profile_plot))
    width = 0.25
    standardized = profile_plot[
        ["recency_days", "frequency_orders", "monetary_value"]
    ].copy()
    for column in standardized:
        std = float(standardized[column].std(ddof=0))
        standardized[column] = (
            0.0
            if std == 0
            else (standardized[column] - standardized[column].mean()) / std
        )
    ax.bar(x - width, -standardized["recency_days"], width, label="Recency strength")
    ax.bar(x, standardized["frequency_orders"], width, label="Frequency")
    ax.bar(x + width, standardized["monetary_value"], width, label="Monetary")
    ax.set_xticks(x)
    ax.set_xticklabels(profile_plot["segment_name"], rotation=20, ha="right")
    ax.set_title("How the selected segments differ")
    ax.legend()
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "cluster_profiles.png", dpi=160)
    plt.close(fig)

    methods = pd.DataFrame(method_rows)
    valid = methods.dropna(subset=["silhouette"])
    fig, ax = plt.subplots(figsize=(8, 4.5))
    ax.bar(valid["method"], valid["silhouette"])
    ax.set_ylabel("Silhouette score")
    ax.set_title("Clustering-method comparison")
    ax.tick_params(axis="x", rotation=15)
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "method_comparison.png", dpi=160)
    plt.close(fig)


def main() -> None:
    MODEL_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)

    raw = load_transactions()
    cleaned = clean_transactions(raw)
    rfm, snapshot = build_rfm(cleaned)
    scaler, matrix = transform_rfm(rfm)

    k_table = compare_kmeans(matrix)
    selected_k = int(
        k_table.sort_values(
            ["silhouette", "k"],
            ascending=[False, True],
        ).iloc[0]["k"]
    )

    kmeans = KMeans(
        n_clusters=selected_k,
        n_init=30,
        random_state=RANDOM_STATE,
    )
    kmeans_labels = kmeans.fit_predict(matrix)
    kmeans_silhouette = float(
        silhouette_score(
            matrix,
            kmeans_labels,
            sample_size=min(5000, len(matrix)),
            random_state=RANDOM_STATE,
        )
    )

    hierarchical = AgglomerativeClustering(n_clusters=selected_k)
    hierarchical_labels = hierarchical.fit_predict(matrix)
    hierarchical_silhouette = float(
        silhouette_score(
            matrix,
            hierarchical_labels,
            sample_size=min(5000, len(matrix)),
            random_state=RANDOM_STATE,
        )
    )

    dbscan = DBSCAN(eps=0.65, min_samples=8)
    dbscan_labels = dbscan.fit_predict(matrix)
    dbscan_silhouette = safe_silhouette(matrix, dbscan_labels)

    profiles, names = build_segment_names(rfm, kmeans_labels)
    segmented = rfm.copy()
    segmented["cluster"] = kmeans_labels
    segmented["segment_name"] = segmented["cluster"].map(names)

    method_rows = [
        {
            "method": f"K-Means (k={selected_k})",
            "silhouette": kmeans_silhouette,
            "clusters": selected_k,
            "noise_customers": 0,
        },
        {
            "method": f"Hierarchical (k={selected_k})",
            "silhouette": hierarchical_silhouette,
            "clusters": selected_k,
            "noise_customers": 0,
        },
        {
            "method": "DBSCAN",
            "silhouette": dbscan_silhouette,
            "clusters": int(len(set(dbscan_labels)) - (1 if -1 in dbscan_labels else 0)),
            "noise_customers": int((dbscan_labels == -1).sum()),
        },
    ]

    k_table.to_csv(OUTPUT_DIR / "kmeans_k_comparison.csv", index=False)
    pd.DataFrame(method_rows).to_csv(
        OUTPUT_DIR / "clustering_method_comparison.csv",
        index=False,
    )
    profiles.to_csv(OUTPUT_DIR / "segment_profiles.csv", index=False)
    segmented.to_csv(OUTPUT_DIR / "customer_segments.csv", index=False)

    bundle = {
        "scaler": scaler,
        "kmeans": kmeans,
        "rfm_columns": RFM_COLUMNS,
        "segment_names": names,
        "segment_profiles": profiles,
        "snapshot_date": str(snapshot.date()),
        "selected_k": selected_k,
    }
    joblib.dump(bundle, MODEL_DIR / "customer_segmenter.joblib")
    reloaded = joblib.load(MODEL_DIR / "customer_segmenter.joblib")

    example = pd.DataFrame(
        [{"recency_days": 30, "frequency_orders": 5, "monetary_value": 800.0}]
    )
    example_matrix = reloaded["scaler"].transform(np.log1p(example[RFM_COLUMNS]))
    example_cluster = int(reloaded["kmeans"].predict(example_matrix)[0])

    metrics = {
        "raw_rows": int(len(raw)),
        "clean_purchase_rows": int(len(cleaned)),
        "customers": int(len(rfm)),
        "snapshot_date": str(snapshot.date()),
        "selected_k": selected_k,
        "kmeans_silhouette": kmeans_silhouette,
        "hierarchical_silhouette": hierarchical_silhouette,
        "dbscan_silhouette": dbscan_silhouette,
        "dbscan_noise_customers": int((dbscan_labels == -1).sum()),
        "example_cluster": example_cluster,
        "example_segment": names[example_cluster],
    }
    (OUTPUT_DIR / "metrics.json").write_text(
        json.dumps(metrics, indent=2) + "\n",
        encoding="utf-8",
    )

    save_figures(
        rfm,
        matrix,
        kmeans_labels,
        k_table,
        profiles,
        method_rows,
    )

    print("Customer segmentation build completed.")
    print(json.dumps(metrics, indent=2))
    print("\nSelected K-Means profiles:")
    print(
        profiles[
            [
                "cluster",
                "segment_name",
                "customers",
                "recency_days",
                "frequency_orders",
                "monetary_value",
            ]
        ].to_string(index=False)
    )


if __name__ == "__main__":
    main()
