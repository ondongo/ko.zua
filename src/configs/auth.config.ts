import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

interface Token {
  role?: string;
}

interface Session {
  user: {
    role?: string;
  };
}

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as Token).role =
          user.email === "prince.ondongo@ism.edu.sn" ||
          user.email === "Nathankolime2@gmail.com"
            ? "admin"
            : "user";
      }
      return token;
    },
    async session({ session, token }) {
      (session as Session).user.role = (token as Token).role;
      return session;
    },
  },
} satisfies NextAuthConfig;
