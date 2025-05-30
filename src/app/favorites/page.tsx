"use client";

import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButtons";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const { favorites, isLoading, error, updateNotes, removeFavorite } =
    useFavorites();

  if (status === "loading" || isLoading) return <Loading />;
  if (error)
    return (
      <div className="flex flex-col items-center min-h-[80vh] text-center p-20">
        <h2 className="text-xl font-semibold text-error mb-4">
          Something went wrong
        </h2>
        <p className="text-sm text-text-500 mb-6">{error.message}</p>
      </div>
    );

  if (!session) {
    return (
      <div className="flex flex-col items-center min-h-[80vh] text-center p-20">
        <h2 className="text-xl font-semibold text-text-500 mb-4">
          Authentication Required
        </h2>
        <p className="text-sm text-text-300 mb-6">
          Please sign in to view and manage your favorite repositories.
        </p>
        <AuthButton />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-text-500">Your Favorites</h1>
      <ul className="space-y-4">
        {favorites && favorites.length > 0 ? (
          favorites.map((repo) => (
            <li
              key={repo.id}
              className="p-4 rounded-lg backdrop-blur-2xl shadow-xl flex flex-col justify-between bg-card"
            >
              <p className="text-xl font-bold text-text-500">{repo.name}</p>
              <p className="text-text-300">{repo.description}</p>
              <div className="flex flex-col gap-2 py-5">
                <label htmlFor="notes" className="text-text-500">
                  Notes
                </label>
                <input
                  type="text"
                  id="notes"
                  value={repo.notes ?? ""}
                  onChange={(e) =>
                    updateNotes.mutate({ id: repo.id, notes: e.target.value })
                  }
                  className="border-1 border-foreground rounded-md p-2 text-text-500"
                />
              </div>
              <button
                onClick={() => removeFavorite.mutate(repo.id)}
                className="bg-error text-white rounded-md p-2 cursor-pointer w-[10rem]"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <h1 className="text-base mb-4 text-text-300">No favorites yet.</h1>
        )}
      </ul>
    </div>
  );
}
