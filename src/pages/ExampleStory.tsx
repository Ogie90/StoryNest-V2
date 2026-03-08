import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Sparkles, Heart, Palette, Globe, ChevronRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const fallbackProfile = {
  name: "Mira",
  age: 6,
  interests: ["Snow leopards", "Mountains", "Stargazing"],
  favoriteThings: "",
};

const getProfile = () => {
  try {
    const saved = localStorage.getItem("storynest-child-profile");
    if (saved) {
      const p = JSON.parse(saved);
      if (p.name) return p;
    }
  } catch {}
  return null;
};

const samplePages = [
  {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop&crop=center",
    text: "High in the misty mountains, a curious girl named Mira discovered a snow leopard cub with eyes like starlight.",
  },
  {
    image: "https://images.unsplash.com/photo-1440581572325-0bea30075d9d?w=600&h=400&fit=crop&crop=center",
    text: "Together, they followed a hidden trail through the ancient forest, where fireflies danced like tiny lanterns in the dark.",
  },
  {
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop&crop=center",
    text: "That night, Mira and the cub lay beneath the stars. She whispered the names of constellations her grandmother had taught her.",
  },
];

const personalizations = [
  { icon: Sparkles, label: "Character named after your child", detail: "Mira is the hero of the story" },
  { icon: Heart, label: "Built around real interests", detail: "Snow leopards & mountains woven into the plot" },
  { icon: Globe, label: "Familiar world details", detail: "Stargazing hobby becomes a story moment" },
  { icon: Palette, label: "Illustrations that match", detail: "Visuals reflect the child's world and feel" },
];

const ExampleStory = () => {
  const savedProfile = useMemo(() => getProfile(), []);
  const profile = savedProfile || fallbackProfile;
  const childName = profile.name;
  const isPersonalized = !!savedProfile;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-5 lg:px-8 pt-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-8 pb-12 text-center">
        <Badge variant="secondary" className="rounded-full px-4 py-1 mb-4 bg-accent-lavender/30 border-0 text-foreground">
          Example Story
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground leading-tight mb-3">
          The Child and the Snow Leopard
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          See what a personalized StoryNest book looks like — crafted for a child named Mira who loves snow leopards and stargazing.
        </p>
      </section>

      {/* Sample child profile */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-12">
        <Card className="border-0 shadow-soft overflow-hidden">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-5">
            <Avatar className="w-20 h-20 ring-4 ring-primary/20 shrink-0">
              <AvatarImage src={sampleProfile.avatar} alt={sampleProfile.name} />
              <AvatarFallback className="bg-accent-lavender text-foreground text-xl">M</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold text-foreground">
                {sampleProfile.name}, age {sampleProfile.age}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 mb-3">Here's the profile used to generate this story:</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {sampleProfile.interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs bg-primary/10 text-foreground border-0"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sample cover */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden shadow-soft max-w-md mx-auto aspect-[3/4]">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=640&h=860&fit=crop&crop=center"
            alt="Story cover — The Child and the Snow Leopard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs text-primary-foreground/70 font-medium uppercase tracking-wider mb-1">
              A StoryNest Original
            </p>
            <h3 className="text-2xl font-bold text-primary-foreground leading-tight">
              The Child and the Snow Leopard
            </h3>
            <p className="text-sm text-primary-foreground/80 mt-1">A story made just for Mira</p>
          </div>
        </div>
      </section>

      {/* Sample illustrated pages */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-foreground text-center mb-8">Sample Pages</h2>
        <div className="flex flex-col gap-8">
          {samplePages.map((page, i) => (
            <Card key={i} className="border-0 shadow-soft-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <img
                  src={page.image}
                  alt={`Page ${i + 1} illustration`}
                  className="w-full h-56 md:h-full object-cover"
                  loading="lazy"
                />
                <CardContent className="p-6 flex items-center">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Page {i + 1}
                    </span>
                    <p className="text-base text-foreground leading-relaxed mt-2">{page.text}</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How personalization works */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground text-center mb-4">
            How We Personalized This Story
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-10">
            Every detail in Mira's story was shaped by her profile. Here's how it works:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {personalizations.map((p) => (
              <Card key={p.label} className="border-0 shadow-soft-sm">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <p.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{p.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Create a Story for Your Child
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            It takes just a few minutes. Tell us about your child and we'll craft something magical.
          </p>
          <Button size="lg" className="rounded-full px-10 text-base gap-2">
            Start Creating
            <ChevronRight size={18} />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExampleStory;
