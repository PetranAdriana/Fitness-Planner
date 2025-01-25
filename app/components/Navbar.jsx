"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isLinkActive = (href) => {
    return pathname === href;
  };

  const linkClasses = (href) => {
    return `${
      isLinkActive(href)
        ? "text-primary-100"
        : "text-white hover:text-primary-100 transition-colors"
    }`;
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();
      setIsLoggedIn(data.authenticated);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="navbar fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-8">
            <Logo />
            <span className="text-xl font-bold text-white hover:text-primary-100">
              Fitness Planner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`hover:text-primary-100 transition-colors ${
                pathname === "/" ? "text-primary-100" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/exercises"
              className={`hover:text-primary-100 transition-colors ${
                pathname === "/exercises" ? "text-primary-100" : "text-white"
              }`}
            >
              Exercises
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/favorites"
                  className={`hover:text-primary-100 transition-colors ${
                    pathname === "/favorites"
                      ? "text-primary-100"
                      : "text-white"
                  }`}
                >
                  Favorites
                </Link>
                <Link
                  href="/profile"
                  className={`hover:text-primary-100 transition-colors ${
                    pathname === "/profile" ? "text-primary-100" : "text-white"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-white hover:text-primary-100 transition-colors"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isLoggedIn && (
              <Link
                href="/login"
                className="text-white hover:text-primary-100 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-100 hover:bg-primary-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
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
              ) : (
                <svg
                  className="block h-6 w-6"
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen
              ? "max-h-64 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } transition-all duration-200 ease-in-out overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === "/"
                  ? "bg-primary-700 text-white"
                  : "text-white hover:bg-primary-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/exercises"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === "/exercises"
                  ? "bg-primary-700 text-white"
                  : "text-white hover:bg-primary-700 hover:text-white"
              }`}
            >
              Exercises
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/favorites"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === "/favorites"
                      ? "bg-primary-700 text-white"
                      : "text-white hover:bg-primary-700 hover:text-white"
                  }`}
                >
                  Favorites
                </Link>
                <Link
                  href="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === "/profile"
                      ? "bg-primary-700 text-white"
                      : "text-white hover:bg-primary-700 hover:text-white"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:bg-primary-700 hover:text-white"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isLoggedIn && (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors text-white hover:bg-primary-700 hover:text-white"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
