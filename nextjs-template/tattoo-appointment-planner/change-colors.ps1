# Color Change Script for Next.js Template
# This script will replace all instances of teal with your chosen color

param(
    [Parameter(Mandatory=$true)]
    [string]$Color
)

Write-Host "Changing primary color from teal to $Color..." -ForegroundColor Green

# Get all TypeScript, JavaScript, and CSS files
$files = Get-ChildItem -Recurse -Include "*.tsx", "*.ts", "*.js", "*.css" | Where-Object { $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*.next*" }

$totalFiles = $files.Count
$processedFiles = 0

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw
        $originalContent = $content
        
        # Replace teal with the new color
        $content = $content -replace "teal-500", "$Color-500"
        $content = $content -replace "teal-600", "$Color-600"
        $content = $content -replace "teal-400", "$Color-400"
        $content = $content -replace "teal-300", "$Color-300"
        $content = $content -replace "teal-700", "$Color-700"
        
        # Only write if content changed
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            Write-Host "Updated: $($file.Name)" -ForegroundColor Yellow
        }
        
        $processedFiles++
    }
    catch {
        Write-Host "Error processing $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nColor change complete!" -ForegroundColor Green
Write-Host "Processed $processedFiles files" -ForegroundColor Cyan
Write-Host "`nDon't forget to also update your tailwind.config.js if needed!" -ForegroundColor Yellow 