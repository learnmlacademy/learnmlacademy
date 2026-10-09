"""Build small, deterministic, source-only student starter ZIPs.

Run from repository root: python scripts/build-project-starters.py
No datasets, trained models, local caches, screenshots, user data or secrets.
Each archived file remains the exact original project source content.
"""
from __future__ import annotations

from pathlib import Path
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "public" / "project-starters"
PROJECT_DIRS = {
    "titanic-survival": "titanic-survival-predictor",
    "house-price": "house-price-predictor",
    "credit-card-fraud": "credit-card-fraud",
    "customer-segmentation": "customer-segmentation",
    "retail-forecasting": "retail-forecasting",
    "movie-recommender": "movie-recommender",
    "disaster-tweets": "disaster-tweets",
    "digit-recognizer": "digit-recognizer",
    "ai-content-creator": "ai-content-studio",
    "pdf-rag": "pdf-rag",
    "ai-research-assistant": "ai-research-assistant",
    "model-to-production": "model-to-production",
}
ALLOWED = {".py", ".md", ".txt", ".toml", ".yml", ".yaml", ".json", ".sh", ".ini", ".cfg"}
SPECIAL = {"Dockerfile", "Makefile", ".gitignore", ".dockerignore", "Procfile"}
SKIP_DIRS = {"data", "models", "artifacts", "outputs", "storage", "sample_docs",
             "__pycache__", ".venv", ".pytest_cache", ".mypy_cache", ".git"}
SKIP_PARTS = {"scripts/capture_screenshots.py", "scripts/capture_app_screenshots.py",
              "scripts/verify_handbook_page.py", "scripts/capture_app_screenshot.py",
              "scripts/capture_vscode_screenshots.sh", "scripts/capture_three_projects.py"}
BAD_NAMES = {".env", ".env.local", "credentials.json", "secrets.json", "token.json"}
BANNED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".webp", ".parquet", ".csv",
                     ".xlsx", ".joblib", ".pkl", ".onnx", ".pt", ".bin", ".npy"}

def allowed(path: Path, relative: Path) -> bool:
    if path.is_symlink() or any(p in SKIP_DIRS for p in relative.parts[:-1]):
        return False
    if relative.name in BAD_NAMES or relative.suffix.lower() in BANNED_EXTENSIONS:
        return False
    if str(relative).replace("\\", "/") in SKIP_PARTS:
        return False
    if relative.name.startswith(".env") or "secret" in relative.name.lower():
        return False
    return relative.suffix.lower() in ALLOWED or relative.name in SPECIAL

def build() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    manifest = []
    for slug, project in PROJECT_DIRS.items():
        directory = ROOT / "projects" / project
        if not directory.is_dir():
            raise FileNotFoundError(directory)
        files = sorted(p for p in directory.rglob("*") if p.is_file()
                       and allowed(p, p.relative_to(directory)))
        relative_names = {str(p.relative_to(directory)).replace("\\", "/") for p in files}
        if "README.md" not in relative_names or not any(p.endswith(".py") for p in relative_names):
            raise ValueError(f"Missing README or implementation Python code in {directory}")
        archive = DESTINATION / (slug + ".zip")
        with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
            def add(name: str, data: bytes) -> None:
                item = zipfile.ZipInfo(project + "/" + name, date_time=(2020, 1, 1, 0, 0, 0))
                item.compress_type = zipfile.ZIP_DEFLATED
                item.external_attr = 0o644 << 16
                z.writestr(item, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
            guidance = (
                "LearnMLAcademy verified-source starter kit\n\n"
                f"Project: {slug}\n"
                "1. Open README.md and follow the exact project instructions.\n"
                "2. In VS Code use File -> Open Folder and select this extracted folder.\n"
                "3. Create and activate a Python virtual environment before installing requirements.\n"
                "4. Install requirements.txt, download official data only where instructed, and run tests.\n"
                "5. Training data, model artifacts and captured screenshots are deliberately NOT bundled.\n"
                "6. The online handbook explains every stage with diagrams and full code.\n"
                "7. Never load untrusted pickle/joblib files or paste real API keys in source.\n"
                f"Handbook: https://www.learnmlacademy.com/projects/{slug}\n"
            )
            add("START_HERE.txt", guidance.encode("utf-8"))
            for item in files:
                relative = item.relative_to(directory).as_posix()
                add(relative, item.read_bytes())
        with zipfile.ZipFile(archive) as z:
            names = z.namelist()
            assert len(names) == len(files) + 1
            assert len(set(names)) == len(names)
            assert all(name.startswith(project + "/") and "../" not in name
                       and not name.startswith("/") for name in names)
            assert all(Path(name).suffix not in BANNED_EXTENSIONS for name in names)
            assert z.testzip() is None
        data = archive.read_bytes()
        manifest.append({
            "project": slug, "source_dir": project, "source_files": len(files),
            "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(),
        })
        print(f"CREATED {archive.relative_to(ROOT)}: {len(files)} source files, {len(data)} bytes")
    (DESTINATION / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    assert len(manifest) == 12

if __name__ == "__main__":
    build()
