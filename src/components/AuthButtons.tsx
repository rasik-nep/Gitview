"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  return (
    <div>
      {!session ? (
        <button
          onClick={() => signIn("github")}
          className="rounded bg-primary px-4 py-2 text-white cursor-pointer w-[13rem]"
        >
          {status === "loading" ? "Loading..." : "Sign in with GitHub"}
        </button>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <p className="text-text-500 ">Signed in as {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="rounded bg-red-500 px-4 py-2 text-white cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
