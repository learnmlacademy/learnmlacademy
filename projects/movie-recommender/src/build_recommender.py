"""Build popularity, content, collaborative and hybrid movie recommenders."""

from __future__ import annotations

from pathlib import Path
import json

import joblib
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MultiLabelBinarizer, normalize

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "movie-ratings.csv"
MODEL_DIR = ROOT / "models"
OUTPUT_DIR = ROOT / "outputs"

REFERENCE_MOVIE_ID = "M1000"
REFERENCE_MOVIE_TITLE = "Iron Country"
MAX_RATING = 5.0


def load_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    if not DATA_PATH.is_file():
        raise FileNotFoundError("Run python download_data.py before building the recommender.")

    frame = pd.read_csv(DATA_PATH)
    required = {
        "user_id",
        "movie_id",
        "title",
        "genre",
        "release_year",
        "rating",
        "rated_at",
    }
    missing = sorted(required.difference(frame.columns))
    if missing:
        raise RuntimeError(f"Dataset is missing required columns: {missing}")

    frame["rating"] = pd.to_numeric(frame["rating"], errors="raise")
    frame["release_year"] = pd.to_numeric(frame["release_year"], errors="raise").astype(int)
    frame["rated_at"] = pd.to_datetime(frame["rated_at"], errors="raise")

    metadata_consistency = (
        frame.groupby("movie_id")[["title", "genre", "release_year"]]
        .nunique(dropna=False)
        .max()
        .max()
    )
    if int(metadata_consistency) != 1:
        raise RuntimeError("At least one movie_id maps to conflicting title/genre/year metadata.")

    movies = (
        frame[["movie_id", "title", "genre", "release_year"]]
        .drop_duplicates(subset=["movie_id"])
        .sort_values("movie_id")
        .reset_index(drop=True)
    )
    ratings = frame[["user_id", "movie_id", "rating", "rated_at"]].copy()
    return ratings, movies


def latest_interactions(ratings: pd.DataFrame) -> pd.DataFrame:
    """Keep one latest rating per user/movie pair for the teaching matrix."""
    return (
        ratings.sort_values("rated_at")
        .drop_duplicates(subset=["user_id", "movie_id"], keep="last")
        .reset_index(drop=True)
    )


def build_popularity(interactions: pd.DataFrame, movies: pd.DataFrame) -> pd.DataFrame:
    """Build a smoothed popularity baseline using a 25-rating prior."""
    summary = (
        interactions.groupby("movie_id")["rating"]
        .agg(["mean", "count"])
        .reset_index()
    )
    global_mean = float(interactions["rating"].mean())
    prior = 25.0
    summary["weighted_score"] = (
        (summary["count"] / (summary["count"] + prior)) * summary["mean"]
        + (prior / (summary["count"] + prior)) * global_mean
    )
    return movies.merge(summary, on="movie_id", how="left").fillna(
        {"mean": global_mean, "count": 0, "weighted_score": global_mean}
    )


def build_content(movies: pd.DataFrame):
    """Encode each movie with two categorical labels: genre and release decade."""
    labels = [
        [
            f"genre={row.genre}",
            f"decade={(int(row.release_year) // 10) * 10}s",
        ]
        for row in movies.itertuples(index=False)
    ]
    encoder = MultiLabelBinarizer()
    matrix = encoder.fit_transform(labels).astype(float)
    matrix = csr_matrix(normalize(matrix, norm="l2"))

    model = NearestNeighbors(metric="cosine", algorithm="brute")
    model.fit(matrix)
    return encoder, matrix, model


def build_collaborative(interactions: pd.DataFrame, movies: pd.DataFrame):
    """Create a sparse movie-by-user matrix from latest observed ratings."""
    movie_ids = movies["movie_id"].tolist()
    user_ids = sorted(interactions["user_id"].unique())
    movie_to_row = {movie_id: index for index, movie_id in enumerate(movie_ids)}
    user_to_col = {user_id: index for index, user_id in enumerate(user_ids)}

    rows = interactions["movie_id"].map(movie_to_row).to_numpy()
    cols = interactions["user_id"].map(user_to_col).to_numpy()
    values = interactions["rating"].to_numpy(dtype=float)

    matrix = csr_matrix(
        (values, (rows, cols)),
        shape=(len(movie_ids), len(user_ids)),
    )
    model = NearestNeighbors(metric="cosine", algorithm="brute")
    model.fit(matrix)
    return matrix, model


