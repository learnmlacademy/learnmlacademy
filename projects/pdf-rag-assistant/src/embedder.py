"""Pinned local MiniLM ONNX + explicit mask-aware pooling; no embedding API."""
from functools import lru_cache
import hashlib
from pathlib import Path
from threading import Lock
import numpy as np
from huggingface_hub import hf_hub_download
from huggingface_hub.errors import LocalEntryNotFoundError
from tokenizers import Tokenizer

ROOT = Path(__file__).resolve().parents[1]
MODEL = "sentence-transformers/all-MiniLM-L6-v2"
REVISION = "1110a243fdf4706b3f48f1d95db1a4f5529b4d41"
DIMENSION = 384
CONTRACT = {"model": MODEL, "revision": REVISION, "dimension": DIMENSION,
            "pooling": "attention-mask-mean", "normalized": True, "max_tokens": 256}
HASHES = {"tokenizer.json": "be50c3628f2bf5bb5e3a7f17b1f74611b2561a3a27eeab05e5aa30f411572037",
          "onnx/model.onnx": "6fd5d72fe4589f189f8ebc006442dbb529bb7ce38f8082112682524616046452"}


def model_file(name):
    settings = dict(revision=REVISION, token=False, cache_dir=ROOT / ".cache" / "huggingface")
    try:
        path = Path(hf_hub_download(MODEL, name, local_files_only=True, **settings))
    except LocalEntryNotFoundError:
        path = Path(hf_hub_download(MODEL, name, **settings))
    if hashlib.sha256(path.read_bytes()).hexdigest() != HASHES[name]:
        raise ValueError("Pinned embedding asset checksum mismatch.")
    return path


@lru_cache(maxsize=1)
def get_tokenizer():
    tokenizer = Tokenizer.from_file(str(model_file("tokenizer.json")))
    tokenizer.no_truncation()
    tokenizer.no_padding()
    return tokenizer


class Embedder:
    contract = CONTRACT

    def __init__(self):
        import onnxruntime as ort
        self.tokenizer = Tokenizer.from_file(str(model_file("tokenizer.json")))
        self.tokenizer.no_truncation()
        self.tokenizer.enable_padding(pad_id=0, pad_token="[PAD]")
        options = ort.SessionOptions()
        options.intra_op_num_threads = 2
        options.inter_op_num_threads = 1
        self.session = ort.InferenceSession(str(model_file("onnx/model.onnx")), options,
                                           providers=["CPUExecutionProvider"])
        self.lock = Lock()

    def encode(self, texts, batch_size=16):
        if not texts or not 1 <= batch_size <= 64 or any(not isinstance(t, str) or not t.strip() for t in texts):
            raise ValueError("Supply nonempty texts and a batch size from 1 to 64.")
        batches = []
        with self.lock:
            for start in range(0, len(texts), batch_size):
                encoded = self.tokenizer.encode_batch(texts[start:start + batch_size])
                if any(len(item.ids) > 256 for item in encoded):
                    raise ValueError("Text exceeds 256 model tokens; shorten question/chunks. No silent truncation.")
                inputs = {"input_ids": np.array([e.ids for e in encoded], dtype=np.int64),
                          "attention_mask": np.array([e.attention_mask for e in encoded], dtype=np.int64),
                          "token_type_ids": np.array([e.type_ids for e in encoded], dtype=np.int64)}
                feeds = {item.name: inputs[item.name] for item in self.session.get_inputs()}
                token_vectors = self.session.run(None, feeds)[0]
                mask = inputs["attention_mask"][..., None].astype(np.float32)
                pooled = (token_vectors * mask).sum(axis=1) / mask.sum(axis=1).clip(min=1)
                pooled /= np.linalg.norm(pooled, axis=1, keepdims=True).clip(min=1e-12)
                batches.append(pooled.astype(np.float32))
        result = np.concatenate(batches)
        if result.shape != (len(texts), DIMENSION) or not np.isfinite(result).all():
            raise ValueError("Embedding output violates the model contract.")
        return result


@lru_cache(maxsize=1)
def get_embedder():
    # Cache weights/session only, never document text, indexes or answers.
    return Embedder()
