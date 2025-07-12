# Create .env.local File for Supabase
# This script helps you create your environment file

Write-Host "Creating .env.local file for Supabase..." -ForegroundColor Green
Write-Host ""

# Check if .env.local already exists
if (Test-Path ".env.local") {
    Write-Host "Warning: .env.local already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Cancelled." -ForegroundColor Red
        exit
    }
}

Write-Host "Please enter your Supabase credentials:" -ForegroundColor Cyan
Write-Host ""

# Get Supabase URL
Write-Host "1. Supabase Project URL:" -ForegroundColor Yellow
Write-Host "   Example: https://abc123def456.supabase.co" -ForegroundColor Gray
$supabaseUrl = Read-Host "   Enter your Supabase URL"

# Get Anon Key
Write-Host ""
Write-Host "2. Supabase Anon Key (public):" -ForegroundColor Yellow
Write-Host "   From Settings -> API -> anon public" -ForegroundColor Gray
$anonKey = Read-Host "   Enter your Anon Key"

# Get Service Role Key
Write-Host ""
Write-Host "3. Supabase Service Role Key (secret):" -ForegroundColor Yellow
Write-Host "   From Settings -> API -> service_role" -ForegroundColor Gray
$serviceKey = Read-Host "   Enter your Service Role Key"

# Get Database URL
Write-Host ""
Write-Host "4. Database URL:" -ForegroundColor Yellow
Write-Host "   From Settings -> Database -> Connection string" -ForegroundColor Gray
$databaseUrl = Read-Host "   Enter your Database URL"

# Create .env.local content
$envContent = @"
# Supabase Configuration
# Generated on $(Get-Date)

# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl

# Your Supabase anon key (public)
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey

# Your Supabase service role key (secret)
SUPABASE_SERVICE_ROLE_KEY=$serviceKey

# Your Supabase database URL
DATABASE_URL=$databaseUrl

# Application URL (for development)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NODE_ENV=development
"@

# Write to file
try {
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host ""
    Write-Host "SUCCESS: .env.local file created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Set up database schema:" -ForegroundColor White
    Write-Host "      - Open Supabase SQL Editor" -ForegroundColor Gray
    Write-Host "      - Copy contents of supabase-setup.sql" -ForegroundColor Gray
    Write-Host "      - Paste and run the query" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   2. Test your setup:" -ForegroundColor White
    Write-Host "      node test-supabase-auth.js" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   3. If tests pass, deploy to Vercel:" -ForegroundColor White
    Write-Host "      npm run build" -ForegroundColor Gray
    Write-Host "      vercel --prod" -ForegroundColor Gray
    Write-Host ""
}
catch {
    Write-Host "ERROR: Creating .env.local file failed:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host "SECURITY REMINDER: Never commit .env.local to version control!" -ForegroundColor Yellow 