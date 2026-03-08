import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, SkipForward, ShieldCheck, Check } from "lucide-react";
import type { ChildProfile } from "@/pages/Onboarding";

const AVOID_OPTIONS = [
  { label: "Monsters", emoji: "👹" },
  { label: "Storms", emoji: "⛈️" },
  { label: "Dark Caves", emoji: "🕳️" },
  { label: "Spiders", emoji: "🕷️" },
  { label: "Loud Noises", emoji: "📢" },
  { label: "Being Alone", emoji: "😢" },
  { label: "Water / Drowning", emoji: "🌊" },
  { label: "Fire", emoji: "🔥" },
  { label: "Ghosts", emoji: "👻" },
  { label: "Heights", emoji: "🏔️" },
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
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Anything to Avoid?</h2>
            <p className="text-sm text-muted-foreground">
              We'll make sure these don't appear in {profile.name || "your child"}'s story.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {AVOID_OPTIONS.map((topic) => {
            const isActive = profile.avoidTopics.includes(topic.label);
            return (
              <button
                key={topic.label}
                onClick={() => toggle(topic.label)}
                className={`relative flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                  isActive
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-border hover:border-muted-foreground/30 bg-card"
                }`}
              >
                <span className="text-lg">{topic.emoji}</span>
                <span className="text-sm font-medium text-foreground">{topic.label}</span>
                {isActive && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-destructive flex items-center justify-center">
                    <Check size={10} className="text-destructive-foreground" />
                  </div>
                )}
              </button>
            );
          })}
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
          <Button type="button" variant="ghost" onClick={onNext} size="sm" className="gap-1 text-muted-foreground">
            Skip <SkipForward size={14} />
          </Button>
          <Button onClick={onNext} className="rounded-full px-8 gap-1">
            Next <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvoidStep;
