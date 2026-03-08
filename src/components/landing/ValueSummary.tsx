import { Check } from "lucide-react";

const items = [
  "Personalized pages featuring your child",
  "Your child as the hero",
  "Story world based on their real interests",
  "Themed visuals and illustrations",
  "Downloadable digital book",
  "Ready in minutes",
];

const ValueSummary = () => (
  <section className="py-16 lg:py-20">
    <div className="max-w-2xl mx-auto px-5 lg:px-8">
      <div className="rounded-2xl border border-border bg-card shadow-soft-sm p-8 lg:p-10">
        <h2 className="text-xl lg:text-2xl font-bold text-foreground text-center mb-8">
          What's Inside Every StoryNest Book
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Check size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ValueSummary;
