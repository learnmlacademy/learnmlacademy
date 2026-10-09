"""Download and validate UCI Online Retail for the customer-segmentation project."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path
import hashlib
import zipfile
import urllib.request

import pandas as pd

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
XLSX_PATH = DATA_DIR / "Online Retail.xlsx"
PARQUET_PATH = DATA_DIR / "online_retail.parquet"

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
# Fingerprint recorded from verified official UCI archive and enforced on every download.
EXPECTED_ZIP_SHA256 = "f5385cbb54bbebf7196389109c6b0621faab0c304e3702548165e71c84aede8b"


def download_bytes(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "LearnMLAcademy-customer-segmentation-handbook/1.0"},
    )
    with urllib.request.urlopen(request, timeout=180) as response:
        return response.read()


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    raw = download_bytes(SOURCE_URL)
    sha256 = hashlib.sha256(raw).hexdigest()
    if EXPECTED_ZIP_SHA256 and sha256 != EXPECTED_ZIP_SHA256:
        raise RuntimeError(
            "UCI dataset archive fingerprint changed: "
            f"{sha256}; expected {EXPECTED_ZIP_SHA256}. Review before continuing."
        )

    with zipfile.ZipFile(BytesIO(raw)) as archive:
        names = archive.namelist()
        workbook_name = next(
            (name for name in names if name.lower().endswith(".xlsx")),
            None,
        )
        if workbook_name is None:
            raise RuntimeError(f"Expected an XLSX workbook in archive, found: {names}")
        XLSX_PATH.write_bytes(archive.read(workbook_name))

    frame = pd.read_excel(XLSX_PATH, engine="openpyxl")
    if len(frame) != EXPECTED_ROWS:
        raise RuntimeError(
            f"Unexpected row count {len(frame):,}; expected {EXPECTED_ROWS:,}."
        )
    if list(frame.columns) != EXPECTED_COLUMNS:
        raise RuntimeError(
            f"Unexpected schema {list(frame.columns)!r}; expected {EXPECTED_COLUMNS!r}."
        )

    # Excel stores some identifier columns with mixed numeric/string values.
    # Normalize text identifiers before writing Parquet so Arrow does not
    # attempt to coerce cancellation invoice numbers such as "C536379" to int.
    for column in ["InvoiceNo", "StockCode", "Description", "Country"]:
        frame[column] = frame[column].astype("string")

    frame.to_parquet(PARQUET_PATH, index=False)

    print("UCI dataset: Online Retail (dataset 352)")
    print(f"Rows: {len(frame):,}")
    print(f"Columns: {len(frame.columns)}")
    print(f"CustomerID missing: {int(frame['CustomerID'].isna().sum()):,}")
    print(f"Archive SHA256: {sha256}")
    print(f"Saved workbook: {XLSX_PATH}")
    print(f"Saved parquet: {PARQUET_PATH}")


if __name__ == "__main__":
    main()
