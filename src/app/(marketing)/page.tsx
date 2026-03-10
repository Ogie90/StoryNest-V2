import type { Metadata } from "next";
import Index from "@/routes/Index";

export const metadata: Metadata = {
  title: "StoryNest — Personalized Children's Storybooks",
  description:
    "Create a personalized storybook where your child is the hero. Built around their name, interests, and world — not a generic name swap.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "StoryNest — Personalized Children's Storybooks",
    description:
      "Create a personalized storybook where your child is the hero. Built around their name, interests, and world — not a generic name swap.",
    images: ["/og-image.png"],
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function LandingPage() {
  return <Index />;
}
