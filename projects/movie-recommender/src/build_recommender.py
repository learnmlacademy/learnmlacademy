"""Build popularity, content, collaborative and hybrid MovieLens recommenders."""

from __future__ import annotations

from pathlib import Path
import json

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MultiLabelBinarizer, normalize

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "ml-100k"
MODEL_DIR = ROOT / "models"
OUTPUT_DIR = ROOT / "outputs"

GENRES = [
    "unknown", "Action", "Adventure", "Animation", "Children's", "Comedy",
    "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror",
    "Musical", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western",
]


def load_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    ratings_path = DATA / "u.data"
    movies_path = DATA / "u.item"
    if not ratings_path.is_file() or not movies_path.is_file():
        raise FileNotFoundError("Run python download_data.py before building the recommender.")

    ratings = pd.read_csv(
        ratings_path,
        sep="\t",
        names=["user_id", "movie_id", "rating", "timestamp"],
        encoding="latin-1",
    )

    movie_columns = ["movie_id", "title", "release_date", "video_release_date", "imdb_url", *GENRES]
    movies = pd.read_csv(
        movies_path,
        sep="|",
        names=movie_columns,
        encoding="latin-1",
    )

    genre_values = movies[GENRES].to_numpy(dtype=int)
    movies["genres"] = [
        "|".join(genre for genre, present in zip(GENRES, row) if present)
        for row in genre_values
    ]
    return ratings, movies[["movie_id", "title", "genres"]].copy()


def build_popularity(ratings: pd.DataFrame, movies: pd.DataFrame) -> pd.DataFrame:
    """Create a smoothed popularity baseline.

    A movie with one lucky 5-star rating should not automatically outrank a
    movie with hundreds of strong ratings, so each movie mean is shrunk toward
    the global mean using a 25-rating prior.
    """
    summary = ratings.groupby("movie_id")["rating"].agg(["mean", "count"]).reset_index()
    global_mean = float(ratings["rating"].mean())
    prior = 25.0
    summary["weighted_score"] = (
        (summary["count"] / (summary["count"] + prior)) * summary["mean"]
        + (prior / (summary["count"] + prior)) * global_mean
    )
    return movies.merge(summary, on="movie_id", how="left").fillna(
        {"mean": global_mean, "count": 0, "weighted_score": global_mean}
    )


def build_content(movies: pd.DataFrame):
    """Represent each movie with a multi-hot genre vector and cosine distance."""
    labels = movies["genres"].str.split("|")
    encoder = MultiLabelBinarizer(classes=GENRES)
    matrix = encoder.fit_transform(labels).astype(float)
    matrix = csr_matrix(normalize(matrix, norm="l2"))
    model = NearestNeighbors(metric="cosine", algorithm="brute")
    model.fit(matrix)
    return encoder, matrix, model


def build_collaborative(ratings: pd.DataFrame, movies: pd.DataFrame):
    """Build a sparse movie-by-user rating matrix for item-item similarity."""
    movie_ids = movies["movie_id"].tolist()
    user_ids = sorted(ratings["user_id"].unique())
    movie_to_row = {movie_id: index for index, movie_id in enumerate(movie_ids)}
    user_to_col = {user_id: index for index, user_id in enumerate(user_ids)}

    rows = ratings["movie_id"].map(movie_to_row).to_numpy()
    cols = ratings["user_id"].map(user_to_col).to_numpy()
    values = ratings["rating"].to_numpy(dtype=float)

    matrix = csr_matrix((values, (rows, cols)), shape=(len(movie_ids), len(user_ids)))
    model = NearestNeighbors(metric="cosine", algorithm="brute")
    model.fit(matrix)
    return matrix, model


def neighbor_scores(model, matrix, row: int, n_candidates: int = 60) -> dict[int, float]:
    count = min(n_candidates + 1, matrix.shape[0])
    distances, indices = model.kneighbors(matrix[row], n_neighbors=count)
    result: dict[int, float] = {}
    for index, distance in zip(indices[0], distances[0]):
        if int(index) == row:
            continue
        result[int(index)] = max(0.0, 1.0 - float(distance))
    return result


def recommend(artifacts: dict, movie_id: int, method: str = "hybrid", top_n: int = 10) -> pd.DataFrame:
    """Return similar known movies using one of the three teaching methods."""
    if top_n < 1:
        raise ValueError("top_n must be at least 1")

    movies = artifacts["movies"]
    movie_to_row = artifacts["movie_to_row"]
    if movie_id not in movie_to_row:
        raise ValueError(f"Unknown movie_id: {movie_id}")
    row = movie_to_row[movie_id]

    content = neighbor_scores(artifacts["content_model"], artifacts["content_matrix"], row)
    collaborative = neighbor_scores(
        artifacts["collab_model"], artifacts["collab_matrix"], row
    )

    if method == "content":
        scores = content
        reason = "similar genres"
    elif method == "collaborative":
        scores = collaborative
        reason = "similar audience ratings"
    elif method == "hybrid":
        candidates = set(content) | set(collaborative)
        scores = {
            index: 0.45 * content.get(index, 0.0) + 0.55 * collaborative.get(index, 0.0)
            for index in candidates
        }
        reason = "combined genre + audience similarity"
    else:
        raise ValueError("method must be content, collaborative or hybrid")

    ranked = sorted(scores.items(), key=lambda pair: (-pair[1], pair[0]))[:top_n]
    rows = []
    for rank, (index, score) in enumerate(ranked, start=1):
        movie = movies.iloc[index]
        rows.append(
            {
                "rank": rank,
                "movie_id": int(movie["movie_id"]),
                "title": movie["title"],
                "genres": movie["genres"],
                "score": round(float(score), 4),
                "reason": reason,
            }
        )
    return pd.DataFrame(rows)


