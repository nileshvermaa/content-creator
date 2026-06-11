import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Portfolio`,
    short_name: "Prags.pov",
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#07070d",
    theme_color: "#07070d",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
