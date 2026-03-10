import { Suspense } from "react";
import Book from "@/routes/Book";

export default function BookPage() {
  return (
    <Suspense>
      <Book />
    </Suspense>
  );
}
