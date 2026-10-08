"""Download the CC0 synthetic movie-ratings dataset from Datanemics."""

from __future__ import annotations

from pathlib import Path
import hashlib
import urllib.request

import pandas as pd

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
DATA_PATH = DATA_DIR / "movie-ratings.csv"

DATASET_PAGE = "https://datanemics.com/datasets/movie-ratings/"
CSV_URL = "https://datanemics.com/datasets/data/movie-ratings.csv"
LICENSE = "CC0 1.0 public domain"
EXPECTED_ROWS = 9_000
EXPECTED_USERS = 1_100
EXPECTED_MOVIES = 260
EXPECTED_SHA256 = "b9e41047db97680f0043a8bdcb18fd5cb25d8f4a6209d5ef536f0ba9b457af52"
EXPECTED_COLUMNS = [
    "user_id",
    "movie_id",
    "title",
    "genre",
    "release_year",
    "rating",
    "rated_at",
]


def download_bytes() -> bytes:
    request = urllib.request.Request(
        CSV_URL,
        headers={"User-Agent": "LearnMLAcademy/1.0 educational-project"},
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    print("Dataset: Datanemics Movie ratings")
    print("Dataset page:", DATASET_PAGE)
    print("License:", LICENSE)
    print("Synthetic dataset: yes")

    raw = download_bytes()
    sha256 = hashlib.sha256(raw).hexdigest()
    if sha256 != EXPECTED_SHA256:
        raise RuntimeError(
            "Downloaded CSV fingerprint changed: "
            f"{sha256}; expected {EXPECTED_SHA256}. "
            "Do not continue until the dataset change is reviewed."
        )
    DATA_PATH.write_bytes(raw)

    frame = pd.read_csv(DATA_PATH)
    if list(frame.columns) != EXPECTED_COLUMNS:
        raise RuntimeError(
            "Unexpected columns: "
            f"{list(frame.columns)}; expected {EXPECTED_COLUMNS}"
        )

    if len(frame) != EXPECTED_ROWS:
        raise RuntimeError(
            f"Unexpected row count: {len(frame):,}; expected {EXPECTED_ROWS:,}"
        )

    users = int(frame["user_id"].nunique())
    movies = int(frame["movie_id"].nunique())
    if users != EXPECTED_USERS or movies != EXPECTED_MOVIES:
        raise RuntimeError(
            "Unexpected entity counts: "
            f"users={users}, movies={movies}; "
            f"expected users={EXPECTED_USERS}, movies={EXPECTED_MOVIES}"
        )

    ratings = pd.to_numeric(frame["rating"], errors="raise")
    if float(ratings.min()) != 0.5 or float(ratings.max()) != 5.0:
        raise RuntimeError(
            f"Unexpected rating range: {ratings.min()} to {ratings.max()}"
        )

    print(f"Verified rows:    {len(frame):,}")
    print(f"Verified users:   {users:,}")
    print(f"Verified movies:  {movies:,}")
    print(f"Rating range:     {ratings.min():.1f} to {ratings.max():.1f}")
    print(f"SHA256:           {sha256}")
    print(f"Saved to:         {DATA_PATH}")


if __name__ == "__main__":
    main()
