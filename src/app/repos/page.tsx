import { getUserRepos } from "@/libs/github";
import Link from "next/link";

export const revalidate = 60; // ISR every 60 seconds

export const metadata = {
  title: "GitHub Repositories | GitHub Explorer",
  description:
    "Browse public repositories of a GitHub user using GitHub Explorer.",
};

export default async function ReposPage() {
  await new Promise((r) => setTimeout(r, 2000)); // simulate a slow response

  const repos = await getUserRepos("rasik-nep");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Public Repositories</h1>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="p-4 border rounded-lg hover:shadow">
            <Link
              href={`/repos/${repo.owner.login}/${repo.name}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              {repo.name}
            </Link>
            <p className="text-sm text-gray-600">{repo.description}</p>
            <div className="text-xs text-gray-500 mt-2">
              ⭐ {repo.stargazers_count} | 🖥 {repo.language || "N/A"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
