import { NextResponse } from "next/server";

// Add paths that require authentication
const protectedPaths = ["/exercises", "/favorites", "/profile"];

// Add paths that should redirect to home if already authenticated
const authPaths = ["/login"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthPath = authPaths.includes(pathname);
  
  // Get the token from cookies
  const authToken = request.cookies.get("authToken");
  const isAuthenticated = !!authToken;

  // If the path requires authentication and user is not authenticated
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isAuthenticated) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // If user is authenticated and tries to access auth pages (login)
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
