# Deployment Guide for StartupChat

## Quick Start Deployment Checklist

- [ ] Environment variables configured in `.env`
- [ ] Supabase project created and tables set up
- [ ] DeepSeek API key obtained
- [ ] Code pushed to GitHub
- [ ] Choose deployment platform
- [ ] Deploy and test

## Detailed Deployment Steps

### Step 1: Prepare Your Code

```bash
# Build the project locally to test
npm run build

# Test the build
npm run preview
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3: Choose Your Platform

#### **VERCEL (Easiest)**

1. Go to https://vercel.com
2. Click "New Project"
3. Click "Import Git Repository"
4. Search for "StartupChatbot"
5. Click "Import"
6. Add Environment Variables:
   - `VITE_DEEPSEEK_API_KEY` = your key
   - `VITE_SUPABASE_URL` = your URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your key
7. Click "Deploy"
8. Wait 2-3 minutes
9. Your app is live!

**Your URL will look like:** `startupChatbot.vercel.app`

#### **NETLIFY**

1. Go to https://netlify.com
2. Click "New site from Git"
3. Click "GitHub"
4. Search for and select "StartupChatbot"
5. Configure build:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"
7. Go to Site settings → Build & deploy → Environment
8. Add your environment variables
9. Trigger a rebuild

**Your URL will look like:** `random-name.netlify.app`

#### **RAILWAY**

1. Go to https://railway.app
2. Create new project
3. Choose "Deploy from GitHub"
4. Select your repository
5. Add environment variables in Railway dashboard
6. Deploy!

**Your URL will look like:** `projectname.railway.app`

### Step 4: Verify Deployment

1. Visit your deployed URL
2. Test the chatbot with a test prompt
3. Try signing in (optional)
4. Check console for any errors (F12 → Console)

## Environment Variables Reference

```env
# Required for AI functionality
VITE_DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx

# Required for authentication and data storage
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Custom Domain

### Add Custom Domain to Vercel
1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain
4. Follow the DNS setup instructions

### Add Custom Domain to Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow the DNS setup instructions

## SSL Certificate

Both Vercel and Netlify provide free SSL certificates automatically.

## Monitoring

### Vercel Analytics
- Project Settings → Analytics
- View usage and performance

### Netlify Analytics
- Go to Analytics tab
- View your usage

## Troubleshooting Deployments

### "Build failed" on Vercel
Check the build logs:
1. Go to Deployments tab
2. Click on the failed deployment
3. Check the "Build Logs"
4. Common issues:
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies

### "Cannot find module" errors
```bash
# Clean install dependencies
rm -rf node_modules
npm install
npm run build
```

### Blank page after deployment
1. Check browser console (F12)
2. Check Supabase keys in `.env`
3. Verify Supabase tables are created
4. Check browser's Application → Storage for errors

## Updating After Deployment

### Make changes and redeploy:
```bash
# Make your code changes
# Commit and push
git add .
git commit -m "Fix: description of change"
git push origin main

# Vercel and Netlify will automatically redeploy!
```

## Performance Tips

1. **Enable compression** in deployment platform
2. **Cache static assets** - Already done by default
3. **Monitor bundle size**: `npm run build` shows size
4. **Use CDN** - Vercel/Netlify do this automatically

## Scaling

The free tiers of Vercel, Netlify, and Railway should handle:
- 100+ concurrent users
- 1000+ requests per day

For more traffic, upgrade to paid plans.

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Railway Docs:** https://docs.railway.app
- **Vite Docs:** https://vitejs.dev/guide/
