"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import { PenSquare, LogOut, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <PenSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              InkPress
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/blogs")
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Blogs
            </Link>

            {session?.user && (session.user as any).role === "admin" && (
              <>
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname?.startsWith("/admin")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <span className="hidden sm:inline">Admin</span>
                  <User className="w-5 h-5 sm:hidden" />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
