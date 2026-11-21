import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Via Blue | Hurghada Tours & Transfers",
  description: "Contact Via Blue to plan Hurghada excursions, Red Sea experiences and private airport or hotel transfers in Egypt.",
  alternates: { canonical: "https://viabluetours.com/contact" },
  openGraph: { title: "Contact Via Blue | Hurghada, Egypt", description: "Get in touch with Via Blue for tours, private transfers and travel assistance in Hurghada and the Red Sea.", url: "https://viabluetours.com/contact", siteName: "Via Blue", type: "website", locale: "en_US" },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}