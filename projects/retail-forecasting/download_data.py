"""Download official UCI Online Retail, checksum-verified (same source as Project 4)."""
from pathlib import Path
from io import BytesIO
import hashlib
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parent
URL = "https://archive.ics.uci.edu/static/public/352/online+retail.zip"
SHA = "f5385cbb54bbebf7196389109c6b0621faab0c304e3702548165e71c84aede8b"

def main():
    destination = ROOT / "data" / "Online Retail.xlsx"
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        print("Existing file:", destination)
        return
    request = urllib.request.Request(URL, headers={"User-Agent": "LearnMLAcademy-Forecasting/1.0"})
    with urllib.request.urlopen(request, timeout=180) as response:
        body = response.read()
    digest = hashlib.sha256(body).hexdigest()
    if digest != SHA:
        raise RuntimeError(f"Official data archive hash changed: {digest}")
    with zipfile.ZipFile(BytesIO(body)) as archive:
        candidates = [n for n in archive.namelist() if n.lower().endswith(".xlsx")]
        if len(candidates) != 1:
            raise RuntimeError("Expected a single spreadsheet in the official archive")
        destination.write_bytes(archive.read(candidates[0]))
    print("Downloaded and checksum-verified:", destination)

if __name__ == "__main__":
    main()
