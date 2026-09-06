import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://viabluetours.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/login/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}