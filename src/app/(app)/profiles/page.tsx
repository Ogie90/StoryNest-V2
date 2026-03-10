import { Suspense } from "react";
import Profiles from "@/routes/Profiles";

export default function ProfilesPage() {
  return (
    <Suspense>
      <Profiles />
    </Suspense>
  );
}
