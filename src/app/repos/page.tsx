import Repocard from "@/component/Repocard";
import { getUserRepos } from "@/libs/github";

export const revalidate = 60; // ISR every 60 seconds

export const metadata = {
  title: "GitHub Repositories | GitHub Explorer",
  description:
    "Browse public repositories of a GitHub user using GitHub Explorer.",
};

export default async function ReposPage() {
  // await new Promise((r) => setTimeout(r, 2000)); // simulate a slow response

  const repos = await getUserRepos("rasik-nep");
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Public Repositories</h1>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <Repocard key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}
