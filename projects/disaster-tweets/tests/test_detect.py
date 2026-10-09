import pandas as pd
import pytest
from src.detect import clean_text, validate_data, split_rows, train_and_evaluate, classify, metrics

EXAMPLES = [
    ("Wildfire forces families to evacuate their village", 1),
    ("Floodwater has entered several riverside homes", 1),
    ("Rescue workers searching collapsed buildings after quake", 1),
    ("Firefighters battle spreading forest fires", 1),
    ("Earthquake severely damaged nearby schools", 1),
    ("Tornado tore through the town", 1),
    ("Emergency evacuation in progress after hurricane", 1),
    ("Landslide blocked road and trapped motorists", 1),
    ("Factory explosion injured several people", 1),
    ("Flood alerts issued for low lying areas", 1),
    ("Ambulance crews arrive after traffic collision", 1),
    ("Storm surge leaves coastal houses underwater", 1),
    ("A bridge collapsed during the storm", 1),
    ("Multiple homes destroyed by major wildfire", 1),
    ("Police report injuries after train derailment", 1),
    ("Residents seek shelter following volcanic eruption", 1),
    ("Rescue helicopters sent after mountain avalanche", 1),
    ("Heavy rains triggered dangerous mudslides", 1),
    ("Tsunami warning activated along eastern coastline", 1),
    ("Emergency workers distributing supplies after cyclone", 1),
    ("That math exam was a total disaster", 0),
    ("I am drowning in coursework this week", 0),
    ("The game was absolutely explosive entertainment", 0),
    ("This joke killed me with laughter", 0),
    ("I am on fire with ideas today", 0),
    ("Our group chat was flooded with memes", 0),
    ("The team crushed every sales target", 0),
    ("My phone blew up with notifications", 0),
    ("That movie caused a storm of debate", 0),
    ("The party erupted into loud cheers", 0),
    ("My work calendar is an avalanche", 0),
    ("This song set the dance floor on fire", 0),
    ("The shop is running a fire sale", 0),
    ("My schedule is packed with meetings", 0),
    ("A flood of birthday wishes reached me", 0),
    ("The show was an emotional roller coaster", 0),
    ("I crashed onto the couch after work", 0),
    ("The opening performance was electric", 0),
    ("Your story blew my mind completely", 0),
    ("My online post is going viral today", 0),
]

def examples():
    return pd.DataFrame(EXAMPLES, columns=["text", "target"])

def test_preserve_negation_and_remove_handles():
    assert clean_text("NOT a #flood @account https://example.org") == "not a flood"
    with pytest.raises(ValueError):
        clean_text("x" * 2001)

def test_conflicting_duplicate_excluded_and_splits_disjoint():
    df = examples()
    df.loc[40] = [EXAMPLES[0][0], 0]
    rows = validate_data(df)
    assert clean_text(EXAMPLES[0][0]) not in set(rows.text)
    train, val, test = split_rows(rows)
    assert not (set(train.text) & set(val.text) or set(train.text) & set(test.text))

def test_train_predict_and_saved_results(tmp_path):
    report = train_and_evaluate(examples(), tmp_path)
    assert report["split"]["test"] > 0
    assert (tmp_path / "model.joblib").is_file()
    import joblib
    saved = joblib.load(tmp_path / "model.joblib")
    output = classify(saved, "Floodwater entered multiple homes")
    assert 0 <= output["probability"] <= 1
    assert output["predicted"] in (0, 1)

def test_valid_metrics_and_schema():
    assert metrics([0, 1], [0.1, .9])["f1"] == 1
    with pytest.raises(ValueError):
        validate_data(pd.DataFrame({"wrong": [0]}))
