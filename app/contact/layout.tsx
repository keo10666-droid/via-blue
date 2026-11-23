import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/contact");
  return {
  title: seo.title,
  description: seo.description,
  alternates: seo.alternates,
  openGraph: { title: seo.title, description: seo.description, url: seo.alternates.canonical, siteName: "Via Blue", type: "website", locale: getOpenGraphLocale(seo.locale) },
};
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}