import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasOnboardingData, getProfile } from "@/lib/guards";
import { generateTitle, generatePages } from "@/lib/story-content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EDITS_KEY = "storynest-story-edits";

const StoryEdit = () => {
  const navigate = useNavigate();
  const profile = getProfile();

  useEffect(() => {
    if (!hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  const baseTitle = profile ? generateTitle(profile.name, profile.interests || []) : "";
  const basePages = profile ? generatePages(profile.name, profile.interests || []).slice(0, 3) : [];

  const [title, setTitle] = useState(() => {
    try {
      const saved = localStorage.getItem(EDITS_KEY);
      if (saved) return JSON.parse(saved).title || baseTitle;
    } catch {}
    return baseTitle;
  });

  const [pages, setPages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(EDITS_KEY);
      if (saved) return JSON.parse(saved).pages || basePages;
    } catch {}
    return basePages;
  });

  if (!profile) return null;

  const updatePage = (idx: number, value: string) => {
    setPages((prev) => prev.map((p, i) => (i === idx ? value : p)));
  };

  const handleSave = () => {
    localStorage.setItem(EDITS_KEY, JSON.stringify({ title, pages }));
    toast({ title: "Changes saved", description: "Your edits have been saved." });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-5">
      <div className="max-w-2xl mx-auto space-y-8">
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" onClick={() => navigate("/preview")}>
          <ArrowLeft size={14} /> Back to Preview
        </Button>

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Edit Your Story</h1>
          <p className="text-sm text-muted-foreground">Make small tweaks to the title or page text.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Story Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {pages.map((text, idx) => (
          <Card key={idx}>
            <CardContent className="p-5 space-y-2">
              <Label>Page {idx + 1}</Label>
              <Textarea
                value={text}
                onChange={(e) => updatePage(idx, e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1">Save Changes</Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate("/preview")}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default StoryEdit;
