"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center min-h-[80vh] text-center p-20">
      <h2 className="text-xl font-semibold text-error mb-4">
        Something went wrong
      </h2>
      <p className="text-sm text-text-500 mb-6">{error.message}</p>
      <button
        className="px-4 py-2 text-text-500 border-1 border-foreground rounded cursor-pointer hover:bg-primary hover:text-white"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
