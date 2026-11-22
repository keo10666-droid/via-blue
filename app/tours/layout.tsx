import type { Metadata } from "next";
import { getLocalizedSeo } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/tours");
  return {
  title: seo.title,
  description: seo.description,

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

  alternates: seo.alternates,
  openGraph: { title: seo.title,
    description: seo.description,
    url: seo.alternates.canonical,
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