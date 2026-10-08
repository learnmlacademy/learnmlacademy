# Netflix-Style Movie Recommendation System

This is the third free LearnMLAcademy flagship project.

## What the learner builds

A Streamlit movie-recommendation application with four strategies:

1. **Popularity baseline** — smoothed ranking and cold-start fallback.
2. **Content-based similarity** — genre + release-decade multi-hot labels with cosine neighbours.
3. **Item-item collaborative similarity** — sparse movie-by-user rating patterns with cosine neighbours.
4. **Hybrid ranking** — 45% content + 55% collaborative similarity.

## Dataset

The project uses Datanemics **Movie ratings**:

- 9,000 synthetic ratings
- 1,100 users
- 260 movie IDs
- rating range 0.5–5.0
- CC0 1.0 public domain

Dataset page: https://datanemics.com/datasets/movie-ratings/

The synthetic-data choice is intentional. It makes the tutorial reproducible and licence-safe for reuse, but the results must not be interpreted as real audience behaviour.

## Run

```powershell
python download_data.py
python src/build_recommender.py
pytest -q
python -m streamlit run app.py
```

## Architecture

```text
CSV ratings
  ├─> smoothed popularity baseline
  ├─> movie metadata -> genre + decade vectors -> cosine neighbours
  └─> latest user/movie interactions -> sparse movie-user matrix -> cosine neighbours

content similarity + collaborative similarity
                 |
                 v
        45/55 hybrid ranking
                 |
                 v
          Streamlit browser app
```

## Important limitation

The data is synthetic and the system is deliberately small. A production recommender would require real consented interaction data, rigorous held-out ranking evaluation, user personalization, richer/learned features, freshness and exposure controls, online experimentation, low-latency serving and monitoring.
