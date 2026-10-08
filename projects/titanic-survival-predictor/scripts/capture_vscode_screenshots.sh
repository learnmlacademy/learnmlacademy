#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUTS_DIR="$PROJECT_ROOT/outputs"
PROFILE_DIR="/tmp/learnmlacademy-titanic-vscode-profile"
EXTENSIONS_DIR="/tmp/learnmlacademy-titanic-vscode-extensions"

mkdir -p "$OUTPUTS_DIR" "$PROFILE_DIR/User" "$EXTENSIONS_DIR"

cat > "$PROFILE_DIR/User/settings.json" <<'EOF'
{
  "security.workspace.trust.enabled": false,
  "workbench.startupEditor": "none",
  "editor.minimap.enabled": false,
  "editor.fontSize": 15,
  "window.zoomLevel": 0
}
EOF

sudo apt-get update -qq
sudo apt-get install -y -qq xvfb xdotool imagemagick >/dev/null

curl -fsSL "https://update.code.visualstudio.com/latest/linux-deb-x64/stable" -o /tmp/titanic-vscode.deb
sudo apt-get install -y -qq /tmp/titanic-vscode.deb >/dev/null

export DISPLAY=:99
Xvfb :99 -screen 0 1600x1000x24 >/tmp/titanic-xvfb.log 2>&1 &
XVFB_PID=$!
trap 'kill "$XVFB_PID" 2>/dev/null || true; kill "$CODE_PID" 2>/dev/null || true' EXIT

code   --no-sandbox   --disable-gpu   --user-data-dir "$PROFILE_DIR"   --extensions-dir "$EXTENSIONS_DIR"   --new-window "$PROJECT_ROOT"   >/tmp/titanic-vscode.log 2>&1 &
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
  cat /tmp/titanic-vscode.log || true
  echo "Could not find the running Visual Studio Code window." >&2
  exit 1
fi

sleep 3
xdotool key --window "$WINDOW_ID" Escape 2>/dev/null || true
sleep 1

capture_file() {
  local relative_path="$1"
  local output_name="$2"

  code     --no-sandbox     --disable-gpu     --user-data-dir "$PROFILE_DIR"     --extensions-dir "$EXTENSIONS_DIR"     --reuse-window "$PROJECT_ROOT/$relative_path"

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

capture_file "src/train_model.py" "vscode-training-code.png"
capture_file "outputs/model_comparison.csv" "vscode-model-comparison.png"
capture_file "outputs/tuning_results.csv" "vscode-tuning-results.png"
capture_file "outputs/metrics.json" "vscode-final-metrics.png"
capture_file "outputs/example_predictions.csv" "vscode-example-predictions.png"
capture_file "README.md" "vscode-project-workspace.png"

echo "Captured verified Titanic VS Code evidence screenshots."
