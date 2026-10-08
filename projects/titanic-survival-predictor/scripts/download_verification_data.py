from __future__ import annotations

import hashlib
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
OUTPUT = DATA_DIR / "train.csv"

URL = "https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv"
EXPECTED_SHA256 = "4a437fde05fe5264e1701a7387ac6fb75393772ba38bb2c9c566405af5af4bd7"


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(URL, timeout=90) as response:
        content = response.read()

    digest = hashlib.sha256(content).hexdigest()
    if digest != EXPECTED_SHA256:
        raise RuntimeError(
            "Verification dataset fingerprint changed. "
            f"Expected {EXPECTED_SHA256}, received {digest}."
        )

    OUTPUT.write_bytes(content)
    print(f"Saved verified Titanic training table to {OUTPUT}")
    print(f"SHA-256: {digest}")
    print("CI provenance: public Data Science Dojo mirror used only for reproducible verification.")
    print("Learner handbook path: Kaggle Titanic competition data after personal sign-in/rule acceptance.")


if __name__ == "__main__":
    main()
