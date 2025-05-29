export interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
  blog: string | null | "";
  created_at: string;
  updated_at: string;
}

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  owner: User;
}
