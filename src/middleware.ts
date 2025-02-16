import { auth } from "@/lib/auth";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const supportedLocales = ["en", "id"];
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Handle i18n first
  const intlResponse = intlMiddleware(request);
  const response = intlResponse || NextResponse.next();

  // Extract locale from pathname
  const localeRegex = new RegExp(`^/(${supportedLocales.join("|")})(?=/|$)`);
  const localeMatch = pathname.match(localeRegex);
  const locale = localeMatch?.[1];

  // Get path without locale
  const pathWithoutLocale = pathname.replace(localeRegex, "") || "/";

  // Define protected and auth routes
  const protectedRoutes = ["/"];
  const authRoutes = ["/auth/login", "/auth/register"];

  // Check if current path is protected or auth route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale === `${route}/`
  );
  const isAuthRoute = authRoutes.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale === `${route}/`
  );

  try {
    // Get session
    const session = await auth();

    // Handle protected routes - redirect to login if no session
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL(
        `/${locale || "id"}/auth/login${search}`,
        request.url
      );
      return NextResponse.redirect(redirectUrl);
    }

    // Handle auth routes - redirect to home if has session
    if (isAuthRoute && session) {
      const redirectUrl = new URL(`/${locale || "id"}${search}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (error) {
    console.error("Error checking session:", error);
    // If auth check fails, treat as no session
    if (isProtectedRoute) {
      const redirectUrl = new URL(
        `/${locale || "id"}/auth/login${search}`,
        request.url
      );
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(id|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
