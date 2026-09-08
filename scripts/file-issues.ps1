# File Kindity QA bug issues on GitHub
# Prerequisites: winget install GitHub.cli ; gh auth login
# Usage: pwsh ./scripts/file-issues.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$issuesDir = Join-Path $root "docs\qa\issues"

$labels = @(
  @{ name = "bug"; color = "d73a4a"; description = "Something isn't working" },
  @{ name = "severity:critical"; color = "b60205"; description = "Critical severity" },
  @{ name = "severity:high"; color = "e99695"; description = "High severity" },
  @{ name = "severity:medium"; color = "fbca04"; description = "Medium severity" },
  @{ name = "severity:low"; color = "0e8a16"; description = "Low severity" },
  @{ name = "area:auth"; color = "1d76db"; description = "Authentication / session" },
  @{ name = "area:rbac"; color = "5319e7"; description = "Authorization / RBAC" },
  @{ name = "area:payment"; color = "006b75"; description = "Stripe / donations" },
  @{ name = "area:admin"; color = "c5def5"; description = "Admin features" },
  @{ name = "area:frontend"; color = "fef2c0"; description = "Frontend / SPA" },
  @{ name = "area:users"; color = "d4c5f9"; description = "User profile / history" },
  @{ name = "area:various"; color = "ededed"; description = "Cross-cutting" }
)

Write-Host "Ensuring labels exist..."
foreach ($l in $labels) {
  gh label create $l.name --color $l.color --description $l.description 2>$null
  if ($LASTEXITCODE -ne 0) {
    # label may already exist
  }
}

$map = @{
  "BUG-01.md" = @("bug", "severity:critical", "area:auth")
  "BUG-02.md" = @("bug", "severity:critical", "area:rbac")
  "BUG-03.md" = @("bug", "severity:high", "area:admin")
  "BUG-04.md" = @("bug", "severity:high", "area:frontend")
  "BUG-05.md" = @("bug", "severity:high", "area:auth")
  "BUG-06.md" = @("bug", "severity:medium", "area:payment")
  "BUG-07.md" = @("bug", "severity:medium", "area:payment")
  "BUG-08.md" = @("bug", "severity:medium", "area:users")
  "BUG-09.md" = @("bug", "severity:medium", "area:frontend")
  "BUG-10.md" = @("bug", "severity:low", "area:various")
}

$created = @()
Get-ChildItem $issuesDir -Filter "BUG-*.md" | Sort-Object Name | ForEach-Object {
  $file = $_.Name
  $body = Get-Content $_.FullName -Raw
  $titleLine = ($body -split "`n" | Where-Object { $_ -match "^#\s+" } | Select-Object -First 1)
  $title = $titleLine -replace "^#\s+", ""
  $labelArgs = @()
  foreach ($lab in $map[$file]) { $labelArgs += @("--label", $lab) }

  Write-Host "Creating issue for $file ..."
  $url = gh issue create --title $title --body $body @labelArgs
  Write-Host "  -> $url"
  $num = if ($url -match "/issues/(\d+)$") { $Matches[1] } else { "?" }
  $created += [pscustomobject]@{ File = $file; Number = $num; Url = $url }
}

$created | Format-Table -AutoSize
$created | ConvertTo-Json | Set-Content (Join-Path $issuesDir "filed-issues.json")
Write-Host "Wrote docs/qa/issues/filed-issues.json — update test titles/RTM with issue numbers if desired."
