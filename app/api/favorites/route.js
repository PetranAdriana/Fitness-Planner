import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Use a more robust storage solution with a lock mechanism
let userFavorites = new Map();
const locks = new Map();

// Helper function to acquire a lock
const acquireLock = (userId) => {
  if (locks.get(userId)) {
    return false;
  }
  locks.set(userId, true);
  return true;
};

// Helper function to release a lock
const releaseLock = (userId) => {
  locks.delete(userId);
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authToken.value;
    const favorites = userFavorites.get(userId) || [];

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = authToken.value;

  // Try to acquire lock
  if (!acquireLock(userId)) {
    return NextResponse.json(
      { error: "Operation in progress, please try again" },
      { status: 429 }
    );
  }

  try {
    const { exercise } = await request.json();

    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise data is required" },
        { status: 400 }
      );
    }

    let userFavoritesList = userFavorites.get(userId) || [];

    // Check if exercise already exists
    if (userFavoritesList.some((fav) => fav.id === exercise.id)) {
      return NextResponse.json(
        { message: "Exercise already in favorites" },
        { status: 200 }
      );
    }

    // Add to favorites
    userFavoritesList = [...userFavoritesList, exercise];
    userFavorites.set(userId, userFavoritesList);

    return NextResponse.json(
      { message: "Exercise added to favorites", favorites: userFavoritesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json(
      { error: "Failed to add to favorites" },
      { status: 500 }
    );
  } finally {
    releaseLock(userId);
  }
}

export async function DELETE(request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = authToken.value;

  // Try to acquire lock
  if (!acquireLock(userId)) {
    return NextResponse.json(
      { error: "Operation in progress, please try again" },
      { status: 429 }
    );
  }

  try {
    const { exerciseId } = await request.json();

    if (!exerciseId) {
      return NextResponse.json(
        { error: "Exercise ID is required" },
        { status: 400 }
      );
    }

    let userFavoritesList = userFavorites.get(userId) || [];

    // Check if exercise exists before removing
    if (!userFavoritesList.some((fav) => fav.id === exerciseId)) {
      return NextResponse.json(
        { message: "Exercise not in favorites" },
        { status: 200 }
      );
    }

    // Remove from favorites
    userFavoritesList = userFavoritesList.filter((fav) => fav.id !== exerciseId);
    userFavorites.set(userId, userFavoritesList);

    return NextResponse.json(
      { message: "Exercise removed from favorites", favorites: userFavoritesList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json(
      { error: "Failed to remove from favorites" },
      { status: 500 }
    );
  } finally {
    releaseLock(userId);
  }
}
