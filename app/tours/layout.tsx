import type { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getLocalizedAlternates("/tours");
  return {
  title: "Hurghada Tours & Excursions",
  description:
    "Discover the best tours and excursions in Hurghada, Egypt. Explore Red Sea boat trips, islands, snorkeling, diving, desert safaris, dolphin experiences and Egypt day tours with Via Blue.",

  keywords: [
    "Hurghada tours",
    "Hurghada excursions",
    "Hurghada activities",
    "Hurghada boat trips",
    "Hurghada snorkeling",
    "Hurghada diving",
    "Hurghada desert safari",
    "Hurghada dolphin tours",
    "Red Sea tours",
    "Egypt excursions",
  ],

  alternates,
  openGraph: {
    title: "Hurghada Tours & Excursions | Via Blue",
    description:
      "Discover the best tours and excursions in Hurghada, Egypt. Explore Red Sea boat trips, islands, snorkeling, diving, desert safaris and unforgettable Egypt experiences with Via Blue.",
    url: alternates.canonical,
    siteName: "Via Blue",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hurghada Tours & Excursions | Via Blue",
    description:
      "Discover the best tours and excursions in Hurghada, Egypt with Via Blue.",
  },
};
}

export default function ToursLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}