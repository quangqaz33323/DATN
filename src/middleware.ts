import createMiddleware from "next-intl/middleware";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_API_ROUTES = ["/api/inngest"];

export default clerkMiddleware((auth, req) => {
  const pathname = req.nextUrl.pathname;
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedApiRoute) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|.*\\..*).*)", "/api/:path*"],
};
