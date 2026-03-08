import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { consumeReturnTo, AUTH_ROUTES } from "@/lib/auth-config";
import { Loader2 } from "lucide-react";

const TIMEOUT_MS = 5_000;

/**
 * OAuth callback handler.
 * Waits for Supabase to confirm a session (via hash token exchange),
 * then redirects to the user's original destination.
 * Falls back to /auth after a short timeout.
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    const redirect = (hasSession: boolean) => {
      if (handled.current) return;
      handled.current = true;
      navigate(hasSession ? consumeReturnTo() : AUTH_ROUTES.login, { replace: true });
    };

    // Listen for auth state change (token exchange)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) redirect(true);
      },
    );

    // Also check immediately — session may already exist
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) redirect(true);
    });

    // Timeout fallback
    const timer = setTimeout(() => redirect(false), TIMEOUT_MS);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Completing sign in…</p>
    </div>
  );
};

export default AuthCallback;
