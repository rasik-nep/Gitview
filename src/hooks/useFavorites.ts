import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Repo } from "@/types/github";
import { FavoriteRepo } from "@/types/favoriterepo";
import { useSession } from "next-auth/react"; // Add this import

// Fetch favorites
async function fetchFavorites(): Promise<FavoriteRepo[]> {
  const response = await fetch("/api/favorites", {
    headers: { "Cache-Control": "no-store" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
}

// Add to favorites
async function addToFavorites(repo: Repo): Promise<{ message: string }> {
  const response = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(repo),
  });
  if (!response.ok) {
    throw new Error("Failed to add to favorites");
  }
  return response.json();
}

// Update favorite notes
async function updateFavoriteNotes({
  id,
  notes,
}: {
  id: number;
  notes: string;
}): Promise<{ success: boolean }> {
  const response = await fetch("/api/favorites", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, notes }),
  });
  if (!response.ok) {
    throw new Error("Failed to update notes");
  }
  return response.json();
}

// Delete favorite
async function deleteFavorite(id: number): Promise<{ success: boolean }> {
  const response = await fetch("/api/favorites", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete favorite");
  }
  return response.json();
}

export function useFavorites() {
  const queryClient = useQueryClient();
  const { status } = useSession(); // Add this line
  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: status === "authenticated",
  });

  const addFavorite = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const updateNotes = useMutation({
    mutationFn: updateFavoriteNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites,
    isLoading,
    error,
    addFavorite,
    updateNotes,
    removeFavorite,
  };
}
