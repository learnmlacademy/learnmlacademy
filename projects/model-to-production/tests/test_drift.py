import numpy as np
import pytest
from src.train import read_dataset, split_data
from src.drift import reference_statistics, check_drift


def batches():
    train, _, _, _ = split_data(read_dataset())
    normal = train.sample(n=1000, random_state=73).reset_index(drop=True)
    shifted = normal.copy()
    shifted["MonthlyCharges"] += 80
    shifted["Contract"] = "Month-to-month"
    return reference_statistics(train), normal, shifted


def test_normal_and_shifted_batches_are_distinguished():
    reference, normal, shifted = batches()
    assert reference["training_rows"] == 5634
    assert all(item["status"] == "OK" for item in check_drift(normal, reference)["features"].values())
    result = check_drift(shifted, reference)
    assert result["features"]["MonthlyCharges"]["status"] == "DRIFT DETECTED"
    assert result["features"]["Contract"]["status"] == "WARNING"


@pytest.mark.parametrize("change", ["tiny", "columns", "infinite", "all-missing", "category"])
def test_invalid_batches_fail_clearly(change):
    reference, normal, _ = batches()
    if change == "tiny": normal = normal.head(10)
    elif change == "columns": normal = normal.drop(columns="tenure")
    elif change == "infinite": normal.loc[0, "MonthlyCharges"] = float("inf")
    elif change == "all-missing": normal["TotalCharges"] = np.nan
    elif change == "category": normal.loc[0, "Contract"] = "unknown"
    with pytest.raises(ValueError):
        check_drift(normal, reference)
