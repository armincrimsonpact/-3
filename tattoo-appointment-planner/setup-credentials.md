# 🔑 Set Up Your Supabase Credentials

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project name: `inkcircle-tattoo-booking`
6. Set a strong database password (save this!)
7. Choose your region (closest to your users)
8. Click "Create new project"
9. Wait for project to be created (takes 1-2 minutes)

## Step 2: Get Your Credentials

From your Supabase project dashboard:

1. **Project URL**: Copy from the dashboard URL bar
   - Format: `https://your-project-id.supabase.co`

2. **API Keys**: Go to Settings → API
   - **Anon Key**: Copy the "anon public" key
   - **Service Role Key**: Copy the "service_role" key

3. **Database URL**: Go to Settings → Database
   - Copy the connection string
   - Format: `postgresql://postgres:password@db.project-id.supabase.co:5432/postgres`

## Step 3: Create .env.local File

Create a file called `.env.local` in your project root with:

```bash
# 🔑 Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Step 4: Set Up Database Schema

1. Open Supabase SQL Editor
2. Copy the contents of `supabase-setup.sql`
3. Paste and run the query
4. This creates all tables and security policies

## Step 5: Test Your Setup

Run the test script:
```bash
node test-supabase-auth.js
```

If successful, you'll see:
- ✅ Database connection successful!
- ✅ Authentication system working!

## Step 6: Deploy to Vercel

Once tests pass, you can deploy:
```bash
npm run build
vercel --prod
```

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your service role key secret
- Use environment variables in Vercel dashboard for production
- The anon key is safe to use in frontend code

## 🚨 Troubleshooting

**Database connection fails?**
- Check your DATABASE_URL format
- Verify your database password
- Ensure your Supabase project is active

**Authentication not working?**
- Verify your API keys
- Check your project URL
- Ensure RLS policies are set up correctly

**Need help?**
- Check Supabase documentation
- Review the SQL setup file
- Test with the provided test script 