import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectDB from "@/libs/dbConnection";
import UserModel from "@/schemas/UserSchema";

const googleAuth = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});

const githubAuth = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
});

const extractName = (name: string) => {
  const [firstName, ...lastName] = name.split(" ");
  return { firstName, lastName: lastName.join(" ") };
};

connectDB();

export const AuthOptionProviders: NextAuthOptions = {
  providers: [googleAuth, githubAuth],
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    async session({ session, token }) {
      try {
        // Check if the user exists in the database based on the email
        const emailExists = (await UserModel.exists({ email: token.email }))
          ? true
          : false;

        if (!emailExists) {
          const { firstName, lastName } = extractName(token.name as string);
          // Create a new user through OAuth
          try {
            await UserModel.create({
              firstName,
              lastName,
              email: token.email as string,
              password: null,
              avatar: token.picture as string,
              method: "oauth",
            });
          } catch (error) {
            console.error("Error creating user:", error);
          }
        } else {
          // last login or online status update feature
          console.log("Exists ", token.email);
          console.log(new Date());
        }

        return session;
      } catch (error) {
        console.error("Error saving user to the database:", error);
        return session;
      }
    },
  },
};
