/**
 * GitHub API Integration Module
 *
 * All requests use Incremental Static Regeneration (ISR) with a 60-second cache
 * to optimize performance and reduce API rate limiting issues.
 *
 * Functions:
 * - getUserDetails(username): Fetches a GitHub user's profile information
 * - getUserRepos(username): Retrieves all repositories for a given user
 * - getRepoDetails(owner, repo): Gets detailed information about a specific repository
 *
 * Authentication:
 * - Uses GITHUB_TOKEN from environment variables if available
 * - Falls back to unauthenticated requests if no token is provided
 */

import { User, Repo } from "@/types/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const headers: HeadersInit = GITHUB_TOKEN
  ? { Authorization: `token ${GITHUB_TOKEN}` }
  : {};

export async function getUserDetails(username: string): Promise<User> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers,
    next: { revalidate: 60 }, // ISR
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user details for ${username}`);
  }

  return res.json();
}

export async function getUserRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers,
    next: { revalidate: 60 }, // ISR
  });
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
