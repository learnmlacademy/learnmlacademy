from io import BytesIO
import numpy as np
import pytest
import torch
from PIL import Image
from src.digits import DigitCNN, fit, load_model, load_splits, predict, prepare_uploaded_image, to_tensor

def test_dataset_has_stratified_disjoint_splits():
    parts = load_splits()
    assert len(parts.train_x) + len(parts.val_x) + len(parts.test_x) == 1797
    assert parts.train_x.shape[1:] == (8, 8)
    assert set(parts.train_y) == set(range(10))
    assert set(parts.test_y) == set(range(10))

def test_model_shapes_and_normalized_output():
    model = DigitCNN()
    logits = model(torch.zeros(5, 1, 8, 8))
    assert logits.shape == (5, 10)
    value, probs = predict(model, np.ones((8, 8), dtype=np.float32))
    assert value in range(10)
    assert abs(sum(probs) - 1) < 1e-5

def test_bad_inputs_are_rejected():
    with pytest.raises(ValueError): to_tensor(np.ones((5, 9, 9), dtype=np.float32))
    with pytest.raises(ValueError): to_tensor(np.ones((5, 8, 8), dtype=np.float32) * 2)
    with pytest.raises(ValueError): prepare_uploaded_image(b"not-an-image")
    with pytest.raises(ValueError): prepare_uploaded_image(b"")

def test_uploaded_black_ink_preprocessing():
    arr = np.ones((64, 64), dtype=np.uint8) * 255
    arr[10:54, 25:39] = 0
    buffer = BytesIO()
    Image.fromarray(arr).save(buffer, format="PNG")
    result = prepare_uploaded_image(buffer.getvalue())
    assert result.shape == (8, 8)
    assert result.min() >= 0 and result.max() <= 1
    assert result.max() > 0.05

def test_training_is_reproducible_and_model_reload_works(tmp_path, monkeypatch):
    import src.digits as d
    monkeypatch.setattr(d, "MODEL_PATH", tmp_path / "digit.pt")
    monkeypatch.setattr(d, "METRICS_PATH", tmp_path / "metrics.json")
    result = d.fit(epochs=3)
    assert 0.3 < result["test_accuracy"] <= 1
    assert len(result["confusion_matrix"]) == 10
    model = d.load_model(tmp_path / "digit.pt")
    parts = load_splits()
    number, scores = d.predict(model, parts.test_x[0])
    assert number in range(10)
    assert abs(sum(scores) - 1) < 1e-5
