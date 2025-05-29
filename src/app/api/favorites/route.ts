import { NextRequest, NextResponse } from "next/server";

type FavoriteRepo = {
  id: number;
  name: string;
  owner: string;
  description: string;
  url: string;
  notes?: string;
};
const favorites: FavoriteRepo[] = [];

export async function GET() {
  return NextResponse.json(favorites);
}

export async function POST(req: NextRequest) {
  const newRepo = await req.json();

  // Check if already exists
  const exists = favorites.some((repo) => repo.id === newRepo.id);
  if (exists) {
    return NextResponse.json({ message: "Already favorited" }, { status: 409 });
  }

  favorites.push(newRepo);
  return NextResponse.json({ message: "Added to favorites" }, { status: 201 });
}

// PATCH for updating a notes
export async function PATCH(req: Request) {
  const body = await req.json(); // { id, note }
  const index = favorites.findIndex((repo) => repo.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: "Repo not found" }, { status: 404 });
  }

  favorites[index].notes = body.notes;
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const index = favorites.findIndex((repo) => repo.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Repository not found" },
      { status: 404 }
    );
  }

  favorites.splice(index, 1);
  return NextResponse.json({ success: true });
}
