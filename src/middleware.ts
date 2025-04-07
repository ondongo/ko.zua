// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/configs/auth.config";
import { getToken } from "next-auth/jwt";
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
    secureCookie: true,
  });

  const { pathname, origin } = req.nextUrl;
  console.log("AUTH_GOOGLE_SECRET", process.env.AUTH_GOOGLE_SECRET);
  console.log("TRUST:", process.env.AUTH_TRUST_HOST);
  console.log("AUTH_GOOGLE_ID:", process.env.AUTH_GOOGLE_ID);
  console.log("Request Pathname:", pathname);
  console.log("Token>>>>>>", token);

  if (token && pathname === "/signin") {
    return NextResponse.redirect(`${origin}/admin`);
  }

  if (!token && pathname !== "/signin") {
    return NextResponse.redirect(`${origin}/signin`);
  }

  if (token?.role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(`${origin}/access-denied`);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/signin", "/admin/:path*", "/access-denied"],
};
