import { motion } from "framer-motion";

const rows = [
  {
    title: "Not Just a Name Swap",
    body: "Most personalized books simply drop a child's name into a fixed story. StoryNest builds the story around who they are — their interests, tone, and world.",
    visual: "before-after",
  },
  {
    title: "Built Around What They Love",
    body: "A child who loves dinosaurs should get a dinosaur adventure. A child who loves fairies should step into a magical forest. The story starts where their imagination already lives.",
    visual: "interest-chips",
  },
  {
    title: "A Story That Feels Made for Them",
    body: "From the cover to the themes and pacing, every part of the experience is shaped to feel more personal, more memorable, and more worth keeping.",
    visual: "mini-cover",
  },
];

const BeforeAfterVisual = () => (
  <div className="rounded-2xl bg-gradient-to-br from-muted/60 to-muted/30 p-6 lg:p-8 space-y-4">
    <div className="rounded-xl bg-card/80 p-4 border border-border/50">
      <p className="text-xs text-muted-foreground/60 font-medium mb-1">Generic</p>
      <p className="text-sm text-muted-foreground italic">"Emma went to the park and found a surprise."</p>
    </div>
    <div className="rounded-xl bg-gradient-to-br from-primary/8 to-accent-lavender/10 p-4 border border-primary/20">
      <p className="text-xs text-primary font-medium mb-1">StoryNest</p>
      <p className="text-sm text-foreground italic">"Emma followed snow leopard tracks up the misty mountain, clutching her favorite blue scarf."</p>
    </div>
  </div>
);

const InterestChipsVisual = () => (
  <div className="rounded-2xl bg-gradient-to-br from-primary/6 to-accent-lavender/10 p-6 lg:p-8 flex flex-wrap items-center justify-center gap-3">
    {[
      { emoji: "🦕", name: "Dinosaurs", gradient: "from-emerald-200/60 to-amber-100/50" },
      { emoji: "🧚", name: "Fairies", gradient: "from-purple-200/50 to-fuchsia-100/40" },
      { emoji: "🚀", name: "Space", gradient: "from-indigo-200/60 to-violet-100/50" },
      { emoji: "🐬", name: "Ocean", gradient: "from-cyan-200/60 to-blue-100/50" },
    ].map((chip) => (
      <div
        key={chip.name}
        className={`flex items-center gap-2 rounded-xl bg-gradient-to-br ${chip.gradient} px-4 py-2.5 shadow-soft-sm`}
      >
        <span className="text-lg">{chip.emoji}</span>
        <span className="text-xs font-semibold text-foreground">{chip.name}</span>
      </div>
    ))}
  </div>
);

const MiniCoverVisual = () => (
  <div className="flex justify-center">
    <div className="w-40 lg:w-48 aspect-[3/4] rounded-2xl bg-gradient-to-br from-violet-200/60 to-indigo-100/50 shadow-soft rotate-2 flex flex-col items-center justify-between p-5 relative overflow-hidden">
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/20 blur-xl" />
      <span className="relative z-10 text-[10px] font-semibold text-foreground/70 bg-white/40 backdrop-blur-sm rounded-full px-2.5 py-0.5">
        Magic
      </span>
      <span className="relative z-10 text-3xl lg:text-4xl">✨</span>
      <div className="relative z-10 text-center">
        <p className="text-xs font-bold text-foreground leading-snug">The Starlight Tower</p>
        <p className="text-[9px] text-foreground/60 mt-0.5">A story for Zara</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />
    </div>
  </div>
);

const visuals: Record<string, () => JSX.Element> = {
  "before-after": BeforeAfterVisual,
  "interest-chips": InterestChipsVisual,
  "mini-cover": MiniCoverVisual,
};

const WhyDifferent = () => (
  <section id="why-different" className="py-16 lg:py-24 bg-muted/40">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
        Why StoryNest Is Different
      </h2>
      <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
        We don't just drop a name into a template. We build something truly unique for every child.
      </p>

      <div className="space-y-16 lg:space-y-20">
        {rows.map((row, i) => {
          const Visual = visuals[row.visual];
          const reversed = i % 2 === 1;

          return (
            <motion.div
              key={row.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`}
            >
              <div className="flex-1 text-center lg:text-left max-w-md">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">{row.title}</h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{row.body}</p>
              </div>
              <div className="flex-1 w-full max-w-md">
                <Visual />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyDifferent;
