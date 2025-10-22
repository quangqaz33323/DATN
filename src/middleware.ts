import createMiddleware from "next-intl/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/vi",
//   "/en",
//   "/vi/sign-in(.*)",
//   "/en/sign-in(.*)",
//   "/vi/sign-up(.*)",
//   "/en/sign-up(.*)",
//   "/sign-in(.*)",
//   "/sign-up(.*)",
// ]);

export default clerkMiddleware((auth, req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
