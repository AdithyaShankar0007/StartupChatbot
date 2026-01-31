# GitHub Setup Instructions

Your StartupChat project is ready to be pushed to GitHub! Follow these steps:

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `StartupChatbot`
3. Description: "AI Startup Advisor - Validate your ideas with DeepSeek AI"
4. Choose **Public** (for everyone to see) or **Private** (just you)
5. Do NOT check "Initialize this repository with:" options
6. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Run this in the StartupChatbot folder:

```bash
git push -u origin main
```

If asked for credentials:
- **Username**: `AdithyaShankar0007`
- **Password**: Use a Personal Access Token (see below)

## Step 3: Create GitHub Personal Access Token (for authentication)

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `StartupChatbot-Deploy`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)
7. When prompted for password during `git push`, paste this token

## Step 4: Verify on GitHub

Once pushed, visit:
```
https://github.com/AdithyaShankar0007/StartupChatbot
```

You should see your code!

## Next Steps After GitHub

### Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Click "Import Git Repository"
4. Select `StartupChatbot`
5. Add environment variables (see DEPLOYMENT.md)
6. Click "Deploy"

### Deploy to Netlify
1. Go to https://netlify.com
2. Click "New site from Git"
3. Choose GitHub
4. Select `StartupChatbot`
5. Add environment variables
6. Deploy!

## Troubleshooting

### "repository not found"
- Make sure you created the repository on GitHub first
- Use HTTPS URL: `https://github.com/AdithyaShankar0007/StartupChatbot.git`

### "Access denied" or "Bad credentials"
- Use Personal Access Token (not your password)
- Make sure token has `repo` scope
- Token should be fresh (not expired)

### Still stuck?
Run these commands to verify:
```bash
git remote -v  # Shows your remote URL
git branch -a  # Shows your branches
git status     # Shows current status
```

---

**Once your code is on GitHub, deployment is just a few clicks away!**
