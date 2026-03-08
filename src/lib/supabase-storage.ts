import { supabase } from "@/integrations/supabase/client";
import type { ChildProfile, Story, StoredProfile } from "@/types";
import {
  getProfiles as getLocalProfiles,
  getStories as getLocalStories,
  getProfileById as getLocalProfileById,
  getStoryById as getLocalStoryById,
  getStoriesForProfile as getLocalStoriesForProfile,
} from "@/lib/storage";
import { personalizeStory } from "@/lib/storyPersonalization";

// ── Auth helper ────────────────────────────────────────

async function getAuthUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Not authenticated");
  return user.id;
}

// ── Mappers ────────────────────────────────────────────

function dbToProfile(row: any): StoredProfile {
  return {
    id: row.id,
    name: row.child_name,
    age: row.age ?? 5,
    readingLevel: row.reading_level ?? "Beginner",
    interests: row.interests ?? [],
    favoriteThings: row.favorites ?? "",
    avoidTopics: row.avoid_topics ?? [],
    avoidFreeText: row.avoid_free_text ?? "",
    photos: row.photos ?? [],
    storyTone: row.story_tone ?? "Adventurous",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function profileToDb(p: StoredProfile, userId: string) {
  return {
    id: p.id,
    child_name: p.name,
    age: p.age,
    reading_level: p.readingLevel,
    interests: p.interests,
    favorites: p.favoriteThings,
    avoid_topics: p.avoidTopics,
    avoid_free_text: p.avoidFreeText,
    story_tone: p.storyTone,
    photos: p.photos,
    user_id: userId,
  };
}

function dbToStory(row: any): Story {
  return {
    id: row.id,
    profileId: row.profile_id,
    title: row.title,
    subtitle: row.subtitle ?? "",
    summary: row.summary ?? "",
    dedication: row.dedication ?? "",
    pages: Array.isArray(row.pages) ? row.pages : [],
    status: row.status as Story["status"],
    tone: row.tone ?? "Adventurous",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    edits: row.edits as Story["edits"] | undefined,
  };
}

function storyToDb(s: Story, userId: string) {
  return {
    id: s.id,
    profile_id: s.profileId,
    title: s.title,
    subtitle: s.subtitle || null,
    summary: s.summary || null,
    dedication: s.dedication || null,
    tone: s.tone,
    status: s.status,
    pages: s.pages as any,
    edits: s.edits as any ?? null,
    user_id: userId,
  };
}

// ── Profile CRUD ───────────────────────────────────────

export async function fetchProfiles(): Promise<StoredProfile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) {
    console.warn("Supabase fetchProfiles failed, falling back to local:", error.message);
    return getLocalProfiles();
  }
  return data.map(dbToProfile);
}

export async function fetchProfileById(id: string): Promise<StoredProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    const local = getLocalProfileById(id);
    return local ?? null;
  }
  return dbToProfile(data);
}

export async function upsertProfile(profile: StoredProfile): Promise<StoredProfile> {
  const userId = await getAuthUserId();
  const row = profileToDb(profile, userId);
  const { data, error } = await supabase
    .from("profiles")
    .upsert(row as any)
    .select()
    .single();
  if (error) {
    console.warn("Supabase upsertProfile failed:", error.message);
    const { saveProfile } = await import("@/lib/storage");
    return saveProfile(profile);
  }
  return dbToProfile(data);
}

export async function removeProfile(id: string): Promise<void> {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) console.warn("Supabase removeProfile failed:", error.message);
  const { deleteProfile } = await import("@/lib/storage");
  deleteProfile(id);
}

// ── Story CRUD ─────────────────────────────────────────

export async function fetchStories(): Promise<Story[]> {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) {
    console.warn("Supabase fetchStories failed, falling back to local:", error.message);
    return getLocalStories();
  }
  return data.map(dbToStory);
}

export async function fetchStoryById(id: string): Promise<Story | null> {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    const local = getLocalStoryById(id);
    return local ?? null;
  }
  return dbToStory(data);
}

export async function upsertStory(story: Story): Promise<Story> {
  const userId = await getAuthUserId();
  const row = storyToDb(story, userId);
  const { data, error } = await supabase
    .from("stories")
    .upsert(row as any)
    .select()
    .single();
  if (error) {
    console.warn("Supabase upsertStory failed:", error.message);
    const { saveStory } = await import("@/lib/storage");
    return saveStory(story);
  }
  return dbToStory(data);
}

export async function removeStory(id: string): Promise<void> {
  const { error } = await supabase.from("stories").delete().eq("id", id);
  if (error) console.warn("Supabase removeStory failed:", error.message);
  const { deleteStory } = await import("@/lib/storage");
  deleteStory(id);
}

export async function fetchStoriesForProfile(profileId: string): Promise<Story[]> {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("profile_id", profileId)
    .order("updated_at", { ascending: false });
  if (error) {
    console.warn("Supabase fetchStoriesForProfile failed:", error.message);
    return getLocalStoriesForProfile(profileId);
  }
  return data.map(dbToStory);
}

// ── Create story from profile (async version) ─────────

export async function createStoryFromProfileAsync(
  profileId: string,
  tone: string,
  status: Story["status"] = "draft",
): Promise<Story> {
  const profile = await fetchProfileById(profileId);
  const childProfile: ChildProfile = profile ?? {
    name: "Child", age: 5, readingLevel: "Beginner",
    interests: [], favoriteThings: "", avoidTopics: [],
    avoidFreeText: "", photos: [], storyTone: tone,
  };
  const personalized = personalizeStory(childProfile, tone);

  const story: Story = {
    id: crypto.randomUUID(),
    profileId,
    title: personalized.title,
    subtitle: personalized.subtitle,
    summary: personalized.summary,
    dedication: personalized.dedication,
    pages: personalized.fullPages,
    status,
    tone,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return upsertStory(story);
}

// ── Migration: localStorage → Supabase ─────────────────

const MIGRATION_KEY = "storynest-supabase-migrated";

export async function migrateLocalToSupabase(): Promise<void> {
  if (localStorage.getItem(MIGRATION_KEY)) return;

  let userId: string;
  try {
    userId = await getAuthUserId();
  } catch {
    // Not authenticated — skip migration
    return;
  }

  const localProfiles = getLocalProfiles();
  const localStories = getLocalStories();

  for (const p of localProfiles) {
    const row = profileToDb(p, userId);
    const { error } = await supabase.from("profiles").upsert(row as any);
    if (error) console.warn("Migration upsert profile failed:", error.message);
  }
  for (const s of localStories) {
    const row = storyToDb(s, userId);
    const { error } = await supabase.from("stories").upsert(row as any);
    if (error) console.warn("Migration upsert story failed:", error.message);
  }

  if (localProfiles.length > 0 || localStories.length > 0) {
    console.log(
      `Migrated ${localProfiles.length} profiles and ${localStories.length} stories to Supabase`,
    );
  }

  localStorage.setItem(MIGRATION_KEY, "true");
}
