[CmdletBinding()]
param(
  [ValidateRange(1024, 65535)]
  [int]$Port = 3001
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot

if (-not (Test-Path -LiteralPath "node_modules")) {
  throw "Dependencies are missing. Run .\scripts\setup-laptop.ps1 first."
}

if (-not (Test-Path -LiteralPath "dist\index.html")) {
  Write-Host "Creating the production preview files..."
  & npx.cmd vite build --configLoader runner
  if ($LASTEXITCODE -ne 0) {
    throw "The production build failed, so the preview cannot be started."
  }
}

Write-Host "Starting the ML Academy preview at http://127.0.0.1:$Port/"
Write-Host "Press Ctrl+C to stop the server."
& npx.cmd vite preview --configLoader runner --host 127.0.0.1 --port $Port
