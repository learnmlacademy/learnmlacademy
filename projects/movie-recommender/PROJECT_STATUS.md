# Movie Recommendation System — Project Status

Branch: `parallel/movie-recommender-handbook`

Project title: **Build Your Own Netflix-Style Movie Recommendation System**

Access plan: **Free project** under the LearnMLAcademy 3-free / 9-premium model.

## Locked build rule

Build and execute the real system before writing the final handbook:

**BUILD → VERIFY → RECORD OUTPUT → CAPTURE REAL EVIDENCE → WRITE HANDBOOK → VERIFY AGAIN**

## Dataset

The project uses the official stable **MovieLens 100K** dataset from GroupLens.

The executable downloader/verifier confirms exactly:

- 100,000 ratings
- 943 users
- 1,682 movies
- 1–5 rating scale

Raw downloaded data stays out of Git.

## Reference system design

The finished project teaches four recommendation strategies:

1. **Popularity baseline** — a smoothed, non-personalized ranking and cold-start fallback.
2. **Content-based recommendation** — multi-hot movie-genre vectors compared with cosine nearest neighbors.
3. **Collaborative recommendation** — sparse movie-by-user rating patterns compared with cosine nearest neighbors.
4. **Hybrid recommendation** — 45% content similarity + 55% collaborative similarity.

Important accuracy boundary: this implementation uses **multi-hot genre vectors**, not TF-IDF, and it does not claim to reproduce Netflix's production algorithm.

## Verified evidence

GitHub Actions run **37755384707** passed the full quality gate.

Verified in a clean runner:

- official MovieLens download and data contract
- deterministic recommender artifact build
- rating density: 0.0630466936
- rating sparsity: 0.9369533064
- 10 recommendation/data/cold-start tests passed
- Streamlit health check passed
- genuine Streamlit screenshots captured with Playwright
- screenshot/chart evidence copied into the public handbook assets
- TypeScript validation passed
- production build passed
- sitemap generation passed
- prerender wrote 190 static HTML pages: 167 lessons, 11 blog posts and 12 static pages
- handbook verified in desktop and 390px mobile viewports
- no horizontal overflow detected in either viewport

The verified visual-evidence commit is:

`a2b6e939eb0b3999fbfe2b8386d83d74c6702cd6`

## Quality checkpoints

- [x] 0 — branch created from current main after Titanic + House Price were merged
- [x] 1 — project structure, official downloader and dependency lock
- [x] 2 — executable recommender pipeline and reproducible outputs
- [x] 3 — hardened tests including explicit cold-start fallback and sparse-matrix checks
- [x] 4 — Streamlit app and genuine browser screenshots committed as public handbook evidence
- [x] 5 — beginner-readable end-to-end implementation handbook
- [x] 6 — active exercises, troubleshooting, interview and production sections
- [x] 7 — desktop/mobile/build/prerender verification
- [x] 8 — final learning-value acceptance audit
- [ ] 9 — draft PR review; merge only after explicit approval

## Important teaching boundary

The phrase “Netflix-style” makes the learning goal recognizable. This is a small educational recommender based on common recommendation-system ideas. Real streaming platforms use many more signals, ranking stages, experiments, safety rules and infrastructure.
