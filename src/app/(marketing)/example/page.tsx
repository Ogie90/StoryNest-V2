import type { Metadata } from "next";
import ExampleStory from "@/routes/ExampleStory";

export const metadata: Metadata = {
  title: "Example Story — StoryNest",
  description:
    "See what a personalized StoryNest storybook looks like. Every detail is shaped by your child's name, age, and interests.",
  openGraph: {
    title: "Example Story — StoryNest",
    description:
      "See what a personalized StoryNest storybook looks like. Every detail is shaped by your child's name, age, and interests.",
    images: ["/og-image.png"],
  },
};

export default function ExamplePage() {
  return <ExampleStory />;
}
