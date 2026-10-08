from __future__ import annotations

import json

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from src.contract import ROOT, FEATURES
from src.drift import check_drift

OUTPUT = ROOT / "outputs"


def metadata(version: str) -> dict:
    return json.loads(
        (ROOT / "models" / version / "metadata.json").read_text(encoding="utf-8")
    )


def main() -> None:
    OUTPUT.mkdir(exist_ok=True)
    v1 = metadata("v1")
    v2 = metadata("v2")

    labels = ["Accuracy", "Precision", "Recall", "F1", "ROC-AUC"]
    keys = ["accuracy", "precision", "recall", "f1", "roc_auc"]
    a = [v1["metrics"][key] for key in keys]
    b = [v2["metrics"][key] for key in keys]
    x = np.arange(len(labels))
    width = 0.36

    fig, ax = plt.subplots(figsize=(9, 5))
    ax.bar(x - width / 2, a, width, label="v1 (C=1.0)")
    ax.bar(x + width / 2, b, width, label="v2 (C=0.5)")
    ax.set_ylim(0, 1)
    ax.set_ylabel("Holdout metric")
    ax.set_title("v2 exists to teach rollout—not because it beats v1")
    ax.set_xticks(x)
    ax.set_xticklabels(labels)
    ax.legend()
    fig.tight_layout()
    fig.savefig(OUTPUT / "version_metrics.png", dpi=160)
    plt.close(fig)

    matrix = np.array(v1["metrics"]["confusion_matrix"])
    fig, ax = plt.subplots(figsize=(6, 5))
    image = ax.imshow(matrix)
    ax.set_xticks([0, 1], labels=["Predicted stay", "Predicted churn"])
    ax.set_yticks([0, 1], labels=["Actual stay", "Actual churn"])
    for row in range(2):
        for col in range(2):
            ax.text(col, row, str(matrix[row, col]), ha="center", va="center")
    ax.set_title("v1 holdout confusion matrix")
    fig.colorbar(image, ax=ax)
    fig.tight_layout()
    fig.savefig(OUTPUT / "v1_confusion_matrix.png", dpi=160)
    plt.close(fig)

    reference = json.loads(
        (ROOT / "models" / "v1" / "reference.json").read_text(encoding="utf-8")
    )
    shifted = pd.read_csv(ROOT / "data" / "shifted_batch.csv")[FEATURES]
    result = check_drift(shifted, reference)

    names = []
    ratios = []
    statuses = []
    for name in FEATURES:
        item = result["features"][name]
        if "absolute_mean_shift_in_training_std" in item:
            shift = item["absolute_mean_shift_in_training_std"]
            ratio = 2.0 if shift is None else float(shift) / 0.5
        else:
            ratio = float(item["total_variation_distance"]) / 0.15
        names.append(name)
        ratios.append(ratio)
        statuses.append(item["status"])

    fig, ax = plt.subplots(figsize=(10, 5.5))
    bars = ax.barh(names, ratios)
    ax.axvline(1.0, linestyle="--", label="Educational alert threshold")
    ax.set_xlabel("Observed shift ÷ configured threshold")
    ax.set_title("Shifted-batch drift evidence")
    ax.legend()
    for bar, status in zip(bars, statuses):
        ax.text(
            bar.get_width() + 0.04,
            bar.get_y() + bar.get_height() / 2,
            status,
            va="center",
            fontsize=8,
        )
    fig.tight_layout()
    fig.savefig(OUTPUT / "drift_evidence.png", dpi=160)
    plt.close(fig)

    print("Generated verified Project 12 handbook figures.")


if __name__ == "__main__":
    main()
