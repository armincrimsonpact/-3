# Vercel Environment Variables Template

## Required Environment Variables for Production Deployment

Copy these variables to your Vercel project dashboard under **Settings > Environment Variables**:

### 🔐 Supabase Configuration

```bash
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase anon/public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Your Supabase service role key (secret)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database connection string (from Supabase Settings > Database)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 🔒 Application Configuration

```bash
# Your production application URL
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 📧 Email Service Configuration

```bash
# Production SMTP settings (recommend SendGrid)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### 🗺️ Google Maps API

```bash
# For location services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 🛡️ Security Settings

```bash
# Admin invite codes (change these!)
ADMIN_INVITE_CODES=SECURE-ADMIN-CODE-1,SECURE-ADMIN-CODE-2

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_TIMEOUT_MINUTES=30
```

### 🏗️ Build Configuration

```bash
# Application environment
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 📊 Optional: Analytics & Monitoring

```bash
# Google Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Error tracking
SENTRY_DSN=your-sentry-dsn

# Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

## How to Add Environment Variables in Vercel

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings > Environment Variables**
3. **Add each variable one by one:**
   - **Name**: The variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: The actual value
   - **Environment**: Select `Production`, `Preview`, and `Development` as needed
4. **Click "Save"**

## Security Notes

- ⚠️ **Never commit real credentials to version control**
- 🔐 **Use different values for development and production**
- 🔑 **Regenerate secrets regularly**
- 📝 **Keep a secure backup of your environment variables**

## Vercel CLI Alternative

You can also set environment variables using the Vercel CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... etc
``` 