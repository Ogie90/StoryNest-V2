import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { hasOnboardingData } from "@/lib/guards";
import { getStoryById, saveStory } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, AlertTriangle, ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("story");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!storyId && !hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate, storyId]);

  const isValid = name.trim() && card.trim() && expiry.trim() && cvc.trim();
  const storyParam = storyId ? `?story=${storyId}` : "";

  const handlePurchase = async () => {
    setProcessing(true);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 1500));

    localStorage.setItem("storynest-purchased", "true");
    if (storyId) {
      const story = getStoryById(storyId);
      if (story) {
        saveStory({ ...story, status: "purchased" });
      }
    }
    navigate(`/success${storyParam}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-md mx-auto px-5 pt-6">
        <Link
          to={`/upgrade${storyParam}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to Plans
        </Link>
      </div>

      <div className="flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Demo banner */}
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/50 px-4 py-3">
            <AlertTriangle size={16} className="text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground">
              This is a <strong>demo checkout</strong> — no real payment will be processed.
            </p>
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Complete Your Purchase</h1>
            <p className="text-sm text-muted-foreground">One step away from the full story</p>
          </div>

          {/* Order summary */}
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">StoryNest Full Story</p>
                  <p className="text-xs text-muted-foreground">Complete personalised book</p>
                </div>
              </div>
              <p className="text-xl font-bold text-foreground">$9.99</p>
            </CardContent>
          </Card>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-on-card">Name on card</Label>
              <Input
                id="name-on-card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="h-11"
                disabled={processing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Card number</Label>
              <Input
                id="card-number"
                value={card}
                onChange={(e) => setCard(e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="h-11"
                disabled={processing}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="h-11"
                  disabled={processing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  className="h-11"
                  disabled={processing}
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full rounded-full h-12 text-base gap-2"
            disabled={!isValid || processing}
            onClick={handlePurchase}
          >
            {processing ? (
              <>Processing…</>
            ) : (
              <>
                <Lock size={16} /> Pay $9.99
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} />
              <span>SSL Encrypted</span>
            </div>
            <span>·</span>
            <span>Instant delivery</span>
            <span>·</span>
            <span>Demo only</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
