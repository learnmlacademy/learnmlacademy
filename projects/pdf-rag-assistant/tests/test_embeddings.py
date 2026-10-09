import numpy as np
import pytest
from src.embedder import get_embedder, DIMENSION


def test_real_model_shape_norm_cache_and_padding():
    model = get_embedder()
    assert model is get_embedder()
    texts = ["Refund eligibility lasts 30 days.", "Employees can work remotely three days each week."]
    together = model.encode(texts)
    assert together.shape == (2, DIMENSION)
    np.testing.assert_allclose(np.linalg.norm(together, axis=1), 1, atol=1e-6)
    np.testing.assert_allclose(together[0], model.encode(texts[:1])[0], atol=1e-6)
    np.testing.assert_allclose(together, model.encode(texts), atol=1e-6)


def test_long_text_and_empty_input_not_silently_truncated():
    model = get_embedder()
    for texts in [[], [""], ["refund " * 300]]:
        with pytest.raises(ValueError): model.encode(texts)
