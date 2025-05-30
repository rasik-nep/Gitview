"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButtons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/repos") {
      return pathname.startsWith("/repos");
    }
    return pathname === path;
  };
  return (
    <nav className="shadow-md min-h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16  py-12">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-text-500">GitView</span>
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8 ">
            <Link
              href="/repos"
              className={`inline-flex items-center px-1 pt-1 text-xl font-medium text-text-300  ${
                isActive("/repos") ? "text-text-500" : "hover:text-primary"
              }`}
            >
              Repositories
            </Link>
            <Link
              href="/favorites"
              className={`inline-flex items-center px-1 pt-1 text-xl font-medium text-text-300 ${
                isActive("/favorites") ? "text-text-500" : " hover:text-primary"
              }`}
            >
              Favorites
            </Link>
            <div className="inline-flex items-center px-1 pt-1">
              <AuthButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/repos"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-text-300 ${
              isActive("/repos") ? "text-text-500" : "hover:text-primary"
            }`}
          >
            Repositories
          </Link>
          <Link
            href="/favorites"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive("/favorites") ? "text-text-500" : " hover:text-primary"
            }`}
          >
            Favorites
          </Link>
          <div className="inline-flex align-center px-1 pt-1 mt-2">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
