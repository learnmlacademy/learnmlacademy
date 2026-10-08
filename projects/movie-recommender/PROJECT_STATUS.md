# Movie Recommendation System — Project Status

Branch: `parallel/movie-recommender-handbook`

Project title: **Build Your Own Netflix-Style Movie Recommendation System**

Access plan: **Free project** under the LearnMLAcademy 3-free / 9-premium model.

## Locked build rule

Build and execute the real system before writing the final handbook:

**BUILD → VERIFY → RECORD OUTPUT → CAPTURE REAL EVIDENCE → WRITE HANDBOOK → VERIFY AGAIN**

## Dataset

Use the official stable **MovieLens 100K** dataset from GroupLens.

The executable downloader/verifier confirms exactly 100,000 ratings from 943 users across 1,682 movies. Raw data stays out of Git.

## Reference system design

The project teaches four recommendation ideas in one coherent application:

1. **Popularity baseline** — a smoothed, non-personalized ranking and explicit cold-start fallback.
2. **Content-based recommendation** — represent each movie with a multi-hot genre vector, then compare movies with cosine nearest neighbors.
3. **Collaborative recommendation** — compare sparse movie-by-user rating patterns with cosine nearest neighbors.
4. **Hybrid recommendation** — combine 45% content similarity and 55% collaborative similarity.

The learner-facing Streamlit app lets a user choose a movie and method, then returns ranked similar movies with a plain-English reason.

Important accuracy note: this implementation uses **multi-hot genre vectors**, not TF-IDF. The handbook must not claim TF-IDF.

## Verified build evidence

GitHub Actions run **37745903917** passed the initial executable gate:

- official MovieLens download verified
- recommender artifact built
- 7 initial tests passed
- Streamlit started successfully
- genuine browser screenshots captured with Playwright

A follow-up hardening commit adds explicit cold-start fallback, sparse-matrix assertions, positive `top_n` validation, duplicate-title-safe app selection, and density/sparsity metrics. It must pass a fresh CI run before those additions are marked verified.

## Quality checkpoints

- [x] 0 — branch created from current main after Titanic + House Price were merged
- [x] 1 — project structure, official downloader and dependency lock
- [x] 2 — executable recommender pipeline and reproducible outputs
- [ ] 3 — hardened tests including cold-start fallback (awaiting fresh CI after hardening)
- [ ] 4 — Streamlit app and real browser screenshots committed as public handbook evidence
- [ ] 5 — absolute-beginner implementation handbook
- [ ] 6 — active exercises, troubleshooting, interview and production sections
- [ ] 7 — desktop/mobile/build/prerender verification
- [ ] 8 — final learning-value acceptance audit
- [ ] 9 — draft PR review; merge only after explicit approval

## Important teaching boundary

Do not call this “Netflix's algorithm.” It is a small educational recommender inspired by common recommendation-system ideas. Netflix uses far more data, signals, experimentation and infrastructure than this project.
