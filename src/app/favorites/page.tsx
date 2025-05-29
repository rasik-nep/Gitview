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
  if (favorites.length === 0)
    return (
      <div className=" h-screen max-w-4xl mx-auto py-8">
        <p>No favorites yet.</p>
      </div>
    );

  return (
    <div className=" h-screen max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      <ul className="space-y-4">
        {favorites.map((repo) => (
          <li key={repo.id} className="p-4 border rounded shadow-sm">
            <a href={repo.url} target="_blank">
              {repo.name}
            </a>
            <p className="text-gray-600">{repo.description}</p>
            <input
              type="text"
              value={repo.notes}
              onChange={(e) => handleUpdateNote(repo.id, e.target.value)}
            />
            <button onClick={() => handleDelete(repo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
