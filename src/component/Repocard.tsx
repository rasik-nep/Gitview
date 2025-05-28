"use client";
import Link from "next/link";
import { Repo } from "@/types/github";

export default function Repocard({ repo }: { repo: Repo }) {
  return (
    <li key={repo.id} className="p-4 border rounded-lg hover:shadow">
      {/* this is causing the issue, need to fix this */}
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
  );
}
