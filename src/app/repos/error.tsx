"use client";
import ErrorPage from "@/components/Error";

export default function ReposError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} />;
}
