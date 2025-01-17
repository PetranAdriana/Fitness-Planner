"use client";

import Image from "next/image";
import { useState } from "react";

export default function ExercisesList({ exercises }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]); // Lista de exerciții favorite
  const [currentPage, setCurrentPage] = useState(1); // Pentru paginare

  const exercisesPerPage = 6;

  const categories = [
    "all",
    ...new Set(exercises.map((exercise) => exercise.bodyPart)),
    "favorites", // Adăugăm categoria "favorites"
  ];

  // Filtrarea exercițiilor pe baza categoriei selectate și căutării
  const filteredExercises = exercises.filter((exercise) => {
    if (selectedCategory === "favorites") {
      return favorites.includes(exercise.id);
    }
    return (
      (selectedCategory === "all"
        ? true
        : exercise.bodyPart === selectedCategory) &&
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calcularea exercițiilor pentru pagina curentă
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);

  // Funcția pentru a adăuga/elimina un exercițiu din lista de favorite
  const toggleFavorite = (exerciseId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(exerciseId)
        ? prevFavorites.filter((id) => id !== exerciseId)
        : [...prevFavorites, exerciseId]
    );
  };

  return (
    <div className="container mx-auto py-10">
      {/* Câmpul de căutare */}
      <input
        type="text"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border rounded-lg w-full"
      />

      {/* Butoane de filtrare */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Resetează la prima pagină când schimb categoria
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista exercițiilor filtrate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentExercises.map((exercise) => (
          <div key={exercise.id} className="rounded-lg border shadow-lg p-4">
            {/* Afișăm imaginea exercițiului */}
            <Image
              src={exercise.gifUrl}
              alt={exercise.name}
              width={300}
              height={200}
              className="rounded-lg"
            />
            {/* Afișăm numele exercițiului */}
            <h3 className="text-lg font-semibold mt-2">{exercise.name}</h3>
            <p className="text-sm">
              <strong>Body Part:</strong> {exercise.bodyPart} <br />
              <strong>Target:</strong> {exercise.target} <br />
              <strong>Equipment:</strong> {exercise.equipment}
            </p>

            {/* Buton pentru favorite */}
            <button
              onClick={() => toggleFavorite(exercise.id)}
              className={`mt-4 px-4 py-2 rounded-lg ${
                favorites.includes(exercise.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {favorites.includes(exercise.id)
                ? "Remove Favorite"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>

      {/* Butoanele de paginare */}
      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded-lg mx-2"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded-lg mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
