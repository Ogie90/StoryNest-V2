import { motion, type Easing } from "framer-motion";
import type { StoryVisualTheme } from "@/lib/storyVisualTheme";

interface StoryPageCardProps {
  pageNumber: number;
  text: string;
  theme: StoryVisualTheme;
  sceneLabel?: string;
  animate?: boolean;
}

const StoryPageCard = ({ pageNumber, text, theme, sceneLabel, animate = true }: StoryPageCardProps) => {
  if (!animate) {
    return (
      <div className={`rounded-2xl border ${theme.borderClass} ${theme.surfaceClass} overflow-hidden shadow-sm`}>
        <PageContent pageNumber={pageNumber} text={text} theme={theme} sceneLabel={sceneLabel} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as Easing }}
      className={`rounded-2xl border ${theme.borderClass} ${theme.surfaceClass} overflow-hidden shadow-sm`}
    >
      {/* Accent bar */}
      <div className={`h-1 bg-gradient-to-r ${theme.gradient}`} />
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold"
            style={{
              backgroundColor: `hsl(${theme.accentHsl} / 0.12)`,
              color: `hsl(${theme.accentHsl})`,
            }}
          >
            {pageNumber}
          </span>
          {sceneLabel && (
            <span className="text-xs font-medium text-muted-foreground/70 italic">
              {sceneLabel}
            </span>
          )}
        </div>
        <p className="text-foreground leading-[1.85] text-[15px] sm:text-base">
          <span
            className="float-left text-3xl font-bold mr-2 mt-0.5 leading-none"
            style={{ color: `hsl(${theme.accentHsl} / 0.6)` }}
          >
            {text.charAt(0)}
          </span>
          {text.slice(1)}
        </p>
      </div>
    </Wrapper>
  );
};

export default StoryPageCard;
