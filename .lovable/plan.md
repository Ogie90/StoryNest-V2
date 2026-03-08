

# Post-Onboarding Funnel: Screens 11–16

## Overview
Six new pages forming the journey from onboarding completion to full story access. All mock/simulated — no real backend or payments. User refinements integrated throughout.

## localStorage Keys
- `storynest-child-profile` — existing profile data
- `storynest-story-edits` — edited title + page text
- `storynest-purchased` — `"true"` flag set on mock checkout completion

## Route Guards (helper)
Create `src/lib/guards.ts` with two helpers:
- `hasOnboardingData()` — checks if `storynest-child-profile` exists with a non-empty `name`
- `hasPurchased()` — checks if `storynest-purchased === "true"`

Each guarded page calls these in a `useEffect` and redirects via `navigate()` if the condition fails.

## New Routes

| Path | Guard | Purpose |
|------|-------|---------|
| `/generating` | needs onboarding data | Simulated loading |
| `/preview` | needs onboarding data | Pre-purchase preview (locked after page 3) |
| `/edit` | needs onboarding data | Lightweight text editing |
| `/upgrade` | needs onboarding data | Free vs Pro comparison |
| `/checkout` | needs onboarding data | Mock payment form |
| `/success` | needs onboarding data + purchased | Confirmation screen |
| `/book` | needs onboarding data + purchased | Full unlocked story reader |

## New Files

### `src/lib/guards.ts`
Two simple boolean functions reading localStorage.

### `src/pages/StoryGenerating.tsx`
- Reads child name from localStorage for "Creating [name]'s story..."
- Guard: redirect to `/onboarding` if no profile
- 4 phases via `useEffect` + `setTimeout` cycling every ~2s:
  1. "Creating your character..." (0–30%)
  2. "Writing the story..." (30–65%)
  3. "Illustrating the pages..." (65–95%)
  4. "Finishing touches..." (95–100%)
- Uses `Progress` bar + phase text
- Auto-navigates to `/preview` at 100%
- "Cancel" link back to `/onboarding`

### `src/pages/StoryPreview.tsx`
- Guard: redirect to `/onboarding` if no profile
- Personalized from localStorage: dynamic title using child name + first interest, profile card with interests
- 3 sample pages with lightly personalized text (insert child name, weave in interests)
- After page 3: blurred overlay section with lock icon + "Unlock the full story"
- CTAs: "Edit Story" → `/edit`, "Unlock Full Book" → `/upgrade`
- Back link to `/`

### `src/pages/StoryEdit.tsx`
- Guard: redirect to `/onboarding` if no profile
- Editable title via `Input` (pre-filled with personalized title)
- 3 page text `Textarea` fields (pre-filled with sample text)
- "Save Changes" → saves to `storynest-story-edits` in localStorage + toast
- "Back to Preview" → `/preview`

### `src/pages/Upgrade.tsx`
- Guard: redirect to `/onboarding` if no profile
- Two-column card comparison: Free (3-page preview, watermark, basic) vs Pro ($9.99 — full story, all illustrations, downloadable, no watermark)
- Primary CTA "Unlock Now" → `/checkout`
- Secondary "Back to Preview" link
- Reassurance copy: "Instant digital delivery. Preview first, unlock when ready."

### `src/pages/Checkout.tsx`
- Guard: redirect to `/onboarding` if no profile
- **Banner at top**: "This is a demo checkout — no real payment will be processed."
- Order summary card: "StoryNest Pro — $9.99"
- Mock form fields: Name on card, Card number, Expiry, CVC (all `Input`, basic required validation)
- "Complete Purchase" → sets `storynest-purchased = "true"` in localStorage, navigates to `/success`
- "Back" → `/upgrade`
- Lock icon + "Secure checkout" label

### `src/pages/PaymentSuccess.tsx`
- Guard: redirect to `/onboarding` if no profile; redirect to `/preview` if not purchased
- Checkmark icon + "Payment Successful!" heading
- Story title + child name from localStorage
- "Your full story is ready"
- Primary CTA "Open Your Book" → `/book`
- "A confirmation email would be sent in the live version."
- "Back to Home" link

### `src/pages/Book.tsx`
- Guard: redirect to `/preview` if not purchased; redirect to `/onboarding` if no profile
- Full story reader — shows all sample pages without blur/lock
- Reads any edits from `storynest-story-edits` localStorage
- Simple scrollable layout with personalized content
- Back link to `/`

## Modified Files

### `src/App.tsx`
- Import and add 7 new routes

### `src/pages/Onboarding.tsx`
- Change `handleFinish` to navigate to `/generating` instead of `/example`

