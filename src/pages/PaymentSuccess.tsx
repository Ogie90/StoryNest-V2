import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { hasOnboardingData, hasPurchased, getProfile } from "@/lib/guards";
import { generateTitle } from "@/lib/story-content";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const profile = getProfile();

  useEffect(() => {
    if (!hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
      return;
    }
    if (!hasPurchased()) {
      navigate("/preview", { replace: true });
    }
  }, [navigate]);

  if (!profile) return null;

  const title = generateTitle(profile.name, profile.interests || []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-muted-foreground text-sm">
            <strong>{title}</strong> is ready for {profile.name}.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Your full personalised story is now unlocked.
        </p>

        <Button className="w-full" onClick={() => navigate("/book")}>
          Open Your Book
        </Button>

        <p className="text-xs text-muted-foreground">
          A confirmation email would be sent in the live version.
        </p>

        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
