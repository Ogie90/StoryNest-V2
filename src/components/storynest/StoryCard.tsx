import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  title: string;
  image: string;
  chapters: number;
  className?: string;
  size?: "sm" | "lg";
}

const StoryCard = ({ title, image, chapters, className, size = "sm" }: StoryCardProps) => (
  <div
    className={cn(
      "relative rounded-3xl overflow-hidden shadow-soft-sm shrink-0 transition-transform duration-200 hover:scale-[1.03] cursor-pointer",
      size === "sm" ? "w-[140px] h-[190px]" : "w-full h-[160px]",
      className
    )}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3">
      <p className="text-[13px] font-semibold text-primary-foreground leading-tight line-clamp-2">{title}</p>
    </div>
    <Badge className="absolute top-2 right-2 bg-card/90 text-foreground text-[10px] font-medium border-0 rounded-full px-2 py-0.5 hover:bg-card/90">
      {chapters} Ch
    </Badge>
  </div>
);

export default StoryCard;
