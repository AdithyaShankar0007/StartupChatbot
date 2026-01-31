# 🚀 StartupChat - Quick Reference Card

**Your independent AI chatbot is READY!** Print this or bookmark it.

---

## 📍 Project Location
```
C:\Users\User\Downloads\Vent\StartupChatbot
```

## 👤 Your Info
- **GitHub**: AdithyaShankar0007
- **Email**: shankaradithya43@gmail.com
- **Repository**: StartupChatbot

---

## ✅ SETUP (30 mins)

```bash
# 1. Navigate to project
cd c:\Users\User\Downloads\Vent\StartupChatbot

# 2. Install
npm install

# 3. Create .env file (copy .env.example)
# Add your API keys

# 4. Run locally
npm run dev

# Visit: http://localhost:5173
```

### Get Your API Keys
- **DeepSeek**: https://platform.deepseek.com (free tier)
- **Supabase**: https://supabase.com (free tier)

---

## 📤 GITHUB PUSH (15 mins)

```bash
# 1. Create repo at: https://github.com/new
# - Name: StartupChatbot
# - Leave checkboxes unchecked
# - Click "Create repository"

# 2. Get Personal Access Token
# - https://github.com/settings/tokens
# - "Generate new token (classic)"
# - Name: StartupChatbot-Deploy
# - Scope: repo (only)
# - Copy token

# 3. Push code
git push -u origin main

# When asked:
# Username: AdithyaShankar0007
# Password: [paste your token here]

# Verify at:
# https://github.com/AdithyaShankar0007/StartupChatbot
```

---

## 🌐 DEPLOY (15 mins)

### Option A: Vercel (Easiest)
```
1. Go to vercel.com
2. Click "New Project"
3. Import GitHub repo "StartupChatbot"
4. Add 3 env variables:
   - VITE_DEEPSEEK_API_KEY
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_PUBLISHABLE_KEY
5. Click "Deploy"
6. Share your URL!
```

### Option B: Netlify
```
1. Go to netlify.com
2. "New site from Git"
3. Choose GitHub
4. Select "StartupChatbot"
5. Build: npm run build
6. Publish: dist
7. Add environment variables
8. Deploy!
```

---

## 📚 Documentation Files

| File | What For |
|------|----------|
| INDEX.md | Overview & checklist |
| SETUP_COMPLETE.md | Full summary |
| QUICKSTART.md | 5-min setup |
| PUSH_TO_GITHUB.md | GitHub instructions |
| DEPLOYMENT.md | Deploy guides |
| README.md | Full documentation |

---

## 🔧 Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview build
npm run lint      # Check code quality
```

---

## 🎨 Key File Locations

| What | File |
|------|------|
| Chat AI | src/lib/chat.ts |
| Main Page | src/pages/Index.tsx |
| Login Page | src/pages/Auth.tsx |
| UI Components | src/components/ui/ |
| Styles | src/index.css |

---

## 🔑 Environment Variables

Create `.env` file with:
```env
VITE_DEEPSEEK_API_KEY=your_key
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_key
```

Never commit `.env` file!

---

## 📋 Complete Timeline

**Today - Setup** (30 mins)
- npm install
- Create .env
- npm run dev
- Test locally

**Today/Tomorrow - Push** (15 mins)
- Create GitHub repo
- Get access token
- git push
- Verify on GitHub

**Tomorrow - Deploy** (15 mins)
- Connect Vercel/Netlify
- Add env variables
- Deploy
- Share URL

---

## 🐛 Troubleshooting

**Can't install?**
```bash
rm -r node_modules package-lock.json
npm install
```

**Won't start?**
```bash
# Check .env file exists
# Check API keys are valid
npm run dev
```

**Push fails?**
- Create GitHub repo first
- Use Personal Access Token (not password)
- Token must have "repo" scope

**Deployment blank?**
- Check browser console (F12)
- Verify environment variables
- Check Supabase project

---

## 🎯 Success Checklist

- [ ] npm install (works)
- [ ] .env file created
- [ ] npm run dev (works locally)
- [ ] GitHub repo created
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Netlify
- [ ] Live on internet
- [ ] Shared with others

---

## 💡 Pro Tips

1. **Save your token** - Generate once, use many times
2. **Use Vercel** - Easiest deployment option
3. **Enable auto-deploy** - Redeploy on each git push
4. **Add custom domain** - Make it professional
5. **Monitor usage** - Check API limits

---

## 📞 Links You'll Need

- GitHub: https://github.com
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- DeepSeek: https://platform.deepseek.com
- Supabase: https://supabase.com
- Vite Docs: https://vitejs.dev

---

## 🎉 Ready to Launch!

You have everything needed. Just follow the 3 phases:
1. **Setup** ← Start here
2. **Push**
3. **Deploy**

**Your chatbot will be live within 1 hour!**

---

*Printed: January 31, 2026*  
*Project: StartupChat*  
*Status: Ready for production*
