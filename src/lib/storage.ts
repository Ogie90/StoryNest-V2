import type { ChildProfile, StoredProfile, Story } from "@/types";
import { personalizeStory, generatePersonalizedTitle } from "@/lib/storyPersonalization";

// Re-export types for backward compatibility
export type { ChildProfile, StoredProfile, Story } from "@/types";

// ── Keys ───────────────────────────────────────────────

const PROFILES_KEY = "storynest-profiles";
const STORIES_KEY = "storynest-stories";
const MIGRATED_KEY = "storynest-migrated";
const LEGACY_PROFILE_KEY = "storynest-child-profile";
const LEGACY_PURCHASED_KEY = "storynest-purchased";
const LEGACY_EDITS_KEY = "storynest-story-edits";

// ── Helpers ────────────────────────────────────────────

function genId(): string {
  return crypto.randomUUID();
}

function now(): string {
  return new Date().toISOString();
}

// ── Profile CRUD ───────────────────────────────────────

export function getProfiles(): StoredProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getProfileById(id: string): StoredProfile | undefined {
  return getProfiles().find((p) => p.id === id);
}

/** Upsert — if a profile with the same `id` exists it is updated, otherwise inserted. */
export function saveProfile(profile: StoredProfile): StoredProfile {
  const profiles = getProfiles();
  const ts = now();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  const updated: StoredProfile = { ...profile, updatedAt: ts };
  if (idx >= 0) {
    profiles[idx] = updated;
  } else {
    updated.createdAt = updated.createdAt || ts;
    profiles.push(updated);
  }
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  return updated;
}

export function deleteProfile(id: string): void {
  const profiles = getProfiles().filter((p) => p.id !== id);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

// ── Story CRUD ─────────────────────────────────────────

export function getStories(): Story[] {
  try {
    const raw = localStorage.getItem(STORIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getStoryById(id: string): Story | undefined {
  return getStories().find((s) => s.id === id);
}

/** Upsert — if a story with the same `id` exists it is updated, otherwise inserted. */
export function saveStory(story: Story): Story {
  const stories = getStories();
  const ts = now();
  const idx = stories.findIndex((s) => s.id === story.id);
  const updated: Story = { ...story, updatedAt: ts };
  if (idx >= 0) {
    stories[idx] = updated;
  } else {
    updated.createdAt = updated.createdAt || ts;
    stories.push(updated);
  }
  localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
  return updated;
}

export function deleteStory(id: string): void {
  const stories = getStories().filter((s) => s.id !== id);
  localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
}

export function getStoriesForProfile(profileId: string): Story[] {
  return getStories().filter((s) => s.profileId === profileId);
}

// ── Create story from profile ──────────────────────────

export function createStoryFromProfile(
  profileId: string,
  tone: string,
  status: Story["status"] = "draft",
): Story {
  const profile = getProfileById(profileId);
  const childProfile: ChildProfile = profile ?? {
    name: "Child", age: 5, readingLevel: "Beginner",
    interests: [], favoriteThings: "", avoidTopics: [],
    avoidFreeText: "", photos: [], storyTone: tone,
  };
  const personalized = personalizeStory(childProfile, tone);

  const story: Story = {
    id: genId(),
    profileId,
    title: personalized.title,
    subtitle: personalized.subtitle,
    summary: personalized.summary,
    dedication: personalized.dedication,
    pages: personalized.fullPages,
    status,
    tone,
    createdAt: now(),
    updatedAt: now(),
  };
  return saveStory(story);
}

// ── Active profile (legacy bridge) ─────────────────────

export function setActiveProfile(profile: StoredProfile): void {
  localStorage.setItem(LEGACY_PROFILE_KEY, JSON.stringify(profile));
}

// ── Migration ──────────────────────────────────────────

/** Idempotent — safe to call multiple times. */
export function migrateFromLegacy(): void {
  if (localStorage.getItem(MIGRATED_KEY)) return;

  try {
    const raw = localStorage.getItem(LEGACY_PROFILE_KEY);
    if (raw) {
      const legacy = JSON.parse(raw) as ChildProfile;
      if (legacy.name?.trim()) {
        const ts = now();
        const profileId = genId();
        const profile: StoredProfile = {
          ...legacy,
          id: profileId,
          createdAt: ts,
          updatedAt: ts,
        };
        saveProfile(profile);

        // Determine status from legacy flags
        const purchased = localStorage.getItem(LEGACY_PURCHASED_KEY) === "true";
        const tone = legacy.storyTone || "Adventurous";
        const personalized = personalizeStory(legacy, tone);

        const story: Story = {
          id: genId(),
          profileId,
          title: personalized.title,
          subtitle: personalized.subtitle,
          summary: personalized.summary,
          dedication: personalized.dedication,
          pages: personalized.fullPages,
          status: purchased ? "purchased" : "preview",
          tone,
          createdAt: ts,
          updatedAt: ts,
        };

        // Apply legacy edits if any
        try {
          const editsRaw = localStorage.getItem(LEGACY_EDITS_KEY);
          if (editsRaw) {
            story.edits = JSON.parse(editsRaw);
          }
        } catch {}

        saveStory(story);
      }
    }
  } catch {}

  localStorage.setItem(MIGRATED_KEY, "true");
}

// ── Reset ──────────────────────────────────────────────

/** Clears only storynest-specific keys, not all localStorage. */
export function resetDemoData(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("storynest-")) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
}

// ── Utility for building a StoredProfile from ChildProfile ──

export function toStoredProfile(
  child: ChildProfile,
  existingId?: string,
): StoredProfile {
  const ts = now();
  return {
    ...child,
    id: existingId || genId(),
    createdAt: ts,
    updatedAt: ts,
  };
}
