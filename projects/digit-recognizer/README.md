# Project 8 — Teach AI to Read Handwritten Numbers

Real PyTorch CNN trained from scratch on scikit-learn's offline **1,797 handwritten 8×8 digit images**, with a Streamlit upload/predict app. The dataset is built into scikit-learn — no Kaggle login, API key or external dataset download.

## Beginner setup

1. Install Python 3.12 and VS Code. Open the folder `projects/digit-recognizer` in VS Code using File → Open Folder.
2. Choose Terminal → New Terminal. Windows: `py -3.12 -m venv .venv` and `.venv\\Scripts\\activate`. macOS/Linux: `python3.12 -m venv .venv && source .venv/bin/activate`.
3. Run `python -m pip install -r requirements.txt` (PyTorch is a large library; installation can take time).
4. Run `python -m pytest -q`. Tests include real training, image validation and model reloading.
5. Train from scratch: `python train.py`. This saves a model and JSON metrics under `artifacts/` and prints held-out test accuracy.
6. Start the app: `python -m streamlit run app.py`. Open the displayed localhost address, commonly http://localhost:8501.
7. Draw a single digit with a dark pen on white paper, photograph/crop it closely or create a simple PNG in Paint, upload it and observe the original and preprocessed 8×8 image.
8. Inspect all ten model probabilities; look at errors and note that accuracy on the held-out built-in dataset does not guarantee accuracy on handwritten camera images.

## Architecture calculation

Input `1×8×8` → convolution `16×8×8` → max pooling `16×4×4` → convolution `32×4×4` → max pooling `32×2×2` → flatten `32·2·2=128` values → dense 64 → 10 class logits.

A 3×3 convolution with 1 input channel and 16 outputs has `16 × (1 × 3 × 3 + 1) = 160` learned weights including biases. The second has `32 × (16 × 3 × 3 + 1) = 4,640` learned parameters. Explain ReLU, pooling, cross-entropy, gradient descent and the 80/20 split with a further validation split.

## Limits

The dataset contains small normalized greyscale handwritten digits. External pen-on-paper images can differ substantially in stroke thickness, lighting, rotation and framing. The model does not perform OCR of sentences or multiple digits. Test and validation data must never be used as additional training labels.

## Files

`src/digits.py` contains dataset preparation, CNN, training, saving and inference; `train.py` trains; `app.py` runs Streamlit; `tests/test_digits.py` checks the critical stages. Generated artifacts are excluded from Git.
