# Movie Recommendation System — Project Status

Branch: `parallel/movie-recommender-handbook`

Project title: **Build Your Own Netflix-Style Movie Recommendation System**

Access plan: **Free project** under the LearnMLAcademy 3-free / 9-premium model.

## Locked build rule

Build and execute the real system before writing the final handbook:

**BUILD → VERIFY → RECORD OUTPUT → CAPTURE REAL EVIDENCE → WRITE HANDBOOK → VERIFY AGAIN**

## Dataset

Use the official **MovieLens latest-small** dataset from GroupLens for education/development.

It contains roughly 100,000 ratings across about 9,000 movies from about 600 users. The downloader must fetch the official archive and keep raw data out of Git.

## Reference system design

The project will teach three recommendation ideas in one coherent application:

1. **Popularity baseline** — a simple non-personalized fallback.
2. **Content-based recommendation** — compare movie genres using TF-IDF/cosine similarity.
3. **Collaborative recommendation** — compare rating behavior with a sparse movie-user matrix and nearest neighbors.
4. **Hybrid recommendation** — combine content and collaborative evidence when both are available.

The learner-facing Streamlit app will let a user choose a movie and recommendation method, then return ranked similar movies with an explanation of why they were recommended.

## Quality checkpoints

- [x] 0 — branch created from current main after Titanic + House Price were merged
- [ ] 1 — project structure, official downloader and dependency lock
- [ ] 2 — executable recommender pipeline and reproducible outputs
- [ ] 3 — tests for data contracts, recommendation behavior and cold-start fallback
- [ ] 4 — Streamlit app and real browser screenshots
- [ ] 5 — absolute-beginner implementation handbook
- [ ] 6 — active exercises, troubleshooting, interview and production sections
- [ ] 7 — desktop/mobile/build/prerender verification
- [ ] 8 — final learning-value acceptance audit
- [ ] 9 — draft PR review; merge only after explicit approval

## Important teaching boundary

Do not call this “Netflix's algorithm.” It is a small educational recommender inspired by common recommendation-system ideas. Netflix uses far more data, signals, experimentation and infrastructure than this project.
