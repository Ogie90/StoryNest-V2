import type { Metadata } from "next";
import { Suspense } from "react";
import Auth from "@/routes/Auth";

export const metadata: Metadata = {
  title: "Sign In — StoryNest",
  description: "Sign in or create an account to start making personalized storybooks.",
  robots: { index: false },
};

export default function AuthPage() {
  return (
    <Suspense>
      <Auth />
    </Suspense>
  );
}
