import { Sparkles, Heart, Globe, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const points = [
  {
    icon: Sparkles,
    title: "Not Just a Name Swap",
    description: "Every story is crafted from scratch around your child — characters, plot, and world included.",
  },
  {
    icon: Heart,
    title: "Based on Real Interests",
    description: "Love dinosaurs? Obsessed with space? We weave their passions into every page.",
  },
  {
    icon: Globe,
    title: "Personalized Around Their World",
    description: "Familiar places, favorite pets, best friends — details that make the story feel like home.",
  },
  {
    icon: Palette,
    title: "Visuals That Feel Like Them",
    description: "Illustrations designed to reflect your child, so they truly see themselves in the story.",
  },
];

const WhyDifferent = () => (
  <section id="why-different" className="py-16 lg:py-24 bg-muted/50">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
        Why StoryNest Is Different
      </h2>
      <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">
        We don't just drop a name into a template. We build something truly unique for every child.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((point) => (
          <Card
            key={point.title}
            className="border-0 shadow-soft-sm hover:shadow-soft transition-shadow duration-300"
          >
            <CardContent className="pt-6">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <point.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default WhyDifferent;
