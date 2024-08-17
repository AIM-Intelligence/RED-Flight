import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isLoggedIn } from "./server/auth/auth";

export async function middleware(request: NextRequest) {
  // Check if the user is logged in
  const loggedIn = await isLoggedIn();

  // List of paths that require authentication
  const protectedPaths = [
    "/my-page",
    "/my-staking-nft",
    "/nft-gallery",
    "/nft-leaderboard",
    "/user-leaderboard",
  ];

  // Check if the current path is a protected path
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path),
  );

  // If the path is protected and the user is not logged in, redirect to login
  if (isProtectedPath && !loggedIn) {
    // Store the original URL to redirect back after login
    const originalUrl = request.url;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", originalUrl);

    return NextResponse.redirect(loginUrl);
  }

  if (loggedIn && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/my-page/:path*",
    "/my-staking-nft/:path*",
    "/login",
    // Add the catch-all pattern, but exclude more paths as needed
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
