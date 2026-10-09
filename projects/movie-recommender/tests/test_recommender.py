from pathlib import Path
import importlib.util

import joblib
import pandas as pd
import pytest

ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "models" / "movie_recommender.joblib"

spec = importlib.util.spec_from_file_location(
    "recommender",
    ROOT / "src" / "build_recommender.py",
)
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)


@pytest.fixture(scope="session")
def artifacts():
    assert MODEL.is_file(), "Run python src/build_recommender.py first."
    return joblib.load(MODEL)


def test_dataset_contract():
    ratings, movies = core.load_data()
    assert len(ratings) == 9_000
    assert ratings["user_id"].nunique() == 1_100
    assert len(movies) == 260
    assert set(
        ["movie_id", "title", "genre", "release_year"]
    ).issubset(movies.columns)


def test_latest_interactions_have_one_row_per_user_movie():
    ratings, _movies = core.load_data()
    interactions = core.latest_interactions(ratings)
    assert len(interactions) <= len(ratings)
    assert not interactions.duplicated(["user_id", "movie_id"]).any()


@pytest.mark.parametrize("method", ["content", "collaborative", "hybrid"])
def test_recommendations_are_unique_and_exclude_query_movie(
    artifacts,
    method,
):
    result = core.recommend(
        artifacts,
        core.REFERENCE_MOVIE_ID,
        method=method,
        top_n=10,
    )
    assert len(result) == 10
    assert result["movie_id"].is_unique
    assert core.REFERENCE_MOVIE_ID not in set(result["movie_id"])
    assert result["score"].between(0, 1).all()


def test_popularity_fallback_is_ranked(artifacts):
    result = core.popularity_recommendations(artifacts, top_n=10)
    assert len(result) == 10
    assert result["rank"].tolist() == list(range(1, 11))
    assert result["weighted_score"].is_monotonic_decreasing


def test_unknown_movie_is_rejected_by_similarity_api(artifacts):
    with pytest.raises(ValueError, match="Unknown movie_id"):
        core.recommend(
            artifacts,
            "M_DOES_NOT_EXIST",
            method="hybrid",
            top_n=10,
        )


def test_unknown_movie_uses_normalized_cold_start_fallback(artifacts):
    result = core.recommend_or_fallback(
        artifacts,
        movie_id="M_DOES_NOT_EXIST",
        method="hybrid",
        top_n=7,
    )
    assert len(result) == 7
    assert result["rank"].tolist() == list(range(1, 8))
    assert set(result["reason"]) == {
        "popularity fallback for cold start"
    }
    assert result["score"].between(0, 1).all()


def test_top_n_must_be_positive(artifacts):
    with pytest.raises(ValueError, match="top_n"):
        core.recommend(
            artifacts,
            core.REFERENCE_MOVIE_ID,
            method="hybrid",
            top_n=0,
        )
    with pytest.raises(ValueError, match="top_n"):
        core.popularity_recommendations(artifacts, top_n=0)


def test_collaborative_matrix_is_sparse(artifacts):
    ratings, _movies = core.load_data()
    interactions = core.latest_interactions(ratings)

    matrix = artifacts["collab_matrix"]
    assert matrix.shape == (260, 1_100)
    assert matrix.nnz == len(interactions)
    density = matrix.nnz / (matrix.shape[0] * matrix.shape[1])
    assert density < 0.10


def test_content_features_include_genre_and_decade(artifacts):
    labels = set(artifacts["content_encoder"].classes_)
    assert any(label.startswith("genre=") for label in labels)
    assert any(label.startswith("decade=") for label in labels)
    assert artifacts["content_matrix"].shape[0] == 260


def test_reference_output_matches_live_artifact(artifacts):
    reference_path = ROOT / "outputs" / "iron_country_recommendations.csv"
    assert reference_path.is_file()

    saved = pd.read_csv(reference_path)
    hybrid_saved = (
        saved.loc[saved["method"] == "hybrid"]
        .reset_index(drop=True)
    )
    live = core.recommend(
        artifacts,
        core.REFERENCE_MOVIE_ID,
        method="hybrid",
        top_n=10,
    )

    pd.testing.assert_frame_equal(
        hybrid_saved[live.columns].reset_index(drop=True),
        live.reset_index(drop=True),
        check_dtype=False,
    )


def test_similarity_scores_and_ranking_are_stable_even_with_ties(artifacts):
    first = core.recommend(artifacts, core.REFERENCE_MOVIE_ID, method="hybrid", top_n=60)
    second = core.recommend(artifacts, core.REFERENCE_MOVIE_ID, method="hybrid", top_n=60)
    pd.testing.assert_frame_equal(first, second)
    assert {"score", "content_score", "collaborative_score"}.issubset(first.columns)
    assert first[["content_score", "collaborative_score"]].ge(0).all().all()
    assert first[["content_score", "collaborative_score"]].le(1).all().all()
    assert all(first["score"].iloc[i] >= first["score"].iloc[i+1]
               for i in range(len(first)-1))


def test_heldout_hit_rate_really_excludes_hidden_user_movie_pairs():
    ratings, movies = core.load_data()
    report = core.evaluate_leave_one_out(ratings, movies, max_users=12)
    assert report["users_evaluated"] == 12
    assert report["heldout_pairs_in_training"] == 0
    assert set(report["hit_rate_at_10"]) == {"popularity", "content", "hybrid"}
    assert all(0 <= value <= 1 for value in report["hit_rate_at_10"].values())


def test_full_report_has_actual_holdout_metrics():
    import json
    data = json.loads((ROOT / "outputs" / "holdout_hit_rate.json").read_text())
    assert data["users_evaluated"] > 0
    assert data["heldout_pairs_in_training"] == 0
