"use client";

import { useState, useEffect } from "react";

import { Repo } from "@/types/github";
import { useSession } from "next-auth/react";

export default function FavoriteButton({ repo }: { repo: Repo }) {
  const { status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect to check if repo is favorited on mount
  useEffect(() => {
    const checkIfFavorited = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/favorites", {
          headers: {
            "Cache-Control": "no-store",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const favorites = await response.json();
        setIsFavorited(favorites.some((fav: Repo) => fav.id === repo.id));
      } catch (err) {
        console.error("Error checking favorites:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkIfFavorited();
  }, [repo.id]);

  const handleAddToFavorites = async () => {
    if (status === "unauthenticated") return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(repo),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add to favorites");
      }

      setIsFavorited(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add to favorites"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToFavorites}
        disabled={isLoading || isFavorited}
        className={`
          px-4 py-2 rounded-md text-sm font-medium
          ${
            isFavorited
              ? "bg-secondary cursor-not-allowed"
              : "bg-primary text-white cursor-pointer"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Please wait...
          </span>
        ) : isFavorited ? (
          "Added to Favorites"
        ) : (
          "Add to Favorites"
        )}
      </button>
      {error && (
        <div className="absolute top-full left-0 mt-1 text-error text-xs">
          {error}
        </div>
      )}
    </div>
  );
}
