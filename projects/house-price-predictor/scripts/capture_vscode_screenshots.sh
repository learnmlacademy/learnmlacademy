#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUTS_DIR="$PROJECT_ROOT/outputs"
PROFILE_DIR="/tmp/learnmlacademy-vscode-profile"
EXTENSIONS_DIR="/tmp/learnmlacademy-vscode-extensions"

mkdir -p "$OUTPUTS_DIR" "$PROFILE_DIR/User" "$EXTENSIONS_DIR"

cat > "$PROFILE_DIR/User/settings.json" <<'EOF'
{
  "security.workspace.trust.enabled": false,
  "workbench.startupEditor": "none",
  "workbench.activityBar.location": "default",
  "editor.minimap.enabled": false,
  "editor.fontSize": 15,
  "window.zoomLevel": 0
}
EOF

sudo apt-get update -qq
sudo apt-get install -y -qq xvfb xdotool imagemagick >/dev/null

curl -fsSL "https://update.code.visualstudio.com/latest/linux-deb-x64/stable" -o /tmp/vscode.deb
sudo apt-get install -y -qq /tmp/vscode.deb >/dev/null

export DISPLAY=:99
Xvfb :99 -screen 0 1600x1000x24 >/tmp/house-price-xvfb.log 2>&1 &
XVFB_PID=$!
trap 'kill "$XVFB_PID" 2>/dev/null || true; kill "$CODE_PID" 2>/dev/null || true' EXIT

code \
  --no-sandbox \
  --disable-gpu \
  --user-data-dir "$PROFILE_DIR" \
  --extensions-dir "$EXTENSIONS_DIR" \
  --new-window "$PROJECT_ROOT" \
  >/tmp/house-price-vscode.log 2>&1 &
CODE_PID=$!

WINDOW_ID=""
for _ in {1..40}; do
  WINDOW_ID="$(xdotool search --onlyvisible --class 'Code' 2>/dev/null | tail -n 1 || true)"
  if [ -n "$WINDOW_ID" ]; then
    break
  fi
  sleep 1
done

if [ -z "$WINDOW_ID" ]; then
  cat /tmp/house-price-vscode.log || true
  raise_msg="Could not find the running Visual Studio Code window."
  echo "$raise_msg" >&2
  exit 1
fi

# New VS Code installs may display a Copilot sign-in onboarding modal.
# Close it explicitly so screenshots show the actual learner files rather than a welcome dialog.
sleep 3
xdotool key --window "$WINDOW_ID" Escape 2>/dev/null || true
sleep 1

eval "$(xdotool getwindowgeometry --shell "$WINDOW_ID")"
CLICK_X=$((WIDTH * 75 / 100))
CLICK_Y=$((HEIGHT * 78 / 100))
xdotool mousemove --window "$WINDOW_ID" "$CLICK_X" "$CLICK_Y" click 1 2>/dev/null || true
xdotool key --window "$WINDOW_ID" Escape 2>/dev/null || true
sleep 2

capture_file() {
  local relative_path="$1"
  local output_name="$2"

  code \
    --no-sandbox \
    --disable-gpu \
    --user-data-dir "$PROFILE_DIR" \
    --extensions-dir "$EXTENSIONS_DIR" \
    --reuse-window "$PROJECT_ROOT/$relative_path"

  sleep 3
  xdotool key --window "$WINDOW_ID" Escape 2>/dev/null || true
  sleep 1

  local expected_name
  expected_name="$(basename "$relative_path")"
  local window_name
  window_name="$(xdotool getwindowname "$WINDOW_ID" 2>/dev/null || true)"
  if [[ "$window_name" != *"$expected_name"* ]]; then
    echo "VS Code did not visibly open $expected_name. Window title: $window_name" >&2
    exit 1
  fi

  import -display :99 -window "$WINDOW_ID" "$OUTPUTS_DIR/$output_name"
  echo "Captured real Visual Studio Code screenshot: $output_name ($window_name)"
}

# Capture the real project workspace and the exact files learners create/use.
capture_file "requirements.txt" "vscode-requirements.png"
capture_file "download_data.py" "vscode-download-data.png"
capture_file "src/train_model.py" "vscode-training-code.png"
capture_file "outputs/model_comparison.csv" "vscode-model-comparison.png"
capture_file "outputs/final_metrics.json" "vscode-final-metrics.png"
capture_file "outputs/prediction_examples.csv" "vscode-prediction-examples.png"
capture_file "models/app_metadata.json" "vscode-app-metadata.png"
capture_file "app.py" "vscode-app-code.png"
capture_file "tests/test_app.py" "vscode-test-code.png"

# Finish on README so the Explorer remains visible as a final project-workspace checkpoint.
capture_file "README.md" "vscode-project-workspace.png"

echo "Captured verified VS Code evidence screenshots."
