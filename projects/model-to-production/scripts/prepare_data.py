"""Download only the pinned public IBM sample; never send credentials."""
import hashlib
from pathlib import Path
import tempfile
from urllib.request import urlopen
from src.contract import DATA_PATH, DATA_SHA256, DATA_URL


def download(destination: Path = DATA_PATH) -> Path:
    if destination.exists():
        content = destination.read_bytes()
    else:
        with urlopen(DATA_URL, timeout=30) as response:
            content = response.read(2_000_001)
    if len(content) > 2_000_000 or hashlib.sha256(content).hexdigest() != DATA_SHA256:
        raise ValueError("Dataset checksum mismatch. Do not train; inspect the source/file.")
    if not destination.exists():
        destination.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(dir=destination.parent, delete=False) as file:
            temporary = Path(file.name)
            file.write(content)
        temporary.replace(destination)
    print(f"Dataset verified: {len(content)} bytes, SHA-256 {DATA_SHA256}")
    return destination


if __name__ == "__main__":
    download()
