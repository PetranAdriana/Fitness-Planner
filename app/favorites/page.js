"use client";

import { useEffect } from "react";
import useStore from "@/lib/store";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon } from "@/components/icons";

export default function FavoritesPage() {
  const { favorites, isLoading, error, fetchFavorites, removeFromFavorites } =
    useStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemove = async (exerciseId) => {
    await removeFromFavorites(exerciseId);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 pt-40">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchFavorites}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-32">
        <div className="text-center">
          <p className="text-lg">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
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
        <CardHeader>
          <CardTitle>Your Favorites</CardTitle>
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
                    className="w-full mt-2 flex items-center justify-center px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                  >
                    <HeartIcon className="w-5 h-5 mr-2 fill-current" />
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
