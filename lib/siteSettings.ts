export const siteSettingsDefaults = {
  seo_title: "Via Blue | Tours & Transfers in Hurghada",
  seo_description: "Discover unforgettable tours, excursions and professional airport and hotel transfers in Hurghada and the Red Sea with Via Blue.",
  seo_keywords: "Hurghada tours, Hurghada excursions, Hurghada transfers, Hurghada airport transfer, Red Sea tours, Egypt tours, Hurghada activities, Via Blue",
} as const;

export type SiteSettings = {
  [Key in keyof typeof siteSettingsDefaults]: string;
};

export function mergeSiteSettings(value: unknown): SiteSettings {
  const result: Record<string, string> = { ...siteSettingsDefaults };
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const key of Object.keys(siteSettingsDefaults) as Array<keyof typeof siteSettingsDefaults>) {
      const candidate = (value as Record<string, unknown>)[key];
      if (typeof candidate === "string" && candidate.trim()) result[key] = candidate.trim();
    }
  }
  return result as SiteSettings;
}
