import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectDB from "@/libs/dbConnection";
import UserModel from "@/schemas/UserSchema";
import bcrypt from "bcrypt";

type UserDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: null;
  avatar: string;
  method: string;
};

const createUser = async (userData: UserDataProps) => {
  return await UserModel.create(userData);
};

let userCreated = false;

// Connect to the database
connectDB();

const credentialsAuth = CredentialsProvider({
  name: "credentials",
  credentials: {},
  async authorize(credentials) {
    const { email, password } = credentials as {
      email: string;
      password: string;
    };
    if (!email || !password) {
      return null;
    }
    try {
      // Check if the user exists in the database
      const user = await UserModel.findOne({ email });

      if (!user) {
        return null;
      }
      // Check if the password is correct
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        return null;
      }
      // Return user object if everything is correct
      return user;
    } catch (error) {
      console.error("Error authenticating with credentials:", error);
      return null;
    }
  },
});

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

export const AuthOptionProviders: NextAuthOptions = {
  providers: [credentialsAuth, googleAuth, githubAuth],
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    async session({ session, token }) {
      const { email, name, picture } = token;

      // Check if the user exists in the database
      if (!userCreated) {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          userCreated = true;
        }
      }

      if (!userCreated) {
        // User doesn't exist, so create a new user in the database
        const { firstName, lastName } = extractName(name as string);
        try {
          await createUser({
            firstName,
            lastName,
            email: email as string,
            password: null,
            avatar: picture as string,
            method: "oauth",
          });
        } catch (error) {
          console.error("Error creating user:", error);
        }
        userCreated = true;
      }

      // Return the session object
      return session;
    },
  },
};
