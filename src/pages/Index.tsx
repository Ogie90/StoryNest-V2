import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StoryWorlds from "@/components/landing/StoryWorlds";
import FeaturedExamples from "@/components/landing/FeaturedExamples";
import WhyDifferent from "@/components/landing/WhyDifferent";
import HowItWorks from "@/components/landing/HowItWorks";
import ValueSummary from "@/components/landing/ValueSummary";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StoryWorlds />
      <FeaturedExamples />
      <WhyDifferent />
      <HowItWorks />
      <ValueSummary />
      <Testimonials />
      <PricingSection />
      <FAQ />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/8 to-accent-lavender/10 text-center">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Create a Story They'll Want to Read Again
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            Start with a few simple details and see how StoryNest turns your child's world into a story worth keeping.
          </p>
          <Button onClick={() => navigate("/onboarding")} size="lg" className="rounded-full px-10 text-base">
            Start Creating
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
