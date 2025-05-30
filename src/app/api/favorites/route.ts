/**
 * Favorites API Documentation
 *
 * Data Structure (in-memory):
 * {
 *   "user@example.com": [
 *     {
 *       id: 123,
 *       name: "react",
 *       owner: "facebook",
 *       description: "A JavaScript library for building user interfaces",
 *       url: "https://github.com/facebook/react",
 *       notes: "My favorite UI library"
 *     }
 *   ]
 * }
 *
 * Endpoints:
 *
 * GET /api/favorites
 * - Retrieves the authenticated user's list of favorite repositories
 * - Requires authentication (via session)
 * - Returns: FavoriteRepo[]
 *
 * POST /api/favorites
 * - Adds a repository to the authenticated user's favorites
 * - Requires authentication
 * - Body: FavoriteRepo (excluding `notes` and `email` is fine; `id` must be unique for that user)
 * - Returns:
 *    - 201 Created: { message: "Added to favorites" }
 *    - 409 Conflict: { message: "Already favorited" }
 *
 * PATCH /api/favorites
 * - Updates notes for a specific favorite repository
 * - Requires authentication
 * - Body: { id: number, notes: string }
 * - Returns:
 *    - 200 OK: { success: true }
 *    - 404 Not Found: { error: "Repo not found" }
 *
 * DELETE /api/favorites
 * - Removes a repository from the authenticated user's favorites
 * - Requires authentication
 * - Body: { id: number }
 * - Returns:
 *    - 200 OK: { success: true }
 *    - 404 Not Found: { error: "Repository not found" }
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { FavoriteRepo } from "@/types/favoriterepo";

const userFavorites: { [email: string]: FavoriteRepo[] } = {};

// Utility function to authenticate and return email
async function getAuthenticatedEmail(): Promise<string | null> {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;
  return session.user.email || null;
}

// GET: Retrieve all favorites
export async function GET() {
  const email = await getAuthenticatedEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = userFavorites[email] || [];
  return NextResponse.json(favorites);
}

// POST: Add a new favorite
export async function POST(req: NextRequest) {
  const email = await getAuthenticatedEmail();
  if (!email) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const newRepo: FavoriteRepo = await req.json();

  userFavorites[email] ||= [];

  const exists = userFavorites[email].some((repo) => repo.id === newRepo.id);
  if (exists) {
    return NextResponse.json({ message: "Already favorited" }, { status: 409 });
  }

  userFavorites[email].push(newRepo);
  return NextResponse.json({ message: "Added to favorites" }, { status: 201 });
}

// PATCH: Update notes on a favorite
export async function PATCH(req: NextRequest) {
  const email = await getAuthenticatedEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, notes }: { id: number; notes: string } = await req.json();
  const userFavs = userFavorites[email] || [];
  const repo = userFavs.find((repo) => repo.id === id);

  if (!repo) {
    return NextResponse.json({ error: "Repo not found" }, { status: 404 });
  }

  repo.notes = notes;
  return NextResponse.json({ success: true });
}

// DELETE: Remove a favorite by ID
export async function DELETE(req: NextRequest) {
  const email = await getAuthenticatedEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id }: { id: number } = await req.json();
  const userFavs = userFavorites[email] || [];
  const index = userFavs.findIndex((repo) => repo.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Repository not found" },
      { status: 404 }
    );
  }

  userFavorites[email] = userFavs.filter((repo) => repo.id !== id);
  return NextResponse.json({ success: true });
}
