[CmdletBinding()]
param(
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js was not found. Install Node.js 22 LTS, reopen PowerShell, and run this script again."
}

if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
  throw "npm was not found. Reinstall Node.js 22 LTS with npm included."
}

Write-Host "Project: $projectRoot"
Write-Host "Node: $(node --version)"
Write-Host "npm: $(npm.cmd --version)"

if (-not $SkipInstall) {
  Write-Host "Installing the exact locked dependencies..."
  & npm.cmd ci
  if ($LASTEXITCODE -ne 0) { throw "npm ci failed with exit code $LASTEXITCODE." }
}

Write-Host "Running TypeScript validation..."
& npm.cmd run lint
if ($LASTEXITCODE -ne 0) { throw "TypeScript validation failed with exit code $LASTEXITCODE." }

Write-Host "Creating a production build..."
& npx.cmd vite build --configLoader runner
if ($LASTEXITCODE -ne 0) { throw "The Vite production build failed with exit code $LASTEXITCODE." }

Write-Host "Laptop setup passed. Start the preview with:"
Write-Host ".\scripts\start-preview.ps1"

