import pytest
from scripts.delete_index import delete_index


def test_confirmed_deletion_is_confined(collection, tmp_path):
    first = collection[0].save("first", tmp_path)
    second = collection[0].save("second", tmp_path)
    with pytest.raises(ValueError): delete_index("first", "wrong", tmp_path)
    assert first.exists()
    delete_index("first", "first", tmp_path)
    assert not first.exists() and second.exists()
    with pytest.raises(ValueError): delete_index("../second", "../second", tmp_path)


def test_unexpected_members_are_not_removed(collection, tmp_path):
    path = collection[0].save("test", tmp_path)
    (path / "keep.txt").write_text("preserve")
    with pytest.raises(ValueError): delete_index("test", "test", tmp_path)
    assert (path / "keep.txt").read_text() == "preserve"
