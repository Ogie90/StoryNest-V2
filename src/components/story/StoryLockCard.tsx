import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
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
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Blurred page stack */}
      <div className="space-y-3">
        {nextPageText && (
          <div className={`rounded-2xl border ${theme.borderClass} ${theme.surfaceClass} overflow-hidden`}>
            <div className={`h-1 bg-gradient-to-r ${theme.gradient}`} />
            <div className="p-6 blur-sm select-none" aria-hidden>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Next page</p>
              <p className="text-foreground leading-relaxed text-[15px] line-clamp-3">{nextPageText}</p>
            </div>
          </div>
        )}
        {/* Ghost pages */}
        <div className={`rounded-2xl border ${theme.borderClass} h-14 ${theme.surfaceClass} opacity-30`} />
        <div className={`rounded-2xl border ${theme.borderClass} h-10 ${theme.surfaceClass} opacity-15 mx-4`} />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-[3px] rounded-2xl">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
          style={{
            border: `2px solid hsl(${theme.accentHsl})`,
            backgroundColor: `hsl(${theme.accentHsl} / 0.1)`,
            boxShadow: `0 4px 20px -4px hsl(${theme.accentHsl} / 0.25)`,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lock size={20} style={{ color: `hsl(${theme.accentHsl})` }} />
        </motion.div>
        <p className="text-sm font-semibold text-foreground">The adventure continues…</p>
        <p className="text-xs text-muted-foreground mt-1 mb-5">
          {remainingPages} more {remainingPages === 1 ? "page" : "pages"} await
        </p>
        <Button size="sm" onClick={onUnlock} className="gap-1.5 rounded-full px-6">
          <Sparkles size={14} /> Unlock Full Book
        </Button>
      </div>
    </motion.div>
  );
};

export default StoryLockCard;
