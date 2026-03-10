# StoryNest

**Personalized children's storybooks — where your child is the hero.**

StoryNest generates fully personalized storybooks tailored to a child's name, age, interests, reading level, and personality. Every story is unique: the child is the protagonist, the world reflects what they love, and the narrative tone matches what parents want their kid to experience.

---

## What it does

1. **Onboarding** — Parents answer a short set of questions about their child: name, age, reading level, interests, things to avoid, and story tone (adventurous, funny, calming, etc.)
2. **Generation** — StoryNest builds a complete multi-page illustrated storybook using the child's profile
3. **Preview** — Parents see 3 pages of the story before unlocking the full book
4. **Unlock** — One-time payment to access the complete book
5. **Read** — Full interactive book reader with page-turn animations and print/export

The core idea: not a generic "insert name here" template, but a story that's actually *about* this specific child — their world, their things, their tone.

---

## User flow

```
/ (landing)
  └── /auth (sign up / sign in)
        └── /onboarding (7-step profile builder)
              └── /generating (story generation in progress)
                    └── /preview (3-page preview + unlock CTA)
                          ├── /upgrade (upsell page)
                          │     └── /checkout → /success
                          └── /book (full book reader — unlocked)

/library         — all created stories
/profiles        — manage child profiles
/new-story       — start a new story from an existing profile
/example         — public demo story (no auth required)
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Auth | Supabase Auth (email + Google OAuth) |
| Database | Supabase PostgreSQL |
| Session | Cookie-based via `@supabase/ssr` |
| State | React Context (auth) + TanStack Query |
| Forms | React Hook Form + Zod |
| Font | Plus Jakarta Sans (next/font) |

---

## Project structure

```
src/
├── app/                        # Next.js App Router
│   ├── (marketing)/            # Public pages: /, /example, /terms, /privacy
│   ├── (auth)/                 # Auth pages: /auth, /auth/callback
│   ├── (app)/                  # Protected pages: /library, /book, etc.
│   ├── layout.tsx              # Root layout — font, metadata, providers
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── robots.ts               # Robots rules
│
├── routes/                     # Route-level React components (all "use client")
├── components/
│   ├── landing/                # Landing page sections
│   ├── onboarding/             # 7-step onboarding form components
│   ├── story/                  # Story display components
│   ├── storynest/              # ProductShowcase mockup components
│   ├── providers/              # Client-side provider wrappers
│   └── ui/                     # shadcn/ui components
│
├── lib/
│   ├── supabase/               # SSR-aware Supabase clients
│   ├── storage.ts              # localStorage CRUD
│   ├── supabase-storage.ts     # Supabase CRUD with localStorage fallback
│   ├── storyPersonalization.ts # Story generation engine (~420 lines)
│   ├── storyVisualTheme.ts     # Visual theme system
│   └── utils.ts                # cn() utility
│
├── contexts/
│   └── AuthContext.tsx         # Auth state + signIn/signUp/signOut methods
│
├── middleware.ts               # Edge auth — redirects unauthenticated to /auth
└── types/index.ts              # ChildProfile, Story, StoredProfile
```

---

## Getting started

### Prerequisites
- Node.js 18+
- A Supabase project (for auth + database)

### Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://storynest.app   # optional, used for sitemap/OG
```

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm run test     # Run tests (vitest)
```

---

## Database schema

Two tables in Supabase:

**profiles** — Child profiles created by users
```
id, user_id, child_name, age, reading_level, interests[],
favorites, avoid_topics[], avoid_free_text, story_tone, photos[],
created_at, updated_at
```

**stories** — Generated storybooks
```
id, user_id, profile_id, title, subtitle, summary, dedication,
pages (JSON), tone, status (draft|preview|unlocked), edits (JSON),
created_at, updated_at
```

Row Level Security is enabled on both tables — users can only read/write their own data.

---

## Auth flow

- Email/password signup and login
- Google OAuth (PKCE flow)
- Sessions stored in cookies via `@supabase/ssr` — readable by edge middleware
- Protected routes enforced at the edge: unauthenticated requests are redirected to `/auth?returnTo=<original-path>`
- After login, users are returned to the page they originally tried to access

---

## Story generation

The core logic lives in `src/lib/storyPersonalization.ts`. It takes a `ChildProfile` and a tone, and produces a complete story structure: title, subtitle, dedication, and a full set of pages — each with text and an image prompt.

The story content is shaped entirely by the child's profile data: their name appears throughout the narrative, their interests drive the plot, things to avoid are excluded, and the reading level controls vocabulary and sentence complexity.
