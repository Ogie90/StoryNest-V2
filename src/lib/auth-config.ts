// ── Centralised auth redirect configuration ─────────────
// Single source of truth for all auth-related routes and
// returnTo persistence across login flows (email + OAuth).

export const AUTH_ROUTES = {
  login: "/auth",
  callback: "/auth/callback",
  defaultPostLogin: "/library",
} as const;

const RETURN_TO_KEY = "storynest-return-to";

/**
 * Persist the user's intended destination before redirecting to login.
 * Used by ProtectedRoute and OAuth flows.
 */
export function saveReturnTo(path: string): void {
  sessionStorage.setItem(RETURN_TO_KEY, path);
}

/**
 * Read and clear the stored returnTo path.
 * Only allows internal paths starting with "/" and blocks protocol-relative
 * URLs ("//evil.com") to prevent open-redirect attacks.
 */
export function consumeReturnTo(): string {
  const val = sessionStorage.getItem(RETURN_TO_KEY);
  sessionStorage.removeItem(RETURN_TO_KEY);

  if (val && val.startsWith("/") && !val.startsWith("//")) {
    return val;
  }
  return AUTH_ROUTES.defaultPostLogin;
}
