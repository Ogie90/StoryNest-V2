"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { hasOnboardingData, hasPurchased, getProfile } from "@/lib/guards";
import { fetchStoryById, fetchProfileById } from "@/lib/supabase-storage";
import type { Story, StoredProfile } from "@/lib/storage";
import { personalizeStory } from "@/lib/storyPersonalization";
import { getVisualTheme, getSceneLabel } from "@/lib/storyVisualTheme";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, ChevronLeft, Download, BookOpen, Loader2 } from "lucide-react";
import ExportDialog from "@/components/ExportDialog";
import StoryCoverCard from "@/components/story/StoryCoverCard";
import StoryPageCard from "@/components/story/StoryPageCard";

const Book = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("story");
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [story, setStory] = useState<Story | null>(null);
  const [profile, setProfile] = useState<StoredProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (storyId) {
        const s = await fetchStoryById(storyId);
        setStory(s);
        if (s) {
          const p = await fetchProfileById(s.profileId);
          setProfile(p);
        }
      }
      if (!storyId) {
        const legacy = getProfile();
        if (legacy) setProfile(legacy);
      }
      setLoading(false);
    };
    load();
  }, [storyId]);

  useEffect(() => {
    if (loading) return;
    if (story) return;
    if (!hasOnboardingData()) {
      router.replace("/onboarding");
      return;
    }
    if (!hasPurchased()) {
      router.replace("/preview");
    }
  }, [loading, router, story]);

  const goToPage = useCallback((idx: number) => {
    setDirection(idx > currentPage ? 1 : -1);
    setCurrentPage(idx);
  }, [currentPage]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentPage((p) => p + 1);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentPage((p) => p - 1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentPage < (story?.pages?.length || 8) - 1) goNext();
      if (e.key === "ArrowLeft" && currentPage > 0) goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentPage, goNext, goPrev, story]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) return null;

  const tone = story?.tone || profile.storyTone || "Adventurous";
  const personalized = personalizeStory(profile, tone);
  const theme = getVisualTheme(profile.interests || [], tone);

  let title = story?.edits?.title || story?.title || personalized.title;
  let pages = story?.pages || personalized.fullPages;
  const subtitle = story?.subtitle || personalized.subtitle;
  const dedication = story?.dedication || personalized.dedication;

  if (story?.edits?.pages?.length) {
    pages = pages.map((p, i) => story.edits!.pages[i] ?? p);
  } else if (!story) {
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
  const progressPercent = Math.round(((currentPage + 1) / totalPages) * 100);

  const pageVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div
        className="border-b bg-card/90 backdrop-blur-md sticky top-0 z-40"
        style={{ borderBottomColor: `hsl(${theme.accentHsl} / 0.2)` }}
      >
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            href="/library"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} /> Library
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-foreground leading-none">
              {currentPage + 1} / {totalPages}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {getSceneLabel(theme, currentPage) || `Page ${currentPage + 1}`}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setExportOpen(true)}>
            <Download size={18} />
          </Button>
        </div>
        {/* Progress bar */}
        <Progress
          value={progressPercent}
          className="h-0.5 rounded-none"
          style={{ "--progress-color": `hsl(${theme.accentHsl})` } as React.CSSProperties}
        />
      </div>

      {/* Cover on page 0 */}
      {currentPage === 0 && (
        <StoryCoverCard
          title={title}
          subtitle={subtitle}
          dedication={dedication}
          childName={profile.name}
          interests={profile.interests || []}
          tone={tone}
          variant="full"
        />
      )}

      {/* Page content with animation */}
      <div className="flex-1 flex items-start justify-center px-5 py-8 overflow-hidden">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <StoryPageCard
                pageNumber={currentPage + 1}
                text={pages[currentPage]}
                theme={theme}
                sceneLabel={getSceneLabel(theme, currentPage)}
                animate={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer navigation */}
      <div
        className="border-t bg-card/90 backdrop-blur-md sticky bottom-0 z-40"
        style={{ borderTopColor: `hsl(${theme.accentHsl} / 0.2)` }}
      >
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            disabled={currentPage === 0}
            onClick={goPrev}
          >
            <ArrowLeft size={14} /> Previous
          </Button>

          <div className="flex gap-1.5 max-w-[50vw] overflow-x-auto scrollbar-hide">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-200 shrink-0 ${
                  idx === currentPage
                    ? "scale-125"
                    : idx <= currentPage
                    ? "opacity-60"
                    : "opacity-30"
                }`}
                style={{
                  backgroundColor:
                    idx <= currentPage
                      ? `hsl(${theme.accentHsl})`
                      : `hsl(${theme.accentHsl} / 0.2)`,
                }}
              />
            ))}
          </div>

          {currentPage < totalPages - 1 ? (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={goNext}
            >
              Next <ArrowRight size={14} />
            </Button>
          ) : (
            <Button
              size="sm"
              className="gap-1 rounded-full"
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
