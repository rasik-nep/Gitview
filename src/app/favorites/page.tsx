"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButtons";

interface FavoriteRepo {
  id: number;
  name: string;
  owner: string;
  description: string;
  url: string;
  notes?: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNotes, setEditingNotes] = useState<{ [key: number]: string }>(
    {}
  );
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchFavorites() {
      // fetch only when user is authenticated
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/favorites", {
          headers: {
            "Cache-Control": "no-store",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch favorites");
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Could not load favorites");
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [session]);

  const deleteFavorite = async (id: number) => {
    if (!session) return;

    try {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete favorite");
      setFavorites(favorites.filter((repo) => repo.id !== id));
    } catch (err) {
      console.error("Error deleting favorite:", err);
      setError("Failed to delete favorite");
    }
  };

  const updateNote = async (id: number, notes: string) => {
    if (!session) return;

    try {
      setEditingNotes((prev) => ({ ...prev, [id]: notes }));
      const res = await fetch("/api/favorites", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ id, notes }),
      });

      if (!res.ok) throw new Error("Failed to update note");
      setFavorites(
        favorites.map((repo) => (repo.id === id ? { ...repo, notes } : repo))
      );
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to update note");
    }
  };

  if (status === "loading" || loading) return <Loading />;
  if (error)
    return (
      <div className="flex flex-col items-center min-h-[80vh] text-center p-20">
        <h2 className="text-xl font-semibold text-error mb-4">
          Something went wrong
        </h2>
        <p className="text-sm text-text-500 mb-6">{error}</p>
      </div>
    );

  // Unauthenticated state
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
        {favorites.length > 0 ? (
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
                  value={editingNotes[repo.id] ?? repo.notes ?? ""}
                  onChange={(e) => updateNote(repo.id, e.target.value)}
                  className="border-1 border-foreground rounded-md p-2 text-text-500"
                />
              </div>
              <button
                onClick={() => deleteFavorite(repo.id)}
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
