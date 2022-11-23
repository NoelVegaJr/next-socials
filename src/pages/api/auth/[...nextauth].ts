import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import { promise } from "zod";

export default NextAuth({
  // session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!user) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const sessionUser = { ...session.user, ...user };
      return Promise.resolve({ ...session, user: sessionUser });
    },
  },
});
