import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yunsu.dev";
  const pages = [
    "",
    "#about",
    "#projects",
    "#skills",
    "#experience",
    "#contact",
  ];

  return pages.map((path) => ({
    url: `${baseUrl}/${path.replace(/^#/, "")}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
