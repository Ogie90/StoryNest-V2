import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProductShowcase from "@/components/landing/ProductShowcase";
import WhyDifferent from "@/components/landing/WhyDifferent";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <WhyDifferent />
      <HowItWorks />
      <Testimonials />
      <PricingSection />

      {/* Final CTA */}
      <section id="final-cta" className="py-16 lg:py-24 bg-muted/50 text-center">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to Create Their Story?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            It only takes a few minutes to build a story your child will treasure forever.
          </p>
          <Button size="lg" className="rounded-full px-10 text-base">
            Start Creating
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
