import { motion } from "framer-motion";

const steps = [
  {
    emoji: "📝",
    number: "1",
    title: "Tell us about your child",
    description: "Add their name, age, interests, and a few favorite things.",
  },
  {
    emoji: "✨",
    number: "2",
    title: "We shape the story around them",
    description: "StoryNest builds a world, tone, and adventure that feels personal from the first page.",
  },
  {
    emoji: "📖",
    number: "3",
    title: "Preview, unlock, and keep it",
    description: "See the story first, then unlock the full book when it feels right.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
        How It Works
      </h2>
      <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">
        Three simple steps to create a story your child will never forget.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative rounded-2xl bg-card shadow-soft-sm p-6 lg:p-8 text-center"
          >
            <span className="text-3xl lg:text-4xl mb-4 block">{step.emoji}</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold mb-3">
              {step.number}
            </span>
            <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
