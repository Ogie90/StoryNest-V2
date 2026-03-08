import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { Story, StoredProfile } from "@/types";
import {
  fetchStories,
  fetchProfileById,
} from "@/lib/supabase-storage";
import { getVisualTheme, getThemeIcon } from "@/lib/storyVisualTheme";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  LogOut,
  LayoutGrid,
  LayoutList,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";

type SortKey = "newest" | "oldest";
type FilterStatus = "all" | Story["status"];

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
  const { signOut } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [profileCache, setProfileCache] = useState<Record<string, StoredProfile | null>>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  useEffect(() => {
    const load = async () => {
      const all = await fetchStories();
      setStories(all);

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

  /* ── Derived data ── */
  const filtered = stories.filter((s) => filterStatus === "all" || s.status === filterStatus);
  const sorted = [...filtered].sort((a, b) =>
    sortBy === "newest"
      ? b.updatedAt.localeCompare(a.updatedAt)
      : a.updatedAt.localeCompare(b.updatedAt)
  );

  const statusCounts = stories.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading your library…</p>
      </div>
    );
  }

  /* ── Empty State ── */
  if (stories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center px-5">
        <div className="text-center space-y-6 max-w-sm">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto">
            <BookOpen className="w-9 h-9 text-primary" />
            <Sparkles size={16} className="absolute -top-1 -right-1 text-primary/60" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Your Library Awaits</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create a personalised story for your child — it only takes a few minutes. Your stories will live here.
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-full px-10 shadow-md hover:shadow-lg transition-shadow"
            onClick={() => navigate("/new-story")}
          >
            <Plus size={18} className="mr-2" /> Create Your First Story
          </Button>
          <div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Library ── */
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-8 px-5 border-b border-border/40">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
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
            <Button
              size="lg"
              className="rounded-full gap-2 shadow-md hover:shadow-lg transition-shadow"
              onClick={() => navigate("/new-story")}
            >
              <Plus size={16} /> New Story
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar: filter / sort / view */}
      <div className="max-w-3xl mx-auto px-5 mt-5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter chips */}
          <div className="flex items-center gap-1.5 mr-auto overflow-x-auto scrollbar-hide">
            <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" />
            {(["all", "draft", "preview", "purchased"] as FilterStatus[]).map((status) => {
              const isActive = filterStatus === status;
              const count = status === "all" ? stories.length : statusCounts[status] || 0;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {status === "all" ? "All" : statusConfig[status].label} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <button
            onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md border border-border bg-card transition-colors"
          >
            <ArrowUpDown size={12} />
            {sortBy === "newest" ? "Newest" : "Oldest"}
          </button>

          {/* View toggle */}
          <div className="flex border border-border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutList size={14} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>

        {/* Empty filter state */}
        {sorted.length === 0 && (
          <div className="text-center py-16 space-y-2">
            <p className="text-sm text-muted-foreground">No stories match this filter.</p>
            <button onClick={() => setFilterStatus("all")} className="text-xs text-primary hover:underline">
              Show all stories
            </button>
          </div>
        )}
      </div>

      {/* Story cards */}
      <div
        className={`max-w-3xl mx-auto px-5 mt-4 ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
            : "space-y-3"
        }`}
      >
        {sorted.map((story) => {
          const profile = profileCache[story.profileId];
          const cfg = statusConfig[story.status];
          const interests = profile?.interests || [];
          const theme = getVisualTheme(interests, story.tone);
          const WorldIcon = getThemeIcon(theme);
          const isPurchased = story.status === "purchased";

          return (
            <Card
              key={story.id}
              className={`cursor-pointer group hover:shadow-md transition-all duration-200 overflow-hidden ${
                isPurchased ? "shadow-md ring-1 ring-primary/10" : ""
              }`}
              style={{ borderLeftWidth: 4, borderLeftColor: `hsl(${theme.accentHsl})` }}
              onClick={() => handleStoryClick(story)}
            >
              <CardContent className={viewMode === "grid" ? "p-4" : "p-5"}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <WorldIcon
                        size={14}
                        className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors"
                      />
                      <p className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
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
                      <span className="text-border">·</span>
                      <span className="capitalize">{story.tone}</span>
                      <span className="text-border">·</span>
                      <span>{new Date(story.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant={cfg.variant} className="text-xs shrink-0 mt-1">
                    {cfg.icon} {cfg.label}
                  </Badge>
                </div>
                {story.summary && story.status !== "draft" && (
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2 border-t border-border/60 pt-3">
                    {story.summary}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="max-w-3xl mx-auto px-5 mt-10 flex flex-wrap justify-between items-center gap-4 border-t border-border/40 pt-6">
        <Link
          to="/profiles"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Manage Profiles
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-destructive/70 hover:text-destructive transition-colors"
          >
            <Trash2 size={12} /> Reset demo data
          </button>
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;
