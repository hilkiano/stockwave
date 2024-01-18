import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const locales = ["en", "id"];
const publicPages = ["/login", "/register"];

const intlMiddleware = (
  request: NextRequest,
  token?: string,
  token_expired_at?: string
) => {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;

  const handleI18nRouting = createMiddleware({
    locales: ["en", "id"],
    localePrefix: "as-needed",
    defaultLocale: "id",
    alternateLinks: false,
  });
  const response = handleI18nRouting(request);

  response.headers.set("x-url", request.url);
  response.headers.set("x-origin", origin);
  response.headers.set("x-pathname", pathname);

  if (token && token_expired_at) {
    response.cookies.set("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(token_expired_at),
    });
  }

  return response;
};

const authMiddleware = async (request: NextRequest) => {
  // Auth logic here. Check backend if token still OK
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  const jwt = cookieStore.get("jwt");
  return await fetch(`${process.env.SERVER_API_URL}/auth/me`, {
    method: "get",
    headers: {
      "x-app-locale": lang ? lang.value : "id",
      "x-token": jwt ? jwt.value : "",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        const url = new URL(`/login`, request.url);
        return NextResponse.redirect(url);
      } else {
        return intlMiddleware(
          request,
          res.result.active_token,
          res.result.token_expired_at
        );
      }
    });
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
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt");
    if (jwt) {
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    } else {
      return intlMiddleware(request);
    }
  } else {
    return (authMiddleware as any)(request);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
