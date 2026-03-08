

## Implementation: User-scoped data layer

### 1. Code change: `src/lib/supabase-storage.ts`

**Add auth helper** (uses `getUser()` for server-verified identity):

```ts
async function getAuthUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Not authenticated");
  return user.id;
}
```

**Update mappers** to accept and include `userId`:

- `profileToDb(p, userId)` → adds `user_id: userId`
- `storyToDb(s, userId)` → adds `user_id: userId`

**Update write functions** — each calls `getAuthUserId()` once:

- `upsertProfile` → gets userId, passes to `profileToDb`
- `upsertStory` → gets userId, passes to `storyToDb`
- `createStoryFromProfileAsync` → userId flows through `upsertStory`

**Update `migrateLocalToSupabase`** — wraps `getAuthUserId()` in try/catch; skips migration if not authenticated.

**Read functions unchanged** — RLS filters automatically.

### 2. SQL migration (you run in Supabase SQL Editor)

```sql
-- ── Clean orphan rows ──────────────────────────────────
DELETE FROM public.stories WHERE user_id IS NULL;
DELETE FROM public.profiles WHERE user_id IS NULL;

-- ── Ensure RLS is enabled ──────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- ── Drop ALL old policies ──────────────────────────────
DROP POLICY IF EXISTS "Allow all for now" ON public.profiles;
DROP POLICY IF EXISTS "Temporary open access" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profiles" ON public.profiles;

DROP POLICY IF EXISTS "Allow all for now" ON public.stories;
DROP POLICY IF EXISTS "Temporary open access" ON public.stories;
DROP POLICY IF EXISTS "Users can read own stories" ON public.stories;
DROP POLICY IF EXISTS "Users can insert own stories" ON public.stories;
DROP POLICY IF EXISTS "Users can update own stories" ON public.stories;
DROP POLICY IF EXISTS "Users can delete own stories" ON public.stories;

-- ── FK to auth.users ──────────────────────────────────
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.stories
  DROP CONSTRAINT IF EXISTS stories_user_id_fkey;
ALTER TABLE public.stories
  ADD CONSTRAINT stories_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ── Profiles: user-scoped RLS ──────────────────────────
CREATE POLICY "Users can read own profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can insert own profiles" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can update own profiles" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND user_id = auth.uid())
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can delete own profiles" ON public.profiles
  FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- ── Stories: user-scoped RLS ───────────────────────────
CREATE POLICY "Users can read own stories" ON public.stories
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can insert own stories" ON public.stories
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can update own stories" ON public.stories
  FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND user_id = auth.uid())
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Users can delete own stories" ON public.stories
  FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- ── Indexes ────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON public.stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_profile_id ON public.stories(profile_id);
```

### 3. No other files change

`AuthContext`, `ProtectedRoute`, pages, and routing remain as-is. The Supabase client sends the auth token automatically, so RLS applies transparently to all queries.

**After I implement the TypeScript changes, run the SQL above in your Supabase SQL Editor.**

