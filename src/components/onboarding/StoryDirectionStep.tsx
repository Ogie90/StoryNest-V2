import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ChildProfile } from "@/pages/Onboarding";

const TONE_OPTIONS = [
  { label: "Adventurous", emoji: "🗺️", desc: "Bold quests and exciting discoveries" },
  { label: "Funny", emoji: "😄", desc: "Silly moments and laugh-out-loud surprises" },
  { label: "Calm", emoji: "🌙", desc: "Gentle, soothing bedtime vibes" },
  { label: "Magical", emoji: "✨", desc: "Enchanted worlds and wonder" },
  { label: "Brave", emoji: "🦁", desc: "Courage, confidence, and overcoming fears" },
  { label: "Curious", emoji: "🔍", desc: "Learning, exploring, and asking why" },
];

interface Props {
  profile: ChildProfile;
  onChange: (p: ChildProfile) => void;
  onNext: () => void;
  onBack: () => void;
}

const StoryDirectionStep = ({ profile, onChange, onNext, onBack }: Props) => {
  const select = (tone: string) => {
    onChange({ ...profile, storyTone: tone });
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-8">
        <h2 className="text-xl font-bold text-foreground mb-1">What Vibe Should the Story Have?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pick the tone that feels right for {profile.name || "your child"}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TONE_OPTIONS.map((tone) => (
            <button
              key={tone.label}
              onClick={() => select(tone.label)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                profile.storyTone === tone.label
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/40 bg-card"
              }`}
            >
              <span className="text-2xl mt-0.5">{tone.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{tone.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{tone.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6">
          <Button type="button" variant="ghost" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} /> Back
          </Button>
          <Button onClick={onNext} className="rounded-full px-8 gap-1">
            Next <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryDirectionStep;
