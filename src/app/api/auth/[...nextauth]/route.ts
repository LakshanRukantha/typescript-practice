import NextAuth from "next-auth";
import { AuthOptionProviders } from "@/app/utils/AuthOptionProviders";

const handler = NextAuth(AuthOptionProviders);

export { handler as GET, handler as POST };
