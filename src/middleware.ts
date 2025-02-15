import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;

  console.log("path:", path);
  console.log("session:", !!session);

  // Jika path adalah root "/" dan tidak ada session, redirect ke login
  if (path === "/" && !session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Jika mencoba akses halaman auth (login/register) dan sudah ada session, redirect ke home
  if ((path === "/auth/login" || path === "/auth/register") && session) {
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