def neighbor_scores(model, matrix, row: int, n_candidates: int = 60) -> dict[int, float]:
    """Score ALL items, preventing kNN's arbitrary truncation of tied neighbors.

    The model argument and n_candidates are retained for old teaching call sites.
    A 260-movie learning dataset is small enough for full cosine comparison.
    """
    similarities = cosine_similarity(matrix[row], matrix).ravel()
    return {
        int(index): max(0.0, min(1.0, float(score)))
        for index, score in enumerate(similarities)
        if index != row and np.isfinite(score) and score > 0
    }


def recommend(
    artifacts: dict,
    movie_id: str,
    method: str = "hybrid",
    top_n: int = 10,
) -> pd.DataFrame:
    if top_n < 1:
        raise ValueError("top_n must be at least 1")

    movies = artifacts["movies"]
    movie_to_row = artifacts["movie_to_row"]
    if movie_id not in movie_to_row:
        raise ValueError(f"Unknown movie_id: {movie_id}")

    row = movie_to_row[movie_id]
    content = neighbor_scores(
        artifacts["content_model"],
        artifacts["content_matrix"],
        row,
    )
    collaborative = neighbor_scores(
        artifacts["collab_model"],
        artifacts["collab_matrix"],
        row,
    )

    if method == "content":
        scores = content
        reason = "similar genre + release decade"
    elif method == "collaborative":
        scores = collaborative
        reason = "similar audience rating patterns"
    elif method == "hybrid":
        candidates = set(content) | set(collaborative)
        scores = {
            index: (
                0.45 * content.get(index, 0.0)
                + 0.55 * collaborative.get(index, 0.0)
            )
            for index in candidates
        }
        reason = "45% content + 55% audience similarity"
    else:
        raise ValueError("method must be content, collaborative or hybrid")

    # Stable secondary ranking breaks equal scores by measured component scores
    # and popularity, then immutable movie ID; a tied neighbor never depends on
    # an undocumented kNN implementation ordering.
    popularity_by_movie = artifacts["popularity"].set_index("movie_id")["weighted_score"]
    ranked = sorted(
        scores.items(),
        key=lambda pair: (
            -pair[1], -content.get(pair[0], 0.0),
            -collaborative.get(pair[0], 0.0),
            -float(popularity_by_movie.get(str(movies.iloc[pair[0]]["movie_id"]), 0.0)),
            str(movies.iloc[pair[0]]["movie_id"]),
        ),
    )[:top_n]
    output = []
    for rank, (index, score) in enumerate(ranked, start=1):
        movie = movies.iloc[index]
        output.append(
            {
                "rank": rank,
                "movie_id": str(movie["movie_id"]),
                "title": str(movie["title"]),
                "genre": str(movie["genre"]),
                "release_year": int(movie["release_year"]),
                "score": round(float(score), 4),
                "content_score": round(float(content.get(index, 0.0)), 4),
                "collaborative_score": round(float(collaborative.get(index, 0.0)), 4),
                "reason": reason,
            }
        )
    return pd.DataFrame(output)


def popularity_recommendations(artifacts: dict, top_n: int = 10) -> pd.DataFrame:
    if top_n < 1:
        raise ValueError("top_n must be at least 1")

    popular = (
        artifacts["popularity"]
        .sort_values(
            ["weighted_score", "count", "movie_id"],
            ascending=[False, False, True],
        )
        .head(top_n)
        .copy()
    )
    popular.insert(0, "rank", range(1, len(popular) + 1))
    return popular[
        [
            "rank",
            "movie_id",
            "title",
            "genre",
            "release_year",
            "weighted_score",
            "count",
        ]
    ]


