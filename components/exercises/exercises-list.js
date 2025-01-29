"use client";

import { useState, useMemo, useEffect } from "react";
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
import { HeartIcon, EyeIconFilled } from "@/components/icons";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

const useExerciseStore = () =>
  useStore(
    useShallow((state) => ({
      favorites: state.favorites,
      isHydrated: state.isHydrated,
      addToFavorites: state.addToFavorites,
      removeFromFavorites: state.removeFromFavorites,
      fetchFavorites: state.fetchFavorites,
    }))
  );

export default function ExercisesList({ initialExercises = [] }) {
  const [exercises] = useState(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    favorites,
    isHydrated,
    addToFavorites,
    removeFromFavorites,
    fetchFavorites,
  } = useExerciseStore();

  useEffect(() => {
    if (isHydrated) {
      fetchFavorites();
    }
  }, [isHydrated, fetchFavorites]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        exercise.name.toLowerCase().includes(searchLower) ||
        exercise.target.toLowerCase().includes(searchLower) ||
        exercise.equipment.toLowerCase().includes(searchLower) ||
        exercise.bodyPart.toLowerCase().includes(searchLower)
      );
    });
  }, [exercises, searchQuery]);

  if (!exercises.length) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400">
          No exercises found.
        </p>
      </div>
    );
  }

  const handleFavoriteClick = async (e, exercise) => {
    e.stopPropagation();
    const isFavorite = favorites?.some((fav) => fav.id === exercise.id);
    if (isFavorite) {
      await removeFromFavorites(exercise.id);
    } else {
      await addToFavorites(exercise);
    }
  };

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
          >
            <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800">
              <div
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer"
                onClick={(e) => handleFavoriteClick(e, exercise)}
              >
                <HeartIcon
                  className={`w-5 h-5 transition-all duration-300 ${
                    isHydrated &&
                    favorites?.some((fav) => fav.id === exercise.id)
                      ? "fill-red-500 stroke-red-500 hover:fill-red-600 hover:stroke-red-600"
                      : "stroke-gray-600 dark:stroke-gray-400 hover:stroke-red-500 hover:scale-110"
                  }`}
                />
              </div>
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                fill
                className="object-contain"
              />
            </div>
            <div onClick={() => setSelectedExercise(exercise)}>
              <CardHeader className="space-y-2">
                <CardTitle className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors uppercase">
                  {exercise.name}
                </CardTitle>
                <CardDescription className="capitalize">
                  {exercise.target}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-100 text-sm rounded-full">
                    {exercise.bodyPart}
                  </span>
                  <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900/50 text-accent-800 dark:text-accent-100 text-sm rounded-full">
                    {exercise.equipment}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <EyeIconFilled className="w-5 h-5 text-gray-400 group-hover:text-primary-500 dark:text-gray-500 dark:group-hover:text-primary-400 transition-colors" />
              </CardFooter>
            </div>
          </Card>
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
