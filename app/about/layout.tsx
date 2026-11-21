import type { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getLocalizedAlternates("/about");
  return {
  title: "About Via Blue | Hurghada Tourism & Transfers",
  description: "Meet Via Blue, a Hurghada-based tourism and transportation company offering Red Sea excursions, private transfers and local travel support in Egypt.",
  alternates,
  openGraph: { title: "About Via Blue | Hurghada, Egypt", description: "Discover Via Blue’s local expertise, Red Sea experiences and private transportation services in Hurghada, Egypt.", url: alternates.canonical, siteName: "Via Blue", type: "website", locale: "en_US" },
};
}

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}