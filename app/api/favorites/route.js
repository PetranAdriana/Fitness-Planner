import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// In a real app, this would be stored in a database
let userFavorites = new Map();

export async function GET() {
  try {
    const authToken = cookies().get("authToken");
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // In a real app, we would use the token to get the user's ID
    // For now, we'll use the token value as the user ID
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
  try {
    const authToken = cookies().get("authToken");
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = authToken.value;
    const { exercise } = await request.json();

    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise data is required" },
        { status: 400 }
      );
    }

    let userFavoritesList = userFavorites.get(userId) || [];
    
    // Check if exercise is already in favorites
    if (!userFavoritesList.some(fav => fav.id === exercise.id)) {
      userFavoritesList = [...userFavoritesList, exercise];
      userFavorites.set(userId, userFavoritesList);
    }

    return NextResponse.json(userFavoritesList);
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
    const authToken = cookies().get("authToken");
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = authToken.value;
    const { exerciseId } = await request.json();

    if (!exerciseId) {
      return NextResponse.json(
        { error: "Exercise ID is required" },
        { status: 400 }
      );
    }

    let userFavoritesList = userFavorites.get(userId) || [];
    userFavoritesList = userFavoritesList.filter(
      exercise => exercise.id !== exerciseId
    );
    userFavorites.set(userId, userFavoritesList);

    return NextResponse.json(userFavoritesList);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json(
      { error: "Failed to remove from favorites" },
      { status: 500 }
    );
  }
}
