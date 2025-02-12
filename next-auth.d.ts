import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    token?: string;
  }
}
