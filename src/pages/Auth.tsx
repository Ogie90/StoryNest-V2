import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Loader2, Eye, EyeOff, Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react";
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

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const emailRef = useRef<HTMLInputElement>(null);

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
      navigate("/library");
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
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={12} /> Back to home
          </Link>
          {isSignUp && (
            <p className="text-[11px] text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-foreground">Terms</Link> &{" "}
              <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
