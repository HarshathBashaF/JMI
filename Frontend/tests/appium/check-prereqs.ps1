<#
Simple PowerShell prereq checker for Appium runs.
Checks: java, adb, node, pnpm/npm, appium, chromedriver (optional)
#>
function Check-Command($cmd, $versionArgs = '--version') {
  $exe = Get-Command $cmd -ErrorAction SilentlyContinue
  if (-not $exe) { return @{ ok = $false; msg = "$cmd not found in PATH" } }
  try {
    $out = & $cmd $versionArgs 2>&1
    return @{ ok = $true; msg = $out[0] }
  } catch {
    return @{ ok = $true; msg = "$cmd found but version check failed" }
  }
}

Write-Host "Checking local prerequisites for Appium tests...`n"

$checks = @{
  'java' = '--version'
  'adb' = 'version'
  'node' = '--version'
  'pnpm' = '--version'
  'npm' = '--version'
  'appium' = '--version'
  'chromedriver' = '--version'
}

$anyMissing = $false
foreach ($k in $checks.Keys) {
  $res = Check-Command $k $checks[$k]
  if ($res.ok) {
    Write-Host "[OK]  $k -> $($res.msg)" -ForegroundColor Green
  } else {
    Write-Host "[MISSING] $k -> $($res.msg)" -ForegroundColor Yellow
    $anyMissing = $true
  }
}

Write-Host "`nADB device check (if adb present):"
try {
  $adb = Get-Command adb -ErrorAction SilentlyContinue
  if ($adb) {
    & adb devices
  } else {
    Write-Host "adb not available, skipping device list." -ForegroundColor Yellow
  }
} catch {
  Write-Host "Failed to run adb devices: $_" -ForegroundColor Red
}

if ($anyMissing) {
  Write-Host "`nOne or more prerequisites appear missing. See notes in tests/appium/README.md" -ForegroundColor Yellow
  exit 2
} else {
  Write-Host "`nAll checked prerequisites appear installed." -ForegroundColor Green
  exit 0
}
