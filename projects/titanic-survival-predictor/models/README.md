# Saved pipeline

Running `python src/train_model.py` creates `titanic_pipeline.joblib` here.
It contains the fitted preprocessing steps and classifier together.
Only load joblib files you created or trust: loading a malicious file can
execute code. Train your own file before starting the Streamlit app.
