import { Suspense } from "react";
import PaymentSuccess from "@/routes/PaymentSuccess";

export default function SuccessPage() {
  return (
    <Suspense>
      <PaymentSuccess />
    </Suspense>
  );
}
