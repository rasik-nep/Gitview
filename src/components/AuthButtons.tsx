"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  return (
    <div >
      {status === "loading" && <p>Loading...</p>}
      {!session ? (
        <button
          onClick={() => signIn("github")}
          className="rounded bg-primary px-4 py-2 text-white cursor-pointer"
        >
          Sign in with GitHub
        </button>
      ) : (
        <>
          <p>Signed in as {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="rounded bg-red-500 px-4 py-2 text-white cursor-pointer"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
