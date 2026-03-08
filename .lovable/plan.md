

# StoryNest — Children's Storybook Platform UI

A polished, mobile-first showcase of the StoryNest platform rendered as three iPhone-style mockups on a sage-green canvas, closely matching the provided screenshot.

## Design System Setup
- Custom color palette (mint primary, lime secondary, lavender/blue accents, sage background, dark story mode)
- Plus Jakarta Sans font via Google Fonts
- 4px spacing system, rounded-everything design tokens
- Soft shadows, pastel fills, premium calm aesthetic

## Reusable Components
- **MobileFrame** — iPhone-style shell with 40px radius, soft shadow, status bar
- **SectionHeader** — Title + optional "View all" link
- **StoryCard** — Illustrated book card with chapter count badge
- **AuthorAvatar** — Circular avatar with name caption
- **CategoryChip / GenreChip** — Rounded pastel pill buttons
- **PlaybackControls** — Play/pause, skip, speed icons with central mint button
- **ReaderToolbar** — Font size +/-, alignment options

## Screen 1: Home / Discovery
- Logo + avatar header
- "Recommendations" section with horizontally overlapping story cards (illustrated covers, chapter counts)
- "Top Authors" row with avatar circles and names
- "Categories" filter chips (All, Adventure, Animal, Fantasy…)
- Story preview cards grid at bottom
- Soft green gradient background

## Screen 2: Book / Audio Detail
- Back arrow, "Book" title, bookmark icon header
- Large centered book cover illustration
- Title "The Child and the Snow Leopard" + author subtitle
- Audio progress slider with timestamps
- Playback controls row (shuffle, rewind 10, play/pause, forward 15, heart)
- Genre chips (Fantasy, Fiction, Mystery)
- Stats row (1.2M Read, 2K Loved, 22 Saved)
- Story description paragraph

## Screen 3: Reader Mode
- Dark illustrated header with magical forest scene and glowing insect mascot
- Back arrow + Audio/Text segmented toggle + settings icon
- White reading panel with Chapter 1 title
- Story text with one highlighted phrase for reading focus
- Bottom toolbar: minus/plus font size, page indicator, text alignment options

## Layout & Responsiveness
- Full-page sage-green (#EEF6EF) background
- Three phone mockups centered side-by-side on desktop (max-width 1280px)
- On mobile/tablet, stack vertically or allow horizontal scroll
- Subtle hover effects on cards and buttons, pulse on play button
- Smooth slider animation, gentle tab toggle transition

## Content & Images
- Unsplash images for avatars and nature/fantasy imagery for story covers
- Real dummy story text, author names, and stats
- Lucide icons throughout (ArrowLeft, Bookmark, Heart, Eye, Settings, Pause, Plus, Minus, etc.)

