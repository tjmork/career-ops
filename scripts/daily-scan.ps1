# Career-Ops daily automation: scan → pipeline (if pending) → 3.5+ summary → PDF → open
# Scheduled via Windows Task Scheduler (8:00 AM Pacific): "Career-Ops Daily Scan"
# Logs: data/scan-logs/daily-YYYY-MM-DD-HHmmss.log

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$LogDir = Join-Path $Root "data\scan-logs"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

# Date daily scan automation was first enabled (Jul 10 manual + Jul 12 scheduled).
$DailyScanSince = "2026-07-10"
$SummaryMin = "3.5"
# Always absolute D:\ (or whatever drive hosts this repo) paths for Chrome open step
$SummaryMd = [System.IO.Path]::GetFullPath((Join-Path $Root "reports\summary-${SummaryMin}plus-since-daily-scan-${DailyScanSince}.md"))
$SummaryPdf = [System.IO.Path]::GetFullPath((Join-Path $Root "reports\summary-${SummaryMin}plus-since-daily-scan-${DailyScanSince}.pdf"))
$SummaryHtml = [System.IO.Path]::GetFullPath((Join-Path $Root "reports\summary-${SummaryMin}plus-since-daily-scan-${DailyScanSince}.html"))
$LatestMeta = Join-Path $LogDir "latest-summary.json"

$LogFile = Join-Path $LogDir ("daily-{0:yyyy-MM-dd-HHmmss}.log" -f (Get-Date))

function Write-Log($msg) {
    $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
    Write-Host $line
    $line | Out-File $LogFile -Append -Encoding utf8
}

function Invoke-Node($args) {
    & node @args 2>&1 | Tee-Object -FilePath $LogFile -Append
    if ($LASTEXITCODE -ne 0) { throw "node $($args -join ' ') exited $LASTEXITCODE" }
}

function Get-PendingCount {
    $pipe = Get-Content (Join-Path $Root "data\pipeline.md") -Raw
    return ([regex]::Matches($pipe, '(?m)^- \[ \] ')).Count
}

Write-Log "=== Career-Ops daily run started ==="

Push-Location $Root
try {
    # 1. Zero-token portal scan
    Write-Log "Step 1/5: scan.mjs"
    Invoke-Node @("scan.mjs")

    $pending = Get-PendingCount
    Write-Log "Pending inbox after scan: $pending"

    # 2. Pipeline on new pending URLs (heuristic eval, reports only — no per-role PDFs)
    if ($pending -gt 0) {
        Write-Log "Step 2/5: pipeline on $pending pending URL(s)"
        $runId = "inbox-$(Get-Date -Format 'yyyyMMdd')"
        $env:PIPELINE_RUN_ID = $runId
        $env:SKIP_PDF = "1"
        try {
            Invoke-Node @("batch/run-pending-pipeline.mjs", "extract")
            Invoke-Node @("batch/run-pending-pipeline.mjs", "liveness", "--throttle=1000")
        } catch {
            # check-liveness exits 1 when any URL expired — log is still saved
            if (-not (Test-Path (Join-Path $Root "batch\pipeline-$runId\liveness.log"))) { throw }
            Write-Log "Liveness finished with expired URLs (expected); continuing."
        }
        Invoke-Node @("batch/run-pending-pipeline.mjs", "apply-liveness")
        Invoke-Node @("batch/run-pending-pipeline.mjs", "process")
    } else {
        Write-Log "Step 2/5: pipeline skipped (0 pending)"
    }

    # 3. Build 3.5+ score summary since daily scan start
    Write-Log "Step 3/5: gen-score-summary (>= $SummaryMin since $DailyScanSince)"
    Invoke-Node @(
        "batch/gen-score-summary.mjs",
        "--min", $SummaryMin,
        "--since", $DailyScanSince,
        "--note", "Auto-generated after daily scan + pipeline.",
        "--out", $SummaryMd
    )

    # 4. Render summary PDF
    Write-Log "Step 4/5: render-summary-pdf"
    if (Test-Path $SummaryMd) {
        Invoke-Node @("batch/render-summary-pdf.mjs", $SummaryMd)
    } else {
        Write-Log "No summary markdown — skipping PDF"
    }

    # 5. Open summary PDF in Google Chrome using absolute D:\ path
    Write-Log "Step 5/5: open summary in Chrome"
    Write-Log "  PDF path: $SummaryPdf"
    $meta = @{
        generatedAt = (Get-Date -Format "o")
        since       = $DailyScanSince
        minScore    = $SummaryMin
        root        = $Root
        markdown    = $SummaryMd
        pdf         = $SummaryPdf
        html        = $SummaryHtml
    } | ConvertTo-Json
    $meta | Out-File $LatestMeta -Encoding utf8

    & (Join-Path $PSScriptRoot "open-summary.ps1") -PdfPath $SummaryPdf -HtmlPath $SummaryHtml

    Write-Log "=== Daily run complete ==="
    exit 0
} catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    exit 1
} finally {
    Pop-Location
    Remove-Item Env:PIPELINE_RUN_ID -ErrorAction SilentlyContinue
    Remove-Item Env:SKIP_PDF -ErrorAction SilentlyContinue
}
