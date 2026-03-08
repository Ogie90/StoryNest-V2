import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-32 text-center">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight max-w-3xl mx-auto">
          Your Child Becomes the Hero of Their Own Story
        </h1>
        <p className="mt-5 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Truly personalized stories built around your child's interests, personality, and world — not just a name swap.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => navigate("/onboarding")} size="lg" className="rounded-full px-8 text-base">
            Start Creating
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
            <Link to="/example">See an Example</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
