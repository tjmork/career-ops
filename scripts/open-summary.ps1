# Open the daily high-match summary PDF in Google Chrome (not Cursor browser).
# Always resolves to an absolute Windows path (e.g. D:\...) and opens via file:/// URL.
# Falls back to default PDF handler only if Chrome is not installed.

param(
    [Parameter(Mandatory = $true)][string]$PdfPath,
    [string]$HtmlPath = ""
)

function Resolve-ChromePath {
    $candidates = @(
        (Join-Path $env:ProgramFiles "Google\Chrome\Application\chrome.exe"),
        (Join-Path ${env:ProgramFiles(x86)} "Google\Chrome\Application\chrome.exe"),
        (Join-Path $env:LOCALAPPDATA "Google\Chrome\Application\chrome.exe")
    )
    foreach ($p in $candidates) {
        if ($p -and (Test-Path -LiteralPath $p)) { return $p }
    }
    $cmd = Get-Command chrome -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    return $null
}

function Get-AbsolutePath([string]$Path) {
    if (-not $Path) { return $null }
    if (-not (Test-Path -LiteralPath $Path)) { return $null }
    return [System.IO.Path]::GetFullPath((Resolve-Path -LiteralPath $Path).Path)
}

function ConvertTo-FileUri([string]$AbsolutePath) {
    # Chrome prefers file:///D:/path/to/file.pdf (forward slashes)
    $uri = [System.Uri]::new($AbsolutePath)
    return $uri.AbsoluteUri
}

$pdfFull = Get-AbsolutePath $PdfPath
if (-not $pdfFull) {
    Write-Warning "Summary PDF not found: $PdfPath"
    exit 0
}

if ($pdfFull -notmatch '^[A-Za-z]:\\') {
    Write-Warning "Expected a local drive path (e.g. D:\...), got: $pdfFull"
}

$chrome = Resolve-ChromePath
$pdfUri = ConvertTo-FileUri $pdfFull

if ($chrome) {
    Start-Process -FilePath $chrome -ArgumentList @("--new-window", $pdfUri)
    if ($HtmlPath) {
        $htmlFull = Get-AbsolutePath $HtmlPath
        if ($htmlFull) {
            Start-Process -FilePath $chrome -ArgumentList @((ConvertTo-FileUri $htmlFull))
        }
    }
    Write-Host "Opened in Google Chrome: $pdfFull"
    Write-Host "  URI: $pdfUri"
} else {
    Write-Warning "Google Chrome not found - opening PDF with default app."
    Start-Process $pdfFull
    Write-Host "Opened with default app: $pdfFull"
}
