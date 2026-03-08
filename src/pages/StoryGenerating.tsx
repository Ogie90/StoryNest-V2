import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { hasOnboardingData, getProfile } from "@/lib/guards";
import { getStoryById, getProfileById, saveStory } from "@/lib/storage";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const phases = [
  { label: "Creating your character…", target: 30 },
  { label: "Writing the story…", target: 65 },
  { label: "Illustrating the pages…", target: 95 },
  { label: "Finishing touches…", target: 100 },
];

const StoryGenerating = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("story");
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const story = storyId ? getStoryById(storyId) : null;
  const storyProfile = story ? getProfileById(story.profileId) : null;
  const legacyProfile = getProfile();
  const childName = storyProfile?.name || legacyProfile?.name || "your child";

  useEffect(() => {
    if (!storyId && !hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate, storyId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const target = phases[phase]?.target ?? 100;
        if (p >= target) {
          if (phase < phases.length - 1) {
            setPhase((ph) => ph + 1);
          }
          return target;
        }
        return Math.min(p + 2, target);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        // Update story status to preview if it was draft
        if (story && story.status === "draft") {
          saveStory({ ...story, status: "preview" });
        }
        const dest = storyId ? `/preview?story=${storyId}` : "/preview";
        navigate(dest, { replace: true });
      }, 600);
      return () => clearTimeout(t);
    }
  }, [progress, navigate, storyId, story]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Creating {childName}'s Story
          </h1>
          <p className="text-muted-foreground text-sm transition-all duration-300">
            {phases[phase]?.label}
          </p>
        </div>

        <Progress value={progress} className="h-2" />

        <p className="text-xs text-muted-foreground">
          Personalised stories take a moment — great things are worth the wait.
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => navigate("/onboarding")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default StoryGenerating;
