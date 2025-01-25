import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This is a mock user for demo purposes
// In a real app, you would validate against a database
const MOCK_USER = {
  email: "test@example.com",
  password: "password123",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate credentials (mock validation)
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Create a simple token (in a real app, use JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      // Set cookie with token
      cookies().set({
        name: 'authToken',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // Expire in 24 hours
        maxAge: 60 * 60 * 24
      });

      return NextResponse.json(
        { 
          message: "Signed in successfully",
          user: { email: MOCK_USER.email }
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error in sign in:", error);
    return NextResponse.json(
      { error: "Failed to sign in" },
      { status: 500 }
    );
  }
}
