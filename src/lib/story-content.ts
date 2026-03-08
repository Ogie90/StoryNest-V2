export function generateTitle(name: string, interests: string[]): string {
  const theme = interests.length > 0 ? interests[0] : "Magic";
  return `${name} and the ${theme} Adventure`;
}

export function generatePages(name: string, interests: string[]): string[] {
  const i1 = interests[0] || "wonders";
  const i2 = interests[1] || "surprises";
  const i3 = interests[2] || "new friends";

  return [
    `Once upon a time, in a land filled with ${i1.toLowerCase()}, there lived a brave young adventurer named ${name}. Every morning, ${name} would look out the window and dream of the day a real adventure would begin.`,
    `One sunny afternoon, ${name} discovered a hidden path behind the old oak tree. The trail sparkled with ${i2.toLowerCase()} at every turn, and a gentle breeze seemed to whisper, "Follow me, ${name}."`,
    `At the end of the path stood a magnificent gate covered in vines and tiny glowing flowers. ${name} pushed it open and stepped into a world of ${i3.toLowerCase()} — a place where anything was possible and every story had a happy ending.`,
    `Inside the enchanted garden, ${name} met a friendly creature made entirely of starlight. "I've been waiting for you," it said with a warm smile. "There's so much of this world left to explore together."`,
    `${name} and the starlight guide journeyed through crystal caves that echoed with laughter, across bridges woven from rainbows, and past waterfalls that sang ancient lullabies.`,
    `As the sun began to set, painting the sky in shades of gold and lavender, ${name} knew this was just the beginning. With a heart full of courage and eyes full of wonder, the greatest adventures were still ahead.`,
  ];
}
