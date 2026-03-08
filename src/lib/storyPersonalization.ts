import type { ChildProfile } from "@/types";

// ── Types ──────────────────────────────────────────────

export interface PersonalizedStory {
  title: string;
  subtitle: string;
  summary: string;
  dedication: string;
  previewPages: string[];
  fullPages: string[];
}

// ── Interest world-building maps ───────────────────────

interface WorldSeed {
  setting: string;
  object: string;
  creature: string;
  action: string;
  landmark: string;
  detail: string;
}

const INTEREST_WORLDS: Record<string, WorldSeed> = {
  dinosaurs: {
    setting: "a prehistoric jungle",
    object: "a glowing dino egg",
    creature: "a friendly baby triceratops",
    action: "searching for fossils",
    landmark: "the Valley of Giant Footprints",
    detail: "leaves as big as umbrellas rustled overhead",
  },
  space: {
    setting: "a sparkling space station",
    object: "a star map",
    creature: "a gentle alien with three eyes",
    action: "launching a silver rocket",
    landmark: "the Rings of a Distant Planet",
    detail: "tiny meteors streaked past like fireflies",
  },
  animals: {
    setting: "a sun-dappled forest",
    object: "a golden acorn",
    creature: "a wise old owl",
    action: "following paw prints through the meadow",
    landmark: "the Great Hollow Tree",
    detail: "birdsong filled the air like a gentle orchestra",
  },
  trucks: {
    setting: "a bustling building site",
    object: "a shiny toolbox",
    creature: "a helpful crane named Clank",
    action: "hauling the biggest boulder ever seen",
    landmark: "the Tallest Tower in Town",
    detail: "engines rumbled and gravel crunched underfoot",
  },
  princesses: {
    setting: "a castle wrapped in rose vines",
    object: "a sparkling crown",
    creature: "a tiny dragon with golden wings",
    action: "unlocking a hidden garden gate",
    landmark: "the Tower of Wishes",
    detail: "petals drifted down like confetti",
  },
  ocean: {
    setting: "a shimmering coral reef",
    object: "a pearl that hummed with light",
    creature: "a playful dolphin",
    action: "diving through crystal-clear waves",
    landmark: "the Sunken Rainbow Arch",
    detail: "bubbles spiralled upward like tiny glass balloons",
  },
  robots: {
    setting: "a whirring invention lab",
    object: "a glowing circuit board",
    creature: "a small robot with blinking eyes",
    action: "building the most amazing gadget",
    landmark: "the Clockwork Mountain",
    detail: "gears clicked and steam puffed softly",
  },
  superheroes: {
    setting: "a rooftop above a glowing city",
    object: "a mysterious cape",
    creature: "a loyal sidekick with super speed",
    action: "zooming through the skyline",
    landmark: "the Hero's Lighthouse",
    detail: "the city lights twinkled like a thousand tiny stars",
  },
  fairies: {
    setting: "a glowing enchanted forest",
    object: "a vial of pixie dust",
    creature: "a fairy with shimmering wings",
    action: "following a trail of floating lanterns",
    landmark: "the Moonlit Fairy Ring",
    detail: "flowers opened and closed as if they were breathing",
  },
  music: {
    setting: "a hidden valley of melodies",
    object: "a golden flute",
    creature: "a singing bluebird",
    action: "following a tune carried by the wind",
    landmark: "the Festival of a Thousand Songs",
    detail: "every step seemed to make a soft musical note",
  },
  sports: {
    setting: "a sunlit stadium surrounded by cheering fans",
    object: "a lucky wristband",
    creature: "a swift cheetah coach",
    action: "racing across the finish line",
    landmark: "the Champion's Golden Bridge",
    detail: "the crowd's cheer swelled like a wave",
  },
  cooking: {
    setting: "a magical kitchen that cooked by itself",
    object: "a recipe book with glowing pages",
    creature: "a talking spoon named Stir",
    action: "mixing a potion of flavours",
    landmark: "the Great Bakery in the Sky",
    detail: "the scent of warm cinnamon swirled through the air",
  },
  art: {
    setting: "a gallery where paintings came to life",
    object: "a paintbrush that never ran dry",
    creature: "a colour-changing chameleon",
    action: "painting a door to another world",
    landmark: "the Canvas Canyon",
    detail: "splashes of colour floated in the breeze like petals",
  },
  nature: {
    setting: "a meadow that stretched to the horizon",
    object: "a seed that shone like a gem",
    creature: "a gentle deer with flower antlers",
    action: "planting a garden that grew in seconds",
    landmark: "the Rainbow Waterfall",
    detail: "warm sunlight kissed the tall grass",
  },
  magic: {
    setting: "a tower filled with floating books",
    object: "a wand carved from starlight",
    creature: "a phoenix the size of a songbird",
    action: "casting a spell for the first time",
    landmark: "the Enchanted Library",
    detail: "candles hovered in mid-air, flickering softly",
  },
};

