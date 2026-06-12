# Add platform-tools to user PATH
$pt = 'C:\Android\platform-tools'
$old = [Environment]::GetEnvironmentVariable('Path', 'User')

if ($old -notlike "*platform-tools*") {
  [Environment]::SetEnvironmentVariable('Path', "$old;$pt", 'User')
  Write-Host "Added $pt to user PATH."
  Write-Host "Please close and reopen PowerShell for the change to take effect."
} else {
  Write-Host "platform-tools already in PATH."
}

# Add to current session PATH temporarily
$env:Path += ";$pt"
Write-Host "Added to current session. Testing adb..."
& adb version
