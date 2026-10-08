"""Delete only the three known files in an explicitly confirmed local index."""
import argparse
from src.vector_store import index_path


def delete_index(name, confirmation, root=None):
    if confirmation != name:
        raise ValueError("--confirm must exactly match --name.")
    path = index_path(name) if root is None else index_path(name, root)
    expected = {"metadata.json", "chunks.json", "vectors.npy"}
    if not path.is_dir() or {p.name for p in path.iterdir()} != expected:
        raise ValueError("Not an intact known index; no files deleted.")
    if any(p.is_symlink() or not p.is_file() for p in path.iterdir()):
        raise ValueError("Unsafe index member; no files deleted.")
    for filename in sorted(expected):
        (path / filename).unlink()
    path.rmdir()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", required=True)
    parser.add_argument("--confirm", required=True)
    args = parser.parse_args()
    delete_index(args.name, args.confirm)
    print("Named index deleted; source PDFs were not deleted.")
