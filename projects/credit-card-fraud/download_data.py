"""Download and validate the public OpenML credit-card fraud dataset."""

from __future__ import annotations

from pathlib import Path
import hashlib
import json
import urllib.request

import pandas as pd

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
DATA_PATH = DATA_DIR / "creditcard.parquet"

OPENML_ID = 1597
METADATA_URL = f"https://www.openml.org/api/v1/json/data/{OPENML_ID}"
EXPECTED_NAME = "creditcard"
EXPECTED_VERSION = "1"
EXPECTED_LICENSE = "Public"
EXPECTED_ROWS = 284_807
EXPECTED_COLUMNS = 31
EXPECTED_FRAUDS = 492
EXPECTED_SHA256 = "b7efcb35a428bbe22347a05d2437d9177bab07ce61e51214a17bec584ad9496d"
EXPECTED_FEATURES = ["Time", *[f"V{i}" for i in range(1, 29)], "Amount", "Class"]


def download_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "LearnMLAcademy-credit-card-fraud-handbook/1.0"},
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    metadata = json.loads(download_bytes(METADATA_URL).decode("utf-8"))[
        "data_set_description"
    ]
    if metadata["name"] != EXPECTED_NAME:
        raise RuntimeError(f"Unexpected OpenML dataset name: {metadata['name']!r}")
    if str(metadata["version"]) != EXPECTED_VERSION:
        raise RuntimeError(f"Unexpected OpenML version: {metadata['version']!r}")
    if metadata.get("licence") != EXPECTED_LICENSE:
        raise RuntimeError(f"Unexpected OpenML licence: {metadata.get('licence')!r}")

    parquet_url = metadata.get("parquet_url")
    if not parquet_url:
        raise RuntimeError("OpenML metadata did not provide a parquet_url.")

    raw = download_bytes(parquet_url)
    sha256 = hashlib.sha256(raw).hexdigest()
    if sha256 != EXPECTED_SHA256:
        raise RuntimeError(
            "OpenML parquet fingerprint changed: "
            f"{sha256}; expected {EXPECTED_SHA256}. "
            "Do not continue until the dataset change is reviewed."
        )
    DATA_PATH.write_bytes(raw)

    frame = pd.read_parquet(DATA_PATH)
    if frame.shape != (EXPECTED_ROWS, EXPECTED_COLUMNS):
        raise RuntimeError(
            f"Unexpected shape {frame.shape}; expected "
            f"({EXPECTED_ROWS}, {EXPECTED_COLUMNS})."
        )
    if list(frame.columns) != EXPECTED_FEATURES:
        raise RuntimeError(
            "Unexpected column order/schema. Do not continue until reviewed."
        )

    frame["Class"] = frame["Class"].astype(int)
    frauds = int(frame["Class"].sum())
    if frauds != EXPECTED_FRAUDS:
        raise RuntimeError(f"Unexpected fraud count {frauds}; expected {EXPECTED_FRAUDS}.")
    if set(frame["Class"].unique()) != {0, 1}:
        raise RuntimeError("Class must contain only 0 and 1.")

    print(f"OpenML dataset ID: {OPENML_ID}")
    print(f"Rows: {len(frame):,}")
    print(f"Columns: {frame.shape[1]}")
    print(f"Fraud transactions: {frauds}")
    print(f"Fraud rate: {frauds / len(frame):.6%}")
    print(f"SHA256: {sha256}")
    print(f"Saved: {DATA_PATH}")


if __name__ == "__main__":
    main()
