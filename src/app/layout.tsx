import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://storynest.app"
  ),
  title: "StoryNest — Personalized Children's Storybooks",
  description:
    "StoryNest creates magical personalized storybooks where your child becomes the true protagonist. Custom stories built around their identity, interests, and world.",
  openGraph: {
    title: "StoryNest — Personalized Children's Storybooks",
    description: "Magical personalized storybooks where every child is the hero.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@StoryNest",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body style={{ fontFamily: "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
