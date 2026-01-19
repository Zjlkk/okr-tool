# OKR Tool

AI-driven OKR setting tool to help team members create high-quality OKRs.

## Features

- **Google OAuth Login** - Secure authentication with company Google accounts
- **AI-Guided OKR Creation** - Interactive Q&A flow to generate well-structured OKRs
- **Manual Mode** - Option to write OKRs manually
- **Department Goals** - Leaders can set bi-monthly department goals
- **Team OKR View** - View all team members' OKRs by department
- **Auto-Save Drafts** - Never lose your progress

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma |
| Auth | NextAuth.js (Google OAuth) |
| AI | Anthropic Claude API |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials
- Anthropic API Key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/[username]/okr-tool.git
cd okr-tool

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# 4. Initialize database
npx prisma migrate dev

# 5. Start development server
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth pages (login, onboarding)
│   ├── (dashboard)/        # Dashboard pages (my-okr, team-okr, create)
│   └── api/                # API Routes
├── components/
│   ├── ui/                 # Base UI components
│   ├── features/           # Feature components
│   └── layout/             # Layout components
├── lib/                    # Utilities (db, auth, ai)
├── hooks/                  # Custom hooks
├── stores/                 # Zustand stores
└── types/                  # TypeScript types
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | NextAuth session secret |
| `NEXTAUTH_URL` | App URL |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `ANTHROPIC_API_KEY` | Anthropic API key for AI features |

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run database migrations
```

## Design System

The app uses a custom design system with:

- **Sonic Blue** gradient primary color
- **Retro-tech** feel with subtle noise texture
- **Inter** font family
- **8px** spacing system
- **Medium** border-radius (8px)
- Light/Dark mode support

See `src/app/globals.css` for full design tokens.

---

Built with Next.js and Anthropic Claude API
