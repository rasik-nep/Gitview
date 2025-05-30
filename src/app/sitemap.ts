import { MetadataRoute } from "next";
import { getUserRepos } from "@/lib/github";
import { GITHUB_USER_NAME } from "@/constant";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all repositories
  const repos = await getUserRepos(GITHUB_USER_NAME);

  // Base URL of your site
  const baseUrl = "https://gitview-vmjt.vercel.app/";

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/repos`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Dynamic routes for repositories
  const repoRoutes = repos.map((repo) => ({
    url: `${baseUrl}/repos/${repo.owner.login}/${repo.name}`,
    lastModified: new Date(repo.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...repoRoutes];
}
