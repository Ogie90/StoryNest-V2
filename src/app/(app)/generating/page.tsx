import { Suspense } from "react";
import StoryGenerating from "@/routes/StoryGenerating";

export default function GeneratingPage() {
  return (
    <Suspense>
      <StoryGenerating />
    </Suspense>
  );
}
