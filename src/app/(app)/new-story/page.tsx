import { Suspense } from "react";
import NewStory from "@/routes/NewStory";

export default function NewStoryPage() {
  return (
    <Suspense>
      <NewStory />
    </Suspense>
  );
}
