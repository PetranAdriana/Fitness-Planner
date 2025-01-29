"use client";

import { useEffect } from "react";
import useStore from "@/lib/store";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon } from "@/components/icons";
import { useShallow } from 'zustand/react/shallow';

const useFavoritesStore = () => useStore(
  useShallow(state => ({
    favorites: state.favorites,
    isLoading: state.isLoading,
    error: state.error,
    isHydrated: state.isHydrated,
    lastUpdate: state.lastUpdate,
    fetchFavorites: state.fetchFavorites,
    removeFromFavorites: state.removeFromFavorites,
  }))
);

export default function FavoritesPage() {
  const { 
    favorites, 
    isLoading, 
    error, 
    isHydrated,
    lastUpdate,
    fetchFavorites, 
    removeFromFavorites 
  } = useFavoritesStore();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const serverFavorites = await fetchFavorites();
        // Comparison is handled in the store now via version tracking
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    if (isHydrated) {
      loadFavorites();
    }
  }, [isHydrated, fetchFavorites]);

  // Periodically check for updates if the page is visible
  useEffect(() => {
    let interval;

    const checkForUpdates = () => {
      if (document.visibilityState === 'visible' && isHydrated) {
        fetchFavorites();
      }
    };

    if (isHydrated) {
      interval = setInterval(checkForUpdates, 30000); // Check every 30 seconds
      document.addEventListener('visibilitychange', checkForUpdates);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', checkForUpdates);
    };
  }, [isHydrated, fetchFavorites]);

  const handleRemove = async (exerciseId) => {
    await removeFromFavorites(exerciseId);
  };

  if (!isHydrated || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="text-center">
          <p className="text-lg">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 pt-40">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => fetchFavorites()}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!favorites?.length) {
    return (
      <div className="container mx-auto px-4 py-8 pt-32">
        <Card>
          <CardHeader>
            <CardTitle>Your Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <HeartIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                You have not added any favorites yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Favorites</CardTitle>
          <span className="text-sm text-gray-500">
            Last updated: {new Date(lastUpdate).toLocaleString()}
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((exercise) => (
              <div
                key={exercise.id}
                className="group relative bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
              >
                <div className="relative aspect-square mb-4">
                  <Image
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg capitalize">
                    {exercise.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-md capitalize">
                      {exercise.target}
                    </span>
                    <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 text-sm rounded-md capitalize">
                      {exercise.bodyPart}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(exercise.id)}
                    className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
