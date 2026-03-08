import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "This was the first time a personalized book actually felt like it was made for my daughter, not just printed with her name.",
    name: "Sarah L.",
    context: "Parent of a 5-year-old fairy lover",
  },
  {
    quote: "The dinosaur story instantly felt more 'him' than anything else we had tried. He asks for it every single night.",
    name: "James P.",
    context: "Dad of a 6-year-old explorer",
  },
  {
    quote: "We've tried other personalized books — this is the first one that actually felt like a real story, not a template.",
    name: "Rachel K.",
    context: "Mom of a 4-year-old animal lover",
  },
];

const StarRating = () => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const Testimonials = () => (
  <section className="py-16 lg:py-24 bg-muted/40">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
        What Parents Are Saying
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {testimonials.map((t) => (
          <Card key={t.name} className="border-0 shadow-soft-sm rounded-2xl">
            <CardContent className="pt-6 pb-6">
              <StarRating />
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-5">
                "{t.quote}"
              </p>
              <div>
                <span className="text-sm font-semibold text-foreground block">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.context}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
