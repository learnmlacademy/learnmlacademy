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
- verified CSV SHA256: `b9e41047db97680f0043a8bdcb18fd5cb25d8f4a6209d5ef536f0ba9b457af52`

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

## Verified build

GitHub Actions run **37757264271** passed the full project + website gate:

- 8,291 latest user/movie interactions
- 12 Pytest checks passed
- rating matrix density 2.8990%
- rating matrix sparsity 97.1010%
- Streamlit health and real browser screenshots passed
- TypeScript validation passed
- production build/prerender passed
- desktop/mobile handbook verification passed


## Measured evaluation, not just a recommendation screenshot

Run `python src/build_recommender.py` then open `outputs/holdout_hit_rate.json`. It reports Hit Rate@10 for popularity, content and hybrid. The code hides the latest rating for at most 120 reproducibly selected users (with at least three ratings) **before** fitting their popularity and collaborative signals, uses the latest remaining known movie as a seed, and excludes known-rated movies from the top ten. The metric is not from Netflix and not a production personalized recommender. Inspect `score`, `content_score`, `collaborative_score` columns; ties are broken reproducibly using components, popularity and movie ID.
