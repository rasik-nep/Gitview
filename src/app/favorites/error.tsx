"use client";
import ErrorPage from "@/component/Error";

export default function FavoritesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} />;
}
