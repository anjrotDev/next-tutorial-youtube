import { auth } from "@/auth";

export default auth(req => {
  if (!req.auth && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|.*\\.png$).*)"
  ]
};