def popularity_recommendations(artifacts: dict, top_n: int = 10) -> pd.DataFrame:
    if top_n < 1:
        raise ValueError("top_n must be at least 1")
    popular = artifacts["popularity"].sort_values(
        ["weighted_score", "count", "movie_id"], ascending=[False, False, True]
    ).head(top_n).copy()
    popular.insert(0, "rank", range(1, len(popular) + 1))
    return popular[["rank", "movie_id", "title", "genres", "weighted_score", "count"]]


def recommend_or_fallback(
    artifacts: dict,
    movie_id: int | None,
    method: str = "hybrid",
    top_n: int = 10,
) -> pd.DataFrame:
    """Use popularity when a new/unknown movie has no learned similarity row.

    This is intentionally a simple cold-start fallback. It does not pretend to
    personalize an unseen movie; it gives the learner a safe default instead.
    """
    if movie_id is None or movie_id not in artifacts["movie_to_row"]:
        popular = popularity_recommendations(artifacts, top_n=top_n).copy()
        popular = popular.rename(columns={"weighted_score": "score"})
        popular["score"] = popular["score"].astype(float).round(4)
        popular["reason"] = "popularity fallback for cold start"
        return popular[["rank", "movie_id", "title", "genres", "score", "reason"]]
    return recommend(artifacts, movie_id, method=method, top_n=top_n)


def main() -> None:
    MODEL_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)

    ratings, movies = load_data()
    popularity = build_popularity(ratings, movies)
    encoder, content_matrix, content_model = build_content(movies)
    collab_matrix, collab_model = build_collaborative(ratings, movies)
    movie_to_row = {movie_id: index for index, movie_id in enumerate(movies["movie_id"])}

    artifacts = {
        "movies": movies,
        "popularity": popularity,
        "genre_encoder": encoder,
        "content_matrix": content_matrix,
        "content_model": content_model,
        "collab_matrix": collab_matrix,
        "collab_model": collab_model,
        "movie_to_row": movie_to_row,
    }

    model_path = MODEL_DIR / "movie_recommender.joblib"
    joblib.dump(artifacts, model_path)
    reloaded = joblib.load(model_path)

    toy_story = movies.loc[movies["title"] == "Toy Story (1995)", "movie_id"]
    if toy_story.empty:
        raise RuntimeError("Reference movie Toy Story (1995) not found.")
    toy_story_id = int(toy_story.iloc[0])

    reference_frames = []
    for method in ["content", "collaborative", "hybrid"]:
        frame = recommend(reloaded, toy_story_id, method=method, top_n=10)
        frame.insert(0, "method", method)
        reference_frames.append(frame)
    references = pd.concat(reference_frames, ignore_index=True)
    references.to_csv(OUTPUT_DIR / "toy_story_recommendations.csv", index=False)

    popularity_recommendations(reloaded, 10).to_csv(
        OUTPUT_DIR / "popular_movies.csv", index=False
    )

    total_possible_ratings = int(collab_matrix.shape[0] * collab_matrix.shape[1])
    observed_ratings = int(collab_matrix.nnz)
    metrics = {
        "ratings": int(len(ratings)),
        "users": int(ratings["user_id"].nunique()),
        "movies": int(len(movies)),
        "rating_mean": float(ratings["rating"].mean()),
        "rating_min": float(ratings["rating"].min()),
        "rating_max": float(ratings["rating"].max()),
        "content_features": int(content_matrix.shape[1]),
        "collaborative_shape": list(collab_matrix.shape),
        "observed_rating_cells": observed_ratings,
        "possible_rating_cells": total_possible_ratings,
        "rating_density": observed_ratings / total_possible_ratings,
        "rating_sparsity": 1.0 - (observed_ratings / total_possible_ratings),
        "reference_movie": "Toy Story (1995)",
        "reference_movie_id": toy_story_id,
        "hybrid_content_weight": 0.45,
        "hybrid_collaborative_weight": 0.55,
    }
    (OUTPUT_DIR / "metrics.json").write_text(
        json.dumps(metrics, indent=2) + "\n", encoding="utf-8"
    )

    fig, ax = plt.subplots(figsize=(7, 4))
    ratings["rating"].value_counts().sort_index().plot(kind="bar", ax=ax)
    ax.set(title="MovieLens 100K rating distribution", xlabel="Rating", ylabel="Count")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "rating_distribution.png", dpi=160)
    plt.close(fig)

    print("MovieLens recommender built successfully.")
    print(json.dumps(metrics, indent=2))
    print("\nHybrid recommendations for Toy Story (1995):")
    print(recommend(reloaded, toy_story_id, method="hybrid", top_n=10).to_string(index=False))


if __name__ == "__main__":
    main()
