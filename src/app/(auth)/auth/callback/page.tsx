import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCallback from "@/routes/AuthCallback";

export const metadata: Metadata = {
  title: "Signing In… — StoryNest",
  robots: { index: false },
};

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallback />
    </Suspense>
  );
}
