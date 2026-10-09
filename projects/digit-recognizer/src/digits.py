"""Reproducible digit classification using scikit-learn's built-in 8x8 images.

A small PyTorch CNN is trained from scratch; the model is not pretrained.
The test split remains untouched until final evaluation.
"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import json

import numpy as np
import torch
from PIL import Image, ImageOps
from sklearn.datasets import load_digits
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.model_selection import train_test_split
from torch import nn

ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = ROOT / "artifacts" / "digits-cnn.pt"
METRICS_PATH = ROOT / "artifacts" / "metrics.json"
SEED = 42

class DigitCNN(nn.Module):
    """8x8 greyscale image -> 10 handwritten-digit probabilities."""
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2),
        )
        self.classifier = nn.Sequential(nn.Flatten(), nn.Linear(32 * 2 * 2, 64),
                                        nn.ReLU(), nn.Linear(64, 10))

    def forward(self, images: torch.Tensor) -> torch.Tensor:
        return self.classifier(self.features(images))


@dataclass
class Splits:
    train_x: np.ndarray
    val_x: np.ndarray
    test_x: np.ndarray
    train_y: np.ndarray
    val_y: np.ndarray
    test_y: np.ndarray


def load_splits(seed: int = SEED) -> Splits:
    images, targets = load_digits(return_X_y=False).images, load_digits(return_X_y=False).target
    images = (images / 16.0).astype(np.float32)
    first_x, test_x, first_y, test_y = train_test_split(
        images, targets, test_size=0.20, random_state=seed, stratify=targets
    )
    train_x, val_x, train_y, val_y = train_test_split(
        first_x, first_y, test_size=0.20, random_state=seed, stratify=first_y
    )
    return Splits(train_x, val_x, test_x, train_y, val_y, test_y)


def to_tensor(images: np.ndarray) -> torch.Tensor:
    if images.ndim != 3 or images.shape[1:] != (8, 8):
        raise ValueError("Expected (N, 8, 8) greyscale images")
    if not np.isfinite(images).all() or images.min() < 0 or images.max() > 1:
        raise ValueError("Images must be finite pixel intensities from 0 to 1")
    return torch.from_numpy(images.astype(np.float32)).unsqueeze(1)


def fit(epochs: int = 15, learning_rate: float = 0.003, seed: int = SEED) -> dict:
    if epochs < 1 or epochs > 100:
        raise ValueError("Choose between 1 and 100 epochs")
    torch.manual_seed(seed)
    np.random.seed(seed)
    torch.set_num_threads(2)
    parts = load_splits(seed)
    model = DigitCNN()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
    criterion = nn.CrossEntropyLoss()
    x, y = to_tensor(parts.train_x), torch.from_numpy(parts.train_y).long()
    history = []
    for epoch in range(epochs):
        model.train()
        order = torch.randperm(len(x))
        for indices in order.split(64):
            optimizer.zero_grad()
            logits = model(x[indices])
            loss = criterion(logits, y[indices])
            loss.backward()
            optimizer.step()
        model.eval()
        with torch.no_grad():
            val_logits = model(to_tensor(parts.val_x))
            val_accuracy = (val_logits.argmax(dim=1).numpy() == parts.val_y).mean()
        history.append({"epoch": epoch + 1, "train_loss": float(loss.item()),
                        "val_accuracy": round(float(val_accuracy), 6)})
    model.eval()
    with torch.no_grad():
        predictions = model(to_tensor(parts.test_x)).argmax(dim=1).numpy()
    accuracy = float(accuracy_score(parts.test_y, predictions))
    confusion = confusion_matrix(parts.test_y, predictions, labels=list(range(10)))
    metrics = {"dataset": "scikit-learn digits (1,797 8x8 images)",
               "seed": seed, "epochs": epochs, "test_accuracy": accuracy,
               "history": history, "confusion_matrix": confusion.tolist(),
               "classification_report": classification_report(parts.test_y, predictions,
                                                               output_dict=True, zero_division=0)}
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    torch.save(model.state_dict(), MODEL_PATH)
    METRICS_PATH.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    return metrics


def load_model(model_path: Path = MODEL_PATH) -> DigitCNN:
    model = DigitCNN()
    model.load_state_dict(torch.load(model_path, map_location="cpu", weights_only=True))
    model.eval()
    return model


def prepare_uploaded_image(raw: bytes) -> np.ndarray:
    """Convert a learner-uploaded drawing into the dataset's bright-ink 8x8 convention."""
    from io import BytesIO
    if not raw or len(raw) > 4_000_000:
        raise ValueError("Upload a nonempty image smaller than 4 MB")
    try:
        with Image.open(BytesIO(raw)) as image:
            if image.width > 4096 or image.height > 4096:
                raise ValueError("Image dimensions are too large")
            gray = image.convert("L")
            # Convention: dark background with light strokes as in sklearn digits.
            if float(np.asarray(gray).mean()) > 127:
                gray = ImageOps.invert(gray)
            gray = ImageOps.autocontrast(gray)
            gray = ImageOps.pad(gray, (8, 8), color=0)
            arr = np.asarray(gray, dtype=np.float32) / 255.0
    except (OSError, SyntaxError) as exc:
        raise ValueError("Cannot decode this image") from exc
    if arr.max() < 0.05:
        raise ValueError("No visible digit found")
    return arr


def predict(model: DigitCNN, image: np.ndarray) -> tuple[int, list[float]]:
    tensor = to_tensor(image[None])
    with torch.no_grad():
        probabilities = torch.softmax(model(tensor), dim=1)[0].numpy()
    return int(probabilities.argmax()), probabilities.tolist()
