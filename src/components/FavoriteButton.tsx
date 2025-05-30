"use client";

import { Repo } from "@/types/github";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoriteButton({ repo }: { repo: Repo }) {
  const { status } = useSession();
  const { favorites, addFavorite, isLoading, error } = useFavorites();

  const isFavorited = favorites?.some((fav) => fav.id === repo.id) ?? false;

  const handleAddToFavorites = async () => {
    if (status === "unauthenticated") {
      alert("You are not authenticated");
      return;
    }
    addFavorite.mutate(repo);
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
          {error.message}
        </div>
      )}
    </div>
  );
}
