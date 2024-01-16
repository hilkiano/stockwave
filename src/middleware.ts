import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["en", "id"];
const publicPages = ["/login", "/register"];

const intlMiddleware = createMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "id",
  alternateLinks: false,
});

const authMiddleware = (request: NextRequest) => {
  // Auth logic here. Check backend if token still OK
  return intlMiddleware(request);
};

export default async function middleware(request: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);
  if (isPublicPage) {
    return intlMiddleware(request);
  } else {
    return (authMiddleware as any)(request);
  }

  // const url = new URL(request.url);
  // const origin = url.origin;
  // const pathname = url.pathname;

  // const handleI18nRouting = createMiddleware({
  //   locales: ["en", "id"],
  //   localePrefix: "as-needed",
  //   defaultLocale: "id",
  //   alternateLinks: false,
  // });
  // const response = handleI18nRouting(request);

  // response.headers.set("x-url", request.url);
  // response.headers.set("x-origin", origin);
  // response.headers.set("x-pathname", pathname);

  // return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
