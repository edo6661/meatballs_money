import { User } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends User {
    credentials?: boolean;
    emailVerified?: string | null;
  }
}
