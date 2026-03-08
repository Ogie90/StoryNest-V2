import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoryVisualTheme } from "@/lib/storyVisualTheme";

interface StoryLockCardProps {
  remainingPages: number;
  theme: StoryVisualTheme;
  nextPageText?: string;
  onUnlock: () => void;
}

const StoryLockCard = ({ remainingPages, theme, nextPageText, onUnlock }: StoryLockCardProps) => {
  return (
    <div className="relative">
      {/* Blurred page stack */}
      <div className="space-y-3">
        {nextPageText && (
          <div className={`rounded-xl border ${theme.borderClass} ${theme.surfaceClass} overflow-hidden`}>
            <div className={`h-1 bg-gradient-to-r ${theme.gradient}`} />
            <div className="p-6 blur-sm select-none" aria-hidden>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Next page</p>
              <p className="text-foreground leading-relaxed text-[15px] line-clamp-3">{nextPageText}</p>
            </div>
          </div>
        )}
        {/* Ghost second page */}
        <div className={`rounded-xl border ${theme.borderClass} h-16 ${theme.surfaceClass} opacity-40`} />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-xl">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
          style={{
            border: `2px solid hsl(${theme.accentHsl})`,
            backgroundColor: `hsl(${theme.accentHsl} / 0.08)`,
          }}
        >
          <Lock size={18} style={{ color: `hsl(${theme.accentHsl})` }} />
        </div>
        <p className="text-sm font-medium text-foreground">The adventure continues…</p>
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          {remainingPages} more {remainingPages === 1 ? "page" : "pages"} await
        </p>
        <Button size="sm" onClick={onUnlock}>
          Unlock Full Book
        </Button>
      </div>
    </div>
  );
};

export default StoryLockCard;
