# Quick Start Guide

Get StartupChat running in 5 minutes!

## 1. Get Your API Keys

### DeepSeek API Key
- Visit https://platform.deepseek.com
- Sign up for a free account
- Go to API Keys section
- Create a new key
- Copy it

### Supabase Credentials  
- Visit https://supabase.com
- Create a free project
- Go to Settings → API
- Copy the URL and `anon` public key

## 2. Create .env File

In the project root, create a file named `.env`:

```env
VITE_DEEPSEEK_API_KEY=paste_your_key_here
VITE_SUPABASE_URL=paste_your_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=paste_your_key_here
```

## 3. Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 4. Set Up Supabase Database

In Supabase dashboard, go to SQL Editor and run:

```sql
CREATE TABLE startup_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  analysis TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE startup_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ideas" ON startup_ideas
  FOR SELECT USING (auth.uid() = user_id);
```

## 5. Start Chatting!

That's it! You now have a fully functional AI startup advisor running locally.

## Next Steps

- **Deploy:** Follow [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel/Netlify
- **Customize:** Modify the system prompt in `src/lib/chat.ts`
- **Extend:** Add new features like export, sharing, etc.

## Need Help?

- Check [README.md](./README.md) for detailed documentation
- Review error messages in browser console (F12)
- Check Supabase project health
- Verify API keys are correct
