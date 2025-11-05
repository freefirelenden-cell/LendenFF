import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


// 🔒 Only these routes require login
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // If route matches protected list, then require login
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Else: public access is allowed by default
});


export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // apply to API routes too
  ],
}
