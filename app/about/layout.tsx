import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/about");
  return {
  title: seo.title,
  description: seo.description,
  alternates: seo.alternates,
  openGraph: { title: seo.title, description: seo.description, url: seo.alternates.canonical, siteName: "Via Blue", type: "website", locale: getOpenGraphLocale(seo.locale) },
};
}

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}