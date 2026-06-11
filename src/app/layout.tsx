import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pragati Srivastava — Content Creator & Digital Media Manager",
  description:
    "POV-first storytelling, social media strategy and digital media management. Pragati Srivastava blends cinematic content with data-driven marketing across fitness, finance and pharma.",
  keywords: [
    "Pragati Srivastava",
    "Content Creator",
    "Digital Media Manager",
    "Social Media Marketing",
    "pragspov",
  ],
  openGraph: {
    title: "Pragati Srivastava — Content Creator & Digital Media Manager",
    description:
      "POV: your brand finally has a story worth watching. Cinematic content, data-driven strategy.",
    type: "website",
    images: [{ url: "/pragati.jpg", width: 720, height: 960, alt: "Pragati Srivastava" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pragati Srivastava — Content Creator & Digital Media Manager",
    description: "POV: your brand finally has a story worth watching.",
    images: ["/pragati.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} antialiased`}>
      <body className="grain">{children}</body>
    </html>
  );
}
