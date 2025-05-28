import { getRepoDetails } from "@/libs/github";
import { notFound } from "next/navigation";
import FavoriteButton from "@/component/FavoriteButton";

type RepoPageProps = {
  params: { owner: string; repo: string };
};

export default async function RepoPage({ params }: RepoPageProps) {
  // Ensure the entire params object is properly awaited
  const resolvedParams = await Promise.resolve(params);
  const { owner, repo } = resolvedParams;

  try {
    const data = await getRepoDetails(owner, repo);

    return (
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-gray-700 mt-2">{data.description}</p>

        <ul className="mt-4 space-y-1 text-sm">
          <li>⭐ Stars: {data.stargazers_count}</li>
          <li>🍴 Forks: {data.forks_count}</li>
          <li>🛠 Language: {data.language}</li>
          <li>⏱ Last updated: {new Date(data.updated_at).toLocaleString()}</li>
        </ul>
        <FavoriteButton repo={data} />
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound(); // 404 page if the repo is invalid
  }
}
