import type { Metadata } from "next";
import {
  Playfair_Display,
  EB_Garamond,
  Poppins,
  Caveat,
  Abril_Fatface,
  Pinyon_Script,
} from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const garamond = EB_Garamond({ variable: "--font-lora", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600"],
});
const abril = Abril_Fatface({ variable: "--font-abril", subsets: ["latin"], weight: "400" });
const pinyon = Pinyon_Script({ variable: "--font-pinyon", subsets: ["latin"], weight: "400" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pragati Srivastava — Content Creator & Social Media Executive",
  description:
    "Portfolio and résumé of Pragati Srivastava — content creator and digital marketer from Lucknow with 60+ brand collaborations, blending POV-first storytelling with data-driven social media strategy.",
  keywords: [
    "Pragati Srivastava",
    "Content Creator",
    "Digital Marketing",
    "Social Media Executive",
    "Social Media Marketing",
    "Lucknow",
    "pragspov",
  ],
  openGraph: {
    title: "Pragati Srivastava — Content Creator & Social Media Executive",
    description:
      "POV: your brand finally has a story worth watching. Cinematic content, data-driven strategy.",
    type: "website",
    images: [{ url: "/pragati.jpg", width: 720, height: 960, alt: "Pragati Srivastava" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pragati Srivastava — Content Creator & Social Media Executive",
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
    <html lang="en" className={`${playfair.variable} ${garamond.variable} ${poppins.variable} ${caveat.variable} ${abril.variable} ${pinyon.variable} antialiased`}>
      <body className="grain text-[1.08rem]">{children}</body>
    </html>
  );
}
