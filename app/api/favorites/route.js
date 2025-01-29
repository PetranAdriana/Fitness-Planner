import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getUserFavorites,
  addUserFavorite,
  removeUserFavorite,
} from "@/lib/favorites-storage";

export const revalidate = 36000;
export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authToken.value;
    const favorites = await getUserFavorites(userId);

    return NextResponse.json({
      favorites,
      version: Date.now(),
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authToken.value;
    const { exercise } = await request.json();

    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise data is required" },
        { status: 400 }
      );
    }

    const favorites = await addUserFavorite(userId, exercise);

    return NextResponse.json({
      message: "Exercise added to favorites",
      favorites,
      version: Date.now(),
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json(
      { error: "Failed to add to favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken");

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authToken.value;
    const { exerciseId } = await request.json();

    if (!exerciseId) {
      return NextResponse.json(
        { error: "Exercise ID is required" },
        { status: 400 }
      );
    }

    const favorites = await removeUserFavorite(userId, exerciseId);

    return NextResponse.json({
      message: "Exercise removed from favorites",
      favorites,
      version: Date.now(),
    });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json(
      { error: "Failed to remove from favorites" },
      { status: 500 }
    );
  }
}
