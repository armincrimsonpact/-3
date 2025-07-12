# 🗄️ Supabase Setup Guide for InkCircle

## Step 1: Create Supabase Project

1. **Visit [supabase.com](https://supabase.com)** and sign up/login
2. **Click "New Project"**
3. **Fill in project details:**
   - **Organization**: Create new or select existing
   - **Project Name**: `InkCircle`
   - **Database Password**: Generate a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier
4. **Wait for setup** (takes ~2 minutes)

## Step 2: Get Your Credentials

Once your project is ready:

1. **Go to Settings > API** in your Supabase dashboard
2. **Copy these values:**
   - `Project URL`
   - `anon public` key  
   - `service_role` key (keep this secret!)

## Step 3: Create Environment Variables

Create a file called `.env.local` in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Configuration (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres?schema=public"

# Security

```

**Replace:**
- `your_project_url_here` → Your Project URL from Supabase
- `your_anon_key_here` → Your anon public key from Supabase  
- `your_service_role_key_here` → Your service_role key from Supabase
- `[YOUR_PASSWORD]` → Your database password
- `[YOUR_PROJECT_REF]` → Your project reference (found in Settings > Database)


## Step 4: Set Up Database Schema

Run this command to create your database tables:

```bash
npx prisma db push
```

## Step 5: Set Up Authentication

In your Supabase dashboard:

1. **Go to Authentication > Settings**
2. **Configure site URL**: `https://your-production-domain.com`
3. **Add redirect URLs**: `https://your-production-domain.com/auth/callback`
4. **Enable email confirmations** (optional)
5. **Configure OAuth providers** (optional)

## Step 6: Set Up Row Level Security (RLS)

We'll set up proper security policies in the next step.

## Step 7: Test Your Setup

```bash
npm run dev
```

Your InkCircle app should now connect to your real Supabase database!

## 🚨 Security Notes

- Never commit `.env.local` to git
- Keep your `service_role` key secret
- Enable RLS on all tables in production
- Use strong passwords for database access 