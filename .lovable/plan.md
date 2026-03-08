

# Landing Page Redesign — Implementation Plan

## Implementation Order (10 files)

### Phase 1: Create 4 new components

**`src/components/landing/StoryWorlds.tsx`** — NEW
- 8 world chips (Dinosaurs, Space, Fairies, Ocean, Robots, Princesses, Animals, Magic)
- Each chip: `rounded-2xl`, `bg-gradient-to-br` using theme-matched gradients, emoji + name, `shadow-soft-sm`, hover scale
- Wrapped in a centered `flex-wrap` layout on desktop, horizontally scrollable on mobile
- Copy as specified in brief

**`src/components/landing/FeaturedExamples.tsx`** — NEW (replaces ProductShowcase)
- 4 book cover cards in a `grid-cols-2 lg:grid-cols-4` staggered layout
- Each card: `aspect-[3/4]`, `rounded-2xl`, theme gradient background, emoji, world label, title, "A story for [Name]" subtitle, bottom accent line
- Stagger via alternating `mt-` offsets (0, 6, 2, 8) and slight rotations (-2°, 1°, -1°, 2°)
- Cards: Luka/Dinosaurs, Leo/Space, Ella/Fairies, Noah/Ocean
- `motion.div` fade-in with staggered delay
- Decorative blur circle per card for depth

**`src/components/landing/ValueSummary.tsx`** — NEW
- Single centered `max-w-2xl` card, `rounded-2xl`, border, `shadow-soft-sm`
- Title: "What's Inside Every StoryNest Book"
- 2-column grid of 6 check-items (accurate wording: "Personalized pages featuring your child", "Your child as the hero", "Story world based on their real interests", "Themed visuals and illustrations", "Downloadable digital book", "Ready in minutes")

**`src/components/landing/FAQ.tsx`** — NEW
- Uses existing `Accordion` component
- 6 questions as specified, with `rounded-xl` accordion items on `bg-card`
- `bg-muted/30` section background

### Phase 2: Redesign 3 existing components

**`src/components/landing/HeroSection.tsx`** — REWRITE
- Two-column desktop layout: text left, book mockup right. Stacked on mobile (mockup below).
- Soft gradient bg: `bg-gradient-to-br from-primary/5 via-background to-accent-lavender/8`
- Left column: headline, subtitle (updated copy from brief), two buttons, trust microcopy ("Thoughtfully personalized. Easy to create. Ready to treasure.")
- Right column: CSS-only book mockup — a tall `rounded-2xl` card with **fairies** theme gradient (not dinosaurs, to avoid brand skewing), title "Mila's Moonlight Fairy Garden", emoji 🧚, `rotate-3`, layered shadow. Two smaller decorative cards behind it at different angles for depth.
- `motion.div` entrance animations

**`src/components/landing/WhyDifferent.tsx`** — REDESIGN
- 3 alternating rows (not 4 cards). Copy exactly as specified in brief.
- Each row: text on one side, visual card on the other, alternating via `flex-row` / `flex-row-reverse`
- Row 1 visual: minimal "before/after" — two small text snippets, one plain "Emma went to the park", one rich "Emma followed snow leopard tracks up the misty mountain", with a subtle divider
- Row 2 visual: 3-4 floating interest chips (🦕 Dinosaurs, 🧚 Fairies, 🚀 Space) on a gradient card
- Row 3 visual: mini book cover card with theme gradient and emoji
- All visuals: `rounded-2xl`, themed gradient fills, no heavy imagery

**`src/components/landing/HowItWorks.tsx`** — UPGRADE
- 3 cards in a row (stacked on mobile), each with: large emoji at top, step number badge (small `rounded-full` primary badge), title, description. Copy as specified.
- Cards: `rounded-2xl`, `bg-card`, `shadow-soft-sm`
- Step emojis: 📝 (step 1), ✨ (step 2), 📖 (step 3)

### Phase 3: Upgrade 2 existing components

**`src/components/landing/Testimonials.tsx`** — EXPAND
- 3 testimonials in a 3-column grid (stacked on mobile)
- Richer cards: quote, 5 filled Star icons row, parent name + child context ("Parent of a 5-year-old fairy lover")
- Updated copy from brief. Third testimonial: "We've tried other personalized books — this is the first one that actually felt like a real story, not a template." — Mom of a 4-year-old animal lover
- No fake stats or numbers

**`src/components/landing/PricingSection.tsx`** — UPGRADE
- Updated title/subtitle from brief
- Value row above plans: "Every book includes: personalized pages · custom story world · downloadable format" — single centered line with dot separators
- Pro badge: "Makes a thoughtful gift" instead of "Popular"
- Updated CTAs: "Start Free" / "Unlock Full Book"
- Updated plan subtitles: "Preview your story" / "Unlock the full book"
- Pro card slightly more elevated (`shadow-soft`)

### Phase 4: Wire together

**`src/pages/Index.tsx`** — UPDATE
- Remove `ProductShowcase` import
- Add imports: `StoryWorlds`, `FeaturedExamples`, `ValueSummary`, `FAQ`
- New section order: Navbar → Hero → StoryWorlds → FeaturedExamples → WhyDifferent → HowItWorks → ValueSummary → Testimonials → Pricing → FAQ → FinalCTA → Footer
- Upgrade FinalCTA inline: `bg-gradient-to-br from-primary/8 to-accent-lavender/10`, updated copy ("Create a Story They'll Want to Read Again" / "Start with a few simple details and see how StoryNest turns your child's world into a story worth keeping.")

## Key design decisions
- Hero mockup uses **fairies** theme (not dinosaurs) to keep the brand feeling diverse rather than skewing toward one world
- FeaturedExamples uses 4 different worlds to show range
- No fake social proof anywhere — trust comes from copy quality and visual polish
- Value row in Pricing uses deliberately careful language (no "24+ pages" claim since page count may vary)
- WhyDifferent before/after card is two text lines only — minimal, not gimmicky

