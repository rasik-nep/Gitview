import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/favorites", // Since this requires authentication
      ],
    },
    sitemap: "https://gitview-vmjt.vercel.app/sitemap.xml",
  };
}
