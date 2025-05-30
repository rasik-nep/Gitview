import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-4xl font-bold text-text-500 p-5">Repo Not Found</h2>
      <p className="text-text-300">Could not find requested repository</p>
      <Link href="/" className="text-secondary p-5">
        Return Home
      </Link>
    </div>
  );
}
