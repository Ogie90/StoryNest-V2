import { motion } from "framer-motion";
import { getVisualTheme, getThemeIcon, type StoryVisualTheme } from "@/lib/storyVisualTheme";
import { Badge } from "@/components/ui/badge";

interface StoryCoverCardProps {
  title: string;
  subtitle?: string;
  dedication?: string;
  childName: string;
  interests: string[];
  tone: string;
  variant: "full" | "compact";
}

const StoryCoverCard = ({
  title, subtitle, dedication, childName, interests, tone, variant,
}: StoryCoverCardProps) => {
  const theme = getVisualTheme(interests, tone);
  const ThemeIcon = getThemeIcon(theme);
  const initial = childName.charAt(0).toUpperCase();

  if (variant === "compact") {
    return (
      <div
        className="flex items-center gap-3 rounded-lg border bg-card p-3"
        style={{ borderLeftWidth: 4, borderLeftColor: `hsl(${theme.accentHsl})` }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0"
          style={{
            border: `2px solid hsl(${theme.accentHsl})`,
            color: `hsl(${theme.accentHsl})`,
          }}
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <ThemeIcon size={13} className="text-muted-foreground shrink-0" />
            <p className="text-sm font-semibold text-foreground truncate">{title}</p>
          </div>
          <p className="text-xs text-muted-foreground">For {childName}</p>
        </div>
      </div>
    );
  }

  // Full variant — cinematic cover
  return (
    <div className={`relative bg-gradient-to-br ${theme.gradient} py-16 sm:py-20 px-5 overflow-hidden`}>
      {/* Decorative background circles */}
      <div
        className="absolute top-[-60px] right-[-40px] w-48 h-48 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: `hsl(${theme.accentHsl})` }}
      />
      <div
        className="absolute bottom-[-40px] left-[-30px] w-36 h-36 rounded-full opacity-15 blur-xl"
        style={{ backgroundColor: `hsl(${theme.accentHsl})` }}
      />

      <motion.div
        className="max-w-2xl mx-auto text-center space-y-5 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Initials medallion */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <div
            className="w-16 h-16 rounded-full bg-card flex items-center justify-center text-xl font-bold shadow-md"
            style={{
              border: `3px solid hsl(${theme.accentHsl})`,
              color: `hsl(${theme.accentHsl})`,
              boxShadow: `0 8px 24px -8px hsl(${theme.accentHsl} / 0.3)`,
            }}
          >
            {initial}
          </div>
        </motion.div>

        {/* Title area */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2">
            <ThemeIcon size={18} style={{ color: `hsl(${theme.accentHsl} / 0.7)` }} />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{title}</h1>
          </div>
          {subtitle && (
            <p className="text-muted-foreground text-sm italic">{subtitle}</p>
          )}
        </motion.div>

        <p className="text-xs text-muted-foreground tracking-wide uppercase">
          A story for {childName}
        </p>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Badge
            variant="outline"
            className="text-xs"
            style={{ borderColor: `hsl(${theme.accentHsl} / 0.4)`, color: `hsl(${theme.accentHsl})` }}
          >
            {tone}
          </Badge>
          {interests.slice(0, 3).map((i) => (
            <Badge key={i} variant="secondary" className="text-xs capitalize">{i}</Badge>
          ))}
        </motion.div>

        {/* Emoji accent */}
        <motion.p
          className="text-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {theme.coverEmoji}
        </motion.p>

        {dedication && (
          <motion.p
            className="text-xs text-muted-foreground/60 pt-1 max-w-sm mx-auto italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            "{dedication}"
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default StoryCoverCard;
