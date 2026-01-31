# Manual GitHub Push - Step by Step

Your project is committed locally and ready to push. Follow these exact steps:

## Step 1: Create GitHub Repository

### Online (at github.com)
1. Open https://github.com/new in your browser
2. Fill in details:
   - **Repository name**: `StartupChatbot`
   - **Description**: "AI Startup Advisor - Validate startup ideas with DeepSeek"
   - **Public or Private**: Your choice
   - **Skip all checkboxes at bottom**
3. Click **"Create repository"** button
4. GitHub will show you a page with setup instructions - **copy the commands shown there**

## Step 2: Create Personal Access Token

This is needed for authentication instead of password.

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Token name**: `StartupChatbot-Deploy`
   - **Expiration**: 90 days (or your preference)
4. **Scopes**: Check only `repo` checkbox
5. Click **"Generate token"** button
6. **Copy the token immediately** (save it somewhere safe - you won't see it again!)

## Step 3: Push from PowerShell

Open PowerShell and run:

```powershell
cd "c:\Users\User\Downloads\Vent\StartupChatbot"
git push -u origin main
```

### When Asked for Credentials:

**Username**: `AdithyaShankar0007`

**Password**: Paste your Personal Access Token (from Step 2)

## Expected Output

After running `git push`, you should see:
```
Enumerating objects: 39, done.
Counting objects: 100% (39/39), done.
Compressing objects: 100% (30/30), done.
Writing objects: 100% (39/39), X.XX MiB | 5.00 MiB/s, done.
Total 39 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/AdithyaShankar0007/StartupChatbot.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## Step 4: Verify on GitHub

1. Go to https://github.com/AdithyaShankar0007/StartupChatbot
2. You should see all your files there!
3. Check the folder structure matches your local project

## Troubleshooting

### "repository not found"
- Make sure you created the repo on GitHub first
- Verify the URL is correct: `https://github.com/AdithyaShankar0007/StartupChatbot.git`

### "Access denied" or "Bad credentials"  
- Make sure you're using the Personal Access Token (not your password)
- Token must have `repo` scope
- If old token was used, generate a new one

### "fatal: branch master does not have all commits"
Already fixed! You're on `main` branch which is correct.

### Nothing happens after git push
- Check your internet connection
- Try again: `git push -u origin main`
- Check status: `git status`

## After Push - What's Next?

Once your code is on GitHub:

1. **Deploy to Vercel** (Easiest)
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Add 3 environment variables
   - Deploy!

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - "New site from Git"
   - Select GitHub repo
   - Add environment variables
   - Deploy!

3. **Share Your Work**
   - GitHub URL: `https://github.com/AdithyaShankar0007/StartupChatbot`
   - Production URL: (from Vercel/Netlify after deploying)

## Quick Reference

```bash
# Check current status
git status

# See all commits
git log --oneline

# See remote URL
git remote -v

# List all branches
git branch -a
```

---

**That's it! Your code will be on GitHub and ready for deployment.**
