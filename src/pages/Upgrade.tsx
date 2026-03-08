import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { hasOnboardingData } from "@/lib/guards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    highlight: false,
    features: [
      { text: "3-page story preview", included: true },
      { text: "Basic personalization", included: true },
      { text: "Watermarked pages", included: true },
      { text: "Full story", included: false },
      { text: "All illustrations", included: false },
      { text: "Downloadable PDF", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    highlight: true,
    features: [
      { text: "Full 6-page story", included: true },
      { text: "Deep personalization", included: true },
      { text: "No watermark", included: true },
      { text: "All illustrations", included: true },
      { text: "Downloadable digital book", included: true },
      { text: "Edit & re-generate", included: true },
    ],
  },
];

const Upgrade = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Unlock the Full Story</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            You've seen a preview — upgrade to get the complete personalised book.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative overflow-hidden",
                plan.highlight
                  ? "border-2 border-primary shadow-md"
                  : "border border-border"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                  Recommended
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-3xl font-extrabold text-foreground mt-1">{plan.price}</p>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2 text-sm">
                      {f.included ? (
                        <Check size={14} className="text-primary shrink-0" />
                      ) : (
                        <X size={14} className="text-muted-foreground/40 shrink-0" />
                      )}
                      <span className={cn(!f.included && "text-muted-foreground/50")}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                {plan.highlight ? (
                  <Button className="w-full" onClick={() => navigate("/checkout")}>
                    Unlock Now
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => navigate("/preview")}>
                    Continue Free
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-3">
          <p className="text-xs text-muted-foreground">
            Instant digital delivery. Preview first, unlock when ready.
          </p>
          <Link to="/preview" className="text-sm text-muted-foreground hover:text-foreground underline">
            Back to Preview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
