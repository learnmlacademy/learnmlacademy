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

Write-Host "Starting the editable ML Academy website at http://127.0.0.1:$Port/"
Write-Host "Press Ctrl+C to stop the server."
& npx.cmd vite --configLoader runner --host 127.0.0.1 --port $Port
