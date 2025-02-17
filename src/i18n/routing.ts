import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "id"],

  // Used when no locale matches
  defaultLocale: "id",
  pathnames: {
    "/auth/register": {
      en: "/auth/register",
      id: "/auth/daftar",
    },
    "/auth/login": {
      en: "/auth/login",
      id: "/auth/masuk",
    },
    "/": "/",
    "/create": {
      en: "/create",
      id: "/buat",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Pathnames = keyof typeof routing.pathnames;

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
