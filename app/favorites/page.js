"use client";

import { useState, useEffect } from "react";
import FavoritesList from "@/components/favorites/favorites-list";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const res = await fetch("/api/favorites", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const data = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // Load favorites initially
  useEffect(() => {
    loadFavorites();
  }, []);

  // Set up interval to refresh favorites
  useEffect(() => {
    const interval = setInterval(loadFavorites, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-300 mb-4">
              My Favorite Exercises
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              View and manage your favorite exercises
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <FavoritesList
                favorites={favorites}
                onFavoriteRemoved={loadFavorites}
              />
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl shadow-sm">
              <svg
                className="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-2">
                No Favorite Exercises Yet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Start adding exercises to your favorites to see them here
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
