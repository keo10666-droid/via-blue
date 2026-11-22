import type { Metadata } from "next";
import { getLocalizedSeo } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/luxury-tours");
  return {
  title: seo.title,
  description: seo.description,
  alternates: seo.alternates,
  openGraph: { title: seo.title, description: seo.description, url: seo.alternates.canonical, siteName: "Via Blue", type: "website", locale: "en_US" },
};
}

export default function LuxuryToursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}