# StartupChat - AI Startup Advisor

A modern web application for validating startup ideas using DeepSeek AI API. Built with React, TypeScript, Vite, and Supabase.

## Features

- 🤖 Real-time AI analysis of startup ideas using DeepSeek API
- 💾 Save and manage your startup ideas
- 🔐 User authentication with Supabase
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🌐 Deploy anywhere - Vercel, Netlify, or your own server

## Prerequisites

Before you get started, make sure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org)
2. **bun or npm** - Node package manager
3. **DeepSeek API Key** - [Get one here](https://platform.deepseek.com)
4. **Supabase Account** - [Sign up free](https://supabase.com)
5. **Git** - [Download](https://git-scm.com)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AdithyaShankar0007/StartupChatbot.git
cd StartupChatbot
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using bun:
```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key_here
```

#### Getting your DeepSeek API Key:
1. Go to [DeepSeek Platform](https://platform.deepseek.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy and paste it into `.env`

#### Getting your Supabase Credentials:
1. Go to [Supabase](https://supabase.com) and sign up
2. Create a new project
3. Go to Project Settings → API
4. Copy the URL and `anon` public key
5. Paste them into `.env`

#### Setting up Supabase Database:

Run these SQL commands in the Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create startup_ideas table
CREATE TABLE startup_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  analysis TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE startup_ideas ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only see their own ideas
CREATE POLICY "Users can view their own ideas" ON startup_ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ideas" ON startup_ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" ON startup_ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" ON startup_ideas
  FOR DELETE USING (auth.uid() = user_id);
```

### 4. Run Development Server

Using npm:
```bash
npm run dev
```

Using bun:
```bash
bun run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

### Build the project:

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

## Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub** (see next section)

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project

3. **Configure Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add these variables:
     - `VITE_DEEPSEEK_API_KEY`
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at a Vercel URL

### Option 2: Deploy to Netlify

1. **Build locally first**:
   ```bash
   npm run build
   ```

2. **Go to [Netlify](https://netlify.com)**:
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**:
   - Go to Site Settings → Build & Deploy → Environment
   - Add your three environment variables

4. **Deploy**:
   - Netlify will automatically deploy on each push to main

### Option 3: Deploy to Your Own Server

**Using Node.js:**
```bash
npm run build
npm install -g serve
serve -s dist -l 3000
```

**Using Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## GitHub Setup

### Push to GitHub:

1. **Initialize Git repository** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: StartupChat application"
   ```

2. **Create repository on GitHub**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `StartupChatbot`
   - Don't initialize with any files

3. **Add remote and push**:
   ```bash
   git remote add origin https://github.com/AdithyaShankar0007/StartupChatbot.git
   git branch -M main
   git push -u origin main
   ```

4. **Push your code**:
   ```bash
   git add .
   git commit -m "Add StartupChat application"
   git push
   ```

## Project Structure

```
StartupChatbot/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── SavedIdeas.tsx
│   │   └── SuggestedPrompts.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.tsx
│   │   ├── useStartupIdeas.tsx
│   │   └── use-toast.ts
│   ├── lib/                # Utility functions
│   │   ├── chat.ts        # DeepSeek API integration
│   │   └── utils.ts
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Main chat page
│   │   ├── Auth.tsx       # Authentication page
│   │   └── NotFound.tsx
│   ├── integrations/      # API clients
│   │   └── supabase/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                # Static files
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## API Integration

### DeepSeek AI

The app uses the DeepSeek API for AI analysis. The `streamChat` function in `src/lib/chat.ts` handles:
- Real-time streaming responses
- Error handling
- Rate limiting
- Message formatting

### Supabase

Used for:
- User authentication (signup/signin)
- Data persistence (saving startup ideas)
- Row-level security for user data

## Troubleshooting

### "API key not configured"
- Make sure `.env` file exists
- Check that `VITE_DEEPSEEK_API_KEY` is set correctly
- Restart the dev server after updating `.env`

### "Failed to connect to AI service"
- Verify your DeepSeek API key is valid
- Check your internet connection
- Ensure the API key has available credits

### Supabase connection issues
- Verify URL and key are correct
- Check that the tables were created properly
- Ensure RLS policies are set up

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/AdithyaShankar0007/StartupChatbot/issues)
- Reach out on [Twitter/X](https://twitter.com/AdithyaShankar0007)

## Acknowledgments

- [Vite](https://vitejs.dev) for blazing fast builds
- [React Router](https://reactrouter.com) for routing
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Supabase](https://supabase.com) for backend
- [DeepSeek](https://deepseek.com) for AI capabilities
