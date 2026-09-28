import type { MetadataRoute } from "next";
import { publicPaths } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return publicPaths.flatMap((path) =>
    (["en", "dz"] as const).map((locale) => ({
      url: `${base}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${base}/en${path === "/" ? "" : path}`,
          dz: `${base}/dz${path === "/" ? "" : path}`,
        },
      },
    }))
  );
}
