import type { Metadata } from "next";
import Terms from "@/routes/Terms";

export const metadata: Metadata = {
  title: "Terms of Service — StoryNest",
  description: "Read the StoryNest Terms of Service.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return <Terms />;
}
