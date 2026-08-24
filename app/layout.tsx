import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Military Strategy Database — Field Manual Index",
  description: "A scoped educational reference for comparing campaign patterns and strategic constraints.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
