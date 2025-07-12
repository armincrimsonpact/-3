# 🚀 Complete Vercel Deployment Guide

## InkCircle Tattoo Booking Platform - Production Deployment

This guide will walk you through deploying the InkCircle application to production using Vercel and Supabase.

---

## 📋 Prerequisites

- ✅ Supabase account and project created
- ✅ Vercel account created
- ✅ Node.js 18+ installed
- ✅ Git repository ready
- ✅ Domain name (optional)

---

## 🔧 Step 1: Prepare Your Environment

### 1.1 Update Local Environment Variables
Create or update your `.env.local` file with real credentials:

```bash
# Get these from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 1.2 Verify Supabase Credentials
Ensure all your Supabase credentials are correctly configured in your environment.

---

## 🗄️ Step 2: Set Up Supabase Database

### 2.1 Run the Deployment Script
```bash
node deploy-to-production.js
```

### 2.2 Apply Row Level Security
1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase-setup.sql`
4. Paste and run the script
5. Verify all tables are created with proper policies

---

## 🌐 Step 3: Deploy to Vercel

### 3.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 3.2 Login to Vercel
```bash
vercel login
```

### 3.3 Initialize Vercel Project
```bash
vercel
```
Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your personal account or team
- **Link to existing project?** → No
- **Project name?** → inkcircle-tattoo-booking
- **Directory?** → ./
- **Override settings?** → No

### 3.4 Deploy to Production
```bash
vercel --prod
```

---

## ⚙️ Step 4: Configure Environment Variables in Vercel

### 4.1 Access Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**

### 4.2 Add Required Variables
Add each of these variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Production, Preview |
| `DATABASE_URL` | Your Supabase database URL | Production, Preview |

| `NODE_ENV` | production | Production |

### 4.3 Optional Variables
```bash
# Email service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Security
ADMIN_INVITE_CODES=SECURE-ADMIN-CODE-1,SECURE-ADMIN-CODE-2
```

---

## 🔐 Step 5: Configure Supabase for Production

### 5.1 Update Authentication Settings
1. Go to **Authentication** → **Settings**
2. Update **Site URL** to your production URL
3. Add your production domain to **Redirect URLs**
4. Configure **Email Templates** for production

### 5.2 Update Database Policies
Ensure your RLS policies are production-ready:
```sql
-- Check if policies are active
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

---

## 🧪 Step 6: Test Production Deployment

### 6.1 Basic Functionality Test
- ✅ Visit your production URL
- ✅ Test user registration
- ✅ Test user login
- ✅ Test role-based access
- ✅ Test appointment booking
- ✅ Test email notifications

### 6.2 Performance Test
- ✅ Check page load times
- ✅ Test on mobile devices
- ✅ Verify SSL certificate
- ✅ Test database connections

---

## 📊 Step 7: Post-Deployment Setup

### 7.1 Domain Configuration (Optional)
```bash
vercel domains add your-domain.com
```

### 7.2 Set up Monitoring
- Configure error tracking (Sentry)
- Set up analytics (Google Analytics)
- Monitor database performance

### 7.3 Security Checklist
- ✅ All environment variables secured
- ✅ Database policies active
- ✅ HTTPS enforced
- ✅ CORS configured properly
- ✅ Rate limiting active

---

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and rebuild
vercel --force
```

#### Database Connection Issues
- Check `DATABASE_URL` format
- Verify Supabase project is active
- Check IP restrictions in Supabase

#### Authentication Issues
- Verify Supabase authentication settings
- Check Supabase auth settings
- Verify redirect URLs are correct

#### Environment Variable Issues
```bash
# List all variables
vercel env ls

# Remove a variable
vercel env rm VARIABLE_NAME

# Add a variable
vercel env add VARIABLE_NAME
```

---

## 📈 Performance Optimization

### 7.1 Enable Analytics
```bash
vercel analytics enable
```

### 7.2 Configure Caching
Already configured in `vercel.json`:
- Static assets cached
- API routes optimized
- Database queries cached

### 7.3 Monitor Performance
- Use Vercel Analytics
- Monitor Supabase dashboard
- Set up custom metrics

---

## 🔧 Maintenance

### Regular Tasks
- [ ] Monitor error logs
- [ ] Update dependencies monthly
- [ ] Backup database weekly
- [ ] Review security policies
- [ ] Update SSL certificates (automatic)

### Scaling Considerations
- Monitor database connections
- Consider read replicas for high traffic
- Implement CDN for static assets
- Set up load balancing if needed

---

## 📞 Support

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

### Commands Reference
```bash
# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Environment variables
vercel env ls
vercel env add VARIABLE_NAME
vercel env rm VARIABLE_NAME

# Domains
vercel domains ls
vercel domains add domain.com
```

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured locally
- [ ] Database schema deployed
- [ ] Application builds successfully
- [ ] Tests passing

### Deployment
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Production deployment successful
- [ ] Database policies applied

### Post-Deployment
- [ ] Production URL accessible
- [ ] Authentication working
- [ ] Database operations functional
- [ ] Email notifications working
- [ ] Performance acceptable
- [ ] Security headers active
- [ ] Domain configured (if applicable)

---

🎉 **Congratulations!** Your InkCircle application is now live in production! 