import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://randompot.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["/", "/roulette", "/punishment", "/mission", "/team"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now
  }));
}
