"use client";

import { useState } from "react";
import Image from "next/image";
import ExerciseModal from "./exercise-modal";
import SearchBar from "./search-bar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ExercisesList({ initialExercises = [] }) {
  const [exercises] = useState(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = exercises.filter((exercise) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      exercise.name.toLowerCase().includes(searchLower) ||
      exercise.target.toLowerCase().includes(searchLower) ||
      exercise.equipment.toLowerCase().includes(searchLower) ||
      exercise.bodyPart.toLowerCase().includes(searchLower)
    );
  });

  if (!exercises.length) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400">No exercises found.</p>
      </div>
    );
  }

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={(e) => e.preventDefault()}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card
            key={exercise.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary-500/50 dark:hover:border-primary-400/50 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 hover:-translate-y-1"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                fill
                className="object-contain"
              />
            </div>
            <CardHeader className="space-y-2">
              <CardTitle className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {exercise.name}
              </CardTitle>
              <CardDescription className="capitalize">
                {exercise.target}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Equipment:
                </span>
                <span className="text-sm capitalize text-neutral-700 dark:text-neutral-300">
                  {exercise.equipment}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Body Part:
                </span>
                <span className="text-sm capitalize text-neutral-700 dark:text-neutral-300">
                  {exercise.bodyPart}
                </span>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <button
                className="p-2 rounded-lg text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-primary-900/50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedExercise(exercise);
                }}
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
            </CardFooter>
          </Card>
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
