import type { MetadataRoute } from "next";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: fr["meta.title"],
    short_name: "Scarlino",
    description: fr["meta.description"],
    lang: "fr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { src: "/images/joseph-portrait.png", sizes: "800x800", type: "image/png" },
    ],
    shortcuts: [
      { name: en["nav.projects"], url: "/#projects" },
      { name: en["nav.contact"], url: "/#contact" },
    ],
  };
}
