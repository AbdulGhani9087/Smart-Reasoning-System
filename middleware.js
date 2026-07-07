import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("planwise_token")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/saved-plans",
    "/result",
    "/features",
    "/pricing",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/saved-plans/:path*",
    "/result/:path*",
    "/features/:path*",
    "/pricing/:path*",
  ],
};