"""Load only locally trusted versioned artifacts; never fit during inference."""
from dataclasses import dataclass
from datetime import datetime
import hashlib
from importlib.metadata import version as package_version
from io import BytesIO
import json
from pathlib import Path
import platform
from typing import Literal

import joblib
from pydantic import BaseModel, ConfigDict, Field, model_validator
from sklearn.pipeline import Pipeline

from src.contract import ROOT, FEATURES, CATEGORIES, DATA_SHA256, DATA_URL, DATA_REVISION, validate_version


class ModelLoadError(RuntimeError):
    pass


class Metrics(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False)
    accuracy: float = Field(ge=0, le=1)
    precision: float = Field(ge=0, le=1)
    recall: float = Field(ge=0, le=1)
    f1: float = Field(ge=0, le=1)
    roc_auc: float = Field(ge=0, le=1)
    confusion_matrix: list[list[int]]
    majority_accuracy: float = Field(ge=0, le=1)


class Metadata(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False)
    schema_version: Literal[1]
    model_version: str
    trained_at: datetime
    algorithm: Literal["LogisticRegression"]
    parameters: dict
    features: list[str]
    categories: dict[str, list[str]]
    threshold: Literal[0.5]
    training_rows: Literal[5634]
    test_rows: Literal[1409]
    seed: Literal[42]
    dataset: dict[str, str]
    metrics: Metrics
    python_version: str
    packages: dict[str, str]
    artifact_sha256: str = Field(pattern=r"^[a-f0-9]{64}$")

    @model_validator(mode="after")
    def contract_matches(self):
        validate_version(self.model_version)
        if self.features != FEATURES or self.categories != CATEGORIES:
            raise ValueError("Artifact feature contract differs from this API.")
        if self.trained_at.tzinfo is None:
            raise ValueError("Training timestamp must include a timezone.")
        if self.dataset.get("sha256") != DATA_SHA256 or self.dataset.get("source") != DATA_URL or self.dataset.get("revision") != DATA_REVISION:
            raise ValueError("Dataset provenance mismatch.")
        matrix = self.metrics.confusion_matrix
        if len(matrix) != 2 or any(len(row) != 2 or any(type(x) is not int or x < 0 for x in row) for row in matrix):
            raise ValueError("Invalid confusion matrix.")
        if sum(map(sum, matrix)) != self.test_rows:
            raise ValueError("Confusion matrix does not cover the holdout.")
        return self


@dataclass(frozen=True)
class LoadedModel:
    pipeline: Pipeline
    metadata: Metadata


def load_version(version: str, models_dir: Path = ROOT / "models") -> LoadedModel:
    try:
        validate_version(version)
        root = models_dir.resolve()
        directory = (root / version).resolve()
        if directory.parent != root:
            raise ValueError("Version escapes trusted model directory.")
        paths = [directory / "metadata.json", directory / "model.joblib"]
        if any(path.resolve().parent != directory or not path.is_file() for path in paths):
            raise ValueError("Model or metadata missing, or outside the trusted version directory.")
        metadata = Metadata.model_validate_json(paths[0].read_text(encoding="utf-8"))
        if metadata.model_version != version:
            raise ValueError("Configured version and metadata disagree.")
        if metadata.python_version != platform.python_version():
            raise ValueError("Python version differs from the training environment.")
        for package in ("numpy", "pandas", "scikit-learn", "joblib"):
            if metadata.packages.get(package) != package_version(package):
                raise ValueError(f"Training/serving package mismatch: {package}")
        content = paths[1].read_bytes()
        if hashlib.sha256(content).hexdigest() != metadata.artifact_sha256:
            raise ValueError("Model checksum mismatch.")
        # Hash checks detect corruption, not malicious code. Metadata and artifact
        # must BOTH be maintained by a trusted operator; never accept uploads here.
        pipeline = joblib.load(BytesIO(content))
        if not isinstance(pipeline, Pipeline) or list(pipeline.named_steps) != ["prepare", "classifier"]:
            raise ValueError("Expected complete preprocessing/classification pipeline.")
        if pipeline.feature_names_in_.tolist() != FEATURES or pipeline.classes_.tolist() != [0, 1]:
            raise ValueError("Fitted pipeline contract mismatch.")
        return LoadedModel(pipeline, metadata)
    except Exception as error:
        raise ModelLoadError(f"Cannot load model {version!r}: {error}") from error


def load_active(config_path: Path = ROOT / "config" / "model.json", models_dir: Path = ROOT / "models"):
    try:
        config = json.loads(config_path.read_text(encoding="utf-8"))
        if not isinstance(config, dict) or set(config) != {"active_version"}:
            raise ValueError("config/model.json must contain only active_version.")
        return load_version(config["active_version"], models_dir)
    except ModelLoadError:
        raise
    except Exception as error:
        raise ModelLoadError(f"Invalid active model configuration: {error}") from error
