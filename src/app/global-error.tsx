"use client"; // Error boundaries must be Client Components

import { Raleway } from "next/font/google";
import "../styles/globals.css";

const geistRaleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function GlobalError() {
  return (
    <html lang="en">
      <body className={`${geistRaleway.variable}`}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <button
            onClick={() => {
              // refresh the page
              window.location.reload();
            }}
            className="px-4 py-2 text-text-500 border-1 border-foreground rounded cursor-pointer hover:bg-primary hover:text-white"
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
