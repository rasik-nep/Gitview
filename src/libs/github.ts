import { Repo } from "@/types/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const headers: HeadersInit = GITHUB_TOKEN
  ? { Authorization: `token ${GITHUB_TOKEN}` }
  : {};

export async function getUserRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers,
    next: { revalidate: 60 }, // ISR
  });
  console.log("refetching");
  if (!res.ok) {
    throw new Error(`Failed to fetch repositories for ${username}`);
  }

  return res.json();
}

export async function getRepoDetails(
  owner: string,
  repo: string
): Promise<Repo> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
    next: { revalidate: 60 }, // ISR
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch details for ${owner}/${repo}`);
  }

  return res.json();
}
