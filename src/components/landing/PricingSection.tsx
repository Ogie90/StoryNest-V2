import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    subtitle: "Preview your story",
    price: "$0",
    cta: "Start Free",
    highlight: false,
    features: [
      "1 story preview",
      "Limited pages",
      "Basic personalization",
    ],
  },
  {
    name: "Pro",
    subtitle: "Unlock the full book",
    price: "$9.99",
    cta: "Unlock Full Book",
    highlight: true,
    features: [
      "Full story",
      "Full illustrated pages",
      "Downloadable digital book",
      "No watermark",
    ],
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-3">
        Simple Pricing for Personalized Stories
      </h2>
      <p className="text-muted-foreground text-center max-w-lg mx-auto mb-4">
        Create a preview for free, then unlock the full book when you're ready to keep it.
      </p>

      {/* Value row */}
      <p className="text-xs text-muted-foreground/70 text-center mb-12">
        Every book includes: personalized pages · custom story world · downloadable format
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative overflow-hidden rounded-2xl transition-shadow duration-300",
              plan.highlight
                ? "border-2 border-primary shadow-soft"
                : "border border-border shadow-soft-sm"
            )}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                Makes a thoughtful gift
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
              <p className="text-3xl font-extrabold text-foreground mt-2">{plan.price}</p>
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "w-full rounded-full",
                  !plan.highlight && "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
