from __future__ import annotations

import io
import sys
import urllib.request
from pathlib import Path

import pandas as pd
from scipy.io import arff

PROJECT_ROOT = Path(__file__).resolve().parent
DATA_DIR = PROJECT_ROOT / "data"
OUTPUT_PATH = DATA_DIR / "ames_housing.parquet"

OPENML_DATASET_PAGE = "https://www.openml.org/search?id=43926&sort=runs&type=data"
OPENML_PARQUET_URL = "https://data.openml.org/datasets/0004/43926/dataset_43926.pq"
OPENML_ARFF_URL = "https://openml.org/data/v1/download/22102974/ames_housing.arff"


def _decode_bytes_columns(frame: pd.DataFrame) -> pd.DataFrame:
    for column in frame.columns:
        if frame[column].dtype == object:
            frame[column] = frame[column].map(
                lambda value: value.decode("utf-8") if isinstance(value, bytes) else value
            )
    return frame


def download_dataset() -> Path:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    print("Dataset: Ames Housing")
    print("Official OpenML page:", OPENML_DATASET_PAGE)
    print("Target: house sale price")
    print("Expected rows: 2,930")

    try:
        print("\nTrying the official OpenML parquet file...")
        frame = pd.read_parquet(OPENML_PARQUET_URL)
    except Exception as parquet_error:
        print("Parquet download failed:", parquet_error)
        print("Trying the official OpenML ARFF file instead...")
        try:
            with urllib.request.urlopen(OPENML_ARFF_URL, timeout=90) as response:
                raw_bytes = response.read()
            data, _meta = arff.loadarff(io.BytesIO(raw_bytes))
            frame = _decode_bytes_columns(pd.DataFrame(data))
        except Exception as arff_error:
            raise RuntimeError(
                "Could not download the Ames Housing dataset from OpenML. "
                "Check your internet connection and try again."
            ) from arff_error

    if len(frame) < 2900:
        raise RuntimeError(f"Dataset looks incomplete: only {len(frame)} rows were downloaded.")

    frame.to_parquet(OUTPUT_PATH, index=False)
    print(f"\nSaved {len(frame):,} rows and {len(frame.columns)} columns to:")
    print(OUTPUT_PATH)
    return OUTPUT_PATH


if __name__ == "__main__":
    try:
        download_dataset()
    except Exception as error:
        print(f"\nERROR: {error}", file=sys.stderr)
        raise
