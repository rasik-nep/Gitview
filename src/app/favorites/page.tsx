"use client";

import Loading from "@/component/Loading";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) throw new Error("Failed to fetch favorites");
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.log(err);
        setError("Could not load favorites");
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  async function handleDelete(id: number) {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      // Refresh the list or remove item from local state
      setFavorites(favorites.filter((repo) => repo.id !== id));
    } else {
      console.error("Failed to delete favorite");
    }
  }

  async function handleUpdateNote(id: number, notes: string) {
    setEditingNotes((prev) => ({ ...prev, [id]: notes }));
    const res = await fetch("/api/favorites", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    if (res.ok) {
      setFavorites(
        favorites.map((repo) => (repo.id === id ? { ...repo, notes } : repo))
      );
    } else {
      console.error("Failed to update note");
    }
  }
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

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
                  onChange={(e) => handleUpdateNote(repo.id, e.target.value)}
                  className="border-1 border-foreground rounded-md p-2 text-text-500"
                />
              </div>
              <button
                onClick={() => handleDelete(repo.id)}
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