const DEFAULT_WORLD: WorldSeed = {
  setting: "a land full of wonders",
  object: "a glowing key",
  creature: "a friendly guide made of starlight",
  action: "exploring a hidden path",
  landmark: "the Gate of New Beginnings",
  detail: "every colour seemed brighter than usual",
};

// ── Tone modifiers ─────────────────────────────────────

interface ToneMod {
  opener: string;
  connective: string;
  climaxFeel: string;
  ending: string;
  adjStyle: (adj: string) => string;
}

const TONE_MODS: Record<string, ToneMod> = {
  Adventurous: {
    opener: "With a burst of courage",
    connective: "Determined to press on",
    climaxFeel: "heart pounding with excitement",
    ending: "knowing the greatest adventures were still to come",
    adjStyle: (a) => `bold and ${a}`,
  },
  Funny: {
    opener: "With a giggle and a stumble",
    connective: "Trying not to laugh too loudly",
    climaxFeel: "barely holding back a snort of laughter",
    ending: "already planning the next silly escapade",
    adjStyle: (a) => `hilariously ${a}`,
  },
  Calm: {
    opener: "With a gentle breath",
    connective: "Feeling safe and peaceful",
    climaxFeel: "wrapped in a warm sense of wonder",
    ending: "drifting into the sweetest dreams",
    adjStyle: (a) => `soft and ${a}`,
  },
  Magical: {
    opener: "With a shimmer of enchantment",
    connective: "As if guided by an invisible spell",
    climaxFeel: "surrounded by a swirl of glowing light",
    ending: "carrying a little bit of magic in their heart forever",
    adjStyle: (a) => `enchantingly ${a}`,
  },
  Brave: {
    opener: "Standing tall and fearless",
    connective: "Summoning every ounce of bravery",
    climaxFeel: "feeling stronger than ever before",
    ending: "knowing they could face anything the world brought next",
    adjStyle: (a) => `fierce and ${a}`,
  },
  Curious: {
    opener: "With wide eyes and a million questions",
    connective: "Wondering what lay around the next corner",
    climaxFeel: "discovering something no one had ever seen before",
    ending: "with a notebook full of discoveries and a heart full of wonder",
    adjStyle: (a) => `fascinatingly ${a}`,
  },
};

const DEFAULT_TONE: ToneMod = TONE_MODS.Adventurous;

// ── Helpers ────────────────────────────────────────────

function pickWorld(interests: string[]): WorldSeed {
  for (const i of interests) {
    const key = i.toLowerCase().trim();
    if (INTEREST_WORLDS[key]) return INTEREST_WORLDS[key];
  }
  return DEFAULT_WORLD;
}

function pickSecondaryWorld(interests: string[]): WorldSeed | null {
  let found = 0;
  for (const i of interests) {
    const key = i.toLowerCase().trim();
    if (INTEREST_WORLDS[key]) {
      found++;
      if (found === 2) return INTEREST_WORLDS[key];
    }
  }
  return null;
}

function getTone(tone: string): ToneMod {
  return TONE_MODS[tone] || DEFAULT_TONE;
}

function isYoung(age: number, level: string): boolean {
  return age <= 4 || level === "Beginner";
}

