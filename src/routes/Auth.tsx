"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { consumeReturnTo, saveReturnTo } from "@/lib/auth-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Loader2, Eye, EyeOff, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const friendlyError = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("invalid login credentials"))
    return "Email or password is incorrect. Please try again.";
  if (lower.includes("user already registered"))
    return "This email already has an account. Try signing in instead.";
  if (lower.includes("email not confirmed"))
    return "Please check your inbox and confirm your email first.";
  if (lower.includes("invalid email"))
    return "Please enter a valid email address.";
  return msg;
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77z"
      fill="#FBBC05"
    />
    <path
      d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z"
      fill="#EA4335"
    />
  </svg>
);

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const emailRef = useRef<HTMLInputElement>(null);

  // Capture ?returnTo= set by middleware and persist to sessionStorage
  useEffect(() => {
    const returnTo = searchParams.get("returnTo");
    if (returnTo) saveReturnTo(returnTo);
  }, [searchParams]);

  useEffect(() => {
    emailRef.current?.focus();
  }, [isSignUp]);

  const passwordTooShort = touched.password && password.length > 0 && password.length < 6;
  const passwordsMismatch = touched.confirmPassword && confirmPassword.length > 0 && password !== confirmPassword;
  const formValid =
    email.length > 0 &&
    password.length >= 6 &&
    (!isSignUp || password === confirmPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUp(email, password);
      setLoading(false);
      if (error) {
        toast({ title: "Sign up failed", description: friendlyError(error.message), variant: "destructive" });
        return;
      }
      setSignUpSuccess(true);
    } else {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        toast({ title: "Sign in failed", description: friendlyError(error.message), variant: "destructive" });
        return;
      }
      toast({ title: "Welcome back! 👋", description: "Redirecting to your library…" });
      router.push(consumeReturnTo());
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch {
      setGoogleLoading(false);
      toast({ title: "Google sign-in failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setSignUpSuccess(false);
    setPassword("");
    setConfirmPassword("");
    setTouched({});
  };

  /* ── Success state after sign-up ── */
  if (signUpSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center px-5">
        <Card className="w-full max-w-md rounded-2xl shadow-lg border-border/60">
          <CardContent className="p-8 text-center space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Check your email</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Click the link to activate your account.
            </p>
            <Button variant="outline" className="w-full" onClick={switchMode}>
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-md space-y-7">
        {/* ── Branding ── */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? "Sign up to start creating stories" : "Sign in to continue your stories"}
          </p>
        </div>

        {/* ── Form Card ── */}
        <Card className="rounded-2xl shadow-lg border-border/60">
          <CardContent className="p-7">
            {/* Google OAuth */}
            <Button
              variant="outline"
              className="w-full gap-3 h-11 mb-4"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
            >
              {googleLoading ? <Loader2 size={16} className="animate-spin" /> : <GoogleIcon />}
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  disabled={loading}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    disabled={loading}
                    required
                    minLength={6}
                    className="pr-10"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordTooShort && (
                  <p className="text-xs text-destructive">Password must be at least 6 characters</p>
                )}
              </div>

              {/* Confirm Password (sign-up only) */}
              {isSignUp && (
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
                      disabled={loading}
                      required
                      className="pr-10"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwordsMismatch && (
                    <p className="text-xs text-destructive">Passwords don't match</p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading || !formValid}>
                {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            {/* Trust microcopy */}
            <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-muted-foreground">
              <ShieldCheck size={13} />
              <span>Your stories are saved securely</span>
            </div>
          </CardContent>
        </Card>

        {/* ── Switch mode ── */}
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={switchMode} className="text-primary hover:underline font-medium">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        {/* ── Footer links ── */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={12} /> Back to home
          </Link>
          {isSignUp && (
            <p className="text-[11px] text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-foreground">Terms</Link> &{" "}
              <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
