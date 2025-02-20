import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import db from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./zod/auth_schema";
import bcrypt from "bcryptjs";
import { CREDENTIALS } from "@/constants/auth_contant";
import { User } from "@prisma/client";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  adapter,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      // ! type dari credentials itu nurun ke: authorize(credentials, request)
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const validatedPayload = loginSchema.parse(credentials);
        const { email, password } = validatedPayload;

        try {
          const userExist = await db.user.findFirst({
            where: {
              email,
            },
          });
          if (!userExist) {
            return null;
          }
          const comparePassword = await bcrypt.compare(
            password,
            userExist.password!
          );
          if (!comparePassword) {
            return null;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...user } = userExist;

          return user;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (trigger === "signIn" && user) {
        // ! nyalin semua properti user (yang baru login) ke token
        token = { ...token, ...user };
      }
      if (account?.provider === CREDENTIALS) {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, token }) {
      // ! nyalin semua properti token ke session.user biar bisa diakses di seluruh component
      session.user = {
        ...session.user,
        ...token,
      } as User;

      return session;
    },
  },
});
