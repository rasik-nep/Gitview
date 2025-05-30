/**
 * Authentication Module
 *
 * This module configures NextAuth.js for GitHub authentication in the application.
 * It sets up the authentication handlers, sign-in/sign-out functions, and session management.
 *
 * Configuration:
 * - Uses GitHub OAuth provider for authentication
 * - Implements JWT-based session strategy
 * - Sets session duration to 30 days
 */

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