def recommend_or_fallback(
    artifacts: dict,
    movie_id: str | None,
    method: str = "hybrid",
    top_n: int = 10,
) -> pd.DataFrame:
    """Use popularity for an unknown item instead of inventing similarity."""
    if movie_id is None or movie_id not in artifacts["movie_to_row"]:
        popular = popularity_recommendations(artifacts, top_n=top_n).copy()
        popular["score"] = (popular["weighted_score"] / MAX_RATING).clip(0.0, 1.0)
        popular["score"] = popular["score"].round(4)
        popular["reason"] = "popularity fallback for cold start"
        return popular[
            [
                "rank",
                "movie_id",
                "title",
                "genre",
                "release_year",
                "score",
                "reason",
            ]
        ]

    return recommend(
        artifacts,
        movie_id=movie_id,
        method=method,
        top_n=top_n,
    )



def evaluate_leave_one_out(ratings: pd.DataFrame, movies: pd.DataFrame,
                           max_users: int = 120, top_k: int = 10) -> dict:
    """Leakage-free, clearly bounded next-interaction Hit Rate@K *teaching* study.

    For up to 120 deterministic users having >=3 distinct rated movies, hold
    out their latest interaction BEFORE rebuilding popularity/collaborative
    models. Recommend using that user's latest remaining known movie as seed;
    exclude every movie already rated during training before taking top K.
    Film metadata may be known, but the held-out rating is NOT used for fits.
    This is item-to-item recommendation, not an optimized personalized ranker.
    """
    if max_users < 1 or top_k < 1:
        raise ValueError("max_users and top_k must be positive")
    latest = latest_interactions(ratings)
    order = latest.sort_values(["user_id", "rated_at", "movie_id"], kind="stable")
    enough = order.groupby("user_id")["movie_id"].transform("size") >= 3
    eligible = order.loc[enough]
    holdout = (eligible.groupby("user_id", sort=True).tail(1)
               .sort_values(["user_id"], kind="stable")
               .head(max_users))
    if holdout.empty:
        raise ValueError("Need eligible users with three or more interactions")
    train = latest.drop(index=holdout.index)
    assert not set(zip(holdout.user_id, holdout.movie_id)) & set(zip(train.user_id, train.movie_id))
    popularity = build_popularity(train, movies)
    encoder, content_matrix, content_model = build_content(movies)
    collab_matrix, collab_model = build_collaborative(train, movies)
    artifacts = {
        "movies": movies, "popularity": popularity,
        "content_encoder": encoder, "content_matrix": content_matrix,
        "content_model": content_model, "collab_matrix": collab_matrix,
        "collab_model": collab_model,
        "movie_to_row": {id_: i for i, id_ in enumerate(movies.movie_id)},
    }
    # Avoid recomputing recommendations for users with the same seed item.
    seed_cache: dict[tuple[str, str], list[str]] = {}
    popular = popularity_recommendations(artifacts, top_n=len(movies)).movie_id.tolist()
    hits = {"popularity": 0, "content": 0, "hybrid": 0}
    for row in holdout.itertuples(index=False):
        observed = (train.loc[train.user_id == row.user_id]
                    .sort_values(["rated_at", "movie_id"], kind="stable"))
        seen = set(observed.movie_id)
        seed = str(observed.iloc[-1].movie_id)
        truth = str(row.movie_id)
        for method in hits:
            if method == "popularity":
                ranked_ids = popular
            else:
                key = (method, seed)
                if key not in seed_cache:
                    seed_cache[key] = recommend(artifacts, seed, method=method,
                                                top_n=len(movies)).movie_id.tolist()
                ranked_ids = seed_cache[key]
            unseen = [item for item in ranked_ids if item not in seen][:top_k]
            hits[method] += int(truth in unseen)
    return {
        "method": "Per-user leave-latest-interaction-out; item-to-item seed from remaining history",
        "users_evaluated": int(len(holdout)),
        "train_interactions": int(len(train)),
        "heldout_interactions": int(len(holdout)),
        "heldout_pairs_in_training": 0,
        "top_k": top_k,
        "hit_rate_at_10": {name: round(n / len(holdout), 4) for name, n in hits.items()},
        "caution": "Synthetic film ratings, sampled users, one held-out interaction each; not a production recommendation benchmark.",
    }

