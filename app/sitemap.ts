import type { MetadataRoute } from "next";
import { tourList } from "@/data/tours";
import { transfers } from "@/data/transfers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.viabluetours.com";
  const localeAlternates = (path: string) => ({ alternates: { languages: { en: `${baseUrl}${path}`, de: `${baseUrl}/de${path}`, fr: `${baseUrl}/fr${path}`, ro: `${baseUrl}/ro${path}`, ru: `${baseUrl}/ru${path}`, "x-default": `${baseUrl}${path}` } } });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      ...localeAlternates(""),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tours`,
      ...localeAlternates("/tours"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transfers`,
      ...localeAlternates("/transfers"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      ...localeAlternates("/about"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      ...localeAlternates("/contact"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/luxury-tours`,
      ...localeAlternates("/luxury-tours"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ai-trip-planner`,
      ...localeAlternates("/ai-trip-planner"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sim-card`,
      ...localeAlternates("/sim-card"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const tourPages: MetadataRoute.Sitemap = tourList
    .filter((tour) => tour.available)
    .map((tour) => ({
      url: `${baseUrl}/tours/${tour.slug}`,
      ...localeAlternates(`/tours/${tour.slug}`),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const transferPages: MetadataRoute.Sitemap = Object.values(transfers)
    .filter((transfer) => transfer.available)
    .map((transfer) => ({
      url: `${baseUrl}/transfers/${transfer.slug}`,
      ...localeAlternates(`/transfers/${transfer.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

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

  const luxuryPages: MetadataRoute.Sitemap = luxurySlugs.map((slug) => ({
    url: `${baseUrl}/luxury-tours/${slug}`,
    ...localeAlternates(`/luxury-tours/${slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...tourPages,
    ...transferPages,
    ...luxuryPages,
  ];
}