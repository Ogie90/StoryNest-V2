import { useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { hasOnboardingData, getProfile } from "@/lib/guards";
import { getStoryById, getProfileById } from "@/lib/storage";
import { personalizeStory } from "@/lib/storyPersonalization";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Pencil, ArrowLeft } from "lucide-react";

const StoryPreview = () => {
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
    }
  }, [navigate, story]);

  if (!profile) return null;

  // Use personalization engine
  const tone = story?.tone || profile.storyTone || "Adventurous";
  const personalized = personalizeStory(profile, tone);

  const title = story?.edits?.title || story?.title || personalized.title;
  const subtitle = story?.subtitle || personalized.subtitle;
  const summary = story?.summary || personalized.summary;
  const dedication = story?.dedication || personalized.dedication;
  const allPages = story?.pages || personalized.fullPages;
  const previewPages = allPages.slice(0, 3);
  const storyParam = storyId ? `?story=${storyId}` : "";

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="relative bg-primary/5 py-12 px-5">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <Link to="/library" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={14} /> Library
          </Link>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground text-sm italic">{subtitle}</p>
          <p className="text-muted-foreground text-xs max-w-md mx-auto">{summary}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="text-xs">{tone}</Badge>
            {(profile.interests || []).slice(0, 3).map((i: string) => (
              <Badge key={i} variant="secondary" className="text-xs">{i}</Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 pt-2">{dedication}</p>
        </div>
      </div>

      {/* Preview pages */}
      <div className="max-w-2xl mx-auto px-5 mt-8 space-y-6">
        {previewPages.map((text, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Page {idx + 1}
              </p>
              <p className="text-foreground leading-relaxed text-[15px]">{text}</p>
            </CardContent>
          </Card>
        ))}

        {/* Locked section */}
        <div className="relative">
          <Card className="overflow-hidden">
            <CardContent className="p-6 blur-sm select-none" aria-hidden>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Page 4</p>
              <p className="text-foreground leading-relaxed text-[15px]">{allPages[3]}</p>
            </CardContent>
          </Card>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-lg">
            <Lock className="w-6 h-6 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">Unlock the full story</p>
            <p className="text-xs text-muted-foreground mt-1 mb-3">{allPages.length - 3} more pages await</p>
            <Button onClick={() => navigate(`/upgrade${storyParam}`)} size="sm">
              Unlock Full Book
            </Button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="outline" className="flex-1 gap-2" onClick={() => navigate(`/edit${storyParam}`)}>
            <Pencil size={14} /> Edit Story
          </Button>
          <Button className="flex-1" onClick={() => navigate(`/upgrade${storyParam}`)}>
            Unlock Full Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryPreview;
