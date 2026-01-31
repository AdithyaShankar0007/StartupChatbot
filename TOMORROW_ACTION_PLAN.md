# 📄 TOMORROW'S ACTION PLAN
**Print this or save as PDF for quick reference**

---

## 🎯 YOUR MISSION (1 hour total)

Get your AI chatbot from local computer to **LIVE ON INTERNET**

---

## 🗓️ WHEN YOU OPEN PC TOMORROW

### 1️⃣ OPEN THIS FILE FIRST
```
C:\Users\User\Downloads\Vent\StartupChatbot\SESSION_SAVE.md
```
*Read everything in that file*

---

### 2️⃣ OPEN POWERSHELL
- Windows Start Menu
- Type: PowerShell
- Click to open

---

### 3️⃣ NAVIGATE TO YOUR PROJECT
```powershell
cd "c:\Users\User\Downloads\Vent\StartupChatbot"
```

---

### 4️⃣ INSTALL DEPENDENCIES (First time only)
```powershell
npm install
```
⏱️ **Wait 2-5 minutes**

---

### 5️⃣ GET YOUR KEYS (Do this in browser while npm installs)

#### 🔑 DeepSeek API Key
- Go to: https://platform.deepseek.com
- Sign up
- Go to API Keys
- Create new key
- **Copy it** (starts with `sk-`)
- **Save it in Notepad**

#### 🔑 Supabase Credentials
- Go to: https://supabase.com
- Sign up
- Create new project
- ⏱️ Wait 2-3 minutes for setup
- Go to: Settings → API
- Copy:
  - **Project URL** (starts with `https://`)
  - **anon public key** (long string)
- **Save both in Notepad**

---

### 6️⃣ CREATE .env FILE

In File Explorer:
1. Navigate to: `c:\Users\User\Downloads\Vent\StartupChatbot`
2. Right-click → New → Text Document
3. Name it: `.env`
4. Open it with Notepad
5. Paste this:

```env
VITE_DEEPSEEK_API_KEY=your_key_here
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_key_here
```

6. **Replace `your_key_here` values** with your actual keys from Step 5
7. Save (Ctrl+S) and close

---

### 7️⃣ SETUP SUPABASE DATABASE

1. Go back to Supabase in browser
2. Click **SQL Editor**
3. Click **New Query**
4. Copy-paste all this code:

```sql
CREATE TABLE startup_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  analysis TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE startup_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ideas" ON startup_ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ideas" ON startup_ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" ON startup_ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" ON startup_ideas
  FOR DELETE USING (auth.uid() = user_id);
```

5. Click **Run**
6. Should say: **Success** ✓

---

### 8️⃣ TEST LOCALLY

Back in PowerShell:
```powershell
npm run dev
```

⏱️ Wait 10-15 seconds

You'll see:
```
Local:   http://localhost:5173/
```

Open browser: **http://localhost:5173**

**Try it out!**
- See the chat page? ✓
- Click a suggested prompt? ✓
- AI responds? ✓

If all ✓, stop the server:
- Press `Q` in PowerShell
- Press Enter

---

### 9️⃣ CREATE GITHUB REPOSITORY

