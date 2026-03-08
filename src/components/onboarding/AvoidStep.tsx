import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react";
import CategoryChip from "@/components/storynest/CategoryChip";
import type { ChildProfile } from "@/pages/Onboarding";

const AVOID_OPTIONS = [
  "Monsters", "Storms", "Dark Caves", "Spiders", "Loud Noises",
  "Being Alone", "Water / Drowning", "Fire", "Ghosts", "Heights",
];

interface Props {
  profile: ChildProfile;
  onChange: (p: ChildProfile) => void;
  onNext: () => void;
  onBack: () => void;
}

const AvoidStep = ({ profile, onChange, onNext, onBack }: Props) => {
  const toggle = (topic: string) => {
    const next = profile.avoidTopics.includes(topic)
      ? profile.avoidTopics.filter((t) => t !== topic)
      : [...profile.avoidTopics, topic];
    onChange({ ...profile, avoidTopics: next });
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-8">
        <h2 className="text-xl font-bold text-foreground mb-1">Anything to Avoid?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Select topics or themes you'd prefer we keep out of {profile.name || "your child"}'s story.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {AVOID_OPTIONS.map((topic) => (
            <CategoryChip
              key={topic}
              label={topic}
              active={profile.avoidTopics.includes(topic)}
              onClick={() => toggle(topic)}
            />
          ))}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Anything else? <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Textarea
            placeholder="e.g. no villains, avoid separation from parents…"
            value={profile.avoidFreeText}
            onChange={(e) => onChange({ ...profile, avoidFreeText: e.target.value })}
            className="min-h-[70px]"
          />
        </div>

        <div className="flex items-center justify-between pt-6">
          <Button type="button" variant="ghost" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} /> Back
          </Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onNext} className="gap-1">
              Skip <SkipForward size={14} />
            </Button>
            <Button onClick={onNext} className="rounded-full px-8 gap-1">
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvoidStep;
