// pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/src/utils/database";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(user) {
        const email = user.user.email;
  
        // Check if the user exists in the database
        const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);
  
        if (existingUser.rowCount === 0) {
          // User does not exist, insert them into the database
          await query("INSERT INTO users (email, is_manager, is_cashier) VALUES ($1, $2, $3)", [email, false, false]);
        }
  
        return true;
      },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
