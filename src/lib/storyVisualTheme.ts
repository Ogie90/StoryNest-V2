import {
  Trees, Rocket, Fish, Truck, Crown, Waves, Cpu, Shield,
  Sparkles, Music, Trophy, UtensilsCrossed, Palette, Leaf, Wand2, Star,
  type LucideIcon,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────

export type IconKey =
  | "trees" | "rocket" | "fish" | "truck" | "crown" | "waves"
  | "cpu" | "shield" | "sparkles" | "music" | "trophy"
  | "utensils" | "palette" | "leaf" | "wand" | "star";

export interface StoryVisualTheme {
  worldKey: string;
  themeName: string;
  gradient: string;       // Tailwind from/to classes (no bg-gradient prefix)
  accentHsl: string;      // HSL string for inline styles e.g. "142 60% 45%"
  surfaceClass: string;   // subtle bg for page cards
  borderClass: string;    // border accent class
  iconKey: IconKey;
  coverEmoji: string;
  sceneLabels: string[];  // flexible length
}

// ── Icon map ───────────────────────────────────────────

const ICON_MAP: Record<IconKey, LucideIcon> = {
  trees: Trees,
  rocket: Rocket,
  fish: Fish,
  truck: Truck,
  crown: Crown,
  waves: Waves,
  cpu: Cpu,
  shield: Shield,
  sparkles: Sparkles,
  music: Music,
  trophy: Trophy,
  utensils: UtensilsCrossed,
  palette: Palette,
  leaf: Leaf,
  wand: Wand2,
  star: Star,
};

export function getThemeIcon(theme: StoryVisualTheme): LucideIcon {
  return ICON_MAP[theme.iconKey] || Star;
}

// ── World themes ───────────────────────────────────────

const WORLD_THEMES: Record<string, StoryVisualTheme> = {
  dinosaurs: {
    worldKey: "dinosaurs",
    themeName: "Prehistoric Jungle",
    gradient: "from-emerald-200/50 to-amber-100/40",
    accentHsl: "142 50% 45%",
    surfaceClass: "bg-emerald-50/30",
    borderClass: "border-emerald-200/60",
    iconKey: "trees",
    coverEmoji: "🦕",
    sceneLabels: [
      "The Discovery", "Into the Jungle", "A New Friend",
      "The Great Wall", "Giant Footprints", "The Fossil Cave",
      "Saying Goodbye", "Home Again",
    ],
  },
  space: {
    worldKey: "space",
    themeName: "Starlit Voyage",
    gradient: "from-indigo-200/50 to-violet-100/40",
    accentHsl: "238 60% 55%",
    surfaceClass: "bg-indigo-50/30",
    borderClass: "border-indigo-200/60",
    iconKey: "rocket",
    coverEmoji: "🚀",
    sceneLabels: [
      "Lift Off", "Among the Stars", "The Alien Friend",
      "The Asteroid Field", "A Distant Planet", "The Star Map",
      "The Journey Home", "Under the Night Sky",
    ],
  },
  animals: {
    worldKey: "animals",
    themeName: "Forest Friends",
    gradient: "from-green-200/50 to-lime-100/40",
    accentHsl: "120 40% 42%",
    surfaceClass: "bg-green-50/30",
    borderClass: "border-green-200/60",
    iconKey: "leaf",
    coverEmoji: "🦊",
    sceneLabels: [
      "The Forest Path", "Following Paw Prints", "The Wise Owl",
      "The Thicket", "The Hollow Tree", "The Hidden Meadow",
      "A Fond Farewell", "Home Before Dark",
    ],
  },
  trucks: {
    worldKey: "trucks",
    themeName: "Big Build",
    gradient: "from-orange-200/50 to-amber-100/40",
    accentHsl: "30 70% 50%",
    surfaceClass: "bg-orange-50/30",
    borderClass: "border-orange-200/60",
    iconKey: "truck",
    coverEmoji: "🚛",
    sceneLabels: [
      "The Building Site", "Engines Roar", "Meeting Clank",
      "The Boulder", "The Tallest Tower", "The Golden Bolt",
      "The Last Haul", "Back to Base",
    ],
  },
  princesses: {
    worldKey: "princesses",
    themeName: "Rose Kingdom",
    gradient: "from-pink-200/50 to-rose-100/40",
    accentHsl: "340 60% 60%",
    surfaceClass: "bg-pink-50/30",
    borderClass: "border-pink-200/60",
    iconKey: "crown",
    coverEmoji: "👑",
    sceneLabels: [
      "The Castle Gate", "The Rose Garden", "The Golden Dragon",
      "The Thorn Wall", "The Tower of Wishes", "The Royal Secret",
      "A Princess's Promise", "Ever After",
    ],
  },
  ocean: {
    worldKey: "ocean",
    themeName: "Deep Blue",
    gradient: "from-cyan-200/50 to-blue-100/40",
    accentHsl: "195 70% 48%",
    surfaceClass: "bg-cyan-50/30",
    borderClass: "border-cyan-200/60",
    iconKey: "waves",
    coverEmoji: "🐬",
    sceneLabels: [
      "The Coral Shore", "Beneath the Waves", "The Dolphin Guide",
      "The Sunken Gate", "The Rainbow Arch", "The Glowing Pearl",
      "Rising to the Surface", "The Shoreline at Sunset",
    ],
  },
  robots: {
    worldKey: "robots",
    themeName: "Circuit Lab",
    gradient: "from-slate-200/50 to-sky-100/40",
    accentHsl: "210 50% 50%",
    surfaceClass: "bg-slate-50/30",
    borderClass: "border-slate-200/60",
    iconKey: "cpu",
    coverEmoji: "🤖",
    sceneLabels: [
      "The Invention Room", "Gears in Motion", "A Blinking Friend",
      "The Firewall", "Clockwork Mountain", "The Master Circuit",
      "Powering Down", "A New Blueprint",
    ],
  },
  superheroes: {
    worldKey: "superheroes",
    themeName: "Sky City",
    gradient: "from-sky-200/50 to-blue-100/40",
    accentHsl: "210 80% 55%",
    surfaceClass: "bg-sky-50/30",
    borderClass: "border-sky-200/60",
    iconKey: "shield",
    coverEmoji: "⚡",
    sceneLabels: [
      "The Rooftop Call", "Soaring Over the City", "A Loyal Sidekick",
      "The Villain's Trap", "The Hero's Lighthouse", "Unmasked",
      "Victory Lap", "Until Next Time",
    ],
  },
  fairies: {
    worldKey: "fairies",
    themeName: "Enchanted Glen",
    gradient: "from-purple-200/40 to-fuchsia-100/30",
    accentHsl: "280 50% 60%",
    surfaceClass: "bg-purple-50/30",
    borderClass: "border-purple-200/60",
    iconKey: "sparkles",
    coverEmoji: "🧚",
    sceneLabels: [
      "The Lantern Trail", "The Fairy Ring", "Shimmering Wings",
      "The Thorn Maze", "The Moonlit Glade", "Pixie Dust",
      "Wings at Dawn", "A Whispered Spell",
    ],
  },
  music: {
    worldKey: "music",
    themeName: "Melody Valley",
    gradient: "from-fuchsia-200/40 to-pink-100/30",
    accentHsl: "320 50% 55%",
    surfaceClass: "bg-fuchsia-50/30",
    borderClass: "border-fuchsia-200/60",
    iconKey: "music",
    coverEmoji: "🎵",
    sceneLabels: [
      "The First Note", "The Valley of Melodies", "The Singing Bird",
      "The Silent Wall", "The Festival Stage", "The Golden Flute",
      "The Last Song", "An Echo of Music",
    ],
  },
  sports: {
    worldKey: "sports",
    themeName: "Champion's Arena",
    gradient: "from-amber-200/50 to-yellow-100/40",
    accentHsl: "40 80% 50%",
    surfaceClass: "bg-amber-50/30",
    borderClass: "border-amber-200/60",
    iconKey: "trophy",
    coverEmoji: "🏅",
    sceneLabels: [
      "The Starting Line", "Into the Arena", "The Cheetah Coach",
      "The Obstacle Course", "The Golden Bridge", "The Trophy Room",
      "Victory Lap", "A Champion's Rest",
    ],
  },
  cooking: {
    worldKey: "cooking",
    themeName: "Magic Kitchen",
    gradient: "from-orange-100/50 to-amber-50/40",
    accentHsl: "25 60% 50%",
    surfaceClass: "bg-orange-50/20",
    borderClass: "border-orange-200/50",
    iconKey: "utensils",
    coverEmoji: "🧁",
    sceneLabels: [
      "The Recipe Book", "The Magic Kitchen", "Meeting Stir",
      "The Missing Ingredient", "The Great Bakery", "The Perfect Dish",
      "Cleaning Up", "A Recipe to Remember",
    ],
  },
  art: {
    worldKey: "art",
    themeName: "Canvas World",
    gradient: "from-rose-200/40 to-violet-100/30",
    accentHsl: "350 50% 55%",
    surfaceClass: "bg-rose-50/30",
    borderClass: "border-rose-200/60",
    iconKey: "palette",
    coverEmoji: "🎨",
    sceneLabels: [
      "The Living Gallery", "Colours Come Alive", "The Chameleon",
      "The Blank Canvas", "Canvas Canyon", "The Masterpiece",
      "The Final Brushstroke", "A World of Colour",
    ],
  },
  nature: {
    worldKey: "nature",
    themeName: "Sunlit Meadow",
    gradient: "from-lime-200/50 to-green-100/40",
    accentHsl: "90 50% 45%",
    surfaceClass: "bg-lime-50/30",
    borderClass: "border-lime-200/60",
    iconKey: "leaf",
    coverEmoji: "🌿",
    sceneLabels: [
      "The Seed", "The Endless Meadow", "The Flower Deer",
      "The Thorn Hedge", "The Rainbow Waterfall", "The Ancient Tree",
      "Sundown", "Seeds for Tomorrow",
    ],
  },
  magic: {
    worldKey: "magic",
    themeName: "Starlight Tower",
    gradient: "from-violet-200/50 to-indigo-100/40",
    accentHsl: "270 55% 55%",
    surfaceClass: "bg-violet-50/30",
    borderClass: "border-violet-200/60",
    iconKey: "wand",
    coverEmoji: "✨",
    sceneLabels: [
      "The Floating Books", "The Wand Chooses", "The Little Phoenix",
      "The Locked Spell", "The Enchanted Library", "The First Spell",
      "Candles at Dusk", "Magic Within",
    ],
  },
};

const DEFAULT_THEME: StoryVisualTheme = {
  worldKey: "default",
  themeName: "Storybook",
  gradient: "from-primary/10 to-secondary/10",
  accentHsl: "170 72% 57%",
  surfaceClass: "bg-muted/30",
  borderClass: "border-border",
  iconKey: "star",
  coverEmoji: "📖",
  sceneLabels: [
    "The Beginning", "Setting Out", "A Friendly Face",
    "The Challenge", "The Breakthrough", "The Discovery",
    "The Return", "Home Again",
  ],
};

// ── Tone modifier ──────────────────────────────────────

type ToneKey = "Calm" | "Adventurous" | "Funny" | "Magical" | "Brave" | "Curious";

const TONE_GRADIENT_TWEAKS: Record<ToneKey, { opacity: string; extra: string }> = {
  Calm:        { opacity: "/30", extra: "" },
  Adventurous: { opacity: "/60", extra: "" },
  Funny:       { opacity: "/45", extra: "" },
  Magical:     { opacity: "/55", extra: "" },
  Brave:       { opacity: "/60", extra: "" },
  Curious:     { opacity: "/50", extra: "" },
};

function applyToneModifier(theme: StoryVisualTheme, tone: string): StoryVisualTheme {
  const tweak = TONE_GRADIENT_TWEAKS[tone as ToneKey];
  if (!tweak) return theme;
  // Adjust gradient opacity — replace the /XX pattern in from-/to- classes
  const gradient = theme.gradient.replace(/\/\d+/g, tweak.opacity);
  return { ...theme, gradient };
}

// ── Public API ─────────────────────────────────────────

export function pickWorldKey(interests: string[]): string {
  for (const i of interests) {
    const key = i.toLowerCase().trim();
    if (WORLD_THEMES[key]) return key;
  }
  return "default";
}

export function getVisualTheme(interests: string[], tone: string): StoryVisualTheme {
  const key = pickWorldKey(interests);
  const base = WORLD_THEMES[key] || DEFAULT_THEME;
  return applyToneModifier(base, tone);
}

export function getSceneLabel(theme: StoryVisualTheme, pageIndex: number): string | undefined {
  return theme.sceneLabels[pageIndex];
}
