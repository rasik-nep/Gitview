import { getRepoDetails } from "@/lib/github";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { Metadata } from "next";

type RepoPageProps = {
  params: Promise<{ owner: string; repo: string }>;
};

export async function generateMetadata({
  params,
}: RepoPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { owner, repo } = resolvedParams;
  const data = await getRepoDetails(owner, repo);
  if (!data) {
    return {
      title: "Repository Not Found",
      description: "The requested repository could not be found.",
    };
  }
  return {
    title: `${data.name} by ${data.owner.login}`,
    description: data.description || `GitHub repository: ${data.name}`,
    openGraph: {
      title: `${data.name} by ${data.owner.login}`,
      description: data.description || `GitHub repository: ${data.name}`,
      type: "website",
      siteName: "GitView",
    },
    alternates: {
      canonical: data.html_url,
    },
    other: {
      "github:stars": data.stargazers_count.toString(),
      "github:forks": data.forks_count.toString(),
      "github:language": data.language || "Not specified",
      "github:updated": new Date(data.updated_at).toISOString(),
    },
  };
}

export default async function RepoPage({ params }: RepoPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { owner, repo } = resolvedParams;
  const data = await getRepoDetails(owner, repo);
  if (!data) {
    notFound();
  }
  return (
    <div className="flex-grow min-h-[80vh] py-10 md:py-20 px-5 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start space-x-6 flex-col bg-card rounded-lg shadow-xl p-10 md:p-20 ">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-gray-700 mt-2">{data.description}</p>

          <ul className="mt-4 space-y-1 text-sm">
            <li>Stars: {data.stargazers_count}</li>
            <li>Forks: {data.forks_count}</li>
            <li>Language: {data.language}</li>
            <li>Last updated: {new Date(data.updated_at).toLocaleString()}</li>
          </ul>
          <div className="mt-4">
            <FavoriteButton repo={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
