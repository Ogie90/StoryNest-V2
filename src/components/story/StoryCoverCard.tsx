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

  // Full variant
  return (
    <div className={`relative bg-gradient-to-br ${theme.gradient} py-12 px-5`}>
      <div className="max-w-2xl mx-auto text-center space-y-4">
        {/* Initials medallion */}
        <div className="flex justify-center">
          <div
            className="w-14 h-14 rounded-full bg-card flex items-center justify-center text-lg font-bold shadow-sm"
            style={{ border: `3px solid hsl(${theme.accentHsl})`, color: `hsl(${theme.accentHsl})` }}
          >
            {initial}
          </div>
        </div>

        {/* Title area */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <ThemeIcon size={16} className="text-muted-foreground" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
          </div>
          {subtitle && (
            <p className="text-muted-foreground text-sm italic">{subtitle}</p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">Created for {childName}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="text-xs">{tone}</Badge>
          {interests.slice(0, 3).map((i) => (
            <Badge key={i} variant="secondary" className="text-xs capitalize">{i}</Badge>
          ))}
        </div>

        {/* Emoji accent — once, subtle */}
        <p className="text-2xl opacity-40">{theme.coverEmoji}</p>

        {dedication && (
          <p className="text-xs text-muted-foreground/70 pt-1 max-w-md mx-auto">{dedication}</p>
        )}
      </div>
    </div>
  );
};

export default StoryCoverCard;
