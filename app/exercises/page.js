import ExercisesList from "@/components/exercises/exercises-list";

async function getExercises() {
  try {
    const res = await fetch("http://localhost:3000/api/exercises", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch exercises");
    }

    const exercises = await res.json();
    console.log("exercises:", exercises);

    return exercises;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return []; // Return empty array on error
  }
}

export default async function ExercisesPage() {
  const exercises = await getExercises();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Exercise Library
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our collection of exercises and find the perfect ones
            for your workout
          </p>
        </div>

        <ExercisesList initialExercises={exercises} />
      </div>
    </div>
  );
}
