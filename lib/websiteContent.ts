export const homepageContentDefaults = {
  experience_badge: "The Red Sea Is Waiting",
  experience_title_first: "Swim",
  experience_title_highlight: "Explore",
  experience_title_last: "Make Memories",
  experience_description: "From crystal-clear waters and beautiful islands to unforgettable desert landscapes, Hurghada has an experience waiting for you",
  experience_button: "Find Your Experience",
  cta_badge: "Your Hurghada Adventure Starts Here",
  cta_title_first: "Don't Just Visit Hurghada",
  cta_title_highlight: "Experience It",
  cta_description: "Choose your next adventure, book with confidence and get ready for an unforgettable Red Sea experience",
  cta_primary_button: "Explore Tours",
  cta_secondary_button: "View Transfers",
} as const;

export type HomepageContent = {
  [Key in keyof typeof homepageContentDefaults]: string;
};

export function mergeHomepageContent(value: unknown): HomepageContent {
  const result: Record<string, string> = { ...homepageContentDefaults };
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const key of Object.keys(homepageContentDefaults) as Array<keyof typeof homepageContentDefaults>) {
      const candidate = (value as Record<string, unknown>)[key];
      if (typeof candidate === "string" && candidate.trim()) result[key] = candidate.trim();
    }
  }
  return result as HomepageContent;
}
