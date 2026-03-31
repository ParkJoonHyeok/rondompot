import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RandomPot",
    short_name: "RandomPot",
    description: "친구/모임/술자리용 랜덤 놀이 서비스",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
