import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "id"] as const;
export const pathnames = {
  "/": "/",
  "/account": "/account",
  "/login": "/login",
  "/register": "/register",
  "/transactions": "/transactions",
  "/products": "/products",
  "/reports": "/reports",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, pathnames });
