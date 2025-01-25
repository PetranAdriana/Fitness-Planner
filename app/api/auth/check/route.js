import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authToken = (await cookies()).get("authToken");
    const isAuthenticated = !!authToken;

    if (isAuthenticated) {
      // In a real app, you would decode the JWT and get user info
      // For now, we'll just return a simple response
      return NextResponse.json({
        authenticated: true,
        user: {
          email: "test@example.com" // This would come from the JWT in a real app
        }
      });
    }

    return NextResponse.json({
      authenticated: false,
      user: null
    });
  } catch (error) {
    console.error("Error checking auth status:", error);
    return NextResponse.json(
      { error: "Failed to check authentication status" },
      { status: 500 }
    );
  }
}
