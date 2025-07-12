# 🚀 Supabase Setup Checklist for InkCircle

## ✅ Pre-Setup (Completed)
- [x] Supabase client/server configuration ready
- [x] Prisma schema optimized for Supabase
- [x] Authentication routes updated
- [x] Row Level Security SQL scripts prepared
- [x] Test scripts created

## 📝 Step-by-Step Setup Guide

### Step 1: Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com) and sign up/login
- [ ] Click "New Project"
- [ ] Fill in details:
  - **Project Name**: `InkCircle`
  - **Database Password**: Generate strong password (SAVE IT!)
  - **Region**: Choose closest to your users
- [ ] Wait 2-3 minutes for project creation

### Step 2: Get Your Credentials
- [ ] Go to **Settings > API** in Supabase dashboard
- [ ] Copy and save these values:
  - [ ] Project URL
  - [ ] `anon` `public` key
  - [ ] `service_role` key (keep secret!)
- [ ] Go to **Settings > Database** 
- [ ] Copy the **Connection string** for Prisma

### Step 3: Set Up Environment Variables
- [ ] Create `.env.local` file in project root
- [ ] Add these variables (replace with your values):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Configuration
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres?schema=public"

# Security

```


- [ ] Replace `[PASSWORD]` and `[PROJECT_REF]` in DATABASE_URL

### Step 4: Test Connection
- [ ] Run: `node test-supabase-connection.js`
- [ ] Verify all services connect successfully
- [ ] Fix any connection issues before proceeding

### Step 5: Set Up Database Schema
- [ ] Run: `npx prisma generate`
- [ ] Run: `npx prisma db push`
- [ ] Verify tables created in Supabase **Table Editor**

### Step 6: Configure Authentication
- [ ] In Supabase dashboard, go to **Authentication > Settings**
- [ ] Set **Site URL**: `https://your-production-domain.com`
- [ ] Add **Redirect URLs**: `https://your-production-domain.com/auth/callback`
- [ ] Configure email settings (optional for now)

### Step 7: Set Up Row Level Security
- [ ] Go to Supabase **SQL Editor**
- [ ] Copy entire content of `supabase-setup.sql`
- [ ] Paste and run in SQL Editor
- [ ] Verify no errors in execution

### Step 8: Test Authentication
- [ ] Start your app: `npm run dev`
- [ ] Try registering a new user
- [ ] Check if user appears in **Authentication > Users**
- [ ] Verify UserProfile created in **Table Editor**
- [ ] Test login functionality

### Step 9: Verify Security
- [ ] Test RLS policies work (users can only see their own data)
- [ ] Verify file upload works (if using portfolio images)
- [ ] Check all user roles work correctly

## 🔧 Troubleshooting

### Common Issues:

**Connection Failed:**
- Double-check all environment variables
- Ensure no typos in credentials
- Verify project is fully initialized

**Tables Not Found:**
- Run `npx prisma db push` again
- Check DATABASE_URL format
- Verify Prisma schema syntax

**Authentication Not Working:**
- Check redirect URLs in Supabase settings
- Verify all Supabase credentials are set
- Check browser console for errors

**RLS Policies Failing:**
- Ensure SQL script ran without errors
- Check if tables have RLS enabled
- Verify user roles are set correctly

## 📱 Production Deployment

### When ready for production:
- [ ] Update environment variables for production URLs
- [ ] Configure custom domain in Supabase
- [ ] Set up email templates
- [ ] Configure OAuth providers (Google, GitHub, etc.)
- [ ] Enable email confirmations
- [ ] Set up monitoring and logging
- [ ] Review and tighten RLS policies

## 🎉 Success Criteria

Your setup is complete when:
- ✅ All tests in `test-supabase-connection.js` pass
- ✅ Users can register and login
- ✅ User data is properly secured (RLS working)
- ✅ Role-based access works correctly
- ✅ No console errors during auth flows

## 📞 Need Help?

- **Supabase Docs**: [docs.supabase.com](https://docs.supabase.com)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)
- **Common Errors**: Check the troubleshooting section above

---

**🚨 Security Reminder**: Never commit `.env.local` to version control! 