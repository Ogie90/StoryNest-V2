import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://storynest.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/example", "/terms", "/privacy"],
        disallow: [
          "/auth",
          "/onboarding",
          "/generating",
          "/preview",
          "/edit",
          "/book",
          "/library",
          "/profiles",
          "/new-story",
          "/upgrade",
          "/checkout",
          "/success",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
