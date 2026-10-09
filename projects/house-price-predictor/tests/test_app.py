from pathlib import Path

from streamlit.testing.v1 import AppTest

PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_streamlit_app_loads_without_exception():
    app = AppTest.from_file(str(PROJECT_ROOT / "app.py"), default_timeout=30)
    app.run()
    assert not app.exception
    assert any("What Is This House Really Worth?" in title.value for title in app.title)


def test_actual_estimate_button_produces_a_positive_model_prediction():
    """Prove the full UI -> feature engineering -> saved model path, not just title."""
    app = AppTest.from_file(str(PROJECT_ROOT / "app.py"), default_timeout=35)
    app.run()
    assert not app.exception
    buttons = [b for b in app.button if b.label == "Estimate sale price"]
    assert len(buttons) == 1
    buttons[0].click().run()
    assert not app.exception
    predictions = [m for m in app.metric if m.label == "Estimated historical sale price"]
    assert len(predictions) == 1, "Click must call the real trained model, not just render controls"
    number = float(predictions[0].value.replace("$", "").replace(",", ""))
    assert 10_000 < number < 2_000_000, "Ames historical-sale estimate should be positive and plausible"
