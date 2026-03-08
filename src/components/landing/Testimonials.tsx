import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    quote:
      "My daughter couldn't believe she was in the story. She keeps asking me to read it every night — it's become her favorite book.",
  },
  {
    name: "James P.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    quote:
      "The level of personalization is incredible. It wasn't just his name — the story actually felt like it was written for him.",
  },
];

const Testimonials = () => (
  <section className="py-16 lg:py-24 bg-muted/50">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
        What Parents Are Saying
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {testimonials.map((t) => (
          <Card key={t.name} className="border-0 shadow-soft-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={t.avatar} alt={t.name} />
                  <AvatarFallback className="bg-accent-lavender text-foreground text-xs">
                    {t.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
