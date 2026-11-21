import { NextResponse, type NextRequest } from "next/server";

const locales = ["de", "fr", "ro", "ru"] as const;
const excluded = ["/api", "/admin", "/_next", "/account", "/login", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (excluded.some((path) => pathname === path || pathname.startsWith(path + "/"))) return NextResponse.next();

  const segments = pathname.split("/");
  const candidate = segments[1];
  if (candidate === "en") {
    const target = request.nextUrl.clone();
    target.pathname = "/" + segments.slice(2).join("/");
    return NextResponse.redirect(target);
  }
  if (!locales.includes(candidate as (typeof locales)[number])) {
    const savedLocale = request.cookies.get("via-blue-language")?.value;
    if (locales.includes(savedLocale as (typeof locales)[number])) {
      const target = request.nextUrl.clone();
      target.pathname = `/${savedLocale}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(target);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-via-blue-original-path", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = candidate;
  const internalPath = "/" + segments.slice(2).join("/");
  if (excluded.some((path) => internalPath === path || internalPath.startsWith(path + "/"))) {
    const target = request.nextUrl.clone();
    target.pathname = internalPath;
    return NextResponse.redirect(target);
  }
  const target = request.nextUrl.clone();
  target.pathname = internalPath === "/" ? "/" : internalPath;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-via-blue-locale", locale);
  requestHeaders.set("x-via-blue-original-path", internalPath);
  const response = NextResponse.rewrite(target, { request: { headers: requestHeaders } });
  response.cookies.set("via-blue-language", locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"],
};
