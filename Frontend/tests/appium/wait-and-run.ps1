$timeout = 120
$start = Get-Date
while ( ((adb devices -l) -match 'unauthorized') -and ((Get-Date) - $start).TotalSeconds -lt $timeout ) {
  Write-Host 'Waiting for device authorization...'
  Start-Sleep -Seconds 2
}
Write-Host 'Final devices:'
adb devices -l
if ( (adb devices -l) -match '\bdevice\b' ) {
  Write-Host 'Device authorized — forwarding port 5174...'
  adb reverse tcp:5174 tcp:5174
  Write-Host 'Running Appium tests (this may take a while)...'
  pnpm run test:appium:all
} else {
  Write-Host 'Device not authorized or not found. Please accept RSA prompt on device and ensure adb devices shows a device id with "device" status.'
}
