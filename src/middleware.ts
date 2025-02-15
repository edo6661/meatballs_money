import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();

  // Skip auth check for static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Protected routes
  const protectedRoutes = ["/"];
  const authRoutes = ["/auth/login", "/auth/register"];

  if (protectedRoutes.includes(pathname) && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (authRoutes.includes(pathname) && session) {
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
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
