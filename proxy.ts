import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  // Check for the session cookie directly for edge-compatibility
  const sessionCookie = request.cookies.get('session');

  const { pathname } = request.nextUrl;

  // Protect /dashboard and all its subdirectories
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie || !sessionCookie.value) {
      // Redirect to login if user is not authenticated
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(pathname));
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config to specify which paths the middleware should run on.
// We apply it generally but scope logic to /dashboard inside.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
