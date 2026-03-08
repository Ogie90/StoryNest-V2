import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check } from "lucide-react";
import type { ChildProfile } from "@/pages/Onboarding";

const INTEREST_OPTIONS = [
  { label: "Dinosaurs", emoji: "🦕" },
  { label: "Space", emoji: "🚀" },
  { label: "Animals", emoji: "🐾" },
  { label: "Trucks", emoji: "🚚" },
  { label: "Princesses", emoji: "👑" },
  { label: "Ocean", emoji: "🌊" },
  { label: "Robots", emoji: "🤖" },
  { label: "Superheroes", emoji: "🦸" },
  { label: "Fairies", emoji: "🧚" },
  { label: "Music", emoji: "🎵" },
  { label: "Sports", emoji: "⚽" },
  { label: "Cooking", emoji: "🍳" },
];

interface Props {
  profile: ChildProfile;
  onChange: (p: ChildProfile) => void;
  onNext: () => void;
  onBack: () => void;
}

const InterestsStep = ({ profile, onChange, onNext, onBack }: Props) => {
  const [error, setError] = useState("");

  const toggleInterest = (interest: string) => {
    const next = profile.interests.includes(interest)
      ? profile.interests.filter((i) => i !== interest)
      : [...profile.interests, interest];
    onChange({ ...profile, interests: next });
    if (next.length > 0) setError("");
  };

  const handleSubmit = () => {
    if (profile.interests.length === 0) {
      setError("Please select at least one interest.");
      return;
    }
    onNext();
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-xl font-bold text-foreground mb-1">
          What Does {profile.name || "Your Child"} Love?
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pick topics that excite them — we'll weave these into the story.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
          {INTEREST_OPTIONS.map((interest) => {
            const isActive = profile.interests.includes(interest.label);
            return (
              <button
                key={interest.label}
                onClick={() => toggleInterest(interest.label)}
                className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/40 bg-card"
                }`}
              >
                <span className="text-2xl">{interest.emoji}</span>
                <span className="text-xs font-medium text-foreground">{interest.label}</span>
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check size={10} className="text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {error && <p className="text-sm text-destructive mt-1 mb-4">{error}</p>}
        {profile.interests.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {profile.interests.length} selected
          </p>
        )}

        <div className="mt-6">
          <label className="text-sm font-medium text-foreground block mb-2">
            Favorite Things <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Textarea
            placeholder="e.g. their stuffed tiger named Roo, building Lego castles, chocolate pancakes…"
            value={profile.favoriteThings}
            onChange={(e) => onChange({ ...profile, favoriteThings: e.target.value })}
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            The more specific, the more personal the story feels.
          </p>
        </div>

        <div className="flex items-center justify-end pt-6">
          <Button onClick={handleSubmit} className="rounded-full px-8 gap-1">
            Next <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestsStep;
