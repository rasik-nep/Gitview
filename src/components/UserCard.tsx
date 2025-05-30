"use client";

import Image from "next/image";
import { User } from "@/types/github";

export default function UserCard({ user }: { user: User }) {
  // Define consistent date formatting options
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  if (!user) {
    return <p>Error: No user data provided</p>;
  }
  return (
    <div className="flex items-start space-x-6 flex-col md:flex-row bg-card rounded-lg shadow-xl p-5 md:p-20">
      <Image
        src={user.avatar_url}
        alt={`${user.name}'s avatar`}
        width={150}
        height={150}
        className="rounded-full align-center"
        loading="lazy"
        placeholder="empty"
      />
      <div className="flex-1 py-10 md:py-0">
        <h1 className="text-3xl font-bold text-text-500">{user.name}</h1>
        <p className="text-text-300">@{user.login}</p>
        {user.bio && <p className="mt-2 text-text-500">{user.bio}</p>}

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-500">
          <div>
            <span className="font-semibold">{user.public_repos}</span>{" "}
            repositories
          </div>
          <div>
            <span className="font-semibold">{user.public_gists}</span> gists
          </div>
          <div>
            <span className="font-semibold">{user.followers}</span> followers
          </div>
          <div>
            <span className="font-semibold">{user.following}</span> following
          </div>
        </div>

        {user.location && (
          <div className="mt-4 text-sm text-text-500">
            Location: {user.location}
          </div>
        )}
        <div className="mt-4 text-xs text-text-500">
          <div>
            Member since:{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString(
                  "en-US",
                  dateOptions
                )
              : "N/A"}
          </div>
          <div>
            Last updated:{" "}
            {user.updated_at
              ? new Date(user.updated_at).toLocaleDateString(
                  "en-US",
                  dateOptions
                )
              : "N/A"}
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-700 hover:underline"
          >
            GitHub Profile
          </a>
          {user.blog && user.blog !== "" && (
            <a
              href={
                user.blog.startsWith("http")
                  ? user.blog
                  : `https://${user.blog}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-700 hover:underline"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
