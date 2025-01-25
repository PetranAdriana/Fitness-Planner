"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ExerciseModal({ exercise, isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if exercise is in favorites when modal opens
    const checkFavoriteStatus = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) return;
        const favorites = await res.json();
        setIsFavorite(favorites.some(fav => fav.id === exercise?.id));
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    if (exercise && isOpen) {
      checkFavoriteStatus();
    }
  }, [exercise, isOpen]);

  if (!exercise) return null;

  const toggleFavorite = async () => {
    try {
      setIsLoading(true);
      const method = isFavorite ? "DELETE" : "POST";
      const body = isFavorite 
        ? JSON.stringify({ exerciseId: exercise.id })
        : JSON.stringify({ exercise });

      const response = await fetch("/api/favorites", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error(isFavorite ? "Failed to remove from favorites" : "Failed to add to favorites");
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize text-gray-900">
            {exercise.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Exercise GIF */}
          <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={exercise.gifUrl}
              alt={exercise.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Exercise Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-indigo-600">Target</p>
                <p className="text-lg capitalize">{exercise.target}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-purple-600">Body Part</p>
                <p className="text-lg capitalize">{exercise.bodyPart}</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-pink-600">Equipment</p>
                <p className="text-lg capitalize">{exercise.equipment}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Secondary Muscles</p>
                <p className="text-sm capitalize">
                  {exercise.secondaryMuscles.join(", ")}
                </p>
              </div>
            </div>

            {/* Toggle Favorite Button */}
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isFavorite
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {isLoading
                ? (isFavorite ? "Removing..." : "Adding...")
                : (isFavorite ? "Remove from Favorites" : "Add to Favorites")}
            </button>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="text-gray-700 pl-2 leading-relaxed"
                >
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
