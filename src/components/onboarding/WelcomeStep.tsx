import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Clock, User, Sparkles, BookOpen } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

const bullets = [
  { icon: User, text: "Share a few details — name, age, and what they love." },
  { icon: Clock, text: "It only takes 2–3 minutes to complete." },
  { icon: Sparkles, text: "We'll craft a one-of-a-kind story just for them." },
];

const WelcomeStep = ({ onNext }: WelcomeStepProps) => (
  <Card className="border-0 shadow-soft overflow-hidden">
    <CardContent className="p-0">
      {/* Hero area */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 px-8 pt-10 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 mb-5">
          <BookOpen size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground leading-tight mb-2">
          Let's Create a Story<br />Just for Your Child
        </h1>
        <p className="text-muted-foreground text-sm">
          Here's what to expect:
        </p>
      </div>

      {/* Bullets */}
      <div className="px-8 py-8">
        <div className="flex flex-col gap-4 mb-8">
          {bullets.map((b, i) => (
            <div key={b.text} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <b.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={onNext} size="lg" className="rounded-full px-10 text-base w-full">
          Let's Begin
        </Button>

        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </CardContent>
  </Card>
);

export default WelcomeStep;
