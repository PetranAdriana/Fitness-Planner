"use client";

import { useState } from "react";
import Image from "next/image";
import ExerciseModal from "../exercises/exercise-modal";

export default function FavoritesList({ favorites = [], onFavoriteRemoved }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [deletingIds, setDeletingIds] = useState(new Set());

  const handleRemoveFavorite = async (exerciseId) => {
    if (deletingIds.has(exerciseId)) return;
    
    try {
      setDeletingIds(prev => new Set([...prev, exerciseId]));
      
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exerciseId }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove from favorites");
      }

      if (onFavoriteRemoved) {
        onFavoriteRemoved(exerciseId);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(exerciseId);
        return newSet;
      });
    }
  };

  if (!favorites.length) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4">
          <svg
            className="w-full h-full text-neutral-400 dark:text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-primary-700 dark:text-primary-300 mb-2">
          No favorite exercises yet
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Start adding exercises to your favorites to see them here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2 capitalize">
                {exercise.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 capitalize">
                  {exercise.target}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedExercise(exercise)}
                    className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(exercise.id);
                    }}
                    disabled={deletingIds.has(exercise.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      deletingIds.has(exercise.id)
                        ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                        : "text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                    }`}
                  >
                    {deletingIds.has(exercise.id) ? (
                      <svg
                        className="w-5 h-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </>
  );
}
