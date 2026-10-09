import type { MetadataRoute } from "next";
import { tourList } from "@/data/tours";
import { transfers } from "@/data/transfers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://viabluetours.com";
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transfers`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/luxury-tours`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ai-trip-planner`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const tourPages: MetadataRoute.Sitemap = tourList
    .filter((tour) => tour.available)
    .map((tour) => ({
      url: `${baseUrl}/tours/${tour.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const transferPages: MetadataRoute.Sitemap = Object.values(transfers)
    .filter((transfer) => transfer.available)
    .map((transfer) => ({
      url: `${baseUrl}/transfers/${transfer.slug}`,
      lastModified,
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
    lastModified,
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