from pathlib import Path
import importlib.util

import joblib
import pandas as pd
import pytest

ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "models" / "movie_recommender.joblib"

spec = importlib.util.spec_from_file_location("recommender", ROOT / "src" / "build_recommender.py")
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)


@pytest.fixture(scope="session")
def artifacts():
    assert MODEL.is_file(), "Run python src/build_recommender.py first."
    return joblib.load(MODEL)


def test_dataset_contract():
    ratings, movies = core.load_data()
    assert len(ratings) == 100_000
    assert ratings["user_id"].nunique() == 943
    assert len(movies) == 1_682
    assert set(["movie_id", "title", "genres"]).issubset(movies.columns)


@pytest.mark.parametrize("method", ["content", "collaborative", "hybrid"])
def test_recommendations_are_unique_and_exclude_query_movie(artifacts, method):
    movies = artifacts["movies"]
    toy_story_id = int(movies.loc[movies["title"] == "Toy Story (1995)", "movie_id"].iloc[0])
    result = core.recommend(artifacts, toy_story_id, method=method, top_n=10)
    assert len(result) == 10
    assert result["movie_id"].is_unique
    assert toy_story_id not in set(result["movie_id"])
    assert result["score"].between(0, 1).all()


def test_popularity_fallback_is_ranked(artifacts):
    result = core.popularity_recommendations(artifacts, top_n=10)
    assert len(result) == 10
    assert result["rank"].tolist() == list(range(1, 11))
    assert result["weighted_score"].is_monotonic_decreasing


def test_unknown_movie_is_rejected(artifacts):
    with pytest.raises(ValueError, match="Unknown movie_id"):
        core.recommend(artifacts, 999999, method="hybrid", top_n=10)


def test_reference_output_matches_live_artifact(artifacts):
    reference_path = ROOT / "outputs" / "toy_story_recommendations.csv"
    assert reference_path.is_file()
    saved = pd.read_csv(reference_path)
    hybrid_saved = saved.loc[saved["method"] == "hybrid"].reset_index(drop=True)
    movies = artifacts["movies"]
    movie_id = int(movies.loc[movies["title"] == "Toy Story (1995)", "movie_id"].iloc[0])
    live = core.recommend(artifacts, movie_id, method="hybrid", top_n=10)
    pd.testing.assert_frame_equal(
        hybrid_saved[live.columns].reset_index(drop=True),
        live.reset_index(drop=True),
        check_dtype=False,
    )
