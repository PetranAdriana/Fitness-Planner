"use client";

import { useState } from "react";
import Image from "next/image";
import ExerciseModal from "./exercise-modal";

export default function ExercisesList({ initialExercises = [] }) {
  const [exercises] = useState(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!exercises.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No exercises found.</p>
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
