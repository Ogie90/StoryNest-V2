import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Pencil } from "lucide-react";
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
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <button
        onClick={() => onEdit(editStep)}
        className="text-xs text-primary hover:underline flex items-center gap-1"
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
      <CardContent className="p-8">
        <h2 className="text-xl font-bold text-foreground mb-1">Review & Create</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Everything look good? You can edit any section before we generate the story.
        </p>

        <div className="divide-y divide-border">
          {/* Basic Details */}
          <Section title="Child Details" editStep={1} onEdit={onEdit}>
            <p className="text-sm text-foreground">
              <strong>{profile.name}</strong>, age {profile.age} · {profile.readingLevel}
            </p>
          </Section>

          {/* Interests */}
          <Section title="Interests & Favorites" editStep={2} onEdit={onEdit}>
            <div className="flex flex-wrap gap-1.5 mb-1">
              {profile.interests.map((i) => (
                <Badge key={i} variant="secondary" className="rounded-full text-xs bg-primary/10 border-0">
                  {i}
                </Badge>
              ))}
            </div>
            {profile.favoriteThings && (
              <p className="text-xs text-muted-foreground mt-1.5">"{profile.favoriteThings}"</p>
            )}
          </Section>

          {/* Avoid */}
          <Section title="Topics to Avoid" editStep={3} onEdit={onEdit}>
            {profile.avoidTopics.length > 0 || profile.avoidFreeText ? (
              <>
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
              </>
            ) : (
              <p className="text-xs text-muted-foreground">None specified</p>
            )}
          </Section>

          {/* Photos */}
          <Section title="Photos" editStep={4} onEdit={onEdit}>
            {profile.photos.length > 0 ? (
              <div className="flex gap-2">
                {profile.photos.map((photo, i) => (
                  <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-border">
                    <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No photos uploaded</p>
            )}
          </Section>

          {/* Story Tone */}
          <Section title="Story Tone" editStep={5} onEdit={onEdit}>
            <Badge variant="secondary" className="rounded-full text-xs bg-primary/10 border-0">
              {profile.storyTone}
            </Badge>
          </Section>
        </div>

        <div className="pt-6 text-center">
          <Button onClick={onFinish} size="lg" className="rounded-full px-10 gap-2 text-base">
            Generate My Story <Sparkles size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStep;
