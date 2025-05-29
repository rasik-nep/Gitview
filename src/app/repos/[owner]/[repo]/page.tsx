import { getRepoDetails } from "@/libs/github";
import { notFound } from "next/navigation";
import FavoriteButton from "@/component/FavoriteButton";

type RepoPageProps = {
  params: { owner: string; repo: string };
};

export default async function RepoPage({ params }: RepoPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { owner, repo } = resolvedParams;

  try {
    const data = await getRepoDetails(owner, repo);

    return (
      <div className="flex-grow min-h-[80vh] p-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-6 flex-col bg-card rounded-lg shadow-xl p-20 ">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-gray-700 mt-2">{data.description}</p>

            <ul className="mt-4 space-y-1 text-sm">
              <li>Stars: {data.stargazers_count}</li>
              <li>Forks: {data.forks_count}</li>
              <li>Language: {data.language}</li>
              <li>
                Last updated: {new Date(data.updated_at).toLocaleString()}
              </li>
            </ul>
            <div className="mt-4">
              <FavoriteButton repo={data} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound(); // 404 page if the repo is invalid
  }
}
