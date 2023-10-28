import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectDB from "@/libs/dbConnection";
import UserModel from "@/schemas/UserSchema";
import bcrypt from "bcrypt";

// Types for UserDataProps
type UserDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: null;
  avatar: string;
  method: string;
};

// Create a new user in the database
const createUser = async (userData: UserDataProps) => {
  return await UserModel.create(userData);
};

let userCreated = false;

// Connect to the database
connectDB();

// Create a CredentialsProvider for email and password authentication
const credentialsAuth = CredentialsProvider({
  name: "credentials",
  credentials: {}, // Keep it blank for handle default UI in next-auth

  // The authorize function is called when a user tries to sign in with email and password
  async authorize(credentials) {
    const { email, password } = credentials as {
      email: string;
      password: string;
    };

    // Check if email and password are present
    if (!email || !password) {
      return null;
    }

    // Try to authenticate the user and return the user object
    try {
      // Check if the user exists in the database
      const user = await UserModel.findOne({ email });

      if (!user) {
        return null;
      }

      // Check if the password is correct or not
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

// Create a GoogleProvider for Google authentication
const googleAuth = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});

// Create a GithubProvider for Github authentication
const githubAuth = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
});

// Extract function for separating first name and last name from full name
const extractName = (name: string) => {
  const [firstName, ...lastName] = name.split(" ");
  return { firstName, lastName: lastName.join(" ") };
};

// Create a AuthOptionProviders for all authentication providers and export it
export const AuthOptionProviders: NextAuthOptions = {
  providers: [credentialsAuth, googleAuth, githubAuth],
  secret: process.env.AUTH_SECRET as string,

  // The session function is called when a user signs in or signs up and refreshes the page and re-rendering events
  callbacks: {
    async session({ session, token }) {
      // Destucture the token object
      const { email, name, picture } = token;

      // Check if the user exists in the database
      if (!userCreated) {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          userCreated = true;
        }
      }

      // User doesn't exist, so create a new user in the database
      if (!userCreated) {
        const { firstName, lastName } = extractName(name as string);
        // TODO: Refactor this try catch in above createUser function and keep here simple
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
        userCreated = true; // Prevent creating user again and again (email existing check & prevent session reload firing again and again the function)
      }

      // Return the session object with user data
      return session;
    },
  },
};
