// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/configs/auth.config";
import { getToken } from "next-auth/jwt";
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname , origin } = req.nextUrl;
  console.log("Request Origin:", origin);  // Ajoute ce log pour voir l'origin
  console.log("Request Pathname:", pathname);  // Ajoute ce log pour voir le pathname


  // Si un token existe et que l'utilisateur tente d'accéder à /signin, redirigez vers /admin
  if (token && pathname === "/signin") {
    return NextResponse.redirect(`${origin}/admin`);
  }

  // Si un token n'existe pas et que l'utilisateur tente d'accéder à une page protégée, redirigez vers /signin
  if (!token && pathname !== "/signin") {
    return NextResponse.redirect(`${origin}/signin`);
  }

  // Si un token existe mais que le rôle n'est pas 'admin' et que l'utilisateur tente d'accéder à /admin, redirigez vers /access-denied
  if (token?.role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(`${origin}/access-denied`);
  }

  // Si toutes les conditions sont satisfaites, continuez le traitement de la requête
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
