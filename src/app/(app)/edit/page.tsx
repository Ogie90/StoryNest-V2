import { Suspense } from "react";
import StoryEdit from "@/routes/StoryEdit";

export default function EditPage() {
  return (
    <Suspense>
      <StoryEdit />
    </Suspense>
  );
}
