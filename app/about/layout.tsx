import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Via Blue | Hurghada Tourism & Transfers",
  description: "Meet Via Blue, a Hurghada-based tourism and transportation company offering Red Sea excursions, private transfers and local travel support in Egypt.",
  alternates: { canonical: "https://viabluetours.com/about" },
  openGraph: { title: "About Via Blue | Hurghada, Egypt", description: "Discover Via Blue’s local expertise, Red Sea experiences and private transportation services in Hurghada, Egypt.", url: "https://viabluetours.com/about", siteName: "Via Blue", type: "website", locale: "en_US" },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}