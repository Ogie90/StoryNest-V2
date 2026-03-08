import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { StoredProfile } from "@/types";
import {
  fetchProfiles,
  fetchStoriesForProfile,
  removeProfile,
  removeStory,
} from "@/lib/supabase-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Trash2,
  User,
  Loader2,
  BookOpen,
  Heart,
  Sparkles,
} from "lucide-react";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const avatarColors = [
  "from-primary/70 to-primary",
  "from-accent/70 to-accent",
  "from-secondary to-secondary/80",
  "from-destructive/40 to-destructive/70",
];

const Profiles = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<StoredProfile[]>([]);
  const [storyCounts, setStoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    migrateFromLegacy();
    const load = async () => {
      const all = await fetchProfiles();
      setProfiles(all);
      const counts: Record<string, number> = {};
      await Promise.all(
        all.map(async (p) => {
          const stories = await fetchStoriesForProfile(p.id);
          counts[p.id] = stories.length;
        }),
      );
      setStoryCounts(counts);
      setLoading(false);
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    const stories = await fetchStoriesForProfile(id);
    await Promise.all(stories.map((s) => removeStory(s.id)));
    await removeProfile(id);
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading profiles…</p>
      </div>
    );
  }

  /* ── Empty State ── */
  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center px-5">
        <div className="text-center space-y-6 max-w-sm">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto">
            <Heart className="w-9 h-9 text-primary" />
            <Sparkles size={16} className="absolute -top-1 -right-1 text-primary/60" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">No Profiles Yet</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add your child's details to create personalised stories just for them. It only takes a minute!
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-full px-10 shadow-md hover:shadow-lg transition-shadow"
            onClick={() => navigate("/onboarding?new=true")}
          >
            <Plus size={18} className="mr-2" /> Add Your First Child
          </Button>
          <div>
            <Link to="/library" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Profile List ── */
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-8 px-5 border-b border-border/40">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Library
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Child Profiles</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {profiles.length} {profiles.length === 1 ? "profile" : "profiles"}
              </p>
            </div>
            <Button
              size="lg"
              className="rounded-full gap-2 shadow-md hover:shadow-lg transition-shadow"
              onClick={() => navigate("/onboarding?new=true")}
            >
              <Plus size={16} /> Add Child
            </Button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-2xl mx-auto px-5 mt-6 space-y-4">
        {profiles.map((profile, idx) => {
          const storyCount = storyCounts[profile.id] || 0;
          const hasPhoto = profile.photos?.length > 0;
          const colorClass = avatarColors[idx % avatarColors.length];

          return (
            <Card
              key={profile.id}
              className="group hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <CardContent className="p-5 flex items-start gap-4">
                {/* Avatar */}
                <div className="shrink-0">
                  {hasPhoto ? (
                    <img
                      src={profile.photos[0]}
                      alt={profile.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/10"
                    />
                  ) : (
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center ring-2 ring-primary/10`}
                    >
                      <span className="text-sm font-bold text-primary-foreground">
                        {getInitials(profile.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <p className="font-semibold text-foreground">{profile.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Age {profile.age} · {profile.readingLevel}
                    </p>
                  </div>

                  {/* Interest badges */}
                  {(profile.interests || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {profile.interests.slice(0, 4).map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 font-normal"
                        >
                          {interest}
                        </Badge>
                      ))}
                      {profile.interests.length > 4 && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-normal">
                          +{profile.interests.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Story count */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BookOpen size={11} />
                    <span>
                      {storyCount === 0
                        ? "No stories yet"
                        : `${storyCount} ${storyCount === 1 ? "story" : "stories"}`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => navigate(`/onboarding?edit=${profile.id}`)}
                    title="Edit profile"
                  >
                    <Pencil size={14} />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9" title="Delete profile">
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {profile.name}'s profile?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will also delete {storyCount > 0 ? `${storyCount} ${storyCount === 1 ? "story" : "stories"}` : "all stories"} created for {profile.name}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(profile.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Profile
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Profiles;
