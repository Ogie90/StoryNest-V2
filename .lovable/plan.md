

# StoryNest — Landing Page Implementation

## What We're Building
Replace the current `Index.tsx` (3-phone mockup) with a full landing page containing 9 sections. The mockups become an embedded showcase section.

## File Plan

### New Files (8 components)
All in `src/components/landing/`:

1. **Navbar.tsx** — Sticky white bar, StoryNest wordmark, nav links (How it Works, Why StoryNest, Pricing), "Start Creating" mint CTA. Mobile hamburger menu with Sheet.
2. **HeroSection.tsx** — Large headline "Your Child Becomes the Hero of Their Own Story", subheadline, two CTAs (primary + outline "See an Example" that scrolls to showcase).
3. **ProductShowcase.tsx** — Embeds the 3 existing `MobileFrame` + screen components, scaled with `transform scale-[0.85]` on desktop, horizontally scrollable on mobile.
4. **WhyDifferent.tsx** — "Why StoryNest Is Different" with 4 cards: not a name swap, based on real interests, personalized around their world, visuals that feel like them. Icons from Lucide.
5. **HowItWorks.tsx** — 3 numbered step cards: Tell us about your child → We craft a personalized story → Preview, unlock, and keep your story.
6. **Testimonials.tsx** — 2 placeholder testimonial cards with Avatar, parent name, and realistic quote. No fake stats.
7. **PricingSection.tsx** — Two Card components side by side:
   - **Free**: 1 story preview, limited pages, basic personalization → "Get Started Free"
   - **Pro**: Full story, full illustrations, downloadable digital book, no watermark → "Go Pro" with primary border highlight
8. **Footer.tsx** — Links (About, Privacy, Terms, Contact), copyright, social icon placeholders.

### Modified Files
- **`src/pages/Index.tsx`** — Rewrite to import and render all landing sections in order: Navbar → Hero → ProductShowcase → WhyDifferent → HowItWorks → Testimonials → Pricing → FinalCTA (inline) → Footer.

## Layout & Responsive
- Each section uses `max-w-7xl mx-auto px-5 lg:px-8` for consistent containment
- Sections spaced with `py-16 lg:py-24`
- Mobile: single column, mockups scale down or show one at a time
- Desktop: multi-column grids for cards, side-by-side pricing

## Design
- Reuse existing design tokens (colors, shadows, radius, font)
- shadcn `Card`, `Button`, `Badge`, `Avatar`, `Sheet` (mobile nav)
- Smooth scroll for anchor links
- Subtle hover effects consistent with existing components

