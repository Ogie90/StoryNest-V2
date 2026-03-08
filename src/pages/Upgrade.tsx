import { useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { hasOnboardingData } from "@/lib/guards";
import { getStoryById, saveStory } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, BookOpen, Star, Shield, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free Preview",
    price: "$0",
    desc: "See what we can create",
    highlight: false,
    features: [
      { text: "3-page story preview", included: true },
      { text: "Basic personalization", included: true },
      { text: "Watermarked pages", included: true },
      { text: "Full story (6+ pages)", included: false },
      { text: "All illustrations", included: false },
      { text: "Downloadable PDF", included: false },
    ],
  },
  {
    name: "Full Story",
    price: "$9.99",
    desc: "One-time purchase, yours forever",
    highlight: true,
    features: [
      { text: "Full 6-page personalised story", included: true },
      { text: "Deep personalization with photos", included: true },
      { text: "No watermark", included: true },
      { text: "Beautiful illustrations", included: true },
      { text: "Downloadable digital book", included: true },
      { text: "Edit & re-generate anytime", included: true },
    ],
  },
];

const testimonials = [
  { text: "My daughter asks for her story every bedtime now!", author: "Sarah M.", stars: 5 },
  { text: "The personalization is incredible. He was so excited to see himself in the story.", author: "David K.", stars: 5 },
];

const Upgrade = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("story");
  const storyParam = storyId ? `?story=${storyId}` : "";

  useEffect(() => {
    if (!storyId && !hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate, storyId]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-5 pt-6">
        <Link
          to={`/preview${storyParam}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to Preview
        </Link>
      </div>

      <div className="flex items-center justify-center px-5 py-8 sm:py-12">
        <div className="w-full max-w-3xl space-y-10">
          {/* Hero */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mx-auto mb-2">
              <Sparkles size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Unlock the Full Story
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              You've seen a taste — now get the complete personalised book with all pages, illustrations, and no watermarks.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative overflow-hidden transition-all duration-200",
                  plan.highlight
                    ? "border-2 border-primary shadow-lg scale-[1.02] sm:scale-105"
                    : "border border-border"
                )}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold text-center py-1.5">
                    ✨ Most Popular
                  </div>
                )}
                <CardContent className={cn("p-6", plan.highlight && "pt-10")}>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.desc}</p>
                  </div>
                  <p className="text-4xl font-extrabold text-foreground mb-1">{plan.price}</p>
                  {plan.highlight && (
                    <p className="text-xs text-muted-foreground mb-4">per story · one-time</p>
                  )}
                  {!plan.highlight && <div className="mb-4" />}

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2.5 text-sm">
                        {f.included ? (
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Check size={12} className="text-primary" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                            <X size={12} className="text-muted-foreground/40" />
                          </div>
                        )}
                        <span className={cn(!f.included && "text-muted-foreground/50")}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.highlight ? (
                    <Button
                      className="w-full rounded-full text-base h-12 gap-2"
                      onClick={() => navigate(`/checkout${storyParam}`)}
                    >
                      <BookOpen size={18} /> Unlock Full Story
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full rounded-full h-11"
                      onClick={() => navigate(`/preview${storyParam}`)}
                    >
                      Continue with Preview
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social proof */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield size={14} />
              <span>Trusted by 2,000+ parents</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-2">"{t.text}"</p>
                  <p className="text-xs text-muted-foreground">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust footer */}
          <div className="text-center space-y-2 pb-8">
            <p className="text-xs text-muted-foreground">
              Instant digital delivery · 100% satisfaction guaranteed · Secure payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
