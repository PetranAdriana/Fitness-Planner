"use client";

import { useEffect } from "react";
import useStore from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ProfilePage() {
  const { favorites, getFavoriteCount, fetchFavorites, error } = useStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Jane Doe</h3>
              <p className="text-gray-500">jane@example.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/10 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Favorite Exercises</p>
                  <p className="text-2xl font-bold">{getFavoriteCount()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Favorites */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : favorites.length === 0 ? (
              <p className="text-gray-500">No favorite exercises yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {favorites.slice(0, 6).map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="relative aspect-square mb-2">
                      <Image
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                    <h4 className="font-semibold capitalize">
                      {exercise.name}
                    </h4>
                    <p className="text-sm text-gray-500 capitalize">
                      {exercise.target}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