function simplify(text: string, young: boolean): string {
  if (!young) return text;
  // Shorten sentences at periods
  return text
    .split(". ")
    .map((s) => {
      if (s.length > 100) {
        const mid = s.lastIndexOf(",", 80);
        if (mid > 20) return s.slice(0, mid) + ".";
      }
      return s;
    })
    .join(". ");
}

function favDetail(favorites: string): string {
  if (!favorites.trim()) return "";
  const items = favorites
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (items.length === 0) return "";
  return items[0];
}

// ── Title generation ───────────────────────────────────

function generateTitle(name: string, interests: string[], tone: string): string {
  const w = pickWorld(interests);
  const t = getTone(tone);
  const interest = interests[0] || "Wonders";
  const interestCap = interest.charAt(0).toUpperCase() + interest.slice(1);

  // Deterministic variety based on name length + interest
  const seed = (name.length + interest.length) % 5;
  switch (seed) {
    case 0:
      return `${name} and the ${t.adjStyle(interestCap)} Quest`;
    case 1:
      return `${name}'s ${interestCap} Adventure`;
    case 2:
      return `The ${interestCap} Secret of ${name}`;
    case 3:
      return `${name} and the ${w.object.replace(/^a /, "").replace(/^the /, "")}`;
    case 4:
      return `${name}'s Journey to ${w.landmark}`;
    default:
      return `${name} and the ${interestCap} Adventure`;
  }
}

// ── Subtitle ───────────────────────────────────────────

function generateSubtitle(name: string, interests: string[], tone: string): string {
  const primary = interests[0] || "adventure";
  const t = getTone(tone);
  return `A personalised ${tone.toLowerCase()} tale inspired by ${name}'s love of ${primary.toLowerCase()} and ${t.adjStyle("discoveries").toLowerCase()}.`;
}

// ── Summary ────────────────────────────────────────────

function generateSummary(
  name: string,
  interests: string[],
  tone: string,
  favorites: string,
): string {
  const w = pickWorld(interests);
  const t = getTone(tone);
  const fav = favDetail(favorites);
  const favBit = fav ? ` Armed with nothing but ${fav} and pure determination,` : "";

  return `${name} stumbles upon ${w.setting} and discovers ${w.object}.${favBit} ${t.opener.toLowerCase()}, ${name} sets out on a journey toward ${w.landmark}. Along the way, ${name} meets ${w.creature} and learns that the best adventures come from being true to yourself.`;
}

// ── Dedication ─────────────────────────────────────────

function generateDedication(name: string, age: number): string {
  if (age <= 3) return `For little ${name}, whose story is just beginning. 💛`;
  if (age <= 5) return `For ${name}, age ${age} — may every day be an adventure. ✨`;
  if (age <= 8) return `To ${name}, a ${age}-year-old explorer with a heart full of wonder. 🌟`;
  return `For ${name}, age ${age} — the hero of this story and many more to come. 🚀`;
}

// ── Page generation ────────────────────────────────────

