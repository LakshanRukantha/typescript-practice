import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function checkSessionCookie(cookieHeader: string): boolean {
  // Split the cookie header into individual cookies
  const cookies = cookieHeader.split(";");

  // Iterate through the cookies to find the "next-auth.session-token"
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");

    if (cookieName === "next-auth.session-token") {
      return true;
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");
  const pathname = request.nextUrl.pathname;
  const isAuthenticated = checkSessionCookie(cookie as string);

  const protectedRoute =
    pathname === "/profile" || pathname === "/writearticle";
  const shouldRedirectToSignIn = protectedRoute && !isAuthenticated;
  const shouldRedirectToProfile =
    (pathname === "/signin" || pathname === "/signup") && isAuthenticated;

  if (shouldRedirectToSignIn) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (shouldRedirectToProfile) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}
