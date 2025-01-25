"use client";

import { useState } from "react";
import Image from "next/image";
import ExerciseModal from "../exercises/exercise-modal";

export default function FavoritesList({ initialExercises = [] }) {
  const [exercises] = useState(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!exercises.length) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4">
          <svg
            className="w-full h-full text-gray-400"
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No favorite exercises yet
        </h3>
        <p className="text-gray-500">
          Start adding exercises to your favorites to see them here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">
                {exercise.name}
              </h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm capitalize">
                    {exercise.target}
                  </span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-sm capitalize">
                    {exercise.equipment}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Body Part:</span>{" "}
                  <span className="capitalize">{exercise.bodyPart}</span>
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement remove from favorites
                }}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>

      <ExerciseModal
        exercise={selectedExercise}
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </>
  );
}