1. Open browser: https://github.com/new
2. **Repository name**: `StartupChatbot`
3. **Description**: `AI Startup Advisor`
4. **Public** (recommended)
5. **Uncheck all checkboxes** at bottom
6. Click **Create repository**
7. **Leave this page open** (you'll need it)

---

### 🔟 GET PERSONAL ACCESS TOKEN

1. New browser tab: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. **Token name**: `StartupChatbot-Deploy`
4. **Expiration**: 90 days
5. **Check only**: `repo` checkbox
6. Scroll down
7. Click **Generate token**
8. **COPY IT IMMEDIATELY**
9. **Paste it in Notepad** (save it!)

---

### 1️⃣1️⃣ PUSH TO GITHUB

Back in PowerShell:
```powershell
git push -u origin main
```

When asked:
- **Username**: `AdithyaShankar0007`
- **Password**: Paste your token from Step 10

Press Enter

⏱️ Wait 30 seconds

Should see: `Branch 'main' set up to track remote branch 'main'`

**Check GitHub**: https://github.com/AdithyaShankar0007/StartupChatbot

You should see your code! ✓

---

### 1️⃣2️⃣ DEPLOY TO VERCEL

1. Open browser: https://vercel.com
2. Click **Sign Up**
3. **Continue with GitHub**
4. **Authorize Vercel**
5. Click **New Project**
6. Click **Import Git Repository**
7. Search: `StartupChatbot`
8. Click it
9. Click **Import**

---

### 1️⃣3️⃣ ADD ENVIRONMENT VARIABLES

You'll see a form. Add 3 variables:

**Variable 1:**
- **Name**: `VITE_DEEPSEEK_API_KEY`
- **Value**: Your DeepSeek key from Step 5
- Click **Add**

**Variable 2:**
- **Name**: `VITE_SUPABASE_URL`
- **Value**: Your Supabase URL from Step 5
- Click **Add**

**Variable 3:**
- **Name**: `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Value**: Your Supabase key from Step 5
- Click **Add**

---

### 1️⃣4️⃣ DEPLOY!

1. Click **Deploy** button
2. ⏱️ Wait 2-3 minutes
3. Should see ✓ checkmark
4. Click the URL at top (your live app!)

**Your chatbot is now LIVE! 🎉**

---

### 1️⃣5️⃣ SHARE YOUR URL

Your app is at something like:
```
https://startup-chatbot-xxxxx.vercel.app
```

**Share this URL with anyone!**
- Works on desktop
- Works on mobile
- Works everywhere

---

## ⏰ TIMELINE

| Step | What | Time |
|------|------|------|
| 1-4 | Setup | 10 min |
| 5 | Get keys | 5 min |
| 6-7 | Configure | 10 min |
| 8 | Test locally | 5 min |
| 9-11 | GitHub | 10 min |
| 12-15 | Deploy | 15 min |
| **TOTAL** | | **~1 hour** |

---

## ✅ SUCCESS MARKERS

- [ ] npm install completes
- [ ] .env file created with keys
- [ ] Local app works at http://localhost:5173
- [ ] Code pushed to GitHub
- [ ] App deployed to Vercel
- [ ] Live URL works in browser
- [ ] Can test AI chat on live app

---

## 🚨 IF SOMETHING FAILS

### "npm install" fails
```powershell
rm -r node_modules
npm install
```

### "npm run dev" shows errors
- Check .env file has correct values
- No extra spaces
- No quotes around values

### "git push" fails
- Repository on GitHub must exist first
- Personal Access Token must be correct
- No extra spaces in token

### Vercel deployment fails
- Check all 3 env variables added
- Values exactly match your keys
- Try "Redeploy" button

**Each guide file has troubleshooting section!**

---

## 📚 IF YOU GET STUCK

**Read these files in order:**
1. `QUICKSTART.md` - 5-min overview
2. `PUSH_TO_GITHUB.md` - GitHub details
3. `DEPLOYMENT.md` - Vercel details
4. `README.md` - Complete docs

All in: `C:\Users\User\Downloads\Vent\StartupChatbot\`

---

## 🔗 HANDY LINKS

```
DeepSeek:     https://platform.deepseek.com
Supabase:     https://supabase.com
GitHub New:   https://github.com/new
GitHub Tokens: https://github.com/settings/tokens
Vercel:       https://vercel.com
Your GitHub:  https://github.com/AdithyaShankar0007
Your Project: C:\Users\User\Downloads\Vent\StartupChatbot
```

---

## 💾 SAVE THIS FILE

**Print it or save as PDF**

Keep it handy tomorrow - it's your roadmap!

---

**YOU GOT THIS! 🚀**

**One hour of work = Live chatbot on internet**

Turn on PC tomorrow and follow these 15 steps.

You'll be celebrating in 1 hour! 🎉
