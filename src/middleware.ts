import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;

  const handleI18nRouting = createMiddleware({
    locales: ["en", "id"],
    localePrefix: "as-needed",
    defaultLocale: "id",
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  response.headers.set("x-url", request.url);
  response.headers.set("x-origin", origin);
  response.headers.set("x-pathname", pathname);

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
