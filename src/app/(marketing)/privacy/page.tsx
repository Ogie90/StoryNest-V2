import type { Metadata } from "next";
import Privacy from "@/routes/Privacy";

export const metadata: Metadata = {
  title: "Privacy Policy — StoryNest",
  description: "Read the StoryNest Privacy Policy.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return <Privacy />;
}
