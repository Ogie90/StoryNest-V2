// ── Shared types for StoryNest ──────────────────────────

export interface ChildProfile {
  name: string;
  age: number;
  readingLevel: string;
  interests: string[];
  favoriteThings: string;
  avoidTopics: string[];
  avoidFreeText: string;
  photos: string[]; // base64 data URLs (temporary; future: Supabase Storage paths)
  storyTone: string;
}

export interface StoredProfile extends ChildProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: string;
  profileId: string;
  title: string;
  subtitle: string;
  summary: string;
  dedication: string;
  pages: string[];
  status: "draft" | "preview" | "purchased";
  tone: string;
  createdAt: string;
  updatedAt: string;
  edits?: { title: string; pages: string[] };
}
