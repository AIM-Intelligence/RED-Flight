import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isLoggedIn } from './server/auth/auth';

// Add the routes you want to protect here
const protectedRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  // Check if the requested path is in the protectedRoutes array
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // Instead of awaiting, return the promise and let Next.js handle it
    return isLoggedIn().then((loggedIn) => {
      if (!loggedIn) {
        // Redirect to login page if not logged in
        return NextResponse.redirect(new URL('/', request.url));
      }
      // If logged in, continue to the route
      return NextResponse.next();
    });
  }

  // If the route is not protected, continue to the route
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
