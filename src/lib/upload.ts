/**
 * Upload helpers for StoryNest.
 *
 * ── Current behaviour ──
 * Photos are stored as base64 data-URLs inside profile JSON.
 * These helpers return **temporary local preview URLs** created via
 * `URL.createObjectURL()` — they are valid only for the current browser
 * session and are NOT persisted to any storage backend.
 *
 * ── Future: Supabase Storage integration ──
 * - Bucket "profile-photos"  → child profile images
 * - Bucket "story-assets"    → illustration uploads / generated art
 *
 * When migrating, replace the stubs below with real Supabase Storage
 * upload calls and return the permanent public URL.
 */

// ── Child profile photos ───────────────────────────────

/**
 * Upload a child's profile photo.
 *
 * @returns A **temporary** object URL valid only in this browser session.
 *          NOT a persisted storage URL — do not save this to a database.
 */
export async function uploadProfilePhoto(
  _file: File,
  _profileId: string,
): Promise<string> {
  // TODO: Supabase Storage — bucket "profile-photos"
  // const path = `${profileId}/${Date.now()}-${file.name}`;
  // const { data, error } = await supabase.storage.from("profile-photos").upload(path, file);
  // return supabase.storage.from("profile-photos").getPublicUrl(data.path).data.publicUrl;
  return URL.createObjectURL(_file);
}

// ── Story illustration assets ──────────────────────────

/**
 * Upload a story illustration or cover image.
 *
 * @returns A **temporary** object URL — not persisted.
 */
export async function uploadStoryAsset(
  _file: File,
  _storyId: string,
): Promise<string> {
  // TODO: Supabase Storage — bucket "story-assets"
  return URL.createObjectURL(_file);
}

// ── URL resolver ───────────────────────────────────────

/**
 * Resolve a stored photo path to a displayable URL.
 * Currently a pass-through; will resolve from Supabase Storage in future.
 */
export function getPhotoUrl(path: string): string {
  // TODO: resolve from Supabase Storage public URL
  return path;
}
