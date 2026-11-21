import type { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getLocalizedAlternates("/contact");
  return {
  title: "Contact Via Blue | Hurghada Tours & Transfers",
  description: "Contact Via Blue to plan Hurghada excursions, Red Sea experiences and private airport or hotel transfers in Egypt.",
  alternates,
  openGraph: { title: "Contact Via Blue | Hurghada, Egypt", description: "Get in touch with Via Blue for tours, private transfers and travel assistance in Hurghada and the Red Sea.", url: alternates.canonical, siteName: "Via Blue", type: "website", locale: "en_US" },
};
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}