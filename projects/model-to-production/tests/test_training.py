import joblib
import numpy as np
import pytest
from src.contract import FEATURES, NUMERIC
from src.train import read_dataset, split_data, make_pipeline, train


def test_dataset_contract():
    frame = read_dataset()
    assert frame.shape == (7043, 21)
    assert frame.TotalCharges.isna().sum() == 11
    assert frame.Churn.value_counts().to_dict() == {"No": 5174, "Yes": 1869}


def test_disjoint_split():
    X_train, X_test, y_train, y_test = split_data(read_dataset())
    assert len(X_train) == 5634 and len(X_test) == 1409
    assert set(X_train.index).isdisjoint(X_test.index)
    assert X_train.columns.tolist() == FEATURES
    assert abs(y_train.mean() - y_test.mean()) < 0.001


def test_preprocessing_is_fitted_only_on_training_rows():
    X_train, _, y_train, _ = split_data(read_dataset())
    pipeline = make_pipeline().fit(X_train, y_train)
    numeric = pipeline.named_steps["prepare"].named_transformers_["numeric"]
    np.testing.assert_allclose(numeric.named_steps["impute"].statistics_, X_train[NUMERIC].median())
    np.testing.assert_allclose(numeric.named_steps["scale"].mean_, X_train[NUMERIC].fillna(X_train[NUMERIC].median()).mean())
    assert numeric.named_steps["scale"].n_samples_seen_ == 5634


def test_artifact_metadata_reload_determinism_and_immutability(tmp_path):
    first = train("v1", tmp_path)
    second = train("v2", tmp_path)
    assert first["metrics"] == second["metrics"]
    assert (tmp_path / "v1" / "metadata.json").is_file()
    p1 = joblib.load(tmp_path / "v1" / "model.joblib")
    p2 = joblib.load(tmp_path / "v2" / "model.joblib")
    frame = read_dataset().iloc[:5][FEATURES]
    np.testing.assert_array_equal(p1.predict(frame), p2.predict(frame))
    np.testing.assert_allclose(p1.predict_proba(frame), p2.predict_proba(frame), rtol=0, atol=0)
    with pytest.raises(FileExistsError):
        train("v1", tmp_path)
