const PROFILE_KEY = "storynest-child-profile";
const PURCHASED_KEY = "storynest-purchased";

export function hasOnboardingData(): boolean {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return false;
    const profile = JSON.parse(raw);
    return typeof profile.name === "string" && profile.name.trim().length > 0;
  } catch {
    return false;
  }
}

export function hasPurchased(): boolean {
  return localStorage.getItem(PURCHASED_KEY) === "true";
}

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