function generatePages(
  name: string,
  profile: ChildProfile,
  tone: string,
  count: number,
): string[] {
  const w = pickWorld(profile.interests);
  const w2 = pickSecondaryWorld(profile.interests);
  const t = getTone(tone);
  const young = isYoung(profile.age, profile.readingLevel);
  const fav = favDetail(profile.favoriteThings);
  const favMention = fav ? `, clutching ${fav} tightly` : "";
  const secondInterest = profile.interests[1]
    ? profile.interests[1].toLowerCase()
    : "surprises";

  const raw: string[] = [
    // Page 1 — Introduction
    `Once upon a time, there was a ${young ? "little" : "young"} ${
      profile.age
    }-year-old named ${name} who loved ${
      profile.interests[0]?.toLowerCase() || "exploring"
    } more than anything in the world. One ordinary morning, something extraordinary happened — ${name} found ${w.object} hidden beneath a pile of ${
      young ? "soft leaves" : "autumn leaves that crinkled like old parchment"
    }. ${w.detail.charAt(0).toUpperCase() + w.detail.slice(1)}, and ${name} knew today would be different.`,

    // Page 2 — The call
    `${t.opener}${favMention}, ${name} stepped into ${w.setting}. It was ${
      young ? "so amazing" : "unlike anything imagined before"
    }. Everywhere ${name} looked, there were signs of ${secondInterest} — and the path ahead led toward ${w.landmark}. "${
      young ? "Let's go!" : "There's no turning back now,"
    }" ${name} whispered.`,

    // Page 3 — The encounter
    `Around the next bend, ${name} met ${w.creature}. "${
      young
        ? `Hi! I'm here to help you, ${name}!`
        : `I've been expecting you, ${name}. Not everyone finds their way here.`
    }" ${t.connective}, the two of them set off together, ${w.action}. ${
      w2
        ? `The trail also passed through ${w2.setting}, where ${w2.detail}.`
        : `Every step revealed something new and wonderful.`
    }`,

    // Page 4 — The challenge
    `But the journey wasn't all easy. A great obstacle blocked the path — ${
      young
        ? "a really big wall covered in sparkly vines"
        : "a towering barrier woven from thorns and shimmering light"
    }. ${name}'s new friend looked worried. "${
      young ? "Oh no! What do we do?" : "No one has ever gotten past this."
    }" But ${name} remembered something important about ${
      profile.interests[0]?.toLowerCase() || "never giving up"
    } and had an idea.`,

    // Page 5 — The breakthrough
    `${t.climaxFeel.charAt(0).toUpperCase() + t.climaxFeel.slice(1)}, ${name} ${
      young
        ? `used ${w.object.replace(/^a /, "the ")} to make the wall disappear`
        : `held up ${w.object.replace(/^a /, "the ")} and watched as the barrier dissolved into a shower of light`
    }. Beyond it lay ${w.landmark}, even more ${
      young ? "pretty" : "magnificent"
    } than ${name} had imagined. ${
      w.creature.charAt(0).toUpperCase() + w.creature.slice(1)
    } cheered. "${young ? "You did it!" : "I knew you were the one."}"`,

    // Page 6 — The discovery
    `Inside ${w.landmark}, ${name} discovered something ${t.adjStyle("wonderful").toLowerCase()}: a ${
      young ? "beautiful glowing picture" : "luminous mural"
    } that showed ${name}'s own face, surrounded by ${secondInterest} and ${
      profile.interests[0]?.toLowerCase() || "magic"
    }. ${
      fav
        ? `Right in the centre of the picture was ${fav}, painted in shimmering gold. `
        : ""
    }It was a reminder that this place had been waiting for someone exactly like ${name}.`,

    // Page 7 — The return
    `As the ${
      young ? "sky turned pink and orange" : "sun painted the horizon in shades of amber and rose"
    }, it was time to head home. ${name} said goodbye to ${w.creature} — but it wasn't really goodbye. "You can always come back," the friend promised. "This place is part of you now."`,

    // Page 8 — The ending
    `Back in the familiar world, everything looked the same — but ${name} felt different. ${
      young ? "Braver. Happier. Ready for anything." : "There was a quiet strength inside now, a glow that hadn't been there before."
    } ${name} smiled, ${t.ending}. And somewhere, deep in the heart of ${w.setting}, ${w.object.replace(/^a /, "the ")} shimmered gently — waiting for the next adventure.`,
  ];

  return raw.slice(0, count).map((p) => simplify(p, young));
}

// ── Main export ────────────────────────────────────────

export function personalizeStory(
  profile: ChildProfile,
  tone: string,
): PersonalizedStory {
  const name = profile.name || "Child";
  const interests = profile.interests || [];
  const previewCount = 3;
  const fullCount = 8;

  const fullPages = generatePages(name, profile, tone, fullCount);

  return {
    title: generateTitle(name, interests, tone),
    subtitle: generateSubtitle(name, interests, tone),
    summary: generateSummary(name, interests, tone, profile.favoriteThings || ""),
    dedication: generateDedication(name, profile.age),
    previewPages: fullPages.slice(0, previewCount),
    fullPages,
  };
}

/**
 * Generate just a title — useful for story creation before full generation.
 */
export function generatePersonalizedTitle(
  name: string,
  interests: string[],
  tone: string,
): string {
  return generateTitle(name, interests, tone);
}
