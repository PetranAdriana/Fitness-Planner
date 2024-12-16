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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Exercise Library
          </h1>
          <p className="text-muted-foreground max-w-[700px]">
            Discover a comprehensive collection of exercises with detailed
            instructions, targeted muscle groups, and proper form
            demonstrations.
          </p>
          <div className="flex items-center space-x-2">
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              🏋️‍♂️ {exercises.length} Exercises
            </div>
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              ✨ Professional Instructions
            </div>
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              🎯 Targeted Workouts
            </div>
          </div>
        </div>

        <ExercisesList exercises={exercises} />
      </div>
    </div>
  );
}
