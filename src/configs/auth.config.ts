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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as Token).role =
          user.email === "prince.ondongo@ism.edu.sn" ? "admin" : "user";
      }
      return token;
    },
    async session({ session, token }) {
      (session as Session).user.role = (token as Token).role;
      return session;
    },
  },
} satisfies NextAuthConfig;
