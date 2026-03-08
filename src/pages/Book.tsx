import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { hasOnboardingData, hasPurchased, getProfile } from "@/lib/guards";
import { generateTitle, generatePages } from "@/lib/story-content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const EDITS_KEY = "storynest-story-edits";

const Book = () => {
  const navigate = useNavigate();
  const profile = getProfile();

  useEffect(() => {
    if (!hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
      return;
    }
    if (!hasPurchased()) {
      navigate("/preview", { replace: true });
    }
  }, [navigate]);

  if (!profile) return null;

  const defaultTitle = generateTitle(profile.name, profile.interests || []);
  const defaultPages = generatePages(profile.name, profile.interests || []);

  // Apply any user edits
  let title = defaultTitle;
  let pages = defaultPages;
  try {
    const saved = localStorage.getItem(EDITS_KEY);
    if (saved) {
      const edits = JSON.parse(saved);
      if (edits.title) title = edits.title;
      if (edits.pages?.length) {
        pages = pages.map((p, i) => edits.pages[i] ?? p);
      }
    }
  } catch {}

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-primary/5 py-12 px-5">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={14} /> Home
          </Link>
          <Badge variant="secondary" className="text-xs">Full Story</Badge>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground text-sm">
            A personalised story for {profile.name}
          </p>
        </div>
      </div>

      {/* All pages */}
      <div className="max-w-2xl mx-auto px-5 mt-8 space-y-6">
        {pages.map((text, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Page {idx + 1}
              </p>
              <p className="text-foreground leading-relaxed text-[15px]">{text}</p>
            </CardContent>
          </Card>
        ))}

        <div className="text-center pt-6">
          <p className="text-sm text-muted-foreground">✨ The End ✨</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
