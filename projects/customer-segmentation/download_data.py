"""Download and validate the UCI Online Retail dataset."""

from __future__ import annotations

from pathlib import Path
import hashlib
import urllib.request
import zipfile

import pandas as pd

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
ZIP_PATH = DATA_DIR / "online-retail.zip"
XLSX_PATH = DATA_DIR / "Online Retail.xlsx"

SOURCE_URL = "https://archive.ics.uci.edu/static/public/352/online+retail.zip"
EXPECTED_ROWS = 541_909
EXPECTED_COLUMNS = [
    "InvoiceNo",
    "StockCode",
    "Description",
    "Quantity",
    "InvoiceDate",
    "UnitPrice",
    "CustomerID",
    "Country",
]


def download_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "LearnMLAcademy-customer-segmentation/1.0"},
    )
    with urllib.request.urlopen(request, timeout=180) as response:
        return response.read()


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    raw = download_bytes(SOURCE_URL)
    sha256 = hashlib.sha256(raw).hexdigest()
    ZIP_PATH.write_bytes(raw)

    with zipfile.ZipFile(ZIP_PATH) as archive:
        names = archive.namelist()
        if "Online Retail.xlsx" not in names:
            raise RuntimeError(
                f"Unexpected UCI archive contents: {names}. "
                "Do not continue until reviewed."
            )
        archive.extract("Online Retail.xlsx", DATA_DIR)

    frame = pd.read_excel(XLSX_PATH)
    if len(frame) != EXPECTED_ROWS:
        raise RuntimeError(
            f"Unexpected row count {len(frame):,}; expected {EXPECTED_ROWS:,}."
        )
    if list(frame.columns) != EXPECTED_COLUMNS:
        raise RuntimeError(
            "Unexpected Online Retail schema. Do not continue until reviewed."
        )

    print("UCI dataset: Online Retail (ID 352)")
    print(f"Rows: {len(frame):,}")
    print(f"Columns: {frame.shape[1]}")
    print(f"CustomerID missing: {int(frame['CustomerID'].isna().sum()):,}")
    print(f"Archive SHA256: {sha256}")
    print(f"Saved: {XLSX_PATH}")


if __name__ == "__main__":
    main()
