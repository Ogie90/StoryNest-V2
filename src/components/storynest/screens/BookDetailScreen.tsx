import { ArrowLeft, Bookmark, Eye, Heart, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import PlaybackControls from "../PlaybackControls";

const genres = ["Fantasy", "Fiction", "Mystery"];

const BookDetailScreen = () => (
  <div className="h-full overflow-y-auto bg-gradient-to-b from-card to-muted/50">
    {/* Header */}
    <div className="flex items-center justify-between px-5 pt-2 pb-2">
      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-foreground">
        <ArrowLeft size={18} />
      </Button>
      <span className="text-sm font-semibold text-foreground">Book</span>
      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-foreground">
        <Bookmark size={18} />
      </Button>
    </div>

    {/* Book Cover */}
    <div className="flex justify-center px-5 mb-4">
      <div className="w-[160px] h-[220px] rounded-3xl overflow-hidden shadow-soft">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=320&h=440&fit=crop&crop=center"
          alt="The Child and the Snow Leopard"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    {/* Title */}
    <div className="text-center px-5 mb-4">
      <h2 className="text-base font-bold text-foreground leading-tight">The Child and the Snow Leopard</h2>
      <p className="text-[13px] text-muted-foreground mt-0.5">Whispering Peaks Studio</p>
    </div>

    {/* Audio Slider */}
    <div className="px-6 mb-2">
      <Slider defaultValue={[35]} max={100} step={1} className="w-full" />
      <div className="flex justify-between mt-1">
        <span className="text-[11px] text-muted-foreground">2:34</span>
        <span className="text-[11px] text-muted-foreground">7:12</span>
      </div>
    </div>

    {/* Playback Controls */}
    <div className="mb-4">
      <PlaybackControls />
    </div>

    {/* Genre Tags */}
    <div className="flex justify-center gap-2 px-5 mb-4">
      {genres.map((genre) => (
        <Badge
          key={genre}
          variant="secondary"
          className="rounded-full px-3 py-1 text-[11px] font-medium bg-accent-lavender/30 text-foreground border-0 hover:bg-accent-lavender/40"
        >
          {genre}
        </Badge>
      ))}
    </div>

    {/* Stats */}
    <div className="flex justify-center gap-6 px-5 mb-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Eye size={14} />
        <span className="text-[12px] font-medium">1.2M Read</span>
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Heart size={14} />
        <span className="text-[12px] font-medium">2K Loved</span>
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <BookmarkCheck size={14} />
        <span className="text-[12px] font-medium">22 Saved</span>
      </div>
    </div>

    {/* Description */}
    <div className="px-5 pb-6">
      <p className="text-[13px] text-muted-foreground leading-relaxed">
        High in the misty mountains, a curious child discovers a snow leopard cub with eyes like starlight.
        Together, they embark on a magical journey through ancient forests and frozen peaks,
        learning about courage, kindness, and the wild beauty of the natural world.
      </p>
    </div>
  </div>
);

export default BookDetailScreen;
