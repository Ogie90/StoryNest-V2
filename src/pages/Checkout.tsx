import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { hasOnboardingData } from "@/lib/guards";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, AlertTriangle } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    if (!hasOnboardingData()) {
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  const isValid = name.trim() && card.trim() && expiry.trim() && cvc.trim();

  const handlePurchase = () => {
    localStorage.setItem("storynest-purchased", "true");
    navigate("/success", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Demo banner */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3">
          <AlertTriangle size={16} className="text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            This is a <strong>demo checkout</strong> — no real payment will be processed.
          </p>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
          <p className="text-sm text-muted-foreground">Complete your purchase</p>
        </div>

        {/* Order summary */}
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-foreground text-sm">StoryNest Pro</p>
              <p className="text-xs text-muted-foreground">Full personalised book</p>
            </div>
            <p className="text-lg font-bold text-foreground">$9.99</p>
          </CardContent>
        </Card>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name-on-card">Name on card</Label>
            <Input id="name-on-card" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-number">Card number</Label>
            <Input id="card-number" value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" />
            </div>
          </div>
        </div>

        <Button className="w-full" disabled={!isValid} onClick={handlePurchase}>
          Complete Purchase
        </Button>

        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Lock size={12} />
          <span>Secure checkout (demo)</span>
        </div>

        <div className="text-center">
          <Link to="/upgrade" className="text-sm text-muted-foreground hover:text-foreground underline">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
