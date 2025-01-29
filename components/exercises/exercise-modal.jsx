"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import useStore from "@/lib/store";
import { HeartIcon } from "@/components/icons";
import { useShallow } from 'zustand/react/shallow';

const useExerciseStore = () => useStore(
  useShallow(state => ({
    isLoading: state.isLoading,
    error: state.error,
    favorites: state.favorites,
    addToFavorites: state.addToFavorites,
    removeFromFavorites: state.removeFromFavorites,
    clearError: state.clearError
  }))
);

export default function ExerciseModal({ exercise, isOpen, onClose }) {
  const {
    isLoading,
    error,
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearError
  } = useExerciseStore();

  const isFavorite = useMemo(
    () => favorites?.some(fav => fav.id === exercise?.id),
    [favorites, exercise?.id]
  );

  // Clear any errors when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      clearError();
    }
  }, [isOpen, clearError]);

  if (!exercise) return null;

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(exercise.id);
    } else {
      await addToFavorites(exercise);
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
              className="object-contain"
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
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : isFavorite
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : isFavorite ? (
                <>
                  <HeartIcon className="w-5 h-5 mr-2 fill-current" />
                  Remove from Favorites
                </>
              ) : (
                <>
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Add to Favorites
                </>
              )}
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
