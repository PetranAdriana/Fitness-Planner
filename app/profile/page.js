"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileStats from "@/components/profile/profile-stats";

export default function ProfilePage() {
  const [profile] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  });

  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const fetchFavoritesCount = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const favorites = await res.json();
          setFavoriteCount(favorites.length);
        }
      } catch (error) {
        console.error("Error fetching favorites count:", error);
      }
    };

    fetchFavoritesCount();
    // Refresh count every 5 seconds
    const interval = setInterval(fetchFavoritesCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-card rounded-xl p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                  {profile.name}
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>

          {/* Stats and Favorites */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Stats */}
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-4">
                Your Stats
              </h2>
              <ProfileStats favoriteCount={favoriteCount} />
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <Link
                  href="/favorites"
                  className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary-500 dark:text-primary-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-primary-700 dark:text-primary-300">
                      View Favorites
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-primary-500 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/exercises"
                  className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary-500 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span className="text-primary-700 dark:text-primary-300">
                      Browse Exercises
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-primary-500 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
