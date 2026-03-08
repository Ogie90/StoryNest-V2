import { useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { hasOnboardingData, getProfile } from "@/lib/guards";
import { getStoryById, getProfileById } from "@/lib/storage";
import { personalizeStory } from "@/lib/storyPersonalization";
import { getVisualTheme, getSceneLabel } from "@/lib/storyVisualTheme";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import StoryCoverCard from "@/components/story/StoryCoverCard";
import StoryPageCard from "@/components/story/StoryPageCard";
import StoryLockCard from "@/components/story/StoryLockCard";

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

  const tone = story?.tone || profile.storyTone || "Adventurous";
  const personalized = personalizeStory(profile, tone);
  const theme = getVisualTheme(profile.interests || [], tone);

  const title = story?.edits?.title || story?.title || personalized.title;
  const subtitle = story?.subtitle || personalized.subtitle;
  const summary = story?.summary || personalized.summary;
  const dedication = story?.dedication || personalized.dedication;
  const allPages = story?.pages || personalized.fullPages;
  const previewPages = allPages.slice(0, 3);
  const storyParam = storyId ? `?story=${storyId}` : "";

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-5 pt-4">
        <Link to="/library" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Library
        </Link>
      </div>

      {/* Cover */}
      <div className="mt-4">
        <StoryCoverCard
          title={title}
          subtitle={subtitle}
          dedication={dedication}
          childName={profile.name}
          interests={profile.interests || []}
          tone={tone}
          variant="full"
        />
      </div>

      {/* Summary */}
      {summary && (
        <div className="max-w-2xl mx-auto px-5 mt-6">
          <p className="text-muted-foreground text-xs max-w-md mx-auto text-center">{summary}</p>
        </div>
      )}

      {/* Preview pages */}
      <div className="max-w-2xl mx-auto px-5 mt-8 space-y-5">
        {previewPages.map((text, idx) => (
          <StoryPageCard
            key={idx}
            pageNumber={idx + 1}
            text={text}
            theme={theme}
            sceneLabel={getSceneLabel(theme, idx)}
          />
        ))}

        {/* Locked section */}
        <StoryLockCard
          remainingPages={allPages.length - 3}
          theme={theme}
          nextPageText={allPages[3]}
          onUnlock={() => navigate(`/upgrade${storyParam}`)}
        />

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
