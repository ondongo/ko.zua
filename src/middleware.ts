// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/configs/auth.config";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname, origin } = req.nextUrl;

  if (token?.role === "admin") {
    return NextResponse.next();
  }

  if (!token && pathname !== "/signin") {
    return NextResponse.redirect(`${origin}/signin`);
  }

  if (token?.role !== "admin") {
    const response = NextResponse.redirect(`${origin}/access-denied`);
    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
