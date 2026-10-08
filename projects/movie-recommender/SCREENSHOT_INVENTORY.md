# Movie Recommendation System — Screenshot Inventory

Every image below comes from the real executable project. No AI-generated application screenshots or mock outputs are accepted.

| # | File | Handbook checkpoint | What it proves |
|---|---|---|---|
| 1 | `rating_distribution.png` | Data understanding | The executable build generated a real distribution of the latest interaction ratings |
| 2 | `movie-recommender-form.png` | App start | The real Streamlit app opens with Iron Country selected |
| 3 | `movie-recommender-results.png` | Hybrid result | The real 45% content / 55% collaborative hybrid returns ranked recommendations |
| 4 | `movie-recommender-content-results.png` | Content result | The same seed movie produces a ranking using genre + release-decade evidence only |
| 5 | `movie-recommender-collaborative-results.png` | Collaborative result | The same seed movie produces a ranking using sparse audience-rating patterns only |
| 6 | `movie-recommender-popular-results.png` | Popularity baseline | The real app shows the non-personalized popularity fallback |

## Evidence rules

- App screenshots are captured by Playwright from the live Streamlit server.
- The three recommendation modes are captured from the same executable artifact so learners can compare how the evidence source changes the ranking.
- The website verifier must load every required image on desktop and mobile.
- The CC0 synthetic-data limitation remains visible; screenshots are not presented as real audience behaviour.
