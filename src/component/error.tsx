"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-xl font-semibold text-red-500 mb-4">
        Something went wrong
      </h2>
      <p className="text-sm text-gray-600 mb-6">{error.message}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
