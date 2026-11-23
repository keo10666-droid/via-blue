import type { MetadataRoute } from "next";
import { tourList } from "@/data/tours";
import { transfers } from "@/data/transfers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.viabluetours.com";
  const locales = ["en", "de", "fr", "ro", "ru"] as const;
  type Locale = (typeof locales)[number];

  // Publish every localized canonical URL as its own sitemap entry.
  // Each entry carries the complete reciprocal hreflang set.
  const localizedEntries = (
    path: string,
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>,
    priority: number,
  ): MetadataRoute.Sitemap => {
    const localizedPath = (locale: Locale) =>
      locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;

    const languages = {
      en: `${baseUrl}${localizedPath("en")}`,
      de: `${baseUrl}${localizedPath("de")}`,
      fr: `${baseUrl}${localizedPath("fr")}`,
      ro: `${baseUrl}${localizedPath("ro")}`,
      ru: `${baseUrl}${localizedPath("ru")}`,
      "x-default": `${baseUrl}${localizedPath("en")}`,
    };

    return locales.map((locale) => ({
      url: `${baseUrl}${localizedPath(locale)}`,
      alternates: { languages },
      changeFrequency,
      priority,
    }));
  };

  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries("/", "weekly", 1),
    ...localizedEntries("/tours", "weekly", 0.9),
    ...localizedEntries("/transfers", "weekly", 0.9),
    ...localizedEntries("/about", "monthly", 0.6),
    ...localizedEntries("/contact", "monthly", 0.6),
    ...localizedEntries("/luxury-tours", "weekly", 0.7),
    ...localizedEntries("/ai-trip-planner", "monthly", 0.7),
    ...localizedEntries("/sim-card", "monthly", 0.5),
    ...localizedEntries("/things-to-do-in-hurghada", "monthly", 0.85),
  ];

  const tourPages: MetadataRoute.Sitemap = tourList
    .filter((tour) => tour.available)
    .flatMap((tour) => localizedEntries(`/tours/${tour.slug}`, "weekly", 0.8));

  const transferPages: MetadataRoute.Sitemap = Object.values(transfers)
    .filter((transfer) => transfer.available)
    .flatMap((transfer) => localizedEntries(`/transfers/${transfer.slug}`, "monthly", 0.7));

  const luxurySlugs = [
    "luxor",
    "cairo",
    "alexandria",
    "aswan",
    "speed-boat",
    "quad-safari",
    "buggy-safari",
    "private-boat",
  ];

  const luxuryPages: MetadataRoute.Sitemap = luxurySlugs.flatMap((slug) =>
    localizedEntries(`/luxury-tours/${slug}`, "monthly", 0.7),
  );

  return [...staticPages, ...tourPages, ...transferPages, ...luxuryPages];
}
