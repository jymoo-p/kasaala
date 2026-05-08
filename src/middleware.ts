import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "ks_auth";
const AUTH_TOKEN = "kasaala_admin_ok";

export function middleware(req: NextRequest) {
  // Skip if no password configured (local dev without env var)
  if (!process.env.KEYSTATIC_PASSWORD) {
    return NextResponse.next();
  }

  // Already authenticated
  if (req.cookies.get(COOKIE_NAME)?.value === AUTH_TOKEN) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/keystatic-login", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/keystatic", "/keystatic/(.*)", "/api/keystatic/(.*)"],
};
