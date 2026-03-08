import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { migrateFromLegacy, type Story } from "@/lib/storage";
import {
  fetchStories,
  fetchProfileById,
  migrateLocalToSupabase,
} from "@/lib/supabase-storage";
import type { StoredProfile } from "@/lib/storage";
import { getVisualTheme, getThemeIcon } from "@/lib/storyVisualTheme";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Trash2, ArrowLeft, Loader2, LogOut } from "lucide-react";
import { resetDemoData } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";

const statusConfig: Record<
  Story["status"],
  { label: string; variant: "default" | "secondary" | "outline"; icon: string }
> = {
  draft: { label: "Draft", variant: "outline", icon: "📝" },
  preview: { label: "Preview", variant: "secondary", icon: "👀" },
  purchased: { label: "Full Book", variant: "default", icon: "📖" },
};

const Library = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [profileCache, setProfileCache] = useState<Record<string, StoredProfile | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    migrateFromLegacy();
    const load = async () => {
      await migrateLocalToSupabase();
      const all = await fetchStories();
      setStories(all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));

      // Batch-load profiles
      const ids = [...new Set(all.map((s) => s.profileId))];
      const cache: Record<string, StoredProfile | null> = {};
      await Promise.all(ids.map(async (id) => {
        cache[id] = await fetchProfileById(id);
      }));
      setProfileCache(cache);
      setLoading(false);
    };
    load();
  }, []);

  const handleStoryClick = (story: Story) => {
    switch (story.status) {
      case "draft":
        navigate(`/onboarding?story=${story.id}`);
        break;
      case "preview":
        navigate(`/preview?story=${story.id}`);
        break;
      case "purchased":
        navigate(`/book?story=${story.id}`);
        break;
    }
  };

  const handleReset = () => {
    resetDemoData();
    setStories([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <div className="text-center space-y-6 max-w-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Your Library is Empty</h1>
            <p className="text-sm text-muted-foreground">
              Create your first personalised story and it will appear here.
            </p>
          </div>
          <Button className="rounded-full px-8" onClick={() => navigate("/new-story")}>
            <Plus size={16} className="mr-2" /> Create Your First Story
          </Button>
          <div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="bg-primary/5 py-10 px-5">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft size={14} /> Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Library</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {stories.length} {stories.length === 1 ? "story" : "stories"}
              </p>
            </div>
            <Button className="rounded-full gap-2" onClick={() => navigate("/new-story")}>
              <Plus size={16} /> New Story
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 mt-6 space-y-4">
        {stories.map((story) => {
          const profile = profileCache[story.profileId];
          const cfg = statusConfig[story.status];
          const interests = profile?.interests || [];
          const theme = getVisualTheme(interests, story.tone);
          const WorldIcon = getThemeIcon(theme);
          const isPurchased = story.status === "purchased";

          return (
            <Card
              key={story.id}
              className={`cursor-pointer hover:shadow-md transition-shadow overflow-hidden ${
                isPurchased ? "shadow-md" : ""
              }`}
              style={{ borderLeftWidth: 4, borderLeftColor: `hsl(${theme.accentHsl})` }}
              onClick={() => handleStoryClick(story)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <WorldIcon size={14} className="text-muted-foreground shrink-0" />
                      <p className="font-semibold text-foreground text-sm truncate">
                        {story.edits?.title || story.title}
                      </p>
                    </div>
                    {story.subtitle && (
                      <p className="text-xs text-muted-foreground italic mb-2 line-clamp-1">
                        {story.subtitle}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>For {profile?.name || "Unknown"}</span>
                      <span>·</span>
                      <span className="capitalize">{story.tone}</span>
                      <span>·</span>
                      <span>{new Date(story.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant={cfg.variant} className="text-xs shrink-0 mt-1">
                    {cfg.label}
                  </Badge>
                </div>
                {story.summary && story.status !== "draft" && (
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2 border-t border-border pt-3">
                    {story.summary}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto px-5 mt-8 flex justify-between items-center">
        <Link
          to="/profiles"
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Manage Profiles
        </Link>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-xs text-destructive/70 hover:text-destructive transition-colors"
        >
          <Trash2 size={12} /> Reset demo data
        </button>
      </div>
    </div>
  );
};

export default Library;
