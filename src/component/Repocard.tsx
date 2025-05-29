"use client";

import Link from "next/link";
import { Repo } from "@/types/github";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <li
      key={repo.id}
      className="p-4 w-full md:w-[20rem] rounded-lg backdrop-blur-2xl hover:border-[1px] hover:border-foreground shadow-xl flex flex-col justify-between bg-card"
    >
      <h2 className="text-lg font-semibold text-text-500 line-clamp-1">
        {repo.name}
      </h2>
      <p className="text-sm text-text-300 line-clamp-2">{repo.description}</p>
      <div className="py-2">
        <p className="text-sm text-text-500">Stars: {repo.stargazers_count}</p>
        <p className="text-sm text-text-500">Forks: {repo.forks_count}</p>
        <p className="text-sm text-text-500">
          Language: {repo.language || "N/A"}
        </p>
      </div>
      <Link
        href={`/repos/${repo.owner.login}/${repo.name}`}
        className="py-1 w-[7rem]"
      >
        <p className="text-primary hover:text-secondary cursor-pointer">
          View more
        </p>
      </Link>
    </li>
  );
}
