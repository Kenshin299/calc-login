import { NextRequest, NextResponse } from 'next/server';

// List of protected paths
const protectedPaths = ['/calculator'];

export function middleware(req: NextRequest) {
  // Check if the path is protected
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // Check if the user is authenticated (using a cookie for this example)
    const isAuth = req.cookies.get('isAuth');

    // If the user is not authenticated, redirect to the login page
    if (!isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow request if authenticated
  return NextResponse.next();
}

// Specify the routes where middleware should run
export const config = {
  matcher: ['/calculator'],
};
