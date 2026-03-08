import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  migrateFromLegacy,
  getProfiles,
  createStoryFromProfile,
  setActiveProfile,
  type StoredProfile,
} from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Sparkles, User } from "lucide-react";

const TONE_OPTIONS = [
  { label: "Adventurous", emoji: "🗺️" },
  { label: "Funny", emoji: "😄" },
  { label: "Calm", emoji: "🌙" },
  { label: "Magical", emoji: "✨" },
  { label: "Brave", emoji: "🦁" },
  { label: "Curious", emoji: "🔍" },
];

const NewStory = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<StoredProfile[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tone, setTone] = useState("Adventurous");

  useEffect(() => {
    migrateFromLegacy();
    setProfiles(getProfiles());
  }, []);

  const handleCreate = () => {
    if (!selectedId) return;
    const profile = profiles.find((p) => p.id === selectedId);
    if (!profile) return;

    // Set as active profile for legacy compatibility
    setActiveProfile(profile);

    // Create a new story linked to this profile (does NOT modify the profile)
    const story = createStoryFromProfile(selectedId, tone, "preview");

    navigate(`/generating?story=${story.id}`);
  };

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <div className="text-center space-y-6 max-w-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">No Profiles Yet</h1>
            <p className="text-sm text-muted-foreground">
              Create a child profile first, then come back to start a new story.
            </p>
          </div>
          <Button className="rounded-full px-8" onClick={() => navigate("/onboarding?new=true")}>
            <Plus size={16} className="mr-2" /> Create a Profile
          </Button>
          <div>
            <Link to="/library" className="text-sm text-muted-foreground hover:text-foreground underline">
              Back to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="bg-primary/5 py-10 px-5">
        <div className="max-w-lg mx-auto">
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft size={14} /> Library
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create a New Story</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a child and choose the story's vibe.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 mt-6 space-y-8">
        {/* Profile selection */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Choose a child</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profiles.map((profile) => (
              <Card
                key={profile.id}
                className={`cursor-pointer transition-all ${
                  selectedId === profile.id
                    ? "border-2 border-primary shadow-sm"
                    : "border border-border hover:border-primary/40"
                }`}
                onClick={() => setSelectedId(profile.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {profile.photos?.length ? (
                      <img
                        src={profile.photos[0]}
                        alt={profile.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">Age {profile.age}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link
            to="/onboarding?new=true"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Plus size={14} /> Create New Profile First
          </Link>
        </div>

        {/* Tone picker */}
        {selectedId && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Story tone</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setTone(t.label)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    tone === t.label
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Create CTA */}
        {selectedId && (
          <Button className="w-full rounded-full gap-2" size="lg" onClick={handleCreate}>
            <Sparkles size={16} /> Create Story
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewStory;
