import { Shuffle, SkipBack, Play, SkipForward, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlaybackControls = () => (
  <div className="flex items-center justify-center gap-4">
    <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground">
      <Shuffle size={16} />
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground">
      <SkipBack size={18} />
    </Button>
    <Button
      size="icon"
      className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-soft-sm hover:bg-primary/90 animate-pulse-soft"
    >
      <Play size={20} fill="currentColor" />
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground">
      <SkipForward size={18} />
    </Button>
    <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground">
      <Heart size={16} />
    </Button>
  </div>
);

export default PlaybackControls;
