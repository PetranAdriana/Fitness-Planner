"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

export default function ExerciseModal({ exercise, isOpen, onClose }) {
  const [isFavoriting, setIsFavoriting] = useState(false);

  if (!exercise) return null;

  const handleFavoriteClick = async () => {
    try {
      setIsFavoriting(true);
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
      });

      if (!res.ok) {
        throw new Error("Failed to add to favorites");
      }

      // Show success message or update UI
      // For now, we'll just close the modal
      onClose();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    } finally {
      setIsFavoriting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize text-primary-700 dark:text-primary-300">
            {exercise.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Exercise GIF */}
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={exercise.gifUrl}
              alt={exercise.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Exercise Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 dark:bg-primary-900/50 p-4 rounded-lg">
                <p className="text-sm font-medium text-primary-600 dark:text-primary-300">
                  Target
                </p>
                <p className="text-lg capitalize text-primary-700 dark:text-primary-200">
                  {exercise.target}
                </p>
              </div>
              <div className="bg-accent-50 dark:bg-accent-900/50 p-4 rounded-lg">
                <p className="text-sm font-medium text-accent-600 dark:text-accent-300">
                  Body Part
                </p>
                <p className="text-lg capitalize text-accent-700 dark:text-accent-200">
                  {exercise.bodyPart}
                </p>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/50 p-4 rounded-lg">
                <p className="text-sm font-medium text-primary-600 dark:text-primary-300">
                  Equipment
                </p>
                <p className="text-lg capitalize text-primary-700 dark:text-primary-200">
                  {exercise.equipment}
                </p>
              </div>
              <div className="bg-accent-50 dark:bg-accent-900/50 p-4 rounded-lg">
                <p className="text-sm font-medium text-accent-600 dark:text-accent-300">
                  Secondary Muscles
                </p>
                <p className="text-sm capitalize text-accent-700 dark:text-accent-200">
                  {exercise.secondaryMuscles?.join(", ") || "None"}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-lg">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                Instructions
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-200">
                {exercise.instructions?.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>

            {/* Add to Favorites Button */}
            <button
              onClick={handleFavoriteClick}
              disabled={isFavoriting}
              className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isFavoriting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Add to Favorites
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
