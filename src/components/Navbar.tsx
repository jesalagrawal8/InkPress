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
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors">
              <PenSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              InkPress
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href="/"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/")
                  ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/blogs")
                  ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              Blogs
            </Link>

            {session?.user && (session.user as any).role === "admin" ? (
              <>
                <Link
                  href="/admin"
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname?.startsWith("/admin")
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  <span className="hidden sm:inline">Admin</span>
                  <User className="w-5 h-5 sm:hidden" />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all hidden sm:inline-flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                Admin
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
