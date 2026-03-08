

# Phase E: Implementation Plan

All files explored and ready. Here is the exact implementation.

---

## New Files (4)

### `src/types/index.ts`
Central shared types: `ChildProfile`, `StoredProfile`, `Story`. Eliminates the circular import from `@/pages/Onboarding`. No re-export from Onboarding — all 9 files that import `ChildProfile` will import from `@/types` directly.

### `src/lib/auth-config.ts`
Single owner of auth redirect logic:
- `AUTH_ROUTES` constant: `login`, `callback`, `defaultPostLogin`
- `saveReturnTo(path)` → writes to `sessionStorage`
- `consumeReturnTo()` → reads, clears, validates path starts with `/` and not `//`, falls back to `/library`

### `src/lib/upload.ts`
Future-facing stubs with explicit comments: child profile photos, story illustration assets, Supabase Storage integration points. `uploadProfilePhoto()` returns `URL.createObjectURL()` with a clear note it's a temporary local preview only, not persisted.

### `src/pages/AuthCallback.tsx`
OAuth redirect handler. 5-second timeout. Listens for `onAuthStateChange` + immediate `getSession()` check. On session: `navigate(consumeReturnTo())`. On timeout: `navigate("/auth")`.

---

## Edited Files (12)

### `src/contexts/AuthContext.tsx`
- Add `signInWithGoogle()` method: calls `saveReturnTo()` then `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: origin + '/auth/callback' } })`
- Add `migrationRanRef` (useRef). On `onAuthStateChange` with session, run `migrateFromLegacy()` + `migrateLocalToSupabase()` once only
- Export `signInWithGoogle` in context type
- Import from `@/lib/auth-config`

### `src/components/ProtectedRoute.tsx`
- Import `saveReturnTo` from `@/lib/auth-config`
- Import `useLocation` from react-router-dom
- Before `Navigate to="/auth"`, call `saveReturnTo(location.pathname + location.search)`

### `src/pages/Auth.tsx`
- Import `useAuth` now includes `signInWithGoogle`
- Import `consumeReturnTo` from `@/lib/auth-config`
- Add "Continue with Google" button with Google SVG icon above the email form, with an "or" divider
- On email sign-in success: `navigate(consumeReturnTo())` instead of hardcoded `/library`
- Add loading state for Google button

### `src/App.tsx`
- Import `AuthCallback` from `@/pages/AuthCallback`
- Add route: `<Route path="/auth/callback" element={<AuthCallback />} />`

### `src/lib/storage.ts`
- Replace `import type { ChildProfile } from "@/pages/Onboarding"` with `import type { ChildProfile, StoredProfile, Story } from "@/types"`
- Remove the `StoredProfile` and `Story` interface definitions (now in types/)
- Re-export types for backward compat: `export type { ChildProfile, StoredProfile, Story } from "@/types"`

### `src/lib/supabase-storage.ts`
- Replace `import type { ChildProfile } from "@/pages/Onboarding"` with `import type { ChildProfile } from "@/types"`
- Replace `import type { Story, StoredProfile } from "@/lib/storage"` with `import type { Story, StoredProfile } from "@/types"`
- Keep local storage fallback imports from `@/lib/storage`

### `src/lib/storyPersonalization.ts`
- Change import to `import type { ChildProfile } from "@/types"`

### `src/pages/Onboarding.tsx`
- Remove `ChildProfile` interface definition
- Add `import type { ChildProfile } from "@/types"`
- Keep all other logic as-is

### `src/pages/Library.tsx`
- Remove `import { migrateFromLegacy, ... } from "@/lib/storage"` migration imports
- Remove `import { resetDemoData } from "@/lib/storage"`
- Import `Story` from `@/types` and `StoredProfile` from `@/types`
- Remove `migrateFromLegacy()` and `migrateLocalToSupabase()` calls from useEffect
- Remove `handleReset` function and the "Reset demo data" button from footer

### `src/pages/Profiles.tsx`
- Remove `migrateFromLegacy` import and call
- Import `StoredProfile` from `@/types`

### `src/pages/NewStory.tsx`
- Remove `migrateFromLegacy` and `setActiveProfile` imports/calls
- Import `StoredProfile` from `@/types`

### `src/pages/StoryGenerating.tsx`
- Remove `import { hasOnboardingData, getProfile } from "@/lib/guards"`
- Remove the legacy `getProfile()` fallback for `childName`
- If no `storyId` param, redirect to `/new-story` instead of `/onboarding`
- Keep the story-based flow (fetchStoryById + fetchProfileById) as-is

### Onboarding component files (6 files)
All `src/components/onboarding/*.tsx` files: change `import type { ChildProfile } from "@/pages/Onboarding"` to `import type { ChildProfile } from "@/types"`.

---

## Summary

- **4 new files** created
- **~18 files** edited (mostly import changes)
- Google OAuth ready (requires Supabase dashboard toggle)
- Migrations centralized in AuthContext with ref guard
- Route intent preserved via sessionStorage
- All existing flows preserved
- `guards.ts` no longer imported by any page (can be removed later)

