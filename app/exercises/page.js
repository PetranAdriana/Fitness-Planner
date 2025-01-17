import ExercisesList from "./components/exercises-list";

export default async function ExercisesPage() {
  const res = await fetch(
    "https://exercisedb.p.rapidapi.com/exercises?limit=20&offset=0",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "7a6c3831camsh484fbde284fa1a6p15e19cjsn370e0031f2fe",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    }
  );

  const exercises = await res.json();
  console.log("Exerciții primite de la API:", exercises);

  return (
    <div className="min-h-screen bg-background">
      {/* Stilizare*/}
      <div className="text-center space-y-6 py-8">
        <p className="text-lg leading-relaxed text-muted-foreground max-w-lg mx-auto">
          <span className="font-semibold text-primary">
            Discover a comprehensive collection of exercises
          </span>{" "}
          with detailed instructions, targeted muscle groups, and proper form
          demonstrations.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm">
            🏋️‍♂️ <span className="font-semibold">20 Exercises</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-600 shadow-sm">
            ✨ <span className="font-semibold">Professional Instructions</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
            🎯 <span className="font-semibold">Targeted Workouts</span>
          </div>
        </div>
      </div>

      {/* Lista de exerciții */}
      <div className="container mx-auto py-10">
        <ExercisesList exercises={exercises} />
      </div>
    </div>
  );
}
