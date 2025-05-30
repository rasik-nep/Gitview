/**
 * Providers Component
 *
 * This is a client-side wrapper component that provides context providers to the application.
 * It's necessary because:
 * 1. Next.js App Router uses React Server Components by default
 * 2. Context providers (like SessionProvider) must be client components
 * 3. We need a clear boundary between server and client components
 *
 */

"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
