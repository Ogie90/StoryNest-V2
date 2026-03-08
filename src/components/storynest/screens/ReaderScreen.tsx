import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReaderToolbar from "../ReaderToolbar";

const ReaderScreen = () => (
  <div className="h-full flex flex-col bg-dark-story">
    {/* Dark illustrated header */}
    <div className="relative h-[280px] shrink-0 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1440581572325-0bea30075d9d?w=640&h=560&fit=crop&crop=center"
        alt="Magical forest scene"
        className="w-full h-full object-cover opacity-70"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-story/40 via-transparent to-dark-story/90" />

      {/* Glowing firefly accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary/80 blur-sm animate-pulse-soft" />
      <div className="absolute top-[45%] left-[55%] w-2 h-2 rounded-full bg-accent-blue/60 blur-[2px] animate-pulse-soft" style={{ animationDelay: "0.5s" }} />

      {/* Top controls */}
      <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-5">
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-primary-foreground hover:bg-primary-foreground/10">
          <ArrowLeft size={18} />
        </Button>
        {/* Audio/Text toggle */}
        <div className="flex bg-primary-foreground/15 rounded-full p-0.5 backdrop-blur-sm">
          <button className="px-4 py-1 rounded-full text-[12px] font-semibold text-primary-foreground bg-primary-foreground/20 transition-all">
            Audio
          </button>
          <button className="px-4 py-1 rounded-full text-[12px] font-medium text-primary-foreground/60 hover:text-primary-foreground transition-all">
            Text
          </button>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-primary-foreground hover:bg-primary-foreground/10">
          <Settings size={18} />
        </Button>
      </div>
    </div>

    {/* White reading panel */}
    <div className="flex-1 bg-card rounded-t-[28px] -mt-6 relative z-10 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-2">
        <h3 className="text-lg font-bold text-foreground mb-3">Chapter 1</h3>
        <p className="text-[14px] text-muted-foreground leading-[1.8]">
          The morning mist curled through the valleys like a sleepy dragon's breath, carrying with it the scent
          of pine needles and wild honey. Young Mira stood at the edge of the ancient forest, her heart
          drumming with a mixture of excitement and wonder.{" "}
          <span className="bg-secondary/40 text-foreground px-1 rounded">
            She had heard the stories — of the silver leopard that watched over the mountain children
          </span>
          , guiding them through the enchanted pathways that only appeared under the light of a crescent moon.
          Today was the day she would find out if the legends were true.
        </p>
      </div>

      {/* Reader toolbar */}
      <div className="border-t border-border shrink-0">
        <ReaderToolbar />
      </div>
    </div>
  </div>
);

export default ReaderScreen;
