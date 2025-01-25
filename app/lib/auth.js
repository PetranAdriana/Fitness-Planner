"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Hardcoded credentials - in a real app, these would be in a secure database
const VALID_EMAIL = "user@example.com";
const VALID_PASSWORD = "password123";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // Set a simple session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    });

    redirect("/exercises");
  }

  return { error: "Invalid credentials" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return session?.value === "authenticated";
}
