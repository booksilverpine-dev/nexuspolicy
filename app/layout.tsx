import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Eco Policy Nexus International", template: "%s · Eco Policy Nexus International" },
  description: "A Bhutanese consultancy bridging policy, people and planet.",
  openGraph: { images: ["/infographics/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tibetan:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-[#f6f3ec] text-[#1d332c] antialiased" style={{ fontFamily: "var(--font-source), sans-serif" }}>{children}</body>
    </html>
  );
}
