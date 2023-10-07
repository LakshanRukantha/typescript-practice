import { NextAuthOptions } from "next-auth";
import { githubAuth, googleAuth } from "@/app/utils/AuthOptionProviders";
import NextAuth from "next-auth";

const handler: NextAuthOptions = NextAuth({
  providers: [googleAuth, githubAuth],
  secret: process.env.SECRET,
});

export { handler as GET, handler as POST };
