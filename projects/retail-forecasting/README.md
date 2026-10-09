# Project 5 — Can We Predict Tomorrow's Sales?

An online shop owner has to decide how much stock to keep for tomorrow. Can sales from the past month help? We build an actual daily sales forecasting pipeline, compare it against the last-week baseline, and show tomorrow's prediction in a Streamlit dashboard.

## Dataset and tools
Official UCI Online Retail dataset, 541,909 transactions from December 2010 to December 2011. Python 3.12, VS Code, pandas, NumPy, scikit-learn, Streamlit and pytest. Data archive verified by SHA-256. No paid service. We predict positive UK order value rather than net recognized revenue.

## Step-by-step
1. Open VS Code, choose File → Open Folder, select projects/retail-forecasting.
2. Open Terminal → New Terminal. Create a virtual environment: python -m venv .venv.
3. Activate it: Windows .venv\Scripts\activate; macOS/Linux source .venv/bin/activate.
4. Run python -m pip install -r requirements.txt.
5. Run python -m pytest -q. These offline synthetic-data smoke tests do not evaluate the real dataset.
6. Run python download_data.py to download and verify official UCI data.
7. Run python train.py. This loads transactions, removes refunds/cancellations, filters UK, groups revenue per day, creates lagged features and compares models.
8. Open artifacts/metrics.json and artifacts/test_predictions.csv to see chosen model, dates and final errors.
9. Run python -m streamlit run app.py and open localhost:8501 in your browser to view charts and next-day forecast.

## Worked numbers
Suppose the past seven days sold £100, £120, £90, £130, £110, £140, £150. The trailing mean is (100+120+90+130+110+140+150)/7 = £120. If last Friday's amount was £100, seasonal naive predicts £100 for next Friday. Actual £125 means an absolute error of £25. We average absolute errors across 28 days to obtain mean absolute error (MAE). The train / validation / test windows follow calendar order: do not randomly split the time series.

## Important limits
A forecast for each of the last 28 test days uses already observed earlier sales as lagged features: it is a sequence of ONE-day-ahead forecasts, not a 28-day recursive future prediction. Closed days and data outages can resemble zero sales. Promotions, supply shortages, weather and holidays are not modeled. No revenue figures are invented: official dataset results appear only after executing train.py.

## Learner checks
Explain why using the current day's revenue as a predictor causes leakage. Calculate MAE for actual [100, 125], predicted [110, 100]: (10+25)/2 = 17.5. Re-run with different lag features and review validation MAE without repeatedly tuning against the test set.
