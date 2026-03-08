

# Onboarding Flow Implementation

## Data Shape
```typescript
interface ChildProfile {
  name: string;
  age: number;
  readingLevel: string;
  interests: string[];      // selected chips
  favoriteThings: string;   // free-text
}
```
Stored in `localStorage` under key `"storynest-child-profile"`. Current step stored as `"storynest-onboarding-step"`. Both restored on mount so users can leave and resume.

## New Files

### `src/pages/Onboarding.tsx`
- Container managing `step` (0–2) and `ChildProfile` state
- On mount: restore from localStorage (step + profile data)
- On step change or data update: persist to localStorage
- Step indicator: "Step 1 of 3" / "Step 2 of 3" / "Step 3 of 3" text label (step 0 = welcome has no indicator)
- Renders the active step component

### `src/components/onboarding/WelcomeStep.tsx`
- Headline, 3 bullet points (what you'll need, ~2-3 min, what happens next)
- "Let's Begin" CTA, "Maybe Later" link back to `/`

### `src/components/onboarding/BasicDetailsStep.tsx`
- Child's name (text input, required), Age (select 1–12), Reading level (select: Early Reader / Beginner / Intermediate / Advanced)
- react-hook-form + zod validation
- Back / Next buttons

### `src/components/onboarding/InterestsStep.tsx`
- Toggleable interest chips (Dinosaurs, Space, Animals, Trucks, Princesses, Ocean, Robots, Superheroes, Fairies, Music, Sports, Cooking) — reuse `CategoryChip` with `onClick` + `active` prop
- "Favorite Things" textarea with placeholder examples
- Validation: at least 1 interest
- Back + "Create My Story" → saves to localStorage, navigates to `/example`

## Modified Files

### `src/App.tsx`
- Add `/onboarding` route

### `src/components/landing/HeroSection.tsx`
- "Start Creating" navigates to `/onboarding` via `useNavigate`

### `src/pages/Index.tsx`
- Final CTA links to `/onboarding`

### `src/pages/ExampleStory.tsx`
- On mount, read `ChildProfile` from localStorage
- If found, replace hardcoded `sampleProfile` with the user's data (name, age, interests) and weave it into the story text and headings
- Falls back to the existing hardcoded sample if no localStorage data

### `src/components/storynest/CategoryChip.tsx`
- Add `onClick` prop to make it interactive for the onboarding use case

## Design
- Centered `max-w-lg` card layout, mobile-first
- Step indicator as simple text "Step X of 3" below progress bar (thin `Progress` component)
- Welcome step has no step indicator, just a clean intro screen

