import { useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { hasOnboardingData, hasPurchased, getProfile } from "@/lib/guards";
import { getStoryById, getProfileById } from "@/lib/storage";
import { generateTitle } from "@/lib/story-content";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("story");

  const story = storyId ? getStoryById(storyId) : null;
  const storyProfile = story ? getProfileById(story.profileId) : null;
  const legacyProfile = getProfile();
  const profile = storyProfile || legacyProfile;

  useEffect(() => {
    if (!story && !hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
      return;
    }
    if (!story && !hasPurchased()) {
      navigate("/preview", { replace: true });
    }
  }, [navigate, story]);

  if (!profile) return null;

  const title = story?.title || generateTitle(profile.name, profile.interests || []);
  const bookPath = storyId ? `/book?story=${storyId}` : "/book";

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

        <Button className="w-full" onClick={() => navigate(bookPath)}>
          Open Your Book
        </Button>

        <Link
          to="/library"
          className="inline-block text-sm text-primary hover:underline"
        >
          Go to My Library
        </Link>

        <p className="text-xs text-muted-foreground">
          A confirmation email would be sent in the live version.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
