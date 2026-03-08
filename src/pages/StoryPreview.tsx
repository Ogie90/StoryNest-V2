import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { hasOnboardingData, getProfile } from "@/lib/guards";
import { fetchStoryById, fetchProfileById } from "@/lib/supabase-storage";
import type { Story, StoredProfile } from "@/lib/storage";
import { personalizeStory } from "@/lib/storyPersonalization";
import { getVisualTheme, getSceneLabel } from "@/lib/storyVisualTheme";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Pencil, Loader2, Sparkles } from "lucide-react";
import StoryCoverCard from "@/components/story/StoryCoverCard";
import StoryPageCard from "@/components/story/StoryPageCard";
import StoryLockCard from "@/components/story/StoryLockCard";

const StoryPreview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("story");
  const [story, setStory] = useState<Story | null>(null);
  const [profile, setProfile] = useState<StoredProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (storyId) {
        const s = await fetchStoryById(storyId);
        setStory(s);
        if (s) {
          const p = await fetchProfileById(s.profileId);
          setProfile(p);
        }
      }
      if (!story && !storyId) {
        const legacy = getProfile();
        if (legacy) setProfile(legacy);
      }
      setLoading(false);
    };
    load();
  }, [storyId]);

  useEffect(() => {
    if (!loading && !story && !hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
    }
  }, [loading, story, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
  const previewProgress = Math.round((3 / allPages.length) * 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top nav */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-5 h-12 flex items-center justify-between">
          <Link to="/library" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Library
          </Link>
          <span className="text-xs text-muted-foreground">
            Preview · {previewPages.length} of {allPages.length} pages
          </span>
        </div>
      </div>

      {/* Cover */}
      <StoryCoverCard
        title={title}
        subtitle={subtitle}
        dedication={dedication}
        childName={profile.name}
        interests={profile.interests || []}
        tone={tone}
        variant="full"
      />

      {/* Summary */}
      {summary && (
        <motion.div
          className="max-w-2xl mx-auto px-5 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground text-sm max-w-md mx-auto text-center leading-relaxed">{summary}</p>
        </motion.div>
      )}

      {/* Preview progress */}
      <div className="max-w-2xl mx-auto px-5 mt-8">
        <div className="flex items-center gap-3">
          <Progress value={previewProgress} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">{previewProgress}% preview</span>
        </div>
      </div>

      {/* Pages */}
      <div className="max-w-2xl mx-auto px-5 mt-6 space-y-5">
        {previewPages.map((text, idx) => (
          <StoryPageCard
            key={idx}
            pageNumber={idx + 1}
            text={text}
            theme={theme}
            sceneLabel={getSceneLabel(theme, idx)}
          />
        ))}

        <StoryLockCard
          remainingPages={allPages.length - 3}
          theme={theme}
          nextPageText={allPages[3]}
          onUnlock={() => navigate(`/upgrade${storyParam}`)}
        />

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 pt-4 pb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="outline" className="flex-1 gap-2 rounded-full" onClick={() => navigate(`/edit${storyParam}`)}>
            <Pencil size={14} /> Edit Story
          </Button>
          <Button className="flex-1 gap-2 rounded-full" onClick={() => navigate(`/upgrade${storyParam}`)}>
            <Sparkles size={14} /> Unlock Full Book
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryPreview;
