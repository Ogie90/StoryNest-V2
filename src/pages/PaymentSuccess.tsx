import { useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { hasOnboardingData, hasPurchased, getProfile } from "@/lib/guards";
import { getStoryById, getProfileById } from "@/lib/storage";
import { personalizeStory } from "@/lib/storyPersonalization";
import { getVisualTheme } from "@/lib/storyVisualTheme";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Library, Sparkles } from "lucide-react";
import StoryCoverCard from "@/components/story/StoryCoverCard";


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

  const tone = story?.tone || profile.storyTone || "Adventurous";
  const personalized = personalizeStory(profile, tone);
  const theme = getVisualTheme(profile.interests || [], tone);
  const title = story?.title || personalized.title;
  const bookPath = storyId ? `/book?story=${storyId}` : "/book";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Success icon */}
        <div className="relative inline-block mx-auto">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full"
            style={{
              background: `linear-gradient(135deg, hsl(${theme.accentHsl} / 0.15), hsl(${theme.accentHsl} / 0.05))`,
              border: `2px solid hsl(${theme.accentHsl} / 0.3)`,
            }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: `hsl(${theme.accentHsl})` }} />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Sparkles size={14} className="text-primary-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            It's Ready! 🎉
          </h1>
          <p className="text-muted-foreground text-sm">
            <strong>{title}</strong> is now unlocked for {profile.name}.
          </p>
        </div>

        <StoryCoverCard
          title={title}
          childName={profile.name}
          interests={profile.interests || []}
          tone={tone}
          variant="compact"
        />

        <div className="space-y-3 pt-2">
          <Button
            className="w-full rounded-full h-12 text-base gap-2"
            onClick={() => navigate(bookPath)}
          >
            <BookOpen size={18} /> Open Your Book
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full h-11 gap-2"
            onClick={() => navigate("/library")}
          >
            <Library size={16} /> Go to My Library
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-2">
          A confirmation email would be sent in the live version.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
