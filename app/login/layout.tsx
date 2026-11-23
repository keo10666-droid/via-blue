import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Via Blue",
  robots: { index: false, follow: false },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
