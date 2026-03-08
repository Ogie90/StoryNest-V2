import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CategoryChip from "@/components/storynest/CategoryChip";
import type { ChildProfile } from "@/pages/Onboarding";

const INTEREST_OPTIONS = [
  "Dinosaurs", "Space", "Animals", "Trucks", "Princesses", "Ocean",
  "Robots", "Superheroes", "Fairies", "Music", "Sports", "Cooking",
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
      <CardContent className="p-8">
        <h2 className="text-xl font-bold text-foreground mb-1">What Does {profile.name || "Your Child"} Love?</h2>
        <p className="text-sm text-muted-foreground mb-6">Pick topics that excite them — we'll weave these into the story.</p>

        <div className="flex flex-wrap gap-2 mb-2">
          {INTEREST_OPTIONS.map((interest) => (
            <CategoryChip
              key={interest}
              label={interest}
              active={profile.interests.includes(interest)}
              onClick={() => toggleInterest(interest)}
            />
          ))}
        </div>
        {error && <p className="text-sm text-destructive mt-1 mb-4">{error}</p>}

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
        </div>

        <div className="flex items-center justify-between pt-6">
          <Button type="button" variant="ghost" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} /> Back
          </Button>
          <Button onClick={handleSubmit} className="rounded-full px-8 gap-1">
            Next <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestsStep;
