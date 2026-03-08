import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Upload, X, ImagePlus } from "lucide-react";
import type { ChildProfile } from "@/pages/Onboarding";

interface Props {
  profile: ChildProfile;
  onChange: (p: ChildProfile) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_PHOTOS = 3;

const PhotoUploadStep = ({ profile, onChange, onNext, onBack }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = MAX_PHOTOS - profile.photos.length;
    const toProcess = Array.from(files).slice(0, remaining);

    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange({
          ...profile,
          photos: [...profile.photos, result].slice(0, MAX_PHOTOS),
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    onChange({ ...profile, photos: profile.photos.filter((_, i) => i !== index) });
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-8">
        <h2 className="text-xl font-bold text-foreground mb-1">Add Some Photos</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Upload 2–3 photos of {profile.name || "your child"}. We'll use these to inspire the illustrations.
        </p>

        {/* Photo grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {profile.photos.map((photo, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted">
              <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removePhoto(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {profile.photos.length < MAX_PHOTOS && (
            <button
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/50 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ImagePlus size={22} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add Photo</span>
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {profile.photos.length === 0 && (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          >
            <Upload size={28} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">Click to upload photos</p>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB each</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-3">
          <strong>Tips:</strong> Use clear, well-lit photos showing their face. Avoid group shots or heavy filters.
        </p>

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

export default PhotoUploadStep;