def main() -> None:
    MODEL_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)

    ratings, movies = load_data()
    interactions = latest_interactions(ratings)
    heldout_eval = evaluate_leave_one_out(ratings, movies)
    (OUTPUT_DIR / "holdout_hit_rate.json").write_text(
        json.dumps(heldout_eval, indent=2) + "\n", encoding="utf-8"
    )
    print("Measured leave-one-out Hit Rate@10 (synthetic users):", heldout_eval["hit_rate_at_10"])

    popularity = build_popularity(interactions, movies)
    encoder, content_matrix, content_model = build_content(movies)
    collab_matrix, collab_model = build_collaborative(interactions, movies)
    movie_to_row = {
        movie_id: index
        for index, movie_id in enumerate(movies["movie_id"])
    }

    artifacts = {
        "movies": movies,
        "popularity": popularity,
        "content_encoder": encoder,
        "content_matrix": content_matrix,
        "content_model": content_model,
        "collab_matrix": collab_matrix,
        "collab_model": collab_model,
        "movie_to_row": movie_to_row,
    }

    model_path = MODEL_DIR / "movie_recommender.joblib"
    joblib.dump(artifacts, model_path)
    reloaded = joblib.load(model_path)

    if REFERENCE_MOVIE_ID not in movie_to_row:
        raise RuntimeError(f"Reference movie {REFERENCE_MOVIE_ID} is missing.")

    reference_title = str(
        movies.loc[movies["movie_id"] == REFERENCE_MOVIE_ID, "title"].iloc[0]
    )
    if reference_title != REFERENCE_MOVIE_TITLE:
        raise RuntimeError(
            "Reference movie metadata changed: "
            f"{REFERENCE_MOVIE_ID} is {reference_title!r}, "
            f"expected {REFERENCE_MOVIE_TITLE!r}"
        )

    reference_frames = []
    for method in ["content", "collaborative", "hybrid"]:
        frame = recommend(
            reloaded,
            REFERENCE_MOVIE_ID,
            method=method,
            top_n=10,
        )
        frame.insert(0, "method", method)
        reference_frames.append(frame)

    pd.concat(reference_frames, ignore_index=True).to_csv(
        OUTPUT_DIR / "iron_country_recommendations.csv",
        index=False,
    )
    popularity_recommendations(reloaded, 10).to_csv(
        OUTPUT_DIR / "popular_movies.csv",
        index=False,
    )

    possible_cells = int(collab_matrix.shape[0] * collab_matrix.shape[1])
    observed_cells = int(collab_matrix.nnz)
    density = observed_cells / possible_cells

    metrics = {
        "raw_rating_rows": int(len(ratings)),
        "unique_user_movie_interactions": int(len(interactions)),
        "users": int(interactions["user_id"].nunique()),
        "movies": int(len(movies)),
        "rating_mean": float(interactions["rating"].mean()),
        "rating_min": float(interactions["rating"].min()),
        "rating_max": float(interactions["rating"].max()),
        "content_features": int(content_matrix.shape[1]),
        "content_feature_labels": list(encoder.classes_),
        "collaborative_shape": list(collab_matrix.shape),
        "observed_rating_cells": observed_cells,
        "possible_rating_cells": possible_cells,
        "rating_density": density,
        "rating_sparsity": 1.0 - density,
        "reference_movie": REFERENCE_MOVIE_TITLE,
        "reference_movie_id": REFERENCE_MOVIE_ID,
        "hybrid_content_weight": 0.45,
        "hybrid_collaborative_weight": 0.55,
        "heldout_evaluation": heldout_eval,
    }
    (OUTPUT_DIR / "metrics.json").write_text(
        json.dumps(metrics, indent=2) + "\n",
        encoding="utf-8",
    )

    fig, ax = plt.subplots(figsize=(7, 4))
    interactions["rating"].value_counts().sort_index().plot(kind="bar", ax=ax)
    ax.set(
        title="Synthetic movie-ratings distribution",
        xlabel="Rating",
        ylabel="Count",
    )
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "rating_distribution.png", dpi=160)
    plt.close(fig)

    print("Movie recommender built successfully.")
    print(json.dumps(metrics, indent=2))
    print(f"\nHybrid recommendations for {REFERENCE_MOVIE_TITLE}:")
    print(
        recommend(
            reloaded,
            REFERENCE_MOVIE_ID,
            method="hybrid",
            top_n=10,
        ).to_string(index=False)
    )


if __name__ == "__main__":
    main()
