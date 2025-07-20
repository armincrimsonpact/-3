# Deployment Guide - Agentic Workflows Product Company

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub

1. **Create a new GitHub repository**:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it: `agentic-workflows-product-company`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have one)

2. **Add the remote and push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/agentic-workflows-product-company.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import your project**:
   - Click "New Project"
   - Import your GitHub repository: `agentic-workflows-product-company`
   - Vercel will automatically detect it's a Next.js project

3. **Configure environment variables**:
   - In the Vercel dashboard, go to your project settings
   - Add the following environment variables from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `EMAIL_SERVER_HOST`
     - `EMAIL_SERVER_PORT`
     - `EMAIL_SERVER_USER`
     - `EMAIL_SERVER_PASS`
     - `EMAIL_FROM`

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your project automatically

### Step 3: Database Setup

1. **Set up your database**:
   - If using Supabase, your database should already be configured
   - If using a different database, update the `DATABASE_URL` in Vercel

2. **Run database migrations**:
   - In Vercel, go to your project settings
   - Add a build command that includes Prisma generation:
   ```bash
   npx prisma generate && npm run build
   ```

### Step 4: Domain Configuration

1. **Custom domain** (optional):
   - In Vercel dashboard, go to "Domains"
   - Add your custom domain
   - Configure DNS settings as instructed

2. **Environment-specific URLs**:
   - Production: `https://your-project.vercel.app`
   - Preview: `https://your-project-git-branch.vercel.app`

## 🔧 Troubleshooting

### Build Issues
- Make sure all dependencies are in `package.json`
- Check that environment variables are set correctly
- Verify Prisma schema is valid

### Database Connection
- Ensure `DATABASE_URL` is correct
- Check that your database is accessible from Vercel
- Verify Prisma client is generated

### Authentication Issues
- Confirm Supabase credentials are correct
- Check that JWT secret is set
- Verify email configuration

## 📊 Monitoring

Once deployed, you can:
- Monitor performance in Vercel Analytics
- Check logs in Vercel dashboard
- Set up alerts for errors
- Monitor database performance

## 🔄 Continuous Deployment

- Every push to `main` branch will trigger a new deployment
- Preview deployments are created for pull requests
- You can rollback to previous deployments if needed

## 🎯 Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] Database connected and migrated
- [ ] Build successful
- [ ] Website accessible at Vercel URL
- [ ] Authentication working
- [ ] All features functional

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run dev`
4. Check database connectivity
5. Review browser console for errors

---

**Your website will be live at**: `https://your-project-name.vercel.app` 