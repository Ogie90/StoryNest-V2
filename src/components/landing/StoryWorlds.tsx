import { motion } from "framer-motion";

const worlds = [
  { name: "Dinosaurs", emoji: "🦕", gradient: "from-emerald-200/60 to-amber-100/50" },
  { name: "Space", emoji: "🚀", gradient: "from-indigo-200/60 to-violet-100/50" },
  { name: "Fairies", emoji: "🧚", gradient: "from-purple-200/50 to-fuchsia-100/40" },
  { name: "Ocean", emoji: "🐬", gradient: "from-cyan-200/60 to-blue-100/50" },
  { name: "Robots", emoji: "🤖", gradient: "from-slate-200/60 to-sky-100/50" },
  { name: "Princesses", emoji: "👑", gradient: "from-pink-200/60 to-rose-100/50" },
  { name: "Animals", emoji: "🦊", gradient: "from-green-200/60 to-lime-100/50" },
  { name: "Magic", emoji: "✨", gradient: "from-violet-200/60 to-indigo-100/50" },
];

const StoryWorlds = () => (
  <section className="py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-3">
        Explore Story Worlds
      </h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10 leading-relaxed">
        From dinosaurs and robots to fairies and ocean adventures, every story begins in a world your child will actually care about.
      </p>

      <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
        {worlds.map((world, i) => (
          <motion.div
            key={world.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`group flex items-center gap-3 rounded-2xl bg-gradient-to-br ${world.gradient} px-5 py-3.5 shadow-soft-sm hover:shadow-soft transition-all duration-300 cursor-default`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {world.emoji}
            </span>
            <span className="text-sm font-semibold text-foreground">{world.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StoryWorlds;
