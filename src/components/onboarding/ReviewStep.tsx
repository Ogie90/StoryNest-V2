import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Pencil, CheckCircle2 } from "lucide-react";
import type { ChildProfile } from "@/pages/Onboarding";

interface Props {
  profile: ChildProfile;
  onEdit: (step: number) => void;
  onFinish: () => void;
}

const Section = ({
  title,
  editStep,
  onEdit,
  children,
}: {
  title: string;
  editStep: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) => (
  <div className="py-4 border-b border-border last:border-0">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <CheckCircle2 size={14} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <button
        onClick={() => onEdit(editStep)}
        className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
      >
        <Pencil size={12} /> Edit
      </button>
    </div>
    {children}
  </div>
);

const ReviewStep = ({ profile, onEdit, onFinish }: Props) => {
  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1">Almost There!</h2>
          <p className="text-sm text-muted-foreground">
            Review the details below, then we'll create {profile.name || "your child"}'s story.
          </p>
        </div>

        <div className="divide-y divide-border rounded-xl border border-border bg-card p-4">
          {/* Basic Details */}
          <Section title="Child Details" editStep={1} onEdit={onEdit}>
            <p className="text-sm text-foreground ml-6">
              <strong>{profile.name}</strong>, age {profile.age} · {profile.readingLevel}
            </p>
          </Section>

          {/* Interests */}
          <Section title="Interests & Favorites" editStep={2} onEdit={onEdit}>
            <div className="flex flex-wrap gap-1.5 ml-6">
              {profile.interests.map((i) => (
                <Badge key={i} variant="secondary" className="rounded-full text-xs bg-primary/10 border-0">
                  {i}
                </Badge>
              ))}
            </div>
            {profile.favoriteThings && (
              <p className="text-xs text-muted-foreground mt-1.5 ml-6">"{profile.favoriteThings}"</p>
            )}
          </Section>

          {/* Avoid */}
          <Section title="Topics to Avoid" editStep={3} onEdit={onEdit}>
            {profile.avoidTopics.length > 0 || profile.avoidFreeText ? (
              <div className="ml-6">
                <div className="flex flex-wrap gap-1.5">
                  {profile.avoidTopics.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full text-xs bg-destructive/10 text-destructive border-0">
                      {t}
                    </Badge>
                  ))}
                </div>
                {profile.avoidFreeText && (
                  <p className="text-xs text-muted-foreground mt-1.5">"{profile.avoidFreeText}"</p>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground ml-6">None specified</p>
            )}
          </Section>

          {/* Photos */}
          <Section title="Photos" editStep={4} onEdit={onEdit}>
            {profile.photos.length > 0 ? (
              <div className="flex gap-2 ml-6">
                {profile.photos.map((photo, i) => (
                  <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                    <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground ml-6">No photos uploaded</p>
            )}
          </Section>

          {/* Story Tone */}
          <Section title="Story Tone" editStep={5} onEdit={onEdit}>
            <Badge variant="secondary" className="rounded-full text-xs bg-primary/10 border-0 ml-6">
              {profile.storyTone}
            </Badge>
          </Section>
        </div>

        <div className="pt-6 text-center">
          <Button onClick={onFinish} size="lg" className="rounded-full px-10 gap-2 text-base w-full sm:w-auto">
            Generate My Story <Sparkles size={18} />
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            This usually takes about 30 seconds
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStep;
