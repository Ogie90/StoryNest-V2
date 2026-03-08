

# Phase C: Visual Personalization Layer — Implementation Plan

## Overview
Add world-based visual theming across story pages so two different stories look visually distinct. Restrained, premium approach — a few strong cues per surface.

## New Files

### `src/lib/storyVisualTheme.ts`
- `StoryVisualTheme` interface with `gradient`, `accentHsl`, `surfaceClass`, `borderClass`, `iconKey`, `coverEmoji`, `sceneLabels: string[]`
- Controlled `ICON_MAP` record mapping string keys to Lucide components (Trees, Rocket, Fish, etc.)
- `getThemeIcon(theme)` returns the LucideIcon component
- 15 world themes (dinosaurs → emerald/amber, space → indigo/violet, ocean → cyan/blue, etc.) + default fallback
- Each world has flexible `sceneLabels` array (currently 8, but never assumed to be exactly 8)
- `applyToneModifier()` adjusts gradient opacity — calm = softer, magical/brave = slightly bolder
- Exports: `getVisualTheme(interests, tone)`, `getThemeIcon(theme)`, `getSceneLabel(theme, pageIndex)`, `pickWorldKey(interests)`

### `src/components/story/StoryCoverCard.tsx`
Two variants via `variant` prop: `full` | `compact`

**Full variant** (Preview header, Book title page):
- `bg-gradient-to-br` with theme gradient
- Child initials medallion: 48px circle, white bg, accent-colored border, first letter of name
- Title (text-2xl bold), subtitle (italic muted), "Created for [Name]" line
- Dedication text
- World icon rendered small beside title (16px, muted) — subtle, not dominating
- Interest + tone badges (Badge secondary, small)

**Compact variant** (Library cards, PaymentSuccess):
- 4px left gradient bar via `border-l-4` with inline accent color
- Title + child name + small world icon inline
- Minimal height

Props: `title`, `subtitle?`, `dedication?`, `childName`, `interests`, `tone`, `variant`

### `src/components/story/StoryPageCard.tsx`
Props: `pageNumber`, `text`, `theme`, `sceneLabel?` (optional — gracefully skipped if missing)

- Thin 3px top accent bar using theme gradient
- Page number in muted text; scene label in italic muted text only if provided
- Story text with `leading-relaxed text-[15px]`
- Card with `surfaceClass` background and `borderClass` border
- No decoration if sceneLabel is undefined — clean fallback

### `src/components/story/StoryLockCard.tsx`
Props: `remainingPages`, `theme`, `nextPageText?`, `onUnlock`

- Two stacked blurred text snippets with gradient fade overlay
- Lock icon with themed accent ring (inline border-color from accentHsl)
- "The adventure continues..." emotional copy
- "[N] more pages await" count
- Themed "Unlock Full Book" CTA button

## Modified Files

### `src/pages/StoryPreview.tsx`
- Import `getVisualTheme`, `StoryCoverCard`, `StoryPageCard`, `StoryLockCard`
- Replace `bg-primary/5` header → `StoryCoverCard` full variant with themed gradient
- Replace plain Card page loops → `StoryPageCard` with `getSceneLabel(theme, idx)`
- Replace blur lock section → `StoryLockCard`
- All routing/CTA logic stays unchanged

### `src/pages/Book.tsx`
- `currentPage === 0` → render `StoryCoverCard` full variant as title page
- Other pages → `StoryPageCard` with scene labels from theme
- Nav bar border-top uses inline `borderColor` from theme `accentHsl`
- Page dots use inline `backgroundColor` from theme accent when active

### `src/pages/Library.tsx`
- Each story card gets left accent bar (4px, theme gradient via inline style)
- World icon rendered inline with title (small, muted)
- Purchased stories get slightly elevated shadow (`shadow-md` vs `shadow-sm`)
- Keep layout lightweight and scannable — no full cover rendering

### `src/pages/StoryEdit.tsx`
- Add thin gradient accent bar at top of page (theme-derived)
- Show compact info header: world icon + title + child name
- Each page textarea card gets subtle `surfaceClass` background
- Everything stays utilitarian and readable

### `src/pages/PaymentSuccess.tsx`
- Add `StoryCoverCard` compact variant below success message
- Theme checkmark circle border with story accent color

## Design Constraints
- All theming via Tailwind classes + minimal inline `style` for HSL accent colors
- Emoji appears once per cover, never repeated across the UI
- Scene labels are optional at every usage point
- Mobile-first, pastel-friendly, Plus Jakarta Sans typography preserved

## Implementation Order
1. `storyVisualTheme.ts`
2. `StoryCoverCard`
3. `StoryPageCard`
4. `StoryLockCard`
5. `StoryPreview` integration
6. `Book` integration
7. `Library` integration
8. `StoryEdit` visual consistency
9. `PaymentSuccess` polish

