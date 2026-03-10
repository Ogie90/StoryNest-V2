import { Suspense } from "react";
import Checkout from "@/routes/Checkout";

export default function CheckoutPage() {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
}
