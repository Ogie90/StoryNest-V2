

# Phase A: Storage Layer, Enhanced Reader, Library, Profiles & New Story

## New Files

### `src/lib/storage.ts`
Multi-profile and multi-story CRUD over localStorage.

**Types:**
- `StoredProfile` extends `ChildProfile` with `id`, `createdAt`, `updatedAt`
- `Story` has `id`, `profileId`, `title`, `pages: string[]`, `status: "draft" | "preview" | "purchased"`, `tone`, `createdAt`, `updatedAt`, `edits?: { title: string; pages: string[] }`

**Keys:** `storynest-profiles`, `storynest-stories`, `storynest-migrated` (flag)

**Functions:**
- `migrateFromLegacy()` — checks `storynest-migrated` flag first; if already migrated, returns immediately (idempotent). Otherwise copies `storynest-child-profile` into profiles array and creates a matching story, then sets the flag.
- `getProfiles`, `getProfileById`, `saveProfile(profile)` — upsert by `id`; sets `updatedAt` on every save
- `deleteProfile(id)`
- `getStories`, `getStoryById`, `saveStory(story)` — upsert by `id`; sets `updatedAt`
- `deleteStory(id)`
- `resetDemoData()` — iterates `localStorage` keys, removes only those starting with `storynest-`

### `src/components/ExportDialog.tsx`
Radix Dialog with "Download as PDF" button that shows a toast ("PDF export coming soon"). Note: "Your book is saved in your library." Link to `/library`.

### `src/pages/Library.tsx`
- Calls `migrateFromLegacy()` on mount
- Lists all stories with: title, child name (from linked profile), status badge (`Draft` / `Preview` / `Purchased`), date
- Click routes based on status: draft → `/onboarding?story=<storyId>`, preview → `/preview?story=<id>`, purchased → `/book?story=<id>`
- Empty state: friendly message + "Create Your First Story" CTA → `/new-story`
- "Create New Story" button at top
- "Reset demo data" small text button in footer

### `src/pages/Profiles.tsx`
- Lists all profiles: name, age, interests summary, photo indicator
- **Edit**: navigates to `/onboarding?edit=<profileId>` — Onboarding detects this, loads that profile, and on finish calls `saveProfile` with same `id` (update, not duplicate)
- **Delete**: AlertDialog confirmation, then `deleteProfile(id)` + delete associated stories
- "Add New Profile" → `/onboarding?new=true`

### `src/pages/NewStory.tsx`
- Lists existing profiles as selectable cards
- On select: inline tone picker (reuses the 6 tone options from StoryDirectionStep)
- "Create Story" → creates a new `Story` object linked to the selected profile's `id` (does NOT modify the profile), sets profile as active in `storynest-child-profile`, navigates to `/generating`
- "Create New Profile First" link → `/onboarding?new=true`

## Modified Files

### `src/pages/Book.tsx`
- Read `?story=<id>` from URL; if present, load that story from storage; otherwise fall back to legacy localStorage behavior
- Page-by-page reader: `currentPage` state, Previous/Next buttons, "Page X of Y"
- "Export" button opens `ExportDialog`
- "My Library" link → `/library`
- Keep existing guards

### `src/pages/StoryPreview.tsx`
- Read `?story=<id>` from URL; load story-specific data when available
- Fall back to legacy behavior if no query param

### `src/pages/StoryEdit.tsx`
- Read `?story=<id>` from URL; save edits to the specific story's `edits` field via `saveStory` when available
- Fall back to legacy `storynest-story-edits` if no query param

### `src/pages/StoryGenerating.tsx`
- Read `?story=<id>` from URL; on completion navigate to `/preview?story=<id>`

### `src/pages/PaymentSuccess.tsx`
- Add secondary "Go to My Library" link → `/library`
- Pass `?story=<id>` through to `/book?story=<id>` in the "Open Your Book" CTA

### `src/pages/Onboarding.tsx`
- Read query params: `?edit=<profileId>`, `?new=true`, `?story=<storyId>`
- `?edit=<id>`: load profile from storage into state; on finish, `saveProfile` with same `id`
- `?new=true`: start fresh with `defaultProfile`
- `?story=<id>`: resume a draft story — load linked profile, on finish update the story status
- No query params: existing behavior (uses `storynest-child-profile`)
- On finish: also save/update the profile and story in the new storage layer

### `src/pages/Checkout.tsx`
- Pass `?story=<id>` through the flow; on purchase, update story status to `"purchased"` via `saveStory`

### `src/pages/Upgrade.tsx`
- Pass `?story=<id>` through to `/checkout?story=<id>`

### `src/App.tsx`
- Add routes: `/library`, `/profiles`, `/new-story`

### `src/components/landing/Navbar.tsx`
- Add "My Library" link (both desktop and mobile menu) that navigates to `/library`

