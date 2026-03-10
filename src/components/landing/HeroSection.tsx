"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative py-16 lg:py-28 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent-lavender/8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight max-w-xl">
              Your Child Becomes the Hero of Their Own Story
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Upload a few details, choose their favorite world, and create a story that feels made just for them — not a generic name swap.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <Button onClick={() => router.push("/onboarding")} size="lg" className="rounded-full px-8 text-base">
                Start Creating
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
                <Link href="/example">See an Example</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground/80">
              Thoughtfully personalized. Easy to create. Ready to treasure.
            </p>
          </motion.div>

          {/* Book mockup column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0 relative w-64 lg:w-80"
          >
            {/* Background decorative cards */}
            <div className="absolute inset-0 -rotate-6 translate-x-3 translate-y-2 rounded-2xl bg-gradient-to-br from-emerald-200/40 to-amber-100/30 shadow-soft-sm" />
            <div className="absolute inset-0 rotate-[4deg] -translate-x-2 translate-y-1 rounded-2xl bg-gradient-to-br from-indigo-200/40 to-violet-100/30 shadow-soft-sm" />

            {/* Main book card */}
            <div className="relative rotate-3 rounded-2xl bg-gradient-to-br from-purple-200/60 to-fuchsia-100/40 shadow-soft overflow-hidden aspect-[3/4] flex flex-col items-center justify-between p-6 lg:p-8">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/15 blur-xl" />

              <span className="relative z-10 text-[10px] lg:text-xs font-semibold text-foreground/70 bg-white/40 backdrop-blur-sm rounded-full px-3 py-1">
                Fairies
              </span>

              <span className="relative z-10 text-5xl lg:text-6xl">🧚</span>

              <div className="relative z-10 text-center">
                <h3 className="text-sm lg:text-base font-bold text-foreground leading-snug">
                  Mila's Moonlight<br />Fairy Garden
                </h3>
                <p className="text-[10px] lg:text-xs text-foreground/60 mt-1">
                  A story for Mila
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
