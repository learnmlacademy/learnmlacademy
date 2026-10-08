"""Download the official stable MovieLens 100K dataset from GroupLens."""

from __future__ import annotations

from pathlib import Path
import shutil
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
ARCHIVE = DATA_DIR / "ml-100k.zip"
EXTRACTED = DATA_DIR / "ml-100k"
URL = "https://files.grouplens.org/datasets/movielens/ml-100k.zip"

EXPECTED_RATINGS = 100_000
EXPECTED_USERS = 943
EXPECTED_MOVIES = 1_682


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    print("Downloading official MovieLens 100K archive from GroupLens...")
    with urllib.request.urlopen(URL, timeout=120) as response, ARCHIVE.open("wb") as output:
        shutil.copyfileobj(response, output)

    with zipfile.ZipFile(ARCHIVE) as zipped:
        names = set(zipped.namelist())
        required = {"ml-100k/u.data", "ml-100k/u.item", "ml-100k/u.genre"}
        missing = required.difference(names)
        if missing:
            raise RuntimeError(f"MovieLens archive is missing expected files: {sorted(missing)}")
        zipped.extractall(DATA_DIR)

    rating_lines = sum(1 for _ in (EXTRACTED / "u.data").open("r", encoding="latin-1"))
    movie_lines = sum(1 for _ in (EXTRACTED / "u.item").open("r", encoding="latin-1"))
    users = set()
    with (EXTRACTED / "u.data").open("r", encoding="latin-1") as handle:
        for line in handle:
            users.add(int(line.split("\t", 1)[0]))

    if rating_lines != EXPECTED_RATINGS or movie_lines != EXPECTED_MOVIES or len(users) != EXPECTED_USERS:
        raise RuntimeError(
            "Unexpected MovieLens 100K shape: "
            f"ratings={rating_lines}, users={len(users)}, movies={movie_lines}"
        )

    print(f"Verified ratings: {rating_lines:,}")
    print(f"Verified users:   {len(users):,}")
    print(f"Verified movies:  {movie_lines:,}")
    print(f"Extracted to: {EXTRACTED}")


if __name__ == "__main__":
    main()
