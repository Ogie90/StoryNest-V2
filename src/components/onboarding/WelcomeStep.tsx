import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, User, Sparkles } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

const bullets = [
  { icon: User, text: "You'll share a few details about your child — name, age, and interests." },
  { icon: Clock, text: "It only takes about 2–3 minutes to complete." },
  { icon: Sparkles, text: "We'll use this to craft a one-of-a-kind story just for them." },
];

const WelcomeStep = ({ onNext }: WelcomeStepProps) => (
  <Card className="border-0 shadow-soft">
    <CardContent className="p-8 text-center">
      <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground leading-tight mb-3">
        Let's Create a Story Just for Your Child
      </h1>
      <p className="text-muted-foreground mb-8">
        Before we begin, here's what to expect:
      </p>

      <div className="flex flex-col gap-4 text-left mb-10">
        {bullets.map((b) => (
          <div key={b.text} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <b.icon size={18} className="text-primary" />
            </div>
            <p className="text-sm text-foreground leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>

      <Button onClick={onNext} size="lg" className="rounded-full px-10 text-base w-full sm:w-auto">
        Let's Begin
      </Button>

      <p className="mt-4">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Maybe Later
        </Link>
      </p>
    </CardContent>
  </Card>
);

export default WelcomeStep;
