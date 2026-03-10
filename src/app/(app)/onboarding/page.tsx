import { Suspense } from "react";
import Onboarding from "@/routes/Onboarding";

export default function OnboardingPage() {
  return (
    <Suspense>
      <Onboarding />
    </Suspense>
  );
}
