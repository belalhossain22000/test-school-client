import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode";

interface DecodedUser {
  role: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();

  // Pages to restrict for logged-in users
  const authPages = ["/auth/login", "/auth/register"];

  if (authPages.includes(url.pathname) && token) {
    try {
      const user = jwtDecode<DecodedUser>(token);
      const roleToRouteMap: Record<string, string> = {
        super_admin: "/super_admin/dashboard",
        admin: "/admin/dashboard",
        student: "/student/dashboard",
        supervisor: "/supervisor/dashboard",
      };

      const redirectPath = roleToRouteMap[user.role.toLowerCase()] || "/";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    } catch {
      return NextResponse.next();
    }
  }

  // Protected pages - redirect unauthenticated to /auth/login
  const protectedPages = [
    "/super_admin/dashboard",
    "/admin/dashboard",
    "/student/dashboard",
    "/supervisor/dashboard",
  ];

  if (
    protectedPages.some((page) => url.pathname.startsWith(page)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/super_admin/:path*", "/admin/:path*", "/student/:path*", "/supervisor/:path*"],
};
