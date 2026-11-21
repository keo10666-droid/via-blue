import type { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getLocalizedAlternates("/luxury-tours");
  return {
  title: "Private Luxury Tours in Egypt | Via Blue",
  description: "Explore private Egypt experiences from Hurghada, including Luxor and Cairo tours, Red Sea boat charters and private desert adventures.",
  alternates,
  openGraph: { title: "Private Luxury Tours in Egypt | Via Blue", description: "Discover exclusive private tours and premium experiences from Hurghada with Via Blue.", url: alternates.canonical, siteName: "Via Blue", type: "website", locale: "en_US" },
};
}

export default function LuxuryToursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}