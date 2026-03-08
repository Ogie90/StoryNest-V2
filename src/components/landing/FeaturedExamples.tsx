import { motion } from "framer-motion";

const examples = [
  {
    title: "Luka and the Lost Dino Egg",
    childName: "Luka",
    world: "Dinosaurs",
    emoji: "🦕",
    gradient: "from-emerald-200/70 to-amber-100/50",
    rotation: "-rotate-2",
    offset: "mt-0",
  },
  {
    title: "Leo's Starlit Rocket Quest",
    childName: "Leo",
    world: "Space",
    emoji: "🚀",
    gradient: "from-indigo-200/70 to-violet-100/50",
    rotation: "rotate-1",
    offset: "mt-6 lg:mt-8",
  },
  {
    title: "Ella and the Enchanted Glen",
    childName: "Ella",
    world: "Fairies",
    emoji: "🧚",
    gradient: "from-purple-200/60 to-fuchsia-100/40",
    rotation: "-rotate-1",
    offset: "mt-2 lg:mt-3",
  },
  {
    title: "Noah and the Coral Path",
    childName: "Noah",
    world: "Ocean",
    emoji: "🐬",
    gradient: "from-cyan-200/70 to-blue-100/50",
    rotation: "rotate-2",
    offset: "mt-4 lg:mt-10",
  },
];

const FeaturedExamples = () => (
  <section className="py-16 lg:py-24 bg-muted/30">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-3">
        Stories Built for Real Kids
      </h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12 leading-relaxed">
        A few examples of how StoryNest turns a child's interests into a story that feels personal from the very first page.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
        {examples.map((ex, i) => (
          <motion.div
            key={ex.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={ex.offset}
          >
            <div
              className={`relative aspect-[3/4] rounded-2xl bg-gradient-to-br ${ex.gradient} ${ex.rotation} shadow-soft hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.03] overflow-hidden flex flex-col items-center justify-between p-5 lg:p-6`}
            >
              {/* Decorative blur */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/20 blur-2xl" />

              {/* World label */}
              <span className="relative z-10 text-[10px] lg:text-xs font-semibold text-foreground/70 bg-white/40 backdrop-blur-sm rounded-full px-3 py-1">
                {ex.world}
              </span>

              {/* Emoji */}
              <span className="relative z-10 text-4xl lg:text-5xl my-auto">
                {ex.emoji}
              </span>

              {/* Title & subtitle */}
              <div className="relative z-10 text-center">
                <h3 className="text-xs lg:text-sm font-bold text-foreground leading-snug mb-1">
                  {ex.title}
                </h3>
                <p className="text-[10px] lg:text-xs text-foreground/60">
                  A story for {ex.childName}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedExamples;
