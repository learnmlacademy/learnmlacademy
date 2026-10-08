import argparse
import json
from src.embedder import get_embedder
from src.llm import CompatibleProvider, ExtractiveProvider
from src.rag import answer_question
from src.vector_store import VectorStore


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--question", required=True)
    parser.add_argument("--name", default="demo")
    parser.add_argument("--provider", choices=["local", "remote"], default="local")
    args = parser.parse_args()
    provider = CompatibleProvider.from_env() if args.provider == "remote" else ExtractiveProvider()
    print(json.dumps(answer_question(args.question, VectorStore.load(args.name), get_embedder(), provider), indent=2))
