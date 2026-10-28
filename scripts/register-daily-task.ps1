# Register or update Windows Task Scheduler job for Career-Ops daily automation.
# Run once as your user (requires admin only if task creation is blocked).

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Script = Join-Path $PSScriptRoot "daily-scan.ps1"
$TaskName = "Career-Ops Daily Scan"

$Action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$Script`""

$Trigger = New-ScheduledTaskTrigger -Daily -At "8:00AM"

$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours 8)

Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Trigger `
    -Settings $Settings `
    -Description "Career-Ops: scan portals, evaluate pending URLs, build 3.5+ summary PDF, open for review." `
    -Force

Write-Host "Registered task: $TaskName"
Write-Host "  Script: $Script"
Write-Host "  Schedule: daily 8:00 AM local"
Write-Host "Run now: Start-ScheduledTask -TaskName '$TaskName'"
