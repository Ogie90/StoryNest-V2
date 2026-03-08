import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, X, ImagePlus, Camera, Sun, Smile, Upload, Replace } from "lucide-react";
import type { ChildProfile } from "@/types";

interface Props {
  profile: ChildProfile;
  onChange: (p: ChildProfile) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_PHOTOS = 3;

const tips = [
  { icon: Smile, text: "Clear face, looking at camera" },
  { icon: Sun, text: "Good, natural lighting" },
  { icon: Camera, text: "Front-facing works best" },
];

const PhotoUploadStep = ({ profile, onChange, onNext, onBack }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const processFiles = useCallback(
    (files: FileList | null, replaceAt?: number) => {
      if (!files) return;

      if (replaceAt !== undefined) {
        const file = files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const updated = [...profile.photos];
          updated[replaceAt] = result;
          onChange({ ...profile, photos: updated });
        };
        reader.readAsDataURL(file);
        return;
      }

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
    },
    [profile, onChange],
  );

  const removePhoto = (index: number) => {
    onChange({ ...profile, photos: profile.photos.filter((_, i) => i !== index) });
  };

  const handleReplace = (index: number) => {
    setReplaceIndex(index);
    replaceRef.current?.click();
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  const photoCount = profile.photos.length;
  const hasPhotos = photoCount > 0;

  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1">
            Add Photos of {profile.name || "Your Child"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload 2–3 photos to inspire personalised illustrations.
          </p>
        </div>

        {/* Tips bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/70 border border-border"
            >
              <tip.icon size={14} className="text-primary shrink-0" />
              <span className="text-xs text-muted-foreground">{tip.text}</span>
            </div>
          ))}
        </div>

        {/* Drop zone — shown when no photos yet */}
        {!hasPhotos && (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
              transition-all duration-200
              ${dragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-border hover:border-primary/40 hover:bg-muted/50"
              }
            `}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Upload size={24} className="text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Drag photos here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG up to 5 MB each · Max {MAX_PHOTOS} photos
            </p>
          </div>
        )}

        {/* Photo grid — shown when photos exist */}
        {hasPhotos && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              grid grid-cols-3 gap-3 p-2 rounded-2xl transition-all duration-200
              ${dragging ? "bg-primary/5 ring-2 ring-primary/30" : ""}
            `}
          >
            {profile.photos.map((photo, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-muted shadow-sm"
              >
                <img
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-200" />

                {/* Remove button */}
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 shadow-sm"
                  aria-label="Remove photo"
                >
                  <X size={14} />
                </button>

                {/* Replace button */}
                <button
                  onClick={() => handleReplace(i)}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm"
                  aria-label="Replace photo"
                >
                  <Replace size={12} /> Replace
                </button>

                {/* Photo number badge */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
              </div>
            ))}

            {/* Add more slot */}
            {photoCount < MAX_PHOTOS && (
              <button
                onClick={() => inputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-primary/5 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
              >
                <ImagePlus size={22} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">Add Photo</span>
              </button>
            )}
          </div>
        )}

        {/* Counter */}
        {hasPhotos && (
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground">
              {photoCount} of {MAX_PHOTOS} photos added
              {photoCount < 2 && " · We recommend at least 2"}
            </p>
            {photoCount < MAX_PHOTOS && (
              <button
                onClick={() => inputRef.current?.click()}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                + Add more
              </button>
            )}
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            processFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <input
          ref={replaceRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (replaceIndex !== null) {
              processFiles(e.target.files, replaceIndex);
              setReplaceIndex(null);
            }
            e.target.value = "";
          }}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 mt-2 border-t border-border">
          <Button type="button" variant="ghost" onClick={onBack} className="gap-1">
            <ArrowLeft size={16} /> Back
          </Button>
          <Button onClick={onNext} className="rounded-full px-8 gap-1">
            {photoCount === 0 ? "Skip for Now" : "Next"} <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUploadStep;
