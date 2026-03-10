import { Suspense } from "react";
import StoryPreview from "@/routes/StoryPreview";

export default function PreviewPage() {
  return (
    <Suspense>
      <StoryPreview />
    </Suspense>
  );
}
