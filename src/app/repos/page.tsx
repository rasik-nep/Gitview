import RepoCard from "@/components/RepoCard";
import { getUserRepos } from "@/lib/github";
import { GITHUB_USER_NAME } from "@/constant";
export const revalidate = 60; // ISR every 60 seconds

export const metadata = {
  title: "GitHub Explorer",
  description:
    "Browse public repositories of a GitHub user using GitHub Explorer.",
  openGraph: {
    title: "GitHub Explorer",
    description:
      "Browse public repositories of a GitHub user using GitHub Explorer.",
  },
};

export default async function ReposPage() {
  const repos = await getUserRepos(GITHUB_USER_NAME);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center p-5 text-text-500">
        Public Repositories
      </h1>
      <ul className="space-y-4 flex flex-wrap gap-4 justify-center">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}
