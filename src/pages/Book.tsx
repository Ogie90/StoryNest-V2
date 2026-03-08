import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { hasOnboardingData, hasPurchased, getProfile } from "@/lib/guards";
import { getStoryById, getProfileById } from "@/lib/storage";
import { personalizeStory } from "@/lib/storyPersonalization";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ChevronLeft, Download, BookOpen } from "lucide-react";
import ExportDialog from "@/components/ExportDialog";

const Book = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("story");
  const [currentPage, setCurrentPage] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);

  const story = storyId ? getStoryById(storyId) : null;
  const storyProfile = story ? getProfileById(story.profileId) : null;
  const legacyProfile = getProfile();
  const profile = storyProfile || legacyProfile;

  useEffect(() => {
    if (story) return;
    if (!hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
      return;
    }
    if (!hasPurchased()) {
      navigate("/preview", { replace: true });
    }
  }, [navigate, story]);

  if (!profile) return null;

  // Use personalization engine
  const tone = story?.tone || profile.storyTone || "Adventurous";
  const personalized = personalizeStory(profile, tone);

  let title = story?.edits?.title || story?.title || personalized.title;
  let pages = story?.pages || personalized.fullPages;
  const dedication = story?.dedication || personalized.dedication;

  // Apply edits
  if (story?.edits?.pages?.length) {
    pages = pages.map((p, i) => story.edits!.pages[i] ?? p);
  } else if (!story) {
    // Legacy edits fallback
    try {
      const saved = localStorage.getItem("storynest-story-edits");
      if (saved) {
        const edits = JSON.parse(saved);
        if (edits.title) title = edits.title;
        if (edits.pages?.length) {
          pages = pages.map((p, i) => edits.pages[i] ?? p);
        }
      }
    } catch {}
  }

  const totalPages = pages.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            to="/library"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={16} /> Library
          </Link>
          <Badge variant="secondary" className="text-xs">
            Page {currentPage + 1} of {totalPages}
          </Badge>
          <Button variant="ghost" size="icon" onClick={() => setExportOpen(true)}>
            <Download size={18} />
          </Button>
        </div>
      </div>

      {/* Title area — show on first page */}
      {currentPage === 0 && (
        <div className="bg-primary/5 py-10 px-5 text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">A personalised story for {profile.name}</p>
          <p className="text-xs text-muted-foreground/70 pt-1">{dedication}</p>
        </div>
      )}

      {/* Page content */}
      <div className="flex-1 flex items-start justify-center px-5 py-8">
        <div className="w-full max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-8 min-h-[200px] shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground mb-3">
              Page {currentPage + 1}
            </p>
            <p className="text-foreground leading-relaxed text-[15px]">
              {pages[currentPage]}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-border bg-card/90 backdrop-blur-md sticky bottom-0 z-40">
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ArrowLeft size={14} /> Previous
          </Button>

          <div className="flex gap-1.5">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentPage
                    ? "bg-primary"
                    : "bg-border hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {currentPage < totalPages - 1 ? (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next <ArrowRight size={14} />
            </Button>
          ) : (
            <Button
              size="sm"
              className="gap-1"
              onClick={() => setExportOpen(true)}
            >
              <BookOpen size={14} /> Export
            </Button>
          )}
        </div>
      </div>

      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
};

export default Book;
