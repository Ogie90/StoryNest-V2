"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { consumeReturnTo, AUTH_ROUTES } from "@/lib/auth-config";
import { Loader2 } from "lucide-react";

const TIMEOUT_MS = 5_000;

/**
 * OAuth callback handler — supports both PKCE (code) and implicit (hash) flows.
 * Exchanges the code for a cookie-based session, then redirects to returnTo.
 */
const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handled = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    const redirect = (hasSession: boolean) => {
      if (handled.current) return;
      handled.current = true;
      const dest = hasSession ? consumeReturnTo() : AUTH_ROUTES.login;
      router.replace(dest);
    };

    const code = searchParams.get("code");

    if (code) {
      // PKCE flow — exchange authorization code for session
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => redirect(!error))
        .catch(() => redirect(false));
      return;
    }

    // Fallback: implicit flow or session already present
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) redirect(true);
      },
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) redirect(true);
    });

    const timer = setTimeout(() => redirect(false), TIMEOUT_MS);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Completing sign in…</p>
    </div>
  );
};

export default AuthCallback;
