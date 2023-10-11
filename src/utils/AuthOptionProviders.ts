import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const googleAuth = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});

const githubAuth = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
});

export const AuthOptionProviders: NextAuthOptions = {
  providers: [googleAuth, githubAuth],
  secret: process.env.AUTH_SECRET as string,
};
