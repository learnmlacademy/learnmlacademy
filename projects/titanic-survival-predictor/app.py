"""Run from the project root with: python -m streamlit run app.py"""

# handbook: load
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
import streamlit as st

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / 'models' / 'titanic_pipeline.joblib'
FEATURES = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']

st.set_page_config(page_title='Titanic Survival Predictor', page_icon='🚢', layout='centered')
st.title('Can you survive the Titanic?')
st.write('Build a passenger profile, then ask the trained model for a prediction.')
st.caption('Educational experiment • historical data • not a statement of anyone’s actual fate')

if not MODEL_PATH.is_file():
    st.error('The saved model is missing. Train it before using this app.')
    st.code('python src/train_model.py', language='powershell')
    st.write('Run that command in your project terminal, wait for it to finish, then refresh this page.')
    st.stop()


@st.cache_resource
def load_pipeline(modified_ns):
    # modified_ns invalidates the cache if you retrain and overwrite the model.
    # Never load a joblib file supplied by someone you do not trust.
    return joblib.load(MODEL_PATH)


pipeline = load_pipeline(MODEL_PATH.stat().st_mtime_ns)

# handbook: form
with st.form('passenger'):
    left, right = st.columns(2)
    with left:
        pclass = st.selectbox('Ticket class', [1, 2, 3], format_func=lambda value: f'Class {value}', key='pclass')
        sex = st.selectbox('Sex recorded in the dataset', ['female', 'male'], key='sex')
        age = st.number_input('Age in years', min_value=0.0, max_value=100.0, value=29.0, step=0.5, key='age')
        age_unknown = st.checkbox('Age is unknown', key='age_unknown')
    with right:
        sibsp = st.number_input('Siblings / spouses aboard', min_value=0, max_value=8, value=0, step=1, key='sibsp')
        parch = st.number_input('Parents / children aboard', min_value=0, max_value=6, value=0, step=1, key='parch')
        fare = st.number_input('Ticket fare (historical pounds)', min_value=0.0, max_value=600.0, value=80.0, step=1.0, key='fare')
        embarked = st.selectbox('Boarding port', ['S', 'C', 'Q'],
            format_func=lambda value: {'S': 'Southampton', 'C': 'Cherbourg', 'Q': 'Queenstown'}[value], key='embarked')
    submitted = st.form_submit_button('Predict survival', type='primary')

# handbook: predict
if submitted:
    passenger = pd.DataFrame([{
        'Pclass': pclass, 'Sex': sex, 'Age': np.nan if age_unknown else age,
        'SibSp': sibsp, 'Parch': parch, 'Fare': fare, 'Embarked': embarked,
    }])[FEATURES]
    prediction = int(pipeline.predict(passenger)[0])
    if prediction == 1:
        st.success('Model prediction: Survived')
    else:
        st.info('Model prediction: Did Not Survive')
    if hasattr(pipeline, 'predict_proba'):
        positive_index = list(pipeline.classes_).index(1)
        probability = float(pipeline.predict_proba(passenger)[0, positive_index])
        st.metric('Model survival estimate', f'{probability:.1%}')
        st.caption('This is a model score, not a calibrated guarantee or historical certainty.')
    st.write('Inputs sent to the complete saved pipeline:')
    st.dataframe(passenger, hide_index=True)
    if age_unknown:
        st.caption('Unknown age was passed as a missing value; the saved training median filled it.')

st.divider()
st.caption('The model uses seven fields. It cannot know lifeboat access, chance, or the full historical circumstances. Do not use it for real safety decisions.')
