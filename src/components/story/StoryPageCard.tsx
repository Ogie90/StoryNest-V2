import type { StoryVisualTheme } from "@/lib/storyVisualTheme";

interface StoryPageCardProps {
  pageNumber: number;
  text: string;
  theme: StoryVisualTheme;
  sceneLabel?: string;
}

const StoryPageCard = ({ pageNumber, text, theme, sceneLabel }: StoryPageCardProps) => {
  return (
    <div className={`rounded-xl border ${theme.borderClass} ${theme.surfaceClass} overflow-hidden shadow-sm`}>
      {/* Accent bar */}
      <div
        className={`h-1 bg-gradient-to-r ${theme.gradient}`}
      />
      <div className="p-6">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xs font-semibold text-muted-foreground">
            Page {pageNumber}
          </span>
          {sceneLabel && (
            <>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs italic text-muted-foreground/70">
                {sceneLabel}
              </span>
            </>
          )}
        </div>
        <p className="text-foreground leading-relaxed text-[15px]">{text}</p>
      </div>
    </div>
  );
};

export default StoryPageCard;
